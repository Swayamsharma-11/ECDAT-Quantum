import { Link } from "@tanstack/react-router";
import { CheckCircle2, Loader2, Play, RotateCcw, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { ScanStep } from "@/lib/ecdat/types";

export interface ScanResult {
  filesScanned: number;
  assetsFound: number;
  critical: number;
  high: number;
}

export function ScanRunner({
  steps,
  target,
  result,
  ctaLabel = "Start cryptographic scan",
}: {
  steps: ScanStep[];
  target: string;
  result: ScanResult;
  ctaLabel?: string;
}) {
  const [state, setState] = useState<"idle" | "running" | "done">("idle");
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (state !== "running") return;
    if (step >= steps.length) {
      const t = setTimeout(() => setState("done"), 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep((s) => s + 1), 850);
    return () => clearTimeout(t);
  }, [state, step, steps.length]);

  const progress = state === "done" ? 100 : Math.round((step / steps.length) * 100);

  if (state === "idle") {
    return (
      <div className="panel flex flex-col items-start gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold">Ready to scan</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Target: <span className="font-mono text-primary">{target}</span> · read-only analysis,
            no credentials required in demo mode.
          </p>
        </div>
        <Button
          size="lg"
          className="gap-2"
          onClick={() => {
            setStep(0);
            setState("running");
          }}
        >
          <Play className="size-4" /> {ctaLabel}
        </Button>
      </div>
    );
  }

  if (state === "running") {
    return (
      <div className="panel p-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold">Scanning {target}</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Step {Math.min(step + 1, steps.length)} of {steps.length}
            </p>
          </div>
          <span className="font-mono text-2xl font-semibold text-primary">{progress}%</span>
        </div>

        <Progress value={progress} className="mt-4 h-1.5" />

        <ol className="mt-5 space-y-2.5">
          {steps.map((s, i) => {
            const done = i < step;
            const active = i === step;
            return (
              <li
                key={s.label}
                className={cn(
                  "flex items-start gap-3 rounded-md border px-3 py-2.5 transition-all",
                  active
                    ? "border-primary/50 bg-primary/5"
                    : done
                      ? "border-border"
                      : "border-border/50 opacity-50",
                )}
              >
                {done ? (
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-low" />
                ) : active ? (
                  <Loader2 className="mt-0.5 size-4 shrink-0 animate-spin text-primary" />
                ) : (
                  <span className="mt-1.5 size-2 shrink-0 rounded-full bg-muted" />
                )}
                <div>
                  <p className="text-sm font-medium">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.detail}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }

  return (
    <div className="panel p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <CheckCircle2 className="size-5 text-low" />
          <div>
            <h2 className="text-sm font-semibold">Scan complete</h2>
            <p className="text-xs text-muted-foreground">
              {target} · CBOM updated and quantum risk recalculated
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => {
            setStep(0);
            setState("idle");
          }}
        >
          <RotateCcw className="size-4" /> Run again
        </Button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-4">
        {[
          { k: "Files scanned", v: result.filesScanned.toLocaleString("en-US"), c: "text-foreground" },
          { k: "Crypto assets discovered", v: result.assetsFound.toLocaleString("en-US"), c: "text-primary" },
          { k: "Critical findings", v: String(result.critical), c: "text-critical" },
          { k: "High findings", v: String(result.high), c: "text-high" },
        ].map((s) => (
          <div key={s.k} className="rounded-lg border border-border p-4">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{s.k}</p>
            <p className={cn("mt-1 font-mono text-2xl font-semibold", s.c)}>{s.v}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button asChild size="sm" className="gap-2">
          <Link to="/app/inventory">
            <ShieldAlert className="size-4" /> Review discovered assets
          </Link>
        </Button>
        <Button asChild size="sm" variant="outline">
          <Link to="/app/cbom">View generated CBOM</Link>
        </Button>
        <Button asChild size="sm" variant="outline">
          <Link to="/app/quantum-risk">Quantum risk analysis</Link>
        </Button>
        <Button asChild size="sm" variant="ghost">
          <Link to="/app/reports">Generate report</Link>
        </Button>
      </div>
    </div>
  );
}
