interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionTitle({
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
}: SectionTitleProps) {
  const alignment =
    align === "center"
      ? "mx-auto text-center items-center"
      : "text-left items-start";

  return (
    <div className={`flex max-w-3xl flex-col ${alignment}`}>
      {eyebrow && (
        <span className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#8b7355]">
          {eyebrow}
        </span>
      )}

      <h2 className="text-4xl font-semibold leading-tight tracking-[-0.03em] text-[#1c1c1a] sm:text-5xl lg:text-6xl">
        {title}
        {highlight && (
          <>
            <br />
            <span className="text-[#8b7355]">{highlight}</span>
          </>
        )}
      </h2>

      {description && (
        <p className="mt-6 max-w-2xl text-base leading-8 text-[#6f6b63] sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}