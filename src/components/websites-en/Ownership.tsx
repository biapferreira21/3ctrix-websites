import { Container } from "./ui/Container";
import { FadeIn, Stagger, StaggerItem } from "./ui/motion";
import { ownershipIcons } from "./ui/icons";
import { ownership } from "@/config/websites-en/content";

export function Ownership() {
  return (
    <section id="propriedade" className="relative overflow-hidden bg-[#e8e0fb] py-24 sm:py-28">
      <div className="comic-dots pointer-events-none absolute inset-0 opacity-30" />
      <Container className="relative">
        <FadeIn className="relative overflow-hidden rounded-3xl border-4 border-night bg-forest-deep p-8 text-white shadow-[10px_10px_0_#C69A44] sm:p-14">
          <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" />
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-emerald/25 blur-3xl" />

          <div className="relative mx-auto max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-glow">
              Ownership and transparency
            </p>
            <h2 className="font-display text-3xl font-semibold leading-tight sm:text-[2.5rem]">
              {ownership.title}
            </h2>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-white/70 sm:text-lg">
              {ownership.text}
            </p>
          </div>

          <Stagger className="relative mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">
            {ownership.points.map((point, i) => {
              const Icon =
                ownershipIcons[point.icon as keyof typeof ownershipIcons];
              const gradients = [
                "from-emerald to-lilac-deep",
                "from-emerald to-gold",
                "from-lilac-deep to-gold",
              ];
              return (
                <StaggerItem
                  key={point.title}
                  className="rounded-2xl border-[3px] border-night bg-white p-6 text-center text-ink shadow-[5px_5px_0_#9985DC] transition-transform hover:-translate-y-1"
                >
                  <span
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradients[i % 3]} text-white shadow-[0_6px_16px_-4px_rgba(153,133,220,0.5)]`}
                  >
                    {Icon && <Icon size={22} />}
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold text-ink">
                    {point.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate">
                    {point.text}
                  </p>
                </StaggerItem>
              );
            })}
          </Stagger>
        </FadeIn>
      </Container>
    </section>
  );
}
