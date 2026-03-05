import { useState } from "react";
import { Check, X, Crown, Star, Zap, CreditCard, ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import PaymentForm from "@/components/app/PaymentForm";

type Step = "plans" | "payment";

export default function Pricing() {
  const { user, updateUser, token } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("plans");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  const monthlyPrice = 50;
  const annualPrice = 450;
  const amount = billingCycle === "annual" ? annualPrice : monthlyPrice;

  const freeFeatures = [
    { label: "Basic Workout Programs", ok: true },
    { label: "Community Access", ok: true },
    { label: "Basic Progress Tracking", ok: true },
    { label: "Advanced Analytics", ok: false },
    { label: "1-on-1 Coaching", ok: false },
    { label: "Custom Meal Plans", ok: false },
  ];
  const premiumFeatures = ["All Workout Programs", "Advanced Analytics & Insights", "1-on-1 Coaching Chat", "Personalized Nutrition Plans", "Live GPS Tracking", "Priority Support"];

  const handleSuccess = () => {
    updateUser({ isPremium: true });
    navigate("/app/dashboard");
  };

  if (step === "payment") {
    return (
      <div style={{ padding: "24px 20px 40px", maxWidth: 500, margin: "0 auto" }}>
        <button onClick={() => setStep("plans")} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", fontSize: 13, marginBottom: 24, padding: 0 }}>
          <ArrowLeft size={15} /> Back to plans
        </button>
        <div style={{ backgroundColor: "var(--bg-card)", border: "2px solid var(--accent)", borderRadius: 18, padding: "28px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <Crown size={18} color="var(--accent)" />
            <h2 style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: 20, fontWeight: 700 }}>
              Premium {billingCycle === "annual" ? "Annual" : "Monthly"}
            </h2>
          </div>
          <p style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 6 }}>
            {billingCycle === "annual" ? `${Math.round(annualPrice / 12)} EGP/month · billed ${annualPrice} EGP/year` : `${monthlyPrice} EGP/month`}
          </p>

          {/* Billing cycle toggle */}
          <div style={{ display: "flex", gap: 4, backgroundColor: "var(--bg-surface)", padding: 3, borderRadius: 9, marginBottom: 24 }}>
            {(["monthly", "annual"] as const).map((c) => (
              <button key={c} onClick={() => setBillingCycle(c)} style={{ flex: 1, padding: "8px 0", borderRadius: 7, fontSize: 12, fontWeight: 600, border: "none", cursor: "pointer", backgroundColor: billingCycle === c ? "var(--accent)" : "transparent", color: billingCycle === c ? "#0A0A0B" : "var(--text-secondary)", transition: "all 0.15s" }}>
                {c === "monthly" ? "Monthly" : "Annual (save 25%)"}
              </button>
            ))}
          </div>

          {/* Amount summary */}
          <div style={{ padding: "12px 14px", backgroundColor: "var(--bg-surface)", borderRadius: 10, border: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{billingCycle === "annual" ? "Annual total" : "Monthly charge"}</span>
            <span style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: 18, fontWeight: 700, color: "var(--accent)" }}>{amount} EGP</span>
          </div>

          <PaymentForm
            amount={amount}
            plan={billingCycle}
            type={user?.role === "coach" ? "coach" : "user"}
            token={token}
            onSuccess={handleSuccess}
          />
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "24px 20px 40px", maxWidth: 900, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <h1 style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 700, marginBottom: 8 }}>Unlock Your Full Potential</h1>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", maxWidth: 400, margin: "0 auto" }}>Get personalized coaching, advanced analytics, and exclusive programs.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginBottom: 40, alignItems: "start" }}>
        <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 18, padding: "28px 24px" }}>
          <h3 style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: 17, fontWeight: 700, marginBottom: 4 }}>Free Plan</h3>
          <p style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 20 }}>Essential tools to get you moving.</p>
          <div style={{ marginBottom: 24 }}><span style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: 40, fontWeight: 700 }}>0</span><span style={{ fontSize: 14, color: "var(--text-secondary)" }}> EGP/month</span></div>
          <ul style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
            {freeFeatures.map((f) => (
              <li key={f.label} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: f.ok ? "var(--text-primary)" : "var(--text-muted)" }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", backgroundColor: f.ok ? "var(--accent-dim)" : "var(--bg-surface)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {f.ok ? <Check size={12} color="var(--accent)" /> : <X size={12} color="var(--text-muted)" />}
                </div>
                {f.label}
              </li>
            ))}
          </ul>
          <button disabled style={{ width: "100%", padding: "12px", borderRadius: 10, border: "1px solid var(--border)", backgroundColor: "transparent", color: "var(--text-secondary)", fontSize: 14, fontWeight: 600, cursor: "pointer", opacity: 0.6 }}>
            {user?.isPremium ? "Switch to Free" : "Current Plan"}
          </button>
        </div>
        <div style={{ backgroundColor: "var(--bg-card)", border: "2px solid var(--accent)", borderRadius: 18, padding: "28px 24px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, right: 0, padding: "5px 14px", backgroundColor: "var(--accent)", borderBottomLeftRadius: 12, fontSize: 11, fontWeight: 700, color: "#0A0A0B", fontFamily: "'Chakra Petch', sans-serif", letterSpacing: "0.05em" }}>RECOMMENDED</div>
          <div style={{ position: "absolute", bottom: -40, right: -40, width: 150, height: 150, borderRadius: "50%", backgroundColor: "var(--accent-dim)", filter: "blur(50px)" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}><Crown size={16} color="var(--accent)" /><h3 style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: 17, fontWeight: 700 }}>Premium</h3></div>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 20 }}>Everything for serious results.</p>
            <div style={{ marginBottom: 24 }}>
              <span style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: 40, fontWeight: 700, color: "var(--accent)" }}>{monthlyPrice}</span>
              <span style={{ fontSize: 14, color: "var(--text-secondary)" }}> EGP/month</span>
              <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>or {annualPrice} EGP/year (save 25%)</p>
            </div>
            <ul style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
              {premiumFeatures.map((f) => (
                <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14 }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", backgroundColor: "var(--accent-dim)", border: "1px solid rgba(200,255,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Check size={12} color="var(--accent)" /></div>
                  {f}
                </li>
              ))}
            </ul>
            <button onClick={() => setStep("payment")} disabled={user?.isPremium} style={{ width: "100%", padding: "13px", borderRadius: 10, backgroundColor: "var(--accent)", color: "#0A0A0B", fontFamily: "'Chakra Petch', sans-serif", fontWeight: 700, fontSize: 14, border: "none", cursor: user?.isPremium ? "default" : "pointer", opacity: user?.isPremium ? 0.6 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              {user?.isPremium ? "Active Plan ✓" : <><CreditCard size={15} /> Upgrade Now</>}
            </button>
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
        {[
          { icon: Zap, color: "var(--blue)", title: "Faster Results", desc: "Premium members reach their goals 2x faster on average." },
          { icon: Star, color: "var(--amber)", title: "Expert Guidance", desc: "Direct access to certified trainers for form checks and advice." },
          { icon: Crown, color: "var(--accent)", title: "Exclusive Content", desc: "New premium-only programs added every month." },
        ].map((v) => (
          <div key={v.title} style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: "20px 18px", textAlign: "center" }}>
            <div style={{ width: 44, height: 44, borderRadius: 11, backgroundColor: `${v.color}18`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}><v.icon size={20} color={v.color} /></div>
            <h4 style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{v.title}</h4>
            <p style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.65 }}>{v.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
