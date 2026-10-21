import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  // Root-path deployment (GitHub Pages user site). Override for sub-path deploys.
  base: process.env.VITE_BASE_PATH ?? '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2022',
    cssTarget: 'chrome110',
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        // Keep the WebGL runtime in its own chunk so the first paint never waits on Three.js.
        manualChunks(id) {
          if (id.includes('node_modules/three') || id.includes('node_modules/@react-three')) {
            return 'three'
          }
          return undefined
        },
      },
    },
  },
  server: {
    host: '127.0.0.1',
    port: 5173,
  },
})
