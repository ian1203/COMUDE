import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { MapPin, Users, Baby, Heart, Accessibility, TrendingUp } from "lucide-react";

const kpis = [
  { label: "Colonias Impactadas", value: "84", icon: MapPin, color: "#1B4FD8", bg: "#EEF2FF", sub: "de 159 colonias" },
  { label: "Ciudadanos Únicos", value: "32,845", icon: Users, color: "#10B981", bg: "#ECFDF5", sub: "usuarios registrados" },
  { label: "Niños Beneficiados", value: "12,400", icon: Baby, color: "#F59E0B", bg: "#FFFBEB", sub: "6 a 12 años" },
  { label: "Mujeres Participantes", value: "13,467", icon: Heart, color: "#EC4899", bg: "#FDF2F8", sub: "41% del total" },
  { label: "Adultos Mayores Activos", value: "5,240", icon: TrendingUp, color: "#8B5CF6", bg: "#F5F3FF", sub: "+18% vs año ant." },
  { label: "Personas con Discapacidad", value: "890", icon: Accessibility, color: "#06B6D4", bg: "#ECFEFF", sub: "programas inclusivos" },
];

const impactoPorColonia = [
  { colonia: "Tucson", beneficiados: 4820 },
  { colonia: "Sta. Margarita", beneficiados: 4210 },
  { colonia: "Jardines", beneficiados: 3890 },
  { colonia: "Revolución", beneficiados: 3640 },
  { colonia: "Independencia", beneficiados: 3410 },
  { colonia: "Arboledas", beneficiados: 2980 },
  { colonia: "Centro", beneficiados: 2750 },
];

const crecimientoData = [
  { year: "2020", ciudadanos: 14200 },
  { year: "2021", ciudadanos: 18400 },
  { year: "2022", ciudadanos: 22100 },
  { year: "2023", ciudadanos: 27600 },
  { year: "2024", ciudadanos: 31200 },
  { year: "2025", ciudadanos: 32845 },
];

const programas = [
  { nombre: "Deporte para Todos", beneficiarios: 8420, meta: 10000, color: "#1B4FD8", estado: "En progreso" },
  { nombre: "Guadalajara Activa (Adultos Mayores)", beneficiarios: 5240, meta: 6000, color: "#8B5CF6", estado: "En progreso" },
  { nombre: "Deporte Inclusivo", beneficiarios: 890, meta: 1000, color: "#06B6D4", estado: "En progreso" },
  { nombre: "Liga Infantil Municipal", beneficiarios: 12400, meta: 12000, color: "#10B981", estado: "Meta alcanzada" },
  { nombre: "Mujer y Deporte", beneficiarios: 6800, meta: 7500, color: "#EC4899", estado: "En progreso" },
];

export function ImpactoSocial() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div
        className="rounded-2xl p-6 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0D1B3E 0%, #1B4FD8 100%)",
        }}
      >
        <div className="relative z-10">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3"
            style={{ background: "rgba(255,255,255,0.15)", fontSize: "11px", color: "#fff", fontWeight: 500 }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Reporte para Ayuntamiento de Guadalajara · Junio 2025
          </div>
          <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#fff", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Informe de Impacto Social y Deportivo
          </h2>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", marginTop: "4px" }}>
            COMUDE Guadalajara 360 · Plataforma Integral de Gestión Deportiva y Participación Ciudadana
          </p>
        </div>
        {/* Decorative circles */}
        <div className="absolute right-8 top-4 w-24 h-24 rounded-full opacity-10" style={{ background: "#fff" }} />
        <div className="absolute right-20 bottom-2 w-16 h-16 rounded-full opacity-10" style={{ background: "#fff" }} />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-4">
        {kpis.map(({ label, value, icon: Icon, color, bg, sub }) => (
          <div
            key={label}
            className="rounded-2xl p-5 border flex items-center gap-4"
            style={{ background: "#fff", borderColor: "var(--border)" }}
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ background: bg }}>
              <Icon size={24} color={color} strokeWidth={1.8} />
            </div>
            <div>
              <p style={{ fontSize: "24px", fontWeight: 800, color, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{value}</p>
              <p style={{ fontSize: "12px", fontWeight: 500, color: "var(--foreground)" }}>{label}</p>
              <p style={{ fontSize: "10px", color: "var(--muted-foreground)" }}>{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {/* Crecimiento histórico */}
        <div className="rounded-2xl p-5 border" style={{ background: "#fff", borderColor: "var(--border)" }}>
          <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--foreground)", marginBottom: "4px" }}>
            Crecimiento Histórico de Ciudadanos Activos
          </h3>
          <p style={{ fontSize: "11px", color: "var(--muted-foreground)", marginBottom: "12px" }}>2020 – 2025</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={crecimientoData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCiud" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1B4FD8" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#1B4FD8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F2F7" />
              <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#6B7A99" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#6B7A99" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: "12px", border: "1px solid #DDE1EE", fontSize: "12px" }}
                formatter={(v) => [v.toLocaleString(), "Ciudadanos"]}
              />
              <Area type="monotone" dataKey="ciudadanos" stroke="#1B4FD8" strokeWidth={2.5} fill="url(#colorCiud)" dot={{ fill: "#1B4FD8", r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Por colonia */}
        <div className="rounded-2xl p-5 border" style={{ background: "#fff", borderColor: "var(--border)" }}>
          <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--foreground)", marginBottom: "4px" }}>
            Beneficiados por Colonia
          </h3>
          <p style={{ fontSize: "11px", color: "var(--muted-foreground)", marginBottom: "12px" }}>Top 7 colonias impactadas</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={impactoPorColonia} layout="vertical" margin={{ top: 0, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F2F7" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: "#6B7A99" }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="colonia" tick={{ fontSize: 11, fill: "#6B7A99" }} axisLine={false} tickLine={false} width={90} />
              <Tooltip
                contentStyle={{ borderRadius: "12px", border: "1px solid #DDE1EE", fontSize: "12px" }}
                formatter={(v) => [v.toLocaleString(), "Beneficiados"]}
              />
              <Bar dataKey="beneficiados" fill="#1B4FD8" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Programas sociales */}
      <div className="rounded-2xl p-5 border" style={{ background: "#fff", borderColor: "var(--border)" }}>
        <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--foreground)", marginBottom: "16px" }}>
          Avance de Programas Sociales
        </h3>
        <div className="space-y-5">
          {programas.map((p) => {
            const pct = Math.min(Math.round((p.beneficiarios / p.meta) * 100), 100);
            return (
              <div key={p.nombre}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: p.color }} />
                    <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--foreground)" }}>{p.nombre}</span>
                    <span
                      className="px-2 py-0.5 rounded-full"
                      style={{
                        fontSize: "10px",
                        fontWeight: 500,
                        background: p.estado === "Meta alcanzada" ? "#ECFDF5" : "#EEF2FF",
                        color: p.estado === "Meta alcanzada" ? "#10B981" : "#1B4FD8",
                      }}
                    >
                      {p.estado}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>
                      {p.beneficiarios.toLocaleString()} / {p.meta.toLocaleString()}
                    </span>
                    <span style={{ fontSize: "13px", fontWeight: 700, color: p.color }}>{pct}%</span>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full" style={{ background: "var(--muted)" }}>
                  <div className="h-2 rounded-full transition-all" style={{ width: `${pct}%`, background: p.color }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
