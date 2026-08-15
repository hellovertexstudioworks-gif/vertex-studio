import { ArrowDownRight } from "lucide-react";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";

const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "We start by understanding where you are, what's holding you back, and what you genuinely want to achieve.",
  },
  {
    number: "02",
    title: "Define",
    description:
      "Together, we turn your thoughts and ambitions into clear goals and a direction that feels right for you.",
  },
  {
    number: "03",
    title: "Develop",
    description:
      "Through focused coaching and practical action, you develop the mindset, confidence, and habits needed to move forward.",
  },
  {
    number: "04",
    title: "Elevate",
    description:
      "You take what you've learned and turn it into lasting progress, creating a stronger and more intentional future.",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="relative overflow-hidden bg-[#f2eee7] py-28 text-[#1b1b19] sm:py-32 lg:py-40"
    >
      <Container>
        {/* Header */}

        <div className="mx-auto max-w-3xl text-center">
          <SectionTitle
            eyebrow="THE PROCESS"
            title="A clear path"
            highlight="from where you are to where you want to be."
            description="Real growth doesn't happen overnight. Our coaching process gives you the clarity, structure, and support to keep moving forward."
          />
        </div>

        {/* Process Steps */}

        <div className="mx-auto mt-20 max-w-6xl border-t border-[#1b1b19]/10">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group grid min-h-[120px] gap-6 border-b border-[#1b1b19]/10 py-8 transition-colors duration-300 sm:grid-cols-[70px_1.15fr_0.85fr_50px] sm:items-center sm:gap-8 lg:min-h-[125px] lg:grid-cols-[100px_1.15fr_0.85fr_60px] lg:gap-12"
            >
              {/* Number */}

              <div>
                <span className="text-[10px] font-semibold tracking-[0.25em] text-[#9a7b4f]">
                  {step.number}
                </span>
              </div>

              {/* Title */}

              <div>
                <h3 className="text-4xl font-medium leading-none tracking-[-0.05em] text-[#1b1b19] transition-transform duration-500 group-hover:translate-x-2 sm:text-5xl lg:text-[46px]">
                  {step.title}
                </h3>
              </div>

              {/* Description */}

              <div>
                <p className="max-w-sm text-[11px] leading-6 text-[#1b1b19]/50 sm:text-xs sm:leading-6 lg:max-w-md">
                  {step.description}
                </p>
              </div>

              {/* Arrow */}

              <div className="hidden justify-end sm:flex">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1b1b19]/15 text-[#1b1b19] transition-all duration-300 group-hover:border-[#9a7b4f] group-hover:bg-[#9a7b4f] group-hover:text-white">
                  <ArrowDownRight
                    size={16}
                    strokeWidth={1.4}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Statement */}

        <div className="mx-auto mt-10 grid max-w-6xl gap-8 border-t border-[#1b1b19]/10 pt-7 sm:grid-cols-2 sm:items-end">
          <p className="text-[9px] font-bold uppercase leading-6 tracking-[0.2em] text-[#9a7b4f]">
            Progress is not about becoming someone else.
            <br />
            It&apos;s about becoming more of yourself.
          </p>

          <p className="max-w-md text-[11px] leading-6 text-[#1b1b19]/45 sm:justify-self-end">
            Every session is designed to help you leave with greater clarity,
            a practical next step, and the confidence to take it.
          </p>
        </div>
      </Container>
    </section>
  );
}