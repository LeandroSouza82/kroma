import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { linkContato } from "../src/utils/contactLink.js";

test("o contato por e-mail preserva a mensagem e não envia automaticamente", () => {
  const mensagem = "Olá! Quero uma proposta.\nPlano: institucional — R$ 699,90 & adicionais";
  const link = new URL(linkContato(mensagem));
  assert.equal(link.protocol, "mailto:");
  assert.equal(link.pathname, "contato@kromaweb.com.br");
  assert.equal(link.searchParams.get("body"), mensagem);
  assert.equal(link.searchParams.get("subject"), "Projeto — Kroma Web");
});

test("a publicação não contém links de WhatsApp nem telefone de atendimento", () => {
  const dist = new URL("../dist/", import.meta.url);
  for (const name of readdirSync(dist, { recursive: true })) {
    if (!/\.(html|js)$/.test(name)) continue;
    const content = readFileSync(new URL(name, dist), "utf8");
    assert.doesNotMatch(content, /https?:\/\/(?:wa\.me|api\.whatsapp\.com)|href=["']tel:/i, name);
  }
});
