import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, Radar, LineChart, Line, Legend,
} from "recharts";

const edadData = [
  { grupo: "Infantil\n(6-12)", cantidad: 12400, color: "#1B4FD8" },
  { grupo: "Juvenil\n(13-17)", cantidad: 9800, color: "#06B6D4" },
  { grupo: "Adultos\n(18-59)", cantidad: 22600, color: "#10B981" },
  { grupo: "Adultos+\n(60+)", cantidad: 5200, color: "#F59E0B" },
];

const generoData = [
  { name: "Hombres", value: 54, color: "#1B4FD8" },
  { name: "Mujeres", value: 41, color: "#EC4899" },
  { name: "No binario", value: 5, color: "#8B5CF6" },
];

const colonias = [
  { colonia: "Tabachines", participantes: 4820 },
  { colonia: "Santa Margarita", participantes: 4210 },
  { colonia: "Jardines", participantes: 3890 },
  { colonia: "Las Águilas", participantes: 3640 },
  { colonia: "La Tuzanía", participantes: 3410 },
  { colonia: "Arboledas", participantes: 2980 },
  { colonia: "Guadalajara Centro", participantes: 2750 },
];

const tendenciasData = [
  { mes: "Ene", futbol: 820, padel: 120, natacion: 480, atletismo: 310 },
  { mes: "Feb", futbol: 860, padel: 145, natacion: 510, atletismo: 330 },
  { mes: "Mar", futbol: 900, padel: 180, natacion: 540, atletismo: 360 },
  { mes: "Abr", futbol: 920, padel: 220, natacion: 560, atletismo: 390 },
  { mes: "May", futbol: 950, padel: 280, natacion: 580, atletismo: 410 },
  { mes: "Jun", futbol: 980, padel: 340, natacion: 600, atletismo: 440 },
];

const emergentesData = [
  { deporte: "Pádel", score: 92 },
  { deporte: "CrossFit", score: 78 },
  { deporte: "Calistenia", score: 71 },
  { deporte: "Yoga", score: 68 },
  { deporte: "Ciclismo", score: 65 },
  { deporte: "Escalada", score: 58 },
];

const radarData = [
  { disciplina: "Fútbol", score: 95 },
  { disciplina: "Natación", score: 74 },
  { disciplina: "Básquetbol", score: 82 },
  { disciplina: "Atletismo", score: 68 },
  { disciplina: "Pádel", score: 61 },
  { disciplina: "Voleibol", score: 70 },
];

