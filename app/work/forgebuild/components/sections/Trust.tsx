import {
  ShieldCheck,
  HardHat,
  Layers3,
  Clock3,
  Building2,
} from "lucide-react";

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Quality Focused",
    description: "Built around quality workmanship and attention to detail",
  },
  {
    icon: HardHat,
    title: "Safety Minded",
    description: "A project-first approach to safe and organized work",
  },
  {
    icon: Layers3,
    title: "Quality Materials",
    description: "Thoughtful material selection for lasting results",
  },
  {
    icon: Clock3,
    title: "Clear Communication",
    description: "Straightforward updates from planning to completion",
  },
  {
    icon: Building2,
    title: "Every Project",
    description: "Residential, commercial, renovation, and more",
  },
];

export default function Trust() {
  return (
    <section className="relative overflow-hidden bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* =====================================================
            SECTION INTRO
        ===================================================== */}

        <div className="mb-10 flex flex-col gap-4 border-b border-slate-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-orange-500">
              The ForgeBuild Difference
            </p>

            <h2 className="max-w-2xl text-2xl font-black uppercase tracking-[-0.02em] text-slate-950 sm:text-3xl">
              Built around your project.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-slate-500 sm:text-right">
            From the first conversation to the final walkthrough,
            every project is approached with clarity, care, and
            attention to the details that matter.
          </p>
        </div>

        {/* =====================================================
            TRUST ITEMS
        ===================================================== */}

        <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-5">
          {trustItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`group relative px-0 py-6 sm:px-6 lg:px-7 ${
                  index !== trustItems.length - 1
                    ? "border-b border-slate-200 sm:border-b-0 sm:border-r"
                    : ""
                } ${
                  index === 2
                    ? "lg:border-r"
                    : ""
                }`}
              >
                {/* Icon */}

                <div className="mb-5 flex h-11 w-11 items-center justify-center border border-orange-200 bg-orange-50 transition-all duration-300 group-hover:border-orange-500 group-hover:bg-orange-500">
                  <Icon
                    size={22}
                    strokeWidth={1.8}
                    className="text-orange-500 transition-colors duration-300 group-hover:text-white"
                  />
                </div>

                {/* Title */}

                <h3 className="text-sm font-black uppercase leading-5 tracking-tight text-slate-950">
                  {item.title}
                </h3>

                {/* Description */}

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {item.description}
                </p>

                {/* Accent */}

                <div className="mt-5 h-0.5 w-0 bg-orange-500 transition-all duration-300 group-hover:w-10" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}