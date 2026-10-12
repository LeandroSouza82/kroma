export const TIPOS = [
  { id: "empresarial", label: "Empresarial / Institucional", base: 2500 },
  { id: "sistema", label: "Sistema / Dashboard", base: 6500 },
  { id: "evento", label: "Evento / Convite RSVP", base: 1800 },
  { id: "ecommerce", label: "E-commerce", base: 4800 },
];

export const RECURSOS = [
  { id: "admin", label: "Painel Administrativo", valor: 1500 },
  { id: "supabase", label: "Banco de Dados Supabase", valor: 1200 },
  { id: "pix", label: "Integração Pix/Pagamento", valor: 1000 },
  { id: "3d", label: "Animações 3D/Interativas", valor: 1800 },
];

export const PRAZOS = [
  { id: "normal", label: "Normal (15-20 dias)", fator: 1 },
  { id: "expresso", label: "Expresso (7 dias)", fator: 1.3 },
];

export const calcularEstimativa = (tipoId, recursoIds, prazoId) => {
  const tipo = TIPOS.find((t) => t.id === tipoId);
  const prazo = PRAZOS.find((p) => p.id === prazoId);
  const extras = RECURSOS.filter((r) => recursoIds.includes(r.id)).reduce(
    (soma, r) => soma + r.valor,
    0,
  );
  return Math.round((tipo.base + extras) * prazo.fator);
};

export const formatarBRL = (valor) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
