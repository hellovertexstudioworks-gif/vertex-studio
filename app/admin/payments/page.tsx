// FILE: app/admin/payments/page.tsx
// PURPOSE: Vertex Studio Works — Payments
// Connects real payment records to invoices through /api/admin/payments.

"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  DollarSign,
  Eye,
  Pencil,
  Plus,
  ReceiptText,
  RefreshCw,
  Search,
  Trash2,
  WalletCards,
  X,
} from "lucide-react";

type PaymentStatus =
  | "Pending"
  | "Paid"
  | "Failed"
  | "Refunded"
  | "Cancelled";

type PaymentMethod =
  | "GCash"
  | "Bank Transfer"
  | "PayPal"
  | "Stripe"
  | "Cash"
  | "Other";

type Payment = {
  id: string;
  invoiceId: string;
  invoiceNumber: string;
  clientId: string;
  client: string;
  installmentId: string;
  installmentNumber: number | null;
  installmentDescription: string;
  paymentReference: string;
  amount: number;
  paymentDate: string;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  notes: string;
  createdAt?: string;
  updatedAt?: string;
};

type Invoice = {
  id: string;
  invoiceNumber: string;
  clientId: string;
  client: string;
  project: string;
  status: string;
  total: number;
  issueDate: string;
  dueDate: string;
};

type Installment = {
  id: string;
  invoice_id: string;
  installment_number: number;
  description: string;
  percentage: number;
  amount: number;
  due_date: string | null;
  status: string;
  paid_at: string | null;
};

const statusOptions: PaymentStatus[] = [
  "Pending",
  "Paid",
  "Failed",
  "Refunded",
  "Cancelled",
];

const methodOptions: PaymentMethod[] = [
  "GCash",
  "Bank Transfer",
  "PayPal",
  "Stripe",
  "Cash",
  "Other",
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}

