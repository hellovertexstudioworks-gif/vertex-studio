"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Award,
  HeartHandshake,
  ArrowUpRight,
} from "lucide-react";

const benefits = [
  "Experienced dental professionals",
  "Modern dental technology",
  "Personalized treatment plans",
  "Comfort-focused patient care",
];

export default function About() {
  return (
    <section
      id="about"
      className="bg-slate-50 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">

          {/* LEFT — IMAGE */}
          <div className="relative">

            {/* Glow */}
            <div className="
              absolute
              -left-10
              -top-10
              h-72
              w-72
              rounded-full
              bg-blue-400/10
              blur-3xl
            " />

            {/* Main Image */}
            <div className="
              group
              relative
              z-10
              overflow-hidden
              rounded-[36px]
              border
              border-white
              bg-white
              p-1.5
              shadow-[0_25px_70px_rgba(15,23,42,0.10)]
            ">
              <Image
                src="/images/about/clinic-team.jpg"
                alt="BrightSmile dental team"
                width={700}
                height={650}
                className="
                  h-[480px]
                  w-full
                  rounded-[30px]
                  object-cover
                  transition-transform
                  duration-700
                  group-hover:scale-105
                  sm:h-[540px]
                "
              />
            </div>

            {/* Experience Card */}
            <div className="
              absolute
              -bottom-7
              -right-3
              z-20
              rounded-[24px]
              border
              border-white/70
              bg-white/95
              p-5
              shadow-[0_20px_50px_rgba(15,23,42,0.14)]
              backdrop-blur-xl
              sm:-right-8
            ">
              <div className="flex items-center gap-4">

                <div className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-blue-50
                ">
                  <Award
                    size={24}
                    className="text-blue-600"
                  />
                </div>

                <div>
                  <p className="
                    text-2xl
                    font-black
                    tracking-tight
                    text-slate-900
                  ">
                    15+
                  </p>

                  <p className="
                    text-xs
                    font-medium
                    text-slate-500
                  ">
                    Years of Excellence
                  </p>
                </div>

              </div>
            </div>

          </div>

          {/* RIGHT — CONTENT */}
          <div>

            {/* Label */}
            <span className="
              inline-flex
              rounded-full
              border
              border-blue-200
              bg-blue-50
              px-5
              py-2
              text-sm
              font-semibold
              text-blue-600
            ">
              About BrightSmile
            </span>

            {/* Heading */}
            <h2 className="
              mt-6
              text-4xl
              font-black
              leading-[1.05]
              tracking-tight
              text-slate-900
              sm:text-5xl
            ">
              Dentistry built around
              <span className="block text-blue-600">
                your confidence.
              </span>
            </h2>

            {/* Main Description */}
            <p className="
              mt-7
              text-lg
              leading-8
              text-slate-600
            ">
              At BrightSmile Dental, we believe exceptional
              dentistry should feel personal, comfortable,
              and modern. Our team combines years of experience
              with advanced technology to deliver care that puts
              your smile and well-being first.
            </p>

            {/* Supporting Description */}
            <p className="
              mt-5
              text-base
              leading-7
              text-slate-500
            ">
              Whether you need routine preventive care, cosmetic
              improvements, or advanced restorative treatment,
              we take the time to understand your goals and
              create a treatment experience designed specifically
              for you.
            </p>

            {/* Benefits */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">

              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2
                    size={20}
                    strokeWidth={2.2}
                    className="mt-0.5 shrink-0 text-blue-600"
                  />

                  <span className="
                    text-sm
                    font-medium
                    leading-6
                    text-slate-700
                  ">
                    {benefit}
                  </span>
                </div>
              ))}

            </div>

            {/* About CTA */}
            <div className="mt-9">

              <Link
                href="#contact"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-slate-900
                  px-6
                  py-3.5
                  text-sm
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-blue-600
                  hover:shadow-lg
                  hover:shadow-blue-600/20
                "
              >
                Meet Our Team

                <ArrowUpRight size={16} />
              </Link>

            </div>

            {/* Supporting Highlight */}
            <div className="
              mt-9
              flex
              items-start
              gap-4
              border-t
              border-slate-200
              pt-7
            ">

              <div className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-blue-50
              ">
                <HeartHandshake
                  size={21}
                  className="text-blue-600"
                />
              </div>

              <div>
                <p className="
                  text-sm
                  font-bold
                  text-slate-900
                ">
                  Care that goes beyond the appointment.
                </p>

                <p className="
                  mt-1
                  text-sm
                  leading-6
                  text-slate-500
                ">
                  Every detail is designed around comfort,
                  trust, and a better patient experience.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}