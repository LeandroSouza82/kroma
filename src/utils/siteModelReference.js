import { obterModeloSite } from "../data/siteModels.js";

export function linkModeloSite(modeloId, siteUrl = "") {
  obterModeloSite(modeloId);
  if (!siteUrl) return "";
  const url = new URL(siteUrl);
  if (!["http:", "https:"].includes(url.protocol))
    throw new RangeError("Endereço de site inválido.");
  url.search = "";
  url.hash = "modelo-" + modeloId;
  return url.href;
}

export function referenciaModeloSite(modeloId, siteUrl = "") {
  const modelo = obterModeloSite(modeloId);
  return [
    modelo.code + " · " + modelo.label,
    "Estrutura: " + modelo.structure.join(" → "),
    "Quero usar esta imagem como base e personalizar cores, textos e fotos.",
    "Referência visual. Páginas, funcionalidades e preço serão definidos no plano e na proposta.",
    linkModeloSite(modeloId, siteUrl),
  ]
    .filter(Boolean)
    .join("\n");
}

export function mensagemModeloSite(modeloId, siteUrl = "") {
  return (
    "Olá, Kroma Web! Quero conversar sobre um site usando esta base:\n" +
    referenciaModeloSite(modeloId, siteUrl)
  );
}

export function anexarModeloProposta(proposta, modeloId, siteUrl = "") {
  if (!modeloId) return proposta;
  const referencia = referenciaModeloSite(modeloId, siteUrl);
  return {
    ...proposta,
    modeloId,
    escopo: [proposta.escopo, "Base visual escolhida:\n" + referencia]
      .filter(Boolean)
      .join("\n\n"),
  };
}
