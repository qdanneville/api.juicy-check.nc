FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:22-alpine AS production

WORKDIR /app

# Copy full node_modules from builder so drizzle-kit and its TS runtime (jiti) are available
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

COPY --from=builder /app/dist ./dist

# Copy files drizzle-kit push needs to introspect the schema
COPY drizzle.config.ts ./
COPY src/lib/db ./src/lib/db

COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh


CMD ["./entrypoint.sh"]
