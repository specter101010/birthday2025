import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(),react()],
  server: {
    host: true, // Mengizinkan akses dari jaringan
    origin: 'https://10c7991fe475.ngrok-free.app', // URL dari ngrok kamu
  },
})
