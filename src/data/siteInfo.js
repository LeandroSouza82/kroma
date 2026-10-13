export const PUBLIC_SITE_URL = "https://kroma-web-rho.vercel.app/";

export function configurarSite(env = {}) {
  const url = new URL(env.VITE_SITE_URL || PUBLIC_SITE_URL);
  if (
    url.protocol !== "https:" || url.username || url.password ||
    url.pathname !== "/" || url.search || url.hash
  ) throw new RangeError("Informe o endereço HTTPS principal do site, sem caminhos ou parâmetros.");
  const whatsapp = env.VITE_WHATSAPP_NUMBER || "5548996525008";
  if (!/^\d{10,15}$/.test(whatsapp))
    throw new RangeError("O WhatsApp de atendimento deve conter apenas dígitos, com código do país.");
  return {
    name: "Kroma Web",
    url: url.href,
    whatsapp,
    title: "Kroma Web | Criação de sites, landing pages e sistemas",
    description: "Criação de sites institucionais, landing pages, convites digitais, catálogos e sistemas web. Compare preços, escopos e manutenção e fale com a Kroma Web.",
    updatedAt: "2026-10-13",
    verification: env.VITE_GOOGLE_SITE_VERIFICATION || "",
  };
}

export const SITE = configurarSite(import.meta.env || {});

export function dadosEstruturados(site = SITE) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": site.url + "#organization",
        name: site.name,
        url: site.url,
        logo: site.url + "logo.svg",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+" + site.whatsapp,
          contactType: "customer service",
          availableLanguage: "pt-BR",
          url: "https://wa.me/" + site.whatsapp,
        },
      },
      {
        "@type": "WebSite",
        "@id": site.url + "#website",
        name: site.name,
        alternateName: "KromaWeb",
        url: site.url,
        inLanguage: "pt-BR",
        publisher: { "@id": site.url + "#organization" },
      },
    ],
  };
}
