# BookingLite

Mini SaaS para gestión de reservas/citas para pequeños negocios (MVP).

## 🚀 Quick Start

### Docker Compose (Recomendado)

```bash
cp .env.example .env
docker compose up --build

# En otra terminal:
docker compose exec api pnpm prisma:migrate
```

Acceder:
- **Web**: http://localhost:3000
- **API Docs**: http://localhost:4000/api/docs
- **Health**: http://localhost:4000/health

### Local Setup

```bash
# Install dependencies
bash setup.sh

# Run migrations
cd apps/api && pnpm prisma:migrate

# Start servers (en terminales separadas)
cd apps/api && pnpm dev    # http://localhost:4000
cd apps/web && pnpm dev    # http://localhost:5173
```

## 📚 Documentation

- [DEVELOPMENT.md](DEVELOPMENT.md) - Local development guide
- [DEPLOYMENT.md](DEPLOYMENT.md) - Production deployment
- [TESTING.md](TESTING.md) - Testing guide
- [API_EXAMPLES.md](API_EXAMPLES.md) - API curl examples

## 🏗️ Stack

| Layer | Technology |
|-------|------------|
| Backend | Node.js + TypeScript + Express |
| Frontend | React + TypeScript + Vite |
| Database | MySQL + Prisma ORM |
| Auth | JWT + bcrypt |
| Validation | Zod |
| API Docs | Swagger/OpenAPI |
| Testing | Jest + supertest |
| DevOps | Docker + docker-compose |

## ✨ Features

### 1. Authentication
- Registro con email, contraseña y nombre del negocio
- Login con JWT (access + refresh tokens)
- Logout automático con token expiration

### 2. Servicios
- CRUD completo
- Paginación y filtros (activos/inactivos)
- Precio, duración y descripción

### 3. Clientes
- CRUD completo
- Búsqueda por nombre/email
- Almacenamiento de teléfono y notas

### 4. Reservas
- CRUD completo
- Validaciones:
  - ❌ No permitir reservas en el pasado
  - ❌ No permitir solapamientos
  - ✅ Cálculo automático de end time
- Estados: scheduled, completed, cancelled

### 5. Dashboard
- Total de reservas
- Reservas por estado
- Reservas de hoy
- Ingresos estimados (suma de precios)

## 🔌 API Endpoints

```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh
POST   /api/auth/logout

GET    /api/services              (paginado)
POST   /api/services
GET    /api/services/:id
PATCH  /api/services/:id
DELETE /api/services/:id

GET    /api/clients               (búsqueda)
POST   /api/clients
GET    /api/clients/:id
PATCH  /api/clients/:id
DELETE /api/clients/:id

GET    /api/bookings              (filtros)
POST   /api/bookings              (validaciones)
GET    /api/bookings/:id
PATCH  /api/bookings/:id
DELETE /api/bookings/:id

GET    /api/stats/dashboard
```

Ver [API_EXAMPLES.md](API_EXAMPLES.md) para ejemplos de curl.

## 🧪 Testing

```bash
cd apps/api
pnpm test              # Run tests
pnpm test:watch        # Watch mode
pnpm test -- --coverage  # Con cobertura
```

**Tests incluyen:**
- ✅ Auth (registro, login, email duplicado)
- ✅ Booking rules (fecha pasada, solapamientos)

## 📦 Project Structure

```
BookingLite/
├── apps/
│   ├── api/                # Express backend
│   │   ├── src/
│   │   │   ├── controllers/ 
│   │   │   ├── services/   
│   │   │   ├── routes/     
│   │   │   ├── middleware/ (auth)
│   │   │   ├── schemas/    (Zod)
│   │   │   ├── utils/      (JWT)
│   │   │   ├── docs/       (OpenAPI)
│   │   │   └── app.ts
│   │   ├── prisma/         (schema + migrations)
│   │   ├── tests/          (Jest)
│   │   └── Dockerfile
│   │
│   └── web/                # React frontend
│       ├── src/
│       │   ├── pages/      (Login, Register, Dashboard, etc.)
│       │   ├── components/ (Layout, ProtectedRoute)
│       │   ├── services/   (API client)
│       │   ├── contexts/   (Auth)
│       │   ├── styles/
│       │   └── App.tsx
│       ├── index.html
│       └── Dockerfile
│
├── packages/
│   └── shared/             (tipos compartidos - opcional)
│
├── docker-compose.yml
├── .env.example
├── setup.sh
├── README.md (este archivo)
├── DEVELOPMENT.md
├── DEPLOYMENT.md
├── TESTING.md
└── API_EXAMPLES.md
```

## 🔐 Security Features

- ✅ JWT con access/refresh tokens
- ✅ bcrypt para hashing de passwords
- ✅ Helmet para headers de seguridad
- ✅ CORS configurado
- ✅ Rate limiting en auth
- ✅ Input validation con Zod
- ✅ Multi-tenant (cada usuario ve solo sus datos)

## 📊 Architecture

### Backend Layers
- **Routes**: Express routing
- **Middleware**: Auth, validation
- **Controllers**: Request handling
- **Services**: Business logic
- **Prisma**: Database ORM

### Frontend Layers
- **Pages**: Full page components
- **Components**: Reusable components
- **Contexts**: Auth state management
- **Services**: API client
- **Styles**: CSS modules

## 🚢 Deployment

### With Docker Compose
```bash
docker compose -f docker-compose.yml up -d
docker compose exec api pnpm prisma migrate deploy
```

### With Kubernetes / Cloud
Ver [DEPLOYMENT.md](DEPLOYMENT.md) para instrucciones detalladas.

## 📝 Git Commits

Commits realizados durante el desarrollo:

1. `feat(monorepo): scaffolding inicial — apps/api, apps/web, prisma, docker`
2. `feat(api): implement auth (register, login, JWT, refresh, logout)`
3. `feat(api): implement CRUD (Services, Clients, Bookings) con validaciones`
4. `feat(api): add stats/dashboard endpoint (metrics)`
5. `feat(api): add tests (auth + booking) y jest config`
6. `feat(api): add OpenAPI docs + API examples`
7. `feat(web): implement complete frontend (auth, pages, layout, styles)`

## 🔮 Future Enhancements

- [ ] Email notifications
- [ ] SMS reminders
- [ ] Calendar view
- [ ] Multi-timezone support
- [ ] Payment integration
- [ ] Analytics dashboard
- [ ] Timezone support
- [ ] Export to CSV/PDF
- [ ] Mobile app (React Native)
- [ ] Admin panel
- [ ] Rate limiting per user
- [ ] Webhooks

## 📞 Support

Para más información, revisar:
- [DEVELOPMENT.md](DEVELOPMENT.md) - Guía de desarrollo local
- [TESTING.md](TESTING.md) - Cómo escribir tests
- [DEPLOYMENT.md](DEPLOYMENT.md) - Despliegue a producción
- [API_EXAMPLES.md](API_EXAMPLES.md) - Ejemplos de API

## 📄 License

MIT
