import { useState } from "react";
import Navbar from "./components/Navbar";
import HeroCarousel from "./components/HeroCarousel";
import PromotionBanner from "./components/PromotionBanner";
import BentoSolutions from "./components/BentoSolutions";
import SiteModelsGallery from "./components/SiteModelsGallery";
import { anexarModeloProposta } from "./utils/siteModelReference";
import { obterModeloSite } from "./data/siteModels";
import CommercialPlans from "./components/CommercialPlans";
import InteractiveRSVP from "./components/InteractiveRSVP";
import ProjectCalculator from "./components/ProjectCalculator";
import ClientGuide from "./components/ClientGuide";
import LeadFormSection from "./components/LeadFormSection";
import Footer from "./components/Footer";
import TrustSection from "./components/TrustSection";
import KromaGuide from "./components/kroma/KromaGuide";
import { SITE } from "./data/siteInfo";

const propostaInicial = {
  id: 0,
  tipo: "",
  escopo: "",
  estimativa: 0,
  mensagem: "",
  contratacao: "criacao",
  mensalidade: 0,
};

export default function App({ renderedAt = Date.now() }) {
  const [proposta, setProposta] = useState(propostaInicial);
  const [modeloId, setModeloId] = useState("");
  const [hospedagemId, setHospedagemId] = useState("");
  const siteUrl = SITE.url;
  const propostaCompleta = anexarModeloProposta(proposta, modeloId, siteUrl);
  const modelo = modeloId ? obterModeloSite(modeloId) : null;

  const solicitarProposta = (dados) =>
    setProposta((atual) => ({ ...dados, id: atual.id + 1 }));

  return (
    <>
      <Navbar />
      <main>
        <HeroCarousel />
        <PromotionBanner onSolicitar={solicitarProposta} initialNow={renderedAt} />
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
        <TrustSection />
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
      <KromaGuide />
      <Footer initialYear={new Date(renderedAt).getUTCFullYear()} />
    </>
  );
}
