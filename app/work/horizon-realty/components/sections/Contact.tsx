// TASK: Replace the ENTIRE contents of your current Contact.tsx with this file.
// LOCATION: app/work/horizon-realty/components/sections/Contact.tsx
//
// NOTE: This version is frontend-functional with validation + success state.
// CRM/email delivery can be connected later without redesigning the section.

"use client";

import {
  ArrowRight,
  Check,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

export default function Contact() {
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const section = document.getElementById("contact");

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submitting) return;

    setSubmitting(true);

    window.setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 850);
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#111719] py-24 sm:py-32 lg:py-36"
    >
      {/* =====================================================
          LIVING LOCATION BACKGROUND
      ===================================================== */}

      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Radar rings */}

        <div className="absolute -right-72 -top-56 h-[42rem] w-[42rem] rounded-full border border-[#4FA7A1]/10 sm:-right-64 sm:h-[52rem] sm:w-[52rem]" />

        <div className="absolute -right-56 -top-40 h-[36rem] w-[36rem] rounded-full border border-dashed border-[#4FA7A1]/[0.07] sm:-right-48 sm:h-[45rem] sm:w-[45rem]" />

        <div className="absolute -right-40 -top-24 h-[30rem] w-[30rem] rounded-full border border-[#4FA7A1]/[0.055] sm:-right-32 sm:h-[38rem] sm:w-[38rem]" />

        <div className="absolute -left-72 bottom-[-22rem] h-[48rem] w-[48rem] rounded-full border border-white/[0.035]" />

        {/* Moving map routes */}

        <svg
          viewBox="0 0 1200 850"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <path
            d="M-100 650 C120 470 240 560 410 430 S700 220 900 330 S1120 530 1320 390"
            fill="none"
            stroke="#4FA7A1"
            strokeOpacity="0.13"
            strokeWidth="1"
            strokeDasharray="5 15"
          />

          <path
            d="M-80 180 C160 300 270 180 430 150 S720 110 900 220 S1100 160 1300 80"
            fill="none"
            stroke="#4FA7A1"
            strokeOpacity="0.08"
            strokeWidth="1"
            strokeDasharray="4 16"
          />

          <path
            d="M40 820 C220 680 330 520 500 550 S760 700 930 560 S1100 430 1280 500"
            fill="none"
            stroke="#4FA7A1"
            strokeOpacity="0.07"
            strokeWidth="1"
            strokeDasharray="4 17"
          />

          {/* Moving location dots */}

          <circle r="4.5" fill="#72BDB7" opacity="0.85">
            <animateMotion
              dur="9s"
              repeatCount="indefinite"
              path="M-100 650 C120 470 240 560 410 430 S700 220 900 330 S1120 530 1320 390"
            />
          </circle>

          <circle r="3" fill="#4FA7A1" opacity="0.65">
            <animateMotion
              dur="12s"
              begin="-4s"
              repeatCount="indefinite"
              path="M-100 650 C120 470 240 560 410 430 S700 220 900 330 S1120 530 1320 390"
            />
          </circle>

          <circle r="3.5" fill="#4FA7A1" opacity="0.7">
            <animateMotion
              dur="11s"
              begin="-6s"
              repeatCount="indefinite"
              path="M-80 180 C160 300 270 180 430 150 S720 110 900 220 S1100 160 1300 80"
            />
          </circle>

          <circle r="3" fill="#72BDB7" opacity="0.6">
            <animateMotion
              dur="14s"
              begin="-7s"
              repeatCount="indefinite"
              path="M40 820 C220 680 330 520 500 550 S760 700 930 560 S1100 430 1280 500"
            />
          </circle>

          {/* Pulsing location markers */}

          <g>
            <circle cx="790" cy="360" r="4" fill="#4FA7A1" opacity="0.75" />

            <circle
              cx="790"
              cy="360"
              r="14"
              fill="none"
              stroke="#4FA7A1"
              strokeOpacity="0.22"
            >
              <animate
                attributeName="r"
                values="10;22;10"
                dur="3.5s"
                repeatCount="indefinite"
              />

              <animate
                attributeName="stroke-opacity"
                values="0.12;0.32;0.12"
                dur="3.5s"
                repeatCount="indefinite"
              />
            </circle>
          </g>

          <g>
            <circle cx="1010" cy="590" r="3.5" fill="#72BDB7" opacity="0.7" />

            <circle
              cx="1010"
              cy="590"
              r="12"
              fill="none"
              stroke="#4FA7A1"
              strokeOpacity="0.15"
            >
              <animate
                attributeName="r"
                values="8;19;8"
                dur="4.2s"
                repeatCount="indefinite"
              />
            </circle>
          </g>

          {/* Tiny ambient dots */}

          <circle cx="580" cy="240" r="2.5" fill="#4FA7A1" opacity="0.5">
            <animate
              attributeName="opacity"
              values="0.2;0.7;0.2"
              dur="3.2s"
              repeatCount="indefinite"
            />
          </circle>

          <circle cx="930" cy="180" r="2" fill="#72BDB7" opacity="0.45">
            <animate
              attributeName="opacity"
              values="0.15;0.65;0.15"
              dur="4s"
              repeatCount="indefinite"
            />
          </circle>

          <circle cx="680" cy="700" r="2.5" fill="#4FA7A1" opacity="0.45">
            <animate
              attributeName="opacity"
              values="0.15;0.6;0.15"
              dur="4.6s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>

        {/* Soft atmospheric glows */}

        <div className="absolute right-[12%] top-[22%] h-40 w-40 rounded-full bg-[#1F5C5B]/10 blur-3xl" />

        <div className="absolute left-[12%] bottom-[12%] h-48 w-48 rounded-full bg-[#4FA7A1]/[0.04] blur-3xl" />
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* =================================================
            INTRO
        ================================================= */}

        <div
          className={`max-w-4xl transition-all duration-1000 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <div className="mb-6 flex items-center gap-3 sm:mb-7 sm:gap-4">
            <span className="h-px w-8 bg-[#4FA7A1] sm:w-10" />

            <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#4FA7A1] sm:text-[10px] sm:tracking-[0.3em]">
              Start A Conversation
            </p>
          </div>

          <h2 className="font-serif text-[3rem] leading-[0.9] tracking-[-0.05em] text-[#F2F3EF] sm:text-6xl lg:text-8xl">
            Ready to find
            <br />
            <span className="italic text-[#4FA7A1]">
              your next place?
            </span>
          </h2>

          <p className="mt-7 max-w-2xl text-[13px] leading-6 text-white/55 sm:mt-8 sm:text-base sm:leading-8">
            Tell us what you're looking for and one of our property advisors
            will help you take the next step with confidence.
          </p>
        </div>

        {/* =================================================
            CONTACT GRID
        ================================================= */}

        <div className="mt-12 grid gap-10 border-t border-white/10 pt-10 sm:mt-16 sm:pt-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          {/* =================================================
              CONTACT DETAILS
          ================================================= */}

          <div
            className={`transition-all delay-150 duration-1000 ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-white/35 sm:text-[9px]">
              Horizon Realty
            </p>

            <div className="mt-7 space-y-6 sm:mt-8 sm:space-y-7">
              {/* EMAIL */}

              <a
                href="mailto:hello@horizonrealty.com"
                className="group block"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-[#4FA7A1] transition-all duration-500 group-hover:border-[#4FA7A1]/40 group-hover:bg-[#4FA7A1]/10">
                    <Mail size={14} strokeWidth={1.5} />
                  </span>

                  <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#4FA7A1]">
                    Email
                  </p>
                </div>

                <p className="mt-3 font-serif text-lg text-[#F2F3EF] transition-colors duration-300 group-hover:text-[#4FA7A1] sm:text-xl">
                  hello@horizonrealty.com
                </p>
              </a>

              {/* PHONE */}

              <a
                href="tel:+13055550186"
                className="group block"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-[#4FA7A1] transition-all duration-500 group-hover:border-[#4FA7A1]/40 group-hover:bg-[#4FA7A1]/10">
                    <Phone size={14} strokeWidth={1.5} />
                  </span>

                  <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#4FA7A1]">
                    Phone
                  </p>
                </div>

                <p className="mt-3 font-serif text-lg text-[#F2F3EF] transition-colors duration-300 group-hover:text-[#4FA7A1] sm:text-xl">
                  +1 (305) 555-0186
                </p>
              </a>

              {/* OFFICE */}

              <div>
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-[#4FA7A1]">
                    <MapPin size={14} strokeWidth={1.5} />
                  </span>

                  <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#4FA7A1]">
                    Office
                  </p>
                </div>

                <p className="mt-3 max-w-xs font-serif text-lg leading-relaxed text-[#F2F3EF] sm:text-xl">
                  1200 Brickell Avenue
                  <br />
                  Miami, Florida 33131
                </p>
              </div>
            </div>

            {/* SMALL STATEMENT */}

            <div className="mt-10 border-t border-white/10 pt-7 sm:mt-12">
              <p className="font-serif text-xl italic text-white/65 sm:text-2xl">
                Let's find somewhere
                <br />
                worth coming home to.
              </p>

              <div className="mt-7 flex items-center gap-3">
                <span className="h-px w-8 bg-[#4FA7A1]" />

                <span className="text-[7px] font-bold uppercase tracking-[0.22em] text-white/30">
                  Thoughtful property guidance
                </span>
              </div>
            </div>
          </div>

          {/* =================================================
              FORM
          ================================================= */}

          <div
            className={`relative overflow-hidden border border-white/10 bg-[#172022] p-5 transition-all delay-300 duration-1000 sm:p-8 lg:p-10 ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {/* Form technical grid */}

            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              aria-hidden="true"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(79,167,161,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(79,167,161,0.055) 1px, transparent 1px)",
                backgroundSize: "34px 34px",
              }}
            />

            <div className="relative">
              {!submitted ? (
                <>
                  <div className="mb-7 sm:mb-8">
                    <div className="flex items-center justify-between gap-5">
                      <p className="text-[8px] font-bold uppercase tracking-[0.24em] text-[#4FA7A1] sm:text-[9px]">
                        Property Inquiry
                      </p>

                      <span className="flex items-center gap-2 text-[7px] font-bold uppercase tracking-[0.18em] text-white/25">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#4FA7A1] animate-pulse" />
                        Online
                      </span>
                    </div>

                    <h3 className="mt-3 font-serif text-2xl text-[#F2F3EF] sm:text-3xl">
                      Tell us what you're looking for.
                    </h3>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-5 sm:space-y-6"
                  >
                    {/* NAME + EMAIL */}

                    <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/40"
                        >
                          Full Name
                        </label>

                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          placeholder="Your name"
                          className="mt-2 h-11 w-full border-b border-white/15 bg-transparent px-0 text-sm text-[#F2F3EF] outline-none placeholder:text-white/25 transition-colors duration-300 focus:border-[#4FA7A1] sm:mt-3 sm:h-12"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/40"
                        >
                          Email Address
                        </label>

                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="you@example.com"
                          className="mt-2 h-11 w-full border-b border-white/15 bg-transparent px-0 text-sm text-[#F2F3EF] outline-none placeholder:text-white/25 transition-colors duration-300 focus:border-[#4FA7A1] sm:mt-3 sm:h-12"
                        />
                      </div>
                    </div>

                    {/* PHONE + INTEREST */}

                    <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                      <div>
                        <label
                          htmlFor="phone"
                          className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/40"
                        >
                          Phone
                        </label>

                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+1 (000) 000-0000"
                          className="mt-2 h-11 w-full border-b border-white/15 bg-transparent px-0 text-sm text-[#F2F3EF] outline-none placeholder:text-white/25 transition-colors duration-300 focus:border-[#4FA7A1] sm:mt-3 sm:h-12"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="interest"
                          className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/40"
                        >
                          I'm Interested In
                        </label>

                        <select
                          id="interest"
                          name="interest"
                          defaultValue=""
                          required
                          className="mt-2 h-11 w-full border-b border-white/15 bg-transparent px-0 text-sm text-[#F2F3EF] outline-none transition-colors duration-300 focus:border-[#4FA7A1] sm:mt-3 sm:h-12"
                        >
                          <option
                            value=""
                            disabled
                            className="bg-[#172022]"
                          >
                            Select an option
                          </option>

                          <option
                            value="buying"
                            className="bg-[#172022]"
                          >
                            Buying a Property
                          </option>

                          <option
                            value="selling"
                            className="bg-[#172022]"
                          >
                            Selling a Property
                          </option>

                          <option
                            value="investment"
                            className="bg-[#172022]"
                          >
                            Property Investment
                          </option>

                          <option
                            value="advisory"
                            className="bg-[#172022]"
                          >
                            Property Advisory
                          </option>
                        </select>
                      </div>
                    </div>

                    {/* MESSAGE */}

                    <div>
                      <label
                        htmlFor="message"
                        className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/40"
                      >
                        Message
                      </label>

                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        placeholder="Tell us a little about what you're looking for..."
                        className="mt-2 w-full resize-none border-b border-white/15 bg-transparent px-0 py-3 text-sm leading-7 text-[#F2F3EF] outline-none placeholder:text-white/25 transition-colors duration-300 focus:border-[#4FA7A1] sm:mt-3"
                      />
                    </div>

                    {/* SUBMIT */}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="group relative mt-2 flex h-14 w-full items-center justify-center gap-4 overflow-hidden bg-[#4FA7A1] text-[9px] font-bold uppercase tracking-[0.22em] text-[#111719] transition-all duration-300 hover:bg-[#72BDB8] disabled:cursor-wait disabled:opacity-80"
                    >
                      <span
                        className={`absolute inset-y-0 left-0 bg-white/10 transition-all duration-700 ${
                          submitting ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />

                      <span className="relative flex items-center gap-3">
                        {submitting ? (
                          <>
                            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#111719]/25 border-t-[#111719]" />
                            Sending Inquiry
                          </>
                        ) : (
                          <>
                            <Send size={14} strokeWidth={1.8} />
                            Send Inquiry
                            <ArrowRight
                              size={15}
                              strokeWidth={1.8}
                              className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                          </>
                        )}
                      </span>
                    </button>
                  </form>
                </>
              ) : (
                /* =================================================
                   SUCCESS STATE
                ================================================= */

                <div className="flex min-h-[430px] flex-col items-center justify-center px-3 py-12 text-center sm:min-h-[500px]">
                  <div className="relative flex h-20 w-20 items-center justify-center">
                    <span className="absolute inset-0 rounded-full border border-[#4FA7A1]/20" />

                    <span className="absolute inset-2 rounded-full border border-dashed border-[#4FA7A1]/20" />

                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4FA7A1] text-[#111719]">
                      <Check size={22} strokeWidth={2} />
                    </span>
                  </div>

                  <p className="mt-8 text-[8px] font-bold uppercase tracking-[0.25em] text-[#4FA7A1]">
                    Inquiry Received
                  </p>

                  <h3 className="mt-3 font-serif text-3xl text-[#F2F3EF] sm:text-4xl">
                    Thank you.
                  </h3>

                  <p className="mt-4 max-w-md text-sm leading-7 text-white/50">
                    Your inquiry has been prepared successfully. A Horizon
                    property advisor can follow up with you about your next
                    move.
                  </p>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-8 inline-flex items-center gap-3 border-b border-[#4FA7A1]/40 pb-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[#4FA7A1] transition-colors hover:border-[#4FA7A1] hover:text-[#72BDB8]"
                  >
                    Send Another Inquiry
                    <ArrowRight size={14} strokeWidth={1.7} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* =================================================
            BOTTOM DETAIL
        ================================================= */}

        <div
          className={`mt-10 flex flex-col gap-5 border-t border-white/10 pt-6 transition-all delay-500 duration-1000 sm:mt-14 sm:flex-row sm:items-center sm:justify-between sm:pt-7 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#4FA7A1]" />

            <span className="text-[7px] font-bold uppercase tracking-[0.22em] text-white/30 sm:text-[8px]">
              Thoughtful guidance · Every step
            </span>
          </div>

          <a
            href="#home"
            className="group inline-flex items-center gap-3 self-start text-[8px] font-bold uppercase tracking-[0.2em] text-white/55 transition-colors hover:text-[#4FA7A1] sm:self-auto"
          >
            Back To Top

            <ArrowRight
              size={13}
              strokeWidth={1.7}
              className="-rotate-90 transition-transform duration-300 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>

      {/* Bottom reveal line */}

      <div
        className={`pointer-events-none absolute bottom-0 left-0 h-px bg-[#4FA7A1]/30 transition-all duration-[1600ms] ${
          visible ? "w-full" : "w-0"
        }`}
      />
    </section>
  );
}
