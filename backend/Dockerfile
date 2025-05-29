# backend/Dockerfile

FROM node:18-bullseye-slim

WORKDIR /app

# Instala dependencias del sistema (incluye libssl)
RUN apt-get update && \
  apt-get install -y --no-install-recommends \
  libssl-dev \
  && rm -rf /var/lib/apt/lists/*

# Copia y prepara tu app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npx prisma generate
RUN npm run build

EXPOSE 3001

CMD ["node", "dist/index.js"]
