import { obterTipoProjeto } from "./projectOptions.js";
import { MANUTENCOES } from "./maintenancePlans.js";
import {
  GESTAO_HOSPEDAGEM,
  BANCO_DADOS,
  CONDICOES_HOSPEDAGEM,
  CONDICOES_BANCO_DADOS,
} from "./hostingOptions.js";

export const CONDICOES_CRIACAO = [
  "Criação é um serviço pontual. A manutenção mensal é opcional e cobrada separadamente.",
  "O cliente fornece logo, textos, fotos autorizadas, serviços, contatos e informações do negócio.",
  "Cada rodada de ajustes reúne as correções em uma lista, dentro do escopo aprovado. Novas páginas, funções ou mudanças de direção exigem outro orçamento.",
  "A proposta confirma escopo, cronograma e pagamento antes do início. O prazo considera o recebimento dos materiais e o retorno do cliente.",
  "Domínio, hospedagem e serviços externos têm custos próprios. Responsáveis, valores e renovações são informados antes da contratação.",
  GESTAO_HOSPEDAGEM,
  CONDICOES_HOSPEDAGEM,
];
export const CONDICOES_MANUTENCAO = [
  "Uma solicitação corresponde a uma pequena atualização em conteúdo existente: um texto, uma foto, um horário ou um link.",
  "Solicitações são contadas por atualização, mesmo quando enviadas na mesma mensagem. As não utilizadas no mês não se acumulam.",
  "Novas páginas, funções, integrações, reformulações e produção de conteúdo são orçadas separadamente.",
  "Atendimento por e-mail, sem plantão 24 horas. Prazo das atualizações e canal de envio são registrados na proposta.",
  "A cobrança é mensal, separada da criação, e começa após a entrega ou o início do acompanhamento acordado. Pagamento por Pix ou cartão a combinar.",
  "Vencimento, renovação e cancelamento são informados na proposta antes da adesão. Domínio, hospedagem e taxas externas não estão incluídos.",
  GESTAO_HOSPEDAGEM,
];

const DESCRICOES = {
  "landing-promocional": {
    overview:
      "Uma página simples para apresentar um serviço, negócio ou campanha e levar interessados ao WhatsApp. A estrutura é adaptada com a identidade e os materiais do cliente.",
    included: [
      "Apresentação da oferta, benefícios e contato na mesma página.",
      "Adaptação de logo, cores, textos e imagens fornecidos pelo cliente.",
      "Layout para celular e computador e botão de contato pelo WhatsApp.",
      "Títulos e descrições básicos para identificar a página nos mecanismos de busca.",
    ],
    excluded: [
      "Manutenção mensal, domínio, hospedagem e taxas de terceiros.",
      "Painel de edição, formulários com banco de dados e integrações.",
      "Loja, pagamentos automáticos, agendamento e páginas adicionais.",
      "Produção de logo, textos, fotos, vídeos, anúncios e SEO contínuo.",
    ],
  },
  empresarial: {
    overview:
      "Um site simples para apresentar uma empresa e facilitar o contato. A base visual é adaptada à sua marca, com foco nas informações essenciais.",
    included: [
      "Página com apresentação, serviços, fotos, contato e localização fornecidos pelo cliente.",
      "Adaptação de logo, cores e textos em uma estrutura pronta.",
      "Layout para celular e computador, com botão para conversar pelo WhatsApp.",
      "Títulos e descrições básicos para identificar o site nos mecanismos de busca.",
    ],
    excluded: [
      "Painel para o cliente editar, blog ou páginas adicionais.",
      "Agendamento automático, área de membros, loja e processamento de pagamentos.",
      "Criação de logo, redação de textos, fotografia e vídeos.",
      "Manutenção, anúncios e trabalho contínuo de SEO.",
    ],
  },
  evento: {
    overview:
      "Um convite ou página de evento que concentra data, programação, endereço e contato. O plano inicial apresenta as informações, sem sistema de credenciamento.",
    included: [
      "Informações do evento, programação e link de localização.",
      "Fotos e identidade visual fornecidas pela organização.",
      "Layout para celular e computador e contato com a organização.",
      "Uma página que pode ser compartilhada por link.",
    ],
    excluded: [
      "Confirmação de presença com banco de dados e lista de convidados.",
      "Ingressos, cobrança, QR Code válido para entrada e check-in.",
      "Transmissão ao vivo, criação de identidade e produção de fotos.",
      "Manutenção e atualização contínua da programação.",
    ],
  },
  ecommerce: {
    overview:
      "O valor inicial cobre um catálogo digital, com pedidos pelo WhatsApp. Uma loja com carrinho, cobrança, estoque e frete precisa de um escopo adicional.",
    included: [
      "Catálogo com nome, foto, descrição e preço enviados pelo cliente.",
      "Apresentação da marca e contato comercial.",
      "Pedido ou consulta pelo WhatsApp, com atendimento humano.",
      "Layout para celular e computador.",
    ],
    excluded: [
      "Carrinho, checkout e pagamento automático.",
      "Gestão de estoque, frete, nota fiscal e integrações com marketplaces.",
      "Painel de edição, cadastro de clientes e área de pedidos.",
      "Cadastro acima do limite inicial, fotografia e manutenção.",
    ],
  },
  sistema: {
    overview:
      "Uma interface inicial para um processo bem delimitado. O plano base cobre as telas e a navegação; dados reais, acesso de usuários e automações são adicionais.",
    included: [
      "Definição de um fluxo simples e das telas necessárias.",
      "Interface adaptada ao processo, para celular e computador.",
      "Navegação entre as telas do fluxo aprovado.",
      "Demonstração para revisão antes da entrega.",
    ],
    excluded: [
      "Banco de dados, autenticação, permissões e integrações.",
      "Relatórios avançados, automações e múltiplos processos.",
      "ERP ou SaaS completo, aplicativo de loja e migração de dados.",
      "Manutenção, operação do sistema e serviços externos.",
    ],
  },
};

