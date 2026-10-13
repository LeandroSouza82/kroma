const planos = [
  {
    id: "essencial",
    label: "Essencial",
    valor: 98.9,
    requests: 1,
    description: "Para manter as informações importantes em dia.",
    features: [
      "Ajustes de texto ou imagem",
      "Verificação de links e contato",
      "Suporte por WhatsApp",
    ],
  },
  {
    id: "acompanhamento",
    label: "Acompanhamento",
    valor: 149.9,
    requests: 3,
    featured: true,
    description: "Para negócios que atualizam sua presença com frequência.",
    features: [
      "Atualização de fotos e serviços",
      "Ajustes em horários e informações",
      "Suporte por WhatsApp",
    ],
  },
  {
    id: "evolucao",
    label: "Evolução",
    valor: 248.9,
    requests: 6,
    description: "Mais espaço para cuidar do conteúdo do seu negócio.",
    features: [
      "Atualização de campanhas e galerias",
      "Revisão de informações e links",
      "Prioridade no atendimento",
    ],
  },
];

export const MANUTENCOES = planos.map((plano) => ({
  ...plano,
  features: [
    "Até " +
      plano.requests +
      (plano.requests === 1 ? " solicitação" : " solicitações") +
      " de conteúdo por mês",
    ...plano.features,
  ],
}));
