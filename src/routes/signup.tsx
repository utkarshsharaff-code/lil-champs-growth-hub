import { createFileRoute } from "@tanstack/react-router";
import { AuthForm } from "@/components/site/AuthForm";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign up — Lil Champs" }] }),
  component: () => <AuthForm mode="signup" />,
});
