import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {
    include: ['./src/**/*.e2e-spec.ts'],
    globals: true,
    root: './',
    setupFiles: ['./src/test/setup-e2e.ts'],
    fileParallelism: false,
    bail: 1,
    maxConcurrency: 1,
    retry: 1,
  },
  plugins: [swc.vite(), tsconfigPaths()],
});
