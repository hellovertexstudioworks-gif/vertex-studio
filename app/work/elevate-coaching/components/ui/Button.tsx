interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300";

  const variants = {
    primary:
      "bg-[#1c1c1a] text-white hover:bg-[#8b7355] hover:-translate-y-0.5",
    secondary:
      "border border-black/10 bg-white text-[#1c1c1a] hover:border-[#8b7355] hover:text-[#8b7355]",
  };

  const styles = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={styles}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={styles}>
      {children}
    </button>
  );
}