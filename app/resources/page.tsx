import type { Metadata } from "next";
import Link from "next/link";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/sections/Chatbot";

export const metadata: Metadata = {
  title: "Resources | Vertex Studio Works",
  description:
    "Practical guides and insights about website design, SEO, digital growth, CRM integrations, and building a stronger online presence.",
  alternates: {
    canonical: "https://www.vertexstudioworks.com/resources",
  },
  openGraph: {
    title: "Resources | Vertex Studio Works",
    description:
      "Practical guides about websites, SEO, digital growth, CRM integrations, and business systems.",
    url: "https://www.vertexstudioworks.com/resources",
    siteName: "Vertex Studio Works",
    locale: "en_US",
    type: "website",
  },
};

const resources = [
  {
    category: "Websites",
    readTime: "8 min read",
    title: "How Much Does a Business Website Cost in 2026?",
    description:
      "A practical guide to website pricing, development costs, features, and what businesses should consider before hiring a website developer.",
    href: "/resources/how-much-does-a-business-website-cost-2026",
    featured: true,
  },
  {
    category: "Websites",
    readTime: "8 min read",
    title: "What Should Be Included in a Professional Business Website?",
    description:
      "Explore the essential pages, features, SEO fundamentals, forms, integrations, and user experience elements a professional website should include.",
    href: "/resources/what-should-be-included-in-a-business-website",
    featured: false,
  },
  {
    category: "Websites",
    readTime: "8 min read",
    title: "7 Signs Your Business Website Needs a Redesign",
    description:
      "Learn the common signs that your website may need a redesign, from outdated design and poor mobile experience to weak lead generation.",
    href: "/resources/website-redesign-signs",
    featured: false,
  },
  {
    category: "Digital Growth",
    readTime: "7 min read",
    title: "Website vs Social Media: Why Your Business Needs Both",
    description:
      "Understand how your website and social media serve different purposes and how they can work together to grow your online presence.",
    href: "/resources/website-vs-social-media",
    featured: false,
  },
  {
    category: "CRM & Integrations",
    readTime: "7 min read",
    title: "What Is CRM Integration and Why Does Your Website Need It?",
    description:
      "Discover how connecting your website to a CRM can help capture leads, organize customer information, and improve follow-up.",
    href: "/resources/crm-website-integration",
    featured: false,
  },
];

const categories = [
  {
    name: "Websites",
    description:
      "Design, development, redesigns, and everything involved in building a stronger website.",
  },
  {
    name: "Digital Growth",
    description:
      "Practical ideas for improving your online presence and turning attention into opportunities.",
  },
  {
    name: "CRM & Integrations",
    description:
      "Learn how websites can connect with the systems and tools your business already uses.",
  },
];

