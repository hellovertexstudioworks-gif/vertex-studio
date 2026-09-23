"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ShieldCheck,
  HeartPulse,
  Stethoscope,
  ArrowUpRight,
  Baby,
  Braces,
  Syringe,
  Activity,
} from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    title: "General Dentistry",
    category: "Everyday Oral Health",
    description:
      "Complete dental care focused on keeping your teeth healthy, strong, and comfortable.",
    image: "/images/services/general.jpg",
    icon: Stethoscope,
    treatments: ["Dental Exams", "Cleanings", "Fillings", "Digital X-Rays"],
  },
  {
    title: "Cosmetic Dentistry",
    category: "Smile Enhancement",
    description:
      "Personalized cosmetic treatments designed to create a brighter, balanced, and natural-looking smile.",
    image: "/images/services/cosmetic.jpg",
    icon: Sparkles,
    treatments: ["Veneers", "Smile Makeovers", "Bonding", "Cosmetic Consultations"],
  },
  {
    title: "Teeth Whitening",
    category: "Smile Brightening",
    description:
      "Professional whitening treatments designed to safely brighten your smile and boost your confidence.",
    image: "/images/services/whitening.jpg",
    icon: ShieldCheck,
    treatments: ["In-Office Whitening", "Whitening Plans", "Shade Assessment", "Aftercare"],
  },
  {
    title: "Dental Implants",
    category: "Tooth Replacement",
    description:
      "Modern implant solutions designed to restore missing teeth, function, comfort, and confidence.",
    image: "/images/services/implants.jpg",
    icon: HeartPulse,
    treatments: ["Implant Consultation", "Implant Placement", "Restoration", "Follow-Up Care"],
  },
  {
    title: "Orthodontics",
    category: "Teeth Alignment",
    description:
      "Personalized orthodontic care to help improve tooth alignment, bite, function, and smile confidence.",
    image: "/images/services/general.jpg",
    icon: Braces,
    treatments: ["Braces", "Alignment Plans", "Bite Assessment", "Progress Visits"],
  },
  {
    title: "Pediatric Dentistry",
    category: "Children's Dental Care",
    description:
      "Gentle, family-focused dental care designed to make dental visits comfortable for children.",
    image: "/images/services/cosmetic.jpg",
    icon: Baby,
    treatments: ["Child Checkups", "Preventive Care", "Fluoride Care", "Dental Education"],
  },
  {
    title: "Root Canal Care",
    category: "Endodontic Care",
    description:
      "Care focused on treating infected or damaged tooth pulp while helping preserve natural teeth.",
    image: "/images/services/implants.jpg",
    icon: Activity,
    treatments: ["Root Canal Consultation", "Treatment Planning", "Tooth Preservation", "Follow-Up"],
  },
  {
    title: "Oral Surgery & Implants",
    category: "Advanced Dental Care",
    description:
      "Specialized surgical and implant-focused care delivered with careful treatment planning and patient comfort in mind.",
    image: "/images/services/general.jpg",
    icon: Syringe,
    treatments: ["Surgical Consultation", "Extractions", "Implant Planning", "Aftercare"],
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-white py-24 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <motion.div
          animate={{ x: [0, 25, 0], y: [0, -18, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-blue-100/40 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 25, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-cyan-100/30 blur-3xl"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-sm font-semibold text-blue-600"
          >
            Our Dental Services
          </motion.span>

          <h2 className="mt-6 text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl">
            Complete care for
            <span className="block text-blue-600">
              every stage of your smile.
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            From preventive and family dentistry to cosmetic, orthodontic, and
            advanced restorative care, BrightSmile brings a range of dental
            services together in one patient-focused experience.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.07,
                  ease: "easeOut",
                }}
                whileHover={{ y: -8 }}
                className="group overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-shadow duration-500 hover:border-blue-100 hover:shadow-[0_28px_65px_rgba(15,23,42,0.11)]"
              >
                <div className="relative h-56 overflow-hidden sm:h-60">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/10 to-transparent" />

                  <div className="absolute left-4 top-4 rounded-full border border-white/60 bg-white/90 px-3 py-1.5 text-[11px] font-bold text-slate-700 shadow-lg backdrop-blur-xl">
                    {service.category}
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.08, rotate: 5 }}
                    className="absolute bottom-5 left-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/80 bg-white/95 shadow-xl backdrop-blur transition-colors duration-300 group-hover:bg-blue-600"
                  >
                    <Icon
                      size={22}
                      strokeWidth={2}
                      className="text-blue-600 transition-colors duration-300 group-hover:text-white"
                    />
                  </motion.div>
                </div>

                <div className="p-6 sm:p-7">
                  <h3 className="text-xl font-black tracking-tight text-slate-900">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {service.description}
                  </p>

                  <div className="mt-5 space-y-2.5 border-t border-slate-100 pt-5">
                    {service.treatments.map((treatment) => (
                      <div
                        key={treatment}
                        className="flex items-center gap-2 text-xs font-semibold text-slate-600"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                        {treatment}
                      </div>
                    ))}
                  </div>

                  <Link
                    href="#contact"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition-all duration-300 hover:gap-3"
                  >
                    Book a Consultation
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-14 overflow-hidden rounded-[30px] border border-slate-200 bg-slate-50 p-6 sm:p-8"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <span className="text-sm font-bold uppercase tracking-[0.16em] text-blue-600">
                Your Care Journey
              </span>

              <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-900">
                From your first visit to ongoing care.
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Our team can help you understand your options, choose the
                appropriate specialist, and plan the next step in your care.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ["01", "Consult"],
                ["02", "Plan"],
                ["03", "Treat"],
                ["04", "Maintain"],
              ].map(([number, label]) => (
                <div
                  key={number}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-center shadow-sm"
                >
                  <div className="text-xs font-black text-blue-600">
                    {number}
                  </div>
                  <div className="mt-1 text-sm font-bold text-slate-800">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 flex justify-center"
        >
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/20"
          >
            Discuss Your Dental Needs
            <ArrowUpRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
