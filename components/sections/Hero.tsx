"use client";

import { useEffect, useState } from "react";

const dashboardStates = [
  {
    revenue: "CRM",
    revenueGrowth: "Tracking",
    customers: "Analytics",
    customerGrowth: "Connected",
    leads: "Leads",
    bars: [28, 42, 35, 55, 48, 72, 64, 86, 78, 96],
  },

  {
    revenue: "CRM",
    revenueGrowth: "Tracking",
    customers: "Analytics",
    customerGrowth: "Connected",
    leads: "Leads",
    bars: [34, 48, 42, 61, 54, 77, 69, 88, 82, 98],
  },

  {
    revenue: "CRM",
    revenueGrowth: "Tracking",
    customers: "Analytics",
    customerGrowth: "Connected",
    leads: "Leads",
    bars: [30, 53, 46, 66, 58, 81, 73, 91, 86, 100],
  },

  {
    revenue: "CRM",
    revenueGrowth: "Tracking",
    customers: "Analytics",
    customerGrowth: "Connected",
    leads: "Leads",
    bars: [39, 57, 51, 70, 63, 85, 77, 94, 90, 100],
  },

  {
    revenue: "CRM",
    revenueGrowth: "Tracking",
    customers: "Analytics",
    customerGrowth: "Connected",
    leads: "Leads",
    bars: [35, 61, 56, 74, 67, 89, 81, 96, 93, 100],
  },
];

