FROM node:20-alpine
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile || pnpm install

# Copy source
COPY . .

# Generate Prisma client
RUN pnpm prisma:generate

# Build app
RUN pnpm build

EXPOSE 4000

# Run migrations and start app
CMD ["sh", "-c", "pnpm prisma migrate deploy && node dist/index.js"]
