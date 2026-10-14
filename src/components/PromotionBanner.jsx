import { useEffect, useId, useState } from "react";
import { formatarBRL } from "../data/projectOptions";
import { PROMOCAO, promocaoAtiva, validadePromocao } from "../data/promotion";
import { detalharOferta } from "../data/offerDetails";
import { criarPropostaCriacao } from "../utils/projectProposal";
import { RESUMO_HOSPEDAGEM } from "../data/hostingOptions";
import useNativeDialog from "../hooks/useNativeDialog";

const SESSION_KEY = "kroma:promocao:" + PROMOCAO.id;
function vistaNestaSessao() {
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === "vista";
  } catch {
    return false;
  }
}
function registrarVisualizacao() {
  try {
    window.sessionStorage.setItem(SESSION_KEY, "vista");
  } catch {
    /* O fechamento continua funcionando se o armazenamento estiver bloqueado. */
  }
}

function PageIllustration() {
  return (
    <div className="promo-art" aria-hidden="true">
      <p className="promo-art-kicker">Uma presença à altura da sua marca</p>
      <p className="promo-art-title">
        Seu negócio.
        <br />
        Seu espaço.
        <br />
        <span>Na internet.</span>
      </p>
      <div className="promo-browser">
        <div className="promo-browser-bar">
          <span />
          <span />
          <span />
          <i>sua marca · seu endereço</i>
        </div>
        <div className="promo-preview">
          <div className="promo-preview-nav">
            <strong>Sua marca</strong>
            <span>Sobre &nbsp; Contato</span>
          </div>
          <div className="promo-preview-hero">
            <span className="promo-preview-tag">FEITO PARA O SEU NEGÓCIO</span>
            <strong>
              Uma boa ideia
              <br />
              merece ser vista.
            </strong>
            <span className="promo-preview-line" />
            <span className="promo-preview-line short" />
            <span className="promo-preview-button">Vamos conversar ↗</span>
            <div className="promo-preview-orbit" />
          </div>
          <div className="promo-preview-grid">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
      <p className="promo-art-caption">
        <span>✦</span> Design cuidado. Informações claras.
      </p>
    </div>
  );
}

