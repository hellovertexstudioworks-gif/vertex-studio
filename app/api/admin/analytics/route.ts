// FILE: app/api/admin/analytics/route.ts
// PURPOSE: Vertex Studio Works — Business OS Analytics API

import { NextRequest, NextResponse } from "next/server";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

type Role = "Owner" | "Admin" | "Manager" | "Staff";
type RangeKey = "7d" | "30d" | "90d" | "year";

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
      response: jsonError("Unable to verify analytics permissions.", 403),
    };
  }

  const permissions =
    rolePermission.permissions &&
    typeof rolePermission.permissions === "object"
      ? (rolePermission.permissions as Record<string, unknown>)
      : {};

  if (permissions.analytics !== true) {
    return {
      ok: false as const,
      response: jsonError(
        "You do not have permission to access Analytics.",
        403
      ),
    };
  }

  return { ok: true as const, user, role };
}

function getRange(range: string | null) {
  const key: RangeKey =
    range === "7d" || range === "90d" || range === "year" ? range : "30d";

  const now = new Date();
  const start = new Date(now);

  if (key === "7d") {
    start.setDate(start.getDate() - 6);
  } else if (key === "90d") {
    start.setDate(start.getDate() - 89);
  } else if (key === "year") {
    start.setMonth(0, 1);
    start.setHours(0, 0, 0, 0);
  } else {
    start.setDate(start.getDate() - 29);
  }

  start.setHours(0, 0, 0, 0);

  return {
    key,
    start,
    end: now,
  };
}

