import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  Activity,
  Bell,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Dumbbell,
  Home,
  MapPin,
  MessageSquareText,
  Search,
  Star,
  Ticket,
  User,
  UserPlus,
  WalletCards,
} from "lucide-react";
import "./mobile.css";

type MobileScreen =
  | "splash"
  | "login"
  | "register"
  | "home"
  | "units"
  | "unitDetail"
  | "reservations"
  | "classes"
  | "events"
  | "eventDetail"
  | "card"
  | "notifications"
  | "profile"
  | "survey";

const units = [
  {
    id: "tucson",
    name: "Unidad Deportiva Tucson",
    zone: "Norte",
    distance: "1.8 km",
    occupancy: 74,
    sports: ["Natacion", "Futbol", "Atletismo"],
    courts: "4 canchas disponibles",
    address: "Zona Norte, Guadalajara",
  },
  {
    id: "independencia",
    name: "Unidad Deportiva Independencia",
    zone: "Oriente",
    distance: "3.4 km",
    occupancy: 79,
    sports: ["Tenis", "Voleibol", "Futbol"],
    courts: "2 canchas disponibles",
    address: "Col. Independencia, Guadalajara",
  },
  {
    id: "revolucion",
    name: "Unidad Deportiva Revolución",
    zone: "Centro",
    distance: "5.1 km",
    occupancy: 68,
    sports: ["Basquetbol", "Padel", "Futbol"],
    courts: "3 espacios disponibles",
    address: "Zona Centro, Guadalajara",
  },
];

const classes = [
  { name: "Natacion principiante", unit: "Tucson", time: "Lun y Mie 07:00", spots: 8 },
  { name: "Futbol infantil", unit: "Independencia", time: "Mar y Jue 16:00", spots: 12 },
  { name: "Acondicionamiento", unit: "Revolución", time: "Sab 08:30", spots: 18 },
];

const events = [
  {
    id: "5k",
    name: "Carrera Guadalajara 5K",
    date: "15 Mar 2025",
    place: "Parque Metropolitano",
    seats: 420,
    category: "Atletismo",
    detail: "Ruta familiar con hidratacion, medalla y registro digital.",
  },
  {
    id: "familiar",
    name: "Festival Deportivo Familiar",
    date: "10 May 2025",
    place: "Unidad Tucson",
    seats: 680,
    category: "Multideporte",
    detail: "Actividades para ninas, ninos, jovenes y adultos.",
  },
  {
    id: "padel",
    name: "Torneo Abierto de Padel",
    date: "18 Jun 2025",
    place: "Unidad Revolución",
    seats: 48,
    category: "Padel",
    detail: "Registro por pareja, fase de grupos y final municipal.",
  },
];

const notifications = [
  { title: "Reserva confirmada", text: "Cancha de futbol en Tabachines, hoy 18:00." },
  { title: "Clase disponible", text: "Se abrieron 8 lugares para natacion principiante." },
  { title: "Encuesta pendiente", text: "Comparte tu opinion sobre la ultima visita." },
];

const navItems = [
  { id: "home", label: "Inicio", icon: Home },
  { id: "units", label: "Unidades", icon: MapPin },
  { id: "reservations", label: "Reservas", icon: CalendarDays },
  { id: "events", label: "Eventos", icon: Ticket },
  { id: "profile", label: "Perfil", icon: User },
] as const;

