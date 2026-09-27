import { NextRequest, NextResponse } from "next/server";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

type InviteRole = "Admin" | "Manager" | "Staff";
type Theme =
  | "Blue"
  | "Purple"
  | "Red"
  | "Green"
  | "Orange"
  | "Cyan"
  | "Light"
  | "Dark";

const ALLOWED_ROLES: InviteRole[] = ["Admin", "Manager", "Staff"];

const ALLOWED_THEMES: Theme[] = [
  "Blue",
  "Purple",
  "Red",
  "Green",
  "Orange",
  "Cyan",
  "Light",
  "Dark",
];

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient();

    // 1. Verify the person making the request is authenticated.
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { ok: false, error: "You must be signed in to invite a team member." },
        { status: 401 }
      );
    }

    // 2. Verify the caller is an active Owner.
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role, status")
      .eq("id", user.id)
      .maybeSingle();

    if (
      profileError ||
      !profile ||
      profile.role !== "Owner" ||
      profile.status !== "Active"
    ) {
      return NextResponse.json(
        { ok: false, error: "Only an active Owner can invite Admin Team members." },
        { status: 403 }
      );
    }

    // 3. Validate the request body.
    const body = await request.json();

    const name =
      typeof body?.name === "string" ? body.name.trim() : "";
    const email =
      typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const role =
      typeof body?.role === "string" ? body.role : "";
    const theme =
      typeof body?.theme === "string" ? body.theme : "";

    if (!name || name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { ok: false, error: "Please provide a valid full name." },
        { status: 400 }
      );
    }

    if (
      !email ||
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json(
        { ok: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!ALLOWED_ROLES.includes(role as InviteRole)) {
      return NextResponse.json(
        {
          ok: false,
          error: "Only Admin, Manager, and Staff can be invited through this flow.",
        },
        { status: 400 }
      );
    }

    if (!ALLOWED_THEMES.includes(theme as Theme)) {
      return NextResponse.json(
        { ok: false, error: "Please select a valid Admin theme." },
        { status: 400 }
      );
    }

    // 4. Require the server-only Supabase Secret Key.
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

    if (!supabaseUrl || !supabaseSecretKey) {
      console.error(
        "Admin invite configuration is missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY."
      );

      return NextResponse.json(
        {
          ok: false,
          error: "The invitation service is not configured yet.",
        },
        { status: 500 }
      );
    }

    // 5. Create a server-only Supabase Admin client.
    // NEVER expose SUPABASE_SECRET_KEY to browser/client code.
    const adminSupabase = createSupabaseClient(
      supabaseUrl,
      supabaseSecretKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
          detectSessionInUrl: false,
        },
      }
    );

    // 6. Send the Supabase Auth invitation.
    const redirectTo = `${request.nextUrl.origin}/invite/accept`;

    const { data: inviteData, error: inviteError } =
      await adminSupabase.auth.admin.inviteUserByEmail(email, {
        data: {
          full_name: name,
        },
        redirectTo,
      });

    if (inviteError || !inviteData.user) {
      console.error("Supabase admin invitation failed:", inviteError);

      const message =
        inviteError?.message || "Unable to send the invitation.";

      const alreadyExists =
        /already registered|already exists|user already exists/i.test(message);

      return NextResponse.json(
        {
          ok: false,
          error: alreadyExists
            ? "A Supabase user with this email already exists. Use that account instead of sending another invitation."
            : message,
        },
        { status: alreadyExists ? 409 : 400 }
      );
    }

    const invitedUserId = inviteData.user.id;

    // 7. Create the authoritative Pending profile.
    // Role/theme are stored in profiles, not trusted from user_metadata.
    const { error: profileUpsertError } = await adminSupabase
      .from("profiles")
      .upsert(
        {
          id: invitedUserId,
          email,
          full_name: name,
          role: role as InviteRole,
          status: "Pending",
          theme: theme as Theme,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );

    if (profileUpsertError) {
      console.error(
        "Invited user was created, but the Pending profile could not be saved:",
        profileUpsertError
      );

      // Roll back the Auth user so we don't leave an orphaned invitation.
      const { error: rollbackError } =
        await adminSupabase.auth.admin.deleteUser(invitedUserId);

      if (rollbackError) {
        console.error(
          "Invitation rollback failed after profile creation failure:",
          rollbackError
        );
      }

      return NextResponse.json(
        {
          ok: false,
          error:
            "The invitation could not be completed because the team profile could not be created.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      userId: invitedUserId,
      message: "Invitation sent successfully.",
    });
  } catch (error) {
    console.error("Unexpected admin invitation error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Something went wrong while sending the invitation.",
      },
      { status: 500 }
    );
  }
}
