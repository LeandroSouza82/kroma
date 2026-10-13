import { useId, useState } from "react";
import {
  MODELOS_SITE,
  CATEGORIAS_MODELOS,
  obterModeloSite,
} from "../data/siteModels";
import {
  referenciaModeloSite,
  mensagemModeloSite,
} from "../utils/siteModelReference";
import { copiarImagemModelo, baixarImagemModelo } from "../utils/modelImage";
import { linkWhatsApp } from "../services/supabaseClient";
import useNativeDialog from "../hooks/useNativeDialog";

const imageUrl = (modelo) => import.meta.env.BASE_URL + modelo.imagePath;

function CopyReference({ modelo, siteUrl }) {
  const [status, setStatus] = useState("");
  const [manual, setManual] = useState(false);
  const [busy, setBusy] = useState(false);
  const reference = referenciaModeloSite(modelo.id, siteUrl);
  const copiar = async () => {
    setBusy(true);
    setManual(false);
    try {
      if (!navigator.clipboard?.writeText)
        throw new Error("Cópia indisponível.");
      await navigator.clipboard.writeText(reference);
      setStatus("Referência " + modelo.code + " copiada. Cole na conversa.");
    } catch {
      setManual(true);
      setStatus("Selecione o texto abaixo e copie a referência.");
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="model-copy-reference">
      <button type="button" disabled={busy} onClick={copiar}>
        {busy ? "Copiando…" : "Copiar referência"}
      </button>
      {status && <p role="status">{status}</p>}
      {manual && (
        <textarea
          aria-label={"Referência para copiar de " + modelo.code}
          readOnly
          value={reference}
          rows={5}
          onFocus={(event) => event.target.select()}
        />
      )}
    </div>
  );
}

function ImageActions({ modelo }) {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const agir = async (acao) => {
    setBusy(true);
    try {
      if (acao === "copiar") {
        await copiarImagemModelo(imageUrl(modelo));
        setStatus(
          "Imagem copiada. Cole na conversa se seu aplicativo permitir.",
        );
      } else {
        await baixarImagemModelo(imageUrl(modelo), modelo.code);
        setStatus(
          "Download da imagem iniciado. Você pode anexar o PNG à conversa.",
        );
      }
    } catch (error) {
      setStatus(
        acao === "copiar"
          ? "Não foi possível copiar a imagem. Use Baixar imagem ou Copiar referência."
          : error.message,
      );
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="model-image-actions">
      <div>
        <button type="button" disabled={busy} onClick={() => agir("copiar")}>
          Copiar imagem
        </button>
        <button type="button" disabled={busy} onClick={() => agir("baixar")}>
          Baixar imagem PNG ↓
        </button>
      </div>
      {status && <p role="status">{status}</p>}
    </div>
  );
}

function ModelPreview({ modelo, siteUrl, onFechar, onEscolher, escolhido }) {
  const { dialogRef, closeRef } = useNativeDialog();
  const titleId = useId();
  const descId = useId();
  return (
    <dialog
      ref={dialogRef}
      className="model-dialog"
      aria-labelledby={titleId}
      aria-describedby={descId}
      onCancel={(event) => {
        event.preventDefault();
        onFechar();
      }}
    >
      <div className="model-dialog-heading">
        <div>
          <p>{modelo.code} · Referência visual</p>
          <h2 id={titleId}>{modelo.label}</h2>
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onFechar}
          aria-label="Fechar modelo"
          className="model-dialog-close"
        >
          ×
        </button>
      </div>
      <img
        src={imageUrl(modelo)}
        alt={modelo.alt}
        width={1200}
        height={900}
        className="model-dialog-image"
      />
      <div className="model-dialog-body">
        <div>
          <h3>Como a estrutura está organizada</h3>
          <ol>
            {modelo.structure.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
        <div>
          <h3>Personalize a partir desta base</h3>
          <p>{modelo.customization}</p>
          <p id={descId}>
            Esta é uma imagem de referência. Textos, cores e fotos serão
            adaptados. Quantidade de páginas, recursos e preço dependem do plano
            e da proposta; os elementos desenhados não acrescentam
            funcionalidades ao pacote.
          </p>
        </div>
      </div>
      <div className="model-dialog-actions">
        <button
          type="button"
          className="model-select-button"
          onClick={() => {
            dialogRef.current.close();
            onEscolher(modelo.id);
            onFechar();
          }}
        >
          {escolhido ? "Manter esta base" : "Usar esta base"} ↗
        </button>
        <a
          className="model-whatsapp-link"
          href={linkWhatsApp(mensagemModeloSite(modelo.id, siteUrl))}
          target="_blank"
          rel="noopener noreferrer"
        >
          Enviar referência no WhatsApp ↗
        </a>
        <CopyReference modelo={modelo} siteUrl={siteUrl} />
        <ImageActions modelo={modelo} />
      </div>
    </dialog>
  );
}

export default function SiteModelsGallery({ modeloId, onEscolher, siteUrl }) {
  const [categoria, setCategoria] = useState("");
  const [previewId, setPreviewId] = useState("");
  const modelos = MODELOS_SITE.filter(
    (modelo) => !categoria || modelo.category === categoria,
  );
  const selecionado = modeloId ? obterModeloSite(modeloId) : null;
  const preview = previewId ? obterModeloSite(previewId) : null;
  return (
    <section id="modelos" className="models-section">
      <div className="models-container">
        <div className="models-heading">
          <div>
            <p className="section-kicker text-accent-light">
              Comece por uma referência
            </p>
            <h2>
              Veja a base.
              <br />
              <span>Imagine o seu negócio.</span>
            </h2>
          </div>
          <p>
            Escolha a organização visual que combina com sua ideia. Você envia o
            código ou a imagem; a criação parte dessa referência e recebe a sua
            identidade.
          </p>
        </div>
        <div className="models-explainer">
          <span>01 · Compare as estruturas</span>
          <span>02 · Escolha ou copie a base</span>
          <span>03 · Personalize no seu projeto</span>
        </div>
        <p className="models-scope-note">
          As prévias são imagens estáticas. A escolha do modelo não altera o
          preço nem inclui páginas ou funcionalidades extras. Confira o escopo
          do plano em <a href="#planos">Planos e valores</a>.
        </p>
        {selecionado && (
          <div className="models-selection" role="status">
            <div>
              <span>Base escolhida</span>
              <strong>
                {selecionado.code} · {selecionado.label}
              </strong>
              <p>A referência acompanhará seu pedido de proposta.</p>
            </div>
            <a href="#planos">Escolher plano ↗</a>
            <button type="button" onClick={() => onEscolher("")}>
              Remover base
            </button>
          </div>
        )}
        <div
          className="models-filters"
          role="group"
          aria-label="Filtrar modelos por estrutura"
        >
          {["", ...CATEGORIAS_MODELOS].map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={categoria === item}
              onClick={() => setCategoria(item)}
            >
              {item || "Todos os modelos"}
            </button>
          ))}
        </div>
        <div className="models-grid">
          {modelos.map((modelo) => (
            <article
              key={modelo.id}
              id={"modelo-" + modelo.id}
              className={
                "model-card" +
                (modeloId === modelo.id ? " model-card-selected" : "")
              }
            >
              <button
                type="button"
                className="model-thumbnail"
                aria-haspopup="dialog"
                aria-label={"Ampliar " + modelo.code + " · " + modelo.label}
                onClick={() => setPreviewId(modelo.id)}
              >
                <img
                  src={imageUrl(modelo)}
                  alt={modelo.alt}
                  width={1200}
                  height={900}
                  loading="lazy"
                />
                <span>Ampliar imagem ↗</span>
              </button>
              <div className="model-card-body">
                <div className="model-card-heading">
                  <span>{modelo.code}</span>
                  <h3>{modelo.label}</h3>
                </div>
                <p className="model-card-description">{modelo.description}</p>
                <ul>
                  {modelo.structure.slice(0, 2).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="model-card-actions">
                  <button
                    type="button"
                    aria-pressed={modeloId === modelo.id}
                    className="model-select-button"
                    onClick={() => onEscolher(modelo.id)}
                  >
                    {modeloId === modelo.id
                      ? "Base escolhida ✓"
                      : "Usar esta base"}
                  </button>
                  <a
                    className="model-whatsapp-link"
                    href={linkWhatsApp(mensagemModeloSite(modelo.id, siteUrl))}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp ↗
                  </a>
                </div>
                <CopyReference modelo={modelo} siteUrl={siteUrl} />
              </div>
            </article>
          ))}
        </div>
      </div>
      {preview && (
        <ModelPreview
          modelo={preview}
          siteUrl={siteUrl}
          escolhido={modeloId === preview.id}
          onEscolher={onEscolher}
          onFechar={() => setPreviewId("")}
        />
      )}
    </section>
  );
}
