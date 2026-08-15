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
    title: "Licensed Professionals",
    description: "Fully licensed and insured team",
  },
  {
    icon: HardHat,
    title: "Safety First",
    description: "We prioritize safety in every project",
  },
  {
    icon: Layers3,
    title: "Quality Materials",
    description: "We use only the best materials",
  },
  {
    icon: Clock3,
    title: "On-Time Delivery",
    description: "Committed to meeting deadlines",
  },
  {
    icon: Building2,
    title: "Commercial & Residential",
    description: "We handle projects of all sizes",
  },
];

export default function Trust() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-12 text-center">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-900">
            Trusted Construction Partner
          </p>
        </div>

        {/* Trust Items */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
          {trustItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`group flex items-start gap-4 px-4 lg:px-7 ${
                  index !== trustItems.length - 1
                    ? "lg:border-r lg:border-slate-200"
                    : ""
                }`}
              >
                {/* Icon */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center">
                  <Icon
                    size={30}
                    strokeWidth={1.8}
                    className="text-orange-500 transition-transform duration-300 group-hover:-translate-y-1"
                  />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-sm font-black uppercase leading-5 tracking-tight text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {item.description}
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