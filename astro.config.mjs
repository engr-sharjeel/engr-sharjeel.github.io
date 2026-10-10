import { defineConfig } from 'astro/config';

// The verified origin is engr-sharjeel/engr-sharjeel.github.io.
// PORTFOLIO_BASE lets verification exercise a project-repository subpath.
export default defineConfig({
  site: 'https://engr-sharjeel.github.io',
  base: process.env.PORTFOLIO_BASE || '/',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
});
