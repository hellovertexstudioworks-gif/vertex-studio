interface SectionTitleProps {
  badge?: string;
  title: string;
  highlight?: string;
  description?: string;
  center?: boolean;
}

export default function SectionTitle({
  badge,
  title,
  highlight,
  description,
  center = true,
}: SectionTitleProps) {
  return (
    <div className={`${center ? "text-center" : "text-left"} mb-16`}>
      {badge && (
        <span className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
          {badge}
        </span>
      )}

      <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
        {title}{" "}
        {highlight && (
          <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            {highlight}
          </span>
        )}
      </h2>

      {description && (
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
          {description}
        </p>
      )}
    </div>
  );
}