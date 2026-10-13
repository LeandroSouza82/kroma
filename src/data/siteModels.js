export const MODELOS_SITE = [
  {
    id: "kw-01",
    code: "KW-01",
    label: "Destaque amplo",
    category: "Destaque",
    imagePath: "modelos/kw-01.svg",
    accent: "#2563eb",
    description:
      "Uma abertura grande para apresentar a marca ou uma oferta principal.",
    structure: [
      "Menu horizontal no topo",
      "Destaque inicial amplo",
      "Serviços em três blocos",
      "Contato ao final",
    ],
    customization: "Trocar a imagem principal, as cores e o texto de abertura.",
    alt: "Desenho de site com menu no topo, destaque inicial alto, três blocos de serviços e contato.",
  },
  {
    id: "kw-02",
    code: "KW-02",
    label: "Apresentação compacta",
    category: "Destaque",
    imagePath: "modelos/kw-02.svg",
    accent: "#306d62",
    description:
      "Uma abertura menor que coloca os serviços mais perto do primeiro olhar.",
    structure: [
      "Menu horizontal no topo",
      "Destaque inicial compacto",
      "Serviços logo abaixo",
      "Faixa de contato",
    ],
    customization:
      "Ajustar a altura da abertura e a quantidade de blocos dentro do escopo.",
    alt: "Desenho de site com menu no topo, abertura curta, cartões de serviços e faixa de contato.",
  },
  {
    id: "kw-03",
    code: "KW-03",
    label: "Menu lateral",
    category: "Navegação",
    imagePath: "modelos/kw-03.svg",
    accent: "#6572bc",
    description:
      "Navegação na lateral e uma área ampla para organizar a apresentação.",
    structure: [
      "Menu vertical à esquerda",
      "Conteúdo ao lado do menu",
      "Apresentação e blocos informativos",
      "Contato em destaque",
    ],
    customization:
      "Personalizar os itens do menu e adaptar a navegação para celular.",
    alt: "Desenho de site com menu vertical à esquerda e apresentação, informações e contato à direita.",
  },
  {
    id: "kw-04",
    code: "KW-04",
    label: "Menu após o destaque",
    category: "Navegação",
    imagePath: "modelos/kw-04.svg",
    accent: "#a75b43",
    description:
      "A imagem de abertura vem primeiro; a navegação aparece logo depois.",
    structure: [
      "Marca e destaque na abertura",
      "Menu abaixo do destaque",
      "Blocos de apresentação",
      "Contato ao final",
    ],
    customization:
      "Substituir a imagem de abertura e escolher os links da faixa de navegação.",
    alt: "Desenho de site com destaque alto no início, menu horizontal abaixo dele e blocos de conteúdo.",
  },
  {
    id: "kw-05",
    code: "KW-05",
    label: "Galeria em destaque",
    category: "Conteúdo",
    imagePath: "modelos/kw-05.svg",
    accent: "#447daa",
    description:
      "Espaço visual para mostrar fotos, trabalhos ou o ambiente do negócio.",
    structure: [
      "Menu horizontal no topo",
      "Abertura com apresentação breve",
      "Galeria de imagens",
      "Contato para saber mais",
    ],
    customization:
      "Usar fotos autorizadas do negócio e ajustar a galeria ao limite de imagens do plano.",
    alt: "Desenho de site com menu no topo, apresentação breve, galeria de quatro imagens e contato.",
  },
  {
    id: "kw-06",
    code: "KW-06",
    label: "Informações em blocos",
    category: "Conteúdo",
    imagePath: "modelos/kw-06.svg",
    accent: "#755ba2",
    description:
      "Uma composição organizada para comparar serviços e apresentar informações.",
    structure: [
      "Menu horizontal no topo",
      "Abertura de tamanho médio",
      "Conteúdo distribuído em cartões",
      "Faixa final de contato",
    ],
    customization:
      "Escolher os assuntos dos cartões e adaptar textos e imagens ao plano contratado.",
    alt: "Desenho de site com menu no topo, abertura média, quatro cartões informativos e faixa de contato.",
  },
];

export const CATEGORIAS_MODELOS = ["Destaque", "Navegação", "Conteúdo"];
export function obterModeloSite(id) {
  const modelo = MODELOS_SITE.find((item) => item.id === id);
  if (!modelo) throw new RangeError("Modelo visual inválido.");
  return modelo;
}
