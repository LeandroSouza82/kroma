import { useEffect, useId, useRef, useState } from "react";
import { CATEGORIAS_FAQ, filtrarPerguntas } from "../../data/clientGuide";
import { SITE } from "../../data/siteInfo";
import KromaRobot from "./KromaRobot";
import "./kroma.css";

export default function KromaGuide() {
  const [open, setOpen] = useState(false);
  const [greeting, setGreeting] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [answer, setAnswer] = useState(null);
  const launcher = useRef(null);
  const closeButton = useRef(null);
  const id = useId();
  useEffect(() => {
    const timer = setTimeout(() => setGreeting(false), 12000);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (open) closeButton.current?.focus();
  }, [open]);
  const close = () => { setOpen(false); launcher.current?.focus(); };
  const navigate = () => { setOpen(false); setGreeting(false); };
  if (hidden) return <button className="kroma-restore" onClick={() => setHidden(false)} aria-label="Mostrar guia Kroma">K</button>;
  return <aside className={`kroma-guide${open ? " kroma-guide-open" : ""}`} aria-label="Guia Kroma">
    {open && <section className="kroma-panel" role="dialog" aria-modal="false" aria-labelledby={`${id}-title`} onKeyDown={e => { if (e.key === "Escape") close(); }}>
      <header><div><strong id={`${id}-title`}>Kroma</strong><span>Seu guia de serviços</span></div><button ref={closeButton} onClick={close} aria-label="Fechar guia Kroma">×</button></header>
      <div className="kroma-panel-content">
        <p className="kroma-welcome">Olá! Posso ajudar você a encontrar o plano e esclarecer suas dúvidas.</p>
        <nav className="kroma-shortcuts" aria-label="Atalhos do Kroma"><a href="#planos" onClick={navigate}>Ver planos</a><a href="#simulador" onClick={navigate}>Montar meu projeto</a><a href="#duvidas" onClick={navigate}>Todas as dúvidas</a></nav>
        {answer ? <div className="kroma-answer"><button className="kroma-back" onClick={() => setAnswer(null)}>← Outras perguntas</button><h3>{answer.question}</h3>{answer.answer.map(p => <p key={p}>{p}</p>)}<a href="#planos" onClick={navigate}>Conferir planos e informações ↗</a></div> : <>
          <label className="kroma-search">O que você quer saber?<input value={search} onChange={e => setSearch(e.target.value)} placeholder="Preço, prazo, manutenção…" /></label>
          <div className="kroma-categories" aria-label="Assuntos">{["", ...CATEGORIAS_FAQ].map(c => <button key={c} aria-pressed={category === c} onClick={() => setCategory(c)}>{c || "Todos"}</button>)}</div>
          <div className="kroma-questions">{filtrarPerguntas(search, category).map(q => <button key={q.id} onClick={() => setAnswer(q)}>{q.question}<span aria-hidden="true">↗</span></button>)}{!filtrarPerguntas(search, category).length && <p>Não encontrei essa dúvida. Experimente outra palavra ou fale com a equipe.</p>}</div>
        </>}
      </div>
      <footer><a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer">Conversar com a equipe ↗</a><span>Respostas do guia do site · sem IA</span></footer>
    </section>}
    {!open && greeting && <div className="kroma-greeting"><button className="kroma-greeting-close" aria-label="Fechar cumprimento do Kroma" onClick={() => setGreeting(false)}>×</button><button className="kroma-greeting-text" onClick={() => { setOpen(true); setGreeting(false); }}>Olá! Eu sou o <strong>Kroma</strong> 👋<br/>Como posso ajudar você?</button></div>}
    <button ref={launcher} className="kroma-launcher" aria-label={open ? "Recolher guia Kroma" : "Conversar com Kroma"} aria-expanded={open} onClick={() => { setOpen(v => !v); setGreeting(false); }}><KromaRobot/><span>{open ? "Recolher" : "Posso ajudar?"}</span></button>
    {!open && <button className="kroma-hide" aria-label="Ocultar mascote Kroma" onClick={() => setHidden(true)}>×</button>}
  </aside>;
}
