// FILE: lib/reports/client-report.ts
// PURPOSE: Vertex Studio Works — Shared Client Report Types + Helpers
// NOTE: This file does not query Supabase and does not generate PDF/Excel.
// It defines the single report structure consumed by the report generators.

export type ClientReportType =
  | "combined"
  | "website"
  | "project"
  | "billing";

export type ClientReportRange = "30d" | "90d" | "year" | "all";

export type ClientReportPeriod = {
  key: ClientReportRange;
  start: string | null;
  end: string;
  label: string;
};

export type ClientReportClient = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: string;
  companyType: string;
  lastActivity: string | null;
  createdAt: string | null;
  updatedAt: string | null;
};

export type ClientReportWebsite = {
  id: string;
  name: string;
  websiteUrl: string;
  domain: string;
  hostingProvider: string;
  status: string;
  maintenanceStatus: string;
  launchDate: string | null;
  notes: string;
  project: {
    id: string;
    name: string;
  } | null;
  lastActivity: string | null;
  createdAt: string | null;
  updatedAt: string | null;
};

export type ClientReportProject = {
  id: string;
  name: string;
  description: string;
  status: string;
  progress: number;
  value: number;
  startDate: string | null;
  dueDate: string | null;
  category: string;
  lastActivity: string | null;
  createdAt: string | null;
  updatedAt: string | null;
};

export type ClientReportInvoice = {
  id: string;
  invoiceNumber: string;
  status: string;
  issueDate: string | null;
  dueDate: string | null;
  subtotal: number;
  tax: number;
  total: number;
  notes: string;
  project: {
    id: string;
    name: string;
  } | null;
  createdAt: string | null;
  updatedAt: string | null;
};

export type ClientReportPayment = {
  id: string;
  invoiceId: string;
  installmentId: string | null;
  paymentReference: string;
  amount: number;
  paymentDate: string | null;
  paymentMethod: string;
  status: string;
  notes: string;
  installment: {
    id: string;
    installmentNumber: number;
    description: string;
    percentage: number;
    amount: number;
    status: string;
  } | null;
  createdAt: string | null;
  updatedAt: string | null;
};

export type ClientReportEvent = {
  id: string;
  clientId: string | null;
  websiteId: string | null;
  eventType: string;
  pagePath: string;
  sessionId: string | null;
  visitorId: string | null;
  source: string;
  createdAt: string | null;
};

export type ClientReportWebsiteSummary = {
  total: number;
  live: number;
  development: number;
  review: number;
  maintenance: number;
  offline: number;
  maintenanceEnrolled: number;
};

export type ClientReportWebsiteAnalytics = {
  visitors: number;
  sessions: number;
  pageViews: number;
  averagePagesPerSession: number;
  eventCounts: Record<string, number>;
  sourceCounts: Record<string, number>;
  topPages: Array<{
    page: string;
    views: number;
  }>;
  dailyPageViews: Array<{
    date: string;
    value: number;
  }>;
  dailyVisitors: Array<{
    date: string;
    value: number;
  }>;
  trackedEvents: number;
  note: string;
};

export type ClientReportProjectSummary = {
  total: number;
  active: number;
  completed: number;
  onHold: number;
  averageProgress: number;
  totalProjectValue: number;
};

export type ClientReportProjection = {
  method: string;
  monthsUsed: number;
  monthlyAverage: number;
  next3Months: number;
  projectedMonths: Array<{
    monthOffset: number;
    value: number;
  }>;
};

export type ClientReportBilling = {
  totalInvoiced: number;
  totalPaid: number;
  outstanding: number;
  cancelled: number;
  collectionRate: number;
  rangeInvoiced: number;
  rangePaid: number;
  invoiceCount: number;
  paidPaymentCount: number;
  invoiceStatusCounts: Record<string, number>;
  paymentMethodTotals: Record<string, number>;
  monthlyPayments: Array<{
    month: string;
    value: number;
  }>;
  projection: ClientReportProjection;
};

export type ClientReport = {
  generatedAt: string;
  reportType: ClientReportType;
  period: ClientReportPeriod;

  client: ClientReportClient;

  websiteSummary: ClientReportWebsiteSummary;

  websiteAnalytics: ClientReportWebsiteAnalytics;

  projectSummary: ClientReportProjectSummary;

  billing: ClientReportBilling;

  websites: ClientReportWebsite[];

  projects: ClientReportProject[];

  invoices: ClientReportInvoice[];

  payments: ClientReportPayment[];

  events: ClientReportEvent[];
};

export type ClientReportApiResponse = {
  success: boolean;
  report: ClientReport;
};

export type ClientReportApiError = {
  message: string;
};

