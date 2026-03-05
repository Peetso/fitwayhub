import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Target, Eye, Shield, Globe, Users, BookOpen, Heart, Dumbbell, Brain, BarChart, Zap, Star, Award, Activity, HelpCircle, ChevronDown, ChevronUp, Mail, MessageCircle, Phone, Send, Smartphone } from "lucide-react";
import { useState } from "react";
import { CalorieCalculator } from "@/components/website/CalorieCalculator";

const ICONS: Record<string, any> = { Target, Eye, Shield, Globe, Users, BookOpen, Heart, Dumbbell, Brain, BarChart, Zap, Star, Award, Activity, ArrowRight, Smartphone };

function Btn({ text, link, accent }: { text: string; link: string; accent?: boolean }) {
  return (
    <Link to={link} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", borderRadius: 11, backgroundColor: accent ? "var(--accent)" : "transparent", color: accent ? "#0A0A0B" : "var(--text-primary)", fontFamily: "'Chakra Petch', sans-serif", fontWeight: 700, fontSize: 15, textDecoration: "none", border: accent ? "none" : "1px solid var(--border-light)", letterSpacing: "0.02em" }}>
      {text} {accent && <ArrowRight size={17} />}
    </Link>
  );
}

// ── Section: Hero ─────────────────────────────────────────────────────────────
function HeroSection({ c }: { c: any }) {
  return (
    <section style={{ padding: "80px 24px 100px", textAlign: "center", position: "relative", overflow: "hidden", maxWidth: 1100, margin: "0 auto" }}>
      {c.backgroundImage ? (
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${c.backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.15, zIndex: 0 }} />
      ) : (
        <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 500, height: 300, backgroundColor: "var(--accent)", opacity: 0.06, filter: "blur(100px)", borderRadius: "50%", pointerEvents: "none" }} />
      )}
      <div style={{ position: "relative", zIndex: 1 }}>
        {c.badge && (
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: 20, backgroundColor: "var(--accent-dim)", border: "1px solid rgba(200,255,0,0.25)", marginBottom: 28 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "var(--accent)", display: "inline-block" }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", letterSpacing: "0.06em" }}>{c.badge}</span>
          </div>
        )}
        <h1 style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "clamp(32px, 6vw, 68px)", fontWeight: 700, lineHeight: 1.05, marginBottom: 20, color: "var(--text-primary)" }}>
          {c.heading}<br />
          {c.headingAccent && <span style={{ color: "var(--accent)" }}>{c.headingAccent}</span>}
        </h1>
        {c.subheading && <p style={{ fontSize: 17, color: "var(--text-secondary)", maxWidth: 520, margin: "0 auto 36px", lineHeight: 1.7 }}>{c.subheading}</p>}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          {c.primaryBtnText && <Btn text={c.primaryBtnText} link={c.primaryBtnLink || "/"} accent />}
          {c.secondaryBtnText && <Btn text={c.secondaryBtnText} link={c.secondaryBtnLink || "/"} />}
        </div>
      </div>
    </section>
  );
}

