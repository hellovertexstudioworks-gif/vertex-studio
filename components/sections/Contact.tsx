"use client";

import { useState } from "react";


export default function Contact() {

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);



  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();


    setLoading(true);
    setSuccess(false);



    const form = e.currentTarget;


    const formData = new FormData(form);



    const data = {

      name: formData.get("name"),

      email: formData.get("email"),

      business: formData.get("business"),

      websiteType: formData.get("websiteType"),

      message: formData.get("message"),

    };



    try {


      const response = await fetch("/api/contact", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),

      });



      if(response.ok){

        setSuccess(true);

        form.reset();

      }


    } catch(error){

      console.log(error);

    }



    setLoading(false);

  }





  return (

    <section
      id="contact"
      className="
      relative
      overflow-hidden
      bg-[#050816]
      py-24
      "
    >


      {/* Glow */}

      <div
        className="
        absolute
        left-0
        top-20
        h-96
        w-96
        rounded-full
        bg-blue-600/10
        blur-[120px]
        "
      />



      <div
        className="
        relative
        mx-auto
        max-w-[1200px]
        px-8
        "
      >



        {/* HEADER */}

        <div className="text-center">


          <p
            className="
            text-sm
            font-semibold
            uppercase
            tracking-[0.4em]
            text-blue-400
            "
          >
            Contact Us
          </p>



          <h2
            className="
            mt-5
            text-4xl
            font-bold
            text-white
            md:text-5xl
            "
          >
            Ready To Build Your
            <br />
            Next Website?
          </h2>



          <p
            className="
            mx-auto
            mt-6
            max-w-2xl
            text-lg
            leading-8
            text-slate-400
            "
          >
            Tell us about your project and let's discuss how
            Vertex Studio can help your business grow online.
          </p>


        </div>





        {/* CONTENT */}


        <div
          className="
          mt-16
          grid
          gap-12
          lg:grid-cols-2
          "
        >





          {/* LEFT SIDE */}


          <div>


            <h3
              className="
              text-3xl
              font-bold
              text-white
              "
            >
              Let's Talk
            </h3>



            <p
              className="
              mt-6
              max-w-lg
              leading-8
              text-slate-400
              "
            >
              Whether you're starting a new business or
              upgrading an existing website, we'd love to
              hear about your project.
            </p>





            <div className="mt-10 space-y-8">



              <div>

                <p className="text-sm text-blue-400">
                  Email
                </p>

                <a
                  href="mailto:hello.vertexstudioworks@gmail.com"
                  className="mt-2 block text-xl font-semibold text-white hover:text-blue-400"
                >
                  hello.vertexstudioworks@gmail.com
                </a>

              </div>




              <div>

                <p className="text-sm text-blue-400">
                  Website
                </p>

                <a
                  href="https://www.vertexstudioworks.com"
                  target="_blank"
                  className="mt-2 block text-xl font-semibold text-white hover:text-blue-400"
                >
                  www.vertexstudioworks.com
                </a>

              </div>





              <div>

                <p className="text-sm text-blue-400">
                  WhatsApp
                </p>

                <a
                  href="https://wa.me/639676824238"
                  target="_blank"
                  className="mt-2 block text-xl font-semibold text-white hover:text-blue-400"
                >
                  +63 967 682 4238
                </a>

              </div>





              <div>

                <p className="text-sm text-blue-400">
                  Facebook
                </p>


                <a
                  href="https://www.facebook.com/profile.php?id=61592666772209"
                  target="_blank"
                  className="mt-2 block text-xl font-semibold text-white hover:text-blue-400"
                >
                  Vertex Studio
                </a>

              </div>





              <div>

                <p className="text-sm text-blue-400">
                  Availability
                </p>

                <p className="mt-2 text-xl font-semibold text-white">
                  Remote Worldwide
                </p>

              </div>




              <div>

                <p className="mb-4 text-sm text-blue-400">
                  Services
                </p>


                <ul className="space-y-3 text-slate-300">

                  <li>✓ Website Design</li>

                  <li>✓ Website Development</li>

                  <li>✓ SEO Foundation</li>

                  <li>✓ Website Care</li>

                </ul>


              </div>



            </div>


          </div>








          {/* FORM */}



          <div
            className="
            rounded-3xl
            border
            border-white/10
            bg-white/5
            p-8
            backdrop-blur-xl
            "
          >



            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >



              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-[#111827]
                px-5
                py-4
                text-white
                outline-none
                placeholder:text-slate-500
                focus:border-blue-500
                "
              />




              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-[#111827]
                px-5
                py-4
                text-white
                outline-none
                placeholder:text-slate-500
                focus:border-blue-500
                "
              />




              <input
                type="text"
                name="business"
                placeholder="Business Name"
                className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-[#111827]
                px-5
                py-4
                text-white
                outline-none
                placeholder:text-slate-500
                focus:border-blue-500
                "
              />





              <select
                name="websiteType"
                className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-[#111827]
                px-5
                py-4
                text-white
                outline-none
                focus:border-blue-500
                "
              >

                <option>
                  Select Website Type
                </option>

                <option>
                  Business Website
                </option>

                <option>
                  E-Commerce Website
                </option>

                <option>
                  Healthcare Website
                </option>

                <option>
                  Restaurant Website
                </option>

                <option>
                  Custom Website
                </option>

              </select>





              <textarea
                name="message"
                rows={6}
                placeholder="Tell us about your project..."
                required
                className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-[#111827]
                px-5
                py-4
                text-white
                outline-none
                placeholder:text-slate-500
                focus:border-blue-500
                "
              />





              <button
                type="submit"
                disabled={loading}
                className="
                w-full
                rounded-xl
                bg-gradient-to-r
                from-blue-600
                to-cyan-500
                py-4
                font-semibold
                text-white
                transition
                hover:-translate-y-1
                hover:shadow-xl
                hover:shadow-blue-500/30
                "
              >

                {loading ? "Sending..." : "Send Inquiry"}

              </button>




              {success && (

                <p className="text-center text-green-400">

                  Message sent successfully! We will contact you soon.

                </p>

              )}



            </form>


          </div>



        </div>


      </div>


    </section>

  );

}