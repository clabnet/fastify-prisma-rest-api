import { defineConfig } from 'tsup'

export default defineConfig({
  name: 'node-fastify-jwt-prisma-api',
  entry: ['src/**/*.ts'],
  format: ['esm'],
  splitting: false,
  sourcemap: 'inline',
  target: 'es2022',
  minify: true,
  clean: true,
  publicDir: true,
})
