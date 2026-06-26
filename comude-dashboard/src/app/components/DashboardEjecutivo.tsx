import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";
import {
  Users, CalendarDays, TrendingUp, DollarSign, Star, Building2,
  ArrowUpRight, ArrowDownRight, AlertTriangle, CheckCircle2, CircleDollarSign,
  Target, ClipboardCheck,
} from "lucide-react";

const kpis = [
  {
    label: "Ciudadanos Activos",
    value: "32,845",
    change: "+8.4%",
    up: true,
    icon: Users,
    color: "#1B4FD8",
    bg: "#EEF2FF",
    sub: "vs. mes anterior",
    status: "green",
  },
  {
    label: "Eventos Realizados",
    value: "148",
    change: "+12.1%",
    up: true,
    icon: CalendarDays,
    color: "#06B6D4",
    bg: "#ECFEFF",
    sub: "este año",
    status: "green",
  },
  {
    label: "Participantes Acum.",
    value: "97,231",
    change: "+15.3%",
    up: true,
    icon: TrendingUp,
    color: "#10B981",
    bg: "#ECFDF5",
    sub: "total acumulado",
    status: "green",
  },
  {
    label: "Patrocinios Obtenidos",
    value: "$4.8M",
    change: "+22.7%",
    up: true,
    icon: DollarSign,
    color: "#F59E0B",
    bg: "#FFFBEB",
    sub: "MXN este año",
    status: "yellow",
  },
  {
    label: "Satisfacción Ciudadana",
    value: "92%",
    change: "+2.1%",
    up: true,
    icon: Star,
    color: "#8B5CF6",
    bg: "#F5F3FF",
    sub: "NPS: 74",
    status: "green",
  },
  {
    label: "Ocupación Instalaciones",
    value: "87%",
    change: "-1.2%",
    up: false,
    icon: Building2,
    color: "#F97316",
    bg: "#FFF7ED",
    sub: "promedio mensual",
    status: "yellow",
  },
];

const participationData = [
  { mes: "Ene", participantes: 6200, eventos: 10 },
  { mes: "Feb", participantes: 7100, eventos: 12 },
  { mes: "Mar", participantes: 8400, eventos: 14 },
  { mes: "Abr", participantes: 9200, eventos: 16 },
  { mes: "May", participantes: 10800, eventos: 18 },
  { mes: "Jun", participantes: 11500, eventos: 22 },
  { mes: "Jul", participantes: 13200, eventos: 24 },
  { mes: "Ago", participantes: 14100, eventos: 20 },
  { mes: "Sep", participantes: 12900, eventos: 19 },
  { mes: "Oct", participantes: 15600, eventos: 26 },
  { mes: "Nov", participantes: 16300, eventos: 28 },
  { mes: "Dic", participantes: 8400, eventos: 14 },
];

const deportesData = [
  { deporte: "Fútbol", participantes: 9840, color: "#1B4FD8" },
  { deporte: "Básquetbol", participantes: 6210, color: "#06B6D4" },
  { deporte: "Natación", participantes: 5430, color: "#10B981" },
  { deporte: "Voleibol", participantes: 4120, color: "#F59E0B" },
  { deporte: "Pádel", participantes: 3780, color: "#8B5CF6" },
  { deporte: "Atletismo", participantes: 3200, color: "#F97316" },
];

const unidadesData = [
  { name: "Unidad Deportiva Tucson", ocupacion: 74, participantes: 18200, color: "#1B4FD8", status: "green" },
  { name: "Unidad Deportiva Independencia", ocupacion: 79, participantes: 15400, color: "#06B6D4", status: "yellow" },
  { name: "Unidad Deportiva Plan de San Luis", ocupacion: 71, participantes: 14100, color: "#10B981", status: "green" },
  { name: "Unidad Deportiva Revolución", ocupacion: 88, participantes: 11800, color: "#F59E0B", status: "yellow" },
  { name: "Unidad Deportiva López Mateos", ocupacion: 64, participantes: 9600, color: "#8B5CF6", status: "green" },
];

const statusStyles: Record<string, { label: string; color: string; bg: string }> = {
  green: { label: "Saludable", color: "#10B981", bg: "#ECFDF5" },
  yellow: { label: "Atención", color: "#F59E0B", bg: "#FFFBEB" },
  red: { label: "Crítico", color: "#DC2626", bg: "#FEF2F2" },
};

