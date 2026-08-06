import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";


const services = [
  {
    icon: "🎨",
    title: "Strategic Website Design",
    description:
      "Modern, conversion-focused designs created to build trust, showcase your brand, and create a professional first impression.",
    features: [
      "Custom UI/UX Design",
      "Brand-Focused Layouts",
      "Mobile Responsive Design",
    ],
  },

  {
    icon: "⚡",
    title: "Web Development",
    description:
      "Fast, secure, and responsive websites built with modern technologies that deliver a smooth user experience.",
    features: [
      "Custom Development",
      "Performance Optimization",
      "Responsive Across Devices",
    ],
  },

  {
    icon: "📈",
    title: "SEO & Digital Growth",
    description:
      "Improve your online visibility and create a website structure designed to attract and convert more customers.",
    features: [
      "SEO Setup",
      "Google Optimization",
      "Growth Recommendations",
    ],
  },

  {
    icon: "🛠️",
    title: "Website Care",
    description:
      "Ongoing maintenance and support to keep your website secure, updated, and performing after launch.",
    features: [
      "Updates & Maintenance",
      "Security Monitoring",
      "Performance Checks",
    ],
  },
];



export default function Services() {

  return (

    <section
      id="services"
      className="bg-[#050816] py-28"
    >

      <Container>


        <SectionTitle
          badge="OUR SERVICES"
          title="Everything You Need"
          highlight="To Grow Online"
          description="
          We create premium websites that combine design,
          technology, and strategy to help businesses build
          credibility and grow online.
          "
        />



        <div
          className="
          mt-20
          grid
          gap-8
          md:grid-cols-2
          xl:grid-cols-4
          "
        >


          {
            services.map((service)=>(


              <div

                key={service.title}

                className="
                rounded-3xl
                border
                border-white/10
                bg-white/5
                p-8
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-blue-500/50
                hover:bg-white/10
                "

              >


                <div className="mb-6 text-5xl">
                  {service.icon}
                </div>



                <h3
                  className="
                  text-2xl
                  font-bold
                  text-white
                  "
                >
                  {service.title}
                </h3>



                <p
                  className="
                  mt-4
                  leading-7
                  text-slate-400
                  "
                >
                  {service.description}
                </p>




                <ul
                  className="
                  mt-6
                  space-y-3
                  text-sm
                  text-slate-300
                  "
                >

                  {
                    service.features.map((feature)=>(

                      <li key={feature}>
                        <span className="mr-2 text-blue-400">
                          ✓
                        </span>

                        {feature}
                      </li>

                    ))
                  }

                </ul>



              </div>


            ))
          }


        </div>


      </Container>


    </section>

  );

}