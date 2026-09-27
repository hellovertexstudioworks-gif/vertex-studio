 "use client";

import {
  Archive,
  ArrowLeft,
  Bold,
  Italic,
  Link2,
  List,
  ListOrdered,
  Paperclip,
  Underline,

  CheckCheck,
  ChevronDown,
  Inbox,
  Mail,
  MoreHorizontal,
  Plus,
  Search,
  Send,
  Star,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

type ConversationType =
  | "Client"
  | "Prospect"
  | "Internal"
  | "Project"
  | "Website";
type ConversationStatus = "Open" | "Closed" | "Archived";

type Message = {
  id: string;
  conversation_id: string;
  sender_id: string | null;
  sender_name: string | null;
  sender_email: string | null;
  sender_type: "Team" | "Client" | "External";
  content: string;
  html_content?: string | null;
  message_type: "Text" | "System" | "File";
  is_read: boolean;
  read_at: string | null;
  created_at: string;
};

type Conversation = {
  id: string;
  client_id: string | null;
  project_id: string | null;
  website_id: string | null;
  subject: string;
  conversation_type: ConversationType;
  status: ConversationStatus;
  last_message_at: string | null;
  created_at: string;
  updated_at: string;
  client?: {
    id: string;
    name: string;
    company: string;
    email: string;
  } | null;
  project?: {
    id: string;
    name: string;
  } | null;
  website?: {
    id: string;
    name: string;
    domain: string;
  } | null;
  unread_count?: number;
  latest_message?: Message | null;
};

type Folder = "Inbox" | "Unread" | "Sent" | "Starred" | "Archived";

type ApiResponse<T> = {
  data?: T;
  error?: string;
};

function formatTime(value: string | null) {
  if (!value) return "";

  const date = new Date(value);
  const now = new Date();

  if (date.toDateString() === now.toDateString()) {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function getConversationName(conversation: Conversation) {
  return (
    conversation.client?.name ||
    conversation.client?.company ||
    conversation.website?.name ||
    conversation.project?.name ||
    conversation.subject ||
    "Conversation"
  );
}

function getConversationSubtitle(conversation: Conversation) {
  if (conversation.client?.company) return conversation.client.company;
  if (conversation.website?.domain) return conversation.website.domain;
  if (conversation.project?.name) return conversation.project.name;
  return conversation.conversation_type;
}

function htmlToPlainText(html: string) {
  if (typeof window === "undefined") return "";
  const container = document.createElement("div");
  container.innerHTML = html;

  // contentEditable browsers can store pasted paragraphs as DIV/P elements.
  // textContent collapses those blocks, so explicitly restore line breaks for
  // the message record and the internal conversation preview.
  container.querySelectorAll("br").forEach((node) => node.replaceWith("\n"));
  container.querySelectorAll("div, p, li, blockquote").forEach((node) => {
    node.insertAdjacentText("beforebegin", "\n");
    node.insertAdjacentText("afterend", "\n");
  });

  return (container.innerText || container.textContent || "")
    .replace(/\u00a0/g, " ")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

type NewConversation = {
  subject: string;
  conversation_type: ConversationType;
  client_id: string;
  project_id: string;
  website_id: string;
  recipient_name: string;
  recipient_email: string;
  content: string;
  contentHtml: string;
}

function syncNewMessageEditor(
  editor: HTMLDivElement | null,
  setter: Dispatch<SetStateAction<NewConversation>>,
) {
  if (!editor) return;
  const html = editor.innerHTML;
  setter((current) => ({
    ...current,
    contentHtml: html,
    content: htmlToPlainText(html),
  }));
}

function defaultVertexSignatureHtml() {
  return `
    <div><strong>Cyril Loon</strong></div>
    <div>Founder &amp; Website Developer</div>
    <div><strong>Vertex Studio Works</strong></div>
    <div>Professional Websites • SEO • CRM &amp; Integrations</div>
    <div>🌐 <a href="https://www.vertexstudioworks.com/" target="_blank" rel="noopener noreferrer">Visit Vertex Studio Works</a></div>
  `;
}

function normalizeConversation(item: Conversation): Conversation {
  return {
    ...item,
    unread_count: Number(item.unread_count ?? 0),
    latest_message: item.latest_message ?? null,
  };
}

export default function MessagesPage() {
  const [folder, setFolder] = useState<Folder>("Inbox");
  const [search, setSearch] = useState("");

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const [loading, setLoading] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);

  const [error, setError] = useState("");
  const [messageText, setMessageText] = useState("");
  const [messageHtml, setMessageHtml] = useState("");
  const [newSignature, setNewSignature] = useState(false);
  const newMessageEditorRef = useRef<HTMLDivElement | null>(null);

  const [showNewMessage, setShowNewMessage] = useState(false);
  const [mobileConversationOpen, setMobileConversationOpen] = useState(false);
  const [showConversationMenu, setShowConversationMenu] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<Message | null>(null);
  const [conversationToDelete, setConversationToDelete] = useState<Conversation | null>(null);

  const [newConversation, setNewConversation] = useState<NewConversation>({
    subject: "",
    conversation_type: "Client",
    client_id: "",
    project_id: "",
    website_id: "",
    recipient_name: "",
    recipient_email: "",
    content: "",
    contentHtml: "",
  });

  async function loadConversations() {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();

      if (folder === "Unread") params.set("unread", "true");
      if (folder === "Archived") {
        params.set("status", "Archived");
      } else {
        params.set("status", "Open");
      }

      if (folder === "Starred") params.set("starred", "true");
      if (folder === "Sent") params.set("sent", "true");
      if (search.trim()) params.set("search", search.trim());

      const response = await fetch(
        `/api/admin/messages?${params.toString()}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const result = (await response.json()) as ApiResponse<Conversation[]>;

      if (!response.ok) {
        throw new Error(result.error || "Failed to load conversations.");
      }

      const rows = Array.isArray(result.data)
        ? result.data.map(normalizeConversation)
        : [];

      setConversations(rows);

      if (selectedConversation) {
        const refreshed = rows.find(
          (conversation) => conversation.id === selectedConversation.id
        );

        if (refreshed) {
          setSelectedConversation(refreshed);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load messages.");
    } finally {
      setLoading(false);
    }
  }

  async function loadMessages(conversationId: string) {
    setLoadingMessages(true);
    setError("");

    try {
      const response = await fetch(
        `/api/admin/messages?conversation_id=${encodeURIComponent(
          conversationId
        )}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const result = (await response.json()) as ApiResponse<Message[]>;

      if (!response.ok) {
        throw new Error(result.error || "Failed to load conversation.");
      }

      setMessages(Array.isArray(result.data) ? result.data : []);

      await fetch("/api/admin/messages", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "mark_read",
          conversation_id: conversationId,
        }),
      });

      setConversations((current) =>
        current.map((conversation) =>
          conversation.id === conversationId
            ? { ...conversation, unread_count: 0 }
            : conversation
        )
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load conversation."
      );
    } finally {
      setLoadingMessages(false);
    }
  }

  useEffect(() => {
    loadConversations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folder]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      loadConversations();
    }, 250);

    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  function selectConversation(conversation: Conversation) {
    setShowConversationMenu(false);
    setSelectedConversation(conversation);
    setMobileConversationOpen(true);
    setMessages([]);
    loadMessages(conversation.id);
  }

  async function deleteMessage(message: Message) {
    if (!message.id) return;

    setError("");

    try {
      const response = await fetch("/api/admin/messages", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "delete_message",
          message_id: message.id,
        }),
      });

      const result = (await response.json()) as ApiResponse<{ success: boolean }>;

      if (!response.ok) {
        throw new Error(result.error || "Failed to delete message.");
      }

      setMessages((current) => current.filter((item) => item.id !== message.id));
      setMessageToDelete(null);
      await loadConversations();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete message.");
    }
  }

  async function deleteConversation(conversation: Conversation) {
    if (!conversation.id) return;

    setError("");

    try {
      const response = await fetch("/api/admin/messages", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "delete_conversation",
          conversation_id: conversation.id,
        }),
      });

      const result = (await response.json()) as ApiResponse<{ success: boolean }>;

      if (!response.ok) {
        throw new Error(result.error || "Failed to delete conversation.");
      }

      setConversations((current) => current.filter((item) => item.id !== conversation.id));
      setSelectedConversation(null);
      setMessages([]);
      setMobileConversationOpen(false);
      setConversationToDelete(null);
      setShowConversationMenu(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete conversation."
      );
    }
  }

  async function sendMessage() {
    const content = messageText.trim();

    if (!content || !selectedConversation || sending) return;

    setSending(true);
    setError("");

    try {
      const response = await fetch("/api/admin/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "send",
          conversation_id: selectedConversation.id,
          content,
        }),
      });

      const result = (await response.json()) as ApiResponse<Message>;

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message.");
      }

      if (result.data) {
        setMessages((current) => [...current, result.data as Message]);
      }

      setMessageText("");
      await loadConversations();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message.");
    } finally {
      setSending(false);
    }
  }

  function runEditorCommand(command: string, value?: string) {
    newMessageEditorRef.current?.focus();
    document.execCommand(command, false, value);
    if (newMessageEditorRef.current) {
      syncNewMessageEditor(newMessageEditorRef.current, setNewConversation);
    }
  }

  function insertLink() {
    newMessageEditorRef.current?.focus();
    const url = window.prompt("Enter the URL:");
    if (!url) return;

    const safeUrl = /^https?:\/\//i.test(url) ? url : `https://${url}`;
    document.execCommand("createLink", false, safeUrl);

    if (newMessageEditorRef.current) {
      syncNewMessageEditor(newMessageEditorRef.current, setNewConversation);
    }
  }

  function insertSignature() {
    newMessageEditorRef.current?.focus();
    const signature = defaultVertexSignatureHtml();
    document.execCommand("insertHTML", false, `<div><br></div><div data-vertex-signature="true">${signature}</div>`);

    if (newMessageEditorRef.current) {
      syncNewMessageEditor(newMessageEditorRef.current, setNewConversation);
    }
    setNewSignature(true);
  }

  async function createConversation(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!newConversation.content.trim() || !newConversation.subject.trim()) {
      setError("Subject and message are required.");
      return;
    }

    setSending(true);
    setError("");

    try {
      const response = await fetch("/api/admin/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "create_conversation",
          ...newConversation,
        }),
      });

      const result = (await response.json()) as ApiResponse<Conversation>;

      if (!response.ok) {
        throw new Error(result.error || "Failed to create conversation.");
      }

      setShowNewMessage(false);
      setNewConversation({
        subject: "",
        conversation_type: "Client",
        client_id: "",
        project_id: "",
        website_id: "",
        recipient_name: "",
        recipient_email: "",
        content: "",
        contentHtml: "",
      });

      await loadConversations();

      if (result.data) {
        const created = normalizeConversation(result.data);
        setSelectedConversation(created);
        setMobileConversationOpen(true);
        await loadMessages(created.id);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create conversation."
      );
    } finally {
      setSending(false);
    }
  }

  const unreadCount = conversations.reduce(
    (sum, conversation) => sum + Number(conversation.unread_count ?? 0),
    0
  );

  const visibleConversations = useMemo(() => {
    return conversations;
  }, [conversations]);

  return (
    <main
      className="min-h-screen w-full px-4 py-5 sm:px-6 lg:px-8"
      style={{
        backgroundColor: "var(--vertex-bg)",
        color: "var(--vertex-text)",
      }}
    >
      <div className="mx-auto flex min-h-[calc(100vh-40px)] max-w-[1800px] flex-col">
        <header
          className="mb-5 flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-end sm:justify-between"
          style={{ borderColor: "var(--vertex-border)" }}
        >
          <div>
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.22em]"
              style={{ color: "var(--vertex-accent)" }}
            >
              Vertex Studio
            </p>
            <div className="mt-1 flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">Messages</h1>

              {unreadCount > 0 && (
                <span
                  className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
                  style={{
                    backgroundColor: "var(--vertex-accent-soft)",
                    color: "var(--vertex-accent)",
                  }}
                >
                  {unreadCount} unread
                </span>
              )}
            </div>

            <p
              className="mt-1 text-sm"
              style={{ color: "var(--vertex-muted)" }}
            >
              Manage client, project, website, and internal conversations.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowNewMessage(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            style={{ backgroundColor: "var(--vertex-accent)" }}
          >
            <Plus className="h-4 w-4" />
            New Message
          </button>
        </header>

        {error && (
          <div
            className="mb-4 rounded-xl border px-4 py-3"
            style={{
              borderColor: "rgba(239,68,68,.25)",
              backgroundColor: "rgba(239,68,68,.06)",
            }}
          >
            <p className="text-sm font-medium text-red-400">Messages error</p>
            <p className="mt-1 text-xs text-red-400/70">{error}</p>
          </div>
        )}

        <section
          className="grid min-h-0 flex-1 overflow-hidden rounded-2xl border"
          style={{
            borderColor: "var(--vertex-border)",
            backgroundColor: "var(--vertex-surface)",
            gridTemplateColumns: "220px minmax(300px, 380px) minmax(0, 1fr)",
          }}
        >
          <aside
            className="hidden border-r p-3 md:block"
            style={{ borderColor: "var(--vertex-border)" }}
          >
            <div
              className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-wider"
              style={{ color: "var(--vertex-muted)" }}
            >
              Mailbox
            </div>

            <div className="space-y-1">
              {[
                { key: "Inbox" as Folder, icon: Inbox, label: "Inbox" },
                { key: "Unread" as Folder, icon: Mail, label: "Unread" },
                { key: "Sent" as Folder, icon: Send, label: "Sent" },
                { key: "Starred" as Folder, icon: Star, label: "Starred" },
                {
                  key: "Archived" as Folder,
                  icon: Archive,
                  label: "Archived",
                },
              ].map((item) => {
                const Icon = item.icon;
                const active = folder === item.key;

                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setFolder(item.key)}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition"
                    style={{
                      backgroundColor: active
                        ? "var(--vertex-accent-soft)"
                        : "transparent",
                      color: active
                        ? "var(--vertex-accent)"
                        : "var(--vertex-muted)",
                    }}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </span>

                    {item.key === "Unread" && unreadCount > 0 && (
                      <span className="text-xs font-semibold">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div
              className="my-5 border-t"
              style={{ borderColor: "var(--vertex-border)" }}
            />

            <div
              className="px-3 text-[10px] font-semibold uppercase tracking-wider"
              style={{ color: "var(--vertex-muted)" }}
            >
              Communication
            </div>

            <div
              className="mt-3 space-y-3 px-3 text-xs"
              style={{ color: "var(--vertex-muted)" }}
            >
              <div className="flex items-center gap-2">
                <Users className="h-3.5 w-3.5" />
                Client conversations
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5" />
                Team communication
              </div>
            </div>
          </aside>

          <section
            className={`${
              mobileConversationOpen ? "hidden md:flex" : "flex"
            } min-h-0 flex-col border-r`}
            style={{ borderColor: "var(--vertex-border)" }}
          >
            <div
              className="border-b p-3"
              style={{ borderColor: "var(--vertex-border)" }}
            >
              <div
                className="flex items-center gap-2 rounded-xl border px-3 py-2"
                style={{
                  borderColor: "var(--vertex-border)",
                  backgroundColor: "var(--vertex-surface-2)",
                }}
              >
                <Search
                  className="h-4 w-4"
                  style={{ color: "var(--vertex-muted)" }}
                />

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search messages..."
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--vertex-muted)]"
                />
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto">
              {loading ? (
                <div className="flex min-h-[300px] items-center justify-center">
                  <p
                    className="text-sm"
                    style={{ color: "var(--vertex-muted)" }}
                  >
                    Loading conversations...
                  </p>
                </div>
              ) : visibleConversations.length === 0 ? (
                <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
                  <Mail
                    className="h-8 w-8"
                    style={{ color: "var(--vertex-muted)" }}
                  />
                  <p className="mt-3 text-sm font-semibold">
                    No conversations
                  </p>
                  <p
                    className="mt-1 text-xs"
                    style={{ color: "var(--vertex-muted)" }}
                  >
                    Your messages will appear here.
                  </p>
                </div>
              ) : (
                visibleConversations.map((conversation) => {
                  const name = getConversationName(conversation);
                  const active =
                    selectedConversation?.id === conversation.id;

                  return (
                    <button
                      key={conversation.id}
                      type="button"
                      onClick={() => selectConversation(conversation)}
                      className="w-full border-b p-4 text-left transition"
                      style={{
                        borderColor: "var(--vertex-border)",
                        backgroundColor: active
                          ? "var(--vertex-accent-soft)"
                          : "transparent",
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold"
                          style={{
                            backgroundColor: "var(--vertex-accent-soft)",
                            color: "var(--vertex-accent)",
                          }}
                        >
                          {initials(name)}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p
                                className={`truncate text-sm ${
                                  conversation.unread_count
                                    ? "font-bold"
                                    : "font-semibold"
                                }`}
                              >
                                {name}
                              </p>

                              <p
                                className="truncate text-[11px]"
                                style={{ color: "var(--vertex-muted)" }}
                              >
                                {getConversationSubtitle(conversation)}
                              </p>
                            </div>

                            <span
                              className="shrink-0 text-[10px]"
                              style={{ color: "var(--vertex-muted)" }}
                            >
                              {formatTime(conversation.last_message_at)}
                            </span>
                          </div>

                          <p className="mt-2 truncate text-xs font-medium">
                            {conversation.subject || "No subject"}
                          </p>

                          <p
                            className="mt-1 truncate text-xs"
                            style={{ color: "var(--vertex-muted)" }}
                          >
                            {conversation.latest_message?.content ||
                              "No messages yet."}
                          </p>

                          <div className="mt-2 flex items-center justify-between">
                            <span
                              className="rounded-full border px-2 py-0.5 text-[9px]"
                              style={{
                                borderColor: "var(--vertex-border)",
                                color: "var(--vertex-muted)",
                              }}
                            >
                              {conversation.conversation_type}
                            </span>

                            {conversation.unread_count ? (
                              <span
                                className="flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold text-white"
                                style={{
                                  backgroundColor: "var(--vertex-accent)",
                                }}
                              >
                                {conversation.unread_count}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </section>

          <section
            className={`${
              mobileConversationOpen ? "flex" : "hidden md:flex"
            } min-h-0 flex-col`}
          >
            {selectedConversation ? (
              <>
                <header
                  className="flex items-center justify-between border-b px-4 py-3 sm:px-5"
                  style={{ borderColor: "var(--vertex-border)" }}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setMobileConversationOpen(false)}
                      className="rounded-lg p-2 md:hidden"
                      style={{ color: "var(--vertex-muted)" }}
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </button>

                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold"
                      style={{
                        backgroundColor: "var(--vertex-accent-soft)",
                        color: "var(--vertex-accent)",
                      }}
                    >
                      {initials(getConversationName(selectedConversation))}
                    </div>

                    <div className="min-w-0">
                      <h2 className="truncate text-sm font-semibold">
                        {getConversationName(selectedConversation)}
                      </h2>

                      <p
                        className="truncate text-xs"
                        style={{ color: "var(--vertex-muted)" }}
                      >
                        {getConversationSubtitle(selectedConversation)}
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowConversationMenu((current) => !current)}
                      className="rounded-lg p-2 transition hover:bg-white/5"
                      style={{ color: "var(--vertex-muted)" }}
                      title="More actions"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>

                    {showConversationMenu && (
                      <div
                        className="absolute right-0 top-11 z-30 w-48 rounded-xl border p-1.5 shadow-2xl"
                        style={{
                          backgroundColor: "var(--vertex-surface)",
                          borderColor: "var(--vertex-border)",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => setConversationToDelete(selectedConversation)}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium transition hover:bg-red-500/10"
                          style={{ color: "#ef4444" }}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete conversation
                        </button>
                      </div>
                    )}
                  </div>
                </header>

                <div
                  className="border-b px-4 py-3 sm:px-5"
                  style={{
                    borderColor: "var(--vertex-border)",
                    backgroundColor: "var(--vertex-surface-2)",
                  }}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="rounded-full border px-2.5 py-1 text-[10px] font-medium"
                      style={{
                        borderColor: "var(--vertex-border)",
                        color: "var(--vertex-accent)",
                      }}
                    >
                      {selectedConversation.conversation_type}
                    </span>

                    {selectedConversation.project?.name && (
                      <span
                        className="rounded-full border px-2.5 py-1 text-[10px]"
                        style={{
                          borderColor: "var(--vertex-border)",
                          color: "var(--vertex-muted)",
                        }}
                      >
                        {selectedConversation.project.name}
                      </span>
                    )}

                    {selectedConversation.website?.name && (
                      <span
                        className="rounded-full border px-2.5 py-1 text-[10px]"
                        style={{
                          borderColor: "var(--vertex-border)",
                          color: "var(--vertex-muted)",
                        }}
                      >
                        {selectedConversation.website.name}
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-sm font-semibold">
                    {selectedConversation.subject || "No subject"}
                  </p>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
                  {loadingMessages ? (
                    <div className="flex h-full items-center justify-center">
                      <p
                        className="text-sm"
                        style={{ color: "var(--vertex-muted)" }}
                      >
                        Loading conversation...
                      </p>
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="flex h-full items-center justify-center text-center">
                      <div>
                        <Mail
                          className="mx-auto h-9 w-9"
                          style={{ color: "var(--vertex-muted)" }}
                        />
                        <p className="mt-3 text-sm font-semibold">
                          No messages yet
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((message) => {
                        const own = message.sender_type === "Team";

                        return (
                          <div
                            key={message.id}
                            className={`flex ${
                              own ? "justify-end" : "justify-start"
                            }`}
                          >
                            <div
                              className={`flex max-w-[85%] flex-col ${
                                own ? "items-end" : "items-start"
                              } sm:max-w-[70%]`}
                            >
                              <div className="mb-1 flex items-center gap-2 px-1">
                                {!own && (
                                  <span className="text-[10px] font-semibold">
                                    {message.sender_name ||
                                      message.sender_email ||
                                      "External"}
                                  </span>
                                )}

                                <span
                                  className="text-[10px]"
                                  style={{ color: "var(--vertex-muted)" }}
                                >
                                  {formatTime(message.created_at)}
                                </span>
                              </div>

                              <div className="group relative flex items-start gap-2">
                                <div
                                  className="whitespace-pre-wrap break-words rounded-2xl border px-4 py-3 text-sm leading-6"
                                  style={{
                                    borderColor: "var(--vertex-border)",
                                    backgroundColor: own
                                      ? "var(--vertex-accent)"
                                      : "var(--vertex-surface-2)",
                                    color: own
                                      ? "#fff"
                                      : "var(--vertex-text)",
                                  }}
                                >
                                  {message.content}
                                </div>

                                <button
                                  type="button"
                                  onClick={() => setMessageToDelete(message)}
                                  className="mt-2 rounded-lg p-1.5 opacity-0 transition group-hover:opacity-100 hover:bg-red-500/10"
                                  style={{ color: "#ef4444" }}
                                  title="Delete message"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>

                              {own && (
                                <div
                                  className="mt-1 flex items-center gap-1 px-1 text-[10px]"
                                  style={{
                                    color: "var(--vertex-muted)",
                                  }}
                                >
                                  <CheckCheck className="h-3 w-3" />
                                  {message.is_read ? "Read" : "Sent"}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div
                  className="border-t p-3 sm:p-4"
                  style={{ borderColor: "var(--vertex-border)" }}
                >
                  <div
                    className="rounded-2xl border"
                    style={{
                      borderColor: "var(--vertex-border)",
                      backgroundColor: "var(--vertex-surface-2)",
                    }}
                  >
                    <textarea
                      value={messageText}
                      onChange={(event) => setMessageText(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" && !event.shiftKey) {
                          event.preventDefault();
                          sendMessage();
                        }
                      }}
                      rows={3}
                      placeholder="Write a message..."
                      className="w-full resize-none bg-transparent px-4 py-3 text-sm outline-none placeholder:text-[var(--vertex-muted)]"
                    />

                    <div
                      className="flex items-center justify-between border-t px-3 py-2"
                      style={{ borderColor: "var(--vertex-border)" }}
                    >
                      <button
                        type="button"
                        className="rounded-lg p-2"
                        style={{ color: "var(--vertex-muted)" }}
                        title="Attachments will be added after core messaging is complete."
                      >
                        <Paperclip className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={sendMessage}
                        disabled={sending || !messageText.trim()}
                        className="inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-40"
                        style={{ backgroundColor: "var(--vertex-accent)" }}
                      >
                        <Send className="h-3.5 w-3.5" />
                        {sending ? "Sending..." : "Send"}
                      </button>
                    </div>
                  </div>

                  <p
                    className="mt-2 px-1 text-[10px]"
                    style={{ color: "var(--vertex-muted)" }}
                  >
                    Enter to send · Shift + Enter for a new line
                  </p>
                </div>
              </>
            ) : (
              <div className="flex flex-1 items-center justify-center p-8 text-center">
                <div>
                  <Mail
                    className="mx-auto h-10 w-10"
                    style={{ color: "var(--vertex-muted)" }}
                  />
                  <h2 className="mt-3 text-sm font-semibold">
                    Select a conversation
                  </h2>
                  <p
                    className="mt-1 text-xs"
                    style={{ color: "var(--vertex-muted)" }}
                  >
                    Choose a conversation from the inbox.
                  </p>
                </div>
              </div>
            )}
          </section>
        </section>
      </div>

      {showNewMessage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div
            className="max-h-[calc(100vh-2rem)] w-full max-w-2xl overflow-y-auto rounded-2xl border p-6 shadow-2xl sm:p-7"
            style={{
              backgroundColor: "var(--vertex-surface)",
              borderColor: "var(--vertex-border)",
            }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p
                  className="text-[10px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: "var(--vertex-accent)" }}
                >
                  Vertex Studio
                </p>

                <h2 className="mt-1 text-lg font-semibold">
                  New Message
                </h2>

                <p
                  className="mt-1 text-xs"
                  style={{ color: "var(--vertex-muted)" }}
                >
                  Start a client, project, website, or internal conversation.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowNewMessage(false)}
                className="rounded-lg p-2"
                style={{ color: "var(--vertex-muted)" }}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={createConversation} className="mt-6 space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium">
                    Conversation Type
                  </label>

                  <select
                    value={newConversation.conversation_type}
                    onChange={(event) =>
                      setNewConversation((current) => ({
                        ...current,
                        conversation_type:
                          event.target.value as ConversationType,
                      }))
                    }
                    className="w-full rounded-xl border bg-transparent px-3 py-2.5 text-sm outline-none"
                    style={{
                      borderColor: "var(--vertex-border)",
                      color: "var(--vertex-text)",
                    }}
                  >
                    <option value="Client" className="bg-[#111]">
                      Client
                    </option>
                    <option value="Prospect" className="bg-[#111]">
                      Prospect
                    </option>
                    <option value="Project" className="bg-[#111]">
                      Project
                    </option>
                    <option value="Website" className="bg-[#111]">
                      Website
                    </option>
                    <option value="Internal" className="bg-[#111]">
                      Internal
                    </option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium">
                    Recipient Name
                  </label>

                  <input
                    value={newConversation.recipient_name}
                    onChange={(event) =>
                      setNewConversation((current) => ({
                        ...current,
                        recipient_name: event.target.value,
                      }))
                    }
                    placeholder="Client or team member"
                    className="w-full rounded-xl border bg-transparent px-3 py-2.5 text-sm outline-none"
                    style={{ borderColor: "var(--vertex-border)" }}
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium">
                  Recipient Email
                </label>

                <input
                  type="email"
                  value={newConversation.recipient_email}
                  onChange={(event) =>
                    setNewConversation((current) => ({
                      ...current,
                      recipient_email: event.target.value,
                    }))
                  }
                  placeholder="client@example.com"
                  className="w-full rounded-xl border bg-transparent px-3 py-2.5 text-sm outline-none"
                  style={{ borderColor: "var(--vertex-border)" }}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium">
                  Subject
                </label>

                <input
                  required
                  value={newConversation.subject}
                  onChange={(event) =>
                    setNewConversation((current) => ({
                      ...current,
                      subject: event.target.value,
                    }))
                  }
                  placeholder="Website project update"
                  className="w-full rounded-xl border bg-transparent px-3 py-2.5 text-sm outline-none"
                  style={{ borderColor: "var(--vertex-border)" }}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium">
                  Message
                </label>

                <div
                  className="overflow-hidden rounded-xl border"
                  style={{
                    borderColor: "var(--vertex-border)",
                    backgroundColor: "var(--vertex-surface-2)",
                  }}
                >
                  <div
                    className="flex flex-wrap items-center gap-1 border-b px-2 py-2"
                    style={{ borderColor: "var(--vertex-border)" }}
                  >
                    {[
                      { label: "B", title: "Bold", command: "bold", icon: Bold },
                      { label: "I", title: "Italic", command: "italic", icon: Italic },
                      { label: "U", title: "Underline", command: "underline", icon: Underline },
                    ].map(({ title, command, icon: Icon }) => (
                      <button
                        key={command}
                        type="button"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => runEditorCommand(command)}
                        className="rounded-lg p-2 transition hover:bg-white/5"
                        style={{ color: "var(--vertex-text)" }}
                        title={title}
                        aria-label={title}
                      >
                        <Icon className="h-4 w-4" />
                      </button>
                    ))}

                    <div
                      className="mx-1 h-5 w-px"
                      style={{ backgroundColor: "var(--vertex-border)" }}
                    />

                    <button
                      type="button"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={insertLink}
                      className="rounded-lg p-2 transition hover:bg-white/5"
                      style={{ color: "var(--vertex-text)" }}
                      title="Insert link"
                      aria-label="Insert link"
                    >
                      <Link2 className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => runEditorCommand("insertUnorderedList")}
                      className="rounded-lg p-2 transition hover:bg-white/5"
                      style={{ color: "var(--vertex-text)" }}
                      title="Bulleted list"
                      aria-label="Bulleted list"
                    >
                      <List className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => runEditorCommand("insertOrderedList")}
                      className="rounded-lg p-2 transition hover:bg-white/5"
                      style={{ color: "var(--vertex-text)" }}
                      title="Numbered list"
                      aria-label="Numbered list"
                    >
                      <ListOrdered className="h-4 w-4" />
                    </button>

                    <div
                      className="mx-1 h-5 w-px"
                      style={{ backgroundColor: "var(--vertex-border)" }}
                    />

                    <button
                      type="button"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={insertSignature}
                      className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-medium transition hover:bg-white/5"
                      style={{ color: "var(--vertex-text)" }}
                      title="Insert Vertex signature"
                    >
                      ✍ Signature
                    </button>

                    <span
                      className="ml-auto hidden px-2 text-[10px] sm:block"
                      style={{ color: "var(--vertex-muted)" }}
                    >
                      Rich text
                    </span>
                  </div>

                  <div
                    ref={newMessageEditorRef}
                    contentEditable
                    role="textbox"
                    aria-multiline="true"
                    suppressContentEditableWarning
                    data-placeholder="Write your message..."
                    onPaste={(event) => {
                      // Keep useful rich formatting when pasting from Gmail,
                      // Outlook, Word, or websites, but remove copied
                      // background colors/images and page-level styling.
                      event.preventDefault();

                      const clipboard = event.clipboardData;
                      const pastedHtml = clipboard.getData("text/html");
                      const pastedText = clipboard.getData("text/plain");

                      if (pastedHtml) {
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(
                          pastedHtml,
                          "text/html"
                        );

                        doc.querySelectorAll<HTMLElement>("*").forEach((element) => {
                          // Never import the source document's visual theme.
                          // We keep semantic formatting such as <strong>, <em>,
                          // <u>, links, paragraphs, and lists, but strip colors,
                          // backgrounds, fonts, and other presentation styles.
                          element.removeAttribute("bgcolor");
                          element.removeAttribute("color");
                          element.removeAttribute("face");

                          const style = element.getAttribute("style");
                          if (!style) return;

                          const cleanedStyle = style
                            .split(";")
                            .map((rule) => rule.trim())
                            .filter(Boolean)
                            .filter((rule) => {
                              const property = rule
                                .split(":")[0]
                                ?.trim()
                                .toLowerCase();

                              return ![
                                "color",
                                "background",
                                "background-color",
                                "background-image",
                                "background-repeat",
                                "background-position",
                                "background-size",
                                "background-attachment",
                                "font",
                                "font-family",
                                "font-size",
                                "font-style",
                                "font-weight",
                                "line-height",
                                "text-decoration",
                                "text-shadow",
                              ].includes(property || "");
                            })
                            .join("; ");

                          if (cleanedStyle) {
                            element.setAttribute("style", cleanedStyle);
                          } else {
                            element.removeAttribute("style");
                          }
                        });

                        // Remove page-level styling from copied Gmail/Outlook
                        // content while keeping the actual message markup.
                        doc.querySelector("body")?.removeAttribute("style");
                        doc.querySelector("body")?.removeAttribute("bgcolor");
                        doc.querySelector("body")?.removeAttribute("color");

                        // Gmail sometimes wraps copied text in <font color="...">
                        // or similar tags. Unwrap those tags so the editor uses
                        // Vertex's own text color instead of the source color.
                        doc.querySelectorAll("font").forEach((font) => {
                          const parent = font.parentNode;
                          if (!parent) return;

                          while (font.firstChild) {
                            parent.insertBefore(font.firstChild, font);
                          }
                          parent.removeChild(font);
                        });

                        document.execCommand(
                          "insertHTML",
                          false,
                          doc.body.innerHTML
                        );
                      } else {
                        const html = pastedText
                          .replace(/&/g, "&amp;")
                          .replace(/</g, "&lt;")
                          .replace(/>/g, "&gt;")
                          .replace(
                            /\r?\n\r?\n/g,
                            "</div><div><br></div><div>"
                          )
                          .replace(/\r?\n/g, "</div><div>");

                        document.execCommand(
                          "insertHTML",
                          false,
                          `<div>${html}</div>`
                        );
                      }

                      syncNewMessageEditor(
                        newMessageEditorRef.current,
                        setNewConversation
                      );
                    }}
                    onInput={(event) => {
                      syncNewMessageEditor(event.currentTarget, setNewConversation);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && event.shiftKey) {
                        return;
                      }

                      if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        document.execCommand("insertParagraph", false);
                      }
                    }}
                    className="min-h-[260px] max-h-[42vh] overflow-y-auto px-4 py-4 text-sm leading-6 outline-none empty:before:pointer-events-none empty:before:content-[attr(data-placeholder)]"
                    style={{
                      color: "var(--vertex-text)",
                    }}
                  />
                </div>

                <p
                  className="mt-2 text-[10px]"
                  style={{ color: "var(--vertex-muted)" }}
                >
                  Select text to format it. Enter creates a new paragraph. Shift + Enter creates a line break.
                  {newSignature ? " Signature added." : ""}
                </p>
              </div>

              <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setShowNewMessage(false)}
                  className="rounded-xl border px-4 py-2.5 text-sm font-medium"
                  style={{ borderColor: "var(--vertex-border)" }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
                  style={{ backgroundColor: "var(--vertex-accent)" }}
                >
                  <Send className="h-4 w-4" />
                  {sending ? "Creating..." : "Start Conversation"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {messageToDelete && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div
            className="w-full max-w-md rounded-2xl border p-6 shadow-2xl"
            style={{
              backgroundColor: "var(--vertex-surface)",
              borderColor: "var(--vertex-border)",
            }}
          >
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-red-500/10 p-2.5 text-red-400">
                <Trash2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">Delete message?</h3>
                <p className="mt-1 text-xs leading-5" style={{ color: "var(--vertex-muted)" }}>
                  This message will be permanently removed from this conversation.
                </p>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setMessageToDelete(null)}
                className="rounded-xl border px-4 py-2.5 text-xs font-medium"
                style={{ borderColor: "var(--vertex-border)" }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => deleteMessage(messageToDelete)}
                className="inline-flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-xs font-semibold text-white"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete Message
              </button>
            </div>
          </div>
        </div>
      )}

      {conversationToDelete && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div
            className="w-full max-w-md rounded-2xl border p-6 shadow-2xl"
            style={{
              backgroundColor: "var(--vertex-surface)",
              borderColor: "var(--vertex-border)",
            }}
          >
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-red-500/10 p-2.5 text-red-400">
                <Trash2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">Delete conversation?</h3>
                <p className="mt-1 text-xs leading-5" style={{ color: "var(--vertex-muted)" }}>
                  This permanently deletes the conversation and all messages inside it.
                </p>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setConversationToDelete(null)}
                className="rounded-xl border px-4 py-2.5 text-xs font-medium"
                style={{ borderColor: "var(--vertex-border)" }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => deleteConversation(conversationToDelete)}
                className="inline-flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-xs font-semibold text-white"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete Conversation
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
