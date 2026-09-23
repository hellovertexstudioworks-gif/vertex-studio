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

      "A modern dental clinic experience focused on patient trust, clear services, professional presentation, convenient appointment booking, and a connected business platform demo.",

    image: "/projects/clinic.png",

    tags: ["Healthcare", "Booking", "Trust"],

    link: "/work/brightsmile",
    crmLink: "/work/brightsmile/admin/dashboard",

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

      "A premium furniture e-commerce experience designed around product discovery, thoughtful presentation, online shopping, and modern living.",

    image: "/projects/ecommerce.png",

    tags: ["E-Commerce", "Furniture", "Online Store"],

    link: "/work/novahome",

    type: "live",

  },



  {

    title: "Horizon Realty",

    description:

      "A premium real estate experience designed around property discovery, luxury listings, thoughtful service, and high-end visual storytelling.",

    image: "/projects/realestate.png",

    tags: ["Real Estate", "Listings", "Property"],

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

      "A modern startup experience designed to explain products, build credibility, communicate value, and convert visitors.",

    image: "/projects/saas.png",

    tags: ["SaaS", "Startup", "Growth"],

    type: "concept",

  },



  {

    title: "Hotel & Resort Website",

    description:

      "A hospitality experience designed to showcase destinations, accommodations, guest experiences, and booking opportunities.",

    image: "/projects/hotel.png",

    tags: ["Hospitality", "Booking", "Experience"],

    type: "concept",

  },



  {

    title: "Beauty & Wellness Website",

    description:

      "An elegant digital experience for beauty and wellness brands focused on premium presentation, services, and convenient booking.",

    image: "/projects/wellness.png",

    tags: ["Beauty", "Wellness", "Booking"],

    type: "concept",

  },

];



