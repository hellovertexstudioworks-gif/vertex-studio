import {
  ShieldCheck,
  Award,
  Users,
  Clock3,
  Wrench,
  ArrowUpRight,
} from "lucide-react";

const reasons = [
  {
    number: "01",
    icon: ShieldCheck,
    title: "Safety First",
    description:
      "Every project follows strict safety practices to protect our team, our clients, and every person on site.",
  },
  {
    number: "02",
    icon: Award,
    title: "Proven Quality",
    description:
      "We combine experienced craftsmanship with quality materials to deliver work built to last.",
  },
  {
    number: "03",
    icon: Users,
    title: "Experienced Team",
    description:
      "Our skilled professionals bring practical knowledge and attention to detail to every project.",
  },
  {
    number: "04",
    icon: Clock3,
    title: "Reliable Delivery",
    description:
      "Clear planning and project coordination keep your build moving toward completion on schedule.",
  },
  {
    number: "05",
    icon: Wrench,
    title: "Built To Last",
    description:
      "We don't just focus on finishing the job. We focus on creating results that stand the test of time.",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      id="why-us"
      className="relative overflow-hidden bg-[#f4f4f1] text-slate-950"
    >
      {/* =====================================================
          BACKGROUND DETAILS
      ===================================================== */}

      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-orange-500/[0.035] blur-3xl" />

      <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-slate-300" />

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">

          {/* LEFT */}

          <div>
            {/* Eyebrow */}

            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-orange-500" />

              <span className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">
                Why ForgeBuild
              </span>
            </div>

            {/* Heading */}

            <h2 className="max-w-xl text-5xl font-black uppercase leading-[0.88] tracking-[-0.045em] text-slate-950 sm:text-6xl lg:text-7xl">
              Built On
              <br />
              More Than
              <br />
              <span className="text-orange-500">
                Concrete.
              </span>
            </h2>
          </div>

          {/* RIGHT */}

          <div className="lg:justify-self-end">
            <p className="max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              Great construction starts with trust. We bring
              experience, discipline, communication, and
              craftsmanship to every project we take on.
            </p>

            <div className="mt-7 flex items-center gap-3">
              <span className="h-2 w-2 bg-orange-500" />

              <span className="text-xs font-black uppercase tracking-[0.15em] text-slate-400">
                Our standard
              </span>
            </div>
          </div>
        </div>

        {/* =====================================================
            REASONS
        ===================================================== */}

        <div className="mt-16 border-t border-slate-300">

          {reasons.map((reason) => {
            const Icon = reason.icon;

            return (
              <div
                key={reason.number}
                className="group relative grid overflow-hidden border-b border-slate-300 transition-all duration-500 sm:grid-cols-[80px_70px_1fr_50px] sm:items-center"
              >
                {/* =================================================
                    HOVER BACKGROUND
                ================================================= */}

                <div className="absolute inset-0 -translate-x-full bg-[#111415] transition-transform duration-500 ease-out group-hover:translate-x-0" />

                {/* =================================================
                    NUMBER
                ================================================= */}

                <div className="relative z-10 px-0 py-8 sm:px-5">
                  <span className="text-xs font-black tracking-[0.18em] text-orange-500">
                    {reason.number}
                  </span>
                </div>

                {/* =================================================
                    ICON
                ================================================= */}

                <div className="relative z-10 py-8">
                  <div className="flex h-14 w-14 items-center justify-center border border-slate-300 bg-white transition-all duration-300 group-hover:border-orange-500 group-hover:bg-orange-500">
                    <Icon
                      size={23}
                      strokeWidth={1.8}
                      className="text-slate-900 transition-colors duration-300 group-hover:text-white"
                    />
                  </div>
                </div>

                {/* =================================================
                    CONTENT
                ================================================= */}

                <div className="relative z-10 py-8 sm:px-6">

                  <h3 className="text-xl font-black uppercase tracking-tight text-slate-950 transition-colors duration-300 group-hover:text-white sm:text-2xl">
                    {reason.title}
                  </h3>

                  <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500 transition-colors duration-300 group-hover:text-white/55 sm:text-base">
                    {reason.description}
                  </p>
                </div>

                {/* =================================================
                    ARROW
                ================================================= */}

                <div className="relative z-10 hidden sm:block">
                  <div className="flex h-11 w-11 items-center justify-center border border-slate-300 text-slate-400 transition-all duration-300 group-hover:border-orange-500 group-hover:bg-orange-500 group-hover:text-white">
                    <ArrowUpRight
                      size={18}
                      className="transition-transform duration-300 group-hover:rotate-45"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* =====================================================
            BOTTOM STATEMENT
        ===================================================== */}

        <div className="mt-12 grid gap-6 border-t border-slate-300 pt-8 sm:grid-cols-2 sm:items-center">

          {/* LEFT */}

          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center bg-orange-500">
              <ShieldCheck
                size={20}
                className="text-white"
              />
            </div>

            <div>
              <p className="text-sm font-black uppercase tracking-tight text-slate-950">
                One team. One standard.
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Quality from foundation to finish.
              </p>
            </div>
          </div>

          {/* RIGHT */}

          <div className="sm:justify-self-end">
            <div className="flex items-center gap-3">
              <span className="text-xs font-black uppercase tracking-[0.15em] text-slate-400">
                Quality
              </span>

              <span className="h-px w-12 bg-orange-500" />

              <span className="text-xs font-black uppercase tracking-[0.15em] text-slate-950">
                Trust
              </span>

              <span className="h-px w-12 bg-orange-500" />

              <span className="text-xs font-black uppercase tracking-[0.15em] text-slate-950">
                Results
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}