import { useState } from "react";
import {
  LayoutDashboard,
  CalendarDays,
  CircleDollarSign,
  HandCoins,
  MapPin,
  BrainCircuit,
  ClipboardList,
  HeartHandshake,
  FileBarChart2,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Dashboard Ejecutivo", icon: LayoutDashboard },
  { id: "eventos", label: "Eventos Deportivos", icon: CalendarDays },
  { id: "patrocinadores", label: "Patrocinadores", icon: HandCoins },
  { id: "unidades", label: "Unidades Deportivas", icon: MapPin },
  { id: "finanzas", label: "Finanzas Operativas", icon: CircleDollarSign },
  { id: "inteligencia", label: "Inteligencia Deportiva", icon: BrainCircuit },
  { id: "encuestas", label: "Encuestas Ciudadanas", icon: ClipboardList },
  { id: "impacto", label: "Impacto Social", icon: HeartHandshake },
  { id: "reportes", label: "Reportes", icon: FileBarChart2 },
  { id: "administracion", label: "Administración", icon: ShieldCheck },
];

interface SidebarProps {
  activeModule: string;
  onNavigate: (id: string) => void;
}

export function Sidebar({ activeModule, onNavigate }: SidebarProps) {
  return (
    <aside
      className="fixed left-0 top-0 h-screen w-64 flex flex-col z-40 select-none"
      style={{ background: "var(--sidebar)", borderRight: "1px solid var(--sidebar-border)" }}
    >
      {/* Logo */}
      <div className="px-5 py-5 border-b" style={{ borderColor: "var(--sidebar-border)" }}>
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "var(--primary)" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5"/>
              <path d="M12 2C12 2 8 6 8 12C8 18 12 22 12 22" stroke="white" strokeWidth="1.5"/>
              <path d="M12 2C12 2 16 6 16 12C16 18 12 22 12 22" stroke="white" strokeWidth="1.5"/>
              <line x1="2" y1="12" x2="22" y2="12" stroke="white" strokeWidth="1.5"/>
            </svg>
          </div>
          <div>
            <div className="leading-tight font-semibold" style={{ color: "#fff", fontSize: "13px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              COMUDE Guadalajara
            </div>
            <div style={{ color: "rgba(226,232,248,0.55)", fontSize: "10px", letterSpacing: "0.08em" }}>
              360° PLATAFORMA INTEGRAL
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group relative"
              style={{
                background: isActive ? "var(--primary)" : "transparent",
                color: isActive ? "#fff" : "rgba(226,232,248,0.65)",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.background = "var(--sidebar-accent)";
                  (e.currentTarget as HTMLElement).style.color = "#fff";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "rgba(226,232,248,0.65)";
                }
              }}
            >
              <Icon size={16} strokeWidth={isActive ? 2.2 : 1.8} />
              <span style={{ fontSize: "13px", fontWeight: isActive ? 600 : 400 }}>{item.label}</span>
              {isActive && (
                <ChevronRight size={14} className="ml-auto opacity-70" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t" style={{ borderColor: "var(--sidebar-border)" }}>
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0"
            style={{ background: "var(--primary)" }}
          >
            DG
          </div>
          <div>
            <div style={{ color: "#E2E8F8", fontSize: "12px", fontWeight: 500 }}>Dir. General</div>
            <div style={{ color: "rgba(226,232,248,0.45)", fontSize: "11px" }}>COMUDE Guadalajara</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
