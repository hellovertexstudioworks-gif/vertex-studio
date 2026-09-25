import Link from "next/link";
import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/sections/Chatbot";

export const metadata: Metadata = {
  title:
    "Website vs Social Media: Why Your Business Needs Both | Vertex Studio Works",
  description:
    "Learn the differences between a business website and social media, and how using both can help businesses build credibility, reach customers, and generate leads.",
  alternates: {
    canonical:
      "https://www.vertexstudioworks.com/resources/website-vs-social-media",
  },
  openGraph: {
    title: "Website vs Social Media: Why Your Business Needs Both",
    description:
      "A practical guide to understanding the role of your website and social media in your business's online presence.",
    url: "https://www.vertexstudioworks.com/resources/website-vs-social-media",
    siteName: "Vertex Studio Works",
    type: "article",
  },
};

const comparisons = [
  {
    category: "Ownership",
    website:
      "Your business controls the website, domain, content, and overall experience.",
    social:
      "The account operates on a third-party platform and follows that platform's rules.",
  },
  {
    category: "Brand experience",
    website:
      "You can control the design, layout, messaging, navigation, and customer journey.",
    social:
      "The experience is largely determined by the platform's interface and features.",
  },
  {
    category: "Content",
    website:
      "You can organize detailed information into dedicated pages, resources, services, and other sections.",
    social:
      "Content is generally published through the platform's available post, story, video, and profile formats.",
  },
  {
    category: "Lead generation",
    website:
      "Can use forms, booking systems, landing pages, CRM connections, and other conversion tools.",
    social:
      "Can generate inquiries through messages, profile links, forms, and platform-specific features.",
  },
  {
    category: "Search visibility",
    website:
      "Individual pages can be structured and optimized for search engines.",
    social:
      "Social profiles and posts can provide visibility, but businesses have less control over search presentation.",
  },
  {
    category: "Customer journey",
    website:
      "Can guide visitors through a customized path from information to inquiry, booking, or purchase.",
    social:
      "Designed primarily around social discovery, engagement, and platform interactions.",
  },
];

const faqs = [
  {
    question: "Do I need a website if my business already has social media?",
    answer:
      "For many businesses, a website provides capabilities that social profiles do not, such as detailed service pages, custom landing pages, stronger control over branding, forms, integrations, and a central online destination.",
  },
  {
    question: "Can social media replace a business website?",
    answer:
      "Social media can be an important part of an online presence, but it operates on a third-party platform. A website gives a business more control over its content, customer journey, domain, functionality, and integrations.",
  },
  {
    question: "Which is better for getting customers?",
    answer:
      "They serve different purposes. Social media can help businesses reach and engage audiences, while a website can provide detailed information and conversion-focused experiences. The appropriate mix depends on the business and its customers.",
  },
  {
    question: "Should I link my social media accounts to my website?",
    answer:
      "Yes, when relevant. Linking social profiles to a website can make it easier for visitors to discover the business across different channels and can reinforce the overall brand experience.",
  },
  {
    question: "Can my website help generate leads from social media?",
    answer:
      "Yes. Social posts and profiles can direct interested visitors to dedicated website pages, contact forms, booking pages, landing pages, or other conversion points.",
  },
];

export default function WebsiteVsSocialMediaPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Website vs Social Media: Why Your Business Needs Both",
    description:
      "A practical guide to the differences between business websites and social media.",
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
        "https://www.vertexstudioworks.com/resources/website-vs-social-media",
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
                Digital Growth
              </span>

              <span className="text-white/20">•</span>

              <span className="text-white/45">September 2026</span>

              <span className="text-white/20">•</span>

              <span className="text-white/45">7 min read</span>
            </div>

            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-400">
              Digital Strategy
            </p>

            <h1 className="max-w-5xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-7xl">
              Website vs Social Media:{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                Why Your Business Needs Both
              </span>
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-white/60 sm:text-xl">
              Social media can help businesses reach and engage audiences, while
              a website provides a place to build a more controlled customer
              experience. Here&apos;s how the two can work together.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {[
                "Websites",
                "Social Media",
                "Lead Generation",
                "Digital Growth",
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
              For many businesses, the question isn&apos;t whether they should
              have a website or social media. The two channels can serve very
              different purposes and work together as part of the same digital
              strategy.
            </p>

            <p className="mt-6 text-lg leading-8 text-white/60">
              Social platforms can help businesses discover audiences, share
              content, communicate with customers, and build engagement. A
              website can provide a central destination where customers can
              learn about the business, explore services, submit inquiries,
              book appointments, or make purchases.
            </p>

            <p className="mt-6 text-lg leading-8 text-white/60">
              Understanding the difference can help businesses decide how to
              use each channel effectively.
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
              ["difference", "01", "What&apos;s the main difference?"],
              ["website", "02", "What does a business website do?"],
              ["social", "03", "What does social media do?"],
              ["comparison", "04", "Website vs social media comparison"],
              ["together", "05", "How they work together"],
              ["lead-generation", "06", "Using both for lead generation"],
              ["vertex", "07", "Building your online presence with Vertex Studio"],
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

        {/* Main difference */}
        <section id="difference" className="mx-auto max-w-5xl scroll-mt-28">
          <SectionHeading
            eyebrow="01 / The basics"
            title="What's the main difference?"
            description="The biggest difference is control and purpose."
          />

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <InfoCard
              label="Website"
              title="Your controlled online destination"
              description="A business website gives you greater control over the online experience. You can choose the structure, content, navigation, design, domain, calls to action, forms, and integrations."
              featured
            />

            <InfoCard
              label="Social Media"
              title="Your audience and engagement channel"
              description="Social media operates within a platform. It can be excellent for reaching people and encouraging engagement, but businesses are working within the features, rules, and interface of that platform."
            />
          </div>
        </section>

        {/* Website */}
        <section id="website" className="mx-auto mt-24 max-w-5xl scroll-mt-28">
          <SectionHeading
            eyebrow="02 / Website"
            title="What does a business website do?"
            description="A website can act as the central hub for a business's online presence."
          />

          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {[
              "Explain products and services",
              "Showcase previous work",
              "Provide business information",
              "Generate leads",
              "Collect inquiries",
              "Accept bookings",
              "Sell products",
              "Publish educational content",
              "Connect with CRM systems",
              "Provide customer resources",
            ].map((item, index) => (
              <FeatureCard key={item} number={index + 1} text={item} />
            ))}
          </div>
        </section>

        {/* Social */}
        <section id="social" className="mx-auto mt-24 max-w-5xl scroll-mt-28">
          <SectionHeading
            eyebrow="03 / Social Media"
            title="What does social media do?"
            description="Social media can help businesses distribute content and interact directly with audiences."
          />

          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {[
              "Reach existing and potential audiences",
              "Share updates and educational content",
              "Show the personality of a business",
              "Engage with customers",
              "Promote products or services",
              "Build awareness",
              "Respond to questions and messages",
              "Direct interested visitors toward a website or other destination",
            ].map((item, index) => (
              <FeatureCard key={item} number={index + 1} text={item} />
            ))}
          </div>
        </section>

        {/* Comparison */}
        <section
          id="comparison"
          className="mx-auto mt-24 max-w-5xl scroll-mt-28"
        >
          <SectionHeading
            eyebrow="04 / Side by side"
            title="Website vs social media"
            description="Both channels can contribute to a business's online presence, but they provide different levels of control and different ways to engage visitors."
          />

          <div className="mt-9 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] shadow-2xl shadow-black/10 backdrop-blur-xl">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[780px] border-collapse text-left">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-400/[0.08] to-cyan-400/[0.04]">
                    <th className="border-b border-white/10 p-5 text-sm font-semibold text-white/80">
                      Area
                    </th>

                    <th className="border-b border-white/10 p-5 text-sm font-semibold text-blue-300">
                      Website
                    </th>

                    <th className="border-b border-white/10 p-5 text-sm font-semibold text-cyan-300">
                      Social Media
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {comparisons.map((item) => (
                    <tr
                      key={item.category}
                      className="transition hover:bg-white/[0.025]"
                    >
                      <td className="border-b border-white/10 p-5 align-top text-sm font-semibold text-white">
                        {item.category}
                      </td>

                      <td className="border-b border-white/10 p-5 align-top text-sm leading-7 text-white/55">
                        {item.website}
                      </td>

                      <td className="border-b border-white/10 p-5 align-top text-sm leading-7 text-white/55">
                        {item.social}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Together */}
        <section id="together" className="mx-auto mt-24 max-w-5xl scroll-mt-28">
          <SectionHeading
            eyebrow="05 / Connected strategy"
            title="How can a website and social media work together?"
            description="Instead of treating them as competing channels, businesses can use each one for what it does best."
          />

          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {[
              {
                number: "01",
                title: "Social media → Website",
                description:
                  "A social post can introduce an idea, product, service, or promotion and send interested people to a dedicated website page.",
              },
              {
                number: "02",
                title: "Website → Social media",
                description:
                  "Your website can give visitors easy access to your social profiles so they can continue following the business.",
              },
              {
                number: "03",
                title: "Content → Multiple channels",
                description:
                  "A useful website article can become social posts, short videos, email content, and other marketing material.",
              },
              {
                number: "04",
                title: "Social engagement → Website conversion",
                description:
                  "People who discover the business through social media can be directed to a focused landing page, contact form, booking page, or product page.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-400/20 hover:bg-white/[0.04]"
              >
                <div className="absolute right-[-30px] top-[-30px] h-24 w-24 rounded-full bg-blue-500/10 blur-2xl transition group-hover:bg-blue-400/20" />

                <div className="relative">
                  <span className="text-xs font-bold tracking-[0.18em] text-blue-400">
                    {item.number}
                  </span>

                  <h3 className="mt-5 text-lg font-bold">{item.title}</h3>

                  <p className="mt-3 text-sm leading-7 text-white/55">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Lead Generation */}
        <section
          id="lead-generation"
          className="mx-auto mt-24 max-w-5xl scroll-mt-28"
        >
          <SectionHeading
            eyebrow="06 / Lead generation"
            title="Using both channels for lead generation"
            description="One practical approach is to use social media to attract attention and the website to provide a more focused conversion experience."
          />

          <div className="relative mt-9 overflow-hidden rounded-[2rem] border border-blue-400/20 bg-gradient-to-br from-blue-500/[0.09] via-white/[0.025] to-cyan-400/[0.06] p-7 shadow-2xl shadow-blue-950/20 backdrop-blur-xl sm:p-10">
            <div className="pointer-events-none absolute right-[-80px] top-[-80px] h-64 w-64 rounded-full bg-blue-500/15 blur-[90px]" />

            <div className="relative space-y-4">
              {[
                [
                  "01",
                  "Social post",
                  "A potential customer discovers your content.",
                ],
                ["02", "Website", "They click through to learn more."],
                [
                  "03",
                  "Landing page",
                  "The page explains the offer or service.",
                ],
                [
                  "04",
                  "Call to action",
                  "The visitor requests a quote or contacts the business.",
                ],
                [
                  "05",
                  "CRM",
                  "The inquiry can be captured and organized.",
                ],
                [
                  "06",
                  "Follow-up",
                  "The business continues the conversation.",
                ],
              ].map(([number, title, description], index) => (
                <div key={number}>
                  <div className="flex items-start gap-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10 text-xs font-bold text-blue-300">
                      {number}
                    </span>

                    <div className="pt-1">
                      <p className="font-semibold">{title}</p>

                      <p className="mt-1 text-sm leading-6 text-white/50">
                        {description}
                      </p>
                    </div>
                  </div>

                  {index < 5 && (
                    <div className="ml-5 h-5 border-l border-dashed border-blue-400/20" />
                  )}
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
                Build the website behind your{" "}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  digital presence
                </span>
              </h2>

              <p className="mt-5 max-w-3xl text-base leading-8 text-white/60 sm:text-lg">
                Your website can serve as the central destination for the
                people you reach through social media, search engines,
                referrals, and other marketing channels.
              </p>

              <p className="mt-5 max-w-3xl text-base leading-8 text-white/60">
                Vertex Studio Works builds responsive business websites with
                conversion-focused layouts, SEO fundamentals, lead forms, and
                integrations based on the project&apos;s requirements.
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
                  description="A larger website solution for growing businesses that need additional functionality, engagement, lead generation, or e-commerce capabilities."
                  featured
                />
              </div>

              <p className="mt-6 text-sm leading-7 text-white/45">
                Custom CRM integrations, advanced functionality, e-commerce
                requirements, and other specialized features can be scoped
                separately.
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
                  Start a Project
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
            description="A few common questions about websites, social media, and how the two channels can work together."
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
              Digital presence
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to strengthen your online presence?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/55">
              Build a website that gives your customers a clear place to learn,
              connect, and take action.
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

function InfoCard({
  label,
  title,
  description,
  featured = false,
}: {
  label: string;
  title: string;
  description: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border p-7 backdrop-blur-xl transition duration-300 hover:-translate-y-1 sm:p-8 ${
        featured
          ? "border-blue-400/20 bg-blue-400/[0.05] hover:border-blue-400/30"
          : "border-white/10 bg-white/[0.025] hover:border-white/15"
      }`}
    >
      <div className="absolute right-[-50px] top-[-50px] h-36 w-36 rounded-full bg-blue-500/10 blur-3xl transition group-hover:bg-blue-400/20" />

      <div className="relative">
        <p
          className={`text-xs font-semibold uppercase tracking-[0.18em] ${
            featured ? "text-blue-400" : "text-white/45"
          }`}
        >
          {label}
        </p>

        <h3 className="mt-4 text-2xl font-bold">{title}</h3>

        <p className="mt-4 text-sm leading-7 text-white/55">
          {description}
        </p>
      </div>
    </div>
  );
}

function FeatureCard({
  number,
  text,
}: {
  number: number;
  text: string;
}) {
  return (
    <div className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-400/20 hover:bg-blue-400/[0.04]">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-blue-400/15 bg-blue-400/10 text-xs font-bold text-blue-300">
        {String(number).padStart(2, "0")}
      </span>

      <span className="pt-1 text-sm leading-6 text-white/60 transition group-hover:text-white/85">
        {text}
      </span>
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