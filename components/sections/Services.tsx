import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";

const services = [
  {
    number: "01",
    icon: "✦",
    title: "Websites & Digital Experiences",
    description:
      "Custom digital experiences designed around your brand, your audience, and the goals that matter most to your business.",
    features: [
      "Custom Website Design",
      "UI/UX & Responsive Development",
      "Landing & Business Websites",
      "SEO-Ready Foundations",
    ],
  },

  {
    number: "02",
    icon: "◈",
    title: "E-Commerce & Online Platforms",
    description:
      "Online experiences built to help businesses showcase products, serve customers, and create a smoother path from discovery to purchase.",
    features: [
      "E-Commerce Stores",
      "Product Catalogs & Search",
      "Shopping Cart & Checkout",
      "Customer Accounts & Orders",
    ],
  },

  {
    number: "03",
    icon: "▦",
    title: "Business Systems",
    description:
      "Custom digital tools that connect important parts of your business and make everyday operations easier to manage.",
    features: [
      "Business Dashboards",
      "CRM & Customer Portals",
      "Inventory & Order Management",
      "Custom Internal Tools",
    ],
  },

  {
    number: "04",
    icon: "↗",
    title: "Growth & Automation",
    description:
      "Connected technology that helps businesses understand activity, improve workflows, manage leads, and create new opportunities.",
    features: [
      "Analytics & Reporting",
      "Lead & Marketing Systems",
      "Workflow Automation",
      "AI & Third-Party Integrations",
    ],
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="bg-[#050816] py-28"
      aria-labelledby="services-heading"
    >
      <Container>
        {/* =====================================================
            SECTION INTRO
        ===================================================== */}

        <SectionTitle
          badge="WHAT WE BUILD"
          title="From Your First Website"
          highlight="To Your Next Big System"
          description="
            Vertex Studio Works builds digital experiences and
            business technology around what your business needs
            today — and where you want to take it tomorrow.
          "
        />

        {/* =====================================================
            SERVICE GRID
        ===================================================== */}

        <div
          className="
            mt-20
            grid
            gap-6
            md:grid-cols-2
          "
        >
          {services.map((service) => (
            <div
              key={service.title}
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
                  -right-20
                  -top-20
                  h-40
                  w-40
                  rounded-full
                  bg-blue-500/10
                  blur-3xl
                  transition-opacity
                  duration-300
                  group-hover:bg-blue-500/20
                "
                aria-hidden="true"
              />

              {/* =================================================
                  TOP ROW
              ================================================= */}

              <div className="relative flex items-start justify-between">
                <div
                  className="
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
                  "
                >
                  {service.icon}
                </div>

                <span
                  className="
                    text-sm
                    font-semibold
                    tracking-[0.2em]
                    text-slate-600
                  "
                >
                  {service.number}
                </span>
              </div>

              {/* =================================================
                  TITLE
              ================================================= */}

              <h3
                className="
                  relative
                  mt-8
                  text-2xl
                  font-bold
                  leading-tight
                  text-white
                "
              >
                {service.title}
              </h3>

              {/* =================================================
                  DESCRIPTION
              ================================================= */}

              <p
                className="
                  relative
                  mt-4
                  max-w-xl
                  leading-7
                  text-slate-400
                "
              >
                {service.description}
              </p>

              {/* =================================================
                  FEATURES
              ================================================= */}

              <ul
                className="
                  relative
                  mt-7
                  grid
                  gap-3
                  sm:grid-cols-2
                "
              >
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="
                      flex
                      items-center
                      gap-3
                      text-sm
                      text-slate-300
                    "
                  >
                    <span
                      className="
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

                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* =====================================================
            BOTTOM STATEMENT
        ===================================================== */}

        <div
          className="
            mt-10
            rounded-3xl
            border
            border-white/10
            bg-gradient-to-r
            from-blue-500/[0.08]
            via-white/[0.03]
            to-cyan-500/[0.06]
            px-8
            py-10
            text-center
          "
        >
          <p
            className="
              text-xl
              font-semibold
              text-white
              md:text-2xl
            "
          >
            Start with what your business needs today.
          </p>

          <p
            className="
              mt-3
              text-slate-400
            "
          >
            Build what you need tomorrow.
          </p>
        </div>
      </Container>
    </section>
  );
}
