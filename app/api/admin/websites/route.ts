// FILE: app/api/admin/websites/route.ts
// PURPOSE: Vertex Studio Works — Websites API
// NOTE: Websites connect real Clients to optional Projects, domains, hosting, status, and maintenance.

import { NextRequest, NextResponse } from "next/server";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

type Role = "Owner" | "Admin" | "Manager" | "Staff";

type WebsitePayload = {
  clientId?: string;
  projectId?: string | null;
  name?: string;
  websiteUrl?: string;
  domain?: string;
  hostingProvider?: string;
  status?: string;
  maintenanceStatus?: string;
  launchDate?: string | null;
  notes?: string;
};

const allowedHostingProviders = [
  "",
  "Vercel",
  "Netlify",
  "Hostinger",
  "GoDaddy",
  "Cloudflare",
  "SiteGround",
  "Other",
] as const;

const allowedStatuses = [
  "Development",
  "Review",
  "Live",
  "Maintenance",
  "Offline",
] as const;

const allowedMaintenanceStatuses = [
  "Not Enrolled",
  "Active",
  "Paused",
  "Expired",
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

  return {
    ok: true as const,
    user,
    role: profile.role as Role,
  };
}

function normalizeWebsite(row: any) {
  const client = Array.isArray(row.clients) ? row.clients[0] : row.clients;
  const project = Array.isArray(row.projects) ? row.projects[0] : row.projects;

  return {
    id: row.id,
    clientId: row.client_id,
    client: client?.company ?? client?.name ?? "Unknown Client",
    projectId: row.project_id ?? "",
    project: project?.name ?? "",
    name: row.name,
    websiteUrl: row.website_url ?? "",
    domain: row.domain ?? "",
    hostingProvider: row.hosting_provider ?? "",
    status: row.status,
    maintenanceStatus: row.maintenance_status,
    launchDate: row.launch_date ?? "",
    notes: row.notes ?? "",
    lastActivity:
      row.last_activity ?? row.updated_at ?? row.created_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function validatePayload(body: WebsitePayload, partial = false) {
  const errors: string[] = [];

  if (!partial || body.clientId !== undefined) {
    if (!body.clientId?.trim()) {
      errors.push("Client is required.");
    }
  }

  if (!partial || body.name !== undefined) {
    if (!body.name?.trim()) {
      errors.push("Website name is required.");
    }
  }

  if (
    body.hostingProvider !== undefined &&
    !allowedHostingProviders.includes(
      body.hostingProvider as (typeof allowedHostingProviders)[number]
    )
  ) {
    errors.push("Invalid hosting provider.");
  }

  if (
    body.status !== undefined &&
    !allowedStatuses.includes(
      body.status as (typeof allowedStatuses)[number]
    )
  ) {
    errors.push("Invalid website status.");
  }

  if (
    body.maintenanceStatus !== undefined &&
    !allowedMaintenanceStatuses.includes(
      body.maintenanceStatus as (typeof allowedMaintenanceStatuses)[number]
    )
  ) {
    errors.push("Invalid maintenance status.");
  }

  return errors;
}

async function verifyClientAndProject(
  admin: ReturnType<typeof getAdminClient>,
  clientId: string,
  projectId?: string | null
) {
  const { data: client, error: clientError } = await admin
    .from("clients")
    .select("id")
    .eq("id", clientId)
    .maybeSingle();

  if (clientError) {
    console.error("WEBSITE CLIENT LOOKUP ERROR:", clientError);
    return { ok: false as const, response: jsonError("Unable to verify the selected client.", 500) };
  }

  if (!client) {
    return { ok: false as const, response: jsonError("The selected client was not found.", 404) };
  }

  if (projectId) {
    const { data: project, error: projectError } = await admin
      .from("projects")
      .select("id, client_id")
      .eq("id", projectId)
      .maybeSingle();

    if (projectError) {
      console.error("WEBSITE PROJECT LOOKUP ERROR:", projectError);
      return { ok: false as const, response: jsonError("Unable to verify the selected project.", 500) };
    }

    if (!project) {
      return { ok: false as const, response: jsonError("The selected project was not found.", 404) };
    }

    if (project.client_id !== clientId) {
      return {
        ok: false as const,
        response: jsonError("The selected project does not belong to the selected client.", 400),
      };
    }
  }

  return { ok: true as const };
}

export async function GET() {
  try {
    const auth = await getAuthorizedUser();
    if (!auth.ok) return auth.response;

    const admin = getAdminClient();

    const { data, error } = await admin
      .from("websites")
      .select(
        `
          id,
          client_id,
          project_id,
          name,
          website_url,
          domain,
          hosting_provider,
          status,
          maintenance_status,
          launch_date,
          notes,
          last_activity,
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
      console.error("WEBSITES GET ERROR:", error);
      return jsonError(error.message, 500);
    }

    return NextResponse.json({
      websites: (data ?? []).map(normalizeWebsite),
    });
  } catch (error) {
    console.error("WEBSITES GET SERVER ERROR:", error);

    return jsonError(
      error instanceof Error ? error.message : "Unable to load websites.",
      500
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await getAuthorizedUser();
    if (!auth.ok) return auth.response;

    const body = (await request.json()) as WebsitePayload;
    const errors = validatePayload(body);

    if (errors.length > 0) {
      return jsonError(errors.join(" "));
    }

    const admin = getAdminClient();

    const relationshipCheck = await verifyClientAndProject(
      admin,
      body.clientId!,
      body.projectId
    );

    if (!relationshipCheck.ok) {
      return relationshipCheck.response;
    }

    const now = new Date().toISOString();

    const { data, error } = await admin
      .from("websites")
      .insert({
        client_id: body.clientId,
        project_id: body.projectId || null,
        name: body.name!.trim(),
        website_url: body.websiteUrl?.trim() ?? "",
        domain: body.domain?.trim() ?? "",
        hosting_provider: body.hostingProvider ?? "",
        status: body.status ?? "Development",
        maintenance_status: body.maintenanceStatus ?? "Not Enrolled",
        launch_date: body.launchDate || null,
        notes: body.notes?.trim() ?? "",
        last_activity: now,
        updated_at: now,
      })
      .select(
        `
          id,
          client_id,
          project_id,
          name,
          website_url,
          domain,
          hosting_provider,
          status,
          maintenance_status,
          launch_date,
          notes,
          last_activity,
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
      .single();

    if (error) {
      console.error("WEBSITES POST ERROR:", error);
      return jsonError(error.message, 500);
    }

    return NextResponse.json(
      { website: normalizeWebsite(data) },
      { status: 201 }
    );
  } catch (error) {
    console.error("WEBSITES POST SERVER ERROR:", error);

    return jsonError(
      error instanceof Error ? error.message : "Unable to create website.",
      500
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const auth = await getAuthorizedUser();
    if (!auth.ok) return auth.response;

    const body = (await request.json()) as WebsitePayload & { id?: string };

    if (!body.id?.trim()) {
      return jsonError("Website ID is required.");
    }

    const errors = validatePayload(body, true);

    if (errors.length > 0) {
      return jsonError(errors.join(" "));
    }

    const admin = getAdminClient();

    if (body.clientId !== undefined) {
      const relationshipCheck = await verifyClientAndProject(
        admin,
        body.clientId,
        body.projectId
      );

      if (!relationshipCheck.ok) {
        return relationshipCheck.response;
      }
    } else if (body.projectId !== undefined && body.projectId) {
      const { data: currentWebsite, error: currentError } = await admin
        .from("websites")
        .select("client_id")
        .eq("id", body.id)
        .maybeSingle();

      if (currentError || !currentWebsite) {
        return jsonError("Website was not found.", 404);
      }

      const relationshipCheck = await verifyClientAndProject(
        admin,
        currentWebsite.client_id,
        body.projectId
      );

      if (!relationshipCheck.ok) {
        return relationshipCheck.response;
      }
    }

    const now = new Date().toISOString();

    const update: Record<string, unknown> = {
      updated_at: now,
      last_activity: now,
    };

    if (body.clientId !== undefined) update.client_id = body.clientId;
    if (body.projectId !== undefined) update.project_id = body.projectId || null;
    if (body.name !== undefined) update.name = body.name.trim();
    if (body.websiteUrl !== undefined) update.website_url = body.websiteUrl.trim();
    if (body.domain !== undefined) update.domain = body.domain.trim();
    if (body.hostingProvider !== undefined) {
      update.hosting_provider = body.hostingProvider;
    }
    if (body.status !== undefined) update.status = body.status;
    if (body.maintenanceStatus !== undefined) {
      update.maintenance_status = body.maintenanceStatus;
    }
    if (body.launchDate !== undefined) {
      update.launch_date = body.launchDate || null;
    }
    if (body.notes !== undefined) update.notes = body.notes.trim();

    const { data, error } = await admin
      .from("websites")
      .update(update)
      .eq("id", body.id)
      .select(
        `
          id,
          client_id,
          project_id,
          name,
          website_url,
          domain,
          hosting_provider,
          status,
          maintenance_status,
          launch_date,
          notes,
          last_activity,
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
      .single();

    if (error) {
      console.error("WEBSITES PATCH ERROR:", error);
      return jsonError(error.message, 500);
    }

    return NextResponse.json({
      website: normalizeWebsite(data),
    });
  } catch (error) {
    console.error("WEBSITES PATCH SERVER ERROR:", error);

    return jsonError(
      error instanceof Error ? error.message : "Unable to update website.",
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
      return jsonError("Website ID is required.");
    }

    const admin = getAdminClient();

    const { error } = await admin
      .from("websites")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("WEBSITES DELETE ERROR:", error);
      return jsonError(error.message, 500);
    }

    return NextResponse.json({
      ok: true,
      message: "Website deleted successfully.",
    });
  } catch (error) {
    console.error("WEBSITES DELETE SERVER ERROR:", error);

    return jsonError(
      error instanceof Error ? error.message : "Unable to delete website.",
      500
    );
  }
}
