"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  DollarSign,
  Edit3,
  FileText,
  FolderKanban,
  Mail,
  MapPin,
  MessageSquare,
  Pencil,
  Phone,
  Plus,
  Receipt,
  Save,
  Send,
  Trash2,
  User,
  Users,
  Wallet,
  X,
} from "lucide-react";

import ClientProjectEditor, {
  type ClientProject,
} from "../components/ClientProjectEditor";

type ClientStatus = "Active" | "Inactive" | "Pending";

type Client = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: ClientStatus;
  companyType: string;
  projects: number;
  outstanding: number;
  lastActivity: string;
  joinedDate: string;
  location: string;
  website: string;
};

type Tab =
  | "Overview"
  | "Projects"
  | "Leads"
  | "Invoices"
  | "Payments"
  | "Messages"
  | "Activity";

const tabs: Tab[] = [
  "Overview",
  "Projects",
  "Leads",
  "Invoices",
  "Payments",
  "Messages",
  "Activity",
];

const clients: Client[] = [
  {
    id: "client-001",
    name: "Sarah Mitchell",
    company: "Northstar Digital",
    email: "sarah@northstardigital.example",
    phone: "+1 (555) 201-4821",
    status: "Active",
    companyType: "Agency",
    projects: 2,
    outstanding: 12500,
    lastActivity: "Today",
    joinedDate: "March 12, 2026",
    location: "New York, USA",
    website: "northstardigital.example",
  },
  {
    id: "client-002",
    name: "Michael Carter",
    company: "Carter & Co. Consulting",
    email: "michael@carterco.example",
    phone: "+1 (555) 314-7290",
    status: "Active",
    companyType: "Professional Services",
    projects: 1,
    outstanding: 0,
    lastActivity: "Yesterday",
    joinedDate: "February 18, 2026",
    location: "Chicago, USA",
    website: "carterco.example",
  },
  {
    id: "client-003",
    name: "Jessica Williams",
    company: "Bloom Wellness",
    email: "jessica@bloomwellness.example",
    phone: "+1 (555) 428-1937",
    status: "Active",
    companyType: "Small Business",
    projects: 3,
    outstanding: 8400,
    lastActivity: "2 days ago",
    joinedDate: "January 26, 2026",
    location: "Austin, USA",
    website: "bloomwellness.example",
  },
  {
    id: "client-004",
    name: "Daniel Thompson",
    company: "Vertex Eats",
    email: "daniel@vertexeats.example",
    phone: "+1 (555) 537-2841",
    status: "Pending",
    companyType: "E-commerce",
    projects: 1,
    outstanding: 6500,
    lastActivity: "3 days ago",
    joinedDate: "April 4, 2026",
    location: "Los Angeles, USA",
    website: "vertexeats.example",
  },
  {
    id: "client-005",
    name: "Emily Anderson",
    company: "BrightPath Coaching",
    email: "emily@brightpath.example",
    phone: "+1 (555) 641-8294",
    status: "Active",
    companyType: "Startup",
    projects: 2,
    outstanding: 3200,
    lastActivity: "4 days ago",
    joinedDate: "March 2, 2026",
    location: "Boston, USA",
    website: "brightpath.example",
  },
  {
    id: "client-006",
    name: "James Wilson",
    company: "Wilson Construction",
    email: "james@wilsonconstruction.example",
    phone: "+1 (555) 758-4102",
    status: "Active",
    companyType: "Small Business",
    projects: 1,
    outstanding: 15800,
    lastActivity: "5 days ago",
    joinedDate: "December 15, 2025",
    location: "Denver, USA",
    website: "wilsonconstruction.example",
  },
  {
    id: "client-007",
    name: "Olivia Brown",
    company: "Oak & Stone Realty",
    email: "olivia@oakstonerealty.example",
    phone: "+1 (555) 863-2175",
    status: "Inactive",
    companyType: "Professional Services",
    projects: 0,
    outstanding: 0,
    lastActivity: "2 weeks ago",
    joinedDate: "November 8, 2025",
    location: "Miami, USA",
    website: "oakstonerealty.example",
  },
  {
    id: "client-008",
    name: "William Davis",
    company: "Summit Tech",
    email: "william@summittech.example",
    phone: "+1 (555) 974-3518",
    status: "Active",
    companyType: "Startup",
    projects: 2,
    outstanding: 4100,
    lastActivity: "1 week ago",
    joinedDate: "January 14, 2026",
    location: "Seattle, USA",
    website: "summittech.example",
  },
  {
    id: "client-009",
    name: "Sophia Miller",
    company: "Luna Bistro",
    email: "sophia@lunabistro.example",
    phone: "+1 (555) 185-6427",
    status: "Pending",
    companyType: "Small Business",
    projects: 1,
    outstanding: 7200,
    lastActivity: "1 week ago",
    joinedDate: "April 10, 2026",
    location: "San Francisco, USA",
    website: "lunabistro.example",
  },
  {
    id: "client-010",
    name: "Noah Martinez",
    company: "ForgeBuild",
    email: "noah@forgebuild.example",
    phone: "+1 (555) 296-7148",
    status: "Active",
    companyType: "Small Business",
    projects: 2,
    outstanding: 9800,
    lastActivity: "2 weeks ago",
    joinedDate: "October 21, 2025",
    location: "Phoenix, USA",
    website: "forgebuild.example",
  },
];

