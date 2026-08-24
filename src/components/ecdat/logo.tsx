import { cn } from "@/lib/utils";

export function EcdatLogo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span className="relative grid size-8 shrink-0 place-items-center rounded-md border border-primary/40 bg-primary/10">
        <svg viewBox="0 0 24 24" className="size-4.5 text-primary" aria-hidden>
          <path
            d="M12 2.5 4.5 5.8v6.1c0 4.6 3.1 8.2 7.5 9.6 4.4-1.4 7.5-5 7.5-9.6V5.8L12 2.5Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="11" r="2.1" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 13.1v4.2M9.9 9.9 7.6 8.6M14.1 9.9l2.3-1.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </span>
      {showWordmark && (
        <span className="leading-tight">
          <span className="block text-sm font-bold tracking-[0.18em]">ECDAT</span>
          <span className="block text-[10px] uppercase tracking-wider text-muted-foreground">
            Quantum Readiness
          </span>
        </span>
      )}
    </span>
  );
}