function PromotionDialog({ onFechar, onSolicitar }) {
  const { dialogRef, closeRef } = useNativeDialog();
  const titleId = useId();
  const introId = useId();
  const paymentInfoId = useId();
  const [pagamentoId, setPagamentoId] = useState("cartao");
  const oferta = PROMOCAO.offer;
  const detalhes = detalharOferta(oferta.id);
  const cartao = pagamentoId === "cartao";

  return (
    <dialog
      ref={dialogRef}
      className="promo-dialog"
      aria-labelledby={titleId}
      aria-describedby={introId}
      onCancel={(event) => {
        event.preventDefault();
        onFechar();
      }}
    >
      <div className="promo-header">
        <span className="promo-brand">
          Kroma<span>Web</span>
        </span>
        <span className="promo-deadline">Até {validadePromocao()}</span>
        <button
          ref={closeRef}
          type="button"
          className="promo-close"
          aria-label="Fechar promoção"
          onClick={onFechar}
        >
          ×
        </button>
      </div>
      <div className="promo-layout">
        <PageIllustration />
        <div className="promo-content">
          <p className="promo-eyebrow">
            <span /> Oferta de lançamento
          </p>
          <h2 id={titleId}>
            Sua landing page.
            <br />
            <span>Seu próximo passo.</span>
          </h2>
          <p id={introId} className="promo-description">
            {oferta.description}
          </p>
          <div
            className="promo-payment-options"
            role="group"
            aria-label="Pagamento da oferta promocional"
          >
            <button
              type="button"
              aria-pressed={cartao}
              onClick={() => setPagamentoId("cartao")}
            >
              Parcelado no cartão
            </button>
            <button
              type="button"
              aria-pressed={!cartao}
              onClick={() => setPagamentoId("pix")}
            >
              À vista no Pix
            </button>
          </div>
          <div className="promo-price" aria-live="polite" aria-atomic="true">
            <p>{cartao ? "Até " + oferta.numeroParcelas + "× de" : "Criação à vista"}</p>
            <strong>
              {formatarBRL(
                cartao ? oferta.cartao / oferta.numeroParcelas : oferta.base,
                cartao,
              )}
            </strong>
            <span>
              {cartao
                ? "Total no cartão: " + formatarBRL(oferta.cartao)
                : "Pagamento único de " + formatarBRL(oferta.base)}
            </span>
            {cartao && oferta.cartao > oferta.base && (
              <span>
                Inclui {formatarBRL(oferta.cartao - oferta.base, true)} de
                acréscimo sobre {formatarBRL(oferta.base)} à vista.
              </span>
            )}
          </div>
          <ul className="promo-features">
            <li>
              <span aria-hidden="true">✓</span> Uma página com até{" "}
              {oferta.limits.sections} seções
            </li>
            <li>
              <span aria-hidden="true">✓</span> Layout para celular e computador
            </li>
            <li>
              <span aria-hidden="true">✓</span> Botão de contato pelo WhatsApp
            </li>
          </ul>
          <p className="promo-separate-costs">
            Publicação opcional: {RESUMO_HOSPEDAGEM} Manutenção à parte.
          </p>
          <a
            id="promo-pagar"
            className="promo-cta"
            href={PROMOCAO.paymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Pagar landing page no Mercado Pago (abre em outra aba)"
            aria-describedby={paymentInfoId}
            onClick={(event) => {
              if (!promocaoAtiva()) {
                event.preventDefault();
                onFechar();
              }
            }}
          >
            Pagar no Mercado Pago <span aria-hidden="true">↗</span>
          </a>
          <p id={paymentInfoId} className="promo-payment-info">
            Você escolhe a forma de pagamento no Mercado Pago. Confira as opções,
            as parcelas e eventuais juros antes de confirmar.
          </p>
          <button
            id="promo-solicitar"
            className="promo-quote"
            type="button"
            onClick={() => {
              dialogRef.current.close();
              onSolicitar(pagamentoId);
            }}
          >
            Prefiro solicitar uma proposta <span aria-hidden="true">↗</span>
          </button>
          <a className="promo-quote" href="/landing-pages/">Conhecer o serviço de landing pages ↗</a>
          <p className="promo-no-charge">
            Solicitar uma proposta não gera cobrança.
          </p>
          <details className="promo-details">
            <summary>
              O que inclui e quais são os limites?{" "}
              <span aria-hidden="true">+</span>
            </summary>
            <div>
              <h3>Incluído na criação</h3>
              <ul>
                {detalhes.included.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <h3>Limites deste valor</h3>
              <ul>
                {detalhes.limits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <h3>Cobrado separadamente</h3>
              <ul>
                {detalhes.excluded.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <h3>Materiais, ajustes e entrega</h3>
              <ul>
                {detalhes.conditions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>
                A condição promocional vale até {validadePromocao()}, às 23h59,
                no horário de Brasília. Escopo, prazo e pagamento são
                confirmados na proposta.
              </p>
            </div>
          </details>
        </div>
      </div>
    </dialog>
  );
}

export default function PromotionBanner({ onSolicitar, initialNow = Date.now() }) {
  const [ativo, setAtivo] = useState(() => promocaoAtiva(initialNow));
  const [aberto, setAberto] = useState(false);
  const [aviso, setAviso] = useState(false);
  const [destaque, setDestaque] = useState(true);

  useEffect(() => {
    if (promocaoAtiva() && !vistaNestaSessao()) setAviso(true);
  }, []);

  useEffect(() => {
    if (!PROMOCAO.enabled) return;
    let timer;
    const verificarValidade = () => {
      const agora = Date.now();
      const vigente = promocaoAtiva(agora);
      setAtivo(vigente);
      if (!vigente) {
        setAberto(false);
        setAviso(false);
      }
      const proximoLimite =
        agora < Date.parse(PROMOCAO.startsAt)
          ? Date.parse(PROMOCAO.startsAt)
          : Date.parse(PROMOCAO.endsAt);
      clearTimeout(timer);
      if (agora < proximoLimite) {
        // Evita exceder o limite de setTimeout em campanhas com mais de 24 dias.
        timer = setTimeout(
          verificarValidade,
          Math.min(proximoLimite - agora, 86_400_000),
        );
      }
    };
    verificarValidade();
    document.addEventListener("visibilitychange", verificarValidade);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", verificarValidade);
    };
  }, []);

  const fechar = () => {
    registrarVisualizacao();
    if (!promocaoAtiva()) setAtivo(false);
    setAberto(false);
    setAviso(false);
  };
  const abrir = () => {
    if (!promocaoAtiva()) return;
    setAviso(false);
    setAberto(true);
  };
  const solicitar = (pagamentoId) => {
    const agora = Date.now();
    if (!promocaoAtiva(agora)) {
      setAtivo(false);
      fechar();
      return;
    }
    const proposta = criarPropostaCriacao({
      tipoId: PROMOCAO.offer.id,
      pagamentoId,
      agora,
    });
    fechar();
    onSolicitar(proposta);
    document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
  };

  if (!ativo) return null;
  return (
    <section
      id="oferta-landing"
      className="promo-strip"
      aria-label="Oferta promocional de landing page"
    >
      <div>
        <p>
          <span className="promo-strip-label">Oferta de lançamento</span>{" "}
          Landing page por <strong>{formatarBRL(PROMOCAO.offer.base)} no Pix</strong>{" "}
          · No cartão, até {PROMOCAO.offer.numeroParcelas}× de{" "}
          {formatarBRL(PROMOCAO.offer.cartao / PROMOCAO.offer.numeroParcelas, true)}{" "}
          (total {formatarBRL(PROMOCAO.offer.cartao)})
        </p>
        <span className="promo-strip-date">
          Válida até {validadePromocao()}
        </span>
        <button
          id="promo-abrir"
          type="button"
          aria-haspopup="dialog"
          onClick={abrir}
        >
          Ver oferta <span aria-hidden="true">↗</span>
        </button>
      </div>
      {aviso && !aberto && (
        <aside
          className={`promo-notice${destaque ? " promo-notice-attention" : ""}`}
          aria-label="Aviso da oferta de landing page"
          onMouseEnter={() => setDestaque(false)}
          onFocusCapture={() => setDestaque(false)}
          onPointerDown={() => setDestaque(false)}
        >
          <button type="button" className="promo-notice-close" onClick={fechar} aria-label="Fechar aviso da promoção">×</button>
          <p className="promo-notice-label">Oferta de lançamento</p>
          <p className="promo-notice-title">Landing page · até {PROMOCAO.offer.numeroParcelas}× {formatarBRL(PROMOCAO.offer.cartao / PROMOCAO.offer.numeroParcelas, true)}</p>
          <p className="promo-notice-total">Total {formatarBRL(PROMOCAO.offer.cartao)} com juros · {formatarBRL(PROMOCAO.offer.base)} no Pix</p>
          <button type="button" onClick={abrir} aria-haspopup="dialog" className="promo-notice-open">Ver oferta ↗</button>
        </aside>
      )}
      {aberto && <PromotionDialog onFechar={fechar} onSolicitar={solicitar} />}
    </section>
  );
}
