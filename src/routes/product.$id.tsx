import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, Check, ShoppingBag, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/context/CartContext";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/LandingPage";
import { ProductReviews } from "@/components/site/ProductReviews";

export const Route = createFileRoute("/product/$id")({
  component: ProductDetailPage,
});

type DbProduct = {
  id: string;
  name: string;
  age_group: string;
  age_group_label: string;
  age_group_tagline: string;
  price: string;
  image: string | null;
  emoji: string | null;
  tint: string | null;
  benefit: string;
  caption: string | null;
  description: string | null;
  features: string[] | null;
  how_to_play: string | null;
  milestones: string[] | null;
};

function ProductDetailPage() {
  const { id } = Route.useParams();
  const { addItem } = useCart();

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products" as never)
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      return (data ?? null) as unknown as DbProduct | null;
    },
  });

  function handleAddToCart() {
    if (!product) return;
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    toast.success("Added to cart");
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="pt-28 md:pt-32">
        <div className="mx-auto max-w-6xl px-5 pb-20 md:px-8 md:pb-28">
          <Link
            to="/"
            hash="products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:brightness-110"
          >
            <ArrowLeft size={16} /> Back to all toys
          </Link>

          {isLoading ? (
            <div className="mt-16 text-center text-muted-foreground">Loading toy…</div>
          ) : isError || !product ? (
            <div className="mt-16 rounded-3xl bg-card p-10 text-center shadow-soft">
              <h1 className="font-display text-2xl font-bold">Toy not found</h1>
              <p className="mt-3 text-muted-foreground">
                We couldn't find this toy. It may have been removed.
              </p>
              <Link
                to="/"
                hash="products"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:brightness-105"
              >
                Browse all toys <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <div className="mt-8 grid gap-10 md:mt-12 md:grid-cols-2 md:gap-14">
              <div
                className={`relative grid aspect-square place-items-center overflow-hidden rounded-3xl shadow-card ${
                  product.tint ?? "bg-primary/10"
                }`}
              >
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-center">
                    <div className="text-[8rem] leading-none">{product.emoji}</div>
                    {product.caption ? (
                      <p className="mt-3 px-6 text-xs font-medium text-muted-foreground">
                        {product.caption}
                      </p>
                    ) : null}
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-card px-4 py-1.5 text-xs font-semibold text-primary shadow-soft">
                  <Sparkles size={14} /> {product.age_group_label}
                </span>
                <h1 className="mt-5 font-display text-3xl font-bold leading-tight md:text-5xl">
                  {product.name}
                </h1>
                <div className="mt-4 font-display text-3xl font-bold text-foreground">
                  {product.price}
                </div>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                  {product.benefit}
                </p>

                <div className="mt-6 rounded-2xl bg-card p-5 shadow-soft">
                  <p className="font-display text-xs font-bold uppercase tracking-wider text-secondary">
                    Why it helps
                  </p>
                  <p className="mt-2 text-sm text-foreground/80">
                    Designed for the <span className="font-semibold">{product.age_group_label}</span>{" "}
                    stage — {product.age_group_tagline.toLowerCase()}.
                  </p>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:brightness-105 sm:w-auto"
                >
                  <ShoppingBag size={16} /> Add to cart <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {product && (product.description || product.features?.length || product.how_to_play || product.milestones?.length) ? (
            <div className="mt-12 grid gap-6 md:mt-16">
              {(product.description || product.features?.length) && (
                <section className="rounded-3xl bg-card p-7 shadow-card md:p-9">
                  <h2 className="font-display text-2xl font-bold md:text-3xl">Product Description</h2>
                  {product.description && (
                    <p className="mt-4 text-base leading-relaxed text-foreground/80">
                      {product.description}
                    </p>
                  )}
                  {product.features && product.features.length > 0 && (
                    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                      {product.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 rounded-2xl bg-primary/10 px-4 py-3">
                          <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                            <Check size={14} />
                          </span>
                          <span className="text-sm font-medium text-foreground">{f}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              )}

              {product.how_to_play && (
                <section className="rounded-3xl bg-card p-7 shadow-card md:p-9">
                  <h2 className="font-display text-2xl font-bold md:text-3xl">🧩 How to Play</h2>
                  <p className="mt-4 text-base leading-relaxed text-foreground/80">
                    {product.how_to_play}
                  </p>
                </section>
              )}

              {product.milestones && product.milestones.length > 0 && (
                <section className="rounded-3xl bg-card p-7 shadow-card md:p-9">
                  <h2 className="font-display text-2xl font-bold md:text-3xl">🎯 Benefits & Milestones</h2>
                  <ul className="mt-6 space-y-3">
                    {product.milestones.map((m) => (
                      <li key={m} className="flex items-start gap-3">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-secondary" />
                        <span className="text-sm leading-relaxed text-foreground/85 md:text-base">{m}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          ) : null}
          {product && <ProductReviews productId={id} />}
        </div>
      </main>
      <Footer />
    </div>
  );
}
