// TASK: Replace app/work/lunabistro/components/sections/Gallery.tsx with this file.

"use client";

import { useState } from "react";

type GalleryItem = {
  id: string;
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  featured?: boolean;
};

const galleryItems: GalleryItem[] = [
  {
    id: "01",
    image: "/images/luna/luna-gallery-01.jpg",
    alt: "Luna Bistro dining room",
    eyebrow: "The Dining Room",
    title: "Where evenings begin.",
    featured: true,
  },
  {
    id: "02",
    image: "/images/luna/luna-gallery-02.jpg",
    alt: "Elegant fine dining table setting",
    eyebrow: "The Table",
    title: "Details worth lingering over.",
  },
  {
    id: "03",
    image: "/images/luna/luna-gallery-03.jpg",
    alt: "Luna Bistro interior detail",
    eyebrow: "After Dark",
    title: "A room made for slow evenings.",
  },
];

function GalleryImage({ item }: { item: GalleryItem }) {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;

    const rect = event.currentTarget.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    setPosition({
      x: x * 10,
      y: y * 10,
    });
  };

  const resetPosition = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      className={`group relative overflow-hidden bg-[#171410] ${
        item.featured ? "h-full" : ""
      }`}
      onPointerEnter={() => setIsHovered(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPosition}
    >
      <div
        className={`relative h-full overflow-hidden ${
          item.featured
            ? "min-h-[460px] sm:min-h-[620px] lg:min-h-[680px]"
            : "aspect-[4/3]"
        }`}
      >
        {/* IMAGE */}
        <img
          src={item.image}
          alt={item.alt}
          className="absolute inset-[-3%] h-[106%] w-[106%] object-cover transition-[transform,filter] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
          style={{
            transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${
              isHovered ? 1.085 : 1.035
            })`,
            filter: isHovered ? "saturate(1.05)" : "saturate(0.96)",
          }}
        />

        {/* CINEMATIC OVERLAY */}
        <div
          className={`absolute inset-0 transition-all duration-700 ${
            item.featured
              ? "bg-gradient-to-t from-black/70 via-black/15 to-black/5"
              : "bg-gradient-to-t from-black/65 via-black/10 to-transparent"
          }`}
        />

        {/* HOVER VEIL */}
        <div
          className={`absolute inset-0 bg-[#171410]/10 transition-opacity duration-700 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* TOP EDITORIAL MARK */}
        <div className="absolute left-5 top-5 sm:left-7 sm:top-7">
          <div className="flex items-center gap-3">
            <span
              className={`h-px bg-[#E0BF7A] transition-all duration-700 ${
                isHovered ? "w-14" : "w-8"
              }`}
            />
            <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-white/70">
              {item.eyebrow}
            </span>
          </div>
        </div>

        {/* FEATURED IMAGE LABEL */}
        <div
          className={`absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 ${
            item.featured ? "lg:bottom-10 lg:left-10 lg:right-10" : ""
          }`}
        >
          <div className="flex items-end justify-between gap-6">
            <div>
              <p
                className={`mb-2 text-[8px] font-bold uppercase tracking-[0.3em] text-[#E0BF7A] transition-transform duration-700 ${
                  isHovered ? "translate-x-1" : "translate-x-0"
                }`}
              >
                {item.id} / Luna Collection
              </p>

              <p
                className={`font-serif italic text-[#F4EFE6] transition-transform duration-700 ${
                  item.featured
                    ? "text-2xl sm:text-3xl"
                    : "text-xl sm:text-2xl"
                } ${isHovered ? "translate-x-1" : "translate-x-0"}`}
              >
                {item.title}
              </p>
            </div>

            {/* SUBTLE HOVER ACTION */}
            <div
              className={`hidden items-center gap-2 pb-1 text-[8px] font-bold uppercase tracking-[0.25em] text-white/70 transition-all duration-700 sm:flex ${
                isHovered
                  ? "translate-x-0 opacity-100"
                  : "translate-x-3 opacity-0"
              }`}
            >
              <span>Explore</span>
              <span className="text-[#E0BF7A]">↗</span>
            </div>
          </div>

          {/* REVEAL LINE */}
          <div className="mt-4 h-px w-full overflow-hidden bg-white/15">
            <div
              className={`h-full origin-left bg-[#E0BF7A] transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isHovered ? "scale-x-100" : "scale-x-0"
              }`}
            />
          </div>
        </div>

        {/* CORNER FRAME */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute bottom-5 right-5 h-8 w-8 border-b border-r border-[#E0BF7A]/60 transition-all duration-700 sm:bottom-7 sm:right-7 ${
            isHovered ? "h-12 w-12" : "h-8 w-8"
          }`}
        />
      </div>
    </div>
  );
}

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-[#F4EFE6] py-24 sm:py-28 lg:py-32"
    >
      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-14 xl:px-16">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div>
            <div className="mb-7 flex items-center gap-4">
              <span className="h-px w-12 bg-[#C9A15A]" />

              <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#34382D]">
                A Glimpse Inside
              </p>
            </div>

            <h2 className="font-serif text-[clamp(3.5rem,6.5vw,6.8rem)] leading-[0.88] tracking-[-0.055em] text-[#171410]">
              Moments at
              <br />
              <span className="italic text-[#34382D]">Luna.</span>
            </h2>
          </div>

          <div className="max-w-md lg:pb-2">
            <p className="text-sm leading-7 text-[#171410]/55 sm:text-base sm:leading-8">
              From intimate dinners to unforgettable celebrations, discover the
              atmosphere, details, and moments that make Luna Bistro unique.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#C9A15A]/70" />
              <span className="text-[8px] font-bold uppercase tracking-[0.28em] text-[#171410]/35">
                Food · Place · Atmosphere
              </span>
            </div>
          </div>
        </div>

        {/* =====================================================
            GALLERY GRID
        ===================================================== */}

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {/* FEATURED IMAGE */}

          <div className="lg:col-span-7">
            <GalleryImage item={galleryItems[0]} />
          </div>

          {/* SECONDARY IMAGES */}

          <div className="grid gap-4 lg:col-span-5">
            <GalleryImage item={galleryItems[1]} />
            <GalleryImage item={galleryItems[2]} />
          </div>
        </div>

        {/* =====================================================
            BOTTOM EDITORIAL STRIP
        ===================================================== */}

        <div className="mt-12 flex flex-col gap-6 border-t border-[#171410]/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-[#C9A15A]" />

            <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#171410]/45">
              Every detail matters.
            </p>
          </div>

          <a
            href="#reservation"
            className="group inline-flex items-center gap-4 self-start text-[10px] font-bold uppercase tracking-[0.22em] text-[#34382D] transition-colors duration-300 hover:text-[#9B7637]"
          >
            <span className="border-b border-[#34382D]/30 pb-2 transition-colors duration-300 group-hover:border-[#9B7637]">
              Experience Luna
            </span>

            <span className="text-base transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
