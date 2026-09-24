import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const { data: claimsData, error } = await supabase.auth.getClaims();

  const claims = error ? null : claimsData?.claims;

  if (!claims) {
    redirect("/login");
  }

  return <>{children}</>;
}