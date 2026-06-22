import type { ReactNode } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/LandingPage";

export function LegalPage({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="mx-auto max-w-3xl px-5 pt-32 pb-20 md:px-8">
        <h1 className="font-display text-3xl font-bold md:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
        <article className="mt-8 rounded-3xl bg-card p-7 shadow-card md:p-10">
          <div className="prose-legal space-y-6 text-[15px] leading-relaxed text-foreground/85">
            {children}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="font-display text-xl font-bold text-foreground md:text-2xl">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
