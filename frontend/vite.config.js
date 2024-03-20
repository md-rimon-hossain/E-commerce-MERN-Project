import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
     proxy: {
      "/api": "http://localhost:3001"
      // "/api": "https://e-commerce-backend-alpha-ruddy.vercel.app"
     }
  },
  plugins: [react()],
})
