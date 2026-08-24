import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  Boxes,
  Building2,
  Calendar,
  ChevronDown,
  Container,
  FileText,
  GitBranch,
  LayoutDashboard,
  LogOut,
  Menu,
  Network,
  Radar,
  ScrollText,
  Server,
  Settings,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { EcdatLogo } from "./logo";
import { NotificationBell } from "./notification-bell";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";
import { currentUser, organizations } from "@/lib/ecdat/data";

const nav = [
  { to: "/app", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/app/inventory", label: "Crypto Inventory", icon: Boxes },
  { to: "/app/cbom", label: "CBOM", icon: ScrollText },
  { to: "/app/quantum-risk", label: "Quantum Risk", icon: Radar },
  { to: "/app/pqc", label: "PQC Recommendations", icon: Sparkles },
  { to: "/app/roadmap", label: "Migration Roadmap", icon: Calendar },
];

const scanners = [
  { to: "/app/scanners/repository", label: "Repository", icon: GitBranch },
  { to: "/app/scanners/container", label: "Container", icon: Container },
  { to: "/app/scanners/infrastructure", label: "Infrastructure", icon: Server },
  { to: "/app/certificates", label: "Certificates", icon: ShieldCheck },
];

const tail = [
  { to: "/app/graph", label: "Dependency Graph", icon: Network },
  { to: "/app/reports", label: "Reports", icon: FileText },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

function NavLink({
  to,
  label,
  icon: Icon,
  exact,
  onNavigate,
}: {
  to: string;
  label: string;
  icon: typeof Activity;
  exact?: boolean;
  onNavigate?: () => void;
}) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const active = exact ? path === to : path === to || path.startsWith(`${to}/`);

  return (
    <Link
      to={to}
      onClick={onNavigate}
      className={cn(
        "group relative flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors",
        active
          ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
          : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
      )}
    >
      {active && (
        <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-primary" />
      )}
      <Icon className={cn("size-4 shrink-0", active && "text-primary")} />
      <span className="truncate">{label}</span>
    </Link>
  );
}

function SidebarBody({ onNavigate }: { onNavigate?: () => void }) {
  const [demo, setDemo] = useState(true);

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b border-sidebar-border px-4">
        <Link to="/" aria-label="ECDAT home">
          <EcdatLogo />
        </Link>
      </div>

      <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-4">
        <div className="space-y-0.5">
          {nav.map((item) => (
            <NavLink key={item.to} {...item} onNavigate={onNavigate} />
          ))}
        </div>

        <div>
          <p className="px-2.5 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/70">
            Scanners
          </p>
          <div className="space-y-0.5">
            {scanners.map((item) => (
              <NavLink key={item.to} {...item} onNavigate={onNavigate} />
            ))}
          </div>
        </div>

        <div>
          <p className="px-2.5 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/70">
            Analysis
          </p>
          <div className="space-y-0.5">
            {tail.map((item) => (
              <NavLink key={item.to} {...item} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      </nav>

      <div className="space-y-3 border-t border-sidebar-border p-3">
        <div className="flex items-center justify-between rounded-md border border-border bg-secondary/40 px-2.5 py-2">
          <div>
            <p className="text-xs font-medium">Demo organization</p>
            <p className="text-[10px] text-muted-foreground">Realistic sample data</p>
          </div>
          <Switch checked={demo} onCheckedChange={setDemo} aria-label="Demo organization" />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex w-full items-center gap-2.5 rounded-md px-2 py-2 text-left transition-colors hover:bg-sidebar-accent/60">
              <span className="grid size-8 shrink-0 place-items-center rounded-full border border-primary/40 bg-primary/10 text-xs font-semibold text-primary">
                {currentUser.initials}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium">{currentUser.name}</span>
                <span className="block truncate text-[11px] text-muted-foreground">
                  {currentUser.role}
                </span>
              </span>
              <ChevronDown className="size-3.5 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
              {currentUser.email}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/app/settings">Organization settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/app/reports">My reports</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/auth/login">
                <LogOut className="size-4" /> Sign out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-sidebar-border bg-sidebar lg:block">
        <SidebarBody />
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-72 border-r border-sidebar-border bg-sidebar">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-3 z-10"
              onClick={() => setOpen(false)}
              aria-label="Close navigation"
            >
              <X className="size-4" />
            </Button>
            <SidebarBody onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-2 border-b border-border bg-background/85 px-4 backdrop-blur-md sm:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open navigation"
          >
            <Menu className="size-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Building2 className="size-4 text-primary" />
                <span className="hidden max-w-40 truncate sm:inline">
                  {organizations[0].name}
                </span>
                <ChevronDown className="size-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              <DropdownMenuLabel>Organizations</DropdownMenuLabel>
              {organizations.map((o) => (
                <DropdownMenuItem key={o.id} className="flex-col items-start gap-0.5">
                  <span className="text-sm">{o.name}</span>
                  <span className="text-[11px] text-muted-foreground">{o.industry}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="ml-auto flex items-center gap-1.5">
            <Button asChild size="sm" className="gap-2">
              <Link to="/app/scanners/repository">
                <Radar className="size-4" /> New scan
              </Link>
            </Button>
            <NotificationBell />
            <ThemeToggle />
          </div>
        </header>

        <main className="mx-auto max-w-[1600px] space-y-6 px-4 py-6 sm:px-6">{children}</main>
      </div>
    </div>
  );
}
