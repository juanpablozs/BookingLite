# BookingLite

Mini SaaS para gestión de reservas (MVP).

Run locally with Docker Compose (after filling `.env`):

```bash
docker compose up --build
```

API (apps/api) commands:

```bash
cd apps/api
pnpm install
pnpm prisma:generate   # generate prisma client
pnpm prisma:migrate    # create dev migration (requires DB)
pnpm dev               # run api in dev
pnpm test              # run tests
```

Web (apps/web) commands:

```bash
cd apps/web
pnpm install
pnpm dev
```

# BookingLite