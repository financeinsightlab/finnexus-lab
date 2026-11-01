import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
    test: {
        environment: 'node',
        include: ['lib/**/*.test.ts', 'tests/**/*.test.ts'],
        globals: false,
        testTimeout: 15000,
    },
    resolve: {
        alias: {
            '@': rootDir,
        },
    },
});
