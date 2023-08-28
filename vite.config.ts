import path, { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import UnoCSS from 'unocss/vite'

// import alias from '@rollup/plugin-alias'
import AutoImport from 'unplugin-auto-import/vite'
import Vue from '@vitejs/plugin-vue'
import { type PluginOption, defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import mkcert from 'vite-plugin-mkcert'
import { visualizer } from 'rollup-plugin-visualizer'

import VueRouter from 'unplugin-vue-router/vite'

// 自动导入组件
import Components from 'unplugin-vue-components/vite'

// import vitePluginSemanticChunks from 'vite-plugin-semantic-chunks';

import VueMacros from 'unplugin-vue-macros/vite'
import svgLoader from 'vite-svg-loader'

// // 根据 NODE_ENV 加载 .env 文件
// const envFile = `.env.${process.env.NODE_ENV}`;
// if (fs.existsSync(path.resolve(__dirname, envFile))) {
//   config({ path: envFile });
// } else {
//   console.log(`.env file for ${process.env.NODE_ENV} does not exist`);
// }

// 你现在可以通过 process.env 访问到环境变量
// console.log(process.env.VITE_APP_TITLE);

const __filename = fileURLToPath(import.meta.url)
console.log('__filename', __filename) // 输出：/path/to/current/file.mjs

const __dirname = dirname(fileURLToPath(import.meta.url))
console.log('__dirname', __dirname) // 输出：/path/to/current/file

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '')

  // console.log('process.env.BASE_ENV', process.env)

  return {
    // 剔除 options_api
    // define: {
    //   __VUE_OPTIONS_API__: false,
    // },
    // base: './',
    plugins: [
      VueRouter(),
      VueMacros({
        plugins: {
          vue: Vue({
            include: [/\.vue$/, /\.md$/],
          }),
        },
      }),
      UnoCSS(),
      splitVendorChunkPlugin(),
      // VueDevTools(),
      // basicSsl(),
      mkcert(),
      // vitePluginSemanticChunks(),
      // alias({
      //   entries: [
      //     { find: '@', replacement: 'src' },
      //   ],
      // }),
      createHtmlPlugin({
        inject: {
          data: {
            title: env.VITE_APP_TITLE,
          },
        },
      }),
      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          'vue-i18n',
          '@vueuse/head',
          '@vueuse/core',
        ],
        dts: 'src/auto-imports.d.ts',
        dirs: [
          'src/composables',
          'src/stores',
        ],
        vueTemplate: true,
      }),
      // https://github.com/antfu/unplugin-vue-components
      Components({
      // allow auto load markdown components under `./src/components/`
        extensions: ['vue', 'md'],
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: 'src/components.d.ts',
      }),
      // 设置预加载文件，提升页面首次加载速度（仅开发环境需要）
      // mode === 'development' && setPreLoadFile({
      //   pathList: [ // 需要提前加载的资源目录
      //     './src/components/',
      //   ],
      //   preFix: 'https://127.0.0.1:5173', // 项目根路径
      // }),
      svgLoader(),
      visualizer(
        {
          open: false,
          gzipSize: true,
          brotliSize: true,
        },
      ) as PluginOption,
      // VueMacros({
      //   plugins: {
      //     vue: Vue(),
      //   },
      // }),
      // BuildInfo({ meta: { message: 'This is set from vite.config.ts' } })
    ],
    // 放在外面需要配置Vue plugins
    test: {
      include: ['test/**/*.test.ts'],
      environment: 'jsdom',
      deps: {
        inline: ['@vue', '@vueuse', 'vue-demi'],
      },
    },
    assetsInclude: ['**/*.ttf'],
    resolve: {
      alias: {
        // 将 `@` 解析为 `/src` 目录
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      // open: true,
      https: true,
    },
    build: {
      target: 'es2015',
      // 将 rollupInputOptions 改为 rollupOptions
      rollupOptions: {
        // 入口
        input: {
          main: resolve(__dirname, 'index.html'),
        },
        output: {
          manualChunks(id) {
            if (id.includes('lodash'))
              return 'lodash'
            // if (id.includes('vue-router'))
            //   return 'vendor'
          },
        },
      },
    },
  }
})
