import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Binary,
  Boxes,
  Cloud,
  Container,
  Cpu,
  FileCode2,
  GitBranch,
  KeyRound,
  Layers,
  Lock,
  Network,
  Radar,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EcdatLogo } from "@/components/ecdat/logo";
import { ThemeToggle } from "@/components/ecdat/theme-toggle";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ECDAT — Cryptographic Discovery & Quantum Risk Platform" },
      {
        name: "description",
        content:
          "Discover cryptographic assets, generate a CBOM, assess quantum risk and build a post-quantum migration roadmap for your enterprise.",
      },
      { property: "og:title", content: "ECDAT — Become Quantum Ready" },
      {
        property: "og:description",
        content:
          "Enterprise cryptographic discovery, CBOM generation, quantum risk scoring and PQC migration planning.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const pipeline = [
  { label: "Source Code", icon: FileCode2 },
  { label: "Crypto Discovery", icon: Radar },
  { label: "CBOM", icon: ScrollText },
  { label: "Quantum Risk", icon: Cpu },
  { label: "PQC Recommendation", icon: Sparkles },
  { label: "Migration Roadmap", icon: Workflow },
];

const why = [
  {
    title: "Complete Cryptographic Visibility",
    body: "Continuously map every algorithm, key size, library and protocol across code, containers, hosts and cloud.",
    icon: Boxes,
  },
  {
    title: "Automated CBOM Generation",
    body: "Produce a CycloneDX-compatible Cryptographic Bill of Materials that auditors and tooling can consume.",
    icon: ScrollText,
  },
  {
    title: "Quantum Risk Intelligence",
    body: "Score assets using algorithm strength, data lifetime, migration time and business criticality.",
    icon: Radar,
  },
  {
    title: "PQC Migration Planning",
    body: "Turn findings into sequenced ML-KEM, ML-DSA and hybrid migration work with realistic effort estimates.",
    icon: Workflow,
  },
];

const assets = [
  { label: "Source Code", icon: FileCode2 },
  { label: "Git Repositories", icon: GitBranch },
  { label: "Docker Images", icon: Container },
  { label: "Binary Files", icon: Binary },
  { label: "TLS Certificates", icon: ShieldCheck },
  { label: "APIs", icon: Network },
  { label: "Cloud Infrastructure", icon: Cloud },
  { label: "Kubernetes", icon: Layers },
  { label: "Crypto Libraries", icon: Lock },
  { label: "HSM / Security Modules", icon: KeyRound },
];

const steps = [
  { n: "01", title: "Connect", body: "Attach repositories, registries, clusters and cloud accounts with read-only access." },
  { n: "02", title: "Discover", body: "Static and runtime analysis extracts every cryptographic component and its context." },
  { n: "03", title: "Analyze", body: "Components are normalised into a CBOM with owners, environments and dependencies." },
  { n: "04", title: "Assess", body: "Mosca-style scoring exposes where the threat window overtakes your data lifetime." },
  { n: "05", title: "Migrate", body: "Sequenced roadmap, hybrid rollout guidance and validation re-scans." },
];

