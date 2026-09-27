"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  DollarSign,
  Eye,
  Mail,
  Pencil,
  Phone,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  Users,
  X,
} from "lucide-react";

type ClientStatus = "Active" | "Inactive" | "Pending";

type Client = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: ClientStatus;
  projects: number;
  outstanding: number;
  lastActivity: string;
  companyType: string;
};

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [company, setCompany] = useState("All");

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [deletingClient, setDeletingClient] = useState<Client | null>(null);
  const [toast, setToast] = useState("");

  const loadClients = async () => {
    setError("");

    try {
      const response = await fetch("/api/admin/clients", {
        method: "GET",
        cache: "no-store",
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.message || "Unable to load clients.");
      }

      setClients(payload.clients ?? []);
    } catch (loadError) {
      console.error("CLIENTS LOAD ERROR:", loadError);
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Unable to load clients."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadClients();
  }, []);

  const filteredClients = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return clients.filter((client) => {
      const matchesSearch =
        normalizedSearch === "" ||
        client.name.toLowerCase().includes(normalizedSearch) ||
        client.company.toLowerCase().includes(normalizedSearch) ||
        client.email.toLowerCase().includes(normalizedSearch);

      const matchesStatus = status === "All" || client.status === status;
      const matchesCompany =
        company === "All" || client.companyType === company;

      return matchesSearch && matchesStatus && matchesCompany;
    });
  }, [clients, search, status, company]);

  const totalClients = clients.length;
  const activeClients = clients.filter(
    (client) => client.status === "Active"
  ).length;

  const newClients = clients.filter((client) =>
    ["Today", "Yesterday", "2 days ago", "3 days ago"].includes(
      client.lastActivity
    )
  ).length;

  const outstandingBalance = clients.reduce(
    (total, client) => total + client.outstanding,
    0
  );

  const showSuccess = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 3000);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadClients();
    setIsRefreshing(false);
    showSuccess("Client list refreshed.");
  };

  const handleAddClient = async (newClient: Client) => {
    try {
      const response = await fetch("/api/admin/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newClient.name,
          company: newClient.company,
          email: newClient.email,
          phone: newClient.phone,
          status: newClient.status,
          companyType: newClient.companyType,
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.message || "Unable to add client.");
      }

      setClients((current) => [payload.client, ...current]);
      setShowAddModal(false);
      showSuccess(`${payload.client.name} was added successfully.`);
    } catch (saveError) {
      console.error("CLIENT ADD ERROR:", saveError);
      showSuccess(
        saveError instanceof Error
          ? saveError.message
          : "Unable to add client."
      );
    }
  };

  const handleEditClient = async (updatedClient: Client) => {
    try {
      const response = await fetch("/api/admin/clients", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: updatedClient.id,
          name: updatedClient.name,
          company: updatedClient.company,
          email: updatedClient.email,
          phone: updatedClient.phone,
          status: updatedClient.status,
          companyType: updatedClient.companyType,
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.message || "Unable to update client.");
      }

      setClients((current) =>
        current.map((client) =>
          client.id === updatedClient.id ? payload.client : client
        )
      );
      setEditingClient(null);
      showSuccess(`${payload.client.name} was updated successfully.`);
    } catch (saveError) {
      console.error("CLIENT UPDATE ERROR:", saveError);
      showSuccess(
        saveError instanceof Error
          ? saveError.message
          : "Unable to update client."
      );
    }
  };

  const handleDeleteClient = async () => {
    if (!deletingClient) return;

    const deletedName = deletingClient.name;

    try {
      const response = await fetch("/api/admin/clients", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deletingClient.id }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.message || "Unable to delete client.");
      }

      setClients((current) =>
        current.filter((client) => client.id !== deletingClient.id)
      );
      setDeletingClient(null);
      showSuccess(`${deletedName} was deleted successfully.`);
    } catch (deleteError) {
      console.error("CLIENT DELETE ERROR:", deleteError);
      showSuccess(
        deleteError instanceof Error
          ? deleteError.message
          : "Unable to delete client."
      );
    }
  };

  return (
    <>
      <main className="w-full bg-[#060914] px-5 py-8 text-white sm:px-8 sm:py-10 xl:px-10">
        <div className="w-full space-y-6">

          {/* ============================================================ */}
          {/* HEADER                                                        */}
          {/* ============================================================ */}

          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10">
                  <Users className="h-5 w-5 text-cyan-400" />
                </div>

                <div>
                  <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    Clients
                  </h1>

                  <p className="mt-1 text-sm text-slate-500">
                    Manage your clients, relationships,
                    projects, and financial activity.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleRefresh}
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/8 bg-[#0b1020] px-4 text-sm font-medium text-slate-300 transition hover:border-cyan-400/20 hover:text-white"
              >
                <RefreshCw
                  className={`h-4 w-4 ${
                    isRefreshing
                      ? "animate-spin"
                      : ""
                  }`}
                />

                Refresh
              </button>

              <button
                type="button"
                onClick={() =>
                  setShowAddModal(true)
                }
                className="inline-flex h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-4 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/10 transition hover:brightness-110"
              >
                <Plus className="h-4 w-4" />
                Add Client
              </button>
            </div>
          </div>

          {/* ============================================================ */}
          {/* DEMO NOTICE                                                   */}
          {/* ============================================================ */}

          <div className="flex flex-col gap-3 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.04] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div>
              <p className="text-sm font-medium text-cyan-200">
                Client workspace
              </p>

              <p className="mt-0.5 text-xs text-slate-500">
                Client records are now connected to the production database.
              </p>
            </div>

            <span className="inline-flex w-fit rounded-full border border-cyan-400/15 bg-cyan-400/10 px-2.5 py-1 text-[11px] font-medium text-cyan-300">
              Supabase
            </span>
          </div>

          {/* ============================================================ */}
          {/* STATS                                                         */}
          {/* ============================================================ */}

          <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
            <ClientStat
              label="Total Clients"
              value={totalClients.toString()}
              icon={<Users className="h-5 w-5" />}
              color="text-cyan-400"
              bg="bg-cyan-400/10"
            />

            <ClientStat
              label="Active Clients"
              value={activeClients.toString()}
              icon={
                <CheckCircle2 className="h-5 w-5" />
              }
              color="text-emerald-400"
              bg="bg-emerald-400/10"
            />

            <ClientStat
              label="New Clients"
              value={newClients.toString()}
              icon={<Plus className="h-5 w-5" />}
              color="text-blue-400"
              bg="bg-blue-400/10"
            />

            <ClientStat
              label="Outstanding Balance"
              value={formatCurrency(
                outstandingBalance
              )}
              icon={
                <DollarSign className="h-5 w-5" />
              }
              color="text-amber-400"
              bg="bg-amber-400/10"
            />
          </div>

          {/* ============================================================ */}
          {/* FILTERS                                                       */}
          {/* ============================================================ */}

          <section className="rounded-2xl border border-white/8 bg-[#0b1020] p-4 sm:p-5">
            <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_180px_220px_auto]">

              {/* Search */}
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />

                <input
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search clients..."
                  className="h-10 w-full rounded-xl border border-white/8 bg-[#060914] pl-10 pr-3 text-sm text-white outline-none placeholder:text-slate-700 transition focus:border-cyan-400/30 focus:ring-2 focus:ring-cyan-400/10"
                />
              </div>

              {/* Status */}
              <select
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value)
                }
                className="h-10 rounded-xl border border-white/8 bg-[#060914] px-3 text-sm text-slate-300 outline-none focus:border-cyan-400/30"
              >
                <option value="All">
                  All Statuses
                </option>

                <option value="Active">
                  Active
                </option>

                <option value="Pending">
                  Pending
                </option>

                <option value="Inactive">
                  Inactive
                </option>
              </select>

              {/* Company */}
              <select
                value={company}
                onChange={(event) =>
                  setCompany(event.target.value)
                }
                className="h-10 rounded-xl border border-white/8 bg-[#060914] px-3 text-sm text-slate-300 outline-none focus:border-cyan-400/30"
              >
                <option value="All">
                  All Business Types
                </option>

                <option value="Agency">
                  Agency
                </option>

                <option value="Professional Services">
                  Professional Services
                </option>

                <option value="Small Business">
                  Small Business
                </option>

                <option value="E-commerce">
                  E-commerce
                </option>

                <option value="Startup">
                  Startup
                </option>
              </select>

              {/* Clear */}
              {(search ||
                status !== "All" ||
                company !== "All") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setStatus("All");
                    setCompany("All");
                  }}
                  className="h-10 rounded-xl border border-white/8 px-4 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </section>

          {error && (
            <div className="rounded-2xl border border-red-400/15 bg-red-400/[0.04] px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {/* ============================================================ */}
          {/* RESULT SUMMARY                                                */}
          {/* ============================================================ */}

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-400">
              Showing{" "}
              <span className="font-semibold text-white">
                {isLoading ? "—" : filteredClients.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-white">
                {isLoading ? "—" : clients.length}
              </span>{" "}
              clients
            </p>

            <span className="text-xs text-slate-600">
              Client records
            </span>
          </div>

          {/* ============================================================ */}
          {/* DESKTOP TABLE                                                 */}
          {/* ============================================================ */}

          <section className="hidden overflow-hidden rounded-2xl border border-white/8 bg-[#0b1020] lg:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px]">
                <thead>
                  <tr className="border-b border-white/8 bg-white/[0.015] text-left">
                    <th className="px-5 py-4 text-xs font-medium uppercase tracking-wider text-slate-600">
                      Client
                    </th>

                    <th className="px-5 py-4 text-xs font-medium uppercase tracking-wider text-slate-600">
                      Contact
                    </th>

                    <th className="px-5 py-4 text-xs font-medium uppercase tracking-wider text-slate-600">
                      Status
                    </th>

                    <th className="px-5 py-4 text-xs font-medium uppercase tracking-wider text-slate-600">
                      Projects
                    </th>

                    <th className="px-5 py-4 text-xs font-medium uppercase tracking-wider text-slate-600">
                      Outstanding
                    </th>

                    <th className="px-5 py-4 text-xs font-medium uppercase tracking-wider text-slate-600">
                      Activity
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-medium uppercase tracking-wider text-slate-600">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/6">
                  {isLoading ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-14 text-center text-sm text-slate-500">
                        Loading clients...
                      </td>
                    </tr>
                  ) : (
                    filteredClients.map((client) => (
                      <ClientTableRow
                        key={client.id}
                        client={client}
                        onEdit={() => setEditingClient(client)}
                        onDelete={() => setDeletingClient(client)}
                      />
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {filteredClients.length === 0 && (
              <EmptyState />
            )}
          </section>

          {/* ============================================================ */}
          {/* MOBILE CARDS                                                  */}
          {/* ============================================================ */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
            {isLoading ? (
              <div className="sm:col-span-2 rounded-2xl border border-white/8 bg-[#0b1020] px-6 py-14 text-center text-sm text-slate-500">
                Loading clients...
              </div>
            ) : (
              filteredClients.map((client) => (
                <ClientMobileCard
                  key={client.id}
                  client={client}
                  onEdit={() => setEditingClient(client)}
                  onDelete={() => setDeletingClient(client)}
                />
              ))
            )}

            {filteredClients.length === 0 && (
              <div className="sm:col-span-2">
                <EmptyState />
              </div>
            )}
          </div>

          {/* ============================================================ */}
          {/* BOTTOM INFO                                                   */}
          {/* ============================================================ */}

          <div className="flex flex-col gap-4 rounded-2xl border border-white/8 bg-[#0b1020] p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-white">
                Client relationships
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Open a client profile to view projects,
                invoices, payments, messages, and activity.
              </p>
            </div>

            <Link
              href="/admin/projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition hover:text-cyan-200"
            >
              View Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>

      {/* ================================================================ */}
      {/* ADD CLIENT MODAL                                                 */}
      {/* ================================================================ */}

      {showAddModal && (
        <ClientFormModal
          title="Add Client"
          submitLabel="Add Client"
          onClose={() =>
            setShowAddModal(false)
          }
          onSubmit={handleAddClient}
        />
      )}

      {/* ================================================================ */}
      {/* EDIT CLIENT MODAL                                                */}
      {/* ================================================================ */}

      {editingClient && (
        <ClientFormModal
          title="Edit Client"
          submitLabel="Save Changes"
          client={editingClient}
          onClose={() =>
            setEditingClient(null)
          }
          onSubmit={handleEditClient}
        />
      )}

      {/* ================================================================ */}
      {/* DELETE MODAL                                                     */}
      {/* ================================================================ */}

      {deletingClient && (
        <DeleteClientModal
          client={deletingClient}
          onClose={() =>
            setDeletingClient(null)
          }
          onDelete={handleDeleteClient}
        />
      )}

      {/* ================================================================ */}
      {/* TOAST                                                            */}
      {/* ================================================================ */}

      {toast && (
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
                {toast}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setToast("")}
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
/* CLIENT TABLE ROW                                                           */
/* ========================================================================== */

function ClientTableRow({
  client,
  onEdit,
  onDelete,
}: {
  client: Client;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <tr className="group transition hover:bg-white/[0.018]">
      {/* Client */}
      <td className="px-5 py-5">
        <div className="flex items-center gap-3">
          <ClientAvatar name={client.name} />

          <div className="min-w-0">
            <Link
              href={`/admin/clients/${client.id}`}
              className="block truncate text-sm font-semibold text-white transition hover:text-cyan-300"
            >
              {client.name}
            </Link>

            <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-slate-600">
              <Building2 className="h-3.5 w-3.5" />
              {client.company}
            </p>
          </div>
        </div>
      </td>

      {/* Contact */}
      <td className="px-5 py-5">
        <div className="space-y-1">
          <a
            href={`mailto:${client.email}`}
            className="flex items-center gap-1.5 text-xs text-slate-400 transition hover:text-cyan-300"
          >
            <Mail className="h-3.5 w-3.5" />
            {client.email}
          </a>

          <a
            href={`tel:${client.phone}`}
            className="flex items-center gap-1.5 text-xs text-slate-600 transition hover:text-slate-300"
          >
            <Phone className="h-3.5 w-3.5" />
            {client.phone}
          </a>
        </div>
      </td>

      {/* Status */}
      <td className="px-5 py-5">
        <StatusBadge status={client.status} />
      </td>

      {/* Projects */}
      <td className="px-5 py-5">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-white">
            {client.projects}
          </span>

          <span className="text-xs text-slate-600">
            {client.projects === 1
              ? "project"
              : "projects"}
          </span>
        </div>
      </td>

      {/* Outstanding */}
      <td className="px-5 py-5">
        <span
          className={`text-sm font-semibold ${
            client.outstanding > 0
              ? "text-amber-300"
              : "text-emerald-400"
          }`}
        >
          {formatCurrency(client.outstanding)}
        </span>
      </td>

      {/* Activity */}
      <td className="px-5 py-5">
        <span className="text-xs text-slate-500">
          {client.lastActivity}
        </span>
      </td>

      {/* Actions */}
      <td className="px-5 py-5">
        <div className="flex justify-end gap-2">
          <Link
            href={`/admin/clients/${client.id}`}
            title="View Client"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 text-slate-500 transition hover:border-cyan-400/20 hover:bg-cyan-400/5 hover:text-cyan-300"
          >
            <Eye className="h-4 w-4" />
          </Link>

          <button
            type="button"
            title="Edit Client"
            onClick={onEdit}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 text-slate-500 transition hover:border-blue-400/20 hover:bg-blue-400/5 hover:text-blue-300"
          >
            <Pencil className="h-4 w-4" />
          </button>

          <button
            type="button"
            title="Delete Client"
            onClick={onDelete}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 text-slate-500 transition hover:border-red-400/20 hover:bg-red-400/5 hover:text-red-300"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}

/* ========================================================================== */
/* MOBILE CARD                                                                */
/* ========================================================================== */

function ClientMobileCard({
  client,
  onEdit,
  onDelete,
}: {
  client: Client;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-[#0b1020] p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <ClientAvatar name={client.name} />

          <div className="min-w-0">
            <Link
              href={`/admin/clients/${client.id}`}
              className="block truncate text-sm font-semibold text-white hover:text-cyan-300"
            >
              {client.name}
            </Link>

            <p className="mt-1 truncate text-xs text-slate-600">
              {client.company}
            </p>
          </div>
        </div>

        <StatusBadge status={client.status} />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-white/6 bg-[#060914] p-3">
          <p className="text-[11px] text-slate-600">
            Projects
          </p>

          <p className="mt-1 text-sm font-semibold text-white">
            {client.projects}
          </p>
        </div>

        <div className="rounded-xl border border-white/6 bg-[#060914] p-3">
          <p className="text-[11px] text-slate-600">
            Outstanding
          </p>

          <p
            className={`mt-1 text-sm font-semibold ${
              client.outstanding > 0
                ? "text-amber-300"
                : "text-emerald-400"
            }`}
          >
            {formatCurrency(client.outstanding)}
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <a
          href={`mailto:${client.email}`}
          className="flex items-center gap-2 truncate text-xs text-slate-500 hover:text-cyan-300"
        >
          <Mail className="h-3.5 w-3.5 shrink-0" />
          {client.email}
        </a>

        <a
          href={`tel:${client.phone}`}
          className="flex items-center gap-2 text-xs text-slate-600 hover:text-slate-300"
        >
          <Phone className="h-3.5 w-3.5 shrink-0" />
          {client.phone}
        </a>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        <Link
          href={`/admin/clients/${client.id}`}
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-white/8 text-xs font-medium text-slate-400 transition hover:border-cyan-400/20 hover:text-cyan-300"
        >
          <Eye className="h-3.5 w-3.5" />
          View
        </Link>

        <button
          type="button"
          onClick={onEdit}
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-white/8 text-xs font-medium text-slate-400 transition hover:border-blue-400/20 hover:text-blue-300"
        >
          <Pencil className="h-3.5 w-3.5" />
          Edit
        </button>

        <button
          type="button"
          onClick={onDelete}
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-white/8 text-xs font-medium text-slate-400 transition hover:border-red-400/20 hover:text-red-300"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Delete
        </button>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* CLIENT FORM MODAL                                                          */
/* ========================================================================== */

function ClientFormModal({
  title,
  submitLabel,
  client,
  onClose,
  onSubmit,
}: {
  title: string;
  submitLabel: string;
  client?: Client;
  onClose: () => void;
  onSubmit: (client: Client) => void;
}) {
  const [form, setForm] = useState<Client>(
    client ?? {
      id: "",
      name: "",
      company: "",
      email: "",
      phone: "",
      status: "Active",
      projects: 0,
      outstanding: 0,
      lastActivity: "Today",
      companyType: "Small Business",
    }
  );

  const updateField = <K extends keyof Client>(
    field: K,
    value: Client[K]
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.company.trim() ||
      !form.email.trim()
    ) {
      return;
    }

    onSubmit({
      ...form,
      name: form.name.trim(),
      company: form.company.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#0b1020] shadow-2xl shadow-black/50">

        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/8 bg-[#0b1020] px-5 py-4 sm:px-6">
          <div>
            <h2 className="text-lg font-semibold text-white">
              {title}
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              {client
                ? "Update the client's information."
                : "Create a new client record."}
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
          onSubmit={handleSubmit}
          className="space-y-5 p-5 sm:p-6"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            <FormField
              label="Client Name"
              value={form.name}
              onChange={(value) =>
                updateField("name", value)
              }
              placeholder="e.g. John Smith"
              required
            />

            <FormField
              label="Company"
              value={form.company}
              onChange={(value) =>
                updateField("company", value)
              }
              placeholder="e.g. Smith Digital"
              required
            />

            <FormField
              label="Email"
              type="email"
              value={form.email}
              onChange={(value) =>
                updateField("email", value)
              }
              placeholder="client@example.com"
              required
            />

            <FormField
              label="Phone"
              value={form.phone}
              onChange={(value) =>
                updateField("phone", value)
              }
              placeholder="+1 (555) 000-0000"
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
                "Pending",
                "Inactive",
              ]}
            />

            <SelectField
              label="Business Type"
              value={form.companyType}
              onChange={(value) =>
                updateField(
                  "companyType",
                  value
                )
              }
              options={[
                "Agency",
                "Professional Services",
                "Small Business",
                "E-commerce",
                "Startup",
              ]}
            />

            <FormField
              label="Projects"
              type="number"
              value={String(form.projects)}
              onChange={(value) =>
                updateField(
                  "projects",
                  Math.max(
                    0,
                    Number(value) || 0
                  )
                )
              }
              placeholder="0"
            />

            <FormField
              label="Outstanding Balance"
              type="number"
              value={String(form.outstanding)}
              onChange={(value) =>
                updateField(
                  "outstanding",
                  Math.max(
                    0,
                    Number(value) || 0
                  )
                )
              }
              placeholder="0"
            />
          </div>

          <div className="rounded-xl border border-cyan-400/10 bg-cyan-400/[0.03] p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-cyan-400" />

              <p className="text-xs font-medium text-cyan-300">
                Financial Summary
              </p>
            </div>

            <p className="mt-2 text-sm text-slate-400">
              Outstanding balance:
              <span className="ml-2 font-semibold text-amber-300">
                {formatCurrency(
                  form.outstanding
                )}
              </span>
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
              <Pencil className="h-4 w-4" />
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* DELETE MODAL                                                               */
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
            This will permanently remove the client record from
            the workspace database. Related project and financial
            records should be handled separately.
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
/* STAT CARD                                                                  */
/* ========================================================================== */

function ClientStat({
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
    <div className="rounded-2xl border border-white/8 bg-[#0b1020] p-5 transition hover:border-cyan-400/10">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg}`}
      >
        <span className={color}>
          {icon}
        </span>
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
/* AVATAR                                                                     */
/* ========================================================================== */

function ClientAvatar({
  name,
}: {
  name: string;
}) {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/15 to-blue-500/15 text-xs font-semibold text-cyan-300 ring-1 ring-white/5">
      {getInitials(name)}
    </div>
  );
}

/* ========================================================================== */
/* STATUS                                                                     */
/* ========================================================================== */

function StatusBadge({
  status,
}: {
  status: ClientStatus;
}) {
  const styles = {
    Active:
      "border-emerald-400/15 bg-emerald-400/10 text-emerald-400",
    Pending:
      "border-amber-400/15 bg-amber-400/10 text-amber-300",
    Inactive:
      "border-slate-400/15 bg-slate-400/10 text-slate-400",
  };

  const dots = {
    Active: "bg-emerald-400",
    Pending: "bg-amber-400",
    Inactive: "bg-slate-500",
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

/* ========================================================================== */
/* FORM FIELD                                                                 */
/* ========================================================================== */

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
      <span className="mb-2 block text-xs font-medium text-slate-400">
        {label}
      </span>

      <input
        type={type}
        value={value}
        required={required}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="h-10 w-full rounded-xl border border-white/8 bg-[#060914] px-3 text-sm text-white outline-none placeholder:text-slate-700 transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
      />
    </label>
  );
}

/* ========================================================================== */
/* SELECT FIELD                                                               */
/* ========================================================================== */

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
        className="h-10 w-full rounded-xl border border-white/8 bg-[#060914] px-3 text-sm text-white outline-none transition focus:border-cyan-400/40"
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

/* ========================================================================== */
/* EMPTY STATE                                                                */
/* ========================================================================== */

function EmptyState() {
  return (
    <div className="px-6 py-14 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10">
        <Users className="h-5 w-5 text-cyan-400" />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-white">
        No matching clients
      </h3>

      <p className="mt-2 text-xs text-slate-500">
        Try changing your search or filters.
      </p>
    </div>
  );
}

/* ========================================================================== */
/* HELPERS                                                                    */
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