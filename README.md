# Boorooms (Driftwood Stays) — Full-Stack Monorepo

Boutique homestay booking platform across India with customer storefront, admin console, and Express REST API backend.

---

## Architecture Overview

```
boorooms/
├── client/                   # Customer storefront Next.js app (Port 3000)
├── server/
│   ├── api/                  # Express API (Port 5000)
│   │   ├── server.js         # Entry point
│   │   ├── routes/
│   │   └── controllers/
│   └── admin/                # Admin Next.js app (Port 3001)
└── package.json              # Monorepo runner (concurrently)
```

---

## Quick Start

Install each app once:

```bash
npm install
npm install --prefix client
npm install --prefix server
npm install --prefix server/admin
```

### 1. Run Everything (Storefront + Admin + API)
```bash
npm run dev
```
*(or `npm run dev:all`)*

| Application | URL | Port |
| :--- | :--- | :--- |
| **Storefront** | [http://localhost:3000](http://localhost:3000) | `3000` |
| **Admin Console** | [http://localhost:3001](http://localhost:3001) | `3001` |
| **Server API** | [http://localhost:5000/api/health](http://localhost:5000/api/health) | `5000` |

---

### 2. Run Individually

- **Storefront:** `npm run dev:client`
- **Admin Console:** `npm run dev:admin`
- **Server API:** `npm run dev:server`

---

## Build for Production

```bash
npm run build
```
*(Builds both `client` and `server/admin`)*
