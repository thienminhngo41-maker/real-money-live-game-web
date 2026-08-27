import { defineConfig } from 'vite';

export default defineConfig({
  base: '/real-money-live-game-web/',
  server: {
    port: 5173
  },
  build: {
    target: 'es2020'
  }
});
