import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "accent" | "outlineLight";
type Size = "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 will-change-transform hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0";

const variants: Record<Variant, string> = {
  primary:
    "border-2 border-night bg-emerald text-night shadow-[4px_4px_0_#123626] hover:bg-emerald-bright",
  secondary:
    "border-2 border-night bg-white text-forest-deep shadow-[4px_4px_0_#9985DC] hover:text-forest",
  ghost: "bg-transparent text-forest-deep hover:bg-mist",
  accent:
    "border-2 border-night bg-gold text-night shadow-[4px_4px_0_#9985DC] hover:bg-gold-light",
  outlineLight:
    "bg-white/5 text-white ring-1 ring-inset ring-white/20 hover:bg-white/10 hover:ring-white/40",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm min-h-[44px]",
  lg: "px-6 py-3.5 text-[0.95rem] min-h-[50px]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">;

type ButtonAsButton = CommonProps & {
  href?: undefined;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">;

type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children, ...rest } =
    props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (rest.href !== undefined) {
    const { external, ...anchorProps } = rest as Omit<
      ButtonAsLink,
      "variant" | "size" | "className" | "children"
    >;

    if (external) {
      return (
        <a
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          {...anchorProps}
        >
          {children}
        </a>
      );
    }

    return (
      <Link className={classes} {...anchorProps}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      {...(rest as Omit<
        ButtonAsButton,
        "variant" | "size" | "className" | "children"
      >)}
    >
      {children}
    </button>
  );
}
