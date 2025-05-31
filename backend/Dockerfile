# Dockerfile (backend)
FROM node:18-alpine

# Add native build dependencies required by bcrypt
RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./

# ⬇️ Install deps incl. bcrypt from package.json
RUN npm install

# ⬇️ Copy source AFTER install
COPY . .

# ⬇️ Prisma generate inside image
RUN npx prisma generate

# ⬇️ Build TS to dist
RUN npm run build

EXPOSE 5000
CMD ["npm", "start"]
