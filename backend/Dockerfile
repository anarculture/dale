# backend/Dockerfile
FROM node:18-bullseye-slim

WORKDIR /app

# 1) copy package files and install
COPY package*.json ./
RUN npm ci

# 2) copy the prisma schema *before* generating client
COPY prisma ./prisma

# 3) generate Prisma Client (picks up your binaryTargets change)
RUN npx prisma generate

# 4) copy the rest of your source and install devDeps
COPY . .
# (you already have ts-node-dev, bcrypt, etc in package.json)
RUN npm run build

EXPOSE 3001
CMD ["npm", "start"]
