import { Link, useParams } from "react-router";
import { ArrowLeft, ImageIcon, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import type { Route } from "./+types/visualizer.$id";
import { visualizerSessionKey } from "../../lib/constant";

export function meta({ params }: Route.MetaArgs) {
  const short = params.id?.slice(0, 8) ?? "";
  return [
    { title: `Visualizer ${short}… · Archify` },
    {
      name: "description",
      content: "Review your uploaded floor plan and run AI architectural visualization.",
    },
  ];
}

function readPayload(id: string | undefined): string | null {
  if (!id || typeof window === "undefined") return null;
  try {
    return sessionStorage.getItem(visualizerSessionKey(id));
  } catch {
    return null;
  }
}

export default function VisualizerRoute() {
  const { id } = useParams();
  const [source, setSource] = useState<string | null>(null);

  useEffect(() => {
    setSource(readPayload(id));
  }, [id]);

  const isImage = source?.startsWith("data:image/") ?? false;
  const isPdf = source?.startsWith("data:application/pdf") ?? false;

  return (
    <div className="min-h-[100dvh] bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="mx-auto max-w-6xl px-4 py-8 pt-28 md:px-8 md:pt-32">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to home
        </Link>

        <header className="mb-8">
          <p className="text-xs font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Session
          </p>
          <h1 className="mt-1 break-all font-mono text-sm text-zinc-500 md:text-base">
            {id}
          </h1>
          <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
            Your upload is loaded for this session. Next: wire AI render + Puter
            workers to replace the placeholder panel.
          </p>
        </header>

        {!source ? (
          <div
            className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-8 text-center dark:bg-amber-950/20"
            role="alert"
          >
            <p className="font-medium text-amber-900 dark:text-amber-200">
              No file for this link
            </p>
            <p className="mt-2 text-sm text-amber-800/90 dark:text-amber-200/80">
              Open this page right after upload from the home demo, or the
              session may have been cleared. Upload again to get a fresh link.
            </p>
            <Link
              to="/#demo"
              className="mt-6 inline-flex rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-400"
            >
              Go to upload
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-2">
            <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl dark:border-white/10 dark:bg-zinc-900/60">
              <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                <ImageIcon className="h-4 w-4 text-emerald-500" aria-hidden />
                Source (upload)
              </h2>
              {isImage ? (
                <img
                  src={source}
                  alt="Uploaded floor plan"
                  className="max-h-[70vh] w-full rounded-lg bg-zinc-100 object-contain dark:bg-zinc-950"
                />
              ) : isPdf ? (
                <div className="flex min-h-[320px] flex-col items-center justify-center rounded-lg bg-zinc-100 p-6 text-center dark:bg-zinc-950">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    PDF loaded in session (Base64). Preview in browser requires
                    embedding or worker conversion.
                  </p>
                  <a
                    href={source}
                    download="floor-plan.pdf"
                    className="mt-4 text-sm font-medium text-emerald-600 hover:underline dark:text-emerald-400"
                  >
                    Download PDF
                  </a>
                </div>
              ) : (
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Binary payload stored — length {source.length} chars.
                </p>
              )}
            </section>

            <section className="flex min-h-[320px] flex-col rounded-2xl border border-dashed border-emerald-500/40 bg-gradient-to-br from-emerald-500/5 to-zinc-100 p-6 dark:from-emerald-500/10 dark:to-zinc-900/80">
              <h2 className="flex items-center gap-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                <Sparkles className="h-4 w-4 text-emerald-500" aria-hidden />
                AI render (next step)
              </h2>
              <div className="mt-6 flex flex-1 flex-col items-center justify-center rounded-xl border border-white/10 bg-zinc-900/50 p-8 dark:bg-black/30">
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-2 w-2 animate-pulse rounded-full bg-emerald-400"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
                <p className="mt-4 text-center text-sm text-zinc-500">
                  Connect PUTER_WORKER_URL + AI APIs to stream the photorealistic
                  render here using this session&apos;s Base64 source.
                </p>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