function PhoneShell({ children, showNav, screen, navigate }: {
  children: ReactNode;
  showNav: boolean;
  screen: MobileScreen;
  navigate: (screen: MobileScreen) => void;
}) {
  return (
    <div className="citizen-app">
      <div className="phone-frame">
        <div className="phone-screen">
          <div className="phone-notch" />
          {children}
          {showNav && (
            <nav className="mobile-bottom-nav" aria-label="Navegacion ciudadana">
              {navItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  className={`mobile-nav-item ${screen === id ? "active" : ""}`}
                  onClick={() => navigate(id)}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="mobile-status">
      <span>9:41</span>
      <span>COMUDE Guadalajara</span>
    </div>
  );
}

function Header({ eyebrow, title, subtitle, onBack, action }: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  onBack?: () => void;
  action?: ReactNode;
}) {
  return (
    <>
      <StatusBar />
      <div className="mobile-header">
        <div className="mobile-row" style={{ alignItems: "flex-start" }}>
          {onBack && (
            <button className="mobile-button secondary" style={{ width: 42, height: 42, padding: 0 }} onClick={onBack}>
              <ChevronLeft size={18} />
            </button>
          )}
          <div>
            <div className="mobile-eyebrow">{eyebrow}</div>
            <h1 className="mobile-title">{title}</h1>
            {subtitle && <p className="mobile-subtitle">{subtitle}</p>}
          </div>
        </div>
        {action}
      </div>
    </>
  );
}

function Splash({ navigate }: { navigate: (screen: MobileScreen) => void }) {
  return (
    <div className="splash-screen">
      <div>
        <div className="splash-logo">
          <Activity size={36} />
        </div>
        <h1 style={{ fontSize: 34, lineHeight: 1.08, fontWeight: 900, margin: "26px 0 10px" }}>
          COMUDE Guadalajara
        </h1>
        <p style={{ fontSize: 15, lineHeight: 1.5, opacity: 0.82, margin: 0 }}>
          El deporte cerca de ti.
        </p>
      </div>
      <div>
        <button className="mobile-button" style={{ background: "#fff", color: "#1B4FD8" }} onClick={() => navigate("login")}>
          Iniciar
        </button>
        <button className="mobile-button ghost" style={{ color: "#fff", marginTop: 8 }} onClick={() => navigate("home")}>
          Explorar como invitado
        </button>
      </div>
    </div>
  );
}

function AuthScreen({ mode, navigate }: { mode: "login" | "register"; navigate: (screen: MobileScreen) => void }) {
  const isRegister = mode === "register";
  return (
    <div className="mobile-view">
      <StatusBar />
      <div className="mobile-card hero-card" style={{ marginTop: 18 }}>
        <div className="mobile-chip" style={{ background: "rgba(255,255,255,0.18)", color: "#fff" }}>
          App Ciudadana
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 900, lineHeight: 1.1, margin: "18px 0 8px" }}>
          {isRegister ? "Crea tu cuenta" : "Bienvenido de vuelta"}
        </h1>
        <p style={{ fontSize: 13, opacity: 0.82, margin: 0 }}>
          Accede a reservas, clases, eventos y tu credencial digital.
        </p>
      </div>

      <div className="mobile-card" style={{ marginTop: 14 }}>
        {isRegister && <input className="mobile-input" placeholder="Nombre completo" />}
        <input className="mobile-input" placeholder="Correo o telefono" />
        <input className="mobile-input" placeholder="Contrasena" type="password" />
        {isRegister && <input className="mobile-input" placeholder="Colonia" />}
        <button className="mobile-button" style={{ marginTop: 14 }} onClick={() => navigate("home")}>
          {isRegister ? "Registrarme" : "Entrar"}
        </button>
        <button className="mobile-button ghost" onClick={() => navigate(isRegister ? "login" : "register")}>
          {isRegister ? "Ya tengo cuenta" : "Crear cuenta ciudadana"}
        </button>
      </div>
    </div>
  );
}

function HomeScreen({ navigate }: { navigate: (screen: MobileScreen) => void }) {
  return (
    <div className="mobile-view">
      <Header
        eyebrow="Hola, Andrea"
        title="COMUDE Guadalajara"
        subtitle="Accesos rapidos a servicios ciudadanos."
        action={(
          <button className="mobile-button secondary" style={{ width: 42, height: 42, padding: 0 }} onClick={() => navigate("notifications")}>
            <Bell size={18} />
          </button>
        )}
      />

      <div className="mobile-card hero-card">
        <div className="mobile-row" style={{ justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 12, opacity: 0.78 }}>Proxima reserva</div>
            <div style={{ fontSize: 20, fontWeight: 900, marginTop: 4 }}>Cancha futbol 7</div>
            <div style={{ fontSize: 12, opacity: 0.78, marginTop: 4 }}>Hoy 18:00 · Tabachines</div>
          </div>
          <CalendarDays size={34} />
        </div>
      </div>

      <h2 className="mobile-section-title">Servicios</h2>
      <div className="mobile-grid">
        {[
          { label: "Reservar cancha", icon: CalendarDays, screen: "reservations" },
          { label: "Unirme a clase", icon: Dumbbell, screen: "classes" },
          { label: "Credencial digital", icon: WalletCards, screen: "card" },
          { label: "Encuesta", icon: MessageSquareText, screen: "survey" },
        ].map(({ label, icon: Icon, screen }) => (
          <button key={label} className="list-button" onClick={() => navigate(screen as MobileScreen)}>
            <div className="mobile-icon"><Icon size={20} /></div>
            <div style={{ fontSize: 13, fontWeight: 800, marginTop: 10 }}>{label}</div>
          </button>
        ))}
      </div>

      <h2 className="mobile-section-title">Cerca de ti</h2>
      {units.slice(0, 2).map((unit) => (
        <button key={unit.id} className="list-button" onClick={() => navigate("unitDetail")}>
          <div className="mobile-row">
            <div className="mobile-icon"><MapPin size={19} /></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 900 }}>{unit.name}</div>
              <div className="mobile-subtitle">{unit.distance} · {unit.courts}</div>
            </div>
            <ChevronRight size={18} color="#6B7A99" />
          </div>
        </button>
      ))}
    </div>
  );
}