function formatDate(value?: string) {
  if (!value) return "—";

  const date = new Date(`${value.slice(0, 10)}T00:00:00`);

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function localDateString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function makePaymentReference() {
  return `PAY-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
}

const statusClasses: Record<PaymentStatus, string> = {
  Pending:
    "border-amber-400/15 bg-amber-400/10 text-amber-300",
  Paid:
    "border-emerald-400/15 bg-emerald-400/10 text-emerald-300",
  Failed:
    "border-red-400/15 bg-red-400/10 text-red-300",
  Refunded:
    "border-violet-400/15 bg-violet-400/10 text-violet-300",
  Cancelled:
    "border-slate-400/15 bg-slate-400/10 text-slate-400",
};

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [methodFilter, setMethodFilter] = useState("All");

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);
  const [deletingPayment, setDeletingPayment] = useState<Payment | null>(null);
  const [viewingPayment, setViewingPayment] = useState<Payment | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  const loadData = async (refresh = false) => {
    if (refresh) setIsRefreshing(true);
    else setIsLoading(true);

    setError("");

    try {
      const [paymentsResponse, invoicesResponse] = await Promise.all([
        fetch("/api/admin/payments", { cache: "no-store" }),
        fetch("/api/admin/invoices", { cache: "no-store" }),
      ]);

      const paymentsData = await paymentsResponse.json().catch(() => ({}));
      const invoicesData = await invoicesResponse.json().catch(() => ({}));

      if (!paymentsResponse.ok) {
        throw new Error(
          paymentsData.message || "Unable to load payments."
        );
      }

      if (!invoicesResponse.ok) {
        throw new Error(
          invoicesData.message || "Unable to load invoices."
        );
      }

      setPayments(paymentsData.payments ?? []);
      setInvoices(invoicesData.invoices ?? []);
    } catch (err) {
      console.error("PAYMENTS PAGE LOAD ERROR:", err);
      setError(
        err instanceof Error ? err.message : "Unable to load payments."
      );
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

  const filteredPayments = useMemo(() => {
    const query = search.trim().toLowerCase();

    return payments.filter((payment) => {
      const matchesSearch =
        query === "" ||
        payment.paymentReference.toLowerCase().includes(query) ||
        payment.invoiceNumber.toLowerCase().includes(query) ||
        payment.client.toLowerCase().includes(query) ||
        payment.paymentMethod.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || payment.status === statusFilter;

      const matchesMethod =
        methodFilter === "All" || payment.paymentMethod === methodFilter;

      return matchesSearch && matchesStatus && matchesMethod;
    });
  }, [payments, search, statusFilter, methodFilter]);

  const totalReceived = payments
    .filter((payment) => payment.status === "Paid")
    .reduce((sum, payment) => sum + payment.amount, 0);

  const pendingAmount = payments
    .filter((payment) => payment.status === "Pending")
    .reduce((sum, payment) => sum + payment.amount, 0);

  const refundedAmount = payments
    .filter((payment) => payment.status === "Refunded")
    .reduce((sum, payment) => sum + payment.amount, 0);

  const paidPaymentCount = payments.filter(
    (payment) => payment.status === "Paid"
  ).length;

  const invoiceBalanceMap = useMemo(() => {
    const map = new Map<string, number>();

    for (const invoice of invoices) {
      map.set(invoice.id, Number(invoice.total ?? 0));
    }

    for (const payment of payments) {
      if (payment.status === "Paid") {
        map.set(
          payment.invoiceId,
          Math.max(
            0,
            (map.get(payment.invoiceId) ?? 0) - payment.amount
          )
        );
      }
    }

    return map;
  }, [invoices, payments]);

  const handleCreate = async (payment: Payment) => {
    try {
      const response = await fetch("/api/admin/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoiceId: payment.invoiceId,
          installmentId: payment.installmentId || null,
          paymentReference: payment.paymentReference,
          amount: payment.amount,
          paymentDate: payment.paymentDate,
          paymentMethod: payment.paymentMethod,
          status: payment.status,
          notes: payment.notes,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Unable to create payment.");
      }

      setShowAddModal(false);
      await loadData(true);
      showSuccess(
        `${payment.paymentReference} was recorded successfully.`
      );
    } catch (err) {
      showSuccess(
        err instanceof Error ? err.message : "Unable to create payment."
      );
    }
  };

  const handleEdit = async (payment: Payment) => {
    try {
      const response = await fetch("/api/admin/payments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: payment.id,
          invoiceId: payment.invoiceId,
          installmentId: payment.installmentId || null,
          paymentReference: payment.paymentReference,
          amount: payment.amount,
          paymentDate: payment.paymentDate,
          paymentMethod: payment.paymentMethod,
          status: payment.status,
          notes: payment.notes,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Unable to update payment.");
      }

      setEditingPayment(null);
      await loadData(true);
      showSuccess(
        `${payment.paymentReference} was updated successfully.`
      );
    } catch (err) {
      showSuccess(
        err instanceof Error ? err.message : "Unable to update payment."
      );
    }
  };

  const handleDelete = async () => {
    if (!deletingPayment) return;

    const payment = deletingPayment;

    try {
      const response = await fetch(
        `/api/admin/payments?id=${encodeURIComponent(payment.id)}`,
        { method: "DELETE" }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Unable to delete payment.");
      }

      setDeletingPayment(null);
      await loadData(true);
      showSuccess(
        `${payment.paymentReference} was deleted successfully.`
      );
    } catch (err) {
      showSuccess(
        err instanceof Error ? err.message : "Unable to delete payment."
      );
    }
  };

  return (
    <>
      <main
        className="w-full px-5 py-8 text-white sm:px-8 sm:py-10 xl:px-10"
        style={{ backgroundColor: "var(--vertex-bg)" }}
      >
        <div className="w-full space-y-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/10">
                <WalletCards className="h-5 w-5 text-emerald-400" />
              </div>

              <div>
                <h1
                  className="text-2xl font-semibold tracking-tight sm:text-3xl"
                  style={{ color: "var(--vertex-text)" }}
                >
                  Payments
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Record, track, and manage client payments and balances.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => void loadData(true)}
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/8 bg-[#0b1020] px-4 text-sm font-medium text-slate-300 transition hover:border-emerald-400/20 hover:text-white"
              >
                <RefreshCw
                  className={`h-4 w-4 ${
                    isRefreshing ? "animate-spin" : ""
                  }`}
                />
                Refresh
              </button>

              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="inline-flex h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-4 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/10 transition hover:brightness-110"
              >
                <Plus className="h-4 w-4" />
                Record Payment
              </button>
            </div>
          </div>

          <section className="flex flex-col gap-4 rounded-2xl border border-white/8 bg-[#0b1020] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div>
              <p className="text-sm font-semibold text-white">
                Payment workspace
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Payments are stored in Supabase and connected to real invoices.
              </p>
            </div>

            <span className="inline-flex w-fit rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold text-emerald-300">
              Supabase
            </span>
          </section>

          {error && (
            <div className="flex items-start gap-3 rounded-2xl border border-red-400/15 bg-red-400/5 p-4 text-sm text-red-300">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <div>
                <p className="font-medium">Payments could not be loaded.</p>
                <p className="mt-1 text-xs text-red-300/80">{error}</p>
              </div>
            </div>
          )}

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Total Received"
              value={formatCurrency(totalReceived)}
              icon={DollarSign}
              iconClass="text-emerald-400"
              iconBg="bg-emerald-400/10"
            />
            <StatCard
              label="Pending Payments"
              value={formatCurrency(pendingAmount)}
              icon={Clock3}
              iconClass="text-amber-400"
              iconBg="bg-amber-400/10"
            />
            <StatCard
              label="Refunded"
              value={formatCurrency(refundedAmount)}
              icon={RefreshCw}
              iconClass="text-violet-400"
              iconBg="bg-violet-400/10"
            />
            <StatCard
              label="Paid Transactions"
              value={String(paidPaymentCount)}
              icon={CheckCircle2}
              iconClass="text-cyan-400"
              iconBg="bg-cyan-400/10"
            />
          </section>

          <section className="rounded-2xl border border-white/8 bg-[#0b1020] p-4 sm:p-5">
            <div className="flex flex-col gap-3 xl:flex-row">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search payments, invoices, clients..."
                  className="h-10 w-full rounded-xl border border-white/8 bg-[#060914] pl-10 pr-4 text-sm text-slate-300 outline-none placeholder:text-slate-700 focus:border-cyan-400/30"
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
                  <option
                    key={status}
                    value={status}
                    style={{
                      backgroundColor: "#060914",
                      color: "#fff",
                    }}
                  >
                    {status}
                  </option>
                ))}
              </select>

              <select
                value={methodFilter}
                onChange={(event) => setMethodFilter(event.target.value)}
                className="h-10 rounded-xl border border-white/8 bg-[#060914] px-3 text-sm text-slate-300 outline-none focus:border-cyan-400/30"
                style={{ colorScheme: "dark" }}
              >
                <option value="All">All Methods</option>
                {methodOptions.map((method) => (
                  <option
                    key={method}
                    value={method}
                    style={{
                      backgroundColor: "#060914",
                      color: "#fff",
                    }}
                  >
                    {method}
                  </option>
                ))}
              </select>

              {(search ||
                statusFilter !== "All" ||
                methodFilter !== "All") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("All");
                    setMethodFilter("All");
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
              Showing{" "}
              <span className="font-semibold text-white">
                {filteredPayments.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-white">
                {payments.length}
              </span>{" "}
              payments
            </p>
            <span className="text-xs text-slate-600">Finance workspace</span>
          </div>

          <section className="hidden overflow-hidden rounded-2xl border border-white/8 bg-[#0b1020] lg:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1250px]">
                <thead>
                  <tr className="border-b border-white/8 bg-white/[0.015] text-left">
                    {[
                      "Payment",
                      "Client",
                      "Invoice",
                      "Amount",
                      "Method",
                      "Status",
                      "Date",
                      "Actions",
                    ].map((heading) => (
                      <th
                        key={heading}
                        className={`px-5 py-4 text-xs font-medium uppercase tracking-wider text-slate-600 ${
                          heading === "Actions" ? "text-right" : ""
                        }`}
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/6">
                  {isLoading ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-6 py-16 text-center text-sm text-slate-500"
                      >
                        Loading payments...
                      </td>
                    </tr>
                  ) : (
                    filteredPayments.map((payment) => (
                      <PaymentTableRow
                        key={payment.id}
                        payment={payment}
                        balance={
                          invoiceBalanceMap.get(payment.invoiceId) ?? 0
                        }
                        onView={() => setViewingPayment(payment)}
                        onEdit={() => setEditingPayment(payment)}
                        onDelete={() => setDeletingPayment(payment)}
                      />
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {!isLoading && filteredPayments.length === 0 && (
              <EmptyState onCreate={() => setShowAddModal(true)} />
            )}
          </section>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
            {isLoading ? (
              <div className="sm:col-span-2 rounded-2xl border border-white/8 bg-[#0b1020] px-6 py-16 text-center text-sm text-slate-500">
                Loading payments...
              </div>
            ) : (
              filteredPayments.map((payment) => (
                <PaymentMobileCard
                  key={payment.id}
                  payment={payment}
                  balance={
                    invoiceBalanceMap.get(payment.invoiceId) ?? 0
                  }
                  onView={() => setViewingPayment(payment)}
                  onEdit={() => setEditingPayment(payment)}
                  onDelete={() => setDeletingPayment(payment)}
                />
              ))
            )}

            {!isLoading && filteredPayments.length === 0 && (
              <div className="sm:col-span-2">
                <EmptyState onCreate={() => setShowAddModal(true)} />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-white/8 bg-[#0b1020] p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-white">
                Payment workflow
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Payments connect invoices to actual financial transactions and
                outstanding balances.
              </p>
            </div>

            <a
              href="/admin/invoices"
              className="inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition hover:text-cyan-200"
            >
              View Invoices
              <ReceiptText className="h-4 w-4" />
            </a>
          </div>
        </div>
      </main>

      {showAddModal && (
        <PaymentFormModal
          title="Record Payment"
          submitLabel="Record Payment"
          invoices={invoices}
          payments={payments}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleCreate}
        />
      )}

      {editingPayment && (
        <PaymentFormModal
          title="Edit Payment"
          submitLabel="Save Changes"
          payment={editingPayment}
          invoices={invoices}
          payments={payments}
          onClose={() => setEditingPayment(null)}
          onSubmit={handleEdit}
        />
      )}

      {deletingPayment && (
        <DeletePaymentModal
          payment={deletingPayment}
          onClose={() => setDeletingPayment(null)}
          onConfirm={() => void handleDelete()}
        />
      )}

      {viewingPayment && (
        <PaymentDetailsModal
          payment={viewingPayment}
          balance={invoiceBalanceMap.get(viewingPayment.invoiceId) ?? 0}
          onClose={() => setViewingPayment(null)}
        />
      )}

      {toast && (
        <div className="fixed bottom-5 right-5 z-[120] max-w-sm rounded-xl border border-emerald-400/15 bg-[#0b1020] px-4 py-3 text-sm text-emerald-300 shadow-2xl shadow-black/40">
          {toast}
        </div>
      )}
    </>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  iconClass,
  iconBg,
}: {
  label: string;
  value: string;
  icon: typeof DollarSign;
  iconClass: string;
  iconBg: string;
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-[#0b1020] p-5">
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconBg}`}
      >
        <Icon className={`h-4 w-4 ${iconClass}`} />
      </div>
      <p className="mt-4 text-xs text-slate-600">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}

