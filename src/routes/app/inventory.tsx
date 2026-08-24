import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpDown, Download, Radar, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/ecdat/page-header";
import { AssetDetailSheet } from "@/components/ecdat/asset-detail-sheet";
import { QuantumStatusBadge, RiskScore } from "@/components/ecdat/severity-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cryptoAssets } from "@/lib/ecdat/data";
import { downloadCsv, downloadJson } from "@/lib/ecdat/format";
import type { CryptographicAsset } from "@/lib/ecdat/types";

export const Route = createFileRoute("/app/inventory")({
  head: () => ({
    meta: [
      { title: "Cryptographic Inventory — ECDAT" },
      {
        name: "description",
        content:
          "Searchable inventory of every discovered cryptographic asset with algorithm, library, environment and quantum risk score.",
      },
      { property: "og:title", content: "Cryptographic Inventory — ECDAT" },
      {
        property: "og:description",
        content: "Search, filter and drill into every cryptographic asset in your estate.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InventoryPage,
});

type SortKey = "riskScore" | "algorithm" | "environment" | "id";
const PAGE_SIZE = 10;

function InventoryPage() {
  const [query, setQuery] = useState("");
  const [algorithm, setAlgorithm] = useState("all");
  const [status, setStatus] = useState("all");
  const [environment, setEnvironment] = useState("all");
  const [sort, setSort] = useState<SortKey>("riskScore");
  const [asc, setAsc] = useState(false);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<CryptographicAsset | null>(null);

  const algorithms = useMemo(
    () => Array.from(new Set(cryptoAssets.map((a) => a.algorithm))).sort(),
    [],
  );

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    const rows = cryptoAssets.filter((a) => {
      const matches =
        !q ||
        [a.id, a.algorithm, a.keySize, a.protocol, a.library, a.location, a.application, a.owner]
          .join(" ")
          .toLowerCase()
          .includes(q);
      return (
        matches &&
        (algorithm === "all" || a.algorithm === algorithm) &&
        (status === "all" || a.quantumStatus === status) &&
        (environment === "all" || a.environment === environment)
      );
    });
    return rows.sort((x, y) => {
      const a = x[sort];
      const b = y[sort];
      const cmp = typeof a === "number" && typeof b === "number"
        ? a - b
        : String(a).localeCompare(String(b));
      return asc ? cmp : -cmp;
    });
  }, [query, algorithm, status, environment, sort, asc]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pages - 1);
  const rows = filtered.slice(current * PAGE_SIZE, current * PAGE_SIZE + PAGE_SIZE);

  const header = (label: string, key?: SortKey) => (
    <th className="px-3 py-2.5 font-medium">
      {key ? (
        <button
          className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
          onClick={() => {
            setSort(key);
            setAsc(sort === key ? !asc : false);
          }}
        >
          {label}
          <ArrowUpDown className="size-3" />
        </button>
      ) : (
        label
      )}
    </th>
  );

  return (
    <>
      <PageHeader
        title="Cryptographic Inventory"
        subtitle={`${filtered.length} of ${cryptoAssets.length} discovered assets shown. Click any row for the full assessment.`}
        actions={
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="size-4" /> Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => downloadJson("crypto-inventory.json", filtered)}>
                  Export JSON
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    downloadCsv(
                      "crypto-inventory.csv",
                      filtered as unknown as Record<string, unknown>[],
                    )
                  }
                >
                  Export CSV
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              size="sm"
              className="gap-2"
              onClick={() =>
                toast.success("Incremental scan queued", {
                  description: "Delta discovery across 5 repositories and 3 clusters.",
                })
              }
            >
              <Radar className="size-4" /> Scan now
            </Button>
          </>
        }
      />

      <div className="panel flex flex-wrap items-center gap-2 p-3">
        <div className="relative min-w-56 flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(0);
            }}
            placeholder="Search asset ID, algorithm, library, service or owner"
            className="h-9 pl-9"
          />
        </div>
        <Select value={algorithm} onValueChange={(v) => { setAlgorithm(v); setPage(0); }}>
          <SelectTrigger className="h-9 w-36 text-xs">
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
        <Select value={status} onValueChange={(v) => { setStatus(v); setPage(0); }}>
          <SelectTrigger className="h-9 w-40 text-xs">
            <SelectValue placeholder="Quantum status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="vulnerable">Vulnerable</SelectItem>
            <SelectItem value="at-risk">At risk</SelectItem>
            <SelectItem value="safe">Safe</SelectItem>
            <SelectItem value="pqc-ready">PQC ready</SelectItem>
          </SelectContent>
        </Select>
        <Select value={environment} onValueChange={(v) => { setEnvironment(v); setPage(0); }}>
          <SelectTrigger className="h-9 w-36 text-xs">
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
      </div>

      <div className="panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                {header("Asset ID", "id")}
                {header("Algorithm", "algorithm")}
                {header("Key size")}
                {header("Protocol")}
                {header("Library")}
                {header("Location")}
                {header("Environment", "environment")}
                {header("Quantum status")}
                {header("Risk", "riskScore")}
                {header("Last seen")}
              </tr>
            </thead>
            <tbody>
              {rows.map((a) => (
                <tr
                  key={a.id}
                  onClick={() => setSelected(a)}
                  className="cursor-pointer border-b border-border/60 transition-colors last:border-0 hover:bg-secondary/50"
                >
                  <td className="px-3 py-3 font-mono text-xs text-primary">{a.id}</td>
                  <td className="px-3 py-3 font-medium">{a.algorithm}</td>
                  <td className="px-3 py-3 font-mono text-xs">{a.keySize}</td>
                  <td className="px-3 py-3 text-muted-foreground">{a.protocol}</td>
                  <td className="px-3 py-3 text-muted-foreground">
                    {a.library} {a.version}
                  </td>
                  <td className="px-3 py-3">{a.location}</td>
                  <td className="px-3 py-3 text-muted-foreground">{a.environment}</td>
                  <td className="px-3 py-3">
                    <QuantumStatusBadge status={a.quantumStatus} />
                  </td>
                  <td className="px-3 py-3">
                    <RiskScore score={a.riskScore} />
                  </td>
                  <td className="px-3 py-3 text-xs text-muted-foreground">{a.lastSeen}</td>
                </tr>
              ))}
              {!rows.length && (
                <tr>
                  <td colSpan={10} className="px-3 py-10 text-center text-muted-foreground">
                    No assets match these filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-border px-4 py-3 text-xs text-muted-foreground">
          <span>
            Page {current + 1} of {pages}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={current === 0}
              onClick={() => setPage(current - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={current >= pages - 1}
              onClick={() => setPage(current + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      <AssetDetailSheet asset={selected} onOpenChange={(o) => !o && setSelected(null)} />
    </>
  );
}
