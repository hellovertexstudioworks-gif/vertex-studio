// app/api/admin/team/route.ts

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createSupabaseAdminClient } from "@supabase/supabase-js";

type Role = "Owner" | "Admin" | "Manager" | "Staff";
type Status = "Active" | "Pending" | "Inactive";
type Theme =
  | "Blue"
  | "Purple"
  | "Red"
  | "Green"
  | "Orange"
  | "Cyan"
  | "Light"
  | "Dark";

const allowedRoles: Role[] = ["Owner", "Admin", "Manager", "Staff"];
const editableRoles: Role[] = ["Admin", "Manager", "Staff"];
const allowedStatuses: Status[] = ["Active", "Pending", "Inactive"];
const allowedThemes: Theme[] = [
  "Blue",
  "Purple",
  "Red",
  "Green",
  "Orange",
  "Cyan",
  "Light",
  "Dark",
];

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!url || !secretKey) {
    throw new Error("Supabase server configuration is missing.");
  }

  return createSupabaseAdminClient(url, secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });
}

async function requireOwner() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      ok: false as const,
      response: NextResponse.json(
        { ok: false, error: "You must be signed in." },
        { status: 401 }
      ),
    };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role, status")
    .eq("id", user.id)
    .maybeSingle();

  if (
    profileError ||
    !profile ||
    profile.status !== "Active" ||
    profile.role !== "Owner"
  ) {
    return {
      ok: false as const,
      response: NextResponse.json(
        { ok: false, error: "Only an active Owner can manage Admin Team users." },
        { status: 403 }
      ),
    };
  }

  return {
    ok: true as const,
    user,
  };
}

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function formatJoined(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

function toMember(profile: {
  id: string;
  email: string | null;
  full_name: string | null;
  role: Role;
  status: Status;
  theme: Theme;
  created_at: string;
}) {
  return {
    id: profile.id,
    name: profile.full_name || profile.email || "Unnamed User",
    email: profile.email || "",
    role: profile.role,
    status: profile.status,
    theme: profile.theme,
    joined: formatJoined(profile.created_at),
    lastActive: profile.status === "Pending" ? "Invitation sent" : "—",
    initials: initials(
      profile.full_name || profile.email || "User"
    ),
  };
}

export async function GET() {
  const auth = await requireOwner();

  if (!auth.ok) return auth.response;

  try {
    const admin = getAdminClient();

    const { data: profiles, error } = await admin
      .from("profiles")
      .select("id, email, full_name, role, status, theme, created_at")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Admin Team profiles lookup failed:", error);

      return NextResponse.json(
        { ok: false, error: "Unable to load Admin Team users." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      members: (profiles ?? []).map(toMember),
    });
  } catch (error) {
    console.error("Admin Team GET failed:", error);

    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to load Admin Team users.",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  const auth = await requireOwner();

  if (!auth.ok) return auth.response;

  try {
    const body = await request.json();

    const id = typeof body.id === "string" ? body.id : "";
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const role = body.role as Role;
    const theme = body.theme as Theme;

    if (!id || !name || !email) {
      return NextResponse.json(
        { ok: false, error: "Name, email, and user ID are required." },
        { status: 400 }
      );
    }

    if (!editableRoles.includes(role) && id !== auth.user.id) {
      return NextResponse.json(
        {
          ok: false,
          error: "Only Admin, Manager, and Staff can be assigned to another user.",
        },
        { status: 400 }
      );
    }

    if (!allowedThemes.includes(theme)) {
      return NextResponse.json(
        { ok: false, error: "Invalid personal Admin theme." },
        { status: 400 }
      );
    }

    const admin = getAdminClient();

    const { data: existing, error: existingError } = await admin
      .from("profiles")
      .select("id, email, full_name, role, status, theme, created_at")
      .eq("id", id)
      .maybeSingle();

    if (existingError || !existing) {
      return NextResponse.json(
        { ok: false, error: "Admin user was not found." },
        { status: 404 }
      );
    }

    // Owner account stays Owner.
    const nextRole =
      existing.role === "Owner" ? "Owner" : role;

    if (!allowedRoles.includes(nextRole)) {
      return NextResponse.json(
        { ok: false, error: "Invalid system role." },
        { status: 400 }
      );
    }

    const { error: authUpdateError } = await admin.auth.admin.updateUserById(
      id,
      {
        email,
        user_metadata: {
          full_name: name,
        },
      }
    );

    if (authUpdateError) {
      return NextResponse.json(
        { ok: false, error: authUpdateError.message },
        { status: 400 }
      );
    }

    const { data: updated, error: profileError } = await admin
      .from("profiles")
      .update({
        email,
        full_name: name,
        role: nextRole,
        theme,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select("id, email, full_name, role, status, theme, created_at")
      .single();

    if (profileError || !updated) {
      return NextResponse.json(
        {
          ok: false,
          error: "The authentication account was updated, but the profile could not be saved.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      member: toMember(updated),
    });
  } catch (error) {
    console.error("Admin Team PATCH failed:", error);

    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to update Admin Team user.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const auth = await requireOwner();

  if (!auth.ok) return auth.response;

  try {
    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { ok: false, error: "User ID is required." },
        { status: 400 }
      );
    }

    if (id === auth.user.id) {
      return NextResponse.json(
        { ok: false, error: "The Owner cannot remove their own account." },
        { status: 400 }
      );
    }

    const admin = getAdminClient();

    const { data: profile, error: profileError } = await admin
      .from("profiles")
      .select("id, role")
      .eq("id", id)
      .maybeSingle();

    if (profileError || !profile) {
      return NextResponse.json(
        { ok: false, error: "Admin user was not found." },
        { status: 404 }
      );
    }

    if (profile.role === "Owner") {
      return NextResponse.json(
        { ok: false, error: "The Owner account cannot be removed." },
        { status: 400 }
      );
    }

    const { error } = await admin.auth.admin.deleteUser(id);

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Admin user removed successfully.",
    });
  } catch (error) {
    console.error("Admin Team DELETE failed:", error);

    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to remove Admin Team user.",
      },
      { status: 500 }
    );
  }
}
