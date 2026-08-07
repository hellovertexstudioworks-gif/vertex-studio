export default function Hero() {
  return (
    <section
      className="
      relative
      min-h-screen
      overflow-hidden
      bg-[#050816]
      "
    >

      {/* BACKGROUND GLOW */}

      <div
        className="
        absolute
        -left-32
        top-20
        h-96
        w-96
        rounded-full
        bg-blue-600/20
        blur-[120px]
        "
      />

      <div
        className="
        absolute
        right-0
        bottom-0
        h-[500px]
        w-[500px]
        rounded-full
        bg-cyan-500/10
        blur-[150px]
        "
      />



      <div
        className="
        relative
        mx-auto
        flex
        min-h-screen
        max-w-[1400px]
        items-center
        justify-between
        gap-16
        px-8
        pt-24
        "
      >



        {/* LEFT SIDE */}

        <div className="max-w-2xl">


          <p
            className="
            mb-6
            text-sm
            font-semibold
            uppercase
            tracking-[0.4em]
            text-blue-400
            "
          >
            Custom Website Design & Development
          </p>




          <h1
            className="
            text-6xl
            font-extrabold
            leading-[1.05]
            text-white
            md:text-7xl
            lg:text-8xl
            "
          >

            We Build.

            <br />

            We Grow.

            <br />

            <span className="text-blue-500">
              Together.
            </span>

          </h1>




          <p
            className="
            mt-8
            max-w-xl
            text-lg
            leading-8
            text-slate-300
            "
          >
            Helping startups, entrepreneurs, and growing
            businesses build premium websites that establish
            credibility, attract customers, and grow with
            confidence.
          </p>





          {/* BUTTONS */}

          <div
            className="
            mt-10
            flex
            flex-wrap
            gap-5
            "
          >

           <a
href="https://calendly.com/hello-vertexstudioworks/30min"
target="_blank"
rel="noopener noreferrer"
className="
rounded-full
bg-gradient-to-r
from-blue-600
to-cyan-500
px-8
py-4
font-semibold
text-white
transition
hover:-translate-y-1
hover:shadow-xl
hover:shadow-blue-500/30
inline-block
"
>
Book a Free Discovery Call
</a>  



            <button
              className="
              rounded-full
              border
              border-white/20
              px-8
              py-4
              font-semibold
              text-white
              transition
              hover:bg-white
              hover:text-black
              "
            >
              View Portfolio
            </button>


          </div>







          {/* TRUST + EMAIL */}

          <div
            className="
            mt-10
            flex
            flex-wrap
            gap-8
            text-sm
            text-slate-400
            "
          >

            <span>
              ✓ Founder-Led Support
            </span>


            <span>
              ✓ Startup-Friendly Pricing
            </span>


            <span>
              ✓ 3 Months Guidance
            </span>



            <a
              href="mailto:hello.vertexstudioworks@gmail.com"
              className="
              text-blue-400
              transition
              hover:text-cyan-400
              "
            >
              ✉ hello.vertexstudioworks@gmail.com
            </a>


          </div>


        </div>








        {/* RIGHT WEBSITE MOCKUP */}

        <div
          className="
          hidden
          w-[520px]
          rounded-3xl
          border
          border-white/10
          bg-white/5
          p-6
          shadow-2xl
          shadow-blue-500/10
          backdrop-blur-xl
          lg:block
          "
        >



          <div
            className="
            flex
            items-center
            gap-2
            border-b
            border-white/10
            pb-4
            "
          >

            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />

          </div>




          <div
            className="
            mt-6
            rounded-2xl
            bg-gradient-to-br
            from-blue-600
            to-cyan-400
            p-8
            "
          >

            <p
              className="
              text-xs
              uppercase
              tracking-[0.3em]
              text-white/80
              "
            >
              Premium Website
            </p>



            <h2
              className="
              mt-8
              text-4xl
              font-bold
              text-white
              "
            >
              Your Brand.
              <br />
              Online.
            </h2>



            <button
              className="
              mt-8
              rounded-full
              bg-white
              px-6
              py-3
              font-semibold
              text-black
              "
            >
              Get Started
            </button>


          </div>





          <div
            className="
            mt-5
            grid
            grid-cols-2
            gap-4
            "
          >

            <div
              className="
              rounded-xl
              border
              border-white/10
              bg-white/5
              p-4
              text-white
              "
            >
              SEO Ready
            </div>


            <div
              className="
              rounded-xl
              border
              border-white/10
              bg-white/5
              p-4
              text-white
              "
            >
              Fast Performance
            </div>


          </div>



        </div>



      </div>


    </section>
  );
}