function UnitsScreen({ navigate, selectUnit }: { navigate: (screen: MobileScreen) => void; selectUnit: (id: string) => void }) {
  return (
    <div className="mobile-view">
      <Header eyebrow="Instalaciones" title="Unidades deportivas" subtitle="Encuentra espacios, horarios y disponibilidad." />
      <div className="mobile-card mobile-row">
        <Search size={16} color="#6B7A99" />
        <input className="mobile-input" style={{ border: 0, background: "transparent", padding: 0 }} placeholder="Buscar unidad o deporte" />
      </div>
      <div style={{ marginTop: 12 }}>
        {units.map((unit) => (
          <button
            key={unit.id}
            className="list-button"
            onClick={() => { selectUnit(unit.id); navigate("unitDetail"); }}
          >
            <div className="facility-image">{unit.zone}</div>
            <div className="mobile-row" style={{ marginTop: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 900 }}>{unit.name}</div>
                <div className="mobile-subtitle">{unit.address}</div>
              </div>
              <span className="mobile-chip">{unit.occupancy}%</span>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 12 }}>
              {unit.sports.map((sport) => <span key={sport} className="mobile-chip">{sport}</span>)}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function UnitDetailScreen({ unitId, navigate }: { unitId: string; navigate: (screen: MobileScreen) => void }) {
  const unit = units.find((item) => item.id === unitId) || units[0];
  return (
    <div className="mobile-view">
      <Header eyebrow="Detalle de unidad" title={unit.name} subtitle={unit.address} onBack={() => navigate("units")} />
      <div className="facility-image" style={{ height: 180 }}>{unit.zone}</div>
      <div className="mobile-card" style={{ marginTop: 12 }}>
        <div className="mobile-grid">
          <div><div className="mobile-eyebrow">Disponibilidad</div><strong>{unit.courts}</strong></div>
          <div><div className="mobile-eyebrow">Ocupacion</div><strong>{unit.occupancy}%</strong></div>
          <div><div className="mobile-eyebrow">Distancia</div><strong>{unit.distance}</strong></div>
          <div><div className="mobile-eyebrow">Horario</div><strong>6:00 - 22:00</strong></div>
        </div>
        <button className="mobile-button" style={{ marginTop: 16 }} onClick={() => navigate("reservations")}>Reservar cancha</button>
        <button className="mobile-button secondary" style={{ marginTop: 10 }} onClick={() => navigate("classes")}>Ver clases</button>
      </div>
    </div>
  );
}

function ReservationsScreen() {
  const [selected, setSelected] = useState("18:00");
  return (
    <div className="mobile-view">
      <Header eyebrow="Reservas" title="Reserva una cancha" subtitle="Selecciona unidad, espacio y horario disponible." />
      <div className="mobile-card">
        <select className="mobile-input" defaultValue="tabachines">
          <option value="tucson">Unidad Deportiva Tucson</option>
          <option value="independencia">Unidad Deportiva Independencia</option>
          <option value="revolucion">Unidad Deportiva Revolución</option>
        </select>
        <select className="mobile-input" defaultValue="futbol">
          <option value="futbol">Cancha de futbol</option>
          <option value="tenis">Cancha de tenis</option>
          <option value="padel">Cancha de padel</option>
        </select>
      </div>
      <h2 className="mobile-section-title">Horarios disponibles</h2>
      <div className="mobile-grid">
        {["07:00", "08:00", "17:00", "18:00", "19:00", "20:00"].map((time) => (
          <button key={time} className={`rating-button ${selected === time ? "active" : ""}`} onClick={() => setSelected(time)}>
            {time}
          </button>
        ))}
      </div>
      <div className="mobile-card" style={{ marginTop: 14 }}>
        <div className="mobile-row">
          <CreditCard size={18} color="#1B4FD8" />
          <div>
            <div style={{ fontSize: 13, fontWeight: 900 }}>Reserva sin pago en linea</div>
            <div className="mobile-subtitle">Presenta tu credencial digital al llegar.</div>
          </div>
        </div>
        <button className="mobile-button" style={{ marginTop: 14 }}>Confirmar reserva {selected}</button>
      </div>
    </div>
  );
}

function ClassesScreen() {
  return (
    <div className="mobile-view">
      <Header eyebrow="Clases" title="Inscripciones abiertas" subtitle="Programas deportivos municipales." />
      {classes.map((item) => (
        <div key={item.name} className="mobile-card">
          <div className="mobile-row">
            <div className="mobile-icon"><Dumbbell size={19} /></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 900 }}>{item.name}</div>
              <div className="mobile-subtitle">{item.unit} · {item.time}</div>
            </div>
            <span className="mobile-chip">{item.spots} lugares</span>
          </div>
          <button className="mobile-button secondary" style={{ marginTop: 12 }}>Inscribirme</button>
        </div>
      ))}
    </div>
  );
}

function EventsScreen({ navigate, selectEvent }: { navigate: (screen: MobileScreen) => void; selectEvent: (id: string) => void }) {
  return (
    <div className="mobile-view">
      <Header eyebrow="Eventos" title="Eventos deportivos" subtitle="Registro ciudadano para actividades municipales." />
      {events.map((event) => (
        <button
          key={event.id}
          className="list-button"
          onClick={() => { selectEvent(event.id); navigate("eventDetail"); }}
        >
          <div className="mobile-row">
            <div className="mobile-icon"><Ticket size={19} /></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 900 }}>{event.name}</div>
              <div className="mobile-subtitle">{event.date} · {event.place}</div>
            </div>
            <ChevronRight size={18} color="#6B7A99" />
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <span className="mobile-chip">{event.category}</span>
            <span className="mobile-chip">{event.seats} lugares</span>
          </div>
        </button>
      ))}
    </div>
  );
}

