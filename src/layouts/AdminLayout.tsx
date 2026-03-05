import { Outlet } from "react-router-dom";
import {
  LayoutDashboard, Users, Settings, Activity,
  Gift, DollarSign, Video, Megaphone, UserCheck, Globe,
} from "lucide-react";
import { useBranding } from "@/context/BrandingContext";
import { SharedSidebar, NavItem } from "@/components/layout/SharedSidebar";

const navItems: NavItem[] = [
  { path: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/admin/users",     icon: Users,           label: "Users" },
  { path: "/admin/coaches",   icon: UserCheck,       label: "Coaches" },
  { path: "/admin/payments",  icon: DollarSign,      label: "Payments" },
  { path: "/admin/videos",    icon: Video,           label: "Videos" },
  { path: "/admin/ads",       icon: Megaphone,       label: "Coach Ads" },
  { path: "/admin/gifts",     icon: Gift,            label: "Gifts" },
  { path: "/admin/website",   icon: Globe,           label: "Website" },
  { path: "/admin/settings",  icon: Settings,        label: "Settings" },
];

const bottomNavItems: NavItem[] = [
  { path: "/admin/dashboard", icon: LayoutDashboard, label: "Overview" },
  { path: "/admin/users",     icon: Users,           label: "Users" },
  { path: "/admin/payments",  icon: DollarSign,      label: "Payments" },
  { path: "/admin/coaches",   icon: UserCheck,       label: "Coaches" },
  { path: "/admin/settings",  icon: Settings,        label: "Settings" },
];

const moreItems: NavItem[] = [
  { path: "/admin/videos",  icon: Video,     label: "Videos" },
  { path: "/admin/ads",     icon: Megaphone, label: "Coach Ads" },
  { path: "/admin/gifts",   icon: Gift,      label: "Gifts" },
  { path: "/admin/website", icon: Globe,     label: "Website" },
];

export function AdminLayout() {
  const { branding } = useBranding();
  const { isMobile, sidebarW, DesktopSidebar, OverlayDrawer, MobileTopBar, MobileBottomBar } = SharedSidebar({
    navItems,
    bottomNavItems,
    moreDrawerItems: moreItems,
    accentColor: "var(--red)",
    accentBg: "rgba(255,68,68,0.12)",
    logoIcon: Activity,
    logoIconColor: "var(--red)",
    logoLabel: (branding.app_name || "FITWAY") + " ADMIN",
    logoUrl: branding.logo_url || undefined,
    roleLabel: "🛡️ Admin",
    roleLabelColor: "var(--red)",
  });

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)", display: "flex" }}>
      {!isMobile && <DesktopSidebar />}
      <OverlayDrawer />
      {isMobile && <MobileTopBar />}

      <main style={{
        flex: 1,
        marginLeft: isMobile ? 0 : sidebarW,
        transition: "margin-left 0.25s cubic-bezier(0.4,0,0.2,1)",
        paddingTop: isMobile ? 60 : 0,
        paddingBottom: isMobile ? "calc(68px + env(safe-area-inset-bottom))" : 0,
      }}>
        <div style={{ padding: "24px 20px", maxWidth: 1200, margin: "0 auto" }}>
          <Outlet />
        </div>
      </main>

      {isMobile && <MobileBottomBar />}
    </div>
  );
}
