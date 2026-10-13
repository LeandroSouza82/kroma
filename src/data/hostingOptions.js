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
  "Contratação, gestão, hospedagem e renovação do domínio têm orçamento próprio. Esses custos não estão incluídos automaticamente na criação nem na manutenção de conteúdo.";
export const TITULARIDADE_HOSPEDAGEM =
  "O domínio fica registrado em nome do cliente. A hospedagem pode ser administrada pela Kroma Web ou nas contas do cliente, conforme a proposta.";
export const ENCERRAMENTO_HOSPEDAGEM =
  "Se a gestão for encerrada, os acessos e a transferência do site seguem o combinado na proposta. Prazos, responsabilidades e eventuais custos são informados antes da contratação.";
export const GESTAO_HOSPEDAGEM =
  "Você pode pedir que a Kroma Web cuide da contratação e gestão da hospedagem e do domínio, com ou sem manutenção de conteúdo. O serviço e seus custos são definidos na proposta.";

export function obterOpcaoHospedagem(id) {
  if (!id) return null;
  const opcao = OPCOES_HOSPEDAGEM.find((item) => item.id === id);
  if (!opcao) throw new RangeError("Opção de hospedagem inválida.");
  return opcao;
}

export function anexarHospedagemProposta(proposta, hospedagemId = "") {
  const opcao = obterOpcaoHospedagem(hospedagemId);
  if (!opcao) return proposta;
  return {
    ...proposta,
    hospedagemId: opcao.id,
    hospedagemLabel: opcao.summary,
    escopo: [
      proposta.escopo,
      "Domínio e hospedagem: " + opcao.summary + ". " + opcao.description,
      CUSTOS_HOSPEDAGEM,
      TITULARIDADE_HOSPEDAGEM,
      opcao.id === "kroma" && ENCERRAMENTO_HOSPEDAGEM,
    ]
      .filter(Boolean)
      .join(" · "),
  };
}
