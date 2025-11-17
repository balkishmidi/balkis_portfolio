import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // important for SPA routing on Vercel
  build: {
    outDir: 'dist', // default, but explicit for clarity
  },
})
