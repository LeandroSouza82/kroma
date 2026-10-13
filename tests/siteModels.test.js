import test from "node:test";
import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import { MODELOS_SITE } from "../src/data/siteModels.js";
import {
  referenciaModeloSite,
  mensagemModeloSite,
  linkModeloSite,
  anexarModeloProposta,
} from "../src/utils/siteModelReference.js";
import { criarPropostaCriacao } from "../src/utils/projectProposal.js";

test("os seis modelos possuem identificação única e arquivos de imagem disponíveis", async () => {
  assert.equal(MODELOS_SITE.length, 6);
  assert.equal(new Set(MODELOS_SITE.map((item) => item.id)).size, 6);
  assert.equal(new Set(MODELOS_SITE.map((item) => item.code)).size, 6);
  for (const modelo of MODELOS_SITE) {
    await access(new URL("../public/" + modelo.imagePath, import.meta.url));
    assert.ok(modelo.alt && modelo.structure.length);
  }
});

test("a referência permite identificar a base e deixa a personalização e o preço explícitos", () => {
  const mensagem = mensagemModeloSite(
    "kw-03",
    "https://kroma.example/base/?origem=teste#top",
  );
  assert.match(mensagem, /KW-03.*Menu lateral/);
  assert.match(mensagem, /Menu vertical à esquerda/);
  assert.match(mensagem, /personalizar cores, textos e fotos/);
  assert.match(mensagem, /preço serão definidos no plano/);
  assert.match(mensagem, /https:\/\/kroma\.example\/base\/#modelo-kw-03/);
  assert.doesNotMatch(mensagem, /origem=teste/);
});

test("a base escolhida acompanha o orçamento sem alterar pagamento ou manutenção", () => {
  const proposta = criarPropostaCriacao({
    tipoId: "empresarial",
    pagamentoId: "cartao",
    manutencaoId: "acompanhamento",
  });
  const comModelo = anexarModeloProposta(proposta, "kw-01");
  assert.equal(comModelo.estimativa, 998.9);
  assert.equal(comModelo.mensalidade, 149.9);
  assert.equal(comModelo.pagamento, proposta.pagamento);
  assert.match(comModelo.escopo, /Base visual escolhida:.*KW-01/s);
  assert.equal(proposta.modeloId, undefined);
  assert.doesNotMatch(proposta.escopo, /Base visual escolhida/);
});

test("trocar ou remover a seleção a partir da proposta original não deixa a referência anterior", () => {
  const proposta = criarPropostaCriacao({ tipoId: "evento" });
  const primeiro = anexarModeloProposta(proposta, "kw-01");
  const segundo = anexarModeloProposta(proposta, "kw-04");
  assert.match(primeiro.escopo, /KW-01/);
  assert.match(segundo.escopo, /KW-04/);
  assert.doesNotMatch(segundo.escopo, /KW-01/);
  assert.equal(anexarModeloProposta(proposta, ""), proposta);
});

test("referências desconhecidas ou endereços inválidos são recusados", () => {
  assert.throws(() => referenciaModeloSite("inexistente"), RangeError);
  assert.throws(() => linkModeloSite("kw-01", "javascript:teste"), RangeError);
  assert.equal(linkModeloSite("kw-01"), "");
});
