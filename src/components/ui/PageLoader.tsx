import { Activity } from "lucide-react";

/** Full-screen loading spinner matching FitWay brand */
export default function PageLoader({ message }: { message?: string }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 20,
        backgroundColor: "var(--bg-primary)",
        zIndex: 99998,
      }}
    >
      {/* Logo icon */}
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          backgroundColor: "var(--accent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: "pulse-glow 1.4s ease-in-out infinite",
        }}
      >
        <Activity size={26} color="#0A0A0B" strokeWidth={2.5} />
      </div>

      {/* Spinner */}
      <div
        style={{
          width: 36,
          height: 36,
          border: "3px solid var(--border)",
          borderTopColor: "var(--accent)",
          borderRadius: "50%",
          animation: "spin .7s linear infinite",
        }}
      />

      {/* Optional message */}
      {message && (
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: 14,
            fontFamily: "'Outfit', sans-serif",
            marginTop: 4,
          }}
        >
          {message}
        </p>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
        @keyframes pulse-glow { 0%,100% { opacity:1; transform:scale(1) } 50% { opacity:.7; transform:scale(.92) } }
      `}</style>
    </div>
  );
}
