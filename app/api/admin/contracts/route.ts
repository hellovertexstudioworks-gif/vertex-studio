// FILE: app/api/admin/contracts/route.ts
// PURPOSE: Vertex Studio Works — Contracts API with package/payment template data.

import { NextRequest, NextResponse } from "next/server";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

type Role = "Owner" | "Admin" | "Manager" | "Staff";
type PaymentPlan = "2 Payments" | "3 Payments" | "4 Payments" | "Monthly" | "Custom";

type ContractPayload = {
  id?: string; clientId?: string; projectId?: string | null; contractNumber?: string; title?: string; status?: string;
  startDate?: string | null; endDate?: string | null; contractValue?: number; scope?: string; terms?: string;
  clientSigned?: boolean; clientSignedAt?: string | null; documentUrl?: string; notes?: string;
  creationMethod?: "Vertex Package" | "Manual"; serviceCategory?: string; servicePackage?: string;
  paymentPlan?: PaymentPlan; paymentSchedule?: unknown[]; complimentaryCareMonths?: number; carePlan?: string;
};

const allowedStatuses = ["Draft", "Sent", "Review", "Signed", "Active", "Completed", "Expired", "Cancelled"] as const;
const allowedPlans: PaymentPlan[] = ["2 Payments", "3 Payments", "4 Payments", "Monthly", "Custom"];

function jsonError(message: string, status = 400) { return NextResponse.json({ message }, { status }); }
function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL; const secret = process.env.SUPABASE_SECRET_KEY;
  if (!url || !secret) throw new Error("Supabase server environment variables are missing.");
  return createSupabaseClient(url, secret, { auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false } });
}

async function getAuthorizedUser() {
  const supabase = await createServerClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) return { ok: false as const, response: jsonError("You must be signed in.", 401) };
  const { data: profile, error: profileError } = await supabase.from("profiles").select("role, status").eq("id", user.id).maybeSingle();
  if (profileError || !profile) return { ok: false as const, response: jsonError("Unable to verify your profile.", 403) };
  if (profile.status !== "Active") return { ok: false as const, response: jsonError("Your account is not active.", 403) };
  const role = profile.role as Role;
  if (role === "Owner") return { ok: true as const, user, role };
  const { data: rp, error } = await supabase.from("role_permissions").select("permissions").eq("role", role).maybeSingle();
  if (error || !rp) return { ok: false as const, response: jsonError("Unable to verify finance permissions.", 403) };
  const permissions = rp.permissions && typeof rp.permissions === "object" ? rp.permissions as Record<string, unknown> : {};
  if (permissions.finance !== true) return { ok: false as const, response: jsonError("You do not have permission to manage contracts.", 403) };
  return { ok: true as const, user, role };
}

function normalizeContract(row: any) {
  const client = Array.isArray(row?.clients) ? row.clients[0] : row?.clients;
  const project = Array.isArray(row?.projects) ? row.projects[0] : row?.projects;
  return {
    id: row.id, clientId: row.client_id, projectId: row.project_id, contractNumber: row.contract_number, title: row.title,
    status: row.status, startDate: row.start_date, endDate: row.end_date, contractValue: Number(row.contract_value ?? 0),
    scope: row.scope, terms: row.terms, clientSigned: row.client_signed, clientSignedAt: row.client_signed_at,
    documentUrl: row.document_url, notes: row.notes, creationMethod: row.creation_method, serviceCategory: row.service_category,
    servicePackage: row.service_package, paymentPlan: row.payment_plan, paymentSchedule: Array.isArray(row.payment_schedule) ? row.payment_schedule : [],
    complimentaryCareMonths: Number(row.complimentary_care_months ?? 0), carePlan: row.care_plan,
    createdAt: row.created_at, updatedAt: row.updated_at,
    client: client ? { id: client.id, name: client.name, company: client.company, email: client.email } : null,
    project: project ? { id: project.id, name: project.name } : null,
  };
}

