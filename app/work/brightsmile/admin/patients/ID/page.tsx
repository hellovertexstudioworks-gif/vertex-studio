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
  FileText,
  Mail,
  MapPin,
  Phone,
  Plus,
  Receipt,
  Stethoscope,
  UserRound,
  WalletCards,
} from "lucide-react";

import AdminHeader from "../../components/AdminHeader";
import AdminSidebar from "../../components/AdminSidebar";

type Patient = {
  id: string;
  name: string;
  age: number;
  gender: "Female" | "Male";
  dateOfBirth: string;
  phone: string;
  email: string;
  address: string;
  doctor: string;
  treatment: string;
  status: "Active" | "Inactive";
  balance: number;
  insurance: string;
  lastVisit: string;
  nextVisit: string;
  emergencyContact: string;
};

type Appointment = {
  date: string;
  time: string;
  service: string;
  doctor: string;
  status: "Completed" | "Confirmed" | "Pending";
};

type Treatment = {
  date: string;
  treatment: string;
  doctor: string;
  note: string;
  amount: number;
};

type Invoice = {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: "Paid" | "Pending" | "Partial";
};

const patientRecords: Record<string, Patient> = {
  "P-1001": {
    id: "P-1001",
    name: "Sarah Johnson",
    age: 29,
    gender: "Female",
    dateOfBirth: "May 14, 1997",
    phone: "(555) 010-2001",
    email: "sarah.johnson@example-demo.com",
    address: "125 Demo Avenue, Sample City",
    doctor: "Dr. Emily Carter",
    treatment: "General Checkup",
    status: "Active",
    balance: 0,
    insurance: "Demo Dental Plan",
    lastVisit: "October 14, 2026",
    nextVisit: "October 28, 2026",
    emergencyContact: "Demo Contact · (555) 010-9001",
  },
  "P-1002": {
    id: "P-1002",
    name: "Michael Brown",
    age: 42,
    gender: "Male",
    dateOfBirth: "January 22, 1984",
    phone: "(555) 010-2002",
    email: "michael.brown@example-demo.com",
    address: "240 Sample Street, Sample City",
    doctor: "Dr. Daniel Brooks",
    treatment: "Dental Implants",
    status: "Active",
    balance: 850,
    insurance: "Demo Dental Plan",
    lastVisit: "October 12, 2026",
    nextVisit: "November 03, 2026",
    emergencyContact: "Demo Contact · (555) 010-9002",
  },
  "P-1003": {
    id: "P-1003",
    name: "Emma Williams",
    age: 17,
    gender: "Female",
    dateOfBirth: "March 09, 2009",
    phone: "(555) 010-2003",
    email: "emma.williams@example-demo.com",
    address: "318 Example Road, Sample City",
    doctor: "Dr. Sophia Williams",
    treatment: "Pediatric Dentistry",
    status: "Active",
    balance: 120,
    insurance: "Demo Family Plan",
    lastVisit: "October 18, 2026",
    nextVisit: "October 30, 2026",
    emergencyContact: "Demo Guardian · (555) 010-9003",
  },
  "P-1004": {
    id: "P-1004",
    name: "James Wilson",
    age: 36,
    gender: "Male",
    dateOfBirth: "July 18, 1990",
    phone: "(555) 010-2004",
    email: "james.wilson@example-demo.com",
    address: "452 Placeholder Lane, Sample City",
    doctor: "Dr. Michael Anderson",
    treatment: "Orthodontic Consultation",
    status: "Active",
    balance: 420,
    insurance: "Demo Dental Plan",
    lastVisit: "October 09, 2026",
    nextVisit: "November 05, 2026",
    emergencyContact: "Demo Contact · (555) 010-9004",
  },
  "P-1005": {
    id: "P-1005",
    name: "Olivia Taylor",
    age: 31,
    gender: "Female",
    dateOfBirth: "December 04, 1994",
    phone: "(555) 010-2005",
    email: "olivia.taylor@example-demo.com",
    address: "510 Example Boulevard, Sample City",
    doctor: "Dr. Olivia Bennett",
    treatment: "Root Canal Care",
    status: "Active",
    balance: 275,
    insurance: "Demo Dental Plan",
    lastVisit: "October 16, 2026",
    nextVisit: "October 27, 2026",
    emergencyContact: "Demo Contact · (555) 010-9005",
  },
  "P-1006": {
    id: "P-1006",
    name: "Daniel Smith",
    age: 54,
    gender: "Male",
    dateOfBirth: "February 11, 1972",
    phone: "(555) 010-2006",
    email: "daniel.smith@example-demo.com",
    address: "622 Demo Drive, Sample City",
    doctor: "Dr. James Mitchell",
    treatment: "Restorative Care",
    status: "Active",
    balance: 0,
    insurance: "Demo Senior Plan",
    lastVisit: "September 29, 2026",
    nextVisit: "November 10, 2026",
    emergencyContact: "Demo Contact · (555) 010-9006",
  },
  "P-1007": {
    id: "P-1007",
    name: "Sophia Miller",
    age: 25,
    gender: "Female",
    dateOfBirth: "June 30, 2001",
    phone: "(555) 010-2007",
    email: "sophia.miller@example-demo.com",
    address: "701 Sample Court, Sample City",
    doctor: "Dr. Emily Carter",
    treatment: "Teeth Whitening",
    status: "Active",
    balance: 95,
    insurance: "Self Pay Demo",
    lastVisit: "October 03, 2026",
    nextVisit: "—",
    emergencyContact: "Demo Contact · (555) 010-9007",
  },
  "P-1008": {
    id: "P-1008",
    name: "Noah Davis",
    age: 39,
    gender: "Male",
    dateOfBirth: "August 17, 1987",
    phone: "(555) 010-2008",
    email: "noah.davis@example-demo.com",
    address: "815 Demo Street, Sample City",
    doctor: "Dr. Daniel Brooks",
    treatment: "Implant Consultation",
    status: "Inactive",
    balance: 0,
    insurance: "Demo Dental Plan",
    lastVisit: "August 21, 2026",
    nextVisit: "—",
    emergencyContact: "Demo Contact · (555) 010-9008",
  },
  "P-1009": {
    id: "P-1009",
    name: "Ava Martinez",
    age: 33,
    gender: "Female",
    dateOfBirth: "November 28, 1992",
    phone: "(555) 010-2009",
    email: "ava.martinez@example-demo.com",
    address: "904 Example Park, Sample City",
    doctor: "Dr. Olivia Bennett",
    treatment: "Endodontic Evaluation",
    status: "Active",
    balance: 180,
    insurance: "Demo Dental Plan",
    lastVisit: "October 19, 2026",
    nextVisit: "November 02, 2026",
    emergencyContact: "Demo Contact · (555) 010-9009",
  },
  "P-1010": {
    id: "P-1010",
    name: "Lucas Anderson",
    age: 14,
    gender: "Male",
    dateOfBirth: "April 06, 2012",
    phone: "(555) 010-2010",
    email: "lucas.anderson@example-demo.com",
    address: "1020 Sample Way, Sample City",
    doctor: "Dr. Sophia Williams",
    treatment: "Family Dentistry",
    status: "Active",
    balance: 60,
    insurance: "Demo Family Plan",
    lastVisit: "October 11, 2026",
    nextVisit: "October 25, 2026",
    emergencyContact: "Demo Guardian · (555) 010-9010",
  },
};

