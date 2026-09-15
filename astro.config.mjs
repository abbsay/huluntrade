import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://huluntrade.com',
  output: 'static',
  adapter: cloudflare(),
  integrations: [
    react(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          ru: 'ru',
          ar: 'ar',
          fr: 'fr',
        },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru', 'ar', 'fr'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    ssr: {
      noExternal: ['framer-motion', 'lucide-react', 'swiper'],
    },
    optimizeDeps: {
      exclude: ['framer-motion'],
    },
  },
});
