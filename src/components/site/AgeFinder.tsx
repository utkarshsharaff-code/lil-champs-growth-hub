import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Sparkles, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type DbProduct = {
  id: string;
  name: string;
  price: string;
  image: string | null;
  emoji: string | null;
  tint: string | null;
  age_group: string;
  age_group_label: string;
  benefit: string;
};

const AGE_BANDS = [
  { id: "0-3", label: "0–3 months" },
  { id: "3-6", label: "3–6 months" },
  { id: "6-9", label: "6–9 months" },
  { id: "9-12", label: "9–12 months" },
  { id: "12-15", label: "12–15 months" },
];

export function AgeFinder() {
  const [selected, setSelected] = useState<string | null>(null);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["age-finder", selected],
    enabled: !!selected,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products" as never)
        .select("*")
        .eq("age_group", selected)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as unknown as DbProduct[];
    },
  });

  const selectedLabel = AGE_BANDS.find((b) => b.id === selected)?.label;

  return (
    <section id="age-finder" className="py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <div className="rounded-[2rem] bg-card p-8 shadow-card md:p-12">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
              <Sparkles size={14} /> Age Finder
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
              Find the right toys for your baby's age
            </h2>
            <p className="mt-3 text-muted-foreground">
              Tap your baby's age and we'll show the toys designed for that exact stage.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {AGE_BANDS.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelected(b.id)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  selected === b.id
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "bg-background text-foreground/70 ring-1 ring-border hover:bg-accent"
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>

          {selected && (
            <div className="mt-10">
              <p className="text-center text-sm font-semibold text-muted-foreground">
                Recommended for {selectedLabel}
              </p>
              {isLoading ? (
                <p className="mt-6 text-center text-muted-foreground">Finding toys…</p>
              ) : products.length === 0 ? (
                <p className="mt-6 text-center text-muted-foreground">No toys for this stage yet.</p>
              ) : (
                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {products.map((p) => (
                    <Link
                      key={p.id}
                      to="/product/$id"
                      params={{ id: p.id }}
                      className="group flex flex-col overflow-hidden rounded-3xl bg-background shadow-soft ring-1 ring-border transition hover-lift"
                    >
                      <div className={`grid aspect-[4/3] place-items-center overflow-hidden ${p.tint ?? "bg-primary/10"}`}>
                        {p.image ? (
                          <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        ) : (
                          <div className="text-6xl">{p.emoji}</div>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-4">
                        <h3 className="font-display text-base font-bold">{p.name}</h3>
                        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{p.benefit}</p>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="font-display text-lg font-bold">{p.price}</span>
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                            View <ArrowRight size={12} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
