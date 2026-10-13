import { useState } from "react";
import Navbar from "./components/Navbar";
import HeroCarousel from "./components/HeroCarousel";
import PromotionBanner from "./components/PromotionBanner";
import BentoSolutions from "./components/BentoSolutions";
import SiteModelsGallery from "./components/SiteModelsGallery";
import { anexarModeloProposta } from "./utils/siteModelReference";
import { obterModeloSite } from "./data/siteModels";
import { anexarHospedagemProposta } from "./data/hostingOptions";
import CommercialPlans from "./components/CommercialPlans";
import InteractiveRSVP from "./components/InteractiveRSVP";
import ProjectCalculator from "./components/ProjectCalculator";
import ClientGuide from "./components/ClientGuide";
import LeadFormSection from "./components/LeadFormSection";
import Footer from "./components/Footer";

const propostaInicial = {
  id: 0,
  tipo: "",
  escopo: "",
  estimativa: 0,
  mensagem: "",
  contratacao: "criacao",
  mensalidade: 0,
};

export default function App() {
  const [proposta, setProposta] = useState(propostaInicial);
  const [modeloId, setModeloId] = useState("");
  const [hospedagemId, setHospedagemId] = useState("");
  const siteUrl =
    typeof window === "undefined"
      ? ""
      : window.location.origin + import.meta.env.BASE_URL;
  const propostaCompleta = anexarHospedagemProposta(
    anexarModeloProposta(proposta, modeloId, siteUrl),
    hospedagemId,
  );
  const modelo = modeloId ? obterModeloSite(modeloId) : null;

  const solicitarProposta = (dados) =>
    setProposta((atual) => ({ ...dados, id: atual.id + 1 }));

  return (
    <>
      <Navbar />
      <main>
        <HeroCarousel />
        <PromotionBanner onSolicitar={solicitarProposta} />
        <BentoSolutions />
        <SiteModelsGallery
          modeloId={modeloId}
          onEscolher={setModeloId}
          siteUrl={siteUrl}
        />
        <CommercialPlans onSolicitar={solicitarProposta} />
        <InteractiveRSVP />
        <ProjectCalculator
          onSolicitar={solicitarProposta}
          hospedagemId={hospedagemId}
          onHospedagemChange={setHospedagemId}
        />
        <ClientGuide />
        <LeadFormSection
          key={proposta.id}
          proposta={propostaCompleta}
          modelo={modelo}
          onRemoverModelo={() => setModeloId("")}
          hospedagemId={hospedagemId}
          onHospedagemChange={setHospedagemId}
        />
      </main>
      <Footer />
    </>
  );
}
