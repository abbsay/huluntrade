import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: cloudflare(),
  integrations: [react()],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru', 'ar', 'fr'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