export default function ResourcesPage() {
  const featured = resources.find((resource) => resource.featured);
  const articles = resources.filter((resource) => !resource.featured);

  return (
    <>
      <main className="min-h-screen overflow-x-hidden bg-[#050816] text-white">
        <Navbar />

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="relative isolate overflow-hidden pt-32 sm:pt-36 lg:pt-40">
          {/* Background glow */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-[-220px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[120px] animate-pulse" />

            <div className="absolute -left-40 top-40 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]" />

            <div className="absolute -right-40 top-64 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />
          </div>

          {/* Grid */}
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.16]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
              backgroundSize: "70px 70px",
              maskImage:
                "linear-gradient(to bottom, black, transparent 75%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black, transparent 75%)",
            }}
          />

          <div className="mx-auto max-w-7xl px-6 pb-24 sm:px-8 lg:px-12 lg:pb-32">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-blue-400/20 bg-blue-400/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.08)]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400" />
                Vertex Resources
              </div>

              <h1 className="text-5xl font-bold tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                Build Better.
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Grow Smarter.
                </span>
              </h1>

              <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
                Practical guides and insights on websites, SEO, digital
                growth, CRM integrations, and building a stronger online
                presence.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="#latest"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_35px_rgba(59,130,246,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_45px_rgba(59,130,246,0.35)]"
                >
                  Explore Resources
                  <span className="transition-transform duration-300 group-hover:translate-y-0.5">
                    ↓
                  </span>
                </a>

                <Link
                  href="/#contact"
                  className="rounded-full border border-white/10 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-white/80 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:bg-white/[0.06]"
                >
                  Start a Project
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050816] to-transparent" />
        </section>

        {/* =====================================================
            FEATURED ARTICLE
        ===================================================== */}

        <section className="relative py-6 sm:py-10">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-blue-500" />

              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-400">
                Featured Resource
              </p>
            </div>

            {featured && (
              <Link
                href={featured.href}
                className="group relative block overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] shadow-[0_20px_80px_rgba(0,0,0,0.25)] transition-all duration-500 hover:-translate-y-1 hover:border-blue-400/30 hover:bg-white/[0.05] hover:shadow-[0_25px_90px_rgba(37,99,235,0.12)]"
              >
                {/* Glow */}
                <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/10 blur-[100px] transition-all duration-700 group-hover:bg-blue-400/20" />

                <div className="relative grid lg:grid-cols-[1.25fr_0.75fr]">
                  <div className="p-8 sm:p-10 lg:p-14">
                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1.5 font-semibold uppercase tracking-wider text-blue-400">
                        {featured.category}
                      </span>

                      <span className="text-white/30">•</span>

                      <span className="text-white/40">
                        {featured.readTime}
                      </span>
                    </div>

                    <h2 className="mt-6 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                      {featured.title}
                    </h2>

                    <p className="mt-6 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
                      {featured.description}
                    </p>

                    <div className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-blue-400">
                      Read the guide
                      <span className="transition-transform duration-300 group-hover:translate-x-2">
                        →
                      </span>
                    </div>
                  </div>

                  <div className="relative hidden min-h-[360px] overflow-hidden border-l border-white/10 lg:block">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.16] via-cyan-500/[0.05] to-transparent" />

                    <div className="absolute inset-0 opacity-30">
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
                          backgroundSize: "45px 45px",
                        }}
                      />
                    </div>

                    <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/20 bg-blue-500/10 shadow-[0_0_100px_rgba(59,130,246,0.25)] transition-transform duration-700 group-hover:scale-110" />

                    <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl border border-blue-300/20 bg-[#081027]/80 shadow-[0_0_50px_rgba(59,130,246,0.2)] backdrop-blur-xl transition-transform duration-700 group-hover:rotate-3 group-hover:scale-105">
                      <span className="text-4xl font-bold text-blue-400">
                        V
                      </span>
                    </div>

                    <div className="absolute left-12 top-16 h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
                    <div className="absolute bottom-20 right-16 h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400 [animation-delay:700ms]" />
                    <div className="absolute right-20 top-24 h-2 w-2 animate-pulse rounded-full bg-blue-300 [animation-delay:300ms]" />
                  </div>
                </div>
              </Link>
            )}
          </div>
        </section>

        {/* =====================================================
            CATEGORIES
        ===================================================== */}

        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-400">
                Explore by topic
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Ideas built around your growth
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/45 sm:text-base">
                Start with the topics that matter most to your business.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {categories.map((category, index) => (
                <div
                  key={category.name}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-blue-400/30 hover:bg-white/[0.045] hover:shadow-[0_20px_60px_rgba(37,99,235,0.08)]"
                >
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/5 blur-3xl transition-all duration-500 group-hover:bg-blue-500/15" />

                  <div className="relative">
                    <span className="text-xs font-bold tracking-[0.15em] text-blue-400">
                      0{index + 1}
                    </span>

                    <h3 className="mt-5 text-xl font-bold">
                      {category.name}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-white/45">
                      {category.description}
                    </p>

                    <div className="mt-6 h-px w-10 bg-blue-500/50 transition-all duration-500 group-hover:w-16" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            LATEST RESOURCES
        ===================================================== */}

        <section id="latest" className="scroll-mt-24 py-10 sm:py-16">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-blue-500" />

                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-400">
                    Latest Resources
                  </p>
                </div>

                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  Guides worth bookmarking.
                </h2>
              </div>

              <p className="max-w-md text-sm leading-6 text-white/40">
                Practical information without the fluff—created to help
                business owners make better digital decisions.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((resource, index) => (
                <Link
                  key={resource.href}
                  href={resource.href}
                  className="group relative flex min-h-[360px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-blue-400/30 hover:bg-white/[0.045] hover:shadow-[0_25px_70px_rgba(37,99,235,0.1)]"
                >
                  <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-500/5 blur-3xl transition-all duration-500 group-hover:bg-blue-500/15" />

                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-blue-400">
                        {resource.category}
                      </span>

                      <span className="text-xs text-white/30">
                        0{index + 2}
                      </span>
                    </div>

                    <h3 className="mt-7 text-2xl font-bold leading-tight tracking-tight transition-colors duration-300 group-hover:text-blue-400">
                      {resource.title}
                    </h3>

                    <p className="mt-5 text-sm leading-7 text-white/45">
                      {resource.description}
                    </p>
                  </div>

                  <div className="relative mt-auto flex items-center justify-between pt-8">
                    <span className="text-xs text-white/30">
                      {resource.readTime}
                    </span>

                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors group-hover:text-blue-400">
                      Read
                      <span className="transition-transform duration-300 group-hover:translate-x-2">
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            CONTENT PHILOSOPHY
        ===================================================== */}

        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.015] p-8 sm:p-12 lg:p-16">
              <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue-500/10 blur-[100px]" />

              <div className="relative grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-400">
                    Why Vertex Resources?
                  </p>

                  <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                    Useful information.
                    <br />
                    <span className="text-white/40">
                      No unnecessary noise.
                    </span>
                  </h2>
                </div>

                <div className="space-y-5 text-sm leading-7 text-white/50 sm:text-base">
                  <p>
                    Building a website is only one part of growing a business
                    online. The decisions around design, SEO, lead generation,
                    content, and technology matter too.
                  </p>

                  <p>
                    Our resources are designed to explain those decisions in
                    straightforward language so business owners can understand
                    what they need before investing in a digital solution.
                  </p>

                  <p>
                    When you're ready to build, Vertex Studio Works can help
                    turn those ideas into a practical website or digital
                    system.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            CTA
        ===================================================== */}

        <section className="relative overflow-hidden py-10 pb-28 sm:pb-36">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[120px]" />

          <div className="relative mx-auto max-w-4xl px-6 text-center sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-400">
              Ready to build?
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Turn your ideas into
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {" "}
                something real.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/45 sm:text-base">
              Whether you need a professional business website, an e-commerce
              experience, or a custom digital solution, let's build something
              around your business.
            </p>

            <div className="mt-9">
              <Link
                href="/#contact"
                className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 text-sm font-semibold text-white shadow-[0_0_40px_rgba(59,130,246,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_55px_rgba(59,130,246,0.35)]"
              >
                Start Your Project
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>

      <Chatbot />
    </>
  );
}