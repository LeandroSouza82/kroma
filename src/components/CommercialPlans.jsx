import { useState } from "react";
import {
  TIPOS,
  MAX_PARCELAS,
  formatarBRL,
  obterLinkPagamento,
} from "../data/projectOptions";
import { MANUTENCOES } from "../data/maintenancePlans";
import OfferInfoDialog from "./OfferInfoDialog";
import {
  criarPropostaCriacao,
  criarPropostaManutencao,
} from "../utils/projectProposal";

const ABAS = [
  { id: "pix", label: "À vista no Pix" },
  { id: "cartao", label: "Parcelado no cartão" },
  { id: "manutencao", label: "Manutenção mensal" },
];
function Features({ items }) {
  return (
    <ul className="mt-7 space-y-3 text-sm text-slate-600">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span className="text-blue-600" aria-hidden="true">
            ✓
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
export default function CommercialPlans({ onSolicitar }) {
  const [aba, setAba] = useState("pix");
  const [oferta, setOferta] = useState(null);
  const manutencao = aba === "manutencao";
  const selecionar = (proposta) => {
    onSolicitar(proposta);
    document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
  };
  const propostaDaOferta = (item) =>
    item.category === "manutencao"
      ? criarPropostaManutencao(item.id)
      : criarPropostaCriacao({
          tipoId: item.id,
          pagamentoId: item.pagamentoId,
        });
  const navegar = (event) => {
    const atual = ABAS.findIndex((item) => item.id === aba);
    let proxima;
    if (event.key === "ArrowRight") proxima = (atual + 1) % ABAS.length;
    if (event.key === "ArrowLeft")
      proxima = (atual - 1 + ABAS.length) % ABAS.length;
    if (event.key === "Home") proxima = 0;
    if (event.key === "End") proxima = ABAS.length - 1;
    if (proxima === undefined) return;
    event.preventDefault();
    setAba(ABAS[proxima].id);
    event.currentTarget.querySelectorAll('[role="tab"]')[proxima]?.focus();
  };
  return (
    <section id="planos" className="commercial-section scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="section-kicker text-blue-600">
              Design cuidado. Investimento acessível.
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl">
              Uma presença melhor.
              <br />
              Um plano que cabe.
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-slate-600">
            Escolha como começar. Abra Informações em cada preço para ver o que
            inclui, os limites e o que é cobrado separadamente.
          </p>
        </div>
        <div
          role="tablist"
          aria-label="Preços e formas de pagamento"
          onKeyDown={navegar}
          className="mt-10 flex flex-wrap gap-2 rounded-2xl bg-slate-200/65 p-1.5 sm:w-fit"
        >
          {ABAS.map((item) => (
            <button
              key={item.id}
              id={"preco-aba-" + item.id}
              role="tab"
              aria-selected={aba === item.id}
              aria-controls="preco-painel"
              tabIndex={aba === item.id ? 0 : -1}
              type="button"
              onClick={() => setAba(item.id)}
              className={
                "flex-1 rounded-xl px-5 py-3 text-sm font-semibold transition-colors sm:flex-none " +
                (aba === item.id
                  ? "bg-slate-950 text-white shadow-sm"
                  : "text-slate-600 hover:bg-white/70")
              }
            >
              {item.label}
            </button>
          ))}
        </div>
        <div
          id="preco-painel"
          role="tabpanel"
          tabIndex={0}
          aria-labelledby={"preco-aba-" + aba}
          className="mt-9"
        >
          <p className="mb-5 text-sm text-slate-600">
            {manutencao
              ? "Acompanhamento opcional, com pagamento mensal por Pix ou cartão a combinar."
              : aba === "pix"
                ? "Valor à vista no Pix. Escopo e condições confirmados na proposta."
                : "Parcelamento em 10 vezes. O valor total no cartão aparece em cada plano."}
          </p>
          <div
            className={
              "grid gap-4 sm:grid-cols-2 " +
              (manutencao ? "lg:grid-cols-3" : "xl:grid-cols-4")
            }
          >
            {(manutencao ? MANUTENCOES : TIPOS).map((item) => (
              <article
                key={item.id}
                className={
                  "pricing-card " +
                  (item.featured ? "pricing-card-featured" : "")
                }
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3 className="text-lg font-semibold text-slate-950">
                    {item.label}
                  </h3>
                  {item.featured && (
                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-700">
                      Recomendado
                    </span>
                  )}
                </div>
                <p className="mt-3 min-h-16 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
                <div className="mt-6 border-t border-slate-200 pt-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-fit flex-1">
                      {!manutencao && (
                        <p className="text-xs font-medium text-slate-500">
                          A partir de
                        </p>
                      )}
                      <p className="mt-1 text-3xl font-semibold tracking-tight text-slate-950">
                        {manutencao ? (
                          formatarBRL(item.valor)
                        ) : aba === "cartao" ? (
                          <>
                            <span className="text-lg font-normal">
                              {MAX_PARCELAS}×{" "}
                            </span>
                            {formatarBRL(item.cartao / MAX_PARCELAS, true)}
                          </>
                        ) : (
                          formatarBRL(item.base)
                        )}
                      </p>
                      <p className="mt-2 text-sm text-slate-500">
                        {manutencao
                          ? "por mês"
                          : aba === "cartao"
                            ? "Total no cartão: " + formatarBRL(item.cartao)
                            : "à vista no Pix"}
                      </p>
                    </div>
                    <button
                      type="button"
                      aria-haspopup="dialog"
                      aria-label={
                        "Informações sobre " +
                        (manutencao ? "manutenção " : "") +
                        item.label
                      }
                      onClick={() =>
                        setOferta({
                          id: item.id,
                          category: manutencao ? "manutencao" : "criacao",
                          pagamentoId: aba,
                        })
                      }
                      className="plan-info shrink-0 rounded-lg border border-slate-200 px-2 py-2 text-xs font-semibold text-blue-700 hover:border-blue-300 hover:bg-blue-50"
                    >
                      Informações <span aria-hidden="true">ⓘ</span>
                    </button>
                  </div>
                  {!manutencao && (
                    <p className="mt-4 text-xs font-medium text-slate-600">
                      Criação pontual · manutenção não incluída
                    </p>
                  )}
                </div>
                <Features items={item.features} />
                {obterLinkPagamento(item, aba) && (
                  <>
                    <a
                      id={"plano-pagar-" + item.id}
                      href={obterLinkPagamento(item, aba)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Pagar ${item.label} de ${formatarBRL(item.base)} no Mercado Pago (abre em outra aba)`}
                      aria-describedby={"plano-pagamento-info-" + item.id}
                      className="plan-pay mt-auto block w-full rounded-xl bg-blue-600 px-4 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                    >
                      Pagar no Mercado Pago <span aria-hidden="true">↗</span>
                    </a>
                    <p
                      id={"plano-pagamento-info-" + item.id}
                      className="mt-3 text-xs leading-relaxed text-slate-600"
                    >
                      Link para o valor à vista. Confira no Mercado Pago as
                      opções de pagamento e eventuais acréscimos.
                    </p>
                  </>
                )}
                <button
                  type="button"
                  onClick={() =>
                    selecionar(
                      manutencao
                        ? criarPropostaManutencao(item.id)
                        : criarPropostaCriacao({
                            tipoId: item.id,
                            pagamentoId: aba,
                          }),
                    )
                  }
                  className={
                    "plan-request w-full rounded-xl px-4 py-3.5 text-sm font-semibold transition-colors " +
                    (obterLinkPagamento(item, aba)
                      ? "mt-3 border border-blue-200 bg-white text-blue-700 hover:bg-blue-50"
                      : item.featured
                        ? "mt-auto bg-blue-600 text-white hover:bg-blue-700"
                        : "mt-auto bg-slate-100 text-slate-950 hover:bg-slate-200")
                  }
                >
                  {manutencao ? "Consultar este plano" : "Solicitar proposta"}{" "}
                  <span aria-hidden="true">↗</span>
                </button>
              </article>
            ))}
          </div>
          <p className="mt-6 max-w-4xl text-sm leading-relaxed text-slate-500">
            {manutencao
              ? "Cada solicitação cobre uma pequena atualização de conteúdo. Novas páginas, funcionalidades e reformulações são orçadas à parte. A mensalidade começa após a entrega ou o início do acompanhamento combinado."
              : "Valores iniciais para o escopo descrito. Domínio, hospedagem e taxas de serviços externos são combinados na proposta. Integrações e recursos adicionais podem alterar o orçamento."}
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-slate-600">
            Página, manutenção, domínio: entenda cada parte antes de contratar.
          </p>
          <a
            href="#duvidas"
            className="shrink-0 font-semibold text-blue-700 hover:text-blue-900"
          >
            Ver perguntas e respostas ↗
          </a>
        </div>
      </div>
      {oferta && (
        <OfferInfoDialog
          oferta={oferta}
          onFechar={() => setOferta(null)}
          onSolicitar={() => selecionar(propostaDaOferta(oferta))}
        />
      )}
    </section>
  );
}
