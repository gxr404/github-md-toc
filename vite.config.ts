/// <reference types="vitest" />

import { defineConfig } from 'vite'
import { isDev, port, r } from './scripts/utils'
import { MV3Hmr } from './vite-mv3-hmr'
import { sharedConfig } from './vite.config.shared'

export default defineConfig(({ command }) => ({
  ...sharedConfig,
  base: command === 'serve' ? `http://localhost:${port}/` : '/dist/',
  server: {
    port,
    hmr: {
      host: 'localhost',
    },
  },
  build: {
    outDir: r('extension/dist'),
    emptyOutDir: false,
    sourcemap: isDev ? 'inline' : false,
    // https://developer.chrome.com/docs/webstore/program_policies/#:~:text=Code%20Readability%20Requirements
    terserOptions: {
      mangle: false,
    },
    rollupOptions: {
      input: {
        options: r('src/options/index.html'),
        popup: r('src/popup/index.html'),
      },
    },
  },
  plugins: [
    ...sharedConfig.plugins!,

    MV3Hmr(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
}))
