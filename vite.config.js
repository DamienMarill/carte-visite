import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/carte-visite/' : '/',
  plugins: [svelte(), tailwindcss()],
  server: {
    allowedHosts: ['039e-46-19-110-36.ngrok-free.app'],
  },
})
