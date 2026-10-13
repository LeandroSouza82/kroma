import { formatarBRL } from "./projectOptions.js";

export const HOSPEDAGEM_BASE = { valorMensal: 39.9, dominioAnual: 40 };
export const BANCO_DADOS = { tipoId: "sistema", valorMensal: 119 };
export const RESUMO_HOSPEDAGEM =
  formatarBRL(HOSPEDAGEM_BASE.valorMensal, true) +
  "/mês · hospedagem, um domínio .com.br e gestão básica pela Kroma Web.";
export const DOMINIO_INCLUIDO =
  "O registro e a renovação de um domínio .com.br, de referência " +
  formatarBRL(HOSPEDAGEM_BASE.dominioAnual, true) +
  "/ano, estão incluídos nesse pacote mensal. Não há uma segunda cobrança anual desse domínio. O nome precisa estar disponível e fica registrado em nome do cliente.";
export const LIMITES_HOSPEDAGEM =
  "Pacote básico para um site, com configuração, publicação e gestão da hospedagem e do domínio. Manutenção de conteúdo, desenvolvimento de funções, e-mail profissional, APIs e recursos extras são separados. Recursos da hospedagem, início da cobrança e condições de renovação e cancelamento constam da proposta.";
export const RESUMO_BANCO_DADOS =
  formatarBRL(BANCO_DADOS.valorMensal, true) +
  "/mês · banco de dados gerenciado com Supabase, separado da hospedagem.";
export const LIMITES_BANCO_DADOS =
  "Valor comercial da Kroma Web para um banco de dados no escopo básico contratado. A implementação das funções e da integração com os dados não está incluída na mensalidade. Capacidade, tráfego, backups e eventuais recursos excedentes são definidos na proposta antes da contratação. O preço do fornecedor em dólar, o câmbio e a ampliação de recursos podem exigir revisão do pacote, informada antes da renovação.";
export const CONDICOES_HOSPEDAGEM =
  "Ao contratar a gestão pela Kroma Web: " +
  RESUMO_HOSPEDAGEM +
  " " +
  DOMINIO_INCLUIDO +
  " " +
  LIMITES_HOSPEDAGEM;
export const CONDICOES_BANCO_DADOS =
  "Sistema / dashboard ou projeto com banco de dados, sob gestão da Kroma Web: " +
  RESUMO_BANCO_DADOS +
  " " +
  LIMITES_BANCO_DADOS;

export const OPCOES_HOSPEDAGEM = [
  {
    id: "kroma",
    label: "Quero que a Kroma Web cuide",
    summary: "Gestão pela Kroma Web",
    description:
      "A Kroma Web orienta a escolha, configura e gerencia a hospedagem e o domínio, com contratação e responsabilidades definidas na proposta.",
  },
  {
    id: "cliente",
    label: "Vou usar minhas próprias contas",
    summary: "Contas do cliente",
    description:
      "Você contrata e mantém suas contas de hospedagem e domínio. A configuração inicial e os acessos necessários são combinados na proposta.",
  },
];

export const CUSTOS_HOSPEDAGEM =
  "Hospedagem e banco de dados têm mensalidades próprias. Esses custos não estão incluídos automaticamente na criação nem na manutenção de conteúdo. Recursos adicionais e serviços externos têm orçamento próprio, informado antes da contratação.";
export const TITULARIDADE_HOSPEDAGEM =
  "O domínio fica registrado em nome do cliente. A hospedagem pode ser administrada pela Kroma Web ou nas contas do cliente, conforme a proposta.";
export const ENCERRAMENTO_HOSPEDAGEM =
  "Se a gestão for encerrada, os acessos e a transferência do site seguem o combinado na proposta. Prazos, responsabilidades e eventuais custos são informados antes da contratação.";
export const GESTAO_HOSPEDAGEM =
  "Você pode pedir que a Kroma Web cuide da contratação e gestão da hospedagem e do domínio, com ou sem manutenção de conteúdo. " +
  RESUMO_HOSPEDAGEM +
  " O domínio está incluído na mensalidade. Banco de dados e outros serviços têm cobrança própria.";

export function obterOpcaoHospedagem(id) {
  if (!id) return null;
  const opcao = OPCOES_HOSPEDAGEM.find((item) => item.id === id);
  if (!opcao) throw new RangeError("Opção de hospedagem inválida.");
  return opcao;
}

export function precisaBancoDados(proposta) {
  return (
    proposta.tipoId === BANCO_DADOS.tipoId ||
    Boolean(proposta.recursoIds?.includes("supabase"))
  );
}

export function calcularMensalidades(proposta, hospedagemId) {
  const opcao = obterOpcaoHospedagem(hospedagemId);
  const hospedagemMensalidade =
    opcao?.id === "kroma" ? HOSPEDAGEM_BASE.valorMensal : 0;
  const bancoDadosMensalidade =
    opcao?.id === "kroma" && precisaBancoDados(proposta)
      ? BANCO_DADOS.valorMensal
      : 0;
  const mensalidadeTotal =
    Math.round(
      ((proposta.mensalidade || 0) +
        hospedagemMensalidade +
        bancoDadosMensalidade) *
        100,
    ) / 100;
  return { hospedagemMensalidade, bancoDadosMensalidade, mensalidadeTotal };
}

export function anexarHospedagemProposta(proposta, hospedagemId = "") {
  const opcao = obterOpcaoHospedagem(hospedagemId);
  if (!opcao) return proposta;
  const custos = calcularMensalidades(proposta, hospedagemId);
  return {
    ...proposta,
    hospedagemId: opcao.id,
    hospedagemLabel: opcao.summary,
    ...custos,
    escopo: [
      proposta.escopo,
      "Domínio e hospedagem: " + opcao.summary + ". " + opcao.description,
      CUSTOS_HOSPEDAGEM,
      custos.hospedagemMensalidade > 0 && CONDICOES_HOSPEDAGEM,
      custos.bancoDadosMensalidade > 0 && CONDICOES_BANCO_DADOS,
      custos.hospedagemMensalidade > 0 &&
        "Total mensal dos serviços selecionados: " +
          formatarBRL(custos.mensalidadeTotal, true) +
          "/mês",
      TITULARIDADE_HOSPEDAGEM,
      opcao.id === "kroma" && ENCERRAMENTO_HOSPEDAGEM,
    ]
      .filter(Boolean)
      .join(" · "),
  };
}
