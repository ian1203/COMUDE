import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  Activity,
  Award,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Dumbbell,
  Home,
  MapPin,
  MessageSquareText,
  QrCode,
  Search,
  ShieldCheck,
  Star,
  Ticket,
  User,
  WalletCards,
} from "lucide-react";
import "./mobile.css";

type Screen =
  | "splash"
  | "login"
  | "home"
  | "units"
  | "unitDetail"
  | "reservations"
  | "classes"
  | "events"
  | "eventDetail"
  | "card"
  | "profile"
  | "survey"
  | "notifications";

const units = [
  {
    id: "tucson",
    name: "Unidad Deportiva Tucson",
    zone: "Norte",
    distance: "1.8 km",
    schedule: "6:00 - 22:00",
    occupancy: 74,
    services: ["Alberca", "Futbol", "Atletismo", "Estacionamiento"],
    capacity: "2,400 personas/mes",
    address: "Zona Norte, Guadalajara",
  },
  {
    id: "independencia",
    name: "Unidad Deportiva Independencia",
    zone: "Oriente",
    distance: "3.4 km",
    schedule: "7:00 - 21:00",
    occupancy: 79,
    services: ["Tenis", "Voleibol", "Futbol", "Vestidores"],
    capacity: "1,800 personas/mes",
    address: "Col. Independencia, Guadalajara",
  },
  {
    id: "plan",
    name: "Unidad Deportiva Plan de San Luis",
    zone: "Poniente",
    distance: "4.2 km",
    schedule: "6:30 - 21:00",
    occupancy: 71,
    services: ["Basquetbol", "Clases", "Rentas", "Iluminacion"],
    capacity: "1,600 personas/mes",
    address: "Plan de San Luis, Guadalajara",
  },
  {
    id: "revolucion",
    name: "Unidad Deportiva Revolución",
    zone: "Centro",
    distance: "5.1 km",
    schedule: "6:00 - 22:00",
    occupancy: 88,
    services: ["Padel", "Futbol", "Eventos", "Cafeteria"],
    capacity: "2,900 personas/mes",
    address: "Zona Centro, Guadalajara",
  },
  {
    id: "lopez",
    name: "Unidad Deportiva López Mateos",
    zone: "Sur",
    distance: "6.3 km",
    schedule: "7:00 - 20:00",
    occupancy: 64,
    services: ["Futbol", "Activacion", "Adultos mayores"],
    capacity: "1,250 personas/mes",
    address: "Av. López Mateos, Guadalajara",
  },
];

const classes = [
  ["Natacion principiante", "Unidad Deportiva Tucson", "Lun y Mie 07:00", "8 lugares"],
  ["Futbol infantil", "Unidad Deportiva Independencia", "Mar y Jue 16:00", "12 lugares"],
  ["Activacion fisica", "Unidad Deportiva López Mateos", "Sab 08:30", "18 lugares"],
  ["Basquetbol juvenil", "Unidad Deportiva Plan de San Luis", "Vie 18:00", "10 lugares"],
] as const;

const events = [
  {
    id: "5k",
    name: "Carrera Guadalajara 5K",
    date: "15 Mar 2025",
    place: "Parque Metropolitano",
    seats: 420,
    category: "Atletismo",
    time: "07:00",
    requirements: "Identificacion, ropa deportiva y llegada 30 min antes.",
    detail: "Ruta familiar con hidratacion, medalla, asistencia medica y registro digital.",
  },
  {
    id: "festival",
    name: "Festival Deportivo Familiar Guadalajara",
    date: "10 May 2025",
    place: "Unidad Deportiva Tucson",
    seats: 680,
    category: "Multideporte",
    time: "09:00",
    requirements: "Registro familiar y carta responsiva.",
    detail: "Actividades para ninas, ninos, jovenes y adultos en un formato recreativo.",
  },
  {
    id: "futbol",
    name: "Torneo Municipal de Fútbol",
    date: "22 Abr 2025",
    place: "Unidad Deportiva Independencia",
    seats: 96,
    category: "Futbol",
    time: "16:00",
    requirements: "Equipo registrado y lista de jugadores.",
    detail: "Torneo municipal por categorias con calendario digital y seguimiento de resultados.",
  },
  {
    id: "basquet",
    name: "Liga Infantil de Básquetbol",
    date: "05 Jun 2025",
    place: "Unidad Deportiva Plan de San Luis",
    seats: 72,
    category: "Basquetbol",
    time: "17:30",
    requirements: "CURP y autorizacion de madre, padre o tutor.",
    detail: "Liga formativa con enfoque en convivencia, disciplina y participacion ciudadana.",
  },
  {
    id: "activacion",
    name: "Clase masiva de activación física",
    date: "28 Jun 2025",
    place: "Unidad Deportiva Revolución",
    seats: 300,
    category: "Activacion",
    time: "08:00",
    requirements: "Ropa comoda e hidratacion personal.",
    detail: "Sesion abierta para promover habitos saludables en colonias cercanas.",
  },
];