export default function ClientProfilePage() {
  const params = useParams();
  const clientId = String(params.id);

  const originalClient = clients.find(
    (item) => item.id === clientId
  );

  const [client, setClient] = useState<Client | null>(
    originalClient ?? null
  );

  const [projects, setProjects] = useState<ClientProject[]>(
    originalClient ? getProjects(originalClient) : []
  );

  const [activeTab, setActiveTab] =
    useState<Tab>("Overview");

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  if (!client) {
    return <ClientNotFound />;
  }

  const showSuccess = (message: string) => {
    setToastMessage(message);
    setShowToast(true);

    window.setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleSaveClient = (updatedClient: Client) => {
    setClient(updatedClient);
    setIsEditOpen(false);

    showSuccess("Client updated successfully.");
  };

  const handleDeleteClient = () => {
    setIsDeleteOpen(false);

    showSuccess("Client deleted successfully.");

    window.setTimeout(() => {
      window.location.href = "/admin/clients";
    }, 900);
  };

  const handleProjectsChange = (
    updatedProjects: ClientProject[]
  ) => {
    setProjects(updatedProjects);

    setClient((current) =>
      current
        ? {
            ...current,
            projects: updatedProjects.length,
            lastActivity: "Just now",
          }
        : current
    );
  };

  return (
    <>
      <main className="w-full bg-[#060914] px-5 py-8 text-white sm:px-8 sm:py-10 xl:px-10">
        <div className="w-full space-y-6">

          {/* Back */}
          <Link
            href="/admin/clients"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-cyan-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Clients
          </Link>

          {/* Client Header */}
          <section className="relative overflow-hidden rounded-2xl border border-white/8 bg-[#0b1020]">
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-400/5 blur-3xl" />

            <div className="relative p-5 sm:p-7">
              <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">

                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 text-xl font-semibold text-cyan-300">
                    {getInitials(client.name)}
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                        {client.name}
                      </h1>

                      <StatusBadge status={client.status} />
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <Building2 className="h-4 w-4 text-slate-600" />
                        {client.company}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="h-4 w-4 text-slate-600" />
                        Client since {client.joinedDate}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Client Actions */}
                <div className="flex flex-wrap gap-2">
                  <a
                    href={`mailto:${client.email}`}
                    className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/8 bg-white/[0.02] px-4 text-sm font-medium text-slate-300 transition hover:border-cyan-400/20 hover:text-white"
                  >
                    <Mail className="h-4 w-4" />
                    Email
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsEditOpen(true)}
                    className="inline-flex h-10 items-center gap-2 rounded-xl border border-cyan-400/15 bg-cyan-400/10 px-4 text-sm font-medium text-cyan-300 transition hover:bg-cyan-400/15"
                  >
                    <Pencil className="h-4 w-4" />
                    Edit Client
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsDeleteOpen(true)}
                    className="inline-flex h-10 items-center gap-2 rounded-xl border border-red-400/15 bg-red-400/10 px-4 text-sm font-medium text-red-300 transition hover:bg-red-400/15"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Functional Tabs */}
          <div className="overflow-x-auto rounded-2xl border border-white/8 bg-[#0b1020]">
            <div className="flex min-w-max border-b border-white/6">
              {tabs.map((tab) => {
                const isActive = activeTab === tab;

                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`relative px-5 py-4 text-sm font-medium transition ${
                      isActive
                        ? "text-cyan-300"
                        : "text-slate-500 hover:text-white"
                    }`}
                  >
                    {tab}

                    {isActive && (
                      <span className="absolute inset-x-4 bottom-0 h-0.5 rounded-full bg-cyan-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ================================================================ */}
          {/* OVERVIEW                                                         */}
          {/* ================================================================ */}

          {activeTab === "Overview" && (
            <div className="grid w-full grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
              <div className="space-y-5">
                <OverviewStats client={client} />

                <ClientActivity client={client} />

                <OverviewProjects
                  projects={projects}
                  onViewProjects={() =>
                    setActiveTab("Projects")
                  }
                />
              </div>

              <div className="space-y-5">
                <ContactPanel client={client} />

                <FinancialPanel client={client} />

                <QuickActions
                  onProjects={() =>
                    setActiveTab("Projects")
                  }
                  onInvoices={() =>
                    setActiveTab("Invoices")
                  }
                  onPayments={() =>
                    setActiveTab("Payments")
                  }
                  onMessages={() =>
                    setActiveTab("Messages")
                  }
                />
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* PROJECTS                                                         */}
          {/* ================================================================ */}

          {activeTab === "Projects" && (
            <ClientProjectEditor
              projects={projects}
              onChange={handleProjectsChange}
            />
          )}

          {/* ================================================================ */}
          {/* LEADS                                                            */}
          {/* ================================================================ */}

          {activeTab === "Leads" && (
            <ClientLeads
              client={client}
              onSuccess={showSuccess}
            />
          )}

          {/* ================================================================ */}
          {/* INVOICES                                                         */}
          {/* ================================================================ */}

          {activeTab === "Invoices" && (
            <ClientInvoices
              client={client}
              onSuccess={showSuccess}
            />
          )}

          {/* ================================================================ */}
          {/* PAYMENTS                                                         */}
          {/* ================================================================ */}

          {activeTab === "Payments" && (
            <ClientPayments
              client={client}
            />
          )}

          {/* ================================================================ */}
          {/* MESSAGES                                                         */}
          {/* ================================================================ */}

          {activeTab === "Messages" && (
            <ClientMessages
              client={client}
              onSuccess={showSuccess}
            />
          )}

          {/* ================================================================ */}
          {/* ACTIVITY                                                         */}
          {/* ================================================================ */}

          {activeTab === "Activity" && (
            <ClientActivity
              client={client}
              expanded
            />
          )}
        </div>
      </main>

      {/* Edit Client */}
      {isEditOpen && (
        <EditClientModal
          client={client}
          onClose={() => setIsEditOpen(false)}
          onSave={handleSaveClient}
        />
      )}

      {/* Delete Client */}
      {isDeleteOpen && (
        <DeleteClientModal
          client={client}
          onClose={() => setIsDeleteOpen(false)}
          onDelete={handleDeleteClient}
        />
      )}

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-5 right-5 z-[100] w-[calc(100%-40px)] max-w-sm rounded-2xl border border-emerald-400/20 bg-[#0b1020] p-4 shadow-2xl shadow-black/40">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-white">
                Success
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {toastMessage}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowToast(false)}
              className="ml-auto text-slate-600 transition hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ========================================================================== */
/* OVERVIEW STATS                                                            */
/* ========================================================================== */

function OverviewStats({ client }: { client: Client }) {
  const stats = [
    {
      label: "Active Projects",
      value: client.projects.toString(),
      icon: FolderKanban,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      label: "Outstanding",
      value: formatCurrency(client.outstanding),
      icon: Wallet,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
    },
    {
      label: "Total Invoices",
      value: client.projects === 0 ? "0" : "4",
      icon: Receipt,
      color: "text-violet-400",
      bg: "bg-violet-400/10",
    },
    {
      label: "Payments",
      value: client.outstanding === 0 ? "Paid" : "Active",
      icon: CreditCard,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/8 bg-[#0b1020] p-5 transition hover:border-cyan-400/15"
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg}`}
            >
              <Icon className={`h-5 w-5 ${stat.color}`} />
            </div>

            <p className="mt-4 text-xs text-slate-600">
              {stat.label}
            </p>

            <p className="mt-1 text-xl font-semibold text-white">
              {stat.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}

/* ========================================================================== */
/* OVERVIEW PROJECTS                                                         */
/* ========================================================================== */

function OverviewProjects({
  projects,
  onViewProjects,
}: {
  projects: ClientProject[];
  onViewProjects: () => void;
}) {
  return (
    <section className="rounded-2xl border border-white/8 bg-[#0b1020]">
      <div className="flex items-center justify-between border-b border-white/8 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-400/10">
            <FolderKanban className="h-4 w-4 text-blue-400" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">
              Projects
            </h2>

            <p className="mt-0.5 text-xs text-slate-600">
              Current client projects
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onViewProjects}
          className="text-xs font-medium text-cyan-300 transition hover:text-cyan-200"
        >
          View all
        </button>
      </div>

      <div className="divide-y divide-white/6">
        {projects.slice(0, 3).map((project) => (
          <div
            key={project.id}
            className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
          >
            <div className="flex min-w-0 items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-400/10">
                <FolderKanban className="h-4 w-4 text-blue-400" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">
                  {project.name}
                </p>

                <p className="mt-1 truncate text-xs text-slate-600">
                  {project.description}
                </p>
              </div>
            </div>

            <StatusBadgeProject status={project.status} />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ========================================================================== */
/* CONTACT                                                                   */
/* ========================================================================== */

function ContactPanel({ client }: { client: Client }) {
  return (
    <section className="rounded-2xl border border-white/8 bg-[#0b1020]">
      <SectionHeader
        icon={<User className="h-4 w-4" />}
        title="Contact"
      />

      <div className="divide-y divide-white/6 px-5">
        <ContactRow
          icon={<Mail className="h-4 w-4" />}
          label="Email"
          value={client.email}
          href={`mailto:${client.email}`}
        />

        <ContactRow
          icon={<Phone className="h-4 w-4" />}
          label="Phone"
          value={client.phone}
          href={`tel:${client.phone}`}
        />

        <ContactRow
          icon={<MapPin className="h-4 w-4" />}
          label="Location"
          value={client.location}
        />

        <ContactRow
          icon={<Building2 className="h-4 w-4" />}
          label="Business Type"
          value={client.companyType}
        />

        <ContactRow
          icon={<FileText className="h-4 w-4" />}
          label="Website"
          value={client.website}
        />
      </div>
    </section>
  );
}

/* ========================================================================== */
/* FINANCIAL                                                                 */
/* ========================================================================== */

function FinancialPanel({ client }: { client: Client }) {
  return (
    <section className="rounded-2xl border border-white/8 bg-[#0b1020]">
      <SectionHeader
        icon={<DollarSign className="h-4 w-4" />}
        title="Financial Overview"
      />

      <div className="space-y-4 p-5">
        <div className="rounded-xl border border-white/6 bg-[#060914] p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-slate-600">
              Outstanding Balance
            </span>

            <Wallet className="h-4 w-4 text-amber-400" />
          </div>

          <p
            className={`mt-2 text-2xl font-semibold ${
              client.outstanding > 0
                ? "text-amber-300"
                : "text-emerald-400"
            }`}
          >
            {formatCurrency(client.outstanding)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/6 bg-[#060914] p-4">
            <p className="text-[11px] text-slate-600">
              Invoices
            </p>

            <p className="mt-1 text-lg font-semibold text-white">
              {client.projects === 0 ? "0" : "4"}
            </p>
          </div>

          <div className="rounded-xl border border-white/6 bg-[#060914] p-4">
            <p className="text-[11px] text-slate-600">
              Payments
            </p>

            <p className="mt-1 text-lg font-semibold text-emerald-400">
              {client.outstanding === 0 ? "Paid" : "Active"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========================================================================== */
/* QUICK ACTIONS                                                             */
/* ========================================================================== */

function QuickActions({
  onProjects,
  onInvoices,
  onPayments,
  onMessages,
}: {
  onProjects: () => void;
  onInvoices: () => void;
  onPayments: () => void;
  onMessages: () => void;
}) {
  const actions = [
    {
      label: "Send Message",
      icon: MessageSquare,
      color: "text-cyan-400",
      bg: "bg-cyan-400/10",
      action: onMessages,
    },
    {
      label: "Create Invoice",
      icon: Receipt,
      color: "text-violet-400",
      bg: "bg-violet-400/10",
      action: onInvoices,
    },
    {
      label: "Add Project",
      icon: FolderKanban,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      action: onProjects,
    },
    {
      label: "Record Payment",
      icon: CreditCard,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      action: onPayments,
    },
  ];

  return (
    <section className="rounded-2xl border border-white/8 bg-[#0b1020]">
      <SectionHeader
        icon={<Send className="h-4 w-4" />}
        title="Quick Actions"
      />

      <div className="grid grid-cols-2 gap-3 p-5">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.label}
              type="button"
              onClick={action.action}
              className="group rounded-xl border border-white/6 bg-[#060914] p-3 text-left transition hover:border-cyan-400/15 hover:bg-white/[0.025]"
            >
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${action.bg}`}
              >
                <Icon className={`h-4 w-4 ${action.color}`} />
              </div>

              <p className="mt-3 text-xs font-medium text-slate-300 transition group-hover:text-white">
                {action.label}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}

/* ========================================================================== */
/* LEADS                                                                     */
/* ========================================================================== */

function ClientLeads({
  client,
  onSuccess,
}: {
  client: Client;
  onSuccess: (message: string) => void;
}) {
  const [leads, setLeads] = useState([
    {
      id: "lead-001",
      name: "Alex Johnson",
      email: "alex@example.com",
      source: "Website",
      status: "New",
      date: "Today",
    },
    {
      id: "lead-002",
      name: "Morgan Lee",
      email: "morgan@example.com",
      source: "Referral",
      status: "Contacted",
      date: "Yesterday",
    },
    {
      id: "lead-003",
      name: "Chris Taylor",
      email: "chris@example.com",
      source: "Google",
      status: "Qualified",
      date: "3 days ago",
    },
  ]);

  const [showAdd, setShowAdd] = useState(false);

  const addLead = () => {
    setLeads((current) => [
      ...current,
      {
        id: `lead-${Date.now()}`,
        name: "New Demo Lead",
        email: "newlead@example.com",
        source: "Website",
        status: "New",
        date: "Just now",
      },
    ]);

    setShowAdd(false);
    onSuccess("Lead added successfully.");
  };

  return (
    <section className="rounded-2xl border border-white/8 bg-[#0b1020]">
      <SectionHeader
        icon={<Users className="h-4 w-4" />}
        title="Leads"
        subtitle={`Leads associated with ${client.company}`}
      />

      <div className="flex items-center justify-between border-b border-white/6 px-5 py-4">
        <div>
          <p className="text-2xl font-semibold text-white">
            {leads.length}
          </p>

          <p className="text-xs text-slate-600">
            Demo leads
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAdd(true)}
          className="inline-flex h-9 items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-3.5 text-xs font-semibold text-slate-950"
        >
          <Plus className="h-4 w-4" />
          Add Lead
        </button>
      </div>

      <div className="divide-y divide-white/6">
        {leads.map((lead) => (
          <div
            key={lead.id}
            className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-sm font-medium text-white">
                {lead.name}
              </p>

              <p className="mt-1 text-xs text-slate-600">
                {lead.email}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-cyan-400/15 bg-cyan-400/10 px-2.5 py-1 text-xs text-cyan-300">
                {lead.source}
              </span>

              <span className="rounded-full border border-blue-400/15 bg-blue-400/10 px-2.5 py-1 text-xs text-blue-300">
                {lead.status}
              </span>

              <span className="text-xs text-slate-600">
                {lead.date}
              </span>
            </div>
          </div>
        ))}
      </div>

      {showAdd && (
        <SimpleActionModal
          title="Add Lead"
          description="Create a fictional demo lead for this client."
          confirmLabel="Add Lead"
          onClose={() => setShowAdd(false)}
          onConfirm={addLead}
        />
      )}
    </section>
  );
}

/* ========================================================================== */
/* INVOICES                                                                  */
/* ========================================================================== */

function ClientInvoices({
  client,
  onSuccess,
}: {
  client: Client;
  onSuccess: (message: string) => void;
}) {
  const invoices = [
    {
      id: "INV-2041",
      title: "Website Development",
      amount: 6500,
      status: "Paid",
      date: "September 18, 2026",
    },
    {
      id: "INV-2052",
      title: "Lead Generation System",
      amount: 4200,
      status: "Pending",
      date: "September 23, 2026",
    },
    {
      id: "INV-2061",
      title: "Website Care",
      amount: 1800,
      status: "Pending",
      date: "September 25, 2026",
    },
  ];

  return (
    <section className="rounded-2xl border border-white/8 bg-[#0b1020]">
      <div className="flex flex-col gap-4 border-b border-white/8 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-400/10">
            <Receipt className="h-4 w-4 text-violet-400" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">
              Invoices
            </h2>

            <p className="mt-0.5 text-xs text-slate-600">
              Billing records for {client.company}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            onSuccess("Invoice creation opened.")
          }
          className="inline-flex h-9 items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-3.5 text-xs font-semibold text-slate-950"
        >
          <Plus className="h-4 w-4" />
          Create Invoice
        </button>
      </div>

      <div className="divide-y divide-white/6">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-400/10">
                <FileText className="h-5 w-5 text-violet-400" />
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  {invoice.id}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {invoice.title}
                </p>

                <p className="mt-1 text-[11px] text-slate-600">
                  {invoice.date}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={`rounded-full border px-2.5 py-1 text-xs ${
                  invoice.status === "Paid"
                    ? "border-emerald-400/15 bg-emerald-400/10 text-emerald-400"
                    : "border-amber-400/15 bg-amber-400/10 text-amber-300"
                }`}
              >
                {invoice.status}
              </span>

              <span className="text-sm font-semibold text-white">
                {formatCurrency(invoice.amount)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ========================================================================== */
/* PAYMENTS                                                                  */
/* ========================================================================== */

function ClientPayments({ client }: { client: Client }) {
  const payments = [
    {
      id: "PAY-1001",
      invoice: "INV-2041",
      amount: 6500,
      method: "Bank Transfer",
      date: "September 20, 2026",
      status: "Completed",
    },
    {
      id: "PAY-1002",
      invoice: "INV-2034",
      amount: 3200,
      method: "Card",
      date: "September 8, 2026",
      status: "Completed",
    },
  ];

  const totalPaid = payments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );

  return (
    <section className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <FinancialStat
          label="Total Paid"
          value={formatCurrency(totalPaid)}
          icon={DollarSign}
          color="text-emerald-400"
          bg="bg-emerald-400/10"
        />

        <FinancialStat
          label="Outstanding"
          value={formatCurrency(client.outstanding)}
          icon={Wallet}
          color="text-amber-400"
          bg="bg-amber-400/10"
        />

        <FinancialStat
          label="Transactions"
          value={payments.length.toString()}
          icon={CreditCard}
          color="text-cyan-400"
          bg="bg-cyan-400/10"
        />
      </div>

      <section className="rounded-2xl border border-white/8 bg-[#0b1020]">
        <SectionHeader
          icon={<CreditCard className="h-4 w-4" />}
          title="Payment History"
          subtitle={`Payments from ${client.company}`}
        />

        <div className="divide-y divide-white/6">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
            >
              <div>
                <p className="text-sm font-semibold text-white">
                  {payment.id}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {payment.invoice} · {payment.method}
                </p>

                <p className="mt-1 text-[11px] text-slate-600">
                  {payment.date}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span className="rounded-full border border-emerald-400/15 bg-emerald-400/10 px-2.5 py-1 text-xs text-emerald-400">
                  {payment.status}
                </span>

                <span className="text-sm font-semibold text-white">
                  {formatCurrency(payment.amount)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

/* ========================================================================== */
/* MESSAGES                                                                  */
/* ========================================================================== */

function ClientMessages({
  client,
  onSuccess,
}: {
  client: Client;
  onSuccess: (message: string) => void;
}) {
  const messages = [
    {
      id: "MSG-01",
      subject: "Website progress update",
      preview:
        "The latest website updates are ready for review.",
      date: "Today",
      status: "Unread",
    },
    {
      id: "MSG-02",
      subject: "Invoice question",
      preview:
        "Could you confirm the payment schedule?",
      date: "Yesterday",
      status: "Replied",
    },
    {
      id: "MSG-03",
      subject: "Project planning",
      preview:
        "Let's review the next phase of the project.",
      date: "3 days ago",
      status: "Replied",
    },
  ];

  return (
    <section className="rounded-2xl border border-white/8 bg-[#0b1020]">
      <div className="flex flex-col gap-4 border-b border-white/8 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400/10">
            <MessageSquare className="h-4 w-4 text-cyan-400" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">
              Messages
            </h2>

            <p className="mt-0.5 text-xs text-slate-600">
              Communication with {client.name}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            onSuccess("New message composer opened.")
          }
          className="inline-flex h-9 items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-3.5 text-xs font-semibold text-slate-950"
        >
          <Send className="h-4 w-4" />
          New Message
        </button>
      </div>

      <div className="divide-y divide-white/6">
        {messages.map((message) => (
          <button
            key={message.id}
            type="button"
            onClick={() =>
              onSuccess(`Opened "${message.subject}".`)
            }
            className="flex w-full flex-col gap-3 p-5 text-left transition hover:bg-white/[0.015] sm:flex-row sm:items-center sm:justify-between sm:p-6"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-semibold text-white">
                  {message.subject}
                </p>

                {message.status === "Unread" && (
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                )}
              </div>

              <p className="mt-1 truncate text-xs text-slate-500">
                {message.preview}
              </p>
            </div>

            <span className="shrink-0 text-xs text-slate-600">
              {message.date}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

/* ========================================================================== */
/* ACTIVITY                                                                  */
/* ========================================================================== */

function ClientActivity({
  client,
  expanded = false,
}: {
  client: Client;
  expanded?: boolean;
}) {
  const activities = [
    {
      icon: <CheckCircle2 className="h-4 w-4" />,
      color: "bg-emerald-400/10 text-emerald-400",
      title: "Client account active",
      description:
        "Client profile is currently active.",
      date: client.lastActivity,
    },
    {
      icon: <FolderKanban className="h-4 w-4" />,
      color: "bg-blue-400/10 text-blue-400",
      title: `${client.projects} active ${
        client.projects === 1
          ? "project"
          : "projects"
      }`,
      description:
        "Current projects are associated with this client.",
      date: "Current",
    },
    {
      icon: <Receipt className="h-4 w-4" />,
      color: "bg-violet-400/10 text-violet-400",
      title: "Invoice activity",
      description:
        "Client billing information is available in the invoices section.",
      date: "Recent",
    },
    {
      icon: <CreditCard className="h-4 w-4" />,
      color: "bg-emerald-400/10 text-emerald-400",
      title: "Payment recorded",
      description:
        "A recent client payment was recorded.",
      date: "September 20",
    },
    {
      icon: <MessageSquare className="h-4 w-4" />,
      color: "bg-cyan-400/10 text-cyan-400",
      title: "Client communication",
      description:
        "Messages and conversations can be tracked from the client workspace.",
      date: "Recent",
    },
    {
      icon: <User className="h-4 w-4" />,
      color: "bg-violet-400/10 text-violet-400",
      title: "Client profile updated",
      description:
        "Client information was reviewed in the workspace.",
      date: "Last week",
    },
  ];

  const visibleActivities = expanded
    ? activities
    : activities.slice(0, 4);

  return (
    <section className="rounded-2xl border border-white/8 bg-[#0b1020]">
      <SectionHeader
        icon={<Clock3 className="h-4 w-4" />}
        title="Recent Activity"
        subtitle={
          expanded
            ? "Full client activity timeline"
            : "Latest client interactions"
        }
      />

      <div className="space-y-5 p-5 sm:p-6">
        {visibleActivities.map((activity, index) => (
          <ActivityRow
            key={`${activity.title}-${index}`}
            icon={activity.icon}
            color={activity.color}
            title={activity.title}
            description={activity.description}
            date={activity.date}
          />
        ))}
      </div>
    </section>
  );
}

/* ========================================================================== */
/* EDIT CLIENT MODAL                                                         */
/* ========================================================================== */

function EditClientModal({
  client,
  onClose,
  onSave,
}: {
  client: Client;
  onClose: () => void;
  onSave: (client: Client) => void;
}) {
  const [form, setForm] = useState<Client>(client);

  const updateField = <K extends keyof Client>(
    field: K,
    value: Client[K]
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#0b1020] shadow-2xl shadow-black/50">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/8 bg-[#0b1020] px-5 py-4 sm:px-6">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Edit Client
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Update the client's information.
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

        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSave(form);
          }}
          className="space-y-5 p-5 sm:p-6"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="Client Name"
              value={form.name}
              onChange={(value) =>
                updateField("name", value)
              }
              placeholder="Client name"
            />

            <FormField
              label="Company"
              value={form.company}
              onChange={(value) =>
                updateField("company", value)
              }
              placeholder="Company name"
            />

            <FormField
              label="Email"
              type="email"
              value={form.email}
              onChange={(value) =>
                updateField("email", value)
              }
              placeholder="Email address"
            />

            <FormField
              label="Phone"
              value={form.phone}
              onChange={(value) =>
                updateField("phone", value)
              }
              placeholder="Phone number"
            />

            <SelectField
              label="Status"
              value={form.status}
              onChange={(value) =>
                updateField(
                  "status",
                  value as ClientStatus
                )
              }
              options={[
                "Active",
                "Inactive",
                "Pending",
              ]}
            />

            <SelectField
              label="Business Type"
              value={form.companyType}
              onChange={(value) =>
                updateField("companyType", value)
              }
              options={[
                "Startup",
                "Small Business",
                "Agency",
                "Professional Services",
                "E-commerce",
              ]}
            />

            <FormField
              label="Location"
              value={form.location}
              onChange={(value) =>
                updateField("location", value)
              }
              placeholder="City, Country"
            />

            <FormField
              label="Website"
              value={form.website}
              onChange={(value) =>
                updateField("website", value)
              }
              placeholder="example.com"
            />
          </div>

          <div className="rounded-xl border border-cyan-400/10 bg-cyan-400/[0.03] p-4">
            <p className="text-xs text-slate-500">
              Financial information is managed separately through
              invoices and payments.
            </p>

            <p className="mt-2 text-sm font-medium text-cyan-300">
              Outstanding:{" "}
              {formatCurrency(form.outstanding)}
            </p>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-white/8 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="h-10 rounded-xl border border-white/8 px-4 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 text-sm font-semibold text-slate-950 transition hover:brightness-110"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* DELETE CLIENT MODAL                                                       */
/* ========================================================================== */

function DeleteClientModal({
  client,
  onClose,
  onDelete,
}: {
  client: Client;
  onClose: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-red-400/15 bg-[#0b1020] p-6 shadow-2xl shadow-black/50">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-400/10">
          <Trash2 className="h-5 w-5 text-red-400" />
        </div>

        <h2 className="mt-5 text-lg font-semibold text-white">
          Delete client?
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Are you sure you want to delete{" "}
          <span className="font-medium text-slate-300">
            {client.name}
          </span>{" "}
          from the client workspace?
        </p>

        <div className="mt-4 rounded-xl border border-red-400/10 bg-red-400/[0.04] p-3">
          <p className="text-xs leading-5 text-red-300/80">
            This is currently demo data. When Supabase is
            connected, this action will permanently remove the
            client record from the database.
          </p>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-xl border border-white/8 px-4 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-red-500/90 px-4 text-sm font-semibold text-white transition hover:bg-red-500"
          >
            <Trash2 className="h-4 w-4" />
            Delete Client
          </button>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* SIMPLE ACTION MODAL                                                       */
/* ========================================================================== */

function SimpleActionModal({
  title,
  description,
  confirmLabel,
  onClose,
  onConfirm,
}: {
  title: string;
  description: string;
  confirmLabel: string;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0b1020] p-6 shadow-2xl shadow-black/50">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10">
          <Plus className="h-5 w-5 text-cyan-400" />
        </div>

        <h2 className="mt-5 text-lg font-semibold text-white">
          {title}
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          {description}
        </p>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-xl border border-white/8 px-4 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="h-10 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-4 text-sm font-semibold text-slate-950"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* FORM COMPONENTS                                                           */
/* ========================================================================== */

function FormField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium text-slate-400">
        {label}
      </span>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
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
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium text-slate-400">
        {label}
      </span>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="h-10 w-full rounded-xl border border-white/8 bg-[#060914] px-3 text-sm text-white outline-none transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

/* ========================================================================== */
/* SHARED UI                                                                 */
/* ========================================================================== */

function SectionHeader({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-white/8 px-5 py-4 sm:px-6">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
        {icon}
      </div>

      <div>
        <h2 className="text-sm font-semibold text-white">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-0.5 text-xs text-slate-600">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-3 py-4">
      <div className="mt-0.5 shrink-0 text-slate-600">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wide text-slate-600">
          {label}
        </p>

        <p
          className={`mt-1 truncate text-sm font-medium ${
            href
              ? "text-slate-300 transition hover:text-cyan-300"
              : "text-slate-300"
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );

  return href ? (
    <a href={href} className="block">
      {content}
    </a>
  ) : (
    content
  );
}

function ActivityRow({
  icon,
  color,
  title,
  description,
  date,
}: {
  icon: React.ReactNode;
  color: string;
  title: string;
  description: string;
  date: string;
}) {
  return (
    <div className="flex gap-3">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${color}`}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-slate-200">
            {title}
          </p>

          <span className="text-[11px] text-slate-600">
            {date}
          </span>
        </div>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

function FinancialStat({
  label,
  value,
  icon: Icon,
  color,
  bg,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
  color: string;
  bg: string;
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-[#0b1020] p-5">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg}`}
      >
        <Icon className={`h-5 w-5 ${color}`} />
      </div>

      <p className="mt-4 text-xs text-slate-600">
        {label}
      </p>

      <p className="mt-1 text-xl font-semibold text-white">
        {value}
      </p>
    </div>
  );
}

/* ========================================================================== */
/* STATUS BADGES                                                             */
/* ========================================================================== */

function StatusBadge({
  status,
}: {
  status: ClientStatus;
}) {
  const styles = {
    Active:
      "border-emerald-400/15 bg-emerald-400/10 text-emerald-400",
    Inactive:
      "border-slate-400/15 bg-slate-400/10 text-slate-400",
    Pending:
      "border-amber-400/15 bg-amber-400/10 text-amber-300",
  };

  const dots = {
    Active: "bg-emerald-400",
    Inactive: "bg-slate-500",
    Pending: "bg-amber-400",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${styles[status]}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${dots[status]}`}
      />

      {status}
    </span>
  );
}

function StatusBadgeProject({
  status,
}: {
  status: ClientProject["status"];
}) {
  const styles = {
    Planning:
      "border-violet-400/15 bg-violet-400/10 text-violet-300",
    "In Progress":
      "border-blue-400/15 bg-blue-400/10 text-blue-300",
    Active:
      "border-emerald-400/15 bg-emerald-400/10 text-emerald-400",
    Review:
      "border-cyan-400/15 bg-cyan-400/10 text-cyan-300",
    Completed:
      "border-emerald-400/15 bg-emerald-400/10 text-emerald-400",
    "On Hold":
      "border-amber-400/15 bg-amber-400/10 text-amber-300",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

/* ========================================================================== */
/* CLIENT NOT FOUND                                                          */
/* ========================================================================== */

function ClientNotFound() {
  return (
    <main className="flex min-h-[calc(100vh-72px)] w-full items-center justify-center bg-[#060914] px-5 py-10 text-white sm:px-8 xl:px-10">
      <div className="w-full rounded-2xl border border-white/8 bg-[#0b1020] p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-400/10">
          <Users className="h-6 w-6 text-red-400" />
        </div>

        <h1 className="mt-5 text-xl font-semibold">
          Client not found
        </h1>

        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
          The client record you're looking for does not exist in
          the current demo workspace.
        </p>

        <Link
          href="/admin/clients"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2.5 text-sm font-semibold text-slate-950"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Clients
        </Link>
      </div>
    </main>
  );
}

/* ========================================================================== */
/* DEMO PROJECTS                                                             */
/* ========================================================================== */

function getProjects(client: Client): ClientProject[] {
  const projectMap: Record<string, ClientProject[]> = {
    "client-001": [
      {
        id: "project-001",
        name: "Northstar Website",
        description:
          "Marketing website redesign and development",
        status: "In Progress",
        date: "Updated today",
      },
      {
        id: "project-002",
        name: "Lead Generation System",
        description:
          "Landing pages and lead capture workflow",
        status: "Active",
        date: "Updated 3 days ago",
      },
    ],

    "client-002": [
      {
        id: "project-003",
        name: "Consulting Website",
        description:
          "Professional services website",
        status: "Active",
        date: "Updated yesterday",
      },
    ],

    "client-003": [
      {
        id: "project-004",
        name: "Bloom Wellness Website",
        description:
          "Wellness brand website",
        status: "In Progress",
        date: "Updated 2 days ago",
      },
      {
        id: "project-005",
        name: "Booking System",
        description:
          "Online booking and lead management",
        status: "Active",
        date: "Updated 5 days ago",
      },
      {
        id: "project-006",
        name: "SEO Setup",
        description:
          "Technical and local SEO foundation",
        status: "Review",
        date: "Updated 1 week ago",
      },
    ],
  };

  return (
    projectMap[client.id] ?? [
      {
        id: `project-${client.id}-001`,
        name: `${client.company} Website`,
        description:
          "Website design and development project",
        status:
          client.status === "Pending"
            ? "Planning"
            : "Active",
        date: client.lastActivity,
      },
    ]
  );
}

/* ========================================================================== */
/* HELPERS                                                                   */
/* ========================================================================== */

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function formatCurrency(value: number) {
  return `$${value.toLocaleString("en-US")}`;
}