const defaultAppointments: Appointment[] = [
  {
    date: "October 14, 2026",
    time: "09:45 AM",
    service: "General Checkup",
    doctor: "Dr. Emily Carter",
    status: "Completed",
  },
  {
    date: "September 02, 2026",
    time: "10:30 AM",
    service: "Dental Cleaning",
    doctor: "Dr. Emily Carter",
    status: "Completed",
  },
  {
    date: "July 18, 2026",
    time: "02:00 PM",
    service: "Routine Examination",
    doctor: "Dr. Emily Carter",
    status: "Completed",
  },
  {
    date: "October 28, 2026",
    time: "10:30 AM",
    service: "Follow-up Visit",
    doctor: "Dr. Emily Carter",
    status: "Confirmed",
  },
];

const defaultTreatments: Treatment[] = [
  {
    date: "October 14, 2026",
    treatment: "General Checkup",
    doctor: "Dr. Emily Carter",
    note: "Routine examination and preventive care review.",
    amount: 85,
  },
  {
    date: "September 02, 2026",
    treatment: "Dental Cleaning",
    doctor: "Dr. Emily Carter",
    note: "Routine cleaning and oral hygiene consultation.",
    amount: 110,
  },
  {
    date: "July 18, 2026",
    treatment: "Routine Examination",
    doctor: "Dr. Emily Carter",
    note: "Annual dental examination and treatment planning.",
    amount: 75,
  },
];

