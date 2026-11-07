import { cn } from "@/lib/cn";

/** Hairline divider with a diamond at its heart, like an in-game menu rule. */
export function Ornament({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-3", className)} aria-hidden>
      <span className="hairline w-24 sm:w-40" />
      <span className="size-1 rotate-45 bg-gold-400/60" />
      <span className="size-2 rotate-45 border border-gold-300/80" />
      <span className="size-1 rotate-45 bg-gold-400/60" />
      <span className="hairline w-24 sm:w-40" />
    </div>
  );
}
