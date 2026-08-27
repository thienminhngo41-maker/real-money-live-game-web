import { defineConfig } from 'vite';

export default defineConfig({
  // GitHub Pages is served from /real-money-live-game-web/,
  // while Netlify serves the site from the domain root.
  base: process.env.NETLIFY ? '/' : '/real-money-live-game-web/',
  server: {
    port: 5173
  },
  build: {
    target: 'es2020'
  }
});
