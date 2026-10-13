import {
  obterTipoProjeto,
  RECURSOS,
  PRAZOS,
  calcularEstimativa,
  descreverPagamento,
  formatarBRL,
} from "../data/projectOptions.js";
import { MANUTENCOES } from "../data/maintenancePlans.js";
import { detalharOferta } from "../data/offerDetails.js";
import { PROMOCAO, validadePromocao } from "../data/promotion.js";

export function criarPropostaCriacao({
  tipoId,
  recursoIds = [],
  prazoId = "normal",
  pagamentoId = "pix",
  manutencaoId = "",
  agora = Date.now(),
}) {
  const estimativa = calcularEstimativa(
    tipoId,
    recursoIds,
    prazoId,
    pagamentoId,
    agora,
  );
  const tipo = obterTipoProjeto(tipoId);
  const promocional = tipoId === PROMOCAO.offer.id;
  const prazo = PRAZOS.find((item) => item.id === prazoId);
  const manutencao = MANUTENCOES.find((item) => item.id === manutencaoId);
  if (manutencaoId && !manutencao)
    throw new RangeError("Plano de manutenção inválido.");
  const recursos = RECURSOS.filter((item) => recursoIds.includes(item.id));
  const pagamento = descreverPagamento(estimativa, pagamentoId);
  const detalhes = detalharOferta(tipoId);
  const escopo = [
    "Escopo base: " + detalhes.overview,
    "Limites: " + detalhes.limits.join(" "),
    "Fora do plano base: " + detalhes.excluded.join(" "),
    "Adicionais: " +
      (recursos.map((item) => item.label + " — " + item.scope).join("; ") ||
        "Nenhum"),
    "Prazo: " + prazo.label,
    "Pagamento da criação: " + pagamento,
    "Manutenção: " +
      (manutencao
        ? manutencao.label +
          " — " +
          formatarBRL(manutencao.valor) +
          "/mês — " +
          manutencao.features[0]
        : "Não incluída; sem plano selecionado"),
    "Domínio, hospedagem e taxas externas cobrados separadamente",
    promocional &&
      "Oferta de lançamento válida até " +
        validadePromocao() +
        " (horário de Brasília). Condição sujeita à confirmação da proposta, com adicionais separados.",
  ]
    .filter(Boolean)
    .join(" · ");
  return {
    contratacao: "criacao",
    tipo: tipo.label,
    tipoId,
    recursoIds: [...recursoIds],
    campanhaId: promocional ? PROMOCAO.id : "",
    escopo,
    estimativa,
    pagamentoId,
    pagamento,
    manutencaoId,
    mensalidade: manutencao?.valor || 0,
    mensagem: [
      "Gostaria de uma proposta para " + tipo.label + ".",
      "Entendo que o valor e o prazo finais dependem da confirmação do escopo.",
    ].join("\n"),
  };
}
export function criarPropostaManutencao(planoId) {
  const plano = MANUTENCOES.find((item) => item.id === planoId);
  if (!plano) throw new RangeError("Plano de manutenção inválido.");
  const escopo =
    "Plano " +
    plano.label +
    " · " +
    formatarBRL(plano.valor) +
    "/mês · " +
    plano.features[0] +
    " · Uma solicitação = uma pequena atualização em conteúdo existente, sem acúmulo mensal. Novas páginas e funções, domínio e hospedagem são separados.";
  return {
    contratacao: "manutencao",
    tipo: "Manutenção de site",
    tipoId: "",
    escopo,
    estimativa: 0,
    pagamentoId: "",
    pagamento: "Pagamento mensal a combinar",
    manutencaoId: plano.id,
    mensalidade: plano.valor,
    mensagem: "Gostaria de conversar sobre a manutenção do meu site.",
  };
}
export const montarMensagemContato = (form, proposta) =>
  [
    "Olá, Kroma Web! Gostaria de solicitar um orçamento.",
    "Nome: " + form.nome.trim(),
    "Contato: " + form.contato.trim(),
    "Projeto: " + form.tipoProjeto,
    proposta.escopo && "Condições selecionadas: " + proposta.escopo,
    form.mensagem && "Minha ideia: " + form.mensagem.trim(),
  ]
    .filter(Boolean)
    .join("\n");