const defaultInvoices: Invoice[] = [
  {
    id: "INV-2041",
    date: "October 14, 2026",
    description: "General Checkup",
    amount: 85,
    status: "Paid",
  },
  {
    id: "INV-1987",
    date: "September 02, 2026",
    description: "Dental Cleaning",
    amount: 110,
    status: "Paid",
  },
  {
    id: "INV-1874",
    date: "July 18, 2026",
    description: "Routine Examination",
    amount: 75,
    status: "Paid",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

export default function PatientDetailsPage() {
  const params = useParams<{ id: string }>();
  const patient = patientRecords[params?.id ?? "P-1001"] ?? patientRecords["P-1001"];

  const [activeTab, setActiveTab] = useState<
    "overview" | "appointments" | "treatments" | "billing"
  >("overview");

  const [showActions, setShowActions] = useState(false);
  const [notice, setNotice] = useState("");

  const appointments = useMemo(() => {
    if (patient.id === "P-1001") return defaultAppointments;

    return [
      {
        date: patient.lastVisit,
        time: "10:30 AM",
        service: patient.treatment,
        doctor: patient.doctor,
        status: "Completed" as const,
      },
      ...(patient.nextVisit !== "—"
        ? [
            {
              date: patient.nextVisit,
              time: "10:30 AM",
              service: "Follow-up Visit",
              doctor: patient.doctor,
              status: "Confirmed" as const,
            },
          ]
        : []),
    ];
  }, [patient]);

  const treatments = useMemo(() => {
    if (patient.id === "P-1001") return defaultTreatments;

    return [
      {
        date: patient.lastVisit,
        treatment: patient.treatment,
        doctor: patient.doctor,
        note: "Fictional treatment note for portfolio demonstration.",
        amount: Math.max(patient.balance, 85),
      },
    ];
  }, [patient]);

  const invoices = useMemo(() => {
    if (patient.id === "P-1001") return defaultInvoices;

    return [
      {
        id: `INV-${patient.id.replace("P-", "")}`,
        date: patient.lastVisit,
        description: patient.treatment,
        amount: Math.max(patient.balance, 85),
        status: patient.balance === 0 ? ("Paid" as const) : ("Partial" as const),
      },
    ];
  }, [patient]);

  const handleDemoAction = (text: string) => {
    setNotice(text);
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
              href="/work/brightsmile/admin/patients"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
            >
              <ArrowLeft size={16} />
              Back to Patients
            </Link>

            <div className="relative">
              <button
                type="button"
                onClick={() => setShowActions((value) => !value)}
                className="inline-flex h-10 items-center gap-2 rounded-xl bg-blue-600 px-4 text-xs font-bold text-white transition hover:bg-blue-700"
              >
                <Plus size={15} />
                Patient Actions
                <ChevronDown size={14} />
              </button>

              {showActions && (
                <div className="absolute right-0 top-12 z-20 w-52 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
                  <button
                    type="button"
                    onClick={() =>
                      handleDemoAction(
                        "Demo action: New appointment flow selected. No real appointment was created.",
                      )
                    }
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    <CalendarDays size={15} />
                    New Appointment
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDemoAction(
                        "Demo action: Invoice creation flow selected. No real invoice was created.",
                      )
                    }
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    <Receipt size={15} />
                    Create Invoice
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDemoAction(
                        "Demo action: Patient note flow selected. No real note was saved.",
                      )
                    }
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    <FileText size={15} />
                    Add Note
                  </button>
                </div>
              )}
            </div>
          </div>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-blue-50 text-xl font-black text-blue-600">
                  {initials(patient.name)}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-3xl font-black tracking-tight text-slate-900">
                      {patient.name}
                    </h1>

                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${
                        patient.status === "Active"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          patient.status === "Active"
                            ? "bg-emerald-500"
                            : "bg-slate-400"
                        }`}
                      />
                      {patient.status}
                    </span>
                  </div>

                  <p className="mt-2 text-sm font-semibold text-blue-600">
                    {patient.id} · {patient.age} years old · {patient.gender}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-4 text-xs font-semibold text-slate-500">
                    <span className="inline-flex items-center gap-2">
                      <Phone size={14} className="text-blue-500" />
                      {patient.phone}
                    </span>

                    <span className="inline-flex items-center gap-2">
                      <Mail size={14} className="text-blue-500" />
                      {patient.email}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:w-[360px]">
                <a
                  href={`tel:${patient.phone}`}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                >
                  <Phone size={16} />
                  Call Patient
                </a>

                <a
                  href={`mailto:${patient.email}`}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-xs font-bold text-white transition hover:bg-blue-700"
                >
                  <Mail size={16} />
                  Send Email
                </a>
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
                <CalendarDays size={19} />
              </div>
              <p className="mt-4 text-xs font-semibold text-slate-400">
                Last Visit
              </p>
              <p className="mt-1 text-sm font-black text-slate-900">
                {patient.lastVisit}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <Clock3 size={19} />
              </div>
              <p className="mt-4 text-xs font-semibold text-slate-400">
                Next Visit
              </p>
              <p className="mt-1 text-sm font-black text-slate-900">
                {patient.nextVisit}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Stethoscope size={19} />
              </div>
              <p className="mt-4 text-xs font-semibold text-slate-400">
                Assigned Doctor
              </p>
              <p className="mt-1 text-sm font-black text-slate-900">
                {patient.doctor}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <CircleDollarSign size={19} />
              </div>
              <p className="mt-4 text-xs font-semibold text-slate-400">
                Account Balance
              </p>
              <p
                className={`mt-1 text-2xl font-black ${
                  patient.balance > 0 ? "text-amber-600" : "text-emerald-600"
                }`}
              >
                {patient.balance > 0
                  ? formatCurrency(patient.balance)
                  : "Paid"}
              </p>
            </div>
          </section>

          <section className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex overflow-x-auto border-b border-slate-100">
              {[
                ["overview", "Overview"],
                ["appointments", "Appointments"],
                ["treatments", "Treatment History"],
                ["billing", "Billing"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    setActiveTab(
                      value as
                        | "overview"
                        | "appointments"
                        | "treatments"
                        | "billing",
                    )
                  }
                  className={`whitespace-nowrap border-b-2 px-5 py-4 text-xs font-bold transition ${
                    activeTab === value
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-slate-400 hover:text-slate-700"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {activeTab === "overview" && (
              <div className="grid gap-6 p-5 sm:p-6 xl:grid-cols-3">
                <div className="xl:col-span-2">
                  <h2 className="text-base font-black text-slate-900">
                    Patient Information
                  </h2>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Date of Birth
                      </p>
                      <p className="mt-2 text-sm font-bold text-slate-700">
                        {patient.dateOfBirth}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Gender
                      </p>
                      <p className="mt-2 text-sm font-bold text-slate-700">
                        {patient.gender}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Insurance
                      </p>
                      <p className="mt-2 text-sm font-bold text-slate-700">
                        {patient.insurance}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Current Treatment
                      </p>
                      <p className="mt-2 text-sm font-bold text-slate-700">
                        {patient.treatment}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4 sm:col-span-2">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Address
                      </p>
                      <p className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-slate-700">
                        <MapPin size={15} className="text-blue-500" />
                        {patient.address}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-base font-black text-slate-900">
                    Emergency Contact
                  </h2>

                  <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                      <UserRound size={20} />
                    </div>

                    <p className="mt-4 text-sm font-black text-slate-900">
                      Demo Emergency Contact
                    </p>

                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      {patient.emergencyContact}
                    </p>
                  </div>

                  <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-5">
                    <p className="text-[10px] font-black uppercase tracking-wider text-blue-500">
                      Assigned Care
                    </p>

                    <p className="mt-2 text-sm font-black text-slate-900">
                      {patient.doctor}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {patient.treatment}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "appointments" && (
              <div className="p-5 sm:p-6">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-base font-black text-slate-900">
                      Appointment History
                    </h2>
                    <p className="mt-1 text-xs text-slate-400">
                      Recent and upcoming demo appointments.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleDemoAction(
                        "Demo action: New appointment selected. No appointment was created.",
                      )
                    }
                    className="inline-flex h-9 items-center gap-2 rounded-lg bg-blue-600 px-3 text-xs font-bold text-white transition hover:bg-blue-700"
                  >
                    <Plus size={14} />
                    Add
                  </button>
                </div>

                <div className="overflow-hidden rounded-xl border border-slate-100">
                  <div className="hidden grid-cols-[1.2fr_1fr_1.4fr_1.2fr_110px] gap-4 bg-slate-50 px-4 py-3 lg:grid">
                    {["Date", "Time", "Service", "Doctor", "Status"].map(
                      (heading) => (
                        <p
                          key={heading}
                          className="text-[10px] font-black uppercase tracking-wider text-slate-400"
                        >
                          {heading}
                        </p>
                      ),
                    )}
                  </div>

                  <div className="divide-y divide-slate-100">
                    {appointments.map((appointment, index) => (
                      <div
                        key={`${appointment.date}-${index}`}
                        className="grid gap-3 px-4 py-4 lg:grid-cols-[1.2fr_1fr_1.4fr_1.2fr_110px] lg:items-center lg:gap-4"
                      >
                        <div>
                          <p className="text-xs font-bold text-slate-700">
                            {appointment.date}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                          <Clock3 size={14} className="text-slate-400" />
                          {appointment.time}
                        </div>

                        <div>
                          <p className="text-xs font-bold text-slate-700">
                            {appointment.service}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-semibold text-slate-500">
                            {appointment.doctor}
                          </p>
                        </div>

                        <span
                          className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                            appointment.status === "Completed"
                              ? "bg-emerald-50 text-emerald-600"
                              : appointment.status === "Confirmed"
                                ? "bg-blue-50 text-blue-600"
                                : "bg-amber-50 text-amber-600"
                          }`}
                        >
                          <CheckCircle2 size={12} />
                          {appointment.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "treatments" && (
              <div className="p-5 sm:p-6">
                <div className="mb-5">
                  <h2 className="text-base font-black text-slate-900">
                    Treatment History
                  </h2>
                  <p className="mt-1 text-xs text-slate-400">
                    Demo treatment timeline for this patient.
                  </p>
                </div>

                <div className="space-y-4">
                  {treatments.map((treatment, index) => (
                    <div
                      key={`${treatment.date}-${index}`}
                      className="relative rounded-2xl border border-slate-100 bg-slate-50 p-5"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex gap-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                            <Stethoscope size={18} />
                          </div>

                          <div>
                            <p className="text-sm font-black text-slate-900">
                              {treatment.treatment}
                            </p>
                            <p className="mt-1 text-xs font-semibold text-blue-600">
                              {treatment.doctor}
                            </p>
                            <p className="mt-2 max-w-2xl text-xs leading-5 text-slate-500">
                              {treatment.note}
                            </p>
                          </div>
                        </div>

                        <div className="sm:text-right">
                          <p className="text-xs font-bold text-slate-400">
                            {treatment.date}
                          </p>
                          <p className="mt-2 text-sm font-black text-slate-700">
                            {formatCurrency(treatment.amount)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "billing" && (
              <div className="p-5 sm:p-6">
                <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-base font-black text-slate-900">
                      Billing & Payments
                    </h2>
                    <p className="mt-1 text-xs text-slate-400">
                      Demo invoice and payment history.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleDemoAction(
                        "Demo action: Payment flow selected. No real payment was processed.",
                      )
                    }
                    className="inline-flex h-9 items-center gap-2 rounded-lg bg-emerald-600 px-3 text-xs font-bold text-white transition hover:bg-emerald-700"
                  >
                    <CreditCard size={14} />
                    Record Payment
                  </button>
                </div>

                <div className="mb-5 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Total Invoices
                    </p>
                    <p className="mt-2 text-xl font-black text-slate-900">
                      {invoices.length}
                    </p>
                  </div>

                  <div className="rounded-xl bg-emerald-50 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">
                      Paid
                    </p>
                    <p className="mt-2 text-xl font-black text-emerald-600">
                      {formatCurrency(
                        invoices
                          .filter((invoice) => invoice.status === "Paid")
                          .reduce((sum, invoice) => sum + invoice.amount, 0),
                      )}
                    </p>
                  </div>

                  <div className="rounded-xl bg-amber-50 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-amber-500">
                      Balance Due
                    </p>
                    <p className="mt-2 text-xl font-black text-amber-600">
                      {formatCurrency(patient.balance)}
                    </p>
                  </div>
                </div>

                <div className="overflow-hidden rounded-xl border border-slate-100">
                  <div className="hidden grid-cols-[1fr_1.2fr_1fr_100px] gap-4 bg-slate-50 px-4 py-3 sm:grid">
                    {["Invoice", "Description", "Date", "Amount / Status"].map(
                      (heading) => (
                        <p
                          key={heading}
                          className="text-[10px] font-black uppercase tracking-wider text-slate-400"
                        >
                          {heading}
                        </p>
                      ),
                    )}
                  </div>

                  <div className="divide-y divide-slate-100">
                    {invoices.map((invoice) => (
                      <div
                        key={invoice.id}
                        className="grid gap-3 px-4 py-4 sm:grid-cols-[1fr_1.2fr_1fr_100px] sm:items-center sm:gap-4"
                      >
                        <p className="text-xs font-black text-blue-600">
                          {invoice.id}
                        </p>

                        <p className="text-xs font-semibold text-slate-600">
                          {invoice.description}
                        </p>

                        <p className="text-xs font-semibold text-slate-500">
                          {invoice.date}
                        </p>

                        <div>
                          <p className="text-xs font-black text-slate-800">
                            {formatCurrency(invoice.amount)}
                          </p>
                          <span
                            className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[9px] font-bold ${
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
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>

          <section className="mt-6 grid gap-5 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <CalendarDays size={19} />
              </div>
              <h3 className="mt-4 text-sm font-black text-slate-900">
                Appointments
              </h3>
              <p className="mt-2 text-xs leading-5 text-slate-500">
                Connect patient profiles directly to the clinic scheduling
                system so staff can manage visits from one record.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <FileText size={19} />
              </div>
              <h3 className="mt-4 text-sm font-black text-slate-900">
                Treatment Records
              </h3>
              <p className="mt-2 text-xs leading-5 text-slate-500">
                A future production system could connect treatment notes,
                documents, and other authorized clinical records.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <WalletCards size={19} />
              </div>
              <h3 className="mt-4 text-sm font-black text-slate-900">
                Billing
              </h3>
              <p className="mt-2 text-xs leading-5 text-slate-500">
                Track invoices, payments, outstanding balances, and account
                activity alongside the patient record.
              </p>
            </div>
          </section>

          <div className="mt-8 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-700">
            <strong>Portfolio Demo:</strong> This patient profile uses
            completely fictional sample information. No real patient,
            medical, billing, payment, or appointment record is created or
            stored by these demo interactions.
          </div>
        </main>
      </div>
    </div>
  );
}
