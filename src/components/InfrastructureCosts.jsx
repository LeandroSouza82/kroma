import { formatarBRL } from "../data/projectOptions";
import {
  HOSPEDAGEM_BASE,
  BANCO_DADOS,
  COTACAO_DOLAR,
  DOMINIO_INCLUIDO,
  DETALHAMENTO_CAMBIO,
  LIMITES_HOSPEDAGEM,
  LIMITES_BANCO_DADOS,
  TITULARIDADE_HOSPEDAGEM,
  ENCERRAMENTO_HOSPEDAGEM,
  calcularMensalidades,
  converterBancoDados,
} from "../data/hostingOptions";

function SourceLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-blue-700 underline underline-offset-4"
    >
      {children} ↗
    </a>
  );
}

export default function InfrastructureCosts({ mensalidade = 0 }) {
  const simples = calcularMensalidades({ mensalidade }, "kroma");
  const sistema = calcularMensalidades(
    { tipoId: BANCO_DADOS.tipoId, mensalidade },
    "kroma",
  );
  const cell = "px-4 py-3 text-left align-top text-xs leading-relaxed sm:text-sm";
  return (
    <div className="infrastructure-costs space-y-5 text-sm text-slate-600">
      <div
        className="overflow-x-auto rounded-xl border border-slate-200"
        tabIndex={0}
        role="region"
        aria-label="Custos de hospedagem, domínio, banco de dados e cotação"
      >
        <table className="w-full min-w-[560px] border-collapse">
          <caption className="sr-only">
            Valores de referência e fontes, consultados em {COTACAO_DOLAR.data}
          </caption>
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th scope="col" className={cell}>Serviço</th>
              <th scope="col" className={cell}>Valor de referência</th>
              <th scope="col" className={cell}>Fonte</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            <tr>
              <th scope="row" className={cell}>Hospedagem · Locaweb Go</th>
              <td className={cell}>
                <strong className="text-slate-950">
                  {formatarBRL(HOSPEDAGEM_BASE.hospedagemMensal, true)}/mês
                </strong>
                <span className="mt-1 block">
                  Equivalente da renovação anual de{" "}
                  {formatarBRL(HOSPEDAGEM_BASE.hospedagemMensal * 12, true)}.
                </span>
              </td>
              <td className={cell}>
                <SourceLink href={HOSPEDAGEM_BASE.hospedagemUrl}>Tabela da Locaweb Go</SourceLink>
              </td>
            </tr>
            <tr>
              <th scope="row" className={cell}>Domínio · .com.br</th>
              <td className={cell}>
                <strong className="text-slate-950">
                  {formatarBRL(HOSPEDAGEM_BASE.dominioAnual, true)}/ano
                </strong>
                <span className="mt-1 block">
                  Equivale a aproximadamente{" "}
                  {formatarBRL(HOSPEDAGEM_BASE.dominioMensal, true)}/mês.
                </span>
              </td>
              <td className={cell}>
                <SourceLink href={HOSPEDAGEM_BASE.dominioUrl}>Domínio no Registro.br</SourceLink>
              </td>
            </tr>
            <tr>
              <th scope="row" className={cell}>Banco de dados · Supabase Pro</th>
              <td className={cell}>
                <strong className="text-slate-950">
                  {formatarBRL(converterBancoDados(), true)}/mês estimados
                </strong>
                <span className="mt-1 block">
                  A partir de US$ {BANCO_DADOS.valorMensalUsd}/mês, quando houver banco de dados.
                </span>
              </td>
              <td className={cell}>
                <SourceLink href={BANCO_DADOS.url}>Preço do Supabase</SourceLink>
              </td>
            </tr>
            <tr>
              <th scope="row" className={cell}>Dólar de referência</th>
              <td className={cell}>
                <strong className="text-slate-950">{formatarBRL(COTACAO_DOLAR.valor, true)}</strong>
                <span className="mt-1 block">Cotação de {COTACAO_DOLAR.data}.</span>
              </td>
              <td className={cell}>
                <SourceLink href={COTACAO_DOLAR.url}>Fonte da cotação usada</SourceLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <dl className="grid gap-3 rounded-xl bg-blue-50 p-4 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-medium text-blue-800">
            {mensalidade ? "Manutenção + hospedagem + domínio" : "Hospedagem + domínio"}
          </dt>
          <dd className="mt-1 text-lg font-semibold text-slate-950">
            {formatarBRL(simples.mensalidadeTotal, true)}/mês estimados
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-blue-800">
            {mensalidade ? "Os mesmos serviços + banco de dados" : "Hospedagem + domínio + banco de dados"}
          </dt>
          <dd className="mt-1 text-lg font-semibold text-slate-950">
            {formatarBRL(sistema.mensalidadeTotal, true)}/mês estimados
          </dd>
        </div>
      </dl>
      <div className="space-y-3 text-xs leading-relaxed sm:text-sm">
        <p>{DOMINIO_INCLUIDO}</p>
        <p>{DETALHAMENTO_CAMBIO}</p>
        <details className="rounded-xl border border-slate-200 p-4">
          <summary className="cursor-pointer font-semibold text-blue-700">
            Limites, titularidade e condições de contratação
          </summary>
          <div className="mt-3 space-y-3">
            <p>{LIMITES_HOSPEDAGEM}</p>
            <p>{LIMITES_BANCO_DADOS}</p>
            <p>{TITULARIDADE_HOSPEDAGEM}</p>
            <p>{ENCERRAMENTO_HOSPEDAGEM}</p>
            <p>Custos de infraestrutura são opcionais e separados da criação. A manutenção de conteúdo só entra no total quando selecionada.</p>
          </div>
        </details>
      </div>
    </div>
  );
}
