import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full px-7 py-3.5 font-semibold transition-all duration-300 focus:outline-none";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-500 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/30",

    secondary:
      "border border-white/10 bg-transparent text-white hover:border-blue-500 hover:text-blue-400",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}