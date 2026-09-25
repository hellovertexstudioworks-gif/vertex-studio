import Link from "next/link";
import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/sections/Chatbot";

export const metadata: Metadata = {
  title:
    "What Should Be Included in a Professional Business Website? | Vertex Studio Works",
  description:
    "Discover the essential pages, features, SEO fundamentals, forms, integrations, and design elements every professional business website should include.",
  alternates: {
    canonical:
      "https://www.vertexstudioworks.com/resources/what-should-be-included-in-a-business-website",
  },
  openGraph: {
    title: "What Should Be Included in a Professional Business Website?",
    description:
      "A practical guide to the essential pages and features of a professional business website.",
    url: "https://www.vertexstudioworks.com/resources/what-should-be-included-in-a-business-website",
    siteName: "Vertex Studio Works",
    type: "article",
  },
};

const essentials = [
  {
    title: "Clear navigation",
    description:
      "Visitors should be able to quickly understand where they are and find important information without having to search through the entire website.",
  },
  {
    title: "Responsive design",
    description:
      "Your website should work properly across phones, tablets, laptops, and desktop screens.",
  },
  {
    title: "Strong calls to action",
    description:
      "Visitors should know what to do next, whether that means contacting you, requesting a quote, booking an appointment, or making a purchase.",
  },
  {
    title: "Contact and lead forms",
    description:
      "Make it easy for potential customers to send an inquiry or request information directly from your website.",
  },
  {
    title: "Basic SEO",
    description:
      "Important SEO fundamentals include page titles, meta descriptions, headings, descriptive URLs, internal links, and mobile-friendly pages.",
  },
  {
    title: "Fast and usable pages",
    description:
      "A professional website should be designed with performance, readability, usability, and mobile experience in mind.",
  },
];

const faqs = [
  {
    question: "How many pages should a small business website have?",
    answer:
      "There is no universal number. Many small businesses can start with a focused set of pages such as Home, About, Services, Work or Products, and Contact. The right structure depends on what visitors need to know and what the business wants the website to accomplish.",
  },
  {
    question: "Does every business need an About page?",
    answer:
      "Not every business needs the same structure, but an About page can be useful for establishing credibility, explaining the company's story, introducing the team, and helping visitors understand who they are considering doing business with.",
  },
  {
    question: "Should a business website have a contact form?",
    answer:
      "For many service businesses, yes. A contact or inquiry form gives visitors a simple way to start a conversation and can also make lead information easier to organize.",
  },
  {
    question: "Does a professional website automatically rank on Google?",
    answer:
      "No. A well-built website provides an important technical foundation, but search visibility also depends on content quality, relevance, technical SEO, competition, authority, local signals where applicable, and ongoing optimization.",
  },
  {
    question: "Can a business website connect to a CRM?",
    answer:
      "Yes. Forms and other website interactions can often be connected to CRM platforms and automation tools so that leads can be captured, organized, and followed up more efficiently.",
  },
];

const essentialPages = [
  {
    title: "Home",
    description:
      "Introduces the business, its value proposition, services, and the next action visitors should take.",
  },
  {
    title: "About",
    description:
      "Explains who the business is, what it does, and why visitors should trust it.",
  },
  {
    title: "Services",
    description:
      "Explains what the business offers and who each service is designed for.",
  },
  {
    title: "Work or Portfolio",
    description:
      "Shows previous projects, examples, case studies, or results where appropriate.",
  },
  {
    title: "Contact",
    description:
      "Provides clear ways for visitors to get in touch or request information.",
  },
  {
    title: "Additional pages",
    description:
      "FAQs, locations, team pages, resources, pricing, booking pages, or other pages can be added based on business needs.",
  },
];

const trustSignals = [
  "Testimonials and customer feedback",
  "Portfolio or previous work",
  "Professional credentials",
  "Team information",
  "Business location and contact details",
  "Clear policies and expectations",
  "Relevant certifications or partnerships",
  "Consistent branding and professional design",
];

const seoFeatures = [
  "Unique and descriptive page titles.",
  "Useful meta descriptions.",
  "Logical heading structure.",
  "Descriptive and readable URLs.",
  "Relevant internal links.",
  "Optimized images and appropriate alternative text.",
  "Mobile-friendly design.",
  "Good page performance.",
  "Accessible and useful content.",
  "A crawlable site structure.",
];

