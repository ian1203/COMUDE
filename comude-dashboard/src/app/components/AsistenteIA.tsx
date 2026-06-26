import { useMemo, useState } from "react";
import { Bot, Send, Sparkles, X } from "lucide-react";

const suggestions = [
  "¿Cuál fue el costo por participante de la Carrera Guadalajara 5K?",
  "¿Qué unidades tienen menor ocupación este mes?",
  "¿Qué patrocinadores vencen pronto?",
  "¿Cuánto presupuesto disponible queda?",
  "¿Cuántas horas ahorró la conciliación financiera?",
  "¿Qué eventos presentan sobrecosto?",
  "¿Cuál unidad genera más ingresos?",
];

const answerFor = (question: string) => {
  const q = question.toLowerCase();
  if (q.includes("costo por participante") || q.includes("5k")) {
    return "La Carrera Guadalajara 5K tuvo un costo real de $186,000 MXN y 4,200 participantes. El costo por participante fue de aproximadamente $44 MXN.";
  }
  if (q.includes("menor ocupación") || q.includes("ocupacion")) {
    return "Las unidades con menor ocupación este mes son Unidad Deportiva López Mateos con 64% y Unidad Deportiva Plan de San Luis con 71%. Conviene revisar clases, horarios y promoción local.";
  }
  if (q.includes("patrocinadores") || q.includes("vencen")) {
    return "Red Cola vence en 12 días y requiere seguimiento. Electrolit tiene saldo pendiente de cobro por $100,000 MXN.";
  }
  if (q.includes("presupuesto disponible") || q.includes("disponible")) {
    return "El presupuesto disponible estimado es de $6.3M MXN. El avance presupuestal va en 78%, marcado en atención para monitoreo ejecutivo.";
  }
  if (q.includes("horas") || q.includes("conciliación") || q.includes("conciliacion")) {
    return "La conciliación automática estima un ahorro de 18 horas al mes, revisando excepciones en lugar de cientos de movimientos en Excel.";
  }
  if (q.includes("sobrecosto") || q.includes("eventos presentan")) {
    return "El evento con sobrecosto es Carrera Guadalajara 5K: presupuesto estimado $163,000 MXN contra costo real $186,000 MXN, variación de $23,000 MXN.";
  }
  if (q.includes("más ingresos") || q.includes("mas ingresos")) {
    return "La Unidad Deportiva Revolución genera más ingresos mensuales con $392,000 MXN y variación positiva de 18% contra el mes anterior.";
  }
  return "Puedo consultar indicadores, eventos, unidades, finanzas y alertas operativas en segundos. Prueba con presupuesto disponible, patrocinios por vencer o unidades con menor ocupación.";
};

function ChatContent({ compact = false }: { compact?: boolean }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Consulta indicadores, eventos, unidades, finanzas y alertas operativas en segundos.",
    },
  ]);
  const [input, setInput] = useState("");
  const quickSuggestions = useMemo(() => suggestions.slice(0, compact ? 4 : 7), [compact]);

  const ask = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((current) => [
      ...current,
      { role: "user", text: trimmed },
      { role: "assistant", text: answerFor(trimmed) },
    ]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "var(--secondary)", color: "var(--primary)" }}>
            <Bot size={18} />
          </div>
          <div>
            <div style={{ fontSize: "14px", fontWeight: 800, color: "var(--foreground)" }}>Asistente IA</div>
            <div style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>Datos demo, sin conexión a API real.</div>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-3 overflow-y-auto flex-1">
        <div className="rounded-2xl p-3" style={{ background: "#EEF2FF" }}>
          <div className="flex items-center gap-2 mb-2" style={{ color: "var(--primary)", fontSize: "12px", fontWeight: 800 }}>
            <Sparkles size={14} /> Preguntas sugeridas
          </div>
          <div className="flex flex-wrap gap-2">
            {quickSuggestions.map((item) => (
              <button
                key={item}
                onClick={() => ask(item)}
                className="px-3 py-1.5 rounded-full transition-all hover:shadow-sm"
                style={{ background: "#fff", color: "var(--primary)", fontSize: "11px", fontWeight: 700, border: "1px solid var(--border)" }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className="rounded-2xl p-3"
            style={{
              marginLeft: message.role === "user" ? "44px" : 0,
              marginRight: message.role === "assistant" ? "28px" : 0,
              background: message.role === "user" ? "var(--primary)" : "#fff",
              color: message.role === "user" ? "#fff" : "var(--foreground)",
              border: message.role === "assistant" ? "1px solid var(--border)" : "0",
              fontSize: "12px",
              lineHeight: 1.45,
            }}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="p-4 border-t flex gap-2" style={{ borderColor: "var(--border)" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") ask(input); }}
          placeholder="Pregunta sobre indicadores..."
          className="flex-1 rounded-xl px-3 py-2 outline-none"
          style={{ background: "var(--input-background)", fontSize: "12px", color: "var(--foreground)" }}
        />
        <button
          onClick={() => ask(input)}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
          style={{ background: "var(--primary)" }}
        >
          <Send size={15} />
        </button>
      </div>
    </div>
  );
}

export function AsistenteIA() {
  return (
    <div className="rounded-2xl border overflow-hidden" style={{ background: "#fff", borderColor: "var(--border)", height: "calc(100vh - 136px)" }}>
      <ChatContent />
    </div>
  );
}

export function AsistenteIAPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div className="absolute inset-0 bg-slate-950/20 pointer-events-auto" onClick={onClose} />
      <aside
        className="absolute right-0 top-0 h-full w-[420px] shadow-2xl pointer-events-auto flex flex-col"
        style={{ background: "#F8F9FC", borderLeft: "1px solid var(--border)" }}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 w-8 h-8 rounded-xl flex items-center justify-center hover:bg-gray-100"
          style={{ color: "var(--muted-foreground)" }}
        >
          <X size={16} />
        </button>
        <ChatContent compact />
      </aside>
    </div>
  );
}

