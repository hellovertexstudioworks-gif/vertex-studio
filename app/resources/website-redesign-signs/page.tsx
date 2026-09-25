import Link from "next/link";
import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/sections/Chatbot";

export const metadata: Metadata = {
  title:
    "7 Signs Your Business Website Needs a Redesign | Vertex Studio Works",
  description:
    "Learn 7 signs that your business website may need a redesign, from outdated design and poor mobile experience to slow performance and weak lead generation.",
  alternates: {
    canonical:
      "https://www.vertexstudioworks.com/resources/website-redesign-signs",
  },
  openGraph: {
    title: "7 Signs Your Business Website Needs a Redesign",
    description:
      "Learn the most common signs that a business website may need a professional redesign.",
    url: "https://www.vertexstudioworks.com/resources/website-redesign-signs",
    siteName: "Vertex Studio Works",
    type: "article",
  },
};

const signs = [
  {
    number: "01",
    title: "Your website looks outdated",
    description:
      "Design trends and user expectations change over time. If your website looks significantly older than the websites of your competitors, visitors may question whether the business is still active or keeping up with modern expectations.",
    details: [
      "Old visual styles or layouts",
      "Inconsistent typography",
      "Poor spacing and visual hierarchy",
      "Outdated imagery",
      "Branding that no longer represents the business",
    ],
  },
  {
    number: "02",
    title: "It doesn't work well on mobile",
    description:
      "A website that works well on a desktop but is difficult to use on a phone can create a poor experience. Text, buttons, navigation, forms, and layouts should adapt to smaller screens.",
    details: [
      "Text is difficult to read",
      "Buttons are hard to tap",
      "Content extends beyond the screen",
      "Navigation is difficult to use",
      "Forms are frustrating on mobile",
    ],
  },
  {
    number: "03",
    title: "Visitors don't know what to do next",
    description:
      "A website should guide visitors toward a useful next step. If someone lands on your homepage and cannot quickly understand what you offer or how to contact you, the site may need a structural redesign.",
    details: [
      "No clear call to action",
      "Important information is difficult to find",
      "Too many competing buttons",
      "Unclear messaging",
      "Contact information is buried",
    ],
  },
  {
    number: "04",
    title: "Your website is slow",
    description:
      "Large images, unnecessary scripts, inefficient code, and other technical issues can contribute to slow pages. Performance should be considered as part of the overall user experience.",
    details: [
      "Large unoptimized images",
      "Slow page loading",
      "Unnecessary animations",
      "Heavy third-party scripts",
      "Poor performance on mobile devices",
    ],
  },
  {
    number: "05",
    title: "Your website isn't generating enough inquiries",
    description:
      "A website can look attractive and still fail to turn visitors into potential customers. If visitors have no clear way to contact you, request a quote, book a service, or take another meaningful action, the website may need to be redesigned around conversion.",
    details: [
      "Weak or missing calls to action",
      "No clear inquiry process",
      "Forms are difficult to find",
      "Services aren't clearly explained",
      "Visitors aren't given a compelling next step",
    ],
  },
  {
    number: "06",
    title: "Your content no longer reflects your business",
    description:
      "Businesses evolve. Your services, team, branding, pricing, locations, and target customers may have changed since the website was originally created.",
    details: [
      "Old services are still displayed",
      "Outdated contact information",
      "Old team members or business details",
      "Previous branding or messaging",
      "Portfolio no longer represents your best work",
    ],
  },
  {
    number: "07",
    title: "Your website is difficult to update or maintain",
    description:
      "If even small changes require complicated work or your current website is difficult to maintain, a redesign can be an opportunity to create a cleaner and more manageable foundation.",
    details: [
      "Small updates take too long",
      "Website structure is difficult to understand",
      "Old plugins or dependencies",
      "Inconsistent components",
      "Limited ability to add new functionality",
    ],
  },
];

