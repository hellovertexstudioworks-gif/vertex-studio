import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import Button from "../ui/Button";

const calendlyLink =
  "https://calendly.com/hello-vertexstudioworks/30min";

const packages = [
  {
    name: "Launch",
    price: "$25",
    billing: "ONE-TIME PAYMENT",
    description:
      "Perfect for startups, entrepreneurs, and small businesses that need a professional website to establish credibility and start building opportunities online.",
    button: "Start Your Project",
    link: calendlyLink,
    popular: false,
    features: [
      "Up to 5 Custom Pages",
      "Premium Custom Design",
      "Mobile Responsive",
      "Basic SEO Setup",
      "Google Analytics Setup",
      "Contact Form Integration",
      "Basic Lead Capture Setup",
      "Conversion-Focused Layout",
      "Performance Optimization",
      "Website Backup Before Launch",
      "2 Months Complimentary Vertex Care",
    ],
  },

  {
    name: "Scale",
    price: "$50",
    billing: "ONE-TIME PAYMENT",
    description:
      "Built for growing businesses that want more than a website — combining growth tools, lead generation, customer engagement, and e-commerce capabilities.",
    button: "Build With Vertex",
    link: calendlyLink,
    popular: true,
    features: [
      "Everything in Launch",
      "Unlimited Standard Website Pages",
      "CMS / Blog Integration",
      "Advanced SEO Setup",
      "Premium Animations",
      "Speed Optimization",
      "Lead Generation Dashboard",
      "Lead Capture & Tracking",
      "Conversion Optimization",
      "Google Analytics + Search Console",
      "Basic CRM / Lead Tracking Setup",
      "Cold Email Campaign Setup",
      "Prospect & Lead List Structure",
      "Email Outreach Templates",
      "Lead Follow-Up System",
      "Website + Lead Funnel Strategy",
      "Chatbot Integration",
      "E-Commerce Solutions",
      "E-Commerce Pricing Based on Requirements",
      "Ongoing Support",
      "4 Months Complimentary Vertex Care",
    ],
  },

  {
    name: "Enterprise",
    price: "Custom Quote",
    billing: "PROJECT-BASED",
    description:
      "For businesses that need advanced websites, custom functionality, e-commerce, integrations, automation, and more complex business systems.",
    button: "Request a Quote",
    link: calendlyLink,
    popular: false,
    features: [
      "Unlimited Pages",
      "Custom Functionality",
      "Advanced E-Commerce",
      "Custom E-Commerce Features",
      "Booking Systems",
      "API / CRM Integrations",
      "Lead Generation Systems",
      "Advanced Analytics & Dashboards",
      "Marketing Automation",
      "Custom Outreach Systems",
      "Custom Chatbot / AI Assistant",
      "Advanced Business Systems",
      "Flexible Development",
      "Custom Website Care Options",
    ],
  },
];

