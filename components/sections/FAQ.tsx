import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";


const faqs = [
  {
    question: "How long does it take to build a website?",
    answer:
      "Most websites are completed within 2 to 6 weeks depending on the project size, features, content, and feedback process.",
  },

  {
    question: "Do you provide hosting and domain services?",
    answer:
      "Yes. We can assist with domain setup, hosting recommendations, and the technical requirements needed to launch your website successfully.",
  },

  {
    question: "Can you redesign my existing website?",
    answer:
      "Absolutely. Our Website Improvement Service helps businesses redesign outdated websites, improve speed, optimize SEO, and create a better user experience.",
  },

  {
    question: "Do I need technical knowledge to manage my website?",
    answer:
      "No. We provide training after launch and guidance so you can confidently manage your website.",
  },

  {
    question: "What happens after my website launches?",
    answer:
      "Your website journey does not end after launch. We offer Vertex Care plans for maintenance, security updates, performance improvements, and ongoing support.",
  },

  {
    question: "Do you work with businesses outside your location?",
    answer:
      "Yes. Vertex Studio works remotely with startups and businesses worldwide.",
  },

  {
    question: "What payment options are available?",
    answer:
      "We offer flexible payment options including milestone-based payments depending on the project scope.",
  },

  {
    question: "Can you build custom features?",
    answer:
      "Yes. Enterprise projects can include custom functionality, booking systems, e-commerce features, integrations, and other advanced requirements.",
  },
];



export default function FAQ() {

  return (

    <section
      id="faq"
      className="
      bg-[#050816]
      py-28
      "
    >

      <Container>


        <SectionTitle

          badge="FAQ"

          title="Frequently Asked"

          highlight="Questions"

          description="
          Everything you need to know before starting
          your website project with Vertex Studio.
          "

        />




        <div
          className="
          mx-auto
          mt-16
          max-w-4xl
          space-y-5
          "
        >


          {
            faqs.map((faq)=>(

              <div

                key={faq.question}

                className="
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-8
                transition
                hover:border-blue-500/40
                "

              >


                <h3
                  className="
                  text-xl
                  font-bold
                  text-white
                  "
                >

                  {faq.question}

                </h3>



                <p
                  className="
                  mt-4
                  leading-7
                  text-slate-400
                  "
                >

                  {faq.answer}

                </p>


              </div>


            ))
          }


        </div>



      </Container>


    </section>

  );

}