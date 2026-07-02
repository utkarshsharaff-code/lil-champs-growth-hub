import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type DbProduct = {
  id: string;
  name: string;
  price: string;
  image: string | null;
  emoji: string | null;
  tint: string | null;
  benefit: string;
  category: string | null;
};

const CATEGORIES = ["Teethers", "Rattles", "Soft Toys", "Books"];

export function ShopByCategory() {
  const [active, setActive] = useState(CATEGORIES[0]);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["category", active],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products" as never)
        .select("*")
        .eq("category", active)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as unknown as DbProduct[];
    },
  });

  return (
    <section id="categories" className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Shop by Category</p>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Browse toys by type</h2>
          <p className="mt-3 text-muted-foreground">
            Teethers, rattles, soft toys and books — pick a category to explore.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                active === c
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "bg-card text-foreground/70 shadow-soft hover:bg-accent"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <p className="col-span-full text-center text-muted-foreground">Loading…</p>
          ) : products.length === 0 ? (
            <p className="col-span-full text-center text-muted-foreground">No toys in this category yet.</p>
          ) : (
            products.map((p) => (
              <Link
                key={p.id}
                to="/product/$id"
                params={{ id: p.id }}
                className="group flex flex-col overflow-hidden rounded-3xl bg-card shadow-card transition hover-lift"
              >
                <div className={`grid aspect-[4/3] place-items-center overflow-hidden ${p.tint ?? "bg-primary/10"}`}>
                  {p.image ? (
                    <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="text-6xl">{p.emoji}</div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-bold">{p.name}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{p.benefit}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-display text-xl font-bold">{p.price}</span>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                      View <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
