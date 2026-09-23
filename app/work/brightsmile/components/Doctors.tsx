"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Award,
  Stethoscope,
  ArrowUpRight,
  Clock3,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";

const doctors = [
  {
    name: "Dr. Emily Carter",
    specialty: "Cosmetic & General Dentistry",
    category: "General Dentistry",
    image: "/images/doctors/doctor1.jpg",
    experience: "12+ years experience",
    schedule: "09:00 AM – 05:00 PM",
    status: "On Duty",
    statusType: "on",
    credentials: "DDS · Cosmetic Dentistry",
    description:
      "Focused on comprehensive dental care, preventive treatments, and creating confident, natural-looking smiles.",
  },
  {
    name: "Dr. Michael Anderson",
    specialty: "Orthodontics & Restorative Dentistry",
    category: "Orthodontics",
    image: "/images/doctors/doctor2.jpg",
    experience: "10+ years experience",
    schedule: "10:00 AM – 06:00 PM",
    status: "On Duty",
    statusType: "on",
    credentials: "DDS · Orthodontic Care",
    description:
      "Specializes in restorative treatments and personalized orthodontic care for healthier, more balanced smiles.",
  },
  {
    name: "Dr. Sophia Williams",
    specialty: "Pediatric & Family Dentistry",
    category: "Pediatric Dentistry",
    image: "/images/doctors/doctor3.jpg",
    experience: "8+ years experience",
    schedule: "01:00 PM – 07:00 PM",
    status: "Off Duty",
    statusType: "off",
    credentials: "DDS · Pediatric Dentistry",
    description:
      "Provides gentle, family-focused dental care designed to make every visit comfortable for children and parents.",
  },
  {
    name: "Dr. Daniel Brooks",
    specialty: "Oral Surgery & Implants",
    category: "Oral Surgery",
    image: "/images/doctors/doctor4.jpg",
    experience: "14+ years experience",
    schedule: "09:00 AM – 04:00 PM",
    status: "On Duty",
    statusType: "on",
    credentials: "DDS · Oral Surgery & Implant Care",
    description:
      "Provides advanced surgical and implant-focused care with an emphasis on precision, comfort, and long-term oral health.",
  },
  {
    name: "Dr. Olivia Bennett",
    specialty: "Endodontics & Root Canal Care",
    category: "Endodontics",
    image: "/images/doctors/doctor5.jpg",
    experience: "9+ years experience",
    schedule: "10:00 AM – 06:00 PM",
    status: "On Duty",
    statusType: "on",
    credentials: "DDS · Endodontic Care",
    description:
      "Specializes in root canal therapy and preserving natural teeth through careful, patient-focused treatment.",
  },
  {
    name: "Dr. James Mitchell",
    specialty: "Prosthodontics & Restorative Care",
    category: "Prosthodontics",
    image: "/images/doctors/doctor6.jpg",
    experience: "11+ years experience",
    schedule: "11:00 AM – 07:00 PM",
    status: "On Break",
    statusType: "break",
    credentials: "DDS · Prosthodontic Care",
    description:
      "Focuses on restorative and prosthodontic treatments that help patients restore function, comfort, and confidence.",
  },
];