const integrations = [
  "CRM systems",
  "Google Analytics",
  "Calendly",
  "WhatsApp",
  "Email platforms",
  "Payment systems",
  "Marketing tools",
  "E-commerce platforms",
  "Automation tools",
];

const homepageFeatures = [
  "A clear headline explaining what the business offers.",
  "A short supporting message focused on the customer's needs.",
  "A prominent call to action.",
  "An overview of important services or products.",
  "Trust signals such as testimonials, credentials, reviews, or client logos where appropriate.",
  "A portfolio, project, or product preview when relevant.",
  "A clear path toward contacting, booking, purchasing, or requesting a quote.",
];

export default function BusinessWebsiteEssentialsPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "What Should Be Included in a Professional Business Website?",
    description:
      "A practical guide to the essential pages, features, SEO fundamentals, forms, and integrations a professional business website should include.",
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
        "https://www.vertexstudioworks.com/resources/what-should-be-included-in-a-business-website",
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
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-[-240px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[130px] animate-pulse" />

            <div className="absolute -left-40 top-72 h-80 w-80 rounded-full bg-cyan-500/10 blur-[110px]" />

            <div className="absolute -right-40 top-80 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />
          </div>

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
              <Link
                href="/resources"
                className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/45 transition-colors hover:text-blue-400"
              >
                <span className="transition-transform duration-300 group-hover:-translate-x-1">
                  ←
                </span>
                Back to Resources
              </Link>

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

              <h1 className="max-w-5xl text-4xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-7xl">
                What Should Be Included in a{" "}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Professional Business Website?
                </span>
              </h1>

              <p className="mt-7 max-w-3xl text-base leading-8 text-white/55 sm:text-xl">
                A practical guide to the pages, features, SEO fundamentals,
                forms, integrations, and user experience elements that can
                turn a basic website into a useful business tool.
              </p>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {[
                  ["01", "Plan the right pages"],
                  ["02", "Build trust"],
                  ["03", "Create clear actions"],
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
          <div className="pointer-events-none absolute left-1/2 top-40 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/[0.035] blur-[140px]" />

          <div className="relative mx-auto max-w-5xl px-6 pb-24 sm:px-8 lg:pb-32">
            {/* INTRO */}

            <section className="max-w-4xl">
              <p className="text-lg leading-9 text-white/75 sm:text-xl">
                A professional business website should do more than display a
                company's name and contact information. It should help visitors
                understand the business, build confidence, find the information
                they need, and take the next step.
              </p>

              <p className="mt-6 text-lg leading-9 text-white/75 sm:text-xl">
                The exact structure depends on the business. A restaurant,
                dental clinic, construction company, consultant, and online
                store will naturally need different features.
              </p>

              <div className="mt-8 rounded-2xl border border-blue-400/20 bg-blue-400/[0.05] p-6 sm:p-8">
                <p className="text-base leading-8 text-white/65">
                  However, there are several fundamentals that most
                  professional business websites should consider.
                </p>
              </div>
            </section>

            {/* TABLE OF CONTENTS */}

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
                  ["#essential-pages", "Essential website pages"],
                  ["#homepage", "What should the homepage include?"],
                  ["#services", "Services or product pages"],
                  ["#trust", "Building trust and credibility"],
                  ["#lead-generation", "Lead generation and contact forms"],
                  ["#seo", "Basic SEO"],
                  ["#integrations", "Integrations"],
                  ["#mobile", "Mobile responsiveness and performance"],
                  ["#vertex", "How Vertex Studio approaches business websites"],
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

            {/* ESSENTIAL PAGES */}

            <section
              id="essential-pages"
              className="scroll-mt-28"
            >
              <SectionHeading
                number="01"
                title="Essential pages for a business website"
              />

              <p className="mt-6 text-base leading-8 text-white/60">
                The number of pages a website needs depends on the business,
                but a typical service-based company may benefit from a
                structure such as this:
              </p>

              <div className="mt-9 grid gap-4 sm:grid-cols-2">
                {essentialPages.map((page, index) => (
                  <div
                    key={page.title}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-blue-400/25 hover:bg-white/[0.045] hover:shadow-[0_20px_60px_rgba(37,99,235,0.08)]"
                  >
                    <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-500/5 blur-3xl transition-all duration-500 group-hover:bg-blue-500/15" />

                    <div className="relative">
                      <span className="text-xs font-bold tracking-widest text-blue-400">
                        0{index + 1}
                      </span>

                      <h3 className="mt-4 text-lg font-bold">
                        {page.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-white/50">
                        {page.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* HOMEPAGE */}

            <section
              id="homepage"
              className="mt-24 scroll-mt-28"
            >
              <SectionHeading
                number="02"
                title="What should the homepage include?"
              />

              <p className="mt-6 text-base leading-8 text-white/60">
                The homepage is often the first major touchpoint between a
                potential customer and a business. It should quickly
                communicate what the business does and why the visitor should
                continue exploring.
              </p>

              <div className="mt-9 grid gap-3 sm:grid-cols-2">
                {homepageFeatures.map((item) => (
                  <FeatureItem key={item} text={item} />
                ))}
              </div>
            </section>

            {/* SERVICES */}

            <section
              id="services"
              className="mt-24 scroll-mt-28"
            >
              <SectionHeading
                number="03"
                title="Services or product pages"
              />

              <p className="mt-6 text-base leading-8 text-white/60">
                A common mistake is listing services without explaining them.
                Visitors should understand what the business provides, who the
                service is for, what makes it useful, and how they can take the
                next step.
              </p>

              <div className="mt-9 rounded-3xl border border-white/10 bg-white/[0.025] p-7 transition-all duration-500 hover:border-blue-400/20 hover:bg-white/[0.04] sm:p-8">
                <div className="flex items-start gap-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10 text-lg text-blue-400">
                    +
                  </div>

                  <div>
                    <h3 className="text-xl font-bold">
                      A strong service page can answer:
                    </h3>

                    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                      {[
                        "What is the service?",
                        "Who is it for?",
                        "What problem does it solve?",
                        "What does the customer receive?",
                        "Why should they consider this business?",
                        "What should they do next?",
                      ].map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 text-sm leading-7 text-white/55"
                        >
                          <span className="text-blue-400">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* TRUST */}

            <section
              id="trust"
              className="mt-24 scroll-mt-28"
            >
              <SectionHeading
                number="04"
                title="Build trust and credibility"
              />

              <p className="mt-6 text-base leading-8 text-white/60">
                People are often deciding whether they can trust a business
                before they ever make contact. Your website should therefore
                provide appropriate evidence that the business is legitimate
                and capable.
              </p>

              <div className="mt-9 grid gap-3 sm:grid-cols-2">
                {trustSignals.map((item) => (
                  <div
                    key={item}
                    className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-5 text-sm text-white/60 transition-all duration-300 hover:border-blue-400/20 hover:bg-white/[0.04]"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-blue-400/20 bg-blue-400/10 text-xs text-blue-400">
                      ✓
                    </span>

                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* LEAD GENERATION */}

            <section
              id="lead-generation"
              className="mt-24 scroll-mt-28"
            >
              <SectionHeading
                number="05"
                title="Lead generation and contact forms"
              />

              <p className="mt-6 text-base leading-8 text-white/60">
                If a website is intended to generate business, visitors need a
                simple way to take action.
              </p>

              <p className="mt-6 text-base leading-8 text-white/60">
                Depending on the business, that could mean submitting a contact
                form, requesting a quote, booking an appointment, starting a
                conversation through WhatsApp, subscribing to a mailing list,
                or making a purchase.
              </p>

              <div className="relative mt-9 overflow-hidden rounded-3xl border border-blue-400/20 bg-blue-400/[0.05] p-7 sm:p-9">
                <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-blue-500/10 blur-[80px]" />

                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
                    Conversion principle
                  </p>

                  <h3 className="mt-3 text-2xl font-bold">
                    Don't make visitors search for the next step.
                  </h3>

                  <p className="mt-4 leading-7 text-white/55">
                    A clear call to action should appear where it makes sense
                    throughout the user journey.
                  </p>
                </div>
              </div>
            </section>

            {/* SEO */}

            <section
              id="seo"
              className="mt-24 scroll-mt-28"
            >
              <SectionHeading
                number="06"
                title="Basic SEO fundamentals"
              />

              <p className="mt-6 text-base leading-8 text-white/60">
                A professional website should be built with search engines and
                users in mind.
              </p>

              <div className="mt-9 grid gap-3 sm:grid-cols-2">
                {seoFeatures.map((item) => (
                  <FeatureItem key={item} text={item} />
                ))}
              </div>

              <p className="mt-7 text-sm leading-7 text-white/40">
                Basic SEO provides a foundation. It does not guarantee search
                rankings, which can depend on competition, content quality,
                authority, relevance, technical factors, and ongoing
                optimization.
              </p>
            </section>

            {/* INTEGRATIONS */}

            <section
              id="integrations"
              className="mt-24 scroll-mt-28"
            >
              <SectionHeading
                number="07"
                title="Integrations that can make a website more useful"
              />

              <p className="mt-6 text-base leading-8 text-white/60">
                Modern business websites can connect with the tools a company
                already uses.
              </p>

              <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {integrations.map((item, index) => (
                  <div
                    key={item}
                    className="group rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/25 hover:bg-white/[0.045]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-blue-400/60">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="text-sm font-medium text-white/70 transition-colors group-hover:text-white">
                        {item}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-7 text-base leading-8 text-white/60">
                The right integrations depend on the business workflow. A
                restaurant may need reservations, while a service company may
                benefit more from lead forms, CRM integration, scheduling, and
                automated follow-up.
              </p>
            </section>

            {/* MOBILE */}

            <section
              id="mobile"
              className="mt-24 scroll-mt-28"
            >
              <SectionHeading
                number="08"
                title="Mobile responsiveness and performance"
              />

              <div className="mt-7 space-y-6">
                <p className="text-base leading-8 text-white/60">
                  A website that looks good only on a desktop computer is not
                  enough. Visitors can arrive from phones, tablets, laptops,
                  and different browsers.
                </p>

                <p className="text-base leading-8 text-white/60">
                  Responsive layouts, readable text, usable navigation,
                  optimized images, sensible animations, and good performance
                  all contribute to a better experience.
                </p>
              </div>

              <div className="mt-9 rounded-3xl border border-white/10 bg-white/[0.025] p-7 shadow-[0_20px_60px_rgba(0,0,0,0.15)] sm:p-9">
                <div className="flex items-start gap-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-400">
                    ✦
                  </div>

                  <p className="text-lg font-semibold leading-8 text-white/80">
                    Professional design should work across devices—not just
                    look good in a screenshot.
                  </p>
                </div>
              </div>
            </section>

            {/* VERTEX */}

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
                    Websites built around your business goals
                  </h2>

                  <p className="mt-5 max-w-2xl leading-8 text-white/55">
                    At Vertex Studio Works, our approach is to build websites
                    around what the business actually needs—not simply add
                    features for the sake of adding them.
                  </p>

                  <div className="mt-9 grid gap-5 sm:grid-cols-2">
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
                        A larger solution for growing businesses that need
                        additional functionality, lead generation, engagement,
                        or e-commerce capabilities.
                      </p>
                    </div>
                  </div>

                  <p className="mt-7 text-sm leading-7 text-white/40">
                    Custom functionality, advanced CRM systems, complex
                    integrations, e-commerce requirements, and other
                    specialized features can be quoted separately.
                  </p>

                  <div className="mt-8">
                    <Link
                      href="/#pricing"
                      className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_35px_rgba(59,130,246,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_50px_rgba(59,130,246,0.3)]"
                    >
                      Explore Our Packages
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ */}

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
                {faqs.map((faq) => (
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

            {/* FINAL CTA */}

            <section className="relative mt-24 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] p-8 text-center shadow-[0_25px_80px_rgba(0,0,0,0.2)] sm:p-12">
              <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[100px]" />

              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                  Ready to build?
                </p>

                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                  Ready to build your business website?
                </h2>

                <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/50">
                  Tell us about your business, your goals, and what you want
                  your website to accomplish.
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
   REUSABLE COMPONENTS
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

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="group flex gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition-all duration-300 hover:border-blue-400/20 hover:bg-white/[0.04]">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-blue-400/20 bg-blue-400/10 text-xs font-bold text-blue-400">
        ✓
      </span>

      <span className="text-sm leading-7 text-white/60">
        {text}
      </span>
    </div>
  );
}