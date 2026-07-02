import { useState, type FormEvent } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

type Review = {
  id: string;
  user_id: string;
  rating: number;
  comment: string | null;
  reviewer_name: string | null;
  created_at: string;
};

function Stars({ value, size = 16 }: { value: number; size?: number }) {
  const rounded = Math.round(value);
  return (
    <div className="flex gap-0.5 text-secondary">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          fill={i < rounded ? "currentColor" : "none"}
          strokeWidth={i < rounded ? 0 : 1.5}
          className={i < rounded ? "" : "text-muted-foreground/40"}
        />
      ))}
    </div>
  );
}

export function ProductReviews({ productId }: { productId: string }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews", productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews" as never)
        .select("*")
        .eq("product_id", productId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as unknown as Review[];
    },
  });

  const count = reviews.length;
  const avg = count ? reviews.reduce((s, r) => s + r.rating, 0) / count : 0;
  const alreadyReviewed = !!user && reviews.some((r) => r.user_id === user.id);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!user) return;
    if (rating < 1) {
      toast.error("Please select a star rating");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("reviews" as never).insert({
      product_id: productId,
      user_id: user.id,
      rating,
      comment: comment.trim() || null,
      reviewer_name: user.email ? user.email.split("@")[0] : "Parent",
    } as never);
    setSubmitting(false);
    if (error) {
      toast.error(error.message || "Could not submit review");
      return;
    }
    toast.success("Thanks for your review!");
    setRating(0);
    setComment("");
    queryClient.invalidateQueries({ queryKey: ["reviews", productId] });
  }

  return (
    <section className="mt-12 md:mt-16">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="font-display text-2xl font-bold md:text-3xl">Reviews</h2>
        {count > 0 && (
          <div className="flex items-center gap-2">
            <Stars value={avg} />
            <span className="text-sm font-semibold text-foreground/80">
              {avg.toFixed(1)} · {count} {count === 1 ? "review" : "reviews"}
            </span>
          </div>
        )}
      </div>

      {user ? (
        alreadyReviewed ? (
          <p className="mt-4 rounded-2xl bg-card p-4 text-sm text-muted-foreground shadow-soft">
            You've already reviewed this toy — thank you!
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 rounded-3xl bg-card p-6 shadow-card">
            <p className="text-sm font-semibold">Leave a review</p>
            <div className="mt-3 flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => {
                const val = i + 1;
                const active = val <= (hover || rating);
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setRating(val)}
                    onMouseEnter={() => setHover(val)}
                    onMouseLeave={() => setHover(0)}
                    aria-label={`${val} star${val > 1 ? "s" : ""}`}
                    className="text-secondary"
                  >
                    <Star
                      size={28}
                      fill={active ? "currentColor" : "none"}
                      strokeWidth={active ? 0 : 1.5}
                      className={active ? "" : "text-muted-foreground/40"}
                    />
                  </button>
                );
              })}
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share what you and your little one thought…"
              rows={3}
              className="mt-4 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <button
              type="submit"
              disabled={submitting}
              className="mt-4 inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:brightness-105 disabled:opacity-60"
            >
              {submitting ? "Submitting…" : "Submit review"}
            </button>
          </form>
        )
      ) : (
        <p className="mt-6 rounded-2xl bg-card p-4 text-sm text-muted-foreground shadow-soft">
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Log in
          </Link>{" "}
          to leave a review.
        </p>
      )}

      <div className="mt-8 space-y-4">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading reviews…</p>
        ) : count === 0 ? (
          <p className="rounded-2xl bg-card p-5 text-sm text-muted-foreground shadow-soft">
            No reviews yet — be the first!
          </p>
        ) : (
          reviews.map((r) => (
            <article key={r.id} className="rounded-2xl bg-card p-5 shadow-soft">
              <div className="flex items-center justify-between gap-3">
                <span className="font-semibold capitalize">{r.reviewer_name || "Parent"}</span>
                <Stars value={r.rating} size={14} />
              </div>
              {r.comment && (
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">{r.comment}</p>
              )}
              <p className="mt-2 text-xs text-muted-foreground">
                {new Date(r.created_at).toLocaleDateString()}
              </p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
