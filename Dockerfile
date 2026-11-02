# --- Etapa de Build ---
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# --- Etapa de Produção ---
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

# Copiar os ficheiros compilados da etapa anterior
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]