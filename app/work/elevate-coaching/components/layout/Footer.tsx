import { ArrowUpRight, Mail } from "lucide-react";
import Container from "../ui/Container";

const navigation = [
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Process", href: "#process" },
  { label: "Results", href: "#results" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#111110] text-white">
      <Container>
        {/* Main Footer */}

        <div className="grid gap-14 border-b border-white/10 py-16 sm:py-20 lg:grid-cols-[1.3fr_0.7fr_0.7fr] lg:gap-20 lg:py-24">
          {/* Brand */}

          <div>
            <a
              href="#home"
              className="group inline-flex flex-col leading-none"
            >
              <span className="text-3xl font-semibold tracking-[-0.055em] text-white transition-colors duration-300 group-hover:text-[#d7bd91] sm:text-4xl">
                ELEVATE
              </span>

              <span className="mt-2 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.32em] text-[#d7bd91]/55">
                <span className="h-px w-5 bg-[#d7bd91]/50" />

                COACHING

                <span className="h-px w-5 bg-[#d7bd91]/50" />
              </span>
            </a>

            <p className="mt-7 max-w-md text-sm leading-7 text-white/35">
              Helping ambitious people create clarity, build confidence, and
              make meaningful progress in their lives and careers.
            </p>

            <a
              href="#contact"
              className="group mt-8 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#d7bd91] transition-colors duration-300 hover:text-white"
            >
              Start Your Journey

              <ArrowUpRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>
          </div>

          {/* Navigation */}

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">
              Explore
            </p>

            <nav className="mt-6 flex flex-col gap-4">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="group flex w-fit items-center gap-2 text-sm text-white/50 transition-colors duration-300 hover:text-white"
                >
                  <span>{item.label}</span>

                  <ArrowUpRight
                    size={12}
                    strokeWidth={1.5}
                    className="opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                </a>
              ))}
            </nav>
          </div>

          {/* Connect */}

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">
              Connect
            </p>

            <div className="mt-6 flex flex-col gap-4">
              {/* Email */}

              <a
                href="mailto:hello@elevatecoaching.com"
                className="group flex items-center gap-3 text-sm text-white/50 transition-colors duration-300 hover:text-white"
              >
                <Mail
                  size={16}
                  strokeWidth={1.4}
                  className="text-[#d7bd91]"
                />

                <span>Email Us</span>

                <ArrowUpRight
                  size={13}
                  strokeWidth={1.5}
                  className="opacity-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100"
                />
              </a>

              {/* Instagram */}

              <a
                href="#"
                className="group flex items-center gap-3 text-sm text-white/50 transition-colors duration-300 hover:text-white"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-[4px] border border-[#d7bd91]/60 text-[7px] font-bold text-[#d7bd91]">
                  IG
                </span>

                <span>Instagram</span>

                <ArrowUpRight
                  size={13}
                  strokeWidth={1.5}
                  className="opacity-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100"
                />
              </a>

              {/* LinkedIn */}

              <a
                href="#"
                className="group flex items-center gap-3 text-sm text-white/50 transition-colors duration-300 hover:text-white"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-[3px] border border-[#d7bd91]/60 text-[7px] font-bold text-[#d7bd91]">
                  in
                </span>

                <span>LinkedIn</span>

                <ArrowUpRight
                  size={13}
                  strokeWidth={1.5}
                  className="opacity-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="flex flex-col gap-5 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-white/20">
            © 2026 Elevate Coaching. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <a
              href="#"
              className="text-[9px] font-medium uppercase tracking-[0.14em] text-white/20 transition-colors duration-300 hover:text-white/60"
            >
              Privacy
            </a>

            <span className="h-3 w-px bg-white/10" />

            <a
              href="#"
              className="text-[9px] font-medium uppercase tracking-[0.14em] text-white/20 transition-colors duration-300 hover:text-white/60"
            >
              Terms
            </a>
          </div>
        </div>
      </Container>

      {/* Bottom Accent */}

      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#d7bd91]/30 to-transparent" />
    </footer>
  );
}