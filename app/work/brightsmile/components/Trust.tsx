import {
  ShieldCheck,
  Star,
  Smile,
  CalendarCheck,
  Stethoscope,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "15+ Years",
    subtitle: "Trusted Experience",
  },
  {
    icon: Star,
    title: "4.9 Rating",
    subtitle: "Patient Reviews",
  },
  {
    icon: Smile,
    title: "12K+",
    subtitle: "Happy Patients",
  },
  {
    icon: CalendarCheck,
    title: "Same-Day",
    subtitle: "Appointments",
  },
  {
    icon: Stethoscope,
    title: "Modern",
    subtitle: "Technology",
  },
];

export default function Trust() {
  return (
    <section className="border-y border-slate-100 bg-slate-50/70">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:py-12">

        <div className="grid grid-cols-2 divide-x divide-slate-200 sm:grid-cols-3 lg:grid-cols-5">

          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`
                  group
                  flex
                  items-center
                  justify-center
                  px-4
                  py-5
                  text-center
                  transition-all
                  duration-300
                  hover:bg-white

                  ${
                    index === 3
                      ? "col-span-2 sm:col-span-1"
                      : ""
                  }
                `}
              >
                <div className="flex flex-col items-center">

                  {/* Icon */}
                  <div className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-2xl
                    bg-blue-50
                    transition-transform
                    duration-300
                    group-hover:scale-105
                  ">
                    <Icon
                      size={20}
                      strokeWidth={2.2}
                      className="text-blue-600"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="
                    mt-3
                    text-sm
                    font-black
                    tracking-tight
                    text-slate-900
                    sm:text-base
                  ">
                    {item.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="
                    mt-1
                    text-xs
                    font-medium
                    text-slate-500
                  ">
                    {item.subtitle}
                  </p>

                </div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}