import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRight, ArrowLeft, Check, Activity } from "lucide-react";

const goalSchema = z.object({ goal: z.enum(["lose_weight", "maintain_weight", "gain_weight", "build_muscle"]) });
const personalSchema = z.object({ gender: z.enum(["male", "female"]), dob: z.string().min(1), height: z.number().min(100).max(250), weight: z.number().min(30).max(300) });
const activitySchema = z.object({ activityLevel: z.enum(["sedentary", "light", "moderate", "active", "very_active"]), medicalHistory: z.string().optional() });
const targetSchema = z.object({ targetWeight: z.number().min(30).max(300), weeklyGoal: z.enum(["0.25", "0.5", "0.75", "1"]), dailySteps: z.enum(["5000", "10000", "15000"]) });

type OnboardingData = z.infer<typeof goalSchema> & z.infer<typeof personalSchema> & z.infer<typeof activitySchema> & z.infer<typeof targetSchema>;

const goals = [
  { id: "lose_weight", label: "Lose Weight", emoji: "🔥" },
  { id: "maintain_weight", label: "Maintain Weight", emoji: "⚖️" },
  { id: "gain_weight", label: "Gain Weight", emoji: "📈" },
  { id: "build_muscle", label: "Build Muscle", emoji: "💪" },
];
const activityLevels = [
  { id: "sedentary", label: "Sedentary", desc: "Little or no exercise" },
  { id: "light", label: "Light", desc: "1–3 days/week" },
  { id: "moderate", label: "Moderate", desc: "3–5 days/week" },
  { id: "active", label: "Active", desc: "6–7 days/week" },
  { id: "very_active", label: "Very Active", desc: "Hard exercise daily" },
];

