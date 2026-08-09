import Navbar from "@/components/layout/Navbar";

export default function NovaHomePage() {
  return (
    <main className="min-h-screen bg-[#f5f1ea] pt-20">
      {/* ORIGINAL VERTEX NAVBAR */}
      <Navbar />

      {/* NOVA HOME PORTFOLIO HEADER */}
      <section className="border-b border-black/10 bg-[#24211d] px-6 py-16 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#d7bd91]">
            Vertex Studio · Selected Work
          </p>

          <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="font-serif text-5xl tracking-[-0.05em] sm:text-6xl lg:text-7xl">
                Nova Home
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
                A refined furniture ecommerce experience built around
                timeless design, thoughtful presentation, and modern
                living.
              </p>
            </div>

            <a
              href="https://nova-home-khaki.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-3 border border-[#d7bd91] bg-[#d7bd91] px-7 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[#24211d] transition hover:bg-[#ead7b5]"
            >
              Visit Live Website
              <span>↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* LIVE NOVA HOME PREVIEW */}
      <section className="bg-[#eae4da] px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-12">
        <div className="mx-auto max-w-[1500px] overflow-hidden border border-black/10 bg-white shadow-2xl">
          <div className="flex h-10 items-center border-b border-black/10 bg-[#f5f1ea] px-4">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-black/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-black/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-black/20" />
            </div>

            <p className="mx-auto mr-0 text-[8px] uppercase tracking-[0.15em] text-black/40 sm:text-[9px]">
              nova-home-khaki.vercel.app
            </p>
          </div>

          <iframe
            src="https://nova-home-khaki.vercel.app"
            title="Nova Home Website Preview"
            className="h-[700px] w-full border-0 lg:h-[850px]"
            loading="lazy"
          />
        </div>
      </section>

      {/* PROJECT INFORMATION */}
      <section className="bg-[#f5f1ea] px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#8b6f4f]">
              Project Overview
            </p>

            <h2 className="mt-5 font-serif text-4xl tracking-[-0.04em] text-[#24211d] sm:text-5xl">
              Designed for modern living.
            </h2>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8b6f4f]">
                Industry
              </p>

              <p className="mt-3 font-serif text-2xl text-[#24211d]">
                Furniture & Ecommerce
              </p>
            </div>

            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8b6f4f]">
                Focus
              </p>

              <p className="mt-3 font-serif text-2xl text-[#24211d]">
                Premium Web Design
              </p>
            </div>

            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8b6f4f]">
                Experience
              </p>

              <p className="mt-3 font-serif text-2xl text-[#24211d]">
                Responsive
              </p>
            </div>

            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8b6f4f]">
                Status
              </p>

              <p className="mt-3 font-serif text-2xl text-[#24211d]">
                Live
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#24211d] px-6 py-20 text-white sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#d7bd91]">
              Explore Nova Home
            </p>

            <h2 className="mt-5 max-w-2xl font-serif text-4xl tracking-[-0.04em] sm:text-5xl">
              Experience the complete website.
            </h2>
          </div>

          <a
            href="https://nova-home-khaki.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-3 border-b border-[#d7bd91] pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#d7bd91] transition hover:text-white"
          >
            Visit Nova Home
            <span>↗</span>
          </a>
        </div>
      </section>
    </main>
  );
}