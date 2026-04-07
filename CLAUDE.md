# Landbrugsmaskiner.dk

Website for Birkballe & Nicholaisen ApS - landbrugsmaskiner i Thorsager/Djursland siden 1973. Salg af nye og brugte landbrugsmaskiner, værksted, reservedele og eksport. Maskindata hentes fra ekstern HTML-feed (Maskinbladet).

## Tech Stack

- **Frontend**: React 19 + TypeScript, Wouter routing, TanStack Query, Tailwind CSS v4, shadcn/ui (New York), Framer Motion
- **Backend**: Express.js + TypeScript (ESM), Node.js
- **Database**: PostgreSQL + Drizzle ORM (pt. bruges in-memory storage)
- **Build**: Vite (client), esbuild (server)

## Kommandoer

```bash
npm run dev          # Start dev server (Express + Vite HMR) på port 3000
npm run build        # Byg til produktion (client → dist/public, server → dist/index.cjs)
npm run start        # Start produktion server
npm run check        # TypeScript type check
npm run db:push      # Push Drizzle schema til database
```

## Projektstruktur

```
client/              # React frontend
  src/
    pages/           # Sider: Home, Machines, MachineDetail, About, Contact, Finansiering
    components/      # Header, Footer, MachineSlider + ui/ (shadcn)
    hooks/           # use-mobile, use-toast
    lib/             # queryClient, utils
server/              # Express backend
  index.ts           # App entry point
  routes.ts          # API endpoints
  scraper.ts         # Maskinbladet feed scraper
  vite.ts            # Vite dev middleware
  static.ts          # Statisk filservering (prod)
  storage.ts         # In-memory storage
shared/
  schema.ts          # Drizzle ORM schema (users tabel)
script/
  build.ts           # Build script (esbuild + Vite)
```

## API

- `GET /api/machines` - Scraper HTML-feed fra Maskinbladet (cache: 10 min)
- `GET /api/machines/:id` - Hent enkelt maskine
- `GET /api/categories` - Hent kategorier

## Ruter (frontend)

- `/` - Forside
- `/maskiner` - Maskinoversigt med filtrering
- `/maskine/:id` - Maskindetaljer
- `/reservedele` - Reservedele
- `/om-os` - Om os
- `/kontakt` - Kontakt
- `/finansiering` - Finansiering

## Branding

- **Farver**: `#51af37` (grøn, primær) + `#010174` (mørk blå, accent)
- **Tagline**: Kvalitet - Kompetence - Service
- **Kontakt**: +45 86 37 92 68 / lbb@landbrugsmaskiner.dk
- **Adresse**: Mørkevej 8, DK-8410 Thorsager
- **Firma**: Birkballe & Nicholaisen ApS
- **Mærker**: Deutz-Fahr, Zetor, Maschio, Perfect, Suire, Keltec, Murray + import af Pöttinger, Rabe, Volverini

## Environment Variables

- `PORT` - Server port (default: 5000)
- `NODE_ENV` - development/production
- `DATABASE_URL` - PostgreSQL connection string

## Deploy (Railway)

Projektet er konfigureret til Railway via `railway.json`. Nixpacks bygger automatisk.
Tilføj en PostgreSQL plugin i Railway for database. `DATABASE_URL` sættes automatisk.
