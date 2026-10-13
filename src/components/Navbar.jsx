import { useState } from "react";
const LINKS = [
  { href: "#solucoes", label: "Serviços" },
  { href: "#modelos", label: "Modelos" },
  { href: "#planos", label: "Planos" },
  { href: "#simulador", label: "Simulador" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#duvidas", label: "Dúvidas" },
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header
      className="fixed top-0 z-50 w-full border-b border-white/[0.08] bg-base/85 backdrop-blur-xl"
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
    >
      <nav
        className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-6"
        aria-label="Navegação principal"
      >
        <a
          href="#top"
          onClick={() => setOpen(false)}
          className="flex shrink-0 items-center gap-3"
          aria-label="Kroma Web, início"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
          >
            <rect width="32" height="32" rx="8" fill="#2563EB" />
            <path
              d="M11 8v16M11 16l10-8M13.5 14.5 21 24"
              stroke="#fff"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-[17px] font-semibold tracking-tight text-white">
            Kroma<span className="text-accent-light">Web</span>
          </span>
        </a>
        <ul className="hidden items-center gap-5 lg:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-white/60 hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a
            href="#contato"
            onClick={() => setOpen(false)}
            className="rounded-xl bg-accent px-4 py-2.5 text-xs font-semibold text-white hover:bg-accent-light sm:text-sm"
          >
            Iniciar projeto ↗
          </a>
          <button
            type="button"
            aria-controls="mobile-navigation"
            aria-expanded={open}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-line text-white lg:hidden"
          >
            {open ? "×" : "☰"}
          </button>
        </div>
      </nav>
      {open && (
        <nav
          id="mobile-navigation"
          aria-label="Navegação no celular"
          className="border-t border-line px-6 pb-5 lg:hidden"
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm font-medium text-white/75"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
