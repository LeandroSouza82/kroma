import { useEffect, useState } from "react";
import { SITE } from "../data/siteInfo.js";

const LINKS = [
  { href: "#solucoes", label: "Soluções" },
  { href: "#modelos", label: "Modelos de estrutura" },
  { href: "#planos", label: "Preços e manutenção" },
  { href: "#demonstracao", label: "Demonstração" },
  { href: "#simulador", label: "Simulador" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#duvidas", label: "Dúvidas" },
  { href: "#contato", label: "Contato" },
  { href: `mailto:${SITE.email}`, label: SITE.email },
  { href: "/sites-institucionais/", label: "Sites institucionais" },
  { href: "/landing-pages/", label: "Criação de landing pages" },
  { href: "/sobre/", label: "Sobre a Kroma Web" },
  { href: "/privacidade/", label: "Privacidade" },
  { href: "/condicoes/", label: "Condições de contratação" },
];

export default function Footer({ initialYear = new Date().getFullYear() }) {
  const [year, setYear] = useState(initialYear);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return (
    <footer className="border-t border-line bg-base">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-lg font-semibold tracking-tight text-ink">
            Kroma<span className="text-accent-light">Web</span>
          </p>
          <p className="mt-3 text-xs text-subtle">Conexão HTTPS na versão publicada</p>
          <p className="mt-2 flex items-center gap-2 text-sm text-subtle">
            <span className="text-emerald-400">●</span>
            Operação ativa • Disponível para novos projetos
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-8 gap-y-3">
          {LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="text-sm text-subtle transition-colors hover:text-ink"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-sm text-subtle">
          © {year} Kroma Web. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