export function isClientReport(value: unknown): value is ClientReport {
  if (!value || typeof value !== "object") return false;

  const report = value as Partial<ClientReport>;

  return (
    typeof report.generatedAt === "string" &&
    typeof report.reportType === "string" &&
    typeof report.client === "object" &&
    typeof report.websiteAnalytics === "object" &&
    typeof report.projectSummary === "object" &&
    typeof report.billing === "object" &&
    Array.isArray(report.websites) &&
    Array.isArray(report.projects) &&
    Array.isArray(report.invoices) &&
    Array.isArray(report.payments) &&
    Array.isArray(report.events)
  );
}

export function formatCurrency(
  value: number | string | null | undefined,
  currency = "USD"
) {
  const amount = Number(value ?? 0);

  if (!Number.isFinite(amount)) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(0);
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatNumber(
  value: number | string | null | undefined,
  maximumFractionDigits = 0
) {
  const amount = Number(value ?? 0);

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits,
  }).format(Number.isFinite(amount) ? amount : 0);
}

export function formatPercent(
  value: number | string | null | undefined,
  maximumFractionDigits = 1
) {
  const amount = Number(value ?? 0);

  return `${Number.isFinite(amount) ? amount.toFixed(maximumFractionDigits) : "0.0"}%`;
}

export function formatDate(
  value: string | Date | null | undefined,
  options?: Intl.DateTimeFormatOptions
) {
  if (!value) return "—";

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    ...options,
  }).format(date);
}

export function formatDateTime(value: string | Date | null | undefined) {
  if (!value) return "—";

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function formatMonth(value: string | null | undefined) {
  if (!value) return "—";

  const date = new Date(`${value}-01T00:00:00`);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(date);
}

export function getReportTitle(type: ClientReportType) {
  switch (type) {
    case "website":
      return "Website Performance Report";

    case "project":
      return "Project Report";

    case "billing":
      return "Billing Report";

    case "combined":
    default:
      return "Client Performance Report";
  }
}

export function getReportSubtitle(type: ClientReportType) {
  switch (type) {
    case "website":
      return "Website performance, traffic, and analytics";
    case "project":
      return "Project progress, delivery, and project value";
    case "billing":
      return "Invoices, payments, outstanding balance, and projections";
    case "combined":
    default:
      return "Website, project, and billing performance";
  }
}

export function getStatusLabel(status: string | null | undefined) {
  if (!status) return "Unknown";

  return status
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getClientDisplayName(client: ClientReportClient) {
  return client.company || client.name || "Client";
}

export function getPaymentTotal(
  payments: ClientReportPayment[],
  status = "Paid"
) {
  return Number(
    payments
      .filter((payment) => payment.status === status)
      .reduce((sum, payment) => sum + Number(payment.amount || 0), 0)
      .toFixed(2)
  );
}

export function getInvoiceTotal(invoices: ClientReportInvoice[]) {
  return Number(
    invoices
      .reduce((sum, invoice) => sum + Number(invoice.total || 0), 0)
      .toFixed(2)
  );
}

export function getOutstandingInvoiceTotal(
  invoices: ClientReportInvoice[],
  payments: ClientReportPayment[]
) {
  const totalInvoiced = getInvoiceTotal(invoices);

  const cancelled = invoices
    .filter((invoice) => invoice.status === "Cancelled")
    .reduce((sum, invoice) => sum + Number(invoice.total || 0), 0);

  const paid = getPaymentTotal(payments, "Paid");

  return Math.max(
    0,
    Number((totalInvoiced - cancelled - paid).toFixed(2))
  );
}

export function getWebsiteConversionRate(
  visitors: number,
  conversionEvents: number
) {
  if (visitors <= 0) return 0;

  return Number(((conversionEvents / visitors) * 100).toFixed(2));
}

export function getTopSources(
  sourceCounts: Record<string, number>,
  limit = 10
) {
  return Object.entries(sourceCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([source, count]) => ({
      source,
      count,
    }));
}

export function getTopPages(
  pages: Array<{ page: string; views: number }>,
  limit = 10
) {
  return [...pages]
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
}

export function getInvoiceForPayment(
  payment: ClientReportPayment,
  invoices: ClientReportInvoice[]
) {
  return invoices.find((invoice) => invoice.id === payment.invoiceId) ?? null;
}

export function getReportFileBaseName(report: ClientReport) {
  const clientName =
    getClientDisplayName(report.client)
      .replace(/[^a-z0-9]+/gi, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase() || "client";

  const date = new Date(report.generatedAt);

  const datePart = Number.isNaN(date.getTime())
    ? "report"
    : [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0"),
      ].join("-");

  return `vertex-studio-${clientName}-${datePart}`;
}

export function getProjectionLabel(report: ClientReport) {
  if (report.billing.projection.monthsUsed === 0) {
    return "Projected values unavailable — insufficient historical paid data.";
  }

  return `Projected from the average of the most recent ${report.billing.projection.monthsUsed} historical paid month${
    report.billing.projection.monthsUsed === 1 ? "" : "s"
  }.`;
}
