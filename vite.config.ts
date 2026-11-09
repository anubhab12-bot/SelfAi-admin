import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Essential for GitHub Pages subfolder deployment
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
