import { ArrowRight, ArrowUpRight } from "lucide-react";
import Container from "../ui/Container";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#111110] text-white"
    >
      {/* Background Image */}

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=90')",
        }}
      />

      {/* Overall Dark Overlay */}

      <div className="absolute inset-0 bg-black/40" />

      {/* Strong Left Gradient */}

      <div className="absolute inset-0 bg-gradient-to-r from-[#090909] via-[#090909]/85 to-black/10" />

      {/* Bottom Gradient */}

      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#111110] via-[#111110]/60 to-transparent" />

      {/* Subtle Warm Glow */}

      <div className="pointer-events-none absolute right-[-120px] top-[-120px] h-[520px] w-[520px] rounded-full bg-[#d7bd91]/10 blur-[150px]" />

      {/* Hero Content */}

      <Container className="relative z-10 flex min-h-screen items-center pb-20 pt-28 sm:pb-24 sm:pt-32 lg:pb-28">
        <div className="w-full max-w-6xl">
          {/* Eyebrow */}

          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-10 bg-[#d7bd91]" />

            <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#d7bd91] sm:text-[10px]">
              Clarity. Confidence. Growth.
            </span>
          </div>

          {/* Heading */}

          <h1 className="max-w-5xl text-[3.5rem] font-medium leading-[0.92] tracking-[-0.055em] text-white sm:text-6xl md:text-7xl lg:text-[6.8rem] xl:text-[7.2rem]">
            Elevate your life.
            <br />
            Become your{" "}
            <span className="font-serif italic font-normal text-[#d7bd91]">
              best.
            </span>
          </h1>

          {/* Decorative Line */}

          <div className="mt-9 h-px w-14 bg-[#d7bd91]" />

          {/* Description */}

          <p className="mt-7 max-w-xl text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
            Personalized coaching to help you gain clarity, build confidence,
            and create meaningful progress.
          </p>

          {/* Buttons */}

          <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7">
            {/* Primary */}

            <a
              href="#contact"
              className="group inline-flex items-center gap-4 bg-[#d7bd91] px-8 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[#111110] transition-all duration-300 hover:bg-[#ead6b2]"
            >
              Book a Session

              <ArrowRight
                size={17}
                strokeWidth={1.7}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>

            {/* Secondary */}

            <a
              href="#about"
              className="group inline-flex items-center gap-3 border-b border-[#d7bd91]/60 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:border-[#d7bd91] hover:text-[#d7bd91]"
            >
              Learn More

              <ArrowUpRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>
          </div>

          {/* Trust Points */}

          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/15 pt-6">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d7bd91]" />

              <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/40 sm:text-[10px]">
                1:1 Coaching
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d7bd91]" />

              <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/40 sm:text-[10px]">
                Personal Growth
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d7bd91]" />

              <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/40 sm:text-[10px]">
                Career Development
              </span>
            </div>
          </div>
        </div>
      </Container>

      {/* Scroll Indicator */}

      <div className="absolute bottom-8 right-8 hidden items-center gap-4 lg:flex">
        <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-white/30">
          Scroll to explore
        </span>

        <span className="h-10 w-px bg-white/20" />
      </div>
    </section>
  );
}