import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

import { cloudflare } from "@cloudflare/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    devOptions: {
      enabled: true
    },
    manifest: {
      name: 'Hulun Trade — Candy & Sweets Distribution',
      short_name: 'Hulun Trade',
      description: 'Hulun Trade Co., Ltd. candy and sweets wholesale from Yiwu, China.',
      theme_color: '#009fe3',
      background_color: '#ffffff',
      icons: [
        {
          src: '/logo.jpg',
          sizes: '192x192',
          type: 'image/jpeg'
        },
        {
          src: '/logo.jpg',
          sizes: '512x512',
          type: 'image/jpeg'
        }
      ]
    }
  }), cloudflare()],
})