import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AuthLayout } from "@/components/ecdat/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/auth/signup")({
  head: () => ({
    meta: [
      { title: "Start a free quantum readiness assessment — ECDAT" },
      {
        name: "description",
        content:
          "Create an ECDAT workspace and run your first cryptographic discovery scan in minutes.",
      },
      { property: "og:title", content: "Start a free assessment — ECDAT" },
      {
        property: "og:description",
        content: "Create your workspace and discover quantum-vulnerable cryptography.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [org, setOrg] = useState("Astra Financial Technologies");

  return (
    <AuthLayout
      title="Start your free assessment"
      subtitle="Spin up a workspace pre-loaded with a realistic demo estate."
      footer={
        <>
          Already have a workspace?{" "}
          <Link to="/auth/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Workspace created", { description: `${org} is ready.` });
          setTimeout(() => navigate({ to: "/app" }), 700);
        }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="first">First name</Label>
            <Input id="first" defaultValue="Swayam" required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="last">Last name</Label>
            <Input id="last" defaultValue="K." required />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Work email</Label>
          <Input id="email" type="email" defaultValue="swayam@astra-fintech.io" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="org">Organization</Label>
          <Input id="org" value={org} onChange={(e) => setOrg(e.target.value)} required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="role">Primary role</Label>
          <Select defaultValue="analyst">
            <SelectTrigger id="role">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="analyst">Security Analyst</SelectItem>
              <SelectItem value="auditor">Auditor</SelectItem>
              <SelectItem value="viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" defaultValue="demo-passphrase" required />
          <p className="text-xs text-muted-foreground">
            Minimum 12 characters. Enforced by organization policy.
          </p>
        </div>
        <Button type="submit" size="lg" className="w-full">
          Create workspace
        </Button>
      </form>
    </AuthLayout>
  );
}
