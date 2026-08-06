"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";


const navItems = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Pricing", href: "#pricing" },
  { name: "Contact", href: "#contact" },
];


export default function Navbar() {

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#");


  useEffect(() => {

    const handleScroll = () => {

      setScrolled(window.scrollY > 20);


      const sections = document.querySelectorAll<HTMLElement>("section[id]");

      let current = "#";


      sections.forEach((section) => {

        const top = section.offsetTop - 120;
        const bottom = top + section.offsetHeight;


        if (
          window.scrollY >= top &&
          window.scrollY < bottom
        ) {

          current = `#${section.id}`;

        }

      });



      if (window.scrollY < 150) {

        current = "#";

      }


      setActive(current);

    };



    handleScroll();


    window.addEventListener(
      "scroll",
      handleScroll
    );


    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );


  }, []);



  return (

    <header

      className={`
        fixed
        top-0
        left-0
        z-50
        w-full
        transition-all
        duration-300

        ${
          scrolled
            ? "border-b border-white/10 bg-[#050816]/80 backdrop-blur-xl shadow-lg"
            : "bg-transparent"
        }

      `}

    >



      <div

        className="
        mx-auto
        flex
        max-w-7xl
        items-center
        justify-between
        px-6
        py-5
        "

      >



        {/* LOGO */}

        <a

          href="#"

          className="
          group
          flex
          items-center
          gap-3
          "

        >


          <Image

            src="/icon.png"

            alt="Vertex Studio Logo"

            width={55}

            height={55}

            className="
            rounded-xl
            transition
            duration-300
            group-hover:scale-105
            "

          />



          <div>


            <h1

              className="
              text-3xl
              font-bold
              text-white
              transition
              duration-300
              group-hover:text-blue-400
              "

            >

              Vertex Studio

            </h1>



            <p

              className="
              mt-1
              text-[11px]
              uppercase
              tracking-[0.35em]
              text-blue-400
              "

            >

              Web Design & Development

            </p>


          </div>



        </a>





        {/* DESKTOP NAVIGATION */}


        <nav

          className="
          hidden
          items-center
          gap-10
          md:flex
          "

        >


          {navItems.map((item)=>(


            <a

              key={item.name}

              href={item.href}

              className={`

              relative
              text-sm
              font-medium
              transition
              duration-300

              ${
                active === item.href
                ? "text-blue-400"
                : "text-white hover:text-blue-400"
              }

              `}

            >


              {item.name}



              <span

                className={`

                absolute
                -bottom-2
                left-0
                h-[2px]
                bg-blue-500
                transition-all
                duration-300

                ${
                  active === item.href
                  ? "w-full"
                  : "w-0"
                }

                `}

              />


            </a>


          ))}


        </nav>





        {/* DESKTOP BUTTON */}


        <div

          className="
          hidden
          md:block
          "

        >

          <a

            href="#contact"

            className="
            rounded-full
            bg-gradient-to-r
            from-blue-600
            to-cyan-500
            px-7
            py-3
            font-semibold
            text-white
            transition
            duration-300
            hover:-translate-y-1
            hover:shadow-xl
            hover:shadow-blue-500/30
            "

          >

            Start Your Project

          </a>


        </div>





        {/* MOBILE BUTTON */}


        <button

          onClick={() => setMobileOpen(!mobileOpen)}

          className="
          text-white
          md:hidden
          "

        >

          {

            mobileOpen

            ? <X size={28}/>

            : <Menu size={28}/>

          }


        </button>



      </div>





      {/* MOBILE MENU */}


      <div

        className={`

        overflow-hidden
        transition-all
        duration-300
        md:hidden

        ${
          mobileOpen
          ? "max-h-[500px]"
          : "max-h-0"
        }

        `}

      >



        <div

          className="
          border-t
          border-white/10
          bg-[#050816]/95
          backdrop-blur-xl
          "

        >


          <div

            className="
            flex
            flex-col
            px-6
            py-6
            "

          >



            {navItems.map((item)=>(


              <a

                key={item.name}

                href={item.href}

                onClick={() => setMobileOpen(false)}

                className={`

                py-3
                transition

                ${
                  active === item.href
                  ? "text-blue-400"
                  : "text-white hover:text-blue-400"
                }

                `}

              >

                {item.name}


              </a>


            ))}





            <a

              href="#contact"

              onClick={() => setMobileOpen(false)}

              className="
              mt-6
              rounded-full
              bg-gradient-to-r
              from-blue-600
              to-cyan-500
              px-6
              py-3
              text-center
              font-semibold
              text-white
              transition
              hover:shadow-lg
              hover:shadow-blue-500/30
              "

            >

              Start Your Project

            </a>



          </div>


        </div>


      </div>



    </header>


  );

}