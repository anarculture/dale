# backend/Dockerfile
FROM node:18-bullseye-slim

# 1) Set working dir
WORKDIR /app

# 2) Copy package manifests and install deps
COPY package*.json ./
RUN npm ci

# 3) Copy all code and build
COPY . .
RUN npm run build

# 4) Expose port and run the compiled output
EXPOSE 3001
CMD ["npm", "start"]
