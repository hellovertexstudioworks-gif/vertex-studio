"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  CreditCard,
  FileText,
  Filter,
  Plus,
  Receipt,
  Search,
  Users,
  WalletCards,
  X,
} from "lucide-react";

type InvoiceStatus = "Paid" | "Pending" | "Partial";

type Invoice = {
  id: string;
  patientId: string;
  patient: string;
  service: string;
  doctor: string;
  date: string;
  dueDate: string;
  amount: number;
  paid: number;
  balance: number;
  status: InvoiceStatus;
};

const invoices: Invoice[] = [
  {
    id: "INV-2041",
    patientId: "P-1001",
    patient: "Sarah Johnson",
    service: "General Checkup",
    doctor: "Dr. Emily Carter",
    date: "Oct 14, 2026",
    dueDate: "Oct 28, 2026",
    amount: 85,
    paid: 85,
    balance: 0,
    status: "Paid",
  },
  {
    id: "INV-2038",
    patientId: "P-1002",
    patient: "Michael Brown",
    service: "Dental Implants",
    doctor: "Dr. Daniel Brooks",
    date: "Oct 12, 2026",
    dueDate: "Nov 12, 2026",
    amount: 1500,
    paid: 650,
    balance: 850,
    status: "Partial",
  },
  {
    id: "INV-2035",
    patientId: "P-1003",
    patient: "Emma Williams",
    service: "Pediatric Dentistry",
    doctor: "Dr. Sophia Williams",
    date: "Oct 18, 2026",
    dueDate: "Nov 01, 2026",
    amount: 300,
    paid: 180,
    balance: 120,
    status: "Partial",
  },
  {
    id: "INV-2031",
    patientId: "P-1004",
    patient: "James Wilson",
    service: "Orthodontic Consultation",
    doctor: "Dr. Michael Anderson",
    date: "Oct 09, 2026",
    dueDate: "Nov 08, 2026",
    amount: 420,
    paid: 0,
    balance: 420,
    status: "Pending",
  },
  {
    id: "INV-2028",
    patientId: "P-1005",
    patient: "Olivia Taylor",
    service: "Root Canal Care",
    doctor: "Dr. Olivia Bennett",
    date: "Oct 16, 2026",
    dueDate: "Nov 16, 2026",
    amount: 775,
    paid: 500,
    balance: 275,
    status: "Partial",
  },
  {
    id: "INV-2024",
    patientId: "P-1006",
    patient: "Daniel Smith",
    service: "Restorative Care",
    doctor: "Dr. James Mitchell",
    date: "Sep 29, 2026",
    dueDate: "Oct 29, 2026",
    amount: 640,
    paid: 640,
    balance: 0,
    status: "Paid",
  },
  {
    id: "INV-2019",
    patientId: "P-1007",
    patient: "Sophia Miller",
    service: "Teeth Whitening",
    doctor: "Dr. Emily Carter",
    date: "Oct 03, 2026",
    dueDate: "Oct 31, 2026",
    amount: 295,
    paid: 200,
    balance: 95,
    status: "Partial",
  },
  {
    id: "INV-2012",
    patientId: "P-1008",
    patient: "Noah Davis",
    service: "Implant Consultation",
    doctor: "Dr. Daniel Brooks",
    date: "Aug 21, 2026",
    dueDate: "Sep 21, 2026",
    amount: 180,
    paid: 180,
    balance: 0,
    status: "Paid",
  },
  {
    id: "INV-2008",
    patientId: "P-1009",
    patient: "Ava Martinez",
    service: "Endodontic Evaluation",
    doctor: "Dr. Olivia Bennett",
    date: "Oct 19, 2026",
    dueDate: "Nov 19, 2026",
    amount: 380,
    paid: 200,
    balance: 180,
    status: "Partial",
  },
  {
    id: "INV-2004",
    patientId: "P-1010",
    patient: "Lucas Anderson",
    service: "Family Dentistry",
    doctor: "Dr. Sophia Williams",
    date: "Oct 11, 2026",
    dueDate: "Nov 11, 2026",
    amount: 260,
    paid: 200,
    balance: 60,
    status: "Partial",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function BillingPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"All" | InvoiceStatus>("All");
  const [notice, setNotice] = useState("");

  const totals = useMemo(() => {
    return {
      invoiced: invoices.reduce((sum, invoice) => sum + invoice.amount, 0),
      collected: invoices.reduce((sum, invoice) => sum + invoice.paid, 0),
      outstanding: invoices.reduce((sum, invoice) => sum + invoice.balance, 0),
      paidInvoices: invoices.filter((invoice) => invoice.status === "Paid")
        .length,
    };
  }, []);

  const filteredInvoices = useMemo(() => {
    const query = search.trim().toLowerCase();

    return invoices.filter((invoice) => {
      const matchesSearch =
        !query ||
        invoice.id.toLowerCase().includes(query) ||
        invoice.patient.toLowerCase().includes(query) ||
        invoice.patientId.toLowerCase().includes(query) ||
        invoice.service.toLowerCase().includes(query) ||
        invoice.doctor.toLowerCase().includes(query);

      const matchesStatus =
        status === "All" || invoice.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const hasFilters = search !== "" || status !== "All";

  const clearFilters = () => {
    setSearch("");
    setStatus("All");
  };

  const handleDemoAction = (message: string) => {
    setNotice(message);
  };

  return (
    <main className="w-full px-5 py-6 sm:px-8 sm:py-8 xl:px-10">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-600">
                <WalletCards size={13} />
                Financial Management
              </div>

              <h1 className="text-3xl font-black tracking-tight text-slate-900">
                Billing
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Track invoices, payments, outstanding balances, and patient
                account activity from the clinic dashboard.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                handleDemoAction(
                  "Demo action: Create invoice flow selected. No real invoice was created.",
                )
              }
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-xs font-bold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Plus size={16} />
              Create Invoice
            </button>
          </div>

          <div className="mt-5 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-700">
            <strong>Portfolio Demo:</strong> All financial records, patient
            names, invoice amounts, and payment activity below are fictional
            sample data.
          </div>

          {notice && (
            <div className="mt-4 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-xs font-semibold leading-5 text-blue-700">
              <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
              {notice}
            </div>
          )}

          <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Receipt size={19} />
                </div>
                <span className="text-[10px] font-bold text-slate-400">
                  {invoices.length} invoices
                </span>
              </div>
              <p className="mt-4 text-xs font-semibold text-slate-400">
                Total Invoiced
              </p>
              <p className="mt-1 text-3xl font-black text-slate-900">
                {formatCurrency(totals.invoiced)}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <CircleDollarSign size={19} />
                </div>
                <span className="text-[10px] font-bold text-emerald-500">
                  Collected
                </span>
              </div>
              <p className="mt-4 text-xs font-semibold text-slate-400">
                Payments Received
              </p>
              <p className="mt-1 text-3xl font-black text-slate-900">
                {formatCurrency(totals.collected)}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <Clock3 size={19} />
                </div>
                <span className="text-[10px] font-bold text-amber-500">
                  Needs attention
                </span>
              </div>
              <p className="mt-4 text-xs font-semibold text-slate-400">
                Outstanding Balance
              </p>
              <p className="mt-1 text-3xl font-black text-slate-900">
                {formatCurrency(totals.outstanding)}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <CheckCircle2 size={19} />
                </div>
                <span className="text-[10px] font-bold text-purple-500">
                  Complete
                </span>
              </div>
              <p className="mt-4 text-xs font-semibold text-slate-400">
                Paid Invoices
              </p>
              <p className="mt-1 text-3xl font-black text-slate-900">
                {totals.paidInvoices}
              </p>
            </div>
          </section>

          <section className="mt-6 grid gap-5 xl:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-slate-400">
                    Collection Progress
                  </p>
                  <p className="mt-1 text-xl font-black text-slate-900">
                    {Math.round((totals.collected / totals.invoiced) * 100)}%
                    collected
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <CircleDollarSign size={20} />
                </div>
              </div>

              <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all"
                  style={{
                    width: `${Math.round(
                      (totals.collected / totals.invoiced) * 100,
                    )}%`,
                  }}
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[11px] font-semibold text-slate-400">
                <span>
                  Collected: {formatCurrency(totals.collected)}
                </span>
                <span>
                  Remaining: {formatCurrency(totals.outstanding)}
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold text-slate-400">
                Billing Overview
              </p>

              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">
                    Paid
                  </span>
                  <span className="text-xs font-black text-emerald-600">
                    {invoices.filter((invoice) => invoice.status === "Paid").length}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">
                    Partial
                  </span>
                  <span className="text-xs font-black text-amber-600">
                    {
                      invoices.filter(
                        (invoice) => invoice.status === "Partial",
                      ).length
                    }
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">
                    Pending
                  </span>
                  <span className="text-xs font-black text-blue-600">
                    {
                      invoices.filter(
                        (invoice) => invoice.status === "Pending",
                      ).length
                    }
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
              <div className="relative min-w-0 flex-1">
                <Search
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search invoice, patient, doctor, or service..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-10 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-50"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center text-slate-400 transition hover:text-slate-700"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              <div className="hidden items-center gap-2 xl:flex">
                <Filter size={16} className="text-slate-400" />
                <span className="text-xs font-bold text-slate-500">
                  Filters
                </span>
              </div>

              <div className="relative">
                <select
                  value={status}
                  onChange={(event) =>
                    setStatus(event.target.value as "All" | InvoiceStatus)
                  }
                  className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 pr-10 text-sm font-semibold text-slate-600 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-50 xl:w-44"
                >
                  <option value="All">All Status</option>
                  <option value="Paid">Paid</option>
                  <option value="Partial">Partial</option>
                  <option value="Pending">Pending</option>
                </select>

                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>

              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-xs font-bold text-slate-500 transition hover:border-red-100 hover:bg-red-50 hover:text-red-600"
                >
                  <X size={15} />
                  Clear
                </button>
              )}
            </div>

            {hasFilters && (
              <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
                <span className="text-[11px] font-semibold text-slate-400">
                  Active:
                </span>

                {search && (
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold text-blue-600">
                    Search: {search}
                  </span>
                )}

                {status !== "All" && (
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-600">
                    {status}
                  </span>
                )}
              </div>
            )}
          </section>

          <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-2 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-base font-black text-slate-900">
                  Invoice Directory
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  Showing {filteredInvoices.length} of {invoices.length} demo
                  invoices
                </p>
              </div>

              <div className="inline-flex items-center gap-2 text-[10px] font-bold text-slate-400">
                <FileText size={14} />
                Sample financial records
              </div>
            </div>

            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full min-w-[1100px]">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70">
                    <th className="px-5 py-3 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Invoice
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Patient
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Service
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Balance
                    </th>
                    <th className="px-5 py-3 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredInvoices.map((invoice) => (
                    <tr
                      key={invoice.id}
                      className="group transition hover:bg-slate-50/70"
                    >
                      <td className="px-5 py-4">
                        <Link
                          href={`/work/brightsmile/admin/billing/${invoice.id}`}
                          className="inline-flex items-center gap-1 text-xs font-black text-blue-600 hover:text-blue-700"
                        >
                          {invoice.id}
                          <ArrowUpRight
                            size={13}
                            className="opacity-0 transition group-hover:opacity-100"
                          />
                        </Link>
                        <p className="mt-1 text-[10px] text-slate-400">
                          Due {invoice.dueDate}
                        </p>
                      </td>

                      <td className="px-4 py-4">
                        <Link
                          href={`/work/brightsmile/admin/patients/${invoice.patientId}`}
                          className="flex items-center gap-3"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[10px] font-black text-blue-600">
                            {invoice.patient
                              .split(" ")
                              .map((part) => part[0])
                              .join("")
                              .slice(0, 2)}
                          </div>

                          <div>
                            <p className="text-xs font-black text-slate-800 hover:text-blue-600">
                              {invoice.patient}
                            </p>
                            <p className="mt-1 text-[10px] text-slate-400">
                              {invoice.patientId}
                            </p>
                          </div>
                        </Link>
                      </td>

                      <td className="px-4 py-4">
                        <p className="text-xs font-semibold text-slate-600">
                          {invoice.service}
                        </p>
                        <p className="mt-1 text-[10px] text-slate-400">
                          {invoice.doctor}
                        </p>
                      </td>

                      <td className="px-4 py-4">
                        <p className="text-xs font-semibold text-slate-600">
                          {invoice.date}
                        </p>
                      </td>

                      <td className="px-4 py-4">
                        <p className="text-xs font-black text-slate-800">
                          {formatCurrency(invoice.amount)}
                        </p>
                        <p className="mt-1 text-[10px] text-emerald-600">
                          Paid {formatCurrency(invoice.paid)}
                        </p>
                      </td>

                      <td className="px-4 py-4">
                        <p
                          className={`text-xs font-black ${
                            invoice.balance > 0
                              ? "text-amber-600"
                              : "text-emerald-600"
                          }`}
                        >
                          {invoice.balance > 0
                            ? formatCurrency(invoice.balance)
                            : "Paid"}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                            invoice.status === "Paid"
                              ? "bg-emerald-50 text-emerald-600"
                              : invoice.status === "Partial"
                                ? "bg-amber-50 text-amber-600"
                                : "bg-blue-50 text-blue-600"
                          }`}
                        >
                          {invoice.status === "Paid" ? (
                            <CheckCircle2 size={12} />
                          ) : invoice.status === "Partial" ? (
                            <Clock3 size={12} />
                          ) : (
                            <CalendarDays size={12} />
                          )}
                          {invoice.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-slate-100 lg:hidden">
              {filteredInvoices.map((invoice) => (
                <Link
                  key={invoice.id}
                  href={`/work/brightsmile/admin/billing/${invoice.id}`}
                  className="block p-5 transition hover:bg-slate-50"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-black text-blue-600">
                        {invoice.id}
                      </p>
                      <p className="mt-1 text-sm font-black text-slate-900">
                        {invoice.patient}
                      </p>
                      <p className="mt-1 text-[10px] text-slate-400">
                        {invoice.service}
                      </p>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                        invoice.status === "Paid"
                          ? "bg-emerald-50 text-emerald-600"
                          : invoice.status === "Partial"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-blue-50 text-blue-600"
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <div>
                      <p className="text-[10px] font-semibold text-slate-400">
                        Amount
                      </p>
                      <p className="mt-1 text-xs font-black text-slate-700">
                        {formatCurrency(invoice.amount)}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] font-semibold text-slate-400">
                        Paid
                      </p>
                      <p className="mt-1 text-xs font-black text-emerald-600">
                        {formatCurrency(invoice.paid)}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] font-semibold text-slate-400">
                        Balance
                      </p>
                      <p
                        className={`mt-1 text-xs font-black ${
                          invoice.balance > 0
                            ? "text-amber-600"
                            : "text-emerald-600"
                        }`}
                      >
                        {invoice.balance > 0
                          ? formatCurrency(invoice.balance)
                          : "Paid"}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredInvoices.length === 0 && (
              <div className="px-5 py-16 text-center">
                <Search size={30} className="mx-auto text-slate-300" />
                <p className="mt-4 text-sm font-black text-slate-700">
                  No invoices found
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Try changing your search or status filter.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-4 inline-flex h-9 items-center gap-2 rounded-lg bg-blue-600 px-4 text-xs font-bold text-white transition hover:bg-blue-700"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </section>

          <section className="mt-6 grid gap-5 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Receipt size={19} />
              </div>
              <h3 className="mt-4 text-sm font-black text-slate-900">
                Invoice Management
              </h3>
              <p className="mt-2 text-xs leading-5 text-slate-500">
                Create invoices connected to patients, doctors, services, and
                appointment records.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <CreditCard size={19} />
              </div>
              <h3 className="mt-4 text-sm font-black text-slate-900">
                Payment Tracking
              </h3>
              <p className="mt-2 text-xs leading-5 text-slate-500">
                Track paid amounts, partial payments, outstanding balances,
                and future payment activity.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <Users size={19} />
              </div>
              <h3 className="mt-4 text-sm font-black text-slate-900">
                Patient Accounts
              </h3>
              <p className="mt-2 text-xs leading-5 text-slate-500">
                Jump between invoices and patient profiles so the clinic team
                can understand account activity in context.
              </p>
            </div>
          </section>
    </main>
  );
}
