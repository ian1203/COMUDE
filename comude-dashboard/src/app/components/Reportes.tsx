import { useState } from "react";
import { FileText, FileSpreadsheet, Share2, Download, CheckCircle } from "lucide-react";

const reportes = [
  {
    id: "mensual",
    titulo: "Reporte Mensual",
    descripcion: "Resumen ejecutivo de participación, eventos y KPIs del mes",
    periodo: "Mayo 2026",
    fecha: "01 Jun 2026",
    paginas: 24,
    size: "4.2 MB",
    estado: "Listo",
    color: "#1B4FD8",
    bg: "#EEF2FF",
    secciones: ["Dashboard Ejecutivo", "Participación por Unidad", "Eventos Realizados", "Satisfacción Ciudadana", "Costeo de Eventos"],
  },
  {
    id: "trimestral",
    titulo: "Reporte Trimestral",
    descripcion: "Análisis comparativo Q1-Q2 2026 con tendencias y proyecciones",
    periodo: "Q2 2026 (Abr–Jun)",
    fecha: "30 Jun 2026",
    paginas: 58,
    size: "8.7 MB",
    estado: "En generación",
    color: "#06B6D4",
    bg: "#ECFEFF",
    secciones: ["Comparativo Trimestral", "Inteligencia Deportiva", "Impacto Social", "Patrocinadores", "Proyecciones Q3"],
  },
  {
    id: "anual",
    titulo: "Reporte Anual",
    descripcion: "Informe completo de gestión 2026 para presentación al Ayuntamiento",
    periodo: "Ejercicio Fiscal 2026",
    fecha: "26 Jun 2026",
    paginas: 112,
    size: "18.4 MB",
    estado: "Listo",
    color: "#10B981",
    bg: "#ECFDF5",
    secciones: ["Resumen Ejecutivo", "Logros del Año", "Análisis Financiero", "Impacto Social", "Metas 2026"],
  },
];

const historial = [
  { nombre: "Reporte Mensual Abr 2026", tipo: "PDF", fecha: "01 May 2026", tamaño: "4.0 MB" },
  { nombre: "Reporte Mensual Mar 2026", tipo: "PDF", fecha: "01 Abr 2026", tamaño: "3.8 MB" },
  { nombre: "Reporte Q1 2026", tipo: "Excel", fecha: "05 Abr 2026", tamaño: "6.2 MB" },
  { nombre: "Reporte Mensual Feb 2026", tipo: "PDF", fecha: "01 Mar 2026", tamaño: "3.6 MB" },
  { nombre: "Reporte Ejecutivo Jun 2026", tipo: "PDF", fecha: "26 Jun 2026", tamaño: "18.4 MB" },
];

