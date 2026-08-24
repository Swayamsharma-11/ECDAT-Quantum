import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/components/ecdat/app-shell";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <AppShell>
      {/* Required: nested app routes render here. */}
      <Outlet />
    </AppShell>
  );
}
