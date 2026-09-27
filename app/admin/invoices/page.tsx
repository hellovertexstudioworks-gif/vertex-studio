// FILE: app/admin/invoices/page.tsx
// PURPOSE: Vertex Studio Works — Invoices
// Includes Supabase CRUD, itemized invoice line items, payment plans/installments,
// and professional View/Print Invoice.

"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  DollarSign,
  Eye,
  FileText,
  Pencil,
  Plus,
  Printer,
  RefreshCw,
  Search,
  Trash2,
  X,
} from "lucide-react";

type InvoiceStatus = "Draft" | "Sent" | "Paid" | "Overdue" | "Cancelled";
type InstallmentStatus =
  | "Pending"
  | "Due"
  | "Paid"
  | "Overdue"
  | "Cancelled";

type InvoiceItem = {
  id?: string;
  description: string;
  amount: number;
};

type InvoiceInstallment = {
  id?: string;
  installmentNumber: number;
  description: string;
  percentage: number;
  amount: number;
  dueDate: string;
  status: InstallmentStatus;
  paidAt?: string | null;
};

type Invoice = {
  id: string;
  clientId: string;
  client: string;
  projectId: string;
  project: string;
  invoiceNumber: string;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  subtotal: number;
  tax: number;
  total: number;
  notes: string;
  items: InvoiceItem[];
  installments: InvoiceInstallment[];
  createdAt?: string;
  updatedAt?: string;
};

type ClientOption = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
};

type ProjectOption = {
  id: string;
  name: string;
  clientId: string;
};

const statusOptions: InvoiceStatus[] = [
  "Draft",
  "Sent",
  "Paid",
  "Overdue",
  "Cancelled",
];

const installmentStatusOptions: InstallmentStatus[] = [
  "Pending",
  "Due",
  "Paid",
  "Overdue",
  "Cancelled",
];

const paymentPlanOptions = ["Full Payment", "2 Payments", "3 Payments", "4 Payments", "Custom"];

const DEFAULT_PAYMENT_PERCENTAGES: Record<string, number[]> = {
  "Full Payment": [100],
  "2 Payments": [50, 50],
  "3 Payments": [40, 30, 30],
  "4 Payments": [30, 25, 25, 20],
};

function blankItem(): InvoiceItem {
  return {
    description: "",
    amount: 0,
  };
}

