// FILE: app/api/admin/invoices/route.ts
// PURPOSE: Vertex Studio Works — Invoices API
// Includes invoice line items and installment/payment-plan support.

import { NextRequest, NextResponse } from "next/server";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

type Role = "Owner" | "Admin" | "Manager" | "Staff";

type InvoiceItemPayload = {
  id?: string;
  description?: string;
  amount?: number;
  sortOrder?: number;
};

type InstallmentPayload = {
  id?: string;
  installmentNumber?: number;
  description?: string;
  percentage?: number | null;
  amount?: number;
  dueDate?: string | null;
  status?: string;
  paidAt?: string | null;
};

type InvoicePayload = {
  clientId?: string;
  projectId?: string | null;
  invoiceNumber?: string;
  status?: string;
  issueDate?: string;
  dueDate?: string | null;
  subtotal?: number;
  tax?: number;
  total?: number;
  notes?: string;
  items?: InvoiceItemPayload[];
  installments?: InstallmentPayload[];
};

const allowedStatuses = [
  "Draft",
  "Sent",
  "Paid",
  "Overdue",
  "Cancelled",
] as const;

const allowedInstallmentStatuses = [
  "Pending",
  "Due",
  "Paid",
  "Overdue",
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
      response: jsonError("You do not have permission to access Invoices.", 403),
    };
  }

  return { ok: true as const, user, role };
}

