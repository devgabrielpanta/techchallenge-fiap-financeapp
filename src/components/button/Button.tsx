import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = "primary",
  size = "md",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center rounded-[var(--radius-md)] font-sans font-medium transition-colors duration-[var(--transition-base)] focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer";

  const variants: Record<string, string> = {
    primary:
      "bg-[var(--color-primary)] text-[var(--color-white)] hover:bg-[var(--color-secondary)] focus:ring-[var(--color-primary)]",
    secondary:
      "bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-elements)] focus:ring-[var(--color-primary)]",
    danger:
      "bg-[var(--color-error)] text-[var(--color-white)] hover:bg-[#b91c1c] focus:ring-[var(--color-error)]",
  };

  const sizes: Record<string, string> = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {props.children}
    </button>
  );
};
