import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5175,
    proxy: {
      '/api': {
        target: 'https://national-engg-works.onrender.com',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'https://national-engg-works.onrender.com',
        changeOrigin: true,
      },
    },
  },
})
