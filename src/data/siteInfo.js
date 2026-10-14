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
    title: "Criação de sites, landing pages e sistemas web | Kroma Web",
    description: "Criação de sites, landing pages, catálogos digitais e sistemas web com atendimento online em todo o Brasil. Confira preços, escopos e opções de pagamento.",
    updatedAt: "2026-10-14",
    verification: env.VITE_GOOGLE_SITE_VERIFICATION || "",
    hostingProvider: env.VITE_HOSTING_PROVIDER === "Locaweb" ? "Locaweb" : "Vercel",
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
        areaServed: { "@type": "Country", name: "Brasil" },
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
