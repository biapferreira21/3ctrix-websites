import Image from "next/image";
import { brand } from "@/config/brand";
import { cn } from "@/lib/cn";

type LogoProps = {
  /** Mostrar o nome da marca ao lado do símbolo. */
  showName?: boolean;
  className?: string;
  size?: number;
  /** Usar a versão clara do nome (para fundos escuros). */
  light?: boolean;
};

/**
 * Logótipo da 3C Trix Studio.
 *
 * A imagem é lida de `brand.logo.src` (por defeito /3ctrix-logo.svg).
 * Para usar o logótipo real, coloque o ficheiro em
 * /public/3ctrix-logo.jpg e altere `brand.logo.src` em src/config/brand.ts.
 */
export function Logo({ showName = true, className, size = 40, light = false }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className="relative block shrink-0 overflow-hidden rounded-full"
        style={{ width: size, height: size }}
      >
        <Image
          src={brand.logo.src}
          alt={brand.logo.alt}
          fill
          sizes={`${size}px`}
          className="scale-[1.07] object-cover"
          priority
        />
      </span>
      {showName && (
        <span
          className={cn(
            "font-display text-lg font-semibold tracking-tightest",
            light ? "text-white" : "text-ink"
          )}
        >
          {brand.name}
        </span>
      )}
    </span>
  );
}
