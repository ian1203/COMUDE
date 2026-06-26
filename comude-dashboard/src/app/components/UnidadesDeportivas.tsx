import { useState } from "react";
import { MapPin, Users, Clock, Star, Wrench, AlertCircle, GraduationCap, UserCheck, X, CalendarDays } from "lucide-react";

const unidades = [
  {
    nombre: "Unidad Deportiva Tucson",
    zona: "Norte", colonias: 8,
    capacidad: 2400, ocupacion: 94,
    horario: "6:00 - 22:00",
    deportes: ["Fútbol", "Natación", "Atletismo", "Básquetbol"],
    calificacion: 4.8, participantesActivos: 18200,
    incidencias: 2, mantenimientos: 4, clasesActivas: 18, instructores: 12,
    proximoMantenimiento: "24 Jun 2025 · Alberca semiolímpica",
    color: "#1B4FD8",
  },
  {
    nombre: "Unidad Deportiva Independencia",
    zona: "Sur", colonias: 6,
    capacidad: 1800, ocupacion: 88,
    horario: "7:00 - 21:00",
    deportes: ["Fútbol", "Voleibol", "Pádel"],
    calificacion: 4.6, participantesActivos: 15400,
    incidencias: 1, mantenimientos: 3, clasesActivas: 14, instructores: 9,
    proximoMantenimiento: "27 Jun 2025 · Cancha de fútbol",
    color: "#06B6D4",
  },
  {
    nombre: "Unidad Deportiva Plan de San Luis",
    zona: "Poniente", colonias: 7,
    capacidad: 1600, ocupacion: 85,
    horario: "6:00 - 21:00",
    deportes: ["Básquetbol", "Natación", "Atletismo"],
    calificacion: 4.7, participantesActivos: 14100,
    incidencias: 3, mantenimientos: 2, clasesActivas: 16, instructores: 10,
    proximoMantenimiento: "30 Jun 2025 · Iluminación exterior",
    color: "#10B981",
  },
  {
    nombre: "Unidad Deportiva Revolución",
    zona: "Oriente", colonias: 5,
    capacidad: 1400, ocupacion: 79,
    horario: "7:00 - 20:00",
    deportes: ["Fútbol", "Tenis", "Voleibol"],
    calificacion: 4.5, participantesActivos: 11800,
    incidencias: 4, mantenimientos: 5, clasesActivas: 11, instructores: 7,
    proximoMantenimiento: "21 Jun 2025 · Sanitarios y vestidores",
    color: "#F59E0B",
  },
  {
    nombre: "Unidad Deportiva López Mateos",
    zona: "Centro", colonias: 4,
    capacidad: 1200, ocupacion: 72,
    horario: "8:00 - 20:00",
    deportes: ["Básquetbol", "Fútbol", "Pádel"],
    calificacion: 4.4, participantesActivos: 9600,
    incidencias: 1, mantenimientos: 2, clasesActivas: 9, instructores: 6,
    proximoMantenimiento: "03 Jul 2025 · Gimnasio funcional",
    color: "#8B5CF6",
  },
];

const semaforo = (ocupacion: number) => {
  if (ocupacion >= 92) return { label: "Crítico", color: "#DC2626", bg: "#FEF2F2" };
  if (ocupacion >= 79) return { label: "Atención", color: "#F59E0B", bg: "#FFFBEB" };
  return { label: "Saludable", color: "#10B981", bg: "#ECFDF5" };
};

