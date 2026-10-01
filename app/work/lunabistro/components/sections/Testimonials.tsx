// TASK: Replace app/work/lunabistro/components/sections/Testimonials.tsx with this file.
// This version adds a real online black-paper texture behind the testimonial section.

"use client";

import { useEffect, useState } from "react";

const testimonials = [
  {
    quote:
      "From the atmosphere to the final course, everything felt incredibly thoughtful. Luna Bistro turned an ordinary evening into something we genuinely wanted to remember.",
    name: "Sophia & James",
    detail: "Anniversary Dinner · New York",
  },
  {
    quote:
      "Beautiful atmosphere, excellent service, and every dish felt carefully considered. A wonderful place for a special evening.",
    name: "Olivia R.",
    detail: "Dinner Guest",
  },
  {
    quote:
      "Luna has that rare balance between sophisticated and welcoming. We never felt rushed, and the food was exceptional.",
    name: "Daniel M.",
    detail: "Returning Guest",
  },
  {
    quote:
      "The kind of restaurant you immediately want to recommend to someone. Elegant without ever feeling pretentious.",
    name: "Emma L.",
    detail: "Weekend Guest",
  },
];

const textureUrl =
  "https://www.gdtours.com.tw/uploads/photos/shares/TMN062026A/TMN062026A_bg01.jpg";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  const changeTestimonial = (index: number) => {
    if (index === activeIndex) return;

    setIsChanging(true);

    window.setTimeout(() => {
      setActiveIndex(index);
      setIsChanging(false);
    }, 220);
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIsChanging(true);

      window.setTimeout(() => {
        setActiveIndex((current) => (current + 1) % testimonials.length);
        setIsChanging(false);
      }, 220);
    }, 7000);

    return () => window.clearInterval(timer);
  }, []);

  const active = testimonials[activeIndex];

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#171410] text-[#F4EFE6]"
    >
      {/* =====================================================
          ONLINE TEXTURE BACKGROUND
          Source: black paper texture image found online.
          Keep opacity low so the content remains premium/readable.
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.12]"
        style={{ backgroundImage: `url("${textureUrl}")` }}
      />

      {/* Dark veil keeps the texture subtle and protects readability. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(201,161,90,0.10),transparent_34%),linear-gradient(180deg,rgba(23,20,16,0.72)_0%,rgba(23,20,16,0.94)_42%,rgba(23,20,16,0.98)_100%)]"
      />

      {/* Very subtle editorial light sweep. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 h-[520px] w-[520px] rounded-full bg-[#C9A15A]/[0.045] blur-[120px]"
      />

      <div className="relative">
        {/* =====================================================
            EDITORIAL INTRO
        ===================================================== */}

        <div className="relative px-6 pb-16 pt-24 sm:px-10 sm:pb-20 sm:pt-28 lg:px-14 lg:pb-24 lg:pt-36 xl:px-16">
          <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[1fr_0.5fr] lg:items-end">
            <div>
              <div className="mb-7 flex items-center gap-4">
                <span className="h-px w-12 bg-[#C9A15A]" />

                <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#E0BF7A]">
                  Guest Notes
                </p>
              </div>

              <h2 className="font-serif text-[clamp(3.6rem,6.5vw,7rem)] leading-[0.88] tracking-[-0.055em]">
                What stays
                <br />
                <span className="italic text-[#E0BF7A]">with you.</span>
              </h2>
            </div>

            <div className="max-w-md lg:pb-2">
              <p className="text-sm leading-7 text-white/45 sm:text-base sm:leading-8">
                The best part of an evening at Luna is often the feeling that
                remains after the final course.
              </p>

              <div className="mt-5 flex items-center gap-3">
                <span className="h-px w-8 bg-[#C9A15A]/70" />

                <span className="text-[8px] font-bold uppercase tracking-[0.28em] text-white/25">
                  Words from the table
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            FEATURED TESTIMONIAL
        ===================================================== */}

        <div className="px-6 sm:px-10 lg:px-14 xl:px-16">
          <div className="mx-auto max-w-[1440px]">
            <div className="relative grid overflow-hidden border-y border-white/10 lg:grid-cols-[0.27fr_1fr_0.27fr]">
              {/* Thin editorial curve / light line. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-[18%] top-[-120px] h-[330px] w-[330px] rounded-full border border-[#E0BF7A]/10"
              />

              {/* LEFT EDITORIAL RAIL */}

              <div className="hidden border-r border-white/10 lg:flex lg:flex-col lg:justify-between lg:p-8">
                <div>
                  <p className="text-[8px] font-bold uppercase tracking-[0.28em] text-white/25">
                    A quiet note
                  </p>

                  <div className="mt-8 h-24 w-px bg-gradient-to-b from-[#E0BF7A] via-[#E0BF7A]/30 to-transparent" />
                </div>

                <p className="max-w-[150px] font-serif text-lg italic leading-6 text-white/45">
                  Good evenings have a way of staying with us.
                </p>
              </div>

              {/* QUOTE */}

              <div className="relative px-6 py-16 text-center sm:px-10 sm:py-20 lg:px-14 lg:py-24">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 font-serif text-[11rem] leading-none text-[#C9A15A]/[0.065] sm:text-[15rem]"
                >
                  “
                </span>

                <div className="relative mx-auto max-w-4xl">
                  <p className="text-[8px] font-bold uppercase tracking-[0.32em] text-[#E0BF7A]">
                    From the table
                  </p>

                  <blockquote
                    key={active.name}
                    className={`mt-8 font-serif text-[clamp(2rem,3.8vw,4rem)] leading-[1.1] tracking-[-0.035em] transition-all duration-300 ${
                      isChanging
                        ? "translate-y-2 opacity-0"
                        : "translate-y-0 opacity-100"
                    }`}
                  >
                    “{active.quote}”
                  </blockquote>

                  <div className="mx-auto mt-10 flex items-center justify-center gap-4">
                    <span className="h-px w-10 bg-white/15" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C9A15A]" />
                    <span className="h-px w-10 bg-white/15" />
                  </div>

                  <div
                    className={`mt-6 transition-all duration-300 ${
                      isChanging
                        ? "translate-y-2 opacity-0"
                        : "translate-y-0 opacity-100"
                    }`}
                  >
                    <p className="font-serif text-xl text-[#F4EFE6]">
                      {active.name}
                    </p>

                    <p className="mt-2 text-[8px] font-bold uppercase tracking-[0.24em] text-white/30">
                      {active.detail}
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT GUEST LIST */}

              <div className="border-t border-white/10 p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-8">
                <p className="text-[8px] font-bold uppercase tracking-[0.28em] text-white/25">
                  Guest voices
                </p>

                <div className="mt-7 space-y-1">
                  {testimonials.map((testimonial, index) => {
                    const selected = index === activeIndex;

                    return (
                      <button
                        key={testimonial.name}
                        type="button"
                        onClick={() => changeTestimonial(index)}
                        className="group flex w-full items-center justify-between gap-4 border-b border-white/10 py-5 text-left"
                        aria-label={`Read testimonial from ${testimonial.name}`}
                        aria-pressed={selected}
                      >
                        <div>
                          <p
                            className={`font-serif text-lg transition-colors duration-300 ${
                              selected
                                ? "text-[#F4EFE6]"
                                : "text-white/35 group-hover:text-white/65"
                            }`}
                          >
                            {testimonial.name}
                          </p>

                          <p className="mt-1 text-[7px] font-bold uppercase tracking-[0.2em] text-white/20">
                            {testimonial.detail}
                          </p>
                        </div>

                        <span
                          className={`h-px transition-all duration-500 ${
                            selected
                              ? "w-10 bg-[#E0BF7A]"
                              : "w-4 bg-white/15 group-hover:w-7"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                <p className="mt-7 text-[8px] font-bold uppercase tracking-[0.22em] text-white/20">
                  Select a guest to read their note
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            CLOSING CTA
        ===================================================== */}

        <div className="px-6 pb-24 pt-12 sm:px-10 sm:pb-28 sm:pt-14 lg:px-14 lg:pb-36 lg:pt-16 xl:px-16">
          <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-7 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
            <div>
              <p className="font-serif text-2xl italic text-white/75">
                Come create your own Luna moment.
              </p>

              <p className="mt-2 text-[8px] font-bold uppercase tracking-[0.24em] text-white/25">
                Your evening starts here
              </p>
            </div>

            <a
              href="#reservation"
              className="group inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#E0BF7A] transition-colors duration-300 hover:text-white"
            >
              <span className="border-b border-[#E0BF7A]/40 pb-2 transition-colors duration-300 group-hover:border-white/40">
                Reserve Your Table
              </span>

              <span className="text-base transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
