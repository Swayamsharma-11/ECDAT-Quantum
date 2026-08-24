import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  Boxes,
  Calendar,
  Download,
  Radar,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageHeader } from "@/components/ecdat/page-header";
import { StatCard } from "@/components/ecdat/stat-card";
import { RiskScore, SeverityBadge } from "@/components/ecdat/severity-badge";
import { AssetDetailSheet } from "@/components/ecdat/asset-detail-sheet";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  algorithmStats,
  cryptoAssets,
  currentUser,
  kpis,
  postureTrend,
  riskDistribution,
  topRisks,
} from "@/lib/ecdat/data";
import { downloadJson } from "@/lib/ecdat/format";
import type { CryptographicAsset } from "@/lib/ecdat/types";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Security Overview — ECDAT" },
      {
        name: "description",
        content:
          "Live cryptographic security posture: quantum risk score, vulnerable assets, PQC readiness and top risks.",
      },
      { property: "og:title", content: "Security Overview — ECDAT" },
      {
        property: "og:description",
        content: "Quantum risk score, cryptographic inventory and top risks at a glance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Overview,
});

const chartTooltip = {
  contentStyle: {
    background: "var(--popover)",
    border: "1px solid var(--border)",
    borderRadius: "8px",
    fontSize: "12px",
    color: "var(--popover-foreground)",
  },
  labelStyle: { color: "var(--muted-foreground)" },
};

