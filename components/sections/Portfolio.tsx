import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";

const projects = [
  {
    title: "Restaurant Website",
    description:
      "Premium restaurant websites designed to showcase menus, reservations, and create memorable customer experiences.",
    image: "/projects/restaurant.png",
    tags: ["Restaurant", "Reservations", "SEO"],
    type: "concept",
  },

  {
    title: "Dental Clinic Website",
    description:
      "Modern healthcare websites focused on building patient trust, showcasing services, and appointment bookings.",
    image: "/projects/clinic.png",
    tags: ["Healthcare", "Booking", "Trust"],
    link: "https://brightsmile-dental-psi.vercel.app",
    type: "live",
  },

  {
    title: "Construction Website",
    description:
      "Professional websites that showcase projects, generate leads, and establish business credibility.",
    image: "/projects/construction.png",
    tags: ["Construction", "Leads", "Business"],
    link: "https://forgebuild-construction.vercel.app",
    type: "live",
  },

  {
    title: "E-Commerce Store",
    description:
      "A premium furniture ecommerce experience designed around timeless interiors, thoughtful product presentation, and modern living.",
    image: "/projects/ecommerce.png",
    tags: ["E-Commerce", "Furniture", "Premium Design"],
    link: "https://nova-home-khaki.vercel.app",
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
    title: "Elevate Coaching Website",
    description:
      "A premium coaching website designed to build trust, communicate personal growth programs, and turn visitors into potential clients.",
    image: "/projects/elevate.png",
    tags: ["Coaching", "Personal Growth", "Branding"],
    link: "https://elevate-coaching-mauve.vercel.app/",
    type: "live",
  },

  {
    title: "Real Estate Website",
    description:
      "Property websites with listings, inquiries, and lead generation features.",
    image: "/projects/realestate.png",
    tags: ["Real Estate", "Listings", "Leads"],
    type: "concept",
  },

  {
    title: "Hotel & Resort Website",
    description:
      "Beautiful hospitality websites designed to highlight experiences and bookings.",
    image: "/projects/hotel.png",
    tags: ["Hospitality", "Booking", "Experience"],
    type: "concept",
  },

  {
    title: "Beauty & Wellness Website",
    description:
      "Elegant websites for salons, spas, and wellness brands.",
    image: "/projects/wellness.png",
    tags: ["Beauty", "Booking", "Mobile"],
    type: "concept",
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24">
      <Container>
        {/* Section Title */}

        <SectionTitle
          badge="WEBSITE CONCEPTS"
          title="Websites Built"
          highlight="For Every Business"
          description="Explore premium website concepts created for different industries. Each design focuses on credibility, user experience, and business growth."
        />

        {/* Portfolio Grid */}

        <div
          className="
            mt-16
            grid
            gap-8
            md:grid-cols-2
            lg:grid-cols-3
          "
        >
          {projects.map((project) => (
            <div
              key={project.title}
              className="
                group
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-white/5
                transition
                duration-300
                hover:-translate-y-2
                hover:border-blue-500/50
              "
            >
              {/* IMAGE */}

              <div
                className="
                  h-64
                  overflow-hidden
                  bg-[#111827]
                "
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="
                    h-full
                    w-full
                    object-cover
                    transition
                    duration-500
                    group-hover:scale-105
                  "
                />
              </div>

              {/* CONTENT */}

              <div className="p-8">
                {/* TITLE */}

                <h3
                  className="
                    text-2xl
                    font-bold
                    text-white
                  "
                >
                  {project.title}
                </h3>

                {/* DESCRIPTION */}

                <p
                  className="
                    mt-4
                    leading-7
                    text-slate-400
                  "
                >
                  {project.description}
                </p>

                {/* TAGS */}

                <div
                  className="
                    mt-6
                    flex
                    flex-wrap
                    gap-3
                  "
                >
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

                {/* ACTION */}

                {project.type === "live" && project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      mt-8
                      inline-block
                      font-semibold
                      text-blue-400
                      transition
                      hover:text-blue-300
                    "
                  >
                    View Live Website →
                  </a>
                )}

                {project.type === "concept" && (
                  <span
                    className="
                      mt-8
                      inline-block
                      font-semibold
                      text-blue-400/60
                    "
                  >
                    View Concept →
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}