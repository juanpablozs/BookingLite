#!/bin/bash
# Setup script for BookingLite local development

set -e

echo "🚀 BookingLite Setup"
echo "===================="

# Check prerequisites
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+"
    exit 1
fi

if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm..."
    npm install -g pnpm
fi

if ! command -v mysql &> /dev/null; then
    echo "⚠️  MySQL not found. Ensure MySQL is running (http://localhost:3306)"
fi

echo ""
echo "📦 Installing API dependencies..."
cd apps/api
pnpm install
pnpm prisma:generate
echo "✅ API setup done"

echo ""
echo "📦 Installing Web dependencies..."
cd ../web
pnpm install
echo "✅ Web setup done"

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Ensure MySQL is running"
echo "2. Run: cd apps/api && pnpm prisma:migrate"
echo "3. In separate terminals:"
echo "   - cd apps/api && pnpm dev    (API on :4000)"
echo "   - cd apps/web && pnpm dev    (Web on :5173)"
