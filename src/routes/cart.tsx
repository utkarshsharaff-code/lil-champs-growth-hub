import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/LandingPage";
import { useCart, parsePrice, formatPriceINR } from "@/context/CartContext";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — Lil Champs" }] }),
  component: CartPage,
});

function CartPage() {
  const { items, subtotal, increment, decrement, removeItem, clear } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);

  async function handleCheckout() {
    if (items.length === 0) return;
    if (!user) {
      toast.info("Please log in to checkout");
      navigate({ to: "/login" });
      return;
    }
    setPlacing(true);
    const rows = items.map((i) => ({
      user_id: user.id,
      product_name: i.name,
      price: i.price,
      quantity: i.quantity,
    }));
    const { error } = await supabase.from("orders" as never).insert(rows as never);
    setPlacing(false);
    if (error) {
      toast.error(error.message || "Could not place order");
      return;
    }
    toast.success("Order placed!");
    clear();
    navigate({ to: "/my-orders" });
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
            <ArrowLeft size={16} /> Continue shopping
          </Link>

          <h1 className="mt-6 font-display text-3xl font-bold md:text-4xl">Your Cart</h1>

          {items.length === 0 ? (
            <div className="mt-10 rounded-3xl bg-card p-10 text-center shadow-card">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary/15 text-primary">
                <ShoppingBag size={28} />
              </div>
              <h2 className="mt-5 font-display text-xl font-bold">Your cart is empty</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Add some toys to get started.
              </p>
              <Link
                to="/"
                hash="products"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:brightness-105"
              >
                Browse toys <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
              <ul className="space-y-4">
                {items.map((i) => {
                  const unit = parsePrice(i.price);
                  const line = unit * i.quantity;
                  return (
                    <li
                      key={i.productId}
                      className="flex gap-4 rounded-3xl bg-card p-4 shadow-card md:p-5"
                    >
                      <Link
                        to="/product/$id"
                        params={{ id: i.productId }}
                        className="grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-2xl bg-primary/10 md:h-28 md:w-28"
                      >
                        {i.image ? (
                          <img
                            src={i.image}
                            alt={i.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-3xl">🧸</span>
                        )}
                      </Link>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <Link
                            to="/product/$id"
                            params={{ id: i.productId }}
                            className="font-display text-base font-bold leading-tight transition hover:text-primary md:text-lg"
                          >
                            {i.name}
                          </Link>
                          <button
                            onClick={() => removeItem(i.productId)}
                            aria-label="Remove from cart"
                            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-background text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {formatPriceINR(unit)} each
                        </p>
                        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                          <div className="inline-flex items-center rounded-full bg-background p-1 shadow-soft">
                            <button
                              onClick={() => decrement(i.productId)}
                              aria-label="Decrease quantity"
                              className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-accent"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="min-w-[2rem] text-center text-sm font-semibold">
                              {i.quantity}
                            </span>
                            <button
                              onClick={() => increment(i.productId)}
                              aria-label="Increase quantity"
                              className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-accent"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="font-display text-lg font-bold">
                            {formatPriceINR(line)}
                          </span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <aside className="h-fit rounded-3xl bg-card p-6 shadow-card md:p-7 lg:sticky lg:top-28">
                <h2 className="font-display text-xl font-bold">Order summary</h2>
                <dl className="mt-5 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Subtotal</dt>
                    <dd className="font-semibold">{formatPriceINR(subtotal)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Shipping</dt>
                    <dd className="font-semibold text-primary">Free</dd>
                  </div>
                </dl>
                <div className="mt-5 flex items-baseline justify-between border-t border-border pt-4">
                  <span className="font-display text-base font-bold">Total</span>
                  <span className="font-display text-2xl font-bold">
                    {formatPriceINR(subtotal)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={placing}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:brightness-105 disabled:opacity-60"
                >
                  {placing ? "Placing…" : "Proceed to checkout"} <ArrowRight size={16} />
                </button>
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  {user ? "Secure checkout" : "You'll be asked to log in"}
                </p>
              </aside>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
