export default function About() {
  return (
    <section
      id="about"
      className="bg-[#050816] py-32"
    >

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-20 px-8">

        {/* LEFT */}
        <div className="w-full lg:w-1/2">

          <p className="mb-4 text-sm uppercase tracking-[0.4em] text-blue-400">
            ABOUT VERTEX STUDIO
          </p>


          <h2 className="text-5xl font-bold leading-tight text-white">
            We Build Websites
            <br />
            That Help Businesses Grow.
          </h2>


          <p className="mt-8 text-lg leading-8 text-slate-300">
            Vertex Studio specializes in creating modern, high-converting
            websites for startups and growing businesses. Every project is
            designed to build trust, improve visibility, and help businesses
            create a stronger online presence.
          </p>



          <div className="mt-10 grid grid-cols-2 gap-8">


            <div>
              <h3 className="text-4xl font-bold text-blue-500">
                30+
              </h3>

              <p className="mt-2 text-slate-400">
                Website Concepts
              </p>
            </div>



            <div>
              <h3 className="text-4xl font-bold text-blue-500">
                100%
              </h3>

              <p className="mt-2 text-slate-400">
                Client Focused
              </p>
            </div>



            <div>
              <h3 className="text-4xl font-bold text-blue-500">
                Fast
              </h3>

              <p className="mt-2 text-slate-400">
                Delivery Process
              </p>
            </div>



            <div>
              <h3 className="text-4xl font-bold text-blue-500">
                24/7
              </h3>

              <p className="mt-2 text-slate-400">
                Support
              </p>
            </div>


          </div>


        </div>



        {/* RIGHT WEBSITE SHOWCASE */}
        <div
          className="
          hidden
          h-[520px]
          w-[500px]
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-gradient-to-br
          from-blue-500/10
          to-white/5
          p-8
          lg:flex
          flex-col
          justify-center
          "
        >


          <div
            className="
            rounded-2xl
            border
            border-white/10
            bg-[#0B1220]
            p-6
            shadow-2xl
            "
          >


            <div className="flex gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
            </div>



            <div className="mt-8">

              <p className="text-sm uppercase tracking-widest text-blue-400">
                Vertex Studio
              </p>


              <h3 className="mt-4 text-3xl font-bold text-white">
                Premium Websites
                <br />
                Built For Growth
              </h3>


              <p className="mt-4 text-slate-400">
                Modern design, responsive development,
                SEO, and long-term support.
              </p>


              <div className="mt-8 flex gap-3">

                <span className="rounded-full bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
                  Design
                </span>

                <span className="rounded-full bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
                  SEO
                </span>

                <span className="rounded-full bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
                  Growth
                </span>

              </div>


            </div>


          </div>


        </div>


      </div>

    </section>
  );
}