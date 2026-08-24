import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { EcdatLogo } from "./logo";

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="relative grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden border-r border-border lg:block">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div
          className="pointer-events-none absolute -left-20 top-1/4 h-96 w-96 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--primary), transparent 65%)" }}
        />
        <div className="relative flex h-full flex-col justify-between p-10">
          <Link to="/">
            <EcdatLogo />
          </Link>
          <div>
            <h2 className="max-w-md text-3xl font-semibold leading-tight tracking-tight">
              Every algorithm. Every environment.{" "}
              <span className="text-gradient">One quantum risk posture.</span>
            </h2>
            <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
              {[
                "Cryptographic discovery across code, containers and cloud",
                "CycloneDX 1.6 CBOM generation",
                "Mosca-style quantum risk assessment",
                "Sequenced PQC migration roadmap",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2.5">
                  <span className="size-1.5 rounded-full bg-primary" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-xs text-muted-foreground">
            SOC 2 Type II · ISO 27001 · No private key material is ever stored.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-sm">
          <div className="lg:hidden">
            <Link to="/">
              <EcdatLogo />
            </Link>
          </div>
          <h1 className="mt-8 text-2xl font-semibold tracking-tight lg:mt-0">{title}</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-7">{children}</div>
          <div className="mt-6 text-sm text-muted-foreground">{footer}</div>
        </div>
      </div>
    </div>
  );
}