const executiveAlerts = [
  { icon: AlertTriangle, severity: "red", title: "Carrera Guadalajara 5K", description: "Excedió presupuesto en 14%.", action: "Revisar" },
  { icon: Building2, severity: "yellow", title: "Unidad Revolución", description: "Tiene ocupación del 88%.", action: "Revisar" },
  { icon: CircleDollarSign, severity: "yellow", title: "Red Cola", description: "Vence convenio en 12 días.", action: "Revisar" },
  { icon: CheckCircle2, severity: "green", title: "Satisfacción ciudadana", description: "Supera meta mensual.", action: "Revisar" },
];

const goals2026 = [
  { label: "Participación ciudadana", value: 109 },
  { label: "Eventos realizados", value: 74 },
  { label: "Patrocinios captados", value: 66 },
  { label: "Encuestas respondidas", value: 84 },
  { label: "Colonias impactadas", value: 53 },
];

const MapaGuadalajara = () => {
  const zonas = [
    { id: "norte", label: "Norte", x: 180, y: 60, r: 48, pct: 78, color: "#1B4FD8" },
    { id: "sur", label: "Sur", x: 200, y: 230, r: 55, pct: 91, color: "#10B981" },
    { id: "oriente", label: "Oriente", x: 310, y: 140, r: 42, pct: 65, color: "#F59E0B" },
    { id: "poniente", label: "Poniente", x: 90, y: 160, r: 50, pct: 84, color: "#06B6D4" },
    { id: "centro", label: "Centro", x: 200, y: 150, r: 38, pct: 95, color: "#8B5CF6" },
  ];

  return (
    <div className="relative w-full" style={{ height: "300px" }}>
      <svg viewBox="0 0 400 320" className="w-full h-full">
        <defs>
          {zonas.map((z) => (
            <radialGradient key={z.id} id={`grad-${z.id}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={z.color} stopOpacity={0.35} />
              <stop offset="100%" stopColor={z.color} stopOpacity={0.05} />
            </radialGradient>
          ))}
        </defs>
        {/* Guadalajara boundary silhouette */}
        <path
          d="M 80 40 L 280 30 L 360 80 L 350 200 L 290 290 L 150 300 L 60 250 L 50 130 Z"
          fill="#EEF2FF"
          stroke="#DDE1EE"
          strokeWidth="1.5"
        />
        {/* Grid lines */}
        {[80, 140, 200, 260].map((y) => (
          <line key={y} x1="50" y1={y} x2="360" y2={y} stroke="#DDE1EE" strokeWidth="0.5" strokeDasharray="4,4" />
        ))}
        {[100, 160, 220, 300].map((x) => (
          <line key={x} x1={x} y1="30" x2={x} y2="300" stroke="#DDE1EE" strokeWidth="0.5" strokeDasharray="4,4" />
        ))}
        {/* Heat bubbles */}
        {zonas.map((z) => (
          <g key={z.id}>
            <circle cx={z.x} cy={z.y} r={z.r} fill={`url(#grad-${z.id})`} />
            <circle cx={z.x} cy={z.y} r={12} fill={z.color} opacity={0.9} />
            <text x={z.x} y={z.y} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="9" fontWeight="700">
              {z.pct}%
            </text>
            <text x={z.x} y={z.y + 22} textAnchor="middle" fill="#0D1B3E" fontSize="10" fontWeight="600">
              {z.label}
            </text>
          </g>
        ))}
        {/* Legend */}
        <text x="200" y="315" textAnchor="middle" fill="#6B7A99" fontSize="9">
          Distribución de Participación por Zona — Guadalajara, Jalisco
        </text>
      </svg>
    </div>
  );
};

interface DashboardEjecutivoProps {
  onNavigate?: (id: string) => void;
}

export function DashboardEjecutivo({ onNavigate }: DashboardEjecutivoProps) {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-4" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          const status = statusStyles[kpi.status];
          return (
            <div
              key={kpi.label}
              className="rounded-2xl p-5 border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
              style={{ background: "#fff", borderColor: "var(--border)" }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p style={{ fontSize: "11px", color: "var(--muted-foreground)", fontWeight: 500, letterSpacing: "0.04em" }}>
                      {kpi.label.toUpperCase()}
                    </p>
                    <span className="w-2 h-2 rounded-full" style={{ background: status.color }} />
                  </div>
                  <p
                    style={{
                      fontSize: "28px",
                      fontWeight: 700,
                      color: "var(--foreground)",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      lineHeight: 1.2,
                      marginTop: "6px",
                    }}
                  >
                    {kpi.value}
                  </p>
                  <div className="flex items-center gap-1 mt-1.5">
                    {kpi.up ? (
                      <ArrowUpRight size={13} color="#10B981" />
                    ) : (
                      <ArrowDownRight size={13} color="#DC2626" />
                    )}
                    <span style={{ fontSize: "12px", color: kpi.up ? "#10B981" : "#DC2626", fontWeight: 600 }}>
                      {kpi.change}
                    </span>
                    <span style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>{kpi.sub}</span>
                  </div>
                  <span
                    className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full"
                    style={{ fontSize: "10px", fontWeight: 600, color: status.color, background: status.bg }}
                  >
                    {status.label}
                  </span>
                </div>
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: kpi.bg }}
                >
                  <Icon size={20} color={kpi.color} strokeWidth={1.8} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Executive controls */}
      <div className="grid gap-4" style={{ gridTemplateColumns: "1.2fr 1fr 1fr" }}>
        <div className="rounded-2xl p-5 border" style={{ background: "#fff", borderColor: "var(--border)" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--foreground)" }}>Alertas Ejecutivas</h3>
              <p style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>Evidencia para toma de decisiones</p>
            </div>
            <span className="px-2.5 py-1 rounded-full" style={{ fontSize: "10px", fontWeight: 700, background: "#FEF2F2", color: "#DC2626" }}>
              1 crítica
            </span>
          </div>
          <div className="space-y-2.5">
            {executiveAlerts.map(({ icon: Icon, severity, title, description, action }) => {
              const status = statusStyles[severity];
              return (
                <div
                  key={title}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-gray-50"
                  style={{ border: "1px solid var(--border)" }}
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: status.bg }}>
                    <Icon size={16} color={status.color} />
                  </div>
                  <div className="flex-1">
                    <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--foreground)" }}>{title}</div>
                    <div style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>{description}</div>
                  </div>
                  <button
                    className="px-3 py-1.5 rounded-lg transition-all hover:shadow-sm active:scale-95"
                    style={{ fontSize: "11px", fontWeight: 600, color: "var(--primary)", background: "var(--secondary)" }}
                  >
                    {action}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl p-5 border" style={{ background: "#fff", borderColor: "var(--border)" }}>
          <div className="flex items-center gap-2 mb-4">
            <Target size={16} color="var(--primary)" />
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--foreground)" }}>Cumplimiento de Metas 2026</h3>
              <p style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>Seguimiento para Ayuntamiento</p>
            </div>
          </div>
          <div className="space-y-3">
            {goals2026.map((goal) => {
              const color = goal.value >= 100 ? "#10B981" : goal.value >= 70 ? "#F59E0B" : "#DC2626";
              return (
                <div key={goal.label}>
                  <div className="flex justify-between mb-1">
                    <span style={{ fontSize: "11px", color: "var(--foreground)", fontWeight: 500 }}>{goal.label}</span>
                    <span style={{ fontSize: "11px", color, fontWeight: 700 }}>{goal.value}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full" style={{ background: "var(--muted)" }}>
                    <div className="h-2 rounded-full transition-all" style={{ width: `${Math.min(goal.value, 100)}%`, background: color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl p-5 border" style={{ background: "#fff", borderColor: "var(--border)" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--foreground)" }}>Control Presupuestal COMUDE</h3>
              <p style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>Transparencia presupuestal</p>
            </div>
            <ClipboardCheck size={17} color="#F59E0B" />
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              ["Presupuesto anual", "$28.5M"],
              ["Ejercido", "$16.8M"],
              ["Comprometido", "$5.4M"],
              ["Disponible", "$6.3M"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl p-3" style={{ background: "var(--input-background)" }}>
                <div style={{ fontSize: "10px", color: "var(--muted-foreground)" }}>{label}</div>
                <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--foreground)" }}>{value}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mb-1.5">
            <span style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>Avance presupuestal</span>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "#F59E0B" }}>78% · Atención</span>
          </div>
          <div className="w-full h-2.5 rounded-full" style={{ background: "var(--muted)" }}>
            <div className="h-2.5 rounded-full" style={{ width: "78%", background: "#F59E0B" }} />
          </div>
        </div>
      </div>

      <div className="rounded-2xl p-5 border flex items-center justify-between" style={{ background: "#fff", borderColor: "var(--border)" }}>
        <div>
          <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--foreground)" }}>Control financiero-operativo</h3>
          <p style={{ fontSize: "12px", color: "var(--muted-foreground)", marginTop: "3px" }}>
            Presupuesto, eventos, ingresos y conciliación en una sola vista.
          </p>
          <div className="flex gap-3 mt-3">
            {[
              ["Avance presupuestal", "78%"],
              ["Conciliación automática", "94%"],
              ["Ahorro estimado", "18 h/mes"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl px-3 py-2" style={{ background: "var(--input-background)" }}>
                <div style={{ fontSize: "10px", color: "var(--muted-foreground)" }}>{label}</div>
                <div style={{ fontSize: "14px", fontWeight: 800, color: "var(--foreground)" }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() => onNavigate?.("finanzas")}
          className="px-4 py-2.5 rounded-xl text-white transition-all hover:opacity-90 active:scale-95"
          style={{ background: "var(--primary)", fontSize: "12px", fontWeight: 700 }}
        >
          Ver Finanzas
        </button>
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 380px" }}>
        {/* Participación mensual */}
        <div className="rounded-2xl p-5 border" style={{ background: "#fff", borderColor: "var(--border)" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--foreground)" }}>
                Participación Deportiva Mensual
              </h3>
              <p style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>Enero – Junio 2026</p>
            </div>
            <span
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{ background: "#ECFDF5", color: "#10B981" }}
            >
              ↑ 15.3% vs año anterior
            </span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={participationData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPart" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1B4FD8" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#1B4FD8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F2F7" />
              <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "#6B7A99" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#6B7A99" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: "12px", border: "1px solid #DDE1EE", fontSize: "12px" }}
                formatter={(v) => [v.toLocaleString(), "Participantes"]}
              />
              <Area
                type="monotone"
                dataKey="participantes"
                stroke="#1B4FD8"
                strokeWidth={2.5}
                fill="url(#colorPart)"
                dot={false}
                activeDot={{ r: 5, fill: "#1B4FD8" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top deportes */}
        <div className="rounded-2xl p-5 border" style={{ background: "#fff", borderColor: "var(--border)" }}>
          <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--foreground)", marginBottom: "4px" }}>
            Ranking de Deportes Prioritarios
          </h3>
          <p style={{ fontSize: "11px", color: "var(--muted-foreground)", marginBottom: "16px" }}>
            Participantes activos y decisión sugerida
          </p>
          <div className="space-y-3">
            {deportesData.map((d, i) => (
              <div key={d.deporte} className="rounded-xl p-3" style={{ background: "var(--input-background)" }}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg flex items-center justify-center text-white" style={{ background: d.color, fontSize: "10px", fontWeight: 800 }}>
                      {i + 1}
                    </span>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--foreground)" }}>{d.deporte}</span>
                  </div>
                  <span style={{ fontSize: "12px", fontWeight: 800, color: "var(--foreground)" }}>{d.participantes.toLocaleString()}</span>
                </div>
                <div className="w-full h-1.5 rounded-full" style={{ background: "#DDE1EE" }}>
                  <div className="h-1.5 rounded-full" style={{ width: `${Math.min((d.participantes / 9840) * 100, 100)}%`, background: d.color }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl p-3" style={{ background: "#ECFDF5", color: "#047857" }}>
            <div style={{ fontSize: "12px", fontWeight: 800 }}>Acción recomendada</div>
            <p style={{ fontSize: "11px", marginTop: "3px" }}>
              Reforzar horarios de fútbol y natación; evaluar expansión de cupos en unidades con demanda alta.
            </p>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {/* Top Unidades */}
        <div className="rounded-2xl p-5 border" style={{ background: "#fff", borderColor: "var(--border)" }}>
          <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--foreground)", marginBottom: "4px" }}>
            Top Unidades Deportivas
          </h3>
          <p style={{ fontSize: "11px", color: "var(--muted-foreground)", marginBottom: "16px" }}>Ocupación y participantes</p>
          <div className="space-y-4">
            {unidadesData.map((u) => (
              <div key={u.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: statusStyles[u.status].color }} />
                    <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--foreground)" }}>{u.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>
                      {u.participantes.toLocaleString()} part.
                    </span>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: statusStyles[u.status].color }}>{u.ocupacion}%</span>
                  </div>
                </div>
                <div className="w-full rounded-full h-1.5" style={{ background: "var(--muted)" }}>
                  <div
                    className="h-1.5 rounded-full transition-all"
                    style={{ width: `${u.ocupacion}%`, background: statusStyles[u.status].color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mapa */}
        <div className="rounded-2xl p-5 border" style={{ background: "#fff", borderColor: "var(--border)" }}>
          <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--foreground)", marginBottom: "4px" }}>
            Mapa de Participación — Guadalajara
          </h3>
          <p style={{ fontSize: "11px", color: "var(--muted-foreground)", marginBottom: "8px" }}>
            Distribución geográfica por zona
          </p>
          <MapaGuadalajara />
        </div>
      </div>
    </div>
  );
}
