"use client";

import { ArrowUpRight, CheckCircle2, Mail, Phone } from "lucide-react";
import Container from "../ui/Container";

const benefits = [
  "A private conversation about your goals",
  "Clarity around the right coaching approach",
  "No pressure or obligation to continue",
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#1b1b19] text-[#f2eee7]"
    >
      {/* Background Detail */}

      <div className="pointer-events-none absolute -right-48 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full border border-[#d7bd91]/[0.05]" />

      <div className="pointer-events-none absolute -right-24 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full border border-[#d7bd91]/[0.05]" />

      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-[#d7bd91]/[0.025] blur-[120px]" />

      <Container className="py-24 sm:py-28 lg:py-32 xl:py-36">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-24">
          {/* LEFT */}

          <div className="flex flex-col">
            {/* Eyebrow */}

            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#d7bd91]" />

              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#d7bd91]">
                Start Your Journey
              </span>
            </div>

            {/* Heading */}

            <h2 className="mt-7 max-w-xl text-5xl font-medium leading-[0.92] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl xl:text-[80px]">
              Ready to
              <br />
              <span className="font-serif italic text-[#d7bd91]">
                move forward?
              </span>
            </h2>

            {/* Description */}

            <p className="mt-8 max-w-lg text-sm leading-7 text-white/45 sm:text-base sm:leading-8">
              You don&apos;t have to figure everything out alone. Tell us
              where you are, where you want to go, and we&apos;ll explore
              whether coaching is the right next step for you.
            </p>

            {/* Benefits */}

            <div className="mt-10 space-y-4">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2
                    size={17}
                    strokeWidth={1.4}
                    className="shrink-0 text-[#d7bd91]"
                  />

                  <span className="text-sm text-white/60">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            {/* Direct Contact */}

            <div className="mt-12 border-t border-white/10 pt-8">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/25">
                Prefer to reach out directly?
              </p>

              <div className="mt-5 space-y-4">
                <a
                  href="mailto:hello@elevatecoaching.com"
                  className="group flex w-fit items-center gap-3 text-sm text-white/55 transition-colors duration-300 hover:text-white"
                >
                  <Mail
                    size={17}
                    strokeWidth={1.4}
                    className="text-[#d7bd91]"
                  />

                  <span>hello@elevatecoaching.com</span>

                  <ArrowUpRight
                    size={14}
                    strokeWidth={1.5}
                    className="opacity-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100"
                  />
                </a>

                <a
                  href="tel:+639001234567"
                  className="group flex w-fit items-center gap-3 text-sm text-white/55 transition-colors duration-300 hover:text-white"
                >
                  <Phone
                    size={17}
                    strokeWidth={1.4}
                    className="text-[#d7bd91]"
                  />

                  <span>+63 900 123 4567</span>

                  <ArrowUpRight
                    size={14}
                    strokeWidth={1.5}
                    className="opacity-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT — FORM */}

          <div className="relative border border-white/10 bg-white/[0.025] p-7 sm:p-10 lg:p-12">
            {/* Form Header */}

            <div className="flex items-start justify-between gap-6 border-b border-white/10 pb-7">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#d7bd91]">
                  Discovery Call
                </p>

                <h3 className="mt-3 text-2xl font-medium tracking-[-0.03em] text-white sm:text-3xl">
                  Let&apos;s start a conversation.
                </h3>

                <p className="mt-3 max-w-md text-sm leading-6 text-white/35">
                  Tell us a little about where you are and what you&apos;d
                  like to work on.
                </p>
              </div>

              <span className="pt-1 text-[9px] font-semibold tracking-[0.15em] text-white/20">
                01 / 01
              </span>
            </div>

            {/* Form */}

            <form className="mt-9 space-y-7">
              {/* Name */}

              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-[9px] font-bold uppercase tracking-[0.16em] text-white/30"
                >
                  Your Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Smith"
                  className="w-full border-b border-white/15 bg-transparent px-0 py-3 text-sm text-white outline-none placeholder:text-white/20 transition-colors duration-300 focus:border-[#d7bd91]"
                />
              </div>

              {/* Email */}

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-[9px] font-bold uppercase tracking-[0.16em] text-white/30"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  className="w-full border-b border-white/15 bg-transparent px-0 py-3 text-sm text-white outline-none placeholder:text-white/20 transition-colors duration-300 focus:border-[#d7bd91]"
                />
              </div>

              {/* Coaching Area */}

              <div>
                <label
                  htmlFor="coaching"
                  className="mb-2 block text-[9px] font-bold uppercase tracking-[0.16em] text-white/30"
                >
                  What Would You Like Help With?
                </label>

                <select
                  id="coaching"
                  name="coaching"
                  defaultValue=""
                  className="w-full border-b border-white/15 bg-transparent px-0 py-3 text-sm text-white/60 outline-none transition-colors duration-300 focus:border-[#d7bd91]"
                >
                  <option
                    value=""
                    disabled
                    className="bg-[#1b1b19]"
                  >
                    Select an area
                  </option>

                  <option
                    value="personal-growth"
                    className="bg-[#1b1b19]"
                  >
                    Personal Growth
                  </option>

                  <option
                    value="career"
                    className="bg-[#1b1b19]"
                  >
                    Career Coaching
                  </option>

                  <option
                    value="executive"
                    className="bg-[#1b1b19]"
                  >
                    Executive Coaching
                  </option>

                  <option
                    value="other"
                    className="bg-[#1b1b19]"
                  >
                    Something Else
                  </option>
                </select>
              </div>

              {/* Message */}

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-[9px] font-bold uppercase tracking-[0.16em] text-white/30"
                >
                  Tell Us A Little More
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="What would you like to work on?"
                  className="w-full resize-none border-b border-white/15 bg-transparent px-0 py-3 text-sm text-white outline-none placeholder:text-white/20 transition-colors duration-300 focus:border-[#d7bd91]"
                />
              </div>

              {/* Submit */}

              <button
                type="submit"
                className="group flex w-full items-center justify-between bg-[#e8ded0] px-6 py-4 text-[10px] font-bold uppercase tracking-[0.16em] text-[#1b1b19] transition-all duration-300 hover:bg-[#f4f0e9]"
              >
                <span>Request a Discovery Call</span>

                <ArrowUpRight
                  size={17}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </button>

              <p className="text-center text-[10px] leading-5 text-white/20">
                Your information is kept private and will only be used to
                respond to your inquiry.
              </p>
            </form>

            {/* Form Accent */}

            <div className="absolute bottom-0 left-0 h-[2px] w-20 bg-[#d7bd91]" />
          </div>
        </div>

        {/* Bottom Philosophy */}

        <div className="mt-20 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#d7bd91]">
              Take the first step
            </p>

            <p className="max-w-2xl text-sm leading-7 text-white/30 sm:text-right">
              You don&apos;t need to know exactly where you&apos;re going.
              You just need to be ready to start moving.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}