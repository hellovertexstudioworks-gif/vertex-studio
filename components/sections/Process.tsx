import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";


const steps = [
  {
    number: "01",
    title: "Discovery Call",
    description:
      "We understand your business, goals, audience, and what your website needs to achieve before we begin.",
    icon: "💬",
  },

  {
    number: "02",
    title: "Strategy & Planning",
    description:
      "We create the website structure, user journey, and strategy needed to build a strong online presence.",
    icon: "📋",
  },

  {
    number: "03",
    title: "Design & Development",
    description:
      "We design and build your website with a premium look, responsive experience, and modern technology.",
    icon: "💻",
  },

  {
    number: "04",
    title: "Review & Launch",
    description:
      "We refine the final details, test performance, and prepare your website for a successful launch.",
    icon: "🚀",
  },

  {
    number: "05",
    title: "Growth & Support",
    description:
      "After launch, Vertex Care helps maintain, improve, and support your website as your business grows.",
    icon: "📈",
  },
];


export default function Process() {

  return (

    <section
      id="process"
      className="bg-[#050816] py-28"
    >

      <Container>


        <SectionTitle

          badge="OUR PROCESS"

          title="A Simple Process"

          highlight="Built For Success"

          description="
          From the first conversation to launch and beyond,
          we provide a clear process designed around your
          business goals.
          "

        />




        <div
          className="
          mt-16
          grid
          gap-8
          md:grid-cols-2
          lg:grid-cols-5
          "
        >


          {
            steps.map((step)=>(


              <div

                key={step.number}

                className="
                group
                relative
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
                  items-center
                  justify-between
                  "
                >

                  <span
                    className="
                    text-sm
                    font-bold
                    text-blue-400
                    "
                  >
                    {step.number}
                  </span>


                  <span
                    className="
                    text-3xl
                    transition
                    group-hover:scale-110
                    "
                  >
                    {step.icon}
                  </span>


                </div>




                <h3
                  className="
                  mt-8
                  text-xl
                  font-bold
                  text-white
                  "
                >

                  {step.title}

                </h3>




                <p
                  className="
                  mt-4
                  text-sm
                  leading-7
                  text-slate-400
                  "
                >

                  {step.description}

                </p>



              </div>


            ))
          }


        </div>



      </Container>


    </section>

  );

}