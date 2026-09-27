// FILE: app/api/admin/contracts/pdf/route.ts
// PURPOSE: Generate / preview / download a client-facing Vertex contract PDF.
// DO NOT modify app/globals.css.

import { NextRequest, NextResponse } from "next/server";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import {
  createContractPdf,
  getContractPdfFilename,
} from "@/lib/contracts/pdf";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
      detectSessionInUrl: false,
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

  if (profile.role === "Owner") {
    return { ok: true as const };
  }

  const { data: permissionRow, error: permissionError } = await supabase
    .from("role_permissions")
    .select("permissions")
    .eq("role", profile.role)
    .maybeSingle();

  if (permissionError || !permissionRow) {
    return {
      ok: false as const,
      response: jsonError(
        "Unable to verify finance permissions.",
        403
      ),
    };
  }

  const permissions =
    permissionRow.permissions &&
    typeof permissionRow.permissions === "object" &&
    !Array.isArray(permissionRow.permissions)
      ? (permissionRow.permissions as Record<string, unknown>)
      : {};

  if (permissions.finance !== true) {
    return {
      ok: false as const,
      response: jsonError(
        "You do not have permission to access contracts.",
        403
      ),
    };
  }

  return { ok: true as const };
}

function normalize(row: any) {
  const client = Array.isArray(row?.clients)
    ? row.clients[0]
    : row?.clients;

  const project = Array.isArray(row?.projects)
    ? row.projects[0]
    : row?.projects;

  return {
    id: String(row.id),
    contractNumber: String(row.contract_number ?? ""),
    title: String(row.title ?? "Contract"),
    status: String(row.status ?? "Draft"),
    startDate: row.start_date ?? null,
    endDate: row.end_date ?? null,
    contractValue: Number(row.contract_value ?? 0),
    scope: String(row.scope ?? ""),
    terms: String(row.terms ?? ""),
    clientSigned: Boolean(row.client_signed),
    clientSignedAt: row.client_signed_at ?? null,
    documentUrl: String(row.document_url ?? ""),
    notes: String(row.notes ?? ""),
    creationMethod: String(row.creation_method ?? "Manual"),
    serviceCategory: String(row.service_category ?? ""),
    servicePackage: String(row.service_package ?? ""),
    paymentPlan: String(row.payment_plan ?? "Custom"),
    paymentSchedule: Array.isArray(row.payment_schedule)
      ? row.payment_schedule
      : [],
    complimentaryCareMonths: Number(
      row.complimentary_care_months ?? 0
    ),
    carePlan: String(row.care_plan ?? ""),
    client: client
      ? {
          name: String(client.name ?? ""),
          company: String(client.company ?? ""),
          email: String(client.email ?? ""),
        }
      : null,
    project: project
      ? {
          name: String(project.name ?? ""),
        }
      : null,
  };
}

export async function GET(request: NextRequest) {
  const auth = await getAuthorizedUser();

  if (!auth.ok) {
    return auth.response;
  }

  const id = request.nextUrl.searchParams.get("id")?.trim();

  if (!id) {
    return jsonError("Contract ID is required.", 400);
  }

  const download =
    request.nextUrl.searchParams.get("download") === "1";

  try {
    const admin = getAdminClient();

    const { data, error } = await admin
      .from("contracts")
      .select(`
        id,
        contract_number,
        title,
        status,
        start_date,
        end_date,
        contract_value,
        scope,
        terms,
        client_signed,
        client_signed_at,
        document_url,
        notes,
        creation_method,
        service_category,
        service_package,
        payment_plan,
        payment_schedule,
        complimentary_care_months,
        care_plan,
        clients (name, company, email),
        projects (name)
      `)
      .eq("id", id)
      .maybeSingle();

    if (error) {
      return jsonError(error.message, 500);
    }

    if (!data) {
      return jsonError("Contract not found.", 404);
    }

    const contract = normalize(data);

    const buffer = await createContractPdf(contract);
    const body = new Uint8Array(buffer);
    const filename = getContractPdfFilename(contract);

    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `${
          download ? "attachment" : "inline"
        }; filename="${filename}"`,
        "Content-Length": String(body.byteLength),
        "Cache-Control": "no-store, no-transform",
      },
    });
  } catch (error) {
    return jsonError(
      error instanceof Error
        ? error.message
        : "Unable to generate contract PDF.",
      500
    );
  }
}
