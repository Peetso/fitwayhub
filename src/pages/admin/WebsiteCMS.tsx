import { getApiBase } from "@/lib/api";
import { useState, useEffect, useRef } from "react";
import { Plus, Trash2, Eye, EyeOff, ChevronUp, ChevronDown, Edit3, Save, X, Upload, Image, Globe, Layout, Type, AlignLeft, Grid, Layers, ExternalLink } from "lucide-react";

interface Section {
  id: number;
  page: string;
  type: string;
  label: string;
  content: any;
  sort_order: number;
  is_visible: number;
}

const PAGES = ["home", "about", "contact"] as const;
type Page = typeof PAGES[number];

const SECTION_TYPES: { type: string; label: string; icon: any; defaultContent: any }[] = [
  { type: "hero", label: "Hero Banner", icon: Layout,
    defaultContent: { badge: "", heading: "Your Heading Here", headingAccent: "Accent Text", subheading: "Your subheading text goes here.", primaryBtnText: "Get Started", primaryBtnLink: "/auth/register", secondaryBtnText: "Learn More", secondaryBtnLink: "/about", backgroundImage: "" } },
  { type: "stats", label: "Stats Bar", icon: Grid,
    defaultContent: { items: [{ value: "1K+", label: "Members" }, { value: "50+", label: "Programs" }, { value: "4.9★", label: "Rating" }, { value: "98%", label: "Satisfaction" }] } },
  { type: "features", label: "Features Grid", icon: Grid,
    defaultContent: { sectionLabel: "Why Us", heading: "Everything You Need", items: [{ icon: "Dumbbell", title: "Feature 1", desc: "Description here" }, { icon: "Brain", title: "Feature 2", desc: "Description here" }, { icon: "BarChart", title: "Feature 3", desc: "Description here" }, { icon: "Users", title: "Feature 4", desc: "Description here" }] } },
  { type: "text_image", label: "Text + Image", icon: AlignLeft,
    defaultContent: { sectionLabel: "", heading: "Section Heading", text: "Your text content goes here.", bullets: ["Point one", "Point two", "Point three"], imageSide: "right", imageUrl: "", linkText: "Learn more", linkUrl: "/" } },
  { type: "cards", label: "Cards Grid", icon: Layers,
    defaultContent: { sectionLabel: "", heading: "Cards Title", items: [{ icon: "Target", title: "Card 1", desc: "Description here", color: "accent" }, { icon: "Eye", title: "Card 2", desc: "Description here", color: "blue" }] } },
  { type: "cta", label: "CTA Banner", icon: ExternalLink,
    defaultContent: { badge: "JOIN US", heading: "Your Call to Action", subheading: "Supporting text here.", btnText: "Get Started", btnLink: "/auth/register" } },
  { type: "contact_info", label: "Contact Info + FAQ", icon: Type,
    defaultContent: { phone: "+1 234 567 8900", email: "hello@example.com", chatHours: "9am – 5pm", faqs: [{ q: "Question here?", a: "Answer here." }] } },
  { type: "calculator", label: "Calorie Calculator", icon: Grid,
    defaultContent: { sectionLabel: "Free Tool", heading: "Calorie Calculator" } },
  { type: "html", label: "Custom HTML", icon: Type,
    defaultContent: { html: "<div><h2>Custom HTML Section</h2><p>Edit this in the admin panel.</p></div>" } },
];

const ICON_OPTIONS = ["Dumbbell", "Brain", "BarChart", "Users", "Target", "Eye", "Shield", "Globe", "BookOpen", "Heart", "Zap", "Star", "Award", "Activity", "Smartphone"];
const COLOR_OPTIONS = ["accent", "blue", "cyan", "amber", "red"];