function EventDetailScreen({ eventId, navigate }: { eventId: string; navigate: (screen: MobileScreen) => void }) {
  const event = events.find((item) => item.id === eventId) || events[0];
  return (
    <div className="mobile-view">
      <Header eyebrow="Registro a evento" title={event.name} subtitle={event.place} onBack={() => navigate("events")} />
      <div className="mobile-card hero-card">
        <div className="mobile-chip" style={{ background: "rgba(255,255,255,0.18)", color: "#fff" }}>{event.category}</div>
        <h2 style={{ fontSize: 22, fontWeight: 900, margin: "14px 0 4px" }}>{event.date}</h2>
        <p style={{ fontSize: 13, opacity: 0.84 }}>{event.detail}</p>
      </div>
      <div className="mobile-card">
        <div className="mobile-grid">
          <div><div className="mobile-eyebrow">Lugares</div><strong>{event.seats}</strong></div>
          <div><div className="mobile-eyebrow">Registro</div><strong>Abierto</strong></div>
        </div>
        <button className="mobile-button" style={{ marginTop: 16 }}>Registrarme al evento</button>
      </div>
    </div>
  );
}

function MembershipCardScreen({ navigate }: { navigate: (screen: MobileScreen) => void }) {
  return (
    <div className="mobile-view">
      <Header eyebrow="Credencial" title="Membresia digital" subtitle="Presentala en unidades y eventos." onBack={() => navigate("home")} />
      <div className="membership-card">
        <div className="mobile-row" style={{ justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 12, opacity: 0.78 }}>COMUDE Guadalajara</div>
            <div style={{ fontSize: 22, fontWeight: 900, marginTop: 8 }}>Andrea Lopez</div>
            <div style={{ fontSize: 12, opacity: 0.78, marginTop: 4 }}>ID CZ-2025-08421</div>
          </div>
          <div className="qr-demo" />
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 22 }}>
          <span className="mobile-chip" style={{ background: "rgba(255,255,255,0.18)", color: "#fff" }}>Activa</span>
          <span className="mobile-chip" style={{ background: "rgba(255,255,255,0.18)", color: "#fff" }}>Guadalajara</span>
        </div>
      </div>
    </div>
  );
}