// ── Section: Stats ────────────────────────────────────────────────────────────
function StatsSection({ c }: { c: any }) {
  const items: { value: string; label: string }[] = c.items || [];
  return (
    <section style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", backgroundColor: "var(--bg-surface)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px", display: "grid", gridTemplateColumns: `repeat(auto-fit, minmax(140px, 1fr))`, gap: 0 }}>
        {items.map((s, i) => (
          <div key={i} style={{ textAlign: "center", padding: "16px", borderRight: i < items.length - 1 ? "1px solid var(--border)" : "none" }}>
            <p style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: 30, fontWeight: 700, color: "var(--accent)", lineHeight: 1 }}>{s.value}</p>
            <p style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Section: Features Grid ────────────────────────────────────────────────────
function FeaturesSection({ c }: { c: any }) {
  const items: { icon?: string; title: string; desc: string }[] = c.items || [];
  return (
    <section style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        {c.sectionLabel && <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 12 }}>{c.sectionLabel}</p>}
        {c.heading && <h2 style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 700, color: "var(--text-primary)" }}>{c.heading}</h2>}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
        {items.map((f, i) => {
          const Icon = f.icon ? ICONS[f.icon] : null;
          return (
            <div key={i} style={{ padding: "24px", backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16, transition: "border-color 0.2s, transform 0.2s" }}
              onMouseOver={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--accent)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; }}
              onMouseOut={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}>
              {Icon && (
                <div style={{ width: 44, height: 44, borderRadius: 11, backgroundColor: "var(--accent-dim)", border: "1px solid rgba(200,255,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <Icon size={20} color="var(--accent)" />
                </div>
              )}
              <h3 style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 8, color: "var(--text-primary)" }}>{f.title}</h3>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ── Section: Text + Image ─────────────────────────────────────────────────────
function TextImageSection({ c }: { c: any }) {
  const isRight = c.imageSide !== "left";
  const textBlock = (
    <div>
      {c.sectionLabel && <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 12 }}>{c.sectionLabel}</p>}
      <h2 style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "clamp(24px, 3.5vw, 38px)", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16, lineHeight: 1.2 }}>{c.heading}</h2>
      {c.text && <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: 24 }}>{c.text}</p>}
      {c.bullets && (
        <ul style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
          {(c.bullets as string[]).map((b, i) => (
            <li key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--text-secondary)" }}>
              <CheckCircle2 size={16} color="var(--accent)" style={{ flexShrink: 0 }} /> {b}
            </li>
          ))}
        </ul>
      )}
      {c.linkText && c.linkUrl && (
        <Link to={c.linkUrl} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>
          {c.linkText} <ArrowRight size={15} />
        </Link>
      )}
    </div>
  );
  const imageBlock = (
    <div style={{ position: "relative" }}>
      <div style={{ position: "absolute", inset: -16, backgroundColor: "var(--accent)", opacity: 0.05, borderRadius: "50%", filter: "blur(60px)" }} />
      {c.imageUrl ? (
        <img src={c.imageUrl} alt={c.heading} style={{ width: "100%", borderRadius: 20, objectFit: "cover", position: "relative", border: "1px solid var(--border)" }} />
      ) : (
        <div style={{ width: "100%", aspectRatio: "16/9", borderRadius: 20, backgroundColor: "var(--bg-surface)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", fontSize: 13 }}>No image set</div>
      )}
    </div>
  );
  return (
    <section style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 80px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }} className="hero-grid">
        {isRight ? <>{textBlock}{imageBlock}</> : <>{imageBlock}{textBlock}</>}
      </div>
    </section>
  );
}

