import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";
import { Star, TrendingUp, MessageSquare, ThumbsUp } from "lucide-react";

const satisfaccionItems = [
  { label: "Satisfacción General", score: 4.6, pct: 92, color: "#1B4FD8" },
  { label: "Limpieza", score: 4.8, pct: 96, color: "#10B981" },
  { label: "Seguridad", score: 4.4, pct: 88, color: "#06B6D4" },
  { label: "Organización", score: 4.7, pct: 94, color: "#8B5CF6" },
  { label: "Atención al Ciudadano", score: 4.5, pct: 90, color: "#F59E0B" },
  { label: "Instalaciones", score: 4.3, pct: 86, color: "#F97316" },
];

const npsData = [
  { label: "Promotores (9-10)", value: 68, color: "#10B981" },
  { label: "Pasivos (7-8)", value: 24, color: "#F59E0B" },
  { label: "Detractores (0-6)", value: 8, color: "#DC2626" },
];

const comentariosRecientes = [
  { texto: "Excelente organización de los eventos, el personal fue muy amable.", tipo: "positivo", evento: "Carrera 5K", tiempo: "Hace 2 días" },
  { texto: "Las instalaciones de natación están muy bien mantenidas.", tipo: "positivo", evento: "Liga Natación", tiempo: "Hace 3 días" },
  { texto: "Sería bueno ampliar los horarios en fin de semana.", tipo: "sugerencia", evento: "General", tiempo: "Hace 4 días" },
  { texto: "El evento estuvo perfectamente coordinado, volvería sin dudarlo.", tipo: "positivo", evento: "Festival Familiar", tiempo: "Hace 5 días" },
  { texto: "Falló el sistema de hidratación a mitad del recorrido.", tipo: "negativo", evento: "Carrera 5K", tiempo: "Hace 6 días" },
];

const palabras = [
  { text: "excelente", size: 28, color: "#1B4FD8" },
  { text: "organización", size: 22, color: "#06B6D4" },
  { text: "limpieza", size: 20, color: "#10B981" },
  { text: "seguridad", size: 18, color: "#8B5CF6" },
  { text: "amable", size: 22, color: "#F59E0B" },
  { text: "deporte", size: 26, color: "#1B4FD8" },
  { text: "familia", size: 18, color: "#EC4899" },
  { text: "calidad", size: 20, color: "#06B6D4" },
  { text: "comunidad", size: 16, color: "#10B981" },
  { text: "mejorar", size: 14, color: "#F97316" },
  { text: "instalaciones", size: 18, color: "#8B5CF6" },
  { text: "horario", size: 16, color: "#F59E0B" },
  { text: "Guadalajara", size: 24, color: "#1B4FD8" },
  { text: "gracias", size: 16, color: "#10B981" },
  { text: "participación", size: 15, color: "#06B6D4" },
];

const sentimientoData = [
  { mes: "Ene", positivo: 71, neutro: 20, negativo: 9 },
  { mes: "Feb", positivo: 73, neutro: 19, negativo: 8 },
  { mes: "Mar", positivo: 76, neutro: 17, negativo: 7 },
  { mes: "Abr", positivo: 78, neutro: 16, negativo: 6 },
  { mes: "May", positivo: 80, neutro: 15, negativo: 5 },
  { mes: "Jun", positivo: 82, neutro: 14, negativo: 4 },
];

const tipoColors: Record<string, { bg: string; color: string; label: string }> = {
  positivo: { bg: "#ECFDF5", color: "#10B981", label: "Positivo" },
  sugerencia: { bg: "#FFFBEB", color: "#F59E0B", label: "Sugerencia" },
  negativo: { bg: "#FEF2F2", color: "#DC2626", label: "Negativo" },
};

