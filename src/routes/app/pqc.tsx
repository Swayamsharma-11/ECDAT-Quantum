import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Download, Sparkles } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/ecdat/page-header";
import { SeverityBadge } from "@/components/ecdat/severity-badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { pqcRecommendations } from "@/lib/ecdat/data";
import { downloadJson } from "@/lib/ecdat/format";

export const Route = createFileRoute("/app/pqc")({
  head: () => ({
    meta: [
      { title: "PQC Recommendations — ECDAT" },
      {
        name: "description",
        content:
          "NIST-aligned post-quantum cryptography recommendations mapped to your vulnerable algorithms.",
      },
      { property: "og:title", content: "PQC Recommendations — ECDAT" },
      {
        property: "og:description",
        content: "ML-KEM, ML-DSA and SLH-DSA transition guidance with effort estimates.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PqcPage,
});

const standards = [
  { code: "FIPS 203", name: "ML-KEM", note: "Module-lattice key encapsulation (Kyber)" },
  { code: "FIPS 204", name: "ML-DSA", note: "Module-lattice digital signatures (Dilithium)" },
  { code: "FIPS 205", name: "SLH-DSA", note: "Stateless hash-based signatures (SPHINCS+)" },
];

const categories = ["All", "Key establishment", "Signatures", "Symmetric", "Protocol"] as const;

function PqcPage() {
  const [tab, setTab] = useState<string>("All");
  const items = pqcRecommendations.filter((r) => tab === "All" || r.category === tab);

  return (
    <>
      <PageHeader
        title="PQC Recommendations"
        subtitle="Standards-aligned replacements for every vulnerable algorithm family found in your estate."
        actions={
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => downloadJson("pqc-recommendations.json", pqcRecommendations)}
          >
            <Download className="size-4" /> Export
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-3">
        {standards.map((s) => (
          <div key={s.code} className="panel flex items-start gap-3 p-4">
            <BookOpen className="mt-0.5 size-4 shrink-0 text-primary" />
            <div>
              <p className="font-mono text-xs text-primary">{s.code}</p>
              <p className="mt-0.5 text-sm font-semibold">{s.name}</p>
              <p className="text-xs text-muted-foreground">{s.note}</p>
            </div>
          </div>
        ))}
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          {categories.map((c) => (
            <TabsTrigger key={c} value={c} className="text-xs">
              {c}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid gap-4 lg:grid-cols-2">
        {items.map((r) => (
          <article key={r.id} className="panel flex flex-col gap-4 p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md border border-critical/40 bg-critical/10 px-2.5 py-1 font-mono text-xs text-critical">
                  {r.current}
                </span>
                <ArrowRight className="size-4 text-muted-foreground" />
                <span className="rounded-md border border-low/40 bg-low/10 px-2.5 py-1 font-mono text-xs text-low">
                  {r.recommended}
                </span>
              </div>
              <SeverityBadge severity={r.severity} />
            </div>

            <p className="text-sm text-muted-foreground">{r.reason}</p>

            <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ["Standard", r.standard],
                ["Complexity", r.complexity],
                ["Effort", r.effort],
                ["Assets", r.affectedAssets.toLocaleString("en-US")],
              ].map(([k, v]) => (
                <div key={k} className="rounded-md border border-border px-3 py-2">
                  <dt className="text-[11px] uppercase tracking-wider text-muted-foreground">{k}</dt>
                  <dd className="mt-0.5 font-mono text-sm">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-wrap items-center gap-2">
              <Button size="sm" className="gap-2">
                <Sparkles className="size-4" /> Add to roadmap
              </Button>
              <Button size="sm" variant="ghost">
                View affected assets
              </Button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
