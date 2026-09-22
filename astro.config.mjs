// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { unified } from '@astrojs/markdown-remark';
import rehypeSections from './src/lib/rehype-sections.mjs';

export default defineConfig({
  site: 'https://vibecoding.qairuhub.com',
  trailingSlash: 'always',
  integrations: [
    mdx({ processor: unified({ rehypePlugins: [rehypeSections] }) }),
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
    processor: unified({ rehypePlugins: [rehypeSections] }),
  },

  vite: { plugins: [tailwindcss()] },
});