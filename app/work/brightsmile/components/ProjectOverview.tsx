import {
  Building2,
  Palette,
  Smartphone,
  SearchCheck,
} from "lucide-react";

const details = [
  {
    icon: Building2,
    label: "Industry",
    value: "Healthcare",
  },
  {
    icon: Palette,
    label: "Design",
    value: "Premium & Modern",
  },
  {
    icon: Smartphone,
    label: "Experience",
    value: "Fully Responsive",
  },
  {
    icon: SearchCheck,
    label: "Focus",
    value: "SEO & Conversion",
  },
];

export default function ProjectOverview() {
  return (
    <section className="border-b border-slate-200 bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">

        <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:items-center">

          {/* PROJECT INTRODUCTION */}
          <div>

            {/* Portfolio Label */}
            <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-sm font-semibold text-blue-600">
              Project Overview
            </span>

            {/* Project Title */}
            <h1 className="mt-7 text-4xl font-black leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              BrightSmile
              <span className="block text-blue-600">
                Dental Clinic
              </span>
            </h1>

            {/* Main Description */}
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              A premium dental website concept designed to
              build trust, communicate expertise, and make it
              easy for patients to discover services and book
              appointments.
            </p>

            {/* Project Description */}
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-500">
              This concept combines a clean healthcare aesthetic,
              strong visual hierarchy, modern interactions, and
              responsive layouts to demonstrate how a professional
              dental practice can establish a stronger digital
              presence.
            </p>

            {/* Portfolio Tags */}
            <div className="mt-8 flex flex-wrap gap-2">

              <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-600">
                Web Design
              </span>

              <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-600">
                Development
              </span>

              <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-600">
                Responsive
              </span>

              <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-600">
                SEO
              </span>

            </div>

          </div>

          {/* PROJECT DETAILS */}
          <div className="grid gap-4 sm:grid-cols-2">

            {details.map((detail) => {
              const Icon = detail.icon;

              return (
                <div
                  key={detail.label}
                  className="
                    group
                    rounded-[28px]
                    border
                    border-slate-200
                    bg-slate-50
                    p-6
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-blue-100
                    hover:bg-white
                    hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)]
                  "
                >

                  {/* Icon */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 transition-transform duration-300 group-hover:scale-110">
                    <Icon
                      size={22}
                      strokeWidth={2}
                      className="text-blue-600"
                    />
                  </div>

                  {/* Label */}
                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                    {detail.label}
                  </p>

                  {/* Value */}
                  <p className="mt-2 text-lg font-black tracking-tight text-slate-900">
                    {detail.value}
                  </p>

                </div>
              );
            })}

          </div>

        </div>

      </div>
    </section>
  );
}