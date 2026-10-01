// TASK: Replace app/work/lunabistro/components/sections/Menu.tsx with this file.

"use client";

import { useMemo, useState } from "react";

type MenuCategory = "All" | "Signature" | "Mains" | "Desserts";

type Dish = {
  id: string;
  number: string;
  name: string;
  price: string;
  description: string;
  label: string;
  category: Exclude<MenuCategory, "All">;
  image: string;
  alt: string;
};

const dishes: Dish[] = [
  {
    id: "risotto",
    number: "01",
    name: "Wild Mushroom Risotto",
    price: "$28",
    description:
      "Creamy Arborio rice, wild mushrooms, parmesan, herbs, and delicate truffle notes.",
    label: "Vegetarian · Chef's Pick",
    category: "Signature",
    image:
      "https://www.magicmike.pl/images/galerie/24/Risotto-Micha-Sierka.jpg",
    alt: "Wild Mushroom Risotto",
  },
  {
    id: "salmon",
    number: "02",
    name: "Charred Salmon",
    price: "$34",
    description:
      "Fire-charred salmon, lemon beurre blanc, asparagus, and roasted baby potatoes.",
    label: "Seafood",
    category: "Mains",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1400&q=90",
    alt: "Charred Salmon",
  },
  {
    id: "tenderloin",
    number: "03",
    name: "Herb-Crusted Tenderloin",
    price: "$48",
    description:
      "Tender beef, roasted vegetables, pomme purée, and a rich red wine jus.",
    label: "Chef's Selection",
    category: "Mains",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1400&q=90",
    alt: "Herb-Crusted Tenderloin",
  },
  {
    id: "torte",
    number: "04",
    name: "Dark Chocolate Torte",
    price: "$16",
    description:
      "Dark chocolate, vanilla cream, cacao crumble, and seasonal berries.",
    label: "Dessert",
    category: "Desserts",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1400&q=90",
    alt: "Dark Chocolate Torte",
  },
];

const categories: MenuCategory[] = [
  "All",
  "Signature",
  "Mains",
  "Desserts",
];

const categoryDescription: Record<MenuCategory, string> = {
  All: "The Luna selection",
  Signature: "Chef's highlights",
  Mains: "From the kitchen",
  Desserts: "A sweet finish",
};

