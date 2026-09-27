// FILE: app/api/admin/client-reports/route.ts
// PURPOSE: Vertex Studio Works — Client Report Data API
// NOTE: This route prepares client-specific data and can return JSON, Excel, or PDF.

import { NextRequest, NextResponse } from "next/server";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import {
  generateClientReportExcel,
  getClientReportExcelFilename,
} from "@/lib/reports/excel";
import {
  createClientReportPdf,
  getClientReportPdfFilename,
} from "@/lib/reports/pdf";

type Role = "Owner" | "Admin" | "Manager" | "Staff";

type ReportRange = "30d" | "90d" | "year" | "all";

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
    return {
      ok: true as const,
      user,
      role,
    };
  }

  const { data: rolePermission, error: permissionError } = await supabase
    .from("role_permissions")
    .select("permissions")
    .eq("role", role)
    .maybeSingle();

  if (permissionError || !rolePermission) {
    return {
      ok: false as const,
      response: jsonError(
        "Unable to verify Analytics permissions.",
        403
      ),
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
        "You do not have permission to access Client Reports.",
        403
      ),
    };
  }

  return {
    ok: true as const,
    user,
    role,
  };
}

function getDateRange(range: string | null) {
  const now = new Date();

  const key: ReportRange =
    range === "30d" || range === "90d" || range === "year" || range === "all"
      ? range
      : "30d";

  if (key === "all") {
    return {
      key,
      start: null as Date | null,
      end: now,
    };
  }

  const start = new Date(now);

  if (key === "30d") {
    start.setDate(start.getDate() - 30);
  } else if (key === "90d") {
    start.setDate(start.getDate() - 90);
  } else {
    start.setFullYear(start.getFullYear() - 1);
  }

  start.setHours(0, 0, 0, 0);

  return {
    key,
    start,
    end: now,
  };
}

function inRange(
  value: string | null | undefined,
  start: Date | null,
  end: Date
) {
  if (!value) return false;

  const time = new Date(value).getTime();

  if (Number.isNaN(time)) return false;

  if (start && time < start.getTime()) return false;

  return time <= end.getTime();
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
  start: Date | null,
  end: Date,
  values: Array<{ date: string; value: number }>
) {
  if (!start) return [];

  const map = new Map(
    values.map((item) => [dateKey(item.date), item.value])
  );

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

function getMonthKey(value: string | Date) {
  const date = value instanceof Date ? value : new Date(value);

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
  ].join("-");
}

function buildMonthlyPaymentSeries(
  payments: Array<{
    amount: number;
    paymentDate: string;
    status: string;
  }>,
  start: Date | null,
  end: Date
) {
  const map = new Map<string, number>();

  for (const payment of payments) {
    if (payment.status !== "Paid") continue;
    if (!inRange(payment.paymentDate, start, end)) continue;

    const key = getMonthKey(payment.paymentDate);
    map.set(key, (map.get(key) ?? 0) + Number(payment.amount || 0));
  }

  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, value]) => ({
      month,
      value: Number(value.toFixed(2)),
    }));
}

function calculateProjection(
  monthlyPayments: Array<{ month: string; value: number }>
) {
  const values = monthlyPayments.map((item) => Number(item.value || 0));

  if (values.length === 0) {
    return {
      method: "historical monthly paid average",
      monthsUsed: 0,
      monthlyAverage: 0,
      next3Months: 0,
      projectedMonths: [
        { monthOffset: 1, value: 0 },
        { monthOffset: 2, value: 0 },
        { monthOffset: 3, value: 0 },
      ],
    };
  }

  const recentValues = values.slice(-6);
  const average =
    recentValues.reduce((sum, value) => sum + value, 0) /
    recentValues.length;

  return {
    method: "historical monthly paid average",
    monthsUsed: recentValues.length,
    monthlyAverage: Number(average.toFixed(2)),
    next3Months: Number((average * 3).toFixed(2)),
    projectedMonths: [
      { monthOffset: 1, value: Number(average.toFixed(2)) },
      { monthOffset: 2, value: Number(average.toFixed(2)) },
      { monthOffset: 3, value: Number(average.toFixed(2)) },
    ],
  };
}

function normalizeClient(row: any) {
  return {
    id: row.id,
    name: row.name ?? "",
    company: row.company ?? "",
    email: row.email ?? "",
    phone: row.phone ?? "",
    status: row.status ?? "",
    companyType: row.company_type ?? "",
    lastActivity: row.last_activity ?? null,
    createdAt: row.created_at ?? null,
    updatedAt: row.updated_at ?? null,
  };
}

