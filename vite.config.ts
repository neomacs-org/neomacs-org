import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // 4173 rather than Vite's dev default of 5173 — it matches what `vite
  // preview` uses, so the dev and preview servers are reachable at one port.
  server: { port: 4173 },
})
