import { useState } from "react";
import { X, Star, DollarSign, Users, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";

const eventos = [
  {
    id: 1,
    evento: "Carrera Guadalajara 5K",
    fecha: "27 Jun 2026",
    participantes: 4200,
    costoTotal: 186000,
    presupuestoAutorizado: 163000,
    patrocinio: 95000,
    satisfaccion: 4.8,
    roiSocial: 162,
    deporte: "Atletismo",
    presupuesto: {
      logistica: 59000,
      seguridad: 28000,
      ambulancia: 15000,
      hidratacion: 22000,
      medallas: 18000,
      marketing: 32000,
    },
  },
  {
    id: 2,
    evento: "Torneo Municipal de Fútbol",
    fecha: "04 Jul 2026",
    participantes: 1860,
    costoTotal: 142000,
    presupuestoAutorizado: 148000,
    patrocinio: 80000,
    satisfaccion: 4.6,
    roiSocial: 118,
    deporte: "Fútbol",
    presupuesto: {
      logistica: 38000,
      seguridad: 18000,
      ambulancia: 12000,
      hidratacion: 11000,
      medallas: 14000,
      marketing: 21000,
    },
  },
  {
    id: 3,
    evento: "Festival Deportivo Familiar",
    fecha: "11 Jul 2026",
    participantes: 6800,
    costoTotal: 224000,
    presupuestoAutorizado: 230000,
    patrocinio: 128000,
    satisfaccion: 4.9,
    roiSocial: 185,
    deporte: "Multideporte",
    presupuesto: {
      logistica: 50000,
      seguridad: 35000,
      ambulancia: 20000,
      hidratacion: 34000,
      medallas: 22000,
      marketing: 45000,
    },
  },
  {
    id: 4,
    evento: "Liga Infantil de Básquetbol",
    fecha: "18 Jul 2026",
    participantes: 940,
    costoTotal: 68000,
    presupuestoAutorizado: 70000,
    patrocinio: 32000,
    satisfaccion: 4.7,
    roiSocial: 106,
    deporte: "Básquetbol",
    presupuesto: {
      logistica: 12000,
      seguridad: 8000,
      ambulancia: 8000,
      hidratacion: 6000,
      medallas: 8000,
      marketing: 12000,
    },
  },
  {
    id: 5,
    evento: "Torneo Abierto de Pádel",
    fecha: "25 Jul 2026",
    participantes: 320,
    costoTotal: 54000,
    presupuestoAutorizado: 56000,
    patrocinio: 28000,
    satisfaccion: 4.5,
    roiSocial: 94,
    deporte: "Pádel",
    presupuesto: {
      logistica: 12000,
      seguridad: 6000,
      ambulancia: 6000,
      hidratacion: 4000,
      medallas: 6000,
      marketing: 11000,
    },
  },
];

const deporteColors: Record<string, string> = {
  Atletismo: "#06B6D4",
  Fútbol: "#10B981",
  Multideporte: "#8B5CF6",
  Básquetbol: "#F59E0B",
  Pádel: "#F97316",
};

const presupuestoLabels: Record<string, string> = {
  logistica: "Logística",
  seguridad: "Seguridad",
  ambulancia: "Ambulancia",
  hidratacion: "Hidratación",
  medallas: "Medallas",
  marketing: "Marketing",
};

export function EventosDeportivos() {
  const [selected, setSelected] = useState<(typeof eventos)[0] | null>(null);

  return (
    <div className="flex gap-5">
      <div className="flex-1 rounded-2xl border overflow-hidden" style={{ background: "#fff", borderColor: "var(--border)" }}>
        <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: "var(--border)" }}>
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--foreground)" }}>Control de Eventos e Impacto Social</h3>
            <p style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>{eventos.length} eventos registrados · evidencia para toma de decisiones 2026</p>
          </div>
          <button
            className="px-4 py-2 rounded-xl text-white transition-all hover:opacity-90 active:scale-95"
            style={{ background: "var(--primary)", fontSize: "12px", fontWeight: 500 }}
          >
            + Nuevo Evento
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--input-background)" }}>
                {["Evento", "Fecha", "Deporte", "Participantes", "Costo Total", "Patrocinio", "$/Part.", "Satisfacción"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left"
                    style={{ fontSize: "11px", fontWeight: 600, color: "var(--muted-foreground)", letterSpacing: "0.04em" }}
                  >
                    {h.toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {eventos.map((e) => {
                const cpParticipante = Math.round(e.costoTotal / e.participantes);
                const isSelected = selected?.id === e.id;
                const sobrecosto = e.costoTotal > e.presupuestoAutorizado;
                return (
                  <tr
                    key={e.id}
                    onClick={() => setSelected(isSelected ? null : e)}
                    className="cursor-pointer transition-colors"
                    style={{
                      borderBottom: "1px solid var(--border)",
                      background: isSelected ? "#EEF2FF" : "transparent",
                    }}
                    onMouseEnter={(el) => { if (!isSelected) (el.currentTarget as HTMLElement).style.background = "#F8F9FC"; }}
                    onMouseLeave={(el) => { if (!isSelected) (el.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ background: sobrecosto ? "#DC2626" : "#10B981" }} />
                        <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--foreground)" }}>{e.evento}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5" style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>{e.fecha}</td>
                    <td className="px-4 py-3.5">
                      <span
                        className="px-2.5 py-1 rounded-full"
                        style={{
                          fontSize: "11px",
                          fontWeight: 500,
                          background: (deporteColors[e.deporte] || "#1B4FD8") + "18",
                          color: deporteColors[e.deporte] || "#1B4FD8",
                        }}
                      >
                        {e.deporte}
                      </span>
                    </td>
                    <td className="px-4 py-3.5" style={{ fontSize: "13px", fontWeight: 500, color: "var(--foreground)" }}>
                      {e.participantes.toLocaleString()}
                    </td>
                    <td className="px-4 py-3.5" style={{ fontSize: "13px", color: sobrecosto ? "#DC2626" : "var(--foreground)", fontWeight: sobrecosto ? 700 : 400 }}>
                      ${e.costoTotal.toLocaleString()}
                    </td>
                    <td className="px-4 py-3.5">
                      <span style={{ fontSize: "13px", color: "#10B981", fontWeight: 500 }}>
                        ${e.patrocinio.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-3.5" style={{ fontSize: "13px", color: "var(--foreground)" }}>
                      ${cpParticipante}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1">
                        <Star size={12} color="#F59E0B" fill="#F59E0B" />
                        <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--foreground)" }}>{e.satisfaccion}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div
          className="w-96 rounded-2xl border flex-shrink-0 overflow-y-auto transition-all duration-200"
          style={{ background: "#fff", borderColor: "var(--border)", maxHeight: "calc(100vh - 200px)" }}
        >
          <div className="px-5 py-4 border-b flex items-start justify-between" style={{ borderColor: "var(--border)" }}>
            <div>
              <h4 style={{ fontSize: "13px", fontWeight: 600, color: "var(--foreground)", lineHeight: 1.3 }}>
                {selected.evento}
              </h4>
              <p style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>
                {selected.fecha} · reporte para Ayuntamiento
              </p>
            </div>
            <button onClick={() => setSelected(null)} className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
              <X size={14} color="var(--muted-foreground)" />
            </button>
          </div>

          <div className="p-4 grid grid-cols-2 gap-3">
            {[
              { label: "Costo total", value: `$${selected.costoTotal.toLocaleString()}`, icon: DollarSign, color: "#1B4FD8", bg: "#EEF2FF" },
              { label: "Costo/participante", value: `$${Math.round(selected.costoTotal / selected.participantes)}`, icon: DollarSign, color: "#06B6D4", bg: "#ECFEFF" },
              { label: "Patrocinio recibido", value: `$${selected.patrocinio.toLocaleString()}`, icon: TrendingUp, color: "#10B981", bg: "#ECFDF5" },
              { label: "Participantes", value: selected.participantes.toLocaleString(), icon: Users, color: "#F59E0B", bg: "#FFFBEB" },
              { label: "Satisfacción", value: `${selected.satisfaccion}/5`, icon: Star, color: "#8B5CF6", bg: "#F5F3FF" },
              { label: "ROI social", value: `${selected.roiSocial}%`, icon: TrendingUp, color: "#10B981", bg: "#ECFDF5" },
            ].map(({ label, value, icon: Icon, color, bg }) => (
              <div key={label} className="rounded-xl p-3" style={{ background: bg }}>
                <Icon size={14} color={color} />
                <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--foreground)", marginTop: "4px" }}>{value}</div>
                <div style={{ fontSize: "10px", color: "var(--muted-foreground)" }}>{label}</div>
              </div>
            ))}
          </div>

          <div className="px-5 pb-2">
            <h5 style={{ fontSize: "12px", fontWeight: 600, color: "var(--foreground)", marginBottom: "10px" }}>Alertas</h5>
            <div className="space-y-2">
              {selected.evento === "Carrera Guadalajara 5K" && (
                <div className="rounded-xl px-3 py-2 flex gap-2" style={{ background: "#FEF2F2" }}>
                  <AlertTriangle size={15} color="#DC2626" className="shrink-0 mt-0.5" />
                  <div>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: "#DC2626" }}>Sobrecosto de 14%</div>
                    <div style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>Revisar logística y suficiencia presupuestal.</div>
                  </div>
                </div>
              )}
              <div className="rounded-xl px-3 py-2 flex gap-2" style={{ background: "#ECFDF5" }}>
                <CheckCircle2 size={15} color="#10B981" className="shrink-0 mt-0.5" />
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#10B981" }}>Alta participación ciudadana</div>
                  <div style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>Indicador favorable de impacto social.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-5 pb-5">
            <h5 style={{ fontSize: "12px", fontWeight: 600, color: "var(--foreground)", marginBottom: "12px" }}>
              Desglose de costos
            </h5>
            <div className="space-y-2.5">
              {Object.entries(selected.presupuesto).map(([key, val]) => {
                const pct = Math.round((val / selected.costoTotal) * 100);
                return (
                  <div key={key}>
                    <div className="flex justify-between mb-1">
                      <span style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>{presupuestoLabels[key]}</span>
                      <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--foreground)" }}>
                        ${val.toLocaleString()} <span style={{ fontWeight: 400, color: "var(--muted-foreground)" }}>({pct}%)</span>
                      </span>
                    </div>
                    <div className="w-full h-1 rounded-full" style={{ background: "var(--muted)" }}>
                      <div className="h-1 rounded-full" style={{ width: `${pct}%`, background: "var(--primary)" }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 p-3 rounded-xl" style={{ background: "var(--secondary)" }}>
              <div className="flex justify-between items-center">
                <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--foreground)" }}>Costo total</span>
                <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--primary)" }}>
                  ${selected.costoTotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>Presupuesto autorizado</span>
                <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--muted-foreground)" }}>
                  ${selected.presupuestoAutorizado.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
