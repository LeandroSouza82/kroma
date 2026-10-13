import test from "node:test";
import assert from "node:assert/strict";
import {
  calcularEstimativa,
  descreverPagamento,
  MAX_PARCELAS,
  TIPOS,
  calcularParcelamento,
  RECURSOS,
  obterLinkPagamento,
} from "../src/data/projectOptions.js";
import {
  criarPropostaCriacao,
  criarPropostaManutencao,
  montarMensagemContato,
} from "../src/utils/projectProposal.js";
import { detalharOferta } from "../src/data/offerDetails.js";
import { filtrarPerguntas } from "../src/data/clientGuide.js";

test("oferta institucional anuncia 699,90 no Pix e 10 vezes de 99,89 no cartão", () => {
  assert.equal(calcularEstimativa("empresarial"), 699.9);
  assert.equal(
    calcularEstimativa("empresarial", [], "normal", "cartao"),
    998.9,
  );
  assert.equal(calcularParcelamento(998.9).parcela, 99.89);
  assert.match(
    descreverPagamento(998.9, "cartao"),
    /10× de R\$\s?99,89.*total R\$\s?998,90/,
  );
});
test("link de 699,90 é exclusivo do institucional à vista e não cobra outro valor ou plano", () => {
  const institucional = TIPOS.find((item) => item.id === "empresarial");
  assert.equal(
    obterLinkPagamento(institucional, "pix"),
    "https://mpago.li/17uiB8D",
  );
  assert.equal(obterLinkPagamento(institucional, "cartao"), "");
  assert.equal(obterLinkPagamento(institucional, "manutencao"), "");
  assert.equal(obterLinkPagamento({ ...institucional, base: 700 }, "pix"), "");
  assert.equal(
    obterLinkPagamento(
      TIPOS.find((item) => item.id === "evento"),
      "pix",
    ),
    "",
  );
});

test("os dois links maiores cobram o mesmo total à vista ou em dez parcelas sem juros", () => {
  for (const [id, valor, parcela, link] of [
    ["ecommerce", 1489.9, 148.99, "https://mpago.li/1nD3Ykj"],
    ["sistema", 2489.9, 248.99, "https://mpago.li/22AgdjZ"],
  ]) {
    const plano = TIPOS.find((item) => item.id === id);
    assert.equal(plano.base, valor);
    assert.equal(plano.cartao, valor);
    assert.equal(plano.paymentInterestFree, true);
    assert.equal(calcularParcelamento(valor).parcela, parcela);
    assert.equal(obterLinkPagamento(plano, "pix"), link);
    assert.equal(obterLinkPagamento(plano, "cartao"), link);
    assert.equal(
      obterLinkPagamento({ ...plano, cartao: valor + 1 }, "cartao"),
      "",
    );
  }
  const respostas = filtrarPerguntas("sem juros", "Pagamento");
  assert.equal(respostas.length, 1);
  assert.match(
    respostas[0].answer.join(" "),
    /148,99.*1\.489,90.*248,99.*2\.489,90/,
  );
});
test("os adicionais e a prioridade seguem a forma de pagamento escolhida", () => {
  assert.equal(
    calcularEstimativa(
      "empresarial",
      ["admin", "supabase", "pix", "3d"],
      "expresso",
      "pix",
    ),
    3093.35,
  );
  assert.equal(
    calcularEstimativa(
      "empresarial",
      ["admin", "supabase", "pix", "3d"],
      "expresso",
      "cartao",
    ),
    4366.05,
  );
});
test("um adicional duplicado não é cobrado duas vezes", () => {
  assert.equal(calcularEstimativa("empresarial", ["admin", "admin"]), 1189.8);
});
test("manutenção opcional permanece separada do total de criação", () => {
  const proposta = criarPropostaCriacao({
    tipoId: "empresarial",
    pagamentoId: "cartao",
    manutencaoId: "acompanhamento",
  });
  assert.equal(proposta.estimativa, 998.9);
  assert.equal(proposta.mensalidade, 149.9);
  assert.match(proposta.escopo, /Pagamento da criação:.*10×/);
  assert.match(proposta.escopo, /Acompanhamento.*149,90\/mês/);
});
test("criação começa sem mensalidade adicionada automaticamente", () => {
  const proposta = criarPropostaCriacao({ tipoId: "evento" });
  assert.equal(proposta.estimativa, 489.9);
  assert.equal(proposta.mensalidade, 0);
});
test("pedido só de manutenção não informa taxa de criação", () => {
  const proposta = criarPropostaManutencao("acompanhamento");
  assert.equal(proposta.estimativa, 0);
  assert.equal(proposta.mensalidade, 149.9);
  assert.equal(proposta.tipo, "Manutenção de site");
});
test("mensagem de atendimento preserva método, total e manutenção escolhidos", () => {
  const proposta = criarPropostaCriacao({
    tipoId: "empresarial",
    pagamentoId: "cartao",
    manutencaoId: "evolucao",
  });
  const mensagem = montarMensagemContato(
    {
      nome: " Cliente ",
      contato: "teste@example.com",
      tipoProjeto: proposta.tipo,
      mensagem: "Site para minha empresa.",
    },
    proposta,
  );
  assert.match(mensagem, /Nome: Cliente/);
  assert.match(mensagem, /10× de R\$\s?99,89.*total R\$\s?998,90/);
  assert.match(mensagem, /Evolução.*248,90\/mês/);
});
test("configurações desconhecidas não geram um orçamento parcial", () => {
  assert.throws(() => calcularEstimativa("invalido"), RangeError);
  assert.throws(
    () => calcularEstimativa("empresarial", ["invalido"]),
    RangeError,
  );
  assert.throws(
    () => calcularEstimativa("empresarial", [], "normal", "invalido"),
    RangeError,
  );
  assert.throws(() => criarPropostaManutencao("invalido"), RangeError);
  assert.throws(
    () =>
      criarPropostaCriacao({ tipoId: "empresarial", manutencaoId: "invalido" }),
    RangeError,
  );
});

