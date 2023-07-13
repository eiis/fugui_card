import alias from '@rollup/plugin-alias';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import mkcert from 'vite-plugin-mkcert';
import vitePluginSemanticChunks from 'vite-plugin-semantic-chunks';

// // 根据 NODE_ENV 加载 .env 文件
// const envFile = `.env.${process.env.NODE_ENV}`;
// if (fs.existsSync(path.resolve(__dirname, envFile))) {
//   config({ path: envFile });
// } else {
//   console.log(`.env file for ${process.env.NODE_ENV} does not exist`);
// }

// 你现在可以通过 process.env 访问到环境变量
// console.log(process.env.VITE_APP_TITLE);

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: './',
    plugins: [
      // VueDevTools(),
      vue(),
      splitVendorChunkPlugin(),
      // VueDevTools(),
      // basicSsl(),
      mkcert(),
      vitePluginSemanticChunks(),
      alias({
        entries: [
          { find: '@', replacement: '/src' },
          { find: 'batman-1.0.0', replacement: './joker-1.5.0' }
        ]
      }),
      createHtmlPlugin({
        inject: {
          data: {
            title: env.VITE_APP_TITLE,
          },
        }
      }),
      AutoImport({
        imports: ['vue', '@vueuse/core'],
        // resolvers: [
        // ],
        // dirs: [
        //   './composables/**',
        // ],
        vueTemplate: true,
        // cache: true,
      }),
      // BuildInfo({ meta: { message: 'This is set from vite.config.ts' } })
    ],
    resolve: {
      alias: {
        // 将 `@` 解析为 `/src` 目录
        // '@': path.resolve(__dirname, 'src')
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
          main: path.resolve(__dirname, 'index.html'),
          // vendor: path.resolve(__dirname, 'src/vendor.js')
        },
        output: {
          manualChunks: {
          },
          assetFileNames: (assetInfo) => {
            if (assetInfo.name.endsWith('.svg') || assetInfo.name.endsWith('.jpeg') || assetInfo.name.endsWith('.png') || assetInfo.name.endsWith('.jpg')) {
              return 'images/[name][extname]';
            } else if (assetInfo.name.endsWith('.ttf') || assetInfo.name.endsWith('.woff') || assetInfo.name.endsWith('.woff2') || assetInfo.name.endsWith('.ttf') || assetInfo.name.endsWith('.eot')) {
              return 'fonts/[name][extname]';
            } else {
              return '[name][extname]';
            }
          }
        },
      },
      // sourcemap: true
    }
  }
})