const faqs = [
  {
    question: "How often should a business redesign its website?",
    answer:
      "There is no fixed schedule. A redesign is usually more useful when the website no longer meets the business's goals, provides a poor user experience, has outdated content, performs poorly, or makes it difficult to add needed functionality.",
  },
  {
    question: "Does a redesign mean rebuilding the entire website?",
    answer:
      "Not always. Some projects only need improvements to specific pages, navigation, content, performance, or design. Other projects may benefit from rebuilding the site on a new technical foundation.",
  },
  {
    question: "Will a website redesign improve SEO?",
    answer:
      "A redesign can create opportunities to improve technical SEO, content structure, performance, mobile usability, internal linking, and page metadata. However, a redesign alone does not guarantee higher search rankings.",
  },
  {
    question: "How long does a website redesign take?",
    answer:
      "The timeline depends on the number of pages, design changes, content, functionality, integrations, and approval process. A focused redesign can be completed relatively quickly, while larger projects require more planning and development.",
  },
  {
    question: "Can I keep my existing domain during a redesign?",
    answer:
      "Yes. In most redesign projects, the existing domain can remain in place while the website is rebuilt or improved. The launch process should be planned carefully to minimize disruption.",
  },
];

export default function WebsiteRedesignSignsPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "7 Signs Your Business Website Needs a Redesign",
    description:
      "Learn seven signs that a business website may need a professional redesign.",
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
        "https://www.vertexstudioworks.com/resources/website-redesign-signs",
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
        <div className="absolute right-[-10%] top-[28%] h-[500px] w-[500px] rounded-full bg-cyan-500/8 blur-[150px]" />
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
                Websites
              </span>

              <span className="text-white/20">•</span>

              <span className="text-white/45">September 2026</span>

              <span className="text-white/20">•</span>

              <span className="text-white/45">8 min read</span>
            </div>

            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-400">
              Website Strategy
            </p>

            <h1 className="max-w-5xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-7xl">
              7 Signs Your Business Website{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                Needs a Redesign
              </span>
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-white/60 sm:text-xl">
              Your website may be hurting your business without you realizing
              it. Here are seven signs that it may be time to rethink your
              design, content, performance, and customer experience.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {[
                "Design",
                "Mobile",
                "Performance",
                "Lead Generation",
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
              Your website is often one of the first places potential
              customers interact with your business. That means an outdated
              or difficult website can affect how people understand your brand
              before they ever contact you.
            </p>

            <p className="mt-6 text-lg leading-8 text-white/60">
              A redesign does not necessarily mean changing everything.
              Sometimes a few targeted improvements can make a significant
              difference. Other times, the existing website has become
              difficult to maintain and a complete rebuild makes more sense.
            </p>

            <p className="mt-6 text-lg leading-8 text-white/60">
              Here are seven signs that it may be worth evaluating your
              current website.
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
            {signs.map((sign, index) => (
              <li key={sign.number}>
                <a
                  href={`#sign-${index + 1}`}
                  className="group flex items-start gap-3 rounded-2xl border border-white/5 bg-white/[0.025] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-blue-400/20 hover:bg-blue-400/[0.05]"
                >
                  <span className="text-xs font-bold text-blue-400">
                    {sign.number}
                  </span>
                  <span className="text-sm leading-6 text-white/60 transition group-hover:text-white/90">
                    {sign.title}
                  </span>
                </a>
              </li>
            ))}

            <li>
              <a
                href="#when-to-redesign"
                className="group flex items-start gap-3 rounded-2xl border border-white/5 bg-white/[0.025] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-blue-400/20 hover:bg-blue-400/[0.05]"
              >
                <span className="text-xs font-bold text-blue-400">08</span>
                <span className="text-sm leading-6 text-white/60 transition group-hover:text-white/90">
                  When should you redesign?
                </span>
              </a>
            </li>

            <li>
              <a
                href="#vertex"
                className="group flex items-start gap-3 rounded-2xl border border-white/5 bg-white/[0.025] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-blue-400/20 hover:bg-blue-400/[0.05]"
              >
                <span className="text-xs font-bold text-blue-400">09</span>
                <span className="text-sm leading-6 text-white/60 transition group-hover:text-white/90">
                  How Vertex Studio can help
                </span>
              </a>
            </li>

            <li>
              <a
                href="#faq"
                className="group flex items-start gap-3 rounded-2xl border border-white/5 bg-white/[0.025] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-blue-400/20 hover:bg-blue-400/[0.05]"
              >
                <span className="text-xs font-bold text-blue-400">10</span>
                <span className="text-sm leading-6 text-white/60 transition group-hover:text-white/90">
                  Frequently asked questions
                </span>
              </a>
            </li>
          </ol>
        </aside>

        {/* Signs */}
        <div className="mx-auto max-w-5xl space-y-8">
          {signs.map((sign, index) => (
            <section
              key={sign.number}
              id={`sign-${index + 1}`}
              className="group scroll-mt-28"
            >
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-7 shadow-xl shadow-black/10 backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-blue-400/20 hover:bg-white/[0.04] hover:shadow-blue-950/20 sm:p-9 lg:p-10">
                <div className="pointer-events-none absolute right-[-80px] top-[-80px] h-52 w-52 rounded-full bg-blue-500/8 blur-3xl transition duration-500 group-hover:bg-blue-400/15" />

                <div className="relative flex flex-col gap-7 lg:flex-row lg:gap-10">
                  <div className="shrink-0">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-400/10 text-sm font-bold text-blue-300 shadow-lg shadow-blue-950/20">
                      {sign.number}
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
                      Sign {sign.number}
                    </p>

                    <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                      {sign.title}
                    </h2>

                    <p className="mt-5 max-w-3xl text-base leading-8 text-white/60 sm:text-lg">
                      {sign.description}
                    </p>

                    <div className="mt-7 rounded-2xl border border-white/8 bg-black/10 p-5 sm:p-6">
                      <p className="text-sm font-semibold text-white/80">
                        Things to look for:
                      </p>

                      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                        {sign.details.map((detail) => (
                          <li
                            key={detail}
                            className="flex gap-3 text-sm leading-6 text-white/55"
                          >
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-400/10 text-xs font-bold text-blue-400">
                              ✓
                            </span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* When to redesign */}
        <section
          id="when-to-redesign"
          className="mx-auto mt-20 max-w-5xl scroll-mt-28"
        >
          <SectionHeading
            eyebrow="The right approach"
            title="When should you actually redesign?"
            description="Seeing one of these signs does not automatically mean you need a complete rebuild. Start by identifying the actual problem."
          />

          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {[
              {
                number: "01",
                title: "Review the business goal",
                description:
                  "Determine what you want the website to accomplish: credibility, leads, bookings, sales, information, or something else.",
              },
              {
                number: "02",
                title: "Review visitor behavior",
                description:
                  "Look at analytics and customer feedback to understand where visitors may be struggling.",
              },
              {
                number: "03",
                title: "Review the technical foundation",
                description:
                  "Check mobile usability, performance, forms, integrations, and the maintainability of the site.",
              },
              {
                number: "04",
                title: "Prioritize improvements",
                description:
                  "Fix the problems that have the biggest effect on the customer experience and business goals first.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group rounded-3xl border border-white/10 bg-white/[0.025] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-400/20 hover:bg-white/[0.04]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-[0.15em] text-blue-400">
                    {item.number}
                  </span>

                  <span className="text-white/15 transition group-hover:text-blue-400/50">
                    ↗
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-bold">{item.title}</h3>

                <p className="mt-3 text-sm leading-7 text-white/55">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Vertex CTA */}
        <section id="vertex" className="mx-auto mt-24 max-w-5xl scroll-mt-28">
          <div className="relative overflow-hidden rounded-[2rem] border border-blue-400/20 bg-gradient-to-br from-blue-500/[0.10] via-white/[0.035] to-cyan-400/[0.06] p-8 shadow-2xl shadow-blue-950/20 backdrop-blur-xl sm:p-10 lg:p-12">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-500/15 blur-[90px]" />
            <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-[90px]" />

            <div className="relative">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                Vertex Studio Works
              </p>

              <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Give your website a{" "}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  stronger foundation
                </span>
              </h2>

              <p className="mt-5 max-w-3xl text-base leading-8 text-white/60 sm:text-lg">
                Vertex Studio Works builds modern, responsive websites designed
                around the business, its customers, and its goals. We can help
                improve design, structure, performance, lead generation, SEO
                fundamentals, and relevant integrations.
              </p>

              <p className="mt-5 max-w-3xl text-base leading-8 text-white/60">
                Whether you need a focused redesign or a completely new
                website, the right approach depends on what your current
                website is trying to accomplish and where it is falling short.
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
                  description="A larger solution for growing businesses that need additional functionality, lead generation, engagement, or e-commerce capabilities."
                  featured
                />
              </div>

              <p className="mt-6 text-sm leading-7 text-white/45">
                Advanced redesign requirements, custom functionality, CRM
                integrations, e-commerce, and other specialized features can be
                quoted separately.
              </p>

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
                  Discuss a Redesign
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
            description="A few common questions businesses ask before deciding whether their website needs a redesign."
          />

          <div className="mt-9 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] backdrop-blur-xl">
            {faqs.map((faq, index) => (
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
              Ready for a refresh?
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Is it time for a website refresh?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/55">
              Tell us what isn't working with your current website and what you
              want to improve.
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