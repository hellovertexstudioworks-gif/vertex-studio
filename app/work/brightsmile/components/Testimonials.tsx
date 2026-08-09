"use client";

import { Quote, Star, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "BrightSmile Patient",
    text: "The entire experience was amazing. The team was welcoming, professional, and made me feel completely comfortable throughout my treatment.",
    rating: 5,
  },
  {
    name: "James Anderson",
    role: "BrightSmile Patient",
    text: "I've never felt more comfortable at a dental clinic. Everything was explained clearly and the results exceeded my expectations.",
    rating: 5,
  },
  {
    name: "Emily Carter",
    role: "BrightSmile Patient",
    text: "BrightSmile combines excellent care with modern technology. The staff genuinely cares about their patients and it shows.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-24 sm:py-28">
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
            Patient Stories
          </span>

          <h2 className="mt-6 text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl">
            Loved by our
            <span className="block text-blue-600">
              patients.
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Real experiences from patients who trusted BrightSmile
            with their dental care.
          </p>
        </motion.div>

        {/* Testimonials */}
        <div className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-3">

          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
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
                delay: index * 0.1,
              }}
              whileHover={{
                y: -6,
              }}
              className="
                group
                relative
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

              {/* Quote Icon */}
              <div className="
                absolute
                right-7
                top-7
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-2xl
                bg-blue-50
                transition-all
                duration-300
                group-hover:bg-blue-600
              ">
                <Quote
                  size={20}
                  className="
                    text-blue-600
                    transition-colors
                    duration-300
                    group-hover:text-white
                  "
                />
              </div>

              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({
                  length: testimonial.rating,
                }).map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    size={17}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Review */}
              <p className="
                mt-7
                text-base
                leading-8
                text-slate-600
              ">
                “{testimonial.text}”
              </p>

              {/* Patient */}
              <div className="
                mt-8
                flex
                items-center
                justify-between
                gap-4
                border-t
                border-slate-200
                pt-6
              ">

                <div className="flex items-center gap-3">

                  {/* Initials */}
                  <div className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-blue-600
                    text-xs
                    font-bold
                    text-white
                  ">
                    {testimonial.name
                      .split(" ")
                      .map((name) => name[0])
                      .join("")}
                  </div>

                  <div>
                    <h3 className="
                      text-sm
                      font-bold
                      text-slate-900
                    ">
                      {testimonial.name}
                    </h3>

                    <p className="
                      mt-1
                      text-xs
                      text-slate-500
                    ">
                      {testimonial.role}
                    </p>
                  </div>

                </div>

                {/* Verified */}
                <div
                  title="Verified patient"
                  className="
                    flex
                    items-center
                    justify-center
                    rounded-full
                    bg-emerald-50
                    p-2
                  "
                >
                  <BadgeCheck
                    size={17}
                    className="text-emerald-600"
                  />
                </div>

              </div>

            </motion.article>
          ))}

        </div>

        {/* Rating Summary */}
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
            delay: 0.2,
          }}
          className="
            mx-auto
            mt-12
            flex
            max-w-md
            flex-col
            items-center
            justify-center
            gap-3
            rounded-2xl
            border
            border-slate-200
            bg-slate-50
            px-6
            py-5
            text-center
            sm:flex-row
            sm:text-left
          "
        >
          <div className="flex items-center gap-1">
            <Star
              size={18}
              className="fill-yellow-400 text-yellow-400"
            />

            <span className="text-lg font-black text-slate-900">
              4.9
            </span>
          </div>

          <div className="hidden h-5 w-px bg-slate-200 sm:block" />

          <p className="text-sm font-medium text-slate-500">
            Trusted by thousands of BrightSmile patients
          </p>
        </motion.div>

      </div>
    </section>
  );
}