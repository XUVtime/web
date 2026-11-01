import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/HomeWeaponEffects.jsx', import.meta.url)),
      name: 'HomeWeaponEffects',
      formats: ['iife'],
      fileName: () => 'home-weapon-effects.js',
      cssFileName: 'home-weapon-effects',
    },
    outDir: '../home-widget-dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
})