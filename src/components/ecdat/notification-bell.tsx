import { AlertTriangle, Bell, CheckCircle2, Info, ShieldAlert } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { notifications } from "@/lib/ecdat/data";

const icons = {
  critical: ShieldAlert,
  high: AlertTriangle,
  medium: Info,
  low: Info,
  success: CheckCircle2,
} as const;

const colorVar = {
  critical: "var(--critical)",
  high: "var(--high)",
  medium: "var(--medium)",
  low: "var(--low)",
  success: "var(--low)",
} as const;

export function NotificationBell() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="size-4" />
          <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-critical text-critical pulse-dot" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-88 p-0">
        <div className="flex items-center justify-between border-b border-border px-3 py-2.5">
          <span className="text-sm font-semibold">Notifications</span>
          <span className="text-xs text-muted-foreground">{notifications.length} new</span>
        </div>
        <ul className="max-h-96 overflow-y-auto">
          {notifications.map((n) => {
            const Icon = icons[n.severity];
            return (
              <li key={n.id} className="border-b border-border/60 last:border-0">
                <div className="flex gap-2.5 px-3 py-2.5 transition-colors hover:bg-secondary/60">
                  <Icon className="mt-0.5 size-4 shrink-0" style={{ color: colorVar[n.severity] }} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-snug">{n.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{n.body}</p>
                    <p className="mt-1 text-[11px] text-muted-foreground/70">{n.time}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="border-t border-border p-2">
          <Button asChild variant="secondary" size="sm" className="w-full">
            <Link to="/app/inventory">Review all findings</Link>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
