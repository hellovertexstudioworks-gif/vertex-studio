// TASK: Replace the ENTIRE contents of your current Horizon Realty Hero.tsx with this file.
// LOCATION: app/work/horizon-realty/components/sections/Hero.tsx
//
// Upgrade:
// - Premium custom dropdowns instead of browser-native selects
// - Animated dropdown panels
// - Icon-based property type previews
// - Checkmark selected state
// - Click-outside + Escape handling
// - Functional search controls
// - Cinematic entrance animations
// - Responsive/mobile polish
// - Dropdowns reserve extra Hero height when open so they do not cover the bottom bar/next section
// - Dropdown lists remain internally scrollable
// - No custom <style jsx>

"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Home,
  MapPin,
  Search,
} from "lucide-react";

type DropdownOption = {
  label: string;
  description: string;
  icon?: typeof Home;
};

const locations: DropdownOption[] = [
  {
    label: "Any Location",
    description: "Explore properties in all locations",
    icon: MapPin,
  },
  {
    label: "Miami",
    description: "Luxury homes and coastal living",
    icon: MapPin,
  },
  {
    label: "Austin",
    description: "Modern homes and growing communities",
    icon: MapPin,
  },
  {
    label: "New York",
    description: "Urban residences and investment",
    icon: MapPin,
  },
  {
    label: "Los Angeles",
    description: "Premium homes and lifestyle properties",
    icon: MapPin,
  },
  {
    label: "Tampa",
    description: "Waterfront and family properties",
    icon: MapPin,
  },
];

const propertyTypes: DropdownOption[] = [
  {
    label: "Any Property",
    description: "View all property types",
    icon: Home,
  },
  {
    label: "Single Family",
    description: "Houses and family homes",
    icon: Home,
  },
  {
    label: "Condominium",
    description: "Condo units and residences",
    icon: Home,
  },
  {
    label: "Townhouse",
    description: "Multi-level homes",
    icon: Home,
  },
  {
    label: "Luxury Estate",
    description: "Premium and high-end properties",
    icon: Home,
  },
];

const priceRanges: DropdownOption[] = [
  {
    label: "Any Price",
    description: "Explore every available price range",
  },
  {
    label: "Under $500K",
    description: "Properties below $500,000",
  },
  {
    label: "$500K – $1M",
    description: "Properties from $500K to $1M",
  },
  {
    label: "$1M – $2.5M",
    description: "Premium properties up to $2.5M",
  },
  {
    label: "$2.5M+",
    description: "Luxury properties above $2.5M",
  },
];