function validateSchedule(plan: PaymentPlan, schedule: unknown, total: number) {
  if (!Array.isArray(schedule)) return "Payment schedule must be an array.";
  if (schedule.length === 0) return "Payment schedule cannot be empty.";
  for (const item of schedule as any[]) {
    if (!item || typeof item !== "object") return "Each payment stage must be an object.";
    const amount = Number(item.amount);
    if (!Number.isFinite(amount) || amount < 0) return "Each payment amount must be a valid non-negative number.";
    if (!String(item.label ?? "").trim()) return "Each payment stage needs a label.";
  }
  if (plan !== "Custom" && plan !== "Monthly") {
    const sum = (schedule as any[]).reduce((n, item) => n + Number(item.amount || 0), 0);
    if (Math.abs(sum - total) > 0.02) return "Payment schedule must equal the contract value.";
  }
  return null;
}

function validatePayload(payload: ContractPayload) {
  if (!payload.clientId) return "Client is required.";
  if (!payload.contractNumber?.trim()) return "Contract number is required.";
  if (!payload.title?.trim()) return "Contract title is required.";
  if (payload.status && !allowedStatuses.includes(payload.status as any)) return "Invalid contract status.";
  if (payload.creationMethod && !["Vertex Package", "Manual"].includes(payload.creationMethod)) return "Invalid creation method.";
  if (payload.paymentPlan && !allowedPlans.includes(payload.paymentPlan)) return "Invalid payment plan.";
  const value = Number(payload.contractValue ?? 0);
  if (!Number.isFinite(value) || value < 0) return "Contract value must be a valid non-negative number.";
  if (payload.startDate && payload.endDate && payload.endDate < payload.startDate) return "End date cannot be before the start date.";
  const care = Number(payload.complimentaryCareMonths ?? 0);
  if (!Number.isInteger(care) || care < 0) return "Complimentary care months must be a non-negative integer.";
  const scheduleError = validateSchedule(payload.paymentPlan ?? "Custom", payload.paymentSchedule ?? [], value);
  if (scheduleError) return scheduleError;
  return null;
}

function dbPayload(p: ContractPayload) {
  return {
    client_id: p.clientId, project_id: p.projectId || null, contract_number: p.contractNumber?.trim(), title: p.title?.trim(), status: p.status ?? "Draft",
    start_date: p.startDate || null, end_date: p.endDate || null, contract_value: Number(p.contractValue ?? 0), scope: p.scope?.trim() ?? "", terms: p.terms?.trim() ?? "",
    client_signed: Boolean(p.clientSigned), client_signed_at: p.clientSignedAt || null, document_url: p.documentUrl?.trim() ?? "", notes: p.notes?.trim() ?? "",
    creation_method: p.creationMethod ?? "Manual", service_category: p.serviceCategory?.trim() ?? "", service_package: p.servicePackage?.trim() ?? "",
    payment_plan: p.paymentPlan ?? "Custom", payment_schedule: p.paymentSchedule ?? [], complimentary_care_months: Number(p.complimentaryCareMonths ?? 0),
    care_plan: p.carePlan?.trim() ?? "", updated_at: new Date().toISOString(),
  };
}

async function validateRelationships(admin: ReturnType<typeof getAdminClient>, clientId: string, projectId?: string | null) {
  const { data: client, error: ce } = await admin.from("clients").select("id").eq("id", clientId).maybeSingle();
  if (ce) throw new Error("Unable to verify the selected client.");
  if (!client) throw new Error("The selected client does not exist.");
  if (projectId) {
    const { data: project, error: pe } = await admin.from("projects").select("id, client_id").eq("id", projectId).maybeSingle();
    if (pe) throw new Error("Unable to verify the selected project.");
    if (!project) throw new Error("The selected project does not exist.");
    if (project.client_id !== clientId) throw new Error("The selected project does not belong to the selected client.");
  }
}

const SELECT = `id, client_id, project_id, contract_number, title, status, start_date, end_date, contract_value, scope, terms, client_signed, client_signed_at, document_url, notes, creation_method, service_category, service_package, payment_plan, payment_schedule, complimentary_care_months, care_plan, created_at, updated_at, clients (id, name, company, email), projects (id, name)`;

