/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  server: { port: 5173, strictPort: true },
  // Bound to IPv4 loopback explicitly: on GitHub runners `localhost` resolves to ::1 first and Playwright's
  // webServer poll of http://127.0.0.1:4173 never connects.
  preview: { host: '127.0.0.1', port: 4173, strictPort: true },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    css: { modules: { classNameStrategy: 'non-scoped' } },
    coverage: {
      provider: 'v8',
      // PWA.md §8: ≥ 90 % on engines and services.
      include: ['src/games/*/engine/**', 'src/services/**'],
      exclude: ['**/*.test.*', '**/types.ts'],
      thresholds: { lines: 90 },
      reporter: ['text', 'text-summary'],
    },
  },
});
