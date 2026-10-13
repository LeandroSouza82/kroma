import { formatarBRL } from "./projectOptions.js";

const arredondarCentavos = (valor) => Math.round(valor * 100) / 100;
export const COTACAO_DOLAR = {
  valor: 5.02,
  data: "13/10/2026",
  fonte: "UOL Economia · fechamento comercial de venda",
  url: "https://economia.uol.com.br/cotacoes/noticias/redacao/2026/10/13/dolar-fecha-em-alta-a-r-502-bolsa-recua-apos-recordes-recentes.htm",
};
const hospedagemMensal = 20.9;
const dominioAnual = 40;
export const HOSPEDAGEM_BASE = {
  hospedagemMensal,
  dominioAnual,
  dominioMensal: arredondarCentavos(dominioAnual / 12),
  valorMensal: arredondarCentavos(
    hospedagemMensal + arredondarCentavos(dominioAnual / 12),
  ),
  fornecedor: "Locaweb Go · referência de renovação anual",
  hospedagemUrl:
    "https://sources.locaweb.com.br/site/downloads/proposta_hospedagem.pdf",
  dominioUrl: "https://registro.br/dominio/",
};
export const BANCO_DADOS = {
  tipoId: "sistema",
  valorMensalUsd: 25,
  url: "https://supabase.com/pricing",
};
export function converterBancoDados(cotacao = COTACAO_DOLAR.valor) {
  if (!Number.isFinite(cotacao) || cotacao <= 0)
    throw new RangeError("Cotação de dólar inválida.");
  return arredondarCentavos(BANCO_DADOS.valorMensalUsd * cotacao);
}
export const RESUMO_HOSPEDAGEM =
  formatarBRL(HOSPEDAGEM_BASE.valorMensal, true) +
  "/mês estimados · hospedagem e um domínio .com.br, com gestão pela Kroma Web.";
export const DETALHAMENTO_HOSPEDAGEM =
  "Hospedagem: " +
  formatarBRL(HOSPEDAGEM_BASE.hospedagemMensal, true) +
  "/mês de referência (" +
  formatarBRL(HOSPEDAGEM_BASE.hospedagemMensal * 12, true) +
  "/ano na renovação anual da Locaweb Go). Domínio .com.br: " +
  formatarBRL(HOSPEDAGEM_BASE.dominioAnual, true) +
  "/ano ÷ 12 = aproximadamente " +
  formatarBRL(HOSPEDAGEM_BASE.dominioMensal, true) +
  "/mês. Soma mensal estimada: " +
  formatarBRL(HOSPEDAGEM_BASE.valorMensal, true) +
  ". Valores de referência consultados em 13/10/2026; promoções e alterações do fornecedor podem mudar o custo.";
export const DOMINIO_INCLUIDO =
  "O registro e a renovação de um domínio .com.br, de referência " +
  formatarBRL(HOSPEDAGEM_BASE.dominioAnual, true) +
  "/ano, já estão considerados no equivalente mensal de " +
  formatarBRL(HOSPEDAGEM_BASE.dominioMensal, true) +
  ". Não há uma segunda cobrança anual desse domínio quando seu custo é repassado mensalmente. O nome precisa estar disponível e fica registrado em nome do cliente.";
export const LIMITES_HOSPEDAGEM =
  "Referência para um site com hospedagem básica e um domínio .com.br. O fornecedor cobra o plano anual antecipadamente; o valor mensal mostrado é seu equivalente para orçamento. O repasse, a configuração, a publicação, os recursos e as condições de início, renovação e cancelamento são registrados na proposta. Manutenção de conteúdo, desenvolvimento de funções, e-mail profissional, APIs e recursos extras são separados.";
export const RESUMO_BANCO_DADOS =
  formatarBRL(converterBancoDados(), true) +
  "/mês estimados · Supabase Pro, a partir de US$ " +
  BANCO_DADOS.valorMensalUsd +
  "/mês, separado da hospedagem.";
export const DETALHAMENTO_CAMBIO =
  "Conversão de referência: US$ " +
  BANCO_DADOS.valorMensalUsd +
  " × " +
  formatarBRL(COTACAO_DOLAR.valor, true) +
  " = " +
  formatarBRL(converterBancoDados(), true) +
  "/mês. Cotação usada: " +
  COTACAO_DOLAR.data +
  " · " +
  COTACAO_DOLAR.fonte +
  ". O custo em reais pode aumentar ou diminuir com o dólar. Esta é uma referência datada, recalculada para o câmbio da cobrança; não é um preço fixo garantido. A cotação da operadora do pagamento, impostos e taxas, uso excedente e alterações do plano podem alterar o total e são discriminados na proposta.";
export const LIMITES_BANCO_DADOS =
  "Referência do Supabase Pro para o primeiro projeto com configuração básica. Projetos adicionais, capacidade ampliada e uso excedente têm custos próprios. Capacidade, tráfego, backups e recursos são confirmados antes da contratação. A mensalidade do serviço não inclui o desenvolvimento das funções nem da integração com os dados.";
export const CONDICOES_HOSPEDAGEM =
  "Ao contratar a gestão pela Kroma Web: " +
  RESUMO_HOSPEDAGEM +
  " " +
  DETALHAMENTO_HOSPEDAGEM +
  " " +
  DOMINIO_INCLUIDO +
  " " +
  LIMITES_HOSPEDAGEM;
export const CONDICOES_BANCO_DADOS =
  "Sistema / dashboard ou projeto com banco de dados, sob gestão da Kroma Web: " +
  RESUMO_BANCO_DADOS +
  " " +
  DETALHAMENTO_CAMBIO +
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

export function calcularMensalidades(
  proposta,
  hospedagemId,
  cotacao = COTACAO_DOLAR.valor,
) {
  const opcao = obterOpcaoHospedagem(hospedagemId);
  const hospedagemMensalidade =
    opcao?.id === "kroma" ? HOSPEDAGEM_BASE.valorMensal : 0;
  const bancoDadosMensalidade =
    opcao?.id === "kroma" && precisaBancoDados(proposta)
      ? converterBancoDados(cotacao)
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
        "Total mensal estimado dos serviços selecionados: " +
          formatarBRL(custos.mensalidadeTotal, true) +
          "/mês",
      TITULARIDADE_HOSPEDAGEM,
      opcao.id === "kroma" && ENCERRAMENTO_HOSPEDAGEM,
    ]
      .filter(Boolean)
      .join(" · "),
  };
}
