import { useState } from "react";

const TAMANHO_QR = 21;

const hashear = (texto) => {
  let h = 2166136261;
  for (const c of texto) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return h >>> 0;
};

const emFinder = (x, y) =>
  (x < 8 && y < 8) || (x >= TAMANHO_QR - 8 && y < 8) || (x < 8 && y >= TAMANHO_QR - 8);

const gerarCelulas = (semente) => {
  let estado = semente || 1;
  const celulas = [];
  for (let y = 0; y < TAMANHO_QR; y++) {
    for (let x = 0; x < TAMANHO_QR; x++) {
      estado ^= estado << 13;
      estado ^= estado >>> 17;
      estado ^= estado << 5;
      if (!emFinder(x, y) && (estado >>> 0) % 2 === 0) celulas.push([x, y]);
    }
  }
  return celulas;
};

const FINDERS = [
  [0, 0],
  [TAMANHO_QR - 7, 0],
  [0, TAMANHO_QR - 7],
];

function QRCodeMock({ semente }) {
  return (
    <svg
      viewBox={`0 0 ${TAMANHO_QR} ${TAMANHO_QR}`}
      className="h-full w-full"
      shapeRendering="crispEdges"
      role="img"
      aria-label="Ilustração de QR Code para uma credencial demonstrativa"
    >
      <rect width={TAMANHO_QR} height={TAMANHO_QR} fill="#fff" />
      {gerarCelulas(semente).map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#08090D" />
      ))}
      {FINDERS.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <rect x={x} y={y} width="7" height="7" fill="#08090D" />
          <rect x={x + 1} y={y + 1} width="5" height="5" fill="#fff" />
          <rect x={x + 2} y={y + 2} width="3" height="3" fill="#08090D" />
        </g>
      ))}
    </svg>
  );
}

const inputClasses =
  "w-full rounded-lg border border-line bg-base px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-accent-light";

export default function InteractiveRSVP() {
  const [nome, setNome] = useState("");
  const [acompanhantes, setAcompanhantes] = useState(0);
  const [credencial, setCredencial] = useState(null);

  const confirmar = (e) => {
    e.preventDefault();
    const nomeLimpo = nome.trim();
    if (!nomeLimpo) return;
    const semente = hashear(`${nomeLimpo}-${acompanhantes}`);
    setCredencial({
      nome: nomeLimpo,
      acompanhantes,
      semente,
      codigo: `KRM-${semente.toString(16).toUpperCase().padStart(8, "0")}`,
    });
  };

  const reiniciar = () => {
    setCredencial(null);
    setNome("");
    setAcompanhantes(0);
  };

  return (
    <section id="demonstracao" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-28">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-light">
            Demonstração interativa
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Uma prévia da experiência do seu evento.
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/60">
            Experimente a interface de confirmação de presença. Esta demonstração apresenta
            uma credencial ilustrativa; o sistema do seu evento será definido na proposta.
          </p>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-8">
          {credencial ? (
            <div className="animate-pop text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent-light">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="m5 12.5 4.5 4.5L19 7.5"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-accent-light">
                Credencial Digital de Convidado
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-white">{credencial.nome}</h3>
              <p className="mt-1 text-sm text-white/50">
                {credencial.acompanhantes === 0
                  ? "Sem acompanhantes"
                  : `+ ${credencial.acompanhantes} acompanhante${credencial.acompanhantes > 1 ? "s" : ""}`}
              </p>
              <div className="mx-auto mt-6 h-44 w-44 rounded-xl bg-white p-3">
                <QRCodeMock semente={credencial.semente} />
              </div>
              <p className="mt-4 font-mono text-sm tracking-widest text-white/70">
                {credencial.codigo}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Confirmação demonstrativa
              </span>
              <button
                type="button"
                onClick={reiniciar}
                className="mt-6 block w-full text-sm font-medium text-white/50 transition-colors hover:text-white"
              >
                Nova confirmação
              </button>
            </div>
          ) : (
            <form onSubmit={confirmar} className="space-y-5 requires-js">
              <div>
                <label htmlFor="rsvp-nome" className="mb-2 block text-sm font-medium text-white/70">
                  Nome completo
                </label>
                <input
                  id="rsvp-nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Como consta no convite"
                  required
                  className={inputClasses}
                />
              </div>
              <div>
                <span className="mb-2 block text-sm font-medium text-white/70">Acompanhantes</span>
                <div className="grid grid-cols-4 gap-2">
                  {[0, 1, 2, 3].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setAcompanhantes(n)}
                      aria-pressed={acompanhantes === n}
                      className={`rounded-lg border py-3 text-sm font-medium transition-colors ${
                        acompanhantes === n
                          ? "border-accent-light bg-accent/15 text-white"
                          : "border-line text-white/60 hover:border-white/20"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
              <button
                id="rsvp-confirmar"
                type="submit"
                className="w-full rounded-lg bg-accent py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-light"
              >
                Confirmar Presença
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
