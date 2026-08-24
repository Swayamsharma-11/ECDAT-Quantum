import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock, Cpu, ShieldAlert, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { QuantumStatusBadge, SeverityBadge } from "./severity-badge";
import type { CryptographicAsset } from "@/lib/ecdat/types";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-surface-2/60 px-3 py-2">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-0.5 truncate text-sm font-medium">{value}</p>
    </div>
  );
}

export function AssetDetailSheet({
  asset,
  onOpenChange,
}: {
  asset: CryptographicAsset | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Sheet open={!!asset} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
        {asset && (
          <>
            <SheetHeader className="space-y-2">
              <div className="flex items-center gap-2">
                <SheetTitle className="font-mono text-lg">{asset.id}</SheetTitle>
                <QuantumStatusBadge status={asset.quantumStatus} />
              </div>
              <SheetDescription>
                {asset.algorithm}-{asset.keySize} · {asset.protocol} · {asset.location}
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-6 px-4 pb-8">
              <div className="grid grid-cols-2 gap-2">
                <Field label="Algorithm" value={`${asset.algorithm}-${asset.keySize}`} />
                <Field label="Protocol" value={asset.protocol} />
                <Field label="Library" value={`${asset.library} ${asset.version}`} />
                <Field label="Source" value={asset.repository} />
                <Field label="Application" value={asset.application} />
                <Field label="Environment" value={asset.environment} />
                <Field label="Owner" value={asset.owner} />
                <Field label="Business criticality" value={asset.criticality} />
              </div>

              <section className="panel p-4">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="size-4 text-critical" />
                  <h3 className="text-sm font-semibold">Quantum assessment</h3>
                </div>

                <div className="mt-4 flex items-end gap-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      Risk score
                    </p>
                    <p
                      className="font-mono text-4xl font-semibold"
                      style={{ color: `var(--${asset.severity})` }}
                    >
                      {asset.riskScore}
                      <span className="text-base text-muted-foreground">/100</span>
                    </p>
                  </div>
                  <div className="flex-1">
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${asset.riskScore}%`,
                          backgroundColor: `var(--${asset.severity})`,
                        }}
                      />
                    </div>
                    <div className="mt-2">
                      <SeverityBadge severity={asset.severity} />
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {asset.rationale}
                </p>

                <div className="mt-4 grid gap-2 sm:grid-cols-3">
                  <div className="rounded-md border border-border p-3">
                    <Clock className="size-4 text-primary" />
                    <p className="mt-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                      Data lifetime
                    </p>
                    <p className="font-mono text-lg">{asset.dataLifetimeYears} yrs</p>
                  </div>
                  <div className="rounded-md border border-border p-3">
                    <Timer className="size-4 text-primary" />
                    <p className="mt-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                      Migration time
                    </p>
                    <p className="font-mono text-lg">{asset.migrationYears} yrs</p>
                  </div>
                  <div className="rounded-md border border-border p-3">
                    <Cpu className="size-4 text-primary" />
                    <p className="mt-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                      Complexity
                    </p>
                    <p className="font-mono text-lg">{asset.migrationComplexity}/100</p>
                  </div>
                </div>
              </section>

              <section className="panel p-4">
                <h3 className="text-sm font-semibold">Recommended action</h3>
                <p className="mt-2 text-sm text-primary">{asset.recommendation}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button asChild size="sm" className="gap-1.5">
                    <Link to="/app/pqc">
                      View PQC recommendation <ArrowUpRight className="size-3.5" />
                    </Link>
                  </Button>
                  <Button asChild size="sm" variant="outline">
                    <Link to="/app/roadmap">Add to roadmap</Link>
                  </Button>
                  <Button asChild size="sm" variant="ghost">
                    <Link to="/app/graph">Show impact</Link>
                  </Button>
                </div>
              </section>

              <p className="text-xs text-muted-foreground">
                Last seen {asset.lastSeen} · Department {asset.department}. ECDAT stores metadata
                and fingerprints only — no private key material is retained.
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
