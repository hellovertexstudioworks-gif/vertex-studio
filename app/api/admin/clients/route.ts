import { NextResponse } from "next/server";
import { createClient as createSupabaseAdminClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

const allowedStatuses = ["Active", "Inactive", "Pending"] as const;
const allowedCompanyTypes = [
  "Agency",
  "Professional Services",
  "Small Business",
  "E-commerce",
  "Startup",
] as const;

type ClientStatus = (typeof allowedStatuses)[number];
type CompanyType = (typeof allowedCompanyTypes)[number];

type ClientRow = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: ClientStatus;
  company_type: CompanyType;
  last_activity: string;
  created_at: string;
  updated_at: string;
};

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!url || !secretKey) {
    throw new Error("Supabase server environment variables are missing.");
  }

  return createSupabaseAdminClient(url, secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

async function getCaller() {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { supabase, user: null, profile: null };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role, status")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError || !profile) {
    return { supabase, user, profile: null };
  }

  return { supabase, user, profile };
}

function ensureAuthenticated(profile: { role: string; status: string } | null) {
  if (!profile || profile.status !== "Active") {
    return NextResponse.json(
      { message: "Your account is not authorized to access Clients." },
      { status: 403 }
    );
  }

  return null;
}

function ensureCanManage(profile: { role: string; status: string } | null) {
  const authResponse = ensureAuthenticated(profile);
  if (authResponse) return authResponse;

  if (!profile || !["Owner", "Admin", "Manager"].includes(profile.role)) {
    return NextResponse.json(
      { message: "You do not have permission to manage clients." },
      { status: 403 }
    );
  }

  return null;
}

function formatLastActivity(value: string) {
  const timestamp = new Date(value).getTime();
  if (Number.isNaN(timestamp)) return "Unknown";

  const diffMs = Math.max(0, Date.now() - timestamp);
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 60) {
    return diffMinutes <= 1 ? "Just now" : `${diffMinutes} min ago`;
  }

  if (diffHours < 24) {
    return diffHours === 1 ? "1 hr ago" : `${diffHours} hrs ago`;
  }

  if (diffDays === 1) return "Yesterday";
  if (diffDays <= 3) return `${diffDays} days ago`;
  if (diffDays <= 7) return "1 week ago";
  if (diffDays <= 14) return "2 weeks ago";

  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function mapClient(row: ClientRow) {
  return {
    id: row.id,
    name: row.name,
    company: row.company,
    email: row.email,
    phone: row.phone,
    status: row.status,
    companyType: row.company_type,
    projects: 0,
    outstanding: 0,
    lastActivity: formatLastActivity(row.last_activity),
  };
}

function validateClientBody(body: Record<string, unknown>) {
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const company = typeof body.company === "string" ? body.company.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const status = body.status;
  const companyType = body.companyType;

  if (!name || !company || !email) {
    return { error: "Name, company, and email are required." };
  }

  if (name.length > 150 || company.length > 200 || email.length > 320) {
    return { error: "One or more client fields are too long." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  if (!allowedStatuses.includes(status as ClientStatus)) {
    return { error: "Invalid client status." };
  }

  if (!allowedCompanyTypes.includes(companyType as CompanyType)) {
    return { error: "Invalid business type." };
  }

  return {
    value: {
      name,
      company,
      email,
      phone,
      status: status as ClientStatus,
      company_type: companyType as CompanyType,
    },
  };
}

export async function GET() {
  try {
    const { profile } = await getCaller();
    const authResponse = ensureAuthenticated(profile);
    if (authResponse) return authResponse;

    const admin = getAdminClient();
    const { data, error } = await admin
      .from("clients")
      .select(
        "id, name, company, email, phone, status, company_type, last_activity, created_at, updated_at"
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("CLIENTS GET ERROR:", error);
      return NextResponse.json(
        { message: "Unable to load clients." },
        { status: 500 }
      );
    }

    return NextResponse.json({ clients: (data as ClientRow[]).map(mapClient) });
  } catch (error) {
    console.error("CLIENTS GET SERVER ERROR:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unable to load clients." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { profile } = await getCaller();
    const authResponse = ensureCanManage(profile);
    if (authResponse) return authResponse;

    const body = await request.json();
    const validation = validateClientBody(body);

    if ("error" in validation) {
      return NextResponse.json({ message: validation.error }, { status: 400 });
    }

    const admin = getAdminClient();
    const { data, error } = await admin
      .from("clients")
      .insert(validation.value)
      .select(
        "id, name, company, email, phone, status, company_type, last_activity, created_at, updated_at"
      )
      .single();

    if (error) {
      console.error("CLIENTS POST ERROR:", error);
      return NextResponse.json(
        { message: error.message || "Unable to add client." },
        { status: 500 }
      );
    }

    return NextResponse.json({ client: mapClient(data as ClientRow) }, { status: 201 });
  } catch (error) {
    console.error("CLIENTS POST SERVER ERROR:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unable to add client." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { profile } = await getCaller();
    const authResponse = ensureCanManage(profile);
    if (authResponse) return authResponse;

    const body = await request.json();
    const id = typeof body.id === "string" ? body.id.trim() : "";

    if (!id) {
      return NextResponse.json({ message: "Client id is required." }, { status: 400 });
    }

    const validation = validateClientBody(body);
    if ("error" in validation) {
      return NextResponse.json({ message: validation.error }, { status: 400 });
    }

    const admin = getAdminClient();
    const { data, error } = await admin
      .from("clients")
      .update({
        ...validation.value,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select(
        "id, name, company, email, phone, status, company_type, last_activity, created_at, updated_at"
      )
      .maybeSingle();

    if (error) {
      console.error("CLIENTS PATCH ERROR:", error);
      return NextResponse.json(
        { message: error.message || "Unable to update client." },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json({ message: "Client was not found." }, { status: 404 });
    }

    return NextResponse.json({ client: mapClient(data as ClientRow) });
  } catch (error) {
    console.error("CLIENTS PATCH SERVER ERROR:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unable to update client." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { profile } = await getCaller();
    const authResponse = ensureCanManage(profile);
    if (authResponse) return authResponse;

    const body = await request.json();
    const id = typeof body.id === "string" ? body.id.trim() : "";

    if (!id) {
      return NextResponse.json({ message: "Client id is required." }, { status: 400 });
    }

    const admin = getAdminClient();
    const { error } = await admin.from("clients").delete().eq("id", id);

    if (error) {
      console.error("CLIENTS DELETE ERROR:", error);
      return NextResponse.json(
        { message: error.message || "Unable to delete client." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("CLIENTS DELETE SERVER ERROR:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unable to delete client." },
      { status: 500 }
    );
  }
}
