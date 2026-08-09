import { trustItems } from "@/config/websites-en/content";

export function TrustBar() {
  // Duplicamos a lista para um marquee contínuo e sem cortes.
  const loop = [...trustItems, ...trustItems];

  return (
    <section
      aria-label="Argumentos de confiança"
      className="border-y-[3px] border-night bg-emerald py-5"
    >
      <div className="marquee-mask overflow-hidden">
        <ul className="flex w-max animate-marquee items-center gap-10">
          {loop.map((item, i) => (
            <li
              key={i}
              className="flex shrink-0 items-center gap-10 text-sm font-bold text-night"
              aria-hidden={i >= trustItems.length}
            >
              <span>{item}</span>
              <span className="h-3 w-3 rotate-45 border border-night bg-lilac" aria-hidden />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