const carePackages = [
  {
    name: "Starter",
    price: "$5",
    billing: "PER MONTH",
    description:
      "For businesses that need simple ongoing website maintenance and support.",
    features: [
      "Basic Website Maintenance",
      "Minor Content Updates",
      "Basic Website Support",
      "Simple Website Changes",
    ],
    popular: false,
  },
  {
    name: "Growth",
    price: "$10",
    billing: "PER MONTH",
    description:
      "For growing businesses that want regular website updates and continued support.",
    features: [
      "Everything in Starter",
      "More Content Updates",
      "Basic Performance Checks",
      "Analytics Review",
      "Ongoing Website Improvements",
      "Support for Growth Updates",
    ],
    popular: true,
  },
  {
    name: "Business",
    price: "$15",
    billing: "PER MONTH",
    description:
      "For businesses that want more hands-on website support and ongoing improvements.",
    features: [
      "Everything in Growth",
      "More Frequent Updates",
      "Performance Monitoring",
      "Website Improvements",
      "Business Support",
      "Ongoing Optimization",
    ],
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="
        bg-[#050816]
        py-28
      "
      aria-labelledby="pricing-heading"
    >
      <Container>
        {/* =====================================================
            PRICING HEADER
        ===================================================== */}

        <SectionTitle
          badge="PRICING"
          title="Websites Built"
          highlight="For Growth"
          description="
            We don't just build your website. We help you turn it into
            a growth system designed to attract visitors, capture leads,
            and create opportunities for your business.
          "
        />

        {/* =====================================================
            ONE-TIME PAYMENT MESSAGE
        ===================================================== */}

        <div
          className="
            mx-auto
            mt-10
            max-w-2xl
            rounded-2xl
            border
            border-blue-500/20
            bg-blue-500/[0.06]
            px-6
            py-5
            text-center
          "
        >
          <p
            className="
              text-sm
              font-bold
              uppercase
              tracking-[0.2em]
              text-blue-400
            "
          >
            Simple, One-Time Website Pricing
          </p>

          <p
            className="
              mt-2
              text-sm
              leading-6
              text-slate-400
            "
          >
            No monthly website subscription required. Pay once for
            your website project. Optional Vertex Care is available
            separately for ongoing maintenance and support.
          </p>
        </div>

        {/* =====================================================
            WEBSITE PACKAGES
        ===================================================== */}

        <div
          className="
            mt-16
            grid
            gap-8
            lg:grid-cols-3
          "
        >
          {packages.map((pkg) => (
            <article
              key={pkg.name}
              className={`
                relative
                rounded-3xl
                p-10
                transition-all
                duration-300
                hover:-translate-y-2
                ${
                  pkg.popular
                    ? "border-2 border-blue-500 bg-white/5 shadow-xl shadow-blue-500/20"
                    : "border border-white/10 bg-white/5"
                }
              `}
            >
              {/* =================================================
                  RECOMMENDED BADGE
              ================================================= */}

              {pkg.popular && (
                <div
                  className="
                    absolute
                    right-6
                    top-6
                    rounded-full
                    bg-blue-600
                    px-4
                    py-2
                    text-xs
                    font-bold
                    uppercase
                    tracking-wider
                    text-white
                  "
                >
                  Recommended
                </div>
              )}

              {/* =================================================
                  PACKAGE NAME
              ================================================= */}

              <h3
                className="
                  text-2xl
                  font-bold
                  text-white
                "
              >
                {pkg.name}
              </h3>

              {/* =================================================
                  PRICE
              ================================================= */}

              <p
                className="
                  mt-5
                  text-5xl
                  font-bold
                  text-blue-400
                "
              >
                {pkg.price}
              </p>

              {/* =================================================
                  BILLING TYPE
              ================================================= */}

              <div
                className="
                  mt-3
                  inline-flex
                  rounded-full
                  border
                  border-blue-500/20
                  bg-blue-500/10
                  px-3
                  py-1.5
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-blue-400
                "
              >
                {pkg.billing}
              </div>

              {/* =================================================
                  DESCRIPTION
              ================================================= */}

              <p
                className="
                  mt-6
                  leading-8
                  text-slate-400
                "
              >
                {pkg.description}
              </p>

              {/* =================================================
                  FEATURES
              ================================================= */}

              <ul
                className="
                  mt-8
                  space-y-4
                "
              >
                {pkg.features.map((feature) => (
                  <li
                    key={feature}
                    className="
                      flex
                      gap-3
                      text-slate-300
                    "
                  >
                    <span
                      className="
                        text-blue-400
                      "
                      aria-hidden="true"
                    >
                      ✓
                    </span>

                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* =================================================
                  CTA
              ================================================= */}

              <div
                className="
                  mt-10
                "
              >
                <Button
                  href={pkg.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  {pkg.button}
                </Button>
              </div>
            </article>
          ))}
        </div>

        {/* =====================================================
            CARE SEPARATION MESSAGE
        ===================================================== */}

        <div
          className="
            mx-auto
            mt-16
            max-w-3xl
            text-center
          "
        >
          <p
            className="
              text-sm
              leading-6
              text-slate-500
            "
          >
            Website packages are one-time project fees. Vertex Care is
            optional and provides ongoing maintenance, support, and
            website improvements after your project launches.
          </p>
        </div>

        {/* =====================================================
            VERTEX CARE
        ===================================================== */}

        <div
          className="
            mt-20
          "
        >
          <SectionTitle
            badge="VERTEX CARE"
            title="Keep Your Website"
            highlight="Growing"
            description="
              Choose the level of ongoing support that fits your business.
              Start small and upgrade your support whenever you need more.
            "
          />

          <div
            className="
              mt-12
              grid
              gap-8
              lg:grid-cols-3
            "
          >
            {carePackages.map((pkg) => (
              <article
                key={pkg.name}
                className={`
                  relative
                  rounded-3xl
                  border
                  p-8
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  ${
                    pkg.popular
                      ? "border-2 border-blue-500 bg-white/5 shadow-xl shadow-blue-500/20"
                      : "border-white/10 bg-white/5"
                  }
                `}
              >
                {pkg.popular && (
                  <div
                    className="
                      absolute
                      right-6
                      top-6
                      rounded-full
                      bg-blue-600
                      px-4
                      py-2
                      text-xs
                      font-bold
                      uppercase
                      tracking-wider
                      text-white
                    "
                  >
                    Popular
                  </div>
                )}

                <h3
                  className="
                    text-2xl
                    font-bold
                    text-white
                  "
                >
                  {pkg.name}
                </h3>

                <p
                  className="
                    mt-5
                    text-5xl
                    font-bold
                    text-blue-400
                  "
                >
                  {pkg.price}
                </p>

                <div
                  className="
                    mt-3
                    inline-flex
                    rounded-full
                    border
                    border-blue-500/20
                    bg-blue-500/10
                    px-3
                    py-1.5
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-blue-400
                  "
                >
                  {pkg.billing}
                </div>

                <p
                  className="
                    mt-6
                    leading-8
                    text-slate-400
                  "
                >
                  {pkg.description}
                </p>

                <ul
                  className="
                    mt-8
                    space-y-4
                  "
                >
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className="
                        flex
                        gap-3
                        text-slate-300
                      "
                    >
                      <span
                        className="text-blue-400"
                        aria-hidden="true"
                      >
                        ✓
                      </span>

                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10">
                  <Button
                    href={calendlyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    Talk About Your Care Plan
                  </Button>
                </div>
              </article>
            ))}
          </div>

          <p
            className="
              mx-auto
              mt-8
              max-w-3xl
              text-center
              text-sm
              leading-6
              text-slate-500
            "
          >
            Need something outside these plans? We can discuss a custom
            maintenance or support arrangement based on your website and
            business needs.
          </p>
        </div>

        {/* =====================================================
            GROWTH SYSTEM
        ===================================================== */}

        <div
          className="
            mt-20
            rounded-3xl
            border
            border-blue-500/30
            bg-blue-500/10
            p-10
            text-center
          "
        >
          <h3
            className="
              text-3xl
              font-bold
              text-white
            "
          >
            🚀 More Than Just A Website
          </h3>

          <p
            className="
              mx-auto
              mt-5
              max-w-3xl
              text-lg
              leading-8
              text-slate-300
            "
          >
            Your website should do more than look good. We can help
            structure your website to capture leads, track opportunities,
            improve conversions, support your outreach efforts, and connect
            customers with your business through tools like chatbots.
          </p>

          <div
            className="
              mx-auto
              mt-10
              grid
              max-w-5xl
              gap-6
              md:grid-cols-3
            "
          >
            {/* CAPTURE */}

            <div
              className="
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-6
              "
            >
              <h4
                className="
                  text-xl
                  font-bold
                  text-white
                "
              >
                Capture
              </h4>

              <p
                className="
                  mt-3
                  text-slate-400
                "
              >
                Turn website visitors into inquiries through strategic
                forms, calls-to-action, chatbots, and lead capture systems.
              </p>
            </div>

            {/* TRACK */}

            <div
              className="
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-6
              "
            >
              <h4
                className="
                  text-xl
                  font-bold
                  text-white
                "
              >
                Track
              </h4>

              <p
                className="
                  mt-3
                  text-slate-400
                "
              >
                Understand where visitors and leads come from with
                analytics, tracking, and simple lead dashboards.
              </p>
            </div>

            {/* REACH */}

            <div
              className="
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-6
              "
            >
              <h4
                className="
                  text-xl
                  font-bold
                  text-white
                "
              >
                Reach
              </h4>

              <p
                className="
                  mt-3
                  text-slate-400
                "
              >
                Build a structured outreach process with prospect lists,
                cold-email templates, and follow-up workflows.
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            STARTUP PROGRAM
        ===================================================== */}

        <div
          className="
            mt-20
            rounded-3xl
            border
            border-blue-500/30
            bg-blue-500/10
            p-10
            text-center
          "
        >
          <h3
            className="
              text-3xl
              font-bold
              text-white
            "
          >
            🚀 Startup Launch Program
          </h3>

          <p
            className="
              mx-auto
              mt-5
              max-w-3xl
              text-lg
              text-slate-300
            "
          >
            Qualified startups may receive special launch incentives
            and flexible payment options.
          </p>
        </div>

        {/* =====================================================
            PAYMENT OPTIONS
        ===================================================== */}

        <div
          className="
            mt-16
            text-center
          "
        >
          <h3
            className="
              text-3xl
              font-bold
              text-white
            "
          >
            Flexible Payment Options
          </h3>

          <p
            className="
              mt-5
              text-lg
              text-slate-400
            "
          >
            50% Deposit • 25% Midway • 25% Upon Completion
          </p>
        </div>
      </Container>
    </section>
  );
}