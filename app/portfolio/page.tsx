// TASK: Replace app/portfolio/page.tsx with this complete file.

import type { Metadata } from "next";

import Image from "next/image";

import Link from "next/link";



import Navbar from "@/components/layout/Navbar";

import Footer from "@/components/layout/Footer";

import Chatbot from "@/components/sections/Chatbot";



export const metadata: Metadata = {

  title: "Cyril Loon | Founder Portfolio | Vertex Studio Works",

  description:

    "Meet Cyril Loon, Founder and Owner of Vertex Studio Works. Explore his experience across B2B sales, digital marketing, website development, creative work, bookings, and business support.",

};



const capabilities = [

  {

    number: "01",

    title: "Generate Opportunities",

    description:

      "I can help businesses identify prospects, research decision-makers, conduct outreach, qualify leads, follow up, manage CRM activity, and turn conversations into booked opportunities.",

    tags: [

      "Lead Generation",

      "Prospect Research",

      "Cold Calling",

      "Email Outreach",

      "Appointment Setting",

      "CRM",

      "Bookings",

    ],

  },

  {

    number: "02",

    title: "Build Digital Experiences",

    description:

      "I design and develop responsive websites and landing pages while supporting WordPress sites, SEO foundations, content updates, deployment, and ongoing improvements.",

    tags: [

      "Next.js",

      "React",

      "Tailwind CSS",

      "WordPress",

      "HTML / CSS",

      "JavaScript",

      "SEO",

    ],

  },

  {

    number: "03",

    title: "Create & Market",

    description:

      "I support the creative and marketing side of a business through social media, Canva design, content coordination, email campaigns, marketing research, and video editing.",

    tags: [

      "Canva",

      "Social Media",

      "Content",

      "Mailchimp",

      "Video Editing",

      "Marketing",

      "AI-Assisted Content",

    ],

  },

  {

    number: "04",

    title: "Support Business Operations",

    description:

      "I bring structure to day-to-day work through virtual assistance, documentation, SOPs, project coordination, online research, administrative support, and organized workflows.",

    tags: [

      "Virtual Assistance",

      "Admin Support",

      "SOP Creation",

      "Documentation",

      "Project Management",

      "Online Research",

      "AI Tools",

    ],

  },

];



const experience = [

  {

    period: "2025 — 2026",

    role: "Business Development Representative",

    company: "Salary.com",

    description:

      "Worked in B2B business development by researching companies and HR and compensation professionals, conducting cold calls and email outreach, qualifying prospects, scheduling appointments, following up with leads, managing CRM activity, and supporting sales pipeline growth.",

    tags: [

      "B2B Sales",

      "Prospecting",

      "Cold Calling",

      "Email Outreach",

      "Appointment Setting",

      "CRM",

    ],

    type: "sales",

  },

  {

    period: "2023 — 2025",

    role: "Virtual Marketing Assistant",

    company: "UK-Based Life Coaching Client",

    description:

      "Provided remote marketing and business support for a UK-based life coach. Supported social media, lead generation, prospecting, content, online research, administrative workflows, and booking activities designed to attract prospects, generate appointments, and support income-generating activities. Worked with WordPress, Mailchimp, Canva, and other marketing tools.",

    tags: [

      "Life Coaching",

      "Lead Generation",

      "Bookings",

      "WordPress",

      "Mailchimp",

      "Canva",

      "Marketing",

    ],

    type: "marketing",

  },

  {

    period: "2025 — Present",

    role: "Website Developer",

    company: "Part-Time / Independent",

    description:

      "Designed and developed responsive business websites and landing pages across healthcare, construction, restaurant, real estate, coaching, and e-commerce projects. Worked with modern web technologies while handling website structure, SEO foundations, content presentation, updates, maintenance, and deployment.",

    tags: [

      "Next.js",

      "Tailwind CSS",

      "WordPress",

      "Web Design",

      "SEO",

      "Vercel",

    ],

    type: "development",

  },

];



const tools = [

  "Next.js",

  "React",

  "Tailwind CSS",

  "HTML",

  "CSS",

  "JavaScript",

  "WordPress",

  "Canva",

  "Mailchimp",

  "GoHighLevel",

  "ZoomInfo",

  "CRM Platforms",

  "Vercel",

  "Git",

  "Google Workspace",

  "AI-Assisted Research",

  "AI-Assisted Content",

  "Video Editing",

];



const projects = [

  ["BrightSmile Dental", "Healthcare", "/work/brightsmile"],

  ["ForgeBuild", "Construction", "/work/forgebuild"],

  ["Luna Bistro", "Restaurant", "/work/lunabistro"],

  ["Horizon Realty", "Real Estate", "/work/horizon-realty"],

  ["Nova Home", "E-Commerce", "/work/novahome"],

  ["Elevate Coaching", "Coaching", "/work/elevate-coaching"],

];