export async function GET() {
  try {
    const authorized = await getAuthorizedUser(); if (!authorized.ok) return authorized.response;
    const admin = getAdminClient();
    const [{ data: contracts, error: contractsError }, { data: clients, error: clientsError }, { data: projects, error: projectsError }] = await Promise.all([
      admin.from("contracts").select(SELECT).order("created_at", { ascending: false }),
      admin.from("clients").select("id, name, company, email").order("company", { ascending: true }),
      admin.from("projects").select("id, name, client_id").order("name", { ascending: true }),
    ]);
    if (contractsError) throw new Error(contractsError.message);
    if (clientsError) throw new Error(clientsError.message);
    if (projectsError) throw new Error(projectsError.message);
    return NextResponse.json({ contracts: (contracts ?? []).map(normalizeContract), clients: clients ?? [], projects: projects ?? [] });
  } catch (error) { console.error("GET /api/admin/contracts", error); return jsonError(error instanceof Error ? error.message : "Unable to load contracts.", 500); }
}

export async function POST(request: NextRequest) {
  try {
    const authorized = await getAuthorizedUser(); if (!authorized.ok) return authorized.response;
    const payload = await request.json() as ContractPayload;
    const validation = validatePayload(payload); if (validation) return jsonError(validation);
    const admin = getAdminClient(); await validateRelationships(admin, payload.clientId!, payload.projectId);
    const { data: duplicate, error: de } = await admin.from("contracts").select("id").eq("contract_number", payload.contractNumber!.trim()).maybeSingle();
    if (de) return jsonError("Unable to verify the contract number.", 500);
    if (duplicate) return jsonError("That contract number already exists. Please use a different number.", 409);
    const { data, error } = await admin.from("contracts").insert(dbPayload(payload)).select(SELECT).single();
    if (error) return jsonError(error.message, 400);
    return NextResponse.json({ contract: normalizeContract(data) }, { status: 201 });
  } catch (error) { console.error("POST /api/admin/contracts", error); return jsonError(error instanceof Error ? error.message : "Unable to create contract.", 500); }
}

export async function PATCH(request: NextRequest) {
  try {
    const authorized = await getAuthorizedUser(); if (!authorized.ok) return authorized.response;
    const payload = await request.json() as ContractPayload; if (!payload.id) return jsonError("Contract ID is required.");
    const validation = validatePayload(payload); if (validation) return jsonError(validation);
    const admin = getAdminClient(); await validateRelationships(admin, payload.clientId!, payload.projectId);
    const { data: existing, error: ee } = await admin.from("contracts").select("id").eq("id", payload.id).maybeSingle();
    if (ee) return jsonError("Unable to find the contract.", 500); if (!existing) return jsonError("Contract not found.", 404);
    const { data: duplicate, error: de } = await admin.from("contracts").select("id").eq("contract_number", payload.contractNumber!.trim()).neq("id", payload.id).maybeSingle();
    if (de) return jsonError("Unable to verify the contract number.", 500); if (duplicate) return jsonError("That contract number is already used by another contract.", 409);
    const { data, error } = await admin.from("contracts").update(dbPayload(payload)).eq("id", payload.id).select(SELECT).single();
    if (error) return jsonError(error.message, 400);
    return NextResponse.json({ contract: normalizeContract(data) });
  } catch (error) { console.error("PATCH /api/admin/contracts", error); return jsonError(error instanceof Error ? error.message : "Unable to update contract.", 500); }
}

export async function DELETE(request: NextRequest) {
  try {
    const authorized = await getAuthorizedUser(); if (!authorized.ok) return authorized.response;
    const id = new URL(request.url).searchParams.get("id"); if (!id) return jsonError("Contract ID is required.");
    const admin = getAdminClient();
    const { data: existing, error: ee } = await admin.from("contracts").select("id").eq("id", id).maybeSingle();
    if (ee) return jsonError("Unable to find the contract.", 500); if (!existing) return jsonError("Contract not found.", 404);
    const { error } = await admin.from("contracts").delete().eq("id", id); if (error) return jsonError(error.message, 400);
    return NextResponse.json({ success: true, message: "Contract deleted successfully." });
  } catch (error) { console.error("DELETE /api/admin/contracts", error); return jsonError(error instanceof Error ? error.message : "Unable to delete contract.", 500); }
}
