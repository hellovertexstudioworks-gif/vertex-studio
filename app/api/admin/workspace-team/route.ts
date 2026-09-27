import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

type Role = "Owner" | "Admin" | "Manager" | "Staff";

const allowedDepartments = [
  "Development",
  "Design",
  "Marketing",
  "Sales",
  "Operations",
  "Support",
] as const;

const allowedWorkloads = ["Light", "Balanced", "Busy", "Full"] as const;

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!url || !secretKey) {
    throw new Error("Supabase server environment variables are missing.");
  }

  return createAdminClient(url, secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

async function getAuthorizedCaller() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: NextResponse.json({ message: "Unauthorized." }, { status: 401 }) };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role, status")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError || !profile) {
    return {
      error: NextResponse.json(
        { message: "Your Vertex Studio profile could not be verified." },
        { status: 403 }
      ),
    };
  }

  if (profile.status !== "Active") {
    return {
      error: NextResponse.json(
        { message: "Your account is not active." },
        { status: 403 }
      ),
    };
  }

  const role = profile.role as Role;

  if (role === "Owner") {
    return { user, role };
  }

  const { data: permissionRow, error: permissionError } = await supabase
    .from("role_permissions")
    .select("permissions")
    .eq("role", role)
    .maybeSingle();

  if (permissionError || !permissionRow) {
    return {
      error: NextResponse.json(
        { message: "Workspace Team permission could not be verified." },
        { status: 403 }
      ),
    };
  }

  const permissions =
    permissionRow.permissions &&
    typeof permissionRow.permissions === "object" &&
    !Array.isArray(permissionRow.permissions)
      ? (permissionRow.permissions as Record<string, unknown>)
      : {};

  if (permissions.team !== true) {
    return {
      error: NextResponse.json(
        { message: "You do not have permission to manage the Workspace Team." },
        { status: 403 }
      ),
    };
  }

  return { user, role };
}

function validateWorkspaceInput(body: Record<string, unknown>) {
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const department = typeof body.department === "string" ? body.department : "";
  const position = typeof body.position === "string" ? body.position.trim() : "";
  const workload = typeof body.workload === "string" ? body.workload : "";
  const project =
    typeof body.project === "string" && body.project.trim()
      ? body.project.trim()
      : "Unassigned";

  if (!name || !email || !position) {
    return { error: "Name, email, and position are required." };
  }

  if (!allowedDepartments.includes(department as (typeof allowedDepartments)[number])) {
    return { error: "Invalid department." };
  }

  if (!allowedWorkloads.includes(workload as (typeof allowedWorkloads)[number])) {
    return { error: "Invalid workload." };
  }

  return { name, email, department, position, workload, project };
}

