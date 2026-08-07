import Link from "next/link";


const footerLinks = [
  {
    title: "Company",
    links: [
      { name: "About", href: "#about" },
      { name: "Services", href: "#services" },
      { name: "Portfolio", href: "#portfolio" },
      { name: "Pricing", href: "#pricing" },
    ],
  },

  {
    title: "Services",
    links: [
      { name: "Website Design", href: "#services" },
      { name: "Web Development", href: "#services" },
      { name: "SEO & Growth", href: "#services" },
      { name: "Website Care", href: "#services" },
    ],
  },
];



export default function Footer() {

  return (

    <footer
      className="
      border-t
      border-white/10
      bg-[#030712]
      "
    >


      <div
        className="
        mx-auto
        max-w-[1400px]
        px-8
        py-16
        "
      >



        <div
          className="
          grid
          gap-12
          md:grid-cols-2
          lg:grid-cols-4
          "
        >



          {/* BRAND */}

          <div>


            <h2
              className="
              text-3xl
              font-bold
              text-white
              "
            >

              Vertex
              <span className="text-blue-500">
                Studio
              </span>

            </h2>



            <p
              className="
              mt-2
              text-xs
              uppercase
              tracking-[0.35em]
              text-blue-400
              "
            >
              Web Design & Development
            </p>



            <p
              className="
              mt-6
              max-w-sm
              leading-7
              text-slate-400
              "
            >
              Premium websites for startups,
              entrepreneurs, and growing businesses.
              Built with strategy, modern design,
              and long-term support.
            </p>



          </div>





          {/* LINKS */}

          {footerLinks.map((section)=>(

            <div key={section.title}>


              <h3
                className="
                mb-5
                font-semibold
                text-white
                "
              >
                {section.title}
              </h3>



              <ul className="space-y-3">


                {section.links.map((link)=>(

                  <li key={link.name}>


                    <Link
                      href={link.href}
                      className="
                      text-slate-400
                      transition
                      hover:text-blue-400
                      "
                    >

                      {link.name}

                    </Link>


                  </li>

                ))}


              </ul>


            </div>

          ))}







          {/* CONTACT */}

          <div>


            <h3
              className="
              mb-5
              font-semibold
              text-white
              "
            >
              Contact
            </h3>



            <div
              className="
              space-y-4
              text-slate-400
              "
            >



              <a
                href="mailto:hello.vertexstudioworks@gmail.com"
                className="
                block
                hover:text-blue-400
                transition
                "
              >

                ✉ hello.vertexstudioworks@gmail.com

              </a>




              <a
                href="https://www.vertexstudioworks.com"
                target="_blank"
                className="
                block
                hover:text-blue-400
                transition
                "
              >

                🌐 www.vertexstudioworks.com

              </a>





              <a
                href="https://api.whatsapp.com/send?phone=639676824238&text=Hi%20Vertex%20Studio!"
                target="_blank"
                className="
                block
                hover:text-blue-400
                transition
                "
              >

                💬 +63 967 682 4238

              </a>





              <a
                href="https://www.facebook.com/profile.php?id=61592666772209"
                target="_blank"
                className="
                block
                hover:text-blue-400
                transition
                "
              >

                📘 Facebook

              </a>



            </div>


          </div>




        </div>






        {/* CTA */}

        <div
          className="
          mt-14
          rounded-3xl
          border
          border-blue-500/20
          bg-blue-500/5
          p-8
          text-center
          "
        >


          <h3
            className="
            text-2xl
            font-bold
            text-white
            "
          >

            Ready To Build Your Website?

          </h3>


          <p
            className="
            mt-3
            text-slate-400
            "
          >

            Start your project with Vertex Studio today.

          </p>



          <Link
            href="#contact"
            className="
            mt-6
            inline-block
            rounded-full
            bg-gradient-to-r
            from-blue-600
            to-cyan-500
            px-8
            py-3
            font-semibold
            text-white
            transition
            hover:-translate-y-1
            "
          >

            Start Your Project

          </Link>


        </div>






        {/* BOTTOM */}

        <div
          className="
          mt-14
          border-t
          border-white/10
          pt-8
          flex
          flex-col
          gap-4
          text-sm
          text-slate-500
          md:flex-row
          md:items-center
          md:justify-between
          "
        >


          <p>
            © {new Date().getFullYear()} Vertex Studio. All rights reserved.
          </p>



          <p>
            Premium Websites Built For Growth.
          </p>


        </div>



      </div>


    </footer>

  );

}