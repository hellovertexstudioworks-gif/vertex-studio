export default function Hero() {
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
              Explore Our Work
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
              Build With Vertex
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
          aria-hidden="true"
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
                Live Demo
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
                Revenue
              </p>

              <p
                className="
                  mt-2
                  text-xl
                  font-bold
                  text-white
                "
              >
                $48.2K
              </p>

              <p
                className="
                  mt-1
                  text-[10px]
                  text-emerald-400
                "
              >
                +18.4%
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
                Customers
              </p>

              <p
                className="
                  mt-2
                  text-xl
                  font-bold
                  text-white
                "
              >
                2,841
              </p>

              <p
                className="
                  mt-1
                  text-[10px]
                  text-cyan-400
                "
              >
                +12.7%
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
                "
              >
                486
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

            {/* FAKE CHART */}

            <div
              className="
                mt-6
                flex
                h-28
                items-end
                gap-2
              "
            >
              <div className="h-[28%] flex-1 rounded-t bg-blue-500/30" />
              <div className="h-[42%] flex-1 rounded-t bg-blue-500/40" />
              <div className="h-[35%] flex-1 rounded-t bg-blue-500/40" />
              <div className="h-[55%] flex-1 rounded-t bg-blue-500/50" />
              <div className="h-[48%] flex-1 rounded-t bg-blue-500/50" />
              <div className="h-[72%] flex-1 rounded-t bg-blue-500/70" />
              <div className="h-[64%] flex-1 rounded-t bg-cyan-400/70" />
              <div className="h-[86%] flex-1 rounded-t bg-cyan-400" />
              <div className="h-[78%] flex-1 rounded-t bg-cyan-400/90" />
              <div className="h-[96%] flex-1 rounded-t bg-cyan-400" />
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