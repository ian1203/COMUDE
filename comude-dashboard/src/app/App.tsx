import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { DashboardEjecutivo } from "./components/DashboardEjecutivo";
import { EventosDeportivos } from "./components/EventosDeportivos";
import { Patrocinadores } from "./components/Patrocinadores";
import { UnidadesDeportivas } from "./components/UnidadesDeportivas";
import { InteligenciaDeportiva } from "./components/InteligenciaDeportiva";
import { EncuestasCiudadanas } from "./components/EncuestasCiudadanas";
import { ImpactoSocial } from "./components/ImpactoSocial";
import { Reportes } from "./components/Reportes";
import { Administracion } from "./components/Configuracion";
import { FinanzasOperativas, type FinanzasView } from "./components/FinanzasOperativas";
import { AsistenteIA, AsistenteIAPanel } from "./components/AsistenteIA";
import { Bot } from "lucide-react";
import "../styles/fonts.css";

const financeViews: Record<string, FinanzasView> = {
  finanzas: "resumen",
  "finanzas-resumen": "resumen",
  "finanzas-presupuesto": "presupuesto",
  "finanzas-costeo": "costeo",
  "finanzas-ingresos": "ingresos",
  "finanzas-patrocinios": "patrocinios",
  "finanzas-conciliacion": "conciliacion",
  "finanzas-autorizaciones": "autorizaciones",
};

export default function App() {
  const [activeModule, setActiveModule] = useState("dashboard");
  const [assistantOpen, setAssistantOpen] = useState(false);

  const renderModule = () => {
    if (activeModule in financeViews) {
      return <FinanzasOperativas view={financeViews[activeModule]} />;
    }

    switch (activeModule) {
      case "dashboard": return <DashboardEjecutivo onNavigate={setActiveModule} />;
      case "eventos": return <EventosDeportivos />;
      case "patrocinadores": return <Patrocinadores />;
      case "unidades": return <UnidadesDeportivas />;
      case "inteligencia": return <InteligenciaDeportiva />;
      case "encuestas": return <EncuestasCiudadanas />;
      case "impacto": return <ImpactoSocial />;
      case "reportes": return <Reportes />;
      case "asistente": return <AsistenteIA />;
      case "administracion":
      case "configuracion": return <Administracion />;
      default: return <DashboardEjecutivo />;
    }
  };

  return (
    <div
      // MARKER-MAKE-KIT-INVOKED MARKER-MAKE-KIT-DISCOVERY-READ
      className="size-full flex"
      style={{
        background: "var(--background)",
        fontFamily: "'Inter', 'Plus Jakarta Sans', system-ui, sans-serif",
        minHeight: "100vh",
      }}
    >
      <Sidebar activeModule={activeModule} onNavigate={setActiveModule} />

      <div className="flex-1 flex flex-col" style={{ marginLeft: "256px" }}>
        <TopBar activeModule={activeModule} onNavigate={setActiveModule} />

        <main
          className="flex-1 overflow-y-auto"
          style={{ marginTop: "64px", padding: "24px 28px", scrollbarWidth: "none" }}
        >
          <style>{`main::-webkit-scrollbar { display: none; }`}</style>
          {renderModule()}
          <div style={{ height: "24px" }} />
        </main>
      </div>
      <button
        onClick={() => setAssistantOpen(true)}
        className="fixed right-6 bottom-6 z-40 px-4 py-3 rounded-2xl text-white shadow-xl flex items-center gap-2 transition-all hover:-translate-y-0.5 active:scale-95"
        style={{ background: "var(--primary)", fontSize: "12px", fontWeight: 800 }}
      >
        <Bot size={16} />
        Asistente IA
      </button>
      <AsistenteIAPanel open={assistantOpen} onClose={() => setAssistantOpen(false)} />
    </div>
  );
}
