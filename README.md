# Boorooms (Driftwood Stays) — Full-Stack Monorepo

Boutique homestay booking platform across India with customer storefront, admin console, and Express REST API backend.

---

## Architecture Overview

```
boorooms/
├── backend/                  # Express REST API (Port 5000)
│   ├── server.js             # Server entry point & health check
│   ├── api/                  # Storefront API (Layered Express Architecture)
│   │   ├── controllers/      # Request handlers & response formatting
│   │   ├── middleware/       # Request validation
│   │   ├── routes/           # Express route definitions
│   │   ├── services/         # Business logic & data operations
│   │   └── index.js          # API router entry point
│   ├── admin/                # Admin API routes (/api/admin/rooms, /bookings, /stats)
│   └── data/                 # Shared data store
│
├── frontend/
│   ├── client/               # Next.js Customer Storefront (Port 3000)
│   └── admin/                # Next.js Admin Management Console (Port 3001)
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