test("a prioridade preserva os centavos do novo preço no cartão", () => {
  assert.equal(
    calcularEstimativa("empresarial", [], "expresso", "cartao"),
    1298.57,
  );
  assert.match(
    descreverPagamento(1298.57, "cartao"),
    /9× de.*129,86.*1× de.*129,83.*1\.298,57/,
  );
});

test("parcelas com arredondamento somam exatamente o total, inclusive com adicionais e prioridade", () => {
  for (const tipo of TIPOS) {
    for (const prazo of ["normal", "expresso"]) {
      for (const recursos of [[], RECURSOS.map((item) => item.id)]) {
        const total = calcularEstimativa(tipo.id, recursos, prazo, "cartao");
        const parcelas = calcularParcelamento(total);
        assert.equal(
          Math.round(parcelas.parcela * 100) * (MAX_PARCELAS - 1) +
            Math.round(parcelas.ultima * 100),
          Math.round(total * 100),
        );
      }
    }
  }
});

test("o atendimento leva os limites da oferta e os custos externos separados", () => {
  for (const tipo of TIPOS) {
    const detalhes = detalharOferta(tipo.id);
    const proposta = criarPropostaCriacao({ tipoId: tipo.id });
    for (const limite of detalhes.limits)
      assert.ok(proposta.escopo.includes(limite));
    assert.match(
      proposta.escopo,
      /Domínio, hospedagem e taxas externas cobrados separadamente/,
    );
    assert.match(proposta.escopo, /Não incluída; sem plano selecionado/);
  }
  const comPainel = criarPropostaCriacao({
    tipoId: "empresarial",
    recursoIds: ["admin"],
  });
  assert.match(
    comPainel.escopo,
    /Adicionais: Painel para editar conteúdo.*um acesso administrativo/,
  );
});

test("a manutenção informa quantidade, limites e ausência de acúmulo", () => {
  const plano = detalharOferta("acompanhamento", "manutencao");
  assert.ok(plano.limits.some((item) => /3 solicitações por mês/.test(item)));
  const proposta = criarPropostaManutencao("acompanhamento");
  assert.match(proposta.escopo, /3 solicitações.*sem acúmulo mensal/);
  assert.throws(() => detalharOferta("inexistente"), RangeError);
  assert.throws(() => detalharOferta("empresarial", "inexistente"), RangeError);
});

test("dúvidas aceitam busca por termos, acentos e assunto sem perder os valores", () => {
  const preco = filtrarPerguntas("INSTITUCIONAL pagar", "Pagamento");
  assert.equal(preco.length, 1);
  assert.match(preco[0].answer.join(" "), /699,90.*99,89.*998,90/);
  const resultados = filtrarPerguntas("manutencao", "Manutenção");
  assert.ok(resultados.length > 0);
  assert.ok(resultados.every((item) => item.category === "Manutenção"));
  assert.equal(filtrarPerguntas("termo-sem-resultados").length, 0);
});
