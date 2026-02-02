# DEVELOPMENT.md

## Local Development Guide

### Prerequisites

- Node.js 18+
- pnpm (install globally: `npm install -g pnpm`)
- MySQL 8.0 running on localhost:3306

### Quick Start

```bash
# 1. Clone and setup
git clone <repo>
cd BookingLite
cp .env.example .env

# 2. Install dependencies and setup Prisma
bash setup.sh

# 3. Run migrations
cd apps/api
pnpm prisma:migrate

# 4. Start dev servers (in separate terminals)
cd apps/api && pnpm dev    # API on http://localhost:4000
cd apps/web && pnpm dev    # Web on http://localhost:5173
```

### Environment Variables

Edit `.env` to customize:
- `DATABASE_URL`: MySQL connection string
- `JWT_ACCESS_SECRET`: Secret for access tokens (change in production!)
- `JWT_REFRESH_SECRET`: Secret for refresh tokens (change in production!)
- `PORT`: API port (default 4000)

### Running Tests

```bash
cd apps/api
pnpm test              # Run all tests
pnpm test:watch        # Watch mode
pnpm test -- --coverage  # With coverage
```

### Building for Production

```bash
# API
cd apps/api
pnpm build
# Output in dist/

# Web
cd apps/web
pnpm build
# Output in dist/
```

### Database Migrations

```bash
cd apps/api

# Create a new migration
pnpm prisma:migrate

# Reset database (dev only!)
pnpm prisma migrate reset

# Generate Prisma client
pnpm prisma:generate

# Open Prisma Studio (database GUI)
pnpm prisma studio
```

### Debugging

**API**: Add `console.log()` or use debugger in VSCode
**Web**: Use React DevTools browser extension

### Linting & Formatting

```bash
# Root level
pnpm lint              # Check linting
pnpm format            # Auto-format (if configured)
```

### Common Issues

#### "Cannot find module '@prisma/client'"
```bash
cd apps/api && pnpm prisma:generate
```

#### MySQL connection error
```bash
# Ensure MySQL is running
mysql -u root -p
# Or use Docker: docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=example -e MYSQL_DATABASE=bookinglite mysql:8.0
```

#### Port already in use
```bash
# API on different port
PORT=4001 pnpm dev

# Web on different port
pnpm dev -- --port 5174
```

### API Documentation

Swagger UI available at http://localhost:4000/api/docs

### Useful Commands

```bash
# Root level (monorepo)
pnpm dev          # Start all dev servers
pnpm build        # Build all packages
pnpm test         # Test all packages
pnpm lint         # Lint all packages

# API specific
cd apps/api
pnpm dev          # Dev server
pnpm build        # Build
pnpm test         # Tests
pnpm lint         # Lint

# Web specific
cd apps/web
pnpm dev          # Dev server
pnpm build        # Build
pnpm preview      # Preview production build
```

### Git Workflow

```bash
# Feature branch
git checkout -b feature/your-feature

# Make changes, test
pnpm test
pnpm lint

# Commit with semantic message
git commit -m "feat(api): add new endpoint"
git push origin feature/your-feature

# Create PR and merge
```

### Recommended VS Code Extensions

- ESLint
- Prettier
- Thunder Client (or REST Client)
- MySQL
- Prisma

### Performance Tips

- Use `pnpm --filter` to run commands in specific packages
- Keep migrations idempotent
- Use indexes in database for common queries
- Lazy load components in React