function normalizeInvoice(row: any, items: any[] = [], installments: any[] = []) {
  const client = Array.isArray(row.clients) ? row.clients[0] : row.clients;
  const project = Array.isArray(row.projects) ? row.projects[0] : row.projects;

  return {
    id: row.id,
    clientId: row.client_id,
    client: client?.company ?? client?.name ?? "Unknown Client",
    projectId: row.project_id ?? "",
    project: project?.name ?? "",
    invoiceNumber: row.invoice_number,
    status: row.status,
    issueDate: row.issue_date ?? "",
    dueDate: row.due_date ?? "",
    subtotal: Number(row.subtotal ?? 0),
    tax: Number(row.tax ?? 0),
    total: Number(row.total ?? 0),
    notes: row.notes ?? "",
    items: items.map((item) => ({
      id: item.id,
      description: item.description,
      amount: Number(item.amount ?? 0),
      sortOrder: Number(item.sort_order ?? 0),
    })),
    installments: installments.map((item) => ({
      id: item.id,
      installmentNumber: Number(item.installment_number ?? 0),
      description: item.description ?? "",
      percentage:
        item.percentage === null || item.percentage === undefined
          ? null
          : Number(item.percentage),
      amount: Number(item.amount ?? 0),
      dueDate: item.due_date ?? "",
      status: item.status,
      paidAt: item.paid_at ?? null,
    })),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function validatePayload(body: InvoicePayload, partial = false) {
  const errors: string[] = [];

  if (!partial || body.clientId !== undefined) {
    if (!body.clientId?.trim()) errors.push("Client is required.");
  }

  if (!partial || body.invoiceNumber !== undefined) {
    if (!body.invoiceNumber?.trim()) errors.push("Invoice number is required.");
  }

  if (body.status !== undefined && !allowedStatuses.includes(body.status as any)) {
    errors.push("Invalid invoice status.");
  }

  if (body.issueDate !== undefined && !body.issueDate) {
    errors.push("Issue date is required.");
  }

  if (body.subtotal !== undefined) {
    const subtotal = Number(body.subtotal);
    if (!Number.isFinite(subtotal) || subtotal < 0) {
      errors.push("Subtotal must be zero or greater.");
    }
  }

  if (body.tax !== undefined) {
    const tax = Number(body.tax);
    if (!Number.isFinite(tax) || tax < 0) {
      errors.push("Tax must be zero or greater.");
    }
  }

  if (body.total !== undefined) {
    const total = Number(body.total);
    if (!Number.isFinite(total) || total < 0) {
      errors.push("Total must be zero or greater.");
    }
  }

  if (body.items !== undefined) {
    if (!Array.isArray(body.items)) {
      errors.push("Invoice items must be an array.");
    } else {
      body.items.forEach((item, index) => {
        if (!item.description?.trim()) {
          errors.push(`Invoice item ${index + 1} needs a description.`);
        }

        const amount = Number(item.amount);
        if (!Number.isFinite(amount) || amount < 0) {
          errors.push(`Invoice item ${index + 1} amount is invalid.`);
        }
      });
    }
  }

  if (body.installments !== undefined) {
    if (!Array.isArray(body.installments)) {
      errors.push("Installments must be an array.");
    } else {
      body.installments.forEach((installment, index) => {
        const number = Number(installment.installmentNumber);
        const amount = Number(installment.amount);

        if (!Number.isInteger(number) || number < 1) {
          errors.push(`Installment ${index + 1} number is invalid.`);
        }

        if (!Number.isFinite(amount) || amount < 0) {
          errors.push(`Installment ${index + 1} amount is invalid.`);
        }

        if (installment.percentage !== null && installment.percentage !== undefined) {
          const percentage = Number(installment.percentage);
          if (!Number.isFinite(percentage) || percentage < 0 || percentage > 100) {
            errors.push(`Installment ${index + 1} percentage is invalid.`);
          }
        }

        if (
          installment.status !== undefined &&
          !allowedInstallmentStatuses.includes(installment.status as any)
        ) {
          errors.push(`Installment ${index + 1} status is invalid.`);
        }
      });
    }
  }

  return errors;
}

function validateFinancialBreakdown(body: InvoicePayload) {
  const errors: string[] = [];

  if (body.items !== undefined) {
    const subtotal = Number(body.subtotal ?? 0);
    const itemTotal = body.items.reduce(
      (sum, item) => sum + Number(item.amount ?? 0),
      0
    );

    if (Math.abs(itemTotal - subtotal) > 0.01) {
      errors.push("Invoice line items must add up to the invoice subtotal.");
    }
  }

  if (body.installments !== undefined && body.installments.length > 0) {
    const total = Number(body.total ?? 0);
    const installmentTotal = body.installments.reduce(
      (sum, item) => sum + Number(item.amount ?? 0),
      0
    );

    if (Math.abs(installmentTotal - total) > 0.01) {
      errors.push("Payment installments must add up to the invoice total.");
    }

    const percentages = body.installments
      .map((item) => item.percentage)
      .filter((value) => value !== null && value !== undefined)
      .map(Number);

    if (percentages.length > 0 && percentages.length === body.installments.length) {
      const percentageTotal = percentages.reduce((sum, value) => sum + value, 0);
      if (Math.abs(percentageTotal - 100) > 0.01) {
        errors.push("Payment plan percentages must add up to 100%.");
      }
    }

    const numbers = body.installments.map((item) => Number(item.installmentNumber));
    const uniqueNumbers = new Set(numbers);
    if (uniqueNumbers.size !== numbers.length) {
      errors.push("Installment numbers must be unique.");
    }
  }

  return errors;
}

async function validateRelationships(
  admin: ReturnType<typeof getAdminClient>,
  clientId?: string,
  projectId?: string | null
) {
  if (clientId) {
    const { data: client, error } = await admin
      .from("clients")
      .select("id")
      .eq("id", clientId)
      .maybeSingle();

    if (error) {
      console.error("INVOICE CLIENT LOOKUP ERROR:", error);
      return jsonError("Unable to verify the selected client.", 500);
    }

    if (!client) return jsonError("The selected client was not found.", 404);
  }

  if (projectId) {
    const { data: project, error } = await admin
      .from("projects")
      .select("id, client_id")
      .eq("id", projectId)
      .maybeSingle();

    if (error) {
      console.error("INVOICE PROJECT LOOKUP ERROR:", error);
      return jsonError("Unable to verify the selected project.", 500);
    }

    if (!project) return jsonError("The selected project was not found.", 404);

    if (clientId && project.client_id !== clientId) {
      return jsonError("The selected project does not belong to the selected client.");
    }
  }

  return null;
}

async function getInvoiceChildren(admin: ReturnType<typeof getAdminClient>, invoiceId: string) {
  const [{ data: items, error: itemsError }, { data: installments, error: installmentsError }] =
    await Promise.all([
      admin
        .from("invoice_items")
        .select("id, description, amount, sort_order")
        .eq("invoice_id", invoiceId)
        .order("sort_order", { ascending: true }),
      admin
        .from("invoice_installments")
        .select(
          "id, installment_number, description, percentage, amount, due_date, status, paid_at"
        )
        .eq("invoice_id", invoiceId)
        .order("installment_number", { ascending: true }),
    ]);

  if (itemsError) {
    console.error("INVOICE ITEMS GET ERROR:", itemsError);
    throw new Error(itemsError.message);
  }

  if (installmentsError) {
    console.error("INVOICE INSTALLMENTS GET ERROR:", installmentsError);
    throw new Error(installmentsError.message);
  }

  return { items: items ?? [], installments: installments ?? [] };
}

async function replaceInvoiceChildren(
  admin: ReturnType<typeof getAdminClient>,
  invoiceId: string,
  items: InvoiceItemPayload[] | undefined,
  installments: InstallmentPayload[] | undefined
) {
  if (items !== undefined) {
    const { error: deleteItemsError } = await admin
      .from("invoice_items")
      .delete()
      .eq("invoice_id", invoiceId);

    if (deleteItemsError) {
      throw new Error(deleteItemsError.message);
    }

    if (items.length > 0) {
      const { error: insertItemsError } = await admin.from("invoice_items").insert(
        items.map((item, index) => ({
          invoice_id: invoiceId,
          description: item.description!.trim(),
          amount: Number(item.amount ?? 0),
          sort_order: Number(item.sortOrder ?? index),
        }))
      );

      if (insertItemsError) {
        throw new Error(insertItemsError.message);
      }
    }
  }

  if (installments !== undefined) {
    const { error: deleteInstallmentsError } = await admin
      .from("invoice_installments")
      .delete()
      .eq("invoice_id", invoiceId);

    if (deleteInstallmentsError) {
      throw new Error(deleteInstallmentsError.message);
    }

    if (installments.length > 0) {
      const { error: insertInstallmentsError } = await admin
        .from("invoice_installments")
        .insert(
          installments.map((installment) => ({
            invoice_id: invoiceId,
            installment_number: Number(installment.installmentNumber),
            description: installment.description?.trim() ?? "",
            percentage:
              installment.percentage === null || installment.percentage === undefined
                ? null
                : Number(installment.percentage),
            amount: Number(installment.amount ?? 0),
            due_date: installment.dueDate || null,
            status: installment.status ?? "Pending",
            paid_at: installment.paidAt || null,
          }))
        );

      if (insertInstallmentsError) {
        throw new Error(insertInstallmentsError.message);
      }
    }
  }
}

async function selectInvoice(admin: ReturnType<typeof getAdminClient>, id: string) {
  const { data, error } = await admin
    .from("invoices")
    .select(
      `
        id,
        client_id,
        project_id,
        invoice_number,
        status,
        issue_date,
        due_date,
        subtotal,
        tax,
        total,
        notes,
        created_at,
        updated_at,
        clients (
          id,
          name,
          company
        ),
        projects (
          id,
          name
        )
      `
    )
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  const children = await getInvoiceChildren(admin, id);
  return normalizeInvoice(data, children.items, children.installments);
}

export async function GET() {
  try {
    const auth = await getAuthorizedUser();
    if (!auth.ok) return auth.response;

    const admin = getAdminClient();

    const { data, error } = await admin
      .from("invoices")
      .select(
        `
          id,
          client_id,
          project_id,
          invoice_number,
          status,
          issue_date,
          due_date,
          subtotal,
          tax,
          total,
          notes,
          created_at,
          updated_at,
          clients (
            id,
            name,
            company
          ),
          projects (
            id,
            name
          )
        `
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("INVOICES GET ERROR:", error);
      return jsonError(error.message, 500);
    }

    const invoices = await Promise.all(
      (data ?? []).map(async (row) => {
        const children = await getInvoiceChildren(admin, row.id);
        return normalizeInvoice(row, children.items, children.installments);
      })
    );

    return NextResponse.json({ invoices });
  } catch (error) {
    console.error("INVOICES GET SERVER ERROR:", error);
    return jsonError(
      error instanceof Error ? error.message : "Unable to load invoices.",
      500
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await getAuthorizedUser();
    if (!auth.ok) return auth.response;

    const body = (await request.json()) as InvoicePayload;
    const errors = validatePayload(body);
    errors.push(...validateFinancialBreakdown(body));

    if (errors.length > 0) return jsonError(errors.join(" "));

    const admin = getAdminClient();

    const relationshipError = await validateRelationships(
      admin,
      body.clientId,
      body.projectId
    );
    if (relationshipError) return relationshipError;

    const subtotal = Number(body.subtotal ?? 0);
    const tax = Number(body.tax ?? 0);
    const calculatedTotal = subtotal + tax;

    if (body.total !== undefined) {
      const suppliedTotal = Number(body.total);
      if (Math.abs(suppliedTotal - calculatedTotal) > 0.01) {
        return jsonError("Invoice total must equal subtotal plus tax.");
      }
    }

    const now = new Date().toISOString();

    const { data, error } = await admin
      .from("invoices")
      .insert({
        client_id: body.clientId,
        project_id: body.projectId || null,
        invoice_number: body.invoiceNumber!.trim(),
        status: body.status ?? "Draft",
        issue_date: body.issueDate ?? new Date().toISOString().slice(0, 10),
        due_date: body.dueDate || null,
        subtotal,
        tax,
        total: calculatedTotal,
        notes: body.notes?.trim() ?? "",
        updated_at: now,
      })
      .select("id")
      .single();

    if (error) {
      console.error("INVOICES POST ERROR:", error);
      if (error.code === "23505") {
        return jsonError("That invoice number already exists.", 409);
      }
      return jsonError(error.message, 500);
    }

    try {
      await replaceInvoiceChildren(admin, data.id, body.items, body.installments);
    } catch (childError) {
      console.error("INVOICE CHILDREN POST ERROR:", childError);
      await admin.from("invoices").delete().eq("id", data.id);
      return jsonError(
        childError instanceof Error
          ? childError.message
          : "Unable to save invoice details.",
        500
      );
    }

    const invoice = await selectInvoice(admin, data.id);

    return NextResponse.json({ invoice }, { status: 201 });
  } catch (error) {
    console.error("INVOICES POST SERVER ERROR:", error);
    return jsonError(
      error instanceof Error ? error.message : "Unable to create invoice.",
      500
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const auth = await getAuthorizedUser();
    if (!auth.ok) return auth.response;

    const body = (await request.json()) as InvoicePayload & { id?: string };

    if (!body.id?.trim()) return jsonError("Invoice ID is required.");

    const errors = validatePayload(body, true);
    errors.push(...validateFinancialBreakdown(body));
    if (errors.length > 0) return jsonError(errors.join(" "));

    const admin = getAdminClient();

    const { data: current, error: currentError } = await admin
      .from("invoices")
      .select("id, client_id, project_id, subtotal, tax")
      .eq("id", body.id)
      .maybeSingle();

    if (currentError) {
      console.error("INVOICE CURRENT LOOKUP ERROR:", currentError);
      return jsonError("Unable to load the invoice.", 500);
    }

    if (!current) return jsonError("Invoice not found.", 404);

    const nextClientId = body.clientId ?? current.client_id;
    const nextProjectId =
      body.projectId !== undefined ? body.projectId : current.project_id;

    const relationshipError = await validateRelationships(
      admin,
      nextClientId,
      nextProjectId
    );
    if (relationshipError) return relationshipError;

    const nextSubtotal =
      body.subtotal !== undefined
        ? Number(body.subtotal)
        : Number(current.subtotal ?? 0);
    const nextTax =
      body.tax !== undefined ? Number(body.tax) : Number(current.tax ?? 0);
    const nextTotal = nextSubtotal + nextTax;

    if (body.total !== undefined) {
      const suppliedTotal = Number(body.total);
      if (Math.abs(suppliedTotal - nextTotal) > 0.01) {
        return jsonError("Invoice total must equal subtotal plus tax.");
      }
    }

    const update: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
      subtotal: nextSubtotal,
      tax: nextTax,
      total: nextTotal,
    };

    if (body.clientId !== undefined) update.client_id = body.clientId;
    if (body.projectId !== undefined) update.project_id = body.projectId || null;
    if (body.invoiceNumber !== undefined) update.invoice_number = body.invoiceNumber.trim();
    if (body.status !== undefined) update.status = body.status;
    if (body.issueDate !== undefined) update.issue_date = body.issueDate;
    if (body.dueDate !== undefined) update.due_date = body.dueDate || null;
    if (body.notes !== undefined) update.notes = body.notes.trim();

    const { error: updateError } = await admin
      .from("invoices")
      .update(update)
      .eq("id", body.id);

    if (updateError) {
      console.error("INVOICES PATCH ERROR:", updateError);
      if (updateError.code === "23505") {
        return jsonError("That invoice number already exists.", 409);
      }
      return jsonError(updateError.message, 500);
    }

    try {
      await replaceInvoiceChildren(admin, body.id, body.items, body.installments);
    } catch (childError) {
      console.error("INVOICE CHILDREN PATCH ERROR:", childError);
      return jsonError(
        childError instanceof Error
          ? childError.message
          : "Unable to save invoice details.",
        500
      );
    }

    const invoice = await selectInvoice(admin, body.id);
    return NextResponse.json({ invoice });
  } catch (error) {
    console.error("INVOICES PATCH SERVER ERROR:", error);
    return jsonError(
      error instanceof Error ? error.message : "Unable to update invoice.",
      500
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const auth = await getAuthorizedUser();
    if (!auth.ok) return auth.response;

    const id = new URL(request.url).searchParams.get("id");
    if (!id) return jsonError("Invoice ID is required.");

    const admin = getAdminClient();

    const { error } = await admin.from("invoices").delete().eq("id", id);

    if (error) {
      console.error("INVOICES DELETE ERROR:", error);
      return jsonError(error.message, 500);
    }

    return NextResponse.json({
      ok: true,
      message: "Invoice deleted successfully.",
    });
  } catch (error) {
    console.error("INVOICES DELETE SERVER ERROR:", error);
    return jsonError(
      error instanceof Error ? error.message : "Unable to delete invoice.",
      500
    );
  }
}
