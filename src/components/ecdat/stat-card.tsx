import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { useCountUp } from "@/hooks/use-count-up";
import { cn } from "@/lib/utils";
import type { Severity } from "@/lib/ecdat/types";

export interface StatCardProps {
  label: string;
  value: number;
  suffix?: string;
  status?: string;
  severity?: Severity;
  trend: number;
  trendGood?: "up" | "down";
  icon: LucideIcon;
  spark: number[];
  onClick?: () => void;
}

export function StatCard({
  label,
  value,
  suffix,
  status,
  severity = "low",
  trend,
  trendGood = "down",
  icon: Icon,
  spark,
  onClick,
}: StatCardProps) {
  const animated = useCountUp(value);
  const data = spark.map((v, i) => ({ i, v }));
  const positive = trend >= 0;
  const good = positive ? trendGood === "up" : trendGood === "down";

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "panel group relative overflow-hidden p-4 text-left transition-all hover:-translate-y-0.5 hover:glow-primary",
        onClick ? "cursor-pointer" : "cursor-default",
      )}
    >
      <div
        className="pointer-events-none absolute -right-10 -top-14 size-32 rounded-full opacity-[0.14] blur-2xl transition-opacity group-hover:opacity-25"
        style={{ background: `var(--${severity})` }}
      />
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            className="grid size-8 place-items-center rounded-md border"
            style={{ borderColor: `var(--${severity})`, color: `var(--${severity})` }}
          >
            <Icon className="size-4" />
          </span>
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </span>
        </div>
        {status && (
          <span
            className="rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
            style={{ borderColor: `var(--${severity})`, color: `var(--${severity})` }}
          >
            {status}
          </span>
        )}
      </div>

      <div className="mt-3 flex items-end justify-between gap-3">
        <div>
          <div className="font-mono text-3xl font-semibold tabular-nums">
            {animated.toLocaleString("en-US")}
            {suffix && <span className="text-base text-muted-foreground">{suffix}</span>}
          </div>
          <div
            className={cn(
              "mt-1 flex items-center gap-1 text-xs font-medium",
              good ? "text-low" : "text-critical",
            )}
          >
            {positive ? (
              <ArrowUpRight className="size-3.5" />
            ) : (
              <ArrowDownRight className="size-3.5" />
            )}
            {Math.abs(trend)}% vs last month
          </div>
        </div>
        <div className="h-12 w-24 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id={`sp-${label.replace(/\s/g, "")}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={`var(--${severity})`} stopOpacity={0.5} />
                  <stop offset="100%" stopColor={`var(--${severity})`} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke={`var(--${severity})`}
                strokeWidth={1.6}
                fill={`url(#sp-${label.replace(/\s/g, "")})`}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </button>
  );
}
