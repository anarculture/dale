
#!/bin/bash

echo "🧱 Iniciando instalación del entorno para Dale..."

# Frontend setup
echo "📦 Instalando dependencias del frontend..."
cd frontend
npm install

# Backend setup
echo "📦 Instalando dependencias del backend..."
cd ../backend
npm install
npx prisma generate

echo "✅ Entorno listo. Puedes ejecutar con: docker-compose up --build"
