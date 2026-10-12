const img = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2000&q=80`;

export const carouselData = [
  {
    id: 1,
    tag: "Empresas & Presença Corporativa",
    title: "Sua marca com a autoridade que fecha contratos B2B.",
    description:
      "Sites institucionais rápidos, com SEO estruturado e narrativa comercial desenhada para converter visitantes em reuniões.",
    label: "Corporativo",
    bgImage: img("photo-1497366216548-37526070297c"),
  },
  {
    id: 2,
    tag: "Plataformas & Dashboards Sob Medida",
    title: "Sistemas que organizam a operação e escalam com você.",
    description:
      "Portais de clientes, sistemas internos, SaaS e automações com dados em tempo real e interface de nível produto.",
    label: "Sistemas",
    bgImage: img("photo-1551288049-bebda4e38f71"),
  },
  {
    id: 3,
    tag: "Grandes Eventos & Celebrações",
    title: "Convites digitais imersivos para momentos inesquecíveis.",
    description:
      "RSVP interativo, credenciais com QR Code e gestão de listas de convidados para casamentos, congressos e eventos de luxo.",
    label: "Eventos",
    bgImage: img("photo-1519741497674-611481863552"),
  },
  {
    id: 4,
    tag: "E-commerce & Lojas de Alta Conversão",
    title: "Checkout veloz, catálogo sofisticado e zero fricção.",
    description:
      "Lojas virtuais ultra otimizadas, com experiência de compra fluida do primeiro clique ao pagamento aprovado.",
    label: "E-commerce",
    bgImage: img("photo-1556742049-0cfed4f6a45d"),
  },
];
