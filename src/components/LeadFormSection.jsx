import { useState } from "react";
import { TIPOS, formatarBRL } from "../data/projectOptions";
import { criarLead, linkWhatsApp } from "../services/supabaseClient";

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validar = ({ nome, contato, tipoProjeto, mensagem }) => {
  const erros = {};
  if (nome.trim().length < 2) erros.nome = "Informe seu nome.";
  const digitos = contato.replace(/\D/g, "");
  if (!REGEX_EMAIL.test(contato.trim()) && digitos.length < 10) {
    erros.contato = "Informe um WhatsApp com DDD ou um e-mail válido.";
  }
  if (!tipoProjeto) erros.tipoProjeto = "Selecione o tipo de site.";
  if (mensagem.trim().length < 10) erros.mensagem = "Descreva sua ideia em pelo menos 10 caracteres.";
  return erros;
};

const montarMensagemWhatsApp = ({ nome, contato, tipoProjeto, mensagem }, { escopo, estimativa }) =>
  [
    "Olá, Kroma Web! Quero fechar uma proposta.",
    `Nome: ${nome}`,
    `Contato: ${contato}`,
    `Tipo de site: ${tipoProjeto}`,
    escopo && `Escopo: ${escopo}`,
    estimativa && `Estimativa: ${formatarBRL(estimativa)}`,
    `Ideia: ${mensagem}`,
  ]
    .filter(Boolean)
    .join("\n");

const campo =
  "w-full rounded-lg border bg-base px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-accent-light";

function Campo({ id, label, erro, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-white/70">
        {label}
      </label>
      {children}
      {erro && <p className="mt-1.5 text-xs text-red-400">{erro}</p>}
    </div>
  );
}

export default function LeadFormSection({ proposta }) {
  const [form, setForm] = useState({
    nome: "",
    contato: "",
    tipoProjeto: proposta.tipo,
    mensagem: proposta.mensagem,
  });
  const [erros, setErros] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [resultado, setResultado] = useState(null);

  const atualizar = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const classeCampo = (nome) => `${campo} ${erros[nome] ? "border-red-400/60" : "border-line"}`;

  const enviar = async (e) => {
    e.preventDefault();
    const novosErros = validar(form);
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

    if (error) {
      const link = linkWhatsApp(montarMensagemWhatsApp(form, proposta));
      window.open(link, "_blank", "noopener");
      setResultado({ via: "whatsapp", link });
    } else {
      setResultado({ via: "supabase" });
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
            Em poucas linhas entendemos seu objetivo e retornamos com escopo, prazo e investimento
            claros.
          </p>
          {proposta.estimativa > 0 && (
            <div className="mt-8 max-w-lg rounded-xl border border-line bg-surface p-5 text-sm">
              <p className="text-white/40">Projeto selecionado no simulador</p>
              <p className="mt-1 font-medium text-white">{proposta.tipo}</p>
              <p className="mt-1 text-white/55">{proposta.escopo}</p>
              <p className="mt-3 font-semibold text-accent-light">
                {formatarBRL(proposta.estimativa)}
              </p>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-line bg-surface p-8">
          {resultado ? (
            <div className="animate-pop py-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300">
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
              <h3 className="mt-5 text-2xl font-semibold text-white">
                {resultado.via === "supabase" ? "Recebemos sua solicitação" : "Continue pelo WhatsApp"}
              </h3>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-white/55">
                {resultado.via === "supabase"
                  ? "Nossa equipe analisará sua ideia e entrará em contato em breve."
                  : "Abrimos o WhatsApp com sua mensagem pronta. Se a janela não abriu, use o botão abaixo."}
              </p>
              {resultado.via === "whatsapp" && (
                <a
                  href={resultado.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-light"
                >
                  Abrir WhatsApp
                </a>
              )}
            </div>
          ) : (
            <form onSubmit={enviar} noValidate className="space-y-5">
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
              <Campo id="lead-contato" label="WhatsApp ou E-mail" erro={erros.contato}>
                <input
                  id="lead-contato"
                  name="contato"
                  value={form.contato}
                  onChange={atualizar}
                  className={classeCampo("contato")}
                />
              </Campo>
              <Campo id="lead-tipo" label="Tipo de site" erro={erros.tipoProjeto}>
                <select
                  id="lead-tipo"
                  name="tipoProjeto"
                  value={form.tipoProjeto}
                  onChange={atualizar}
                  className={classeCampo("tipoProjeto")}
                >
                  <option value="">Selecione</option>
                  {TIPOS.map((t) => (
                    <option key={t.id} value={t.label}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </Campo>
              <Campo id="lead-mensagem" label="Descrição da ideia" erro={erros.mensagem}>
                <textarea
                  id="lead-mensagem"
                  name="mensagem"
                  rows={5}
                  value={form.mensagem}
                  onChange={atualizar}
                  className={`${classeCampo("mensagem")} resize-none`}
                />
              </Campo>
              <button
                id="lead-enviar"
                type="submit"
                disabled={enviando}
                className="w-full rounded-lg bg-accent py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-light disabled:opacity-60"
              >
                {enviando ? "Enviando..." : "Enviar solicitação"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