function PipelineDiagram() {
  return (
    <div className="panel relative overflow-hidden p-5 sm:p-7">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="relative">
        <div className="flex items-center justify-between gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          <span>Discovery pipeline</span>
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-low" />
            live
          </span>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {pipeline.map((p, i) => (
            <div
              key={p.label}
              className="animate-rise relative rounded-lg border border-border bg-surface-2/70 p-3"
              style={{ animationDelay: `${i * 110}ms` }}
            >
              <p.icon className="size-4 text-primary" />
              <p className="mt-2 text-xs font-medium leading-snug">{p.label}</p>
              <span className="mt-2 block h-0.5 w-full overflow-hidden rounded-full bg-muted">
                <span
                  className="block h-full rounded-full bg-primary"
                  style={{ width: `${60 + i * 6}%` }}
                />
              </span>
              {i < pipeline.length - 1 && (
                <svg
                  className="absolute -right-3 top-1/2 hidden h-4 w-6 -translate-y-1/2 text-primary/60 lg:block"
                  viewBox="0 0 24 8"
                  aria-hidden
                >
                  <line
                    x1="0"
                    y1="4"
                    x2="24"
                    y2="4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="flow-line"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            { k: "Assets discovered", v: "1,284" },
            { k: "Quantum vulnerable", v: "327" },
            { k: "Quantum risk score", v: "78 / 100" },
          ].map((s) => (
            <div key={s.k} className="rounded-lg border border-border bg-background/40 p-3">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{s.k}</p>
              <p className="mt-1 font-mono text-xl font-semibold">{s.v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
          <EcdatLogo />
          <nav className="ml-6 hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#why" className="transition-colors hover:text-foreground">
              Platform
            </a>
            <a href="#assets" className="transition-colors hover:text-foreground">
              Coverage
            </a>
            <a href="#how" className="transition-colors hover:text-foreground">
              How it works
            </a>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <Button asChild variant="ghost" size="sm">
              <Link to="/auth/login">Sign in</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/auth/signup">Start free assessment</Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[70rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 30% 50%, var(--primary), transparent 60%), radial-gradient(circle at 70% 50%, var(--accent), transparent 60%)",
          }}
        />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:py-24">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full bg-primary" />
              NIST FIPS 203 / 204 / 205 aligned
            </span>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              <span className="text-gradient">Discover. Assess. Migrate.</span>
              <br />
              Become Quantum Ready.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              Automatically discover cryptographic assets across your enterprise, generate a
              Cryptographic Bill of Materials, assess quantum risk and build an actionable
              Post-Quantum Cryptography migration roadmap.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="gap-2">
                <Link to="/auth/signup">
                  Start Free Assessment <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/app">View Demo</Link>
              </Button>
            </div>
            <dl className="mt-9 grid max-w-lg grid-cols-3 gap-4 border-t border-border pt-6">
              {[
                ["48k+", "files per scan"],
                ["24", "algorithms tracked"],
                ["CycloneDX", "1.6 CBOM export"],
              ].map(([v, k]) => (
                <div key={k}>
                  <dt className="font-mono text-lg font-semibold">{v}</dt>
                  <dd className="text-xs text-muted-foreground">{k}</dd>
                </div>
              ))}
            </dl>
          </div>
          <PipelineDiagram />
        </div>
      </section>

      <section id="why" className="border-b border-border py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-2xl font-semibold sm:text-3xl">Why ECDAT?</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Built for security engineering teams who must prove quantum readiness to regulators,
            auditors and their board.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {why.map((w) => (
              <div
                key={w.title}
                className="panel group p-5 transition-all hover:-translate-y-0.5 hover:glow-primary"
              >
                <span className="grid size-9 place-items-center rounded-md border border-primary/40 bg-primary/10 text-primary">
                  <w.icon className="size-4.5" />
                </span>
                <h3 className="mt-4 text-sm font-semibold">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="assets" className="border-b border-border py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-2xl font-semibold sm:text-3xl">Supported assets</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            One discovery engine across build time and runtime.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {assets.map((a) => (
              <div
                key={a.label}
                className="glass flex items-center gap-3 rounded-lg px-4 py-3.5 transition-colors hover:border-primary/40"
              >
                <a.icon className="size-4 shrink-0 text-primary" />
                <span className="text-sm">{a.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="border-b border-border py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-2xl font-semibold sm:text-3xl">How it works</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-5">
            {steps.map((s) => (
              <div key={s.n} className="relative panel p-5">
                <span className="font-mono text-xs text-primary">{s.n}</span>
                <h3 className="mt-2 text-sm font-semibold">{s.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="panel mt-10 flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-lg font-semibold">See the full demo estate</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Astra Financial Technologies — 1,284 cryptographic assets, pre-populated.
              </p>
            </div>
            <Button asChild size="lg" className="gap-2">
              <Link to="/app">
                Open dashboard <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="py-10">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-4">
          <div>
            <EcdatLogo />
            <p className="mt-3 max-w-xs text-xs leading-relaxed text-muted-foreground">
              Enterprise Cryptographic Discovery &amp; Analysis Tool. Metadata and fingerprints
              only — ECDAT never stores private key material.
            </p>
          </div>
          {[
            { h: "Platform", items: ["Discovery", "CBOM", "Quantum Risk", "PQC Roadmap"] },
            { h: "Coverage", items: ["Repositories", "Containers", "Infrastructure", "Certificates"] },
            { h: "Company", items: ["Security", "Compliance", "Documentation", "Contact"] },
          ].map((col) => (
            <div key={col.h}>
              <p className="text-xs font-semibold uppercase tracking-wider">{col.h}</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {col.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-8 max-w-7xl border-t border-border px-4 pt-6 text-xs text-muted-foreground sm:px-6">
          © 2026 ECDAT. Post-quantum readiness for regulated enterprises.
        </div>
      </footer>
    </div>
  );
}
