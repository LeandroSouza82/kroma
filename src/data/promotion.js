// Campanha editável. O fim é exclusivo: 16/11 às 00h em Brasília.
export const PROMOCAO = {
  id: "landing-lancamento-2026-11",
  enabled: true,
  startsAt: "2026-10-13T00:00:00-03:00",
  endsAt: "2026-11-16T00:00:00-03:00",
  timeZone: "America/Sao_Paulo",
  // Cobrança base de R$299. O parcelamento do link tem acréscimo para o cliente.
  paymentUrl: "https://mpago.li/1cuf8J6",
  offer: {
    id: "landing-promocional",
    label: "Landing page promocional",
    base: 299,
    // Total de 10× R$36,07 informado pelo vendedor no checkout deste link.
    cartao: 360.7,
    limits: { pages: 1, sections: 3, images: 5, revisions: 1 },
    description:
      "Uma página para divulgar seu negócio, serviço ou campanha e levar interessados ao seu WhatsApp.",
  },
};

export function promocaoAtiva(agora = Date.now(), campanha = PROMOCAO) {
  const instante = new Date(agora).getTime();
  return (
    campanha.enabled &&
    Number.isFinite(instante) &&
    instante >= Date.parse(campanha.startsAt) &&
    instante < Date.parse(campanha.endsAt)
  );
}

export function validadePromocao() {
  // O último dia válido é o dia anterior ao horário exclusivo de encerramento.
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: PROMOCAO.timeZone,
  }).format(new Date(Date.parse(PROMOCAO.endsAt) - 1));
}
