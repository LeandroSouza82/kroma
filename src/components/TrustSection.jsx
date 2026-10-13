import { SITE } from "../data/siteInfo";

const ITENS = [
  {
    title: "Conexão HTTPS",
    text: "A versão publicada usa uma conexão criptografada entre seu navegador e o site. Você pode conferir o certificado nas informações de segurança do navegador.",
    href: "/sobre/",
    label: "Conheça a Kroma Web",
  },
  {
    title: "Pagamento no Mercado Pago",
    text: "O checkout abre no ambiente do Mercado Pago. Você escolhe a forma de pagamento e confere o total e as parcelas antes de confirmar.",
    href: "/condicoes/",
    label: "Veja as condições de contratação",
  },
  {
    title: "Privacidade e contato",
    text: "Seus dados de contato são usados para atender ao seu pedido. Saiba quais informações são tratadas e como pedir esclarecimentos, correção ou exclusão.",
    href: "/privacidade/",
    label: "Leia a política de privacidade",
  },
];

export default function TrustSection() {
  return (
    <section id="confianca" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-20">
      <p className="section-kicker text-accent-light">Informação e confiança</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        Clareza antes de começar.
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/65">
        Conheça a Kroma Web, entenda como funciona a contratação e fale diretamente
        pelo WhatsApp de atendimento.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {ITENS.map((item) => (
          <article key={item.title} className="flex flex-col rounded-2xl border border-line bg-surface p-6">
            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            <p className="mb-6 mt-3 text-sm leading-relaxed text-white/65">{item.text}</p>
            <a href={item.href} className="mt-auto text-sm font-semibold text-accent-light underline underline-offset-4">
              {item.label} ↗
            </a>
          </article>
        ))}
      </div>
      <a href={"https://wa.me/" + SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block text-sm font-medium text-white/75 underline underline-offset-4">
        Atendimento da Kroma Web pelo WhatsApp ↗
      </a>
    </section>
  );
}
