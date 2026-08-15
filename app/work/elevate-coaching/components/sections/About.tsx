import { ArrowUpRight, Check } from "lucide-react";
import Container from "../ui/Container";

const highlights = [
  "Personalized 1:1 coaching",
  "Practical strategies for real life",
  "Clear goals and meaningful progress",
  "A supportive, judgment-free environment",
];

export default function About() {
  return (
    <section
      id="about"
      className="bg-[#f7f4ef] pt-24 sm:pt-28 lg:pt-32"
    >
      <Container>
        {/* Intro */}

        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-24">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#9a8060]">
              About Elevate
            </span>

            <div className="mt-6 h-px w-12 bg-[#9a8060]" />
          </div>

          <h2 className="max-w-4xl text-4xl font-medium leading-[1] tracking-[-0.045em] text-[#1c1c1a] sm:text-5xl lg:text-6xl xl:text-7xl">
            Real growth begins when you give yourself the space to{" "}
            <span className="font-serif italic text-[#9a8060]">
              move forward.
            </span>
          </h2>
        </div>

        {/* Main Content */}

        <div className="mt-20 grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
          {/* Video */}

          <div className="relative">
            <div className="relative overflow-hidden bg-[#e8ded0]">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="block aspect-[16/10] h-full w-full object-cover"
              >
                <source
                  src="/videos/elevate-coaching.mp4"
                  type="video/mp4"
                />
              </video>

              {/* Subtle Overlay */}

              <div className="pointer-events-none absolute inset-0 bg-black/[0.06]" />

              {/* Soft Bottom Fade */}

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Video Label */}

            <div className="absolute bottom-5 left-5 bg-[#1c1c1a] px-6 py-5 text-white sm:bottom-7 sm:left-7">
              <p className="text-2xl font-semibold tracking-[-0.03em]">
                1:1
              </p>

              <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/45">
                Personalized Coaching
              </p>
            </div>
          </div>

          {/* Content */}

          <div className="flex flex-col justify-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#9a8060]">
              The Elevate Approach
            </span>

            <h3 className="mt-6 max-w-xl text-3xl font-medium leading-[1.08] tracking-[-0.035em] text-[#1c1c1a] sm:text-4xl lg:text-5xl">
              Coaching isn&apos;t about giving you all the answers.
            </h3>

            <p className="mt-7 max-w-xl text-base leading-8 text-[#6f6b63]">
              It&apos;s about creating the space, clarity, and accountability
              you need to discover the answers for yourself. Whether
              you&apos;re navigating a career transition, building
              confidence, or simply feeling ready for something more, Elevate
              gives you a place to step back, reflect, and move forward with
              intention.
            </p>

            {/* Highlights */}

            <div className="mt-10 border-t border-black/10">
              {highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="flex items-center gap-4 border-b border-black/10 py-4"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e8ded0]">
                    <Check
                      size={13}
                      strokeWidth={1.8}
                      className="text-[#8b7355]"
                    />
                  </span>

                  <span className="text-sm text-[#3f3d38]">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}

            <a
              href="#contact"
              className="group mt-9 inline-flex w-fit items-center gap-3 border-b border-[#1c1c1a] pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#1c1c1a] transition-colors hover:border-[#9a8060] hover:text-[#9a8060]"
            >
              Start Your Journey

              <ArrowUpRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>

        {/* Bottom Statement */}

        <div className="mt-20 grid gap-0 border-t border-black/10 sm:grid-cols-3">
          {/* Clarity */}

          <div className="py-8 sm:pr-10">
            <p className="text-3xl font-medium tracking-[-0.03em] text-[#1c1c1a]">
              Clarity
            </p>

            <p className="mt-2 text-xs leading-6 text-[#77736b]">
              Understand what matters and where you want to go.
            </p>
          </div>

          {/* Confidence */}

          <div className="border-t border-black/10 py-8 sm:border-l sm:border-t-0 sm:px-10">
            <p className="text-3xl font-medium tracking-[-0.03em] text-[#1c1c1a]">
              Confidence
            </p>

            <p className="mt-2 text-xs leading-6 text-[#77736b]">
              Trust yourself enough to make meaningful decisions.
            </p>
          </div>

          {/* Progress */}

          <div className="border-t border-black/10 py-8 sm:border-l sm:border-t-0 sm:pl-10">
            <p className="text-3xl font-medium tracking-[-0.03em] text-[#1c1c1a]">
              Progress
            </p>

            <p className="mt-2 text-xs leading-6 text-[#77736b]">
              Turn intention into action and lasting change.
            </p>
          </div>
        </div>
      </Container>

      {/* Warm Charcoal Transition */}

      <div className="mt-0 bg-[#1b1b19]">
        <Container className="py-14 sm:py-16 lg:py-20">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#d7bd91]" />

              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#d7bd91]">
                The Elevate Philosophy
              </span>
            </div>

            <p className="max-w-3xl text-xl font-medium leading-[1.2] tracking-[-0.025em] text-white sm:text-2xl lg:text-3xl">
              Clarity creates direction.
              <span className="text-white/35">
                {" "}
                Confidence creates movement.
              </span>
            </p>
          </div>
        </Container>
      </div>
    </section>
  );
}