import { useState } from "react";
import { DollarSign, RefreshCw, Calendar, BarChart2 } from "lucide-react";

type Stage = "prospectos" | "propuesta" | "negociacion" | "activo";

interface Sponsor {
  id: number;
  nombre: string;
  sector: string;
  monto: number;
  eventos: number;
  renovacion: string;
  nivel: "Platinum" | "Gold" | "Silver" | "Bronze";
  stage: Stage;
  inicial: string;
  color: string;
}

const sponsors: Sponsor[] = [
  {
    id: 1, nombre: "Adidas", sector: "Deportes", monto: 980000, eventos: 12,
    renovacion: "Dic 2025", nivel: "Platinum", stage: "activo", inicial: "A", color: "#0D1B3E",
  },
  {
    id: 2, nombre: "Coca-Cola", sector: "Bebidas", monto: 840000, eventos: 10,
    renovacion: "Mar 2026", nivel: "Platinum", stage: "activo", inicial: "C", color: "#DC2626",
  },
  {
    id: 3, nombre: "Charly", sector: "Deportes", monto: 620000, eventos: 8,
    renovacion: "Sep 2025", nivel: "Gold", stage: "negociacion", inicial: "C", color: "#1B4FD8",
  },
  {
    id: 4, nombre: "Red Cola", sector: "Bebidas", monto: 380000, eventos: 6,
    renovacion: "Jun 2025", nivel: "Gold", stage: "activo", inicial: "R", color: "#DC2626",
  },
  {
    id: 5, nombre: "Electrolit", sector: "Hidratación", monto: 290000, eventos: 5,
    renovacion: "Oct 2025", nivel: "Silver", stage: "propuesta", inicial: "E", color: "#06B6D4",
  },
  {
    id: 6, nombre: "Totalplay", sector: "Telecomunicaciones", monto: 210000, eventos: 4,
    renovacion: "Ago 2025", nivel: "Silver", stage: "prospectos", inicial: "T", color: "#8B5CF6",
  },
];

const nivelColors: Record<string, { bg: string; color: string }> = {
  Platinum: { bg: "#E8EBF4", color: "#0D1B3E" },
  Gold: { bg: "#FFFBEB", color: "#B45309" },
  Silver: { bg: "#F1F5F9", color: "#475569" },
  Bronze: { bg: "#FFF7ED", color: "#9A3412" },
};

const stages: { id: Stage; label: string; color: string }[] = [
  { id: "prospectos", label: "Prospectos", color: "#6B7A99" },
  { id: "propuesta", label: "Propuesta", color: "#F59E0B" },
  { id: "negociacion", label: "Negociación", color: "#06B6D4" },
  { id: "activo", label: "Activo", color: "#10B981" },
];

