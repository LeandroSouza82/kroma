const img = (id) =>
  "https://images.unsplash.com/" + id + "?auto=format&fit=crop&w=1600&q=75";
export const carouselData = [
  {
    id: 1,
    tipoId: "empresarial",
    tag: "Sites para empresas",
    title: "Seu negócio merece uma presença melhor.",
    description:
      "Design cuidado, conteúdo claro e contato fácil. Uma presença profissional com um investimento acessível.",
    label: "Institucional",
    bgImage: img("photo-1497366216548-37526070297c"),
  },
  {
    id: 2,
    tipoId: "sistema",
    tag: "Sistemas e dashboards",
    title: "Uma boa ideia pode simplificar sua operação.",
    description:
      "Fluxos e interfaces pensados para a rotina do seu negócio, com o escopo combinado antes de começar.",
    label: "Sistemas",
    bgImage: img("photo-1551288049-bebda4e38f71"),
  },
  {
    id: 3,
    tipoId: "evento",
    tag: "Eventos e convites digitais",
    title: "O seu evento começa com uma boa experiência.",
    description:
      "As informações, os momentos e o contato com a organização reunidos em um endereço especial.",
    label: "Eventos",
    bgImage: img("photo-1519741497674-611481863552"),
  },
  {
    id: 4,
    tipoId: "ecommerce",
    tag: "Lojas e catálogos digitais",
    title: "Aproxime seus produtos dos próximos clientes.",
    description:
      "Uma vitrine organizada e um caminho simples para receber pedidos, com integrações definidas na proposta.",
    label: "Loja digital",
    bgImage: img("photo-1556742049-0cfed4f6a45d"),
  },
];
