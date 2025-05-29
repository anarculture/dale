// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // todas las llamadas a /api irán al backend en 3001
      '/api': 'http://localhost:3001'
    }
  }
})
