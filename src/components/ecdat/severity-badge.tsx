import { cn } from "@/lib/utils";
import type { QuantumStatus, Severity } from "@/lib/ecdat/types";

const map: Record<Severity, string> = {
  critical: "border-critical/40 bg-critical/12 text-critical",
  high: "border-high/40 bg-high/12 text-high",
  medium: "border-medium/40 bg-medium/12 text-medium",
  low: "border-low/40 bg-low/12 text-low",
};

export function SeverityBadge({
  severity,
  label,
  className,
  dot = true,
}: {
  severity: Severity;
  label?: string;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider",
        map[severity],
        className,
      )}
    >
      {dot && <span className={cn("size-1.5 rounded-full", `bg-${severity}`)} style={{ backgroundColor: `var(--${severity})` }} />}
      {label ?? severity}
    </span>
  );
}

const statusMap: Record<QuantumStatus, { label: string; severity: Severity }> = {
  vulnerable: { label: "Vulnerable", severity: "critical" },
  "at-risk": { label: "At risk", severity: "medium" },
  safe: { label: "Safe", severity: "low" },
  "pqc-ready": { label: "PQC ready", severity: "low" },
};

export function QuantumStatusBadge({ status }: { status: QuantumStatus }) {
  const s = statusMap[status];
  return <SeverityBadge severity={s.severity} label={s.label} />;
}

export function RiskScore({ score }: { score: number }) {
  const severity: Severity =
    score >= 85 ? "critical" : score >= 70 ? "high" : score >= 45 ? "medium" : "low";
  return (
    <span className="inline-flex items-center gap-2 font-mono text-sm">
      <span className="h-1.5 w-14 overflow-hidden rounded-full bg-muted">
        <span
          className="block h-full rounded-full"
          style={{ width: `${score}%`, backgroundColor: `var(--${severity})` }}
        />
      </span>
      <span style={{ color: `var(--${severity})` }}>{score}</span>
    </span>
  );
}
