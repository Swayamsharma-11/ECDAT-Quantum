import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AuthLayout } from "@/components/ecdat/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/auth/login")({
  head: () => ({
    meta: [
      { title: "Sign in — ECDAT" },
      { name: "description", content: "Sign in to the ECDAT cryptographic discovery and quantum risk platform." },
      { property: "og:title", content: "Sign in — ECDAT" },
      { property: "og:description", content: "Access your organization's cryptographic posture and PQC roadmap." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("swayam@astra-fintech.io");
  const [password, setPassword] = useState("demo-passphrase");
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    toast.success("Demo session established", {
      description: "Loading Astra Financial Technologies posture.",
    });
    setTimeout(() => navigate({ to: "/app" }), 700);
  };

  return (
    <AuthLayout
      title="Sign in to ECDAT"
      subtitle="Demo credentials are pre-filled — no real account required."
      footer={
        <>
          No account yet?{" "}
          <Link to="/auth/signup" className="font-medium text-primary hover:underline">
            Start a free assessment
          </Link>
        </>
      }
    >
      <form onSubmit={submit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Work email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              to="/auth/forgot-password"
              className="text-xs text-muted-foreground hover:text-primary"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <Checkbox defaultChecked /> Keep me signed in on this device
        </label>
        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          {loading && <Loader2 className="size-4 animate-spin" />}
          {loading ? "Authenticating" : "Sign in"}
        </Button>
        <Button asChild type="button" variant="outline" className="w-full">
          <Link to="/app">Continue in demo mode</Link>
        </Button>
      </form>
    </AuthLayout>
  );
}
