"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Heart,
  Sparkles,
  Clock3,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Experienced Professionals",
    description:
      "Our experienced dental team combines clinical expertise with a gentle, patient-first approach.",
  },
  {
    icon: Heart,
    title: "Patient-Focused Care",
    description:
      "Every treatment plan is personalized around your needs, comfort, goals, and long-term dental health.",
  },
  {
    icon: Sparkles,
    title: "Modern Technology",
    description:
      "We use modern dental technology and techniques to make treatments more comfortable and effective.",
  },
  {
    icon: Clock3,
    title: "Convenient Appointments",
    description:
      "Flexible scheduling and same-day appointment options make quality dental care easier to access.",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      className="bg-white py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-sm font-semibold text-blue-600">
            Why BrightSmile
          </span>

          <h2 className="mt-6 text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl">
            Care that puts
            <span className="block text-blue-600">
              you first.
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            From your first visit to your long-term dental care,
            we focus on creating a comfortable experience and
            results you can feel confident about.
          </p>
        </motion.div>

        {/* Reasons */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">

          {reasons.map((reason, index) => {
            const Icon = reason.icon;

            return (
              <motion.article
                key={reason.title}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -7,
                }}
                className="
                  group
                  rounded-[30px]
                  border
                  border-slate-200
                  bg-slate-50
                  p-7
                  transition-all
                  duration-300
                  hover:border-blue-100
                  hover:bg-white
                  hover:shadow-[0_25px_60px_rgba(15,23,42,0.08)]
                  sm:p-8
                "
              >

                {/* Icon */}
                <div className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-blue-50
                  transition-all
                  duration-300
                  group-hover:scale-105
                  group-hover:bg-blue-600
                ">
                  <Icon
                    size={26}
                    strokeWidth={2}
                    className="
                      text-blue-600
                      transition-colors
                      duration-300
                      group-hover:text-white
                    "
                  />
                </div>

                {/* Number */}
                <p className="
                  mt-7
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-slate-300
                ">
                  0{index + 1}
                </p>

                {/* Title */}
                <h3 className="
                  mt-2
                  text-xl
                  font-black
                  tracking-tight
                  text-slate-900
                ">
                  {reason.title}
                </h3>

                {/* Description */}
                <p className="
                  mt-4
                  text-sm
                  leading-7
                  text-slate-500
                ">
                  {reason.description}
                </p>

                {/* Accent */}
                <div className="
                  mt-7
                  h-1
                  w-8
                  rounded-full
                  bg-blue-600
                  transition-all
                  duration-300
                  group-hover:w-14
                " />

              </motion.article>
            );
          })}

        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.5,
            delay: 0.3,
          }}
          className="mt-12 flex justify-center"
        >
          <Link
            href="#contact"
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-slate-200
              bg-slate-50
              px-6
              py-3
              text-sm
              font-semibold
              text-slate-700
              transition-all
              duration-300
              hover:border-blue-200
              hover:bg-blue-50
              hover:text-blue-600
            "
          >
            Start Your Visit

            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}