import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import React from "react";
import { renderToString } from "react-dom/server";
import { build, loadEnv } from "vite";
import { configurarSite, dadosEstruturados } from "../src/data/siteInfo.js";
import { paginaLanding } from "./landing-page.mjs";
import { paginasInstitucionais } from "./site-content.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");
const env = loadEnv("production", root, "VITE_");
const site = configurarSite(env);
const renderedAt = Date.now();
const updateLabel = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "long", timeZone: "UTC",
}).format(new Date(site.updatedAt + "T12:00:00Z"));
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
}[char]));
const jsonScript = (value) => JSON.stringify(value).replace(/</g, "\\u003c");

function seoTags({ title, description, url }) {
  return `
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${escapeHtml(url)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${site.name}" />
    <meta property="og:locale" content="pt_BR" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${escapeHtml(url)}" />
    <meta property="og:image" content="${site.url}og-kroma.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Kroma Web — criação de sites, landing pages e sistemas" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${site.url}og-kroma.png" />
  `;
}

const cache = resolve(root, "node_modules/.cache/site-prerender");
await build({
  root,
  configFile: resolve(root, "vite.config.js"),
  logLevel: "error",
  build: { ssr: "src/App.jsx", outDir: cache, emptyOutDir: true },
});
const { default: App } = await import(pathToFileURL(resolve(cache, "App.js")).href);
const markup = renderToString(React.createElement(React.StrictMode, null,
  React.createElement(App, { renderedAt }),
));
let home = await readFile(resolve(dist, "index.html"), "utf8");
if (!home.includes('<div id="root"></div>'))
  throw new Error("O HTML de entrada não contém o ponto de pré-renderização esperado.");
home = home
  .replace(/<title>.*?<\/title>/s, () => `<title>${escapeHtml(site.title)}</title>`)
  .replace(/<meta\s+name="description"[^>]*>/s, () => `<meta name="description" content="${escapeHtml(site.description)}" />`)
  .replace("</head>", () => seoTags({ ...site, url: site.url }) +
    `<script type="application/ld+json">${jsonScript(dadosEstruturados(site))}</script>\n</head>`)
  .replace('<div id="root"></div>', () => `<div id="root">${markup}</div>\n` +
    `<script id="site-render-context" type="application/json">${jsonScript({ renderedAt })}</script>`)
  .replace("<body>", () => `<body>\n<noscript><style>.requires-js{display:none!important}</style><p style="padding:1rem;background:#eff6ff;color:#0f172a">Você pode ler os planos e as informações nesta página. Para usar o simulador, ative o JavaScript. Também pode falar com a Kroma Web pelo <a href="https://wa.me/${site.whatsapp}">WhatsApp de atendimento</a>.</p></noscript>`);
if (site.verification) {
  if (!/^[a-zA-Z0-9_-]+$/.test(site.verification))
    throw new RangeError("Token de verificação do Google inválido.");
  home = home.replace("</head>", () => `<meta name="google-site-verification" content="${site.verification}" />\n</head>`);
}
await writeFile(resolve(dist, "index.html"), home);

const pages = paginasInstitucionais(site, Boolean(env.VITE_SUPABASE_URL && env.VITE_SUPABASE_ANON_KEY));
for (const page of pages) {
  const url = site.url + page.slug + "/";
  const title = page.title + " | " + site.name;
  const html = `<!doctype html><html lang="pt-BR"><head>
    <meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#08090d" /><title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}" />
    ${seoTags({ title, description: page.description, url })}
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="stylesheet" href="/informacoes.css" />
  </head><body>
    <a class="skip-link" href="#conteudo">Ir para o conteúdo</a>
    <header><a class="brand" href="/"><img src="/favicon.svg" alt="" width="32" height="32" />Kroma<span>Web</span></a><a class="back-link" href="/#planos">Planos e valores ↗</a></header>
    <main id="conteudo"><p class="eyebrow">${page.eyebrow}</p><h1>${page.title}</h1>
      <p class="updated">Atualizado em <time datetime="${site.updatedAt}">${updateLabel}</time></p>
      ${page.body}
      <div class="contact"><h2>Fale com a Kroma Web</h2><p>Atendimento sobre projetos, propostas e privacidade.</p><a class="button" href="https://wa.me/${site.whatsapp}" target="_blank" rel="noopener noreferrer">Abrir WhatsApp ↗</a></div>
    </main>
    <footer><a href="/sobre/">Sobre a Kroma Web</a><a href="/privacidade/">Privacidade</a><a href="/condicoes/">Condições de contratação</a><a href="/">Voltar ao site</a><p>© ${new Date(renderedAt).getFullYear()} Kroma Web</p></footer>
  </body></html>`;
  const directory = resolve(dist, page.slug);
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, "index.html"), html);
}
await mkdir(resolve(dist, "landing-pages"), { recursive: true });
await writeFile(resolve(dist, "landing-pages/index.html"), paginaLanding(site, seoTags, escapeHtml, renderedAt));
const urls = [site.url, site.url + "landing-pages/", ...pages.map((page) => site.url + page.slug + "/")];
await writeFile(resolve(dist, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>${escapeHtml(url)}</loc></url>`).join("\n")}\n</urlset>\n`);
await writeFile(resolve(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}sitemap.xml\n`);
console.log("HTML inicial pré-renderizado; 3 páginas institucionais, metadados, sitemap e robots gerados.");
