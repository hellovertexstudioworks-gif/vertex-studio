// FILE: app/api/admin/payments/route.ts
// PURPOSE: Vertex Studio Works — Payments API
// Handles payment CRUD, invoice/installment validation, and finance permissions.

import { NextRequest, NextResponse } from "next/server";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

type Role = "Owner" | "Admin" | "Manager" | "Staff";

type PaymentPayload = {
  id?: string;
  invoiceId?: string;
  installmentId?: string | null;
  paymentReference?: string;
  amount?: number;
  paymentDate?: string;
  paymentMethod?: string;
  status?: string;
  notes?: string;
};

const allowedMethods = [
  "GCash",
  "Bank Transfer",
  "PayPal",
  "Stripe",
  "Cash",
  "Other",
] as const;

const allowedStatuses = [
  "Pending",
  "Paid",
  "Failed",
  "Refunded",
  "Cancelled",
] as const;

function jsonError(message: string, status = 400) {
  return NextResponse.json({ message }, { status });
}

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secret = process.env.SUPABASE_SECRET_KEY;

  if (!url || !secret) {
    throw new Error("Supabase server environment variables are missing.");
  }

  return createSupabaseClient(url, secret, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

async function getAuthorizedUser() {
  const supabase = await createServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      ok: false as const,
      response: jsonError("You must be signed in.", 401),
    };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role, status")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError || !profile) {
    return {
      ok: false as const,
      response: jsonError("Unable to verify your profile.", 403),
    };
  }

  if (profile.status !== "Active") {
    return {
      ok: false as const,
      response: jsonError("Your account is not active.", 403),
    };
  }

  const role = profile.role as Role;

  if (role === "Owner") {
    return { ok: true as const, user, role };
  }

  const { data: rolePermission, error: permissionError } = await supabase
    .from("role_permissions")
    .select("permissions")
    .eq("role", role)
    .maybeSingle();

  if (permissionError || !rolePermission) {
    return {
      ok: false as const,
      response: jsonError("Unable to verify finance permissions.", 403),
    };
  }

  const permissions =
    rolePermission.permissions &&
    typeof rolePermission.permissions === "object"
      ? (rolePermission.permissions as Record<string, unknown>)
      : {};

  if (permissions.finance !== true) {
    return {
      ok: false as const,
      response: jsonError("You do not have permission to access Payments.", 403),
    };
  }

  return { ok: true as const, user, role };
}