function buildInstallments(
  plan: string,
  total: number,
  issueDate: string,
  existing?: InvoiceInstallment[]
): InvoiceInstallment[] {
  if (plan === "Custom" && existing?.length) {
    return existing.map((item, index) => ({
      ...item,
      installmentNumber: index + 1,
      amount: roundMoney((total * Number(item.percentage || 0)) / 100),
    }));
  }

  const percentages =
    DEFAULT_PAYMENT_PERCENTAGES[plan] ?? DEFAULT_PAYMENT_PERCENTAGES["Full Payment"];

  const descriptions =
    percentages.length === 1
      ? ["Full Payment"]
      : percentages.length === 2
        ? ["Deposit", "Final Payment"]
        : percentages.length === 3
          ? ["Deposit", "Development", "Final Payment"]
          : ["Deposit", "Development", "Review", "Final Payment"];

  return percentages.map((percentage, index) => ({
    installmentNumber: index + 1,
    description: descriptions[index] ?? `Payment ${index + 1}`,
    percentage,
    amount: roundMoney((total * percentage) / 100),
    dueDate: addDays(issueDate || todayString(), index * 14),
    status: "Pending",
    paidAt: null,
  }));
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [clients, setClients] = useState<ClientOption[]>([]);
  const [projects, setProjects] = useState<ProjectOption[]>([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [clientFilter, setClientFilter] = useState("All");

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [deletingInvoice, setDeletingInvoice] = useState<Invoice | null>(null);
  const [viewingInvoice, setViewingInvoice] = useState<Invoice | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  const loadData = async (refresh = false) => {
    if (refresh) setIsRefreshing(true);
    else setIsLoading(true);

    setError("");

    try {
      const [invoicesResponse, clientsResponse, projectsResponse] =
        await Promise.all([
          fetch("/api/admin/invoices", { cache: "no-store" }),
          fetch("/api/admin/clients", { cache: "no-store" }),
          fetch("/api/admin/projects", { cache: "no-store" }),
        ]);

      const invoicesData = await invoicesResponse.json().catch(() => ({}));
      const clientsData = await clientsResponse.json().catch(() => ({}));
      const projectsData = await projectsResponse.json().catch(() => ({}));

      if (!invoicesResponse.ok) {
        throw new Error(invoicesData.message || "Unable to load invoices.");
      }
      if (!clientsResponse.ok) {
        throw new Error(clientsData.message || "Unable to load clients.");
      }
      if (!projectsResponse.ok) {
        throw new Error(projectsData.message || "Unable to load projects.");
      }

      setInvoices(
        (invoicesData.invoices ?? []).map((invoice: any) => normalizeInvoice(invoice))
      );

      setClients(
        (clientsData.clients ?? []).map((client: any) => ({
          id: client.id,
          name: client.company ?? client.name ?? "Unknown Client",
          email: client.email ?? "",
          phone: client.phone ?? "",
        }))
      );

      setProjects(
        (projectsData.projects ?? []).map((project: any) => ({
          id: project.id,
          name: project.name,
          clientId: project.clientId,
        }))
      );
    } catch (err) {
      console.error("INVOICES PAGE LOAD ERROR:", err);
      setError(err instanceof Error ? err.message : "Unable to load invoices.");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  const showSuccess = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 3000);
  };

  const filteredInvoices = useMemo(() => {
    const query = search.trim().toLowerCase();

    return invoices.filter((invoice) => {
      const matchesSearch =
        query === "" ||
        invoice.invoiceNumber.toLowerCase().includes(query) ||
        invoice.client.toLowerCase().includes(query) ||
        invoice.project.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || invoice.status === statusFilter;

      const matchesClient =
        clientFilter === "All" || invoice.clientId === clientFilter;

      return matchesSearch && matchesStatus && matchesClient;
    });
  }, [invoices, search, statusFilter, clientFilter]);

  const totalInvoiced = invoices.reduce((sum, invoice) => sum + invoice.total, 0);

  const paidAmount = invoices
    .filter((invoice) => invoice.status === "Paid")
    .reduce((sum, invoice) => sum + invoice.total, 0);

  const outstandingAmount = invoices
    .filter(
      (invoice) =>
        invoice.status === "Sent" || invoice.status === "Overdue"
    )
    .reduce((sum, invoice) => sum + invoice.total, 0);

  const overdueCount = invoices.filter(
    (invoice) => invoice.status === "Overdue"
  ).length;

  const handleAdd = async (invoice: Invoice) => {
    try {
      const response = await fetch("/api/admin/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: invoice.clientId,
          projectId: invoice.projectId || null,
          invoiceNumber: invoice.invoiceNumber,
          status: invoice.status,
          issueDate: invoice.issueDate,
          dueDate: invoice.dueDate || null,
          subtotal: invoice.subtotal,
          tax: invoice.tax,
          total: invoice.total,
          notes: invoice.notes,
          items: invoice.items,
          installments: invoice.installments,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Unable to create invoice.");
      }

      setShowAddModal(false);
      await loadData(true);
      showSuccess(`${invoice.invoiceNumber} was created successfully.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create invoice.");
    }
  };

  const handleEdit = async (invoice: Invoice) => {
    try {
      const response = await fetch("/api/admin/invoices", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: invoice.id,
          clientId: invoice.clientId,
          projectId: invoice.projectId || null,
          invoiceNumber: invoice.invoiceNumber,
          status: invoice.status,
          issueDate: invoice.issueDate,
          dueDate: invoice.dueDate || null,
          subtotal: invoice.subtotal,
          tax: invoice.tax,
          total: invoice.total,
          notes: invoice.notes,
          items: invoice.items,
          installments: invoice.installments,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Unable to update invoice.");
      }

      setEditingInvoice(null);
      await loadData(true);
      showSuccess(`${invoice.invoiceNumber} was updated successfully.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update invoice.");
    }
  };

  const handleDelete = async () => {
    if (!deletingInvoice) return;

    const invoice = deletingInvoice;

    try {
      const response = await fetch(
        `/api/admin/invoices?id=${encodeURIComponent(invoice.id)}`,
        { method: "DELETE" }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Unable to delete invoice.");
      }

      setDeletingInvoice(null);
      await loadData(true);
      showSuccess(`${invoice.invoiceNumber} was deleted successfully.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to delete invoice.");
    }
  };

  return (
    <>
      <main className="w-full bg-[#060914] px-5 py-8 text-white sm:px-8 sm:py-10 xl:px-10">
        <div className="w-full space-y-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/10">
                <FileText className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Invoices
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Create, track, and manage client invoices and billing.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => void loadData(true)}
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/8 bg-[#0b1020] px-4 text-sm font-medium text-slate-300 transition hover:border-amber-400/20 hover:text-white"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                Refresh
              </button>

              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="inline-flex h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-4 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/10 transition hover:brightness-110"
              >
                <Plus className="h-4 w-4" />
                Create Invoice
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-amber-400/10 bg-amber-400/[0.03] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div>
              <p className="text-sm font-medium text-amber-200">Finance workspace</p>
              <p className="mt-0.5 text-xs text-slate-500">
                Invoices are stored in Supabase and connected to real clients,
                projects, line items, and payment plans.
              </p>
            </div>
            <span className="inline-flex w-fit rounded-full border border-emerald-400/15 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
              Supabase
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
            <InvoiceStat
              label="Total Invoiced"
              value={formatCurrency(totalInvoiced)}
              icon={<DollarSign className="h-5 w-5" />}
              color="text-amber-400"
              bg="bg-amber-400/10"
            />
            <InvoiceStat
              label="Paid"
              value={formatCurrency(paidAmount)}
              icon={<CheckCircle2 className="h-5 w-5" />}
              color="text-emerald-400"
              bg="bg-emerald-400/10"
            />
            <InvoiceStat
              label="Outstanding"
              value={formatCurrency(outstandingAmount)}
              icon={<FileText className="h-5 w-5" />}
              color="text-cyan-400"
              bg="bg-cyan-400/10"
            />
            <InvoiceStat
              label="Overdue"
              value={overdueCount.toString()}
              icon={<AlertCircle className="h-5 w-5" />}
              color="text-red-400"
              bg="bg-red-400/10"
            />
          </div>

          {error && (
            <div className="rounded-2xl border border-red-400/15 bg-red-400/[0.04] p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                <div>
                  <p className="text-sm font-semibold text-red-300">
                    Invoice action needs attention
                  </p>
                  <p className="mt-1 text-xs text-slate-500">{error}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setError("");
                      void loadData();
                    }}
                    className="mt-3 text-xs font-medium text-cyan-300 hover:text-cyan-200"
                  >
                    Try again
                  </button>
                </div>
              </div>
            </div>
          )}

          <section className="rounded-2xl border border-white/8 bg-[#0b1020] p-4 sm:p-5">
            <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_210px_230px_auto]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search invoices..."
                  className="h-10 w-full rounded-xl border border-white/8 bg-[#060914] pl-10 pr-3 text-sm text-white outline-none placeholder:text-slate-700 transition focus:border-cyan-400/30 focus:ring-2 focus:ring-cyan-400/10"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="h-10 rounded-xl border border-white/8 bg-[#060914] px-3 text-sm text-slate-300 outline-none focus:border-cyan-400/30"
                style={{ colorScheme: "dark" }}
              >
                <option value="All">All Statuses</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status} style={{ backgroundColor: "#060914", color: "#fff" }}>
                    {status}
                  </option>
                ))}
              </select>

              <select
                value={clientFilter}
                onChange={(event) => setClientFilter(event.target.value)}
                className="h-10 rounded-xl border border-white/8 bg-[#060914] px-3 text-sm text-slate-300 outline-none focus:border-cyan-400/30"
                style={{ colorScheme: "dark" }}
              >
                <option value="All">All Clients</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id} style={{ backgroundColor: "#060914", color: "#fff" }}>
                    {client.name}
                  </option>
                ))}
              </select>

              {(search || statusFilter !== "All" || clientFilter !== "All") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("All");
                    setClientFilter("All");
                  }}
                  className="h-10 rounded-xl border border-white/8 px-4 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </section>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-400">
              Showing <span className="font-semibold text-white">{filteredInvoices.length}</span>{" "}
              of <span className="font-semibold text-white">{invoices.length}</span> invoices
            </p>
            <span className="text-xs text-slate-600">Finance workspace</span>
          </div>

          <section className="hidden overflow-hidden rounded-2xl border border-white/8 bg-[#0b1020] lg:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1150px]">
                <thead>
                  <tr className="border-b border-white/8 bg-white/[0.015] text-left">
                    {["Invoice", "Client", "Project", "Status", "Issue / Due", "Total", "Actions"].map(
                      (heading) => (
                        <th
                          key={heading}
                          className={`px-5 py-4 text-xs font-medium uppercase tracking-wider text-slate-600 ${
                            heading === "Actions" ? "text-right" : ""
                          }`}
                        >
                          {heading}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/6">
                  {isLoading ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-16 text-center text-sm text-slate-500">
                        Loading invoices...
                      </td>
                    </tr>
                  ) : (
                    filteredInvoices.map((invoice) => (
                      <InvoiceTableRow
                        key={invoice.id}
                        invoice={invoice}
                        onView={() => setViewingInvoice(invoice)}
                        onEdit={() => setEditingInvoice(invoice)}
                        onDelete={() => setDeletingInvoice(invoice)}
                      />
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {!isLoading && filteredInvoices.length === 0 && (
              <EmptyInvoiceState onCreate={() => setShowAddModal(true)} />
            )}
          </section>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
            {isLoading ? (
              <div className="sm:col-span-2 rounded-2xl border border-white/8 bg-[#0b1020] px-6 py-16 text-center text-sm text-slate-500">
                Loading invoices...
              </div>
            ) : (
              filteredInvoices.map((invoice) => (
                <InvoiceMobileCard
                  key={invoice.id}
                  invoice={invoice}
                  onView={() => setViewingInvoice(invoice)}
                  onEdit={() => setEditingInvoice(invoice)}
                  onDelete={() => setDeletingInvoice(invoice)}
                />
              ))
            )}
            {!isLoading && filteredInvoices.length === 0 && (
              <div className="sm:col-span-2">
                <EmptyInvoiceState onCreate={() => setShowAddModal(true)} />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-white/8 bg-[#0b1020] p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-white">Billing workflow</p>
              <p className="mt-1 text-xs text-slate-500">
                Invoices connect clients and projects to payments and financial records.
              </p>
            </div>
            <a
              href="/admin/clients"
              className="inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition hover:text-cyan-200"
            >
              View Clients
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </main>

      {showAddModal && (
        <InvoiceFormModal
          title="Create Invoice"
          submitLabel="Create Invoice"
          clients={clients}
          projects={projects}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAdd}
        />
      )}

      {editingInvoice && (
        <InvoiceFormModal
          title="Edit Invoice"
          submitLabel="Save Changes"
          invoice={editingInvoice}
          clients={clients}
          projects={projects}
          onClose={() => setEditingInvoice(null)}
          onSubmit={handleEdit}
        />
      )}

      {deletingInvoice && (
        <DeleteInvoiceModal
          invoice={deletingInvoice}
          onClose={() => setDeletingInvoice(null)}
          onDelete={handleDelete}
        />
      )}

      {viewingInvoice && (
        <InvoicePreviewModal
          invoice={viewingInvoice}
          client={clients.find((item) => item.id === viewingInvoice.clientId)}
          onClose={() => setViewingInvoice(null)}
        />
      )}

      {toast && (
        <div className="fixed bottom-5 right-5 z-[100] w-[calc(100%-40px)] max-w-sm rounded-2xl border border-emerald-400/20 bg-[#0b1020] p-4 shadow-2xl shadow-black/40">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white">Notice</p>
              <p className="mt-1 text-xs text-slate-500">{toast}</p>
            </div>
            <button type="button" onClick={() => setToast("")} className="ml-auto text-slate-600 transition hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function InvoiceTableRow({
  invoice,
  onView,
  onEdit,
  onDelete,
}: {
  invoice: Invoice;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <tr className="group transition hover:bg-white/[0.018]">
      <td className="px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
            <FileText className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{invoice.invoiceNumber}</p>
            <p className="mt-1 text-xs text-slate-600">{formatDate(invoice.issueDate)}</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 text-sm text-slate-300">{invoice.client}</td>
      <td className="px-5 py-5 text-sm text-slate-300">{invoice.project || "No project"}</td>
      <td className="px-5 py-5"><InvoiceStatusBadge status={invoice.status} /></td>
      <td className="px-5 py-5">
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <CalendarDays className="h-3.5 w-3.5" />
          {invoice.dueDate ? formatDate(invoice.dueDate) : "No due date"}
        </div>
      </td>
      <td className="px-5 py-5">
        <span className="text-sm font-semibold text-amber-300">{formatCurrency(invoice.total)}</span>
      </td>
      <td className="px-5 py-5">
        <div className="flex justify-end gap-2">
          <ActionButton title="View / Print Invoice" onClick={onView} icon={<Eye className="h-4 w-4" />} />
          <ActionButton title="Edit Invoice" onClick={onEdit} icon={<Pencil className="h-4 w-4" />} tone="blue" />
          <ActionButton title="Delete Invoice" onClick={onDelete} icon={<Trash2 className="h-4 w-4" />} tone="red" />
        </div>
      </td>
    </tr>
  );
}

function ActionButton({
  title,
  onClick,
  icon,
  tone = "cyan",
}: {
  title: string;
  onClick: () => void;
  icon: React.ReactNode;
  tone?: "cyan" | "blue" | "red";
}) {
  const styles = {
    cyan: "hover:border-cyan-400/20 hover:bg-cyan-400/5 hover:text-cyan-300",
    blue: "hover:border-blue-400/20 hover:bg-blue-400/5 hover:text-blue-300",
    red: "hover:border-red-400/20 hover:bg-red-400/5 hover:text-red-300",
  };

  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 text-slate-500 transition ${styles[tone]}`}
    >
      {icon}
    </button>
  );
}

function InvoiceMobileCard({
  invoice,
  onView,
  onEdit,
  onDelete,
}: {
  invoice: Invoice;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-[#0b1020] p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
            <FileText className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{invoice.invoiceNumber}</p>
            <p className="mt-1 truncate text-xs text-slate-600">{invoice.client}</p>
          </div>
        </div>
        <InvoiceStatusBadge status={invoice.status} />
      </div>

      <p className="mt-4 text-xs text-slate-500">{invoice.project || "No project linked"}</p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-white/6 bg-[#060914] p-3">
          <p className="text-[11px] text-slate-600">Total</p>
          <p className="mt-1 text-sm font-semibold text-amber-300">{formatCurrency(invoice.total)}</p>
        </div>
        <div className="rounded-xl border border-white/6 bg-[#060914] p-3">
          <p className="text-[11px] text-slate-600">Due</p>
          <p className="mt-1 text-xs font-medium text-slate-300">
            {invoice.dueDate ? formatDate(invoice.dueDate) : "No due date"}
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        <button type="button" onClick={onView} className="inline-flex h-9 items-center justify-center gap-1 rounded-lg border border-white/8 text-xs font-medium text-slate-400 transition hover:border-cyan-400/20 hover:text-cyan-300">
          <Eye className="h-3.5 w-3.5" /> View
        </button>
        <button type="button" onClick={onEdit} className="inline-flex h-9 items-center justify-center gap-1 rounded-lg border border-white/8 text-xs font-medium text-slate-400 transition hover:border-blue-400/20 hover:text-blue-300">
          <Pencil className="h-3.5 w-3.5" /> Edit
        </button>
        <button type="button" onClick={onDelete} className="inline-flex h-9 items-center justify-center gap-1 rounded-lg border border-white/8 text-xs font-medium text-slate-400 transition hover:border-red-400/20 hover:text-red-300">
          <Trash2 className="h-3.5 w-3.5" /> Delete
        </button>
      </div>
    </div>
  );
}

function InvoicePreviewModal({
  invoice,
  client,
  onClose,
}: {
  invoice: Invoice;
  client?: ClientOption;
  onClose: () => void;
}) {
  const printInvoice = () => window.print();

  const qrTarget = `https://www.vertexstudioworks.com/?invoice=${encodeURIComponent(invoice.invoiceNumber)}`;
  const qrImageUrl = `https://quickchart.io/qr?size=180&margin=1&text=${encodeURIComponent(qrTarget)}`;

  const items = invoice.items.length
    ? invoice.items
    : [{ description: invoice.project || "Professional Services", amount: invoice.subtotal }];

  const paidInstallments = invoice.installments.filter((item) => item.status === "Paid");
  const paidAmount = paidInstallments.reduce((sum, item) => sum + item.amount, 0);
  const remainingAmount = Math.max(0, invoice.total - paidAmount);

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/80 p-4 backdrop-blur-sm print:static print:block print:bg-white print:p-0">
      <div className="mx-auto max-w-4xl">
        <div className="mb-4 flex items-center justify-between rounded-2xl border border-white/10 bg-[#0b1020] p-3 print:hidden">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-cyan-300" />
            <span className="text-sm font-medium text-white">Invoice Preview</span>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={printInvoice} className="inline-flex h-9 items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 px-4 text-xs font-semibold text-slate-950">
              <Printer className="h-4 w-4" /> Print / Save PDF
            </button>
            <button type="button" onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 text-slate-400 hover:bg-white/5 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="invoice-print-sheet rounded-2xl bg-white text-slate-900 shadow-2xl shadow-black/50 print:rounded-none print:shadow-none">
          <div className="p-8 sm:p-12">
            <div className="flex flex-col gap-8 border-b border-slate-200 pb-8 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm">
                    <span className="text-lg font-black tracking-tight">V</span>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold tracking-tight">Vertex Studio Works</h1>
                    <p className="text-xs text-slate-500">Premium Websites & Business Systems</p>
                  </div>
                </div>
                <div className="mt-5 space-y-1 text-xs text-slate-500">
                  <p>vertexstudioworks.com</p>
                  <p>hello.vertexstudioworks@gmail.com</p>
                </div>
              </div>

              <div className="sm:text-right">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Invoice</p>
                <h2 className="mt-1 text-2xl font-bold">{invoice.invoiceNumber}</h2>
                <div className="mt-3 flex flex-col gap-1 text-xs text-slate-500 sm:items-end">
                  <p>Issue date: {formatDate(invoice.issueDate)}</p>
                  <p>Due date: {invoice.dueDate ? formatDate(invoice.dueDate) : "Upon receipt"}</p>
                  <p>Status: <span className="font-semibold text-slate-700">{invoice.status}</span></p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 py-8 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Bill To</p>
                <p className="mt-2 text-sm font-semibold">{invoice.client}</p>
                {client?.email && <p className="mt-1 break-all text-xs text-slate-500">{client.email}</p>}
                {client?.phone && <p className="mt-1 text-xs text-slate-500">{client.phone}</p>}
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Project</p>
                <p className="mt-2 text-sm font-semibold">{invoice.project || "General Services"}</p>
                <p className="mt-1 text-xs text-slate-500">Professional services</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Payment</p>
                <p className="mt-2 text-sm font-semibold">{invoice.status}</p>
                <p className="mt-1 text-xs text-slate-500">{invoice.dueDate ? `Due ${formatDate(invoice.dueDate)}` : "Due upon receipt"}</p>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200">
              <div className="grid grid-cols-[1fr_auto] border-b border-slate-200 bg-slate-50 px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                <span>Description</span>
                <span>Amount</span>
              </div>
              {items.map((item, index) => (
                <div key={`${item.id ?? "item"}-${index}`} className="grid grid-cols-[1fr_auto] border-b border-slate-100 px-4 py-4 text-sm last:border-b-0">
                  <div>
                    <p className="font-medium">{item.description || "Service"}</p>
                    <p className="mt-1 text-xs text-slate-500">{invoice.invoiceNumber}</p>
                  </div>
                  <span className="font-medium">{formatCurrency(item.amount)}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-8 sm:grid-cols-[1fr_auto] sm:items-start">
              <div className="rounded-xl border border-slate-200 p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Invoice Breakdown</p>
                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between gap-6 text-slate-500">
                    <span>Services subtotal</span>
                    <span className="font-medium text-slate-700">{formatCurrency(invoice.subtotal)}</span>
                  </div>
                  <div className="flex justify-between gap-6 text-slate-500">
                    <span>Tax</span>
                    <span className="font-medium text-slate-700">{formatCurrency(invoice.tax)}</span>
                  </div>
                  <div className="flex justify-between gap-6 border-t border-slate-200 pt-4 text-base font-bold text-slate-900">
                    <span>Invoice total</span>
                    <span>{formatCurrency(invoice.total)}</span>
                  </div>
                </div>
              </div>

              <div className="flex min-w-[180px] flex-col items-center rounded-xl border border-slate-200 p-4 text-center">
                <img src={qrImageUrl} alt="Vertex Studio Works invoice QR code" className="h-28 w-28" />
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">Scan to visit</p>
                <p className="mt-1 text-[10px] text-slate-400">vertexstudioworks.com</p>
              </div>
            </div>

            {invoice.installments.length > 0 && (
              <div className="mt-8 rounded-xl border border-slate-200 overflow-hidden">
                <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Payment Plan</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {invoice.installments.length === 1 ? "Full payment" : `${invoice.installments.length} scheduled payments`}
                      </p>
                    </div>
                    <div className="text-right text-xs">
                      <p className="text-slate-400">Remaining</p>
                      <p className="font-bold text-slate-900">{formatCurrency(remainingAmount)}</p>
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-slate-100">
                  {invoice.installments.map((installment) => (
                    <div key={installment.id ?? installment.installmentNumber} className="grid gap-3 px-5 py-4 sm:grid-cols-[1fr_auto_auto_auto] sm:items-center">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          Payment {installment.installmentNumber} — {installment.description || "Installment"}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {installment.dueDate ? `Due ${formatDate(installment.dueDate)}` : "No due date"}
                        </p>
                      </div>
                      <span className="text-xs font-medium text-slate-500">{formatPercent(installment.percentage)}</span>
                      <span className="text-sm font-semibold text-slate-800">{formatCurrency(installment.amount)}</span>
                      <InstallmentBadge status={installment.status} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {invoice.notes && (
              <div className="mt-8 border-t border-slate-200 pt-6">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Notes</p>
                <p className="mt-2 whitespace-pre-wrap text-xs leading-5 text-slate-500">{invoice.notes}</p>
              </div>
            )}

            <div className="mt-8 grid gap-6 border-t border-slate-200 pt-6 sm:grid-cols-2">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Payment Terms</p>
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Please reference the invoice number when making or discussing payment.
                </p>
              </div>
              <div className="sm:text-right">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Invoice Reference</p>
                <p className="mt-2 text-xs font-semibold text-slate-700">{invoice.invoiceNumber}</p>
              </div>
            </div>

            <div className="mt-10 border-t border-slate-200 pt-5 text-center text-[11px] text-slate-400">
              Thank you for choosing Vertex Studio Works.
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body { background: white !important; }
          body > * { visibility: hidden !important; }
          .invoice-print-sheet,
          .invoice-print-sheet * { visibility: visible !important; }
          .invoice-print-sheet {
            position: absolute !important;
            inset: 0 !important;
            width: 100% !important;
            margin: 0 !important;
          }
          @page { size: A4; margin: 0; }
        }
      `}</style>
    </div>
  );
}

function InvoiceFormModal({
  title,
  submitLabel,
  invoice,
  clients,
  projects,
  onClose,
  onSubmit,
}: {
  title: string;
  submitLabel: string;
  invoice?: Invoice;
  clients: ClientOption[];
  projects: ProjectOption[];
  onClose: () => void;
  onSubmit: (invoice: Invoice) => void;
}) {
  const firstClient = clients[0];

  const [form, setForm] = useState<Invoice>(() => {
    if (invoice) {
      return {
        ...invoice,
        items:
          invoice.items?.length
            ? invoice.items
            : [{ description: invoice.project || "Professional Services", amount: invoice.subtotal }],
        installments:
          invoice.installments?.length
            ? invoice.installments
            : buildInstallments("Full Payment", invoice.total, invoice.issueDate),
      };
    }

    return {
      id: "",
      clientId: firstClient?.id ?? "",
      client: firstClient?.name ?? "",
      projectId: "",
      project: "",
      invoiceNumber: `INV-${new Date().getFullYear()}-${String(Date.now()).slice(-5)}`,
      status: "Draft",
      issueDate: todayString(),
      dueDate: "",
      subtotal: 0,
      tax: 0,
      total: 0,
      notes: "",
      items: [blankItem()],
      installments: buildInstallments("Full Payment", 0, todayString()),
    };
  });

  const [paymentPlan, setPaymentPlan] = useState(() => {
    if (!invoice?.installments?.length) return "Full Payment";
    const count = invoice.installments.length;
    if (count >= 2 && count <= 4) return `${count} Payments`;
    return "Custom";
  });

  const [formError, setFormError] = useState("");

  const clientProjects = useMemo(
    () => projects.filter((project) => project.clientId === form.clientId),
    [projects, form.clientId]
  );

  const subtotal = roundMoney(
    form.items.reduce((sum, item) => sum + Math.max(0, Number(item.amount) || 0), 0)
  );
  const tax = Math.max(0, Number(form.tax) || 0);
  const total = roundMoney(subtotal + tax);

  const update = <K extends keyof Invoice>(field: K, value: Invoice[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const changeClient = (clientId: string) => {
    const selected = clients.find((client) => client.id === clientId);
    setForm((current) => ({
      ...current,
      clientId,
      client: selected?.name ?? "",
      projectId: "",
      project: "",
    }));
  };

  const changeProject = (projectId: string) => {
    const selected = clientProjects.find((project) => project.id === projectId);
    setForm((current) => ({
      ...current,
      projectId,
      project: selected?.name ?? "",
    }));
  };

  const updateItem = (index: number, field: keyof InvoiceItem, value: string) => {
    setForm((current) => ({
      ...current,
      items: current.items.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [field]:
                field === "amount" ? Math.max(0, Number(value) || 0) : value,
            }
          : item
      ),
    }));
  };

  const addItem = () => {
    setForm((current) => ({
      ...current,
      items: [...current.items, blankItem()],
    }));
  };

  const removeItem = (index: number) => {
    setForm((current) => ({
      ...current,
      items:
        current.items.length === 1
          ? [blankItem()]
          : current.items.filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const applyPaymentPlan = (plan: string) => {
    setPaymentPlan(plan);
    setForm((current) => ({
      ...current,
      installments: buildInstallments(plan, total, current.issueDate, plan === "Custom" ? current.installments : undefined),
    }));
  };

  const updateInstallment = (
    index: number,
    field: keyof InvoiceInstallment,
    value: string
  ) => {
    setForm((current) => {
      const next = current.installments.map((item, itemIndex) => {
        if (itemIndex !== index) return item;

        if (field === "percentage") {
          const percentage = Math.max(0, Math.min(100, Number(value) || 0));
          return {
            ...item,
            percentage,
            amount: roundMoney((total * percentage) / 100),
          };
        }

        if (field === "amount") {
          return { ...item, amount: Math.max(0, Number(value) || 0) };
        }

        return { ...item, [field]: value };
      });

      return { ...current, installments: next };
    });
  };

  const addInstallment = () => {
    setPaymentPlan("Custom");
    setForm((current) => ({
      ...current,
      installments: [
        ...current.installments,
        {
          installmentNumber: current.installments.length + 1,
          description: `Payment ${current.installments.length + 1}`,
          percentage: 0,
          amount: 0,
          dueDate: "",
          status: "Pending",
          paidAt: null,
        },
      ],
    }));
  };

  const removeInstallment = (index: number) => {
    setPaymentPlan("Custom");
    setForm((current) => {
      const remaining = current.installments.filter((_, itemIndex) => itemIndex !== index);
      return {
        ...current,
        installments: remaining.map((item, itemIndex) => ({
          ...item,
          installmentNumber: itemIndex + 1,
        })),
      };
    });
  };

  const syncInstallmentAmounts = () => {
    setForm((current) => ({
      ...current,
      installments: current.installments.map((item) => ({
        ...item,
        amount: roundMoney((total * Number(item.percentage || 0)) / 100),
      })),
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    if (!form.clientId || !form.invoiceNumber.trim()) {
      setFormError("Client and invoice number are required.");
      return;
    }

    if (!form.items.some((item) => item.description.trim() && Number(item.amount) > 0)) {
      setFormError("Add at least one invoice line item with a description and amount.");
      return;
    }

    const percentageTotal = roundMoney(
      form.installments.reduce((sum, item) => sum + Number(item.percentage || 0), 0)
    );

    if (form.installments.length > 0 && Math.abs(percentageTotal - 100) > 0.01) {
      setFormError(`Payment plan percentages must total 100%. Current total: ${formatPercent(percentageTotal)}.`);
      return;
    }

    const cleanedItems = form.items
      .filter((item) => item.description.trim() || Number(item.amount) > 0)
      .map((item) => ({
        ...item,
        description: item.description.trim(),
        amount: roundMoney(Number(item.amount) || 0),
      }));

    const cleanedInstallments = form.installments.map((item, index) => ({
      ...item,
      installmentNumber: index + 1,
      description: item.description.trim() || `Payment ${index + 1}`,
      percentage: roundMoney(Number(item.percentage) || 0),
      amount: roundMoney((total * Number(item.percentage || 0)) / 100),
      dueDate: item.dueDate || "",
    }));

    onSubmit({
      ...form,
      invoiceNumber: form.invoiceNumber.trim(),
      items: cleanedItems,
      installments: cleanedInstallments,
      subtotal,
      tax,
      total,
      dueDate: form.dueDate || "",
      notes: form.notes.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-white/10 bg-[#0b1020] shadow-2xl shadow-black/50">
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/8 bg-[#0b1020] px-5 py-4 sm:px-6">
          <div>
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            <p className="mt-1 text-xs text-slate-500">
              {invoice ? "Update invoice information, line items, and payment plan." : "Create a new itemized invoice for a client."}
            </p>
          </div>
          <button type="button" onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/5 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-5 sm:p-6">
          {formError && (
            <div className="rounded-xl border border-red-400/15 bg-red-400/[0.04] p-3 text-xs text-red-300">
              {formError}
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField label="Invoice Number" value={form.invoiceNumber} onChange={(value) => update("invoiceNumber", value)} placeholder="INV-2026-0001" required />
            <SelectField label="Client" value={form.clientId} onChange={changeClient} options={clients.map((client) => client.id)} labels={clients.map((client) => client.name)} required />
            <SelectField label="Project" value={form.projectId} onChange={changeProject} options={["", ...clientProjects.map((project) => project.id)]} labels={["No Project", ...clientProjects.map((project) => project.name)]} />
            <SelectField label="Status" value={form.status} onChange={(value) => update("status", value as InvoiceStatus)} options={statusOptions} />
            <FormField label="Issue Date" type="date" value={form.issueDate} onChange={(value) => update("issueDate", value)} required />
            <FormField label="Due Date" type="date" value={form.dueDate} onChange={(value) => update("dueDate", value)} />
          </div>

          <section className="rounded-2xl border border-white/8 bg-[#060914] p-4 sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Invoice Line Items</p>
                <p className="mt-1 text-xs text-slate-500">
                  Break the invoice into the actual services and costs the client is paying for.
                </p>
              </div>
              <button
                type="button"
                onClick={addItem}
                className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-cyan-400/20 bg-cyan-400/5 px-3 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-400/10"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Line Item
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {form.items.map((item, index) => (
                <div key={item.id ?? `new-item-${index}`} className="grid gap-3 rounded-xl border border-white/6 bg-[#0b1020] p-3 sm:grid-cols-[minmax(0,1fr)_150px_40px] sm:items-end">
                  <FormField
                    label={`Description ${index + 1}`}
                    value={item.description}
                    onChange={(value) => updateItem(index, "description", value)}
                    placeholder="e.g. Website Design & Development"
                  />
                  <FormField
                    label="Amount"
                    type="number"
                    value={String(item.amount)}
                    onChange={(value) => updateItem(index, "amount", value)}
                    placeholder="0.00"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/8 text-slate-600 transition hover:border-red-400/20 hover:bg-red-400/5 hover:text-red-300"
                    title="Remove line item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-4">
              <span className="text-xs text-slate-500">Services subtotal</span>
              <span className="text-sm font-semibold text-white">{formatCurrency(subtotal)}</span>
            </div>
          </section>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="Tax"
              type="number"
              value={String(form.tax)}
              onChange={(value) => update("tax", Math.max(0, Number(value) || 0))}
              placeholder="0"
            />
            <div className="rounded-xl border border-amber-400/10 bg-amber-400/[0.03] p-4">
              <p className="text-xs text-slate-500">Invoice Total</p>
              <p className="mt-1 text-xl font-semibold text-amber-300">{formatCurrency(total)}</p>
            </div>
          </div>

          <section className="rounded-2xl border border-white/8 bg-[#060914] p-4 sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Payment Plan</p>
                <p className="mt-1 text-xs text-slate-500">
                  Let clients pay the invoice in full, in installments, or on a custom schedule.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <SelectField
                  label=""
                  value={paymentPlan}
                  onChange={applyPaymentPlan}
                  options={paymentPlanOptions}
                />
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {form.installments.map((installment, index) => (
                <div key={installment.id ?? `installment-${index}`} className="rounded-xl border border-white/6 bg-[#0b1020] p-4">
                  <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_100px_130px_145px_120px_40px] xl:items-end">
                    <FormField
                      label={`Payment ${index + 1}`}
                      value={installment.description}
                      onChange={(value) => updateInstallment(index, "description", value)}
                      placeholder="Deposit"
                    />
                    <FormField
                      label="%"
                      type="number"
                      value={String(installment.percentage)}
                      onChange={(value) => updateInstallment(index, "percentage", value)}
                      placeholder="40"
                    />
                    <div>
                      <span className="mb-2 block text-xs font-medium text-slate-400">Amount</span>
                      <div className="flex h-10 items-center rounded-xl border border-white/8 bg-[#060914] px-3 text-sm font-semibold text-amber-300">
                        {formatCurrency((total * Number(installment.percentage || 0)) / 100)}
                      </div>
                    </div>
                    <FormField
                      label="Due Date"
                      type="date"
                      value={installment.dueDate}
                      onChange={(value) => updateInstallment(index, "dueDate", value)}
                    />
                    <SelectField
                      label="Status"
                      value={installment.status}
                      onChange={(value) => updateInstallment(index, "status", value)}
                      options={installmentStatusOptions}
                    />
                    <button
                      type="button"
                      onClick={() => removeInstallment(index)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/8 text-slate-600 transition hover:border-red-400/20 hover:bg-red-400/5 hover:text-red-300"
                      title="Remove payment"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-col gap-3 border-t border-white/8 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4 text-xs">
                <span className="text-slate-500">
                  Allocation:{" "}
                  <span
                    className={
                      Math.abs(
                        form.installments.reduce((sum, item) => sum + Number(item.percentage || 0), 0) - 100
                      ) < 0.01
                        ? "text-emerald-300"
                        : "text-red-300"
                    }
                  >
                    {formatPercent(form.installments.reduce((sum, item) => sum + Number(item.percentage || 0), 0))}
                  </span>
                </span>
                <span className="text-slate-500">Total: <span className="font-semibold text-white">{formatCurrency(total)}</span></span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={syncInstallmentAmounts}
                  className="h-9 rounded-lg border border-white/8 px-3 text-xs font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
                >
                  Recalculate Amounts
                </button>
                <button
                  type="button"
                  onClick={addInstallment}
                  className="inline-flex h-9 items-center gap-2 rounded-lg border border-cyan-400/20 bg-cyan-400/5 px-3 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-400/10"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add Payment
                </button>
              </div>
            </div>
          </section>

          <label className="block">
            <span className="mb-2 block text-xs font-medium text-slate-400">Notes</span>
            <textarea
              value={form.notes}
              onChange={(event) => update("notes", event.target.value)}
              rows={4}
              placeholder="Payment terms, notes, or additional information..."
              className="w-full resize-none rounded-xl border border-white/8 bg-[#060914] px-3 py-3 text-sm text-white outline-none placeholder:text-slate-700 transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
            />
          </label>

          <div className="rounded-xl border border-amber-400/10 bg-amber-400/[0.03] p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-amber-400" />
              <p className="text-xs font-medium text-amber-300">Invoice Summary</p>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3">
              <SummaryValue label="Subtotal" value={formatCurrency(subtotal)} />
              <SummaryValue label="Tax" value={formatCurrency(tax)} />
              <SummaryValue label="Total" value={formatCurrency(total)} emphasis />
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-white/8 pt-5 sm:flex-row sm:justify-end">
            <button type="button" onClick={onClose} className="h-10 rounded-xl border border-white/8 px-4 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white">
              Cancel
            </button>
            <button type="submit" className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 text-sm font-semibold text-slate-950 transition hover:brightness-110">
              <FileText className="h-4 w-4" />
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeleteInvoiceModal({
  invoice,
  onClose,
  onDelete,
}: {
  invoice: Invoice;
  onClose: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-red-400/15 bg-[#0b1020] p-6 shadow-2xl shadow-black/50">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-400/10">
          <Trash2 className="h-5 w-5 text-red-400" />
        </div>
        <h2 className="mt-5 text-lg font-semibold text-white">Delete invoice?</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Are you sure you want to delete{" "}
          <span className="font-medium text-slate-300">{invoice.invoiceNumber}</span>?
        </p>
        <div className="mt-4 rounded-xl border border-red-400/10 bg-red-400/[0.04] p-3">
          <p className="text-xs leading-5 text-red-300/80">
            This permanently removes the invoice and its line items/payment plan records.
          </p>
        </div>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button type="button" onClick={onClose} className="h-10 rounded-xl border border-white/8 px-4 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white">
            Cancel
          </button>
          <button type="button" onClick={onDelete} className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-red-500/90 px-4 text-sm font-semibold text-white transition hover:bg-red-500">
            <Trash2 className="h-4 w-4" /> Delete Invoice
          </button>
        </div>
      </div>
    </div>
  );
}

function InvoiceStat({
  label,
  value,
  icon,
  color,
  bg,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-[#0b1020] p-5 transition hover:border-amber-400/10">
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg}`}>
        <span className={color}>{icon}</span>
      </div>
      <p className="mt-4 text-xs text-slate-600">{label}</p>
      <p className="mt-1 text-xl font-semibold text-white">{value}</p>
    </div>
  );
}

function InvoiceStatusBadge({ status }: { status: InvoiceStatus }) {
  const styles: Record<InvoiceStatus, string> = {
    Draft: "border-slate-400/15 bg-slate-400/10 text-slate-300",
    Sent: "border-blue-400/15 bg-blue-400/10 text-blue-300",
    Paid: "border-emerald-400/15 bg-emerald-400/10 text-emerald-400",
    Overdue: "border-red-400/15 bg-red-400/10 text-red-300",
    Cancelled: "border-slate-500/15 bg-slate-500/10 text-slate-500",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${styles[status]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function InstallmentBadge({ status }: { status: InstallmentStatus }) {
  const styles: Record<InstallmentStatus, string> = {
    Pending: "bg-slate-100 text-slate-600",
    Due: "bg-amber-100 text-amber-700",
    Paid: "bg-emerald-100 text-emerald-700",
    Overdue: "bg-red-100 text-red-700",
    Cancelled: "bg-slate-200 text-slate-500",
  };

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${styles[status]}`}>
      {status}
    </span>
  );
}

function FormField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      {label && <span className="mb-2 block text-xs font-medium text-slate-400">{label}</span>}
      <input
        type={type}
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-xl border border-white/8 bg-[#060914] px-3 text-sm text-white outline-none placeholder:text-slate-700 transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  labels,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  labels?: string[];
  required?: boolean;
}) {
  return (
    <label className="block">
      {label && <span className="mb-2 block text-xs font-medium text-slate-400">{label}</span>}
      <select
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-full rounded-xl border border-white/8 bg-[#060914] px-3 text-sm text-white outline-none transition focus:border-cyan-400/40"
        style={{ colorScheme: "dark" }}
      >
        {options.map((option, index) => (
          <option key={`${option}-${index}`} value={option} style={{ backgroundColor: "#060914", color: "#ffffff" }}>
            {labels?.[index] ?? (option || "No Project")}
          </option>
        ))}
      </select>
    </label>
  );
}

function SummaryValue({
  label,
  value,
  emphasis = false,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div>
      <p className="text-[11px] text-slate-600">{label}</p>
      <p className={`mt-1 text-sm font-semibold ${emphasis ? "text-amber-300" : "text-slate-300"}`}>
        {value}
      </p>
    </div>
  );
}

function EmptyInvoiceState({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="px-6 py-14 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400/10">
        <FileText className="h-5 w-5 text-amber-400" />
      </div>
      <h3 className="mt-4 text-sm font-semibold text-white">No invoices yet</h3>
      <p className="mt-2 text-xs text-slate-500">
        Create your first invoice to start tracking billing.
      </p>
      <button type="button" onClick={onCreate} className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition hover:text-cyan-200">
        Create Invoice
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function normalizeInvoice(row: any): Invoice {
  const client = Array.isArray(row.clients) ? row.clients[0] : row.clients;
  const project = Array.isArray(row.projects) ? row.projects[0] : row.projects;

  const items: InvoiceItem[] = Array.isArray(row.items)
    ? row.items.map((item: any) => ({
        id: item.id,
        description: item.description ?? "",
        amount: Number(item.amount ?? 0),
      }))
    : [];

  const installments: InvoiceInstallment[] = Array.isArray(row.installments)
    ? row.installments.map((item: any, index: number) => ({
        id: item.id,
        installmentNumber: Number(item.installment_number ?? item.installmentNumber ?? index + 1),
        description: item.description ?? "",
        percentage: Number(item.percentage ?? 0),
        amount: Number(item.amount ?? 0),
        dueDate: item.due_date ?? item.dueDate ?? "",
        status: item.status ?? "Pending",
        paidAt: item.paid_at ?? item.paidAt ?? null,
      }))
    : [];

  return {
    id: row.id,
    clientId: row.client_id ?? row.clientId ?? "",
    client: client?.company ?? client?.name ?? row.client ?? "Unknown Client",
    projectId: row.project_id ?? row.projectId ?? "",
    project: project?.name ?? row.project ?? "",
    invoiceNumber: row.invoice_number ?? row.invoiceNumber ?? "",
    status: row.status,
    issueDate: row.issue_date ?? row.issueDate ?? "",
    dueDate: row.due_date ?? row.dueDate ?? "",
    subtotal: Number(row.subtotal ?? 0),
    tax: Number(row.tax ?? 0),
    total: Number(row.total ?? 0),
    notes: row.notes ?? "",
    items:
      items.length > 0
        ? items
        : [{ description: project?.name ?? row.project ?? "Professional Services", amount: Number(row.subtotal ?? 0) }],
    installments,
    createdAt: row.created_at ?? row.createdAt,
    updatedAt: row.updated_at ?? row.updatedAt,
  };
}

function roundMoney(value: number) {
  return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
}

function formatCurrency(value: number) {
  return `$${Number(value || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatPercent(value: number) {
  return `${Number(value || 0).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}%`;
}

function todayString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function addDays(dateString: string, days: number) {
  const date = new Date(`${dateString || todayString()}T00:00:00`);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function formatDate(value: string) {
  if (!value) return "—";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
