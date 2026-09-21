"use client";

import { useEffect, useRef, useState } from "react";
import {
  createInitialState,
  getVertexResponse,
} from "@/components/chatbot/vertex-intelligence";

const calendlyLink =
  "https://calendly.com/hello-vertexstudioworks/30min";

type Message = {
  id: number;
  sender: "bot" | "user";
  text: string;
};

const quickActions = [
  {
    label: "What do I need?",
    message: "I'm not sure what I need for my business.",
  },
  {
    label: "Our Pricing",
    message: "How much do your packages cost?",
  },
  {
    label: "Compare Platforms",
    message:
      "How does Vertex compare with Shopify, Wix, Squarespace, or GoDaddy?",
  },
  {
    label: "E-Commerce",
    message: "Can Vertex build an online store?",
  },
];

function renderMessageText(text: string, sender: Message["sender"]) {
  const urlPattern = /(https?:\/\/[^\s]+)/g;
  const lines = text.split("\n");

  return lines.map((line, lineIndex) => {
    const parts = line.split(urlPattern);

    return (
      <span key={`line-${lineIndex}`}>
        {parts.map((part, partIndex) => {
          const isUrl = /^https?:\/\/\S+$/i.test(part);

          if (!isUrl) {
            return (
              <span key={`text-${lineIndex}-${partIndex}`}>
                {part}
              </span>
            );
          }

          const cleanUrl = part.replace(/[),.!?]+$/, "");
          const trailing = part.slice(cleanUrl.length);

          return (
            <span key={`url-${lineIndex}-${partIndex}`}>
              <a
                href={cleanUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  sender === "bot"
                    ? "font-medium text-cyan-300 underline decoration-cyan-400/50 underline-offset-2 transition hover:text-cyan-200"
                    : "underline"
                }
              >
                {cleanUrl}
              </a>
              {trailing}
            </span>
          );
        })}
        {lineIndex < lines.length - 1 && <br />}
      </span>
    );
  });
}

const robotIcon = (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-full w-full"
    aria-hidden="true"
  >
    <circle cx="32" cy="32" r="30" fill="url(#robotBg)" />

    <path
      d="M32 13V8"
      stroke="#94A3B8"
      strokeWidth="3"
      strokeLinecap="round"
    />

    <circle cx="32" cy="7" r="3.5" fill="#E2E8F0" />

    <rect
      x="13"
      y="18"
      width="38"
      height="30"
      rx="11"
      fill="#E2E8F0"
    />

    <rect
      x="17"
      y="22"
      width="30"
      height="22"
      rx="8"
      fill="#0B162B"
    />

    <circle cx="25" cy="33" r="4" fill="#22D3EE" />
    <circle cx="39" cy="33" r="4" fill="#22D3EE" />

    <path
      d="M27 39C29.5 41 34.5 41 37 39"
      stroke="#38BDF8"
      strokeWidth="2.5"
      strokeLinecap="round"
    />

    <rect
      x="8"
      y="27"
      width="6"
      height="12"
      rx="3"
      fill="#94A3B8"
    />

    <rect
      x="50"
      y="27"
      width="6"
      height="12"
      rx="3"
      fill="#94A3B8"
    />

    <defs>
      <linearGradient
        id="robotBg"
        x1="4"
        y1="4"
        x2="60"
        y2="60"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#2563EB" />
        <stop offset="1" stopColor="#06B6D4" />
      </linearGradient>
    </defs>
  </svg>
);

