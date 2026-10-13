import { PROMOCAO, promocaoAtiva } from "./promotion.js";

export const MAX_PARCELAS = 10;

// Fonte única dos valores anunciados; o escopo final é definido na proposta.
export const TIPOS = [
  {
    id: "empresarial",
    label: "Site institucional",
    base: 699.9,
    cartao: 998.9,
    paymentUrl: "https://mpago.li/17uiB8D",
    paymentAmount: 699.9,
    limits: { pages: 1, sections: 5, images: 10, revisions: 1 },
    featured: true,
    description:
      "A sua empresa bem apresentada, com um caminho claro para o contato.",
    features: [
      "Apresentação e serviços",
      "Fotos e conteúdo do negócio",
      "Contato pelo WhatsApp",
      "Layout para celular",
    ],
  },
  {
    id: "evento",
    label: "Evento / convite digital",
    base: 489.9,
    cartao: 689.9,
    paymentUrl: "https://mpago.li/14HxkrF",
    paymentAmount: 489.9,
    limits: { pages: 1, sections: 4, images: 8, revisions: 1 },
    description:
      "Um endereço especial para reunir as informações do seu evento.",
    features: [
      "Página do evento",
      "Informações e localização",
      "Galeria de imagens",
      "Contato com a organização",
    ],
  },
  {
    id: "ecommerce",
    label: "Loja / catálogo digital",
    base: 1489.9,
    cartao: 1489.9,
    paymentUrl: "https://mpago.li/1nD3Ykj",
    paymentAmount: 1489.9,
    paymentInterestFree: true,
    limits: { pages: 1, products: 20, revisions: 1 },
    description:
      "Apresente seus produtos e facilite os pedidos dos seus clientes.",
    features: [
      "Catálogo de produtos",
      "Apresentação da marca",
      "Pedidos pelo WhatsApp",
      "Checkout como adicional",
    ],
  },
  {
    id: "sistema",
    label: "Sistema / dashboard",
    base: 2489.9,
    cartao: 2489.9,
    paymentUrl: "https://mpago.li/22AgdjZ",
    paymentAmount: 2489.9,
    paymentInterestFree: true,
    limits: { screens: 3, flows: 1, revisions: 1 },
    description:
      "Uma interface pensada para o fluxo que a sua operação precisa.",
    features: [
      "Planejamento do fluxo",
      "Interface sob medida",
      "Escopo definido na proposta",
      "Integrações sob consulta",
    ],
  },
];

export const PAGAMENTOS = [
  { id: "pix", label: "Pix", description: "Valor à vista" },
  { id: "cartao", label: "Cartão de crédito", description: "Em 10 parcelas" },
];
export const RECURSOS = [
  {
    id: "admin",
    label: "Painel para editar conteúdo",
    valor: 489.9,
    cartao: 689.9,
    scope:
      "Edição dos textos e imagens de uma área do site, com um acesso administrativo. Novas áreas e níveis de acesso são orçados à parte.",
  },
  {
    id: "supabase",
    label: "Formulários e dados",
    valor: 349.9,
    cartao: 489.9,
    scope:
      "Um formulário com gravação de dados e validação básica. A mensalidade do banco de dados aparece separadamente ao escolher a gestão da Kroma. Relatórios, automações e autenticação são avaliados à parte.",
  },
  {
    id: "pix",
    label: "Integração de pagamentos",
    valor: 349.9,
    cartao: 489.9,
    scope:
      "Um fluxo de pagamento com um provedor, após análise de viabilidade. Taxas do provedor, assinaturas, carrinho, estoque e frete não estão incluídos.",
  },
  {
    id: "3d",
    label: "Animações interativas",
    valor: 489.9,
    cartao: 689.9,
    scope:
      "Uma interação ou animação em uma área da página. Modelagem de objetos 3D, vídeos e produção de imagens são orçados à parte.",
  },
];
export const PRAZOS = [
  { id: "normal", label: "Padrão — prazo na proposta", fator: 1 },
  { id: "expresso", label: "Entrega prioritária (+30%)", fator: 1.3 },
];
export const obterTipoProjeto = (id) =>
  TIPOS.find((item) => item.id === id) ||
  (id === PROMOCAO.offer.id ? PROMOCAO.offer : undefined);

export function obterLinkPagamento(plano, pagamentoId) {
  if (
    !["pix", "cartao"].includes(pagamentoId) ||
    !plano?.paymentUrl
  )
    return "";
  const valor = pagamentoId === "cartao" ? plano.cartao : plano.base;
  if (plano.paymentAmount !== valor) return "";
  return plano.paymentUrl;
}

export const calcularEstimativa = (
  tipoId,
  recursoIds = [],
  prazoId = "normal",
  pagamentoId = "pix",
  agora = Date.now(),
) => {
  const tipo = obterTipoProjeto(tipoId);
  if (tipoId === PROMOCAO.offer.id && !promocaoAtiva(agora))
    throw new RangeError(
      "A promoção não está vigente. Consulte os planos disponíveis.",
    );
  const prazo = PRAZOS.find((item) => item.id === prazoId);
  if (!tipo || !prazo || !PAGAMENTOS.some((item) => item.id === pagamentoId))
    throw new RangeError("Opção de orçamento inválida.");
  if (recursoIds.some((id) => !RECURSOS.some((item) => item.id === id)))
    throw new RangeError("Recurso de orçamento inválido.");
  const cartao = pagamentoId === "cartao";
  const extras = RECURSOS.filter((item) => recursoIds.includes(item.id)).reduce(
    (total, item) => total + (cartao ? item.cartao : item.valor),
    0,
  );
  return (
    Math.round(
      ((cartao ? tipo.cartao : tipo.base) + extras) * prazo.fator * 100,
    ) / 100
  );
};
export const formatarBRL = (valor, centavos = false) =>
  valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: centavos || !Number.isInteger(valor) ? 2 : 0,
    maximumFractionDigits: 2,
  });
export function calcularParcelamento(total) {
  const totalCentavos = Math.round(total * 100);
  const parcelaCentavos = Math.round(totalCentavos / MAX_PARCELAS);
  const ultimaCentavos = totalCentavos - parcelaCentavos * (MAX_PARCELAS - 1);
  return {
    parcela: parcelaCentavos / 100,
    ultima: ultimaCentavos / 100,
    iguais: parcelaCentavos === ultimaCentavos,
  };
}

export function descreverPagamento(total, pagamentoId) {
  if (pagamentoId !== "cartao") return formatarBRL(total) + " à vista no Pix";
  const parcelas = calcularParcelamento(total);
  const descricao = parcelas.iguais
    ? MAX_PARCELAS + "× de " + formatarBRL(parcelas.parcela, true)
    : (MAX_PARCELAS - 1) +
      "× de " +
      formatarBRL(parcelas.parcela, true) +
      " + 1× de " +
      formatarBRL(parcelas.ultima, true);
  return descricao + " no cartão · total " + formatarBRL(total);
}
