"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ShieldCheck,
  HeartPulse,
  Stethoscope,
  ArrowUpRight,
} from "lucide-react";

const services = [
  {
    title: "General Dentistry",
    description:
      "Complete dental care focused on keeping your teeth healthy, strong, and comfortable.",
    image: "/images/services/general.jpg",
    icon: Stethoscope,
  },
  {
    title: "Cosmetic Dentistry",
    description:
      "Enhance your smile with personalized cosmetic treatments designed for natural-looking results.",
    image: "/images/services/cosmetic.jpg",
    icon: Sparkles,
  },
  {
    title: "Teeth Whitening",
    description:
      "Brighten your smile with professional whitening treatments designed to deliver a confident smile.",
    image: "/images/services/whitening.jpg",
    icon: ShieldCheck,
  },
  {
    title: "Dental Implants",
    description:
      "Restore missing teeth with modern implant solutions designed for comfort, function, and confidence.",
    image: "/images/services/implants.jpg",
    icon: HeartPulse,
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="bg-white py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">

          <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-sm font-semibold text-blue-600">
            Our Services
          </span>

          <h2 className="mt-6 text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl">
            Complete Care for
            <span className="block text-blue-600">
              Your Brightest Smile
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            From preventive care to advanced cosmetic and restorative
            treatments, our dental team provides personalized care for
            every stage of your smile journey.
          </p>

        </div>

        {/* Services Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">

          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                className="
                  group
                  overflow-hidden
                  rounded-[30px]
                  border
                  border-slate-200
                  bg-white
                  shadow-[0_8px_30px_rgba(15,23,42,0.04)]
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  hover:border-blue-100
                  hover:shadow-[0_25px_60px_rgba(15,23,42,0.10)]
                "
              >

                {/* Image */}
                <div className="relative h-60 overflow-hidden sm:h-64">

                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="
                      (max-width: 640px) 100vw,
                      (max-width: 1024px) 50vw,
                      25vw
                    "
                    className="
                      object-cover
                      transition-transform
                      duration-700
                      ease-out
                      group-hover:scale-110
                    "
                  />

                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/5 to-transparent opacity-80" />

                  {/* Icon */}
                  <div className="
                    absolute
                    bottom-5
                    left-5
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-white/80
                    bg-white/95
                    shadow-xl
                    backdrop-blur
                    transition-all
                    duration-300
                    group-hover:scale-105
                    group-hover:bg-blue-600
                  ">
                    <Icon
                      size={22}
                      strokeWidth={2}
                      className="
                        text-blue-600
                        transition-colors
                        duration-300
                        group-hover:text-white
                      "
                    />
                  </div>

                </div>

                {/* Content */}
                <div className="p-6 sm:p-7">

                  <h3 className="text-xl font-black tracking-tight text-slate-900">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {service.description}
                  </p>

                  {/* Learn More */}
                  <Link
                    href="#contact"
                    className="
                      mt-6
                      inline-flex
                      items-center
                      gap-2
                      text-sm
                      font-bold
                      text-blue-600
                      transition-all
                      duration-300
                      hover:gap-3
                    "
                  >
                    Learn More

                    <ArrowUpRight
                      size={16}
                      className="
                        transition-transform
                        duration-300
                        group-hover:translate-x-0.5
                        group-hover:-translate-y-0.5
                      "
                    />
                  </Link>

                </div>

              </article>
            );
          })}

        </div>

        {/* Bottom CTA */}
        <div className="mt-12 flex justify-center">

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
            Discuss Your Dental Needs

            <ArrowUpRight size={16} />
          </Link>

        </div>

      </div>
    </section>
  );
}