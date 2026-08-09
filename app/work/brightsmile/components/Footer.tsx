import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
  Clock3,
  ArrowUpRight,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#050816] text-white">

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-20">

        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">

          {/* Brand */}
          <div>
            <Link
              href="/work/brightsmile"
              className="group inline-flex items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-xl transition-transform duration-300 group-hover:scale-105">
                🦷
              </div>

              <div>
                <span className="block text-xl font-black">
                  BrightSmile
                </span>

                <span className="text-xs font-medium text-slate-400">
                  Dental Care
                </span>
              </div>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-slate-400">
              Modern dentistry with compassionate care,
              advanced technology, and personalized treatment
              designed around your smile.
            </p>

            {/* Social Links */}
            <div className="mt-7 flex gap-3">

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-sm font-bold text-slate-400 transition hover:bg-blue-600 hover:text-white"
              >
                f
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-sm font-bold text-slate-400 transition hover:bg-blue-600 hover:text-white"
              >
                ig
              </a>

              <a
                href="mailto:hello@brightsmile.com"
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-sm font-bold text-slate-400 transition hover:bg-blue-600 hover:text-white"
              >
                @
              </a>

            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Explore
            </h3>

            <ul className="mt-6 space-y-4">

              <li>
                <Link
                  href="/work/brightsmile#about"
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/work/brightsmile#services"
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  Our Services
                </Link>
              </li>

              <li>
                <Link
                  href="/work/brightsmile#why-choose-us"
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  Why Choose Us
                </Link>
              </li>

              <li>
                <Link
                  href="/work/brightsmile#contact"
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  Book Appointment
                </Link>
              </li>

            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Contact
            </h3>

            <div className="mt-6 space-y-5">

              <div className="flex gap-3">
                <MapPin
                  size={19}
                  className="mt-0.5 shrink-0 text-blue-500"
                />

                <p className="text-sm leading-6 text-slate-400">
                  123 Smile Avenue
                  <br />
                  Downtown, Your City
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone
                  size={18}
                  className="shrink-0 text-blue-500"
                />

                <p className="text-sm text-slate-400">
                  (555) 123-4567
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Mail
                  size={18}
                  className="shrink-0 text-blue-500"
                />

                <p className="text-sm text-slate-400">
                  hello@brightsmile.com
                </p>
              </div>

            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Office Hours
            </h3>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">

              <div className="flex gap-3">

                <Clock3
                  size={20}
                  className="mt-0.5 shrink-0 text-blue-500"
                />

                <div className="space-y-3 text-sm">

                  <div>
                    <p className="font-semibold text-white">
                      Monday – Friday
                    </p>

                    <p className="mt-1 text-slate-400">
                      8:00 AM – 6:00 PM
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-white">
                      Saturday
                    </p>

                    <p className="mt-1 text-slate-400">
                      9:00 AM – 3:00 PM
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-white">
                      Sunday
                    </p>

                    <p className="mt-1 text-slate-400">
                      Closed
                    </p>
                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-14 border-t border-white/10 pt-7">

          <div className="flex flex-col gap-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">

            <p>
              © {new Date().getFullYear()} BrightSmile Dental.
              All rights reserved.
            </p>

            <div className="flex flex-wrap gap-6">

              <a
                href="#"
                className="transition hover:text-white"
              >
                Privacy Policy
              </a>

              <a
                href="#"
                className="transition hover:text-white"
              >
                Terms of Service
              </a>

              {/* Back to Vertex */}
              <Link
                href="/"
                className="group inline-flex items-center gap-1 font-semibold text-blue-400 transition hover:text-blue-300"
              >
                Vertex Studio
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}