function NotificationsScreen({ navigate }: { navigate: (screen: MobileScreen) => void }) {
  return (
    <div className="mobile-view">
      <Header eyebrow="Avisos" title="Notificaciones" subtitle="Seguimiento de reservas, eventos y encuestas." onBack={() => navigate("home")} />
      {notifications.map((item) => (
        <div className="mobile-card" key={item.title}>
          <div className="mobile-row">
            <div className="mobile-icon"><Bell size={18} /></div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 900 }}>{item.title}</div>
              <div className="mobile-subtitle">{item.text}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProfileScreen({ navigate }: { navigate: (screen: MobileScreen) => void }) {
  return (
    <div className="mobile-view">
      <Header eyebrow="Cuenta" title="Perfil ciudadano" subtitle="Tus datos, beneficios y participacion." />
      <div className="mobile-card">
        <div className="mobile-row">
          <div className="mobile-icon"><User size={19} /></div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 900 }}>Andrea Lopez</div>
            <div className="mobile-subtitle">Col. Tabachines · Miembro activo</div>
          </div>
        </div>
      </div>
      {[
        { label: "Credencial digital", icon: WalletCards, screen: "card" },
        { label: "Notificaciones", icon: Bell, screen: "notifications" },
        { label: "Encuesta de satisfaccion", icon: MessageSquareText, screen: "survey" },
        { label: "Registro familiar", icon: UserPlus, screen: "register" },
      ].map(({ label, icon: Icon, screen }) => (
        <button key={label} className="list-button" onClick={() => navigate(screen as MobileScreen)}>
          <div className="mobile-row">
            <div className="mobile-icon"><Icon size={18} /></div>
            <div style={{ flex: 1, fontSize: 13, fontWeight: 900 }}>{label}</div>
            <ChevronRight size={18} color="#6B7A99" />
          </div>
        </button>
      ))}
    </div>
  );
}

function SurveyScreen({ navigate }: { navigate: (screen: MobileScreen) => void }) {
  const [rating, setRating] = useState(5);
  return (
    <div className="mobile-view">
      <Header eyebrow="Encuesta" title="Satisfaccion ciudadana" subtitle="Tu opinion mejora los servicios deportivos." onBack={() => navigate("home")} />
      <div className="mobile-card">
        <div style={{ fontSize: 14, fontWeight: 900, marginBottom: 12 }}>Como calificas tu ultima visita?</div>
        <div className="rating-row">
          {[1, 2, 3, 4, 5].map((value) => (
            <button key={value} className={`rating-button ${rating === value ? "active" : ""}`} onClick={() => setRating(value)}>
              <Star size={16} fill={rating >= value ? "#1B4FD8" : "transparent"} />
            </button>
          ))}
        </div>
        <textarea className="mobile-input" style={{ marginTop: 12, minHeight: 110, resize: "none" }} placeholder="Comentarios o sugerencias" />
        <button className="mobile-button" style={{ marginTop: 12 }}>Enviar encuesta</button>
      </div>
    </div>
  );
}

export function MobileApp() {
  const [screen, setScreen] = useState<MobileScreen>("splash");
  const [unitId, setUnitId] = useState(units[0].id);
  const [eventId, setEventId] = useState(events[0].id);

  const showNav = useMemo(() => ["home", "units", "reservations", "events", "profile"].includes(screen), [screen]);
  const navigate = (next: MobileScreen) => setScreen(next);

  const content = (() => {
    switch (screen) {
      case "splash": return <Splash navigate={navigate} />;
      case "login": return <AuthScreen mode="login" navigate={navigate} />;
      case "register": return <AuthScreen mode="register" navigate={navigate} />;
      case "home": return <HomeScreen navigate={navigate} />;
      case "units": return <UnitsScreen navigate={navigate} selectUnit={setUnitId} />;
      case "unitDetail": return <UnitDetailScreen unitId={unitId} navigate={navigate} />;
      case "reservations": return <ReservationsScreen />;
      case "classes": return <ClassesScreen />;
      case "events": return <EventsScreen navigate={navigate} selectEvent={setEventId} />;
      case "eventDetail": return <EventDetailScreen eventId={eventId} navigate={navigate} />;
      case "card": return <MembershipCardScreen navigate={navigate} />;
      case "notifications": return <NotificationsScreen navigate={navigate} />;
      case "profile": return <ProfileScreen navigate={navigate} />;
      case "survey": return <SurveyScreen navigate={navigate} />;
      default: return <HomeScreen navigate={navigate} />;
    }
  })();

  return (
    <PhoneShell showNav={showNav} screen={screen} navigate={navigate}>
      {content}
    </PhoneShell>
  );
}
