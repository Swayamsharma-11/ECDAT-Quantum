import { createFileRoute } from "@tanstack/react-router";
import {
  Building2,
  ChevronRight,
  Download,
  FileJson,
  FileSpreadsheet,
  FileText,
  Layers,
  Lock,
  Package,
  ScrollText,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/ecdat/page-header";
import { SeverityBadge } from "@/components/ecdat/severity-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cbomSummary, cbomTree, libraries } from "@/lib/ecdat/data";
import { buildCbom } from "@/lib/ecdat/cbom-export";
import { downloadCsv, downloadJson, printPdf } from "@/lib/ecdat/format";
import type { CBOMNode } from "@/lib/ecdat/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/cbom")({
  head: () => ({
    meta: [
      { title: "Cryptographic Bill of Materials — ECDAT" },
      {
        name: "description",
        content:
          "Explore a CycloneDX 1.6 Cryptographic Bill of Materials across applications, services, libraries and components.",
      },
      { property: "og:title", content: "CBOM Explorer — ECDAT" },
      {
        property: "og:description",
        content: "Hierarchical CBOM explorer with JSON, CSV and PDF export.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CbomPage,
});

const icons: Record<CBOMNode["type"], typeof Layers> = {
  organization: Building2,
  application: Layers,
  service: Package,
  library: Lock,
  component: ScrollText,
  certificate: ShieldCheck,
};

function TreeNode({
  node,
  depth = 0,
  filter,
}: {
  node: CBOMNode;
  depth?: number;
  filter: string;
}) {
  const [open, setOpen] = useState(depth < 1);
  const Icon = icons[node.type];
  const hasChildren = !!node.children?.length;

  const matches = (n: CBOMNode): boolean =>
    !filter ||
    n.name.toLowerCase().includes(filter.toLowerCase()) ||
    (n.children ?? []).some(matches);

  if (!matches(node)) return null;

  return (
    <div>
      <button
        onClick={() => hasChildren && setOpen((v) => !v)}
        className={cn(
          "flex w-full items-center gap-2 rounded-md py-1.5 pr-3 text-left transition-colors hover:bg-secondary/60",
          !hasChildren && "cursor-default",
        )}
        style={{ paddingLeft: `${depth * 18 + 8}px` }}
      >
        {hasChildren ? (
          <ChevronRight
            className={cn(
              "size-3.5 shrink-0 text-muted-foreground transition-transform",
              open && "rotate-90",
            )}
          />
        ) : (
          <span className="w-3.5" />
        )}
        <Icon className="size-4 shrink-0 text-primary" />
        <span className="truncate text-sm">{node.name}</span>
        {node.meta && (
          <span className="ml-auto shrink-0 font-mono text-[11px] text-muted-foreground">
            {node.meta}
          </span>
        )}
        {node.severity && <SeverityBadge severity={node.severity} dot={false} />}
      </button>
      {open &&
        node.children?.map((c) => (
          <TreeNode key={c.id} node={c} depth={depth + 1} filter={filter} />
        ))}
    </div>
  );
}

function CbomPage() {
  const [filter, setFilter] = useState("");

  return (
    <>
      <PageHeader
        title="Cryptographic Bill of Materials"
        subtitle="Complete inventory of cryptographic components across your organization, normalised to CycloneDX 1.6."
        actions={
          <>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => downloadJson("astra-cbom.cdx.json", buildCbom())}
            >
              <FileJson className="size-4" /> JSON
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() =>
                downloadCsv("astra-cbom.csv", libraries as unknown as Record<string, unknown>[])
              }
            >
              <FileSpreadsheet className="size-4" /> CSV
            </Button>
            <Button size="sm" className="gap-2" onClick={printPdf}>
              <FileText className="size-4" /> PDF report
            </Button>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {cbomSummary.map((s) => (
          <div key={s.label} className="panel p-4">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{s.label}</p>
            <p className="mt-1.5 font-mono text-2xl font-semibold">
              {s.value.toLocaleString("en-US")}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className="panel overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4">
            <div>
              <h2 className="text-sm font-semibold">Component explorer</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Organization → applications → services → libraries → components
              </p>
            </div>
            <Input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filter nodes"
              className="h-9 w-48"
            />
          </div>
          <div className="max-h-[36rem] overflow-y-auto p-2">
            <TreeNode node={cbomTree} filter={filter} />
          </div>
        </div>

        <div className="panel overflow-hidden">
          <div className="border-b border-border p-4">
            <h2 className="text-sm font-semibold">Cryptographic libraries</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Support status drives migration sequencing
            </p>
          </div>
          <ul className="divide-y divide-border/60">
            {libraries.map((l) => (
              <li key={l.id} className="flex items-center gap-3 px-4 py-3">
                <Lock className="size-4 shrink-0 text-primary" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {l.name} <span className="font-mono text-xs text-muted-foreground">{l.version}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {l.components} components · {l.vulnerable} vulnerable
                  </p>
                </div>
                <SeverityBadge
                  severity={
                    l.status === "End of life"
                      ? "critical"
                      : l.status === "Outdated"
                        ? "high"
                        : "low"
                  }
                  label={l.status}
                  dot={false}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="panel flex flex-wrap items-center justify-between gap-4 p-5">
        <div className="flex items-start gap-3">
          <Download className="mt-0.5 size-5 text-primary" />
          <div>
            <h2 className="text-sm font-semibold">Machine-readable CBOM</h2>
            <p className="mt-1 max-w-xl text-xs text-muted-foreground">
              The exported document conforms to CycloneDX 1.6 cryptographic asset properties, with
              ECDAT risk metadata attached per component. Key material is never included — only
              algorithm metadata and fingerprints.
            </p>
          </div>
        </div>
        <Button size="sm" onClick={() => downloadJson("astra-cbom.cdx.json", buildCbom())}>
          Download CycloneDX 1.6
        </Button>
      </div>
    </>
  );
}
