import Image from "next/image";
import {
  ArrowRight,
  Check,
  Compass,
  Hammer,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

const highlights = [
  {
    icon: Compass,
    title: "Thoughtful Planning",
    description:
      "Every project starts with understanding the scope, priorities, and goals.",
  },
  {
    icon: Hammer,
    title: "Quality Execution",
    description:
      "Construction is approached with attention to the details that make a finished project work.",
  },
  {
    icon: MessageSquare,
    title: "Clear Communication",
    description:
      "Straightforward communication keeps everyone aligned from planning through completion.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="overflow-hidden bg-[#101314]"
    >
      <div className="mx-auto grid max-w-7xl lg:grid-cols-[1.05fr_0.95fr]">

        {/* =====================================================
            LEFT — STRETCHED IMAGE AREA
        ===================================================== */}

        <div className="relative min-h-[680px] sm:min-h-[760px] lg:min-h-[900px]">

          {/* Main Construction Image */}

          <Image
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2000&q=90"
            alt="Construction professionals working on a building project"
            fill
            sizes="(max-width: 1024px) 100vw, 52vw"
            className="object-cover"
          />

          {/* Image Overlay */}

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

          <div className="absolute inset-0 bg-black/10" />

          {/* =================================================
              MAIN IMAGE LABEL
          ================================================= */}

          <div className="absolute bottom-10 left-7 border border-white/15 bg-black/65 px-6 py-4 backdrop-blur-md sm:left-10">

            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-orange-500">
              Built With Purpose
            </p>

            <p className="mt-1 text-sm font-semibold text-white">
              Quality in every detail.
            </p>

          </div>

          {/* =================================================
              FINISHED PROJECT IMAGE
          ================================================= */}

          <div className="absolute bottom-10 right-6 z-10 w-[42%] max-w-[320px] sm:right-8">

            <div className="relative aspect-[4/3] overflow-hidden border-[5px] border-[#101314] bg-[#101314] shadow-[0_30px_70px_rgba(0,0,0,0.55)]">

              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=90"
                alt="Finished modern interior construction project"
                fill
                sizes="(max-width: 640px) 50vw, 320px"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />

              {/* Finished Image Overlay */}

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

              {/* Finished Image Label */}

              <div className="absolute bottom-4 left-4 right-4">

                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-orange-400">
                  Finished Project
                </p>

                <p className="mt-1 text-xs font-semibold text-white">
                  Built to the final detail.
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* =====================================================
            RIGHT — ABOUT CONTENT
        ===================================================== */}

        <div className="flex items-center bg-[#101314] px-6 py-20 sm:px-10 sm:py-24 lg:px-14 lg:py-20">

          <div className="w-full max-w-xl">

            {/* =================================================
                EYEBROW
            ================================================= */}

            <div className="mb-6 flex items-center gap-3">

              <span className="h-px w-10 bg-orange-500" />

              <span className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">
                About ForgeBuild
              </span>

            </div>

            {/* =================================================
                HEADING
            ================================================= */}

            <h2 className="text-4xl font-black uppercase leading-[0.95] tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl">

              From the First
              <br />

              Plan to the{" "}

              <span className="text-orange-500">
                Final Detail.
              </span>

            </h2>

            {/* =================================================
                INTRO
            ================================================= */}

            <p className="mt-7 text-base leading-8 text-white/65 sm:text-lg">
              ForgeBuild is built around a simple idea: a construction
              project should feel organized, transparent, and purposeful
              from beginning to end.
            </p>

            <p className="mt-5 text-sm leading-7 text-white/45 sm:text-base">
              Whether it is a new build, commercial project, renovation,
              or remodel, our approach focuses on understanding the work,
              communicating clearly, and delivering a finished space that
              reflects the original vision.
            </p>

            {/* =================================================
                APPROACH
            ================================================= */}

            <div className="mt-8 space-y-6 border-y border-white/10 py-8">

              {highlights.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group flex gap-4"
                  >

                    {/* Icon */}

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-orange-500/30 bg-orange-500/10 transition-all duration-300 group-hover:border-orange-500 group-hover:bg-orange-500">

                      <Icon
                        size={21}
                        strokeWidth={1.8}
                        className="text-orange-500 transition-colors duration-300 group-hover:text-white"
                      />

                    </div>

                    {/* Content */}

                    <div>

                      <h3 className="text-sm font-black uppercase tracking-tight text-white">
                        {item.title}
                      </h3>

                      <p className="mt-1.5 text-sm leading-6 text-white/45">
                        {item.description}
                      </p>

                    </div>

                  </div>
                );
              })}

            </div>

            {/* =================================================
                KEY POINTS
            ================================================= */}

            <div className="grid gap-5 sm:grid-cols-2">

              <div className="flex items-start gap-3">

                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center border border-orange-500/40 bg-orange-500/10">

                  <Check
                    size={15}
                    strokeWidth={3}
                    className="text-orange-500"
                  />

                </div>

                <div>

                  <h3 className="text-xs font-black uppercase tracking-wide text-white">
                    Residential & Commercial
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-white/45">
                    Flexible solutions for different project types and
                    scopes.
                  </p>

                </div>

              </div>

              <div className="flex items-start gap-3">

                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center border border-orange-500/40 bg-orange-500/10">

                  <Check
                    size={15}
                    strokeWidth={3}
                    className="text-orange-500"
                  />

                </div>

                <div>

                  <h3 className="text-xs font-black uppercase tracking-wide text-white">
                    Project-Focused Approach
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-white/45">
                    Practical planning and attention to the details that
                    shape the final result.
                  </p>

                </div>

              </div>

            </div>

            {/* =================================================
                CTA
            ================================================= */}

            <Link
              href="#contact"
              className="group mt-8 inline-flex items-center gap-3 border-b border-orange-500 pb-2 text-sm font-black uppercase tracking-wide text-white transition-colors duration-300 hover:text-orange-500"
            >
              Start a Conversation

              <ArrowRight
                size={18}
                className="text-orange-500 transition-transform duration-300 group-hover:translate-x-1"
              />

            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}