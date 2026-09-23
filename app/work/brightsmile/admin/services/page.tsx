"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  CheckCircle2,
  Clock3,
  DollarSign,
  Edit3,
  Filter,
  HeartPulse,
  MoreHorizontal,
  Plus,
  Search,
  Stethoscope,
  ToggleLeft,
  ToggleRight,
  Users,
} from "lucide-react";

type ServiceStatus = "Active" | "Inactive";

type DentalService = {
  id: string;
  name: string;
  category: string;
  description: string;
  duration: string;
  price: number;
  appointments: number;
  revenue: number;
  status: ServiceStatus;
};

const initialServices: DentalService[] = [
  {
    id: "SRV-001",
    name: "General Dentistry",
    category: "General Care",
    description: "Routine examinations, cleanings, preventive care, and oral health checks.",
    duration: "45 min",
    price: 85,
    appointments: 186,
    revenue: 21400,
    status: "Active",
  },
  {
    id: "SRV-002",
    name: "Cosmetic Dentistry",
    category: "Cosmetic",
    description: "Smile-focused treatments designed to improve the appearance of teeth.",
    duration: "60 min",
    price: 250,
    appointments: 94,
    revenue: 28600,
    status: "Active",
  },
  {
    id: "SRV-003",
    name: "Teeth Whitening",
    category: "Cosmetic",
    description: "Professional whitening treatment for a brighter, more confident smile.",
    duration: "60 min",
    price: 150,
    appointments: 78,
    revenue: 11700,
    status: "Active",
  },
  {
    id: "SRV-004",
    name: "Dental Implants",
    category: "Restorative",
    description: "Implant consultation and restorative treatment for missing teeth.",
    duration: "90 min",
    price: 950,
    appointments: 46,
    revenue: 39400,
    status: "Active",
  },
  {
    id: "SRV-005",
    name: "Orthodontics",
    category: "Orthodontics",
    description: "Assessment and treatment planning for alignment and bite correction.",
    duration: "60 min",
    price: 300,
    appointments: 63,
    revenue: 22100,
    status: "Active",
  },
  {
    id: "SRV-006",
    name: "Pediatric Dentistry",
    category: "Pediatric",
    description: "Child-friendly preventive and restorative dental care.",
    duration: "45 min",
    price: 95,
    appointments: 88,
    revenue: 13600,
    status: "Active",
  },
  {
    id: "SRV-007",
    name: "Root Canal Care",
    category: "Endodontics",
    description: "Endodontic treatment for infected or damaged dental pulp.",
    duration: "90 min",
    price: 450,
    appointments: 51,
    revenue: 15900,
    status: "Active",
  },
  {
    id: "SRV-008",
    name: "Oral Surgery",
    category: "Surgical",
    description: "Surgical dental procedures including complex extractions and treatment planning.",
    duration: "90 min",
    price: 600,
    appointments: 29,
    revenue: 17800,
    status: "Active",
  },
  {
    id: "SRV-009",
    name: "Emergency Dental Care",
    category: "General Care",
    description: "Same-day assessment for urgent dental pain, swelling, or injury.",
    duration: "30 min",
    price: 110,
    appointments: 37,
    revenue: 4600,
    status: "Active",
  },
  {
    id: "SRV-010",
    name: "Dental Consultation",
    category: "Consultation",
    description: "Initial consultation for diagnosis, treatment planning, and referrals.",
    duration: "30 min",
    price: 50,
    appointments: 72,
    revenue: 3400,
    status: "Inactive",
  },
];

