import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";

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

const carePlans = [
  {
    name: "Care 20",
    price: "$20",
    description:
      "Simple ongoing care for businesses that want their website kept up to date.",
    features: [
      "Basic website maintenance",
      "Software & dependency updates",
      "Minor content updates",
      "Basic performance checks",
      "Standard support",
    ],
  },

  {
    name: "Care 49",
    price: "$49",
    description:
      "More ongoing attention for businesses that regularly update and improve their digital presence.",
    features: [
      "Everything in Care 20",
      "More frequent content updates",
      "Performance & SEO checks",
      "Minor design adjustments",
      "Priority support",
    ],
    popular: true,
  },

  {
    name: "Care 79",
    price: "$79",
    description:
      "Hands-on ongoing support for businesses that want more active digital maintenance and improvements.",
    features: [
      "Everything in Care 49",
      "More ongoing website updates",
      "Advanced performance monitoring",
      "Priority improvements",
      "More hands-on support",
    ],
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
            VERTEX CARE
        ===================================================== */}

        <div
          className="
            mt-24
            rounded-[2rem]
            border
            border-white/10
            bg-gradient-to-br
            from-blue-500/[0.08]
            via-white/[0.025]
            to-cyan-500/[0.06]
            p-8
            md:p-10
            lg:p-12
          "
        >

          {/* =================================================
              CARE HEADER
          ================================================= */}

          <div
            className="
              flex
              flex-col
              gap-6
              lg:flex-row
              lg:items-end
              lg:justify-between
            "
          >

            <div className="max-w-2xl">

              <div className="flex items-center gap-3">

                <span
                  className="
                    rounded-full
                    border
                    border-blue-500/20
                    bg-blue-500/10
                    px-4
                    py-1.5
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.25em]
                    text-blue-400
                  "
                >
                  Vertex Care
                </span>

                <span className="text-xs text-slate-600">
                  Optional monthly support
                </span>

              </div>

              <h2
                className="
                  mt-5
                  text-3xl
                  font-bold
                  leading-tight
                  text-white
                  md:text-4xl
                "
              >
                Keep Your Digital Presence
                <br />
                <span className="text-blue-400">
                  Running Smoothly.
                </span>
              </h2>

              <p
                className="
                  mt-5
                  max-w-xl
                  leading-7
                  text-slate-400
                "
              >
                Your website shouldn't be something you launch and
                forget. Vertex Care gives you affordable ongoing
                maintenance, updates, improvements, and support
                as your business continues to grow.
              </p>

            </div>

            <div className="max-w-sm">

              <p className="text-sm leading-6 text-slate-500">
                Choose the level of ongoing support that makes sense
                for your business. You can always start simple and
                move to a higher plan as your needs change.
              </p>

            </div>

          </div>

          {/* =================================================
              CARE PLANS
          ================================================= */}

          <div
            className="
              mt-10
              grid
              gap-5
              lg:grid-cols-3
            "
          >
            {carePlans.map((plan) => (
              <div
                key={plan.name}
                className={`
                  relative
                  rounded-3xl
                  border
                  p-7
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  ${
                    plan.popular
                      ? "border-blue-500/40 bg-blue-500/[0.07]"
                      : "border-white/10 bg-white/[0.035]"
                  }
                `}
              >

                {/* =================================================
                    POPULAR BADGE
                ================================================= */}

                {plan.popular && (
                  <div
                    className="
                      absolute
                      right-5
                      top-5
                      rounded-full
                      bg-blue-500/10
                      px-3
                      py-1
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.15em]
                      text-blue-400
                    "
                  >
                    Popular
                  </div>
                )}

                {/* =================================================
                    PLAN NAME
                ================================================= */}

                <p
                  className="
                    text-sm
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-blue-400
                  "
                >
                  {plan.name}
                </p>

                {/* =================================================
                    PRICE
                ================================================= */}

                <div className="mt-5 flex items-end gap-2">

                  <span
                    className="
                      text-5xl
                      font-bold
                      tracking-tight
                      text-white
                    "
                  >
                    {plan.price}
                  </span>

                  <span className="mb-2 text-sm text-slate-500">
                    / month
                  </span>

                </div>

                {/* =================================================
                    DESCRIPTION
                ================================================= */}

                <p
                  className="
                    mt-5
                    min-h-[72px]
                    text-sm
                    leading-6
                    text-slate-400
                  "
                >
                  {plan.description}
                </p>

                {/* =================================================
                    DIVIDER
                ================================================= */}

                <div className="my-6 h-px bg-white/10" />

                {/* =================================================
                    FEATURES
                ================================================= */}

                <ul className="space-y-3">

                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="
                        flex
                        items-start
                        gap-3
                        text-sm
                        text-slate-300
                      "
                    >
                      <span
                        className="
                          mt-0.5
                          flex
                          h-5
                          w-5
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-blue-500/10
                          text-xs
                          text-blue-400
                        "
                      >
                        ✓
                      </span>

                      <span>{feature}</span>
                    </li>
                  ))}

                </ul>

                {/* =================================================
                    PLAN CTA
                ================================================= */}

                <a
                  href="#contact"
                  className={`
                    mt-8
                    flex
                    w-full
                    items-center
                    justify-center
                    rounded-full
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    transition
                    ${
                      plan.popular
                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/20"
                        : "border border-white/10 bg-white/[0.04] text-white hover:border-blue-500/30 hover:bg-blue-500/10"
                    }
                  `}
                >
                  Choose {plan.name}
                </a>

              </div>
            ))}
          </div>

          {/* =================================================
              CARE NOTE
          ================================================= */}

          <p
            className="
              mt-7
              text-center
              text-xs
              leading-5
              text-slate-600
            "
          >
            Care plans cover ongoing maintenance and support within
            the scope of each plan. Larger feature development,
            new pages, custom systems, and major projects can be
            quoted separately.
          </p>

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
            bg-white/[0.025]
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
              Let's Build
              <span>→</span>
            </a>

          </div>

        </div>

      </Container>
    </section>
  );
}