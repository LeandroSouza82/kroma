import { useState } from "react";
import { TIPOS, RECURSOS, PRAZOS, calcularEstimativa, formatarBRL } from "../data/projectOptions";

const opcao = (ativa) =>
  `rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors ${
    ativa
      ? "border-accent-light bg-accent/15 text-white"
      : "border-line text-white/60 hover:border-white/20 hover:text-white"
  }`;

const Passo = ({ numero, titulo, children }) => (
  <fieldset>
    <legend className="mb-4 flex items-center gap-3 text-sm font-semibold text-white">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs">
        {numero}
      </span>
      {titulo}
    </legend>
    <div className="grid gap-2 sm:grid-cols-2">{children}</div>
  </fieldset>
);

export default function ProjectCalculator({ onSolicitar }) {
  const [tipoId, setTipoId] = useState(TIPOS[0].id);
  const [recursoIds, setRecursoIds] = useState([]);
  const [prazoId, setPrazoId] = useState(PRAZOS[0].id);

  const alternarRecurso = (id) =>
    setRecursoIds((atuais) =>
      atuais.includes(id) ? atuais.filter((r) => r !== id) : [...atuais, id],
    );

  const tipo = TIPOS.find((t) => t.id === tipoId);
  const prazo = PRAZOS.find((p) => p.id === prazoId);
  const recursos = RECURSOS.filter((r) => recursoIds.includes(r.id));
  const estimativa = calcularEstimativa(tipoId, recursoIds, prazoId);

  const solicitar = () => {
    const nomesRecursos = recursos.map((r) => r.label).join(", ") || "Sem recursos adicionais";
    const escopo = `${nomesRecursos} • Prazo: ${prazo.label}`;
    onSolicitar({
      tipo: tipo.label,
      escopo,
      estimativa,
      mensagem: `Quero uma proposta para: ${tipo.label}.\nRecursos: ${nomesRecursos}.\nPrazo: ${prazo.label}.\nEstimativa: ${formatarBRL(estimativa)}.`,
    });
    document.getElementById("contato").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="simulador" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-28">
      <div className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-light">
          Simulador
        </span>
        <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Monte seu projeto e veja o investimento.
        </h2>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-10 rounded-2xl border border-line bg-surface p-8">
          <Passo numero={1} titulo="Tipo de site">
            {TIPOS.map((t) => (
              <button
                key={t.id}
                type="button"
                aria-pressed={tipoId === t.id}
                onClick={() => setTipoId(t.id)}
                className={opcao(tipoId === t.id)}
              >
                {t.label}
              </button>
            ))}
          </Passo>

          <Passo numero={2} titulo="Recursos especiais">
            {RECURSOS.map((r) => (
              <button
                key={r.id}
                type="button"
                aria-pressed={recursoIds.includes(r.id)}
                onClick={() => alternarRecurso(r.id)}
                className={opcao(recursoIds.includes(r.id))}
              >
                {r.label}
              </button>
            ))}
          </Passo>

          <Passo numero={3} titulo="Prazo desejado">
            {PRAZOS.map((p) => (
              <button
                key={p.id}
                type="button"
                aria-pressed={prazoId === p.id}
                onClick={() => setPrazoId(p.id)}
                className={opcao(prazoId === p.id)}
              >
                {p.label}
              </button>
            ))}
          </Passo>
        </div>

        <aside className="h-fit rounded-2xl border border-line bg-surface p-8 lg:sticky lg:top-28">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
            Resumo do projeto
          </p>
          <dl className="mt-6 space-y-4 text-sm">
            <div>
              <dt className="text-white/40">Tipo</dt>
              <dd className="mt-1 font-medium text-white">{tipo.label}</dd>
            </div>
            <div>
              <dt className="text-white/40">Recursos</dt>
              <dd className="mt-1 font-medium text-white">
                {recursos.length ? recursos.map((r) => r.label).join(" · ") : "Nenhum adicional"}
              </dd>
            </div>
            <div>
              <dt className="text-white/40">Prazo</dt>
              <dd className="mt-1 font-medium text-white">{prazo.label}</dd>
            </div>
          </dl>
          <div className="mt-6 border-t border-line pt-6">
            <p className="text-sm text-white/40">Investimento estimado</p>
            <p className="mt-1 text-4xl font-bold tracking-tight text-white tabular-nums">
              {formatarBRL(estimativa)}
            </p>
          </div>
          <button
            id="simulador-solicitar"
            type="button"
            onClick={solicitar}
            className="mt-6 w-full rounded-lg bg-accent py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-light"
          >
            Solicitar Proposta Deste Projeto
          </button>
        </aside>
      </div>
    </section>
  );
}
