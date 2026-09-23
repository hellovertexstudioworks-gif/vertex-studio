"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  CreditCard,
  Download,
  FileText,
  Mail,
  MoreHorizontal,
  Receipt,
  Send,
  UserRound,
  WalletCards,
  XCircle,
} from "lucide-react";

import AdminHeader from "../../components/AdminHeader";
import AdminSidebar from "../../components/AdminSidebar";

type InvoiceStatus = "Paid" | "Pending" | "Partial";

type Invoice = {
  id: string;
  patientId: string;
  patient: string;
  patientAge: number;
  patientEmail: string;
  patientPhone: string;
  service: string;
  doctor: string;
  date: string;
  dueDate: string;
  amount: number;
  paid: number;
  balance: number;
  status: InvoiceStatus;
  paymentMethod: string;
  notes: string;
};

const invoices: Record<string, Invoice> = {
  "INV-2041": {
    id: "INV-2041",
    patientId: "P-1001",
    patient: "Sarah Johnson",
    patientAge: 29,
    patientEmail: "sarah.johnson@example-demo.com",
    patientPhone: "(555) 010-2001",
    service: "General Checkup",
    doctor: "Dr. Emily Carter",
    date: "October 14, 2026",
    dueDate: "October 28, 2026",
    amount: 85,
    paid: 85,
    balance: 0,
    status: "Paid",
    paymentMethod: "Demo Visa •••• 2041",
    notes: "Routine examination and preventive care review.",
  },
  "INV-2038": {
    id: "INV-2038",
    patientId: "P-1002",
    patient: "Michael Brown",
    patientAge: 42,
    patientEmail: "michael.brown@example-demo.com",
    patientPhone: "(555) 010-2002",
    service: "Dental Implants",
    doctor: "Dr. Daniel Brooks",
    date: "October 12, 2026",
    dueDate: "November 12, 2026",
    amount: 1500,
    paid: 650,
    balance: 850,
    status: "Partial",
    paymentMethod: "Demo Bank Transfer",
    notes: "Implant treatment plan. Demo invoice with partial payment.",
  },
  "INV-2035": {
    id: "INV-2035",
    patientId: "P-1003",
    patient: "Emma Williams",
    patientAge: 17,
    patientEmail: "emma.williams@example-demo.com",
    patientPhone: "(555) 010-2003",
    service: "Pediatric Dentistry",
    doctor: "Dr. Sophia Williams",
    date: "October 18, 2026",
    dueDate: "November 01, 2026",
    amount: 300,
    paid: 180,
    balance: 120,
    status: "Partial",
    paymentMethod: "Demo Mastercard •••• 2035",
    notes: "Family dental visit and pediatric treatment review.",
  },
  "INV-2031": {
    id: "INV-2031",
    patientId: "P-1004",
    patient: "James Wilson",
    patientAge: 36,
    patientEmail: "james.wilson@example-demo.com",
    patientPhone: "(555) 010-2004",
    service: "Orthodontic Consultation",
    doctor: "Dr. Michael Anderson",
    date: "October 09, 2026",
    dueDate: "November 08, 2026",
    amount: 420,
    paid: 0,
    balance: 420,
    status: "Pending",
    paymentMethod: "Not paid",
    notes: "Initial orthodontic consultation.",
  },
  "INV-2028": {
    id: "INV-2028",
    patientId: "P-1005",
    patient: "Olivia Taylor",
    patientAge: 31,
    patientEmail: "olivia.taylor@example-demo.com",
    patientPhone: "(555) 010-2005",
    service: "Root Canal Care",
    doctor: "Dr. Olivia Bennett",
    date: "October 16, 2026",
    dueDate: "November 16, 2026",
    amount: 775,
    paid: 500,
    balance: 275,
    status: "Partial",
    paymentMethod: "Demo Visa •••• 2028",
    notes: "Endodontic treatment and follow-up care.",
  },
  "INV-2024": {
    id: "INV-2024",
    patientId: "P-1006",
    patient: "Daniel Smith",
    patientAge: 54,
    patientEmail: "daniel.smith@example-demo.com",
    patientPhone: "(555) 010-2006",
    service: "Restorative Care",
    doctor: "Dr. James Mitchell",
    date: "September 29, 2026",
    dueDate: "October 29, 2026",
    amount: 640,
    paid: 640,
    balance: 0,
    status: "Paid",
    paymentMethod: "Demo Card •••• 2024",
    notes: "Restorative treatment plan completed.",
  },
  "INV-2019": {
    id: "INV-2019",
    patientId: "P-1007",
    patient: "Sophia Miller",
    patientAge: 25,
    patientEmail: "sophia.miller@example-demo.com",
    patientPhone: "(555) 010-2007",
    service: "Teeth Whitening",
    doctor: "Dr. Emily Carter",
    date: "October 03, 2026",
    dueDate: "October 31, 2026",
    amount: 295,
    paid: 200,
    balance: 95,
    status: "Partial",
    paymentMethod: "Demo Cash",
    notes: "Cosmetic whitening service.",
  },
  "INV-2012": {
    id: "INV-2012",
    patientId: "P-1008",
    patient: "Noah Davis",
    patientAge: 39,
    patientEmail: "noah.davis@example-demo.com",
    patientPhone: "(555) 010-2008",
    service: "Implant Consultation",
    doctor: "Dr. Daniel Brooks",
    date: "August 21, 2026",
    dueDate: "September 21, 2026",
    amount: 180,
    paid: 180,
    balance: 0,
    status: "Paid",
    paymentMethod: "Demo Mastercard •••• 2012",
    notes: "Implant consultation and treatment planning.",
  },
  "INV-2008": {
    id: "INV-2008",
    patientId: "P-1009",
    patient: "Ava Martinez",
    patientAge: 33,
    patientEmail: "ava.martinez@example-demo.com",
    patientPhone: "(555) 010-2009",
    service: "Endodontic Evaluation",
    doctor: "Dr. Olivia Bennett",
    date: "October 19, 2026",
    dueDate: "November 19, 2026",
    amount: 380,
    paid: 200,
    balance: 180,
    status: "Partial",
    paymentMethod: "Demo Bank Transfer",
    notes: "Endodontic evaluation and treatment planning.",
  },
  "INV-2004": {
    id: "INV-2004",
    patientId: "P-1010",
    patient: "Lucas Anderson",
    patientAge: 14,
    patientEmail: "lucas.anderson@example-demo.com",
    patientPhone: "(555) 010-2010",
    service: "Family Dentistry",
    doctor: "Dr. Sophia Williams",
    date: "October 11, 2026",
    dueDate: "November 11, 2026",
    amount: 260,
    paid: 200,
    balance: 60,
    status: "Partial",
    paymentMethod: "Demo Family Card •••• 2004",
    notes: "Family dentistry appointment.",
  },
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function statusClasses(status: InvoiceStatus) {
  if (status === "Paid") {
    return "bg-emerald-50 text-emerald-600";
  }

  if (status === "Partial") {
    return "bg-amber-50 text-amber-600";
  }

  return "bg-blue-50 text-blue-600";
}

export default function InvoiceDetailsPage() {
  const params = useParams<{ id: string }>();
  const invoice = invoices[params?.id ?? "INV-2041"] ?? invoices["INV-2041"];

  const [showActions, setShowActions] = useState(false);
  const [notice, setNotice] = useState("");

  const paymentPercentage = useMemo(() => {
    if (invoice.amount === 0) return 0;
    return Math.round((invoice.paid / invoice.amount) * 100);
  }, [invoice]);

  const relatedInvoices = useMemo(
    () =>
      Object.values(invoices)
        .filter(
          (item) =>
            item.patientId === invoice.patientId && item.id !== invoice.id,
        )
        .slice(0, 3),
    [invoice],
  );

  const handleDemoAction = (message: string) => {
    setNotice(message);
    setShowActions(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <AdminSidebar />

      <div className="lg:pl-64">
        <AdminHeader />

        <main className="px-5 py-6 sm:px-8 sm:py-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/work/brightsmile/admin/billing"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
            >
              <ArrowLeft size={16} />
              Back to Billing
            </Link>

            <div className="relative">
              <button
                type="button"
                onClick={() => setShowActions((value) => !value)}
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 shadow-sm transition hover:bg-slate-50"
              >
                <MoreHorizontal size={16} />
                Invoice Actions
                <ChevronDown size={14} />
              </button>

              {showActions && (
                <div className="absolute right-0 top-12 z-20 w-56 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
                  <button
                    type="button"
                    onClick={() =>
                      handleDemoAction(
                        "Demo action: Payment reminder selected. No real message was sent.",
                      )
                    }
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    <Send size={15} />
                    Send Payment Reminder
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDemoAction(
                        "Demo action: Invoice email selected. No real email was sent.",
                      )
                    }
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    <Mail size={15} />
                    Email Invoice
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDemoAction(
                        "Demo action: Download selected. No real financial document was generated.",
                      )
                    }
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    <Download size={15} />
                    Download PDF
                  </button>
                </div>
              )}
            </div>
          </div>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <Receipt size={23} />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Invoice
                    </p>
                    <h1 className="text-3xl font-black tracking-tight text-slate-900">
                      {invoice.id}
                    </h1>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${statusClasses(
                      invoice.status,
                    )}`}
                  >
                    {invoice.status === "Paid" ? (
                      <CheckCircle2 size={14} />
                    ) : invoice.status === "Partial" ? (
                      <Clock3 size={14} />
                    ) : (
                      <CalendarDays size={14} />
                    )}
                    {invoice.status}
                  </span>
                </div>

                <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-500">
                  {invoice.service} for {invoice.patient}. This page is a
                  portfolio demonstration of an individual invoice and
                  payment record.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Link
                  href={`/work/brightsmile/admin/patients/${invoice.patientId}`}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                >
                  <UserRound size={16} />
                  View Patient
                </Link>

                <button
                  type="button"
                  onClick={() =>
                    handleDemoAction(
                      "Demo action: Record payment selected. No real payment was processed.",
                    )
                  }
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 text-xs font-bold text-white transition hover:bg-emerald-700"
                >
                  <CreditCard size={16} />
                  Record Payment
                </button>
              </div>
            </div>
          </section>

          {notice && (
            <div className="mt-5 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-xs font-semibold leading-5 text-blue-700">
              <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
              {notice}
            </div>
          )}

          <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FileText size={19} />
              </div>
              <p className="mt-4 text-xs font-semibold text-slate-400">
                Invoice Total
              </p>
              <p className="mt-1 text-2xl font-black text-slate-900">
                {formatCurrency(invoice.amount)}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 size={19} />
              </div>
              <p className="mt-4 text-xs font-semibold text-slate-400">
                Amount Paid
              </p>
              <p className="mt-1 text-2xl font-black text-emerald-600">
                {formatCurrency(invoice.paid)}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <CircleDollarSign size={19} />
              </div>
              <p className="mt-4 text-xs font-semibold text-slate-400">
                Balance Due
              </p>
              <p
                className={`mt-1 text-2xl font-black ${
                  invoice.balance > 0 ? "text-amber-600" : "text-emerald-600"
                }`}
              >
                {invoice.balance > 0
                  ? formatCurrency(invoice.balance)
                  : "Paid"}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <WalletCards size={19} />
              </div>
              <p className="mt-4 text-xs font-semibold text-slate-400">
                Collection
              </p>
              <p className="mt-1 text-2xl font-black text-slate-900">
                {paymentPercentage}%
              </p>
            </div>
          </section>

          <section className="mt-6 grid gap-6 xl:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-black text-slate-900">
                    Payment Progress
                  </h2>
                  <p className="mt-1 text-xs text-slate-400">
                    Demo payment activity for this invoice.
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1.5 text-[10px] font-bold ${statusClasses(
                    invoice.status,
                  )}`}
                >
                  {invoice.status}
                </span>
              </div>

              <div className="mt-7 h-4 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full transition-all ${
                    invoice.status === "Paid"
                      ? "bg-emerald-500"
                      : "bg-blue-500"
                  }`}
                  style={{ width: `${paymentPercentage}%` }}
                />
              </div>

              <div className="mt-4 flex flex-wrap justify-between gap-3 text-xs font-semibold">
                <span className="text-emerald-600">
                  Paid {formatCurrency(invoice.paid)}
                </span>
                <span className="text-amber-600">
                  Due {formatCurrency(invoice.balance)}
                </span>
              </div>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Invoice Date
                  </p>
                  <p className="mt-2 text-sm font-bold text-slate-700">
                    {invoice.date}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Due Date
                  </p>
                  <p className="mt-2 text-sm font-bold text-slate-700">
                    {invoice.dueDate}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Payment Method
                  </p>
                  <p className="mt-2 text-sm font-bold text-slate-700">
                    {invoice.paymentMethod}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Assigned Doctor
                  </p>
                  <p className="mt-2 text-sm font-bold text-slate-700">
                    {invoice.doctor}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <UserRound size={21} />
              </div>

              <h2 className="mt-5 text-lg font-black text-slate-900">
                Patient
              </h2>

              <p className="mt-2 text-base font-black text-blue-600">
                {invoice.patient}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                {invoice.patientId} · {invoice.patientAge} years old
              </p>

              <div className="mt-5 space-y-3 border-t border-slate-100 pt-5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Email
                  </p>
                  <p className="mt-1 break-all text-xs font-semibold text-slate-600">
                    {invoice.patientEmail}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Phone
                  </p>
                  <p className="mt-1 text-xs font-semibold text-slate-600">
                    {invoice.patientPhone}
                  </p>
                </div>
              </div>

              <Link
                href={`/work/brightsmile/admin/patients/${invoice.patientId}`}
                className="mt-6 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
              >
                Open Patient Profile
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </section>

          <section className="mt-6 grid gap-6 xl:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <Receipt size={19} />
                </div>

                <div>
                  <h2 className="text-base font-black text-slate-900">
                    Invoice Details
                  </h2>
                  <p className="mt-1 text-xs text-slate-400">
                    Service and treatment information.
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-black text-slate-900">
                      {invoice.service}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-blue-600">
                      {invoice.doctor}
                    </p>
                  </div>

                  <p className="text-xl font-black text-slate-900">
                    {formatCurrency(invoice.amount)}
                  </p>
                </div>

                <div className="mt-5 border-t border-slate-200 pt-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Notes
                  </p>
                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    {invoice.notes}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <CreditCard size={19} />
                </div>

                <div>
                  <h2 className="text-base font-black text-slate-900">
                    Payment Summary
                  </h2>
                  <p className="mt-1 text-xs text-slate-400">
                    Demo account balance breakdown.
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <span className="text-xs font-semibold text-slate-500">
                    Invoice total
                  </span>
                  <span className="text-sm font-black text-slate-800">
                    {formatCurrency(invoice.amount)}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <span className="text-xs font-semibold text-slate-500">
                    Payments received
                  </span>
                  <span className="text-sm font-black text-emerald-600">
                    − {formatCurrency(invoice.paid)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-700">
                    Remaining balance
                  </span>
                  <span
                    className={`text-lg font-black ${
                      invoice.balance > 0
                        ? "text-amber-600"
                        : "text-emerald-600"
                    }`}
                  >
                    {invoice.balance > 0
                      ? formatCurrency(invoice.balance)
                      : "Paid"}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-base font-black text-slate-900">
                  Related Patient Invoices
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  Other demo invoices connected to this patient.
                </p>
              </div>

              <Link
                href={`/work/brightsmile/admin/patients/${invoice.patientId}`}
                className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700"
              >
                View patient account
                <ArrowUpRight size={14} />
              </Link>
            </div>

            {relatedInvoices.length > 0 ? (
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {relatedInvoices.map((related) => (
                  <Link
                    key={related.id}
                    href={`/work/brightsmile/admin/billing/${related.id}`}
                    className="rounded-xl border border-slate-100 bg-slate-50 p-4 transition hover:border-blue-100 hover:bg-blue-50/50"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs font-black text-blue-600">
                        {related.id}
                      </p>

                      <span
                        className={`rounded-full px-2 py-1 text-[9px] font-bold ${statusClasses(
                          related.status,
                        )}`}
                      >
                        {related.status}
                      </span>
                    </div>

                    <p className="mt-3 text-sm font-black text-slate-800">
                      {related.service}
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-slate-400">
                        {related.date}
                      </span>
                      <span className="text-xs font-black text-slate-700">
                        {formatCurrency(related.amount)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="mt-5 rounded-xl bg-slate-50 px-4 py-8 text-center">
                <FileText size={25} className="mx-auto text-slate-300" />
                <p className="mt-3 text-xs font-bold text-slate-600">
                  No other demo invoices
                </p>
              </div>
            )}
          </section>

          <section className="mt-6 grid gap-5 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Send size={19} />
              </div>
              <h3 className="mt-4 text-sm font-black text-slate-900">
                Payment Reminders
              </h3>
              <p className="mt-2 text-xs leading-5 text-slate-500">
                A future production workflow could automatically remind
                patients about upcoming or overdue balances.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <Download size={19} />
              </div>
              <h3 className="mt-4 text-sm font-black text-slate-900">
                Invoice Documents
              </h3>
              <p className="mt-2 text-xs leading-5 text-slate-500">
                Production billing could generate downloadable invoices and
                receipts for authorized staff and patients.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <WalletCards size={19} />
              </div>
              <h3 className="mt-4 text-sm font-black text-slate-900">
                Payment History
              </h3>
              <p className="mt-2 text-xs leading-5 text-slate-500">
                The full system can connect invoice records to a detailed
                payment ledger and account history.
              </p>
            </div>
          </section>

          <div className="mt-8 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-700">
            <strong>Portfolio Demo:</strong> This invoice contains completely
            fictional patient, payment, and financial information. Buttons on
            this page only simulate actions; no real payment, email, invoice,
            or financial document is created.
          </div>
        </main>
      </div>
    </div>
  );
}
