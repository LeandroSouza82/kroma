export const MAX_PARCELAS = 10;

// Fonte única dos valores anunciados; o escopo final é definido na proposta.
export const TIPOS = [
  {
    id: "empresarial",
    label: "Site institucional",
    base: 700,
    cartao: 1000,
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
    base: 490,
    cartao: 690,
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
    base: 1490,
    cartao: 1890,
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
    base: 2490,
    cartao: 2990,
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
    valor: 490,
    cartao: 690,
  },
  { id: "supabase", label: "Formulários e dados", valor: 350, cartao: 490 },
  { id: "pix", label: "Integração de pagamentos", valor: 350, cartao: 490 },
  { id: "3d", label: "Animações interativas", valor: 490, cartao: 690 },
];
export const PRAZOS = [
  { id: "normal", label: "Padrão — prazo na proposta", fator: 1 },
  { id: "expresso", label: "Entrega prioritária (+30%)", fator: 1.3 },
];
export const calcularEstimativa = (
  tipoId,
  recursoIds = [],
  prazoId = "normal",
  pagamentoId = "pix",
) => {
  const tipo = TIPOS.find((item) => item.id === tipoId);
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
  return Math.round(
    ((cartao ? tipo.cartao : tipo.base) + extras) * prazo.fator,
  );
};
export const formatarBRL = (valor) =>
  valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
export const descreverPagamento = (total, pagamentoId) =>
  pagamentoId === "cartao"
    ? MAX_PARCELAS +
      "× de " +
      formatarBRL(total / MAX_PARCELAS) +
      " no cartão · total " +
      formatarBRL(total)
    : formatarBRL(total) + " à vista no Pix";