function normalizeWebsite(row: any) {
  const project = Array.isArray(row.projects)
    ? row.projects[0]
    : row.projects;

  return {
    id: row.id,
    name: row.name ?? "",
    websiteUrl: row.website_url ?? "",
    domain: row.domain ?? "",
    hostingProvider: row.hosting_provider ?? "",
    status: row.status ?? "",
    maintenanceStatus: row.maintenance_status ?? "",
    launchDate: row.launch_date ?? null,
    notes: row.notes ?? "",
    project: project
      ? {
          id: project.id,
          name: project.name ?? "",
        }
      : null,
    lastActivity: row.last_activity ?? null,
    createdAt: row.created_at ?? null,
    updatedAt: row.updated_at ?? null,
  };
}

function normalizeProject(row: any) {
  return {
    id: row.id,
    name: row.name ?? "",
    description: row.description ?? "",
    status: row.status ?? "",
    progress: Number(row.progress ?? 0),
    value: Number(row.value ?? 0),
    startDate: row.start_date ?? null,
    dueDate: row.due_date ?? null,
    category: row.category ?? "",
    lastActivity: row.last_activity ?? null,
    createdAt: row.created_at ?? null,
    updatedAt: row.updated_at ?? null,
  };
}

function normalizeInvoice(row: any) {
  const project = Array.isArray(row.projects)
    ? row.projects[0]
    : row.projects;

  return {
    id: row.id,
    invoiceNumber: row.invoice_number ?? "",
    status: row.status ?? "",
    issueDate: row.issue_date ?? null,
    dueDate: row.due_date ?? null,
    subtotal: Number(row.subtotal ?? 0),
    tax: Number(row.tax ?? 0),
    total: Number(row.total ?? 0),
    notes: row.notes ?? "",
    project: project
      ? {
          id: project.id,
          name: project.name ?? "",
        }
      : null,
    createdAt: row.created_at ?? null,
    updatedAt: row.updated_at ?? null,
  };
}

function normalizePayment(row: any) {
  const installment = Array.isArray(row.invoice_installments)
    ? row.invoice_installments[0]
    : row.invoice_installments;

  return {
    id: row.id,
    invoiceId: row.invoice_id,
    installmentId: row.installment_id ?? null,
    paymentReference: row.payment_reference ?? "",
    amount: Number(row.amount ?? 0),
    paymentDate: row.payment_date ?? null,
    paymentMethod: row.payment_method ?? "",
    status: row.status ?? "",
    notes: row.notes ?? "",
    installment: installment
      ? {
          id: installment.id,
          installmentNumber: installment.installment_number,
          description: installment.description ?? "",
          percentage: Number(installment.percentage ?? 0),
          amount: Number(installment.amount ?? 0),
          status: installment.status ?? "",
        }
      : null,
    createdAt: row.created_at ?? null,
    updatedAt: row.updated_at ?? null,
  };
}

