import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

const highlights = [
  "Experienced construction professionals",
  "Quality materials and proven craftsmanship",
  "Clear communication from start to finish",
  "Projects delivered with safety and precision",
];

export default function About() {
  return (
    <section
      id="about"
      className="overflow-hidden bg-[#101314]"
    >
      <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
        {/* =====================================================
            LEFT CONTENT
        ===================================================== */}

        <div className="flex items-center px-6 py-20 sm:px-10 lg:px-12 lg:py-28">
          <div className="max-w-xl">
            {/* Eyebrow */}

            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-orange-500" />

              <span className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">
                About Us
              </span>
            </div>

            {/* Heading */}

            <h2 className="text-4xl font-black uppercase leading-[0.95] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
              We Build More
              <br />
              Than
              <br />

              <span className="text-orange-500">
                Structures.
              </span>
            </h2>

            {/* Description */}

            <p className="mt-8 text-base leading-8 text-white/65 sm:text-lg">
              At ForgeBuild Construction, we turn plans into
              reality with precision, integrity, and dedication.
              From concept to completion, we deliver buildings
              that stand the test of time.
            </p>

            {/* Highlights */}

            <div className="mt-9 space-y-4">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center border border-orange-500/40 bg-orange-500/10">
                    <Check
                      size={15}
                      strokeWidth={3}
                      className="text-orange-500"
                    />
                  </div>

                  <span className="text-sm font-medium text-white/75 sm:text-base">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}

            <Link
              href="#contact"
              className="group mt-10 inline-flex items-center gap-3 border-b border-orange-500 pb-2 text-sm font-black uppercase tracking-wide text-white transition-colors duration-300 hover:text-orange-500"
            >
              Learn More About Us

              <ArrowRight
                size={18}
                className="text-orange-500 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        {/* =====================================================
            RIGHT IMAGE
        ===================================================== */}

        <div className="relative min-h-[500px] lg:min-h-[680px]">
          <Image
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=85"
            alt="Construction professional working on a building project"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />

          {/* Image Overlay */}

          <div className="absolute inset-0 bg-gradient-to-r from-[#101314]/20 via-transparent to-transparent" />

          <div className="absolute inset-0 bg-black/10" />

          {/* Image Label */}

          <div className="absolute bottom-7 left-7 border border-white/20 bg-black/65 px-5 py-4 backdrop-blur-md sm:bottom-10 sm:left-10">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-500">
              Built With Purpose
            </p>

            <p className="mt-1 text-sm font-semibold text-white">
              Quality in every detail.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}   