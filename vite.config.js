import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  server: {
    proxy: {
      '/wikipediaAPI': {
        target: 'https://zh.wikipedia.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wikipediaAPI/, '')
      },
      '/juhe': {
        target: 'http://apis.juhe.cn/fapigx',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/juhe/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})