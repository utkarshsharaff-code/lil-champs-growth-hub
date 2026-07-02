import { useMemo, useState } from "react";
import {
  ShieldCheck,
  Sparkles,
  Leaf,
  Truck,
  Heart,
  Brain,
  Baby,
  Star,
  Instagram,
  Linkedin,
  MapPin,
  Mail,
  MessageCircle,
  ChevronDown,
  ArrowRight,
  Award,
  Stethoscope,
  Quote,
  ShoppingBag,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/context/CartContext";
import { Nav } from "./Nav";
import { Logo } from "./Logo";
import { Reveal } from "./Reveal";
import { WaveDivider } from "./WaveDivider";
import { AgeFinder } from "@/components/site/AgeFinder";
import { ShopByCategory } from "@/components/site/ShopByCategory";

const imgAtom = { url: "/products/atom-ball.jpg.jpg" };
const imgElephant = { url: "/products/baby-elephant.jpg.jpg" };
const imgBunnyWrist = { url: "/products/bunny-wristband.jpg.jpg" };
const imgChompy = { url: "/products/chompy.jpg.jpg" };
const imgEllie = { url: "/products/ellie-teether.jpg.jpg" };
const imgGiraffe = { url: "/products/giraffe.jpg.jpg" };
const imgHopBunny = { url: "/products/hop-bunny.jpg.jpg" };
const imgLion = { url: "/products/lion.jpg.jpg" };
const imgOctopus = { url: "/products/octopus.jpg.jpg" };
const imgTeether = { url: "/products/sensory-teether.jpg.jpg" };
const imgSnuggle = { url: "/products/snuggle.jpg.jpg" };
const imgSplash = { url: "/products/splash-read.jpg.jpg" };
const imgFounder = { url: "/products/founder.jpg.jpg" };



/* ---------- Data ---------- */

const reassurance = [
  { icon: Sparkles, label: "Designed by experts" },
  { icon: ShieldCheck, label: "Safety first" },
  { icon: Leaf, label: "Non-toxic materials" },
  { icon: Truck, label: "Free shipping" },
];

type Product = {
  name: string;
  benefit: string;
  price: string;
  emoji: string;
  caption: string;
  tint: string;
  image?: string;
};


const productGroups: { id: string; label: string; tagline: string; products: Product[] }[] = [
  {
    id: "0-3",
    label: "0–3 Months",
    tagline: "First focus, sound & comfort",
    products: [
      { name: "Baby Elephant Squeaky", benefit: "Squeaky sound for early auditory play & grasping", price: "₹349", emoji: "🐘", caption: "[Photo: Baby Elephant Squeaky]", tint: "bg-highlight/40", image: imgElephant.url },
      { name: "Snuggle Clutch", benefit: "High-contrast clutch with crinkly ears", price: "₹529", emoji: "🐭", caption: "[Photo: Snuggle Clutch]", tint: "bg-primary/15", image: imgSnuggle.url },
    ],
  },
  {
    id: "3-6",
    label: "3–6 Months",
    tagline: "Reach, grasp & sensory exploration",
    products: [
      { name: "Sensory Teether", benefit: "Multi-texture silicone soothes gums & builds grip", price: "₹449", emoji: "🦷", caption: "[Photo: Sensory Teether]", tint: "bg-secondary/25", image: imgTeether.url },
      { name: "Atom Ball & Rattle", benefit: "Bendable arms for gripping, shaking & motor skills", price: "₹649", emoji: "⚛️", caption: "[Photo: Atom Ball & Rattle]", tint: "bg-primary/15", image: imgAtom.url },
      { name: "Ellie Grip Teether (Set of 2)", benefit: "Elephant teether with multi-zone dot textures", price: "₹599", emoji: "🐘", caption: "[Photo: Ellie Grip Teether]", tint: "bg-highlight/40", image: imgEllie.url },
      { name: "Bunny Wristband Rattle", benefit: "Wearable rattle for movement & cause-effect play", price: "₹399", emoji: "🐰", caption: "[Photo: Bunny Wristband Rattle]", tint: "bg-secondary/25", image: imgBunnyWrist.url },
    ],
  },
  {
    id: "6-9",
    label: "6–9 Months",
    tagline: "Sit, explore & coordinate",
    products: [
      { name: "Octopus Soft Toy", benefit: "Easy-grasp arms with crinkle for bilateral coordination", price: "₹749", emoji: "🐙", caption: "[Photo: Octopus Soft Toy]", tint: "bg-highlight/40", image: imgOctopus.url },
      { name: "Lion Crochet Rattle", benefit: "Handcrafted lion with wooden ring & rattle inside", price: "₹699", emoji: "🦁", caption: "[Photo: Lion Crochet Rattle]", tint: "bg-primary/15", image: imgLion.url },
    ],
  },
  {
    id: "9-12",
    label: "9–12 Months",
    tagline: "Cause-effect & fine motor",
    products: [
      { name: "Splash & Read Bath Book Set (2 Books)", benefit: "Waterproof Hippo & Dolphin books for bath-time stories", price: "₹629", emoji: "🐬", caption: "[Photo: Splash & Read Bath Book Set]", tint: "bg-primary/15", image: imgSplash.url },
      { name: "Giraffe Rattle Pal — Brown", benefit: "Soft giraffe pal with a gentle rattle to hold & shake", price: "₹479", emoji: "🦒", caption: "[Photo: Giraffe Rattle Pal — Brown]", tint: "bg-secondary/25", image: imgGiraffe.url },
    ],
  },
  {
    id: "12-15",
    label: "12–15 Months",
    tagline: "Walk, hug & imagine",
    products: [
      { name: "Hop & Pull Bunny", benefit: "Stretchable ears & limbs for pulling & tactile play", price: "₹779", emoji: "🐰", caption: "[Photo: Hop & Pull Bunny]", tint: "bg-highlight/40", image: imgHopBunny.url },
      { name: "Chompy — Alligator Plush", benefit: "Soft, friendly plush for cuddles & emotional comfort", price: "₹719", emoji: "🐊", caption: "[Photo: Chompy Alligator Plush]", tint: "bg-primary/15", image: imgChompy.url },
    ],
  },
];


const guidance = [
  {
    title: "Usage Instructions",
    body: "Introduce one toy at a time on a clean, soft surface. Sit at your baby's eye level, narrate gently, and let them lead the play. Rotate toys every few days to keep curiosity fresh and avoid overstimulation.",
  },
  {
    title: "Developmental Guidance",
    body: "Each toy is mapped to a developmental window — visual focus (0–3m), grasp & midline play (3–6m), sit & explore (6–9m), pull-up & pincer grip (9–12m), and first steps & language (12–15m). Meet your baby where they are and gently stretch what they can do next.",
  },
  {
    title: "Safety & Care",
    body: "Wipe wooden toys with a soft, slightly damp cloth — never submerge. Silicone teethers can be sterilised in warm water. Inspect toys before each play session and store dry. Always supervise play.",
  },
];

const certifications = [
  { icon: Award, label: "BIS Certified (IS 9873)" },
  { icon: ShieldCheck, label: "EN71 Compliant" },
  { icon: Stethoscope, label: "ASTM F963 Safe" },
  { icon: Leaf, label: "BPA & Phthalate-Free" },
];

const testimonials = [
  { name: "Priya S., Mumbai", quote: "The Sensory Teether was a lifesaver during teething — soft, easy to clean, and my baby actually loves it.", initial: "P" },
  { name: "Rahul & Anjali, Bengaluru", quote: "Beautifully made and clearly thought through by people who understand babies. The Atom Ball is a daily favourite.", initial: "R" },
  { name: "Neha K., Delhi", quote: "My daughter's grip improved so much with the Lion Crochet Rattle. Love the Montessori approach.", initial: "N" },
  { name: "Karthik R., Chennai", quote: "Safe, sturdy, and genuinely developmental. The non-toxic materials gave me real peace of mind.", initial: "K" },
  { name: "Sanya M., Gurugram", quote: "Lil Champs has become our go-to gift for every new parent we know. The packaging feels premium.", initial: "S" },
  { name: "Meera J., Pune", quote: "The age-stage guidance helped me pick exactly the right toy for my 6-month-old. So reassuring.", initial: "M" },
];

/* ---------- Page ---------- */

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <MissionVisionAbout />
      <Founder />
      <AgeFinder />
      <Products />
      <ShopByCategory />
      <ForParents />
      <Testimonials />
      <Footer />
    </div>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-28 md:pt-32">
      {/* soft blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute top-20 right-[-6rem] h-96 w-96 rounded-full bg-secondary/25 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-highlight/40 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 md:grid-cols-2 md:px-8 md:pb-24">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-1.5 text-xs font-semibold text-primary shadow-soft">
            <Sparkles size={14} /> Montessori-inspired · 0–15 months
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            Toys that help{" "}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10 text-primary">little champs</span>
              <span aria-hidden className="absolute inset-x-0 bottom-1 -z-0 h-3 rounded-full bg-highlight/70 md:bottom-2 md:h-4" />
            </span>{" "}
            grow.
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
            Safe, expert-curated developmental toys for every stage of your baby's first
            15 months. Because <span className="font-semibold text-foreground">80% of a baby's brain
            develops by age 3</span> — every play moment matters.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#products"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover-lift"
            >
              Shop Products <ArrowRight size={16} />
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 rounded-full bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-soft transition hover-lift"
            >
              Our Philosophy
            </a>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div className="absolute inset-0 rounded-[42%_58%_46%_54%/52%_44%_56%_48%] bg-gradient-to-br from-primary/30 via-highlight/40 to-secondary/40 animate-float" />
            <div className="absolute inset-6 rounded-[48%_52%_44%_56%/46%_54%_46%_54%] bg-card shadow-soft" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center">
                <img src={imgAtom.url} alt="Atom Ball — hero" className="mx-auto h-44 w-44 object-contain" />
              </div>
            </div>
            {/* floating chips */}
            <div className="absolute -left-4 top-10 hidden rounded-2xl bg-card px-3 py-2 shadow-soft md:block">
              <div className="flex items-center gap-2 text-xs font-semibold">
                <Brain size={14} className="text-primary" /> Brain-building play
              </div>
            </div>
            <div className="absolute -right-2 bottom-10 hidden rounded-2xl bg-card px-3 py-2 shadow-soft md:block">
              <div className="flex items-center gap-2 text-xs font-semibold">
                <Heart size={14} className="text-secondary" /> Loved by parents
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Reassurance strip */}
      <Reveal>
        <div className="mx-auto max-w-7xl px-5 pb-14 md:px-8">
          <ul className="grid grid-cols-2 gap-3 rounded-3xl bg-card p-4 shadow-soft md:grid-cols-4 md:p-5">
            {reassurance.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 rounded-2xl px-3 py-2">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                  <Icon size={18} />
                </span>
                <span className="text-sm font-semibold">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- Mission / Vision / About ---------- */

function MissionVisionAbout() {
  const blocks = [
    {
      icon: Heart,
      title: "Our Mission",
      body: "To craft safe, science-backed toys that nurture every stage of a baby's early development.",
      tint: "bg-secondary/25",
    },
    {
      icon: Sparkles,
      title: "Our Vision",
      body: "To become every parent's most trusted partner through their child's first 15 months.",
      tint: "bg-primary/20",
    },
    {
      icon: Baby,
      title: "About Lil Champs",
      body: "A D2C brand making milestone-based developmental toys — each designed for a specific developmental window, because the early months shape how a baby's brain connects.",
      tint: "bg-highlight/50",
    },
  ];
  return (
    <section id="about" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Our Philosophy</p>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              Toys that meet your baby where they are
            </h2>
            <p className="mt-3 text-muted-foreground">
              And gently stretch what they can do next — designed by child-development experts,
              built around the milestones that matter.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {blocks.map((b, i) => (
            <Reveal key={b.title} delay={i * 100}>
              <article className="h-full rounded-3xl bg-card p-7 shadow-card hover-lift">
                <span className={`grid h-12 w-12 place-items-center rounded-2xl ${b.tint} text-foreground`}>
                  <b.icon size={22} />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Founder ---------- */

function Founder() {
  return (
    <section id="founder" className="relative">
      <WaveDivider color="color-mix(in oklab, var(--color-primary) 14%, var(--color-background))" />
      <div className="bg-[color-mix(in_oklab,var(--color-primary)_14%,var(--color-background))] py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-2 md:px-8">
          <Reveal>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
              <div className="absolute -inset-4 rounded-[2rem] bg-secondary/30" />
              <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-card shadow-soft">
                <img
                  src={imgFounder.url}
                  alt="Utkarsh Sharaff — Founder of Lil Champs"
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </div>
            <p className="mt-4 text-center font-display text-sm font-semibold text-muted-foreground">
              Utkarsh Sharaff — Founder
            </p> 
            <a
              href="https://www.linkedin.com/in/utkarsh-sharaff/"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto mt-3 flex w-fit items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition hover:brightness-105"
            >
              <Linkedin size={16} /> Connect on LinkedIn
            </a>
          </Reveal>


          <Reveal delay={120}>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
              Meet the Founder
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              Built by a parent, for parents.
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/80">
              <p>
                Hi, I'm <span className="font-semibold text-foreground">Utkarsh Sharaff</span> —
                the parent and founder behind Lil Champs.
              </p>
              <p className="text-muted-foreground">
                Before Lil Champs, I worked as an Investment Banker and as a Venture Capitalist —
                experiences that taught me how to spot what truly matters and build with intention.
              </p>

              <div className="rounded-2xl bg-card p-5 shadow-soft">
                <p className="font-display text-sm font-bold uppercase tracking-wider text-secondary">
                  The Problem
                </p>
                <p className="mt-2 text-foreground/80">
                  When I became a parent in India, I struggled to find toys that were
                  <span className="font-semibold"> safe, genuinely developmental, and age-appropriate</span> for
                  my own child. Most options were either flashy and plasticky or expensive imports
                  with no clear purpose. So I built Lil Champs — to give every parent toys
                  they can fully trust.
                </p>
              </div>
              <p className="text-muted-foreground">
                Every product is reviewed against safety standards, designed around a milestone, and
                made to be loved by little hands for years to come.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
      <WaveDivider flip color="color-mix(in oklab, var(--color-primary) 14%, var(--color-background))" />
    </section>
  );
}

/* ---------- Products ---------- */

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
  sort_order: number;
};

function Products() {
  const { addItem } = useCart();

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products" as never)
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as unknown as DbProduct[];
    },
  });

  const groups = useMemo(() => {
    const map = new Map<string, { id: string; label: string; tagline: string; products: DbProduct[] }>();
    (data ?? []).forEach((p) => {
      if (!map.has(p.age_group)) {
        map.set(p.age_group, {
          id: p.age_group,
          label: p.age_group_label,
          tagline: p.age_group_tagline,
          products: [],
        });
      }
      map.get(p.age_group)!.products.push(p);
    });
    return Array.from(map.values());
  }, [data]);

  const [active, setActive] = useState<string | null>(null);
  const activeId = active ?? groups[0]?.id ?? null;
  const group = groups.find((g) => g.id === activeId);

  function handleAddToCart(p: DbProduct) {
    addItem({ productId: p.id, name: p.name, price: p.price, image: p.image });
    toast.success("Added to cart");
  }

  return (
    <section id="products" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Our Toys</p>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              Made for every stage
            </h2>
            <p className="mt-3 text-muted-foreground">
              Each toy is designed for a specific developmental window — pick your baby's age
              and discover the toys that meet them right where they are.
            </p>
          </div>
        </Reveal>

        {isLoading || !group ? (
          <div className="mt-16 text-center text-muted-foreground">Loading toys…</div>
        ) : (
          <>
            <Reveal delay={80}>
              <div className="mt-10 flex flex-wrap justify-center gap-2 rounded-3xl bg-card p-2 shadow-soft md:mx-auto md:w-fit">
                {groups.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setActive(g.id)}
                    className={`rounded-2xl px-4 py-2.5 text-sm font-semibold transition ${
                      activeId === g.id
                        ? "bg-primary text-primary-foreground shadow-soft"
                        : "text-foreground/70 hover:bg-accent"
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </Reveal>

            <div className="mt-4 text-center text-sm font-medium text-muted-foreground">
              {group.tagline}
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {group.products.map((p, i) => (
                <Reveal key={p.id} delay={i * 90}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-card shadow-card hover-lift">
                    <Link
                      to="/product/$id"
                      params={{ id: p.id }}
                      className={`relative grid aspect-[4/3] place-items-center overflow-hidden ${p.tint ?? "bg-primary/10"}`}
                    >
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.name}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="text-center">
                          <div className="text-7xl transition-transform duration-500 group-hover:scale-110">
                            {p.emoji}
                          </div>
                          <p className="mt-2 px-4 text-xs font-medium text-muted-foreground">
                            {p.caption}
                          </p>
                        </div>
                      )}
                    </Link>

                    <div className="flex flex-1 flex-col p-6">
                      <Link
                        to="/product/$id"
                        params={{ id: p.id }}
                        className="font-display text-lg font-bold transition hover:text-primary"
                      >
                        <h3>{p.name}</h3>
                      </Link>
                      <p className="mt-1 text-sm text-muted-foreground">{p.benefit}</p>
                      <div className="mt-4 flex items-baseline gap-2">
                        <span className="font-display text-xl font-bold text-foreground">{p.price}</span>
                      </div>
                      <div className="mt-5 flex flex-wrap items-center gap-3">
                        <button
                          onClick={() => handleAddToCart(p)}
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:brightness-105"
                        >
                          <ShoppingBag size={14} /> Add to cart
                        </button>
                        <Link
                          to="/product/$id"
                          params={{ id: p.id }}
                          className="text-sm font-semibold text-primary transition hover:brightness-110"
                        >
                          View details →
                        </Link>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}


/* ---------- For Parents ---------- */

function ForParents() {
  const [open, setOpen] = useState(0);
  return (
    <section id="parents" className="relative">
      <WaveDivider color="color-mix(in oklab, var(--color-highlight) 35%, var(--color-background))" />
      <div className="bg-[color-mix(in_oklab,var(--color-highlight)_35%,var(--color-background))] py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <Reveal>
            <div className="text-center">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
                For Parents
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
                Guidance for parents
              </h2>
              <p className="mt-3 text-muted-foreground">
                Practical, expert-led notes to help you get the most out of every play moment.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 space-y-3">
            {guidance.map((g, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={g.title} delay={i * 80}>
                  <div className="overflow-hidden rounded-3xl bg-card shadow-soft">
                    <button
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span className="font-display text-base font-bold md:text-lg">{g.title}</span>
                      <ChevronDown
                        size={20}
                        className={`shrink-0 text-primary transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <div
                      className={`grid transition-all duration-300 ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground md:text-base">
                          {g.body}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
      <WaveDivider flip color="color-mix(in oklab, var(--color-highlight) 35%, var(--color-background))" />
    </section>
  );
}

/* ---------- Testimonials ---------- */

function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
              Testimonials & Certifications
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              Trusted by parents & backed by science
            </h2>
          </div>
        </Reveal>

        {/* Certifications */}
        <Reveal delay={80}>
          <ul className="mt-10 grid grid-cols-2 gap-3 rounded-3xl bg-card p-4 shadow-soft md:grid-cols-4 md:p-5">
            {certifications.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-3 rounded-2xl px-3 py-2"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                  <Icon size={18} />
                </span>
                <span className="text-sm font-semibold">{label}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Reviews */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 70}>
              <article className="flex h-full flex-col rounded-3xl bg-card p-6 shadow-card hover-lift">
                <Quote size={22} className="text-secondary" />
                <p className="mt-3 text-sm leading-relaxed text-foreground/85 md:text-base">
                  "{t.quote}"
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/20 font-display font-bold text-primary">
                    {t.initial}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{t.name}</p>
                    <div className="flex gap-0.5 text-secondary">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} size={14} fill="currentColor" strokeWidth={0} />
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */

export function Footer() {
  return (
    <footer id="contact" className="relative">
      <WaveDivider color="var(--color-foreground)" />
      <div className="bg-foreground text-background">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-3 md:px-8 md:py-20">
          <div>
            <div className="flex items-center gap-2">
              <Logo className="h-10 w-auto" variant="dark" />
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-background/75">
              Your trusted partner to unlock your child's potential.
            </p>

            <div className="mt-6 flex gap-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-full bg-background/10 transition hover:bg-background/20"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="grid h-10 w-10 place-items-center rounded-full bg-background/10 transition hover:bg-background/20"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://wa.me/910000000000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="grid h-10 w-10 place-items-center rounded-full bg-background/10 transition hover:bg-background/20"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="mailto:hello@lilchamps.example"
                aria-label="Email"
                className="grid h-10 w-10 place-items-center rounded-full bg-background/10 transition hover:bg-background/20"
              >
                <Mail size={18} />
              </a>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=DLF+Cyber+Park+Udyog+Vihar+Sector+20+Gurugram"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm text-background/80 hover:text-background"
            >
              <MapPin size={16} /> 4th Floor, Tower C, DLF Cyberpark, Udyog Vihar, Sector 20, Gurugram, Haryana 122016 · Find us
            </a>
          </div>

          <div>
            <p className="font-display text-base font-bold">Quick links</p>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-background/75">
              {[
                ["Home", "#home"],
                ["About", "#about"],
                ["Founder", "#founder"],
                ["Products", "#products"],
                ["For Parents", "#parents"],
                ["Testimonials", "#testimonials"],
              ].map(([label, href]) => (
                <li key={href}>
                  <a className="transition hover:text-background" href={href}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display text-base font-bold">Joyful growth — straight to your inbox.</p>
            <p className="mt-2 text-sm text-background/70">
              Milestone tips, gentle parenting notes, and early access to new toys.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex flex-col gap-2 sm:flex-row"
            >
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="flex-1 rounded-full bg-background/10 px-4 py-3 text-sm text-background placeholder:text-background/50 outline-none ring-1 ring-background/15 focus:ring-primary"
              />
              <button
                type="submit"
                className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-105"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-background/10">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-background/60 sm:flex-row md:px-8">
            <p>© {new Date().getFullYear()} Lil Champs® — a registered trademark, based in Gurugram, Haryana, India. All rights reserved.</p>
            <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              <a href="/privacy-policy" className="transition hover:text-background">Privacy Policy</a>
              <a href="/terms" className="transition hover:text-background">Terms of Service</a>
              <a href="/shipping-returns" className="transition hover:text-background">Shipping & Returns</a>
            </nav>
            <p>Made with care for little champs.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
