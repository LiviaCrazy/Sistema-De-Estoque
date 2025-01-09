import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '192.168.9.252', // Define o endereço IP que o servidor deve escutar
    port: 3000, // Altere a porta se necessário
    open: true, // Abre automaticamente o navegador
  },
})