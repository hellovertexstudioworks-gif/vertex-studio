"use client";

import {
  Archive,
  ArrowLeft,
  Check,
  Mail,
  MessageSquare,
  Search,
  User,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type MessageStatus = "New" | "Read" | "Replied" | "Archived";

type Message = {
  id: string;
  name: string;
  email: string;
  business: string | null;
  subject: string | null;
  message: string;
  status: MessageStatus;
  created_at: string;
};

const statusStyles: Record<MessageStatus, string> = {
  New: "border-blue-500/30 bg-blue-500/10 text-blue-400",
  Read: "border-white/10 bg-white/5 text-white/50",
  Replied: "border-green-500/30 bg-green-500/10 text-green-400",
  Archived: "border-white/10 bg-white/5 text-white/30",
};

export default function MessagesPage() {
  const supabase = createClient();

  const [messages, setMessages] = useState<Message[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | MessageStatus
  >("All");

  const [selectedMessage, setSelectedMessage] =
    useState<Message | null>(null);

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  /*
   * Load messages
   */
  const loadMessages = async () => {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("MESSAGES LOAD ERROR:", error);
      setError(error.message);
      setLoading(false);
      return;
    }

    setMessages((data ?? []) as Message[]);
    setLoading(false);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  /*
   * Update message status
   */
  const updateMessageStatus = async (
    messageId: string,
    status: MessageStatus
  ) => {
    setUpdating(true);
    setError("");

    const { error } = await supabase
      .from("messages")
      .update({ status })
      .eq("id", messageId);

    if (error) {
      console.error("MESSAGE UPDATE ERROR:", error);
      setError(error.message);
      setUpdating(false);
      return;
    }

    setMessages((current) =>
      current.map((message) =>
        message.id === messageId
          ? { ...message, status }
          : message
      )
    );

    setSelectedMessage((current) =>
      current && current.id === messageId
        ? { ...current, status }
        : current
    );

    setUpdating(false);
  };

  /*
   * Automatically mark a new message as read
   * when opening it.
   */
  const openMessage = async (message: Message) => {
    setSelectedMessage(message);

    if (message.status === "New") {
      await updateMessageStatus(message.id, "Read");
    }
  };

  /*
   * Filter messages
   */
  const filteredMessages = useMemo(() => {
    return messages.filter((message) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        message.name?.toLowerCase().includes(searchValue) ||
        message.email?.toLowerCase().includes(searchValue) ||
        message.business?.toLowerCase().includes(searchValue) ||
        message.subject?.toLowerCase().includes(searchValue) ||
        message.message?.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        message.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [messages, search, statusFilter]);

  /*
   * Counts
   */
  const totalMessages = messages.length;

  const newMessages = messages.filter(
    (message) => message.status === "New"
  ).length;

  const repliedMessages = messages.filter(
    (message) => message.status === "Replied"
  ).length;

  const archivedMessages = messages.filter(
    (message) => message.status === "Archived"
  ).length;

  /*
   * Date formatting
   */
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatDateTime = (date: string) => {
    return new Date(date).toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <main className="min-h-screen bg-[#070707] px-5 py-8 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
              <MessageSquare
                size={19}
                className="text-white/70"
              />
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/35">
                Vertex Studio
              </p>

              <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                Messages
              </h1>
            </div>
          </div>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/40">
            Manage website inquiries, client messages, and follow-ups
            from one place.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Summary */}
        <section className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Total Messages", totalMessages],
            ["New", newMessages],
            ["Replied", repliedMessages],
            ["Archived", archivedMessages],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-2xl border border-white/10 bg-white/[0.025] p-5"
            >
              <p className="text-sm text-white/40">
                {label}
              </p>

              <p className="mt-2 text-3xl font-semibold tracking-tight">
                {value}
              </p>
            </div>
          ))}
        </section>

        {/* Message Management */}
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
                placeholder="Search messages..."
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-white/20"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value as
                    | "All"
                    | MessageStatus
                )
              }
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 outline-none"
            >
              <option value="All" className="bg-[#111]">
                All messages
              </option>

              <option value="New" className="bg-[#111]">
                New
              </option>

              <option value="Read" className="bg-[#111]">
                Read
              </option>

              <option value="Replied" className="bg-[#111]">
                Replied
              </option>

              <option value="Archived" className="bg-[#111]">
                Archived
              </option>
            </select>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex min-h-[360px] items-center justify-center">
              <p className="text-sm text-white/35">
                Loading messages...
              </p>
            </div>
          ) : filteredMessages.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px]">

                <thead>
                  <tr className="border-b border-white/10 text-left text-xs text-white/30">
                    <th className="px-6 py-4 font-medium">
                      Message
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Business
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
                  {filteredMessages.map((message) => (
                    <tr
                      key={message.id}
                      className="border-b border-white/5 last:border-0"
                    >
                      {/* Message */}
                      <td className="px-6 py-5">
                        <div className="max-w-[360px]">
                          <div className="flex items-center gap-2">
                            {message.status === "New" && (
                              <span className="h-2 w-2 rounded-full bg-blue-400" />
                            )}

                            <p className="text-sm font-medium">
                              {message.name}
                            </p>
                          </div>

                          <div className="mt-1 flex items-center gap-1.5 text-xs text-white/35">
                            <Mail size={13} />
                            {message.email}
                          </div>

                          <p className="mt-2 truncate text-xs text-white/30">
                            {message.subject ||
                              message.message}
                          </p>
                        </div>
                      </td>

                      {/* Business */}
                      <td className="px-6 py-5 text-sm text-white/50">
                        {message.business || "—"}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5">
                        <span
                          className={`rounded-full border px-3 py-1 text-xs ${
                            statusStyles[message.status]
                          }`}
                        >
                          {message.status}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-5 text-sm text-white/35">
                        {formatDate(message.created_at)}
                      </td>

                      {/* Action */}
                      <td className="px-6 py-5">
                        <button
                          type="button"
                          onClick={() =>
                            openMessage(message)
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
                <MessageSquare
                  size={26}
                  className="text-white/25"
                />
              </div>

              <h2 className="mt-6 text-lg font-semibold">
                No messages yet
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-white/35">
                Messages submitted through your website will
                appear here automatically.
              </p>
            </div>
          )}
        </section>

        {/* Navigation */}
        <div className="mt-8 flex flex-wrap items-center gap-5">
          <a
            href="/admin"
            className="inline-flex items-center gap-2 text-sm text-white/40 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Dashboard
          </a>

          <a
            href="/admin/leads"
            className="text-sm text-white/40 transition hover:text-white"
          >
            Leads →
          </a>

          <a
            href="/admin/analytics"
            className="text-sm text-white/40 transition hover:text-white"
          >
            Analytics →
          </a>
        </div>
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#111111] shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/10 p-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/30">
                  Message Details
                </p>

                <h2 className="mt-2 text-xl font-semibold">
                  {selectedMessage.name}
                </h2>

                <div className="mt-1 flex items-center gap-2 text-sm text-white/40">
                  <Mail size={14} />
                  {selectedMessage.email}
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedMessage(null)
                }
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/40 transition hover:bg-white/5 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-4 p-6">

              {/* Status */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-white/30">
                      Message Status
                    </p>

                    <p className="mt-1 text-sm text-white/40">
                      Update the current stage of this message.
                    </p>
                  </div>

                  <select
                    value={selectedMessage.status}
                    disabled={updating}
                    onChange={(event) =>
                      updateMessageStatus(
                        selectedMessage.id,
                        event.target.value as MessageStatus
                      )
                    }
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/70 outline-none"
                  >
                    <option value="New" className="bg-[#111]">
                      New
                    </option>

                    <option value="Read" className="bg-[#111]">
                      Read
                    </option>

                    <option value="Replied" className="bg-[#111]">
                      Replied
                    </option>

                    <option value="Archived" className="bg-[#111]">
                      Archived
                    </option>
                  </select>
                </div>
              </div>

              {/* Contact / Business */}
              <div className="grid gap-4 sm:grid-cols-2">

                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-white/30">
                    <User size={14} />
                    Contact
                  </div>

                  <p className="mt-4 text-sm font-medium">
                    {selectedMessage.name}
                  </p>

                  <p className="mt-1 text-sm text-white/35">
                    {selectedMessage.email}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                  <p className="text-xs uppercase tracking-[0.15em] text-white/30">
                    Business
                  </p>

                  <p className="mt-4 text-sm font-medium">
                    {selectedMessage.business || "—"}
                  </p>
                </div>

              </div>

              {/* Subject */}
              {selectedMessage.subject && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                  <p className="text-xs uppercase tracking-[0.15em] text-white/30">
                    Subject
                  </p>

                  <p className="mt-4 text-sm text-white/70">
                    {selectedMessage.subject}
                  </p>
                </div>
              )}

              {/* Message */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                <p className="text-xs uppercase tracking-[0.15em] text-white/30">
                  Message
                </p>

                <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-white/65">
                  {selectedMessage.message}
                </p>
              </div>

              {/* Submitted */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                <p className="text-xs uppercase tracking-[0.15em] text-white/30">
                  Submitted
                </p>

                <p className="mt-3 text-sm text-white/60">
                  {formatDateTime(
                    selectedMessage.created_at
                  )}
                </p>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="flex flex-col gap-3 border-t border-white/10 p-6 sm:flex-row">

              <a
                href={`mailto:${selectedMessage.email}`}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                <Mail size={16} />
                Email Client
              </a>

              <button
                type="button"
                disabled={updating}
                onClick={() =>
                  updateMessageStatus(
                    selectedMessage.id,
                    "Replied"
                  )
                }
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-white/60 transition hover:bg-white/5 hover:text-white disabled:opacity-50"
              >
                <Check size={16} />
                Mark Replied
              </button>

              <button
                type="button"
                disabled={updating}
                onClick={() =>
                  updateMessageStatus(
                    selectedMessage.id,
                    "Archived"
                  )
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-white/40 transition hover:bg-white/5 hover:text-white disabled:opacity-50"
              >
                <Archive size={16} />
                Archive
              </button>

            </div>
          </div>
        </div>
      )}
    </main>
  );
}