import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
    include: ['./src/**/*.test.ts'],
    isolate: true,
    pool: 'threads',
    watch: false,
    coverage: {
      include: ['src/**/*.ts'],
      exclude: ['src/index.ts'],
      provider: 'v8',
      reporter: ['text'],
      // A floor just under where the suite stands, so a change that drops coverage has to say so
      // rather than slip through.
      thresholds: {
        statements: 99,
        branches: 95,
        functions: 100,
        lines: 99,
      },
    },
  },
});
