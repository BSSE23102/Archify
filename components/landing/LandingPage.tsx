import { useCallback, useContext } from "react";
import { useNavigate } from "react-router";
import {
  ArrowRight,
  Building2,
  Cloud,
  Cpu,
  Database,
  Globe,
  Heart,
  Image as ImageIcon,
  Layers,
  LayoutGrid,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import { AuthContext } from "../../app/auth-context";
import { visualizerSessionKey } from "../../lib/constant";
import { Upload } from "../Upload";
import { BeforeAfterSlider } from "./BeforeAfterSlider";

const IMG = {
  hero:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
  plan:
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
  modern:
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
  interior:
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80",
  glass:
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
  loft:
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80",
  villa:
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80",
  tower:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
};

const showcase = [
  { id: 1, render: IMG.modern, plan: IMG.plan, title: "Residential concept" },
  { id: 2, render: IMG.glass, plan: IMG.plan, title: "Glass facade study" },
  { id: 3, render: IMG.loft, plan: IMG.plan, title: "Loft conversion" },
  { id: 4, render: IMG.villa, plan: IMG.plan, title: "Villa visualization" },
  { id: 5, render: IMG.interior, plan: IMG.plan, title: "Interior pass" },
  { id: 6, render: IMG.tower, plan: IMG.plan, title: "Commercial tower" },
];

const community = [
  { user: "Atelier M", likes: 284, saves: 91, img: IMG.modern },
  { user: "Studio North", likes: 156, saves: 44, img: IMG.glass },
  { user: "BuildCo", likes: 402, saves: 120, img: IMG.loft },
  { user: "Elena R.", likes: 89, saves: 32, img: IMG.interior },
  { user: "Form Architects", likes: 512, saves: 201, img: IMG.villa },
  { user: "Urban Lab", likes: 203, saves: 67, img: IMG.tower },
  { user: "Render Daily", likes: 341, saves: 88, img: IMG.hero },
  { user: "Plan-to-3D", likes: 177, saves: 55, img: IMG.glass },
];

export function LandingPage() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const onUploadComplete = useCallback(
    (base64Data: string) => {
      const id = crypto.randomUUID();
      try {
        sessionStorage.setItem(visualizerSessionKey(id), base64Data);
      } catch (e) {
        console.error("Session storage full or unavailable", e);
        return;
      }
      navigate(`/visualizer/${id}`);
    },
    [navigate]
  );

  return (
    <div className="bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      {/* 1. Hero */}
      <section
        id="generate"
        className="relative min-h-[100dvh] overflow-hidden pt-28 pb-16 md:pt-32"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(16,185,129,0.15),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(16,185,129,0.2),transparent)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_60%,rgba(59,130,246,0.08),transparent_50%)]" />
        <div className="animate-pulse-glow absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -left-32 bottom-1/4 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-2 lg:items-center lg:gap-8 lg:px-8">
          <div className="max-w-xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              AI · Claude · Gemini · Serverless on Puter.js
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-balance text-zinc-900 sm:text-5xl md:text-6xl dark:text-white">
              Turn 2D Floor Plans into Photorealistic 3D Worlds
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              Advanced AI models transform blueprints into stunning architectural
              renders—instantly. Permanent hosting, persistent KV metadata, and a
              global community feed for architects and developers.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#demo"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400 focus-visible:outline focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950"
              >
                Generate 3D Render
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <a
                href="#community"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white/80 px-6 py-3 text-sm font-semibold text-zinc-800 backdrop-blur transition hover:bg-zinc-100 focus-visible:outline focus-visible:ring-2 focus-visible:ring-zinc-400 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                View Community Creations
              </a>
            </div>
          </div>

          <div className="relative animate-float">
            <div className="relative rounded-2xl border border-white/10 bg-zinc-900/80 p-1 shadow-2xl backdrop-blur-xl dark:bg-zinc-900/60">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs text-zinc-500">
                  Archify · Render pipeline
                </span>
              </div>
              <div className="grid gap-3 p-4 md:grid-cols-2">
                <div className="overflow-hidden rounded-xl border border-white/10">
                  <img
                    src={IMG.plan}
                    alt="Uploaded floor plan"
                    className="aspect-video h-full w-full object-cover opacity-90"
                  />
                  <p className="border-t border-white/10 bg-zinc-950/80 px-3 py-2 text-xs text-zinc-400">
                    Input · 2D plan
                  </p>
                </div>
                <div className="relative overflow-hidden rounded-xl border border-emerald-500/20">
                  <img
                    src={IMG.hero}
                    alt="AI generated 3D visualization"
                    className="aspect-video h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 animate-shimmer pointer-events-none" />
                  <p className="absolute bottom-0 left-0 right-0 border-t border-emerald-500/30 bg-emerald-950/90 px-3 py-2 text-xs font-medium text-emerald-200">
                    Output · Photorealistic render
                  </p>
                </div>
              </div>
              <div className="mx-4 mb-4 rounded-lg border border-white/10 bg-zinc-950/50 p-3">
                <div className="mb-2 flex items-center justify-between text-xs text-zinc-500">
                  <span>AI generation</span>
                  <span className="text-emerald-400">Claude + Gemini</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className="h-full w-[78%] rounded-full bg-gradient-to-r from-emerald-600 to-teal-400"
                    style={{
                      animation: "shimmer 2s ease infinite",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. How it works */}
      <section
        id="how-it-works"
        className="border-y border-zinc-200 bg-white py-20 dark:border-white/5 dark:bg-zinc-900/30"
      >
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <h2 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">
            How it works
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-zinc-600 dark:text-zinc-400">
            Three steps from blueprint to portfolio-ready imagery.
          </p>
          <ol className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Upload floor plan",
                desc: "PDF, image, or CAD export—our workers ingest geometry and scale.",
                icon: ImageIcon,
              },
              {
                step: "02",
                title: "AI builds the 3D model",
                desc: "Multi-model pipeline infers volumes, materials, and lighting.",
                icon: Layers,
              },
              {
                step: "03",
                title: "Export photorealistic render",
                desc: "Hosted forever with rich metadata in our KV store.",
                icon: Sparkles,
              },
            ].map((item) => (
              <li
                key={item.step}
                className="group relative rounded-2xl border border-zinc-200 bg-zinc-50/80 p-8 transition hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5 dark:border-white/10 dark:bg-white/5 dark:hover:border-emerald-500/20"
              >
                <span className="text-4xl font-bold text-zinc-200 dark:text-zinc-800">
                  {item.step}
                </span>
                <item.icon
                  className="mt-4 h-10 w-10 text-emerald-600 dark:text-emerald-400"
                  strokeWidth={1.25}
                  aria-hidden
                />
                <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {item.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 3. Showcase + slider */}
      <section id="showcase" className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            AI rendering showcase
          </h2>
          <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
            Hover cards to peek at the source plan. Drag the slider to compare.
          </p>
          <div className="mt-12 flex justify-center">
            <BeforeAfterSlider beforeSrc={IMG.plan} afterSrc={IMG.modern} />
          </div>
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {showcase.map((item) => (
              <article
                key={item.id}
                className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 dark:border-white/10 dark:bg-zinc-900"
              >
                <div className="relative aspect-[4/3]">
                  <img
                    src={item.render}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-zinc-950/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <img
                      src={item.plan}
                      alt={`Original plan for ${item.title}`}
                      className="h-full w-full object-cover p-4 opacity-90"
                    />
                    <p className="absolute bottom-4 left-4 right-4 rounded-lg bg-black/60 px-3 py-2 text-center text-xs text-white backdrop-blur">
                      Original 2D plan
                    </p>
                  </div>
                </div>
                <p className="border-t border-zinc-200 px-4 py-3 text-sm font-medium dark:border-white/10">
                  {item.title}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Features */}
      <section
        id="features"
        className="border-t border-zinc-200 bg-white py-20 dark:border-white/5 dark:bg-zinc-900/20"
      >
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <h2 className="text-3xl font-semibold md:text-4xl">Key features</h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "AI 2D → 3D",
                desc: "Blueprint to volumetric understanding with frontier models.",
                icon: Cpu,
              },
              {
                title: "Photorealistic engine",
                desc: "Lighting, materials, and context that sell the vision.",
                icon: Sparkles,
              },
              {
                title: "Permanent hosting",
                desc: "Every render lives on durable, global edge storage.",
                icon: Cloud,
              },
              {
                title: "KV metadata",
                desc: "Tags, versions, and prompts—queryable at millisecond latency.",
                icon: Database,
              },
              {
                title: "Community feed",
                desc: "Discover, like, and save work from creators worldwide.",
                icon: Globe,
              },
              {
                title: "Puter.js serverless",
                desc: "Workers scale to zero; no servers to patch or provision.",
                icon: Zap,
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-white/10 dark:bg-white/5"
              >
                <f.icon
                  className="h-8 w-8 text-emerald-600 dark:text-emerald-400"
                  strokeWidth={1.25}
                  aria-hidden
                />
                <h3 className="mt-4 font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Demo */}
      <section id="demo" className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <h2 className="text-3xl font-semibold md:text-4xl">
            Product demo
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            Upload → generate → ship. Interactive preview of the studio.
          </p>
          <div className="mt-10 overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-br from-zinc-100 to-zinc-200 shadow-2xl dark:border-white/10 dark:from-zinc-900 dark:to-zinc-950">
            <div className="grid md:grid-cols-3">
              <div className="border-b border-zinc-200 p-6 md:border-b-0 md:border-r dark:border-white/10">
                <p className="text-xs font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  1 · Upload
                </p>
                <div className="mt-4 flex justify-center">
                  <Upload
                    isSignedIn={!!auth?.isSignedIn}
                    onComplete={onUploadComplete}
                  />
                </div>
                <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                  Sign in, then upload — you&apos;ll be sent to{" "}
                  <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-800">
                    /visualizer/&lt;id&gt;
                  </code>{" "}
                  with your file in session.
                </p>
              </div>
              <div className="border-b border-zinc-200 p-6 md:border-b-0 md:border-r dark:border-white/10">
                <p className="text-xs font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  2 · AI render
                </p>
                <div className="mt-4 flex aspect-square flex-col items-center justify-center rounded-xl bg-zinc-900 p-4">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="h-2 w-2 animate-pulse rounded-full bg-emerald-400"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                  <p className="mt-3 text-center text-xs text-zinc-400">
                    Workers + AI APIs
                  </p>
                </div>
                <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                  Progress, retries, and cost-aware routing.
                </p>
              </div>
              <div className="p-6">
                <p className="text-xs font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  3 · Result
                </p>
                <div className="mt-4 overflow-hidden rounded-xl border border-zinc-200 dark:border-white/10">
                  <img
                    src={IMG.hero}
                    alt="Example final render"
                    className="aspect-square w-full object-cover"
                  />
                </div>
                <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                  After upload, the visualizer route shows your source + AI panel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Community */}
      <section
        id="community"
        className="border-t border-zinc-200 bg-white py-20 dark:border-white/5 dark:bg-zinc-900/30"
      >
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <h2 className="text-3xl font-semibold md:text-4xl">
            Community feed
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            Pinterest-style masonry of real renders from the network.
          </p>
          <div className="mt-10 columns-2 gap-4 sm:columns-3 lg:columns-4">
            {community.map((c, i) => (
              <article
                key={i}
                className="mb-4 break-inside-avoid overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-zinc-900"
              >
                <img
                  src={c.img}
                  alt=""
                  className="w-full object-cover"
                  style={{ aspectRatio: i % 3 === 0 ? "3/4" : "1/1" }}
                />
                <div className="flex items-center justify-between gap-2 px-3 py-2 text-xs">
                  <span className="truncate font-medium text-zinc-800 dark:text-zinc-200">
                    {c.user}
                  </span>
                  <span className="flex shrink-0 items-center gap-2 text-zinc-500">
                    <span className="inline-flex items-center gap-0.5">
                      <Heart className="h-3.5 w-3.5" aria-hidden />
                      {c.likes}
                    </span>
                    <span className="inline-flex items-center gap-0.5">
                      <LayoutGrid className="h-3.5 w-3.5" aria-hidden />
                      {c.saves}
                    </span>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Professionals */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <h2 className="text-center text-3xl font-semibold md:text-4xl">
            Built for professionals
          </h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Architects",
                desc: "Pitch schemes faster with believable massing and light.",
                icon: Building2,
              },
              {
                title: "Real estate developers",
                desc: "Pre-sell units before steel goes up.",
                icon: LayoutGrid,
              },
              {
                title: "Interior designers",
                desc: "Swap finishes and mood without re-rendering the whole stack.",
                icon: Layers,
              },
              {
                title: "Construction firms",
                desc: "Align trades with a single visual source of truth.",
                icon: Users,
              },
            ].map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-zinc-200 p-6 dark:border-white/10"
              >
                <p.icon
                  className="h-8 w-8 text-zinc-700 dark:text-zinc-300"
                  strokeWidth={1.25}
                  aria-hidden
                />
                <h3 className="mt-4 font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Pricing */}
      <section
        id="pricing"
        className="border-t border-zinc-200 bg-zinc-100 py-20 dark:border-white/5 dark:bg-zinc-900/40"
      >
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <h2 className="text-center text-3xl font-semibold md:text-4xl">
            Pricing
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              {
                name: "Free",
                price: "$0",
                desc: "Limited renders per month, watermarked exports.",
                features: ["5 renders / mo", "Community feed", "Standard queue"],
                cta: "Start free",
                highlight: false,
              },
              {
                name: "Pro",
                price: "$49",
                period: "/mo",
                desc: "High quality, no watermark, permanent hosting + KV.",
                features: [
                  "200 HD renders",
                  "Priority workers",
                  "API access",
                  "Metadata API",
                ],
                cta: "Go Pro",
                highlight: true,
              },
              {
                name: "Studio",
                price: "Custom",
                desc: "Teams, SSO, dedicated capacity, SLA.",
                features: [
                  "Shared workspaces",
                  "Audit logs",
                  "Custom models",
                  "Success engineer",
                ],
                cta: "Contact sales",
                highlight: false,
              },
            ].map((tier) => (
              <div
                key={tier.name}
                className={`flex flex-col rounded-2xl border p-8 ${
                  tier.highlight
                    ? "border-emerald-500/50 bg-white shadow-xl shadow-emerald-500/10 dark:bg-zinc-900"
                    : "border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-950/80"
                }`}
              >
                {tier.highlight && (
                  <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Most popular
                  </span>
                )}
                <h3 className="text-xl font-semibold">{tier.name}</h3>
                <p className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{tier.price}</span>
                  {"period" in tier && tier.period && (
                    <span className="text-zinc-500">{tier.period}</span>
                  )}
                </p>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {tier.desc}
                </p>
                <ul className="mt-6 flex-1 space-y-2 text-sm">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="text-emerald-500">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#generate"
                  className={`mt-8 block rounded-full py-3 text-center text-sm font-semibold transition focus-visible:outline focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950 ${
                    tier.highlight
                      ? "bg-emerald-500 text-white hover:bg-emerald-400 focus-visible:ring-emerald-500"
                      : "border border-zinc-300 bg-zinc-50 hover:bg-zinc-100 dark:border-white/15 dark:bg-transparent dark:hover:bg-white/10"
                  }`}
                >
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Testimonials */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <h2 className="text-3xl font-semibold md:text-4xl">
            What teams say
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                quote:
                  "We replaced a week of Viz runs with one afternoon on Archify. Clients stopped asking ‘what will it feel like?’",
                name: "James Chen",
                role: "Principal, Chen Studio",
              },
              {
                quote:
                  "The KV layer means every render is tagged to a lot and revision—finally searchable at scale.",
                name: "Maria Santos",
                role: "Development Director",
              },
              {
                quote:
                  "Puter workers mean we never think about cold starts for batch studies. It just scales.",
                name: "Alex Voss",
                role: "Computational designer",
              },
            ].map((t) => (
              <blockquote
                key={t.name}
                className="rounded-2xl border border-zinc-200 bg-white p-8 dark:border-white/10 dark:bg-white/5"
              >
                <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                  “{t.quote}”
                </p>
                <footer className="mt-4 text-sm font-medium text-zinc-900 dark:text-white">
                  {t.name}
                  <cite className="mt-1 block not-italic text-xs font-normal text-zinc-500">
                    {t.role}
                  </cite>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Final CTA */}
      <section className="border-t border-zinc-200 bg-gradient-to-b from-emerald-950/30 to-zinc-950 py-24 dark:border-white/5">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-8">
          <h2 className="text-3xl font-semibold tracking-tight text-balance text-zinc-900 md:text-4xl dark:text-white">
            Start generating photorealistic buildings in seconds
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            Join architects and developers who ship visuals the same day plans
            land on their desk.
          </p>
          <a
            href="#generate"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400 focus-visible:outline focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950"
          >
            Open the studio
            <ArrowRight className="h-5 w-5" aria-hidden />
          </a>
        </div>
      </section>

      {/* 11. Footer */}
      <footer className="border-t border-zinc-200 bg-zinc-950 py-16 text-zinc-400 dark:border-white/10">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-4 md:px-8">
          <div>
            <p className="font-semibold text-white">Archify</p>
            <p className="mt-2 text-sm">
              AI architectural visualization on serverless infrastructure.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Product
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="#features" className="hover:text-white">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#demo" className="hover:text-white">
                  Demo
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Developers
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Docs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  API
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Community
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="#community" className="hover:text-white">
                  Feed
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Discord
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  X / Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="mx-auto mt-12 max-w-6xl border-t border-zinc-800 px-4 pt-8 text-center text-xs md:px-8">
          © {new Date().getFullYear()} Archify. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