export function EncuestasCiudadanas() {
  const nps = 68 - 8; // promotores - detractores

  return (
    <div className="space-y-5">
      {/* Top KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Satisfacción General", value: "92%", icon: Star, color: "#1B4FD8", bg: "#EEF2FF", sub: "4.6 / 5.0 estrellas" },
          { label: "NPS Score", value: nps.toString(), icon: TrendingUp, color: "#10B981", bg: "#ECFDF5", sub: "Excelente (>50)" },
          { label: "Respuestas Totales", value: "8,412", icon: MessageSquare, color: "#8B5CF6", bg: "#F5F3FF", sub: "Jun 2025" },
          { label: "Comentarios Positivos", value: "82%", icon: ThumbsUp, color: "#F59E0B", bg: "#FFFBEB", sub: "del total de respuestas" },
        ].map(({ label, value, icon: Icon, color, bg, sub }) => (
          <div key={label} className="rounded-2xl p-5 border" style={{ background: "#fff", borderColor: "var(--border)" }}>
            <div className="flex items-start justify-between mb-2">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: bg }}>
                <Icon size={16} color={color} />
              </div>
            </div>
            <p style={{ fontSize: "26px", fontWeight: 700, color: "var(--foreground)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {value}
            </p>
            <p style={{ fontSize: "11px", color: "var(--muted-foreground)", marginTop: "2px" }}>{label}</p>
            <p style={{ fontSize: "10px", color, fontWeight: 500, marginTop: "2px" }}>{sub}</p>
          </div>
        ))}
      </div>

      {/* Row 1 */}
      <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 300px" }}>
        {/* Satisfacción por indicador */}
        <div className="rounded-2xl p-5 border" style={{ background: "#fff", borderColor: "var(--border)" }}>
          <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--foreground)", marginBottom: "16px" }}>
            Satisfacción por Indicador
          </h3>
          <div className="space-y-5">
            {satisfaccionItems.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-2">
                  <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--foreground)" }}>{item.label}</span>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={11}
                          color="#F59E0B"
                          fill={s <= Math.round(item.score) ? "#F59E0B" : "none"}
                        />
                      ))}
                    </div>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--foreground)" }}>{item.score}</span>
                    <span style={{ fontSize: "11px", fontWeight: 600, color: item.color }}>{item.pct}%</span>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full" style={{ background: "var(--muted)" }}>
                  <div className="h-2 rounded-full transition-all" style={{ width: `${item.pct}%`, background: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NPS */}
        <div className="rounded-2xl p-5 border" style={{ background: "#fff", borderColor: "var(--border)" }}>
          <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--foreground)", marginBottom: "4px" }}>
            Net Promoter Score
          </h3>
          <p style={{ fontSize: "11px", color: "var(--muted-foreground)", marginBottom: "12px" }}>Distribución de respuestas</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={npsData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={3}>
                {npsData.map((_, i) => (
                  <Cell key={i} fill={npsData[i].color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #DDE1EE", fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {npsData.map((n) => (
              <div key={n.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: n.color }} />
                  <span style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>{n.label}</span>
                </div>
                <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--foreground)" }}>{n.value}%</span>
              </div>
            ))}
          </div>
          <div
            className="mt-4 rounded-xl p-3 text-center"
            style={{ background: "#ECFDF5" }}
          >
            <div style={{ fontSize: "28px", fontWeight: 800, color: "#10B981", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{nps}</div>
            <div style={{ fontSize: "11px", color: "#6B7280" }}>NPS Score</div>
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {/* Análisis de sentimiento */}
        <div className="rounded-2xl p-5 border" style={{ background: "#fff", borderColor: "var(--border)" }}>
          <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--foreground)", marginBottom: "4px" }}>
            Análisis de Sentimiento
          </h3>
          <p style={{ fontSize: "11px", color: "var(--muted-foreground)", marginBottom: "12px" }}>Tendencia mensual de opiniones ciudadanas</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={sentimientoData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F2F7" vertical={false} />
              <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "#6B7A99" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#6B7A99" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #DDE1EE", fontSize: "12px" }} />
              <Bar dataKey="positivo" name="Positivo" stackId="a" fill="#10B981" radius={[0, 0, 0, 0]} />
              <Bar dataKey="neutro" name="Neutro" stackId="a" fill="#F59E0B" />
              <Bar dataKey="negativo" name="Negativo" stackId="a" fill="#DC2626" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Nube de palabras */}
        <div className="rounded-2xl p-5 border" style={{ background: "#fff", borderColor: "var(--border)" }}>
          <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--foreground)", marginBottom: "4px" }}>
            Nube de Palabras Frecuentes
          </h3>
          <p style={{ fontSize: "11px", color: "var(--muted-foreground)", marginBottom: "12px" }}>Términos más mencionados en comentarios ciudadanos</p>
          <div className="flex flex-wrap gap-2 items-center justify-center py-4" style={{ minHeight: "160px" }}>
            {palabras.map((p) => (
              <span
                key={p.text}
                className="cursor-pointer hover:opacity-70 transition-opacity"
                style={{ fontSize: `${p.size * 0.6}px`, fontWeight: p.size > 22 ? 700 : 500, color: p.color }}
              >
                {p.text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Comentarios recientes */}
      <div className="rounded-2xl p-5 border" style={{ background: "#fff", borderColor: "var(--border)" }}>
        <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--foreground)", marginBottom: "16px" }}>
          Comentarios Ciudadanos Recientes
        </h3>
        <div className="space-y-3">
          {comentariosRecientes.map((c, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3 rounded-xl"
              style={{ background: "var(--input-background)" }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shrink-0"
                style={{ background: tipoColors[c.tipo].color, fontSize: "11px" }}
              >
                C
              </div>
              <div className="flex-1">
                <p style={{ fontSize: "13px", color: "var(--foreground)", lineHeight: 1.5 }}>{c.texto}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span
                    className="px-2 py-0.5 rounded-full"
                    style={{ fontSize: "10px", fontWeight: 500, ...tipoColors[c.tipo] }}
                  >
                    {tipoColors[c.tipo].label}
                  </span>
                  <span style={{ fontSize: "10px", color: "var(--muted-foreground)" }}>{c.evento}</span>
                  <span style={{ fontSize: "10px", color: "var(--muted-foreground)" }}>{c.tiempo}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
