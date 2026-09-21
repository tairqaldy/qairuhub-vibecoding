// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://vibecoding.qairuhub.com',
  trailingSlash: 'always',

  integrations: [
    mdx(),
    react(),
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', kk: 'kk' } },
    }),
  ],

  i18n: {
    locales: ['en', 'kk'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },

  markdown: {
    shikiConfig: { theme: 'vesper', wrap: true },
  },

  vite: { plugins: [tailwindcss()] },
  adapter: cloudflare(),
});