import test from "node:test";
import assert from "node:assert/strict";
import {
  calcularEstimativa,
  descreverPagamento,
  MAX_PARCELAS,
} from "../src/data/projectOptions.js";
import {
  criarPropostaCriacao,
  criarPropostaManutencao,
  montarMensagemContato,
} from "../src/utils/projectProposal.js";

test("oferta institucional anuncia 700 no Pix e 10 vezes de 100 no cartão", () => {
  assert.equal(calcularEstimativa("empresarial"), 700);
  assert.equal(calcularEstimativa("empresarial", [], "normal", "cartao"), 1000);
  assert.equal(1000 / MAX_PARCELAS, 100);
  assert.match(
    descreverPagamento(1000, "cartao"),
    /10× de R\$\s?100.*total R\$\s?1\.000/,
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
    4368,
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
  assert.equal(proposta.estimativa, 1000);
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
  assert.match(mensagem, /10× de R\$\s?100.*total R\$\s?1\.000/);
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