const iS: React.CSSProperties = { backgroundColor: "var(--bg-primary)", border: "1px solid var(--border)", borderRadius: 8, padding: "9px 12px", width: "100%", fontSize: 13, color: "var(--text-primary)", fontFamily: "'Outfit', sans-serif", outline: "none", boxSizing: "border-box" };
const taS: React.CSSProperties = { ...iS, resize: "vertical", minHeight: 80 };
const labelS: React.CSSProperties = { fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.07em", display: "block", marginBottom: 5 };

interface Props {
  token: string | null;
  showMsg: (m: string) => void;
}

export default function WebsiteCMS({ token, showMsg }: Props) {
  const [activePage, setActivePage] = useState<Page>("home");
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState<any>({});
  const [editLabel, setEditLabel] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [addType, setAddType] = useState(SECTION_TYPES[0].type);
  const [addLabel, setAddLabel] = useState(SECTION_TYPES[0].label);
  const [saving, setSaving] = useState(false);
  const [brandingLoading, setBrandingLoading] = useState(false);
  const [brandingSaving, setBrandingSaving] = useState(false);
  const [brandingForm, setBrandingForm] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingFor, setUploadingFor] = useState<string | null>(null);

  const api = (path: string, opts?: RequestInit) =>
    fetch(getApiBase() + path, { ...opts, headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, ...(opts?.headers || {}) } });

  const apiForm = (path: string, body: FormData) =>
    fetch(getApiBase() + path, { method: "POST", headers: { Authorization: `Bearer ${token}` }, body });

  const loadBranding = async () => {
    setBrandingLoading(true);
    try {
      const r = await api("/api/admin/app-settings");
      const d = await r.json();
      const rows = (d?.settings || []) as any[];
      const brandingRows = rows.filter((s: any) => s.category === "branding");
      const map: Record<string, string> = {};
      for (const s of brandingRows) map[s.setting_key] = s.setting_value || "";
      setBrandingForm(map);
    } catch {
      showMsg("❌ Failed to load branding settings");
    } finally {
      setBrandingLoading(false);
    }
  };

  const saveBranding = async () => {
    setBrandingSaving(true);
    try {
      const keys = [
        "app_name", "app_tagline", "logo_url", "favicon_url", "footer_text", "copyright_text",
        "primary_color", "secondary_color", "bg_primary", "bg_card",
        "font_en", "font_ar", "font_heading",
        "social_instagram", "social_facebook", "social_twitter", "social_youtube",
      ];
      const payload: Record<string, string> = {};
      for (const k of keys) payload[k] = brandingForm[k] || "";
      const r = await api("/api/admin/app-settings", { method: "PUT", body: JSON.stringify(payload) });
      if (!r.ok) throw new Error("save failed");
      showMsg("✅ Branding settings saved");
      window.dispatchEvent(new Event("branding:refresh"));
      loadBranding();
    } catch {
      showMsg("❌ Failed to save branding settings");
    } finally {
      setBrandingSaving(false);
    }
  };

  const uploadBrandingImage = async (key: string, file: File) => {
    const fd = new FormData();
    fd.append("image", file);
    try {
      const resp = await fetch(getApiBase() + "/api/admin/upload-branding-image", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const d = await resp.json();
      if (!resp.ok || !d?.url) throw new Error("upload failed");
      setBrandingForm(prev => ({ ...prev, [key]: d.url }));
      // Persist the uploaded image URL immediately so branding context can read it.
      const saveResp = await api("/api/admin/app-settings", {
        method: "PUT",
        body: JSON.stringify({ [key]: d.url }),
      });
      if (!saveResp.ok) throw new Error("save failed");

      showMsg("✅ Image uploaded and applied");
      window.dispatchEvent(new Event("branding:refresh"));
      await loadBranding();
    } catch {
      showMsg("❌ Branding image upload failed");
    }
  };

  const load = async () => {
    setLoading(true);
    const r = await api(`/api/cms/admin/sections/${activePage}`);
    const d = await r.json();
    setSections(d.sections || []);
    setLoading(false);
  };

  useEffect(() => { load(); setEditingId(null); }, [activePage]);
  useEffect(() => { loadBranding(); }, []);

  const toggleVisible = async (s: Section) => {
    await api(`/api/cms/admin/sections/${s.id}`, { method: "PUT", body: JSON.stringify({ is_visible: !s.is_visible }) });
    setSections(prev => prev.map(x => x.id === s.id ? { ...x, is_visible: x.is_visible ? 0 : 1 } : x));
  };

  const deleteSection = async (id: number) => {
    if (!confirm("Delete this section?")) return;
    await api(`/api/cms/admin/sections/${id}`, { method: "DELETE" });
    setSections(prev => prev.filter(x => x.id !== id));
    showMsg("🗑️ Section deleted");
  };

  const moveSection = async (id: number, dir: "up" | "down") => {
    const idx = sections.findIndex(s => s.id === id);
    if (dir === "up" && idx === 0) return;
    if (dir === "down" && idx === sections.length - 1) return;
    const newSections = [...sections];
    const swapIdx = dir === "up" ? idx - 1 : idx + 1;
    [newSections[idx], newSections[swapIdx]] = [newSections[swapIdx], newSections[idx]];
    const orders = newSections.map((s, i) => ({ id: s.id, sort_order: i + 1 }));
    setSections(newSections.map((s, i) => ({ ...s, sort_order: i + 1 })));
    await api("/api/cms/admin/sections/reorder", { method: "POST", body: JSON.stringify({ orders }) });
  };

  const startEdit = (s: Section) => {
    setEditingId(s.id);
    setEditContent(JSON.parse(JSON.stringify(s.content)));
    setEditLabel(s.label);
  };

  const saveEdit = async () => {
    if (!editingId) return;
    setSaving(true);
    await api(`/api/cms/admin/sections/${editingId}`, { method: "PUT", body: JSON.stringify({ label: editLabel, content: editContent }) });
    setSections(prev => prev.map(s => s.id === editingId ? { ...s, label: editLabel, content: editContent } : s));
    setEditingId(null);
    setSaving(false);
    showMsg("✅ Section saved");
  };

  const addSection = async () => {
    const typeDef = SECTION_TYPES.find(t => t.type === addType)!;
    const r = await api("/api/cms/admin/sections", {
      method: "POST",
      body: JSON.stringify({ page: activePage, type: addType, label: addLabel || typeDef.label, content: typeDef.defaultContent }),
    });
    const d = await r.json();
    setSections(prev => [...prev, d.section]);
    setShowAddModal(false);
    setAddLabel("");
    showMsg("✅ Section added");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    const r = await apiForm("/api/cms/admin/upload-image", formData);
    const d = await r.json();
    if (d.url) {
      setEditContent((prev: any) => ({ ...prev, [field]: d.url }));
      showMsg("✅ Image uploaded");
    }
    setUploadingFor(null);
  };

  // ── Content field editors by section type ────────────────────────────────────
  const renderContentEditor = (type: string) => {
    const c = editContent;
    const set = (field: string, value: any) => setEditContent((prev: any) => ({ ...prev, [field]: value }));

    const imageField = (field: string, label: string) => (
      <div>
        <label style={labelS}>{label}</label>
        <div style={{ display: "flex", gap: 8 }}>
          <input style={{ ...iS, flex: 1 }} value={c[field] || ""} onChange={e => set(field, e.target.value)} placeholder="Paste image URL or upload..." />
          <button type="button" onClick={() => { setUploadingFor(field); fileInputRef.current?.click(); }}
            style={{ padding: "9px 12px", borderRadius: 8, backgroundColor: "var(--accent-dim)", border: "1px solid var(--accent)", color: "var(--accent)", cursor: "pointer", flexShrink: 0 }}>
            <Upload size={14} />
          </button>
        </div>
        {c[field] && <img src={c[field]} alt="preview" style={{ marginTop: 8, maxHeight: 100, maxWidth: "100%", borderRadius: 8, objectFit: "contain", border: "1px solid var(--border)" }} />}
      </div>
    );

    if (type === "hero") return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div><label style={labelS}>Badge Text</label><input style={iS} value={c.badge || ""} onChange={e => set("badge", e.target.value)} placeholder="e.g. #1 FITNESS APP" /></div>
        <div><label style={labelS}>Heading</label><input style={iS} value={c.heading || ""} onChange={e => set("heading", e.target.value)} /></div>
        <div><label style={labelS}>Heading Accent (colored)</label><input style={iS} value={c.headingAccent || ""} onChange={e => set("headingAccent", e.target.value)} /></div>
        <div><label style={labelS}>Subheading</label><textarea style={taS} value={c.subheading || ""} onChange={e => set("subheading", e.target.value)} /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div><label style={labelS}>Primary Button Text</label><input style={iS} value={c.primaryBtnText || ""} onChange={e => set("primaryBtnText", e.target.value)} /></div>
          <div><label style={labelS}>Primary Button Link</label><input style={iS} value={c.primaryBtnLink || ""} onChange={e => set("primaryBtnLink", e.target.value)} /></div>
          <div><label style={labelS}>Secondary Button Text</label><input style={iS} value={c.secondaryBtnText || ""} onChange={e => set("secondaryBtnText", e.target.value)} /></div>
          <div><label style={labelS}>Secondary Button Link</label><input style={iS} value={c.secondaryBtnLink || ""} onChange={e => set("secondaryBtnLink", e.target.value)} /></div>
        </div>
        {imageField("backgroundImage", "Background Image (optional)")}
      </div>
    );

    if (type === "stats") return (
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <label style={labelS}>Stats Items</label>
          <button onClick={() => set("items", [...(c.items || []), { value: "0", label: "New Stat" }])}
            style={{ padding: "4px 10px", borderRadius: 6, backgroundColor: "var(--accent-dim)", border: "1px solid var(--accent)", color: "var(--accent)", cursor: "pointer", fontSize: 12 }}>+ Add</button>
        </div>
        {(c.items || []).map((item: any, i: number) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 8, marginBottom: 8 }}>
            <input style={iS} value={item.value} onChange={e => { const items = [...c.items]; items[i] = { ...item, value: e.target.value }; set("items", items); }} placeholder="12K+" />
            <input style={iS} value={item.label} onChange={e => { const items = [...c.items]; items[i] = { ...item, label: e.target.value }; set("items", items); }} placeholder="Active Members" />
            <button onClick={() => set("items", c.items.filter((_: any, j: number) => j !== i))}
              style={{ padding: "9px", borderRadius: 8, background: "rgba(255,68,68,0.1)", border: "1px solid var(--red)", color: "var(--red)", cursor: "pointer" }}><Trash2 size={13} /></button>
          </div>
        ))}
      </div>
    );

    if (type === "features" || type === "cards") return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div><label style={labelS}>Section Label</label><input style={iS} value={c.sectionLabel || ""} onChange={e => set("sectionLabel", e.target.value)} /></div>
          <div><label style={labelS}>Section Heading</label><input style={iS} value={c.heading || ""} onChange={e => set("heading", e.target.value)} /></div>
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <label style={labelS}>{type === "features" ? "Feature" : "Card"} Items</label>
            <button onClick={() => set("items", [...(c.items || []), { icon: "Dumbbell", title: "New Item", desc: "Description", color: "accent" }])}
              style={{ padding: "4px 10px", borderRadius: 6, backgroundColor: "var(--accent-dim)", border: "1px solid var(--accent)", color: "var(--accent)", cursor: "pointer", fontSize: 12 }}>+ Add Item</button>
          </div>
          {(c.items || []).map((item: any, i: number) => (
            <div key={i} style={{ padding: 12, backgroundColor: "var(--bg-primary)", borderRadius: 10, border: "1px solid var(--border)", marginBottom: 10 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 8, marginBottom: 8 }}>
                <div>
                  <label style={{ ...labelS, marginBottom: 4 }}>Icon</label>
                  <select style={iS} value={item.icon || ""} onChange={e => { const items = [...c.items]; items[i] = { ...item, icon: e.target.value }; set("items", items); }}>
                    <option value="">None</option>
                    {ICON_OPTIONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ ...labelS, marginBottom: 4 }}>Title</label>
                  <input style={iS} value={item.title} onChange={e => { const items = [...c.items]; items[i] = { ...item, title: e.target.value }; set("items", items); }} />
                </div>
                {type === "cards" && (
                  <div>
                    <label style={{ ...labelS, marginBottom: 4 }}>Color</label>
                    <select style={iS} value={item.color || "accent"} onChange={e => { const items = [...c.items]; items[i] = { ...item, color: e.target.value }; set("items", items); }}>
                      {COLOR_OPTIONS.map(co => <option key={co} value={co}>{co}</option>)}
                    </select>
                  </div>
                )}
                <div style={{ display: "flex", alignItems: "flex-end" }}>
                  <button onClick={() => set("items", c.items.filter((_: any, j: number) => j !== i))}
                    style={{ padding: "9px", borderRadius: 8, background: "rgba(255,68,68,0.1)", border: "1px solid var(--red)", color: "var(--red)", cursor: "pointer" }}><Trash2 size={13} /></button>
                </div>
              </div>
              <div>
                <label style={{ ...labelS, marginBottom: 4 }}>Description</label>
                <textarea style={{ ...taS, minHeight: 60 }} value={item.desc} onChange={e => { const items = [...c.items]; items[i] = { ...item, desc: e.target.value }; set("items", items); }} />
              </div>
              {type === "cards" && (
                <div style={{ marginTop: 8 }}>
                  <label style={{ ...labelS, marginBottom: 4 }}>Card Image URL (optional)</label>
                  <div style={{ display: "flex", gap: 8 }}>
                    <input style={{ ...iS, flex: 1 }} value={item.imageUrl || ""} onChange={e => { const items = [...c.items]; items[i] = { ...item, imageUrl: e.target.value }; set("items", items); }} placeholder="https://..." />
                    <button type="button" onClick={() => { setUploadingFor(`items.${i}.imageUrl`); fileInputRef.current?.click(); }}
                      style={{ padding: "9px 12px", borderRadius: 8, backgroundColor: "var(--accent-dim)", border: "1px solid var(--accent)", color: "var(--accent)", cursor: "pointer" }}><Upload size={14} /></button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );

    if (type === "text_image") return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div><label style={labelS}>Section Label</label><input style={iS} value={c.sectionLabel || ""} onChange={e => set("sectionLabel", e.target.value)} /></div>
          <div><label style={labelS}>Heading</label><input style={iS} value={c.heading || ""} onChange={e => set("heading", e.target.value)} /></div>
        </div>
        <div><label style={labelS}>Text Content</label><textarea style={taS} value={c.text || ""} onChange={e => set("text", e.target.value)} /></div>
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
            <label style={labelS}>Bullet Points</label>
            <button onClick={() => set("bullets", [...(c.bullets || []), "New bullet point"])}
              style={{ padding: "4px 10px", borderRadius: 6, backgroundColor: "var(--accent-dim)", border: "1px solid var(--accent)", color: "var(--accent)", cursor: "pointer", fontSize: 12 }}>+ Add</button>
          </div>
          {(c.bullets || []).map((b: string, i: number) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
              <input style={{ ...iS, flex: 1 }} value={b} onChange={e => { const bullets = [...c.bullets]; bullets[i] = e.target.value; set("bullets", bullets); }} />
              <button onClick={() => set("bullets", c.bullets.filter((_: any, j: number) => j !== i))}
                style={{ padding: "9px", borderRadius: 8, background: "rgba(255,68,68,0.1)", border: "1px solid var(--red)", color: "var(--red)", cursor: "pointer" }}><Trash2 size={13} /></button>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          <div><label style={labelS}>Image Side</label>
            <select style={iS} value={c.imageSide || "right"} onChange={e => set("imageSide", e.target.value)}>
              <option value="right">Right</option><option value="left">Left</option>
            </select>
          </div>
          <div><label style={labelS}>Link Text</label><input style={iS} value={c.linkText || ""} onChange={e => set("linkText", e.target.value)} /></div>
          <div><label style={labelS}>Link URL</label><input style={iS} value={c.linkUrl || ""} onChange={e => set("linkUrl", e.target.value)} /></div>
        </div>
        {imageField("imageUrl", "Section Image")}
      </div>
    );

    if (type === "cta") return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div><label style={labelS}>Badge Text</label><input style={iS} value={c.badge || ""} onChange={e => set("badge", e.target.value)} placeholder="e.g. JOIN 12,000+ MEMBERS" /></div>
        <div><label style={labelS}>Heading</label><input style={iS} value={c.heading || ""} onChange={e => set("heading", e.target.value)} /></div>
        <div><label style={labelS}>Subheading</label><input style={iS} value={c.subheading || ""} onChange={e => set("subheading", e.target.value)} /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div><label style={labelS}>Button Text</label><input style={iS} value={c.btnText || ""} onChange={e => set("btnText", e.target.value)} /></div>
          <div><label style={labelS}>Button Link</label><input style={iS} value={c.btnLink || ""} onChange={e => set("btnLink", e.target.value)} /></div>
        </div>
      </div>
    );

    if (type === "contact_info") return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          <div><label style={labelS}>Phone / WhatsApp</label><input style={iS} value={c.phone || ""} onChange={e => set("phone", e.target.value)} /></div>
          <div><label style={labelS}>Email</label><input style={iS} value={c.email || ""} onChange={e => set("email", e.target.value)} /></div>
          <div><label style={labelS}>Chat Hours</label><input style={iS} value={c.chatHours || ""} onChange={e => set("chatHours", e.target.value)} /></div>
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <label style={labelS}>FAQ Items</label>
            <button onClick={() => set("faqs", [...(c.faqs || []), { q: "New question?", a: "Answer here." }])}
              style={{ padding: "4px 10px", borderRadius: 6, backgroundColor: "var(--accent-dim)", border: "1px solid var(--accent)", color: "var(--accent)", cursor: "pointer", fontSize: 12 }}>+ Add FAQ</button>
          </div>
          {(c.faqs || []).map((faq: any, i: number) => (
            <div key={i} style={{ padding: 12, backgroundColor: "var(--bg-primary)", borderRadius: 10, border: "1px solid var(--border)", marginBottom: 8 }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ ...labelS, marginBottom: 4 }}>Question</label>
                  <input style={iS} value={faq.q} onChange={e => { const faqs = [...c.faqs]; faqs[i] = { ...faq, q: e.target.value }; set("faqs", faqs); }} />
                </div>
                <button onClick={() => set("faqs", c.faqs.filter((_: any, j: number) => j !== i))}
                  style={{ marginTop: 20, padding: "9px", borderRadius: 8, background: "rgba(255,68,68,0.1)", border: "1px solid var(--red)", color: "var(--red)", cursor: "pointer" }}><Trash2 size={13} /></button>
              </div>
              <label style={{ ...labelS, marginBottom: 4 }}>Answer</label>
              <textarea style={{ ...taS, minHeight: 60 }} value={faq.a} onChange={e => { const faqs = [...c.faqs]; faqs[i] = { ...faq, a: e.target.value }; set("faqs", faqs); }} />
            </div>
          ))}
        </div>
      </div>
    );

    if (type === "calculator") return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div><label style={labelS}>Section Label</label><input style={iS} value={c.sectionLabel || ""} onChange={e => set("sectionLabel", e.target.value)} /></div>
        <div><label style={labelS}>Heading</label><input style={iS} value={c.heading || ""} onChange={e => set("heading", e.target.value)} /></div>
        <p style={{ fontSize: 12, color: "var(--text-muted)" }}>The calorie calculator tool is embedded automatically.</p>
      </div>
    );

    if (type === "html") return (
      <div>
        <label style={labelS}>Custom HTML</label>
        <textarea style={{ ...taS, minHeight: 200, fontFamily: "monospace", fontSize: 12 }} value={c.html || ""} onChange={e => set("html", e.target.value)} />
        <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 6 }}>⚠️ Raw HTML is rendered directly. Use with care.</p>
      </div>
    );

    return <p style={{ color: "var(--text-muted)", fontSize: 13 }}>No editor available for type "{type}".</p>;
  };

  const typeInfo = (type: string) => SECTION_TYPES.find(t => t.type === type);
  const pageColor = { home: "var(--accent)", about: "var(--blue)", contact: "var(--cyan)" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Hidden file input for image uploads */}
      <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={e => {
        if (!uploadingFor) return;
        // Handle nested path like "items.0.imageUrl"
        if (uploadingFor.startsWith("items.")) {
          const parts = uploadingFor.split(".");
          const idx = parseInt(parts[1]);
          const field = parts[2];
          const file = e.target.files?.[0];
          if (!file) return;
          const formData = new FormData();
          formData.append("image", file);
          fetch(getApiBase() + "/api/cms/admin/upload-image", { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: formData })
            .then(r => r.json())
            .then(d => {
              if (d.url) {
                const items = [...editContent.items];
                items[idx] = { ...items[idx], [field]: d.url };
                setEditContent((prev: any) => ({ ...prev, items }));
                showMsg("✅ Image uploaded");
              }
            });
        } else {
          handleImageUpload(e, uploadingFor);
        }
        e.target.value = "";
      }} />

      {/* Page Selector */}
      <div>
        <h2 style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <Globe size={18} color="var(--accent)" /> Website CMS
        </h2>
        <div style={{ display: "flex", gap: 8 }}>
          {PAGES.map(p => (
            <button key={p} onClick={() => setActivePage(p)}
              style={{ padding: "9px 20px", borderRadius: 10, border: `2px solid ${activePage === p ? (pageColor as any)[p] : "var(--border)"}`, backgroundColor: activePage === p ? `${(pageColor as any)[p]}18` : "var(--bg-surface)", color: activePage === p ? (pageColor as any)[p] : "var(--text-muted)", fontFamily: "'Chakra Petch', sans-serif", fontWeight: 700, fontSize: 13, cursor: "pointer", textTransform: "capitalize", transition: "all 0.15s" }}>
              {p === "home" ? "🏠" : p === "about" ? "📖" : "📞"} {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
          <a href={`/${activePage === "home" ? "" : activePage}`} target="_blank" rel="noopener noreferrer"
            style={{ marginLeft: "auto", padding: "9px 16px", borderRadius: 10, border: "1px solid var(--border)", backgroundColor: "var(--bg-surface)", color: "var(--text-secondary)", fontSize: 12, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
            <ExternalLink size={13} /> Preview
          </a>
        </div>
      </div>

      {/* Branding Editor */}
      <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: "16px 18px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
          <div>
            <p style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: 15, fontWeight: 700 }}>🏷 Branding Editor</p>
            <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>Logo, colors, fonts, app identity, and social links for the whole website/app.</p>
          </div>
          <button
            onClick={saveBranding}
            disabled={brandingSaving || brandingLoading}
            style={{ padding: "8px 16px", borderRadius: 9, border: "none", cursor: "pointer", backgroundColor: brandingSaving ? "var(--bg-surface)" : "var(--accent)", color: brandingSaving ? "var(--text-muted)" : "#0A0A0B", fontFamily: "'Chakra Petch', sans-serif", fontWeight: 700, fontSize: 12 }}
          >
            {brandingSaving ? "Saving..." : "Save Branding"}
          </button>
        </div>

        {brandingLoading ? (
          <p style={{ color: "var(--text-muted)", fontSize: 13 }}>Loading branding settings...</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Identity</p>
              <div><label style={labelS}>App Name</label><input style={iS} value={brandingForm.app_name || ""} onChange={e => setBrandingForm(v => ({ ...v, app_name: e.target.value }))} /></div>
              <div><label style={labelS}>Tagline</label><input style={iS} value={brandingForm.app_tagline || ""} onChange={e => setBrandingForm(v => ({ ...v, app_tagline: e.target.value }))} /></div>
              <div><label style={labelS}>Footer Text</label><textarea style={{ ...taS, minHeight: 70 }} value={brandingForm.footer_text || ""} onChange={e => setBrandingForm(v => ({ ...v, footer_text: e.target.value }))} /></div>
              <div><label style={labelS}>Copyright Text</label><input style={iS} value={brandingForm.copyright_text || ""} onChange={e => setBrandingForm(v => ({ ...v, copyright_text: e.target.value }))} /></div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Logo & Favicon</p>
              <div>
                <label style={labelS}>Logo URL</label>
                <div style={{ display: "flex", gap: 8 }}>
                  <input style={{ ...iS, flex: 1 }} value={brandingForm.logo_url || ""} onChange={e => setBrandingForm(v => ({ ...v, logo_url: e.target.value }))} placeholder="/uploads/logo.png" />
                  <label style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid var(--border)", backgroundColor: "var(--bg-surface)", cursor: "pointer", fontSize: 12 }}>Upload
                    <input type="file" hidden accept="image/*" onChange={e => { const f = e.target.files?.[0]; if (f) uploadBrandingImage("logo_url", f); }} />
                  </label>
                </div>
                {brandingForm.logo_url ? <img src={brandingForm.logo_url} alt="logo" style={{ marginTop: 8, maxHeight: 50, borderRadius: 8, border: "1px solid var(--border)", backgroundColor: "var(--bg-surface)", padding: 4 }} /> : null}
              </div>

              <div>
                <label style={labelS}>Favicon URL</label>
                <div style={{ display: "flex", gap: 8 }}>
                  <input style={{ ...iS, flex: 1 }} value={brandingForm.favicon_url || ""} onChange={e => setBrandingForm(v => ({ ...v, favicon_url: e.target.value }))} placeholder="/uploads/favicon.png" />
                  <label style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid var(--border)", backgroundColor: "var(--bg-surface)", cursor: "pointer", fontSize: 12 }}>Upload
                    <input type="file" hidden accept="image/*" onChange={e => { const f = e.target.files?.[0]; if (f) uploadBrandingImage("favicon_url", f); }} />
                  </label>
                </div>
                {brandingForm.favicon_url ? <img src={brandingForm.favicon_url} alt="favicon" style={{ marginTop: 8, width: 28, height: 28, borderRadius: 6, border: "1px solid var(--border)", backgroundColor: "var(--bg-surface)", padding: 4 }} /> : null}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Colors & Fonts</p>
              {[
                ["Primary Color", "primary_color"],
                ["Secondary Color", "secondary_color"],
                ["Background Primary", "bg_primary"],
                ["Card Background", "bg_card"],
              ].map(([label, key]) => (
                <div key={key as string}>
                  <label style={labelS}>{label}</label>
                  <div style={{ display: "flex", gap: 8 }}>
                    <input type="color" value={brandingForm[key as string] || "#000000"} onChange={e => setBrandingForm(v => ({ ...v, [key]: e.target.value }))} style={{ width: 44, height: 36, borderRadius: 8, border: "1px solid var(--border)", backgroundColor: "var(--bg-surface)" }} />
                    <input style={{ ...iS, flex: 1 }} value={brandingForm[key as string] || ""} onChange={e => setBrandingForm(v => ({ ...v, [key]: e.target.value }))} />
                  </div>
                </div>
              ))}
              <div><label style={labelS}>English Font</label><input style={iS} value={brandingForm.font_en || ""} onChange={e => setBrandingForm(v => ({ ...v, font_en: e.target.value }))} /></div>
              <div><label style={labelS}>Arabic Font</label><input style={iS} value={brandingForm.font_ar || ""} onChange={e => setBrandingForm(v => ({ ...v, font_ar: e.target.value }))} /></div>
              <div><label style={labelS}>Heading Font</label><input style={iS} value={brandingForm.font_heading || ""} onChange={e => setBrandingForm(v => ({ ...v, font_heading: e.target.value }))} /></div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Social Links</p>
              <div><label style={labelS}>Instagram URL</label><input style={iS} value={brandingForm.social_instagram || ""} onChange={e => setBrandingForm(v => ({ ...v, social_instagram: e.target.value }))} /></div>
              <div><label style={labelS}>Facebook URL</label><input style={iS} value={brandingForm.social_facebook || ""} onChange={e => setBrandingForm(v => ({ ...v, social_facebook: e.target.value }))} /></div>
              <div><label style={labelS}>Twitter/X URL</label><input style={iS} value={brandingForm.social_twitter || ""} onChange={e => setBrandingForm(v => ({ ...v, social_twitter: e.target.value }))} /></div>
              <div><label style={labelS}>YouTube URL</label><input style={iS} value={brandingForm.social_youtube || ""} onChange={e => setBrandingForm(v => ({ ...v, social_youtube: e.target.value }))} /></div>
            </div>
          </div>
        )}
      </div>

      {/* Sections List */}
      {loading ? (
        <div style={{ textAlign: "center", padding: 40, color: "var(--text-muted)" }}>Loading sections...</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {sections.map((s, idx) => {
            const info = typeInfo(s.type);
            const IconComp = info?.icon || Layout;
            const isEditing = editingId === s.id;
            return (
              <div key={s.id} style={{ backgroundColor: "var(--bg-card)", border: `1px solid ${isEditing ? "var(--accent)" : "var(--border)"}`, borderRadius: 14, overflow: "hidden", transition: "border-color 0.2s" }}>
                {/* Section Header */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", backgroundColor: isEditing ? "var(--accent-dim)" : "transparent" }}>
                  <div style={{ width: 34, height: 34, borderRadius: 9, backgroundColor: s.is_visible ? "var(--accent-dim)" : "var(--bg-surface)", border: `1px solid ${s.is_visible ? "rgba(200,255,0,0.3)" : "var(--border)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <IconComp size={15} color={s.is_visible ? "var(--accent)" : "var(--text-muted)"} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.label}</p>
                    <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 1 }}>{info?.label || s.type} · order {idx + 1}</p>
                  </div>
                  {/* Visibility badge */}
                  <div style={{ padding: "3px 10px", borderRadius: 20, backgroundColor: s.is_visible ? "var(--accent-dim)" : "var(--bg-surface)", border: `1px solid ${s.is_visible ? "rgba(200,255,0,0.3)" : "var(--border)"}`, fontSize: 11, fontWeight: 600, color: s.is_visible ? "var(--accent)" : "var(--text-muted)" }}>
                    {s.is_visible ? "Visible" : "Hidden"}
                  </div>
                  {/* Controls */}
                  <div style={{ display: "flex", gap: 4 }}>
                    <button title="Move up" onClick={() => moveSection(s.id, "up")} disabled={idx === 0}
                      style={{ width: 30, height: 30, borderRadius: 7, background: "none", border: "1px solid var(--border)", cursor: idx === 0 ? "default" : "pointer", opacity: idx === 0 ? 0.3 : 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <ChevronUp size={13} color="var(--text-secondary)" />
                    </button>
                    <button title="Move down" onClick={() => moveSection(s.id, "down")} disabled={idx === sections.length - 1}
                      style={{ width: 30, height: 30, borderRadius: 7, background: "none", border: "1px solid var(--border)", cursor: idx === sections.length - 1 ? "default" : "pointer", opacity: idx === sections.length - 1 ? 0.3 : 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <ChevronDown size={13} color="var(--text-secondary)" />
                    </button>
                    <button title={s.is_visible ? "Hide section" : "Show section"} onClick={() => toggleVisible(s)}
                      style={{ width: 30, height: 30, borderRadius: 7, background: s.is_visible ? "rgba(200,255,0,0.08)" : "none", border: `1px solid ${s.is_visible ? "rgba(200,255,0,0.3)" : "var(--border)"}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {s.is_visible ? <Eye size={13} color="var(--accent)" /> : <EyeOff size={13} color="var(--text-muted)" />}
                    </button>
                    <button title={isEditing ? "Close editor" : "Edit section"} onClick={() => isEditing ? setEditingId(null) : startEdit(s)}
                      style={{ width: 30, height: 30, borderRadius: 7, background: isEditing ? "var(--accent-dim)" : "none", border: `1px solid ${isEditing ? "var(--accent)" : "var(--border)"}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {isEditing ? <X size={13} color="var(--accent)" /> : <Edit3 size={13} color="var(--text-secondary)" />}
                    </button>
                    <button title="Delete section" onClick={() => deleteSection(s.id)}
                      style={{ width: 30, height: 30, borderRadius: 7, background: "none", border: "1px solid var(--border)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Trash2 size={13} color="var(--red)" />
                    </button>
                  </div>
                </div>

                {/* Section Content Editor */}
                {isEditing && (
                  <div style={{ padding: "16px 18px", borderTop: "1px solid var(--border)", backgroundColor: "var(--bg-surface)" }}>
                    <div style={{ marginBottom: 14 }}>
                      <label style={labelS}>Section Label (admin only)</label>
                      <input style={iS} value={editLabel} onChange={e => setEditLabel(e.target.value)} />
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ ...labelS, marginBottom: 10 }}>Content</label>
                      {renderContentEditor(s.type)}
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <button onClick={saveEdit} disabled={saving}
                        style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 20px", borderRadius: 9, backgroundColor: "var(--accent)", color: "#0A0A0B", fontFamily: "'Chakra Petch', sans-serif", fontWeight: 700, fontSize: 13, border: "none", cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}>
                        <Save size={14} /> {saving ? "Saving..." : "Save Changes"}
                      </button>
                      <button onClick={() => setEditingId(null)}
                        style={{ padding: "10px 16px", borderRadius: 9, backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: 13, cursor: "pointer" }}>
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Add Section Button */}
          <button onClick={() => setShowAddModal(true)}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px", borderRadius: 14, border: "2px dashed var(--border)", backgroundColor: "transparent", color: "var(--text-muted)", fontSize: 14, cursor: "pointer", fontFamily: "'Chakra Petch', sans-serif", fontWeight: 600, transition: "border-color 0.15s, color 0.15s" }}
            onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--accent)"; }}
            onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)"; }}>
            <Plus size={18} /> Add New Section
          </button>
        </div>
      )}

      {/* Add Section Modal */}
      {showAddModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 }}>
          <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 18, padding: "28px 24px", width: "100%", maxWidth: 560, maxHeight: "85vh", overflowY: "auto" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <h3 style={{ fontFamily: "'Chakra Petch', sans-serif", fontSize: 16, fontWeight: 700 }}>Add New Section</h3>
              <button onClick={() => setShowAddModal(false)} style={{ width: 30, height: 30, borderRadius: 7, background: "none", border: "1px solid var(--border)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <X size={14} />
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={labelS}>Section Type / Layout</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))", gap: 8, marginTop: 8 }}>
                  {SECTION_TYPES.map(t => {
                    const Ic = t.icon;
                    return (
                      <button key={t.type} onClick={() => { setAddType(t.type); setAddLabel(t.label); }}
                        style={{ padding: "12px", borderRadius: 10, border: `2px solid ${addType === t.type ? "var(--accent)" : "var(--border)"}`, backgroundColor: addType === t.type ? "var(--accent-dim)" : "var(--bg-surface)", cursor: "pointer", textAlign: "left", transition: "all 0.15s" }}>
                        <Ic size={16} color={addType === t.type ? "var(--accent)" : "var(--text-secondary)"} />
                        <p style={{ fontSize: 12, fontWeight: 600, marginTop: 6, color: addType === t.type ? "var(--accent)" : "var(--text-primary)" }}>{t.label}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <label style={labelS}>Section Label (admin reference)</label>
                <input style={iS} value={addLabel} onChange={e => setAddLabel(e.target.value)} placeholder={SECTION_TYPES.find(t => t.type === addType)?.label} />
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={addSection}
                  style={{ display: "flex", alignItems: "center", gap: 6, padding: "12px 24px", borderRadius: 10, backgroundColor: "var(--accent)", color: "#0A0A0B", fontFamily: "'Chakra Petch', sans-serif", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer" }}>
                  <Plus size={15} /> Add Section
                </button>
                <button onClick={() => setShowAddModal(false)}
                  style={{ padding: "12px 18px", borderRadius: 10, backgroundColor: "var(--bg-surface)", border: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: 14, cursor: "pointer" }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
