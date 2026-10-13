import test from "node:test";
import assert from "node:assert/strict";
import {
  anexarHospedagemProposta,
  obterOpcaoHospedagem,
} from "../src/data/hostingOptions.js";
import {
  criarPropostaCriacao,
  criarPropostaManutencao,
  montarMensagemContato,
} from "../src/utils/projectProposal.js";
import { filtrarPerguntas } from "../src/data/clientGuide.js";
import { PROMOCAO } from "../src/data/promotion.js";

test("a gestão chega ao atendimento sem somar preço ou manutenção automaticamente", () => {
  for (const base of [
    criarPropostaCriacao({ tipoId: "empresarial" }),
    criarPropostaCriacao({
      tipoId: "sistema",
      pagamentoId: "cartao",
      manutencaoId: "acompanhamento",
    }),
    criarPropostaCriacao({
      tipoId: PROMOCAO.offer.id,
      agora: Date.parse("2026-10-20T12:00:00-03:00"),
    }),
    criarPropostaManutencao("essencial"),
    { escopo: "", estimativa: 0, mensalidade: 0 },
  ]) {
    const original = structuredClone(base);
    const proposta = anexarHospedagemProposta(base, "kroma");
    assert.deepEqual(base, original);
    assert.equal(proposta.estimativa, base.estimativa);
    assert.equal(proposta.mensalidade, base.mensalidade);
    assert.equal(proposta.pagamento, base.pagamento);
    assert.equal(proposta.hospedagemId, "kroma");
    const mensagem = montarMensagemContato(
      {
        nome: "Cliente de teste",
        contato: "teste@example.com",
        tipoProjeto: base.tipo || "Site institucional",
        mensagem: "Meu projeto.",
      },
      proposta,
    );
    assert.match(mensagem, /Gestão pela Kroma Web/);
    assert.match(mensagem, /não estão incluídos automaticamente/);
    assert.match(mensagem, /domínio fica registrado em nome do cliente/);
    assert.match(mensagem, /acessos e a transferência/);
  }
});

test("trocar ou remover a gestão não deixa a opção anterior na proposta original", () => {
  const base = criarPropostaCriacao({ tipoId: "evento" });
  const propria = anexarHospedagemProposta(base, "cliente");
  assert.match(propria.escopo, /Contas do cliente/);
  assert.doesNotMatch(propria.escopo, /Gestão pela Kroma Web/);
  assert.equal(anexarHospedagemProposta(base, ""), base);
  assert.throws(() => anexarHospedagemProposta(base, "desconhecida"), RangeError);
  assert.throws(() => obterOpcaoHospedagem("desconhecida"), RangeError);
});

test("o guia explica a gestão, os custos separados, a titularidade e a saída", () => {
  const resultados = filtrarPerguntas("Kroma cuidar", "Domínio e hospedagem");
  const resposta = resultados.find((item) => item.id === "gestao-hospedagem");
  assert.ok(resposta);
  const texto = resposta.answer.join(" ");
  assert.match(texto, /com ou sem manutenção de conteúdo/);
  assert.match(texto, /orçamento próprio/);
  assert.match(texto, /em nome do cliente/);
  assert.match(texto, /transferência do site/);
  assert.match(texto, /não confirma uma contratação nem gera cobrança/);
});
