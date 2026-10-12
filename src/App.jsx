import { useState } from "react";
import Navbar from "./components/Navbar";
import HeroCarousel from "./components/HeroCarousel";
import BentoSolutions from "./components/BentoSolutions";
import InteractiveRSVP from "./components/InteractiveRSVP";
import ProjectCalculator from "./components/ProjectCalculator";
import LeadFormSection from "./components/LeadFormSection";
import Footer from "./components/Footer";

const propostaInicial = { id: 0, tipo: "", escopo: "", estimativa: 0, mensagem: "" };

export default function App() {
  const [proposta, setProposta] = useState(propostaInicial);

  const solicitarProposta = (dados) => setProposta((atual) => ({ ...dados, id: atual.id + 1 }));

  return (
    <>
      <Navbar />
      <main>
        <HeroCarousel />
        <BentoSolutions />
        <InteractiveRSVP />
        <ProjectCalculator onSolicitar={solicitarProposta} />
        <LeadFormSection key={proposta.id} proposta={proposta} />
      </main>
      <Footer />
    </>
  );
}