export function Reportes() {
  const [generating, setGenerating] = useState<string | null>(null);
  const [downloaded, setDownloaded] = useState<string[]>([]);

  const handleGenerate = (id: string) => {
    setGenerating(id);
    setTimeout(() => setGenerating(null), 2000);
  };

  const handleDownload = (id: string) => {
    setDownloaded((prev) => [...prev, id]);
    setTimeout(() => setDownloaded((prev) => prev.filter((d) => d !== id)), 3000);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="rounded-2xl p-5 border" style={{ background: "#fff", borderColor: "var(--border)" }}>
        <div className="flex items-center justify-between">
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--foreground)" }}>Generación de Reportes</h3>
            <p style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>
              Reportes automáticos con datos en tiempo real · COMUDE Guadalajara 2026
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span style={{ fontSize: "12px", color: "#10B981", fontWeight: 500 }}>Sistema conectado</span>
          </div>
        </div>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-3 gap-4">
        {reportes.map((r) => (
          <div
            key={r.id}
            className="rounded-2xl border overflow-hidden"
            style={{ background: "#fff", borderColor: "var(--border)" }}
          >
            {/* Header band */}
            <div className="h-1.5" style={{ background: r.color }} />
            <div className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: r.bg }}>
                  <FileText size={18} color={r.color} />
                </div>
                <span
                  className="px-2.5 py-1 rounded-full"
                  style={{
                    fontSize: "10px",
                    fontWeight: 600,
                    background: r.estado === "Listo" ? "#ECFDF5" : "#FFF7ED",
                    color: r.estado === "Listo" ? "#10B981" : "#F59E0B",
                  }}
                >
                  {r.estado}
                </span>
              </div>
              <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--foreground)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {r.titulo}
              </h3>
              <p style={{ fontSize: "12px", color: "var(--muted-foreground)", marginTop: "4px", lineHeight: 1.5 }}>
                {r.descripcion}
              </p>
              <div className="grid grid-cols-3 gap-2 my-4">
                <div className="text-center py-2 rounded-xl" style={{ background: "var(--input-background)" }}>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--foreground)" }}>{r.paginas}</div>
                  <div style={{ fontSize: "9px", color: "var(--muted-foreground)" }}>Páginas</div>
                </div>
                <div className="text-center py-2 rounded-xl" style={{ background: "var(--input-background)" }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--foreground)" }}>{r.size}</div>
                  <div style={{ fontSize: "9px", color: "var(--muted-foreground)" }}>Tamaño</div>
                </div>
                <div className="text-center py-2 rounded-xl" style={{ background: "var(--input-background)" }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--foreground)", lineHeight: 1.2 }}>{r.fecha}</div>
                  <div style={{ fontSize: "9px", color: "var(--muted-foreground)" }}>Fecha</div>
                </div>
              </div>

              <div className="mb-4">
                <p style={{ fontSize: "10px", color: "var(--muted-foreground)", marginBottom: "6px" }}>CONTENIDO</p>
                <div className="space-y-1">
                  {r.secciones.map((s) => (
                    <div key={s} className="flex items-center gap-1.5">
                      <CheckCircle size={11} color={r.color} />
                      <span style={{ fontSize: "11px", color: "var(--foreground)" }}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleDownload(r.id + "-pdf")}
                  className="flex flex-col items-center gap-1 py-2.5 px-2 rounded-xl transition-all hover:opacity-80"
                  style={{ background: r.color, color: "#fff" }}
                >
                  {downloaded.includes(r.id + "-pdf") ? (
                    <CheckCircle size={14} />
                  ) : (
                    <Download size={14} />
                  )}
                  <span style={{ fontSize: "9px", fontWeight: 600 }}>PDF</span>
                </button>
                <button
                  onClick={() => handleDownload(r.id + "-xls")}
                  className="flex flex-col items-center gap-1 py-2.5 px-2 rounded-xl transition-all hover:opacity-80"
                  style={{ background: "#10B981", color: "#fff" }}
                >
                  {downloaded.includes(r.id + "-xls") ? (
                    <CheckCircle size={14} />
                  ) : (
                    <FileSpreadsheet size={14} />
                  )}
                  <span style={{ fontSize: "9px", fontWeight: 600 }}>Excel</span>
                </button>
                <button
                  className="flex flex-col items-center gap-1 py-2.5 px-2 rounded-xl transition-all hover:opacity-80"
                  style={{ background: "#8B5CF6", color: "#fff" }}
                >
                  <Share2 size={14} />
                  <span style={{ fontSize: "9px", fontWeight: 600 }}>Compartir</span>
                </button>
              </div>

              {r.estado === "En generación" && (
                <button
                  onClick={() => handleGenerate(r.id)}
                  className="w-full mt-2 py-2.5 rounded-xl transition-all text-white"
                  style={{ background: generating === r.id ? "#6B7A99" : r.color, fontSize: "12px", fontWeight: 500 }}
                >
                  {generating === r.id ? "Generando..." : "Generar Reporte"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Historial */}
      <div className="rounded-2xl border overflow-hidden" style={{ background: "#fff", borderColor: "var(--border)" }}>
        <div className="px-5 py-4 border-b" style={{ borderColor: "var(--border)" }}>
          <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--foreground)" }}>Historial de Reportes</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr style={{ background: "var(--input-background)", borderBottom: "1px solid var(--border)" }}>
              {["Nombre", "Tipo", "Fecha", "Tamaño", "Acciones"].map((h) => (
                <th
                  key={h}
                  className="px-5 py-3 text-left"
                  style={{ fontSize: "11px", fontWeight: 600, color: "var(--muted-foreground)", letterSpacing: "0.04em" }}
                >
                  {h.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {historial.map((h, i) => (
              <tr
                key={i}
                style={{ borderBottom: "1px solid var(--border)" }}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    {h.tipo === "PDF" ? (
                      <FileText size={14} color="#1B4FD8" />
                    ) : (
                      <FileSpreadsheet size={14} color="#10B981" />
                    )}
                    <span style={{ fontSize: "13px", color: "var(--foreground)" }}>{h.nombre}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <span
                    className="px-2.5 py-1 rounded-full"
                    style={{
                      fontSize: "11px",
                      fontWeight: 500,
                      background: h.tipo === "PDF" ? "#EEF2FF" : "#ECFDF5",
                      color: h.tipo === "PDF" ? "#1B4FD8" : "#10B981",
                    }}
                  >
                    {h.tipo}
                  </span>
                </td>
                <td className="px-5 py-3.5" style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>{h.fecha}</td>
                <td className="px-5 py-3.5" style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>{h.tamaño}</td>
                <td className="px-5 py-3.5">
                  <button
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:opacity-80 transition-opacity"
                    style={{ background: "var(--input-background)", fontSize: "11px", color: "var(--foreground)" }}
                  >
                    <Download size={12} />
                    Descargar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
