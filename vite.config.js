import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main:                resolve(__dirname, 'index.html'),
        pertemuan6latihan:   resolve(__dirname, 'pertemuan6-latihan.html'),
      },
    },
  },
})
