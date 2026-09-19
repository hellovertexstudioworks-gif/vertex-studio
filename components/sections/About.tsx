export default function About() {
  return (
    <section
      id="about"
      className="bg-[#050816] py-32"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-20 px-8">

        {/* =====================================================
            LEFT CONTENT
        ===================================================== */}

        <div className="w-full lg:w-1/2">

          <p className="mb-4 text-sm uppercase tracking-[0.4em] text-blue-400">
            About Vertex Studio Works
          </p>

          <h2
            id="about-heading"
            className="text-5xl font-bold leading-tight text-white"
          >
            More Than A Website.
            <br />
            A Foundation For Growth.
          </h2>

          <p className="mt-8 text-lg leading-8 text-slate-300">
            Vertex Studio Works helps businesses build a stronger digital
            presence through modern websites, e-commerce experiences,
            custom web solutions, and the digital systems that support
            them.
          </p>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            Whether you need a professional business website, an online
            store, a booking experience, a customer portal, or a custom
            business platform, we focus on building technology around
            how your business actually works.
          </p>

          {/* =================================================
              HIGHLIGHTS
          ================================================= */}

          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10">

            {/* MULTIPLE INDUSTRIES */}

            <div>
              <h3 className="text-4xl font-bold text-blue-500">
                9+
              </h3>

              <p className="mt-2 text-slate-400">
                Industries & Experiences
              </p>
            </div>

            {/* CUSTOM BUILT */}

            <div>
              <h3 className="text-4xl font-bold text-blue-500">
                100%
              </h3>

              <p className="mt-2 text-slate-400">
                Custom-Built Solutions
              </p>
            </div>

            {/* DIGITAL */}

            <div>
              <h3 className="text-4xl font-bold text-blue-500">
                End-to-End
              </h3>

              <p className="mt-2 text-slate-400">
                Digital Experiences
              </p>
            </div>

            {/* GROWTH */}

            <div>
              <h3 className="text-4xl font-bold text-blue-500">
                Built
              </h3>

              <p className="mt-2 text-slate-400">
                For Long-Term Growth
              </p>
            </div>

          </div>
        </div>

        {/* =====================================================
            RIGHT — VERTEX ECOSYSTEM VISUAL
        ===================================================== */}

        <div
          className="
            hidden
            h-[520px]
            w-[500px]
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-gradient-to-br
            from-blue-500/10
            to-white/5
            p-8
            lg:flex
            flex-col
            justify-center
          "
          aria-hidden="true"
        >

          <div
            className="
              rounded-2xl
              border
              border-white/10
              bg-[#0B1220]
              p-6
              shadow-2xl
            "
          >

            {/* =================================================
                BROWSER DOTS
            ================================================= */}

            <div className="flex items-center justify-between">

              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
              </div>

              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-600">
                Vertex Studio Works
              </span>

            </div>

            {/* =================================================
                CONTENT
            ================================================= */}

            <div className="mt-8">

              <p className="text-sm uppercase tracking-widest text-blue-400">
                One Digital Partner
              </p>

              <h3 className="mt-4 text-3xl font-bold leading-tight text-white">
                From Your
                <br />
                Website To
                <br />
                Your Business System.
              </h3>

              <p className="mt-4 text-sm leading-6 text-slate-400">
                Start with a website. Add commerce, customer tools,
                analytics, automation, and custom systems as your
                business grows.
              </p>

              {/* =================================================
                  DIGITAL ECOSYSTEM
              ================================================= */}

              <div className="mt-8 grid grid-cols-2 gap-3">

                {/* WEBSITE */}

                <div
                  className="
                    rounded-xl
                    border
                    border-white/10
                    bg-white/5
                    p-4
                  "
                >
                  <p className="text-xs font-semibold text-white">
                    Websites
                  </p>

                  <p className="mt-1 text-[10px] text-slate-500">
                    Design · Development · SEO
                  </p>
                </div>

                {/* COMMERCE */}

                <div
                  className="
                    rounded-xl
                    border
                    border-blue-500/20
                    bg-blue-500/10
                    p-4
                  "
                >
                  <p className="text-xs font-semibold text-white">
                    E-Commerce
                  </p>

                  <p className="mt-1 text-[10px] text-blue-300">
                    Products · Orders · Payments
                  </p>
                </div>

                {/* CUSTOM SYSTEMS */}

                <div
                  className="
                    rounded-xl
                    border
                    border-white/10
                    bg-white/5
                    p-4
                  "
                >
                  <p className="text-xs font-semibold text-white">
                    Business Systems
                  </p>

                  <p className="mt-1 text-[10px] text-slate-500">
                    CRM · Dashboards · Portals
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
                  <p className="text-xs font-semibold text-white">
                    Growth
                  </p>

                  <p className="mt-1 text-[10px] text-slate-500">
                    Analytics · Marketing · Automation
                  </p>
                </div>

              </div>

              {/* =================================================
                  BOTTOM STATEMENT
              ================================================= */}

              <div
                className="
                  mt-6
                  rounded-xl
                  border
                  border-white/10
                  bg-gradient-to-r
                  from-blue-500/10
                  to-cyan-500/10
                  p-4
                "
              >
                <p className="text-xs font-medium text-white">
                  Built around your business.
                </p>

                <p className="mt-1 text-[10px] text-slate-500">
                  Start simple. Scale when you&apos;re ready.
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}