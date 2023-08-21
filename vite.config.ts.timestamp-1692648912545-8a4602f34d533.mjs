// vite.config.ts
import path, { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import AutoImport from 'file:///Users/zhangdashu/Desktop/vite/my-project/node_modules/.pnpm/registry.npmmirror.com+unplugin-auto-import@0.16.6_@vueuse+core@10.2.1/node_modules/unplugin-auto-import/dist/vite.js'
import Vue from 'file:///Users/zhangdashu/Desktop/vite/my-project/node_modules/.pnpm/registry.npmmirror.com+@vitejs+plugin-vue@4.2.3_vite@4.4.3_vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs'
import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'file:///Users/zhangdashu/Desktop/vite/my-project/node_modules/.pnpm/registry.npmmirror.com+vite@4.4.3_@types+node@18.15.11/node_modules/vite/dist/node/index.js'
import { createHtmlPlugin } from 'file:///Users/zhangdashu/Desktop/vite/my-project/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-html@3.2.0_vite@4.4.3/node_modules/vite-plugin-html/dist/index.mjs'
import mkcert from 'file:///Users/zhangdashu/Desktop/vite/my-project/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-mkcert@1.16.0_vite@4.4.3/node_modules/vite-plugin-mkcert/dist/mkcert.mjs'
import { visualizer } from 'file:///Users/zhangdashu/Desktop/vite/my-project/node_modules/.pnpm/registry.npmmirror.com+rollup-plugin-visualizer@5.9.2/node_modules/rollup-plugin-visualizer/dist/plugin/index.js'
import VueRouter from 'file:///Users/zhangdashu/Desktop/vite/my-project/node_modules/.pnpm/registry.npmmirror.com+unplugin-vue-router@0.6.4_vue-router@4.2.4_vue@3.3.4/node_modules/unplugin-vue-router/dist/vite.mjs'
import Components from 'file:///Users/zhangdashu/Desktop/vite/my-project/node_modules/.pnpm/registry.npmmirror.com+unplugin-vue-components@0.25.1_vue@3.3.4/node_modules/unplugin-vue-components/dist/vite.mjs'
import VueMacros from 'file:///Users/zhangdashu/Desktop/vite/my-project/node_modules/.pnpm/registry.npmmirror.com+unplugin-vue-macros@2.3.6_@vueuse+core@10.2.1_vite@4.4.3_vue@3.3.4/node_modules/unplugin-vue-macros/dist/vite.mjs'
import svgLoader from 'file:///Users/zhangdashu/Desktop/vite/my-project/node_modules/.pnpm/registry.npmmirror.com+vite-svg-loader@4.0.0/node_modules/vite-svg-loader/index.js'

const __vite_injected_original_import_meta_url = 'file:///Users/zhangdashu/Desktop/vite/my-project/vite.config.ts'
const __filename = fileURLToPath(__vite_injected_original_import_meta_url)
console.log('__filename', __filename)
const __dirname = dirname(fileURLToPath(__vite_injected_original_import_meta_url))
console.log('__dirname', __dirname)
const vite_config_default = defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
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
      ),
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
          },
        },
      },
    },
  }
})
export {
  vite_config_default as default,
}
// # sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvemhhbmdkYXNodS9EZXNrdG9wL3ZpdGUvbXktcHJvamVjdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3poYW5nZGFzaHUvRGVza3RvcC92aXRlL215LXByb2plY3Qvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3poYW5nZGFzaHUvRGVza3RvcC92aXRlL215LXByb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcGF0aCwgeyBkaXJuYW1lLCByZXNvbHZlIH0gZnJvbSAnbm9kZTpwYXRoJ1xuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ25vZGU6dXJsJ1xuXG4vLyBpbXBvcnQgYWxpYXMgZnJvbSAnQHJvbGx1cC9wbHVnaW4tYWxpYXMnXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xuaW1wb3J0IFZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgeyB0eXBlIFBsdWdpbk9wdGlvbiwgZGVmaW5lQ29uZmlnLCBsb2FkRW52LCBzcGxpdFZlbmRvckNodW5rUGx1Z2luIH0gZnJvbSAndml0ZSdcbmltcG9ydCB7IGNyZWF0ZUh0bWxQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1odG1sJ1xuaW1wb3J0IG1rY2VydCBmcm9tICd2aXRlLXBsdWdpbi1ta2NlcnQnXG5pbXBvcnQgeyB2aXN1YWxpemVyIH0gZnJvbSAncm9sbHVwLXBsdWdpbi12aXN1YWxpemVyJ1xuXG5pbXBvcnQgVnVlUm91dGVyIGZyb20gJ3VucGx1Z2luLXZ1ZS1yb3V0ZXIvdml0ZSdcblxuLy8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1XHU3RUM0XHU0RUY2XG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuXG4vLyBpbXBvcnQgdml0ZVBsdWdpblNlbWFudGljQ2h1bmtzIGZyb20gJ3ZpdGUtcGx1Z2luLXNlbWFudGljLWNodW5rcyc7XG5cbmltcG9ydCBWdWVNYWNyb3MgZnJvbSAndW5wbHVnaW4tdnVlLW1hY3Jvcy92aXRlJ1xuaW1wb3J0IHN2Z0xvYWRlciBmcm9tICd2aXRlLXN2Zy1sb2FkZXInXG5cbi8vIC8vIFx1NjgzOVx1NjM2RSBOT0RFX0VOViBcdTUyQTBcdThGN0QgLmVudiBcdTY1ODdcdTRFRjZcbi8vIGNvbnN0IGVudkZpbGUgPSBgLmVudi4ke3Byb2Nlc3MuZW52Lk5PREVfRU5WfWA7XG4vLyBpZiAoZnMuZXhpc3RzU3luYyhwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBlbnZGaWxlKSkpIHtcbi8vICAgY29uZmlnKHsgcGF0aDogZW52RmlsZSB9KTtcbi8vIH0gZWxzZSB7XG4vLyAgIGNvbnNvbGUubG9nKGAuZW52IGZpbGUgZm9yICR7cHJvY2Vzcy5lbnYuTk9ERV9FTlZ9IGRvZXMgbm90IGV4aXN0YCk7XG4vLyB9XG5cbi8vIFx1NEY2MFx1NzNCMFx1NTcyOFx1NTNFRlx1NEVFNVx1OTAxQVx1OEZDNyBwcm9jZXNzLmVudiBcdThCQkZcdTk1RUVcdTUyMzBcdTczQUZcdTU4ODNcdTUzRDhcdTkxQ0Zcbi8vIGNvbnNvbGUubG9nKHByb2Nlc3MuZW52LlZJVEVfQVBQX1RJVExFKTtcblxuY29uc3QgX19maWxlbmFtZSA9IGZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKVxuY29uc29sZS5sb2coJ19fZmlsZW5hbWUnLCBfX2ZpbGVuYW1lKSAvLyBcdThGOTNcdTUxRkFcdUZGMUEvcGF0aC90by9jdXJyZW50L2ZpbGUubWpzXG5cbmNvbnN0IF9fZGlybmFtZSA9IGRpcm5hbWUoZmlsZVVSTFRvUGF0aChpbXBvcnQubWV0YS51cmwpKVxuY29uc29sZS5sb2coJ19fZGlybmFtZScsIF9fZGlybmFtZSkgLy8gXHU4RjkzXHU1MUZBXHVGRjFBL3BhdGgvdG8vY3VycmVudC9maWxlXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgY29tbWFuZCwgbW9kZSB9KSA9PiB7XG4gIC8vIFx1NjgzOVx1NjM2RVx1NUY1M1x1NTI0RFx1NURFNVx1NEY1Q1x1NzZFRVx1NUY1NVx1NEUyRFx1NzY4NCBgbW9kZWAgXHU1MkEwXHU4RjdEIC5lbnYgXHU2NTg3XHU0RUY2XG4gIC8vIFx1OEJCRVx1N0Y2RVx1N0IyQ1x1NEUwOVx1NEUyQVx1NTNDMlx1NjU3MFx1NEUzQSAnJyBcdTY3NjVcdTUyQTBcdThGN0RcdTYyNDBcdTY3MDlcdTczQUZcdTU4ODNcdTUzRDhcdTkxQ0ZcdUZGMENcdTgwMENcdTRFMERcdTdCQTFcdTY2MkZcdTU0MjZcdTY3MDkgYFZJVEVfYCBcdTUyNERcdTdGMDBcdTMwMDJcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpLCAnJylcblxuICAvLyBjb25zb2xlLmxvZygncHJvY2Vzcy5lbnYuQkFTRV9FTlYnLCBwcm9jZXNzLmVudilcblxuICByZXR1cm4ge1xuICAgIC8vIFx1NTI1NFx1OTY2NCBvcHRpb25zX2FwaVxuICAgIC8vIGRlZmluZToge1xuICAgIC8vICAgX19WVUVfT1BUSU9OU19BUElfXzogZmFsc2UsXG4gICAgLy8gfSxcbiAgICAvLyBiYXNlOiAnLi8nLFxuICAgIHBsdWdpbnM6IFtcbiAgICAgIFZ1ZVJvdXRlcigpLFxuICAgICAgVnVlTWFjcm9zKHtcbiAgICAgICAgcGx1Z2luczoge1xuICAgICAgICAgIHZ1ZTogVnVlKHtcbiAgICAgICAgICAgIGluY2x1ZGU6IFsvXFwudnVlJC8sIC9cXC5tZCQvXSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgICAgc3BsaXRWZW5kb3JDaHVua1BsdWdpbigpLFxuICAgICAgLy8gVnVlRGV2VG9vbHMoKSxcbiAgICAgIC8vIGJhc2ljU3NsKCksXG4gICAgICBta2NlcnQoKSxcbiAgICAgIC8vIHZpdGVQbHVnaW5TZW1hbnRpY0NodW5rcygpLFxuICAgICAgLy8gYWxpYXMoe1xuICAgICAgLy8gICBlbnRyaWVzOiBbXG4gICAgICAvLyAgICAgeyBmaW5kOiAnQCcsIHJlcGxhY2VtZW50OiAnc3JjJyB9LFxuICAgICAgLy8gICBdLFxuICAgICAgLy8gfSksXG4gICAgICBjcmVhdGVIdG1sUGx1Z2luKHtcbiAgICAgICAgaW5qZWN0OiB7XG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgdGl0bGU6IGVudi5WSVRFX0FQUF9USVRMRSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvdW5wbHVnaW4tYXV0by1pbXBvcnRcbiAgICAgIEF1dG9JbXBvcnQoe1xuICAgICAgICBpbXBvcnRzOiBbXG4gICAgICAgICAgJ3Z1ZScsXG4gICAgICAgICAgJ3Z1ZS1yb3V0ZXInLFxuICAgICAgICAgICd2dWUtaTE4bicsXG4gICAgICAgICAgJ0B2dWV1c2UvaGVhZCcsXG4gICAgICAgICAgJ0B2dWV1c2UvY29yZScsXG4gICAgICAgIF0sXG4gICAgICAgIGR0czogJ3NyYy9hdXRvLWltcG9ydHMuZC50cycsXG4gICAgICAgIGRpcnM6IFtcbiAgICAgICAgICAnc3JjL2NvbXBvc2FibGVzJyxcbiAgICAgICAgICAnc3JjL3N0b3JlcycsXG4gICAgICAgIF0sXG4gICAgICAgIHZ1ZVRlbXBsYXRlOiB0cnVlLFxuICAgICAgfSksXG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvdW5wbHVnaW4tdnVlLWNvbXBvbmVudHNcbiAgICAgIENvbXBvbmVudHMoe1xuICAgICAgLy8gYWxsb3cgYXV0byBsb2FkIG1hcmtkb3duIGNvbXBvbmVudHMgdW5kZXIgYC4vc3JjL2NvbXBvbmVudHMvYFxuICAgICAgICBleHRlbnNpb25zOiBbJ3Z1ZScsICdtZCddLFxuICAgICAgICAvLyBhbGxvdyBhdXRvIGltcG9ydCBhbmQgcmVnaXN0ZXIgY29tcG9uZW50cyB1c2VkIGluIG1hcmtkb3duXG4gICAgICAgIGluY2x1ZGU6IFsvXFwudnVlJC8sIC9cXC52dWVcXD92dWUvLCAvXFwubWQkL10sXG4gICAgICAgIGR0czogJ3NyYy9jb21wb25lbnRzLmQudHMnLFxuICAgICAgfSksXG4gICAgICAvLyBcdThCQkVcdTdGNkVcdTk4ODRcdTUyQTBcdThGN0RcdTY1ODdcdTRFRjZcdUZGMENcdTYzRDBcdTUzNDdcdTk4NzVcdTk3NjJcdTk5OTZcdTZCMjFcdTUyQTBcdThGN0RcdTkwMUZcdTVFQTZcdUZGMDhcdTRFQzVcdTVGMDBcdTUzRDFcdTczQUZcdTU4ODNcdTk3MDBcdTg5ODFcdUZGMDlcbiAgICAgIC8vIG1vZGUgPT09ICdkZXZlbG9wbWVudCcgJiYgc2V0UHJlTG9hZEZpbGUoe1xuICAgICAgLy8gICBwYXRoTGlzdDogWyAvLyBcdTk3MDBcdTg5ODFcdTYzRDBcdTUyNERcdTUyQTBcdThGN0RcdTc2ODRcdThENDRcdTZFOTBcdTc2RUVcdTVGNTVcbiAgICAgIC8vICAgICAnLi9zcmMvY29tcG9uZW50cy8nLFxuICAgICAgLy8gICBdLFxuICAgICAgLy8gICBwcmVGaXg6ICdodHRwczovLzEyNy4wLjAuMTo1MTczJywgLy8gXHU5ODc5XHU3NkVFXHU2ODM5XHU4REVGXHU1Rjg0XG4gICAgICAvLyB9KSxcbiAgICAgIHN2Z0xvYWRlcigpLFxuICAgICAgdmlzdWFsaXplcihcbiAgICAgICAge1xuICAgICAgICAgIG9wZW46IGZhbHNlLFxuICAgICAgICAgIGd6aXBTaXplOiB0cnVlLFxuICAgICAgICAgIGJyb3RsaVNpemU6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICApIGFzIFBsdWdpbk9wdGlvbixcbiAgICAgIC8vIFZ1ZU1hY3Jvcyh7XG4gICAgICAvLyAgIHBsdWdpbnM6IHtcbiAgICAgIC8vICAgICB2dWU6IFZ1ZSgpLFxuICAgICAgLy8gICB9LFxuICAgICAgLy8gfSksXG4gICAgICAvLyBCdWlsZEluZm8oeyBtZXRhOiB7IG1lc3NhZ2U6ICdUaGlzIGlzIHNldCBmcm9tIHZpdGUuY29uZmlnLnRzJyB9IH0pXG4gICAgXSxcbiAgICAvLyBcdTY1M0VcdTU3MjhcdTU5MTZcdTk3NjJcdTk3MDBcdTg5ODFcdTkxNERcdTdGNkVWdWUgcGx1Z2luc1xuICAgIHRlc3Q6IHtcbiAgICAgIGluY2x1ZGU6IFsndGVzdC8qKi8qLnRlc3QudHMnXSxcbiAgICAgIGVudmlyb25tZW50OiAnanNkb20nLFxuICAgICAgZGVwczoge1xuICAgICAgICBpbmxpbmU6IFsnQHZ1ZScsICdAdnVldXNlJywgJ3Z1ZS1kZW1pJ10sXG4gICAgICB9LFxuICAgIH0sXG4gICAgYXNzZXRzSW5jbHVkZTogWycqKi8qLnR0ZiddLFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgIC8vIFx1NUMwNiBgQGAgXHU4OUUzXHU2NzkwXHU0RTNBIGAvc3JjYCBcdTc2RUVcdTVGNTVcbiAgICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyksXG4gICAgICB9LFxuICAgIH0sXG4gICAgc2VydmVyOiB7XG4gICAgICAvLyBvcGVuOiB0cnVlLFxuICAgICAgaHR0cHM6IHRydWUsXG4gICAgfSxcbiAgICBidWlsZDoge1xuICAgICAgdGFyZ2V0OiAnZXMyMDE1JyxcbiAgICAgIC8vIFx1NUMwNiByb2xsdXBJbnB1dE9wdGlvbnMgXHU2NTM5XHU0RTNBIHJvbGx1cE9wdGlvbnNcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgLy8gXHU1MTY1XHU1M0UzXG4gICAgICAgIGlucHV0OiB7XG4gICAgICAgICAgbWFpbjogcmVzb2x2ZShfX2Rpcm5hbWUsICdpbmRleC5odG1sJyksXG4gICAgICAgIH0sXG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgIG1hbnVhbENodW5rcyhpZCkge1xuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdsb2Rhc2gnKSlcbiAgICAgICAgICAgICAgcmV0dXJuICdsb2Rhc2gnXG4gICAgICAgICAgICAvLyBpZiAoaWQuaW5jbHVkZXMoJ3Z1ZS1yb3V0ZXInKSlcbiAgICAgICAgICAgIC8vICAgcmV0dXJuICd2ZW5kb3InXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNlMsT0FBTyxRQUFRLFNBQVMsZUFBZTtBQUNwVixTQUFTLHFCQUFxQjtBQUc5QixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLFNBQVM7QUFDaEIsU0FBNEIsY0FBYyxTQUFTLDhCQUE4QjtBQUNqRixTQUFTLHdCQUF3QjtBQUNqQyxPQUFPLFlBQVk7QUFDbkIsU0FBUyxrQkFBa0I7QUFFM0IsT0FBTyxlQUFlO0FBR3RCLE9BQU8sZ0JBQWdCO0FBSXZCLE9BQU8sZUFBZTtBQUN0QixPQUFPLGVBQWU7QUFuQm9LLElBQU0sMkNBQTJDO0FBZ0MzTyxJQUFNLGFBQWEsY0FBYyx3Q0FBZTtBQUNoRCxRQUFRLElBQUksY0FBYyxVQUFVO0FBRXBDLElBQU0sWUFBWSxRQUFRLGNBQWMsd0NBQWUsQ0FBQztBQUN4RCxRQUFRLElBQUksYUFBYSxTQUFTO0FBR2xDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsU0FBUyxLQUFLLE1BQU07QUFHakQsUUFBTSxNQUFNLFFBQVEsTUFBTSxRQUFRLElBQUksR0FBRyxFQUFFO0FBSTNDLFNBQU87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFNTCxTQUFTO0FBQUEsTUFDUCxVQUFVO0FBQUEsTUFDVixVQUFVO0FBQUEsUUFDUixTQUFTO0FBQUEsVUFDUCxLQUFLLElBQUk7QUFBQSxZQUNQLFNBQVMsQ0FBQyxVQUFVLE9BQU87QUFBQSxVQUM3QixDQUFDO0FBQUEsUUFDSDtBQUFBLE1BQ0YsQ0FBQztBQUFBLE1BQ0QsdUJBQXVCO0FBQUE7QUFBQTtBQUFBLE1BR3ZCLE9BQU87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQU9QLGlCQUFpQjtBQUFBLFFBQ2YsUUFBUTtBQUFBLFVBQ04sTUFBTTtBQUFBLFlBQ0osT0FBTyxJQUFJO0FBQUEsVUFDYjtBQUFBLFFBQ0Y7QUFBQSxNQUNGLENBQUM7QUFBQTtBQUFBLE1BRUQsV0FBVztBQUFBLFFBQ1QsU0FBUztBQUFBLFVBQ1A7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUFBLFFBQ0EsS0FBSztBQUFBLFFBQ0wsTUFBTTtBQUFBLFVBQ0o7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUFBLFFBQ0EsYUFBYTtBQUFBLE1BQ2YsQ0FBQztBQUFBO0FBQUEsTUFFRCxXQUFXO0FBQUE7QUFBQSxRQUVULFlBQVksQ0FBQyxPQUFPLElBQUk7QUFBQTtBQUFBLFFBRXhCLFNBQVMsQ0FBQyxVQUFVLGNBQWMsT0FBTztBQUFBLFFBQ3pDLEtBQUs7QUFBQSxNQUNQLENBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BUUQsVUFBVTtBQUFBLE1BQ1Y7QUFBQSxRQUNFO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixVQUFVO0FBQUEsVUFDVixZQUFZO0FBQUEsUUFDZDtBQUFBLE1BQ0Y7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQU9GO0FBQUE7QUFBQSxJQUVBLE1BQU07QUFBQSxNQUNKLFNBQVMsQ0FBQyxtQkFBbUI7QUFBQSxNQUM3QixhQUFhO0FBQUEsTUFDYixNQUFNO0FBQUEsUUFDSixRQUFRLENBQUMsUUFBUSxXQUFXLFVBQVU7QUFBQSxNQUN4QztBQUFBLElBQ0Y7QUFBQSxJQUNBLGVBQWUsQ0FBQyxVQUFVO0FBQUEsSUFDMUIsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBO0FBQUEsUUFFTCxLQUFLLEtBQUssUUFBUSxXQUFXLEtBQUs7QUFBQSxNQUNwQztBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVE7QUFBQTtBQUFBLE1BRU4sT0FBTztBQUFBLElBQ1Q7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQTtBQUFBLE1BRVIsZUFBZTtBQUFBO0FBQUEsUUFFYixPQUFPO0FBQUEsVUFDTCxNQUFNLFFBQVEsV0FBVyxZQUFZO0FBQUEsUUFDdkM7QUFBQSxRQUNBLFFBQVE7QUFBQSxVQUNOLGFBQWEsSUFBSTtBQUNmLGdCQUFJLEdBQUcsU0FBUyxRQUFRO0FBQ3RCLHFCQUFPO0FBQUEsVUFHWDtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
