import test from "node:test";
import assert from "node:assert/strict";
import {
  anexarHospedagemProposta,
  obterOpcaoHospedagem,
  calcularMensalidades,
} from "../src/data/hostingOptions.js";
import {
  criarPropostaCriacao,
  criarPropostaManutencao,
  montarMensagemContato,
} from "../src/utils/projectProposal.js";
import { filtrarPerguntas } from "../src/data/clientGuide.js";
import { PROMOCAO } from "../src/data/promotion.js";
import { TIPOS } from "../src/data/projectOptions.js";
import { MANUTENCOES } from "../src/data/maintenancePlans.js";

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
  assert.throws(
    () => anexarHospedagemProposta(base, "desconhecida"),
    RangeError,
  );
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

test("a infraestrutura soma hospedagem e banco sem alterar criação, parcelas ou manutenção", () => {
  for (const tipo of TIPOS) {
    for (const pagamentoId of ["pix", "cartao"]) {
      for (const manutencaoId of ["", ...MANUTENCOES.map((item) => item.id)]) {
        const base = criarPropostaCriacao({
          tipoId: tipo.id,
          pagamentoId,
          manutencaoId,
        });
        const original = structuredClone(base);
        const proposta = anexarHospedagemProposta(base, "kroma");
        assert.equal(proposta.hospedagemMensalidade, 39.9);
        assert.equal(
          proposta.bancoDadosMensalidade,
          tipo.id === "sistema" ? 119 : 0,
        );
        assert.equal(
          proposta.mensalidadeTotal,
          Math.round(
            (base.mensalidade + 39.9 + (tipo.id === "sistema" ? 119 : 0)) * 100,
          ) / 100,
        );
        assert.equal(proposta.estimativa, original.estimativa);
        assert.equal(proposta.pagamento, original.pagamento);
        assert.equal(proposta.mensalidade, original.mensalidade);
        assert.deepEqual(base, original);
      }
    }
  }
  assert.equal(
    calcularMensalidades({ tipoId: "sistema" }, "kroma").mensalidadeTotal,
    158.9,
  );
  for (const [mensalidade, simples, sistema] of [
    [98.9, 138.8, 257.8],
    [149.9, 189.8, 308.8],
    [248.9, 288.8, 407.8],
  ]) {
    assert.equal(
      calcularMensalidades({ tipoId: "empresarial", mensalidade }, "kroma")
        .mensalidadeTotal,
      simples,
    );
    assert.equal(
      calcularMensalidades({ tipoId: "sistema", mensalidade }, "kroma")
        .mensalidadeTotal,
      sistema,
    );
  }
});

test("um adicional de dados usa um banco por projeto e contas próprias não cobram pacotes da Kroma", () => {
  const base = criarPropostaCriacao({
    tipoId: "empresarial",
    recursoIds: ["supabase"],
    manutencaoId: "acompanhamento",
  });
  const proposta = anexarHospedagemProposta(base, "kroma");
  assert.equal(proposta.bancoDadosMensalidade, 119);
  assert.equal(proposta.mensalidadeTotal, 308.8);
  assert.equal(proposta.estimativa, 1049.8);
  assert.equal(
    calcularMensalidades(
      { tipoId: "sistema", recursoIds: ["supabase"] },
      "kroma",
    ).bancoDadosMensalidade,
    119,
  );
  const propria = anexarHospedagemProposta(base, "cliente");
  assert.equal(propria.hospedagemMensalidade, 0);
  assert.equal(propria.bancoDadosMensalidade, 0);
  assert.equal(propria.mensalidadeTotal, 149.9);
  assert.doesNotMatch(
    propria.escopo,
    /Total mensal dos serviços selecionados|banco de dados gerenciado com Supabase/,
  );
  assert.equal(anexarHospedagemProposta(base, ""), base);
});

test("o atendimento informa domínio incluído e banco separado, inclusive na landing page", () => {
  for (const tipoId of ["empresarial", "sistema", PROMOCAO.offer.id]) {
    const base = criarPropostaCriacao({
      tipoId,
      agora: Date.parse("2026-10-20T12:00:00-03:00"),
    });
    const proposta = anexarHospedagemProposta(base, "kroma");
    assert.match(proposta.escopo, /39,90\/mês/);
    assert.match(proposta.escopo, /40,00\/ano/);
    assert.match(proposta.escopo, /Não há uma segunda cobrança anual/);
    assert.equal(
      proposta.mensalidadeTotal,
      tipoId === "sistema" ? 158.9 : 39.9,
    );
    if (tipoId === "sistema")
      assert.match(proposta.escopo, /119,00\/mês.*158,90\/mês/);
    if (tipoId === PROMOCAO.offer.id) assert.equal(proposta.estimativa, 299);
  }
  const resposta = filtrarPerguntas("quanto pago mês publicado").find(
    (item) => item.id === "custos-mensais-publicacao",
  );
  assert.ok(resposta);
  assert.match(
    resposta.answer.join(" "),
    /158,90\/mês.*138,80\/mês.*189,80\/mês.*288,80\/mês.*257,80\/mês.*308,80\/mês.*407,80\/mês/,
  );
});
