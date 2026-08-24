import { createFileRoute } from "@tanstack/react-router";
import { AlertOctagon, Clock, Download, Timer, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import { PageHeader } from "@/components/ecdat/page-header";
import { AssetDetailSheet } from "@/components/ecdat/asset-detail-sheet";
import { SeverityBadge } from "@/components/ecdat/severity-badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cryptoAssets, mosca, moscaTimeline } from "@/lib/ecdat/data";
import { downloadJson } from "@/lib/ecdat/format";
import type { CryptographicAsset } from "@/lib/ecdat/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/quantum-risk")({
  head: () => ({
    meta: [
      { title: "Quantum Risk Analysis — ECDAT" },
      {
        name: "description",
        content:
          "Quantum risk matrix and Mosca-style assessment showing where the threat window overtakes data lifetime.",
      },
      { property: "og:title", content: "Quantum Risk Analysis — ECDAT" },
      {
        property: "og:description",
        content: "Risk matrix, Mosca inequality and migration timeline for your crypto estate.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: QuantumRiskPage,
});

function MoscaTile({
  label,
  value,
  unit,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string;
  unit: string;
  icon: typeof Clock;
  accent?: boolean;
}) {
  return (
    <div className={cn("rounded-lg border border-border p-4", accent && "border-critical/50 bg-critical/5")}>
      <Icon className={cn("size-4", accent ? "text-critical" : "text-primary")} />
      <p className="mt-2 text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className={cn("font-mono text-2xl font-semibold", accent && "text-critical")}>
        {value} <span className="text-sm text-muted-foreground">{unit}</span>
      </p>
    </div>
  );
}

function QuantumRiskPage() {
  const [criticality, setCriticality] = useState("all");
  const [environment, setEnvironment] = useState("all");
  const [algorithm, setAlgorithm] = useState("all");
  const [selected, setSelected] = useState<CryptographicAsset | null>(null);

  const algorithms = useMemo(
    () => Array.from(new Set(cryptoAssets.map((a) => a.algorithm))).sort(),
    [],
  );

  const points = useMemo(
    () =>
      cryptoAssets
        .filter(
          (a) =>
            (criticality === "all" || a.criticality === criticality) &&
            (environment === "all" || a.environment === environment) &&
            (algorithm === "all" || a.algorithm === algorithm),
        )
        .map((a) => ({
          x: a.migrationComplexity,
          y: a.riskScore,
          z: a.dataLifetimeYears * 12,
          asset: a,
        })),
    [criticality, environment, algorithm],
  );

  return (
    <>
      <PageHeader
        title="Quantum Risk Analysis"
        subtitle="Mosca-style assessment combining algorithm strength, data lifetime, migration time and business criticality."
        actions={
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => downloadJson("quantum-risk-analysis.json", { mosca, assets: cryptoAssets })}
          >
            <Download className="size-4" /> Export analysis
          </Button>
        }
      />

      <div className="panel p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold">Quantum risk matrix</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Migration complexity vs quantum risk. Bubble size reflects data lifetime — click a
              bubble to inspect the asset.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={criticality} onValueChange={setCriticality}>
              <SelectTrigger className="h-8 w-36 text-xs">
                <SelectValue placeholder="Criticality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All criticality</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={environment} onValueChange={setEnvironment}>
              <SelectTrigger className="h-8 w-36 text-xs">
                <SelectValue placeholder="Environment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All environments</SelectItem>
                <SelectItem value="Production">Production</SelectItem>
                <SelectItem value="Staging">Staging</SelectItem>
                <SelectItem value="Development">Development</SelectItem>
                <SelectItem value="DR">DR</SelectItem>
              </SelectContent>
            </Select>
            <Select value={algorithm} onValueChange={setAlgorithm}>
              <SelectTrigger className="h-8 w-32 text-xs">
                <SelectValue placeholder="Algorithm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All algorithms</SelectItem>
                {algorithms.map((a) => (
                  <SelectItem key={a} value={a}>
                    {a}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4 h-[26rem]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 16, bottom: 24, left: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                type="number"
                dataKey="x"
                name="Migration complexity"
                domain={[0, 100]}
                stroke="var(--muted-foreground)"
                fontSize={11}
                label={{
                  value: "Migration complexity →",
                  position: "insideBottom",
                  offset: -12,
                  fill: "var(--muted-foreground)",
                  fontSize: 11,
                }}
              />
              <YAxis
                type="number"
                dataKey="y"
                name="Quantum risk"
                domain={[0, 100]}
                stroke="var(--muted-foreground)"
                fontSize={11}
                label={{
                  value: "Quantum risk →",
                  angle: -90,
                  position: "insideLeft",
                  fill: "var(--muted-foreground)",
                  fontSize: 11,
                }}
              />
              <ZAxis type="number" dataKey="z" range={[60, 460]} />
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                content={({ payload }) => {
                  const a = payload?.[0]?.payload?.asset as CryptographicAsset | undefined;
                  if (!a) return null;
                  return (
                    <div className="rounded-md border border-border bg-popover p-3 text-xs shadow-panel">
                      <p className="font-mono text-primary">{a.id}</p>
                      <p className="mt-1 font-medium">
                        {a.algorithm}-{a.keySize} · {a.location}
                      </p>
                      <p className="mt-1 text-muted-foreground">
                        Risk {a.riskScore} · complexity {a.migrationComplexity} · {a.dataLifetimeYears}y
                        lifetime
                      </p>
                    </div>
                  );
                }}
              />
              <Scatter
                data={points}
                onClick={(p) => setSelected((p as unknown as { asset: CryptographicAsset }).asset)}
                cursor="pointer"
              >
                {points.map((p) => (
                  <Cell
                    key={p.asset.id}
                    fill={`var(--${p.asset.severity})`}
                    fillOpacity={0.55}
                    stroke={`var(--${p.asset.severity})`}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <SeverityBadge severity="critical" />
          <SeverityBadge severity="high" />
          <SeverityBadge severity="medium" />
          <SeverityBadge severity="low" />
        </div>
      </div>

      <div className="panel p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold">Mosca risk assessment</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              If data lifetime + migration time exceeds the threat window, action is already late.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-md border border-critical/50 bg-critical/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-critical">
            <AlertOctagon className="size-4" />
            {mosca.verdict}
          </span>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <MoscaTile label="Data lifetime (x)" value={String(mosca.dataLifetimeYears)} unit="years" icon={Clock} />
          <MoscaTile label="Migration time (y)" value={String(mosca.migrationYears)} unit="years" icon={Timer} />
          <MoscaTile label="Threat window (z)" value={String(mosca.threatWindowYears)} unit="years" icon={TrendingUp} />
          <MoscaTile
            label="Risk gap (x + y − z)"
            value={`+${mosca.riskGapYears}`}
            unit="years"
            icon={AlertOctagon}
            accent
          />
        </div>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute left-0 right-0 top-3 h-0.5 rounded-full bg-border" />
            <div
              className="absolute left-0 top-3 h-0.5 rounded-full bg-primary"
              style={{ width: "38%" }}
            />
            <ol className="relative grid gap-6 sm:grid-cols-5">
              {moscaTimeline.map((t) => (
                <li key={t.year}>
                  <span
                    className="block size-3 rounded-full border-2"
                    style={{
                      borderColor:
                        t.state === "threat" ? "var(--critical)" : "var(--primary)",
                      background:
                        t.state === "done"
                          ? "var(--primary)"
                          : t.state === "threat"
                            ? "var(--critical)"
                            : "var(--background)",
                    }}
                  />
                  <p className="mt-3 font-mono text-sm font-semibold">{t.year}</p>
                  <p
                    className={cn(
                      "text-xs font-medium",
                      t.state === "threat" ? "text-critical" : "text-foreground",
                    )}
                  >
                    {t.label}
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{t.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <AssetDetailSheet asset={selected} onOpenChange={(o) => !o && setSelected(null)} />
    </>
  );
}