export function InteligenciaDeportiva() {
  return (
    <div className="space-y-5">
      {/* Header KPIs */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Índice de Diversificación", value: "6.4", sub: "deportes activos promedio/unidad", trend: "+0.8", up: true, color: "#1B4FD8", bg: "#EEF2FF" },
          { label: "Deporte Emergente #1", value: "Pádel", sub: "Crecimiento: +183% en 12 meses", trend: "+183%", up: true, color: "#10B981", bg: "#ECFDF5" },
          { label: "Predicción Q3 2025", value: "22,400", sub: "participantes proyectados", trend: "+8.2%", up: true, color: "#8B5CF6", bg: "#F5F3FF" },
        ].map(({ label, value, sub, trend, up, color, bg }) => (
          <div key={label} className="rounded-2xl p-5 border" style={{ background: "#fff", borderColor: "var(--border)" }}>
            <p style={{ fontSize: "11px", color: "var(--muted-foreground)", fontWeight: 500, letterSpacing: "0.04em" }}>
              {label.toUpperCase()}
            </p>
            <p style={{ fontSize: "24px", fontWeight: 700, color: "var(--foreground)", fontFamily: "'Plus Jakarta Sans', sans-serif", marginTop: "4px" }}>
              {value}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <span style={{ fontSize: "12px", fontWeight: 600, color: up ? "#10B981" : "#DC2626" }}>{trend}</span>
              <span style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>{sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Row 1 */}
      <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {/* Participación por edad */}
        <div className="rounded-2xl p-5 border" style={{ background: "#fff", borderColor: "var(--border)" }}>
          <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--foreground)", marginBottom: "4px" }}>
            Participación por Grupo de Edad
          </h3>
          <p style={{ fontSize: "11px", color: "var(--muted-foreground)", marginBottom: "16px" }}>Segmentación etaria de usuarios activos</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={edadData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F2F7" vertical={false} />
              <XAxis dataKey="grupo" tick={{ fontSize: 11, fill: "#6B7A99" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#6B7A99" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: "12px", border: "1px solid #DDE1EE", fontSize: "12px" }}
                formatter={(v) => [v.toLocaleString(), "Participantes"]}
              />
              <Bar dataKey="cantidad" radius={[6, 6, 0, 0]}>
                {edadData.map((d, i) => (
                  <Cell key={i} fill={d.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {edadData.map((d) => (
              <div key={d.grupo} className="text-center">
                <div style={{ fontSize: "13px", fontWeight: 700, color: d.color }}>{d.cantidad.toLocaleString()}</div>
                <div style={{ fontSize: "9px", color: "var(--muted-foreground)" }}>{d.grupo.replace("\n", " ")}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Radar de disciplinas */}
        <div className="rounded-2xl p-5 border" style={{ background: "#fff", borderColor: "var(--border)" }}>
          <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--foreground)", marginBottom: "4px" }}>
            Radar de Disciplinas
          </h3>
          <p style={{ fontSize: "11px", color: "var(--muted-foreground)", marginBottom: "8px" }}>Índice de demanda por disciplina</p>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#DDE1EE" />
              <PolarAngleAxis dataKey="disciplina" tick={{ fontSize: 11, fill: "#6B7A99" }} />
              <Radar name="Score" dataKey="score" stroke="#1B4FD8" fill="#1B4FD8" fillOpacity={0.18} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 340px" }}>
        {/* Tendencias */}
        <div className="rounded-2xl p-5 border" style={{ background: "#fff", borderColor: "var(--border)" }}>
          <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--foreground)", marginBottom: "4px" }}>
            Tendencias Deportivas 2025
          </h3>
          <p style={{ fontSize: "11px", color: "var(--muted-foreground)", marginBottom: "16px" }}>
            Evolución mensual de disciplinas clave
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={tendenciasData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F2F7" />
              <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "#6B7A99" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#6B7A99" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #DDE1EE", fontSize: "12px" }} />
              <Legend wrapperStyle={{ fontSize: "11px" }} />
              <Line type="monotone" dataKey="futbol" name="Fútbol" stroke="#1B4FD8" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="padel" name="Pádel" stroke="#10B981" strokeWidth={2} dot={false} strokeDasharray="5 3" />
              <Line type="monotone" dataKey="natacion" name="Natación" stroke="#06B6D4" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="atletismo" name="Atletismo" stroke="#F59E0B" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Deportes emergentes */}
        <div className="rounded-2xl p-5 border" style={{ background: "#fff", borderColor: "var(--border)" }}>
          <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--foreground)", marginBottom: "4px" }}>
            Deportes Emergentes
          </h3>
          <p style={{ fontSize: "11px", color: "var(--muted-foreground)", marginBottom: "16px" }}>Score de crecimiento proyectado</p>
          <div className="space-y-4">
            {emergentesData.map((d, i) => (
              <div key={d.deporte}>
                <div className="flex justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-5 h-5 rounded-md flex items-center justify-center text-white"
                      style={{ background: ["#1B4FD8", "#06B6D4", "#10B981", "#F59E0B", "#8B5CF6", "#F97316"][i], fontSize: "9px", fontWeight: 700 }}
                    >
                      {i + 1}
                    </span>
                    <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--foreground)" }}>{d.deporte}</span>
                  </div>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--foreground)" }}>{d.score}</span>
                </div>
                <div className="w-full h-1.5 rounded-full" style={{ background: "var(--muted)" }}>
                  <div
                    className="h-1.5 rounded-full"
                    style={{
                      width: `${d.score}%`,
                      background: ["#1B4FD8", "#06B6D4", "#10B981", "#F59E0B", "#8B5CF6", "#F97316"][i],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mapa de calor — colonias */}
      <div className="rounded-2xl p-5 border" style={{ background: "#fff", borderColor: "var(--border)" }}>
        <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--foreground)", marginBottom: "4px" }}>
          Mapa de Calor — Demanda por Colonia
        </h3>
        <p style={{ fontSize: "11px", color: "var(--muted-foreground)", marginBottom: "16px" }}>Top colonias con mayor participación deportiva</p>
        <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(7, 1fr)" }}>
          {colonias.map((c, i) => {
            const maxVal = colonias[0].participantes;
            const pct = c.participantes / maxVal;
            const opacity = 0.2 + pct * 0.8;
            return (
              <div
                key={c.colonia}
                className="rounded-xl p-3 text-center hover:scale-105 transition-transform cursor-pointer"
                style={{ background: `rgba(27,79,216,${opacity})` }}
              >
                <div style={{ fontSize: "14px", fontWeight: 700, color: pct > 0.5 ? "#fff" : "#0D1B3E" }}>
                  {(c.participantes / 1000).toFixed(1)}K
                </div>
                <div style={{ fontSize: "10px", color: pct > 0.5 ? "rgba(255,255,255,0.8)" : "var(--muted-foreground)", marginTop: "2px" }}>
                  {c.colonia}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
