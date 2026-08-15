import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import Button from "../ui/Button";

const packages = [
  {
    name: "Launch",
    price: "$249",
    description:
      "Perfect for startups and new businesses that need a professional website to establish credibility online.",
    button: "Start Your Project",
    link: "https://calendly.com/hello-vertexstudioworks/30min",
    popular: false,
    features: [
      "Up to 5 Custom Pages",
      "Premium Custom Design",
      "Mobile Responsive",
      "Basic SEO Setup",
      "Google Analytics Setup",
      "Contact Form Integration",
      "Performance Optimization",
      "Website Backup Before Launch",
      "3 Months Complimentary Website Care",
    ],
  },

  {
    name: "Scale",
    price: "$499",
    description:
      "Built for growing businesses that need stronger features, better visibility, AI capabilities, and a website designed for growth.",
    button: "Book Free Strategy Call",
    link: "https://calendly.com/hello-vertexstudioworks/30min",
    popular: true,
    features: [
      "Everything in Launch",
      "CMS Integration",
      "Blog / Content Management",
      "Advanced SEO Setup",
      "Premium Animations",
      "Additional Pages",
      "Speed Optimization",
      "AI Chatbot Integration",
      "Priority Support",
      "6 Months Complimentary Website Care",
    ],
  },

  {
    name: "Enterprise",
    price: "Custom Quote",
    description:
      "For businesses needing custom solutions, integrations, and advanced website functionality.",
    button: "Request a Quote",
    link: "https://calendly.com/hello-vertexstudioworks/30min",
    popular: false,
    features: [
      "Unlimited Pages",
      "Custom Functionality",
      "Booking Systems",
      "E-Commerce Solutions",
      "API / CRM Integrations",
      "Dedicated Planning",
      "Priority Development",
      "12 Months Premium Website Care",
    ],
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
          title="Premium Websites"
          highlight="Built For Growth"
          description="
            Premium website design and development at affordable pricing
            for startups, growing businesses, and established companies.
          "
        />

        {/* =====================================================
            PRICING PACKAGES
        ===================================================== */}

        <div
          className="
            mt-20
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

                    <span>
                      {feature}
                    </span>
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
            Qualified startups may receive special launch incentives and
            flexible payment options.
          </p>
        </div>

        {/* =====================================================
            WEBSITE CARE
        ===================================================== */}

        <div
          className="
            mt-16
            rounded-3xl
            border
            border-white/10
            bg-white/5
            p-10
          "
        >
          <div
            className="
              text-center
            "
          >
            <span
              className="
                inline-block
                rounded-full
                border
                border-blue-500/20
                bg-blue-500/10
                px-4
                py-2
                text-sm
                font-semibold
                uppercase
                tracking-wider
                text-blue-400
              "
            >
              Vertex Care
            </span>

            <h3
              className="
                mt-6
                text-4xl
                font-bold
                text-white
              "
            >
              Keep Your Website Growing After Launch
            </h3>

            <p
              className="
                mx-auto
                mt-5
                max-w-3xl
                text-slate-400
              "
            >
              Ongoing maintenance, security, updates, and performance
              improvements so your website continues working for your
              business.
            </p>
          </div>

          {/* =================================================
              WEBSITE CARE PLANS
          ================================================= */}

          <div
            className="
              mt-12
              grid
              gap-8
              lg:grid-cols-3
            "
          >
            {/* =================================================
                ESSENTIAL CARE
            ================================================= */}

            <article
              className="
                rounded-2xl
                border
                border-white/10
                bg-[#0B1220]
                p-8
              "
            >
              <h4
                className="
                  text-2xl
                  font-bold
                  text-white
                "
              >
                Essential Care
              </h4>

              <p
                className="
                  mt-3
                  text-4xl
                  font-bold
                  text-blue-400
                "
              >
                $49
                <span
                  className="
                    text-lg
                    text-slate-400
                  "
                >
                  /month
                </span>
              </p>

              <ul
                className="
                  mt-8
                  space-y-3
                  text-slate-300
                "
              >
                <li>✓ Monthly Updates</li>
                <li>✓ Security Monitoring</li>
                <li>✓ Website Backups</li>
                <li>✓ Performance Checks</li>
                <li>✓ Email Support</li>
              </ul>
            </article>

            {/* =================================================
                GROWTH CARE
            ================================================= */}

            <article
              className="
                rounded-2xl
                border-2
                border-blue-500
                bg-[#0B1220]
                p-8
                shadow-xl
                shadow-blue-500/10
              "
            >
              <div
                className="
                  mb-4
                  inline-block
                  rounded-full
                  bg-blue-600
                  px-3
                  py-1
                  text-xs
                  font-bold
                  uppercase
                  text-white
                "
              >
                Popular
              </div>

              <h4
                className="
                  text-2xl
                  font-bold
                  text-white
                "
              >
                Growth Care
              </h4>

              <p
                className="
                  mt-3
                  text-4xl
                  font-bold
                  text-blue-400
                "
              >
                $99
                <span
                  className="
                    text-lg
                    text-slate-400
                  "
                >
                  /month
                </span>
              </p>

              <ul
                className="
                  mt-8
                  space-y-3
                  text-slate-300
                "
              >
                <li>✓ Everything in Essential</li>
                <li>✓ Content Updates</li>
                <li>✓ SEO Health Checks</li>
                <li>✓ Performance Optimization</li>
                <li>✓ Priority Support</li>
              </ul>
            </article>

            {/* =================================================
                PREMIUM CARE
            ================================================= */}

            <article
              className="
                rounded-2xl
                border
                border-white/10
                bg-[#0B1220]
                p-8
              "
            >
              <h4
                className="
                  text-2xl
                  font-bold
                  text-white
                "
              >
                Premium Care
              </h4>

              <p
                className="
                  mt-3
                  text-4xl
                  font-bold
                  text-blue-400
                "
              >
                $149+
              </p>

              <ul
                className="
                  mt-8
                  space-y-3
                  text-slate-300
                "
              >
                <li>✓ Advanced Maintenance</li>
                <li>✓ Priority Development</li>
                <li>✓ Strategy Sessions</li>
                <li>✓ Custom Improvements</li>
                <li>✓ Dedicated Support</li>
              </ul>
            </article>
          </div>
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