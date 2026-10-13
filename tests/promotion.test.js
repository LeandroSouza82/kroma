import test from "node:test";
import assert from "node:assert/strict";
import {
  PROMOCAO,
  promocaoAtiva,
  validadePromocao,
} from "../src/data/promotion.js";
import { calcularEstimativa } from "../src/data/projectOptions.js";
import {
  criarPropostaCriacao,
  montarMensagemContato,
} from "../src/utils/projectProposal.js";

const durante = Date.parse("2026-10-20T12:00:00-03:00");

test("campanha respeita início e último minuto do prazo no horário de Brasília", () => {
  assert.equal(promocaoAtiva("2026-10-13T02:59:59.999Z"), false);
  assert.equal(promocaoAtiva("2026-10-13T03:00:00.000Z"), true);
  assert.equal(promocaoAtiva("2026-11-16T02:59:59.999Z"), true);
  assert.equal(promocaoAtiva("2026-11-16T03:00:00.000Z"), false);
  assert.equal(validadePromocao(), "15 de novembro de 2026");
});

test("campanha desativada e datas inválidas não anunciam oferta vigente", () => {
  assert.equal(promocaoAtiva(durante, { ...PROMOCAO, enabled: false }), false);
  assert.equal(promocaoAtiva("data inválida"), false);
});

test("landing page custa 299 à vista ou dez parcelas de 36,07 com acréscimo, sem manutenção automática", () => {
  const proposta = criarPropostaCriacao({
    tipoId: PROMOCAO.offer.id,
    pagamentoId: "cartao",
    agora: durante,
  });
  assert.equal(proposta.estimativa, 360.7);
  assert.equal(proposta.mensalidade, 0);
  assert.equal(proposta.campanhaId, PROMOCAO.id);
  assert.match(proposta.pagamento, /10× de R\$\s?36,07.*total R\$\s?360,70/);
  assert.equal(
    calcularEstimativa(PROMOCAO.offer.id, [], "normal", "pix", durante),
    299,
  );
});

test("nova proposta promocional é recusada fora do período sem alterar os planos regulares", () => {
  for (const agora of [
    "2026-10-12T12:00:00-03:00",
    "2026-11-16T00:00:00-03:00",
  ]) {
    assert.throws(
      () => criarPropostaCriacao({ tipoId: PROMOCAO.offer.id, agora }),
      /promoção não está vigente/,
    );
    assert.equal(
      calcularEstimativa("empresarial", [], "normal", "pix", agora),
      699.9,
    );
  }
});

test("o contato preserva o escopo menor, pagamento, prazo e custos separados da promoção", () => {
  const proposta = criarPropostaCriacao({
    tipoId: PROMOCAO.offer.id,
    pagamentoId: "cartao",
    agora: durante,
  });
  const mensagem = montarMensagemContato(
    {
      nome: "Cliente",
      contato: "teste@example.com",
      tipoProjeto: proposta.tipo,
      mensagem: "Quero divulgar meu serviço.",
    },
    proposta,
  );
  assert.match(mensagem, /Landing page promocional/);
  assert.match(mensagem, /Até 3 seções.*Até 5 imagens.*1 rodada/);
  assert.match(mensagem, /36,07.*360,70/);
  assert.match(mensagem, /Não incluída; sem plano selecionado/);
  assert.match(mensagem, /15 de novembro de 2026.*horário de Brasília/);
  assert.match(
    mensagem,
    /Domínio, hospedagem e taxas externas cobrados separadamente/,
  );
});
