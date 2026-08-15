import { ArrowUpRight, Quote, Star } from "lucide-react";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";

const testimonials = [
  {
    quote:
      "I came into coaching feeling stuck and overwhelmed. Within a few sessions, I had a clearer direction and the confidence to finally make the changes I had been avoiding.",
    name: "Sarah Mitchell",
    role: "Career Coaching Client",
  },
  {
    quote:
      "The biggest difference was having someone challenge my thinking while still giving me the space to figure things out for myself.",
    name: "Michael Carter",
    role: "Executive Coaching Client",
  },
  {
    quote:
      "Elevate gave me the structure and accountability I needed. I stopped waiting for the perfect moment and started taking action.",
    name: "Amanda Lee",
    role: "Personal Growth Client",
  },
];

function Stars({ size = 14 }: { size?: number }) {
  return (
    <div className="flex gap-1 text-[#9a7b4f]">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={size}
          fill="currentColor"
          strokeWidth={0}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="bg-[#f4f0e9] text-[#1b1b19]"
    >
      <Container className="py-24 sm:py-28 lg:py-32">
        {/* Section Header */}

        <div className="mx-auto max-w-3xl text-center">
          <SectionTitle
            eyebrow="CLIENT EXPERIENCES"
            title="What changes when"
            highlight="you choose to grow."
            description="The most meaningful measure of coaching is what happens after the conversation ends."
          />
        </div>

        {/* Featured Testimonial */}

        <div className="mx-auto mt-20 max-w-6xl">
          <div className="relative overflow-hidden border border-[#1b1b19]/10 bg-[#e8ded0]">
            {/* Decorative Quote */}

            <div className="pointer-events-none absolute -right-8 -top-20 select-none font-serif text-[260px] leading-none text-[#1b1b19]/[0.035]">
              &ldquo;
            </div>

            {/* Featured Content */}

            <div className="relative p-8 sm:p-12 lg:p-16 xl:p-20">
              {/* Top Row */}

              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="mb-4 text-[9px] font-bold uppercase tracking-[0.24em] text-[#9a7b4f]">
                    Featured Experience
                  </p>

                  <Stars />
                </div>

                <div className="hidden h-12 w-12 items-center justify-center border border-[#1b1b19]/10 sm:flex">
                  <Quote
                    size={22}
                    strokeWidth={1}
                    className="text-[#9a7b4f]"
                  />
                </div>
              </div>

              {/* Quote */}

              <blockquote className="mt-9 max-w-5xl text-2xl font-medium leading-[1.28] tracking-[-0.035em] text-[#1b1b19] sm:text-3xl lg:text-5xl xl:text-[52px]">
                &ldquo;{testimonials[0].quote}&rdquo;
              </blockquote>

              {/* Author */}

              <div className="mt-12 flex items-end justify-between gap-6 border-t border-[#1b1b19]/10 pt-6">
                <div>
                  <p className="text-sm font-bold text-[#1b1b19]">
                    {testimonials[0].name}
                  </p>

                  <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#1b1b19]/45">
                    {testimonials[0].role}
                  </p>
                </div>

                <span className="hidden text-[9px] font-bold uppercase tracking-[0.2em] text-[#1b1b19]/25 sm:block">
                  Client Story / 01
                </span>
              </div>
            </div>

            {/* Bottom Accent */}

            <div className="absolute bottom-0 left-0 h-[2px] w-20 bg-[#9a7b4f]" />
          </div>
        </div>

        {/* Supporting Testimonials */}

        <div className="mx-auto mt-5 grid max-w-6xl gap-5 md:grid-cols-2">
          {testimonials.slice(1).map((testimonial, index) => (
            <article
              key={testimonial.name}
              className="group relative flex min-h-[360px] flex-col border border-[#1b1b19]/10 bg-[#f0ebe3] p-8 transition-all duration-500 hover:-translate-y-1 hover:bg-[#ebe4da] sm:p-10 lg:p-12"
            >
              {/* Top */}

              <div className="flex items-start justify-between">
                <Stars size={13} />

                <span className="text-[9px] font-bold tracking-[0.2em] text-[#1b1b19]/25">
                  0{index + 2}
                </span>
              </div>

              {/* Quote */}

              <blockquote className="mt-8 max-w-xl text-lg font-medium leading-8 tracking-[-0.015em] text-[#1b1b19]/75 sm:text-xl">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Author */}

              <div className="mt-auto flex items-end justify-between gap-6 border-t border-[#1b1b19]/10 pt-6">
                <div>
                  <p className="text-sm font-bold text-[#1b1b19]">
                    {testimonial.name}
                  </p>

                  <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#1b1b19]/40">
                    {testimonial.role}
                  </p>
                </div>

                <Quote
                  size={20}
                  strokeWidth={1}
                  className="text-[#9a7b4f]/60 transition-transform duration-300 group-hover:translate-x-1"
                />
              </div>

              {/* Hover Accent */}

              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#9a7b4f] transition-all duration-500 group-hover:w-full" />
            </article>
          ))}
        </div>

        {/* Bottom CTA */}

        <div className="mx-auto mt-16 flex max-w-6xl flex-col gap-6 border-t border-[#1b1b19]/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#9a7b4f]">
              Your Story Starts Here
            </p>

            <p className="mt-3 max-w-xl text-sm leading-7 text-[#1b1b19]/45">
              Your experience will be unique to you. The first step is
              simply starting the conversation.
            </p>
          </div>

          <a
            href="#contact"
            className="group inline-flex shrink-0 items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#1b1b19] transition-colors duration-300 hover:text-[#9a7b4f]"
          >
            Start Your Journey

            <ArrowUpRight
              size={16}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </a>
        </div>
      </Container>
    </section>
  );
}