const stepTitles = ["", "What's your main goal?", "Tell us about yourself", "Activity & Health", "Set your targets"];

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<OnboardingData>>({});
  const totalSteps = 4;

  const handleNext = (data: any) => {
    const merged = { ...formData, ...data };
    setFormData(merged);
    if (step < totalSteps) setStep(step + 1);
    else navigate("/app/dashboard");
  };

  const inputStyle: React.CSSProperties = { backgroundColor: "var(--bg-primary)", border: "1px solid var(--border)", borderRadius: 10, padding: "12px 14px", width: "100%", fontSize: 14, color: "var(--text-primary)", fontFamily: "'Outfit', sans-serif", outline: "none" };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-primary)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ width: "100%", maxWidth: 480, backgroundColor: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 22, overflow: "hidden" }}>
        {/* Progress bar */}
        <div style={{ height: 3, backgroundColor: "var(--border)" }}>
          <div style={{ height: "100%", width: `${(step / totalSteps) * 100}%`, backgroundColor: "var(--accent)", transition: "width 0.4s ease", boxShadow: "0 0 8px var(--accent-glow)" }} />
        </div>

        <div style={{ padding: "28px 28px 32px" }}>
          {/* Logo + Step */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ backgroundColor: "var(--accent)", width: 26, height: 26, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Activity size={14} color="#0A0A0B" />
              </div>
              <span style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: 15, fontWeight: 700 }}>FITWAY HUB</span>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: "var(--accent)", letterSpacing: "0.08em" }}>STEP {step}/{totalSteps}</span>
          </div>

          <h2 style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 24 }}>{stepTitles[step]}</h2>

          {/* Step 1 — Goal */}
          {step === 1 && (() => {
            const { register, handleSubmit, watch } = useForm({ resolver: zodResolver(goalSchema), defaultValues: { goal: formData.goal } });
            const sel = watch("goal");
            return (
              <form onSubmit={handleSubmit(handleNext)}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
                  {goals.map((g) => (
                    <label key={g.id} style={{ position: "relative" }}>
                      <input type="radio" value={g.id} {...register("goal")} style={{ position: "absolute", opacity: 0, width: 0, height: 0 }} />
                      <div style={{ padding: "16px 14px", borderRadius: 12, border: `2px solid ${sel === g.id ? "var(--accent)" : "var(--border)"}`, backgroundColor: sel === g.id ? "var(--accent-dim)" : "var(--bg-card)", cursor: "pointer", transition: "all 0.15s", textAlign: "center" }}>
                        <div style={{ fontSize: 24, marginBottom: 6 }}>{g.emoji}</div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: sel === g.id ? "var(--accent)" : "var(--text-primary)" }}>{g.label}</p>
                      </div>
                    </label>
                  ))}
                </div>
                <button type="submit" style={{ width: "100%", padding: "13px", borderRadius: 11, backgroundColor: "var(--accent)", color: "#0A0A0B", fontFamily: "'Chakra Petch', sans-serif", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  Continue <ArrowRight size={16} />
                </button>
              </form>
            );
          })()}

          {/* Step 2 — Personal */}
          {step === 2 && (() => {
            const { register, handleSubmit } = useForm({ resolver: zodResolver(personalSchema), defaultValues: { gender: formData.gender, dob: formData.dob, height: formData.height, weight: formData.weight } });
            return (
              <form onSubmit={handleSubmit(handleNext)} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 8 }}>Gender</label>
                  <div style={{ display: "flex", gap: 8 }}>
                    {["male", "female"].map((g) => (
                      <label key={g} style={{ flex: 1, position: "relative" }}>
                        <input type="radio" value={g} {...register("gender")} style={{ position: "absolute", opacity: 0 }} />
                        <div style={{ padding: "10px", borderRadius: 10, border: "1px solid var(--border)", backgroundColor: "var(--bg-card)", cursor: "pointer", textAlign: "center", fontSize: 13, fontWeight: 500, textTransform: "capitalize" }}>{g}</div>
                      </label>
                    ))}
                  </div>
                </div>
                {[{ label: "Date of Birth", type: "date", key: "dob" }, { label: "Height (cm)", type: "number", key: "height" }, { label: "Weight (kg)", type: "number", key: "weight" }].map((f) => (
                  <div key={f.key}>
                    <label style={{ fontSize: 11, fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 6 }}>{f.label}</label>
                    <input type={f.type} {...register(f.key as any, f.key !== "dob" ? { valueAsNumber: true } : {})} style={inputStyle} />
                  </div>
                ))}
                <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                  <button type="button" onClick={() => setStep(s => s - 1)} style={{ flex: 1, padding: "12px", borderRadius: 10, backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><ArrowLeft size={15} /> Back</button>
                  <button type="submit" style={{ flex: 2, padding: "12px", borderRadius: 10, backgroundColor: "var(--accent)", color: "#0A0A0B", fontFamily: "'Chakra Petch', sans-serif", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>Continue <ArrowRight size={15} /></button>
                </div>
              </form>
            );
          })()}

          {/* Step 3 — Activity */}
          {step === 3 && (() => {
            const { register, handleSubmit, watch } = useForm({ resolver: zodResolver(activitySchema), defaultValues: { activityLevel: formData.activityLevel, medicalHistory: formData.medicalHistory } });
            const sel = watch("activityLevel");
            return (
              <form onSubmit={handleSubmit(handleNext)} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 10 }}>Activity Level</label>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {activityLevels.map((a) => (
                      <label key={a.id} style={{ position: "relative" }}>
                        <input type="radio" value={a.id} {...register("activityLevel")} style={{ position: "absolute", opacity: 0 }} />
                        <div style={{ padding: "12px 14px", borderRadius: 10, border: `1px solid ${sel === a.id ? "var(--accent)" : "var(--border)"}`, backgroundColor: sel === a.id ? "var(--accent-dim)" : "var(--bg-card)", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div>
                            <p style={{ fontSize: 13, fontWeight: 600, color: sel === a.id ? "var(--accent)" : "var(--text-primary)" }}>{a.label}</p>
                            <p style={{ fontSize: 12, color: "var(--text-secondary)" }}>{a.desc}</p>
                          </div>
                          {sel === a.id && <Check size={16} color="var(--accent)" />}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 6 }}>Medical History (optional)</label>
                  <input type="text" {...register("medicalHistory")} style={inputStyle} placeholder="Any injuries or conditions…" />
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button type="button" onClick={() => setStep(s => s - 1)} style={{ flex: 1, padding: "12px", borderRadius: 10, backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><ArrowLeft size={15} /> Back</button>
                  <button type="submit" style={{ flex: 2, padding: "12px", borderRadius: 10, backgroundColor: "var(--accent)", color: "#0A0A0B", fontFamily: "'Chakra Petch', sans-serif", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>Continue <ArrowRight size={15} /></button>
                </div>
              </form>
            );
          })()}

          {/* Step 4 — Targets */}
          {step === 4 && (() => {
            const { register, handleSubmit } = useForm({ resolver: zodResolver(targetSchema), defaultValues: { targetWeight: formData.targetWeight, weeklyGoal: formData.weeklyGoal, dailySteps: formData.dailySteps } });
            return (
              <form onSubmit={handleSubmit(handleNext)} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[{ label: "Target Weight (kg)", type: "number", key: "targetWeight" }].map((f) => (
                  <div key={f.key}>
                    <label style={{ fontSize: 11, fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 6 }}>{f.label}</label>
                    <input type="number" {...register(f.key as any, { valueAsNumber: true })} style={inputStyle} />
                  </div>
                ))}
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 6 }}>Weekly Goal (kg/week)</label>
                  <select {...register("weeklyGoal")} style={{ ...inputStyle, cursor: "pointer" }}>
                    <option value="0.25">0.25 kg/week (slow)</option>
                    <option value="0.5">0.5 kg/week (normal)</option>
                    <option value="0.75">0.75 kg/week (fast)</option>
                    <option value="1">1 kg/week (aggressive)</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 6 }}>Daily Steps Goal</label>
                  <select {...register("dailySteps")} style={{ ...inputStyle, cursor: "pointer" }}>
                    <option value="5000">5,000 steps</option>
                    <option value="10000">10,000 steps</option>
                    <option value="15000">15,000 steps</option>
                  </select>
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                  <button type="button" onClick={() => setStep(s => s - 1)} style={{ flex: 1, padding: "12px", borderRadius: 10, backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><ArrowLeft size={15} /> Back</button>
                  <button type="submit" style={{ flex: 2, padding: "12px", borderRadius: 10, backgroundColor: "var(--accent)", color: "#0A0A0B", fontFamily: "'Chakra Petch', sans-serif", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>Finish Setup <Check size={15} /></button>
                </div>
              </form>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