export async function GET() {
  const auth = await getAuthorizedCaller();
  if ("error" in auth) return auth.error;

  try {
    const admin = getAdminClient();

    const [{ data: profiles, error: profilesError }, { data: workspaceRows, error: workspaceError }] =
      await Promise.all([
        admin
          .from("profiles")
          .select("id, email, full_name, role, status, created_at, updated_at")
          .order("created_at", { ascending: true }),
        admin
          .from("workspace_members")
          .select("id, user_id, department, position, workload, project, created_at, updated_at"),
      ]);

    if (profilesError) throw profilesError;
    if (workspaceError) throw workspaceError;

    const workspaceByUserId = new Map(
      (workspaceRows ?? []).map((row) => [row.user_id, row])
    );

    if (!workspaceByUserId.has(auth.user.id)) {
      const { data: insertedRow, error: insertError } = await admin
        .from("workspace_members")
        .insert({
          user_id: auth.user.id,
          department: "Development",
          position: "Team Member",
          workload: "Balanced",
          project: "Unassigned",
        })
        .select("id, user_id, department, position, workload, project, created_at, updated_at")
        .single();

      if (insertError) throw insertError;

      workspaceByUserId.set(insertedRow.user_id, insertedRow);
    }

    const members = (profiles ?? [])
      .filter((profile) => workspaceByUserId.has(profile.id))
      .map((profile) => {
      const workspace = workspaceByUserId.get(profile.id);

      return {
        id: profile.id,
        name: profile.full_name || profile.email || "Unnamed Member",
        email: profile.email || "",
        department: workspace?.department || "Development",
        position: workspace?.position || "Team Member",
        status: profile.status || "Pending",
        workload: workspace?.workload || "Balanced",
        project: workspace?.project || "Unassigned",
        joined: (profile as { created_at?: string }).created_at || workspace?.created_at || new Date().toISOString(),
        lastActive:
          profile.status === "Pending"
            ? "Invitation pending"
            : (profile as { updated_at?: string }).updated_at || workspace?.updated_at || "Unknown",
      };
    });

    return NextResponse.json({ members });
  } catch (error) {
    console.error("WORKSPACE TEAM GET ERROR:", error);

    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unable to load Workspace Team." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const auth = await getAuthorizedCaller();
  if ("error" in auth) return auth.error;

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const validated = validateWorkspaceInput(body);

    if ("error" in validated) {
      return NextResponse.json({ message: validated.error }, { status: 400 });
    }

    const admin = getAdminClient();

    const { data: profile, error: profileError } = await admin
      .from("profiles")
      .select("id, email, full_name, status")
      .eq("email", validated.email)
      .maybeSingle();

    if (profileError) throw profileError;

    if (!profile) {
      return NextResponse.json(
        {
          message:
            "This user does not exist yet. Invite them through Admin Team first, then add their workspace information here.",
        },
        { status: 404 }
      );
    }

    const { data: workspace, error: workspaceError } = await admin
      .from("workspace_members")
      .upsert(
        {
          user_id: profile.id,
          department: validated.department,
          position: validated.position,
          workload: validated.workload,
          project: validated.project,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      )
      .select("id, user_id, department, position, workload, project, created_at, updated_at")
      .single();

    if (workspaceError) throw workspaceError;

    return NextResponse.json({
      ok: true,
      member: {
        id: profile.id,
        name: profile.full_name || profile.email || validated.name,
        email: profile.email || validated.email,
        department: workspace.department,
        position: workspace.position,
        status: profile.status,
        workload: workspace.workload,
        project: workspace.project,
        joined: (profile as { created_at?: string }).created_at || workspace?.created_at || new Date().toISOString(),
        lastActive:
          profile.status === "Pending"
            ? "Invitation pending"
            : (profile as { updated_at?: string }).updated_at || workspace?.updated_at || "Unknown",
      },
    });
  } catch (error) {
    console.error("WORKSPACE TEAM POST ERROR:", error);

    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unable to add workspace member." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const auth = await getAuthorizedCaller();
  if ("error" in auth) return auth.error;

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const userId = typeof body.userId === "string" ? body.userId : "";

    if (!userId) {
      return NextResponse.json({ message: "User ID is required." }, { status: 400 });
    }

    const validated = validateWorkspaceInput(body);

    if ("error" in validated) {
      return NextResponse.json({ message: validated.error }, { status: 400 });
    }

    const admin = getAdminClient();

    const { data: profile, error: profileError } = await admin
      .from("profiles")
      .select("id, email, full_name, status, created_at, updated_at")
      .eq("id", userId)
      .maybeSingle();

    if (profileError) throw profileError;

    if (!profile) {
      return NextResponse.json({ message: "Workspace member was not found." }, { status: 404 });
    }

    const { data: workspace, error: workspaceError } = await admin
      .from("workspace_members")
      .upsert(
        {
          user_id: userId,
          department: validated.department,
          position: validated.position,
          workload: validated.workload,
          project: validated.project,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      )
      .select("id, user_id, department, position, workload, project, created_at, updated_at")
      .single();

    if (workspaceError) throw workspaceError;

    return NextResponse.json({
      ok: true,
      member: {
        id: profile.id,
        name: profile.full_name || profile.email || validated.name,
        email: profile.email || validated.email,
        department: workspace.department,
        position: workspace.position,
        status: profile.status,
        workload: workspace.workload,
        project: workspace.project,
        joined: profile.created_at,
        lastActive: profile.status === "Pending" ? "Invitation pending" : workspace.updated_at,
      },
    });
  } catch (error) {
    console.error("WORKSPACE TEAM PATCH ERROR:", error);

    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unable to update workspace member." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const auth = await getAuthorizedCaller();
  if ("error" in auth) return auth.error;

  try {
    const body = (await request.json()) as { userId?: unknown };
    const userId = typeof body.userId === "string" ? body.userId : "";

    if (!userId) {
      return NextResponse.json({ message: "User ID is required." }, { status: 400 });
    }

    if (userId === auth.user.id) {
      return NextResponse.json(
        { message: "You cannot remove yourself from the Workspace Team." },
        { status: 400 }
      );
    }

    const admin = getAdminClient();

    const { error } = await admin
      .from("workspace_members")
      .delete()
      .eq("user_id", userId);

    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("WORKSPACE TEAM DELETE ERROR:", error);

    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unable to remove workspace member." },
      { status: 500 }
    );
  }
}
