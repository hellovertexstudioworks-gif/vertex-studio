import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";


const reasons = [
  {
    title: "Business Growth Focus",
    description:
      "We don't just design websites. We create digital experiences that help businesses build trust, attract customers, and achieve their goals.",
    icon: "🚀",
  },

  {
    title: "Custom Premium Design",
    description:
      "Every project is designed around your brand, audience, and objectives to create a unique online presence.",
    icon: "🎨",
  },

  {
    title: "Transparent Pricing",
    description:
      "Clear packages and flexible options designed to help startups and growing businesses invest confidently.",
    icon: "💼",
  },

  {
    title: "Modern Development",
    description:
      "We build fast, responsive, and scalable websites using modern technologies and development practices.",
    icon: "⚡",
  },

  {
    title: "Performance & SEO Ready",
    description:
      "Your website is built with speed, usability, and search visibility in mind from the beginning.",
    icon: "📈",
  },

  {
    title: "Long-Term Partnership",
    description:
      "Through Vertex Care, we continue supporting your website with updates, improvements, and ongoing maintenance.",
    icon: "🤝",
  },
];


export default function WhyChoose() {

  return (

    <section
      id="whychoose"
      className="bg-[#050816] py-28"
    >

      <Container>


        <SectionTitle

          badge="WHY CHOOSE US"

          title="Why Businesses Choose"

          highlight="Vertex Studio"

          description="
          More than website development. We combine strategy,
          design, technology, and support to help businesses
          grow online.
          "

        />



        <div
          className="
          mt-16
          grid
          gap-8
          md:grid-cols-2
          lg:grid-cols-3
          "
        >


          {
            reasons.map((reason)=>(

              <div

                key={reason.title}

                className="
                group
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



                <div
                  className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-blue-500/10
                  text-3xl
                  transition
                  group-hover:scale-110
                  "
                >

                  {reason.icon}

                </div>




                <h3
                  className="
                  mt-6
                  text-xl
                  font-bold
                  text-white
                  "
                >

                  {reason.title}

                </h3>




                <p
                  className="
                  mt-4
                  leading-7
                  text-slate-400
                  "
                >

                  {reason.description}

                </p>



              </div>

            ))
          }


        </div>



      </Container>


    </section>

  );

}