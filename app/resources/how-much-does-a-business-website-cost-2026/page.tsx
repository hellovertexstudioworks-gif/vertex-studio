import Link from "next/link";
import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/sections/Chatbot";

export const metadata: Metadata = {
  title: "How Much Does a Business Website Cost in 2026? | Vertex Studio Works",
  description:
    "Learn how much a business website can cost in 2026, what affects website pricing, and what to consider when hiring a professional website developer.",
  alternates: {
    canonical:
      "https://www.vertexstudioworks.com/resources/how-much-does-a-business-website-cost-2026",
  },
  openGraph: {
    title: "How Much Does a Business Website Cost in 2026?",
    description:
      "A practical guide to business website pricing, features, development costs, and choosing the right website solution.",
    url: "https://www.vertexstudioworks.com/resources/how-much-does-a-business-website-cost-2026",
    siteName: "Vertex Studio Works",
    type: "article",
  },
};

const faqs = [
  {
    question: "How much does a 5-page business website cost?",
    answer:
      "The cost depends on the design, functionality, content, integrations, and level of customization required. A simple business website is generally less expensive than a website requiring e-commerce, advanced CRM functionality, custom dashboards, or other complex features.",
  },
  {
    question: "How long does it take to build a business website?",
    answer:
      "A straightforward business website can often be completed within several days to a couple of weeks, depending on the scope, content availability, revisions, and integrations required.",
  },
  {
    question: "Does a website package include SEO?",
    answer:
      "A professional website package can include basic on-page SEO such as page titles, descriptions, headings, clean URLs, mobile responsiveness, and technical fundamentals. Ongoing SEO is a separate process involving content, optimization, authority building, and performance monitoring.",
  },
  {
    question: "Can a business website connect to a CRM?",
    answer:
      "Yes. Websites can connect to CRM platforms through forms, APIs, automation tools, webhooks, and third-party integrations. This can help businesses capture and organize leads more efficiently.",
  },
  {
    question: "Do I need ongoing website maintenance?",
    answer:
      "Not every business needs the same level of maintenance. Ongoing care can be useful for content updates, performance checks, security-related updates, troubleshooting, and continued website improvements.",
  },
];

const websiteTypes = [
  [
    "Landing page",
    "One focused page designed around a specific goal.",
  ],
  [
    "Small business website",
    "Usually several pages covering services, about, contact, and related information.",
  ],
  [
    "Larger business website",
    "More pages, content, functionality, and integrations.",
  ],
  [
    "E-commerce website",
    "Products, checkout, payments, orders, customer accounts, and related functionality.",
  ],
  [
    "Custom website",
    "Specialized functionality, dashboards, CRM systems, APIs, or other custom requirements.",
  ],
];

const costFactors = [
  [
    "Design",
    "Custom layouts, branding, UI/UX, and visual direction.",
  ],
  [
    "Content",
    "Copywriting, images, videos, product information, and other assets.",
  ],
  [
    "Functionality",
    "Forms, booking systems, search, dashboards, e-commerce, and other features.",
  ],
  [
    "Integrations",
    "CRM, email, analytics, calendars, messaging, payment systems, and third-party tools.",
  ],
  [
    "SEO",
    "Technical setup, metadata, structure, performance, and content considerations.",
  ],
  [
    "Maintenance",
    "Updates, content changes, monitoring, support, and ongoing improvements.",
  ],
];

const includedFeatures = [
  "Responsive design for desktop, tablet, and mobile devices.",
  "Clear navigation and logical page structure.",
  "Professional visual design aligned with the brand.",
  "Clear calls to action and contact opportunities.",
  "Contact or lead-generation forms where appropriate.",
  "Basic on-page SEO fundamentals.",
  "Good performance and mobile usability.",
  "Analytics and relevant third-party integrations when needed.",
  "Accessible and understandable content.",
  "Testing before launch.",
];