export default function Doctors() {
  return (
    <section
      id="doctors"
      className="relative overflow-hidden bg-slate-50 py-24 sm:py-28"
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-32 top-20 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -25, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-32 bottom-20 h-80 w-80 rounded-full bg-cyan-100/40 blur-3xl"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
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
            amount: 0.2,
          }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
            }}
            className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-sm font-semibold text-blue-600"
          >
            Meet Our Dental Specialists
          </motion.span>

          <h2 className="mt-6 text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl">
            Experienced hands.
            <span className="block text-blue-600">
              Compassionate care.
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Our dental professionals combine experience, modern techniques,
            and a genuine passion for helping every patient achieve a
            healthier, more confident smile.
          </p>
        </motion.div>

        {/* Clinic availability */}
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
            amount: 0.2,
          }}
          transition={{
            duration: 0.6,
            delay: 0.15,
          }}
          className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-3"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>

            Dentists available today
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm">
            <Clock3 size={15} className="text-blue-600" />
            Mon – Sat · 9:00 AM – 7:00 PM
          </div>
        </motion.div>

        {/* Doctors */}
        <div className="mt-14 grid gap-7 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {doctors.map((doctor, index) => (
            <motion.article
              key={doctor.name}
              initial={{
                opacity: 0,
                y: 35,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.12,
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
                ease: "easeOut",
              }}
              whileHover={{
                y: -10,
              }}
              className="group overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_10px_35px_rgba(15,23,42,0.04)] transition-shadow duration-500 hover:border-blue-100 hover:shadow-[0_30px_70px_rgba(15,23,42,0.12)]"
            >
              {/* Doctor Image */}
              <div className="relative h-[390px] overflow-hidden bg-slate-100">
                <Image
                  src={doctor.image}
                  alt={`${doctor.name} - ${doctor.specialty}`}
                  fill
                  sizes="
                    (max-width: 768px) 100vw,
                    (max-width: 1024px) 50vw,
                    33vw
                  "
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Image gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/5 to-transparent opacity-80" />

                {/* Specialty */}
                <motion.div
                  whileHover={{
                    y: -2,
                  }}
                  className="absolute left-5 top-5 rounded-full border border-white/60 bg-white/90 px-4 py-2 text-xs font-bold text-slate-700 shadow-lg backdrop-blur-xl"
                >
                  {doctor.category}
                </motion.div>

                {/* Availability */}
                <div className="absolute bottom-5 left-5">
                  <div
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold shadow-lg backdrop-blur-xl ${
                      doctor.statusType === "on"
                        ? "border-emerald-200/70 bg-emerald-50/95 text-emerald-700"
                        : doctor.statusType === "break"
                          ? "border-amber-200/70 bg-amber-50/95 text-amber-700"
                          : "border-slate-200/70 bg-white/95 text-slate-600"
                    }`}
                  >
                    {doctor.statusType === "on" ? (
                      <>
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                        </span>

                        {doctor.status}
                      </>
                    ) : doctor.statusType === "break" ? (
                      <>
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                        {doctor.status}
                      </>
                    ) : (
                      <>
                        <span className="h-2.5 w-2.5 rounded-full bg-slate-400" />
                        {doctor.status}
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-7">
                {/* Name + icon */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-black tracking-tight text-slate-900">
                      {doctor.name}
                    </h3>

                    <p className="mt-2 text-sm font-semibold leading-6 text-blue-600">
                      {doctor.specialty}
                    </p>
                  </div>

                  <motion.div
                    whileHover={{
                      rotate: 8,
                      scale: 1.08,
                    }}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 transition-colors duration-300 group-hover:bg-blue-600"
                  >
                    <Stethoscope
                      size={20}
                      className="text-blue-600 transition-colors duration-300 group-hover:text-white"
                    />
                  </motion.div>
                </div>

                {/* Description */}
                <p className="mt-4 text-sm leading-6 text-slate-500">
                  {doctor.description}
                </p>

                {/* Experience */}
                <div className="mt-5 flex items-center gap-2">
                  <Award
                    size={16}
                    className="shrink-0 text-blue-600"
                  />

                  <span className="text-xs font-bold text-slate-600">
                    {doctor.experience}
                  </span>
                </div>

                {/* Schedule */}
                <div className="mt-3 flex items-center gap-2">
                  <Clock3
                    size={16}
                    className="shrink-0 text-blue-600"
                  />

                  <span className="text-xs font-semibold text-slate-500">
                    {doctor.schedule}
                  </span>
                </div>

                {/* Credentials */}
                <div className="mt-5 border-t border-slate-100 pt-5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2
                      size={16}
                      className="shrink-0 text-emerald-500"
                    />

                    <span className="text-xs font-semibold text-slate-500">
                      {doctor.credentials}
                    </span>
                  </div>
                </div>

                {/* Appointment */}
                <div className="mt-6">
                  <Link
                    href="#contact"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-4 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/20"
                  >
                    Book with {doctor.name}
                    <ArrowUpRight size={15} />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom CTA */}
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
          }}
          transition={{
            duration: 0.6,
            delay: 0.2,
          }}
          className="mt-14 flex flex-col items-center justify-center gap-4 text-center sm:mt-16"
        >
          <p className="max-w-xl text-sm leading-6 text-slate-500">
            Not sure which specialist is right for you? Our team can help
            match you with the appropriate dental professional.
          </p>

          <Link
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-600 hover:shadow-lg"
          >
            Book a Consultation
            <ArrowUpRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}