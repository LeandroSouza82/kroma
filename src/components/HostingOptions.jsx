import {
  OPCOES_HOSPEDAGEM,
  obterOpcaoHospedagem,
  CUSTOS_HOSPEDAGEM,
  TITULARIDADE_HOSPEDAGEM,
  ENCERRAMENTO_HOSPEDAGEM,
  RESUMO_HOSPEDAGEM,
  DETALHAMENTO_HOSPEDAGEM,
  DOMINIO_INCLUIDO,
  LIMITES_HOSPEDAGEM,
  RESUMO_BANCO_DADOS,
  DETALHAMENTO_CAMBIO,
  LIMITES_BANCO_DADOS,
  precisaBancoDados,
} from "../data/hostingOptions";

export default function HostingOptions({
  id,
  label = "Domínio e hospedagem (opcional)",
  value,
  onChange,
  tipoId,
  recursoIds = [],
}) {
  const selecionada = obterOpcaoHospedagem(value);
  const descricaoId = id + "-descricao";
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-3 block text-sm font-semibold text-ink"
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-describedby={descricaoId}
        className="w-full rounded-xl border border-line bg-base px-4 py-3 text-sm text-ink"
      >
        <option value="">Definir no atendimento</option>
        {OPCOES_HOSPEDAGEM.map((item) => (
          <option key={item.id} value={item.id}>
            {item.label}
          </option>
        ))}
      </select>
      <p
        id={descricaoId}
        className="mt-3 text-sm leading-relaxed text-muted"
      >
        {selecionada
          ? selecionada.description
          : "Podemos cuidar desses serviços ou publicar nas suas contas. A escolha e os valores são confirmados na proposta."}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-muted">
        {CUSTOS_HOSPEDAGEM}
      </p>
      {value !== "cliente" && (
        <div className="mt-3 rounded-xl border border-accent-light/25 bg-base p-4">
          <p className="text-sm font-semibold text-accent-light">
            {value === "kroma" ? "Gestão selecionada: " : "Gestão opcional: "}
            {RESUMO_HOSPEDAGEM}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-muted">
            {DETALHAMENTO_HOSPEDAGEM}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-muted">
            {DOMINIO_INCLUIDO}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-muted">
            {LIMITES_HOSPEDAGEM}
          </p>
          {precisaBancoDados({ tipoId, recursoIds }) && (
            <>
              <p className="mt-3 text-sm font-semibold text-accent-light">
                Banco de dados: + {RESUMO_BANCO_DADOS}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                {DETALHAMENTO_CAMBIO}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                {LIMITES_BANCO_DADOS}
              </p>
            </>
          )}
        </div>
      )}
      <details className="mt-3 text-xs leading-relaxed text-muted">
        <summary className="cursor-pointer font-semibold text-accent-light">
          Titularidade, acessos e encerramento
        </summary>
        <p className="mt-3">{TITULARIDADE_HOSPEDAGEM}</p>
        <p className="mt-2">{ENCERRAMENTO_HOSPEDAGEM}</p>
      </details>
    </div>
  );
}
