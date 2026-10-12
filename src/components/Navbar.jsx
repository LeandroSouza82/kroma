const LINKS = [
  { href: "#solucoes", label: "Soluções" },
  { href: "#demonstracao", label: "Demonstração" },
  { href: "#simulador", label: "Simulador" },
  { href: "#contato", label: "Contato" },
];

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 h-20 w-full border-b border-white/[0.06] bg-base/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-3" aria-label="Kroma Web">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
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

        <ul className="hidden items-center gap-9 md:flex">
          {LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="text-sm font-medium text-white/60 transition-colors hover:text-white"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contato"
          className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-light"
        >
          Iniciar Projeto
        </a>
      </nav>
    </header>
  );
}