function RiskDonut() {
  const total = riskDistribution.reduce((s, d) => s + d.value, 0);
  return (
    <div className="panel p-5">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-sm font-semibold">Quantum risk overview</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            {total} assessed assets by severity band
          </p>
        </div>
        <SeverityBadge severity="critical" label="Critical posture" />
      </div>

      <div className="relative mt-2 h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={riskDistribution}
              dataKey="value"
              nameKey="label"
              innerRadius="66%"
              outerRadius="92%"
              paddingAngle={3}
              stroke="none"
            >
              {riskDistribution.map((d) => (
                <Cell key={d.label} fill={`var(--${d.severity})`} />
              ))}
            </Pie>
            <Tooltip {...chartTooltip} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-4xl font-semibold text-critical">
            {kpis.quantumRiskScore}
          </span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Quantum risk score
          </span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {riskDistribution.map((d) => (
          <div key={d.label} className="rounded-md border border-border px-3 py-2">
            <div className="flex items-center gap-1.5">
              <span
                className="size-1.5 rounded-full"
                style={{ backgroundColor: `var(--${d.severity})` }}
              />
              <span className="text-[11px] text-muted-foreground">{d.label}</span>
            </div>
            <p className="mt-0.5 font-mono text-lg">{d.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function InventoryChart() {
  const [family, setFamily] = useState("all");
  const data = useMemo(
    () => algorithmStats.filter((a) => family === "all" || a.family === family),
    [family],
  );

  return (
    <div className="panel p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold">Cryptographic inventory</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Component count per algorithm family, with vulnerable share
          </p>
        </div>
        <Select value={family} onValueChange={setFamily}>
          <SelectTrigger className="h-8 w-40 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All families</SelectItem>
            <SelectItem value="Asymmetric">Asymmetric</SelectItem>
            <SelectItem value="Symmetric">Symmetric</SelectItem>
            <SelectItem value="Hash">Hash</SelectItem>
            <SelectItem value="Protocol">Protocol</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={2}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="algorithm"
              stroke="var(--muted-foreground)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="var(--muted-foreground)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip {...chartTooltip} cursor={{ fill: "var(--secondary)", opacity: 0.4 }} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="count" name="Total" fill="var(--chart-1)" radius={[3, 3, 0, 0]} />
            <Bar
              dataKey="vulnerable"
              name="Quantum vulnerable"
              fill="var(--critical)"
              radius={[3, 3, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function PostureTrend() {
  return (
    <div className="panel p-5">
      <h2 className="text-sm font-semibold">Posture trend</h2>
      <p className="mt-1 text-xs text-muted-foreground">
        Risk score falling as PQC-ready components grow
      </p>
      <div className="mt-4 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={postureTrend}>
            <defs>
              <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--critical)" stopOpacity={0.45} />
                <stop offset="100%" stopColor="var(--critical)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="pqcGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--low)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="var(--low)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip {...chartTooltip} />
            <Area
              type="monotone"
              dataKey="risk"
              name="Risk score"
              stroke="var(--critical)"
              fill="url(#riskGrad)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="pqc"
              name="PQC ready"
              stroke="var(--low)"
              fill="url(#pqcGrad)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function Overview() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<CryptographicAsset | null>(null);

  return (
    <>
      <PageHeader
        title={`Good evening, ${currentUser.name}`}
        subtitle="Here's the current cryptographic security posture of your organization."
        actions={
          <>
            <Select defaultValue="30d">
              <SelectTrigger className="h-9 w-32 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() =>
                downloadJson("ecdat-overview.json", { kpis, riskDistribution, algorithmStats })
              }
            >
              <Download className="size-4" /> Export
            </Button>
            <Button asChild size="sm" className="gap-2">
              <Link to="/app/scanners/repository">
                <Radar className="size-4" /> Start new scan
              </Link>
            </Button>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard
          label="Quantum risk score"
          value={kpis.quantumRiskScore}
          suffix="/100"
          status="Critical"
          severity="critical"
          trend={-4}
          icon={ShieldAlert}
          spark={[91, 89, 87, 84, 82, 80, 78]}
          onClick={() => navigate({ to: "/app/quantum-risk" })}
        />
        <StatCard
          label="Cryptographic assets"
          value={kpis.cryptoAssets}
          severity="low"
          trend={6}
          trendGood="up"
          icon={Boxes}
          spark={[1102, 1140, 1179, 1201, 1240, 1266, 1284]}
          onClick={() => navigate({ to: "/app/inventory" })}
        />
        <StatCard
          label="Quantum vulnerable"
          value={kpis.quantumVulnerable}
          status="High"
          severity="high"
          trend={-4}
          icon={AlertTriangle}
          spark={[412, 398, 384, 371, 356, 341, 327]}
          onClick={() => navigate({ to: "/app/inventory" })}
        />
        <StatCard
          label="PQC ready"
          value={kpis.pqcReady}
          severity="low"
          trend={14}
          trendGood="up"
          icon={ShieldCheck}
          spark={[41, 66, 88, 112, 139, 161, 184]}
          onClick={() => navigate({ to: "/app/pqc" })}
        />
        <StatCard
          label="Migration required"
          value={kpis.migrationRequired}
          status="Medium"
          severity="medium"
          trend={-3}
          icon={Workflow}
          spark={[172, 168, 161, 155, 150, 146, 143]}
          onClick={() => navigate({ to: "/app/roadmap" })}
        />
        <StatCard
          label="Critical assets"
          value={kpis.criticalAssets}
          status="Critical"
          severity="critical"
          trend={-2}
          icon={Sparkles}
          spark={[24, 23, 22, 21, 20, 19, 18]}
          onClick={() => navigate({ to: "/app/quantum-risk" })}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
        <RiskDonut />
        <div className="space-y-4">
          <InventoryChart />
          <PostureTrend />
        </div>
      </div>

      <div className="panel overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
          <div>
            <h2 className="text-sm font-semibold">Top cryptographic risks</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Highest scoring assets across all environments — click a row for detail
            </p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link to="/app/inventory">Open full inventory</Link>
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-2.5 font-medium">Asset</th>
                <th className="px-3 py-2.5 font-medium">Algorithm</th>
                <th className="px-3 py-2.5 font-medium">Location</th>
                <th className="px-3 py-2.5 font-medium">Criticality</th>
                <th className="px-3 py-2.5 font-medium">Quantum risk</th>
                <th className="px-3 py-2.5 font-medium">Recommendation</th>
                <th className="px-3 py-2.5 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {topRisks.map((a) => (
                <tr
                  key={a.id}
                  onClick={() => setSelected(a)}
                  className="cursor-pointer border-b border-border/60 transition-colors last:border-0 hover:bg-secondary/50"
                >
                  <td className="px-5 py-3">
                    <p className="font-medium">{a.application}</p>
                    <p className="font-mono text-[11px] text-muted-foreground">{a.id}</p>
                  </td>
                  <td className="px-3 py-3 font-mono text-xs">
                    {a.algorithm}-{a.keySize}
                  </td>
                  <td className="px-3 py-3 text-muted-foreground">{a.location}</td>
                  <td className="px-3 py-3">{a.criticality}</td>
                  <td className="px-3 py-3">
                    <RiskScore score={a.riskScore} />
                  </td>
                  <td className="px-3 py-3 text-xs text-primary">{a.recommendation}</td>
                  <td className="px-3 py-3">
                    <SeverityBadge severity={a.severity} label="Open" dot={false} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Generate CBOM",
            body: `Export a CycloneDX 1.6 bill of materials for all ${cryptoAssets.length * 53} components.`,
            to: "/app/cbom" as const,
            icon: Boxes,
          },
          {
            title: "Review PQC plan",
            body: "Six standardised recommendations covering 699 affected assets.",
            to: "/app/pqc" as const,
            icon: Sparkles,
          },
          {
            title: "Migration roadmap",
            body: "Phase 2 of 5 in progress — 38% overall completion.",
            to: "/app/roadmap" as const,
            icon: Calendar,
          },
        ].map((c) => (
          <Link
            key={c.title}
            to={c.to}
            className="panel group flex items-start gap-3 p-4 transition-all hover:-translate-y-0.5 hover:glow-primary"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-md border border-primary/40 bg-primary/10 text-primary">
              <c.icon className="size-4" />
            </span>
            <span>
              <span className="block text-sm font-semibold">{c.title}</span>
              <span className="mt-1 block text-xs text-muted-foreground">{c.body}</span>
            </span>
          </Link>
        ))}
      </div>

      <AssetDetailSheet asset={selected} onOpenChange={(o) => !o && setSelected(null)} />
    </>
  );
}
