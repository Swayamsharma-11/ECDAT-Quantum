import { createFileRoute, Link } from "@tanstack/react-router";
import { MailCheck } from "lucide-react";
import { useState } from "react";
import { AuthLayout } from "@/components/ecdat/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/auth/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset your password — ECDAT" },
      {
        name: "description",
        content: "Request a secure password reset link for your ECDAT workspace.",
      },
      { property: "og:title", content: "Reset your password — ECDAT" },
      { property: "og:description", content: "Request a secure password reset link." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ForgotPage,
});

function ForgotPage() {
  const [sent, setSent] = useState(false);

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="We'll email a single-use, time-bound reset link."
      footer={
        <>
          Remembered it?{" "}
          <Link to="/auth/login" className="font-medium text-primary hover:underline">
            Back to sign in
          </Link>
        </>
      }
    >
      {sent ? (
        <div className="panel flex gap-3 p-5">
          <MailCheck className="mt-0.5 size-5 shrink-0 text-low" />
          <div>
            <p className="text-sm font-medium">Reset link sent</p>
            <p className="mt-1 text-sm text-muted-foreground">
              If an account exists for that address, a reset link valid for 15 minutes is on its
              way. Every reset attempt is written to the audit log.
            </p>
            <Button asChild variant="outline" size="sm" className="mt-4">
              <Link to="/auth/login">Return to sign in</Link>
            </Button>
          </div>
        </div>
      ) : (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <div className="space-y-1.5">
            <Label htmlFor="email">Work email</Label>
            <Input id="email" type="email" defaultValue="swayam@astra-fintech.io" required />
          </div>
          <Button type="submit" size="lg" className="w-full">
            Send reset link
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}
