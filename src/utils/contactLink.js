import { SITE } from "../data/siteInfo.js";

export function linkContato(mensagem = "", site = SITE) {
  const assunto = encodeURIComponent("Projeto — " + site.name);
  return `mailto:${site.email}?subject=${assunto}&body=${encodeURIComponent(mensagem)}`;
}