// ── Section: CTA ──────────────────────────────────────────────────────────────
function CtaSection({ c }: { c: any }) {
  return (
    <section style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 96px" }}>
      <div style={{ padding: "56px 40px", borderRadius: 20, backgroundColor: "var(--bg-surface)", border: "1px solid var(--border)", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 400, height: 200, backgroundColor: "var(--accent)", opacity: 0.06, filter: "blur(80px)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          {c.badge && (
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20, padding: "5px 14px", borderRadius: 20, backgroundColor: "var(--accent-dim)", border: "1px solid rgba(200,255,0,0.25)" }}>
              <Zap size={13} color="var(--accent)" />
              <span style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", letterSpacing: "0.06em" }}>{c.badge}</span>
            </div>
          )}
          {c.iconName && ICONS[c.iconName] && (() => { const I = ICONS[c.iconName]; return <div style={{ width: 52, height: 52, borderRadius: 14, backgroundColor: "var(--accent-dim)", border: "1px solid rgba(200,255,0,0.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}><I size={24} color="var(--accent)" /></div>; })()}
          <h2 style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "clamp(24px, 4vw, 44px)", fontWeight: 700, color: "var(--text-primary)", marginBottom: 12, lineHeight: 1.1 }}>{c.heading}</h2>
          {c.subheading && <p style={{ fontSize: 15, color: "var(--text-secondary)", marginBottom: 32 }}>{c.subheading}</p>}
          {c.btnText && c.btnLink && (
            <Link to={c.btnLink} style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "14px 32px", borderRadius: 12, backgroundColor: "var(--accent)", color: "#0A0A0B", fontFamily: "'Chakra Petch', sans-serif", fontWeight: 700, fontSize: 15, textDecoration: "none", letterSpacing: "0.02em" }}>
              {c.btnText} <ArrowRight size={17} />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

// ── Section: Cards ────────────────────────────────────────────────────────────
function CardsSection({ c }: { c: any }) {
  const items: { icon?: string; title: string; desc: string; imageUrl?: string; color?: string }[] = c.items || [];
  const colorsMap: Record<string, string> = { accent: "var(--accent)", blue: "var(--blue)", cyan: "var(--cyan)", amber: "var(--amber)", red: "var(--red)" };
  return (
    <section style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 72px" }}>
      {(c.sectionLabel || c.heading) && (
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          {c.sectionLabel && <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 10 }}>{c.sectionLabel}</p>}
          {c.heading && <h2 style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 700 }}>{c.heading}</h2>}
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, maxWidth: items.length <= 2 ? 720 : undefined, margin: items.length <= 2 ? "0 auto" : undefined }}>
        {items.map((item, i) => {
          const Icon = item.icon ? ICONS[item.icon] : null;
          const color = colorsMap[item.color || ""] || "var(--accent)";
          return (
            <div key={i} style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16, padding: "28px 24px", overflow: "hidden", position: "relative" }}>
              {item.imageUrl && <img src={item.imageUrl} alt={item.title} style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 10, marginBottom: 16 }} />}
              {Icon && (
                <div style={{ width: 46, height: 46, borderRadius: 12, backgroundColor: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <Icon size={22} color={color} />
                </div>
              )}
              <h3 style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{item.title}</h3>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>{item.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ── Section: Contact Info ─────────────────────────────────────────────────────
function ContactInfoSection({ c }: { c: any }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const faqs: { q: string; a: string }[] = c.faqs || [];
  const inputStyle: React.CSSProperties = { backgroundColor: "var(--bg-primary)", border: "1px solid var(--border)", borderRadius: 10, padding: "12px 14px", width: "100%", fontSize: 14, color: "var(--text-primary)", fontFamily: "'Outfit', sans-serif", outline: "none" };
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 80px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, alignItems: "start" }}>
        {/* Contact Form */}
        <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 18, padding: "28px 24px" }}>
          <h2 style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: 17, fontWeight: 700, marginBottom: 22 }}>Send us a message</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {["Name", "Email"].map(label => (
                <div key={label}>
                  <label style={{ fontSize: 11, fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: 6 }}>{label}</label>
                  <input type={label === "Email" ? "email" : "text"} placeholder={label === "Name" ? "Your name" : "you@example.com"} style={inputStyle} />
                </div>
              ))}
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: 6 }}>Subject</label>
              <select style={{ ...inputStyle, cursor: "pointer" }}>
                <option>General Inquiry</option><option>Support</option><option>Partnership</option><option>Feedback</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: 6 }}>Message</label>
              <textarea rows={4} placeholder="How can we help you?" style={{ ...inputStyle, resize: "vertical" }} />
            </div>
            <button style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "13px", borderRadius: 10, backgroundColor: "var(--accent)", color: "#0A0A0B", fontFamily: "'Chakra Petch', sans-serif", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer" }}>
              <Send size={15} /> Send Message
            </button>
          </div>
        </div>
        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16, padding: "22px 20px" }}>
            <h3 style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Quick Contact</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { icon: MessageCircle, label: "Live Chat", detail: c.chatHours || "9am – 5pm", color: "var(--accent)" },
                { icon: Phone, label: "WhatsApp", detail: c.phone || "+20 123 456 7890", color: "var(--cyan)" },
                { icon: Mail, label: "Email", detail: c.email || "support@fitwayhub.com", color: "var(--blue)" },
              ].map(ci => (
                <div key={ci.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, backgroundColor: `${ci.color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <ci.icon size={17} color={ci.color} />
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600 }}>{ci.label}</p>
                    <p style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 1 }}>{ci.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {faqs.length > 0 && (
            <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16, padding: "22px 20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <HelpCircle size={16} color="var(--accent)" />
                <h3 style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: 14, fontWeight: 700 }}>FAQ</h3>
              </div>
              {faqs.map((faq, i) => (
                <div key={i} style={{ borderBottom: i < faqs.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left", color: "var(--text-primary)", fontSize: 13, fontWeight: 500 }}>
                    {faq.q}
                    {openFaq === i ? <ChevronUp size={15} color="var(--accent)" /> : <ChevronDown size={15} color="var(--text-muted)" />}
                  </button>
                  {openFaq === i && <div style={{ paddingBottom: 12, fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.65 }}>{faq.a}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Section: Custom HTML ──────────────────────────────────────────────────────
function HtmlSection({ c }: { c: any }) {
  return (
    <section style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }} dangerouslySetInnerHTML={{ __html: c.html || "" }} />
  );
}

// ── Section: Calorie Calculator ───────────────────────────────────────────────
function CalcSection({ c }: { c: any }) {
  return (
    <section style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 80px" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        {c.sectionLabel && <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 12 }}>{c.sectionLabel}</p>}
        {c.heading && <h2 style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: "clamp(24px, 3.5vw, 38px)", fontWeight: 700, color: "var(--text-primary)" }}>{c.heading}</h2>}
      </div>
      <CalorieCalculator />
    </section>
  );
}

// ── Main Renderer ─────────────────────────────────────────────────────────────
export interface CmsSection {
  id: number;
  type: string;
  content: any;
  is_visible: number;
}

export default function SectionRenderer({ section }: { section: CmsSection }) {
  const { type, content: c } = section;
  switch (type) {
    case "hero":          return <HeroSection c={c} />;
    case "stats":         return <StatsSection c={c} />;
    case "features":      return <FeaturesSection c={c} />;
    case "text_image":    return <TextImageSection c={c} />;
    case "cta":           return <CtaSection c={c} />;
    case "cards":         return <CardsSection c={c} />;
    case "contact_info":  return <ContactInfoSection c={c} />;
    case "calculator":    return <CalcSection c={c} />;
    case "html":          return <HtmlSection c={c} />;
    default:              return null;
  }
}
