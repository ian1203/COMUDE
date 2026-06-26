import { useState } from "react";
import type { ReactNode } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  CircleDollarSign,
  Clock,
  Copy,
  Download,
  FileSpreadsheet,
  Upload,
  X,
} from "lucide-react";

export type FinanzasView =
  | "resumen"
  | "presupuesto"
  | "costeo"
  | "ingresos"
  | "patrocinios"
  | "conciliacion"
  | "autorizaciones";

const status = {
  green: { label: "Correcto", color: "#10B981", bg: "#ECFDF5" },
  yellow: { label: "Atención", color: "#F59E0B", bg: "#FFFBEB" },
  red: { label: "Crítico", color: "#DC2626", bg: "#FEF2F2" },
};

const programs = [
  ["Deporte para Todos", "$5.8M", "$3.6M", "$1.1M", "$1.1M", 81, "yellow"],
  ["Escuelas Deportivas", "$4.2M", "$2.7M", "$0.8M", "$0.7M", 83, "yellow"],
  ["Ligas Municipales", "$3.9M", "$2.1M", "$0.6M", "$1.2M", 69, "green"],
  ["Carreras y Eventos", "$6.4M", "$4.8M", "$1.2M", "$0.4M", 94, "red"],
  ["Activación Física", "$3.1M", "$1.7M", "$0.4M", "$1.0M", 68, "green"],
  ["Adultos Mayores", "$2.6M", "$1.3M", "$0.5M", "$0.8M", 69, "green"],
] as const;

const events = [
  {
    name: "Carrera Guadalajara 5K",
    estimated: 163000,
    real: 186000,
    participants: 4200,
    sponsorship: 95000,
    satisfaction: "4.8",
    roi: "162%",
    breakdown: {
      Logística: 59000,
      Seguridad: 28000,
      Ambulancia: 15000,
      Hidratación: 22000,
      Medallas: 18000,
      Marketing: 32000,
      Arbitraje: 4000,
      "Personal operativo": 8000,
    },
  },
  {
    name: "Torneo Municipal de Fútbol",
    estimated: 148000,
    real: 142000,
    participants: 1860,
    sponsorship: 80000,
    satisfaction: "4.6",
    roi: "118%",
    breakdown: {
      Logística: 38000,
      Seguridad: 18000,
      Ambulancia: 12000,
      Hidratación: 11000,
      Medallas: 14000,
      Marketing: 21000,
      Arbitraje: 18000,
      "Personal operativo": 10000,
    },
  },
  {
    name: "Festival Deportivo Familiar",
    estimated: 230000,
    real: 224000,
    participants: 6800,
    sponsorship: 128000,
    satisfaction: "4.9",
    roi: "185%",
    breakdown: {
      Logística: 50000,
      Seguridad: 35000,
      Ambulancia: 20000,
      Hidratación: 34000,
      Medallas: 22000,
      Marketing: 45000,
      Arbitraje: 6000,
      "Personal operativo": 12000,
    },
  },
  {
    name: "Liga Infantil de Básquetbol",
    estimated: 70000,
    real: 68000,
    participants: 940,
    sponsorship: 32000,
    satisfaction: "4.7",
    roi: "106%",
    breakdown: {
      Logística: 12000,
      Seguridad: 8000,
      Ambulancia: 8000,
      Hidratación: 6000,
      Medallas: 8000,
      Marketing: 12000,
      Arbitraje: 9000,
      "Personal operativo": 5000,
    },
  },
];

const unitIncome = [
  ["Unidad Deportiva Tucson", "$348,000", "+12%", "$118", "82%", "Correcto"],
  ["Unidad Deportiva Independencia", "$286,000", "+6%", "$96", "76%", "Correcto"],
  ["Unidad Deportiva Plan de San Luis", "$214,000", "-4%", "$88", "71%", "Atención"],
  ["Unidad Deportiva Revolución", "$392,000", "+18%", "$124", "88%", "Correcto"],
  ["Unidad Deportiva López Mateos", "$176,000", "-9%", "$81", "64%", "Atención"],
] as const;

const sponsors = [
  ["Adidas", "$1,250,000", "$1,250,000", "$0", "18", "31 Dic 2025", "Activo"],
  ["Coca-Cola", "$840,000", "$700,000", "$140,000", "10", "30 Nov 2025", "Activo"],
  ["Charly", "$620,000", "$620,000", "$0", "8", "15 Oct 2025", "Activo"],
  ["Red Cola", "$380,000", "$330,000", "$50,000", "6", "30 Jun 2025", "Por vencer"],
  ["Electrolit", "$290,000", "$190,000", "$100,000", "5", "20 Sep 2025", "Pendiente cobro"],
  ["Totalplay", "$260,000", "$260,000", "$0", "4", "12 Dic 2025", "Activo"],
] as const;

