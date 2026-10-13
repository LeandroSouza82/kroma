import { useId, useState } from "react";
import { ETAPAS, CATEGORIAS_FAQ, filtrarPerguntas } from "../data/clientGuide";

export default function ClientGuide() {
  const searchId = useId();
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("");
  const perguntas = filtrarPerguntas(busca, categoria);

  return (
    <div className="border-t border-line bg-surface/60">
      <section
        id="como-funciona"
        className="mx-auto max-w-7xl scroll-mt-24 px-6 pt-24"
      >
        <div className="max-w-2xl">
          <p className="section-kicker text-accent-light">
            Do primeiro passo à entrega
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Saiba como contratar.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/60">
            Você conhece o que está escolhendo antes de enviar o pedido. O
            atendimento confirma os detalhes do seu projeto.
          </p>
        </div>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ETAPAS.map((etapa, index) => (
            <li
              key={etapa.title}
              className="rounded-2xl border border-line bg-base p-6"
            >
              <span
                className="text-sm font-semibold text-accent-light"
                aria-hidden="true"
              >
                0{index + 1}
              </span>
              <h3 className="mt-5 text-lg font-semibold text-white">
                {etapa.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                {etapa.text}
              </p>
            </li>
          ))}
        </ol>
      </section>
      <section
        id="duvidas"
        className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24"
      >
        <div className="grid gap-10 lg:grid-cols-[300px_1fr] lg:gap-16">
          <div>
            <p className="section-kicker text-accent-light">Tudo explicado</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white">
              Antes de contratar,
              <br />
              <span className="text-white/50">tire suas dúvidas.</span>
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-white/60">
              Busque por um assunto ou escolha uma categoria. Valores, limites e
              responsabilidades ficam claros aqui.
            </p>
            <a
              href="#planos"
              className="mt-6 inline-block text-sm font-semibold text-accent-light hover:text-white"
            >
              Voltar aos planos ↗
            </a>
          </div>
          <div>
            <label
              htmlFor={searchId}
              className="mb-3 block text-sm font-medium text-white"
            >
              Qual informação você procura?
            </label>
            <div className="flex gap-2">
              <input
                id={searchId}
                type="search"
                value={busca}
                onChange={(event) => setBusca(event.target.value)}
                placeholder="Ex.: manutenção, Pix, prazo, hospedagem"
                className="min-w-0 flex-1 rounded-xl border border-line bg-base px-4 py-3 text-sm text-white placeholder:text-white/40"
              />
              {busca && (
                <button
                  type="button"
                  onClick={() => setBusca("")}
                  className="rounded-xl border border-line px-3 text-xs font-semibold text-white/70 hover:text-white"
                >
                  Limpar busca
                </button>
              )}
            </div>
            <div
              className="mt-4 flex flex-wrap gap-2"
              role="group"
              aria-label="Filtrar dúvidas por assunto"
            >
              {["", ...CATEGORIAS_FAQ].map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={categoria === item}
                  onClick={() => setCategoria(item)}
                  className={
                    "rounded-full border px-3 py-2 text-xs font-medium transition-colors " +
                    (categoria === item
                      ? "border-accent-light bg-accent/15 text-white"
                      : "border-line text-white/60 hover:text-white")
                  }
                >
                  {item || "Todas"}
                </button>
              ))}
            </div>
            <p role="status" className="mt-5 text-xs text-white/45">
              {perguntas.length}{" "}
              {perguntas.length === 1
                ? "resposta encontrada"
                : "respostas encontradas"}
            </p>
            <div className="mt-3 space-y-3">
              {perguntas.map((item) => (
                <details
                  key={item.id}
                  className="faq-item rounded-xl border border-line bg-base"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-5 px-5 py-5 text-sm font-semibold text-white">
                    <span>{item.question}</span>
                    <span
                      className="faq-indicator shrink-0 text-xl font-normal text-accent-light"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <div className="space-y-3 px-5 pb-5 text-sm leading-relaxed text-white/65">
                    {item.answer.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </details>
              ))}
              {!perguntas.length && (
                <div className="rounded-xl border border-line p-6 text-sm leading-relaxed text-white/65">
                  Nenhuma resposta para esse filtro. Tente outro termo ou{" "}
                  <button
                    type="button"
                    className="font-semibold text-accent-light underline"
                    onClick={() => {
                      setBusca("");
                      setCategoria("");
                    }}
                  >
                    ver todas as dúvidas
                  </button>
                  .
                </div>
              )}
            </div>
            <div className="mt-6 flex flex-col gap-3 rounded-xl border border-accent-light/20 bg-accent/5 p-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-relaxed text-white/65">
                Seu projeto tem algo específico? Envie sua ideia junto com o
                plano escolhido.
              </p>
              <a
                href="#simulador"
                className="shrink-0 text-sm font-semibold text-accent-light hover:text-white"
              >
                Montar proposta ↗
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
