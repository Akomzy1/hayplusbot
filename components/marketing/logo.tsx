import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * HayPlusbot wordmark + monogram. Inline SVG, no external assets.
 * Pairs an angular ascending-line glyph (alluding to bullish structure)
 * with the wordmark in Outfit. Sized via the `className` prop.
 */
export function Logo({
  className,
  href = "/",
  monogramOnly = false,
}: {
  className?: string;
  href?: string | null;
  monogramOnly?: boolean;
}) {
  const inner = (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-sans font-semibold tracking-tight text-foreground",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        width="22"
        height="22"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M3 18 L9 12 L13 15 L21 6"
          stroke="hsl(var(--brand-teal))"
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="21" cy="6" r="2" fill="hsl(var(--brand-teal))" />
      </svg>
      {monogramOnly ? null : <span>HayPlusbot</span>}
    </span>
  );

  if (href === null) return inner;
  return (
    <Link href={href} className="inline-flex items-center" aria-label="HayPlusbot home">
      {inner}
    </Link>
  );
}
