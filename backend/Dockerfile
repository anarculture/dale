# backend/Dockerfile

FROM node:18-alpine

# Install dependencies required to build native modules like bcrypt
RUN apk add --no-cache python3 make g++
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy application source
COPY . .

# Compile TypeScript
RUN npx prisma generate
RUN npm run build

EXPOSE 5000
CMD ["npm", "start"]