function PaymentTableRow({
  payment,
  balance,
  onView,
  onEdit,
  onDelete,
}: {
  payment: Payment;
  balance: number;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <tr className="transition hover:bg-white/[0.015]">
      <td className="px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10">
            <CreditCard className="h-4 w-4 text-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">
              {payment.paymentReference}
            </p>
            <p className="mt-1 text-xs text-slate-600">
              {payment.installmentDescription || "Invoice payment"}
            </p>
          </div>
        </div>
      </td>

      <td className="px-5 py-5">
        <p className="text-sm text-slate-300">{payment.client}</p>
      </td>

      <td className="px-5 py-5">
        <p className="text-sm text-slate-300">{payment.invoiceNumber}</p>
      </td>

      <td className="px-5 py-5">
        <p className="text-sm font-semibold text-white">
          {formatCurrency(payment.amount)}
        </p>
        <p className="mt-1 text-[11px] text-slate-600">
          Remaining {formatCurrency(balance)}
        </p>
      </td>

      <td className="px-5 py-5">
        <span className="text-sm text-slate-400">
          {payment.paymentMethod}
        </span>
      </td>

      <td className="px-5 py-5">
        <span
          className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-medium ${statusClasses[payment.status]}`}
        >
          {payment.status}
        </span>
      </td>

      <td className="px-5 py-5">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <CalendarDays className="h-3.5 w-3.5 text-slate-600" />
          {formatDate(payment.paymentDate)}
        </div>
      </td>

      <td className="px-5 py-5">
        <div className="flex justify-end gap-2">
          <IconButton
            label="View"
            icon={Eye}
            onClick={onView}
            className="hover:border-cyan-400/20 hover:text-cyan-300"
          />
          <IconButton
            label="Edit"
            icon={Pencil}
            onClick={onEdit}
            className="hover:border-blue-400/20 hover:text-blue-300"
          />
          <IconButton
            label="Delete"
            icon={Trash2}
            onClick={onDelete}
            className="hover:border-red-400/20 hover:text-red-300"
          />
        </div>
      </td>
    </tr>
  );
}

function PaymentMobileCard({
  payment,
  balance,
  onView,
  onEdit,
  onDelete,
}: {
  payment: Payment;
  balance: number;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-[#0b1020] p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10">
            <CreditCard className="h-4 w-4 text-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">
              {payment.paymentReference}
            </p>
            <p className="mt-1 text-xs text-slate-600">
              {payment.invoiceNumber}
            </p>
          </div>
        </div>

        <span
          className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${statusClasses[payment.status]}`}
        >
          {payment.status}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <InfoBox label="Client" value={payment.client} />
        <InfoBox
          label="Amount"
          value={formatCurrency(payment.amount)}
        />
        <InfoBox label="Method" value={payment.paymentMethod} />
        <InfoBox
          label="Date"
          value={formatDate(payment.paymentDate)}
        />
      </div>

      <div className="mt-3 rounded-xl border border-white/6 bg-[#060914] p-3">
        <p className="text-[11px] text-slate-600">Remaining invoice balance</p>
        <p className="mt-1 text-sm font-semibold text-white">
          {formatCurrency(balance)}
        </p>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={onView}
          className="inline-flex h-9 items-center justify-center gap-1 rounded-lg border border-white/8 text-xs font-medium text-slate-400 transition hover:border-cyan-400/20 hover:text-cyan-300"
        >
          <Eye className="h-3.5 w-3.5" />
          View
        </button>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex h-9 items-center justify-center gap-1 rounded-lg border border-white/8 text-xs font-medium text-slate-400 transition hover:border-blue-400/20 hover:text-blue-300"
        >
          <Pencil className="h-3.5 w-3.5" />
          Edit
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="inline-flex h-9 items-center justify-center gap-1 rounded-lg border border-white/8 text-xs font-medium text-slate-400 transition hover:border-red-400/20 hover:text-red-300"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Delete
        </button>
      </div>
    </div>
  );
}

