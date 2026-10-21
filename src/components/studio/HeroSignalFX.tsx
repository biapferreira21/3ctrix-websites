"use client";

import dynamic from "next/dynamic";

const HeroSignalField = dynamic(() => import("./HeroSignalField"), {
  ssr: false,
});

const labels = [
  ["SPEAKER", "left-4 top-[5.25rem] bg-mint text-night sm:left-7 sm:top-24"],
  ["SOURCE", "right-4 top-[8.5rem] bg-[#f6dfb6] text-night sm:right-7 sm:top-36"],
  ["PARTICIPANT", "bottom-24 left-4 bg-[#e8e0fb] text-night sm:bottom-28 sm:left-7"],
  ["FOLLOW-UP", "bottom-[4.25rem] right-4 bg-[#dfece2] text-night sm:bottom-20 sm:right-7"],
] as const;

export function HeroSignalFX() {
  return (
    <div className="relative mx-auto min-h-[28rem] w-full max-w-[34rem] overflow-hidden rounded-[2rem] border-[3px] border-night bg-white shadow-[10px_10px_0_#8FA38A] sm:min-h-[32rem]">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-55" />
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b-2 border-night bg-[#f5f1e8]/90 px-5 py-4 backdrop-blur-sm">
        <span className="font-mono text-[10px] font-bold tracking-[0.18em] text-slate">
          3C TRIX / EVENT INFORMATION MAP
        </span>
        <span className="flex items-center gap-2 text-[10px] font-bold tracking-[0.14em] text-emerald-dark">
          <i className="h-2 w-2 animate-pulse rounded-full bg-emerald" /> LIVE
        </span>
      </div>
      <HeroSignalField />
      {labels.map(([label, classes]) => (
        <span
          key={label}
          className={`absolute z-10 rounded-full border-2 border-night px-3 py-1.5 text-[9px] font-bold tracking-[0.14em] shadow-[3px_3px_0_#16180F] ${classes}`}
        >
          {label}
        </span>
      ))}
      <div className="absolute inset-x-0 bottom-0 z-10 border-t-2 border-night bg-[#f5f1e8]/90 px-5 py-4 text-center backdrop-blur-sm">
        <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-slate">
          Session → context → response → follow-up
        </p>
      </div>
    </div>
  );
}
