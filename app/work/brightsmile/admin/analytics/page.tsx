"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  CreditCard,
  Download,
  FileText,
  Filter,
  HeartPulse,
  MoreHorizontal,
  PieChart,
  RefreshCw,
  Stethoscope,
  TrendingUp,
  Users,
  WalletCards,
} from "lucide-react";

type RangeKey = "7d" | "30d" | "90d" | "12m";

type RevenuePoint = {
  label: string;
  revenue: number;
  collected: number;
};

type DoctorMetric = {
  name: string;
  specialty: string;
  appointments: number;
  completed: number;
  revenue: number;
  utilization: number;
};

type ServiceMetric = {
  name: string;
  bookings: number;
  revenue: number;
  share: number;
};

const revenueData: Record<RangeKey, RevenuePoint[]> = {
  "7d": [
    { label: "Mon", revenue: 4200, collected: 3500 },
    { label: "Tue", revenue: 5100, collected: 4300 },
    { label: "Wed", revenue: 4700, collected: 3900 },
    { label: "Thu", revenue: 6200, collected: 5200 },
    { label: "Fri", revenue: 5800, collected: 4900 },
    { label: "Sat", revenue: 7100, collected: 6100 },
    { label: "Sun", revenue: 3100, collected: 2700 },
  ],
  "30d": [
    { label: "W1", revenue: 23800, collected: 20200 },
    { label: "W2", revenue: 28400, collected: 24400 },
    { label: "W3", revenue: 31900, collected: 27100 },
    { label: "W4", revenue: 35200, collected: 30100 },
  ],
  "90d": [
    { label: "Jul", revenue: 82400, collected: 70400 },
    { label: "Aug", revenue: 91700, collected: 78800 },
    { label: "Sep", revenue: 103900, collected: 89600 },
  ],
  "12m": [
    { label: "Oct", revenue: 71800, collected: 60400 },
    { label: "Nov", revenue: 75400, collected: 63800 },
    { label: "Dec", revenue: 82600, collected: 70200 },
    { label: "Jan", revenue: 79100, collected: 67600 },
    { label: "Feb", revenue: 88400, collected: 75200 },
    { label: "Mar", revenue: 92300, collected: 78900 },
    { label: "Apr", revenue: 97800, collected: 83700 },
    { label: "May", revenue: 101400, collected: 87100 },
    { label: "Jun", revenue: 108200, collected: 93400 },
    { label: "Jul", revenue: 112900, collected: 97200 },
    { label: "Aug", revenue: 119600, collected: 103100 },
    { label: "Sep", revenue: 128700, collected: 110400 },
  ],
};

const doctorMetrics: DoctorMetric[] = [
  {
    name: "Dr. Emily Carter",
    specialty: "General & Cosmetic Dentistry",
    appointments: 128,
    completed: 118,
    revenue: 28400,
    utilization: 92,
  },
  {
    name: "Dr. Michael Anderson",
    specialty: "Restorative Dentistry",
    appointments: 116,
    completed: 104,
    revenue: 31600,
    utilization: 87,
  },
  {
    name: "Dr. Sophia Williams",
    specialty: "Pediatric & Family Dentistry",
    appointments: 143,
    completed: 132,
    revenue: 22700,
    utilization: 95,
  },
  {
    name: "Dr. Daniel Brooks",
    specialty: "Oral Surgery & Implants",
    appointments: 82,
    completed: 74,
    revenue: 38900,
    utilization: 84,
  },
  {
    name: "Dr. Olivia Bennett",
    specialty: "Endodontics",
    appointments: 91,
    completed: 83,
    revenue: 26700,
    utilization: 86,
  },
  {
    name: "Dr. James Mitchell",
    specialty: "Prosthodontics",
    appointments: 77,
    completed: 69,
    revenue: 29400,
    utilization: 81,
  },
];

const serviceMetrics: ServiceMetric[] = [
  {
    name: "General Dentistry",
    bookings: 186,
    revenue: 21400,
    share: 25,
  },
  {
    name: "Cosmetic Dentistry",
    bookings: 94,
    revenue: 28600,
    share: 18,
  },
  {
    name: "Teeth Whitening",
    bookings: 78,
    revenue: 11700,
    share: 13,
  },
  {
    name: "Dental Implants",
    bookings: 46,
    revenue: 39400,
    share: 12,
  },
  {
    name: "Orthodontics",
    bookings: 63,
    revenue: 22100,
    share: 11,
  },
  {
    name: "Pediatric Dentistry",
    bookings: 88,
    revenue: 13600,
    share: 10,
  },
  {
    name: "Root Canal Care",
    bookings: 51,
    revenue: 15900,
    share: 7,
  },
  {
    name: "Oral Surgery",
    bookings: 29,
    revenue: 17800,
    share: 4,
  },
];

