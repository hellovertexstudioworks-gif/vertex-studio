import Link from "next/link";
import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/sections/Chatbot";

export const metadata: Metadata = {
  title:
    "What Is CRM Integration and Why Does Your Website Need It? | Vertex Studio Works",
  description:
    "Learn what CRM integration is, how websites can capture and organize leads, and how connecting your website to a CRM can improve business follow-up.",
  alternates: {
    canonical:
      "https://www.vertexstudioworks.com/resources/crm-website-integration",
  },
  openGraph: {
    title: "What Is CRM Integration and Why Does Your Website Need It?",
    description:
      "Learn how connecting your website to a CRM can help capture, organize, and manage business leads.",
    url: "https://www.vertexstudioworks.com/resources/crm-website-integration",
    siteName: "Vertex Studio Works",
    type: "article",
  },
};

const benefits = [
  {
    title: "Capture leads automatically",
    description:
      "Website forms can send new inquiries directly into a CRM instead of relying on someone to manually copy information from emails or spreadsheets.",
  },
  {
    title: "Keep customer information organized",
    description:
      "A CRM can keep contact details, inquiries, notes, activities, and other customer information organized in one place.",
  },
  {
    title: "Improve follow-up",
    description:
      "When leads are captured consistently, businesses can create a clearer process for responding and following up with potential customers.",
  },
  {
    title: "Reduce repetitive work",
    description:
      "Automations can reduce manual tasks such as copying contact information, sending notifications, or creating follow-up tasks.",
  },
  {
    title: "Understand where leads come from",
    description:
      "Depending on the CRM and setup, businesses can track information about lead sources and customer interactions.",
  },
  {
    title: "Create a better customer journey",
    description:
      "Connecting website activity with other business tools can help create a smoother journey from first inquiry to customer.",
  },
];

const examples = [
  "Contact forms",
  "Quote request forms",
  "Appointment requests",
  "Newsletter signups",
  "Lead-generation landing pages",
  "Website chat",
  "Booking systems",
  "E-commerce inquiries",
];

const faqs = [
  {
    question: "What is CRM integration?",
    answer:
      "CRM integration connects a website or other business system with a customer relationship management platform so information can move between systems more efficiently.",
  },
  {
    question: "Does every business website need a CRM?",
    answer:
      "No. A simple website may not need a CRM. CRM integration becomes more useful when a business receives regular inquiries, manages sales opportunities, needs structured follow-up, or wants to organize customer information.",
  },
  {
    question: "Can a website form connect to a CRM?",
    answer:
      "Yes. Depending on the CRM and available tools, forms can connect through native integrations, APIs, webhooks, automation platforms, or custom development.",
  },
  {
    question: "Can CRM integration be added to an existing website?",
    answer:
      "In many cases, yes. The exact approach depends on the existing website, form system, CRM, APIs, and the workflow the business wants to create.",
  },
  {
    question: "Is CRM integration included with every website?",
    answer:
      "Not necessarily. Basic websites can include standard contact forms, while advanced CRM connections and custom workflows are usually scoped separately based on the tools and requirements involved.",
  },
];

export default function CRMWebsiteIntegrationPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "What Is CRM Integration and Why Does Your Website Need It?",
    description:
      "Learn how connecting a website to a CRM can help businesses capture, organize, and manage leads.",
    author: {
      "@type": "Organization",
      name: "Vertex Studio Works",
      url: "https://www.vertexstudioworks.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Vertex Studio Works",
      url: "https://www.vertexstudioworks.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id":
        "https://www.vertexstudioworks.com/resources/crm-website-integration",
    },
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050816] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <Navbar />

      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-12%] top-[8%] h-[420px] w-[420px] rounded-full bg-blue-600/10 blur-[130px]" />
        <div className="absolute right-[-10%] top-[30%] h-[500px] w-[500px] rounded-full bg-cyan-500/8 blur-[150px]" />
        <div className="absolute bottom-[5%] left-[35%] h-[380px] w-[380px] rounded-full bg-blue-500/6 blur-[140px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* Hero */}
      <header className="relative border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-28 sm:px-8 lg:pb-28 lg:pt-36">
          <Link
            href="/resources"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-white/60 backdrop-blur-xl transition hover:border-blue-400/30 hover:bg-blue-400/[0.06] hover:text-blue-300"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            Back to Resources
          </Link>

          <div className="mt-10 max-w-5xl">
            <div className="mb-6 flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 font-semibold text-blue-300">
                CRM & Integrations
              </span>

              <span className="text-white/20">•</span>

              <span className="text-white/45">September 2026</span>

              <span className="text-white/20">•</span>

              <span className="text-white/45">7 min read</span>
            </div>

            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-400">
              Business Systems
            </p>

            <h1 className="max-w-5xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-7xl">
              What Is CRM Integration and{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                Why Does Your Website Need It?
              </span>
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-white/60 sm:text-xl">
              Learn how connecting your website to a CRM can help capture leads,
              organize customer information, improve follow-up, and create a
              better business workflow.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {[
                "CRM",
                "Lead Generation",
                "Automation",
                "Business Systems",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-xs font-medium text-white/55 backdrop-blur-xl"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      <article className="relative mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:py-24">
        {/* Introduction */}
        <section className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-7 shadow-2xl shadow-blue-950/10 backdrop-blur-xl sm:p-10">
            <p className="text-xl leading-9 text-white/75">
              A website can do much more than provide information about a
              business. It can become the first step in a customer journey by
              collecting inquiries, booking requests, quote requests, and
              other forms of customer interest.
            </p>

            <p className="mt-6 text-lg leading-8 text-white/60">
              The challenge begins when those inquiries have to be managed
              manually. Messages can end up across email inboxes, spreadsheets,
              social media accounts, and different business tools.
            </p>

            <p className="mt-6 text-lg leading-8 text-white/60">
              This is where connecting a website to a{" "}
              <strong className="text-white">
                Customer Relationship Management (CRM)
              </strong>{" "}
              system can become useful.
            </p>
          </div>
        </section>

        {/* Contents */}
        <aside className="mx-auto my-14 max-w-4xl rounded-3xl border border-blue-400/15 bg-gradient-to-br from-blue-400/[0.07] to-white/[0.025] p-6 shadow-xl shadow-blue-950/10 backdrop-blur-xl sm:p-8">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10 text-sm font-bold text-blue-300">
              #
            </span>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
                Quick navigation
              </p>
              <h2 className="mt-1 text-lg font-bold">In this guide</h2>
            </div>
          </div>

          <ol className="mt-7 grid gap-3 sm:grid-cols-2">
            {[
              ["what-is-crm", "01", "What is a CRM?"],
              ["integration", "02", "What does CRM integration mean?"],
              ["how-it-works", "03", "How website-to-CRM integration works"],
              ["benefits", "04", "Benefits of connecting your website to a CRM"],
              ["examples", "05", "What can be connected?"],
              ["workflow", "06", "Example lead workflow"],
              ["vertex", "07", "CRM integrations with Vertex Studio Works"],
              ["faq", "08", "Frequently asked questions"],
            ].map(([href, number, label]) => (
              <li key={href}>
                <a
                  href={`#${href}`}
                  className="group flex items-start gap-3 rounded-2xl border border-white/5 bg-white/[0.025] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-blue-400/20 hover:bg-blue-400/[0.05]"
                >
                  <span className="text-xs font-bold text-blue-400">
                    {number}
                  </span>

                  <span className="text-sm leading-6 text-white/60 transition group-hover:text-white/90">
                    {label}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </aside>

        {/* What is CRM */}
        <section id="what-is-crm" className="mx-auto max-w-5xl scroll-mt-28">
          <SectionHeading
            eyebrow="01 / Foundation"
            title="What is a CRM?"
            description="CRM stands for Customer Relationship Management."
          />

          <div className="mt-8 grid gap-5 lg:grid-cols-[1.4fr_0.6fr]">
            <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-7 backdrop-blur-xl sm:p-8">
              <p className="text-base leading-8 text-white/60">
                A CRM platform helps businesses organize information and
                interactions related to prospects and customers.
              </p>

              <p className="mt-5 text-base leading-8 text-white/60">
                Depending on the platform, a CRM can store contact information,
                track conversations, manage sales opportunities, create tasks,
                automate follow-ups, and provide reporting.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-blue-400/20 bg-gradient-to-br from-blue-400/[0.08] to-cyan-400/[0.04] p-7 backdrop-blur-xl sm:p-8">
              <div className="absolute right-[-30px] top-[-30px] h-32 w-32 rounded-full bg-blue-500/15 blur-3xl" />

              <div className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10 text-blue-300">
                  CRM
                </div>

                <p className="mt-6 text-lg font-semibold leading-8 text-white">
                  A CRM is essentially a system for helping a business manage
                  relationships and interactions with customers and prospects.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Integration */}
        <section id="integration" className="mx-auto mt-24 max-w-5xl scroll-mt-28">
          <SectionHeading
            eyebrow="02 / Integration"
            title="What does CRM integration mean?"
            description="CRM integration means connecting your website and CRM so that relevant information can move between them."
          />

          <div className="mt-9 rounded-[2rem] border border-blue-400/20 bg-gradient-to-br from-blue-500/[0.08] via-white/[0.025] to-cyan-400/[0.04] p-7 shadow-xl shadow-blue-950/10 backdrop-blur-xl sm:p-10">
            <p className="text-lg leading-8 text-white/65">
              For example, a visitor could complete a contact form on a
              website. Instead of that inquiry existing only as an email, the
              information could be sent to a CRM where the business can
              organize the lead and begin its follow-up process.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {["Website", "Form", "Integration", "CRM", "Follow-up"].map(
                (item, index) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/70">
                      {item}
                    </span>

                    {index < 4 && (
                      <span className="hidden text-blue-400/60 sm:inline">
                        →
                      </span>
                    )}
                  </div>
                ),
              )}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section
          id="how-it-works"
          className="mx-auto mt-24 max-w-5xl scroll-mt-28"
        >
          <SectionHeading
            eyebrow="03 / Process"
            title="How website-to-CRM integration works"
            description="The technical implementation depends on the website and CRM platform, but the general process can look like this."
          />

          <div className="relative mt-9 space-y-4">
            <div className="pointer-events-none absolute bottom-10 left-[27px] top-10 hidden border-l border-dashed border-blue-400/20 sm:block" />

            {[
              {
                number: "01",
                title: "A visitor takes action",
                description:
                  "The visitor submits a form, requests a quote, books an appointment, or completes another action.",
              },
              {
                number: "02",
                title: "The website collects the information",
                description:
                  "The website captures the information that the business has requested, such as name, email, phone number, and inquiry details.",
              },
              {
                number: "03",
                title: "The information reaches the CRM",
                description:
                  "An integration, API, webhook, or automation sends the relevant information to the CRM.",
              },
              {
                number: "04",
                title: "The business follows up",
                description:
                  "The team can review the lead, assign it, contact the prospect, and continue the customer journey.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="group relative flex gap-5 rounded-3xl border border-white/10 bg-white/[0.025] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-400/20 hover:bg-white/[0.04] sm:p-7"
              >
                <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-400/10 text-xs font-bold text-blue-300">
                  {step.number}
                </span>

                <div>
                  <h3 className="text-lg font-bold">{step.title}</h3>

                  <p className="mt-2 text-sm leading-7 text-white/55">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section id="benefits" className="mx-auto mt-24 max-w-5xl scroll-mt-28">
          <SectionHeading
            eyebrow="04 / Benefits"
            title="Benefits of connecting your website to a CRM"
            description="A well-designed integration can reduce manual work while creating a clearer process for managing inquiries."
          />

          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-400/20 hover:bg-white/[0.04]"
              >
                <div className="absolute right-[-40px] top-[-40px] h-28 w-28 rounded-full bg-blue-500/8 blur-3xl transition group-hover:bg-blue-400/15" />

                <div className="relative">
                  <span className="text-xs font-bold tracking-[0.18em] text-blue-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="mt-5 text-lg font-bold">
                    {benefit.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-white/55">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Examples */}
        <section id="examples" className="mx-auto mt-24 max-w-5xl scroll-mt-28">
          <SectionHeading
            eyebrow="05 / Connections"
            title="What can be connected to a CRM?"
            description="The right integration depends on how the business generates and manages customer interactions."
          />

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {examples.map((example, index) => (
              <div
                key={example}
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-400/20 hover:bg-blue-400/[0.04]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-400/15 bg-blue-400/10 text-xs font-bold text-blue-300">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="text-sm font-medium text-white/65 transition group-hover:text-white/90">
                  {example}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Workflow */}
        <section id="workflow" className="mx-auto mt-24 max-w-5xl scroll-mt-28">
          <SectionHeading
            eyebrow="06 / Lead journey"
            title="An example lead-generation workflow"
            description="Imagine a local service business that wants to generate more quote requests from its website."
          />

          <div className="relative mt-9 overflow-hidden rounded-[2rem] border border-blue-400/20 bg-gradient-to-br from-blue-500/[0.08] via-white/[0.025] to-cyan-400/[0.04] shadow-2xl shadow-blue-950/20 backdrop-blur-xl">
            <div className="pointer-events-none absolute right-[-100px] top-[-100px] h-72 w-72 rounded-full bg-blue-500/15 blur-[100px]" />

            <div className="relative divide-y divide-white/10">
              {[
                ["1", "Visitor", "A potential customer visits the website."],
                ["2", "Landing Page", "The visitor learns about the service."],
                ["3", "Form", "The visitor requests a quote."],
                ["4", "CRM", "The inquiry is recorded as a new lead."],
                ["5", "Follow-up", "The business contacts the prospect."],
                ["6", "Customer", "The lead moves through the sales process."],
              ].map(([number, title, description]) => (
                <div
                  key={number}
                  className="group grid gap-4 p-5 transition hover:bg-white/[0.025] sm:grid-cols-[50px_150px_1fr] sm:items-center"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10 text-xs font-bold text-blue-300">
                    {number}
                  </span>

                  <span className="font-semibold text-white/90">
                    {title}
                  </span>

                  <span className="text-sm leading-6 text-white/50">
                    {description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vertex */}
        <section id="vertex" className="mx-auto mt-24 max-w-5xl scroll-mt-28">
          <div className="relative overflow-hidden rounded-[2rem] border border-blue-400/20 bg-gradient-to-br from-blue-500/[0.10] via-white/[0.035] to-cyan-400/[0.06] p-8 shadow-2xl shadow-blue-950/20 backdrop-blur-xl sm:p-10 lg:p-12">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-500/15 blur-[90px]" />
            <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-[90px]" />

            <div className="relative">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                Vertex Studio Works
              </p>

              <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Websites that can connect to your{" "}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  business workflow
                </span>
              </h2>

              <p className="mt-5 max-w-3xl text-base leading-8 text-white/60 sm:text-lg">
                At Vertex Studio Works, we can build websites with lead
                generation and business integrations in mind. Depending on the
                project, this can include CRM connections, forms, analytics,
                scheduling tools, email, WhatsApp, and other third-party
                services.
              </p>

              <p className="mt-5 max-w-3xl text-base leading-8 text-white/60">
                Basic website packages focus on the core website experience.
                Advanced CRM systems, custom workflows, APIs, and complex
                integrations can be scoped separately based on the business
                requirements.
              </p>

              <div className="mt-9 grid gap-4 sm:grid-cols-2">
                <PricingCard
                  label="Launch"
                  price="$39"
                  description="Up to 5 custom pages for startups, entrepreneurs, and small businesses."
                />

                <PricingCard
                  label="Scale"
                  price="$79"
                  description="A larger website solution for growing businesses that need additional functionality, lead generation, engagement, or e-commerce capabilities."
                  featured
                />
              </div>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/#pricing"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold shadow-lg shadow-blue-950/30 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-500"
                >
                  View Our Packages
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>

                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.02] px-6 py-3 text-sm font-semibold transition duration-300 hover:border-blue-400/30 hover:bg-blue-400/[0.05]"
                >
                  Discuss Your Project
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto mt-24 max-w-5xl scroll-mt-28">
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently asked questions"
            description="A few common questions about CRM integration and connecting websites to business systems."
          />

          <div className="mt-9 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] backdrop-blur-xl">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group border-b border-white/10 p-6 last:border-b-0 sm:p-7"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-semibold text-white/90">
                  <span>{faq.question}</span>

                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/50 transition duration-300 group-open:rotate-45 group-open:border-blue-400/20 group-open:text-blue-400">
                    +
                  </span>
                </summary>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-white/55">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative mx-auto mt-24 max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] p-8 text-center shadow-2xl shadow-black/10 backdrop-blur-xl sm:p-12">
          <div className="pointer-events-none absolute left-1/2 top-[-100px] h-64 w-64 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[90px]" />

          <div className="relative">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Business systems
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to connect your website to your business?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/55">
              Tell us what you&apos;re trying to accomplish and we&apos;ll help
              you determine the right website and integration approach.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold shadow-lg shadow-blue-950/20 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-500"
              >
                Start a Project
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                href="/work"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold transition duration-300 hover:border-blue-400/30 hover:bg-white/5"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </section>
      </article>

      <Footer />
      <Chatbot />
    </main>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
        {eyebrow}
      </p>

      <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      <p className="mt-5 text-base leading-8 text-white/55 sm:text-lg">
        {description}
      </p>
    </div>
  );
}

function PricingCard({
  label,
  price,
  description,
  featured = false,
}: {
  label: string;
  price: string;
  description: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`group rounded-3xl border p-6 transition duration-300 hover:-translate-y-1 ${
        featured
          ? "border-blue-400/30 bg-blue-400/[0.07] shadow-lg shadow-blue-950/20"
          : "border-white/10 bg-[#050816]/50"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <p
          className={`text-sm font-semibold uppercase tracking-[0.16em] ${
            featured ? "text-blue-400" : "text-white/50"
          }`}
        >
          {label}
        </p>

        {featured && (
          <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-300">
            Popular
          </span>
        )}
      </div>

      <p className="mt-3 text-4xl font-bold text-blue-400">{price}</p>

      <p className="mt-3 text-sm leading-6 text-white/55">{description}</p>
    </div>
  );
}