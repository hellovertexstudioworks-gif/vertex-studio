import Container from "../ui/Container";

const projects = [
  {
    title: "Luna Bistro Website",
    description:
      "A premium restaurant experience designed around elegant dining, storytelling, menus, reservations, and memorable customer experiences.",
    image: "/projects/restaurant.png",
    tags: ["Restaurant", "Reservations", "Premium Design"],
    link: "/work/lunabistro",
    type: "live",
  },

  {
    title: "BrightSmile Dental Website",
    description:
      "A modern dental clinic experience focused on patient trust, clear services, professional presentation, and convenient appointment booking.",
    image: "/projects/clinic.png",
    tags: ["Healthcare", "Booking", "Trust"],
    link: "/work/brightsmile",
    type: "live",
  },

  {
    title: "ForgeBuild Construction",
    description:
      "A professional construction website designed to showcase projects, establish credibility, and generate qualified business inquiries.",
    image: "/projects/construction.png",
    tags: ["Construction", "Leads", "Business"],
    link: "/work/forgebuild",
    type: "live",
  },

  {
    title: "Nova Home E-Commerce",
    description:
      "A premium furniture ecommerce experience designed around timeless interiors, thoughtful product presentation, and modern living.",
    image: "/projects/ecommerce.png",
    tags: ["E-Commerce", "Furniture", "Premium Design"],
    link: "/work/novahome",
    type: "live",
  },

  {
    title: "Horizon Realty",
    description:
      "A premium real estate experience designed around luxury properties, thoughtful service, property discovery, and high-end visual storytelling.",
    image: "/projects/realestate.png",
    tags: ["Real Estate", "Listings", "Premium Design"],
    link: "/work/horizon-realty",
    type: "live",
  },

  {
    title: "Elevate Coaching Website",
    description:
      "A premium coaching website designed to build trust, communicate personal growth programs, and turn visitors into potential clients.",
    image: "/projects/elevate.png",
    tags: ["Coaching", "Personal Growth", "Branding"],
    link: "/work/elevate-coaching",
    type: "live",
  },

  {
    title: "SaaS Startup Website",
    description:
      "Modern startup websites designed to explain products, build credibility, and convert visitors.",
    image: "/projects/saas.png",
    tags: ["SaaS", "Startup", "Growth"],
    type: "concept",
  },

  {
    title: "Hotel & Resort Website",
    description:
      "Beautiful hospitality websites designed to highlight experiences, destinations, and booking opportunities.",
    image: "/projects/hotel.png",
    tags: ["Hospitality", "Booking", "Experience"],
    type: "concept",
  },

  {
    title: "Beauty & Wellness Website",
    description:
      "Elegant websites for salons, spas, and wellness brands designed around premium presentation and convenient booking.",
    image: "/projects/wellness.png",
    tags: ["Beauty", "Booking", "Mobile"],
    type: "concept",
  },
];

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="relative overflow-hidden bg-[#050816] py-24 sm:py-28 lg:py-32"
    >
      <Container>
        {/* =====================================================
            SECTION HEADER
        ===================================================== */}

        <div className="max-w-3xl">
          <div className="mb-6 flex items-center gap-4">
            <span className="h-px w-10 bg-blue-500" />

            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400">
              Selected Work
            </p>
          </div>

          <h2 className="text-4xl font-bold leading-tight tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
            Websites built to{" "}
            <span className="text-blue-400">
              move businesses forward.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400">
            Explore a selection of websites we've designed and developed for
            businesses, brands, and ambitious ideas.
          </p>
        </div>

        {/* =====================================================
            PORTFOLIO GRID
        ===================================================== */}

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="
                group
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-white/[0.04]
                transition-all
                duration-500
                hover:-translate-y-2
                hover:border-white/20
                hover:bg-white/[0.06]
              "
            >
              {/* =================================================
                  IMAGE
              ================================================= */}

              <div className="relative h-64 overflow-hidden bg-[#111827]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-105
                  "
                />

                {/* IMAGE OVERLAY */}

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                {/* LIVE BADGE */}

                {project.type === "live" && (
                  <div className="absolute left-5 top-5">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-white backdrop-blur-md">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Live Project
                    </span>
                  </div>
                )}
              </div>

              {/* =================================================
                  CONTENT
              ================================================= */}

              <div className="p-8">
                {/* TITLE */}

                <h3 className="text-2xl font-bold tracking-tight text-white">
                  {project.title}
                </h3>

                {/* DESCRIPTION */}

                <p className="mt-4 leading-7 text-slate-400">
                  {project.description}
                </p>

                {/* TAGS */}

                <div className="mt-6 flex flex-wrap gap-2.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="
                        rounded-full
                        border
                        border-blue-500/20
                        bg-blue-500/10
                        px-3
                        py-1
                        text-xs
                        text-blue-400
                      "
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* =================================================
                    ACTION
                ================================================= */}

                {project.type === "live" && project.link && (
                  <a
                    href={project.link}
                    className="
                      mt-8
                      inline-flex
                      items-center
                      gap-2
                      font-semibold
                      text-blue-400
                      transition-all
                      duration-300
                      hover:gap-3
                      hover:text-blue-300
                    "
                  >
                    View Website
                    <span>→</span>
                  </a>
                )}

                {project.type === "concept" && (
                  <span
                    className="
                      mt-8
                      inline-flex
                      items-center
                      gap-2
                      font-semibold
                      text-blue-400/60
                    "
                  >
                    View Concept
                    <span>→</span>
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}