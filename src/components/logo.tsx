import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  href?: string;
  size?: "xs" | "sm" | "md" | "lg";
}

const sizeClasses = {
  xs: "h-6 min-h-6",
  sm: "h-8 min-h-8",
  md: "h-10 min-h-10",
  lg: "h-12 min-h-12",
};

// Dark mode logo (rexlight.png) rendered one step smaller
const darkModeSizeClasses = {
  xs: "h-5 min-h-5",
  sm: "h-6 min-h-6",
  md: "h-8 min-h-8",
  lg: "h-10 min-h-10",
};

export function Logo({ className, href = "/", size = "md" }: LogoProps) {
  const imageClass = cn(sizeClasses[size], "w-auto object-contain object-left", className);
  const darkImageClass = cn(darkModeSizeClasses[size], "w-auto object-contain object-left", className);

  const content = (
    <>
      {/* Light mode: rexdark.png */}
      <img
        src="/rexdark.png"
        alt="Rex"
        className={cn(imageClass, "dark:hidden")}
      />
      {/* Dark mode: rexlight.png (smaller) */}
      <img
        src="/rexlight.png"
        alt="Rex"
        className={cn(darkImageClass, "hidden dark:block")}
      />
    </>
  );

  if (href) {
    return (
      <Link href={href} className="flex items-center min-w-0 shrink-0">
        {content}
      </Link>
    );
  }

  return <div className="flex items-center min-w-0 shrink-0">{content}</div>;
}
