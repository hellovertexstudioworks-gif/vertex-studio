// FILE: app/admin/admin-team/layout.tsx
// PURPOSE: Protect Vertex Studio Works Admin Team / System Access
// ACCESS: Owner only
// NOTE: This is server-side protection and does not rely on localStorage.

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AdminTeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  // Get the currently authenticated user.
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  // Look up the user's server-side profile and role.
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role, status")
    .eq("id", user.id)
    .single();

  // No valid profile = no system access.
  if (profileError || !profile) {
    redirect("/admin");
  }

  // Only an active Owner can access Admin Team.
  if (profile.status !== "Active" || profile.role !== "Owner") {
    redirect("/admin");
  }

  return <>{children}</>;
}