export function UnidadesDeportivas() {
  const [selected, setSelected] = useState<(typeof unidades)[0] | null>(null);

  return (
    <div className="flex gap-5">
      <div className="flex-1 space-y-5">
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Total Unidades", value: "5", color: "#1B4FD8" },
            { label: "Capacidad Total", value: "8,400", color: "#10B981" },
            { label: "Ocupación Prom.", value: "83.6%", color: "#F59E0B" },
            { label: "Zonas Cubiertas", value: "5", color: "#8B5CF6" },
          ].map(({ label, value, color }) => (
            <div key={label} className="rounded-2xl p-5 border transition-all hover:shadow-md hover:-translate-y-0.5" style={{ background: "#fff", borderColor: "var(--border)" }}>
              <p style={{ fontSize: "11px", color: "var(--muted-foreground)", fontWeight: 500 }}>{label.toUpperCase()}</p>
              <p style={{ fontSize: "28px", fontWeight: 700, color, fontFamily: "'Plus Jakarta Sans', sans-serif", marginTop: "4px" }}>
                {value}
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {unidades.map((u) => {
            const status = semaforo(u.ocupacion);
            return (
              <div
                key={u.nombre}
                className="rounded-2xl p-5 border hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: "#fff", borderColor: selected?.nombre === u.nombre ? "var(--primary)" : "var(--border)" }}
              >
                <div className="flex items-start gap-5">
                  <div className="w-1.5 self-stretch rounded-full shrink-0" style={{ background: status.color, minHeight: "80px" }} />

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--foreground)" }}>{u.nombre}</h3>
                          <span className="px-2 py-0.5 rounded-full" style={{ fontSize: "10px", fontWeight: 700, color: status.color, background: status.bg }}>
                            {status.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="flex items-center gap-1" style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>
                            <MapPin size={12} /> Zona {u.zona}
                          </span>
                          <span className="flex items-center gap-1" style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>
                            <Clock size={12} /> {u.horario}
                          </span>
                          <span className="flex items-center gap-1" style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>
                            <Star size={12} color="#F59E0B" fill="#F59E0B" /> {u.calificacion}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div style={{ fontSize: "24px", fontWeight: 700, color: status.color, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                          {u.ocupacion}%
                        </div>
                        <div style={{ fontSize: "10px", color: "var(--muted-foreground)" }}>ocupación</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-3 mt-4">
                      {[
                        { label: "Incidencias abiertas", value: u.incidencias, icon: AlertCircle, color: u.incidencias >= 4 ? "#DC2626" : "#F59E0B" },
                        { label: "Mantenimientos", value: u.mantenimientos, icon: Wrench, color: "#1B4FD8" },
                        { label: "Clases activas", value: u.clasesActivas, icon: GraduationCap, color: "#10B981" },
                        { label: "Instructores", value: u.instructores, icon: UserCheck, color: "#8B5CF6" },
                      ].map(({ label, value, icon: Icon, color }) => (
                        <div key={label} className="rounded-xl p-3" style={{ background: "var(--input-background)" }}>
                          <div className="flex items-center gap-1.5 mb-1">
                            <Icon size={12} color={color} />
                            <span style={{ fontSize: "10px", color: "var(--muted-foreground)" }}>{label}</span>
                          </div>
                          <div style={{ fontSize: "16px", fontWeight: 700, color: "var(--foreground)" }}>{value}</div>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div>
                        <div className="flex items-center gap-1 mb-2">
                          <Users size={12} color="var(--muted-foreground)" />
                          <span style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>Participantes activos</span>
                        </div>
                        <div style={{ fontSize: "16px", fontWeight: 700, color: "var(--foreground)" }}>
                          {u.participantesActivos.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: "11px", color: "var(--muted-foreground)", marginBottom: "8px" }}>Capacidad</div>
                        <div className="w-full h-2 rounded-full" style={{ background: "var(--muted)" }}>
                          <div className="h-2 rounded-full" style={{ width: `${u.ocupacion}%`, background: status.color }} />
                        </div>
                        <div style={{ fontSize: "11px", color: "var(--muted-foreground)", marginTop: "4px" }}>
                          {Math.round(u.capacidad * u.ocupacion / 100)} / {u.capacidad} cupos
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>Disciplinas</span>
                          <button
                            onClick={() => setSelected(u)}
                            className="px-3 py-1.5 rounded-lg transition-all hover:shadow-sm active:scale-95"
                            style={{ fontSize: "11px", fontWeight: 600, color: "var(--primary)", background: "var(--secondary)" }}
                          >
                            Ver operación
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {u.deportes.map((d) => (
                            <span key={d} className="px-2 py-0.5 rounded-full" style={{ fontSize: "10px", fontWeight: 500, background: u.color + "15", color: u.color }}>
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selected && (
        <div className="w-96 rounded-2xl border flex-shrink-0 overflow-hidden transition-all duration-200" style={{ background: "#fff", borderColor: "var(--border)", maxHeight: "calc(100vh - 150px)" }}>
          <div className="px-5 py-4 border-b flex items-start justify-between" style={{ borderColor: "var(--border)" }}>
            <div>
              <h4 style={{ fontSize: "13px", fontWeight: 700, color: "var(--foreground)" }}>{selected.nombre}</h4>
              <p style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>Gestión de unidades · operación diaria</p>
            </div>
            <button onClick={() => setSelected(null)} className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
              <X size={14} color="var(--muted-foreground)" />
            </button>
          </div>
          <div className="p-5 space-y-4 overflow-y-auto" style={{ maxHeight: "calc(100vh - 220px)" }}>
            <div className="grid grid-cols-2 gap-3">
              {[
                ["Capacidad", selected.capacidad.toLocaleString()],
                ["Ocupación", `${selected.ocupacion}%`],
                ["Incidencias", selected.incidencias.toString()],
                ["Clases activas", selected.clasesActivas.toString()],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl p-3" style={{ background: "var(--input-background)" }}>
                  <div style={{ fontSize: "10px", color: "var(--muted-foreground)" }}>{label}</div>
                  <div style={{ fontSize: "16px", fontWeight: 700, color: "var(--foreground)" }}>{value}</div>
                </div>
              ))}
            </div>

            <div>
              <h5 style={{ fontSize: "12px", fontWeight: 700, color: "var(--foreground)", marginBottom: "10px" }}>Calendario de clases</h5>
              {["Natación 07:00 · 28 alumnos", "Fútbol infantil 16:00 · 42 alumnos", "Básquetbol 18:00 · 24 alumnos"].map((item) => (
                <div key={item} className="flex items-center gap-2 py-2 border-b" style={{ borderColor: "var(--border)" }}>
                  <CalendarDays size={13} color="var(--primary)" />
                  <span style={{ fontSize: "12px", color: "var(--foreground)" }}>{item}</span>
                </div>
              ))}
            </div>

            <div>
              <h5 style={{ fontSize: "12px", fontWeight: 700, color: "var(--foreground)", marginBottom: "10px" }}>Incidencias</h5>
              {["Revisión de luminarias", "Reporte de humedad en vestidores"].map((item) => (
                <div key={item} className="rounded-xl px-3 py-2 mb-2" style={{ background: "#FFFBEB" }}>
                  <span style={{ fontSize: "12px", color: "#92400E" }}>{item}</span>
                </div>
              ))}
            </div>

            <div className="rounded-xl p-3" style={{ background: "var(--secondary)" }}>
              <div style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>Próximo mantenimiento</div>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--foreground)", marginTop: "2px" }}>
                {selected.proximoMantenimiento}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