const appointmentStatus = [
  { label: "Completed", value: 482, percentage: 68 },
  { label: "Confirmed", value: 121, percentage: 17 },
  { label: "Pending", value: 64, percentage: 9 },
  { label: "Cancelled", value: 29, percentage: 4 },
  { label: "Waitlist", value: 14, percentage: 2 },
];

const patientGrowth = [
  { label: "Apr", newPatients: 42, returning: 118 },
  { label: "May", newPatients: 51, returning: 126 },
  { label: "Jun", newPatients: 57, returning: 139 },
  { label: "Jul", newPatients: 64, returning: 148 },
  { label: "Aug", newPatients: 71, returning: 157 },
  { label: "Sep", newPatients: 79, returning: 171 },
];

const recentActivity = [
  {
    title: "Payment received",
    description: "Sarah Johnson paid invoice INV-2041.",
    time: "12 min ago",
    icon: CreditCard,
  },
  {
    title: "Appointment completed",
    description: "Dr. Sophia Williams completed a pediatric visit.",
    time: "34 min ago",
    icon: CheckCircle2,
  },
  {
    title: "New patient registered",
    description: "Noah Davis was added to the patient directory.",
    time: "1 hr ago",
    icon: Users,
  },
  {
    title: "Invoice created",
    description: "INV-2048 was created for Michael Brown.",
    time: "2 hrs ago",
    icon: FileText,
  },
];