function limitesCriacao(tipo) {
  const l = tipo.limits;
  const items = [];
  if (l.pages)
    items.push("Até " + l.pages + " página, acessada por um único endereço.");
  if (l.sections) items.push("Até " + l.sections + " seções na mesma página.");
  if (l.images)
    items.push("Até " + l.images + " imagens fornecidas pelo cliente.");
  if (l.products)
    items.push("Até " + l.products + " produtos no cadastro inicial.");
  if (l.screens)
    items.push(
      "Até " + l.screens + " telas para " + l.flows + " fluxo simples.",
    );
  items.push(l.revisions + " rodada de ajustes no escopo aprovado.");
  return items;
}

export function detalharOferta(id, categoria = "criacao") {
  if (categoria === "criacao") {
    const tipo = obterTipoProjeto(id);
    if (!tipo) throw new RangeError("Oferta de criação inválida.");
    return {
      ...tipo,
      ...DESCRICOES[id],
      category: categoria,
      limits: limitesCriacao(tipo),
      conditions:
        id === BANCO_DADOS.tipoId
          ? [...CONDICOES_CRIACAO, CONDICOES_BANCO_DADOS]
          : CONDICOES_CRIACAO,
    };
  }
  if (categoria !== "manutencao")
    throw new RangeError("Categoria de oferta inválida.");
  const plano = MANUTENCOES.find((item) => item.id === id);
  if (!plano) throw new RangeError("Oferta de manutenção inválida.");
  return {
    ...plano,
    category: categoria,
    overview:
      plano.description +
      " A mensalidade cobre atualizações pequenas em um site existente, com quantidade definida.",
    included: plano.features,
    limits: [
      "Até " +
        plano.requests +
        (plano.requests === 1 ? " solicitação" : " solicitações") +
        " por mês.",
      "Atualizações em áreas já existentes, sem acúmulo para o mês seguinte.",
    ],
    excluded: [
      "Criação de um novo site ou de páginas e funcionalidades.",
      "Reformulação do layout e integrações novas.",
      "Produção de textos, imagens, anúncios e SEO contínuo.",
      "Domínio, hospedagem e assinaturas de terceiros.",
    ],
    conditions: CONDICOES_MANUTENCAO,
  };
}