function ExperienceVisual({ type }: { type: string }) {

  if (type === "sales") {

    return (

      <div className="relative min-h-[330px] overflow-hidden rounded-2xl border border-blue-300/10 bg-gradient-to-br from-[#0b1735] via-[#0b1024] to-[#081f2d] p-5">

        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />



        <div className="relative">

          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">

            B2B Outreach

          </p>



          <p className="mt-1 text-sm font-semibold text-white">

            Prospect → Conversation → Booking

          </p>



          <div className="mt-6 grid grid-cols-3 gap-2">

            {[

              ["Prospects", "128"],

              ["Outreach", "76"],

              ["Meetings", "18"],

            ].map(([label, value]) => (

              <div

                key={label}

                className="rounded-xl border border-white/[0.07] bg-white/[0.035] p-3"

              >

                <p className="text-[9px] uppercase tracking-wider text-slate-500">

                  {label}

                </p>



                <p className="mt-2 text-lg font-semibold text-white">

                  {value}

                </p>

              </div>

            ))}

          </div>



          <div className="mt-4 rounded-xl border border-white/[0.07] bg-white/[0.035] p-4">

            <div className="flex items-center justify-between">

              <span className="text-[10px] text-slate-400">

                Lead journey

              </span>



              <span className="text-[10px] text-cyan-300">

                Follow-up ready

              </span>

            </div>



            <div className="mt-4 grid grid-cols-4 gap-2">

              {["Research", "Contact", "Qualify", "Book"].map(

                (item, i) => (

                  <div key={item} className="text-center">

                    <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full border border-blue-300/20 bg-blue-500/10 text-[10px] font-semibold text-blue-200">

                      0{i + 1}

                    </div>



                    <p className="mt-2 text-[9px] text-slate-400">

                      {item}

                    </p>

                  </div>

                )

              )}

            </div>



            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">

              <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-300" />

            </div>

          </div>

        </div>

      </div>

    );

  }



  if (type === "marketing") {

    return (

      <div className="relative min-h-[330px] overflow-hidden rounded-2xl border border-fuchsia-300/10 bg-gradient-to-br from-[#19102c] via-[#0e1025] to-[#092330] p-5">

        <div className="absolute -left-12 -top-16 h-52 w-52 rounded-full bg-fuchsia-500/15 blur-3xl" />

        <div className="absolute -bottom-16 -right-10 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />



        <div className="relative">

          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-fuchsia-300">

            Marketing Workflow

          </p>



          <p className="mt-1 text-sm font-semibold text-white">

            Attract → Nurture → Book

          </p>



          <div className="mt-5 grid grid-cols-2 gap-3">

            <div className="rounded-xl border border-white/[0.07] bg-white/[0.035] p-4">

              <div className="h-20 rounded-lg bg-gradient-to-br from-fuchsia-400/20 via-purple-500/10 to-cyan-400/10 p-3">

                <div className="h-2 w-1/2 rounded-full bg-white/20" />

                <div className="mt-3 h-2 w-3/4 rounded-full bg-white/10" />

                <div className="mt-2 h-2 w-2/3 rounded-full bg-white/10" />

              </div>



              <p className="mt-3 text-[11px] font-semibold text-white">

                Canva Content

              </p>



              <p className="mt-1 text-[9px] text-slate-500">

                Social / Creative

              </p>

            </div>



            <div className="rounded-xl border border-white/[0.07] bg-white/[0.035] p-4">

              <div className="h-20 rounded-lg border border-yellow-300/10 bg-yellow-300/[0.04] p-3">

                <div className="text-[9px] text-yellow-200">

                  MAILCHIMP

                </div>



                <div className="mt-3 h-2 w-full rounded-full bg-white/10" />

                <div className="mt-2 h-2 w-4/5 rounded-full bg-white/10" />

                <div className="mt-3 h-4 w-1/2 rounded bg-orange-300/20" />

              </div>



              <p className="mt-3 text-[11px] font-semibold text-white">

                Email Marketing

              </p>



              <p className="mt-1 text-[9px] text-slate-500">

                Campaign / Follow-up

              </p>

            </div>

          </div>



          <div className="mt-3 rounded-xl border border-white/[0.07] bg-white/[0.035] p-4">

            <div className="flex items-center justify-between">

              <span className="text-[10px] text-slate-400">

                Coach / Client Growth Flow

              </span>



              <span className="text-[10px] text-fuchsia-300">

                Content + Email + Booking

              </span>

            </div>



            <div className="mt-4 flex items-center gap-2">

              {["Reach", "Engage", "Email", "Book"].map(

                (item, i) => (

                  <div

                    key={item}

                    className="flex flex-1 flex-col items-center"

                  >

                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-fuchsia-300/15 bg-fuchsia-400/10 text-[9px] font-semibold text-fuchsia-200">

                      0{i + 1}

                    </div>



                    <span className="mt-2 text-[9px] text-slate-400">

                      {item}

                    </span>

                  </div>

                )

              )}

            </div>

          </div>

        </div>

      </div>

    );

  }



  return (

    <div className="relative min-h-[330px] overflow-hidden rounded-2xl border border-emerald-300/10 bg-gradient-to-br from-[#081e20] via-[#0b1324] to-[#10102a] p-5">

      <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-emerald-400/10 blur-3xl" />



      <div className="relative">

        <div className="flex items-center justify-between border-b border-white/[0.07] pb-3">

          <div className="flex gap-1.5">

            <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />

            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />

            <span className="h-2.5 w-2.5 rounded-full bg-green-400/60" />

          </div>



          <span className="text-[9px] text-slate-600">

            website-project.tsx

          </span>

        </div>



        <div className="mt-5 font-mono text-[11px] leading-7">

          <p>

            <span className="text-purple-300">const</span>{" "}

            <span className="text-cyan-300">website</span>{" "}

            <span className="text-slate-500">=</span>{" "}

            <span className="text-yellow-200">{"{"}</span>

          </p>



          <p className="pl-5">

            <span className="text-slate-500">framework:</span>{" "}

            <span className="text-emerald-300">&quot;Next.js&quot;</span>

          </p>



          <p className="pl-5">

            <span className="text-slate-500">cms:</span>{" "}

            <span className="text-emerald-300">&quot;WordPress&quot;</span>

          </p>



          <p className="pl-5">

            <span className="text-slate-500">styling:</span>{" "}

            <span className="text-emerald-300">

              &quot;Tailwind CSS&quot;

            </span>

          </p>



          <p className="pl-5">

            <span className="text-slate-500">responsive:</span>{" "}

            <span className="text-blue-300">true</span>

          </p>



          <p className="pl-5">

            <span className="text-slate-500">seo:</span>{" "}

            <span className="text-blue-300">true</span>

          </p>



          <p className="pl-5">

            <span className="text-slate-500">deployment:</span>{" "}

            <span className="text-emerald-300">&quot;Vercel&quot;</span>

          </p>



          <p>

            <span className="text-yellow-200">{"}"}</span>

          </p>

        </div>



        <div className="mt-5 grid grid-cols-3 gap-2">

          {["Design", "Develop", "Deploy"].map((item, i) => (

            <div

              key={item}

              className="rounded-lg border border-white/[0.07] bg-white/[0.025] p-3 text-center"

            >

              <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-emerald-400/10 text-[9px] font-semibold text-emerald-300">

                0{i + 1}

              </div>



              <p className="mt-2 text-[9px] text-slate-400">

                {item}

              </p>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}




const workflowDemos = [
  {
    number: "01",
    label: "Example workflow",
    workflowType: "Lead Generation",
    title: "Prospect → Outreach → Follow-up → Booking",
    description:
      "A visual example of how I can take a prospect from research and personalized outreach through follow-up, booking, and organized CRM execution.",
    steps: [
      ["Research", "Find the right company and decision-maker."],
      ["Personalize", "Build a relevant outreach angle."],
      ["Follow up", "Keep the conversation organized."],
      ["Book", "Move qualified interest toward a meeting."],
    ],
    detailTitle: "Cold email example",
    detailText: "Personalized outreach",
    detailType: "email",
    pipelineTitle: "GHL / CRM example",
    pipelineText: "Lead follow-up pipeline",
    tools: ["ZoomInfo", "Email", "CRM", "GoHighLevel"],
    accent: "cyan",
    demonstrates: [
      ["Research", "Finding useful information before contacting someone."],
      ["Personalization", "Turning research into a relevant message instead of generic spam."],
      ["Systems", "Keeping leads, follow-ups, tasks, and bookings organized."],
      ["Execution", "Actually moving the workflow forward instead of stopping at strategy."],
    ],
    biggerTitle:
      "I can plug into the work between marketing, sales, technology, and operations.",
    biggerText:
      "That means I can help a team create content, find prospects, run outreach, organize follow-ups, support CRM workflows, manage bookings, and keep digital tasks moving.",
  },
  {
    number: "02",
    label: "Example workflow",
    workflowType: "Social Media Management",
    title: "Plan → Create → Schedule → Convert → Improve",
    description:
      "A social media manager example showing how content can be planned around a business goal, created, scheduled, pushed toward a CTA, and reviewed for the next campaign.",
    steps: [
      ["Plan", "Choose the audience, goal, and content angle."],
      ["Create", "Build the visual, caption, and CTA."],
      ["Schedule", "Organize posts around a content calendar."],
      ["Convert", "Send attention toward a click, inquiry, or booking."],
      ["Improve", "Review what worked and adjust the next post."],
    ],
    detailTitle: "Content example",
    detailText: "Post built around a CTA",
    detailType: "social",
    pipelineTitle: "Social → Booking example",
    pipelineText: "Attention moving toward action",
    tools: ["Canva", "Content Calendar", "Social Platforms", "GoHighLevel"],
    accent: "fuchsia",
    demonstrates: [
      ["Strategy", "Planning content around an audience and a measurable business goal."],
      ["Creation", "Turning an idea into a useful visual, caption, and call to action."],
      ["Consistency", "Using a content calendar to keep publishing organized."],
      ["Conversion", "Giving people a clear path from a post to a click, inquiry, or booking."],
      ["Optimization", "Using engagement and click signals to improve future content."],
    ],
    biggerTitle:
      "Social media can support the business — not just fill an Instagram feed.",
    biggerText:
      "I can help connect content planning, Canva creation, scheduling, calls to action, landing pages, lead capture, and follow-up so social activity has a purpose beyond posting.",
  },
  {
    number: "03",
    label: "Example workflow",
    workflowType: "Digital Marketing",
    title: "Content → Click → Lead → Nurture → Booking",
    description:
      "A marketing funnel example connecting content and email with landing pages, lead capture, CRM activity, and booking follow-up.",
    steps: [
      ["Attract", "Publish useful content around the offer."],
      ["Click", "Give the audience a clear next step."],
      ["Capture", "Turn interest into an inquiry or lead."],
      ["Nurture", "Use email and CRM follow-up to stay connected."],
      ["Book", "Move qualified interest toward a conversation."],
    ],
    detailTitle: "Campaign example",
    detailText: "Content + email + CTA",
    detailType: "campaign",
    pipelineTitle: "GHL / CRM example",
    pipelineText: "Lead nurture pipeline",
    tools: ["Canva", "Mailchimp", "GoHighLevel", "Booking Flow"],
    accent: "emerald",
    demonstrates: [
      ["Content", "Creating a useful reason for someone to pay attention."],
      ["CTA", "Giving the audience one clear next action."],
      ["Lead capture", "Making it easy to turn interest into an inquiry."],
      ["Nurture", "Following up so the lead does not disappear after the first click."],
      ["Booking", "Connecting qualified interest to the next business conversation."],
    ],
    biggerTitle:
      "The goal is to connect the marketing activity to what happens next.",
    biggerText:
      "Instead of treating content, email, CRM, and bookings as separate tasks, I can help organize them as one connected customer journey.",
  },
] as const;

function WorkflowDemo({
  demo,
}: {
  demo: (typeof workflowDemos)[number];
}) {
  const accentClasses = {
    cyan: {
      border: "border-cyan-300/15 hover:border-cyan-300/30",
      glow: "bg-cyan-400/10",
      text: "text-cyan-300",
      line: "bg-cyan-300/30",
      soft: "bg-cyan-400/[0.06]",
      strong: "bg-cyan-300/70",
    },
    fuchsia: {
      border: "border-fuchsia-300/15 hover:border-fuchsia-300/30",
      glow: "bg-fuchsia-400/10",
      text: "text-fuchsia-300",
      line: "bg-fuchsia-300/30",
      soft: "bg-fuchsia-400/[0.06]",
      strong: "bg-fuchsia-300/70",
    },
    emerald: {
      border: "border-emerald-300/15 hover:border-emerald-300/30",
      glow: "bg-emerald-400/10",
      text: "text-emerald-300",
      line: "bg-emerald-300/30",
      soft: "bg-emerald-400/[0.06]",
      strong: "bg-emerald-300/70",
    },
  }[demo.accent];

  const actionLabels =
    demo.number === "01"
      ? ["Research", "Personalize", "Outreach", "Follow-up", "Book"]
      : demo.number === "02"
        ? ["Plan", "Create", "Schedule", "Publish", "Convert"]
        : ["Content", "Click", "Capture", "Nurture", "Book"];

  return (
    <article
      className={`group relative overflow-hidden rounded-[2rem] border bg-[#080d1d]/85 p-6 transition duration-500 hover:-translate-y-1 sm:p-7 lg:p-8 ${accentClasses.border}`}
    >
      <div
        className={`pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full blur-3xl ${accentClasses.glow}`}
      />

      <div className="relative grid gap-7 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8">
        <div className="min-w-0 rounded-[1.6rem] border border-white/[0.07] bg-[#080d1b]/90 p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4 border-b border-white/[0.07] pb-5">
            <div>
              <p
                className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${accentClasses.text}`}
              >
                {demo.label}
              </p>

              <h3 className="mt-2 text-base font-semibold text-white sm:text-lg">
                {demo.title}
              </h3>
            </div>

            <span
              className={`shrink-0 rounded-full border border-white/[0.06] ${accentClasses.soft} px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.16em] ${accentClasses.text}`}
            >
              {demo.workflowType}
            </span>
          </div>

          <div
            className={`mt-7 grid gap-2.5 ${
              demo.steps.length === 4 ? "sm:grid-cols-4" : "sm:grid-cols-5"
            }`}
          >
            {demo.steps.map(([step, detail], stepIndex) => (
              <div key={step} className="relative">
                <div
                  className={`h-full min-h-[122px] rounded-xl border bg-[#0a1022] p-4 transition duration-500 ${
                    stepIndex === 0
                      ? `${accentClasses.border} ${accentClasses.soft}`
                      : "border-white/[0.07]"
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full border border-white/10 ${accentClasses.soft} text-[9px] font-bold ${accentClasses.text}`}
                  >
                    0{stepIndex + 1}
                  </div>

                  <p className="mt-4 text-[11px] font-semibold text-white">
                    {step}
                  </p>

                  <p className="mt-2 text-[9px] leading-5 text-slate-500">
                    {detail}
                  </p>
                </div>

                {stepIndex < demo.steps.length - 1 ? (
                  <span
                    className={`pointer-events-none absolute -right-2 top-1/2 hidden h-px w-2 ${accentClasses.line} sm:block`}
                  />
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-white/[0.07] bg-[#0a1022] p-5">
              <div className="flex items-center justify-between">
                <p
                  className={`text-[8px] font-semibold uppercase tracking-[0.18em] ${accentClasses.text}`}
                >
                  {demo.detailTitle}
                </p>

                <span className="text-[8px] text-slate-600">draft</span>
              </div>

              <p className="mt-2 text-[11px] font-semibold text-white">
                {demo.detailText}
              </p>

              {demo.detailType === "email" ? (
                <div className="mt-5 space-y-2">
                  <div className="h-1.5 w-[62%] rounded-full bg-cyan-300/55" />
                  <div className="h-1.5 w-[80%] rounded-full bg-cyan-300/30" />
                  <div className="h-1.5 w-[42%] rounded-full bg-cyan-300/20" />
                  <div className="h-1.5 w-[88%] rounded-full bg-white/[0.06]" />
                </div>
              ) : demo.detailType === "social" ? (
                <div className="mt-5 flex gap-3">
                  <div
                    className={`h-16 w-16 rounded-lg border border-white/[0.07] ${accentClasses.soft}`}
                  />

                  <div className="flex-1 space-y-2 pt-1">
                    <div className="h-1.5 w-[78%] rounded-full bg-white/[0.12]" />
                    <div className="h-1.5 w-[58%] rounded-full bg-white/[0.07]" />

                    <div
                      className={`mt-3 h-5 w-20 rounded-md ${accentClasses.soft}`}
                    />
                  </div>
                </div>
              ) : (
                <div className="mt-5 grid grid-cols-3 gap-2">
                  <div className={`h-14 rounded-lg ${accentClasses.soft}`} />
                  <div className="h-14 rounded-lg bg-white/[0.035]" />
                  <div className="h-14 rounded-lg bg-white/[0.025]" />
                </div>
              )}
            </div>

            <div className="rounded-xl border border-white/[0.07] bg-[#0a1022] p-5">
              <div className="flex items-center justify-between">
                <p
                  className={`text-[8px] font-semibold uppercase tracking-[0.18em] ${accentClasses.text}`}
                >
                  {demo.pipelineTitle}
                </p>

                <span className="text-[8px] text-emerald-300">
                  organized
                </span>
              </div>

              <p className="mt-2 text-[11px] font-semibold text-white">
                {demo.pipelineText}
              </p>

              <div className="mt-5 grid grid-cols-3 gap-2">
                {[
                  ["NEW LEAD", "Prospect"],
                  ["FOLLOW-UP", "Next touch"],
                  ["BOOKED", "Meeting ready"],
                ].map(([label, value], index) => (
                  <div
                    key={label}
                    className={`rounded-lg border p-2.5 ${
                      index === 2
                        ? "border-emerald-300/15 bg-emerald-400/[0.05]"
                        : "border-white/[0.06] bg-white/[0.02]"
                    }`}
                  >
                    <p className="text-[6px] uppercase tracking-[0.16em] text-slate-600">
                      {label}
                    </p>

                    <p
                      className={`mt-2 text-[7px] ${
                        index === 2
                          ? "text-emerald-200"
                          : "text-slate-500"
                      }`}
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Extra visual panel fills the lower space with a real workflow explanation. */}
          <div
            className={`relative mt-5 overflow-hidden rounded-xl border border-white/[0.07] ${accentClasses.soft} p-5`}
          >
            <div
              className={`pointer-events-none absolute left-0 top-0 h-px w-28 ${accentClasses.strong}`}
              style={{
                animation: "workflowInnerSweep 4.5s ease-in-out infinite",
              }}
            />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p
                  className={`text-[8px] font-semibold uppercase tracking-[0.2em] ${accentClasses.text}`}
                >
                  Tools in action
                </p>

                <p className="mt-2 text-[11px] font-semibold text-white sm:text-xs">
                  One task moving through the system.
                </p>
              </div>

              <span className="text-[8px] uppercase tracking-[0.16em] text-slate-600">
                Example process
              </span>
            </div>

            <div className="mt-5 grid grid-cols-5 gap-1.5">
              {actionLabels.map((label, index) => (
                <div key={label} className="relative">
                  <div
                    className={`rounded-lg border border-white/[0.06] bg-[#080d1b]/80 px-2 py-3 text-center ${
                      index === actionLabels.length - 1
                        ? "border-emerald-300/15 bg-emerald-400/[0.05]"
                        : ""
                    }`}
                  >
                    <p
                      className={`text-[7px] font-semibold uppercase tracking-[0.08em] ${
                        index === actionLabels.length - 1
                          ? "text-emerald-200"
                          : "text-slate-400"
                      }`}
                    >
                      {label}
                    </p>
                  </div>

                  {index < actionLabels.length - 1 ? (
                    <span className="pointer-events-none absolute -right-1.5 top-1/2 z-10 h-px w-1.5 bg-white/10" />
                  ) : null}
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {demo.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-white/[0.06] bg-white/[0.025] px-2.5 py-1 text-[8px] font-medium text-slate-400"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-4">
          <div className="rounded-[1.6rem] border border-white/[0.07] bg-[#080d1b]/90 p-6 sm:p-7">
            <p
              className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${accentClasses.text}`}
            >
              What this demonstrates
            </p>

            <div className="mt-6 divide-y divide-white/[0.07]">
              {demo.demonstrates.map(([title, text]) => (
                <div key={title} className="py-4 first:pt-0 last:pb-0">
                  <p className="text-[11px] font-semibold text-white">
                    {title}
                  </p>

                  <p className="mt-2 text-[9px] leading-5 text-slate-400 sm:text-[10px]">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`relative flex-1 overflow-hidden rounded-[1.6rem] border border-white/[0.07] ${accentClasses.soft} p-6 sm:p-7`}
          >
            <div className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-white/[0.025] blur-2xl" />

            <div className="relative flex h-full flex-col">
              <p
                className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${accentClasses.text}`}
              >
                The bigger picture
              </p>

              <h4 className="mt-5 text-xl font-semibold leading-7 tracking-tight text-white sm:text-2xl">
                {demo.biggerTitle}
              </h4>

              <p className="mt-4 text-[10px] leading-6 text-slate-400 sm:text-xs sm:leading-6">
                {demo.biggerText}
              </p>

              <div className="mt-auto pt-8">
                <div className="mb-3 flex items-center justify-between text-[8px] uppercase tracking-[0.16em]">
                  <span className="text-slate-600">Workflow focus</span>
                  <span className={accentClasses.text}>Business goal</span>
                </div>

                <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className={`h-full w-[78%] rounded-full ${accentClasses.strong}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function PortfolioPage() {

  return (

    <main className="min-h-screen overflow-hidden bg-[#050816] text-white">

      <Navbar />



      {/* HERO */}

      <section className="relative overflow-hidden pb-24 pt-32 sm:pb-32 sm:pt-40">

        <div className="pointer-events-none absolute inset-0">

          <div className="absolute left-[5%] top-[-100px] h-[550px] w-[650px] animate-pulse rounded-full bg-blue-600/15 blur-[150px]" />

          <div className="absolute right-[-120px] top-[180px] h-[500px] w-[500px] animate-pulse rounded-full bg-cyan-400/10 blur-[140px]" />

          <div className="absolute left-[40%] top-[50%] h-[350px] w-[350px] rounded-full bg-fuchsia-500/5 blur-[120px]" />

        </div>



        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.82fr] lg:gap-20">

            <div>

              <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-400/5 px-4 py-2">

                <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.9)]" />



                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">

                  Founder & Owner

                </span>

              </div>



              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-blue-300">

                Vertex Studio Works

              </p>



              <h1 className="max-w-3xl text-5xl font-semibold tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">Cyril <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-300 bg-clip-text text-transparent">Loon.</span></h1>



              <p className="mt-7 max-w-2xl text-xl font-medium leading-8 text-slate-200 sm:text-2xl">

                Sales. Marketing. Technology. Business Support.

              </p>



              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">

                The person behind Vertex Studio Works, combining experience

                in B2B business development, digital marketing, website

                development, creative content, bookings, and business

                operations.

              </p>



              <div className="mt-9 flex flex-col gap-3 sm:flex-row">

                <a

                  href="#experience"

                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]"

                >

                  Explore My Experience

                  <span className="ml-2">↓</span>

                </a>



                <Link

                  href="/#contact"

                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white transition hover:border-cyan-300/30 hover:bg-cyan-400/10"

                >

                  Let&apos;s Connect

                </Link>

              </div>



              <div className="mt-10 flex flex-wrap gap-2">

                {[

                  "Sales",

                  "Marketing",

                  "Web",

                  "Creative",

                  "Operations",

                ].map((item) => (

                  <span

                    key={item}

                    className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400"

                  >

                    {item}

                  </span>

                ))}

              </div>

            </div>



            <div className="relative mx-auto w-full max-w-[430px] lg:ml-auto">

              <div className="absolute -inset-8 rounded-[2rem] bg-gradient-to-br from-blue-500/20 via-cyan-400/10 to-fuchsia-500/10 blur-3xl" />



              <div className="relative">

                <div className="absolute -inset-6 rounded-[2.2rem] bg-gradient-to-br from-blue-500/15 via-cyan-400/8 to-fuchsia-500/10 blur-3xl" />



                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-3 shadow-2xl shadow-blue-950/30">

                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-slate-900">

                    <Image

                      src="/profile.jpg"

                      alt="Cyril Loon"

                      fill

                      priority

                      className="object-cover object-center"

                      sizes="(max-width: 1024px) 90vw, 430px"

                    />

                  </div>

                </div>



                <div className="relative mt-5 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5 shadow-xl shadow-black/10 backdrop-blur-xl sm:p-6">

                  <div className="flex items-start gap-4">

                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.8)]" />



                    <div>

                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">

                        Behind Vertex

                      </p>



                      <p className="mt-2 text-lg font-semibold text-white sm:text-xl">

                        Founder-led. Hands-on.

                      </p>



                      <p className="mt-2 max-w-md text-xs leading-6 text-slate-400 sm:text-sm">

                        Strategy, communication, technology, creativity, and

                        execution in one skill set.

                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>



      {/* ABOUT */}

      <section className="border-y border-white/[0.06] bg-gradient-to-r from-blue-500/[0.035] via-fuchsia-500/[0.02] to-cyan-400/[0.035] py-24">

        <div className="mx-auto max-w-6xl px-6 lg:px-8">

          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-300">

                The Person Behind Vertex

              </p>



              <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">

                Built from more than one skill.

              </h2>

            </div>



            <div className="space-y-6 text-base leading-8 text-slate-400 sm:text-lg">

              <p>

                My professional background has taken me across B2B business

                development, digital marketing, virtual assistance,

                prospecting, administrative operations, and website

                development.

              </p>



              <p>

                I have also worked with marketing and business systems such

                as WordPress, Mailchimp, Canva, CRM tools, and booking

                workflows, giving me experience beyond just designing a

                website.

              </p>



              <p>

                Vertex Studio Works is where I bring these skills together

                into practical digital work for businesses.

              </p>

            </div>

          </div>

        </div>

      </section>



      {/* CAPABILITIES */}

      <section className="relative py-24 sm:py-28">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="max-w-3xl">

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">

              What I Bring to the Table

            </p>



            <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">

              More ways to contribute.

            </h2>



            <p className="mt-6 text-base leading-8 text-slate-400 sm:text-lg">

              I bring a combination of technical, creative, sales, marketing,

              and operational skills that can adapt to different roles,

              businesses, and projects.

            </p>

          </div>



          <div className="mt-14 grid gap-5 md:grid-cols-2">

            {capabilities.map((item, index) => (

              <article

                key={item.number}

                className={`group relative overflow-hidden rounded-3xl border p-7 transition duration-500 hover:-translate-y-2 sm:p-8 ${

                  index % 2 === 0

                    ? "border-blue-400/10 bg-gradient-to-br from-blue-500/[0.08] to-white/[0.02] hover:border-blue-300/25"

                    : "border-fuchsia-400/10 bg-gradient-to-br from-fuchsia-500/[0.06] to-white/[0.02] hover:border-fuchsia-300/25"

                }`}

              >

                <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-400/5 blur-3xl transition group-hover:bg-cyan-400/10" />



                <div className="relative">

                  <div className="flex items-start justify-between">

                    <span className="text-sm font-semibold text-blue-300">

                      {item.number}

                    </span>



                    <span className="text-[10px] uppercase tracking-[0.2em] text-slate-600">

                      Capability

                    </span>

                  </div>



                  <h3 className="mt-7 text-2xl font-semibold tracking-tight text-white">

                    {item.title}

                  </h3>



                  <p className="mt-4 text-sm leading-7 text-slate-400">

                    {item.description}

                  </p>



                  <div className="mt-7 flex flex-wrap gap-2">

                    {item.tags.map((tag) => (

                      <span

                        key={tag}

                        className="rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-1.5 text-xs font-medium text-slate-300"

                      >

                        {tag}

                      </span>

                    ))}

                  </div>

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>



      {/* WORKFLOW DEMOS */}
      <section className="relative overflow-hidden border-y border-white/[0.06] bg-[#060918] py-24 sm:py-28">
        <style>{`
          @keyframes workflowSweep {
            0% { transform: translateX(-120%); opacity: 0; }
            12% { opacity: 1; }
            55% { opacity: 1; }
            100% { transform: translateX(520%); opacity: 0; }
          }

          @keyframes workflowInnerSweep {
            0% { transform: translateX(-120%); opacity: 0; }
            15% { opacity: 1; }
            55% { opacity: 1; }
            100% { transform: translateX(900%); opacity: 0; }
          }
        `}</style>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_15%,rgba(34,211,238,0.07),transparent_28%),radial-gradient(circle_at_82%_65%,rgba(217,70,239,0.06),transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">Show, don&apos;t just tell</p>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Don&apos;t just read the skills. See the workflow.</h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">These are example workflows — not claimed client results. They show how I can connect marketing, sales, content, CRM, and bookings into practical business processes.</p>
          </div>

          <div className="mt-14 space-y-7">
            {workflowDemos.map((demo, index) => (
              <div key={demo.number} className="relative">
                <div className="pointer-events-none absolute left-12 top-8 z-20 h-px w-20 bg-gradient-to-r from-transparent via-white/50 to-transparent" style={{ animation: "workflowSweep 5.5s ease-in-out infinite", animationDelay: `${index * 1.2}s` }} />
                <WorkflowDemo demo={demo} />
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-5 py-4 text-center text-sm text-slate-500">The point isn&apos;t the tool by itself. <span className="text-slate-300">It&apos;s how the pieces connect to a business goal.</span></div>
        </div>
      </section>

      {/* EXPERIENCE */}

      <section

        id="experience"

        className="border-y border-white/[0.06] bg-gradient-to-b from-[#070b1b] to-[#090a1d] py-24 sm:py-28"

      >

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="max-w-3xl">

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-fuchsia-300">

              Professional Experience

            </p>



            <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">

              Experience you can see.

            </h2>



            <p className="mt-6 text-base leading-8 text-slate-400 sm:text-lg">

              Different roles, different environments, one growing skill set.

            </p>

          </div>



          <div className="mt-14 space-y-6">

            {experience.map((item, index) => (

              <article

                key={item.role}

                className="overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.02] shadow-2xl shadow-black/10"

              >

                <div className="grid lg:grid-cols-[0.9fr_1.1fr]">

                  <div className="p-7 sm:p-9 lg:p-10">

                    <div className="flex items-start justify-between gap-5">

                      <div>

                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">

                          {item.period}

                        </p>



                        <h3 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">

                          {item.role}

                        </h3>



                        <p className="mt-2 text-sm font-medium text-slate-400">

                          {item.company}

                        </p>

                      </div>



                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-xs font-semibold text-slate-500">

                        0{index + 1}

                      </span>

                    </div>



                    <p className="mt-7 text-sm leading-7 text-slate-400">

                      {item.description}

                    </p>



                    <div className="mt-7 flex flex-wrap gap-2">

                      {item.tags.map((tag) => (

                        <span

                          key={tag}

                          className="rounded-full bg-blue-500/[0.07] px-3 py-1.5 text-xs font-medium text-blue-200"

                        >

                          {tag}

                        </span>

                      ))}

                    </div>

                  </div>



                  <div className="border-t border-white/[0.06] p-4 sm:p-5 lg:border-l lg:border-t-0 lg:p-6">

                    <ExperienceVisual type={item.type} />

                  </div>

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>




      {/* SOCIAL MEDIA MANAGEMENT */}
      <section className="relative border-y border-white/[0.06] bg-[#070b18] py-24 sm:py-32">
        <div className="pointer-events-none absolute left-[10%] top-20 h-72 w-72 rounded-full bg-fuchsia-500/[0.06] blur-[120px]" />
        <div className="pointer-events-none absolute right-[5%] bottom-20 h-80 w-80 rounded-full bg-cyan-400/[0.06] blur-[130px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-fuchsia-300">
              Social Media Management
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              More than posting. Built around a business goal.
            </h2>

            <p className="mt-6 text-base leading-8 text-slate-400 sm:text-lg">
              I can support the full social media workflow — from audience and
              content planning to creation, scheduling, calls to action,
              lead capture, follow-up, and performance review.
            </p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[2rem] border border-fuchsia-300/10 bg-gradient-to-br from-fuchsia-500/[0.07] via-white/[0.02] to-cyan-400/[0.04] p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-fuchsia-300">
                    Example campaign
                  </p>

                  <h3 className="mt-2 text-xl font-semibold text-white">
                    Booking-focused social campaign
                  </h3>
                </div>

                <span className="rounded-full border border-white/[0.07] bg-white/[0.035] px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Sample
                </span>
              </div>

              <div className="mt-7 rounded-2xl border border-white/[0.07] bg-[#080d1b] p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-400/20 to-cyan-400/10 text-xs font-bold text-white">
                    V
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold text-white">
                      Example Business
                    </p>

                    <p className="text-[8px] text-slate-600">
                      Instagram • Facebook
                    </p>
                  </div>
                </div>

                <div className="mt-5 overflow-hidden rounded-xl border border-white/[0.06] bg-gradient-to-br from-fuchsia-400/10 via-purple-400/[0.04] to-cyan-400/10 p-5">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-fuchsia-200">
                    Educational post
                  </p>

                  <p className="mt-4 max-w-md text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl">
                    3 things customers check before they book.
                  </p>

                  <p className="mt-4 max-w-md text-xs leading-6 text-slate-400">
                    Useful information first. Then a clear next step for
                    people who are ready to learn more.
                  </p>

                  <div className="mt-6 inline-flex rounded-full bg-white px-4 py-2 text-[9px] font-semibold text-slate-950">
                    Book a consultation →
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                    Example caption structure
                  </p>

                  <div className="mt-3 space-y-2">
                    <div className="h-1.5 w-[82%] rounded-full bg-white/[0.11]" />
                    <div className="h-1.5 w-[68%] rounded-full bg-white/[0.07]" />
                    <div className="h-1.5 w-[54%] rounded-full bg-fuchsia-300/30" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-5">
              <div className="rounded-[2rem] border border-white/[0.07] bg-white/[0.025] p-6 sm:p-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
                  Content strategy
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    ["01", "Educate"],
                    ["02", "Build trust"],
                    ["03", "Promote"],
                    ["04", "Convert"],
                  ].map(([number, label]) => (
                    <div
                      key={number}
                      className="rounded-xl border border-white/[0.07] bg-[#080d1b] p-4"
                    >
                      <span className="text-[8px] font-semibold text-cyan-300">
                        {number}
                      </span>

                      <p className="mt-3 text-[10px] font-semibold text-white">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/[0.07] bg-white/[0.025] p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
                      Example content calendar
                    </p>

                    <p className="mt-2 text-xs text-slate-500">
                      A simple weekly structure
                    </p>
                  </div>

                  <span className="text-[8px] uppercase tracking-[0.16em] text-slate-600">
                    Sample
                  </span>
                </div>

                <div className="mt-6 overflow-hidden rounded-xl border border-white/[0.06]">
                  {[
                    ["MON", "Educational", "Carousel"],
                    ["WED", "Trust / Story", "Reel"],
                    ["FRI", "Offer / CTA", "Post"],
                  ].map(([day, type, format]) => (
                    <div
                      key={day}
                      className="grid grid-cols-[52px_1fr_auto] items-center gap-3 border-b border-white/[0.06] bg-[#080d1b] px-4 py-3 last:border-b-0"
                    >
                      <span className="text-[8px] font-semibold text-cyan-300">
                        {day}
                      </span>

                      <span className="text-[9px] font-medium text-slate-300">
                        {type}
                      </span>

                      <span className="text-[8px] text-slate-600">
                        {format}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>


          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            <div className="rounded-[2rem] border border-white/[0.07] bg-[#080d1b] p-6 sm:p-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-300">
                Audience research
              </p>

              <h3 className="mt-3 text-xl font-semibold text-white">
                Start with who we want to reach.
              </h3>

              <p className="mt-3 text-xs leading-6 text-slate-500">
                Before creating posts, I can research the audience, their
                questions, problems, interests, buying intent, and the type
                of content that gives them a reason to stop scrolling.
              </p>

              <div className="mt-6 space-y-2">
                {[
                  "Target audience",
                  "Customer pain points",
                  "Content interests",
                  "Competitor / market research",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-3"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-300" />
                    <span className="text-[9px] font-medium text-slate-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/[0.07] bg-[#080d1b] p-6 sm:p-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-fuchsia-300">
                Content pillars
              </p>

              <h3 className="mt-3 text-xl font-semibold text-white">
                Give every post a purpose.
              </h3>

              <p className="mt-3 text-xs leading-6 text-slate-500">
                Instead of posting randomly, I can organize recurring themes
                so the page balances value, trust, personality, promotion,
                and conversion.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-2">
                {[
                  ["Education", "Teach"],
                  ["Trust", "Prove"],
                  ["Engagement", "Connect"],
                  ["Promotion", "Offer"],
                  ["Story", "Humanize"],
                  ["CTA", "Convert"],
                ].map(([title, action]) => (
                  <div
                    key={title}
                    className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
                  >
                    <p className="text-[9px] font-semibold text-white">
                      {title}
                    </p>
                    <p className="mt-1 text-[8px] uppercase tracking-[0.12em] text-fuchsia-300">
                      {action}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/[0.07] bg-[#080d1b] p-6 sm:p-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
                Platform planning
              </p>

              <h3 className="mt-3 text-xl font-semibold text-white">
                Adapt the message to the platform.
              </h3>

              <p className="mt-3 text-xs leading-6 text-slate-500">
                The same campaign can be repurposed while adjusting the
                format, hook, caption, CTA, and presentation for each
                platform.
              </p>

              <div className="mt-6 space-y-2">
                {[
                  ["Instagram", "Visual + Reel + Story"],
                  ["Facebook", "Community + Offer"],
                  ["LinkedIn", "Insight + Professional value"],
                  ["TikTok", "Short-form + Hook"],
                ].map(([platform, format]) => (
                  <div
                    key={platform}
                    className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-3"
                  >
                    <span className="text-[9px] font-semibold text-white">
                      {platform}
                    </span>
                    <span className="text-right text-[8px] text-slate-500">
                      {format}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-[2rem] border border-white/[0.07] bg-[#080d1b] p-6 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-fuchsia-300">
                  Content production workflow
                </p>

                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  From idea to published post.
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-400">
                  A practical production process keeps content consistent
                  without turning every post into a last-minute task.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    "Research",
                    "Brief",
                    "Canva",
                    "Caption",
                    "CTA",
                    "Review",
                    "Schedule",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-[9px] font-medium text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-5 sm:p-6">
                <div className="grid gap-2 sm:grid-cols-4">
                  {[
                    ["01", "Idea", "What should we say?"],
                    ["02", "Create", "Visual + caption"],
                    ["03", "Review", "Brand + CTA check"],
                    ["04", "Schedule", "Publish consistently"],
                  ].map(([number, title, detail]) => (
                    <div
                      key={number}
                      className="relative rounded-xl border border-white/[0.06] bg-[#080d1b] p-4"
                    >
                      <span className="text-[8px] font-semibold text-fuchsia-300">
                        {number}
                      </span>

                      <p className="mt-3 text-[10px] font-semibold text-white">
                        {title}
                      </p>

                      <p className="mt-2 text-[8px] leading-4 text-slate-600">
                        {detail}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-xl border border-cyan-300/10 bg-cyan-400/[0.035] p-4">
                  <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-cyan-300">
                    Example quality check
                  </p>

                  <div className="mt-3 grid gap-2 sm:grid-cols-3">
                    {[
                      "Clear hook",
                      "Useful value",
                      "Strong CTA",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 text-[9px] text-slate-300"
                      >
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/10 text-[8px] text-emerald-300">
                          ✓
                        </span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-white/[0.07] bg-gradient-to-br from-emerald-400/[0.045] to-white/[0.02] p-6 sm:p-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-300">
                Community management
              </p>

              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                Posting is only part of the job.
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                I can help keep the social side active after publishing by
                organizing replies, identifying useful conversations, and
                helping move interested people toward the right next step.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  ["Comments", "Respond professionally and keep conversations moving."],
                  ["Messages", "Identify questions, interest, and possible leads."],
                  ["Engagement", "Interact with relevant audiences and communities."],
                  ["Escalation", "Pass important customer or sales issues to the right person."],
                ].map(([title, detail]) => (
                  <div
                    key={title}
                    className="rounded-xl border border-white/[0.06] bg-[#080d1b] p-4"
                  >
                    <p className="text-[10px] font-semibold text-white">
                      {title}
                    </p>

                    <p className="mt-1 text-[9px] leading-5 text-slate-500">
                      {detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/[0.07] bg-gradient-to-br from-blue-400/[0.045] to-white/[0.02] p-6 sm:p-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-300">
                Discovery + optimization
              </p>

              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                Learn from the content.
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                Performance review is not only about reporting numbers. The
                goal is to understand which topics, formats, hooks, and CTAs
                deserve more attention in the next content cycle.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  ["Reach", "How far content traveled."],
                  ["Engagement", "What made people interact."],
                  ["Clicks", "Which CTAs created action."],
                  ["Leads", "Whether interest became an inquiry."],
                  ["Bookings", "Whether the journey reached a meeting."],
                  ["Content trends", "What should be repeated or changed."],
                ].map(([title, detail]) => (
                  <div
                    key={title}
                    className="rounded-xl border border-white/[0.06] bg-[#080d1b] p-4"
                  >
                    <p className="text-[10px] font-semibold text-white">
                      {title}
                    </p>

                    <p className="mt-1 text-[9px] leading-5 text-slate-600">
                      {detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-white/[0.07] bg-[#080d1b] p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-300">
                    Conversion workflow
                  </p>

                  <h3 className="mt-2 text-xl font-semibold text-white">
                    Turning attention into action
                  </h3>
                </div>

                <span className="rounded-full border border-emerald-300/10 bg-emerald-400/[0.05] px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.16em] text-emerald-300">
                  Example
                </span>
              </div>

              <div className="mt-7 grid grid-cols-5 gap-1.5">
                {[
                  ["Post", "Attention"],
                  ["CTA", "Click"],
                  ["Form", "Lead"],
                  ["GHL", "Follow-up"],
                  ["Book", "Meeting"],
                ].map(([step, label], index) => (
                  <div key={step} className="relative">
                    <div
                      className={`rounded-xl border p-3 text-center ${
                        index === 4
                          ? "border-emerald-300/15 bg-emerald-400/[0.05]"
                          : "border-white/[0.07] bg-white/[0.02]"
                      }`}
                    >
                      <p className="text-[8px] font-semibold text-white">
                        {step}
                      </p>

                      <p className="mt-2 text-[7px] text-slate-600">
                        {label}
                      </p>
                    </div>

                    {index < 4 ? (
                      <span className="absolute -right-1.5 top-1/2 h-px w-1.5 bg-white/10" />
                    ) : null}
                  </div>
                ))}
              </div>

              <p className="mt-5 text-xs leading-6 text-slate-500">
                Example workflow only — showing how social activity can
                connect with lead capture, CRM organization, follow-up, and
                bookings.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/[0.07] bg-[#080d1b] p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-300">
                    Example monthly report
                  </p>

                  <h3 className="mt-2 text-xl font-semibold text-white">
                    Measure what matters
                  </h3>
                </div>

                <span className="rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Sample data
                </span>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  ["Reach", "—"],
                  ["Engagement", "—"],
                  ["Clicks", "—"],
                  ["Leads", "—"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4"
                  >
                    <p className="text-[8px] uppercase tracking-[0.14em] text-slate-600">
                      {label}
                    </p>

                    <p className="mt-3 text-lg font-semibold text-white">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 space-y-3">
                {[
                  ["Content performance", "Identify strongest formats and topics."],
                  ["Audience response", "Review comments, saves, clicks, and inquiries."],
                  ["Next action", "Adjust the next content cycle around what people respond to."],
                ].map(([label, detail]) => (
                  <div
                    key={label}
                    className="flex gap-3 rounded-xl border border-white/[0.06] bg-white/[0.015] p-4"
                  >
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-300" />

                    <div>
                      <p className="text-[10px] font-semibold text-white">
                        {label}
                      </p>

                      <p className="mt-1 text-[9px] leading-5 text-slate-500">
                        {detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-[2rem] border border-cyan-300/10 bg-gradient-to-r from-cyan-400/[0.05] via-white/[0.02] to-fuchsia-400/[0.05] p-6 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
                  How I contribute
                </p>

                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Plan the content. Build the post. Push the action.
                </h3>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400">
                  Social media is one part of the customer journey. I can
                  connect content creation with scheduling, calls to action,
                  landing pages, lead capture, CRM organization, and
                  follow-up.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 lg:max-w-xs lg:justify-end">
                {[
                  "Content Planning",
                  "Canva",
                  "Social Media",
                  "GoHighLevel",
                  "Lead Generation",
                  "Bookings",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-2 text-[9px] font-medium text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOOLS */}

      <section className="py-24 sm:py-28">

        <div className="mx-auto max-w-6xl px-6 lg:px-8">

          <div className="mx-auto max-w-3xl text-center">

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">

              Tools & Technologies

            </p>



            <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">

              The tools behind the work.

            </h2>



            <p className="mt-6 text-base leading-8 text-slate-400 sm:text-lg">

              A practical toolkit spanning sales, marketing, creative work,

              websites, email, CRM, and business operations.

            </p>

          </div>



          <div className="mt-12 flex flex-wrap justify-center gap-3">

            {tools.map((tool, index) => (

              <span

                key={tool}

                className={`rounded-full border px-5 py-2.5 text-sm font-medium transition duration-300 hover:-translate-y-1 ${

                  index % 4 === 0

                    ? "border-blue-400/20 bg-blue-400/[0.06] text-blue-200 hover:bg-blue-400/10"

                    : index % 4 === 1

                    ? "border-cyan-400/20 bg-cyan-400/[0.05] text-cyan-200 hover:bg-cyan-400/10"

                    : index % 4 === 2

                    ? "border-fuchsia-400/20 bg-fuchsia-400/[0.05] text-fuchsia-200 hover:bg-fuchsia-400/10"

                    : "border-emerald-400/20 bg-emerald-400/[0.05] text-emerald-200 hover:bg-emerald-400/10"

                }`}

              >

                {tool}

              </span>

            ))}

          </div>

        </div>

      </section>



      {/* SELECTED WORK */}

      <section className="border-y border-white/[0.06] bg-white/[0.015] py-24 sm:py-28">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">

            <div className="max-w-3xl">

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-300">

                Built Through Vertex Studio Works

              </p>



              <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">

                Selected work.

              </h2>



              <p className="mt-6 text-base leading-8 text-slate-400 sm:text-lg">

                Projects that show how I apply design, development, business

                thinking, and user experience to real digital work.

              </p>

            </div>



            <Link

              href="/work"

              className="inline-flex shrink-0 items-center text-sm font-semibold text-blue-300 transition hover:text-cyan-300"

            >

              View all projects

              <span className="ml-2">→</span>

            </Link>

          </div>



          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {projects.map(([title, category, href], index) => (

              <Link

                key={title}

                href={href}

                className="group flex min-h-[270px] flex-col justify-between rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.035] to-white/[0.015] p-7 transition duration-500 hover:-translate-y-2 hover:border-cyan-300/20 hover:shadow-2xl hover:shadow-blue-950/20"

              >

                <div>

                  <div className="flex items-center justify-between">

                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">

                      {category}

                    </span>



                    <span className="text-sm text-slate-600 transition group-hover:text-cyan-300">

                      0{index + 1}

                    </span>

                  </div>



                  <h3 className="mt-8 text-2xl font-semibold text-white">

                    {title}

                  </h3>



                  <p className="mt-4 text-sm leading-7 text-slate-400">

                    A digital project built through Vertex Studio Works.

                  </p>

                </div>



                <div className="mt-8 flex items-center text-sm font-semibold text-slate-300 transition group-hover:text-cyan-300">

                  View project

                  <span className="ml-2 transition-transform group-hover:translate-x-1">

                    →

                  </span>

                </div>

              </Link>

            ))}

          </div>

        </div>

      </section>



      {/* FOUNDER PERSPECTIVE */}

      <section className="relative overflow-hidden py-24 sm:py-32">

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/8 blur-[150px]" />



        <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-8">

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-fuchsia-300">

            Founder&apos;s Perspective

          </p>



          <blockquote className="mt-8 text-3xl font-medium leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">

            &ldquo;Good digital work starts with understanding the business,

            the people, and the technology behind it.&rdquo;

          </blockquote>



          <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-slate-400">

            Vertex Studio Works gives me a place to combine sales, marketing,

            development, creative work, and business support into practical

            digital solutions.

          </p>



          <p className="mt-7 text-sm font-semibold text-white">

            — Cyril Loon

          </p>

        </div>

      </section>



      {/* CTA */}

      <section className="border-t border-white/[0.06] py-20">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="relative overflow-hidden rounded-[2rem] border border-blue-400/10 bg-gradient-to-br from-blue-600/[0.13] via-fuchsia-500/[0.05] to-cyan-500/[0.08] p-8 sm:p-12 lg:p-16">

            <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-[100px]" />



            <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">

              <div className="max-w-3xl">

                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">

                  Let&apos;s Connect

                </p>



                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">

                  Have an opportunity, project, or idea?

                </h2>



                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400">

                  Whether you need help with business development, digital

                  marketing, bookings, email campaigns, a website, creative

                  work, or business support, let&apos;s talk.

                </p>

              </div>



              <Link

                href="/#contact"

                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100 hover:shadow-[0_0_35px_rgba(34,211,238,0.15)]"

              >

                Get in Touch

                <span className="ml-2">→</span>

              </Link>

            </div>

          </div>

        </div>

      </section>



      <Footer />

      <Chatbot />

    </main>

  );

}