const navItems = [
  { id: "home", label: "Inicio", icon: Home },
  { id: "units", label: "Unidades", icon: MapPin },
  { id: "reservations", label: "Reservas", icon: CalendarDays },
  { id: "events", label: "Eventos", icon: Ticket },
  { id: "profile", label: "Perfil", icon: User },
] as const;

function QRDemo() {
  return <div className="qr-demo"><QrCode size={44} /></div>;
}

function Modal({ title, subtitle, onClose, children }: { title: string; subtitle: string; onClose: () => void; children: ReactNode }) {
  return (
    <div className="mobile-modal-backdrop">
      <div className="mobile-modal">
        <CheckCircle2 size={34} color="#10B981" />
        <h2>{title}</h2>
        <p>{subtitle}</p>
        {children}
        <button className="mobile-button" onClick={onClose}>Entendido</button>
      </div>
    </div>
  );
}

function Shell({ screen, children, navigate }: { screen: Screen; children: ReactNode; navigate: (screen: Screen) => void }) {
  const showNav = ["home", "units", "reservations", "events", "profile"].includes(screen);
  return (
    <div className="citizen-app">
      <div className="phone-frame">
        <div className="phone-screen">
          {children}
          {showNav && (
            <nav className="mobile-bottom-nav">
              {navItems.map(({ id, label, icon: Icon }) => (
                <button key={id} className={`mobile-nav-item ${screen === id ? "active" : ""}`} onClick={() => navigate(id)}>
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
  return <div className="mobile-status"><span>9:41</span><span>COMUDE Guadalajara</span></div>;
}

function Header({ title, subtitle, onBack, action }: { title: string; subtitle?: string; onBack?: () => void; action?: ReactNode }) {
  return (
    <>
      <StatusBar />
      <div className="mobile-header">
        <div className="mobile-row start">
          {onBack && (
            <button className="back-button" onClick={onBack}>
              <ChevronLeft size={17} /> Regresar
            </button>
          )}
          <div>
            <h1 className="mobile-title">{title}</h1>
            {subtitle && <p className="mobile-subtitle">{subtitle}</p>}
          </div>
        </div>
        {action}
      </div>
    </>
  );
}

function Splash({ navigate }: { navigate: (screen: Screen) => void }) {
  return (
    <div className="splash-screen">
      <div>
        <div className="splash-logo"><Activity size={36} /></div>
        <h1>COMUDE Guadalajara</h1>
        <p>El deporte cerca de ti</p>
      </div>
      <div className="splash-actions">
        <button className="mobile-button light" onClick={() => navigate("login")}>Iniciar</button>
        <button className="mobile-button ghost-light" onClick={() => navigate("home")}>Explorar como invitado</button>
      </div>
    </div>
  );
}

function Login({ navigate }: { navigate: (screen: Screen) => void }) {
  return (
    <main className="mobile-view">
      <Header title="Bienvenido" subtitle="Accede a reservas, clases, eventos y credencial digital." onBack={() => navigate("splash")} />
      <section className="mobile-card login-card">
        <input className="mobile-input" placeholder="Correo o telefono" />
        <input className="mobile-input" placeholder="Contrasena" type="password" />
        <button className="mobile-button" onClick={() => navigate("home")}>Entrar</button>
        <button className="mobile-button secondary" onClick={() => navigate("home")}>Crear cuenta ciudadana</button>
      </section>
    </main>
  );
}

function HomeScreen({ navigate, selectUnit, selectEvent }: { navigate: (screen: Screen) => void; selectUnit: (id: string) => void; selectEvent: (id: string) => void }) {
  const featured = units[0];
  return (
    <main className="mobile-view">
      <Header
        title="Tu deporte en Guadalajara"
        subtitle="Hola, Andrea. Servicios deportivos municipales en una sola app."
        action={<button className="icon-button" onClick={() => navigate("notifications")}><Bell size={18} /></button>}
      />

      <section className="mobile-card premium-card">
        <div className="mobile-row between">
          <div>
            <span className="label-light">Proxima reserva</span>
            <h2>Cancha futbol 7</h2>
            <p>Hoy 18:00 · Unidad Deportiva Tucson</p>
          </div>
          <CalendarDays size={36} />
        </div>
      </section>

      <section className="quick-grid">
        {[
          ["Reservar", CalendarDays, "reservations"],
          ["Clases", Dumbbell, "classes"],
          ["Credencial", WalletCards, "card"],
          ["Encuesta", MessageSquareText, "survey"],
        ].map(([label, Icon, target]) => (
          <button key={label as string} className="quick-card" onClick={() => navigate(target as Screen)}>
            <Icon size={20} />
            <span>{label as string}</span>
          </button>
        ))}
      </section>

      <h2 className="mobile-section-title">Unidad cercana destacada</h2>
      <button className="list-card" onClick={() => { selectUnit(featured.id); navigate("unitDetail"); }}>
        <div className="unit-visual">{featured.zone}</div>
        <div className="mobile-row between">
          <div>
            <strong>{featured.name}</strong>
            <p>{featured.distance} · {featured.schedule} · {featured.occupancy}% ocupacion</p>
          </div>
          <ChevronRight size={18} />
        </div>
      </button>

      <h2 className="mobile-section-title">Eventos próximos</h2>
      {events.slice(0, 2).map((event) => (
        <button key={event.id} className="compact-card" onClick={() => { selectEvent(event.id); navigate("eventDetail"); }}>
          <div className="mobile-icon"><Ticket size={18} /></div>
          <div>
            <strong>{event.name}</strong>
            <p>{event.date} · {event.seats} cupos</p>
          </div>
        </button>
      ))}
    </main>
  );
}

function UnitsScreen({ navigate, selectUnit }: { navigate: (screen: Screen) => void; selectUnit: (id: string) => void }) {
  return (
    <main className="mobile-view">
      <Header title="Unidades deportivas" subtitle="Instalaciones, horarios y disponibilidad." onBack={() => navigate("home")} />
      <div className="search-card"><Search size={16} /><input placeholder="Buscar unidad o deporte" /></div>
      {units.map((unit) => (
        <button key={unit.id} className="list-card" onClick={() => { selectUnit(unit.id); navigate("unitDetail"); }}>
          <div className="mobile-row between">
            <div>
              <strong>{unit.name}</strong>
              <p>{unit.zone} · {unit.distance} · {unit.schedule}</p>
            </div>
            <span className={`status-chip ${unit.occupancy > 84 ? "warn" : ""}`}>{unit.occupancy}%</span>
          </div>
          <div className="chip-row">{unit.services.slice(0, 3).map((s) => <span key={s}>{s}</span>)}</div>
          <div className="card-action">Ver detalle</div>
        </button>
      ))}
    </main>
  );
}

function UnitDetail({ unitId, navigate }: { unitId: string; navigate: (screen: Screen) => void }) {
  const unit = units.find((item) => item.id === unitId) || units[0];
  return (
    <main className="mobile-view">
      <Header title={unit.name} subtitle={unit.address} onBack={() => navigate("units")} />
      <div className="unit-hero"><span>{unit.zone}</span></div>
      <section className="mobile-card">
        <div className="detail-grid">
          <div><span>Horario</span><strong>{unit.schedule}</strong></div>
          <div><span>Capacidad</span><strong>{unit.capacity}</strong></div>
          <div><span>Ocupacion</span><strong>{unit.occupancy}%</strong></div>
          <div><span>Distancia</span><strong>{unit.distance}</strong></div>
        </div>
        <div className="chip-row spacious">{unit.services.map((s) => <span key={s}>{s}</span>)}</div>
        <button className="mobile-button" onClick={() => navigate("reservations")}>Reservar</button>
        <button className="mobile-button secondary" onClick={() => navigate("classes")}>Ver clases</button>
        <button className="mobile-button subtle">Cómo llegar</button>
      </section>
    </main>
  );
}

function Reservations({ navigate }: { navigate: (screen: Screen) => void }) {
  const [time, setTime] = useState("18:00");
  const [confirmed, setConfirmed] = useState(false);
  return (
    <main className="mobile-view">
      <Header title="Reservar cancha" subtitle="Completa los pasos y recibe tu QR de acceso." onBack={() => navigate("home")} />
      <section className="mobile-card form-card">
        <label>Unidad</label>
        <select className="mobile-input"><option>Unidad Deportiva Tucson</option><option>Unidad Deportiva Revolución</option></select>
        <label>Deporte</label>
        <select className="mobile-input"><option>Fútbol 7</option><option>Tenis</option><option>Padel</option></select>
        <label>Fecha</label>
        <input className="mobile-input" value="Sábado 28 de junio" readOnly />
        <label>Horario</label>
        <div className="time-grid">{["17:00", "18:00", "19:00", "20:00"].map((item) => <button key={item} className={time === item ? "active" : ""} onClick={() => setTime(item)}>{item}</button>)}</div>
      </section>
      <section className="mobile-card summary-card">
        <h2>Resumen</h2>
        <p><strong>Unidad:</strong> Unidad Deportiva Tucson</p>
        <p><strong>Cancha:</strong> Fútbol 7</p>
        <p><strong>Fecha:</strong> Sábado 28 de junio</p>
        <p><strong>Hora:</strong> {time}</p>
        <p><strong>Indicaciones:</strong> Llega 15 minutos antes y presenta tu QR.</p>
        <button className="mobile-button" onClick={() => setConfirmed(true)}>Confirmar reserva</button>
      </section>
      {confirmed && (
        <Modal title="Reserva confirmada" subtitle="Presenta este QR al llegar a la unidad." onClose={() => setConfirmed(false)}>
          <QRDemo />
          <p className="modal-note">Acceso por puerta principal · tolerancia 10 minutos.</p>
        </Modal>
      )}
    </main>
  );
}

function Classes({ navigate }: { navigate: (screen: Screen) => void }) {
  return (
    <main className="mobile-view">
      <Header title="Clases" subtitle="Programas deportivos municipales disponibles." onBack={() => navigate("home")} />
      {classes.map(([name, unit, time, spots]) => (
        <div key={name} className="compact-card">
          <div className="mobile-icon"><Dumbbell size={18} /></div>
          <div><strong>{name}</strong><p>{unit} · {time} · {spots}</p></div>
        </div>
      ))}
    </main>
  );
}

function Events({ navigate, selectEvent }: { navigate: (screen: Screen) => void; selectEvent: (id: string) => void }) {
  return (
    <main className="mobile-view">
      <Header title="Eventos" subtitle="Registro ciudadano para actividades deportivas." onBack={() => navigate("home")} />
      {events.map((event) => (
        <button key={event.id} className="list-card" onClick={() => { selectEvent(event.id); navigate("eventDetail"); }}>
          <div className="mobile-row between">
            <div><strong>{event.name}</strong><p>{event.date} · {event.place}</p></div>
            <span className="status-chip">{event.seats} cupos</span>
          </div>
          <div className="chip-row"><span>{event.category}</span><span>{event.time}</span></div>
          <div className="card-action">Ver detalle</div>
        </button>
      ))}
    </main>
  );
}

function EventDetail({ eventId, navigate }: { eventId: string; navigate: (screen: Screen) => void }) {
  const [registered, setRegistered] = useState(false);
  const event = events.find((item) => item.id === eventId) || events[0];
  return (
    <main className="mobile-view">
      <Header title={event.name} subtitle={`${event.date} · ${event.time}`} onBack={() => navigate("events")} />
      <section className="mobile-card premium-card">
        <span className="label-light">{event.category}</span>
        <h2>{event.place}</h2>
        <p>{event.detail}</p>
      </section>
      <section className="mobile-card summary-card">
        <p><strong>Lugar:</strong> {event.place}</p>
        <p><strong>Horario:</strong> {event.time}</p>
        <p><strong>Requisitos:</strong> {event.requirements}</p>
        <p><strong>Cupos disponibles:</strong> {event.seats}</p>
        <button className="mobile-button" onClick={() => setRegistered(true)}>Registrarme</button>
      </section>
      {registered && (
        <Modal title="Registro confirmado" subtitle="Tu ticket QR quedó listo." onClose={() => setRegistered(false)}>
          <QRDemo />
          <p className="modal-note">Llega 30 minutos antes para validar tu acceso.</p>
        </Modal>
      )}
    </main>
  );
}

function CardScreen({ navigate }: { navigate: (screen: Screen) => void }) {
  return (
    <main className="mobile-view">
      <Header title="Credencial digital" subtitle="Identificación ciudadana para unidades y eventos." onBack={() => navigate("home")} />
      <section className="member-card">
        <div><span>COMUDE Guadalajara</span><h2>Andrea López</h2><p>ID ciudadano GDL-2025-08421</p></div>
        <QRDemo />
      </section>
      <section className="mobile-card summary-card">
        <p><strong>Colonia:</strong> Independencia</p>
        <p><strong>Deportes favoritos:</strong> Natación, fútbol, activación física</p>
        <p><strong>Historial:</strong> 4 reservas · 2 eventos · 3 encuestas</p>
        <div className="chip-row spacious"><span><Award size={13} /> Constante</span><span><ShieldCheck size={13} /> Activa</span></div>
      </section>
    </main>
  );
}

function Profile({ navigate }: { navigate: (screen: Screen) => void }) {
  return (
    <main className="mobile-view">
      <Header title="Perfil" subtitle="Tu actividad y beneficios ciudadanos." onBack={() => navigate("home")} />
      <section className="profile-card">
        <div className="avatar">AL</div>
        <h2>Andrea López</h2>
        <p>ID GDL-2025-08421 · Col. Independencia</p>
      </section>
      {[
        ["Credencial digital", WalletCards, "card"],
        ["Encuesta de satisfacción", MessageSquareText, "survey"],
        ["Notificaciones", Bell, "notifications"],
      ].map(([label, Icon, target]) => (
        <button key={label as string} className="compact-card" onClick={() => navigate(target as Screen)}>
          <div className="mobile-icon"><Icon size={18} /></div><strong>{label as string}</strong><ChevronRight size={18} />
        </button>
      ))}
    </main>
  );
}

function Survey({ navigate }: { navigate: (screen: Screen) => void }) {
  const [rating, setRating] = useState(5);
  return (
    <main className="mobile-view">
      <Header title="Encuesta" subtitle="Tu opinión mejora los servicios deportivos." onBack={() => navigate("home")} />
      <section className="mobile-card">
        <h2>¿Cómo calificas tu última visita?</h2>
        <div className="rating-row">{[1, 2, 3, 4, 5].map((n) => <button key={n} className={rating >= n ? "active" : ""} onClick={() => setRating(n)}><Star size={17} fill="currentColor" /></button>)}</div>
        <textarea className="mobile-input" placeholder="Comentarios o sugerencias" />
        <button className="mobile-button">Enviar encuesta</button>
      </section>
    </main>
  );
}

function Notifications({ navigate }: { navigate: (screen: Screen) => void }) {
  return (
    <main className="mobile-view">
      <Header title="Notificaciones" subtitle="Avisos de reservas, eventos y clases." onBack={() => navigate("home")} />
      {["Reserva confirmada para hoy 18:00.", "Nueva clase de natación disponible.", "Encuesta pendiente de tu última visita."].map((text) => (
        <div key={text} className="compact-card"><div className="mobile-icon"><Bell size={18} /></div><p>{text}</p></div>
      ))}
    </main>
  );
}

export function MobileApp() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [unitId, setUnitId] = useState(units[0].id);
  const [eventId, setEventId] = useState(events[0].id);
  const navigate = (next: Screen) => setScreen(next);

  const view = useMemo(() => {
    switch (screen) {
      case "splash": return <Splash navigate={navigate} />;
      case "login": return <Login navigate={navigate} />;
      case "home": return <HomeScreen navigate={navigate} selectUnit={setUnitId} selectEvent={setEventId} />;
      case "units": return <UnitsScreen navigate={navigate} selectUnit={setUnitId} />;
      case "unitDetail": return <UnitDetail unitId={unitId} navigate={navigate} />;
      case "reservations": return <Reservations navigate={navigate} />;
      case "classes": return <Classes navigate={navigate} />;
      case "events": return <Events navigate={navigate} selectEvent={setEventId} />;
      case "eventDetail": return <EventDetail eventId={eventId} navigate={navigate} />;
      case "card": return <CardScreen navigate={navigate} />;
      case "profile": return <Profile navigate={navigate} />;
      case "survey": return <Survey navigate={navigate} />;
      case "notifications": return <Notifications navigate={navigate} />;
      default: return <HomeScreen navigate={navigate} selectUnit={setUnitId} selectEvent={setEventId} />;
    }
  }, [screen, unitId, eventId]);

  return <Shell screen={screen} navigate={navigate}>{view}</Shell>;
}