export default function Menu() {
  const [activeCategory, setActiveCategory] =
    useState<MenuCategory>("All");

  const [selectedDishId, setSelectedDishId] =
    useState("risotto");

  const visibleDishes = useMemo(() => {
    if (activeCategory === "All") {
      return dishes;
    }

    return dishes.filter(
      (dish) => dish.category === activeCategory
    );
  }, [activeCategory]);

  const selectedDish =
    visibleDishes.find((dish) => dish.id === selectedDishId) ??
    visibleDishes[0] ??
    dishes[0];

  const handleCategoryChange = (category: MenuCategory) => {
    setActiveCategory(category);

    const nextDishes =
      category === "All"
        ? dishes
        : dishes.filter((dish) => dish.category === category);

    if (nextDishes.length > 0) {
      setSelectedDishId(nextDishes[0].id);
    }
  };

  return (
    <section
      id="menu"
      className="relative overflow-hidden bg-[#0B0A08] py-28 sm:py-32 lg:py-40"
    >
      {/* =====================================================
          QUIET BACKGROUND DETAILS
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-[22%] h-px w-[30%] bg-gradient-to-l from-[#C9A15A]/25 to-transparent"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[18%] left-0 h-px w-[24%] bg-gradient-to-r from-[#C9A15A]/20 to-transparent"
      />

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div className="relative mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-14 xl:px-16">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.7fr] lg:items-end">
          <div>
            <div className="menu-reveal mb-7 flex items-center gap-4">
              <span className="menu-header-line h-px w-14 origin-left bg-[#C9A15A]" />

              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9A15A]">
                The Menu
              </p>
            </div>

            <h2 className="menu-title font-serif text-[clamp(3.5rem,6vw,6.8rem)] leading-[0.88] tracking-[-0.055em] text-[#F4EFE6]">
              <span className="block">
                Thoughtfully made.
              </span>

              <span className="block italic text-[#E0BF7A]">
                Beautifully served.
              </span>
            </h2>
          </div>

          <div className="menu-reveal lg:pb-2">
            <p className="max-w-md text-sm leading-7 text-white/50 sm:text-base sm:leading-8">
              Seasonal ingredients, refined technique, and dishes created to
              make every visit to Luna Bistro memorable.
            </p>
          </div>
        </div>

        {/* =================================================
            CATEGORY NAVIGATION
        ================================================= */}

        <div className="menu-reveal mt-14 border-y border-white/10 py-5 sm:mt-16 sm:py-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#C9A15A]/60" />

              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/35">
                Explore the menu
              </p>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              {categories.map((category) => {
                const isActive = activeCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryChange(category)}
                    aria-pressed={isActive}
                    className={`menu-category group relative min-h-11 rounded-full border px-5 py-3 text-[10px] font-bold uppercase tracking-[0.22em] transition-all duration-300 sm:min-h-12 sm:px-6 ${
                      isActive
                        ? "border-[#C9A15A] bg-[#C9A15A] text-[#0B0A08]"
                        : "border-white/15 bg-white/[0.025] text-white/50 hover:border-[#C9A15A]/60 hover:bg-[#C9A15A]/10 hover:text-[#E0BF7A]"
                    }`}
                  >
                    {category}

                    {isActive && (
                      <span className="absolute -bottom-[7px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#E0BF7A]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* =================================================
            ACTIVE CATEGORY LABEL
        ================================================= */}

        <div className="menu-reveal mt-9 flex items-end justify-between gap-6">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#E0BF7A]">
              {categoryDescription[activeCategory]}
            </p>

            <p className="mt-2 font-serif text-2xl italic text-white/70 sm:text-3xl">
              {activeCategory === "All"
                ? "A little of everything."
                : activeCategory === "Signature"
                  ? "The dishes that define Luna."
                  : activeCategory === "Mains"
                    ? "The heart of the evening."
                    : "End the evening beautifully."}
            </p>
          </div>

          <p className="shrink-0 text-[9px] font-bold uppercase tracking-[0.2em] text-white/20">
            {String(visibleDishes.length).padStart(2, "0")} dishes
          </p>
        </div>

        {/* =================================================
            FEATURED DISH
        ================================================= */}

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 xl:gap-20">
          {/* FEATURED IMAGE */}

          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#171410] sm:aspect-[16/10] lg:aspect-[4/3]">
              <img
                key={selectedDish.id}
                src={selectedDish.image}
                alt={selectedDish.alt}
                className="menu-feature-image absolute inset-0 h-full w-full object-cover"
              />

              <div className="pointer-events-none absolute inset-0 bg-black/[0.08]" />

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#0B0A08]/85 via-[#0B0A08]/15 to-transparent" />

              <div className="absolute left-5 top-5 flex items-center gap-3 sm:left-7 sm:top-7">
                <span className="h-px w-8 bg-white/60" />

                <span className="text-[8px] font-bold uppercase tracking-[0.28em] text-white/75">
                  {selectedDish.number} / {selectedDish.category}
                </span>
              </div>

              <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7">
                <p className="text-[8px] font-bold uppercase tracking-[0.28em] text-[#E0BF7A]">
                  {selectedDish.label}
                </p>

                <p className="mt-2 font-serif text-2xl text-[#F4EFE6] sm:text-3xl">
                  {selectedDish.name}
                </p>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-4 -right-4 -z-0 h-24 w-24 border-b border-r border-[#C9A15A]/45 sm:-bottom-5 sm:-right-5 sm:h-28 sm:w-28"
            />
          </div>

          {/* =================================================
              ALL DISHES / FILTERED DISHES
          ================================================= */}

          <div className="min-w-0">
            <div className="mb-3 hidden grid-cols-[42px_1fr_auto] gap-5 border-b border-white/10 pb-4 sm:grid">
              <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/20">
                No.
              </span>

              <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/20">
                Dish
              </span>

              <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/20">
                Price
              </span>
            </div>

            <div className="divide-y divide-white/10">
              {visibleDishes.map((dish) => {
                const isSelected = selectedDish.id === dish.id;

                return (
                  <button
                    key={dish.id}
                    type="button"
                    onClick={() => setSelectedDishId(dish.id)}
                    aria-pressed={isSelected}
                    className={`menu-dish group block w-full py-6 text-left transition-all duration-500 sm:py-7 ${
                      isSelected
                        ? "bg-white/[0.035] px-4 sm:px-5"
                        : "px-0 hover:bg-white/[0.018]"
                    }`}
                  >
                    <div className="grid grid-cols-[32px_1fr_auto] items-start gap-4 sm:grid-cols-[42px_1fr_auto] sm:gap-5">
                      <span
                        className={`mt-1 text-[9px] font-bold tracking-[0.2em] transition-colors duration-300 ${
                          isSelected
                            ? "text-[#C9A15A]"
                            : "text-white/20 group-hover:text-white/40"
                        }`}
                      >
                        {dish.number}
                      </span>

                      <div className="min-w-0">
                        <h3
                          className={`font-serif text-xl leading-tight transition-colors duration-300 sm:text-2xl ${
                            isSelected
                              ? "text-[#E0BF7A]"
                              : "text-[#F4EFE6] group-hover:text-[#E0BF7A]"
                          }`}
                        >
                          {dish.name}
                        </h3>

                        <p
                          className={`mt-2 max-w-xl text-xs leading-6 transition-colors duration-300 sm:text-sm ${
                            isSelected
                              ? "text-white/55"
                              : "text-white/30 group-hover:text-white/45"
                          }`}
                        >
                          {dish.description}
                        </p>

                        <div className="mt-3 flex items-center gap-3">
                          <span
                            className={`h-px transition-all duration-500 ${
                              isSelected
                                ? "w-8 bg-[#C9A15A]"
                                : "w-0 bg-[#C9A15A]"
                            }`}
                          />

                          <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/25">
                            {dish.label}
                          </span>
                        </div>
                      </div>

                      <span className="shrink-0 font-serif text-lg text-[#C9A15A] sm:text-xl">
                        {dish.price}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* =================================================
            BOTTOM NOTE
        ================================================= */}

        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="font-serif text-lg italic text-white/70">
                Our menu changes with the seasons.
              </p>

              <p className="mt-2 text-[8px] font-bold uppercase tracking-[0.22em] text-white/25">
                Ingredients subject to availability
              </p>
            </div>

            <a
              href="#reservation"
              className="group inline-flex w-fit items-center gap-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#E0BF7A] transition-colors duration-300 hover:text-white"
            >
              <span className="relative pb-2">
                <span className="absolute inset-x-0 bottom-0 h-px bg-[#E0BF7A]/40 transition-colors duration-300 group-hover:bg-white/40" />
                Reserve Your Table
              </span>

              <span className="text-base transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>

        {/* MENU FOOTNOTE */}

        <div className="menu-reveal mt-16 flex items-center gap-4 sm:mt-20">
          <span className="h-px w-12 bg-[#C9A15A]/50" />

          <p className="text-[8px] font-bold uppercase tracking-[0.28em] text-white/20">
            A selection from the Luna Bistro menu
          </p>
        </div>
      </div>

      {/* =====================================================
          MENU MOTION
      ===================================================== */}

      <style jsx>{`
        .menu-reveal {
          opacity: 0;
          transform: translateY(22px);
          animation: menuReveal 0.9s
            cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .menu-title {
          opacity: 0;
          transform: translateY(24px);
          animation: menuTitleReveal 1s
            cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
        }

        .menu-header-line {
          transform: scaleX(0);
          animation: menuLineReveal 0.9s
            cubic-bezier(0.16, 1, 0.3, 1) 0.25s forwards;
        }

        .menu-feature-image {
          animation: menuImageReveal 650ms
            cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .menu-category {
          -webkit-tap-highlight-color: transparent;
        }

        .menu-dish {
          -webkit-tap-highlight-color: transparent;
        }

        @keyframes menuReveal {
          0% {
            opacity: 0;
            transform: translateY(22px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes menuTitleReveal {
          0% {
            opacity: 0;
            transform: translateY(24px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes menuLineReveal {
          0% {
            transform: scaleX(0);
          }

          100% {
            transform: scaleX(1);
          }
        }

        @keyframes menuImageReveal {
          0% {
            opacity: 0;
            transform: scale(1.045);
          }

          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .menu-reveal,
          .menu-title,
          .menu-header-line,
          .menu-feature-image {
            animation: none !important;
          }

          .menu-reveal,
          .menu-title,
          .menu-feature-image {
            opacity: 1 !important;
            transform: none !important;
          }

          .menu-header-line {
            transform: scaleX(1) !important;
          }
        }
      `}</style>
    </section>
  );
}
