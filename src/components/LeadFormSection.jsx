import { useState } from "react";
import { TIPOS, formatarBRL } from "../data/projectOptions";
import { criarLead, linkWhatsApp } from "../services/supabaseClient";
import { montarMensagemContato } from "../utils/projectProposal";
import HostingOptions from "./HostingOptions";
import { anexarHospedagemProposta } from "../data/hostingOptions";

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validar = ({ nome, contato, tipoProjeto, mensagem }, modelo) => {
  const erros = {};
  if (nome.trim().length < 2) erros.nome = "Informe seu nome.";
  const digitos = contato.replace(/\D/g, "");
  if (!REGEX_EMAIL.test(contato.trim()) && digitos.length < 10) {
    erros.contato = "Informe um WhatsApp com DDD ou um e-mail válido.";
  }
  if (!tipoProjeto) erros.tipoProjeto = "Selecione o tipo de site.";
  if (mensagem.trim().length < 10 && !modelo)
    erros.mensagem = "Descreva sua ideia em pelo menos 10 caracteres.";
  return erros;
};

const campo =
  "w-full rounded-lg border bg-base px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-accent-light";

function Campo({ id, label, erro, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-white/70"
      >
        {label}
      </label>
      {children}
      {erro && <p className="mt-1.5 text-xs text-red-400">{erro}</p>}
    </div>
  );
}