function getResponse(message: string) {
  const lower = message.toLowerCase().trim();

  /*
   * =====================================================
   * NAME
   * =====================================================
   */

  if (
    lower.includes("what's your name") ||
    lower.includes("what is your name") ||
    lower.includes("whats your name") ||
    lower === "your name" ||
    lower === "name?"
  ) {
    return `I'm the Vertex Assistant 🤖`;
  }

  /*
   * =====================================================
   * GREETINGS
   * =====================================================
   */

  if (
    lower === "hi" ||
    lower === "hello" ||
    lower === "hey" ||
    lower === "hi!" ||
    lower === "hello!" ||
    lower === "hey!"
  ) {
    return `Hi! 👋 I'm the Vertex Assistant. How can I help?`;
  }

  /*
   * =====================================================
   * THANK YOU
   * =====================================================
   */

  if (
    lower === "thanks" ||
    lower === "thank you" ||
    lower === "thanks!" ||
    lower === "thank you!"
  ) {
    return `You're welcome! 🤖`;
  }

  /*
   * =====================================================
   * GOODBYE
   * =====================================================
   */

  if (
    lower === "bye" ||
    lower === "goodbye" ||
    lower === "see you"
  ) {
    return `Take care! 👋`;
  }

  /*
   * =====================================================
   * WHAT DO YOU DO?
   * =====================================================
   */

  if (
    lower.includes("what do you do") ||
    lower.includes("what can you do") ||
    lower.includes("what are you") ||
    lower.includes("how can you help")
  ) {
    return `I help answer questions about Vertex Studio, our services, pricing, websites, e-commerce, and business solutions. 🤖`;
  }

  /*
   * =====================================================
   * WHAT CAN VERTEX DO?
   * =====================================================
   */

  if (
    lower.includes("what can vertex do") ||
    lower.includes("what services") ||
    lower.includes("what do you offer") ||
    lower.includes("what does vertex offer") ||
    lower.includes("services do you offer")
  ) {
    return `We help businesses with websites, e-commerce, SEO, analytics, chatbots, business systems, and ongoing website care.

If you tell me what you're trying to build, I can point you in the right direction.`;
  }

  /*
   * =====================================================
   * WHO IS VERTEX?
   * =====================================================
   */

  if (
    lower.includes("what is vertex") ||
    lower.includes("who is vertex") ||
    lower.includes("about vertex") ||
    lower.includes("tell me about vertex")
  ) {
    return `Vertex Studio Works helps startups, entrepreneurs, and growing businesses build their digital presence.

Our idea is simple: We Build. We Grow. Together.`;
  }

  /*
   * =====================================================
   * NOT SURE WHAT THEY NEED
   * =====================================================
   */

  if (
    lower.includes("not sure") ||
    lower.includes("what do i need") ||
    lower.includes("what should i get") ||
    lower.includes("what should i choose") ||
    lower.includes("which package") ||
    lower.includes("recommend")
  ) {
    return `That's okay. You don't need to know everything yet.

Tell me what your business does and what you're trying to accomplish, and I'll help you figure out what makes sense.`;
  }

  /*
   * =====================================================
   * PRICING
   * =====================================================
   */

  if (
    lower.includes("pricing") ||
    lower.includes("price") ||
    lower.includes("cost") ||
    lower.includes("how much") ||
    lower.includes("packages") ||
    lower.includes("package")
  ) {
    return `Our current packages are:

Launch — $25 one-time
Scale — $50 one-time
Enterprise — Custom

Care plans start at $5/month.

We can also mix and match features depending on what your business needs.`;
  }

  /*
   * =====================================================
   * LAUNCH
   * =====================================================
   */

  if (
    lower.includes("launch") ||
    lower.includes("$25") ||
    lower.includes("25 dollar")
  ) {
    return `Launch is $25 one-time.

It's a good starting point for businesses that mainly need a professional online presence without unnecessary complexity.

You can always expand later.`;
  }

  /*
   * =====================================================
   * SCALE
   * =====================================================
   */

  if (
    lower.includes("scale") ||
    lower.includes("$50") ||
    lower.includes("50 dollar")
  ) {
    return `Scale is $50 one-time.

It's designed for businesses that want more room for functionality and growth.

If you're unsure between Launch and Scale, tell me what you're building and I'll help you choose.`;
  }

  /*
   * =====================================================
   * ENTERPRISE
   * =====================================================
   */

  if (
    lower.includes("enterprise") ||
    lower.includes("custom development") ||
    lower.includes("custom system")
  ) {
    return `Enterprise is custom.

It's intended for larger or more complex projects that need custom functionality, business systems, advanced e-commerce, dashboards, automation, or integrations.`;
  }

  /*
   * =====================================================
   * ADD-ONS / FREE SMALL REQUESTS
   * =====================================================
   */

  if (
    lower.includes("add-on") ||
    lower.includes("add on") ||
    lower.includes("addon") ||
    lower.includes("extra") ||
    lower.includes("additional feature") ||
    lower.includes("free feature") ||
    lower.includes("free add")
  ) {
    return `We're pretty flexible with small additions.

If something is simple and doesn't require significant extra development, our creator may include it at no additional cost when reasonable.

Larger custom features are scoped separately so you know what you're paying for.`;
  }

  /*
   * =====================================================
   * E-COMMERCE
   * =====================================================
   */

  if (
    lower.includes("ecommerce") ||
    lower.includes("e-commerce") ||
    lower.includes("online store") ||
    lower.includes("online shop") ||
    lower.includes("sell online")
  ) {
    return `Yes! 🛒 We can build e-commerce websites.

Depending on your needs, that can include products, carts, checkout, payments, orders, inventory, customers, and admin functionality.

Tell me what you're planning to sell and I can help you figure out what you'd need.`;
  }

  /*
   * =====================================================
   * CHATBOT
   * =====================================================
   */

  if (
    lower.includes("chatbot") ||
    lower.includes("chat bot") ||
    lower.includes("ai assistant")
  ) {
    return `Yes! We can add chatbot functionality to your website.

It can help visitors with questions, pricing, products, lead generation, and booking calls.

More advanced AI integrations depend on the project.`;
  }

  /*
   * =====================================================
   * SEO
   * =====================================================
   */

  if (
    lower.includes("seo") ||
    lower.includes("search engine") ||
    lower.includes("google ranking") ||
    lower.includes("rank on google")
  ) {
    return `Yes! SEO can be part of a Vertex project.

We can help with SEO foundations, technical setup, search-friendly content structure, analytics, and search performance tools.

SEO is a long-term process, so we don't promise guaranteed rankings.`;
  }

  /*
   * =====================================================
   * ANALYTICS
   * =====================================================
   */

  if (
    lower.includes("analytics") ||
    lower.includes("track visitors") ||
    lower.includes("tracking") ||
    lower.includes("google analytics")
  ) {
    return `Yes. We can add analytics so you can understand things like visitors, traffic sources, leads, and website performance.`;
  }

  /*
   * =====================================================
   * BOOKING
   * =====================================================
   */

  if (
    lower.includes("booking") ||
    lower.includes("appointment") ||
    lower.includes("calendly")
  ) {
    return `Yes! We can integrate booking tools so customers can schedule appointments or consultations directly from your website.`;
  }

  /*
   * =====================================================
   * WEBSITE
   * =====================================================
   */

  if (
    lower.includes("website") ||
    lower.includes("web site") ||
    lower.includes("web design") ||
    lower.includes("web development")
  ) {
    return `Absolutely. We build custom websites around your business and goals.

Our current website packages start at $25 one-time.

Tell me what type of business you have and I'll help you figure out a good starting point.`;
  }

  /*
   * =====================================================
   * GROWTH / LEADS
   * =====================================================
   */

  if (
    lower.includes("grow") ||
    lower.includes("more customers") ||
    lower.includes("more leads") ||
    lower.includes("generate leads") ||
    lower.includes("sales") ||
    lower.includes("make money") ||
    lower.includes("earn money")
  ) {
    return `That's one of the things we focus on.

We can build websites and digital tools designed to help with leads, bookings, sales, analytics, SEO, and customer experiences.

We can't guarantee revenue, but we can build around your business goals.`;
  }

  /*
   * =====================================================
   * STARTUPS
   * =====================================================
   */

  if (
    lower.includes("startup") ||
    lower.includes("start up") ||
    lower.includes("new business") ||
    lower.includes("starting a business")
  ) {
    return `Absolutely. Startups are one of the businesses we want to help.

You don't have to build everything at once.

Start with what you need now, then add more as your business grows.`;
  }

  /*
   * =====================================================
   * BUDGET
   * =====================================================
   */

  if (
    lower.includes("budget") ||
    lower.includes("affordable") ||
    lower.includes("cheap") ||
    lower.includes("limited budget")
  ) {
    return `We can work around your budget.

Launch starts at $25 and Scale starts at $50.

Tell me your budget and what you're trying to accomplish, and I'll suggest a practical starting point.`;
  }

  /*
   * =====================================================
   * CARE
   * =====================================================
   */

  if (
    lower.includes("care") ||
    lower.includes("maintenance") ||
    lower.includes("support") ||
    lower.includes("updates")
  ) {
    return `Our Care plans currently start at $5/month.

We have:

Starter — $5/month
Growth — $10/month
Business — $15/month

Tell me what kind of support you need and I can help you choose.`;
  }

  /*
   * =====================================================
   * PLATFORM COMPARISON
   * =====================================================
   */

  if (
    lower.includes("shopify") ||
    lower.includes("wix") ||
    lower.includes("squarespace") ||
    lower.includes("godaddy") ||
    lower.includes("go daddy") ||
    lower.includes("compare") ||
    lower.includes("competitor") ||
    lower.includes("other platform")
  ) {
    return `Sure! The main difference is the approach.

Shopify is heavily focused on e-commerce and operates around recurring platform plans.

Wix and Squarespace are website/business platforms that also use recurring plans.

GoDaddy offers website-building and business tools through its own plans.

Vertex is different in that our current Launch and Scale website packages are one-time project prices, with optional Care plans afterward.

The right choice depends on what you're trying to build.`;
  }

  /*
   * =====================================================
   * FREE CHAT
   * =====================================================
   */

  if (
    lower.includes("is this free") ||
    lower.includes("free chat") ||
    lower.includes("do i have to pay to chat")
  ) {
    return `Yep! 🤖 The chat is free.

You can ask questions without any commitment.`;
  }

  /*
   * =====================================================
   * BOOK A CALL
   * =====================================================
   */

  if (
    lower.includes("talk to someone") ||
    lower.includes("talk to a human") ||
    lower.includes("human") ||
    lower.includes("book a call") ||
    lower.includes("contact you")
  ) {
    return `Absolutely. You can book a call with Vertex here:

${calendlyLink}`;
  }

  /*
   * =====================================================
   * DEFAULT
   * =====================================================
   */

  return `I'm the Vertex Assistant 🤖 How can I help?`;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "bot",
      text: `Hi! 👋 I'm the Vertex Assistant.

How can I help?`,
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Local Vertex Intelligence state.
  // This keeps the assistant contextual without calling an external AI API.
  const [vertexState, setVertexState] = useState(
    createInitialState()
  );

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  // Keep the chat ready for the next message. After the assistant
  // finishes replying, the input automatically gets focus again so
  // visitors can continue typing without clicking the box.
  useEffect(() => {
    if (isOpen && !isTyping) {
      window.requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [isOpen, isTyping, messages.length]);

  const sendMessage = (message?: string) => {
    const trimmedMessage = (message ?? input).trim();

    if (!trimmedMessage || isTyping) {
      return;
    }

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: trimmedMessage,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsTyping(true);

    // The free local intelligence engine runs entirely in the browser.
    // No OpenAI request, API key, or external AI bill is involved.
    window.setTimeout(() => {
      const result = getVertexResponse(
        trimmedMessage,
        vertexState
      );

      const botResponse: Message = {
        id: Date.now() + 1,
        sender: "bot",
        text: result.text,
      };

      setVertexState(result.state);
      setMessages((current) => [...current, botResponse]);
      setIsTyping(false);
    }, 450);
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    sendMessage();
  };

  return (
    <>
      {/* =====================================================
          CHAT WINDOW
      ===================================================== */}

      {isOpen && (
        <div className="fixed bottom-24 right-5 z-[100] flex h-[min(720px,calc(100vh-120px))] w-[calc(100vw-40px)] max-w-[460px] flex-col overflow-hidden rounded-[28px] border border-cyan-400/20 bg-[#070d1d]/[0.98] shadow-2xl shadow-blue-950/60 backdrop-blur-xl">
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-gradient-to-r from-blue-600/15 via-transparent to-cyan-500/10 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 shrink-0 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 p-[2px] shadow-lg shadow-blue-500/20">
                {robotIcon}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-white">
                    Vertex Assistant
                  </p>

                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                </div>

                <p className="text-[11px] text-slate-500">
                  Websites • E-Commerce • Business Systems
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close Vertex Assistant"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-slate-400 transition hover:bg-white/10 hover:text-white"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-5">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                {message.sender === "bot" && (
                  <div className="mr-2 mt-1 h-7 w-7 shrink-0">
                    {robotIcon}
                  </div>
                )}

                <div
                  className={`
                    max-w-[86%]
                    whitespace-pre-line
                    rounded-2xl
                    px-4
                    py-3
                    text-sm
                    leading-6
                    ${
                      message.sender === "user"
                        ? "rounded-br-md bg-gradient-to-r from-blue-600 to-blue-500 text-white"
                        : "rounded-bl-md border border-white/10 bg-[#111a2d] text-slate-300"
                    }
                  `}
                >
                  {renderMessageText(message.text, message.sender)}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center">
                <div className="mr-2 h-7 w-7 shrink-0">
                  {robotIcon}
                </div>

                <div className="rounded-2xl rounded-bl-md border border-white/10 bg-[#111a2d] px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400" />

                    <span
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400"
                      style={{ animationDelay: "120ms" }}
                    />

                    <span
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400"
                      style={{ animationDelay: "240ms" }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="shrink-0 border-t border-white/10 px-4 pb-3 pt-3 sm:px-5">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Quick questions
            </p>

            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  onClick={() => sendMessage(action.message)}
                  disabled={isTyping}
                  className="rounded-xl border border-white/10 bg-white/[0.025] px-3 py-2.5 text-left text-xs font-medium text-slate-300 transition hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="shrink-0 px-4 pb-3 sm:px-5">
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 rounded-2xl border border-cyan-400/40 bg-[#0a1427] p-1.5 shadow-[0_0_30px_rgba(34,211,238,0.08)] transition focus-within:border-cyan-400/70"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask anything about Vertex..."
                disabled={isTyping}
                className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-slate-600 disabled:cursor-not-allowed"
                aria-label="Ask Vertex Assistant a question"
              />

              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                aria-label="Send message"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20 transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path
                    d="M21 3L10.5 13.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M21 3L14.3 21L10.5 13.5L3 9.7L21 3Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>

            <div className="flex items-center justify-center gap-2 py-2 text-[10px] text-slate-600">
              <span>Free to ask</span>
              <span>•</span>
              <span>Instant answers</span>
              <span>•</span>
              <span>No commitment</span>
            </div>

            <a
              href={calendlyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/20"
            >
              Talk to Vertex
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      )}

      {/* =====================================================
          FLOATING CHAT BUTTON
      ===================================================== */}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-label={
          isOpen
            ? "Close Vertex Assistant"
            : "Open Vertex Assistant"
        }
        className="fixed bottom-5 right-5 z-[101] flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 p-[3px] shadow-xl shadow-blue-500/30 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/40"
      >
        <div className="flex h-full w-full items-center justify-center rounded-full bg-[#081225] p-2.5">
          {robotIcon}
        </div>

        {!isOpen && (
          <span
            className="absolute right-0 top-0 h-3.5 w-3.5 rounded-full border-2 border-[#050816] bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]"
            aria-hidden="true"
          />
        )}
      </button>

      {/* Free Chat Label */}
      {!isOpen && (
        <div className="fixed bottom-7 right-[92px] z-[100] hidden rounded-full border border-cyan-400/20 bg-[#0a1427]/95 px-4 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur-md sm:block">
          Chat for Free
        </div>
      )}
    </>
  );
}