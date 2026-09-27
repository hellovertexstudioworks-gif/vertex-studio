// FILE: app/api/admin/projects/route.ts
// PURPOSE: Vertex Studio Works — Projects API
// NOTE: Projects belong to real Clients through projects.client_id.

import { NextRequest, NextResponse } from "next/server";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

type Role = "Owner" | "Admin" | "Manager" | "Staff";

type ProjectPayload = {
  clientId?: string;
  name?: string;
  description?: string;
  status?: string;
  progress?: number;
  value?: number;
  startDate?: string | null;
  dueDate?: string | null;
  category?: string;
};

const allowedStatuses = [
  "Planning",
  "In Progress",
  "Review",
  "Active",
  "On Hold",
  "Completed",
] as const;

const allowedCategories = [
  "Website",
  "Marketing",
  "Business System",
  "SEO",
  "E-commerce",
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
      response: jsonError("Unable to verify project permissions.", 403),
    };
  }

  const permissions =
    rolePermission.permissions &&
    typeof rolePermission.permissions === "object"
      ? (rolePermission.permissions as Record<string, unknown>)
      : {};

  if (permissions.projects !== true) {
    return {
      ok: false as const,
      response: jsonError("You do not have permission to access Projects.", 403),
    };
  }

  return { ok: true as const, user, role };
}

function normalizeProject(row: any) {
  const client = Array.isArray(row.clients) ? row.clients[0] : row.clients;

  return {
    id: row.id,
    name: row.name,
    client: client?.company ?? client?.name ?? "Unknown Client",
    clientId: row.client_id,
    description: row.description ?? "",
    status: row.status,
    progress: Number(row.progress ?? 0),
    value: Number(row.value ?? 0),
    startDate: row.start_date ?? "",
    dueDate: row.due_date ?? "",
    lastActivity: row.last_activity ?? row.updated_at ?? row.created_at,
    category: row.category,
  };
}

function validatePayload(body: ProjectPayload, partial = false) {
  const errors: string[] = [];

  if (!partial || body.clientId !== undefined) {
    if (!body.clientId?.trim()) errors.push("Client is required.");
  }

  if (!partial || body.name !== undefined) {
    if (!body.name?.trim()) errors.push("Project name is required.");
  }

  if (body.status !== undefined && !allowedStatuses.includes(body.status as any)) {
    errors.push("Invalid project status.");
  }

  if (body.category !== undefined && !allowedCategories.includes(body.category as any)) {
    errors.push("Invalid project category.");
  }

  if (body.progress !== undefined) {
    const progress = Number(body.progress);
    if (!Number.isFinite(progress) || progress < 0 || progress > 100) {
      errors.push("Progress must be between 0 and 100.");
    }
  }

  if (body.value !== undefined) {
    const value = Number(body.value);
    if (!Number.isFinite(value) || value < 0) {
      errors.push("Project value must be zero or greater.");
    }
  }

  return errors;
}

