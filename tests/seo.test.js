import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { configurarSite, dadosEstruturados, PUBLIC_SITE_URL } from "../src/data/siteInfo.js";
import { paginasInstitucionais } from "../scripts/site-content.mjs";

test("o endereço canônico é HTTPS e não aceita credenciais, caminhos ou parâmetros", () => {
  assert.equal(configurarSite().url, PUBLIC_SITE_URL);
  assert.equal(configurarSite({ VITE_SITE_URL: "https://example.com" }).url, "https://example.com/");
  for (const url of ["http://example.com", "https://a:b@example.com", "https://example.com/path", "https://example.com/?x=1", "https://example.com/#top"])
    assert.throws(() => configurarSite({ VITE_SITE_URL: url }), RangeError);
  assert.throws(() => configurarSite({ VITE_WHATSAPP_NUMBER: "não informado" }), RangeError);
});

test("a identificação usa a marca e o contato reais, sem selos, avaliações ou dados cadastrais inventados", () => {
  const site = configurarSite();
  const { "@graph": graph } = dadosEstruturados(site);
  assert.deepEqual(graph.map((item) => item["@type"]), ["Organization", "WebSite"]);
  assert.equal(graph[0].contactPoint.telephone, "+" + site.whatsapp);
  assert.equal(graph[1].url, site.url);
  assert.equal(graph[1].publisher["@id"], graph[0]["@id"]);
  assert.doesNotMatch(JSON.stringify(graph), /aggregateRating|hasCertification|taxID|streetAddress/);
});

test("a política descreve o canal realmente configurado para receber os pedidos", () => {
  const site = configurarSite();
  const texto = (configurado) => paginasInstitucionais(site, configurado).find((item) => item.slug === "privacidade").body;
  assert.match(texto(false), /formulário prepara a mensagem e abre o WhatsApp/);
  assert.doesNotMatch(texto(false), /Supabase como serviço de armazenamento/);
  assert.match(texto(true), /Supabase como serviço de armazenamento/);
  assert.match(texto(false), /armazenamento da sessão.*banner promocional/s);
  assert.match(texto(false), /Google Fonts e Unsplash/);
});

test("o HTML de produção já contém serviços e preços, um canônico e os dados estruturados", () => {
  const html = readFileSync(new URL("../dist/index.html", import.meta.url), "utf8");
  assert.match(html, /id="root">[\s\S]*Site institucional/);
  for (const valor of ["699,90", "489,90", "1.489,90", "2.489,90"])
    assert.ok(html.includes(valor));
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
  const canonical = html.match(/rel="canonical" href="([^"]+)"/)[1];
  assert.equal(new URL(canonical).protocol, "https:");
  assert.doesNotMatch(html, /content="noindex|100% seguro|aprovado pelo Google/i);
  const structured = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
  assert.equal(structured["@graph"][1].name, "Kroma Web");
  assert.equal(structured["@graph"][1].url, canonical);
  const bootstrap = JSON.parse(html.match(/id="site-render-context" type="application\/json">(.*?)<\/script>/s)[1]);
  assert.ok(Number.isFinite(bootstrap.renderedAt));
  assert.ok(existsSync(new URL("../dist/og-kroma.png", import.meta.url)));
});

test("sitemap e links institucionais apontam para páginas HTML reais e indexáveis", () => {
  const home = readFileSync(new URL("../dist/index.html", import.meta.url), "utf8");
  const principal = home.match(/rel="canonical" href="([^"]+)"/)[1];
  const contact = JSON.parse(home.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])["@graph"][0].contactPoint.url;
  const sitemap = readFileSync(new URL("../dist/sitemap.xml", import.meta.url), "utf8");
  assert.equal((sitemap.match(/<loc>/g) || []).length, 6);
  for (const slug of ["sobre", "privacidade", "condicoes"]) {
    const url = principal + slug + "/";
    assert.ok(sitemap.includes(`<loc>${url}</loc>`));
    const html = readFileSync(new URL(`../dist/${slug}/index.html`, import.meta.url), "utf8");
    assert.ok(html.includes(`rel="canonical" href="${url}"`));
    assert.equal((html.match(/<h1>/g) || []).length, 1);
    assert.match(html, /name="robots" content="index, follow/);
    assert.ok(html.includes(`href="${contact}"`));
  }
  const robots = readFileSync(new URL("../dist/robots.txt", import.meta.url), "utf8");
  assert.match(robots, /User-agent: \*\nAllow: \//);
  assert.ok(robots.includes(`Sitemap: ${principal}sitemap.xml`));
});


test("landing page tem endereço próprio, conteúdo e links de contratação", () => {
  const home = readFileSync(new URL("../dist/index.html", import.meta.url), "utf8");
  const principal = home.match(/rel="canonical" href="([^"]+)"/)[1];
  const html = readFileSync(new URL("../dist/landing-pages/index.html", import.meta.url), "utf8");
  const sitemap = readFileSync(new URL("../dist/sitemap.xml", import.meta.url), "utf8");
  assert.ok(sitemap.includes(`<loc>${principal}landing-pages/</loc>`));
  assert.ok(html.includes(`rel="canonical" href="${principal}landing-pages/"`));
  assert.equal((html.match(/<h1>/g) || []).length, 1);
  assert.ok(home.includes('href="/landing-pages/"'));
  assert.ok(html.includes('href="/#oferta-landing"'));
  assert.ok(html.includes('Layout responsivo'));
  assert.ok(html.includes('custos'));
});


test("site institucional possui conteúdo e canônico próprios", () => {
  const html = readFileSync(new URL("../dist/sites-institucionais/index.html", import.meta.url), "utf8");
  const home = readFileSync(new URL("../dist/index.html", import.meta.url), "utf8");
  const base = home.match(/rel="canonical" href="([^"]+)"/)[1];
  assert.ok(html.includes(`rel="canonical" href="${base}sites-institucionais/"`));
  assert.equal((html.match(/<h1>/g) || []).length, 1);
  assert.ok(home.includes('href="/sites-institucionais/"'));
  assert.ok(html.includes('699,90'));
  assert.ok(html.includes('854,64'));
  assert.ok(html.includes('href="/landing-pages/"'));
});
