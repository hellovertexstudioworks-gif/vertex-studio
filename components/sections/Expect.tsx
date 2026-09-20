import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";

const calendlyLink =
  "https://calendly.com/hello-vertexstudioworks/30min";

const expectations = [
  {
    icon: "◉",
    title: "Clear Communication",
    description:
      "Stay informed throughout the project with clear communication, progress updates, and transparent discussions from start to finish.",
  },

  {
    icon: "◎",
    title: "Built Around Your Goals",
    description:
      "Every decision is connected to your business objectives, your customers, and the experience you want to create.",
  },

  {
    icon: "✦",
    title: "Thoughtful Design",
    description:
      "From visual details to user experience, we focus on creating digital products that feel professional, intentional, and easy to use.",
  },

  {
    icon: "◇",
    title: "Collaborative Process",
    description:
      "Your knowledge of the business matters. We work with you throughout the process to make sure the final solution reflects your vision.",
  },

  {
    icon: "↗",
    title: "Ready For Launch",
    description:
      "Before launch, we review, test, and refine the experience so your customers and team have a reliable product from day one.",
  },

  {
    icon: "↑",
    title: "Built To Evolve",
    description:
      "Your business will change. We build with future improvements, new features, integrations, and growth in mind.",
  },
];

export default function Expect() {
  return (
    <section
      id="expect"
      className="bg-[#050816] py-28"
      aria-labelledby="expect-heading"
    >
      <Container>
        {/* =====================================================
            SECTION HEADER
        ===================================================== */}

        <SectionTitle
          badge="WORKING WITH VERTEX"
          title="What You Can"
          highlight="Expect"
          description="
            A professional experience built around communication,
            thoughtful design, modern technology, and a solution
            that can grow with your business.
          "
        />

        {/* =====================================================
            EXPECTATIONS GRID
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
          {expectations.map((item) => (
            <div
              key={item.title}
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
                {item.icon}
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
                {item.title}
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
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* =====================================================
            BOTTOM CTA
        ===================================================== */}

        <div
          className="
            mt-12
            rounded-3xl
            border
            border-white/10
            bg-white/[0.025]
            px-8
            py-10
          "
        >
          <div
            className="
              flex
              flex-col
              gap-6
              md:flex-row
              md:items-center
              md:justify-between
            "
          >
            {/* =================================================
                CTA CONTENT
            ================================================= */}

            <div>
              <p
                className="
                  text-xl
                  font-semibold
                  text-white
                  md:text-2xl
                "
              >
                Built for today. Ready for tomorrow.
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
                Whether you're launching your first website or
                building a larger digital system, we focus on
                creating a foundation you can build on.
              </p>
            </div>

            {/* =================================================
                CTA BUTTONS
            ================================================= */}

            <div
              className="
                flex
                flex-col
                gap-3
                sm:flex-row
                sm:items-center
              "
            >
              {/* BOOK A CALL */}

              <a
                href={calendlyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  items-center
                  justify-center
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
                  hover:-translate-y-0.5
                  hover:shadow-lg
                  hover:shadow-blue-500/20
                "
              >
                <span aria-hidden="true">▣</span>
                Book a Call
              </a>

              {/* LET'S BUILD */}

              <a
                href="#contact"
                className="
                  inline-flex
                  items-center
                  justify-center
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
                Let's Build
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}