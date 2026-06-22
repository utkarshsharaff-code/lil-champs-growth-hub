import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Nav } from "@/components/site/Nav";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/my-orders")({
  head: () => ({ meta: [{ title: "My Orders — Lil Champs" }] }),
  component: MyOrdersPage,
});

type Order = {
  id: string;
  product_name: string;
  price: string;
  created_at: string;
};

function MyOrdersPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate({ to: "/login" });
      return;
    }
    (async () => {
      const { data, error } = await supabase
        .from("orders" as never)
        .select("*")
        .order("created_at", { ascending: false });
      if (error) setError(error.message);
      else setOrders((data ?? []) as unknown as Order[]);
    })();
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="mx-auto max-w-4xl px-5 pt-32 pb-20 md:px-8">
        <h1 className="font-display text-3xl font-bold md:text-4xl">My Orders</h1>
        <p className="mt-2 text-muted-foreground">Your placed orders, freshest first.</p>

        <div className="mt-8">
          {error && <p className="text-sm text-destructive">{error}</p>}
          {orders === null ? (
            <p className="text-muted-foreground">Loading…</p>
          ) : orders.length === 0 ? (
            <div className="rounded-3xl bg-card p-10 text-center shadow-card">
              <p className="text-muted-foreground">No orders yet.</p>
              <Link
                to="/"
                hash="products"
                className="mt-5 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft"
              >
                Browse toys
              </Link>
            </div>
          ) : (
            <ul className="space-y-3">
              {orders.map((o) => (
                <li
                  key={o.id}
                  className="flex items-center justify-between gap-4 rounded-2xl bg-card p-5 shadow-card"
                >
                  <div>
                    <p className="font-display text-lg font-bold">{o.product_name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {new Date(o.created_at).toLocaleString()}
                    </p>
                  </div>
                  <span className="font-display text-lg font-bold">{o.price}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