const categories = [
  "All categories",
  "General Care",
  "Cosmetic",
  "Restorative",
  "Orthodontics",
  "Pediatric",
  "Endodontics",
  "Surgical",
  "Consultation",
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function StatCard({
  title,
  value,
  detail,
  icon: Icon,
}: {
  title: string;
  value: string;
  detail: string;
  icon: typeof Activity;
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
      <p className="mt-4 text-xs text-slate-400">{detail}</p>
    </div>
  );
}

function ServiceIcon({ category }: { category: string }) {
  if (category === "Pediatric") {
    return <Users className="h-5 w-5" />;
  }

  if (category === "Surgical" || category === "Endodontics") {
    return <HeartPulse className="h-5 w-5" />;
  }

  if (category === "Cosmetic") {
    return <Activity className="h-5 w-5" />;
  }

  return <Stethoscope className="h-5 w-5" />;
}

export default function ServicesPage() {
  const [services, setServices] = useState(initialServices);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All categories");
  const [status, setStatus] = useState<"All" | ServiceStatus>("All");
  const [showFilters, setShowFilters] = useState(false);

  const filteredServices = useMemo(() => {
    const query = search.trim().toLowerCase();

    return services.filter((service) => {
      const matchesSearch =
        !query ||
        service.name.toLowerCase().includes(query) ||
        service.category.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query);

      const matchesCategory =
        category === "All categories" || service.category === category;

      const matchesStatus = status === "All" || service.status === status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [services, search, category, status]);

  const activeCount = services.filter((service) => service.status === "Active").length;
  const totalAppointments = services.reduce(
    (sum, service) => sum + service.appointments,
    0
  );
  const totalRevenue = services.reduce((sum, service) => sum + service.revenue, 0);
  const averagePrice =
    services.length > 0
      ? Math.round(
          services.reduce((sum, service) => sum + service.price, 0) /
            services.length
        )
      : 0;

  function toggleStatus(id: string) {
    setServices((current) =>
      current.map((service) =>
        service.id === id
          ? {
              ...service,
              status: service.status === "Active" ? "Inactive" : "Active",
            }
          : service
      )
    );
  }

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
                Portfolio demo services
              </p>
              <p className="mt-0.5 text-xs leading-5 text-amber-800">
                Service records, pricing, appointments, and revenue shown here are
                fictional sample data.
              </p>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              <Stethoscope className="h-4 w-4" />
              Practice management
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Dental services
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Manage treatments, pricing, durations, availability, and service
              performance from one place.
            </p>
          </div>

          <button
            type="button"
            onClick={() => alert("Demo only — service creation is not connected.")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            <Plus className="h-4 w-4" />
            Add service
          </button>
        </div>

        {/* Stats */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total services"
            value={String(services.length)}
            detail={`${activeCount} currently active`}
            icon={Stethoscope}
          />
          <StatCard
            title="Appointments"
            value={totalAppointments.toLocaleString()}
            detail="Recorded across all services"
            icon={Users}
          />
          <StatCard
            title="Service revenue"
            value={formatCurrency(totalRevenue)}
            detail="Fictional demo revenue"
            icon={DollarSign}
          />
          <StatCard
            title="Average price"
            value={formatCurrency(averagePrice)}
            detail="Average listed service price"
            icon={Clock3}
          />
        </section>

        {/* Search and filters */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative min-w-0 flex-1 lg:max-w-xl">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search services..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 outline-none"
              >
                {categories.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => setShowFilters((value) => !value)}
                className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-semibold transition ${
                  showFilters
                    ? "border-slate-900 bg-slate-950 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Filter className="h-4 w-4" />
                Filters
              </button>
            </div>
          </div>

          {showFilters ? (
            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
              <span className="mr-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Status
              </span>

              {(["All", "Active", "Inactive"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setStatus(item)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                    status === item
                      ? "bg-slate-950 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {item}
                </button>
              ))}

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("All categories");
                  setStatus("All");
                }}
                className="ml-auto text-xs font-semibold text-slate-500 underline-offset-4 hover:text-slate-900 hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : null}
        </section>

        {/* Service table */}
        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-2 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <h2 className="text-lg font-bold text-slate-950">Service directory</h2>
              <p className="mt-1 text-sm text-slate-500">
                Showing {filteredServices.length} of {services.length} services.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-400">
              <CheckCircle2 className="h-4 w-4" />
              {activeCount} active services
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[1050px] border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                  <th className="px-6 py-3">Service</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Duration</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Appointments</th>
                  <th className="px-4 py-3">Revenue</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredServices.map((service) => (
                  <tr
                    key={service.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                          <ServiceIcon category={service.category} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-900">{service.name}</p>
                          <p className="mt-1 max-w-xs truncate text-xs text-slate-400">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                        {service.category}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-sm text-slate-600">
                      {service.duration}
                    </td>

                    <td className="px-4 py-4 text-sm font-semibold text-slate-900">
                      {formatCurrency(service.price)}
                    </td>

                    <td className="px-4 py-4 text-sm font-medium text-slate-600">
                      {service.appointments}
                    </td>

                    <td className="px-4 py-4 text-sm font-semibold text-slate-900">
                      {formatCurrency(service.revenue)}
                    </td>

                    <td className="px-4 py-4">
                      <button
                        type="button"
                        onClick={() => toggleStatus(service.id)}
                        className="inline-flex items-center gap-1.5"
                        title="Toggle service status"
                      >
                        {service.status === "Active" ? (
                          <>
                            <ToggleRight className="h-6 w-6 text-slate-900" />
                            <span className="text-xs font-semibold text-slate-700">
                              Active
                            </span>
                          </>
                        ) : (
                          <>
                            <ToggleLeft className="h-6 w-6 text-slate-400" />
                            <span className="text-xs font-semibold text-slate-400">
                              Inactive
                            </span>
                          </>
                        )}
                      </button>
                    </td>

                    <td className="px-4 py-4 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() =>
                            alert(`Demo edit: ${service.name}`)
                          }
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                          aria-label={`Edit ${service.name}`}
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                          aria-label={`More options for ${service.name}`}
                        >
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="divide-y divide-slate-100 lg:hidden">
            {filteredServices.map((service) => (
              <div key={service.id} className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                      <ServiceIcon category={service.category} />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-slate-900">
                        {service.name}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        {service.category}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleStatus(service.id)}
                    className="shrink-0"
                    title="Toggle service status"
                  >
                    {service.status === "Active" ? (
                      <ToggleRight className="h-7 w-7 text-slate-900" />
                    ) : (
                      <ToggleLeft className="h-7 w-7 text-slate-400" />
                    )}
                  </button>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-500">
                  {service.description}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      Price
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-900">
                      {formatCurrency(service.price)}
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      Duration
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-900">
                      {service.duration}
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      Appointments
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-900">
                      {service.appointments}
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      Revenue
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-900">
                      {formatCurrency(service.revenue)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                      service.status === "Active"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        service.status === "Active"
                          ? "bg-emerald-500"
                          : "bg-slate-400"
                      }`}
                    />
                    {service.status}
                  </span>

                  <button
                    type="button"
                    onClick={() => alert(`Demo edit: ${service.name}`)}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredServices.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <Search className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-sm font-bold text-slate-900">
                No services found
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Try adjusting your search or filters.
              </p>
            </div>
          ) : null}
        </section>

        {/* Bottom performance panel */}
        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-slate-100 p-2.5 text-slate-700">
                <DollarSign className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Highest revenue service</p>
                <p className="mt-1 text-sm font-bold text-slate-950">
                  Dental Implants
                </p>
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-500">$39,400 demo revenue</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-slate-100 p-2.5 text-slate-700">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Most booked service</p>
                <p className="mt-1 text-sm font-bold text-slate-950">
                  General Dentistry
                </p>
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-500">186 demo appointments</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-slate-100 p-2.5 text-slate-700">
                <Clock3 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Common appointment length</p>
                <p className="mt-1 text-sm font-bold text-slate-950">60 minutes</p>
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-500">
              Based on the fictional service catalog.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