function IconButton({
  label,
  icon: Icon,
  onClick,
  className,
}: {
  label: string;
  icon: typeof Eye;
  onClick: () => void;
  className: string;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      className={`flex h-8 w-8 items-center justify-center rounded-lg border border-white/8 text-slate-600 transition ${className}`}
    >
      <Icon className="h-3.5 w-3.5" />
    </button>
  );
}

function InfoBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/6 bg-[#060914] p-3">
      <p className="text-[11px] text-slate-600">{label}</p>
      <p className="mt-1 truncate text-xs font-medium text-slate-300">
        {value}
      </p>
    </div>
  );
}

function EmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="px-6 py-16 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10">
        <WalletCards className="h-5 w-5 text-emerald-400" />
      </div>
      <p className="mt-4 text-sm font-semibold text-white">
        No payments yet
      </p>
      <p className="mx-auto mt-1 max-w-md text-xs leading-5 text-slate-600">
        Record the first client payment to start tracking your finance
        workspace.
      </p>
      <button
        type="button"
        onClick={onCreate}
        className="mt-5 inline-flex h-9 items-center gap-2 rounded-xl bg-cyan-400 px-4 text-xs font-semibold text-slate-950"
      >
        <Plus className="h-3.5 w-3.5" />
        Record Payment
      </button>
    </div>
  );
}

