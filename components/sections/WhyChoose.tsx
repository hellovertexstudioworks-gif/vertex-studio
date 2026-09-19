import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";

const reasons = [
  {
    title: "Built Around Your Business",
    description:
      "We start with how your business actually works, then design the digital experience around your goals, customers, and opportunities.",
    icon: "◎",
  },

  {
    title: "More Than Templates",
    description:
      "Your website and digital systems are designed around your brand instead of forcing your business into a generic template.",
    icon: "✦",
  },

  {
    title: "Start Small. Scale Later.",
    description:
      "You don't need to build everything on day one. Start with what your business needs now and expand into commerce, systems, automation, and more when you're ready.",
    icon: "↗",
  },

  {
    title: "Modern Technology",
    description:
      "We use modern development practices to create responsive, performant, maintainable digital experiences across devices.",
    icon: "⚡",
  },

  {
    title: "Designed For Growth",
    description:
      "From SEO-ready foundations to analytics, customer experiences, and scalable systems, we build with the next stage of your business in mind.",
    icon: "⌁",
  },

  {
    title: "One Digital Partner",
    description:
      "Instead of piecing together disconnected solutions, Vertex can grow with your business across websites, e-commerce, systems, integrations, and digital experiences.",
    icon: "◈",
  },
];

export default function WhyChoose() {
  return (
    <section
      id="whychoose"
      className="bg-[#050816] py-28"
      aria-labelledby="whychoose-heading"
    >
      <Container>

        {/* =====================================================
            SECTION HEADER
        ===================================================== */}

        <SectionTitle
          badge="WHY VERTEX"
          title="Built With Your"
          highlight="Business In Mind"
          description="
            We combine strategy, design, technology, and long-term
            thinking to build digital experiences that can evolve
            as your business grows.
          "
        />

        {/* =====================================================
            REASONS GRID
        ===================================================== */}

        <div
          className="
            mt-16
            grid
            gap-6
            md:grid-cols-2
            lg:grid-cols-3
          "
        >
          {reasons.map((reason) => (
            <div
              key={reason.title}
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
                  BACKGROUND GLOW
              ================================================= */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-16
                  -top-16
                  h-32
                  w-32
                  rounded-full
                  bg-blue-500/10
                  blur-3xl
                  transition
                  duration-300
                  group-hover:bg-blue-500/20
                "
                aria-hidden="true"
              />

              {/* =================================================
                  ICON
              ================================================= */}

              <div
                className="
                  relative
                  flex
                  h-14
                  w-14
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
                {reason.icon}
              </div>

              {/* =================================================
                  TITLE
              ================================================= */}

              <h3
                className="
                  relative
                  mt-6
                  text-xl
                  font-bold
                  text-white
                "
              >
                {reason.title}
              </h3>

              {/* =================================================
                  DESCRIPTION
              ================================================= */}

              <p
                className="
                  relative
                  mt-4
                  leading-7
                  text-slate-400
                "
              >
                {reason.description}
              </p>

            </div>
          ))}
        </div>

        {/* =====================================================
            BOTTOM STATEMENT
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
                Your business changes. Your technology should too.
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
                Build what you need today, then expand when the
                opportunity comes.
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
                border
                border-white/10
                bg-white/[0.04]
                px-6
                py-3
                text-sm
                font-semibold
                text-white
                transition
                hover:border-blue-500/40
                hover:bg-blue-500/10
              "
            >
              Work With Vertex
              <span>→</span>
            </a>

          </div>
        </div>

      </Container>
    </section>
  );
}