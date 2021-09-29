import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {},
        dir: 'dist',
        assetFileNames: 'assets/product.[ext]',
        entryFileNames: 'assets/product.js',
      }
    }
  }
})