const rangeLabels: Record<RangeKey, string> = {
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  "90d": "Last 90 days",
  "12m": "Last 12 months",
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatCompactCurrency(value: number) {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${Math.round(value / 1000)}k`;
  return `$${value}`;
}

function MetricCard({
  title,
  value,
  change,
  detail,
  icon: Icon,
  positive = true,
}: {
  title: string;
  value: string;
  change: string;
  detail: string;
  icon: typeof Activity;
  positive?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
            {value}
          </p>
        </div>
        <div className="rounded-xl bg-slate-100 p-2.5 text-slate-700">
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
            positive
              ? "bg-emerald-50 text-emerald-700"
              : "bg-rose-50 text-rose-700"
          }`}
        >
          {positive ? (
            <ArrowUpRight className="h-3.5 w-3.5" />
          ) : (
            <ArrowDownRight className="h-3.5 w-3.5" />
          )}
          {change}
        </span>
        <span className="text-xs text-slate-500">{detail}</span>
      </div>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow ? (
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-lg font-bold tracking-tight text-slate-950">{title}</h2>
        {description ? (
          <p className="mt-1 max-w-2xl text-sm text-slate-500">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

function RevenueChart({ data }: { data: RevenuePoint[] }) {
  const max = Math.max(...data.map((item) => item.revenue), 1);

  return (
    <div className="mt-6">
      <div className="flex h-64 items-end gap-2 sm:gap-4">
        {data.map((item) => {
          const revenueHeight = Math.max((item.revenue / max) * 100, 8);
          const collectedHeight = Math.max((item.collected / max) * 100, 6);

          return (
            <div key={item.label} className="group flex h-full flex-1 flex-col justify-end">
              <div className="relative flex h-full items-end justify-center gap-1">
                <div
                  className="w-2.5 rounded-t-md bg-slate-200 transition-all duration-300 group-hover:bg-slate-300 sm:w-4"
                  style={{ height: `${revenueHeight}%` }}
                  title={`${item.label}: ${formatCurrency(item.revenue)} billed`}
                />
                <div
                  className="w-2.5 rounded-t-md bg-slate-900 transition-all duration-300 group-hover:bg-slate-700 sm:w-4"
                  style={{ height: `${collectedHeight}%` }}
                  title={`${item.label}: ${formatCurrency(item.collected)} collected`}
                />
              </div>
              <p className="mt-3 text-center text-[11px] font-medium text-slate-400">
                {item.label}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-5 border-t border-slate-100 pt-4 text-xs text-slate-500">
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm bg-slate-200" />
          Invoiced
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm bg-slate-900" />
          Collected
        </span>
      </div>
    </div>
  );
}

function PatientGrowthChart() {
  const max = Math.max(
    ...patientGrowth.map((item) => item.newPatients + item.returning),
    1
  );

  return (
    <div className="mt-6">
      <div className="flex h-52 items-end gap-3 sm:gap-5">
        {patientGrowth.map((item) => {
          const total = item.newPatients + item.returning;
          const height = Math.max((total / max) * 100, 10);

          return (
            <div key={item.label} className="flex h-full flex-1 flex-col justify-end">
              <div className="relative flex h-full items-end justify-center">
                <div
                  className="w-full max-w-8 rounded-t-lg bg-slate-900 transition-all duration-300 hover:bg-slate-700"
                  style={{ height: `${height}%` }}
                  title={`${total} patients`}
                />
              </div>
              <p className="mt-3 text-center text-xs font-medium text-slate-400">
                {item.label}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
        <div>
          <p className="text-xs text-slate-400">New patients</p>
          <p className="mt-1 text-lg font-bold text-slate-950">
            {patientGrowth.reduce((sum, item) => sum + item.newPatients, 0)}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Returning patients</p>
          <p className="mt-1 text-lg font-bold text-slate-950">
            {patientGrowth.reduce((sum, item) => sum + item.returning, 0)}
          </p>
        </div>
      </div>
    </div>
  );
}

function StatusBar({
  label,
  value,
  percentage,
}: {
  label: string;
  value: number;
  percentage: number;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <span className="text-xs font-semibold text-slate-500">
          {value} · {percentage}%
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-slate-900 transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  const [range, setRange] = useState<RangeKey>("30d");
  const [showRangeMenu, setShowRangeMenu] = useState(false);
  const [doctorFilter, setDoctorFilter] = useState("All doctors");

  const chartData = revenueData[range];

  const filteredDoctors = useMemo(() => {
    if (doctorFilter === "All doctors") return doctorMetrics;
    return doctorMetrics.filter((doctor) => doctor.name === doctorFilter);
  }, [doctorFilter]);

  const totalRevenue = chartData.reduce((sum, item) => sum + item.revenue, 0);
  const totalCollected = chartData.reduce((sum, item) => sum + item.collected, 0);
  const collectionRate = Math.round((totalCollected / totalRevenue) * 100);

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* Demo notice */}
        <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-lg bg-amber-100 p-2 text-amber-700">
              <Activity className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-amber-900">
                Portfolio demo analytics
              </p>
              <p className="mt-0.5 text-xs leading-5 text-amber-800">
                All figures on this page are fictional sample data for the BrightSmile
                Dental showcase.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-amber-200 bg-white px-3 py-2 text-xs font-semibold text-amber-900 transition hover:bg-amber-100"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh demo
          </button>
        </div>

        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              <BarChart3 className="h-4 w-4" />
              Business analytics
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Analytics overview
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              A single view of revenue, appointments, patients, services, and
              provider performance.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <Download className="h-4 w-4" />
              Export
            </button>

            <div className="relative">
              <button
                type="button"
                onClick={() => setShowRangeMenu((open) => !open)}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              >
                <CalendarDays className="h-4 w-4" />
                {rangeLabels[range]}
                <ChevronDown className="h-4 w-4" />
              </button>

              {showRangeMenu ? (
                <div className="absolute right-0 top-full z-20 mt-2 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
                  {(Object.keys(rangeLabels) as RangeKey[]).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        setRange(key);
                        setShowRangeMenu(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition ${
                        range === key
                          ? "bg-slate-100 font-semibold text-slate-950"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {rangeLabels[key]}
                      {range === key ? <CheckCircle2 className="h-4 w-4" /> : null}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* KPI cards */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Total revenue"
            value={formatCompactCurrency(totalRevenue)}
            change="+12.8%"
            detail="vs previous period"
            icon={CircleDollarSign}
          />
          <MetricCard
            title="Payments collected"
            value={formatCompactCurrency(totalCollected)}
            change="+10.4%"
            detail={`${collectionRate}% collection rate`}
            icon={WalletCards}
          />
          <MetricCard
            title="Active patients"
            value="1,284"
            change="+8.6%"
            detail="vs previous period"
            icon={Users}
          />
          <MetricCard
            title="Appointments"
            value="710"
            change="+6.2%"
            detail="across all providers"
            icon={CalendarDays}
          />
        </section>

        {/* Revenue + appointment status */}
        <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.8fr)]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <SectionHeader
              eyebrow="Financial performance"
              title="Revenue & collections"
              description="Compare invoiced revenue with payments actually collected."
              action={
                <div className="hidden items-center gap-2 text-xs text-slate-400 sm:flex">
                  <CircleDollarSign className="h-4 w-4" />
                  {formatCurrency(totalRevenue)} billed
                </div>
              }
            />
            <RevenueChart data={chartData} />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <SectionHeader
              eyebrow="Appointments"
              title="Status breakdown"
              description="Current appointment mix across the practice."
            />

            <div className="mt-6 space-y-5">
              {appointmentStatus.map((item) => (
                <StatusBar key={item.label} {...item} />
              ))}
            </div>

            <div className="mt-7 rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-white p-2 text-slate-700 shadow-sm">
                  <Clock3 className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Average appointment</p>
                  <p className="mt-0.5 text-sm font-bold text-slate-950">
                    47 minutes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Patient growth + service mix */}
        <section className="mt-6 grid gap-6 xl:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <SectionHeader
              eyebrow="Patient trends"
              title="Patient growth"
              description="New and returning patient activity over the last six months."
            />
            <PatientGrowthChart />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <SectionHeader
              eyebrow="Service mix"
              title="Top services"
              description="Bookings and revenue contribution by treatment category."
            />

            <div className="mt-5 space-y-4">
              {serviceMetrics.slice(0, 6).map((service, index) => (
                <div key={service.name}>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-800">
                        {index + 1}. {service.name}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-400">
                        {service.bookings} bookings
                      </p>
                    </div>
                    <p className="shrink-0 text-sm font-bold text-slate-950">
                      {formatCurrency(service.revenue)}
                    </p>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-slate-900"
                      style={{ width: `${service.share * 4}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Doctor performance */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader
              eyebrow="Provider performance"
              title="Doctor performance"
              description="Appointments, completed visits, revenue, and schedule utilization."
            />

            <div className="flex flex-wrap gap-2">
              <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500">
                <Filter className="h-4 w-4" />
                <select
                  value={doctorFilter}
                  onChange={(event) => setDoctorFilter(event.target.value)}
                  className="bg-transparent font-medium text-slate-700 outline-none"
                >
                  <option>All doctors</option>
                  {doctorMetrics.map((doctor) => (
                    <option key={doctor.name}>{doctor.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                  <th className="pb-3 pr-4">Doctor</th>
                  <th className="pb-3 pr-4">Appointments</th>
                  <th className="pb-3 pr-4">Completed</th>
                  <th className="pb-3 pr-4">Revenue</th>
                  <th className="pb-3 pr-4">Utilization</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredDoctors.map((doctor) => (
                  <tr
                    key={doctor.name}
                    className="border-b border-slate-100 last:border-0"
                  >
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                          <Stethoscope className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-900">
                            {doctor.name}
                          </p>
                          <p className="truncate text-xs text-slate-400">
                            {doctor.specialty}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 pr-4 text-sm font-semibold text-slate-700">
                      {doctor.appointments}
                    </td>
                    <td className="py-4 pr-4 text-sm text-slate-600">
                      {doctor.completed}
                    </td>
                    <td className="py-4 pr-4 text-sm font-semibold text-slate-900">
                      {formatCurrency(doctor.revenue)}
                    </td>
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-slate-900"
                            style={{ width: `${doctor.utilization}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-slate-600">
                          {doctor.utilization}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 text-right">
                      <button
                        type="button"
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                        aria-label={`More options for ${doctor.name}`}
                      >
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Revenue by service + activity */}
        <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.7fr)]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <SectionHeader
              eyebrow="Revenue detail"
              title="Revenue by service"
              description="How treatment categories contribute to practice revenue."
            />

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {serviceMetrics.map((service) => (
                <div
                  key={service.name}
                  className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="rounded-lg bg-white p-2 text-slate-600 shadow-sm">
                        <HeartPulse className="h-4 w-4" />
                      </div>
                      <p className="truncate text-sm font-semibold text-slate-800">
                        {service.name}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-slate-500">
                      {service.share}%
                    </span>
                  </div>
                  <p className="mt-4 text-xl font-bold tracking-tight text-slate-950">
                    {formatCurrency(service.revenue)}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    {service.bookings} completed/recorded bookings
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <SectionHeader
              eyebrow="Live feed"
              title="Recent activity"
              description="Latest demo events across the practice."
            />

            <div className="mt-5 divide-y divide-slate-100">
              {recentActivity.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title + item.time} className="flex gap-3 py-4 first:pt-0">
                    <div className="mt-0.5 rounded-lg bg-slate-100 p-2 text-slate-600">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-800">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {item.description}
                      </p>
                      <p className="mt-1 text-[11px] font-medium text-slate-400">
                        {item.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Bottom summary */}
        <section className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-slate-100 p-2.5 text-slate-700">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Collection progress</p>
                <p className="mt-1 text-xl font-bold text-slate-950">
                  {collectionRate}%
                </p>
              </div>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-slate-900"
                style={{ width: `${collectionRate}%` }}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-slate-100 p-2.5 text-slate-700">
                <PieChart className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Top revenue service</p>
                <p className="mt-1 text-lg font-bold text-slate-950">
                  Dental Implants
                </p>
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-500">
              {formatCurrency(39400)} recorded in the demo period.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-slate-100 p-2.5 text-slate-700">
                <WalletCards className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Outstanding balance</p>
                <p className="mt-1 text-xl font-bold text-slate-950">$24,860</p>
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-500">
              Across 87 fictional open invoices.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
