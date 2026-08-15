import {
  ArrowUpRight,
  Compass,
  Crown,
  Sparkles,
} from "lucide-react";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";

const programs = [
  {
    number: "01",
    title: "Personal Growth",
    description:
      "Build greater self-awareness, confidence, and clarity so you can move through life with intention.",
    icon: Sparkles,
    features: [
      "Clarity & self-awareness",
      "Confidence building",
      "Goal setting",
    ],
  },
  {
    number: "02",
    title: "Career Coaching",
    description:
      "Gain direction in your career, make confident decisions, and create a path that aligns with your ambitions.",
    icon: Compass,
    features: [
      "Career direction",
      "Decision making",
      "Professional growth",
    ],
  },
  {
    number: "03",
    title: "Executive Coaching",
    description:
      "Strengthen leadership, communication, and decision-making skills to become a more effective leader.",
    icon: Crown,
    features: [
      "Leadership development",
      "Communication",
      "Strategic thinking",
    ],
  },
];

export default function Programs() {
  return (
    <section
      id="programs"
      className="bg-[#f4f0e9] text-[#1b1b19]"
    >
      <Container className="py-24 sm:py-28 lg:py-32">
        {/* Section Header */}

        <div className="mx-auto max-w-3xl text-center">
          <SectionTitle
            eyebrow="COACHING PROGRAMS"
            title="Choose the space"
            highlight="where you want to grow."
            description="Every coaching journey is different. Choose the area that matters most to you right now, and we'll build from there."
          />
        </div>

        {/* Programs */}

        <div className="mx-auto mt-16 grid max-w-6xl gap-5 lg:grid-cols-3">
          {programs.map((program) => {
            const Icon = program.icon;

            return (
              <article
                key={program.number}
                className="group relative flex min-h-[470px] flex-col overflow-hidden border border-[#1b1b19]/10 bg-[#e9e3d9] p-8 transition-all duration-500 hover:-translate-y-1 hover:bg-[#e5ded2] sm:p-9 lg:p-10"
              >
                {/* Top */}

                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-semibold tracking-[0.25em] text-[#1b1b19]/35">
                    {program.number}
                  </span>

                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#1b1b19]/15 text-[#8b6f45] transition-all duration-500 group-hover:border-[#8b6f45]/50 group-hover:bg-[#8b6f45]/10">
                    <Icon
                      size={18}
                      strokeWidth={1.4}
                    />
                  </div>
                </div>

                {/* Program Content */}

                <div className="mt-12">
                  <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#8b6f45]">
                    One-to-One Coaching
                  </p>

                  {/* Title */}

                  <div className="mt-5 min-h-[68px]">
                    <h3 className="max-w-[260px] text-3xl font-medium leading-[1.02] tracking-[-0.045em] text-[#1b1b19]">
                      {program.title}
                    </h3>
                  </div>

                  {/* Description */}

                  <div className="mt-2 min-h-[84px]">
                    <p className="max-w-sm text-[13px] leading-6 text-[#1b1b19]/50">
                      {program.description}
                    </p>
                  </div>
                </div>

                {/* Focus Areas */}

                <div className="mt-auto">
                  <div className="border-t border-[#1b1b19]/10 pt-6">
                    <p className="mb-4 text-[9px] font-bold uppercase tracking-[0.2em] text-[#1b1b19]/35">
                      Focus Areas
                    </p>

                    <div className="space-y-2.5">
                      {program.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-3 text-[13px] text-[#1b1b19]/60"
                        >
                          <span className="h-1 w-1 shrink-0 rounded-full bg-[#9a7b4f]" />

                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}

                  <a
                    href="#contact"
                    className="group/link mt-7 inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#1b1b19] transition-colors duration-300 hover:text-[#8b6f45]"
                  >
                    Explore Program

                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.5}
                      className="transition-transform duration-300 group-hover/link:-translate-y-1 group-hover/link:translate-x-1"
                    />
                  </a>
                </div>

                {/* Hover Accent */}

                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#8b6f45] transition-all duration-500 group-hover:w-full" />
              </article>
            );
          })}
        </div>

        {/* Bottom Note */}

        <div className="mx-auto mt-8 flex max-w-6xl flex-col justify-between gap-5 border-t border-[#1b1b19]/10 pt-6 sm:flex-row sm:items-center">
          <p className="max-w-xl text-[11px] leading-6 text-[#1b1b19]/45">
            Not sure which program is right for you? Start with a discovery
            conversation and we&apos;ll figure out the right path together.
          </p>

          <a
            href="#contact"
            className="group inline-flex shrink-0 items-center gap-3 text-[9px] font-bold uppercase tracking-[0.18em] text-[#1b1b19] transition-colors duration-300 hover:text-[#8b6f45]"
          >
            Find Your Path

            <ArrowUpRight
              size={14}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </a>
        </div>
      </Container>
    </section>
  );
}