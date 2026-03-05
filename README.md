# 🏋️ FitWay Hub — Full Setup Guide

## Quick Start (Local)

### Frontend configuration

Before running the React client, ensure the `VITE_API_BASE` environment variable is set to your backend URL (e.g. `https://peter-adel.taila6a2b4.ts.net`). Relative `/api/...` requests are automatically prefixed with this value by the startup script.  

For mobile (Capacitor/Android) builds the code also defaults to `https://peter-adel.taila6a2b4.ts.net` when no variable is provided, so the Android project will still compile/sync correctly and hit the remote API. You can override this by exporting `VITE_API_BASE` before running `npm run build` or `npx cap sync android`.


```bash
# 1. Install dependencies
npm install

# 2. Start the server (dev mode with Vite hot-reload)
npx tsx server.ts

# 3. Open browser
Visit https://peter-adel.taila6a2b4.ts.net
```

The database is **auto-created** at `database.sqlite` on first run with all tables and default accounts.

---

## Social Login + Real Email Validation

Registration now validates email domains (MX/A/AAAA DNS checks) and blocks common fake/disposable domains.

To enable Google/Facebook login, add these values to your `.env`:

```bash
APP_BASE_URL=http://localhost:3000

GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/oauth/google/callback

FACEBOOK_APP_ID=...
FACEBOOK_APP_SECRET=...
FACEBOOK_REDIRECT_URI=http://localhost:3000/api/auth/oauth/facebook/callback
```

Provider console callback URLs must exactly match the redirect URIs above.

Login endpoints:
- `GET /api/auth/oauth/google`
- `GET /api/auth/oauth/facebook`

---

## Default Accounts

| Role  | Email                    | Password    | Dashboard URL       |
|-------|--------------------------|-------------|---------------------|
| 👑 Admin | peteradmin@example.com | peterishere | /admin/dashboard    |
| 🏅 Coach | petercoach@example.com | peterishere | /coach/dashboard    |
| 👤 User  | test@example.com       | password123 | /app/dashboard      |

---

## Tailscale / External Access

The server is pre-configured to allow:
- `https://peter-adel.taila6a2b4.ts.net`

Your server binds to `0.0.0.0:3000` so it's accessible from any interface.

```bash
# Start and access via Tailscale
npx tsx server.ts
# → Visit https://peter-adel.taila6a2b4.ts.net:3000
```

---

## Database

- **Engine**: SQLite via `better-sqlite3`
- **File**: `database.sqlite` (auto-created)
- **Auto-seeded**: peter accounts created on first run

To reset and re-seed everything:
```bash
rm database.sqlite
npx tsx server/seed.ts
npx tsx server.ts
```

---

## Features

### ✅ Steps Tracker
- Live GPS tracking with OpenStreetMap
- Modern glowing route line + animated pulsing marker
- Start/End location pins
- Accurate step counting via GPS distance + user metrics (height/weight)
- Manual entry with auto-calculation

### 🌓 Light/Dark Mode
- Toggle in all layouts (website, app, admin, coach)
- Persists via localStorage

### 🎁 Gift System (Admin only)
- Admin Panel → Gifts tab
- Send: Points, Premium, Badge, Coupon to any user

### 🏅 Coach Dashboard
- Login: petercoach@example.com / peterishere
- View all athletes
- Create/edit Workout Plans per user
- Create/edit Nutrition Plans per user

### 🛡️ Admin Dashboard
- Login: peteradmin@example.com / peterishere  
- Users tab: manage roles, premium status, delete users
- Gifts tab: send gifts to users
- Settings tab: toggle app features + theme

### 📱 Responsive
- Hamburger menu on tablet AND mobile (lg breakpoint)
- Mobile floating nav bar on app pages
