// @lovable.dev/vite-tanstack-config already includes tanstackStart, viteReact,
// tailwindcss, tsConfigPaths, nitro, etc. Do NOT add those manually.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // On Vercel, force-enable the deploy plugin with the Vercel preset so a real
  // server handler is generated (fixes the 404). Leaves Lovable's default intact.
  nitro: process.env.VERCEL ? { preset: "vercel" } : undefined,
  tanstackStart: {
    server: { entry: "server" },
  },
});
