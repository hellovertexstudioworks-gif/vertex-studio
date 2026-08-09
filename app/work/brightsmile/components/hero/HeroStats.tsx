"use client";

import { motion } from "framer-motion";
import {
  Heart,
  ShieldCheck,
  Star,
} from "lucide-react";

const stats = [
  {
    value: "15+",
    label: "Years Experience",
    icon: ShieldCheck,
  },
  {
    value: "4.9",
    label: "Patient Rating",
    icon: Star,
  },
  {
    value: "12K+",
    label: "Happy Patients",
    icon: Heart,
  },
];

export default function HeroStats() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.12,
            delayChildren: 0.65,
          },
        },
      }}
      className="
        mx-auto
        mt-10
        grid
        max-w-2xl
        grid-cols-1
        gap-3
        sm:grid-cols-3
        lg:mx-0
      "
    >
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <motion.div
            key={stat.label}
            variants={{
              hidden: {
                opacity: 0,
                y: 18,
              },
              visible: {
                opacity: 1,
                y: 0,
              },
            }}
            whileHover={{
              y: -3,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
              group
              rounded-2xl
              border
              border-slate-200/80
              bg-white/80
              px-4
              py-4
              shadow-[0_10px_30px_rgba(15,23,42,0.04)]
              backdrop-blur-xl
              transition-all
              duration-300
              hover:border-blue-100
              hover:bg-white
              hover:shadow-[0_15px_35px_rgba(37,99,235,0.08)]
              sm:px-3
              lg:px-4
            "
          >
            <div className="flex items-center gap-3 sm:flex-col sm:gap-2 sm:text-center">

              {/* Icon */}
              <div className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-blue-50
                transition-transform
                duration-300
                group-hover:scale-105
              ">
                <Icon
                  size={18}
                  strokeWidth={2.2}
                  className="text-blue-600"
                />
              </div>

              {/* Content */}
              <div>
                <div className="
                  text-xl
                  font-black
                  tracking-tight
                  text-slate-900
                ">
                  {stat.value}
                </div>

                <div className="
                  mt-0.5
                  text-xs
                  font-medium
                  text-slate-500
                ">
                  {stat.label}
                </div>
              </div>

            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}