export async function GET(request: NextRequest) {
  try {
    const auth = await getAuthorizedUser();

    if (!auth.ok) {
      return auth.response;
    }

    const url = new URL(request.url);

    const clientId = url.searchParams.get("clientId");
    const requestedRange = url.searchParams.get("range");
    const reportType = url.searchParams.get("type") || "combined";

    if (!clientId) {
      return jsonError("clientId is required.", 400);
    }

    const allowedReportTypes = [
      "combined",
      "website",
      "project",
      "billing",
    ];

    if (!allowedReportTypes.includes(reportType)) {
      return jsonError("Invalid report type.", 400);
    }

    const { key: rangeKey, start, end } = getDateRange(requestedRange);

    const admin = getAdminClient();

    // -----------------------------------------------------------------------
    // 1. CLIENT
    // -----------------------------------------------------------------------

    const { data: clientRow, error: clientError } = await admin
      .from("clients")
      .select(
        "id, name, company, email, phone, status, company_type, last_activity, created_at, updated_at"
      )
      .eq("id", clientId)
      .maybeSingle();

    if (clientError) {
      console.error("CLIENT REPORT CLIENT ERROR:", clientError);
      return jsonError(clientError.message, 500);
    }

    if (!clientRow) {
      return jsonError("Client not found.", 404);
    }

    // -----------------------------------------------------------------------
    // 2. CLIENT PROJECTS
    // -----------------------------------------------------------------------

    const { data: projectRows, error: projectsError } = await admin
      .from("projects")
      .select(
        "id, name, description, status, progress, value, start_date, due_date, category, last_activity, created_at, updated_at"
      )
      .eq("client_id", clientId)
      .order("created_at", { ascending: false });

    if (projectsError) {
      console.error("CLIENT REPORT PROJECT ERROR:", projectsError);
      return jsonError(projectsError.message, 500);
    }

    // -----------------------------------------------------------------------
    // 3. CLIENT WEBSITES
    // -----------------------------------------------------------------------

    const { data: websiteRows, error: websitesError } = await admin
      .from("websites")
      .select(
        `
          id,
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
          projects (
            id,
            name
          )
        `
      )
      .eq("client_id", clientId)
      .order("created_at", { ascending: false });

    if (websitesError) {
      console.error("CLIENT REPORT WEBSITE ERROR:", websitesError);
      return jsonError(websitesError.message, 500);
    }

    // -----------------------------------------------------------------------
    // 4. CLIENT INVOICES
    // -----------------------------------------------------------------------

    const { data: invoiceRows, error: invoicesError } = await admin
      .from("invoices")
      .select(
        `
          id,
          invoice_number,
          status,
          issue_date,
          due_date,
          subtotal,
          tax,
          total,
          notes,
          created_at,
          updated_at,
          projects (
            id,
            name
          )
        `
      )
      .eq("client_id", clientId)
      .order("created_at", { ascending: false });

    if (invoicesError) {
      console.error("CLIENT REPORT INVOICE ERROR:", invoicesError);
      return jsonError(invoicesError.message, 500);
    }

    const invoiceIds = (invoiceRows ?? []).map((invoice) => invoice.id);

    // -----------------------------------------------------------------------
    // 5. CLIENT PAYMENTS
    // -----------------------------------------------------------------------

    let paymentRows: any[] = [];

    if (invoiceIds.length > 0) {
      const { data, error: paymentsError } = await admin
        .from("payments")
        .select(
          `
            id,
            invoice_id,
            installment_id,
            payment_reference,
            amount,
            payment_date,
            payment_method,
            status,
            notes,
            created_at,
            updated_at,
            invoice_installments (
              id,
              installment_number,
              description,
              percentage,
              amount,
              status
            )
          `
        )
        .in("invoice_id", invoiceIds)
        .order("payment_date", { ascending: false });

      if (paymentsError) {
        console.error("CLIENT REPORT PAYMENT ERROR:", paymentsError);
        return jsonError(paymentsError.message, 500);
      }

      paymentRows = data ?? [];
    }

    // -----------------------------------------------------------------------
    // 6. CLIENT WEBSITE ANALYTICS EVENTS
    // -----------------------------------------------------------------------
    //
    // These columns were added specifically so client reports can stay
    // separated by client/website:
    //   analytics_events.client_id
    //   analytics_events.website_id
    //
    // Existing events that were created before those columns were populated
    // may not belong to a client yet and therefore are intentionally excluded.

    let eventQuery = admin
      .from("analytics_events")
      .select(
        "id, client_id, website_id, event_type, page_path, session_id, visitor_id, source, created_at"
      )
      .eq("client_id", clientId)
      .order("created_at", { ascending: true });

    if (start) {
      eventQuery = eventQuery.gte("created_at", start.toISOString());
    }

    eventQuery = eventQuery.lte("created_at", end.toISOString());

    const { data: eventRows, error: eventsError } = await eventQuery;

    if (eventsError) {
      console.error("CLIENT REPORT ANALYTICS ERROR:", eventsError);
      return jsonError(eventsError.message, 500);
    }

    // -----------------------------------------------------------------------
    // 7. NORMALIZE
    // -----------------------------------------------------------------------

    const client = normalizeClient(clientRow);
    const projects = (projectRows ?? []).map(normalizeProject);
    const websites = (websiteRows ?? []).map(normalizeWebsite);
    const invoices = (invoiceRows ?? []).map(normalizeInvoice);
    const payments = paymentRows.map(normalizePayment);

    const events = (eventRows ?? []).map((event) => ({
      id: event.id,
      clientId: event.client_id,
      websiteId: event.website_id,
      eventType: event.event_type ?? "",
      pagePath: event.page_path ?? "",
      sessionId: event.session_id ?? null,
      visitorId: event.visitor_id ?? null,
      source: event.source ?? "",
      createdAt: event.created_at ?? null,
    }));

    // -----------------------------------------------------------------------
    // 8. WEBSITE ANALYTICS
    // -----------------------------------------------------------------------

    const visitors = new Set(
      events
        .map((event) => event.visitorId)
        .filter(Boolean)
    ).size;

    const sessions = new Set(
      events
        .map((event) => event.sessionId)
        .filter(Boolean)
    ).size;

    const pageViews = events.filter(
      (event) =>
        event.eventType === "page_view" ||
        event.eventType === "pageview" ||
        event.eventType === "view"
    ).length;

    const eventCounts = events.reduce<Record<string, number>>(
      (result, event) => {
        result[event.eventType] = (result[event.eventType] ?? 0) + 1;
        return result;
      },
      {}
    );

    const sourceCounts = events.reduce<Record<string, number>>(
      (result, event) => {
        const source = event.source || "Direct / Unknown";
        result[source] = (result[source] ?? 0) + 1;
        return result;
      },
      {}
    );

    const pageCounts = events.reduce<Record<string, number>>(
      (result, event) => {
        const page = event.pagePath || "/";
        result[page] = (result[page] ?? 0) + 1;
        return result;
      },
      {}
    );

    const dailyPageViews = new Map<string, number>();
    const dailyVisitors = new Map<string, Set<string>>();

    for (const event of events) {
      if (!event.createdAt) continue;

      const day = dateKey(event.createdAt);

      if (
        event.eventType === "page_view" ||
        event.eventType === "pageview" ||
        event.eventType === "view"
      ) {
        dailyPageViews.set(
          day,
          (dailyPageViews.get(day) ?? 0) + 1
        );
      }

      if (event.visitorId) {
        if (!dailyVisitors.has(day)) {
          dailyVisitors.set(day, new Set<string>());
        }

        dailyVisitors.get(day)!.add(event.visitorId);
      }
    }

    const websiteDailySeries = buildDailySeries(
      start,
      end,
      Array.from(dailyPageViews.entries()).map(([date, value]) => ({
        date,
        value,
      }))
    );

    const visitorDailySeries = buildDailySeries(
      start,
      end,
      Array.from(dailyVisitors.entries()).map(([date, visitorsForDay]) => ({
        date,
        value: visitorsForDay.size,
      }))
    );

    const websiteAnalytics = {
      visitors,
      sessions,
      pageViews,
      averagePagesPerSession:
        sessions > 0 ? Number((pageViews / sessions).toFixed(2)) : 0,
      eventCounts,
      sourceCounts,
      topPages: Object.entries(pageCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([page, views]) => ({
          page,
          views,
        })),
      dailyPageViews: websiteDailySeries,
      dailyVisitors: visitorDailySeries,
      trackedEvents: events.length,
      note:
        events.length === 0
          ? "No client-linked analytics events were found for the selected period."
          : "Analytics are based only on events linked to this client.",
    };

    // -----------------------------------------------------------------------
    // 9. PROJECT SUMMARY
    // -----------------------------------------------------------------------

    const projectSummary = {
      total: projects.length,
      active: projects.filter((project) =>
        ["Active", "In Progress", "Review"].includes(project.status)
      ).length,
      completed: projects.filter(
        (project) => project.status === "Completed"
      ).length,
      onHold: projects.filter(
        (project) => project.status === "On Hold"
      ).length,
      averageProgress:
        projects.length > 0
          ? Number(
              (
                projects.reduce(
                  (sum, project) => sum + project.progress,
                  0
                ) / projects.length
              ).toFixed(1)
            )
          : 0,
      totalProjectValue: Number(
        projects
          .reduce((sum, project) => sum + Number(project.value || 0), 0)
          .toFixed(2)
      ),
    };

    // -----------------------------------------------------------------------
    // 10. BILLING SUMMARY
    // -----------------------------------------------------------------------

    const paidPayments = payments.filter(
      (payment) => payment.status === "Paid"
    );

    const totalInvoiced = invoices.reduce(
      (sum, invoice) => sum + Number(invoice.total || 0),
      0
    );

    const totalPaid = paidPayments.reduce(
      (sum, payment) => sum + Number(payment.amount || 0),
      0
    );

    const cancelledInvoices = invoices
      .filter((invoice) => invoice.status === "Cancelled")
      .reduce((sum, invoice) => sum + Number(invoice.total || 0), 0);

    const outstanding = Math.max(
      0,
      totalInvoiced - totalPaid - cancelledInvoices
    );

    const rangeInvoices = invoices.filter((invoice) =>
      inRange(invoice.issueDate, start, end)
    );

    const rangePaidPayments = paidPayments.filter((payment) =>
      inRange(payment.paymentDate, start, end)
    );

    const rangeInvoiced = rangeInvoices.reduce(
      (sum, invoice) => sum + Number(invoice.total || 0),
      0
    );

    const rangePaid = rangePaidPayments.reduce(
      (sum, payment) => sum + Number(payment.amount || 0),
      0
    );

    const invoiceStatusCounts = invoices.reduce<Record<string, number>>(
      (result, invoice) => {
        result[invoice.status] = (result[invoice.status] ?? 0) + 1;
        return result;
      },
      {}
    );

    const paymentMethodTotals = paidPayments.reduce<Record<string, number>>(
      (result, payment) => {
        const method = payment.paymentMethod || "Other";
        result[method] =
          (result[method] ?? 0) + Number(payment.amount || 0);
        return result;
      },
      {}
    );

    const monthlyPayments = buildMonthlyPaymentSeries(
      payments.map((payment) => ({
        amount: payment.amount,
        paymentDate: payment.paymentDate,
        status: payment.status,
      })),
      start,
      end
    );

    const projection = calculateProjection(monthlyPayments);

    const billing = {
      totalInvoiced: Number(totalInvoiced.toFixed(2)),
      totalPaid: Number(totalPaid.toFixed(2)),
      outstanding: Number(outstanding.toFixed(2)),
      cancelled: Number(cancelledInvoices.toFixed(2)),
      collectionRate:
        totalInvoiced > 0
          ? Number(
              Math.min(100, (totalPaid / totalInvoiced) * 100).toFixed(1)
            )
          : 0,
      rangeInvoiced: Number(rangeInvoiced.toFixed(2)),
      rangePaid: Number(rangePaid.toFixed(2)),
      invoiceCount: invoices.length,
      paidPaymentCount: paidPayments.length,
      invoiceStatusCounts,
      paymentMethodTotals: Object.fromEntries(
        Object.entries(paymentMethodTotals).map(([method, amount]) => [
          method,
          Number(amount.toFixed(2)),
        ])
      ),
      monthlyPayments,
      projection,
    };

    // -----------------------------------------------------------------------
    // 11. RESPONSE
    // -----------------------------------------------------------------------

    const report = {
      generatedAt: new Date().toISOString(),

      reportType,

      period: {
        key: rangeKey,
        start: start?.toISOString() ?? null,
        end: end.toISOString(),
        label:
          rangeKey === "all"
            ? "All available history"
            : `Last ${rangeKey === "year" ? "12 months" : rangeKey.replace("d", " days")}`,
      },

      client,

      websiteSummary: {
        total: websites.length,
        live: websites.filter(
          (website) => website.status === "Live"
        ).length,
        development: websites.filter(
          (website) => website.status === "Development"
        ).length,
        review: websites.filter(
          (website) => website.status === "Review"
        ).length,
        maintenance: websites.filter(
          (website) => website.status === "Maintenance"
        ).length,
        offline: websites.filter(
          (website) => website.status === "Offline"
        ).length,
        maintenanceEnrolled: websites.filter(
          (website) => website.maintenanceStatus === "Active"
        ).length,
      },

      websiteAnalytics,

      projectSummary,

      billing,

      websites,
      projects,
      invoices,
      payments,
      events,
    };

    const format = (url.searchParams.get("format") || "json").toLowerCase();

    if (format === "excel" || format === "xlsx") {
      const buffer = await generateClientReportExcel(report as any);
      const body = new Uint8Array(buffer);

      return new NextResponse(body, {
        status: 200,
        headers: {
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "Content-Disposition": `attachment; filename="${getClientReportExcelFilename(
            report as any
          )}"`,
          "Content-Length": String(body.byteLength),
          "Cache-Control": "no-store, no-transform",
        },
      });
    }

    if (format === "pdf") {
      const buffer = await createClientReportPdf(report as any);
      const body = new Uint8Array(buffer);

      return new NextResponse(body, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${getClientReportPdfFilename(
            report as any
          )}"`,
          "Content-Length": String(body.byteLength),
          "Cache-Control": "no-store, no-transform",
        },
      });
    }

    if (format !== "json") {
      return jsonError(
        "Invalid format. Use json, pdf, or excel.",
        400
      );
    }

    return NextResponse.json({
      success: true,
      report,
    });
  } catch (error) {
    console.error("CLIENT REPORT API ERROR:", error);

    return jsonError(
      error instanceof Error
        ? error.message
        : "Unable to generate client report data.",
      500
    );
  }
}
