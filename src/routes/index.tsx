import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/site/LandingPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lil Champs — Toys that help little champs grow" },
      {
        name: "description",
        content:
          "Safe, expert-curated Montessori & sensory developmental toys for babies aged 0–15 months. Designed by child-development experts.",
      },
      { property: "og:title", content: "Lil Champs — Developmental Toys for Babies 0–15 Months" },
      {
        property: "og:description",
        content:
          "Safe, expert-curated developmental toys for every stage of your baby's first 15 months.",
      },
    ],
  }),
  component: LandingPage,
});