export async function GET() {
  try {
    const auth = await getAuthorizedUser();
    if (!auth.ok) return auth.response;

    const admin = getAdminClient();

    const { data, error } = await admin
      .from("projects")
      .select(
        `
          id,
          client_id,
          name,
          description,
          status,
          progress,
          value,
          start_date,
          due_date,
          category,
          last_activity,
          created_at,
          updated_at,
          clients (
            id,
            name,
            company
          )
        `
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("PROJECTS GET ERROR:", error);
      return jsonError(error.message, 500);
    }

    return NextResponse.json({
      projects: (data ?? []).map(normalizeProject),
    });
  } catch (error) {
    console.error("PROJECTS GET SERVER ERROR:", error);
    return jsonError(
      error instanceof Error ? error.message : "Unable to load projects.",
      500
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await getAuthorizedUser();
    if (!auth.ok) return auth.response;

    const body = (await request.json()) as ProjectPayload;
    const errors = validatePayload(body);

    if (errors.length > 0) {
      return jsonError(errors.join(" "));
    }

    const admin = getAdminClient();

    const { data: client, error: clientError } = await admin
      .from("clients")
      .select("id")
      .eq("id", body.clientId!)
      .maybeSingle();

    if (clientError) {
      console.error("PROJECT CLIENT LOOKUP ERROR:", clientError);
      return jsonError("Unable to verify the selected client.", 500);
    }

    if (!client) {
      return jsonError("The selected client was not found.", 404);
    }

    const now = new Date().toISOString();

    const { data, error } = await admin
      .from("projects")
      .insert({
        client_id: body.clientId,
        name: body.name!.trim(),
        description: body.description?.trim() ?? "",
        status: body.status ?? "Planning",
        progress: Number(body.progress ?? 0),
        value: Number(body.value ?? 0),
        start_date: body.startDate || null,
        due_date: body.dueDate || null,
        category: body.category ?? "Website",
        last_activity: now,
        updated_at: now,
      })
      .select(
        `
          id,
          client_id,
          name,
          description,
          status,
          progress,
          value,
          start_date,
          due_date,
          category,
          last_activity,
          created_at,
          updated_at,
          clients (
            id,
            name,
            company
          )
        `
      )
      .single();

    if (error) {
      console.error("PROJECTS POST ERROR:", error);
      return jsonError(error.message, 500);
    }

    return NextResponse.json(
      { project: normalizeProject(data) },
      { status: 201 }
    );
  } catch (error) {
    console.error("PROJECTS POST SERVER ERROR:", error);
    return jsonError(
      error instanceof Error ? error.message : "Unable to create project.",
      500
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const auth = await getAuthorizedUser();
    if (!auth.ok) return auth.response;

    const body = (await request.json()) as ProjectPayload & { id?: string };

    if (!body.id?.trim()) {
      return jsonError("Project ID is required.");
    }

    const errors = validatePayload(body, true);

    if (errors.length > 0) {
      return jsonError(errors.join(" "));
    }

    const admin = getAdminClient();

    if (body.clientId !== undefined) {
      const { data: client, error: clientError } = await admin
        .from("clients")
        .select("id")
        .eq("id", body.clientId)
        .maybeSingle();

      if (clientError) {
        console.error("PROJECT CLIENT LOOKUP ERROR:", clientError);
        return jsonError("Unable to verify the selected client.", 500);
      }

      if (!client) {
        return jsonError("The selected client was not found.", 404);
      }
    }

    const update: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
      last_activity: new Date().toISOString(),
    };

    if (body.clientId !== undefined) update.client_id = body.clientId;
    if (body.name !== undefined) update.name = body.name.trim();
    if (body.description !== undefined) update.description = body.description.trim();
    if (body.status !== undefined) update.status = body.status;
    if (body.progress !== undefined) update.progress = Number(body.progress);
    if (body.value !== undefined) update.value = Number(body.value);
    if (body.startDate !== undefined) update.start_date = body.startDate || null;
    if (body.dueDate !== undefined) update.due_date = body.dueDate || null;
    if (body.category !== undefined) update.category = body.category;

    const { data, error } = await admin
      .from("projects")
      .update(update)
      .eq("id", body.id)
      .select(
        `
          id,
          client_id,
          name,
          description,
          status,
          progress,
          value,
          start_date,
          due_date,
          category,
          last_activity,
          created_at,
          updated_at,
          clients (
            id,
            name,
            company
          )
        `
      )
      .single();

    if (error) {
      console.error("PROJECTS PATCH ERROR:", error);
      return jsonError(error.message, 500);
    }

    return NextResponse.json({
      project: normalizeProject(data),
    });
  } catch (error) {
    console.error("PROJECTS PATCH SERVER ERROR:", error);
    return jsonError(
      error instanceof Error ? error.message : "Unable to update project.",
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
      return jsonError("Project ID is required.");
    }

    const admin = getAdminClient();

    const { error } = await admin
      .from("projects")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("PROJECTS DELETE ERROR:", error);
      return jsonError(error.message, 500);
    }

    return NextResponse.json({
      ok: true,
      message: "Project deleted successfully.",
    });
  } catch (error) {
    console.error("PROJECTS DELETE SERVER ERROR:", error);
    return jsonError(
      error instanceof Error ? error.message : "Unable to delete project.",
      500
    );
  }
}
