export default function Testimonials() {
  return (
    <section className="bg-[#050816] py-32">
      <div className="mx-auto max-w-7xl px-8">

        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.4em] text-blue-400">
            CLIENT FEEDBACK
          </p>

          <h2 className="text-5xl font-bold text-white">
            Trusted By Growing Businesses
          </h2>

          <p className="mt-6 text-lg text-slate-400">
            We build websites that help businesses make a strong first impression
            and support their long-term growth.
          </p>
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <p className="leading-8 text-slate-300">
              "Vertex Studio transformed our online presence.
              The website looks modern and has helped us attract more inquiries."
            </p>

            <div className="mt-8">
              <h3 className="font-bold text-white">
                Sarah Johnson
              </h3>

              <p className="text-slate-400">
                Restaurant Owner
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <p className="leading-8 text-slate-300">
              "Professional communication, fast delivery,
              and a website we're proud to share with customers."
            </p>

            <div className="mt-8">
              <h3 className="font-bold text-white">
                Michael Lee
              </h3>

              <p className="text-slate-400">
                Construction Business
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <p className="leading-8 text-slate-300">
              "The entire process was smooth.
              Our new website feels premium and performs great on mobile."
            </p>

            <div className="mt-8">
              <h3 className="font-bold text-white">
                Emily Carter
              </h3>

              <p className="text-slate-400">
                Dental Clinic
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}