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
import { MobileApp } from "../mobile/MobileApp";
import "../styles/fonts.css";

function DesktopDashboard() {
  const [activeModule, setActiveModule] = useState("dashboard");

  const renderModule = () => {
    switch (activeModule) {
      case "dashboard": return <DashboardEjecutivo />;
      case "eventos": return <EventosDeportivos />;
      case "patrocinadores": return <Patrocinadores />;
      case "unidades": return <UnidadesDeportivas />;
      case "inteligencia": return <InteligenciaDeportiva />;
      case "encuestas": return <EncuestasCiudadanas />;
      case "impacto": return <ImpactoSocial />;
      case "reportes": return <Reportes />;
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
    </div>
  );
}

export default function App() {
  if (window.location.pathname.startsWith("/mobile")) {
    return <MobileApp />;
  }

  return <DesktopDashboard />;
}
