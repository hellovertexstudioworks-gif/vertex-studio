import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";

const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "We learn about your business, goals, audience, challenges, and what you need your digital experience to accomplish.",
    icon: "◉",
  },

  {
    number: "02",
    title: "Plan",
    description:
      "We define the structure, user experience, features, content, and technology needed to turn your goals into a clear digital solution.",
    icon: "⌁",
  },

  {
    number: "03",
    title: "Build",
    description:
      "We design and develop your website, e-commerce experience, application, or business system using modern technology and thoughtful design.",
    icon: "◇",
  },

  {
    number: "04",
    title: "Launch",
    description:
      "We test the experience, refine the details, optimize performance, and prepare everything for your customers and team.",
    icon: "↗",
  },

  {
    number: "05",
    title: "Grow",
    description:
      "After launch, we can continue improving your digital experience, adding capabilities, analyzing performance, and scaling your system as your business evolves.",
    icon: "↑",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="bg-[#050816] py-28"
      aria-labelledby="process-heading"
    >
      <Container>

        {/* =====================================================
            SECTION HEADER
        ===================================================== */}

        <SectionTitle
          badge="OUR PROCESS"
          title="From Idea"
          highlight="To Growth"
          description="
            A clear process designed to take your business from
            the first conversation to a digital experience that
            can continue evolving with you.
          "
        />

        {/* =====================================================
            PROCESS GRID
        ===================================================== */}

        <div
          className="
            mt-16
            grid
            gap-6
            md:grid-cols-2
            lg:grid-cols-5
          "
        >
          {steps.map((step) => (
            <div
              key={step.number}
              className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-white/[0.035]
                p-8
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-blue-500/40
                hover:bg-white/[0.06]
              "
            >

              {/* =================================================
                  STEP NUMBER
              ================================================= */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >
                <span
                  className="
                    text-sm
                    font-bold
                    tracking-[0.2em]
                    text-blue-400
                  "
                >
                  {step.number}
                </span>

                <span
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-blue-500/20
                    bg-blue-500/10
                    text-2xl
                    text-blue-400
                    transition
                    duration-300
                    group-hover:scale-110
                  "
                >
                  {step.icon}
                </span>
              </div>

              {/* =================================================
                  STEP TITLE
              ================================================= */}

              <h3
                className="
                  mt-8
                  text-xl
                  font-bold
                  text-white
                "
              >
                {step.title}
              </h3>

              {/* =================================================
                  STEP DESCRIPTION
              ================================================= */}

              <p
                className="
                  mt-4
                  text-sm
                  leading-7
                  text-slate-400
                "
              >
                {step.description}
              </p>

              {/* =================================================
                  STEP LINE
              ================================================= */}

              {step.number !== "05" && (
                <div
                  className="
                    mt-8
                    hidden
                    h-px
                    w-full
                    bg-gradient-to-r
                    from-blue-500/40
                    to-transparent
                    lg:block
                  "
                  aria-hidden="true"
                />
              )}

            </div>
          ))}
        </div>

        {/* =====================================================
            BOTTOM MESSAGE
        ===================================================== */}

        <div
          className="
            mt-12
            rounded-3xl
            border
            border-white/10
            bg-gradient-to-r
            from-blue-500/[0.08]
            via-white/[0.03]
            to-cyan-500/[0.06]
            px-8
            py-10
          "
        >
          <div
            className="
              flex
              flex-col
              gap-4
              md:flex-row
              md:items-center
              md:justify-between
            "
          >

            <div>
              <p
                className="
                  text-xl
                  font-semibold
                  text-white
                  md:text-2xl
                "
              >
                Your first launch is only the beginning.
              </p>

              <p
                className="
                  mt-2
                  max-w-2xl
                  text-sm
                  leading-6
                  text-slate-500
                "
              >
                As your business grows, your digital experience can
                grow with it.
              </p>
            </div>

            <a
              href="#contact"
              className="
                inline-flex
                w-fit
                shrink-0
                items-center
                gap-2
                rounded-full
                bg-gradient-to-r
                from-blue-600
                to-cyan-500
                px-6
                py-3
                text-sm
                font-semibold
                text-white
                transition
                hover:-translate-y-1
                hover:shadow-lg
                hover:shadow-blue-500/20
              "
            >
              Start Your Project
              <span>→</span>
            </a>

          </div>
        </div>

      </Container>
    </section>
  );
}