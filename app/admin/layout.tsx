import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/AdminSidebar";
import { VertexThemeProvider } from "./components/VertexThemeProvider";

type Role = "Owner" | "Admin" | "Manager" | "Staff";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  // Get the authenticated Supabase user.
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  // Get the user's role from the profiles table.
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role, status, theme")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    console.error("Admin profile lookup failed:", profileError);
    redirect("/login");
  }

  if (!profile) {
    console.error("No profile found for authenticated user:", user.id);
    redirect("/login");
  }

  if (profile.status !== "Active") {
    redirect("/login");
  }

  const role = profile.role as Role;

  return (
    <VertexThemeProvider>
      <div
        className="min-h-screen w-full text-[var(--vertex-text)] transition-colors duration-300"
        style={{ backgroundColor: "var(--vertex-bg)" }}
      >
        <AdminSidebar userRole={role} />

        <div
          className="min-h-screen transition-colors duration-300 lg:pl-[276px]"
          style={{ backgroundColor: "var(--vertex-bg)" }}
        >
          <AdminHeader />

          <main
            className="min-h-[calc(100vh-72px)] w-full transition-colors duration-300"
            style={{ backgroundColor: "var(--vertex-bg)" }}
          >
            {children}
          </main>
        </div>
      </div>
    </VertexThemeProvider>
  );
}