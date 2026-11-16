# Boorooms (Driftwood Stays) — Full-Stack Monorepo

Boutique homestay booking platform across India with customer storefront, admin console, and Express REST API backend.

---

## Architecture Overview

```
boorooms/
├── backend/                  # Express REST API (Port 5000) for Storefront
│   ├── server.js             # Server entry point & health check
│   ├── api/                  # Layered Storefront API (routes, controllers, services, middleware)
│   └── data/                 # Storefront data store
│
├── frontend/
│   └── client/               # Customer Storefront Next.js App (Port 3000)
│
├── admin/                    # Standalone Admin Full-Stack Next.js Project (Port 3001)
│   ├── src/
│   │   ├── app/
│   │   │   ├── api/          # Built-in Next.js Backend (stats, rooms, bookings Route Handlers)
│   │   │   ├── rooms/        # Rooms UI
│   │   │   ├── bookings/     # Bookings & WhatsApp UI
│   │   │   └── page.tsx      # Executive Dashboard
│   │   ├── components/       # Admin Sidebar & Header
│   │   ├── data/             # Admin data store
│   │   └── lib/              # API client
│   └── package.json
│
└── package.json              # Monorepo runner
```

---

## Quick Start

### 1. Run Everything (Storefront + Admin + API)
```bash
npm run dev
```
*(or `npm run dev:all`)*

| Application | URL | Port |
| :--- | :--- | :--- |
| **Storefront** | [http://localhost:3000](http://localhost:3000) | `3000` |
| **Admin Console** | [http://localhost:3001](http://localhost:3001) | `3001` |
| **Express Backend** | [http://localhost:5000/api/health](http://localhost:5000/api/health) | `5000` |

---

### 2. Run Individually

- **Storefront:** `npm run dev:client`
- **Admin Console:** `npm run dev:admin`
- **Backend API:** `npm run dev:backend`

---

## Build for Production

```bash
npm run build
```
*(Builds both `frontend/client` and `frontend/admin`)*
