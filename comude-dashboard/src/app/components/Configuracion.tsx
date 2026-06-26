import { useState } from "react";
import { Users, Shield, Database, Plug, History, CheckCircle2, AlertTriangle, KeyRound } from "lucide-react";

const sections = [
  { id: "usuarios", label: "Usuarios", icon: Users },
  { id: "roles", label: "Roles y permisos", icon: Shield },
  { id: "catalogos", label: "Catálogos", icon: Database },
  { id: "integraciones", label: "Integraciones", icon: Plug },
  { id: "auditoria", label: "Auditoría", icon: History },
];

export function Administracion() {
  const [activeSection, setActiveSection] = useState("usuarios");

  return (
    <div className="flex gap-5" style={{ minHeight: "600px" }}>
      <div className="w-60 shrink-0">
        <div className="rounded-2xl border overflow-hidden" style={{ background: "#fff", borderColor: "var(--border)" }}>
          {sections.map((s) => {
            const Icon = s.icon;
            const isActive = activeSection === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className="w-full flex items-center gap-3 px-4 py-3.5 transition-colors text-left border-b"
                style={{
                  background: isActive ? "var(--secondary)" : "transparent",
                  borderColor: "var(--border)",
                  color: isActive ? "var(--primary)" : "var(--muted-foreground)",
                }}
              >
                <Icon size={15} strokeWidth={isActive ? 2.2 : 1.8} />
                <span style={{ fontSize: "13px", fontWeight: isActive ? 600 : 400 }}>{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 rounded-2xl border p-6" style={{ background: "#fff", borderColor: "var(--border)" }}>
        <div className="flex items-start justify-between pb-5 border-b" style={{ borderColor: "var(--border)" }}>
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--foreground)" }}>Administración institucional</h3>
            <p style={{ fontSize: "12px", color: "var(--muted-foreground)", marginTop: "2px" }}>
              Gobierno de datos, seguridad operativa y trazabilidad para COMUDE Guadalajara 360.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full" style={{ fontSize: "11px", fontWeight: 700, background: "#ECFDF5", color: "#10B981" }}>
            Plataforma auditada
          </span>
        </div>

        {activeSection === "usuarios" && (
          <div className="space-y-5 pt-5">
            <div className="grid grid-cols-4 gap-3">
              {[
                ["Usuarios activos", "42"],
                ["Dependencias", "6"],
                ["Accesos hoy", "128"],
                ["Pendientes alta", "3"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl p-4" style={{ background: "var(--input-background)" }}>
                  <div style={{ fontSize: "10px", color: "var(--muted-foreground)" }}>{label}</div>
                  <div style={{ fontSize: "22px", fontWeight: 700, color: "var(--foreground)" }}>{value}</div>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
              {[
                ["Dirección General", "Director General COMUDE", "Administrador", "Activo"],
                ["Eventos", "Coordinación de Eventos", "Operador", "Activo"],
                ["Unidades", "Jefatura de Unidades", "Supervisor", "Activo"],
                ["Ayuntamiento", "Enlace de Transparencia", "Consulta", "Pendiente"],
              ].map(([area, nombre, rol, estado]) => (
                <div key={nombre} className="grid grid-cols-4 px-4 py-3 border-b hover:bg-gray-50 transition-colors" style={{ borderColor: "var(--border)" }}>
                  <span style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>{area}</span>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--foreground)" }}>{nombre}</span>
                  <span style={{ fontSize: "12px", color: "var(--foreground)" }}>{rol}</span>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: estado === "Activo" ? "#10B981" : "#F59E0B" }}>{estado}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === "roles" && (
          <div className="grid grid-cols-3 gap-4 pt-5">
            {[
              ["Administrador", "Acceso total, auditoría y configuración"],
              ["Supervisor", "Gestión de unidades, eventos y reportes"],
              ["Consulta Ayuntamiento", "Lectura de indicadores y reportes ejecutivos"],
            ].map(([role, desc]) => (
              <div key={role} className="rounded-2xl border p-4 transition-all hover:shadow-md" style={{ borderColor: "var(--border)" }}>
                <Shield size={18} color="var(--primary)" />
                <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--foreground)", marginTop: "10px" }}>{role}</div>
                <p style={{ fontSize: "12px", color: "var(--muted-foreground)", marginTop: "4px" }}>{desc}</p>
                <div className="mt-4 space-y-2">
                  {["Dashboard ejecutivo", "Reportes", "Evidencia presupuestal"].map((permiso) => (
                    <div key={permiso} className="flex items-center gap-2">
                      <CheckCircle2 size={13} color="#10B981" />
                      <span style={{ fontSize: "11px", color: "var(--foreground)" }}>{permiso}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSection === "catalogos" && (
          <div className="grid grid-cols-2 gap-4 pt-5">
            {["Deportes", "Colonias", "Unidades deportivas", "Tipos de incidencia", "Patrocinadores", "Programas municipales"].map((catalogo) => (
              <div key={catalogo} className="rounded-xl p-4 border flex items-center justify-between hover:bg-gray-50 transition-colors" style={{ borderColor: "var(--border)" }}>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--foreground)" }}>{catalogo}</div>
                  <div style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>Catálogo validado para operación institucional</div>
                </div>
                <span style={{ fontSize: "11px", color: "#10B981", fontWeight: 700 }}>Actualizado</span>
              </div>
            ))}
          </div>
        )}

        {activeSection === "integraciones" && (
          <div className="grid grid-cols-2 gap-4 pt-5">
            {[
              ["Portal de Transparencia", "Sincronización de reportes presupuestales", "Conectado"],
              ["Google Forms", "Encuestas ciudadanas y satisfacción", "Conectado"],
              ["Correo institucional", "Alertas ejecutivas y vencimientos", "Conectado"],
              ["Sistema contable municipal", "Interfaz presupuestal ligera", "En revisión"],
            ].map(([name, desc, status]) => (
              <div key={name} className="rounded-2xl border p-4" style={{ borderColor: "var(--border)" }}>
                <div className="flex items-start justify-between">
                  <Plug size={18} color="var(--primary)" />
                  <span style={{ fontSize: "11px", fontWeight: 700, color: status === "Conectado" ? "#10B981" : "#F59E0B" }}>{status}</span>
                </div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--foreground)", marginTop: "10px" }}>{name}</div>
                <p style={{ fontSize: "12px", color: "var(--muted-foreground)", marginTop: "4px" }}>{desc}</p>
              </div>
            ))}
          </div>
        )}

        {activeSection === "auditoria" && (
          <div className="space-y-3 pt-5">
            {[
              ["10:42", "Director General exportó reporte para Ayuntamiento", CheckCircle2, "#10B981"],
              ["09:18", "Eventos actualizó costo de Carrera Guadalajara 5K", AlertTriangle, "#F59E0B"],
              ["08:55", "Unidades cerró incidencia de Tucson", CheckCircle2, "#10B981"],
              ["Ayer", "Nuevo rol Consulta Ayuntamiento creado", KeyRound, "#1B4FD8"],
            ].map(([time, action, Icon, color]) => (
              <div key={action as string} className="flex items-center gap-3 rounded-xl px-4 py-3 border hover:bg-gray-50 transition-colors" style={{ borderColor: "var(--border)" }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}18` }}>
                  <Icon size={15} color={color as string} />
                </div>
                <div className="flex-1">
                  <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--foreground)" }}>{action as string}</div>
                  <div style={{ fontSize: "10px", color: "var(--muted-foreground)" }}>{time as string} · trazabilidad institucional</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export const Configuracion = Administracion;
