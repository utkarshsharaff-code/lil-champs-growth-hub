import { createFileRoute } from "@tanstack/react-router";
import { AuthForm } from "@/components/site/AuthForm";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Log in — Lil Champs" }] }),
  component: () => <AuthForm mode="login" />,
});
