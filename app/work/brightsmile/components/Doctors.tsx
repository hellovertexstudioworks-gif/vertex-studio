"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Award,
  Stethoscope,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";

const doctors = [
  {
    name: "Dr. Emily Carter",
    specialty: "Cosmetic & General Dentistry",
    image: "/images/doctors/doctor1.jpg",
  },
  {
    name: "Dr. Michael Anderson",
    specialty: "Restorative Dentistry",
    image: "/images/doctors/doctor2.jpg",
  },
  {
    name: "Dr. Sophia Williams",
    specialty: "Implant & Family Dentistry",
    image: "/images/doctors/doctor3.jpg",
  },
];

export default function Doctors() {
  return (
    <section className="bg-slate-50 py-24 sm:py-28">
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
            Meet Our Team
          </span>

          <h2 className="mt-6 text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl">
            Experienced hands.
            <span className="block text-blue-600">
              Compassionate care.
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Our dedicated dental professionals combine experience,
            modern techniques, and a genuine passion for helping
            patients achieve healthier, more confident smiles.
          </p>
        </motion.div>

        {/* Doctors */}
        <div className="mt-14 grid gap-6 md:grid-cols-3 lg:mt-16">

          {doctors.map((doctor, index) => (
            <motion.article
              key={doctor.name}
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
                y: -7,
              }}
              className="
                group
                overflow-hidden
                rounded-[30px]
                border
                border-slate-200
                bg-white
                shadow-[0_10px_35px_rgba(15,23,42,0.04)]
                transition-all
                duration-300
                hover:border-blue-100
                hover:shadow-[0_25px_60px_rgba(15,23,42,0.10)]
              "
            >

              {/* Image */}
              <div className="relative h-[390px] overflow-hidden bg-slate-100">

                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  sizes="
                    (max-width: 768px) 100vw,
                    33vw
                  "
                  className="
                    object-cover
                    object-center
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-105
                  "
                />

                {/* Image Gradient */}
                <div className="
                  absolute
                  inset-x-0
                  bottom-0
                  h-40
                  bg-gradient-to-t
                  from-slate-950/50
                  via-slate-950/10
                  to-transparent
                " />

                {/* Specialty Badge */}
                <div className="
                  absolute
                  bottom-5
                  left-5
                  rounded-full
                  border
                  border-white/60
                  bg-white/90
                  px-4
                  py-2
                  text-xs
                  font-semibold
                  text-slate-700
                  shadow-lg
                  backdrop-blur-xl
                ">
                  Dental Professional
                </div>

              </div>

              {/* Content */}
              <div className="p-6 sm:p-7">

                <div className="flex items-start justify-between gap-4">

                  <div>
                    <h3 className="
                      text-xl
                      font-black
                      tracking-tight
                      text-slate-900
                    ">
                      {doctor.name}
                    </h3>

                    <p className="
                      mt-2
                      text-sm
                      leading-6
                      text-slate-500
                    ">
                      {doctor.specialty}
                    </p>
                  </div>

                  {/* Icon */}
                  <div className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-blue-50
                    transition-all
                    duration-300
                    group-hover:bg-blue-600
                  ">
                    <Stethoscope
                      size={20}
                      className="
                        text-blue-600
                        transition-colors
                        duration-300
                        group-hover:text-white
                      "
                    />
                  </div>

                </div>

                {/* Credentials */}
                <div className="
                  mt-6
                  flex
                  items-center
                  gap-2
                  border-t
                  border-slate-100
                  pt-5
                ">
                  <Award
                    size={17}
                    className="text-blue-600"
                  />

                  <span className="
                    text-xs
                    font-semibold
                    text-slate-500
                  ">
                    Trusted Dental Professional
                  </span>
                </div>

              </div>

            </motion.article>
          ))}

        </div>

        {/* CTA */}
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
          className="mt-12 flex justify-center"
        >
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
            Book a Consultation

            <ArrowUpRight size={16} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}