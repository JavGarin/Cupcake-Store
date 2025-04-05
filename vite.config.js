import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Puerto por defecto de Vite
    open: true  // Abre el navegador automáticamente
  },
  build: {
    outDir: 'dist' // Carpeta de producción
  }
});