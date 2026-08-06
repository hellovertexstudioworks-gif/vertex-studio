export default function HeroGraphic() {
  return (
    <div className="relative hidden w-[420px] md:block">

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-2xl">

        {/* Browser Header */}
        <div className="mb-6 flex gap-2">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-yellow-400" />
          <span className="h-3 w-3 rounded-full bg-green-400" />
        </div>


        {/* Main Card */}
        <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 p-8">

          <p className="text-xs uppercase tracking-[0.3em] text-white/80">
            Premium Website
          </p>


          <h2 className="mt-5 text-4xl font-bold text-white">
            Your Brand.
            <br />
            Online.
          </h2>


          <button className="mt-8 rounded-full bg-white px-6 py-3 font-semibold text-black">
            Get Started
          </button>

        </div>



        {/* Features */}
        <div className="mt-6 grid grid-cols-2 gap-4">

          <div className="rounded-xl border border-white/10 p-4 text-sm text-white">
            SEO Ready
          </div>


          <div className="rounded-xl border border-white/10 p-4 text-sm text-white">
            Fast Performance
          </div>

        </div>


      </div>

    </div>
  );
}