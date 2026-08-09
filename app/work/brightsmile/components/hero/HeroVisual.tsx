"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  CalendarDays,
  ShieldCheck,
  Star,
} from "lucide-react";

export default function HeroVisual() {
  return (
    <div className="relative mx-auto flex w-full max-w-[560px] items-center justify-center lg:mx-0 lg:max-w-none">

      {/* Main Glow */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1,
          ease: "easeOut",
        }}
        className="
          absolute
          h-[420px]
          w-[420px]
          rounded-full
          bg-blue-500/10
          blur-[120px]
          sm:h-[520px]
          sm:w-[520px]
          lg:h-[620px]
          lg:w-[520px]
          lg:bg-blue-500/15
          lg:blur-[140px]
        "
      />

      {/* Main Dentist Image */}
      <motion.div
        initial={{
          opacity: 0,
          x: 50,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          x: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.9,
          delay: 0.2,
          ease: "easeOut",
        }}
        whileHover={{
          y: -4,
        }}
        className="
          relative
          z-20
          overflow-hidden
          rounded-[32px]
          border
          border-white/70
          bg-white
          shadow-[0_30px_80px_rgba(37,99,235,0.16)]
          transition-shadow
          duration-500
          hover:shadow-[0_35px_90px_rgba(37,99,235,0.22)]
          sm:rounded-[38px]
          lg:rounded-[40px]
        "
      >
        <Image
          src="/images/hero/dentist-hero.jpg"
          alt="Dentist providing care to a smiling patient"
          width={520}
          height={650}
          priority
          className="
            h-[500px]
            w-[340px]
            object-cover
            object-center
            sm:h-[580px]
            sm:w-[430px]
            lg:h-[650px]
            lg:w-[520px]
          "
        />

        {/* Image Overlay */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-900/10 to-transparent" />
      </motion.div>

      {/* Google Rating Card */}
      <motion.div
        initial={{
          opacity: 0,
          x: -30,
          y: 20,
        }}
        animate={{
          opacity: 1,
          x: 0,
          y: 0,
        }}
        transition={{
          duration: 0.7,
          delay: 0.7,
          ease: "easeOut",
        }}
        whileHover={{
          y: -4,
        }}
        className="
          absolute
          -left-8
          top-10
          z-30
          hidden
          rounded-[24px]
          border
          border-white/70
          bg-white/95
          p-4
          shadow-[0_20px_50px_rgba(15,23,42,0.12)]
          backdrop-blur-xl
          transition-shadow
          duration-300
          hover:shadow-[0_25px_60px_rgba(15,23,42,0.16)]
          lg:block
        "
      >
        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-50">
            <Star
              size={21}
              className="fill-yellow-500 text-yellow-500"
            />
          </div>

          <div>
            <div className="flex items-center gap-1">
              <h3 className="text-xl font-black tracking-tight text-slate-900">
                4.9
              </h3>

              <span className="text-xs font-semibold text-slate-400">
                / 5
              </span>
            </div>

            <p className="text-xs font-medium text-slate-500">
              Google Rating
            </p>
          </div>

        </div>
      </motion.div>

      {/* Experience Card */}
      <motion.div
        initial={{
          opacity: 0,
          x: 30,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.7,
          delay: 0.9,
          ease: "easeOut",
        }}
        whileHover={{
          y: -4,
        }}
        className="
          absolute
          -right-7
          top-28
          z-30
          hidden
          rounded-[24px]
          border
          border-white/70
          bg-white/95
          p-4
          shadow-[0_20px_50px_rgba(15,23,42,0.12)]
          backdrop-blur-xl
          transition-shadow
          duration-300
          hover:shadow-[0_25px_60px_rgba(15,23,42,0.16)]
          lg:block
        "
      >
        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50">
            <ShieldCheck
              size={21}
              className="text-blue-600"
            />
          </div>

          <div>
            <h3 className="text-xl font-black tracking-tight text-slate-900">
              15+
            </h3>

            <p className="text-xs font-medium text-slate-500">
              Years Experience
            </p>
          </div>

        </div>
      </motion.div>

      {/* Clinic Image */}
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
          delay: 1.1,
          ease: "easeOut",
        }}
        whileHover={{
          y: -5,
          scale: 1.02,
        }}
        className="
          absolute
          -bottom-9
          left-8
          z-30
          hidden
          overflow-hidden
          rounded-[24px]
          border
          border-white
          bg-white
          p-1.5
          shadow-[0_20px_50px_rgba(15,23,42,0.15)]
          lg:block
        "
      >
        <Image
          src="/images/hero/clinic.jpg"
          alt="Modern BrightSmile dental clinic"
          width={220}
          height={150}
          className="
            h-[145px]
            w-[210px]
            rounded-[18px]
            object-cover
          "
        />
      </motion.div>

      {/* Same Day Appointment Card */}
      <motion.div
        initial={{
          opacity: 0,
          x: 30,
          y: 20,
        }}
        animate={{
          opacity: 1,
          x: 0,
          y: 0,
        }}
        transition={{
          duration: 0.7,
          delay: 1.3,
          ease: "easeOut",
        }}
        whileHover={{
          y: -4,
        }}
        className="
          absolute
          -bottom-1
          -right-1
          z-30
          hidden
          rounded-[24px]
          border
          border-white/70
          bg-white/95
          p-4
          shadow-[0_20px_50px_rgba(15,23,42,0.12)]
          backdrop-blur-xl
          transition-shadow
          duration-300
          hover:shadow-[0_25px_60px_rgba(15,23,42,0.16)]
          lg:block
        "
      >
        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50">
            <CalendarDays
              size={21}
              className="text-emerald-600"
            />
          </div>

          <div>
            <h3 className="text-base font-black text-slate-900">
              Same Day
            </h3>

            <p className="text-xs font-medium text-slate-500">
              Appointment
            </p>
          </div>

        </div>
      </motion.div>

    </div>
  );
}