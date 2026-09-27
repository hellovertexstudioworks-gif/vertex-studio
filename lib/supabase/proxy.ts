// FILE: lib/supabase/proxy.ts
// PURPOSE: Vertex Studio Works — Authentication + Server-Side Permission Protection
// NOTE: Sidebar visibility is UX. This file is the server-side enforcement layer.

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

type Role = "Owner" | "Admin" | "Manager" | "Staff";

type PermissionKey =
  | "workspace"
  | "team"
  | "projects"
  | "tasks"
  | "leads"
  | "sales"
  | "finance"
  | "analytics"
  | "settings"
  | "adminTeam";

type RolePermissions = Record<PermissionKey, boolean>;

const DEFAULT_PERMISSIONS: Record<Role, RolePermissions> = {
  Owner: {
    workspace: true,
    team: true,
    projects: true,
    tasks: true,
    leads: true,
    sales: true,
    finance: true,
    analytics: true,
    settings: true,
    adminTeam: true,
  },
  Admin: {
    workspace: true,
    team: true,
    projects: true,
    tasks: true,
    leads: true,
    sales: true,
    finance: true,
    analytics: true,
    settings: true,
    adminTeam: false,
  },
  Manager: {
    workspace: false,
    team: true,
    projects: true,
    tasks: true,
    leads: true,
    sales: true,
    finance: false,
    analytics: true,
    settings: true,
    adminTeam: false,
  },
  Staff: {
    workspace: false,
    team: false,
    projects: false,
    tasks: true,
    leads: false,
    sales: false,
    finance: false,
    analytics: false,
    settings: false,
    adminTeam: false,
  },
};

/**
 * Maps an Admin URL to the permission required to access it.
 *
 * Routes that do not have a dedicated permission key yet remain available
 * to authenticated Admin users. We can add dedicated keys later without
 * changing the authentication architecture.
 */
function getRequiredPermission(pathname: string): PermissionKey | null {
  if (pathname === "/admin/admin-team" || pathname.startsWith("/admin/admin-team/")) {
    return "adminTeam";
  }

  if (pathname === "/admin/settings" || pathname.startsWith("/admin/settings/")) {
    return "settings";
  }

  if (pathname === "/admin/team" || pathname.startsWith("/admin/team/")) {
    return "team";
  }

  if (
    pathname === "/admin/projects" ||
    pathname.startsWith("/admin/projects/")
  ) {
    return "projects";
  }

  if (pathname === "/admin/tasks" || pathname.startsWith("/admin/tasks/")) {
    return "tasks";
  }

  if (
    pathname === "/admin/leads" ||
    pathname.startsWith("/admin/leads/") ||
    pathname === "/admin/clients" ||
    pathname.startsWith("/admin/clients/")
  ) {
    return "leads";
  }

  if (
    pathname === "/admin/prospects" ||
    pathname.startsWith("/admin/prospects/") ||
    pathname === "/admin/outreach" ||
    pathname.startsWith("/admin/outreach/") ||
    pathname === "/admin/deals" ||
    pathname.startsWith("/admin/deals/") ||
    pathname === "/admin/proposals" ||
    pathname.startsWith("/admin/proposals/")
  ) {
    return "sales";
  }

  if (
    pathname === "/admin/invoices" ||
    pathname.startsWith("/admin/invoices/") ||
    pathname === "/admin/payments" ||
    pathname.startsWith("/admin/payments/") ||
    pathname === "/admin/contracts" ||
    pathname.startsWith("/admin/contracts/")
  ) {
    return "finance";
  }

  if (
    pathname === "/admin/analytics" ||
    pathname.startsWith("/admin/analytics/")
  ) {
    return "analytics";
  }

  return null;
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
          });

          supabaseResponse = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });

          Object.entries(headers).forEach(([key, value]) => {
            supabaseResponse.headers.set(key, value);
          });
        },
      },
    }
  );

  const pathname = request.nextUrl.pathname;

  // Public routes do not require authentication.
  if (!pathname.startsWith("/admin")) {
    return supabaseResponse;
  }

  // Confirm the authenticated user.
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("next", pathname);

    return NextResponse.redirect(loginUrl);
  }

  // Get the authenticated user's server-side profile.
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role, status")
    .eq("id", user.id)
    .maybeSingle();

  if (
    profileError ||
    !profile ||
    profile.status !== "Active" ||
    !["Owner", "Admin", "Manager", "Staff"].includes(profile.role)
  ) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.search = "";

    return NextResponse.redirect(loginUrl);
  }

  const role = profile.role as Role;
  const requiredPermission = getRequiredPermission(pathname);

  // The Admin Team is intentionally Owner-only at the route level.
  if (requiredPermission === "adminTeam" && role !== "Owner") {
    const adminUrl = request.nextUrl.clone();
    adminUrl.pathname = "/admin";
    adminUrl.search = "";

    return NextResponse.redirect(adminUrl);
  }

  // No dedicated permission key for this route yet.
  if (!requiredPermission) {
    return supabaseResponse;
  }

  // Owner always has full access.
  if (role === "Owner") {
    return supabaseResponse;
  }

  // Read the current role permissions from Supabase.
  const { data: rolePermissionRow, error: permissionError } = await supabase
    .from("role_permissions")
    .select("permissions")
    .eq("role", role)
    .maybeSingle();

  // Fail closed for protected routes if permissions cannot be verified.
  if (permissionError || !rolePermissionRow?.permissions) {
    const adminUrl = request.nextUrl.clone();
    adminUrl.pathname = "/admin";
    adminUrl.search = "";

    return NextResponse.redirect(adminUrl);
  }

  const permissions: RolePermissions = {
    ...DEFAULT_PERMISSIONS[role],
    ...(rolePermissionRow.permissions as Partial<RolePermissions>),
  };

  if (!permissions[requiredPermission]) {
    const adminUrl = request.nextUrl.clone();
    adminUrl.pathname = "/admin";
    adminUrl.search = "";

    return NextResponse.redirect(adminUrl);
  }

  return supabaseResponse;
}
