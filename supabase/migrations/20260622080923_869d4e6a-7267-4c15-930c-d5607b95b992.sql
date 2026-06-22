
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  age_group TEXT NOT NULL,
  age_group_label TEXT NOT NULL,
  age_group_tagline TEXT NOT NULL,
  price TEXT NOT NULL,
  image TEXT,
  emoji TEXT,
  tint TEXT,
  benefit TEXT NOT NULL,
  caption TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.products TO anon, authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Products are publicly readable" ON public.products FOR SELECT USING (true);

CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_name TEXT NOT NULL,
  price TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own orders" ON public.orders FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users insert own orders" ON public.orders FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

INSERT INTO public.products (name, age_group, age_group_label, age_group_tagline, price, image, emoji, tint, benefit, caption, sort_order) VALUES
('Baby Elephant Squeaky','0-3','0–3 Months','First focus, sound & comfort','₹349','/products/baby-elephant.jpg.jpg','🐘','bg-highlight/40','Squeaky sound for early auditory play & grasping','[Photo: Baby Elephant Squeaky]',10),
('Snuggle Clutch','0-3','0–3 Months','First focus, sound & comfort','₹529','/products/snuggle.jpg.jpg','🐭','bg-primary/15','High-contrast clutch with crinkly ears','[Photo: Snuggle Clutch]',20),
('Sensory Teether','3-6','3–6 Months','Reach, grasp & sensory exploration','₹449','/products/sensory-teether.jpg.jpg','🦷','bg-secondary/25','Multi-texture silicone soothes gums & builds grip','[Photo: Sensory Teether]',30),
('Atom Ball & Rattle','3-6','3–6 Months','Reach, grasp & sensory exploration','₹649','/products/atom-ball.jpg.jpg','⚛️','bg-primary/15','Bendable arms for gripping, shaking & motor skills','[Photo: Atom Ball & Rattle]',40),
('Ellie Grip Teether (Set of 2)','3-6','3–6 Months','Reach, grasp & sensory exploration','₹599','/products/ellie-teether.jpg.jpg','🐘','bg-highlight/40','Elephant teether with multi-zone dot textures','[Photo: Ellie Grip Teether]',50),
('Bunny Wristband Rattle','3-6','3–6 Months','Reach, grasp & sensory exploration','₹399','/products/bunny-wristband.jpg.jpg','🐰','bg-secondary/25','Wearable rattle for movement & cause-effect play','[Photo: Bunny Wristband Rattle]',60),
('Octopus Soft Toy','6-9','6–9 Months','Sit, explore & coordinate','₹749','/products/octopus.jpg.jpg','🐙','bg-highlight/40','Easy-grasp arms with crinkle for bilateral coordination','[Photo: Octopus Soft Toy]',70),
('Lion Crochet Rattle','6-9','6–9 Months','Sit, explore & coordinate','₹699','/products/lion.jpg.jpg','🦁','bg-primary/15','Handcrafted lion with wooden ring & rattle inside','[Photo: Lion Crochet Rattle]',80),
('Splash & Read Bath Book Set (2 Books)','9-12','9–12 Months','Cause-effect & fine motor','₹629','/products/splash-read.jpg.jpg','🐬','bg-primary/15','Waterproof Hippo & Dolphin books for bath-time stories','[Photo: Splash & Read Bath Book Set]',90),
('Giraffe Rattle Pal — Brown','9-12','9–12 Months','Cause-effect & fine motor','₹479','/products/giraffe.jpg.jpg','🦒','bg-secondary/25','Soft giraffe pal with a gentle rattle to hold & shake','[Photo: Giraffe Rattle Pal — Brown]',100),
('Hop & Pull Bunny','12-15','12–15 Months','Walk, hug & imagine','₹779','/products/hop-bunny.jpg.jpg','🐰','bg-highlight/40','Stretchable ears & limbs for pulling & tactile play','[Photo: Hop & Pull Bunny]',110),
('Chompy — Alligator Plush','12-15','12–15 Months','Walk, hug & imagine','₹719','/products/chompy.jpg.jpg','🐊','bg-primary/15','Soft, friendly plush for cuddles & emotional comfort','[Photo: Chompy Alligator Plush]',120);
