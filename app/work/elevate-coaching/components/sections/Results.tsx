import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import Container from "../ui/Container";

const results = [
  {
    value: "87%",
    label: "Greater Clarity",
    description:
      "Clients report a stronger understanding of their priorities and next steps.",
  },
  {
    value: "92%",
    label: "More Confidence",
    description:
      "Clients feel more confident making decisions and taking meaningful action.",
  },
  {
    value: "4.9/5",
    label: "Client Experience",
    description:
      "A consistently positive coaching experience built around support and accountability.",
  },
];

const outcomes = [
  "A clearer sense of direction",
  "Greater confidence in your decisions",
  "Practical goals you can actually act on",
  "Stronger habits and accountability",
];

export default function Results() {
  return (
    <section
      id="results"
      className="relative overflow-hidden bg-[#1b1b19] py-28 text-[#f2eee7] sm:py-32 lg:py-40"
    >
      <Container>
        {/* Header */}

        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#b08b5b]">
            The Results
          </p>

          <h2 className="mt-8 text-5xl font-medium leading-[0.95] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
            Growth you can
            <br />
            <span className="font-serif italic text-white">
              actually feel.
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-white/45 sm:text-base sm:leading-8">
            The goal isn&apos;t simply to talk about change. It&apos;s to
            create meaningful progress that shows up in the way you think,
            decide, and move through life.
          </p>
        </div>

        {/* Statistics */}

        <div className="mx-auto mt-20 max-w-6xl border-y border-white/10">
          <div className="grid md:grid-cols-3">
            {results.map((result, index) => (
              <div
                key={result.label}
                className={`relative px-7 py-12 sm:px-10 sm:py-14 lg:px-12 lg:py-16 ${
                  index !== results.length - 1
                    ? "border-b border-white/10 md:border-b-0 md:border-r"
                    : ""
                }`}
              >
                {/* Number */}

                <p className="font-serif text-5xl leading-none tracking-[-0.04em] text-[#d7bd91] sm:text-6xl lg:text-7xl">
                  {result.value}
                </p>

                {/* Label */}

                <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                  {result.label}
                </p>

                {/* Description */}

                <p className="mt-4 max-w-xs text-xs leading-6 text-white/40 sm:text-sm sm:leading-7">
                  {result.description}
                </p>

                {/* Accent */}

                <div className="absolute bottom-0 left-0 h-[2px] w-8 bg-[#d7bd91]" />
              </div>
            ))}
          </div>
        </div>

        {/* What Changes */}

        <div className="mx-auto mt-24 max-w-6xl border-t border-white/10 pt-14 lg:mt-28">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            {/* Left */}

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#d7bd91]">
                What Changes
              </p>

              <h3 className="mt-6 max-w-md text-4xl font-medium leading-[1.02] tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
                Your progress becomes the priority.
              </h3>

              <p className="mt-7 max-w-md text-sm leading-7 text-white/40 sm:text-base sm:leading-8">
                Coaching gives you a dedicated space to step back from the
                noise, understand what matters, and take deliberate action.
              </p>

              <a
                href="#contact"
                className="group mt-9 inline-flex items-center gap-3 border-b border-white/20 pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:border-[#d7bd91] hover:text-[#d7bd91]"
              >
                Start Your Journey

                <ArrowUpRight
                  size={16}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </a>
            </div>

            {/* Right */}

            <div className="border-t border-white/10">
              {outcomes.map((outcome, index) => (
                <div
                  key={outcome}
                  className="group flex items-center gap-5 border-b border-white/10 py-6 sm:py-7"
                >
                  {/* Number */}

                  <span className="w-6 shrink-0 text-[9px] font-semibold tracking-[0.18em] text-white/20">
                    0{index + 1}
                  </span>

                  {/* Outcome */}

                  <div className="flex items-center gap-4">
                    <CheckCircle2
                      size={18}
                      strokeWidth={1.3}
                      className="shrink-0 text-[#d7bd91] transition-transform duration-300 group-hover:scale-110"
                    />

                    <span className="text-sm text-white/65 transition-colors duration-300 group-hover:text-white sm:text-base">
                      {outcome}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Statement */}

        <div className="mx-auto mt-20 max-w-6xl border border-white/10 bg-white/[0.02] p-8 sm:p-10 lg:mt-24 lg:p-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25">
                The Elevate Approach
              </p>

              <p className="mt-4 max-w-2xl text-xl font-medium leading-8 tracking-[-0.02em] text-white/75 sm:text-2xl">
                Small, intentional steps can create a completely different
                direction.
              </p>
            </div>

            <a
              href="#contact"
              className="group inline-flex shrink-0 items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#d7bd91] transition-colors duration-300 hover:text-white"
            >
              Talk About Your Goals

              <ArrowUpRight
                size={17}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}