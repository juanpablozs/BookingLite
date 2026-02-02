#!/bin/bash
# Prisma migration setup for Docker

echo "🔄 Running Prisma migrations..."

cd /app

# Wait for database to be ready
echo "⏳ Waiting for database..."
for i in {1..30}; do
  if mysql -h db -u root -pexample -e "SELECT 1" &> /dev/null; then
    echo "✅ Database is ready"
    break
  fi
  echo "Attempt $i/30..."
  sleep 1
done

# Generate Prisma client
echo "📦 Generating Prisma client..."
pnpm prisma:generate

# Run migrations
echo "🚀 Running migrations..."
pnpm prisma migrate deploy

echo "✅ Database setup complete"
