import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

type ResultType = "success" | "cancel" | "error";

export default function PaymentResult({ result }: { result: ResultType }) {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const reason = params.get("reason");

  // Auto-refresh user on success
  useEffect(() => {
    if (result === "success") refreshUser?.();
  }, [result]);

  const configs = {
    success: {
      icon: <CheckCircle size={64} color="var(--accent)" />,
      title: "Payment Successful! 🎉",
      message: "Your payment has been completed. Your plan is now active.",
      btnLabel: "Go to Dashboard",
      btnAction: () => navigate("/app/dashboard"),
      color: "var(--accent)",
      bg: "rgba(0,220,130,0.07)",
      border: "rgba(0,220,130,0.25)",
    },
    cancel: {
      icon: <AlertCircle size={64} color="#FFAA00" />,
      title: "Payment Cancelled",
      message: "You cancelled the payment process. No charges were made. You can try again whenever you're ready.",
      btnLabel: "Back to Pricing",
      btnAction: () => navigate(-1),
      color: "#FFAA00",
      bg: "rgba(255,170,0,0.07)",
      border: "rgba(255,170,0,0.25)",
    },
    error: {
      icon: <XCircle size={64} color="var(--red)" />,
      title: "Payment Failed",
      message: reason === "not_configured"
        ? "Payment gateway is not configured yet. Please use the E-Wallet option."
        : reason === "not_completed"
        ? "The payment was not completed. Please try again."
        : "Something went wrong with your payment. No charges were made. Please try again or choose a different payment method.",
      btnLabel: "Try Again",
      btnAction: () => navigate(-1),
      color: "var(--red)",
      bg: "rgba(255,68,68,0.07)",
      border: "rgba(255,68,68,0.25)",
    },
  };

  const cfg = configs[result];

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      backgroundColor: "var(--bg-base)", padding: 24,
    }}>
      <div style={{
        maxWidth: 460, width: "100%", backgroundColor: "var(--bg-card)",
        border: `1px solid ${cfg.border}`, borderRadius: 24,
        padding: "48px 36px", textAlign: "center",
        boxShadow: `0 0 60px ${cfg.bg}`,
      }}>
        <div style={{ marginBottom: 24 }}>{cfg.icon}</div>
        <h1 style={{
          fontFamily: "'Chakra Petch', sans-serif", fontSize: 24, fontWeight: 800,
          color: cfg.color, marginBottom: 14,
        }}>{cfg.title}</h1>
        <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 32 }}>
          {cfg.message}
        </p>
        <button
          onClick={cfg.btnAction}
          style={{
            padding: "14px 32px", borderRadius: 12,
            backgroundColor: cfg.color, color: result === "success" ? "#0A0A0B" : "#fff",
            fontFamily: "'Chakra Petch', sans-serif", fontWeight: 700, fontSize: 15,
            border: "none", cursor: "pointer",
          }}
        >
          {cfg.btnLabel}
        </button>
      </div>
    </div>
  );
}
