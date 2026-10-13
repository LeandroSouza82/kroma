const METRICAS = [
  { valor: "Design", rotulo: "Identidade do negócio" },
  { valor: "Mobile", rotulo: "Layout responsivo" },
  { valor: "SEO", rotulo: "Boas práticas" },
  { valor: "Suporte", rotulo: "Acompanhamento opcional" },
];

const BARRAS = [38, 62, 45, 78, 56, 92, 70];

const Chip = ({ children }) => (
  <span className="rounded-full border border-line bg-white/[0.03] px-3 py-1 text-xs text-white/60">
    {children}
  </span>
);

const Card = ({ className = "", eyebrow, title, children, text }) => (
  <article
    className={`group flex flex-col rounded-2xl border border-line bg-surface p-8 transition-colors hover:border-accent-light/40 ${className}`}
  >
    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-light">
      {eyebrow}
    </span>
    <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">{title}</h3>
    <p className="mt-3 text-[15px] leading-relaxed text-white/55">{text}</p>
    {children}
  </article>
);

export default function BentoSolutions() {
  return (
    <section id="solucoes" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-28">
      <div className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-light">
          Soluções
        </span>
        <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Uma boa presença, do primeiro clique ao contato.
        </h2>
      </div>

      <div className="mt-14 grid gap-4 lg:grid-cols-3">
        <Card
          className="lg:col-span-2"
          eyebrow="Empresas"
          title="Sites para empresas e negócios locais"
          text="Seu espaço para apresentar os serviços, mostrar seu trabalho e facilitar o contato de quem procura o que você oferece."
        >
          <div className="mt-auto flex flex-wrap gap-2 pt-8">
            <Chip>Institucional</Chip>
            <Chip>Multi-idioma</Chip>
            <Chip>Blog & SEO</Chip>
            <Chip>Landing Pages</Chip>
          </div>
        </Card>

        <Card
          className="lg:row-span-2"
          eyebrow="Sistemas"
          title="Sistemas, SaaS e Dashboards"
          text="Painéis com dados dinâmicos, autenticação, permissões e automações sob medida para a sua operação."
        >
          <div className="mt-auto flex h-40 items-end gap-2 pt-8" aria-hidden="true">
            {BARRAS.map((altura, i) => (
              <span
                key={i}
                style={{ height: `${altura}%` }}
                className="flex-1 rounded-t-md bg-gradient-to-t from-accent/30 to-accent-light transition-all duration-500 group-hover:from-accent/50"
              />
            ))}
          </div>
        </Card>

        <Card
          eyebrow="E-commerce"
          title="Lojas e catálogos digitais"
          text="Seus produtos organizados em uma vitrine própria, com pedidos e pagamentos definidos conforme o projeto."
        />

        <Card
          eyebrow="Eventos"
          title="Casamentos, Eventos e Congressos"
          text="Informações do evento, galerias e contato com a organização. Recursos de confirmação de presença podem ser incluídos na proposta."
        />

        <Card
          className="lg:col-span-3"
          eyebrow="Infraestrutura"
          title="Cuidado nos detalhes que fazem diferença"
          text="Design alinhado à sua marca, atenção ao uso no celular e uma estrutura clara para apresentar o negócio. Recursos e integrações são planejados para cada escopo."
        >
          <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {METRICAS.map(({ valor, rotulo }) => (
              <div key={rotulo} className="rounded-xl border border-line bg-base p-5">
                <dt className="text-3xl font-bold tracking-tight text-white">{valor}</dt>
                <dd className="mt-1 text-sm text-white/50">{rotulo}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </div>
    </section>
  );
}
