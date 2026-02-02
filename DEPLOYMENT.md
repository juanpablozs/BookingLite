# DEPLOYMENT.md

## Deployment Guide

### Docker Compose (Development)

```bash
cp .env.example .env
docker compose up --build

# In another terminal, run migrations
docker compose exec api pnpm prisma:migrate
```

Access:
- Web: http://localhost:3000
- API: http://localhost:4000
- API Docs: http://localhost:4000/api/docs

### Production Deployment

#### Option 1: Docker Compose

1. **Prepare environment**:
```bash
# .env (use strong secrets!)
DATABASE_URL=mysql://root:STRONG_PASSWORD@db:3306/bookinglite
JWT_ACCESS_SECRET=LONG_RANDOM_SECRET_HERE
JWT_REFRESH_SECRET=LONG_RANDOM_SECRET_HERE
PORT=4000
NODE_ENV=production
```

2. **Build and push images** (or use existing):
```bash
docker compose build
# docker push <registry>/bookinglite-api:latest
# docker push <registry>/bookinglite-web:latest
```

3. **Deploy**:
```bash
docker compose -f docker-compose.yml up -d
docker compose exec api pnpm prisma migrate deploy
```

#### Option 2: Kubernetes

Create `k8s/` manifests:

```yaml
# api-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: bookinglite-api
spec:
  replicas: 2
  selector:
    matchLabels:
      app: bookinglite-api
  template:
    metadata:
      labels:
        app: bookinglite-api
    spec:
      containers:
      - name: api
        image: registry/bookinglite-api:latest
        ports:
        - containerPort: 4000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: bookinglite-secrets
              key: database-url
```

#### Option 3: Heroku / Railway / Render

1. **Add Procfile**:
```
web: cd apps/api && pnpm install && pnpm build && pnpm prisma migrate deploy && node dist/index.js
```

2. **Set environment variables**:
```bash
DATABASE_URL=mysql://...
JWT_ACCESS_SECRET=...
JWT_REFRESH_SECRET=...
```

3. **Deploy**:
```bash
git push heroku main
```

### Production Checklist

- [ ] Use strong JWT secrets (generate with `openssl rand -hex 32`)
- [ ] Enable HTTPS (use reverse proxy like Nginx)
- [ ] Set `NODE_ENV=production`
- [ ] Configure CORS properly
- [ ] Use database backups
- [ ] Enable rate limiting (already in code)
- [ ] Add monitoring/logging
- [ ] Use environment-specific configs
- [ ] Test database migrations
- [ ] Set up CI/CD pipeline
- [ ] Configure health checks
- [ ] Plan disaster recovery

### Monitoring

Add APM/logging tools:
```bash
# Option 1: Winston (already in package)
# Option 2: Sentry for error tracking
# Option 3: New Relic for APM
```

### Scaling

- Database: Add read replicas, use connection pooling
- API: Run multiple instances behind load balancer
- Web: Use CDN for static assets
- Cache: Add Redis for session/token storage

### Backup Strategy

```bash
# Daily MySQL backup
mysqldump -u root -p bookinglite > backup-$(date +%Y%m%d).sql

# With Docker
docker compose exec db mysqldump -u root -pexample bookinglite > backup.sql
```

### Rollback Plan

```bash
# Docker
docker compose pull
docker compose up -d

# Database migration rollback
docker compose exec api pnpm prisma migrate resolve
```
