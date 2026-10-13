import { TIPOS, descreverPagamento, formatarBRL } from "./projectOptions.js";
import { MANUTENCOES } from "./maintenancePlans.js";

const institucional = TIPOS.find((item) => item.id === "empresarial");

export const ETAPAS = [
  {
    title: "Escolha com informação",
    text: "Compare os planos, abra Informações e veja inclusões, limites e custos separados. O simulador mostra o efeito dos adicionais.",
  },
  {
    title: "Receba a proposta",
    text: "Envie sua escolha e a ideia do projeto. A proposta registra o escopo, o pagamento, os materiais necessários e o cronograma.",
  },
  {
    title: "Veja e revise",
    text: "Com os materiais recebidos, começa a criação. Você recebe uma prévia e reúne os ajustes da rodada incluída em uma lista.",
  },
  {
    title: "Publique e acompanhe",
    text: "Depois da aprovação, a publicação e os acessos seguem o combinado. A manutenção é opcional e tem cobrança e limites próprios.",
  },
];

export const CATEGORIAS_FAQ = [
  "Planos e escopo",
  "Pagamento",
  "Criação e entrega",
  "Manutenção",
  "Domínio e hospedagem",
];

export const PERGUNTAS = [
  {
    id: "preco-institucional",
    category: "Pagamento",
    question: "Quanto custa o site institucional e como posso pagar?",
    answer: [
      "O escopo inicial custa " +
        descreverPagamento(institucional.base, "pix") +
        " ou " +
        descreverPagamento(institucional.cartao, "cartao") +
        ". O total no cartão é diferente do valor à vista e aparece antes de você solicitar a proposta.",
      "Adicionais e prioridade alteram a estimativa. Manutenção, domínio, hospedagem e taxas externas são separados. Para o institucional, a cobrança é confirmada na proposta. Enquanto estiver vigente, a oferta promocional de landing page tem um link próprio de pagamento no banner.",
    ],
  },
  {
    id: "plano-simples",
    category: "Planos e escopo",
    question: "O que significa um site simples? Ele inclui tudo?",
    answer: [
      "O institucional inicial é uma página com até " +
        institucional.limits.sections +
        " seções e " +
        institucional.limits.images +
        " imagens, usando uma estrutura adaptada à sua marca. Serve para apresentar o negócio e facilitar o contato pelo WhatsApp.",
      "O preço acessível corresponde a esse limite. Painel de edição, blog, loja, agendamento automático e integrações não estão incluídos. Abra Informações no plano para comparar todos os itens antes de escolher.",
    ],
  },
  {
    id: "pagina-secao",
    category: "Planos e escopo",
    question: "Qual a diferença entre página, seção e tela?",
    answer: [
      "Uma página é acessada por um endereço. Seções são os blocos dentro dela, como apresentação, serviços, fotos e contato. Uma página pode conter várias seções.",
      "Uma tela é uma etapa da interface de um sistema, como uma lista ou um formulário. Os limites do sistema se referem às telas e ao fluxo descritos no plano.",
    ],
  },
  {
    id: "catalogo-loja",
    category: "Planos e escopo",
    question: "O catálogo já vende e recebe pagamentos automaticamente?",
    answer: [
      "O plano inicial apresenta os produtos e direciona o pedido ao WhatsApp. O atendimento, a confirmação e a cobrança ficam com o negócio.",
      "Carrinho, checkout, estoque, frete e nota fiscal exigem um orçamento próprio. O adicional de pagamento cobre um fluxo com um provedor, após análise, e não transforma sozinho o catálogo em uma loja completa.",
    ],
  },
  {
    id: "demonstracao",
    category: "Planos e escopo",
    question: "A demonstração de evento e QR Code está incluída no plano?",
    answer: [
      "A demonstração é uma simulação da experiência. O evento inicial é uma página informativa, sem lista de convidados, ingressos ou check-in.",
      "Confirmação de presença com dados reais, QR Code válido e controle de entrada precisam ser descritos e orçados no projeto.",
    ],
  },
  {
    id: "extras",
    category: "Planos e escopo",
    question:
      "Como funcionam os adicionais? Posso pedir mais páginas ou funções?",
    answer: [
      "Cada adicional do simulador tem um limite explicado ao lado do preço. Selecione somente o que precisa; ele será somado ao valor de criação na forma de pagamento escolhida.",
      "Novas páginas, mais produtos, integrações e funcionalidades fora desses limites podem ser orçados. A análise confirma a viabilidade antes de você contratar; o simulador gera uma estimativa.",
    ],
  },
  {
    id: "parcelas-manutencao",
    category: "Pagamento",
    question:
      "As parcelas da criação incluem manutenção? Vou pagar para sempre?",
    answer: [
      "As parcelas pagam apenas a criação contratada e terminam ao completar o parcelamento. Elas não incluem manutenção.",
      "A manutenção é um serviço mensal opcional. Se contratada, ela é cobrada separadamente e pode ocorrer no mesmo período das parcelas. O vencimento, a renovação e o cancelamento constam da proposta antes da adesão.",
    ],
  },
  {
    id: "materiais",
    category: "Criação e entrega",
    question: "O que preciso enviar para começar?",
    answer: [
      "Envie logo, cores da marca, textos, serviços ou produtos, fotos autorizadas, contatos, horários e endereço, conforme o plano. Para evento, inclua data, programação e localização.",
      "Produção de textos, logo, fotos e vídeos não faz parte dos valores iniciais. Se ainda não tiver algum material, indique isso no pedido para receber um orçamento adequado.",
    ],
  },
  {
    id: "prazo-revisoes",
    category: "Criação e entrega",
    question: "Qual é o prazo e quantas alterações posso pedir?",
    answer: [
      "O cronograma é registrado na proposta conforme o escopo e a disponibilidade. A contagem considera a entrega dos materiais e o tempo de retorno do cliente. A opção prioritária acrescenta 30% à criação e depende de disponibilidade; não garante uma data automaticamente.",
      "Os planos iniciais incluem uma rodada de ajustes: você reúne as correções de conteúdo e apresentação em uma lista. Mudanças de escopo, novas funções e outras rodadas são avaliadas e orçadas separadamente.",
    ],
  },
  {
    id: "celular-edicao",
    category: "Criação e entrega",
    question: "O site funciona no celular? Eu consigo editar depois?",
    answer: [
      "O layout para celular e computador está incluído nos planos de criação. Um painel para você editar conteúdo não está incluído automaticamente: é um adicional com área e acesso definidos.",
      "Sem painel, as alterações podem ser feitas por manutenção ou serviço avulso. Não há obrigação de contratar acompanhamento mensal.",
    ],
  },
  {
    id: "google",
    category: "Criação e entrega",
    question: "Meu site vai aparecer em primeiro lugar no Google?",
    answer: [
      "O institucional inclui títulos e descrições básicos para identificar o site. Isso não garante uma posição nem um prazo de indexação.",
      "Anúncios, produção recorrente de conteúdo e trabalho contínuo de SEO não estão incluídos no plano inicial.",
    ],
  },
  {
    id: "entrega-acessos",
    category: "Criação e entrega",
    question: "O que recebo na entrega e em nome de quem ficam os acessos?",
    answer: [
      "A proposta descreve o site aprovado, a publicação, os acessos e os arquivos que serão entregues. Domínio e contas de serviços precisam ter um responsável definido antes da contratação.",
      "Guarde as credenciais e as datas de renovação dos serviços sob sua responsabilidade. A transferência ou configuração de contas existentes é avaliada no escopo.",
    ],
  },
  {
    id: "manutencao-opcional",
    category: "Manutenção",
    question: "A manutenção é obrigatória? Quais são os valores?",
    answer: [
      "É opcional. Os planos mensais são: " +
        MANUTENCOES.map(
          (item) =>
            item.label +
            " por " +
            formatarBRL(item.valor) +
            "/mês, com até " +
            item.requests +
            (item.requests === 1 ? " solicitação" : " solicitações"),
        ).join("; ") +
        ".",
      "Você pode começar sem plano e solicitar atualizações avulsas, cobradas separadamente. A manutenção não inclui o custo de manter domínio e hospedagem ativos.",
    ],
  },
  {
    id: "solicitacao",
    category: "Manutenção",
    question: "O que conta como uma solicitação de manutenção?",
    answer: [
      "Uma solicitação é uma atualização pequena em conteúdo existente: trocar um texto, uma foto, um horário ou um link. Se uma mensagem pedir três atualizações distintas, serão três solicitações.",
      "O cliente fornece o novo conteúdo. Solicitações não usadas não acumulam para o mês seguinte. Novas páginas, funções e reformulação do layout precisam de outro orçamento. Há atendimento por WhatsApp, sem plantão 24 horas.",
    ],
  },
  {
    id: "manutencao-existente",
    category: "Manutenção",
    question: "Posso contratar só a manutenção de um site que já tenho?",
    answer: [
      "Sim, você pode solicitar somente manutenção. A análise inicial verifica a tecnologia, os acessos e a situação do site antes de confirmar o atendimento.",
      "O pedido de manutenção não adiciona uma taxa de criação. Correções estruturais, migrações e reformulações, se necessárias, são orçadas separadamente antes do início.",
    ],
  },
  {
    id: "dominio-hospedagem",
    category: "Domínio e hospedagem",
    question: "O que são domínio e hospedagem? Estão incluídos?",
    answer: [
      "Domínio é o endereço do site, como suaempresa.com.br. Hospedagem é o serviço que mantém os arquivos disponíveis na internet. São serviços diferentes, com custos e renovações próprios.",
      "Os valores de criação e manutenção anunciados não incluem esses serviços. A proposta informa a opção escolhida, quem contrata, quem paga e como funciona a renovação. Serviços externos e taxas de pagamento também são separados.",
    ],
  },
  {
    id: "site-sem-manutencao",
    category: "Domínio e hospedagem",
    question: "O site continua no ar sem manutenção?",
    answer: [
      "Um plano mensal de atualizações não é uma condição para ter o site publicado. A disponibilidade depende de manter a hospedagem, o domínio e outros serviços utilizados ativos.",
      "Sem manutenção, o conteúdo permanece como entregue. Alterações e suporte posteriores são combinados à parte. A manutenção de conteúdo não garante disponibilidade de serviços de terceiros.",
    ],
  },
];

export const normalizarBusca = (texto) =>
  texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR");

export function filtrarPerguntas(busca = "", categoria = "") {
  const termos = normalizarBusca(busca.trim()).split(/\s+/).filter(Boolean);
  return PERGUNTAS.filter(
    (item) =>
      (!categoria || item.category === categoria) &&
      termos.every((termo) =>
        normalizarBusca(
          [item.question, item.category, ...item.answer].join(" "),
        ).includes(termo),
      ),
  );
}
