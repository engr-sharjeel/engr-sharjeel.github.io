import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The verified origin is engr-sharjeel/engr-sharjeel.github.io.
// PORTFOLIO_BASE lets verification exercise a project-repository subpath.
export default defineConfig({
  site: 'https://engr-sharjeel.github.io',
  base: process.env.PORTFOLIO_BASE || '/',
  output: 'static',
  integrations: [sitemap({ filter: page => !page.endsWith('/404.html') && !page.endsWith('/contact/thanks/') })],
  trailingSlash: 'always',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
});
