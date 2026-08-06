import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";


const expectations = [
  {
    icon: "💬",
    title: "Clear Communication",
    description:
      "Stay updated throughout the project with clear communication, progress updates, and transparent discussions.",
  },

  {
    icon: "🎯",
    title: "A Website Built Around Your Goals",
    description:
      "Every decision is made around your business objectives, customers, and the results you want to achieve.",
  },

  {
    icon: "✨",
    title: "Attention To Detail",
    description:
      "From design choices to performance improvements, every part of your website is carefully considered.",
  },

  {
    icon: "🤝",
    title: "A Collaborative Experience",
    description:
      "We work together with you throughout the process to ensure the final website represents your vision.",
  },

  {
    icon: "🚀",
    title: "A Smooth Launch",
    description:
      "Before launch, we review, test, and optimize your website to ensure everything works properly.",
  },

  {
    icon: "📈",
    title: "Support Beyond Launch",
    description:
      "With Vertex Care, your website continues receiving maintenance, updates, and improvements.",
  },
];


export default function Expect() {

  return (

    <section
      id="expect"
      className="
      bg-[#050816]
      py-28
      "
    >

      <Container>


        <SectionTitle

          badge="WORKING WITH US"

          title="What You Can"

          highlight="Expect"

          description="
          A professional website experience built around
          communication, quality, and long-term partnership.
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
            expectations.map((item)=>(


              <div

                key={item.title}

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

                  {item.icon}

                </div>




                <h3
                  className="
                  mt-6
                  text-xl
                  font-bold
                  text-white
                  "
                >

                  {item.title}

                </h3>




                <p
                  className="
                  mt-4
                  leading-7
                  text-slate-400
                  "
                >

                  {item.description}

                </p>



              </div>


            ))
          }


        </div>



      </Container>


    </section>

  );

}