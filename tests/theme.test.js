import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";

const controller = readFileSync(new URL("../public/theme.js", import.meta.url), "utf8");
function browser({ dark = false, stored = null, blocked = false } = {}) {
  const events = {};
  const media = { matches: dark, addEventListener: (name, fn) => { events.media = fn; } };
  const meta = {};
  const document = {
    documentElement: { dataset: {} },
    querySelector: () => meta,
    addEventListener: (name, fn) => { events.click = fn; },
  };
  const storage = new Map(stored === null ? [] : [["kroma-theme-v1", stored]]);
  const localStorage = {
    getItem: key => { if (blocked) throw Error("blocked"); return storage.get(key) ?? null; },
    setItem: (key, value) => { if (blocked) throw Error("blocked"); storage.set(key, value); },
  };
  runInNewContext(controller, {
    document, localStorage,
    window: { matchMedia: () => media, addEventListener: (name, fn) => { events[name] = fn; } },
  });
  return {
    document, storage, meta,
    theme: () => document.documentElement.dataset.theme,
    click: (toggle = true) => events.click({ target: { closest: () => toggle ? {} : null } }),
    system: dark => { media.matches = dark; events.media(); },
    external: newValue => events.storage({ key: "kroma-theme-v1", newValue }),
  };
}

test("primeira visita segue o aparelho e acompanha mudanças sem uma escolha explícita", () => {
  for (const dark of [false, true]) {
    const b = browser({ dark });
    assert.equal(b.theme(), dark ? "dark" : "light");
    b.system(!dark);
    assert.equal(b.theme(), dark ? "light" : "dark");
  }
});
test("escolha manual persiste, prevalece sobre o aparelho e não reage a outros cliques", () => {
  const b = browser({ dark: true });
  b.click(false);
  assert.equal(b.theme(), "dark");
  b.click();
  assert.equal(b.theme(), "light");
  assert.equal(b.meta.content, "#f8fafc");
  b.system(true);
  assert.equal(b.theme(), "light");
  assert.equal(browser({ dark: true, stored: b.storage.get("kroma-theme-v1") }).theme(), "light");
  b.click();
  assert.equal(b.theme(), "dark");
  assert.equal(b.meta.content, "#08090d");
});
test("armazenamento bloqueado ou inválido não impede troca de tema", () => {
  assert.equal(browser({ dark: true, stored: "invalid" }).theme(), "dark");
  const b = browser({ blocked: true });
  b.click();
  b.system(false);
  assert.equal(b.theme(), "dark");
});
test("preferência se sincroniza entre abas e volta ao aparelho quando removida", () => {
  const b = browser();
  b.external("dark");
  assert.equal(b.theme(), "dark");
  b.external(null);
  assert.equal(b.theme(), "light");
});
test("as seis páginas usam o mesmo controle e iniciam o tema antes do corpo", () => {
  for (const path of ["index.html", "sobre/index.html", "privacidade/index.html", "condicoes/index.html", "landing-pages/index.html", "sites-institucionais/index.html"]) {
    const html = readFileSync(new URL("../dist/" + path, import.meta.url), "utf8");
    assert.equal((html.match(/src="\/theme.js"/g) || []).length, 1, path);
    assert.ok(html.indexOf('src="/theme.js"') < html.indexOf("</head>"), path);
    assert.match(html, /href="\/theme.css"/);
    assert.equal((html.match(/data-theme-toggle=""/g) || []).length, 1, path);
    assert.match(html, /aria-label="Alternar modo claro e escuro"/);
  }
});