export default function BusinessWebsiteCost2026() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How Much Does a Business Website Cost in 2026?",
    description:
      "A practical guide to business website pricing, features, development costs, and choosing the right website solution.",
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
        "https://www.vertexstudioworks.com/resources/how-much-does-a-business-website-cost-2026",
    },
  };

  return (
    <>
      <main className="min-h-screen overflow-x-hidden bg-[#050816] text-white">
        <Navbar />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema),
          }}
        />

        {/* =====================================================
            HERO
        ===================================================== */}

        <header className="relative isolate overflow-hidden pt-32 sm:pt-36 lg:pt-40">
          {/* Ambient glows */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-[-240px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[130px] animate-pulse" />

            <div className="absolute -left-40 top-72 h-80 w-80 rounded-full bg-cyan-500/10 blur-[110px]" />

            <div className="absolute -right-40 top-80 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />
          </div>

          {/* Grid */}
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.14]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
              backgroundSize: "70px 70px",
              maskImage:
                "linear-gradient(to bottom, black, transparent 80%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black, transparent 80%)",
            }}
          />

          <div className="mx-auto max-w-7xl px-6 pb-24 sm:px-8 lg:px-12 lg:pb-32">
            <div className="mx-auto max-w-5xl">
              {/* Back */}
              <Link
                href="/resources"
                className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/45 transition-colors hover:text-blue-400"
              >
                <span className="transition-transform duration-300 group-hover:-translate-x-1">
                  ←
                </span>
                Back to Resources
              </Link>

              {/* Meta */}
              <div className="mb-7 flex flex-wrap items-center gap-3 text-xs sm:text-sm">
                <span className="rounded-full border border-blue-400/20 bg-blue-400/[0.08] px-3 py-1.5 font-semibold uppercase tracking-wider text-blue-400">
                  Websites
                </span>

                <span className="text-white/20">•</span>

                <span className="text-white/40">
                  September 2026
                </span>

                <span className="text-white/20">•</span>

                <span className="text-white/40">
                  8 min read
                </span>
              </div>

              {/* Title */}
              <h1 className="max-w-5xl text-4xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-7xl">
                How Much Does a Business Website Cost in{" "}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  2026?
                </span>
              </h1>

              <p className="mt-7 max-w-3xl text-base leading-8 text-white/55 sm:text-xl">
                A practical guide to understanding website pricing, what
                affects development costs, and what businesses should consider
                before hiring a website developer.
              </p>

              {/* Hero info strip */}
              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {[
                  ["01", "Understand pricing"],
                  ["02", "Compare website types"],
                  ["03", "Plan your investment"],
                ].map(([number, text]) => (
                  <div
                    key={number}
                    className="group rounded-2xl border border-white/10 bg-white/[0.025] p-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/20 hover:bg-white/[0.04]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-blue-400">
                        {number}
                      </span>

                      <span className="text-sm text-white/55 transition-colors group-hover:text-white/80">
                        {text}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050816] to-transparent" />
        </header>

        {/* =====================================================
            ARTICLE
        ===================================================== */}

        <article className="relative">
          {/* Article ambient glow */}
          <div className="pointer-events-none absolute left-1/2 top-40 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/[0.035] blur-[140px]" />

          <div className="relative mx-auto max-w-5xl px-6 pb-24 sm:px-8 lg:pb-32">
            {/* =================================================
                INTRO
            ================================================= */}

            <div className="max-w-4xl">
              <p className="text-lg leading-9 text-white/75 sm:text-xl">
                A business website is no longer just an online brochure. For
                many businesses, it is part of their sales process, customer
                service, marketing, and lead-generation system.
              </p>

              <p className="mt-6 text-lg leading-9 text-white/75 sm:text-xl">
                Because websites can range from simple landing pages to complex
                e-commerce platforms and custom business systems, there is no
                single price that applies to every project.
              </p>

              <div className="mt-8 rounded-2xl border border-blue-400/20 bg-blue-400/[0.05] p-6 sm:p-8">
                <p className="text-base leading-8 text-white/65">
                  The right question is not simply{" "}
                  <strong className="text-white">
                    "How much does a website cost?"
                  </strong>{" "}
                  It is{" "}
                  <strong className="text-blue-400">
                    "What does the business actually need the website to
                    accomplish?"
                  </strong>
                </p>
              </div>
            </div>

            {/* =================================================
                TABLE OF CONTENTS
            ================================================= */}

            <aside className="my-14 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] shadow-[0_20px_70px_rgba(0,0,0,0.2)] backdrop-blur-xl">
              <div className="border-b border-white/10 bg-white/[0.025] px-6 py-5 sm:px-8">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.7)]" />

                  <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-white/80">
                    In this guide
                  </h2>
                </div>
              </div>

              <ol className="grid gap-x-10 gap-y-3 p-6 text-sm sm:grid-cols-2 sm:p-8">
                {[
                  ["#website-cost", "How much does a business website cost?"],
                  ["#what-affects-cost", "What affects website cost?"],
                  ["#website-types", "Different types of business websites"],
                  ["#features", "What should a professional website include?"],
                  ["#seo", "What about SEO?"],
                  ["#crm", "CRM and business integrations"],
                  ["#maintenance", "Website maintenance"],
                  ["#vertex", "Vertex Studio Works website packages"],
                  ["#faq", "Frequently asked questions"],
                ].map(([href, text], index) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="group flex items-start gap-3 text-white/50 transition-colors hover:text-blue-400"
                    >
                      <span className="mt-0.5 text-xs font-bold text-blue-400/60 transition-colors group-hover:text-blue-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span>{text}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </aside>

            {/* =================================================
                SECTION 1
            ================================================= */}

            <section
              id="website-cost"
              className="scroll-mt-28"
            >
              <SectionHeading
                number="01"
                title="How much does a business website cost?"
              />

              <p className="mt-6 text-base leading-8 text-white/60">
                Business website pricing varies significantly depending on the
                project's scope. A single landing page has very different
                requirements from a 10-page website, online store, or custom
                application.
              </p>

              <div className="mt-9 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025]">
                <div className="grid grid-cols-2 border-b border-white/10 bg-white/[0.045] p-5 text-xs font-bold uppercase tracking-wider text-white/70 sm:p-6 sm:text-sm">
                  <span>Website type</span>
                  <span>Typical scope</span>
                </div>

                {websiteTypes.map(([type, scope], index) => (
                  <div
                    key={type}
                    className="group grid grid-cols-2 gap-5 border-b border-white/10 p-5 transition-colors duration-300 last:border-b-0 hover:bg-blue-400/[0.025] sm:p-6"
                  >
                    <span className="flex items-start gap-3 font-semibold text-white/80">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400/60 transition-all duration-300 group-hover:bg-blue-400 group-hover:shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                      {type}
                    </span>

                    <span className="text-sm leading-6 text-white/50">
                      {scope}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* =================================================
                SECTION 2
            ================================================= */}

            <section
              id="what-affects-cost"
              className="mt-24 scroll-mt-28"
            >
              <SectionHeading
                number="02"
                title="What affects website cost?"
              />

              <p className="mt-6 text-base leading-8 text-white/60">
                Page count is only one part of website pricing. Two websites
                with the same number of pages can require completely different
                amounts of design and development work.
              </p>

              <div className="mt-9 grid gap-4 sm:grid-cols-2">
                {costFactors.map(([title, description], index) => (
                  <div
                    key={title}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-blue-400/25 hover:bg-white/[0.045] hover:shadow-[0_20px_60px_rgba(37,99,235,0.08)]"
                  >
                    <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-500/5 blur-3xl transition-all duration-500 group-hover:bg-blue-500/15" />

                    <div className="relative">
                      <span className="text-xs font-bold tracking-widest text-blue-400">
                        0{index + 1}
                      </span>

                      <h3 className="mt-4 text-lg font-bold">
                        {title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-white/50">
                        {description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* =================================================
                SECTION 3
            ================================================= */}

            <section
              id="website-types"
              className="mt-24 scroll-mt-28"
            >
              <SectionHeading
                number="03"
                title="Different types of business websites"
              />

              <p className="mt-6 text-base leading-8 text-white/60">
                Before choosing a package, identify what role your website
                needs to play in the business.
              </p>

              <div className="mt-9 space-y-5">
                <ContentBlock
                  title="Landing pages"
                  text="Landing pages are useful for focused campaigns, services, products, lead generation, and advertising. They are usually built around one primary conversion goal."
                />

                <ContentBlock
                  title="Business websites"
                  text="A business website typically provides a broader online presence, allowing visitors to learn about the company, services, products, team, location, and ways to get in touch."
                />

                <ContentBlock
                  title="E-commerce websites"
                  text="E-commerce projects introduce additional requirements such as product catalogs, shopping carts, checkout, payments, inventory, shipping, and order management."
                />

                <ContentBlock
                  title="Custom business solutions"
                  text="Some businesses need more than public-facing pages. Custom dashboards, CRM connections, APIs, automated workflows, and specialized business tools can turn a website project into a broader digital solution."
                />
              </div>
            </section>

            {/* =================================================
                SECTION 4
            ================================================= */}

            <section
              id="features"
              className="mt-24 scroll-mt-28"
            >
              <SectionHeading
                number="04"
                title="What should a professional website include?"
              />

              <p className="mt-6 text-base leading-8 text-white/60">
                A professional website should be built around the needs of its
                visitors and the goals of the business.
              </p>

              <div className="mt-9 grid gap-3 sm:grid-cols-2">
                {includedFeatures.map((item) => (
                  <div
                    key={item}
                    className="group flex gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition-all duration-300 hover:border-blue-400/20 hover:bg-white/[0.04]"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-blue-400/20 bg-blue-400/10 text-xs font-bold text-blue-400">
                      ✓
                    </span>

                    <span className="text-sm leading-7 text-white/60">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* =================================================
                SECTION 5
            ================================================= */}

            <section
              id="seo"
              className="mt-24 scroll-mt-28"
            >
              <SectionHeading
                number="05"
                title="What about SEO?"
              />

              <div className="mt-7 space-y-6">
                <p className="text-base leading-8 text-white/60">
                  SEO should be considered during website development rather
                  than treated as something to add at the very end.
                </p>

                <p className="text-base leading-8 text-white/60">
                  Basic website SEO can include page titles, meta descriptions,
                  heading structure, descriptive URLs, mobile responsiveness,
                  internal linking, image optimization, and other technical
                  fundamentals.
                </p>

                <p className="text-base leading-8 text-white/60">
                  Ongoing SEO is different. It can involve keyword research,
                  content creation, technical improvements, authority building,
                  local SEO, performance analysis, and continuous optimization.
                </p>
              </div>

              <div className="mt-9 rounded-3xl border border-blue-400/20 bg-gradient-to-br from-blue-500/[0.08] to-cyan-500/[0.025] p-7 sm:p-9">
                <div className="flex items-start gap-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10 text-lg text-blue-400">
                    ✦
                  </div>

                  <div>
                    <h3 className="font-bold">
                      SEO starts with the foundation.
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-white/50">
                      A technically sound, well-structured website gives
                      ongoing SEO efforts a stronger foundation to build on.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* =================================================
                SECTION 6
            ================================================= */}

            <section
              id="crm"
              className="mt-24 scroll-mt-28"
            >
              <SectionHeading
                number="06"
                title="CRM and business integrations"
              />

              <div className="mt-7 space-y-6">
                <p className="text-base leading-8 text-white/60">
                  A website can become much more useful when it connects to the
                  tools a business already uses.
                </p>

                <p className="text-base leading-8 text-white/60">
                  For example, a website form can send a new inquiry into a
                  CRM, trigger an email notification, create a follow-up task,
                  or connect with another business workflow.
                </p>
              </div>

              <div className="relative mt-9 overflow-hidden rounded-3xl border border-blue-400/20 bg-blue-400/[0.05] p-7 sm:p-9">
                <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-blue-500/10 blur-[80px]" />

                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
                    Think beyond the website
                  </p>

                  <h3 className="mt-3 text-2xl font-bold">
                    Your website can be part of a larger system.
                  </h3>

                  <p className="mt-4 leading-7 text-white/55">
                    The website can be the starting point for a larger customer
                    journey:
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-2 text-sm font-semibold">
                    {[
                      "Visitor",
                      "Inquiry",
                      "Lead",
                      "Follow-up",
                      "Customer",
                    ].map((step, index) => (
                      <div
                        key={step}
                        className="flex items-center gap-2"
                      >
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-white/65">
                          {step}
                        </span>

                        {index < 4 && (
                          <span className="text-blue-400/50">
                            →
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* =================================================
                SECTION 7
            ================================================= */}

            <section
              id="maintenance"
              className="mt-24 scroll-mt-28"
            >
              <SectionHeading
                number="07"
                title="Do you need website maintenance?"
              />

              <div className="mt-7 space-y-6">
                <p className="text-base leading-8 text-white/60">
                  Some businesses only need occasional changes, while others
                  want regular updates and ongoing support.
                </p>

                <p className="text-base leading-8 text-white/60">
                  Website care can include content updates, basic maintenance,
                  performance checks, troubleshooting, analytics reviews, and
                  continued improvements depending on the service plan.
                </p>
              </div>
            </section>

            {/* =================================================
                SECTION 8 — VERTEX
            ================================================= */}

            <section
              id="vertex"
              className="mt-24 scroll-mt-28"
            >
              <div className="relative overflow-hidden rounded-[2rem] border border-blue-400/20 bg-gradient-to-br from-blue-500/[0.09] via-white/[0.025] to-cyan-500/[0.04] p-8 shadow-[0_25px_90px_rgba(37,99,235,0.08)] sm:p-10 lg:p-12">
                <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />

                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                    Vertex Studio Works
                  </p>

                  <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
                    Website packages for growing businesses
                  </h2>

                  <p className="mt-5 max-w-2xl leading-8 text-white/55">
                    Vertex Studio Works offers straightforward website packages
                    for businesses that want a professional online presence
                    without unnecessary complexity.
                  </p>

                  <div className="mt-9 grid gap-5 sm:grid-cols-2">
                    {/* Launch */}
                    <div className="group rounded-3xl border border-white/10 bg-[#050816]/70 p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-blue-400/20 hover:shadow-[0_20px_60px_rgba(37,99,235,0.1)]">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
                        Launch
                      </p>

                      <p className="mt-3 text-5xl font-bold text-blue-400">
                        $39
                      </p>

                      <p className="mt-2 text-sm text-white/40">
                        One-time project
                      </p>

                      <p className="mt-5 text-sm leading-7 text-white/50">
                        Up to 5 custom pages for startups, entrepreneurs, and
                        small businesses.
                      </p>
                    </div>

                    {/* Scale */}
                    <div className="relative rounded-3xl border border-blue-400/30 bg-[#050816]/80 p-7 shadow-[0_0_40px_rgba(37,99,235,0.08)] backdrop-blur-xl">
                      <div className="absolute right-5 top-5 rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-400">
                        Scale
                      </div>

                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
                        Scale
                      </p>

                      <p className="mt-3 text-5xl font-bold text-blue-400">
                        $79
                      </p>

                      <p className="mt-2 text-sm text-white/40">
                        One-time project
                      </p>

                      <p className="mt-5 text-sm leading-7 text-white/50">
                        For growing businesses that need more functionality,
                        engagement, lead generation, or e-commerce
                        capabilities.
                      </p>
                    </div>
                  </div>

                  <p className="mt-7 text-sm leading-7 text-white/40">
                    Advanced requirements such as custom functionality, complex
                    integrations, e-commerce features, and other specialized
                    solutions can be quoted separately.
                  </p>

                  <div className="mt-8">
                    <Link
                      href="/#pricing"
                      className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_35px_rgba(59,130,246,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_50px_rgba(59,130,246,0.3)]"
                    >
                      View Website Packages
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* =================================================
                FAQ
            ================================================= */}

            <section
              id="faq"
              className="mt-24 scroll-mt-28"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                FAQ
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Frequently asked questions
              </h2>

              <div className="mt-9 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025]">
                {faqs.map((faq, index) => (
                  <details
                    key={faq.question}
                    className="group border-b border-white/10 last:border-b-0"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-5 p-6 font-semibold text-white/80 transition-colors hover:text-blue-400 sm:p-7">
                      <span>{faq.question}</span>

                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all duration-300 group-open:rotate-45 group-open:border-blue-400/30 group-open:text-blue-400">
                        +
                      </span>
                    </summary>

                    <div className="px-6 pb-7 sm:px-7">
                      <p className="text-sm leading-7 text-white/50">
                        {faq.answer}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* =================================================
                FINAL CTA
            ================================================= */}

            <section className="relative mt-24 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] p-8 text-center shadow-[0_25px_80px_rgba(0,0,0,0.2)] sm:p-12">
              <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[100px]" />

              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                  Ready to build?
                </p>

                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                  Ready to build your website?
                </h2>

                <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/50">
                  Tell us what you're building and what you want your website
                  to accomplish. We'll help you determine the right approach.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <Link
                    href="/#contact"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-3.5 text-sm font-semibold shadow-[0_0_35px_rgba(59,130,246,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_50px_rgba(59,130,246,0.3)]"
                  >
                    Start a Project
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>

                  <Link
                    href="/work"
                    className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.025] px-7 py-3.5 text-sm font-semibold text-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/20 hover:bg-white/[0.05] hover:text-white"
                  >
                    View Our Work
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </article>

        <Footer />
      </main>

      <Chatbot />
    </>
  );
}

/* ============================================================
   REUSABLE ARTICLE COMPONENTS
============================================================ */

function SectionHeading({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <span className="text-xs font-bold tracking-[0.2em] text-blue-400">
          {number}
        </span>

        <span className="h-px w-10 bg-blue-500/50" />
      </div>

      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}

function ContentBlock({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="group rounded-3xl border border-white/10 bg-white/[0.025] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-blue-400/20 hover:bg-white/[0.04] sm:p-8">
      <div className="flex items-start gap-5">
        <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10 text-sm font-bold text-blue-400 transition-all duration-300 group-hover:border-blue-400/40 group-hover:bg-blue-400/15">
          +
        </div>

        <div>
          <h3 className="text-xl font-bold">
            {title}
          </h3>

          <p className="mt-3 text-sm leading-7 text-white/50">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}