const reconciliation = [
  ["10 Jun", "Reservación cancha fútbol", "Reservaciones", "$1,200", "$1,200", "$0", "Conciliado", "Marcar conciliado"],
  ["11 Jun", "Clase de natación", "Clases", "$850", "$800", "-$50", "Diferencia", "Revisar"],
  ["12 Jun", "Inscripción Carrera Guadalajara 5K", "Eventos", "$48,000", "$48,000", "$0", "Conciliado", "Marcar conciliado"],
  ["14 Jun", "Patrocinio Adidas", "Patrocinios", "$250,000", "$250,000", "$0", "Conciliado", "Marcar conciliado"],
  ["15 Jun", "Renta de espacio deportivo", "Unidades", "$6,500", "$0", "-$6,500", "Pendiente", "Asociar depósito"],
  ["16 Jun", "Depósito bancario no identificado", "Banco", "$0", "$4,800", "$4,800", "Sin identificar", "Exportar excepción"],
] as const;

const approvals = [
  ["Compra de balones", "$48,000", "Escuelas Deportivas", "Coord. Escuelas", "Finanzas", "3", "En proceso"],
  ["Medallas Carrera Guadalajara 5K", "$82,000", "Carreras y Eventos", "Eventos", "Dirección", "5", "Atención"],
  ["Mantenimiento de cancha", "$126,000", "Unidad Tucson", "Jefe de Unidad", "Coordinación Deportiva", "2", "En proceso"],
  ["Hidratación para torneo", "$24,000", "Ligas Municipales", "Eventos", "Jefe de Unidad", "1", "Nuevo"],
  ["Uniformes de escuelas deportivas", "$156,000", "Escuelas Deportivas", "Coord. Escuelas", "Autorizado", "7", "Autorizado"],
] as const;

