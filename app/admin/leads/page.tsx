"use client";

import {
  ArrowLeft,
  CalendarDays,
  Globe,
  Mail,
  MessageSquare,
  Plus,
  Search,
  User,
  Users,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type LeadStatus = "New" | "Contacted" | "Qualified" | "Closed";

type Lead = {
  id: string;
  name: string;
  email: string;
  business: string | null;
  website_type: string | null;
  message: string | null;
  status: LeadStatus;
  source: string;
  created_at: string;
};

type NewLeadForm = {
  name: string;
  email: string;
  business: string;
  website_type: string;
  message: string;
  source: string;
};

const supabase = createClient();

const statusStyles: Record<LeadStatus, string> = {
  New: "border-white/10 bg-white/5 text-white/70",
  Contacted: "border-blue-500/20 bg-blue-500/10 text-blue-300",
  Qualified:
    "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
  Closed: "border-white/10 bg-white/5 text-white/40",
};

const emptyForm: NewLeadForm = {
  name: "",
  email: "",
  business: "",
  website_type: "Business Website",
  message: "",
  source: "Manual",
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | LeadStatus>(
    "All"
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Add Lead state
  const [showAddLead, setShowAddLead] = useState(false);
  const [newLead, setNewLead] = useState<NewLeadForm>(emptyForm);
  const [creatingLead, setCreatingLead] = useState(false);
  const [addLeadError, setAddLeadError] = useState("");

  useEffect(() => {
    const loadLeads = async () => {
      setLoading(true);
      setError("");

      const { data, error: fetchError } = await supabase
        .from("leads")
        .select(
          "id, name, email, business, website_type, message, status, source, created_at"
        )
        .order("created_at", { ascending: false });

      if (fetchError) {
        console.error("Failed to load leads:", fetchError);
        setError("Unable to load leads right now.");
        setLoading(false);
        return;
      }

      setLeads((data as Lead[]) ?? []);
      setLoading(false);
    };

    loadLeads();
  }, []);

  const handleStatusChange = async (
    leadId: string,
    newStatus: LeadStatus
  ) => {
    setUpdatingId(leadId);
    setError("");

    const { error: updateError } = await supabase
      .from("leads")
      .update({
        status: newStatus,
        updated_at: new Date().toISOString(),
      })
      .eq("id", leadId);

    if (updateError) {
      console.error("Failed to update lead status:", updateError);

      setError(
        "Unable to update the lead status. Please try again."
      );

      setUpdatingId(null);
      return;
    }

    setLeads((currentLeads) =>
      currentLeads.map((lead) =>
        lead.id === leadId
          ? {
              ...lead,
              status: newStatus,
            }
          : lead
      )
    );

    setSelectedLead((currentLead) =>
      currentLead && currentLead.id === leadId
        ? {
            ...currentLead,
            status: newStatus,
          }
        : currentLead
    );

    setUpdatingId(null);
  };

  const handleCreateLead = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!newLead.name.trim() || !newLead.email.trim()) {
      setAddLeadError("Name and email are required.");
      return;
    }

    setCreatingLead(true);
    setAddLeadError("");
    setError("");

    const { data, error: insertError } = await supabase
      .from("leads")
      .insert({
        name: newLead.name.trim(),
        email: newLead.email.trim(),
        business: newLead.business.trim() || null,
        website_type: newLead.website_type.trim() || null,
        message: newLead.message.trim() || null,
        status: "New",
        source: newLead.source.trim() || "Manual",
      })
      .select(
        "id, name, email, business, website_type, message, status, source, created_at"
      )
      .single();

    if (insertError) {
      console.error("Failed to create lead:", insertError);

      setAddLeadError(
        insertError.message ||
          "Unable to create the lead. Please try again."
      );

      setCreatingLead(false);
      return;
    }

    if (data) {
      setLeads((currentLeads) => [data as Lead, ...currentLeads]);
    }

    setNewLead(emptyForm);
    setShowAddLead(false);
    setCreatingLead(false);
  };

  const filteredLeads = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return leads.filter((lead) => {
      const matchesSearch =
        !searchValue ||
        lead.name.toLowerCase().includes(searchValue) ||
        lead.email.toLowerCase().includes(searchValue) ||
        (lead.business ?? "").toLowerCase().includes(searchValue) ||
        (lead.website_type ?? "")
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "All" || lead.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [leads, search, statusFilter]);

  const totalLeads = leads.length;

  const newLeads = leads.filter(
    (lead) => lead.status === "New"
  ).length;

  const qualifiedLeads = leads.filter(
    (lead) => lead.status === "Qualified"
  ).length;

  const closedLeads = leads.filter(
    (lead) => lead.status === "Closed"
  ).length;

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date));
  };

  const formatShortDate = (date: string) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date));
  };

  const updateFormField = (
    field: keyof NewLeadForm,
    value: string
  ) => {
    setNewLead((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const closeAddLeadModal = () => {
    if (creatingLead) return;

    setShowAddLead(false);
    setAddLeadError("");
    setNewLead(emptyForm);
  };

  return (
    <>
      <main className="min-h-screen bg-[#070707] px-5 py-8 text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                  <Users size={19} className="text-white/70" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/35">
                    Vertex Studio
                  </p>

                  <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                    Leads
                  </h1>
                </div>
              </div>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/40">
                Manage website inquiries, prospects, and potential
                clients from one place.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setAddLeadError("");
                setNewLead(emptyForm);
                setShowAddLead(true);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              <Plus size={17} />
              Add Lead
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-300">
              {error}
            </div>
          )}

          {/* Summary */}
          <section className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Total Leads", totalLeads],
              ["New", newLeads],
              ["Qualified", qualifiedLeads],
              ["Closed", closedLeads],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/[0.025] p-5"
              >
                <p className="text-sm text-white/40">{label}</p>

                <p className="mt-2 text-3xl font-semibold tracking-tight">
                  {value}
                </p>
              </div>
            ))}
          </section>

          {/* Lead Management */}
          <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]">
            {/* Toolbar */}
            <div className="flex flex-col gap-4 border-b border-white/10 p-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative w-full max-w-md">
                <Search
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                />

                <input
                  type="search"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search leads..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-white/20"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target.value as "All" | LeadStatus
                  )
                }
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 outline-none"
              >
                <option value="All" className="bg-[#111]">
                  All statuses
                </option>

                <option value="New" className="bg-[#111]">
                  New
                </option>

                <option value="Contacted" className="bg-[#111]">
                  Contacted
                </option>

                <option value="Qualified" className="bg-[#111]">
                  Qualified
                </option>

                <option value="Closed" className="bg-[#111]">
                  Closed
                </option>
              </select>
            </div>

            {/* Loading */}
            {loading ? (
              <div className="flex min-h-[360px] flex-col items-center justify-center px-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
                  <Users
                    size={26}
                    className="animate-pulse text-white/25"
                  />
                </div>

                <h2 className="mt-6 text-lg font-semibold">
                  Loading leads...
                </h2>

                <p className="mt-2 text-sm text-white/35">
                  Connecting to your Vertex Studio CRM.
                </p>
              </div>
            ) : filteredLeads.length > 0 ? (
              /* Table */
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]">
                  <thead>
                    <tr className="border-b border-white/10 text-left text-xs text-white/30">
                      <th className="px-6 py-4 font-medium">
                        Lead
                      </th>

                      <th className="px-6 py-4 font-medium">
                        Business
                      </th>

                      <th className="px-6 py-4 font-medium">
                        Website Type
                      </th>

                      <th className="px-6 py-4 font-medium">
                        Status
                      </th>

                      <th className="px-6 py-4 font-medium">
                        Date
                      </th>

                      <th className="px-6 py-4 font-medium">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredLeads.map((lead) => (
                      <tr
                        key={lead.id}
                        className="border-b border-white/5 last:border-0"
                      >
                        <td className="px-6 py-5">
                          <div>
                            <p className="text-sm font-medium">
                              {lead.name}
                            </p>

                            <div className="mt-1 flex items-center gap-1.5 text-xs text-white/35">
                              <Mail size={13} />
                              {lead.email}
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-5 text-sm text-white/50">
                          {lead.business || "—"}
                        </td>

                        <td className="px-6 py-5 text-sm text-white/50">
                          {lead.website_type || "—"}
                        </td>

                        <td className="px-6 py-5">
                          <select
                            value={lead.status}
                            disabled={updatingId === lead.id}
                            onChange={(event) =>
                              handleStatusChange(
                                lead.id,
                                event.target.value as LeadStatus
                              )
                            }
                            className={`rounded-full border px-3 py-1.5 text-xs outline-none transition ${
                              statusStyles[lead.status]
                            } ${
                              updatingId === lead.id
                                ? "cursor-wait opacity-50"
                                : "cursor-pointer"
                            }`}
                          >
                            <option
                              value="New"
                              className="bg-[#111]"
                            >
                              New
                            </option>

                            <option
                              value="Contacted"
                              className="bg-[#111]"
                            >
                              Contacted
                            </option>

                            <option
                              value="Qualified"
                              className="bg-[#111]"
                            >
                              Qualified
                            </option>

                            <option
                              value="Closed"
                              className="bg-[#111]"
                            >
                              Closed
                            </option>
                          </select>
                        </td>

                        <td className="px-6 py-5 text-sm text-white/35">
                          {formatShortDate(lead.created_at)}
                        </td>

                        <td className="px-6 py-5">
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedLead(lead)
                            }
                            className="text-xs text-white/45 transition hover:text-white"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              /* Empty State */
              <div className="flex min-h-[360px] flex-col items-center justify-center px-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
                  <Users size={26} className="text-white/25" />
                </div>

                <h2 className="mt-6 text-lg font-semibold">
                  No leads found
                </h2>

                <p className="mt-2 max-w-md text-sm leading-6 text-white/35">
                  {search || statusFilter !== "All"
                    ? "Try adjusting your search or status filter."
                    : "When visitors submit your website contact form, their information will appear here."}
                </p>

                {!search && statusFilter === "All" && (
                  <button
                    type="button"
                    onClick={() => {
                      setAddLeadError("");
                      setNewLead(emptyForm);
                      setShowAddLead(true);
                    }}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-white/60 transition hover:bg-white/5 hover:text-white"
                  >
                    <Plus size={16} />
                    Add your first lead
                  </button>
                )}
              </div>
            )}
          </section>

          {/* Footer Navigation */}
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a
              href="/admin"
              className="inline-flex items-center gap-2 text-sm text-white/40 transition hover:text-white"
            >
              <ArrowLeft size={16} />
              Dashboard
            </a>

            <a
              href="/admin/analytics"
              className="text-sm text-white/40 transition hover:text-white"
            >
              Analytics →
            </a>
          </div>
        </div>
      </main>

      {/* =====================================================
          ADD LEAD MODAL
      ===================================================== */}
      {showAddLead && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget &&
              !creatingLead
            ) {
              closeAddLeadModal();
            }
          }}
        >
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#101010] shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/10 p-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/30">
                  New Lead
                </p>

                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  Add Lead
                </h2>

                <p className="mt-1 text-sm text-white/40">
                  Add a prospect or client directly to your CRM.
                </p>
              </div>

              <button
                type="button"
                onClick={closeAddLeadModal}
                disabled={creatingLead}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-white/40 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Close add lead form"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCreateLead}>
              <div className="space-y-5 p-6">
                {addLeadError && (
                  <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    {addLeadError}
                  </div>
                )}

                {/* Name + Email */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="lead-name"
                      className="mb-2 block text-sm font-medium text-white/70"
                    >
                      Name <span className="text-red-400">*</span>
                    </label>

                    <input
                      id="lead-name"
                      type="text"
                      value={newLead.name}
                      onChange={(event) =>
                        updateFormField(
                          "name",
                          event.target.value
                        )
                      }
                      placeholder="John Smith"
                      required
                      disabled={creatingLead}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-white/25 disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lead-email"
                      className="mb-2 block text-sm font-medium text-white/70"
                    >
                      Email <span className="text-red-400">*</span>
                    </label>

                    <input
                      id="lead-email"
                      type="email"
                      value={newLead.email}
                      onChange={(event) =>
                        updateFormField(
                          "email",
                          event.target.value
                        )
                      }
                      placeholder="client@example.com"
                      required
                      disabled={creatingLead}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-white/25 disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Business + Website Type */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="lead-business"
                      className="mb-2 block text-sm font-medium text-white/70"
                    >
                      Business
                    </label>

                    <input
                      id="lead-business"
                      type="text"
                      value={newLead.business}
                      onChange={(event) =>
                        updateFormField(
                          "business",
                          event.target.value
                        )
                      }
                      placeholder="Acme Inc."
                      disabled={creatingLead}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-white/25 disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lead-website-type"
                      className="mb-2 block text-sm font-medium text-white/70"
                    >
                      Website Type
                    </label>

                    <select
                      id="lead-website-type"
                      value={newLead.website_type}
                      onChange={(event) =>
                        updateFormField(
                          "website_type",
                          event.target.value
                        )
                      }
                      disabled={creatingLead}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-white/25 disabled:opacity-50"
                    >
                      <option
                        value="Business Website"
                        className="bg-[#111]"
                      >
                        Business Website
                      </option>

                      <option
                        value="E-Commerce Website"
                        className="bg-[#111]"
                      >
                        E-Commerce Website
                      </option>

                      <option
                        value="Landing Page"
                        className="bg-[#111]"
                      >
                        Landing Page
                      </option>

                      <option
                        value="Portfolio Website"
                        className="bg-[#111]"
                      >
                        Portfolio Website
                      </option>

                      <option
                        value="Web Application"
                        className="bg-[#111]"
                      >
                        Web Application
                      </option>

                      <option
                        value="Business System"
                        className="bg-[#111]"
                      >
                        Business System
                      </option>

                      <option
                        value="Other"
                        className="bg-[#111]"
                      >
                        Other
                      </option>
                    </select>
                  </div>
                </div>

                {/* Source */}
                <div>
                  <label
                    htmlFor="lead-source"
                    className="mb-2 block text-sm font-medium text-white/70"
                  >
                    Lead Source
                  </label>

                  <select
                    id="lead-source"
                    value={newLead.source}
                    onChange={(event) =>
                      updateFormField(
                        "source",
                        event.target.value
                      )
                    }
                    disabled={creatingLead}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-white/25 disabled:opacity-50"
                  >
                    <option value="Manual" className="bg-[#111]">
                      Manual
                    </option>

                    <option value="Website" className="bg-[#111]">
                      Website
                    </option>

                    <option
                      value="Facebook"
                      className="bg-[#111]"
                    >
                      Facebook
                    </option>

                    <option
                      value="Instagram"
                      className="bg-[#111]"
                    >
                      Instagram
                    </option>

                    <option
                      value="LinkedIn"
                      className="bg-[#111]"
                    >
                      LinkedIn
                    </option>

                    <option
                      value="Referral"
                      className="bg-[#111]"
                    >
                      Referral
                    </option>

                    <option
                      value="Cold Outreach"
                      className="bg-[#111]"
                    >
                      Cold Outreach
                    </option>

                    <option
                      value="Other"
                      className="bg-[#111]"
                    >
                      Other
                    </option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="lead-message"
                    className="mb-2 block text-sm font-medium text-white/70"
                  >
                    Message / Notes
                  </label>

                  <textarea
                    id="lead-message"
                    value={newLead.message}
                    onChange={(event) =>
                      updateFormField(
                        "message",
                        event.target.value
                      )
                    }
                    placeholder="Add project details, notes, requirements, or anything else about this lead..."
                    rows={5}
                    disabled={creatingLead}
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-white/25 focus:border-white/25 disabled:opacity-50"
                  />
                </div>

                {/* Status Preview */}
                <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
                  <p className="text-xs uppercase tracking-[0.15em] text-white/30">
                    Initial Status
                  </p>

                  <div className="mt-3 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70">
                    New
                  </div>

                  <p className="mt-2 text-xs text-white/30">
                    New leads can be moved through the CRM pipeline
                    after creation.
                  </p>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col gap-3 border-t border-white/10 p-6 sm:flex-row">
                <button
                  type="submit"
                  disabled={creatingLead}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {creatingLead ? (
                    "Creating Lead..."
                  ) : (
                    <>
                      <Plus size={16} />
                      Create Lead
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={closeAddLeadModal}
                  disabled={creatingLead}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-white/60 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================
          LEAD DETAILS MODAL
      ===================================================== */}
      {selectedLead && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedLead(null);
            }
          }}
        >
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#101010] shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/10 p-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/30">
                  Lead Details
                </p>

                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  {selectedLead.name}
                </h2>

                <a
                  href={`mailto:${selectedLead.email}`}
                  className="mt-1 inline-flex items-center gap-2 text-sm text-white/40 transition hover:text-white"
                >
                  <Mail size={14} />
                  {selectedLead.email}
                </a>
              </div>

              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-white/40 transition hover:bg-white/5 hover:text-white"
                aria-label="Close lead details"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Status */}
              <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-white/30">
                      Lead Status
                    </p>

                    <p className="mt-1 text-sm text-white/50">
                      Update the current stage of this prospect.
                    </p>
                  </div>

                  <select
                    value={selectedLead.status}
                    disabled={updatingId === selectedLead.id}
                    onChange={(event) =>
                      handleStatusChange(
                        selectedLead.id,
                        event.target.value as LeadStatus
                      )
                    }
                    className={`rounded-full border px-4 py-2 text-sm outline-none ${
                      statusStyles[selectedLead.status]
                    }`}
                  >
                    <option
                      value="New"
                      className="bg-[#111]"
                    >
                      New
                    </option>

                    <option
                      value="Contacted"
                      className="bg-[#111]"
                    >
                      Contacted
                    </option>

                    <option
                      value="Qualified"
                      className="bg-[#111]"
                    >
                      Qualified
                    </option>

                    <option
                      value="Closed"
                      className="bg-[#111]"
                    >
                      Closed
                    </option>
                  </select>
                </div>
              </div>

              {/* Information Grid */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                  <div className="flex items-center gap-2 text-white/35">
                    <User size={16} />
                    <p className="text-xs uppercase tracking-[0.12em]">
                      Contact
                    </p>
                  </div>

                  <p className="mt-3 text-sm font-medium">
                    {selectedLead.name}
                  </p>

                  <a
                    href={`mailto:${selectedLead.email}`}
                    className="mt-1 block text-sm text-white/45 hover:text-white"
                  >
                    {selectedLead.email}
                  </a>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                  <div className="flex items-center gap-2 text-white/35">
                    <Globe size={16} />
                    <p className="text-xs uppercase tracking-[0.12em]">
                      Business
                    </p>
                  </div>

                  <p className="mt-3 text-sm font-medium">
                    {selectedLead.business || "Not provided"}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                  <div className="flex items-center gap-2 text-white/35">
                    <Globe size={16} />
                    <p className="text-xs uppercase tracking-[0.12em]">
                      Website Type
                    </p>
                  </div>

                  <p className="mt-3 text-sm font-medium">
                    {selectedLead.website_type || "Not provided"}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                  <div className="flex items-center gap-2 text-white/35">
                    <CalendarDays size={16} />
                    <p className="text-xs uppercase tracking-[0.12em]">
                      Submitted
                    </p>
                  </div>

                  <p className="mt-3 text-sm font-medium">
                    {formatDate(selectedLead.created_at)}
                  </p>
                </div>
              </div>

              {/* Message */}
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                <div className="flex items-center gap-2 text-white/35">
                  <MessageSquare size={16} />
                  <p className="text-xs uppercase tracking-[0.12em]">
                    Project Message
                  </p>
                </div>

                <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-white/65">
                  {selectedLead.message || "No message provided."}
                </p>
              </div>

              {/* Source */}
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                <p className="text-xs uppercase tracking-[0.12em] text-white/30">
                  Lead Source
                </p>

                <p className="mt-2 text-sm text-white/60">
                  {selectedLead.source || "Website"}
                </p>
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`mailto:${selectedLead.email}`}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
                >
                  <Mail size={16} />
                  Email Lead
                </a>

                <button
                  type="button"
                  onClick={() => setSelectedLead(null)}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-white/60 transition hover:bg-white/5 hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}