type DropdownKey = "location" | "propertyType" | "priceRange" | null;

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [searching, setSearching] = useState(false);

  const [location, setLocation] = useState("Any Location");
  const [propertyType, setPropertyType] = useState("Any Property");
  const [priceRange, setPriceRange] = useState("Any Price");

  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);

  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setLoaded(true));

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setOpenDropdown(null);
    setSearching(true);

    window.setTimeout(() => {
      document.getElementById("properties")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      setSearching(false);
    }, 450);
  };

  const toggleDropdown = (dropdown: DropdownKey) => {
    setOpenDropdown((current) => (current === dropdown ? null : dropdown));
  };

  const chooseOption = (
    dropdown: Exclude<DropdownKey, null>,
    value: string,
  ) => {
    if (dropdown === "location") {
      setLocation(value);
    }

    if (dropdown === "propertyType") {
      setPropertyType(value);
    }

    if (dropdown === "priceRange") {
      setPriceRange(value);
    }

    setOpenDropdown(null);
  };

  return (
    <section
      id="home"
      className={`group relative overflow-visible bg-[#111719] transition-[min-height] duration-300 ${
        openDropdown
          ? "min-h-[calc(100vh+170px)] sm:min-h-[calc(100vh+190px)]"
          : "min-h-screen"
      }`}
    >
      {/* =====================================================
          BACKGROUND IMAGE
      ===================================================== */}

      <div
        className={`absolute inset-0 bg-cover bg-center transition-transform duration-[1800ms] ease-out ${
          loaded ? "scale-100" : "scale-[1.06]"
        }`}
        style={{
          backgroundImage: "url('/images/realestate/horizon-hero.jpg')",
        }}
      />

      {/* =====================================================
          CINEMATIC OVERLAYS
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 bg-black/45" />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#071011]/75 via-[#071011]/25 to-[#071011]/90" />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#071011]/45 via-transparent to-[#071011]/20" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#071011] via-[#071011]/60 to-transparent" />

      {/* =====================================================
          DECORATIVE CIRCLES
      ===================================================== */}

      <div
        className={`pointer-events-none absolute -left-32 top-1/3 h-72 w-72 rounded-full border border-[#4FA7A1]/10 transition-all duration-[1800ms] ${
          loaded ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
        }`}
      />

      <div
        className={`pointer-events-none absolute -right-40 top-1/4 h-96 w-96 rounded-full border border-white/[0.06] transition-all duration-[2000ms] ${
          loaded ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
        }`}
      />

      <div className="pointer-events-none absolute left-1/2 top-24 hidden h-px w-24 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#4FA7A1]/40 to-transparent sm:block" />

      {/* =====================================================
          HERO CONTENT
      ===================================================== */}

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-5 pb-44 pt-24 text-center sm:px-8 sm:pt-32 lg:px-10">
        <div className="w-full max-w-5xl">
          {/* EYEBROW */}

          <div
            className={`mb-7 flex items-center justify-center gap-3 transition-all duration-700 sm:mb-8 sm:gap-4 ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <span className="h-px w-7 bg-[#4FA7A1] sm:w-10" />

            <p className="text-[8px] font-bold uppercase tracking-[0.28em] text-[#8BC7C2] sm:text-[10px] sm:tracking-[0.32em]">
              Horizon Realty · Est. 2016
            </p>

            <span className="h-px w-7 bg-[#4FA7A1] sm:w-10" />
          </div>

          {/* MAIN HEADING */}

          <h1
            className={`font-serif text-[clamp(3.45rem,8vw,8rem)] leading-[0.84] tracking-[-0.055em] text-[#F2F3EF] transition-all duration-1000 ease-out ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <span className="inline-block">Find a place</span>

            <br />

            <span className="inline-block italic text-[#7CC3BD] transition-transform duration-700 group-hover:-translate-y-0.5">
              worth coming
            </span>

            <br />

            <span className="inline-block italic text-[#7CC3BD] transition-transform delay-75 duration-700 group-hover:translate-x-1">
              home to.
            </span>
          </h1>

          {/* DESCRIPTION */}

          <p
            className={`mx-auto mt-8 max-w-2xl text-sm leading-7 text-white/65 transition-all delay-150 duration-1000 sm:mt-9 sm:text-base sm:leading-8 ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
          >
            Exceptional properties, thoughtful service, and a better way to
            discover the place you&apos;ll call home.
          </p>

          {/* =================================================
              PREMIUM SEARCH PANEL
          ================================================= */}

          <div
            ref={searchRef}
            className={`relative mx-auto mt-9 max-w-5xl transition-all delay-300 duration-1000 sm:mt-10 ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
          >
            <form
              onSubmit={handleSearch}
              className="relative z-30 border border-white/15 bg-[#F2F3EF] p-1.5 shadow-[0_25px_90px_rgba(0,0,0,0.32)] sm:p-2"
            >
              <div className="grid md:grid-cols-[1fr_1fr_1fr_auto]">
                {/* LOCATION */}

                <div className="relative border-b border-[#111719]/10 md:border-b-0 md:border-r">
                  <button
                    type="button"
                    onClick={() => toggleDropdown("location")}
                    aria-expanded={openDropdown === "location"}
                    className={`group/trigger flex min-h-[70px] w-full items-center gap-3 px-4 py-3 text-left transition-all duration-300 sm:px-5 ${
                      openDropdown === "location"
                        ? "bg-white"
                        : "hover:bg-white/80"
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1F5C5B]/[0.07] text-[#1F5C5B] transition-all duration-300 ${
                        openDropdown === "location"
                          ? "bg-[#1F5C5B] text-white"
                          : "group-hover/trigger:-translate-y-0.5"
                      }`}
                    >
                      <MapPin size={17} strokeWidth={1.8} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-[7px] font-bold uppercase tracking-[0.2em] text-[#111719]/40">
                        Location
                      </span>

                      <span className="mt-1 block truncate text-sm font-medium text-[#111719]">
                        {location}
                      </span>
                    </span>

                    {openDropdown === "location" ? (
                      <ChevronUp
                        size={16}
                        className="shrink-0 text-[#1F5C5B]"
                      />
                    ) : (
                      <ChevronDown
                        size={16}
                        className="shrink-0 text-[#111719]/45 transition-transform duration-300 group-hover/trigger:translate-y-0.5"
                      />
                    )}
                  </button>

                  {openDropdown === "location" && (
                    <DropdownPanel
                      title="Location"
                      options={locations}
                      selected={location}
                      onSelect={(value) => chooseOption("location", value)}
                    />
                  )}
                </div>

                {/* PROPERTY TYPE */}

                <div className="relative border-b border-[#111719]/10 md:border-b-0 md:border-r">
                  <button
                    type="button"
                    onClick={() => toggleDropdown("propertyType")}
                    aria-expanded={openDropdown === "propertyType"}
                    className={`group/trigger flex min-h-[70px] w-full items-center gap-3 px-4 py-3 text-left transition-all duration-300 sm:px-5 ${
                      openDropdown === "propertyType"
                        ? "bg-white"
                        : "hover:bg-white/80"
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1F5C5B]/[0.07] text-[#1F5C5B] transition-all duration-300 ${
                        openDropdown === "propertyType"
                          ? "bg-[#1F5C5B] text-white"
                          : "group-hover/trigger:-translate-y-0.5"
                      }`}
                    >
                      <Home size={17} strokeWidth={1.8} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-[7px] font-bold uppercase tracking-[0.2em] text-[#111719]/40">
                        Property Type
                      </span>

                      <span className="mt-1 block truncate text-sm font-medium text-[#111719]">
                        {propertyType}
                      </span>
                    </span>

                    {openDropdown === "propertyType" ? (
                      <ChevronUp
                        size={16}
                        className="shrink-0 text-[#1F5C5B]"
                      />
                    ) : (
                      <ChevronDown
                        size={16}
                        className="shrink-0 text-[#111719]/45 transition-transform duration-300 group-hover/trigger:translate-y-0.5"
                      />
                    )}
                  </button>

                  {openDropdown === "propertyType" && (
                    <DropdownPanel
                      title="Property Type"
                      options={propertyTypes}
                      selected={propertyType}
                      onSelect={(value) =>
                        chooseOption("propertyType", value)
                      }
                    />
                  )}
                </div>

                {/* PRICE RANGE */}

                <div className="relative border-b border-[#111719]/10 md:border-b-0 md:border-r">
                  <button
                    type="button"
                    onClick={() => toggleDropdown("priceRange")}
                    aria-expanded={openDropdown === "priceRange"}
                    className={`group/trigger flex min-h-[70px] w-full items-center gap-3 px-4 py-3 text-left transition-all duration-300 sm:px-5 ${
                      openDropdown === "priceRange"
                        ? "bg-white"
                        : "hover:bg-white/80"
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1F5C5B]/[0.07] text-[#1F5C5B] transition-all duration-300 ${
                        openDropdown === "priceRange"
                          ? "bg-[#1F5C5B] text-white"
                          : "group-hover/trigger:-translate-y-0.5"
                      }`}
                    >
                      <span className="text-base leading-none">$</span>
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-[7px] font-bold uppercase tracking-[0.2em] text-[#111719]/40">
                        Price Range
                      </span>

                      <span className="mt-1 block truncate text-sm font-medium text-[#111719]">
                        {priceRange}
                      </span>
                    </span>

                    {openDropdown === "priceRange" ? (
                      <ChevronUp
                        size={16}
                        className="shrink-0 text-[#1F5C5B]"
                      />
                    ) : (
                      <ChevronDown
                        size={16}
                        className="shrink-0 text-[#111719]/45 transition-transform duration-300 group-hover/trigger:translate-y-0.5"
                      />
                    )}
                  </button>

                  {openDropdown === "priceRange" && (
                    <DropdownPanel
                      title="Price Range"
                      options={priceRanges}
                      selected={priceRange}
                      onSelect={(value) => chooseOption("priceRange", value)}
                    />
                  )}
                </div>

                {/* SEARCH BUTTON */}

                <button
                  type="submit"
                  disabled={searching}
                  className="group/search flex min-h-[70px] items-center justify-center gap-3 bg-[#1F5C5B] px-7 text-[9px] font-bold uppercase tracking-[0.2em] text-[#F2F3EF] transition-all duration-300 hover:bg-[#28706E] disabled:cursor-wait disabled:opacity-80 sm:px-8"
                >
                  <Search
                    size={16}
                    strokeWidth={2}
                    className={`transition-transform duration-500 ${
                      searching
                        ? "rotate-90"
                        : "group-hover/search:scale-110"
                    }`}
                  />

                  <span>{searching ? "Searching" : "Search"}</span>

                  <ArrowRight
                    size={15}
                    strokeWidth={1.8}
                    className="transition-transform duration-300 group-hover/search:translate-x-1"
                  />
                </button>
              </div>
            </form>

            {/* SEARCH SUMMARY */}

            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[7px] uppercase tracking-[0.18em] text-white/35">
              <span>{location}</span>
              <span className="h-1 w-1 rounded-full bg-[#4FA7A1]" />
              <span>{propertyType}</span>
              <span className="h-1 w-1 rounded-full bg-[#4FA7A1]" />
              <span>{priceRange}</span>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM INFORMATION BAR
      ===================================================== */}

      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-[#071011]/15 backdrop-blur-[2px]">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-2.5 sm:px-8 sm:py-3 lg:px-10">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="h-6 w-px bg-[#4FA7A1] sm:h-7" />

            <p className="text-[6px] font-medium uppercase tracking-[0.16em] text-white/40 sm:text-[8px] sm:tracking-[0.2em]">
              Curated Properties · Thoughtful Service
            </p>
          </div>

          <a
            href="#properties"
            className="group hidden items-center gap-3 text-[8px] font-bold uppercase tracking-[0.2em] text-[#8BC7C2] transition-colors duration-300 hover:text-white sm:flex"
          >
            <span>Explore</span>

            <ArrowDown
              size={15}
              strokeWidth={1.8}
              className="transition-transform duration-300 group-hover:translate-y-1"
            />
          </a>
        </div>
      </div>

      {/* MOBILE SCROLL CUE */}

      <a
        href="#properties"
        aria-label="Explore properties"
        className="absolute bottom-16 left-1/2 z-20 flex -translate-x-1/2 items-center justify-center sm:hidden"
      >
        <span className="flex h-9 w-9 animate-bounce items-center justify-center rounded-full border border-white/15 bg-black/20 text-[#8BC7C2] backdrop-blur-sm">
          <ArrowDown size={15} />
        </span>
      </a>
    </section>
  );
}

// Dropdowns are internally scrollable so the hero never traps the page scroll.
function DropdownPanel({
  title,
  options,
  selected,
  onSelect,
}: {
  title: string;
  options: DropdownOption[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-[70] origin-top text-left">
      <div className="max-h-[165px] overflow-y-auto overscroll-contain rounded-[2px] border border-[#111719]/10 bg-[#FDFDFB] p-2 shadow-[0_25px_70px_rgba(7,16,17,0.22)] [scrollbar-width:thin] [scrollbar-color:#1F5C5B33_transparent] animate-in fade-in slide-in-from-top-2 duration-200 sm:max-h-[180px]">
        <div className="px-3 pb-2 pt-2">
          <p className="text-[8px] font-bold uppercase tracking-[0.22em] text-[#111719]/40">
            {title}
          </p>
        </div>

        <div className="space-y-1">
          {options.map((option) => {
            const Icon = option.icon ?? Home;
            const isSelected = selected === option.label;

            return (
              <button
                key={option.label}
                type="button"
                onClick={() => onSelect(option.label)}
                className={`group/option flex w-full items-center gap-3 rounded-[2px] px-2.5 py-1.5 text-left transition-all duration-200 ${
                  isSelected
                    ? "bg-[#E8F2F1] text-[#1F5C5B]"
                    : "text-[#111719] hover:bg-[#F1F5F4]"
                }`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-md border transition-all duration-200 ${
                    isSelected
                      ? "border-[#1F5C5B]/15 bg-white"
                      : "border-[#111719]/[0.06] bg-[#F4F5F2] group-hover/option:border-[#1F5C5B]/10 group-hover/option:bg-white"
                  }`}
                >
                  <Icon
                    size={17}
                    strokeWidth={1.7}
                    className={
                      isSelected
                        ? "text-[#1F5C5B]"
                        : "text-[#111719]/45 transition-colors group-hover/option:text-[#1F5C5B]"
                    }
                  />
                </span>

                <span className="min-w-0 flex-1">
                  <span
                    className={`block text-sm leading-5 ${
                      isSelected ? "font-semibold" : "font-medium"
                    }`}
                  >
                    {option.label}
                  </span>

                  <span
                    className={`mt-0.5 block truncate text-[10px] leading-4 ${
                      isSelected
                        ? "text-[#1F5C5B]/60"
                        : "text-[#111719]/40"
                    }`}
                  >
                    {option.description}
                  </span>
                </span>

                {isSelected && (
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1F5C5B] text-white">
                    <Check size={13} strokeWidth={2.5} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