export default function Portfolio() {

  return (

    <section

      id="portfolio"

      className="

        relative

        overflow-hidden

        bg-[#050816]

        py-24

        sm:py-28

        lg:py-32

      "

      aria-labelledby="portfolio-heading"

    >

      {/* =====================================================

          BACKGROUND GLOW

      ===================================================== */}



      <div

        className="

          pointer-events-none

          absolute

          left-1/2

          top-32

          h-[500px]

          w-[500px]

          -translate-x-1/2

          rounded-full

          bg-blue-500/[0.04]

          blur-[140px]

        "

        aria-hidden="true"

      />



      <Container>

        {/* =====================================================

            SECTION HEADER

        ===================================================== */}



        <div className="max-w-3xl">

          <div className="mb-6 flex items-center gap-4">

            <span className="h-px w-10 bg-blue-500" />



            <p

              className="

                text-[10px]

                font-bold

                uppercase

                tracking-[0.3em]

                text-blue-400

              "

            >

              Selected Work

            </p>

          </div>



          <h2

            id="portfolio-heading"

            className="

              text-4xl

              font-bold

              leading-tight

              tracking-[-0.04em]

              text-white

              sm:text-5xl

              lg:text-6xl

            "

          >

            Built for different businesses.

            <br />



            <span className="text-blue-400">

              Designed around their goals.

            </span>

          </h2>



          <p

            className="

              mt-6

              max-w-2xl

              text-base

              leading-8

              text-slate-400

            "

          >

            From restaurants and healthcare to e-commerce, real estate,

            hospitality, SaaS, and professional services, we create

            digital experiences around the people, products, and goals

            behind each business.

          </p>

        </div>



        {/* =====================================================

            INDUSTRY RANGE

        ===================================================== */}



        <div

          className="

            mt-10

            flex

            flex-wrap

            gap-3

          "

        >

          {[

            "Business",

            "E-Commerce",

            "Healthcare",

            "Hospitality",

            "Real Estate",

            "SaaS",

            "Professional Services",

          ].map((category) => (

            <span

              key={category}

              className="

                rounded-full

                border

                border-white/10

                bg-white/[0.03]

                px-4

                py-2

                text-xs

                text-slate-400

              "

            >

              {category}

            </span>

          ))}

        </div>



        {/* =====================================================

            PORTFOLIO GRID

        ===================================================== */}



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

                hover:shadow-2xl

                hover:shadow-blue-500/[0.05]

              "

            >

              {/* =================================================

                  IMAGE

              ================================================= */}



              <div

                className="

                  relative

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

                    transition-transform

                    duration-700

                    group-hover:scale-105

                  "

                />



                {/* IMAGE OVERLAY */}



                <div

                  className="

                    absolute

                    inset-0

                    bg-gradient-to-t

                    from-black/50

                    via-transparent

                    to-transparent

                    opacity-70

                  "

                />



                {/* =================================================

                    PROJECT STATUS

                ================================================= */}



                <div className="absolute left-5 top-5">

                  {project.type === "live" ? (

                    <span

                      className="

                        inline-flex

                        items-center

                        gap-2

                        rounded-full

                        border

                        border-white/15

                        bg-black/40

                        px-3

                        py-1.5

                        text-[10px]

                        font-medium

                        uppercase

                        tracking-[0.14em]

                        text-white

                        backdrop-blur-md

                      "

                    >

                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                      Live Project

                    </span>

                  ) : (

                    <span

                      className="

                        inline-flex

                        items-center

                        gap-2

                        rounded-full

                        border

                        border-white/15

                        bg-black/40

                        px-3

                        py-1.5

                        text-[10px]

                        font-medium

                        uppercase

                        tracking-[0.14em]

                        text-white

                        backdrop-blur-md

                      "

                    >

                      <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />

                      Concept

                    </span>

                  )}

                </div>

              </div>



              {/* =================================================

                  CONTENT

              ================================================= */}



              <div className="p-8">

                {/* TITLE */}



                <h3

                  className="

                    text-2xl

                    font-bold

                    tracking-tight

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



                {/* =================================================

                    TAGS

                ================================================= */}



                <div

                  className="

                    mt-6

                    flex

                    flex-wrap

                    gap-2.5

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



                {/* =================================================

                    ACTION

                ================================================= */}



                {project.type === "live" && project.link && (
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <a
                      href={project.link}
                      className="
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

                    {"crmLink" in project && project.crmLink && (
                      <a
                        href={project.crmLink}
                        className="
                          inline-flex
                          items-center
                          gap-2
                          rounded-full
                          border
                          border-blue-500/25
                          bg-blue-500/10
                          px-4
                          py-2
                          text-xs
                          font-semibold
                          text-blue-300
                          transition-all
                          duration-300
                          hover:-translate-y-0.5
                          hover:border-blue-400/40
                          hover:bg-blue-500/15
                          hover:text-white
                        "
                      >
                        Explore CRM
                        <span>→</span>
                      </a>
                    )}
                  </div>
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



        {/* =====================================================

            BOTTOM STATEMENT

        ===================================================== */}



        <div

          className="

            mt-14

            border-t

            border-white/10

            pt-10

          "

        >

          <div

            className="

              flex

              flex-col

              justify-between

              gap-6

              md:flex-row

              md:items-center

            "

          >

            <div>

              <p className="text-lg font-semibold text-white">

                Different businesses. Different challenges.

              </p>



              <p className="mt-2 text-sm text-slate-500">

                One goal: build a digital experience that moves the

                business forward.

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

                href="https://calendly.com/hello-vertexstudioworks/30min"

                target="_blank"

                rel="noopener noreferrer"

                className="

                  inline-flex

                  w-fit

                  shrink-0

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

                  hover:-translate-y-1

                  hover:shadow-lg

                  hover:shadow-blue-500/20

                "

              >

                <span aria-hidden="true">▣</span>

                Book a Call

              </a>



              {/* DIVIDER */}



              <div

                className="

                  hidden

                  h-8

                  w-px

                  bg-white/15

                  sm:block

                "

                aria-hidden="true"

              />



              {/* START YOUR PROJECT */}



              <a

                href="#contact"

                className="

                  inline-flex

                  w-fit

                  shrink-0

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

                  hover:-translate-y-1

                  hover:border-blue-500/40

                  hover:bg-blue-500/10

                "

              >

                Start Your Project

                <span aria-hidden="true">→</span>

              </a>

            </div>

          </div>

        </div>

      </Container>

    </section>

  );

}