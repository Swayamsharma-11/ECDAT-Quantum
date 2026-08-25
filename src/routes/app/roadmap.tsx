import { createFileRoute } from "@tanstack/react-router";
import { Check, Download, Flag } from "lucide-react";
import { PageHeader } from "@/components/ecdat/page-header";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { migrationPhases, overallMigrationProgress } from "@/lib/ecdat/data";
import { downloadJson } from "@/lib/ecdat/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/roadmap")({
  head: () => ({
    meta: [
      { title: "Migration Roadmap — ECDAT" },
      {
        name: "description",
        content:
          "Five-phase post-quantum migration roadmap: discover, prioritize, prepare, migrate and validate.",
      },
      { property: "og:title", content: "Migration Roadmap — ECDAT" },
      {
        property: "og:description",
        content: "Track PQC migration phases, owners and completion across the estate.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RoadmapPage,
});

const statusStyle = {
  Complete: "border-low/40 bg-low/10 text-low",
  "In Progress": "border-primary/40 bg-primary/10 text-primary",
  Planned: "border-border bg-muted/40 text-muted-foreground",
} as const;

function RoadmapPage() {
  return (
    <>
      <PageHeader
        title="Migration Roadmap"
        subtitle="A phased plan from discovery to validated post-quantum readiness."
        actions={
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => downloadJson("migration-roadmap.json", migrationPhases)}
          >
            <Download className="size-4" /> Export plan
          </Button>
        }
      />

      <div className="panel p-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold">Overall migration progress</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Target: PQC coverage across payment and identity by 2030
            </p>
          </div>
          <span className="font-mono text-3xl font-semibold text-primary">
            {overallMigrationProgress}%
          </span>
        </div>
        <Progress value={overallMigrationProgress} className="mt-4 h-2" />
      </div>

      <ol className="relative space-y-4 pl-6">
        <span className="absolute bottom-4 left-[7px] top-4 w-px bg-border" />
        {migrationPhases.map((p) => (
          <li key={p.id} className="relative">
            <span
              className={cn(
                "absolute -left-6 top-5 size-3.5 rounded-full border-2 border-background",
                p.status === "Complete"
                  ? "bg-low"
                  : p.status === "In Progress"
                    ? "bg-primary"
                    : "bg-muted",
              )}
            />
            <div className="panel p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    {p.phase} · {p.window}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold">{p.title}</h3>
                </div>
                <span
                  className={cn(
                    "rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider",
                    statusStyle[p.status],
                  )}
                >
                  {p.status}
                </span>
              </div>

              <div className="mt-3 flex items-center gap-3">
                <Progress value={p.progress} className="h-1.5 flex-1" />
                <span className="font-mono text-xs text-muted-foreground">{p.progress}%</span>
              </div>

              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {p.tasks.map((t) => (
                  <li
                    key={t.id}
                    className="flex items-center gap-2.5 rounded-md border border-border px-3 py-2"
                  >
                    <span
                      className={cn(
                        "flex size-4 shrink-0 items-center justify-center rounded-[4px] border",
                        t.done ? "border-low bg-low/20 text-low" : "border-border",
                      )}
                    >
                      {t.done && <Check className="size-3" />}
                    </span>
                    <div className="min-w-0">
                      <p
                        className={cn(
                          "truncate text-sm",
                          t.done && "text-muted-foreground line-through",
                        )}
                      >
                        {t.title}
                      </p>
                      <p className="text-[11px] text-muted-foreground">{t.owner}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      <div className="panel flex flex-wrap items-center justify-between gap-3 p-5">
        <div className="flex items-start gap-3">
          <Flag className="mt-0.5 size-5 text-primary" />
          <div>
            <h2 className="text-sm font-semibold">Next milestone</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Complete prioritisation of long-lived data stores before Q4 2026 to keep the 2030
              migration deadline achievable.
            </p>
          </div>
        </div>
        <Button size="sm">Assign owners</Button>
      </div>
    </>
  );
}
