import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    host: '0.0.0.0',
    port:  5173, // Use Render's assigned port
    strictPort: true, // Ensures it doesn't fallback to a random port
    allowedHosts: ['rev-and-roar.onrender.com'], // Allow Render's domain
  },
})