function dateKey(value: string | Date) {
  const date = value instanceof Date ? value : new Date(value);

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function buildDailySeries(
  start: Date,
  end: Date,
  values: Array<{ date: string; value: number }>
) {
  const map = new Map(values.map((item) => [dateKey(item.date), item.value]));
  const result: Array<{ date: string; value: number }> = [];

  const cursor = new Date(start);

  while (cursor <= end) {
    const key = dateKey(cursor);

    result.push({
      date: key,
      value: map.get(key) ?? 0,
    });

    cursor.setDate(cursor.getDate() + 1);
  }

  return result;
}

export async function GET(request: NextRequest) {
  try {
    const auth = await getAuthorizedUser();
    if (!auth.ok) return auth.response;

    const { key, start, end } = getRange(
      new URL(request.url).searchParams.get("range")
    );

    const admin = getAdminClient();
    const startIso = start.toISOString();

    const [
      clientsResult,
      projectsResult,
      websitesResult,
      leadsResult,
      invoicesResult,
      paymentsResult,
      eventsResult,
    ] = await Promise.all([
      admin
        .from("clients")
        .select("id, status, created_at")
        .order("created_at", { ascending: false }),

      admin
        .from("projects")
        .select("id, status, value, created_at")
        .order("created_at", { ascending: false }),

      admin
        .from("websites")
        .select("id, status, maintenance_status, created_at")
        .order("created_at", { ascending: false }),

      admin
        .from("leads")
        .select("id, status, source, created_at")
        .order("created_at", { ascending: false }),

      admin
        .from("invoices")
        .select("id, status, total, issue_date, due_date, created_at")
        .order("created_at", { ascending: false }),

      admin
        .from("payments")
        .select(
          "id, invoice_id, amount, payment_date, payment_method, status, created_at"
        )
        .order("created_at", { ascending: false }),

      admin
        .from("analytics_events")
        .select(
          "id, event_type, page_path, session_id, visitor_id, source, created_at"
        )
        .gte("created_at", startIso)
        .lte("created_at", end.toISOString())
        .order("created_at", { ascending: true }),
    ]);

    const results = [
      clientsResult,
      projectsResult,
      websitesResult,
      leadsResult,
      invoicesResult,
      paymentsResult,
      eventsResult,
    ];

    const failed = results.find((result) => result.error);

    if (failed?.error) {
      console.error("ANALYTICS DATA ERROR:", failed.error);
      return jsonError(failed.error.message, 500);
    }

    const clients = clientsResult.data ?? [];
    const projects = projectsResult.data ?? [];
    const websites = websitesResult.data ?? [];
    const leads = leadsResult.data ?? [];
    const invoices = invoicesResult.data ?? [];
    const payments = paymentsResult.data ?? [];
    const events = eventsResult.data ?? [];

    const rangeEnd = end.getTime();

    const rangeStart = start.getTime();

    const inRange = (value: string | null | undefined) => {
      if (!value) return false;
      const time = new Date(value).getTime();
      return time >= rangeStart && time <= rangeEnd;
    };

    const rangeLeads = leads.filter((lead) => inRange(lead.created_at));

    const rangeInvoices = invoices.filter((invoice) => {
      const value = invoice.issue_date || invoice.created_at;
      return inRange(value);
    });

    const rangePayments = payments.filter((payment) => {
      const value = payment.payment_date || payment.created_at;
      return inRange(value);
    });

    const paidPayments = payments.filter((payment) => payment.status === "Paid");

    const totalReceived = paidPayments.reduce(
      (sum, payment) => sum + Number(payment.amount ?? 0),
      0
    );

    const rangeReceived = rangePayments
      .filter((payment) => payment.status === "Paid")
      .reduce((sum, payment) => sum + Number(payment.amount ?? 0), 0);

    const invoiceTotal = invoices.reduce(
      (sum, invoice) => sum + Number(invoice.total ?? 0),
      0
    );

    const paidInvoiceTotal = invoices
      .filter((invoice) => invoice.status === "Paid")
      .reduce((sum, invoice) => sum + Number(invoice.total ?? 0), 0);

    const outstandingInvoiceTotal = invoices
      .filter(
        (invoice) =>
          invoice.status !== "Paid" && invoice.status !== "Cancelled"
      )
      .reduce((sum, invoice) => sum + Number(invoice.total ?? 0), 0);

    const activeClients = clients.filter(
      (client) => client.status === "Active"
    ).length;

    const activeProjects = projects.filter((project) =>
      ["Active", "In Progress", "Review"].includes(project.status)
    ).length;

    const activeWebsites = websites.filter((website) =>
      ["Development", "Review", "Live", "Maintenance"].includes(
        website.status
      )
    ).length;

    const liveWebsites = websites.filter(
      (website) => website.status === "Live"
    ).length;

    const maintenanceWebsites = websites.filter(
      (website) => website.maintenance_status === "Active"
    ).length;

    const newLeads = leads.filter((lead) => lead.status === "New").length;
    const contactedLeads = leads.filter(
      (lead) => lead.status === "Contacted"
    ).length;
    const qualifiedLeads = leads.filter(
      (lead) => lead.status === "Qualified"
    ).length;
    const closedLeads = leads.filter((lead) => lead.status === "Closed").length;

    const leadCloseRate =
      leads.length > 0 ? Math.round((closedLeads / leads.length) * 100) : 0;

    const rangeClosedLeads = rangeLeads.filter(
      (lead) => lead.status === "Closed"
    ).length;

    const rangeCloseRate =
      rangeLeads.length > 0
        ? Math.round((rangeClosedLeads / rangeLeads.length) * 100)
        : 0;

    const visitors = new Set(
      events
        .map((event) => event.visitor_id)
        .filter((value) => Boolean(value))
    ).size;

    const sessions = new Set(
      events
        .map((event) => event.session_id)
        .filter((value) => Boolean(value))
    ).size;

    const pageViews = events.filter(
      (event) =>
        event.event_type === "page_view" ||
        event.event_type === "pageview" ||
        event.event_type === "view"
    ).length;

    const sourceCounts: Record<string, number> = {};

    rangeLeads.forEach((lead) => {
      const source = lead.source || "Unknown";
      sourceCounts[source] = (sourceCounts[source] ?? 0) + 1;
    });

    const topLeadSources = Object.entries(sourceCounts)
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    const revenueByDay = new Map<string, number>();

    rangePayments
      .filter((payment) => payment.status === "Paid")
      .forEach((payment) => {
        const key = dateKey(payment.payment_date || payment.created_at);
        revenueByDay.set(
          key,
          (revenueByDay.get(key) ?? 0) + Number(payment.amount ?? 0)
        );
      });

    const leadsByDay = new Map<string, number>();

    rangeLeads.forEach((lead) => {
      const key = dateKey(lead.created_at);
      leadsByDay.set(key, (leadsByDay.get(key) ?? 0) + 1);
    });

    const visitorsByDay = new Map<string, number>();
    const visitorsSeenByDay = new Map<string, Set<string>>();

    events.forEach((event) => {
      if (!event.visitor_id) return;

      const key = dateKey(event.created_at);

      if (!visitorsSeenByDay.has(key)) {
        visitorsSeenByDay.set(key, new Set());
      }

      visitorsSeenByDay.get(key)!.add(event.visitor_id);
    });

    visitorsSeenByDay.forEach((set, key) => {
      visitorsByDay.set(key, set.size);
    });

    const revenueSeries = buildDailySeries(
      start,
      end,
      Array.from(revenueByDay.entries()).map(([date, value]) => ({
        date,
        value,
      }))
    );

    const leadsSeries = buildDailySeries(
      start,
      end,
      Array.from(leadsByDay.entries()).map(([date, value]) => ({
        date,
        value,
      }))
    );

    const visitorsSeries = buildDailySeries(
      start,
      end,
      Array.from(visitorsByDay.entries()).map(([date, value]) => ({
        date,
        value,
      }))
    );

    const projectStatus: Record<string, number> = {};
    projects.forEach((project) => {
      projectStatus[project.status] =
        (projectStatus[project.status] ?? 0) + 1;
    });

    const websiteStatus: Record<string, number> = {};
    websites.forEach((website) => {
      websiteStatus[website.status] =
        (websiteStatus[website.status] ?? 0) + 1;
    });

    const invoiceStatus: Record<string, number> = {};
    invoices.forEach((invoice) => {
      invoiceStatus[invoice.status] =
        (invoiceStatus[invoice.status] ?? 0) + 1;
    });

    const paymentStatus: Record<string, number> = {};
    payments.forEach((payment) => {
      paymentStatus[payment.status] =
        (paymentStatus[payment.status] ?? 0) + 1;
    });

    return NextResponse.json({
      range: key,
      rangeStart: start.toISOString(),
      rangeEnd: end.toISOString(),

      overview: {
        totalClients: clients.length,
        activeClients,
        totalProjects: projects.length,
        activeProjects,
        totalWebsites: websites.length,
        activeWebsites,
        liveWebsites,
        maintenanceWebsites,

        totalLeads: leads.length,
        newLeads,
        contactedLeads,
        qualifiedLeads,
        closedLeads,
        leadCloseRate,

        rangeLeads: rangeLeads.length,
        rangeClosedLeads,
        rangeCloseRate,

        totalInvoices: invoices.length,
        paidInvoices: invoices.filter(
          (invoice) => invoice.status === "Paid"
        ).length,
        overdueInvoices: invoices.filter(
          (invoice) => invoice.status === "Overdue"
        ).length,

        invoiceTotal,
        paidInvoiceTotal,
        outstandingInvoiceTotal,

        totalReceived,
        rangeReceived,

        websiteVisitors: visitors,
        sessions,
        pageViews,
      },

      breakdowns: {
        projectStatus,
        websiteStatus,
        invoiceStatus,
        paymentStatus,
        topLeadSources,
      },

      series: {
        revenue: revenueSeries,
        leads: leadsSeries,
        visitors: visitorsSeries,
      },

      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("ANALYTICS SERVER ERROR:", error);

    return jsonError(
      error instanceof Error
        ? error.message
        : "Unable to load analytics.",
      500
    );
  }
}
