import { useState } from "react";
import {
  TIPOS,
  RECURSOS,
  PRAZOS,
  PAGAMENTOS,
  MAX_PARCELAS,
  formatarBRL,
  calcularParcelamento,
} from "../data/projectOptions";
import { MANUTENCOES } from "../data/maintenancePlans";
import { criarPropostaCriacao } from "../utils/projectProposal";
import OfferInfoDialog from "./OfferInfoDialog";

const opcao = (ativa) =>
  "rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors " +
  (ativa
    ? "border-accent-light bg-accent/15 text-white"
    : "border-line text-white/60 hover:border-white/25 hover:text-white");
function Passo({ numero, titulo, children }) {
  return (
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
}
export default function ProjectCalculator({ onSolicitar }) {
  const [tipoId, setTipoId] = useState(TIPOS[0].id);
  const [recursoIds, setRecursoIds] = useState([]);
  const [prazoId, setPrazoId] = useState(PRAZOS[0].id);
  const [pagamentoId, setPagamentoId] = useState("pix");
  const [manutencaoId, setManutencaoId] = useState("");
  const [oferta, setOferta] = useState(null);
  const proposta = criarPropostaCriacao({
    tipoId,
    recursoIds,
    prazoId,
    pagamentoId,
    manutencaoId,
  });
  const tipo = TIPOS.find((item) => item.id === tipoId);
  const parcelas = calcularParcelamento(proposta.estimativa);
  const recursos = RECURSOS.filter((item) => recursoIds.includes(item.id));
  const alternar = (id) =>
    setRecursoIds((atuais) =>
      atuais.includes(id)
        ? atuais.filter((item) => item !== id)
        : [...atuais, id],
    );
  const solicitar = () => {
    onSolicitar(proposta);
    document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section
      id="simulador"
      className="mx-auto max-w-7xl scroll-mt-20 px-6 py-24"
    >
      <div className="max-w-2xl">
        <p className="section-kicker text-accent-light">Do seu jeito</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Monte o projeto.
          <br />
          <span className="text-white/50">Veja as condições.</span>
        </h2>
        <p className="mt-5 text-base leading-relaxed text-white/60">
          A estimativa acompanha suas escolhas. Criação e manutenção aparecem
          separadas, para você decidir com clareza.
        </p>
      </div>
      <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-8 rounded-2xl border border-line bg-surface p-6 sm:p-8">
          <Passo numero={1} titulo="Tipo de projeto">
            {TIPOS.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={tipoId === item.id}
                className={opcao(tipoId === item.id)}
                onClick={() => setTipoId(item.id)}
              >
                {item.label}
              </button>
            ))}
          </Passo>
          <button
            type="button"
            aria-haspopup="dialog"
            onClick={() => setOferta({ id: tipoId, category: "criacao" })}
            className="text-sm font-semibold text-accent-light hover:text-white"
          >
            Informações do plano {tipo.label} ⓘ
          </button>
          <Passo numero={2} titulo="Recursos adicionais">
            {RECURSOS.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={recursoIds.includes(item.id)}
                className={opcao(recursoIds.includes(item.id))}
                onClick={() => alternar(item.id)}
              >
                {item.label}
                <span className="mt-1 block text-xs opacity-65">
                  +{" "}
                  {formatarBRL(
                    pagamentoId === "cartao" ? item.cartao : item.valor,
                  )}
                </span>
                <span className="mt-3 block text-xs font-normal leading-relaxed text-white/60">
                  {item.scope}
                </span>
              </button>
            ))}
          </Passo>
          <Passo numero={3} titulo="Prazo">
            {PRAZOS.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={prazoId === item.id}
                className={opcao(prazoId === item.id)}
                onClick={() => setPrazoId(item.id)}
              >
                {item.label}
              </button>
            ))}
          </Passo>
          <p className="text-xs leading-relaxed text-white/50">
            Prioridade acrescenta 30% à criação e depende de disponibilidade. O
            prazo é confirmado na proposta, após a definição do escopo e dos
            materiais.
          </p>
          <Passo numero={4} titulo="Pagamento da criação">
            {PAGAMENTOS.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={pagamentoId === item.id}
                className={opcao(pagamentoId === item.id)}
                onClick={() => setPagamentoId(item.id)}
              >
                {item.label}
                <span className="mt-1 block text-xs opacity-65">
                  {item.description}
                </span>
              </button>
            ))}
          </Passo>
          <div>
            <label
              htmlFor="simulador-manutencao"
              className="mb-3 block text-sm font-semibold text-white"
            >
              5 · Acompanhamento mensal{" "}
              <span className="font-normal text-white/50">(opcional)</span>
            </label>
            <select
              id="simulador-manutencao"
              value={manutencaoId}
              onChange={(event) => setManutencaoId(event.target.value)}
              className="w-full rounded-xl border border-line bg-base px-4 py-3 text-sm text-white"
            >
              <option value="">Sem plano de manutenção</option>
              {MANUTENCOES.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label} — {formatarBRL(item.valor)}/mês
                </option>
              ))}
            </select>
            {manutencaoId && (
              <button
                type="button"
                aria-haspopup="dialog"
                onClick={() =>
                  setOferta({ id: manutencaoId, category: "manutencao" })
                }
                className="mt-3 text-sm font-semibold text-accent-light hover:text-white"
              >
                Informações da manutenção selecionada ⓘ
              </button>
            )}
          </div>
        </div>
        <aside
          className="h-fit rounded-2xl border border-accent-light/25 bg-surface p-7 lg:sticky lg:top-28"
          aria-live="polite"
        >
          <p className="section-kicker text-white/45">Seu projeto</p>
          <h3 className="mt-5 text-xl font-semibold text-white">
            {tipo.label}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-white/55">
            {recursos.length
              ? recursos.map((item) => item.label).join(" · ")
              : "Escopo inicial, sem recursos adicionais."}
          </p>
          <div className="mt-7 border-t border-line pt-6">
            <p className="text-sm text-white/55">Criação estimada</p>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-white">
              {pagamentoId === "cartao" ? (
                <>
                  <span className="text-xl font-normal">
                    {parcelas.iguais ? MAX_PARCELAS : MAX_PARCELAS - 1}×{" "}
                  </span>
                  {formatarBRL(parcelas.parcela, true)}
                </>
              ) : (
                formatarBRL(proposta.estimativa)
              )}
            </p>
            {pagamentoId === "cartao" && !parcelas.iguais && (
              <p className="mt-2 text-sm text-white/55">
                Última parcela: {formatarBRL(parcelas.ultima, true)}
              </p>
            )}
            <p className="mt-2 text-sm text-white/55">
              {pagamentoId === "cartao"
                ? "Total no cartão: " + formatarBRL(proposta.estimativa)
                : "À vista no Pix"}
            </p>
          </div>
          <div className="mt-6 rounded-xl border border-line bg-base p-4">
            <p className="text-xs uppercase tracking-wide text-white/40">
              Manutenção mensal
            </p>
            <p className="mt-2 text-base font-semibold text-white">
              {proposta.mensalidade
                ? formatarBRL(proposta.mensalidade) + "/mês"
                : "Não selecionada"}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-white/45">
              Cobrança separada da criação.
            </p>
          </div>
          <button
            id="simulador-solicitar"
            type="button"
            onClick={solicitar}
            className="mt-6 w-full rounded-xl bg-accent py-3.5 text-sm font-semibold text-white hover:bg-accent-light"
          >
            Solicitar esta proposta ↗
          </button>
          <p className="mt-4 text-xs leading-relaxed text-white/40">
            Estimativa inicial. Escopo, condições de pagamento e prazo serão
            confirmados no atendimento.
          </p>
          <p className="mt-3 text-xs leading-relaxed text-white/50">
            Domínio, hospedagem e taxas externas são separados.{" "}
            <a href="#duvidas" className="text-accent-light underline">
              Entenda os custos
            </a>
            .
          </p>
        </aside>
      </div>
      {oferta && (
        <OfferInfoDialog oferta={oferta} onFechar={() => setOferta(null)} />
      )}
    </section>
  );
}