export function Patrocinadores() {
  const [view, setView] = useState<"cards" | "pipeline">("cards");

  const totalMonto = sponsors.reduce((a, s) => a + s.monto, 0);
  const activos = sponsors.filter((s) => s.stage === "activo").length;
  const porRenovar = sponsors.filter((s) => s.renovacion.includes("2025")).length;

  return (
    <div className="space-y-5">
      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Patrocinadores Activos", value: activos.toString(), icon: BarChart2, color: "#1B4FD8", bg: "#EEF2FF" },
          { label: "Monto Captado Anual", value: `$${(totalMonto / 1000000).toFixed(1)}M`, icon: DollarSign, color: "#10B981", bg: "#ECFDF5" },
          { label: "Por Renovar", value: porRenovar.toString(), icon: RefreshCw, color: "#F59E0B", bg: "#FFFBEB" },
          { label: "Eventos Patrocinados", value: "38", icon: Calendar, color: "#8B5CF6", bg: "#F5F3FF" },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="rounded-2xl p-5 border" style={{ background: "#fff", borderColor: "var(--border)" }}>
            <div className="flex items-center justify-between mb-3">
              <span style={{ fontSize: "11px", fontWeight: 500, color: "var(--muted-foreground)", letterSpacing: "0.04em" }}>
                {label.toUpperCase()}
              </span>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: bg }}>
                <Icon size={16} color={color} />
              </div>
            </div>
            <p style={{ fontSize: "26px", fontWeight: 700, color: "var(--foreground)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* View toggle */}
      <div className="flex items-center gap-2">
        {["cards", "pipeline"].map((v) => (
          <button
            key={v}
            onClick={() => setView(v as "cards" | "pipeline")}
            className="px-4 py-2 rounded-xl transition-all"
            style={{
              fontSize: "13px",
              fontWeight: 500,
              background: view === v ? "var(--primary)" : "#fff",
              color: view === v ? "#fff" : "var(--muted-foreground)",
              border: "1px solid",
              borderColor: view === v ? "var(--primary)" : "var(--border)",
            }}
          >
            {v === "cards" ? "Vista Tarjetas" : "Pipeline CRM"}
          </button>
        ))}
      </div>

      {view === "cards" ? (
        <div className="grid grid-cols-3 gap-4">
          {sponsors.map((s) => (
            <div
              key={s.id}
              className="rounded-2xl p-5 border hover:shadow-md transition-shadow cursor-pointer"
              style={{ background: "#fff", borderColor: "var(--border)" }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold"
                    style={{ background: s.color, fontSize: "16px" }}
                  >
                    {s.inicial}
                  </div>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--foreground)" }}>{s.nombre}</div>
                    <div style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>{s.sector}</div>
                  </div>
                </div>
                <span
                  className="px-2.5 py-1 rounded-full"
                  style={{
                    fontSize: "10px",
                    fontWeight: 600,
                    ...nivelColors[s.nivel],
                  }}
                >
                  {s.nivel}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <div style={{ fontSize: "10px", color: "var(--muted-foreground)" }}>APORTACIÓN</div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--foreground)" }}>
                    ${(s.monto / 1000).toFixed(0)}K
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "10px", color: "var(--muted-foreground)" }}>EVENTOS</div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--foreground)" }}>{s.eventos}</div>
                </div>
                <div>
                  <div style={{ fontSize: "10px", color: "var(--muted-foreground)" }}>RENOVACIÓN</div>
                  <div style={{ fontSize: "12px", fontWeight: 600, color: "#F59E0B" }}>{s.renovacion}</div>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: stages.find((st) => st.id === s.stage)?.color }}
                />
                <span style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>
                  {stages.find((st) => st.id === s.stage)?.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          {stages.map((st) => {
            const stSponsors = sponsors.filter((s) => s.stage === st.id);
            return (
              <div key={st.id} className="rounded-2xl p-4" style={{ background: "#fff", border: "1px solid var(--border)" }}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: st.color }} />
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--foreground)" }}>{st.label}</span>
                  <span
                    className="ml-auto w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: st.color + "20", color: st.color, fontSize: "11px", fontWeight: 700 }}
                  >
                    {stSponsors.length}
                  </span>
                </div>
                <div className="space-y-3">
                  {stSponsors.map((s) => (
                    <div
                      key={s.id}
                      className="p-3 rounded-xl border hover:shadow-sm transition-shadow"
                      style={{ borderColor: "var(--border)", background: "var(--input-background)" }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold"
                          style={{ background: s.color, fontSize: "11px" }}
                        >
                          {s.inicial}
                        </div>
                        <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--foreground)" }}>{s.nombre}</span>
                      </div>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--primary)" }}>
                        ${(s.monto / 1000).toFixed(0)}K
                      </div>
                      <div style={{ fontSize: "10px", color: "var(--muted-foreground)" }}>Renovación: {s.renovacion}</div>
                    </div>
                  ))}
                  {stSponsors.length === 0 && (
                    <div
                      className="p-4 rounded-xl border-2 border-dashed text-center"
                      style={{ borderColor: "var(--border)", color: "var(--muted-foreground)", fontSize: "12px" }}
                    >
                      Sin prospectos
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
