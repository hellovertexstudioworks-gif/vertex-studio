"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  ArrowRight,
  ShieldCheck,
  Star,
} from "lucide-react";

export default function CTA() {
  return (
    <section
      id="cta"
      className="
        relative
        overflow-hidden
        bg-gradient-to-br
        from-blue-700
        via-blue-600
        to-cyan-500
        py-24
        sm:py-28
      "
    >
      {/* Background Decoration */}

      <div className="
        absolute
        -left-40
        -top-40
        h-[420px]
        w-[420px]
        rounded-full
        bg-white/10
        blur-3xl
      " />

      <div className="
        absolute
        -bottom-40
        -right-20
        h-96
        w-96
        rounded-full
        bg-cyan-300/20
        blur-3xl
      " />

      <div className="
        absolute
        inset-0
        bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_55%)]
      " />

      {/* Content */}
      <div className="
        relative
        mx-auto
        max-w-7xl
        px-6
      ">

        <motion.div
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
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
          }}
          className="
            mx-auto
            max-w-4xl
            text-center
          "
        >

          {/* Badge */}
          <div className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-white/20
            bg-white/10
            px-5
            py-2
            text-sm
            font-semibold
            text-white
            shadow-lg
            backdrop-blur-md
          ">
            <CalendarCheck size={17} />

            Ready for a healthier smile?
          </div>

          {/* Heading */}
          <h2 className="
            mt-7
            text-4xl
            font-black
            leading-[1.05]
            tracking-tight
            text-white
            sm:text-5xl
            lg:text-6xl
          ">
            Your best smile
            <span className="
              block
              text-cyan-100
            ">
              starts today.
            </span>
          </h2>

          {/* Description */}
          <p className="
            mx-auto
            mt-6
            max-w-2xl
            text-base
            leading-8
            text-blue-50
            sm:text-lg
          ">
            Schedule your appointment with BrightSmile Dental
            and experience personalized care from a team you
            can trust.
          </p>

          {/* Buttons */}
          <div className="
            mt-10
            flex
            flex-col
            items-center
            justify-center
            gap-3
            sm:flex-row
            sm:gap-4
          ">

            {/* Primary */}
            <Link
              href="#contact"
              className="
                group
                inline-flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-full
                bg-white
                px-8
                py-4
                font-bold
                text-blue-600
                shadow-xl
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-slate-50
                hover:shadow-2xl
                sm:w-auto
              "
            >
              Book an Appointment

              <ArrowRight
                size={19}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </Link>

            {/* Secondary */}
            <Link
              href="#services"
              className="
                inline-flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-full
                border
                border-white/30
                bg-white/10
                px-8
                py-4
                font-bold
                text-white
                backdrop-blur-md
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-white/20
                sm:w-auto
              "
            >
              Explore Services
            </Link>

          </div>

          {/* Trust Indicators */}
          <div className="
            mt-12
            flex
            flex-wrap
            items-center
            justify-center
            gap-x-6
            gap-y-3
            text-sm
            text-blue-50
          ">

            <div className="flex items-center gap-2">
              <ShieldCheck size={18} />

              <span>
                Trusted Dental Professionals
              </span>
            </div>

            <div className="
              hidden
              h-5
              w-px
              bg-white/20
              sm:block
            " />

            <div className="flex items-center gap-2">
              <Star
                size={16}
                className="fill-yellow-300 text-yellow-300"
              />

              <span>
                4.9 Patient Rating
              </span>
            </div>

            <div className="
              hidden
              h-5
              w-px
              bg-white/20
              sm:block
            " />

            <div>
              15+ Years Experience
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}