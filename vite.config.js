import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/fabric-dp700-quiz/',  // <-- 👈 this is the repo name
  plugins: [react()],
})