function normalizePayment(row: any) {
  const invoice = Array.isArray(row.invoices) ? row.invoices[0] : row.invoices;
  const client = invoice?.clients
    ? Array.isArray(invoice.clients)
      ? invoice.clients[0]
      : invoice.clients
    : null;
  const installment = Array.isArray(row.invoice_installments)
    ? row.invoice_installments[0]
    : row.invoice_installments;

  return {
    id: row.id,
    invoiceId: row.invoice_id,
    invoiceNumber: invoice?.invoice_number ?? "Unknown Invoice",
    clientId: invoice?.client_id ?? client?.id ?? "",
    client: client?.company ?? client?.name ?? "Unknown Client",
    installmentId: row.installment_id ?? "",
    installmentNumber: installment?.installment_number ?? null,
    installmentDescription: installment?.description ?? "",
    paymentReference: row.payment_reference,
    amount: Number(row.amount ?? 0),
    paymentDate: row.payment_date,
    paymentMethod: row.payment_method,
    status: row.status,
    notes: row.notes ?? "",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function validatePayload(body: PaymentPayload, partial = false) {
  const errors: string[] = [];

  if (!partial || body.invoiceId !== undefined) {
    if (!body.invoiceId?.trim()) {
      errors.push("Invoice is required.");
    }
  }

  if (!partial || body.paymentReference !== undefined) {
    if (!body.paymentReference?.trim()) {
      errors.push("Payment reference is required.");
    }
  }

  if (!partial || body.amount !== undefined) {
    const amount = Number(body.amount);
    if (!Number.isFinite(amount) || amount <= 0) {
      errors.push("Payment amount must be greater than zero.");
    }
  }

  if (
    body.paymentMethod !== undefined &&
    !allowedMethods.includes(body.paymentMethod as any)
  ) {
    errors.push("Invalid payment method.");
  }

  if (
    body.status !== undefined &&
    !allowedStatuses.includes(body.status as any)
  ) {
    errors.push("Invalid payment status.");
  }

  if (body.paymentDate !== undefined && body.paymentDate !== "") {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(body.paymentDate)) {
      errors.push("Payment date must use YYYY-MM-DD format.");
    }
  }

  return errors;
}

async function verifyInvoice(
  admin: ReturnType<typeof getAdminClient>,
  invoiceId: string
) {
  return admin
    .from("invoices")
    .select(
      `
        id,
        invoice_number,
        client_id,
        total,
        clients (
          id,
          name,
          company
        )
      `
    )
    .eq("id", invoiceId)
    .maybeSingle();
}

async function verifyInstallment(
  admin: ReturnType<typeof getAdminClient>,
  installmentId: string,
  invoiceId: string
) {
  return admin
    .from("invoice_installments")
    .select(
      `
        id,
        invoice_id,
        installment_number,
        description,
        percentage,
        amount,
        due_date,
        status,
        paid_at
      `
    )
    .eq("id", installmentId)
    .eq("invoice_id", invoiceId)
    .maybeSingle();
}

async function refreshFinancialStatus(
  admin: ReturnType<typeof getAdminClient>,
  invoiceId: string
) {
  const { data: invoice, error: invoiceError } = await admin
    .from("invoices")
    .select("id, total, status")
    .eq("id", invoiceId)
    .maybeSingle();

  if (invoiceError || !invoice) {
    return;
  }

  const { data: payments } = await admin
    .from("payments")
    .select("amount, status")
    .eq("invoice_id", invoiceId);

  const paidAmount = (payments ?? []).reduce((sum, payment) => {
    if (payment.status === "Paid") {
      return sum + Number(payment.amount ?? 0);
    }
    return sum;
  }, 0);

  const total = Number(invoice.total ?? 0);

  let nextInvoiceStatus = invoice.status;

  if (total > 0 && paidAmount >= total) {
    nextInvoiceStatus = "Paid";
  } else if (
    invoice.status === "Paid" &&
    paidAmount < total
  ) {
    nextInvoiceStatus = "Sent";
  }

  if (nextInvoiceStatus !== invoice.status) {
    await admin
      .from("invoices")
      .update({
        status: nextInvoiceStatus,
        updated_at: new Date().toISOString(),
      })
      .eq("id", invoiceId);
  }

  const { data: installments } = await admin
    .from("invoice_installments")
    .select("id, amount, status")
    .eq("invoice_id", invoiceId);

  if (!installments?.length) {
    return;
  }

  for (const installment of installments) {
    const { data: installmentPayments } = await admin
      .from("payments")
      .select("amount, status")
      .eq("installment_id", installment.id);

    const installmentPaid = (installmentPayments ?? []).reduce(
      (sum, payment) => {
        if (payment.status === "Paid") {
          return sum + Number(payment.amount ?? 0);
        }
        return sum;
      },
      0
    );

    const installmentTotal = Number(installment.amount ?? 0);

    let nextStatus = installment.status;

    if (installmentTotal > 0 && installmentPaid >= installmentTotal) {
      nextStatus = "Paid";
    } else if (
      installment.status === "Paid" &&
      installmentPaid < installmentTotal
    ) {
      nextStatus = "Pending";
    }

    if (nextStatus !== installment.status) {
      await admin
        .from("invoice_installments")
        .update({
          status: nextStatus,
          paid_at:
            nextStatus === "Paid" ? new Date().toISOString() : null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", installment.id);
    }
  }
}

export async function GET(request: NextRequest) {
  try {
    const auth = await getAuthorizedUser();
    if (!auth.ok) return auth.response;

    const admin = getAdminClient();

    const invoiceId = new URL(request.url).searchParams.get("invoiceId");

    let query = admin
      .from("payments")
      .select(
        `
          id,
          invoice_id,
          installment_id,
          payment_reference,
          amount,
          payment_date,
          payment_method,
          status,
          notes,
          created_at,
          updated_at,
          invoices (
            id,
            invoice_number,
            client_id,
            total,
            clients (
              id,
              name,
              company
            )
          ),
          invoice_installments (
            id,
            installment_number,
            description,
            percentage,
            amount,
            due_date,
            status,
            paid_at
          )
        `
      )
      .order("payment_date", { ascending: false })
      .order("created_at", { ascending: false });

    if (invoiceId) {
      query = query.eq("invoice_id", invoiceId);
    }

    const { data, error } = await query;

    if (error) {
      console.error("PAYMENTS GET ERROR:", error);
      return jsonError(error.message, 500);
    }

    let installments: any[] = [];

    if (invoiceId) {
      const { data: installmentRows, error: installmentError } = await admin
        .from("invoice_installments")
        .select(
          `
            id,
            invoice_id,
            installment_number,
            description,
            percentage,
            amount,
            due_date,
            status,
            paid_at
          `
        )
        .eq("invoice_id", invoiceId)
        .order("installment_number", { ascending: true });

      if (installmentError) {
        console.error("PAYMENT INSTALLMENTS GET ERROR:", installmentError);
        return jsonError(installmentError.message, 500);
      }

      installments = installmentRows ?? [];
    }

    return NextResponse.json({
      payments: (data ?? []).map(normalizePayment),
      installments,
    });
  } catch (error) {
    console.error("PAYMENTS GET SERVER ERROR:", error);
    return jsonError(
      error instanceof Error ? error.message : "Unable to load payments.",
      500
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await getAuthorizedUser();
    if (!auth.ok) return auth.response;

    const body = (await request.json()) as PaymentPayload;
    const errors = validatePayload(body);

    if (errors.length > 0) {
      return jsonError(errors.join(" "));
    }

    const admin = getAdminClient();

    const { data: invoice, error: invoiceError } = await verifyInvoice(
      admin,
      body.invoiceId!
    );

    if (invoiceError) {
      console.error("PAYMENT INVOICE LOOKUP ERROR:", invoiceError);
      return jsonError("Unable to verify the selected invoice.", 500);
    }

    if (!invoice) {
      return jsonError("The selected invoice was not found.", 404);
    }

    if (body.installmentId) {
      const { data: installment, error: installmentError } =
        await verifyInstallment(
          admin,
          body.installmentId,
          body.invoiceId!
        );

      if (installmentError) {
        console.error(
          "PAYMENT INSTALLMENT LOOKUP ERROR:",
          installmentError
        );
        return jsonError("Unable to verify the selected installment.", 500);
      }

      if (!installment) {
        return jsonError(
          "The selected installment does not belong to this invoice.",
          400
        );
      }
    }

    const now = new Date().toISOString();

    const { data, error } = await admin
      .from("payments")
      .insert({
        invoice_id: body.invoiceId,
        installment_id: body.installmentId || null,
        payment_reference: body.paymentReference!.trim(),
        amount: Number(body.amount),
        payment_date: body.paymentDate || now.slice(0, 10),
        payment_method: body.paymentMethod ?? "Other",
        status: body.status ?? "Paid",
        notes: body.notes?.trim() ?? "",
        updated_at: now,
      })
      .select(
        `
          id,
          invoice_id,
          installment_id,
          payment_reference,
          amount,
          payment_date,
          payment_method,
          status,
          notes,
          created_at,
          updated_at,
          invoices (
            id,
            invoice_number,
            client_id,
            total,
            clients (
              id,
              name,
              company
            )
          ),
          invoice_installments (
            id,
            installment_number,
            description,
            percentage,
            amount,
            due_date,
            status,
            paid_at
          )
        `
      )
      .single();

    if (error) {
      console.error("PAYMENTS POST ERROR:", error);
      return jsonError(error.message, 500);
    }

    await refreshFinancialStatus(admin, body.invoiceId!);

    return NextResponse.json(
      { payment: normalizePayment(data) },
      { status: 201 }
    );
  } catch (error) {
    console.error("PAYMENTS POST SERVER ERROR:", error);
    return jsonError(
      error instanceof Error ? error.message : "Unable to create payment.",
      500
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const auth = await getAuthorizedUser();
    if (!auth.ok) return auth.response;

    const body = (await request.json()) as PaymentPayload;

    if (!body.id?.trim()) {
      return jsonError("Payment ID is required.");
    }

    const errors = validatePayload(body, true);

    if (errors.length > 0) {
      return jsonError(errors.join(" "));
    }

    const admin = getAdminClient();

    const { data: existing, error: existingError } = await admin
      .from("payments")
      .select("id, invoice_id, installment_id")
      .eq("id", body.id)
      .maybeSingle();

    if (existingError) {
      console.error("PAYMENT EXISTING LOOKUP ERROR:", existingError);
      return jsonError("Unable to find the payment.", 500);
    }

    if (!existing) {
      return jsonError("Payment was not found.", 404);
    }

    const invoiceId = body.invoiceId ?? existing.invoice_id;

    const { data: invoice, error: invoiceError } = await verifyInvoice(
      admin,
      invoiceId
    );

    if (invoiceError || !invoice) {
      return jsonError("The selected invoice was not found.", 404);
    }

    if (body.installmentId) {
      const { data: installment, error: installmentError } =
        await verifyInstallment(
          admin,
          body.installmentId,
          invoiceId
        );

      if (installmentError) {
        return jsonError("Unable to verify the selected installment.", 500);
      }

      if (!installment) {
        return jsonError(
          "The selected installment does not belong to this invoice.",
          400
        );
      }
    }

    const update: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (body.invoiceId !== undefined) update.invoice_id = body.invoiceId;
    if (body.installmentId !== undefined) {
      update.installment_id = body.installmentId || null;
    }
    if (body.paymentReference !== undefined) {
      update.payment_reference = body.paymentReference.trim();
    }
    if (body.amount !== undefined) update.amount = Number(body.amount);
    if (body.paymentDate !== undefined) {
      update.payment_date = body.paymentDate || null;
    }
    if (body.paymentMethod !== undefined) {
      update.payment_method = body.paymentMethod;
    }
    if (body.status !== undefined) update.status = body.status;
    if (body.notes !== undefined) update.notes = body.notes.trim();

    const { data, error } = await admin
      .from("payments")
      .update(update)
      .eq("id", body.id)
      .select(
        `
          id,
          invoice_id,
          installment_id,
          payment_reference,
          amount,
          payment_date,
          payment_method,
          status,
          notes,
          created_at,
          updated_at,
          invoices (
            id,
            invoice_number,
            client_id,
            total,
            clients (
              id,
              name,
              company
            )
          ),
          invoice_installments (
            id,
            installment_number,
            description,
            percentage,
            amount,
            due_date,
            status,
            paid_at
          )
        `
      )
      .single();

    if (error) {
      console.error("PAYMENTS PATCH ERROR:", error);
      return jsonError(error.message, 500);
    }

    await refreshFinancialStatus(admin, existing.invoice_id);

    if (body.invoiceId && body.invoiceId !== existing.invoice_id) {
      await refreshFinancialStatus(admin, body.invoiceId);
    }

    return NextResponse.json({
      payment: normalizePayment(data),
    });
  } catch (error) {
    console.error("PAYMENTS PATCH SERVER ERROR:", error);
    return jsonError(
      error instanceof Error ? error.message : "Unable to update payment.",
      500
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const auth = await getAuthorizedUser();
    if (!auth.ok) return auth.response;

    const id = new URL(request.url).searchParams.get("id");

    if (!id) {
      return jsonError("Payment ID is required.");
    }

    const admin = getAdminClient();

    const { data: existing, error: existingError } = await admin
      .from("payments")
      .select("id, invoice_id")
      .eq("id", id)
      .maybeSingle();

    if (existingError) {
      console.error("PAYMENT DELETE LOOKUP ERROR:", existingError);
      return jsonError("Unable to find the payment.", 500);
    }

    if (!existing) {
      return jsonError("Payment was not found.", 404);
    }

    const { error } = await admin
      .from("payments")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("PAYMENTS DELETE ERROR:", error);
      return jsonError(error.message, 500);
    }

    await refreshFinancialStatus(admin, existing.invoice_id);

    return NextResponse.json({
      ok: true,
      message: "Payment deleted successfully.",
    });
  } catch (error) {
    console.error("PAYMENTS DELETE SERVER ERROR:", error);
    return jsonError(
      error instanceof Error ? error.message : "Unable to delete payment.",
      500
    );
  }
}
