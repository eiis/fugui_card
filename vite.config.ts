import { defineConfig, splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import mkcert from 'vite-plugin-mkcert'
import basicSsl from '@vitejs/plugin-basic-ssl'
import VueDevTools from 'vite-plugin-vue-devtools'
import BuildInfo from 'vite-plugin-info'
import path from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // VueDevTools(),
    vue(),
    splitVendorChunkPlugin(),
    // VueDevTools(),
    // basicSsl(),
    mkcert(),
    // BuildInfo({ meta: { message: 'This is set from vite.config.ts' } })
  ],
  resolve: {
    alias: {
      // 将 `@` 解析为 `/src` 目录
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    // open: true,
    https: true
  },
  build: {
    target: 'es2015',
    // 将 rollupInputOptions 改为 rollupOptions
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/main.ts'),
        // vendor: path.resolve(__dirname, 'src/vendor.js')
      },
      output: {
        manualChunks: {
          'chunkHelloWorld': ['src/components/HelloWorld.vue'],
          // 'vue': ['vue'],
          // 其他文件将被打包到一个默认的chunk中
        },
      },
    },
    sourcemap: 'hidden'
  }
})
