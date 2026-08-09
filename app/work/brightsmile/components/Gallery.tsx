"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const galleryImages = [
  {
    src: "/images/gallery/gallery1.jpg",
    alt: "BrightSmile dental clinic",
  },
  {
    src: "/images/gallery/gallery2.jpg",
    alt: "BrightSmile dental treatment",
  },
  {
    src: "/images/gallery/gallery3.jpg",
    alt: "BrightSmile dental office",
  },
  {
    src: "/images/gallery/gallery4.jpg",
    alt: "Modern dental equipment",
  },
  {
    src: "/images/gallery/gallery5.jpg",
    alt: "BrightSmile patient care",
  },
  {
    src: "/images/gallery/gallery6.jpg",
    alt: "BrightSmile dental team",
  },
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="bg-slate-50 py-24 sm:py-28"
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
            Our Clinic
          </span>

          <h2 className="mt-6 text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl">
            A modern space for
            <span className="block text-blue-600">
              better dental care.
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Take a look inside BrightSmile and discover a comfortable,
            modern environment designed around your dental experience.
          </p>
        </motion.div>

        {/* Gallery */}
        <div className="
          mt-14
          grid
          auto-rows-[220px]
          gap-4
          sm:grid-cols-2
          sm:gap-5
          lg:mt-16
          lg:grid-cols-3
        ">

          {galleryImages.map((image, index) => (
            <motion.div
              key={image.src}
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
                amount: 0.1,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.06,
              }}
              className={`
                group
                relative
                overflow-hidden
                rounded-[28px]
                border
                border-white
                bg-white
                shadow-[0_10px_35px_rgba(15,23,42,0.05)]
                ${
                  index === 0
                    ? "sm:row-span-2"
                    : index === 3
                      ? "lg:col-span-2"
                      : ""
                }
              `}
            >

              {/* Image */}
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="
                  (max-width: 640px) 100vw,
                  (max-width: 1024px) 50vw,
                  33vw
                "
                className="
                  object-cover
                  transition-transform
                  duration-700
                  ease-out
                  group-hover:scale-110
                "
              />

              {/* Dark Overlay */}
              <div className="
                absolute
                inset-0
                bg-gradient-to-t
                from-slate-950/60
                via-slate-950/5
                to-transparent
                opacity-60
                transition-opacity
                duration-300
                group-hover:opacity-100
              " />

              {/* Number */}
              <div className="
                absolute
                left-5
                top-5
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-white/30
                bg-white/90
                text-xs
                font-bold
                text-slate-900
                shadow-lg
                backdrop-blur-xl
              ">
                {String(index + 1).padStart(2, "0")}
              </div>

              {/* Hover Action */}
              <div className="
                absolute
                bottom-5
                right-5
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                bg-white
                text-slate-900
                opacity-0
                shadow-xl
                transition-all
                duration-300
                group-hover:opacity-100
                group-hover:translate-y-0
                translate-y-2
              ">
                <ArrowUpRight size={18} />
              </div>

              {/* Image Label */}
              <div className="
                absolute
                bottom-5
                left-5
                max-w-[70%]
                translate-y-2
                opacity-0
                transition-all
                duration-300
                group-hover:translate-y-0
                group-hover:opacity-100
              ">
                <p className="
                  text-sm
                  font-semibold
                  text-white
                  drop-shadow-lg
                ">
                  {image.alt}
                </p>
              </div>

            </motion.div>
          ))}

        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.5,
            delay: 0.2,
          }}
          className="mt-10 text-center"
        >
          <p className="text-sm text-slate-500">
            Designed to make every visit feel comfortable,
            modern, and welcoming.
          </p>
        </motion.div>

      </div>
    </section>
  );
}