const money = (value: number) => `$${value.toLocaleString("es-MX")}`;

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border ${className}`} style={{ background: "#fff", borderColor: "var(--border)" }}>
      {children}
    </div>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-4">
      <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--foreground)" }}>{title}</h3>
      {subtitle && <p style={{ fontSize: "11px", color: "var(--muted-foreground)", marginTop: 2 }}>{subtitle}</p>}
    </div>
  );
}

function StatusPill({ tone }: { tone: keyof typeof status }) {
  const item = status[tone];
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full" style={{ background: item.bg, color: item.color, fontSize: "10px", fontWeight: 800 }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: item.color }} />
      {item.label}
    </span>
  );
}

interface FinanzasOperativasProps {
  view?: FinanzasView;
}

export function FinanzasOperativas({ view = "resumen" }: FinanzasOperativasProps) {
  const [selectedEvent, setSelectedEvent] = useState<(typeof events)[number] | null>(events[0]);
  const show = (section: FinanzasView) => view === "resumen" || view === section;
  const viewTitle: Record<FinanzasView, string> = {
    resumen: "Resumen Financiero",
    presupuesto: "Presupuesto por Programa",
    costeo: "Costeo de Eventos",
    ingresos: "Ingresos por Unidad",
    patrocinios: "Patrocinios y Cobranza",
    conciliacion: "Conciliación Financiera",
    autorizaciones: "Autorizaciones",
  };

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h2 style={{ fontSize: "20px", fontWeight: 800, color: "var(--foreground)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {viewTitle[view]}
          </h2>
          <p style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>
            Inteligencia financiera-operativa para reducir consolidaciones manuales, seguimiento por Excel y revisión de movimientos uno por uno.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-xl text-white flex items-center gap-2" style={{ background: "var(--primary)", fontSize: "12px", fontWeight: 700 }}>
            <Upload size={14} /> Importar estado de cuenta
          </button>
          <button className="px-4 py-2 rounded-xl flex items-center gap-2" style={{ background: "var(--secondary)", color: "var(--primary)", fontSize: "12px", fontWeight: 700 }}>
            <Download size={14} /> Exportar excepciones a Excel
          </button>
        </div>
      </div>

      {show("resumen") && <div className="grid grid-cols-6 gap-4">
        {[
          ["Presupuesto anual", "$28.5M", "green"],
          ["Ejercido", "$16.8M", "green"],
          ["Comprometido", "$5.4M", "yellow"],
          ["Disponible", "$6.3M", "green"],
          ["Avance presupuestal", "78%", "yellow"],
          ["Conciliación automática", "94%", "green"],
          ["Tiempo ahorrado estimado", "18 h/mes", "green"],
        ].map(([label, value, tone]) => (
          <Card key={label} className="p-4 transition-all hover:shadow-md">
            <div style={{ fontSize: "10px", color: "var(--muted-foreground)", fontWeight: 700, letterSpacing: "0.04em" }}>{label.toUpperCase()}</div>
            <div style={{ fontSize: "24px", fontWeight: 800, color: "var(--foreground)", marginTop: 6 }}>{value}</div>
            <div className="mt-2"><StatusPill tone={tone as keyof typeof status} /></div>
          </Card>
        ))}
      </div>}

      {show("presupuesto") && <Card className="p-5">
        <SectionTitle title="Presupuesto por Programa" subtitle="Consolidación automática para evitar armado manual de presupuesto por programa en Excel." />
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Programa", "Aprobado", "Ejercido", "Comprometido", "Disponible", "% avance", "Semáforo"].map((head) => (
                  <th key={head} className="text-left py-3 px-3" style={{ fontSize: "10px", color: "var(--muted-foreground)", letterSpacing: "0.04em" }}>{head.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {programs.map(([program, approved, spent, committed, available, pct, tone]) => (
                <tr key={program} className="hover:bg-gray-50 transition-colors" style={{ borderBottom: "1px solid var(--border)" }}>
                  <td className="py-3 px-3" style={{ fontSize: "12px", fontWeight: 700 }}>{program}</td>
                  {[approved, spent, committed, available].map((cell) => <td key={cell} className="py-3 px-3" style={{ fontSize: "12px" }}>{cell}</td>)}
                  <td className="py-3 px-3" style={{ minWidth: 150 }}>
                    <div className="flex items-center gap-2">
                      <div className="h-2 rounded-full flex-1" style={{ background: "var(--muted)" }}>
                        <div className="h-2 rounded-full" style={{ width: `${pct}%`, background: status[tone as keyof typeof status].color }} />
                      </div>
                      <span style={{ fontSize: "11px", fontWeight: 800 }}>{pct}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-3"><StatusPill tone={tone as keyof typeof status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>}

      {show("costeo") && <div className="grid gap-5" style={{ gridTemplateColumns: selectedEvent ? "1fr 360px" : "1fr" }}>
        <Card className="p-5">
          <SectionTitle title="Costeo Inteligente de Eventos" subtitle="Duplica plantillas de eventos previos y compara presupuesto estimado contra costo real sin iniciar otro Excel." />
          <div className="space-y-3">
            {events.map((event) => {
              const variance = event.real - event.estimated;
              const over = variance > 0;
              return (
                <button key={event.name} onClick={() => setSelectedEvent(event)} className="w-full text-left rounded-xl border p-4 hover:shadow-sm transition-all" style={{ borderColor: selectedEvent?.name === event.name ? "var(--primary)" : "var(--border)", background: "#fff" }}>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 800, color: "var(--foreground)" }}>{event.name}</div>
                      <div style={{ fontSize: "11px", color: "var(--muted-foreground)", marginTop: 2 }}>
                        {event.participants.toLocaleString()} participantes · {money(Math.round(event.real / event.participants))} por participante · satisfacción {event.satisfaction}
                      </div>
                    </div>
                    <button className="px-3 py-1.5 rounded-lg flex items-center gap-1" style={{ background: "var(--secondary)", color: "var(--primary)", fontSize: "11px", fontWeight: 800 }}>
                      <Copy size={12} /> Duplicar plantilla
                    </button>
                  </div>
                  <div className="grid grid-cols-5 gap-3 mt-3">
                    {[
                      ["Estimado", money(event.estimated)],
                      ["Real", money(event.real)],
                      ["Variación", `${over ? "+" : ""}${money(variance)}`],
                      ["Patrocinio", money(event.sponsorship)],
                      ["ROI social", event.roi],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-lg p-2" style={{ background: "var(--input-background)" }}>
                        <div style={{ fontSize: "9px", color: "var(--muted-foreground)" }}>{label}</div>
                        <div style={{ fontSize: "12px", fontWeight: 800, color: label === "Variación" && over ? "#DC2626" : "var(--foreground)" }}>{value}</div>
                      </div>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        {selectedEvent && (
          <Card className="overflow-hidden">
            <div className="px-5 py-4 border-b flex items-start justify-between" style={{ borderColor: "var(--border)" }}>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 800 }}>{selectedEvent.name}</div>
                <div style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>Desglose operativo</div>
              </div>
              <button onClick={() => setSelectedEvent(null)} className="p-1 rounded-lg hover:bg-gray-100"><X size={14} /></button>
            </div>
            <div className="p-5 space-y-3">
              {selectedEvent.real > selectedEvent.estimated && (
                <div className="rounded-xl p-3 flex gap-2" style={{ background: "#FEF2F2" }}>
                  <AlertTriangle size={16} color="#DC2626" />
                  <div>
                    <div style={{ fontSize: "12px", fontWeight: 800, color: "#DC2626" }}>Evento sobre presupuesto</div>
                    <div style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>Revisar variación antes de autorizar nuevas compras.</div>
                  </div>
                </div>
              )}
              {Object.entries(selectedEvent.breakdown).map(([label, value]) => {
                const pct = Math.round((value / selectedEvent.real) * 100);
                return (
                  <div key={label}>
                    <div className="flex justify-between mb-1">
                      <span style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>{label}</span>
                      <strong style={{ fontSize: "11px" }}>{money(value)}</strong>
                    </div>
                    <div className="h-1.5 rounded-full" style={{ background: "var(--muted)" }}>
                      <div className="h-1.5 rounded-full" style={{ width: `${pct}%`, background: "var(--primary)" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        )}
      </div>}

      {show("ingresos") && <Card className="p-5">
        <SectionTitle title="Ingresos por Unidad Deportiva" subtitle="Elimina reportes separados por unidad y consolida reservaciones, clases, eventos, rentas e inscripciones." />
        <div className="grid grid-cols-5 gap-3">
          {unitIncome.map(([unit, income, variation, ticket, occupancy, alert]) => (
            <div key={unit} className="rounded-xl border p-4" style={{ borderColor: "var(--border)" }}>
              <div style={{ fontSize: "12px", fontWeight: 800 }}>{unit}</div>
              <div style={{ fontSize: "22px", fontWeight: 900, marginTop: 8 }}>{income}</div>
              <div style={{ fontSize: "11px", color: variation.startsWith("-") ? "#DC2626" : "#10B981", fontWeight: 800 }}>{variation} vs mes anterior</div>
              <div className="mt-3 space-y-1" style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>
                <div>Ticket promedio: <strong style={{ color: "var(--foreground)" }}>{ticket}</strong></div>
                <div>Reservaciones: <strong style={{ color: "var(--foreground)" }}>{unit.includes("Revolución") ? "$156K" : "$112K"}</strong></div>
                <div>Clases/Eventos/Rentas: <strong style={{ color: "var(--foreground)" }}>{unit.includes("Tucson") ? "$236K" : "$174K"}</strong></div>
                <div>Ocupación: <strong style={{ color: "var(--foreground)" }}>{occupancy}</strong></div>
                <div>Alertas: <strong style={{ color: alert === "Atención" ? "#F59E0B" : "#10B981" }}>{alert}</strong></div>
              </div>
            </div>
          ))}
        </div>
      </Card>}

      {show("patrocinios") && <Card className="p-5">
        <SectionTitle title="Control de Patrocinios" subtitle="Seguimiento de convenios, cobros y vencimientos. Patrocinador principal: Adidas." />
        <div className="grid grid-cols-5 gap-3 mb-4">
          {[
            ["Monto patrocinado anual", "$3.64M"],
            ["Monto cobrado", "$3.35M"],
            ["Monto pendiente", "$290K"],
            ["Convenios por vencer", "1"],
            ["Patrocinador principal", "Adidas"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl p-3" style={{ background: "var(--input-background)" }}>
              <div style={{ fontSize: "10px", color: "var(--muted-foreground)" }}>{label}</div>
              <div style={{ fontSize: "17px", fontWeight: 900 }}>{value}</div>
            </div>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <tbody>
              {sponsors.map(([sponsor, amount, charged, pending, associated, due, state]) => (
                <tr key={sponsor} className="hover:bg-gray-50" style={{ borderBottom: "1px solid var(--border)" }}>
                  {[sponsor, amount, charged, pending, associated, due, state].map((cell, index) => (
                    <td key={`${sponsor}-${index}`} className="py-3 px-3" style={{ fontSize: "12px", fontWeight: index === 0 ? 800 : 500, color: index === 6 && state !== "Activo" ? "#F59E0B" : "var(--foreground)" }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-4">
          {["Adidas: convenio activo", "Red Cola: convenio vence en 12 días", "Electrolit: pendiente de cobro"].map((alert) => (
            <div key={alert} className="rounded-xl p-3 flex gap-2" style={{ background: alert.includes("activo") ? "#ECFDF5" : "#FFFBEB" }}>
              {alert.includes("activo") ? <CheckCircle2 size={15} color="#10B981" /> : <AlertTriangle size={15} color="#F59E0B" />}
              <span style={{ fontSize: "12px", fontWeight: 700 }}>{alert}</span>
            </div>
          ))}
        </div>
      </Card>}

      {show("conciliacion") && <Card className="p-5">
        <div className="flex items-start justify-between mb-4">
          <SectionTitle
            title="Conciliación Financiera"
            subtitle="Concilia cobros de reservaciones, clases, eventos y patrocinios contra depósitos bancarios para revisar solo excepciones, no cientos de movimientos."
          />
          <div className="flex gap-2">
            <button className="px-3 py-2 rounded-xl text-white flex items-center gap-2" style={{ background: "var(--primary)", fontSize: "12px", fontWeight: 700 }}><FileSpreadsheet size={14} /> Importar estado de cuenta</button>
            <button className="px-3 py-2 rounded-xl flex items-center gap-2" style={{ background: "var(--secondary)", color: "var(--primary)", fontSize: "12px", fontWeight: 700 }}><Download size={14} /> Exportar excepciones a Excel</button>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-3 mb-4">
          {[
            ["Cobros esperados", "486"],
            ["Depósitos identificados", "459"],
            ["Conciliados automáticamente", "94%"],
            ["Diferencias pendientes", "27"],
            ["Depósitos sin identificar", "8"],
            ["Tiempo ahorrado", "18 h/mes"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl p-3" style={{ background: "var(--input-background)" }}>
              <div style={{ fontSize: "10px", color: "var(--muted-foreground)" }}>{label}</div>
              <div style={{ fontSize: "18px", fontWeight: 900 }}>{value}</div>
            </div>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Fecha", "Concepto", "Fuente", "Cobro esperado", "Depósito bancario", "Diferencia", "Estado", "Acción"].map((head) => (
                  <th key={head} className="text-left py-3 px-3" style={{ fontSize: "10px", color: "var(--muted-foreground)", letterSpacing: "0.04em" }}>{head.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reconciliation.map((row) => (
                <tr key={row[1]} className="hover:bg-gray-50" style={{ borderBottom: "1px solid var(--border)" }}>
                  {row.map((cell, index) => (
                    <td key={`${row[1]}-${index}`} className="py-3 px-3" style={{ fontSize: "12px", fontWeight: index === 1 ? 700 : 500 }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>}

      {show("autorizaciones") && <Card className="p-5">
        <SectionTitle title="Autorizaciones" subtitle="Reduce autorizaciones por WhatsApp, correo y Excel con trazabilidad de solicitud a autorización." />
        <div className="flex items-center gap-2 mb-4">
          {["Solicitud", "Jefe de Unidad", "Coordinación Deportiva", "Finanzas", "Dirección", "Autorizado"].map((step, index) => (
            <div key={step} className="flex items-center gap-2 flex-1">
              <div className="rounded-full px-3 py-1.5 text-center flex-1" style={{ background: index < 4 ? "var(--secondary)" : "var(--input-background)", color: index < 4 ? "var(--primary)" : "var(--muted-foreground)", fontSize: "11px", fontWeight: 800 }}>{step}</div>
              {index < 5 && <div className="h-px w-4" style={{ background: "var(--border)" }} />}
            </div>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Solicitud", "Monto", "Unidad/Programa", "Responsable", "Etapa actual", "Días", "Estado"].map((head) => (
                  <th key={head} className="text-left py-3 px-3" style={{ fontSize: "10px", color: "var(--muted-foreground)" }}>{head.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {approvals.map((row) => (
                <tr key={row[0]} className="hover:bg-gray-50" style={{ borderBottom: "1px solid var(--border)" }}>
                  {row.map((cell, index) => (
                    <td key={`${row[0]}-${index}`} className="py-3 px-3" style={{ fontSize: "12px", fontWeight: index === 0 ? 800 : 500 }}>
                      {index === 5 ? <span className="inline-flex items-center gap-1"><Clock size={12} /> {cell}</span> : cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>}
    </div>
  );
}
