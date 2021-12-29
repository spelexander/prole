import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve, dirname } from 'path'
import { chromeExtension } from 'rollup-plugin-chrome-extension'

export default defineConfig({
  // resolve: {
  //   alias: {
  //     '@': resolve('src'),
  //   },
  // },
  // build: {
  //   rollupOptions: {
  //     input: 'src/manifest.json',
  //   },
  // },
  // @ts-ignore
  plugins: [
    react(),
    // chromeExtension()
  ],
})
