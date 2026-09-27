import { NextRequest, NextResponse } from "next/server";
import { createClient as createSupabaseAdmin } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { vertexMailTransporter } from "@/lib/email/transport";
import { buildPlainText } from "@/lib/email/plain-text";
import { buildVertexEmailHtml } from "@/lib/email/template";

type ConversationType =
  | "Client"
  | "Prospect"
  | "Internal"
  | "Project"
  | "Website";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

const smtpUser = process.env.NAMECHEAP_SMTP_USER;
const smtpPassword = process.env.NAMECHEAP_SMTP_PASSWORD;
const smtpFrom = process.env.NAMECHEAP_SMTP_FROM;

function getAdminClient() {
  if (!supabaseUrl || !supabaseSecretKey) {
    throw new Error("Supabase server environment variables are missing.");
  }

  return createSupabaseAdmin(supabaseUrl, supabaseSecretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

async function sendVertexEmail({
  to,
  recipientName,
  subject,
  content,
  htmlContent,
}: {
  to: string;
  recipientName?: string | null;
  subject: string;
  content: string;
  htmlContent?: string | null;
}) {
  const normalizedRecipient = to.trim();

  if (!normalizedRecipient) {
    throw new Error("Recipient email address is required.");
  }

  if (!smtpFrom || !smtpUser || !smtpPassword) {
    throw new Error(
      "Namecheap SMTP environment variables are missing. Check NAMECHEAP_SMTP_USER, NAMECHEAP_SMTP_PASSWORD, and NAMECHEAP_SMTP_FROM."
    );
  }

  const safeSubject = subject.trim() || "Message from Vertex Studio Works";
  const plainText = buildPlainText(htmlContent, content);
  const html = buildVertexEmailHtml({
    htmlContent,
    textContent: content,
  });

  await vertexMailTransporter.sendMail({
    from: smtpFrom,
    to: normalizedRecipient,
    replyTo: smtpUser,
    subject: safeSubject,
    text: plainText,
    html,
  });
}

async function getExternalRecipient(
  admin: ReturnType<typeof getAdminClient>,
  conversationId: string
) {
  const { data, error } = await admin
    .from("conversation_participants")
    .select("participant_email, participant_name, participant_type, user_id")
    .eq("conversation_id", conversationId)
    .is("user_id", null)
    .not("participant_email", "is", null)
    .limit(1)
    .maybeSingle();

  if (error) throw error;

  if (!data?.participant_email) return null;

  return {
    email: String(data.participant_email).trim(),
    name: data.participant_name ? String(data.participant_name).trim() : null,
    type: data.participant_type ? String(data.participant_type) : "External",
  };
}

async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}

async function getActiveProfile(userId: string) {
  const admin = getAdminClient();

  const { data, error } = await admin
    .from("profiles")
    .select("id, email, full_name, role, status, email_signature_html, email_signature_text")
    .eq("id", userId)
    .maybeSingle();

  if (error) throw error;

  if (!data || data.status !== "Active") {
    return null;
  }

  return data;
}

function normalizeRows(rows: any[]) {
  return rows.map((row) => ({
    ...row,
    client: Array.isArray(row.client) ? row.client[0] ?? null : row.client ?? null,
    project: Array.isArray(row.project)
      ? row.project[0] ?? null
      : row.project ?? null,
    website: Array.isArray(row.website)
      ? row.website[0] ?? null
      : row.website ?? null,
  }));
}

async function loadConversationMessages(admin: ReturnType<typeof getAdminClient>, conversationId: string) {
  const { data, error } = await admin
    .from("conversation_messages")
    .select(
      "id, conversation_id, sender_id, sender_name, sender_email, sender_type, content, html_content, message_type, is_read, read_at, created_at, updated_at"
    )
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });

  if (error) throw error;

  return data ?? [];
}

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    const profile = await getActiveProfile(user.id);

    if (!profile) {
      return NextResponse.json(
        { error: "Active profile required." },
        { status: 403 }
      );
    }

    const admin = getAdminClient();
    const { searchParams } = new URL(request.url);

    const conversationId = searchParams.get("conversation_id");
    const status = searchParams.get("status");
    const unread = searchParams.get("unread") === "true";
    const sent = searchParams.get("sent") === "true";
    const starred = searchParams.get("starred") === "true";
    const search = searchParams.get("search")?.trim();

    if (conversationId) {
      const { data: conversation, error: conversationError } = await admin
        .from("conversations")
        .select(
          `
          *,
          client:clients(id, name, company, email),
          project:projects(id, name),
          website:websites(id, name, domain)
        `
        )
        .eq("id", conversationId)
        .maybeSingle();

      if (conversationError) throw conversationError;

      if (!conversation) {
        return NextResponse.json(
          { error: "Conversation not found." },
          { status: 404 }
        );
      }

      const messages = await loadConversationMessages(admin, conversationId);

      return NextResponse.json({
        data: messages,
        conversation: normalizeRows([conversation])[0],
      });
    }

    let query = admin
      .from("conversations")
      .select(
        `
        *,
        client:clients(id, name, company, email),
        project:projects(id, name),
        website:websites(id, name, domain)
        `
      )
      .order("last_message_at", {
        ascending: false,
        nullsFirst: false,
      });

    if (status) {
      query = query.eq("status", status);
    }

    if (starred) {
      query = query.eq("is_starred", true);
    }

    const { data: conversationRows, error: conversationError } = await query;

    if (conversationError) throw conversationError;

    let conversations = normalizeRows(conversationRows ?? []);

    const conversationIds = conversations.map((conversation) => conversation.id);

    let messages: any[] = [];

    if (conversationIds.length > 0) {
      const { data: messageRows, error: messageError } = await admin
        .from("conversation_messages")
        .select(
          "id, conversation_id, sender_id, sender_name, sender_email, sender_type, content, html_content, message_type, is_read, read_at, created_at, updated_at"
        )
        .in("conversation_id", conversationIds)
        .order("created_at", { ascending: false });

      if (messageError) throw messageError;

      messages = messageRows ?? [];
    }

    const latestByConversation = new Map<string, any>();
    const unreadByConversation = new Map<string, number>();
    const sentConversationIds = new Set<string>();

    for (const message of messages) {
      if (!latestByConversation.has(message.conversation_id)) {
        latestByConversation.set(message.conversation_id, message);
      }

      if (message.sender_id === user.id) {
        sentConversationIds.add(message.conversation_id);
      }

      if (message.sender_id !== user.id && !message.is_read) {
        unreadByConversation.set(
          message.conversation_id,
          (unreadByConversation.get(message.conversation_id) ?? 0) + 1
        );
      }
    }

    conversations = conversations.map((conversation) => ({
      ...conversation,
      latest_message: latestByConversation.get(conversation.id) ?? null,
      unread_count: unreadByConversation.get(conversation.id) ?? 0,
    }));

    if (unread) {
      conversations = conversations.filter(
        (conversation) => Number(conversation.unread_count) > 0
      );
    }

    if (sent) {
      conversations = conversations.filter((conversation) =>
        sentConversationIds.has(conversation.id)
      );
    }

    if (search) {
      const q = search.toLowerCase();

      conversations = conversations.filter((conversation) => {
        const searchable = [
          conversation.subject,
          conversation.conversation_type,
          conversation.client?.name,
          conversation.client?.company,
          conversation.client?.email,
          conversation.project?.name,
          conversation.website?.name,
          conversation.website?.domain,
          conversation.latest_message?.content,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchable.includes(q);
      });
    }

    return NextResponse.json({ data: conversations });
  } catch (error) {
    console.error("GET /api/admin/messages error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to load messages.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    const profile = await getActiveProfile(user.id);

    if (!profile) {
      return NextResponse.json(
        { error: "Active profile required." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const action = body?.action;

    const admin = getAdminClient();

    if (action === "send") {
      const conversationId = String(body?.conversation_id ?? "").trim();
      const content = String(body?.content ?? "").trim();
      const htmlContent = String(body?.html_content ?? "").trim();

      if (!conversationId || !content) {
        return NextResponse.json(
          { error: "Conversation and message content are required." },
          { status: 400 }
        );
      }

      const { data: conversation, error: conversationError } = await admin
        .from("conversations")
        .select("id, status, subject")
        .eq("id", conversationId)
        .maybeSingle();

      if (conversationError) throw conversationError;

      if (!conversation) {
        return NextResponse.json(
          { error: "Conversation not found." },
          { status: 404 }
        );
      }

      if (conversation.status === "Archived") {
        return NextResponse.json(
          { error: "Archived conversations cannot receive new messages." },
          { status: 400 }
        );
      }

      const recipient = await getExternalRecipient(admin, conversationId);

      if (!recipient?.email) {
        return NextResponse.json(
          { error: "This conversation does not have an external recipient email address." },
          { status: 400 }
        );
      }

      try {
        await sendVertexEmail({
          to: recipient.email,
          recipientName: recipient.name,
          subject: conversation.subject || "Message from Vertex Studio Works",
          content,
          htmlContent: htmlContent || null,
        });
      } catch (emailError) {
        console.error("Namecheap SMTP send error:", emailError);
        return NextResponse.json(
          {
            error:
              emailError instanceof Error
                ? `Email was not sent: ${emailError.message}`
                : "Email was not sent.",
          },
          { status: 502 }
        );
      }

      const { data: message, error: messageError } = await admin
        .from("conversation_messages")
        .insert({
          conversation_id: conversationId,
          sender_id: user.id,
          sender_name: profile.full_name || user.email || "Vertex Team",
          sender_email: profile.email || user.email || "",
          sender_type: "Team",
          content,
          html_content: htmlContent || "",
          message_type: "Text",
          is_read: false,
        })
        .select(
          "id, conversation_id, sender_id, sender_name, sender_email, sender_type, content, html_content, message_type, is_read, read_at, created_at, updated_at"
        )
        .single();

      if (messageError) throw messageError;

      return NextResponse.json({ data: message }, { status: 201 });
    }

    if (action === "create_conversation") {
      const subject = String(body?.subject ?? "").trim();
      const content = String(body?.content ?? "").trim();
      const htmlContent = String(body?.html_content ?? "").trim();

      const conversationType = String(
        body?.conversation_type ?? "Client"
      ) as ConversationType;

      const allowedTypes: ConversationType[] = [
        "Client",
        "Prospect",
        "Internal",
        "Project",
        "Website",
      ];

      if (!allowedTypes.includes(conversationType)) {
        return NextResponse.json(
          { error: "Invalid conversation type." },
          { status: 400 }
        );
      }

      if (!subject || !content) {
        return NextResponse.json(
          { error: "Subject and message are required." },
          { status: 400 }
        );
      }

      const clientId = String(body?.client_id ?? "").trim() || null;
      const projectId = String(body?.project_id ?? "").trim() || null;
      const websiteId = String(body?.website_id ?? "").trim() || null;

      const { data: conversation, error: conversationError } = await admin
        .from("conversations")
        .insert({
          client_id: clientId,
          project_id: projectId,
          website_id: websiteId,
          subject,
          conversation_type: conversationType,
          status: "Open",
          last_message_at: new Date().toISOString(),
          created_by: user.id,
        })
        .select(
          `
          *,
          client:clients(id, name, company, email),
          project:projects(id, name),
          website:websites(id, name, domain)
          `
        )
        .single();

      if (conversationError) throw conversationError;

      const { error: participantError } = await admin
        .from("conversation_participants")
        .insert({
          conversation_id: conversation.id,
          user_id: user.id,
          participant_email: profile.email || user.email || null,
          participant_name: profile.full_name || user.email || "Vertex Team",
          participant_type: "Team",
        });

      if (participantError) {
        await admin.from("conversations").delete().eq("id", conversation.id);
        throw participantError;
      }

      const recipientName =
        String(body?.recipient_name ?? "").trim() || null;
      const recipientEmail =
        String(body?.recipient_email ?? "").trim() || null;

      if (recipientName || recipientEmail) {
        const { error: externalParticipantError } = await admin
          .from("conversation_participants")
          .insert({
            conversation_id: conversation.id,
            user_id: null,
            participant_email: recipientEmail,
            participant_name: recipientName,
            participant_type:
              conversationType === "Internal" ? "Team" : "Client",
          });

        if (externalParticipantError) {
          await admin
            .from("conversation_participants")
            .delete()
            .eq("conversation_id", conversation.id);

          await admin
            .from("conversations")
            .delete()
            .eq("id", conversation.id);

          throw externalParticipantError;
        }
      }

      if (conversationType !== "Internal") {
        if (!recipientEmail) {
          await admin
            .from("conversation_participants")
            .delete()
            .eq("conversation_id", conversation.id);

          await admin
            .from("conversations")
            .delete()
            .eq("id", conversation.id);

          return NextResponse.json(
            { error: "Recipient email is required for Client, Project, and Website conversations." },
            { status: 400 }
          );
        }

        try {
          await sendVertexEmail({
            to: recipientEmail,
            recipientName,
            subject,
            content,
            htmlContent: htmlContent || null,
          });
        } catch (emailError) {
          await admin
            .from("conversation_participants")
            .delete()
            .eq("conversation_id", conversation.id);

          await admin
            .from("conversations")
            .delete()
            .eq("id", conversation.id);

          console.error("Namecheap SMTP send error:", emailError);

          return NextResponse.json(
            {
              error:
                emailError instanceof Error
                  ? `Email was not sent: ${emailError.message}`
                  : "Email was not sent.",
            },
            { status: 502 }
          );
        }
      }

      const { error: firstMessageError } = await admin
        .from("conversation_messages")
        .insert({
          conversation_id: conversation.id,
          sender_id: user.id,
          sender_name: profile.full_name || user.email || "Vertex Team",
          sender_email: profile.email || user.email || "",
          sender_type: "Team",
          content,
          html_content: htmlContent || "",
          message_type: "Text",
          is_read: false,
        });

      if (firstMessageError) {
        await admin
          .from("conversation_participants")
          .delete()
          .eq("conversation_id", conversation.id);

        await admin
          .from("conversations")
          .delete()
          .eq("id", conversation.id);

        throw firstMessageError;
      }

      return NextResponse.json(
        {
          data: {
            ...normalizeRows([conversation])[0],
            unread_count: 0,
          },
        },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { error: "Invalid message action." },
      { status: 400 }
    );
  } catch (error) {
    console.error("POST /api/admin/messages error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to process message request.",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    const profile = await getActiveProfile(user.id);

    if (!profile) {
      return NextResponse.json(
        { error: "Active profile required." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const action = body?.action;
    const conversationId = String(body?.conversation_id ?? "").trim();

    if (!conversationId) {
      return NextResponse.json(
        { error: "Conversation ID is required." },
        { status: 400 }
      );
    }

    const admin = getAdminClient();

    if (action === "mark_read") {
      const now = new Date().toISOString();

      const { error: messageError } = await admin
        .from("conversation_messages")
        .update({
          is_read: true,
          read_at: now,
        })
        .eq("conversation_id", conversationId)
        .neq("sender_id", user.id)
        .eq("is_read", false);

      if (messageError) throw messageError;

      const { error: participantError } = await admin
        .from("conversation_participants")
        .update({
          last_read_at: now,
        })
        .eq("conversation_id", conversationId)
        .eq("user_id", user.id);

      if (participantError) throw participantError;

      return NextResponse.json({ success: true });
    }

    if (action === "toggle_star") {
      const starred = Boolean(body?.starred);

      const { data, error } = await admin
        .from("conversations")
        .update({
          is_starred: starred,
          updated_at: new Date().toISOString(),
        })
        .eq("id", conversationId)
        .select("id, is_starred")
        .single();

      if (error) throw error;

      return NextResponse.json({ data });
    }

    if (action === "archive") {
      const { data, error } = await admin
        .from("conversations")
        .update({
          status: "Archived",
          updated_at: new Date().toISOString(),
        })
        .eq("id", conversationId)
        .select("id, status")
        .single();

      if (error) throw error;

      return NextResponse.json({ data });
    }

    if (action === "close") {
      const { data, error } = await admin
        .from("conversations")
        .update({
          status: "Closed",
          updated_at: new Date().toISOString(),
        })
        .eq("id", conversationId)
        .select("id, status")
        .single();

      if (error) throw error;

      return NextResponse.json({ data });
    }

    return NextResponse.json(
      { error: "Invalid update action." },
      { status: 400 }
    );
  } catch (error) {
    console.error("PATCH /api/admin/messages error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to update message state.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    const profile = await getActiveProfile(user.id);

    if (!profile) {
      return NextResponse.json(
        { error: "Active profile required." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const action = String(body?.action ?? "delete_conversation");
    const admin = getAdminClient();

    if (action === "delete_message") {
      const messageId = String(body?.message_id ?? "").trim();

      if (!messageId) {
        return NextResponse.json(
          { error: "Message ID is required." },
          { status: 400 }
        );
      }

      const { data: message, error: messageLookupError } = await admin
        .from("conversation_messages")
        .select("id, conversation_id")
        .eq("id", messageId)
        .maybeSingle();

      if (messageLookupError) throw messageLookupError;

      if (!message) {
        return NextResponse.json(
          { error: "Message not found." },
          { status: 404 }
        );
      }

      const { error } = await admin
        .from("conversation_messages")
        .delete()
        .eq("id", messageId);

      if (error) throw error;

      const { data: latestMessage } = await admin
        .from("conversation_messages")
        .select("created_at")
        .eq("conversation_id", message.conversation_id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      const { error: conversationUpdateError } = await admin
        .from("conversations")
        .update({
          last_message_at: latestMessage?.created_at ?? null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", message.conversation_id);

      if (conversationUpdateError) throw conversationUpdateError;

      return NextResponse.json({ success: true });
    }

    if (action === "delete_conversation") {
      const conversationId = String(body?.conversation_id ?? "").trim();

      if (!conversationId) {
        return NextResponse.json(
          { error: "Conversation ID is required." },
          { status: 400 }
        );
      }

      const { error } = await admin
        .from("conversations")
        .delete()
        .eq("id", conversationId);

      if (error) throw error;

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "Invalid delete action." },
      { status: 400 }
    );
  } catch (error) {
    console.error("DELETE /api/admin/messages error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to delete message or conversation.",
      },
      { status: 500 }
    );
  }
}
