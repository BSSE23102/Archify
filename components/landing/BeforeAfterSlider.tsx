import { useState } from "react";

type Props = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
};

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "2D floor plan",
  afterAlt = "3D photorealistic render",
}: Props) {
  const [pct, setPct] = useState(50);

  return (
    <div
      className="relative aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl dark:border-white/10"
      role="region"
      aria-label="Before and after: floor plan versus 3D render"
    >
      <img
        src={afterSrc}
        alt={afterAlt}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
      >
        <img
          src={beforeSrc}
          alt={beforeAlt}
          className="h-full w-full object-cover grayscale contrast-125"
        />
      </div>
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)]"
        style={{ left: `${pct}%`, transform: "translateX(-50%)" }}
        aria-hidden
      />
      <input
        type="range"
        min={0}
        max={100}
        value={pct}
        onChange={(e) => setPct(Number(e.target.value))}
        className="absolute inset-0 z-10 h-full w-full cursor-ew-resize opacity-0"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        aria-label="Drag to compare floor plan and render"
      />
      <div className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur">
        2D
      </div>
      <div className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-emerald-600/90 px-3 py-1 text-xs font-medium text-white backdrop-blur">
        3D AI
      </div>
    </div>
  );
}
