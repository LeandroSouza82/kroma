import { useId } from "react";
import useNativeDialog from "../hooks/useNativeDialog";
import { formatarBRL } from "../data/projectOptions";
import { detalharOferta } from "../data/offerDetails";

function DetailList({ title, items }) {
  return (
    <section>
      <h3 className="text-sm font-semibold text-slate-950">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="text-blue-600" aria-hidden="true">
              •
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function OfferInfoDialog({ oferta, onFechar, onSolicitar }) {
  const { dialogRef, closeRef } = useNativeDialog();
  const titleId = useId();
  const introId = useId();
  const detalhes = detalharOferta(oferta.id, oferta.category);
  const mensal = detalhes.category === "manutencao";

  return (
    <dialog
      ref={dialogRef}
      className="offer-dialog"
      aria-labelledby={titleId}
      aria-describedby={introId}
      onCancel={(event) => {
        event.preventDefault();
        onFechar();
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="section-kicker text-blue-600">Escopo e cobrança</p>
          <h2
            id={titleId}
            className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl"
          >
            {mensal ? "Manutenção · " : ""}
            {detalhes.label}
          </h2>
        </div>
        <button
          type="button"
          ref={closeRef}
          onClick={onFechar}
          aria-label="Fechar informações"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xl text-slate-700 hover:bg-slate-200"
        >
          ×
        </button>
      </div>
      <p id={introId} className="mt-5 text-sm leading-relaxed text-slate-600">
        {detalhes.overview}
      </p>
      <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
          {mensal ? "Cobrança mensal" : "Criação do escopo inicial"}
        </p>
        {mensal ? (
          <p className="mt-2 text-2xl font-semibold text-slate-950">
            {formatarBRL(detalhes.valor)}
            <span className="text-sm font-normal"> / mês</span>
          </p>
        ) : (
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-slate-600">À vista no Pix</p>
              <p className="mt-1 text-2xl font-semibold text-slate-950">
                {formatarBRL(detalhes.base)}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Cartão de crédito</p>
              <p className="mt-1 text-2xl font-semibold text-slate-950">
                Até {detalhes.numeroParcelas}×{" "}
                {formatarBRL(detalhes.cartao / detalhes.numeroParcelas, true)}
              </p>
              <p className="mt-1 text-xs text-slate-600">
                Total: {formatarBRL(detalhes.cartao)}
                {detalhes.paymentInterestFree ? " · sem juros" : ""}
              </p>
              {detalhes.cartao > detalhes.base && (
                <p className="mt-1 text-xs text-slate-600">
                  Com juros: {formatarBRL(detalhes.cartao - detalhes.base, true)} de
                  acréscimo sobre o Pix.
                </p>
              )}
            </div>
          </div>
        )}
        <p className="mt-4 text-xs leading-relaxed text-slate-600">
          {mensal
            ? "Plano opcional. A mensalidade não compra um novo site."
            : "Manutenção não incluída. Os preços cobrem o escopo abaixo; adicionais são cobrados separadamente."}
        </p>
      </div>
      <div className="mt-7 grid gap-7 sm:grid-cols-2">
        <DetailList title="O que está incluído" items={detalhes.included} />
        <DetailList title="Até onde vai este plano" items={detalhes.limits} />
        <DetailList title="O que não está incluído" items={detalhes.excluded} />
        <DetailList title="Como funciona" items={detalhes.conditions} />
      </div>
      <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-xs leading-relaxed text-slate-500">
          Nenhuma cobrança é feita no site. A proposta confirma o escopo
          escolhido antes da contratação.
        </p>
        <button
          type="button"
          onClick={() => {
            dialogRef.current.close();
            onFechar();
            onSolicitar?.();
          }}
          className="shrink-0 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          {onSolicitar ? "Solicitar este plano ↗" : "Voltar ao simulador"}
        </button>
      </div>
    </dialog>
  );
}
