import { useState } from "react";
import { carouselData } from "../data/carouselData";
import { TIPOS, formatarBRL } from "../data/projectOptions";

export default function HeroCarousel() {
  const [{ index, ciclo }, setEstado] = useState({ index: 0, ciclo: 0 });
  const [paused, setPaused] = useState(false);
  const irPara = (novo) =>
    setEstado((atual) => ({ index: novo, ciclo: atual.ciclo + 1 }));
  const proximo = () => irPara((index + 1) % carouselData.length);
  const atual = carouselData[index];
  const tipo = TIPOS.find((item) => item.id === atual.tipoId);

  return (
    <section
      id="top"
      aria-label="Serviços da Kroma Web"
      aria-roledescription="carrossel"
      className="hero-stage relative min-h-[720px] w-full overflow-hidden"
    >
      <img
        key={atual.id}
        src={atual.bgImage}
        alt=""
        fetchPriority={index === 0 ? "high" : "auto"}
        className="hero-photo absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-base via-base/65 to-base/35" />
      <div className="absolute inset-0 bg-gradient-to-r from-base/85 via-base/35 to-transparent" />
      <div className="relative mx-auto flex min-h-[720px] max-w-7xl flex-col justify-center px-6 pb-40 pt-36 lg:min-h-[850px]">
        <div key={atual.id} className="max-w-3xl animate-pop">
          <p className="section-kicker flex items-center gap-3 text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-light" />
            {atual.tag}
          </p>
          <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[1.07] tracking-[-0.045em] text-white sm:text-7xl">
            {atual.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/65">
            {atual.description}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#planos"
              className="rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-white hover:bg-accent-light"
            >
              Ver planos e valores <span aria-hidden="true">↗</span>
            </a>
            <a
              href="#contato"
              className="rounded-xl border border-white/20 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              Conversar sobre meu projeto
            </a>
          </div>
          <p className="mt-6 text-sm text-white/55">
            {tipo.label} a partir de{" "}
            <strong className="font-semibold text-white">
              {formatarBRL(tipo.base)} no Pix
            </strong>
            <span className="mx-2 text-white/25">/</span>opção parcelada no
            cartão
          </p>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-base/30 py-7">
        <div className="mx-auto flex max-w-7xl items-end gap-5 px-6">
          <span className="hidden font-mono text-sm text-white/50 sm:block">
            {String(index + 1).padStart(2, "0")} / 04
          </span>
          <div className="grid flex-1 grid-cols-4 gap-3">
            {carouselData.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => irPara(i)}
                aria-label={"Ver " + slide.label}
                aria-current={i === index ? "true" : undefined}
                className="text-left"
              >
                <span
                  className={
                    "mb-3 block text-xs font-medium " +
                    (i === index ? "text-white" : "text-white/45")
                  }
                >
                  {slide.label}
                </span>
                <span className="block h-[2px] overflow-hidden bg-white/15">
                  <span
                    key={i === index ? ciclo : "idle"}
                    onAnimationEnd={i === index ? proximo : undefined}
                    style={{
                      animationPlayState: paused ? "paused" : "running",
                    }}
                    className={
                      "block h-full origin-left bg-accent-light " +
                      (i === index
                        ? "animate-fill"
                        : i < index
                          ? "scale-x-100"
                          : "scale-x-0")
                    }
                  />
                </span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            aria-pressed={paused}
            aria-label={
              paused ? "Continuar apresentação" : "Pausar apresentação"
            }
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 text-white"
          >
            {paused ? "▶" : "Ⅱ"}
          </button>
        </div>
      </div>
    </section>
  );
}
