# Dockerfile (backend)
FROM node:18-alpine

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src
COPY src/prisma ./src/prisma

RUN npx prisma generate --schema=src/prisma/schema.prisma
RUN npm run build

EXPOSE 5000
CMD ["npm", "start"]
