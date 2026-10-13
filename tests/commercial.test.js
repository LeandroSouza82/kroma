import test from "node:test";
import assert from "node:assert/strict";
import {
  calcularEstimativa,
  descreverPagamento,
  MAX_PARCELAS,
  TIPOS,
} from "../src/data/projectOptions.js";
import {
  criarPropostaCriacao,
  criarPropostaManutencao,
  montarMensagemContato,
} from "../src/utils/projectProposal.js";
import { detalharOferta } from "../src/data/offerDetails.js";
import { filtrarPerguntas } from "../src/data/clientGuide.js";

test("oferta institucional anuncia 700 no Pix e 10 vezes de 99,90 no cartão", () => {
  assert.equal(calcularEstimativa("empresarial"), 700);
  assert.equal(calcularEstimativa("empresarial", [], "normal", "cartao"), 999);
  assert.equal(999 / MAX_PARCELAS, 99.9);
  assert.match(
    descreverPagamento(999, "cartao"),
    /10× de R\$\s?99,90.*total R\$\s?999/,
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
    3094,
  );
  assert.equal(
    calcularEstimativa(
      "empresarial",
      ["admin", "supabase", "pix", "3d"],
      "expresso",
      "cartao",
    ),
    4366.7,
  );
});
test("um adicional duplicado não é cobrado duas vezes", () => {
  assert.equal(calcularEstimativa("empresarial", ["admin", "admin"]), 1190);
});
test("manutenção opcional permanece separada do total de criação", () => {
  const proposta = criarPropostaCriacao({
    tipoId: "empresarial",
    pagamentoId: "cartao",
    manutencaoId: "acompanhamento",
  });
  assert.equal(proposta.estimativa, 999);
  assert.equal(proposta.mensalidade, 150);
  assert.match(proposta.escopo, /Pagamento da criação:.*10×/);
  assert.match(proposta.escopo, /Acompanhamento.*150\/mês/);
});
test("criação começa sem mensalidade adicionada automaticamente", () => {
  const proposta = criarPropostaCriacao({ tipoId: "evento" });
  assert.equal(proposta.estimativa, 490);
  assert.equal(proposta.mensalidade, 0);
});
test("pedido só de manutenção não informa taxa de criação", () => {
  const proposta = criarPropostaManutencao("acompanhamento");
  assert.equal(proposta.estimativa, 0);
  assert.equal(proposta.mensalidade, 150);
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
  assert.match(mensagem, /10× de R\$\s?99,90.*total R\$\s?999/);
  assert.match(mensagem, /Evolução.*249\/mês/);
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
    1298.7,
  );
  assert.match(descreverPagamento(1298.7, "cartao"), /129,87.*1\.298,70/);
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
  assert.match(preco[0].answer.join(" "), /700.*99,90.*999/);
  const resultados = filtrarPerguntas("manutencao", "Manutenção");
  assert.ok(resultados.length > 0);
  assert.ok(resultados.every((item) => item.category === "Manutenção"));
  assert.equal(filtrarPerguntas("termo-sem-resultados").length, 0);
});
