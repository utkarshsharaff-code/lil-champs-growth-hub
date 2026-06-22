import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Sparkles, LogOut, ShoppingBag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/context/CartContext";

const links = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#founder", label: "Founder" },
  { href: "/#products", label: "Products" },
  { href: "/#parents", label: "For Parents" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();
  const { totalCount } = useCart();

  const CartIcon = ({ onClick }: { onClick?: () => void }) => (
    <Link
      to="/cart"
      onClick={onClick}
      aria-label={`Cart (${totalCount} items)`}
      className="relative grid h-10 w-10 place-items-center rounded-full bg-card shadow-soft transition hover:brightness-105"
    >
      <ShoppingBag size={18} />
      {totalCount > 0 && (
        <span className="absolute -right-1 -top-1 grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-primary px-1 text-[10px] font-bold leading-none text-primary-foreground shadow-soft">
          {totalCount > 99 ? "99+" : totalCount}
        </span>
      )}
    </Link>
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled
          ? "bg-background/85 backdrop-blur-md shadow-[0_2px_20px_-12px_rgba(0,0,0,0.2)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a href="/#home" className="flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-soft">
            <Sparkles size={20} strokeWidth={2.4} />
          </span>
          <span className="font-display text-xl font-bold tracking-tight">
            Lil Champs
          </span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-semibold text-foreground/75 transition-colors hover:text-primary"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <>
              <Link
                to="/my-orders"
                className="text-sm font-semibold text-foreground/80 transition-colors hover:text-primary"
              >
                My Orders
              </Link>
              <span className="max-w-[180px] truncate text-sm font-semibold text-foreground/75">
                {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition hover:brightness-105"
              >
                <LogOut size={14} /> Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-semibold text-foreground/80 transition-colors hover:text-primary"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition hover:brightness-105"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full bg-card shadow-soft lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur lg:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-foreground/80 hover:bg-accent"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              {user ? (
                <div className="space-y-2">
                  <div className="px-3 text-xs text-foreground/60">{user.email}</div>
                  <Link
                    to="/my-orders"
                    onClick={() => setOpen(false)}
                    className="block rounded-full border border-border px-5 py-3 text-center text-sm font-semibold text-foreground/80"
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={() => {
                      setOpen(false);
                      handleLogout();
                    }}
                    className="block w-full rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground"
                  >
                    Log out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="block rounded-full border border-border px-5 py-3 text-center text-sm font-semibold text-foreground/80"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setOpen(false)}
                    className="block rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
