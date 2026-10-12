import { useState } from "react";
import { carouselData } from "../data/carouselData";

const total = carouselData.length;
const pad = (n) => String(n).padStart(2, "0");

export default function HeroCarousel() {
  const [{ index, ciclo }, setEstado] = useState({ index: 0, ciclo: 0 });

  const irPara = (novo) => setEstado((s) => ({ index: novo, ciclo: s.ciclo + 1 }));
  const proximo = () => irPara((index + 1) % total);

  const atual = carouselData[index];

  return (
    <section id="top" className="relative h-screen min-h-[640px] w-full overflow-hidden">
      {carouselData.map((slide, i) => (
        <div
          key={slide.id}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.bgImage}
            alt=""
            className={`h-full w-full object-cover transition-transform duration-[9000ms] ease-out ${
              i === index ? "scale-105" : "scale-100"
            }`}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-base via-base/60 to-base/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-base/80 via-transparent to-transparent" />

      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-36 pt-32">
        <div key={atual.id} className="max-w-3xl animate-pop">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-base/60 px-3.5 py-1.5 text-xs font-medium text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-light" />
            {atual.tag}
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl">
            {atual.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/65">{atual.description}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#simulador"
              className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-light"
            >
              Simular meu projeto
            </a>
            <a
              href="#contato"
              className="rounded-lg border border-line bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/[0.09]"
            >
              Falar com a Kroma
            </a>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 pb-10">
        <div className="mx-auto flex max-w-7xl items-end gap-6 px-6">
          <span className="font-mono text-sm tabular-nums text-white/70">
            {pad(index + 1)} <span className="text-white/30">/ {pad(total)}</span>
          </span>
          <div className="grid flex-1 grid-cols-4 gap-3">
            {carouselData.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => irPara(i)}
                aria-label={`Ir para ${slide.label}`}
                aria-current={i === index}
                className="group text-left"
              >
                <span
                  className={`mb-3 block text-xs font-medium transition-colors ${
                    i === index ? "text-white" : "text-white/40 group-hover:text-white/70"
                  }`}
                >
                  {slide.label}
                </span>
                <span className="block h-[3px] w-full overflow-hidden rounded-full bg-white/15">
                  <span
                    key={i === index ? ciclo : "idle"}
                    onAnimationEnd={i === index ? proximo : undefined}
                    className={`block h-full origin-left rounded-full bg-accent-light ${
                      i === index ? "animate-fill" : i < index ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
