import { useState } from "react";
import { Search, Bell, ChevronDown, Settings, LogOut, User, MapPin, CalendarDays, HandCoins, Dumbbell } from "lucide-react";

const moduleTitles: Record<string, string> = {
  dashboard: "Dashboard Ejecutivo",
  eventos: "Eventos Deportivos",
  patrocinadores: "Patrocinadores",
  unidades: "Unidades Deportivas",
  finanzas: "Finanzas Operativas",
  inteligencia: "Inteligencia Deportiva",
  encuestas: "Encuestas Ciudadanas",
  impacto: "Impacto Social",
  reportes: "Reportes",
  administracion: "Administración",
  configuracion: "Administración",
};

const notifications = [
  { id: 1, text: "Carrera Guadalajara 5K excedió presupuesto autorizado", time: "Hace 10 min", unread: true },
  { id: 2, text: "Convenio Red Cola vence en 12 días", time: "Hace 1h", unread: true },
  { id: 3, text: "Reporte para Ayuntamiento listo para descarga", time: "Hace 3h", unread: false },
];

const searchItems = [
  { label: "Unidad Deportiva Tabachines", meta: "Gestión de unidades · Norte", module: "unidades", icon: MapPin },
  { label: "Carrera Guadalajara 5K", meta: "Evento · Atletismo · Impacto social", module: "eventos", icon: CalendarDays },
  { label: "Red Cola", meta: "Patrocinador · Convenio por vencer", module: "patrocinadores", icon: HandCoins },
  { label: "Conciliación financiera", meta: "Finanzas · Excepciones y depósitos", module: "finanzas", icon: HandCoins },
  { label: "Atletismo", meta: "Deporte · Participación ciudadana", module: "inteligencia", icon: Dumbbell },
  { label: "Las Águilas", meta: "Unidad deportiva · Ocupación 79%", module: "unidades", icon: MapPin },
];

interface TopBarProps {
  activeModule: string;
  onNavigate: (id: string) => void;
}

export function TopBar({ activeModule, onNavigate }: TopBarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [query, setQuery] = useState("");
  const unreadCount = notifications.filter((n) => n.unread).length;
  const results = query.trim().length > 1
    ? searchItems.filter((item) => `${item.label} ${item.meta}`.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <header
      className="fixed top-0 right-0 h-16 flex items-center px-6 gap-4 z-30"
      style={{
        left: "256px",
        background: "#fff",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Title */}
      <div className="flex-1">
        <h1
          style={{
            fontSize: "15px",
            fontWeight: 600,
            color: "var(--foreground)",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          {moduleTitles[activeModule]}
        </h1>
        <p style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>
          Municipio de Guadalajara · Jalisco · Junio 2025
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl transition-shadow focus-within:shadow-sm"
          style={{ background: "var(--input-background)", width: "270px" }}
        >
          <Search size={14} color="var(--muted-foreground)" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar eventos, unidades..."
            className="bg-transparent outline-none flex-1"
            style={{ fontSize: "13px", color: "var(--foreground)" }}
          />
        </div>
        {query.trim().length > 1 && (
          <div
            className="absolute right-0 top-11 w-80 rounded-2xl shadow-xl border py-2 z-50"
            style={{ background: "#fff", borderColor: "var(--border)" }}
          >
            <div className="px-4 py-2 border-b" style={{ borderColor: "var(--border)" }}>
              <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--foreground)" }}>Resultados demo</span>
            </div>
            {results.length ? results.map(({ label, meta, module, icon: Icon }) => (
              <button
                key={label}
                onClick={() => { onNavigate(module); setQuery(""); }}
                className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "var(--secondary)" }}>
                  <Icon size={14} color="var(--primary)" />
                </div>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--foreground)" }}>{label}</div>
                  <div style={{ fontSize: "10px", color: "var(--muted-foreground)" }}>{meta}</div>
                </div>
              </button>
            )) : (
              <div className="px-4 py-4" style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>
                Sin coincidencias. Prueba con Tabachines, Red Cola o Atletismo.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
          className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
          style={{ background: showNotifications ? "var(--secondary)" : "var(--input-background)" }}
        >
          <Bell size={16} color="var(--muted-foreground)" />
          {unreadCount > 0 && (
            <span
              className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-white"
              style={{ fontSize: "9px", background: "var(--destructive)" }}
            >
              {unreadCount}
            </span>
          )}
        </button>
        {showNotifications && (
          <div
            className="absolute right-0 top-11 w-80 rounded-2xl shadow-xl border py-2 z-50"
            style={{ background: "#fff", borderColor: "var(--border)" }}
          >
            <div className="px-4 py-2 border-b" style={{ borderColor: "var(--border)" }}>
              <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--foreground)" }}>Notificaciones</span>
            </div>
            {notifications.map((n) => (
              <div
                key={n.id}
                className="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
                style={{ borderLeft: n.unread ? "3px solid var(--primary)" : "3px solid transparent" }}
              >
                <p style={{ fontSize: "12px", color: "var(--foreground)", lineHeight: 1.4 }}>{n.text}</p>
                <p style={{ fontSize: "10px", color: "var(--muted-foreground)", marginTop: "2px" }}>{n.time}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Profile */}
      <div className="relative">
        <button
          onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl transition-colors"
          style={{ background: showProfile ? "var(--secondary)" : "var(--input-background)" }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-white"
            style={{ background: "var(--primary)", fontSize: "11px", fontWeight: 700 }}
          >
            DG
          </div>
          <div className="text-left">
            <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--foreground)" }}>Dir. General COMUDE</div>
            <div style={{ fontSize: "10px", color: "var(--muted-foreground)" }}>Administrador</div>
          </div>
          <ChevronDown size={12} color="var(--muted-foreground)" />
        </button>
        {showProfile && (
          <div
            className="absolute right-0 top-12 w-52 rounded-2xl shadow-xl border py-2 z-50"
            style={{ background: "#fff", borderColor: "var(--border)" }}
          >
            {[
              { icon: User, label: "Mi Perfil" },
              { icon: Settings, label: "Administración" },
              { icon: LogOut, label: "Cerrar Sesión" },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                style={{ fontSize: "13px", color: "var(--foreground)" }}
              >
                <Icon size={14} color="var(--muted-foreground)" />
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