export default function LeadFormSection({
  proposta: propostaBase,
  modelo,
  onRemoverModelo,
  hospedagemId,
  onHospedagemChange,
}) {
  const [form, setForm] = useState({
    nome: "",
    contato: "",
    tipoProjeto: propostaBase.tipo,
    mensagem: propostaBase.mensagem,
  });
  const tipoId =
    propostaBase.tipoId ||
    TIPOS.find((item) => item.label === form.tipoProjeto)?.id ||
    "";
  const proposta = anexarHospedagemProposta(
    { ...propostaBase, tipoId },
    hospedagemId,
  );
  const [erros, setErros] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [resultado, setResultado] = useState(null);
  const conversa = linkWhatsApp(
    proposta.escopo
      ? montarMensagemContato(
          {
            ...form,
            nome: form.nome || "A informar",
            contato: form.contato || "Pelo WhatsApp",
          },
          proposta,
        )
      : "Olá, Kroma Web! Gostaria de conversar sobre um projeto.",
  );

  const atualizar = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const classeCampo = (nome) =>
    `${campo} ${erros[nome] && !(modelo && nome === "mensagem") ? "border-red-400/60" : "border-line"}`;

  const enviar = async (e) => {
    e.preventDefault();
    const novosErros = validar(form, modelo);
    setErros(novosErros);
    if (Object.keys(novosErros).length) return;

    setEnviando(true);
    const { error } = await criarLead({
      nome: form.nome.trim(),
      contato: form.contato.trim(),
      tipoProjeto: form.tipoProjeto,
      escopo: proposta.escopo,
      estimativa: proposta.estimativa,
      mensagem: form.mensagem.trim(),
    });

    const link = linkWhatsApp(montarMensagemContato(form, proposta));
    if (error) {
      window.open(link, "_blank", "noopener");
      setResultado({ via: "whatsapp", link });
    } else {
      setResultado({ via: "supabase", link });
    }
    setEnviando(false);
  };

  return (
    <section id="contato" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-28">
      <div className="grid gap-16 lg:grid-cols-[1fr_560px]">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-light">
            Contato
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Conte sua ideia. Respondemos com uma proposta.
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/60">
            Em poucas linhas entendemos seu objetivo e retornamos com escopo,
            prazo e investimento claros.
          </p>
          {modelo && (
            <div className="lead-model-selection">
              <img
                src={import.meta.env.BASE_URL + modelo.imagePath}
                alt={modelo.alt}
                width={1200}
                height={900}
              />
              <div>
                <p>Base visual escolhida</p>
                <strong>
                  {modelo.code} · {modelo.label}
                </strong>
                <span>
                  Referência para personalizar. Escopo e preço seguem o plano.
                </span>
                <button type="button" onClick={onRemoverModelo}>
                  Remover base
                </button>
              </div>
            </div>
          )}
          {(proposta.estimativa > 0 ||
            proposta.mensalidade > 0 ||
            proposta.hospedagemId) && (
            <div className="mt-8 max-w-lg rounded-xl border border-line bg-surface p-5 text-sm">
              <p className="text-white/40">Condições selecionadas</p>
              <p className="mt-1 font-medium text-white">
                {proposta.tipo || "Domínio e hospedagem"}
              </p>
              {proposta.estimativa > 0 && (
                <p className="mt-3 font-semibold text-accent-light">
                  Criação: {proposta.pagamento}
                </p>
              )}
              {proposta.mensalidade > 0 && (
                <p className="mt-2 font-semibold text-accent-light">
                  Manutenção: {formatarBRL(proposta.mensalidade)}/mês
                </p>
              )}
              {proposta.hospedagemId && (
                <p className="mt-3 text-white/75">
                  Domínio e hospedagem: {proposta.hospedagemLabel}.{" "}
                  {proposta.hospedagemMensalidade > 0
                    ? formatarBRL(proposta.hospedagemMensalidade, true) +
                      "/mês estimados, separado da criação e da manutenção."
                    : "Valor definido na proposta, separado da criação e da manutenção."}
                </p>
              )}
              {proposta.bancoDadosMensalidade > 0 && (
                <p className="mt-3 text-white/75">
                  Banco de dados · Supabase:{" "}
                  {formatarBRL(proposta.bancoDadosMensalidade, true)}/mês
                  estimados. Pode aumentar ou diminuir conforme o dólar; taxas e
                  excedentes à parte.
                </p>
              )}
              {proposta.hospedagemMensalidade > 0 && (
                <p className="mt-3 font-semibold text-accent-light">
                  Total mensal estimado:{" "}
                  {formatarBRL(proposta.mensalidadeTotal, true)}
                  /mês
                </p>
              )}
              <details className="mt-4 border-t border-line pt-4">
                <summary className="cursor-pointer text-sm font-medium text-white/75">
                  Ver escopo completo e limites
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-white/55">
                  {proposta.escopo}
                </p>
              </details>
              <a
                href={
                  proposta.contratacao === "manutencao" || proposta.campanhaId
                    ? "#planos"
                    : "#simulador"
                }
                className="mt-4 inline-block text-xs text-white/55 underline underline-offset-4"
              >
                Ajustar seleção
              </a>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-line bg-surface p-8">
          {resultado ? (
            <div className="animate-pop py-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="m5 12.5 4.5 4.5L19 7.5"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="mt-5 text-2xl font-semibold text-white">
                {resultado.via === "supabase"
                  ? "Recebemos sua solicitação"
                  : "Continue pelo WhatsApp"}
              </h3>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-white/55">
                {resultado.via === "supabase"
                  ? "Vamos analisar sua ideia e conversar sobre o escopo e as condições."
                  : "Sua consulta está pronta. Use o botão abaixo para enviar a mensagem pelo WhatsApp."}
              </p>
              <a
                href={resultado.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-light"
              >
                {resultado.via === "whatsapp"
                  ? "Abrir WhatsApp"
                  : "Conversar sobre esta proposta"}
              </a>
            </div>
          ) : (
            <form onSubmit={enviar} noValidate className="space-y-5 requires-js">
              <Campo id="lead-nome" label="Nome" erro={erros.nome}>
                <input
                  id="lead-nome"
                  name="nome"
                  value={form.nome}
                  onChange={atualizar}
                  autoComplete="name"
                  className={classeCampo("nome")}
                />
              </Campo>
              <Campo
                id="lead-contato"
                label="WhatsApp ou E-mail"
                erro={erros.contato}
              >
                <input
                  id="lead-contato"
                  name="contato"
                  value={form.contato}
                  onChange={atualizar}
                  className={classeCampo("contato")}
                />
              </Campo>
              <Campo
                id="lead-tipo"
                label="Tipo de site"
                erro={erros.tipoProjeto}
              >
                <select
                  id="lead-tipo"
                  name="tipoProjeto"
                  value={form.tipoProjeto}
                  disabled={Boolean(proposta.tipo)}
                  onChange={atualizar}
                  className={classeCampo("tipoProjeto")}
                >
                  <option value="">Selecione</option>
                  <option value="Manutenção de site">Manutenção de site</option>
                  {proposta.campanhaId && (
                    <option value={proposta.tipo}>{proposta.tipo}</option>
                  )}
                  {TIPOS.map((t) => (
                    <option key={t.id} value={t.label}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </Campo>
              <HostingOptions
                id="lead-hospedagem"
                value={hospedagemId}
                onChange={onHospedagemChange}
                tipoId={tipoId}
                recursoIds={propostaBase.recursoIds}
              />
              <Campo
                id="lead-mensagem"
                label={
                  modelo
                    ? "O que deseja personalizar? (opcional)"
                    : "Descrição da ideia"
                }
                erro={modelo ? undefined : erros.mensagem}
              >
                <textarea
                  id="lead-mensagem"
                  name="mensagem"
                  rows={5}
                  value={form.mensagem}
                  onChange={atualizar}
                  className={`${classeCampo("mensagem")} resize-none`}
                />
              </Campo>
              <p className="text-xs leading-relaxed text-white/60">
                Usamos os dados informados para atender ao seu pedido. Consulte a{" "}
                <a href="/privacidade/" target="_blank" rel="noopener noreferrer" className="text-accent-light underline underline-offset-4">
                  política de privacidade
                </a>. Evite enviar senhas ou dados de cartão.
              </p>
              <button
                id="lead-enviar"
                type="submit"
                disabled={enviando}
                className="w-full rounded-lg bg-accent py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-light disabled:opacity-60"
              >
                {enviando ? "Enviando..." : "Enviar solicitação"}
              </button>
              <p className="text-xs leading-relaxed text-white/45">
                Este pedido inicia uma conversa sobre o orçamento. O pagamento
                será combinado após a confirmação do escopo.
              </p>
              <a
                href={conversa}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-sm text-accent-light underline underline-offset-4"
              >
                Prefiro conversar pelo WhatsApp
              </a>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
