"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroContent() {
  return (
    <div>
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        className="flex justify-center lg:justify-start"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-sm font-semibold text-blue-600 shadow-sm">
          <span className="text-base">🦷</span>
          Trusted Dental Care
        </span>
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.15,
          ease: "easeOut",
        }}
        className="mt-7 text-center text-5xl font-black leading-[1.02] tracking-[-0.04em] text-slate-900 sm:text-6xl lg:text-left lg:text-7xl xl:text-[76px]"
      >
        Your Smile
        <br />
        Deserves
        <br />
        <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
          Exceptional Care
        </span>
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          delay: 0.3,
          ease: "easeOut",
        }}
        className="mx-auto mt-7 max-w-xl text-center text-base leading-8 text-slate-600 sm:text-lg lg:mx-0 lg:text-left"
      >
        Experience modern dentistry with compassionate professionals,
        advanced technology, and personalized treatments designed for
        healthier, brighter smiles.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          delay: 0.45,
          ease: "easeOut",
        }}
        className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start"
      >
        {/* Book Appointment */}
        <motion.div
          whileHover={{
            y: -3,
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.98,
          }}
          transition={{
            duration: 0.2,
          }}
        >
          <Link
            href="#contact"
            className="flex items-center justify-center rounded-full bg-blue-600 px-7 py-4 font-semibold text-white shadow-[0_15px_35px_rgba(37,99,235,0.25)] transition-all duration-300 hover:bg-blue-700 hover:shadow-[0_18px_40px_rgba(37,99,235,0.3)]"
          >
            Book Appointment
            <span className="ml-2">→</span>
          </Link>
        </motion.div>

        {/* Our Services */}
        <motion.div
          whileHover={{
            y: -3,
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.98,
          }}
          transition={{
            duration: 0.2,
          }}
        >
          <Link
            href="#services"
            className="flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-4 font-semibold text-slate-900 shadow-sm transition-all duration-300 hover:border-blue-500 hover:text-blue-600 hover:shadow-md"
          >
            Our Services
          </Link>
        </motion.div>
      </motion.div>

      {/* Small reassurance */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.7,
          delay: 0.7,
        }}
        className="mt-6 flex justify-center lg:justify-start"
      >
        <p className="text-xs font-medium text-slate-400">
          Comfortable care • Modern technology • Patient-first service
        </p>
      </motion.div>
    </div>
  );
}