export default function Hero() {
  const [dashboardIndex, setDashboardIndex] = useState(0);
  const [showPromo, setShowPromo] = useState(true);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setDashboardIndex(
        (current) => (current + 1) % dashboardStates.length
      );
    }, 2200);

    return () => window.clearInterval(interval);
  }, []);

  const dashboard = dashboardStates[dashboardIndex];

  return (
    <section
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#050816]
      "
      aria-labelledby="hero-heading"
    >

      {/* =====================================================
          BACKGROUND GLOW
      ===================================================== */}

      <div
        className="
          absolute
          -left-32
          top-20
          h-96
          w-96
          rounded-full
          bg-blue-600/20
          blur-[120px]
        "
        aria-hidden="true"
      />

      <div
        className="
          absolute
          right-0
          bottom-0
          h-[500px]
          w-[500px]
          rounded-full
          bg-cyan-500/10
          blur-[150px]
        "
        aria-hidden="true"
      />

      {/* =====================================================
          $10 OFF FLOATING PROMO
      ===================================================== */}

      {showPromo && (
        <div
          className="
            absolute
            right-5
            top-24
            z-30
            hidden
            md:block
          "
        >
          <div
            className="
              relative
              w-[230px]
              overflow-hidden
              rounded-2xl
              border
              border-blue-400/30
              bg-[#0b1224]/95
              p-4
              shadow-2xl
              shadow-blue-500/20
              backdrop-blur-xl
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-cyan-400/50
              hover:shadow-blue-500/30
            "
          >

            {/* GLOW */}

            <div
              className="
                pointer-events-none
                absolute
                -right-10
                -top-10
                h-24
                w-24
                rounded-full
                bg-blue-500/20
                blur-2xl
              "
              aria-hidden="true"
            />

            {/* CLOSE BUTTON */}

            <button
              type="button"
              aria-label="Close offer"
              onClick={() => setShowPromo(false)}
              className="
                absolute
                right-2
                top-2
                z-10
                flex
                h-6
                w-6
                items-center
                justify-center
                rounded-full
                text-xs
                text-slate-400
                transition
                hover:bg-white/10
                hover:text-white
              "
            >
              ×
            </button>

            {/* OFFER HEADER */}

            <div className="relative flex items-center gap-3">

              {/* GIFT */}

              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-blue-400/20
                  bg-blue-500/10
                  text-2xl
                  animate-pulse
                "
              >
                🎁
              </div>

              {/* OFFER TEXT */}

              <div>
                <p
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-blue-400
                  "
                >
                  Limited Offer
                </p>

                <p
                  className="
                    mt-0.5
                    text-2xl
                    font-extrabold
                    leading-none
                    text-white
                  "
                >
                  $10 OFF
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    text-slate-400
                  "
                >
                  Your first Vertex service
                </p>
              </div>

            </div>

            {/* CLAIM BUTTON */}

            <a
              href="https://calendly.com/hello-vertexstudioworks/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="
                relative
                mt-4
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-full
                bg-gradient-to-r
                from-blue-600
                to-cyan-500
                px-4
                py-2.5
                text-xs
                font-bold
                text-white
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-lg
                hover:shadow-blue-500/30
              "
            >
              Claim Now
              <span aria-hidden="true">→</span>
            </a>

          </div>
        </div>
      )}

      {/* =====================================================
          HERO CONTAINER
      ===================================================== */}

      <div
        className="
          relative
          mx-auto
          flex
          min-h-screen
          max-w-[1400px]
          items-center
          justify-between
          gap-16
          px-8
          pt-24
        "
      >

        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <div className="max-w-2xl">

          {/* EYEBROW */}

          <p
            className="
              mb-6
              text-sm
              font-semibold
              uppercase
              tracking-[0.35em]
              text-blue-400
            "
          >
            Websites • Digital Experiences • Business Systems
          </p>

          {/* =================================================
              MAIN HEADING
          ================================================= */}

          <h1
            id="hero-heading"
            className="
              text-6xl
              font-extrabold
              leading-[1.02]
              text-white
              md:text-7xl
              lg:text-8xl
            "
          >
            Build Better.

            <br />

            Grow Faster.

            <br />

            <span className="text-blue-500">
              Together.
            </span>
          </h1>

          {/* =================================================
              HERO DESCRIPTION
          ================================================= */}

          <p
            className="
              mt-8
              max-w-xl
              text-lg
              leading-8
              text-slate-300
            "
          >
            From high-converting websites and e-commerce
            experiences to the digital systems behind your
            business, Vertex Studio Works builds modern
            technology designed to help businesses grow.
          </p>

          {/* =================================================
              BUTTONS
          ================================================= */}

          <div
            className="
              mt-10
              flex
              flex-wrap
              gap-5
            "
          >

            {/* PRIMARY CTA */}

            <a
              href="#portfolio"
              className="
                inline-flex
                items-center
                justify-center
                rounded-full
                bg-gradient-to-r
                from-blue-600
                to-cyan-500
                px-8
                py-4
                font-semibold
                text-white
                transition
                hover:-translate-y-1
                hover:shadow-xl
                hover:shadow-blue-500/30
              "
            >
              See Our Work
            </a>

            {/* SECONDARY CTA */}

            <a
              href="#contact"
              className="
                inline-flex
                items-center
                justify-center
                rounded-full
                border
                border-white/20
                px-8
                py-4
                font-semibold
                text-white
                transition
                hover:bg-white
                hover:text-black
              "
            >
              Start Your Project
            </a>

          </div>

          {/* =================================================
              TRUST POINTS
          ================================================= */}

          <div
            className="
              mt-10
              flex
              flex-wrap
              gap-x-8
              gap-y-3
              text-sm
              text-slate-400
            "
          >
            <span>
              ✓ Startup-Friendly Pricing
            </span>

            <span>
              ✓ Custom-Built
            </span>

            <span>
              ✓ Founder-Led Support
            </span>
          </div>

          {/* EMAIL */}

          <a
            href="mailto:hello.vertexstudioworks@gmail.com"
            className="
              mt-5
              inline-block
              text-sm
              text-blue-400
              transition
              hover:text-cyan-400
            "
          >
            ✉ hello.vertexstudioworks@gmail.com
          </a>

        </div>

        {/* =================================================
            RIGHT SIDE — BUSINESS PLATFORM VISUAL
        ================================================= */}

        <div
          className="
            hidden
            w-[520px]
            rounded-3xl
            border
            border-white/10
            bg-white/5
            p-6
            shadow-2xl
            shadow-blue-500/10
            backdrop-blur-xl
            lg:block
          "
          aria-label="Animated Vertex Business dashboard demo"
        >

          {/* =================================================
              BROWSER HEADER
          ================================================= */}

          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-white/10
              pb-4
            "
          >

            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
            </div>

            <span
              className="
                text-xs
                font-medium
                uppercase
                tracking-[0.2em]
                text-slate-500
              "
            >
              Vertex Business
            </span>

          </div>

          {/* =================================================
              DASHBOARD HEADER
          ================================================= */}

          <div className="mt-6">

            <div className="flex items-end justify-between">

              <div>

                <p
                  className="
                    text-xs
                    uppercase
                    tracking-[0.25em]
                    text-blue-400
                  "
                >
                  Business Platform
                </p>

                <h2
                  className="
                    mt-2
                    text-2xl
                    font-bold
                    text-white
                  "
                >
                  Your business. Connected.
                </h2>

              </div>

              <div
                className="
                  flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-emerald-400/20
                  bg-emerald-400/10
                  px-3
                  py-1
                  text-xs
                  font-medium
                  text-emerald-300
                "
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Illustrative Demo
              </div>

            </div>

          </div>

          {/* =================================================
              STAT CARDS
          ================================================= */}

          <div className="mt-6 grid grid-cols-3 gap-3">

            {/* REVENUE */}

            <div
              className="
                rounded-xl
                border
                border-white/10
                bg-white/5
                p-4
              "
            >

              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-wider
                  text-slate-500
                "
              >
                Platform
              </p>

              <p
                className="
                  mt-2
                  text-xl
                  font-bold
                  text-white
                  transition-all
                  duration-700
                "
              >
                {dashboard.revenue}
              </p>

              <p
                className="
                  mt-1
                  text-[10px]
                  text-emerald-400
                  transition-all
                  duration-700
                "
              >
                {dashboard.revenueGrowth}
              </p>

            </div>

            {/* CUSTOMERS */}

            <div
              className="
                rounded-xl
                border
                border-white/10
                bg-white/5
                p-4
              "
            >

              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-wider
                  text-slate-500
                "
              >
                Systems
              </p>

              <p
                className="
                  mt-2
                  text-xl
                  font-bold
                  text-white
                  transition-all
                  duration-700
                "
              >
                {dashboard.customers}
              </p>

              <p
                className="
                  mt-1
                  text-[10px]
                  text-cyan-400
                  transition-all
                  duration-700
                "
              >
                {dashboard.customerGrowth}
              </p>

            </div>

            {/* LEADS */}

            <div
              className="
                rounded-xl
                border
                border-white/10
                bg-white/5
                p-4
              "
            >

              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-wider
                  text-slate-500
                "
              >
                Leads
              </p>

              <p
                className="
                  mt-2
                  text-xl
                  font-bold
                  text-white
                  transition-all
                  duration-700
                "
              >
                {dashboard.leads}
              </p>

              <p
                className="
                  mt-1
                  text-[10px]
                  text-blue-400
                "
              >
                This month
              </p>

            </div>

          </div>

          {/* =================================================
              BUSINESS OVERVIEW
          ================================================= */}

          <div
            className="
              mt-4
              rounded-2xl
              border
              border-white/10
              bg-white/5
              p-5
            "
          >

            <div className="flex items-center justify-between">

              <div>

                <p
                  className="
                    text-sm
                    font-semibold
                    text-white
                  "
                >
                  Business Overview
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    text-slate-500
                  "
                >
                  Everything working together
                </p>

              </div>

              <span
                className="
                  text-xs
                  text-slate-500
                "
              >
                Last 30 days
              </span>

            </div>

            {/* ANIMATED CHART */}

            <div
              className="
                mt-6
                flex
                h-28
                items-end
                gap-2
              "
            >

              {dashboard.bars.map((height, index) => (
                <div
                  key={index}
                  className={`
                    flex-1
                    rounded-t
                    transition-all
                    duration-[1800ms]
                    ease-in-out
                    ${
                      index < 6
                        ? "bg-blue-500/50"
                        : "bg-cyan-400/80"
                    }
                  `}
                  style={{
                    height: `${height}%`,
                  }}
                />
              ))}

            </div>

          </div>

          {/* =================================================
              BUSINESS SYSTEMS
          ================================================= */}

          <div className="mt-4 grid grid-cols-2 gap-3">

            {/* COMMERCE */}

            <div
              className="
                rounded-xl
                border
                border-white/10
                bg-white/5
                p-4
                transition
                duration-500
                hover:border-blue-500/30
                hover:bg-white/[0.07]
              "
            >

              <p
                className="
                  text-xs
                  font-semibold
                  text-white
                "
              >
                Commerce
              </p>

              <p
                className="
                  mt-2
                  text-[11px]
                  leading-5
                  text-slate-400
                "
              >
                Products · Orders · Inventory
              </p>

            </div>

            {/* GROWTH */}

            <div
              className="
                rounded-xl
                border
                border-white/10
                bg-white/5
                p-4
                transition
                duration-500
                hover:border-blue-500/30
                hover:bg-white/[0.07]
              "
            >

              <p
                className="
                  text-xs
                  font-semibold
                  text-white
                "
              >
                Growth
              </p>

              <p
                className="
                  mt-2
                  text-[11px]
                  leading-5
                  text-slate-400
                "
              >
                Leads · Marketing · Analytics
              </p>

            </div>

            {/* CUSTOMER EXPERIENCE */}

            <div
              className="
                rounded-xl
                border
                border-white/10
                bg-white/5
                p-4
                transition
                duration-500
                hover:border-blue-500/30
                hover:bg-white/[0.07]
              "
            >

              <p
                className="
                  text-xs
                  font-semibold
                  text-white
                "
              >
                Customer Experience
              </p>

              <p
                className="
                  mt-2
                  text-[11px]
                  leading-5
                  text-slate-400
                "
              >
                CRM · Support · Accounts
              </p>

            </div>

            {/* AUTOMATION */}

            <div
              className="
                rounded-xl
                border
                border-white/10
                bg-white/5
                p-4
                transition
                duration-500
                hover:border-blue-500/30
                hover:bg-white/[0.07]
              "
            >

              <p
                className="
                  text-xs
                  font-semibold
                  text-white
                "
              >
                Automation
              </p>

              <p
                className="
                  mt-2
                  text-[11px]
                  leading-5
                  text-slate-400
                "
              >
                AI · Workflows · Integrations
              </p>

            </div>

          </div>

          {/* =================================================
              FOOTER
          ================================================= */}

          <div
            className="
              mt-5
              flex
              items-center
              justify-between
            "
          >

            <span
              className="
                text-[10px]
                uppercase
                tracking-[0.2em]
                text-slate-600
              "
            >
              One platform
            </span>

            <span
              className="
                text-[10px]
                uppercase
                tracking-[0.2em]
                text-blue-400
              "
            >
              Build · Manage · Grow
            </span>

          </div>

        </div>

      </div>

    </section>
  );
}