function PaymentFormModal({
  title,
  submitLabel,
  payment,
  invoices,
  payments,
  onClose,
  onSubmit,
}: {
  title: string;
  submitLabel: string;
  payment?: Payment;
  invoices: Invoice[];
  payments: Payment[];
  onClose: () => void;
  onSubmit: (payment: Payment) => void;
}) {
  const [form, setForm] = useState<Payment>(() => {
    if (payment) return payment;

    const firstInvoice = invoices[0];

    return {
      id: "",
      invoiceId: firstInvoice?.id ?? "",
      invoiceNumber: firstInvoice?.invoiceNumber ?? "",
      clientId: firstInvoice?.clientId ?? "",
      client: firstInvoice?.client ?? "",
      installmentId: "",
      installmentNumber: null,
      installmentDescription: "",
      paymentReference: makePaymentReference(),
      amount: 0,
      paymentDate: localDateString(),
      paymentMethod: "GCash",
      status: "Paid",
      notes: "",
    };
  });

  const [installments, setInstallments] = useState<Installment[]>([]);
  const [installmentsLoading, setInstallmentsLoading] = useState(false);
  const [installmentError, setInstallmentError] = useState("");

  const selectedInvoice = invoices.find(
    (invoice) => invoice.id === form.invoiceId
  );

  const paidForInvoice = payments
    .filter(
      (item) =>
        item.invoiceId === form.invoiceId &&
        item.status === "Paid" &&
        item.id !== payment?.id
    )
    .reduce((sum, item) => sum + item.amount, 0);

  const invoiceRemaining = Math.max(
    0,
    Number(selectedInvoice?.total ?? 0) - paidForInvoice
  );

  const update = <K extends keyof Payment>(
    field: K,
    value: Payment[K]
  ) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const loadInstallments = async (invoiceId: string) => {
    if (!invoiceId) {
      setInstallments([]);
      return;
    }

    setInstallmentsLoading(true);
    setInstallmentError("");

    try {
      const response = await fetch(
        `/api/admin/payments?invoiceId=${encodeURIComponent(invoiceId)}`,
        { cache: "no-store" }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Unable to load payment installments.");
      }

      const nextInstallments: Installment[] = data.installments ?? [];
      setInstallments(nextInstallments);

      if (!payment && nextInstallments.length > 0) {
        const preferred =
          nextInstallments.find((item) => item.status !== "Paid") ??
          nextInstallments[0];

        setForm((current) => ({
          ...current,
          installmentId: preferred.id,
          installmentNumber: preferred.installment_number,
          installmentDescription: preferred.description,
          amount:
            current.amount > 0
              ? current.amount
              : Number(preferred.amount ?? 0),
        }));
      }
    } catch (err) {
      console.error("PAYMENT INSTALLMENT LOAD ERROR:", err);
      setInstallments([]);
      setInstallmentError(
        err instanceof Error
          ? err.message
          : "Unable to load payment installments."
      );
    } finally {
      setInstallmentsLoading(false);
    }
  };

  useEffect(() => {
    void loadInstallments(form.invoiceId);
  }, [form.invoiceId]);

  const changeInvoice = (invoiceId: string) => {
    const selected = invoices.find((invoice) => invoice.id === invoiceId);

    setInstallments([]);
    setForm((current) => ({
      ...current,
      invoiceId,
      invoiceNumber: selected?.invoiceNumber ?? "",
      clientId: selected?.clientId ?? "",
      client: selected?.client ?? "",
      installmentId: "",
      installmentNumber: null,
      installmentDescription: "",
      amount: 0,
    }));
  };

  const changeInstallment = (installmentId: string) => {
    const selected = installments.find(
      (item) => item.id === installmentId
    );

    setForm((current) => ({
      ...current,
      installmentId,
      installmentNumber: selected?.installment_number ?? null,
      installmentDescription: selected?.description ?? "",
      amount: selected ? Number(selected.amount ?? 0) : current.amount,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.invoiceId || !form.paymentReference.trim()) return;

    const amount = Math.max(0, Number(form.amount) || 0);

    if (amount <= 0) return;

    onSubmit({
      ...form,
      amount,
      paymentReference: form.paymentReference.trim(),
      notes: form.notes.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#0b1020] shadow-2xl shadow-black/50">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/8 bg-[#0b1020] px-5 py-4 sm:px-6">
          <div>
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            <p className="mt-1 text-xs text-slate-500">
              Record an actual client payment against an invoice and payment plan.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/5 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="Payment Reference"
              value={form.paymentReference}
              onChange={(value) => update("paymentReference", value)}
              placeholder="PAY-2026-000001"
              required
            />

            <SelectField
              label="Invoice"
              value={form.invoiceId}
              onChange={changeInvoice}
              options={invoices.map((invoice) => invoice.id)}
              labels={invoices.map(
                (invoice) =>
                  `${invoice.invoiceNumber} — ${invoice.client}`
              )}
              required
            />

            <FormField
              label="Amount"
              value={String(form.amount)}
              onChange={(value) =>
                update("amount", Number(value.replace(/[^0-9.]/g, "")) || 0)
              }
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              required
            />

            <SelectField
              label="Payment Method"
              value={form.paymentMethod}
              onChange={(value) =>
                update("paymentMethod", value as PaymentMethod)
              }
              options={methodOptions}
              labels={methodOptions}
              required
            />

            <FormField
              label="Payment Date"
              value={form.paymentDate}
              onChange={(value) => update("paymentDate", value)}
              type="date"
              required
            />

            <SelectField
              label="Status"
              value={form.status}
              onChange={(value) =>
                update("status", value as PaymentStatus)
              }
              options={statusOptions}
              labels={statusOptions}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-slate-400">
              Payment Plan Installment
            </label>

            {installmentsLoading ? (
              <div className="rounded-xl border border-white/8 bg-[#060914] px-3 py-3 text-xs text-slate-500">
                Loading payment-plan installments...
              </div>
            ) : installments.length > 0 ? (
              <select
                value={form.installmentId}
                onChange={(event) => changeInstallment(event.target.value)}
                className="h-11 w-full rounded-xl border border-white/8 bg-[#060914] px-3 text-sm text-slate-300 outline-none focus:border-cyan-400/30"
                style={{ colorScheme: "dark" }}
              >
                <option
                  value=""
                  style={{ backgroundColor: "#060914", color: "#fff" }}
                >
                  No installment selected
                </option>
                {installments.map((installment) => (
                  <option
                    key={installment.id}
                    value={installment.id}
                    style={{ backgroundColor: "#060914", color: "#fff" }}
                  >
                    Payment {installment.installment_number} — {installment.description} — {formatCurrency(Number(installment.amount ?? 0))} — {installment.status}
                  </option>
                ))}
              </select>
            ) : (
              <div className="rounded-xl border border-amber-400/10 bg-amber-400/[0.03] px-3 py-3 text-xs text-amber-300/80">
                {installmentError || "This invoice has no payment-plan installments."}
              </div>
            )}
          </div>

          {form.installmentId && (
            <div className="rounded-xl border border-emerald-400/10 bg-emerald-400/[0.03] p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-emerald-300">
                    Selected Installment
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">
                    Payment {form.installmentNumber} — {form.installmentDescription}
                  </p>
                </div>
                <p className="text-lg font-semibold text-white">
                  {formatCurrency(form.amount)}
                </p>
              </div>
            </div>
          )}

          {selectedInvoice && (
            <div className="rounded-xl border border-cyan-400/10 bg-cyan-400/[0.03] p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-cyan-300">
                    Remaining Invoice Balance
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {selectedInvoice.invoiceNumber} · {selectedInvoice.client}
                  </p>
                </div>

                <p className="text-lg font-semibold text-white">
                  {formatCurrency(invoiceRemaining)}
                </p>
              </div>
            </div>
          )}

          <div>
            <label className="mb-2 block text-xs font-medium text-slate-400">
              Notes
            </label>
            <textarea
              value={form.notes}
              onChange={(event) => update("notes", event.target.value)}
              rows={4}
              placeholder="Payment notes, reference details, or additional information..."
              className="w-full resize-none rounded-xl border border-white/8 bg-[#060914] px-3 py-3 text-sm text-slate-300 outline-none placeholder:text-slate-700 focus:border-cyan-400/30"
            />
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-white/8 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="h-10 rounded-xl border border-white/8 px-4 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 text-sm font-semibold text-slate-950"
            >
              <CreditCard className="h-4 w-4" />
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  min,
  step,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  min?: string;
  step?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-slate-400">
        {label}
      </label>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type={type}
        min={min}
        step={step}
        placeholder={placeholder}
        required={required}
        className="h-10 w-full rounded-xl border border-white/8 bg-[#060914] px-3 text-sm text-slate-300 outline-none placeholder:text-slate-700 focus:border-cyan-400/30"
        style={type === "date" ? { colorScheme: "dark" } : undefined}
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  labels,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  labels: readonly string[];
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-slate-400">
        {label}
      </label>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        className="h-10 w-full rounded-xl border border-white/8 bg-[#060914] px-3 text-sm text-slate-300 outline-none focus:border-cyan-400/30"
        style={{ colorScheme: "dark" }}
      >
        {!required && <option value="">None</option>}
        {options.map((option, index) => (
          <option
            key={option}
            value={option}
            style={{
              backgroundColor: "#060914",
              color: "#fff",
            }}
          >
            {labels[index] ?? option}
          </option>
        ))}
      </select>
    </div>
  );
}

function DeletePaymentModal({
  payment,
  onClose,
  onConfirm,
}: {
  payment: Payment;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0b1020] p-6 shadow-2xl shadow-black/50">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-400/10">
          <Trash2 className="h-5 w-5 text-red-400" />
        </div>

        <h2 className="mt-5 text-lg font-semibold text-white">
          Delete payment?
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          This will permanently remove{" "}
          <span className="font-medium text-slate-300">
            {payment.paymentReference}
          </span>{" "}
          from the payment history.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-xl border border-white/8 px-4 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="h-10 rounded-xl bg-red-500 px-4 text-sm font-semibold text-white hover:bg-red-400"
          >
            Delete Payment
          </button>
        </div>
      </div>
    </div>
  );
}

function PaymentDetailsModal({
  payment,
  balance,
  onClose,
}: {
  payment: Payment;
  balance: number;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0b1020] shadow-2xl shadow-black/50">
        <div className="flex items-center justify-between border-b border-white/8 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10">
              <Eye className="h-4 w-4 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">
                Payment Details
              </h2>
              <p className="text-xs text-slate-600">
                {payment.paymentReference}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-white/5 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 p-5 sm:p-6">
          <div className="grid grid-cols-2 gap-3">
            <InfoBox label="Client" value={payment.client} />
            <InfoBox
              label="Invoice"
              value={payment.invoiceNumber}
            />
            <InfoBox
              label="Amount"
              value={formatCurrency(payment.amount)}
            />
            <InfoBox
              label="Method"
              value={payment.paymentMethod}
            />
            <InfoBox
              label="Payment Date"
              value={formatDate(payment.paymentDate)}
            />
            <InfoBox
              label="Status"
              value={payment.status}
            />
          </div>

          <div className="rounded-xl border border-white/6 bg-[#060914] p-4">
            <p className="text-[11px] uppercase tracking-wider text-slate-600">
              Remaining Invoice Balance
            </p>
            <p className="mt-1 text-xl font-semibold text-white">
              {formatCurrency(balance)}
            </p>
          </div>

          {payment.installmentDescription && (
            <div className="rounded-xl border border-cyan-400/10 bg-cyan-400/[0.03] p-4">
              <p className="text-[11px] uppercase tracking-wider text-cyan-300">
                Installment
              </p>
              <p className="mt-1 text-sm font-medium text-white">
                {payment.installmentDescription}
              </p>
            </div>
          )}

          {payment.notes && (
            <div>
              <p className="text-[11px] uppercase tracking-wider text-slate-600">
                Notes
              </p>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-400">
                {payment.notes}
              </p>
            </div>
          )}

          <div className="flex justify-end border-t border-white/8 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="h-10 rounded-xl border border-white/8 px-4 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
