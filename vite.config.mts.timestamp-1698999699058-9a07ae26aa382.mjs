// vite.config.mts
import path, { resolve } from 'node:path'
import UnoCSS from 'file:///Users/zhangdashu/Desktop/vite/my-project/node_modules/.pnpm/unocss@0.55.3_postcss@8.4.21_vite@4.4.3/node_modules/unocss/dist/vite.mjs'
import AutoImport from 'file:///Users/zhangdashu/Desktop/vite/my-project/node_modules/.pnpm/unplugin-auto-import@0.16.6_@vueuse+core@10.2.1/node_modules/unplugin-auto-import/dist/vite.js'
import Vue from 'file:///Users/zhangdashu/Desktop/vite/my-project/node_modules/.pnpm/@vitejs+plugin-vue@4.2.3_vite@4.4.3_vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs'
import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'file:///Users/zhangdashu/Desktop/vite/my-project/node_modules/.pnpm/vite@4.4.3_@types+node@18.15.11/node_modules/vite/dist/node/index.js'
import { createHtmlPlugin } from 'file:///Users/zhangdashu/Desktop/vite/my-project/node_modules/.pnpm/vite-plugin-html@3.2.0_vite@4.4.3/node_modules/vite-plugin-html/dist/index.mjs'
import mkcert from 'file:///Users/zhangdashu/Desktop/vite/my-project/node_modules/.pnpm/vite-plugin-mkcert@1.16.0_vite@4.4.3/node_modules/vite-plugin-mkcert/dist/mkcert.mjs'
import { visualizer } from 'file:///Users/zhangdashu/Desktop/vite/my-project/node_modules/.pnpm/rollup-plugin-visualizer@5.9.2/node_modules/rollup-plugin-visualizer/dist/plugin/index.js'
import VueRouter from 'file:///Users/zhangdashu/Desktop/vite/my-project/node_modules/.pnpm/unplugin-vue-router@0.6.4_vue-router@4.2.4_vue@3.3.4/node_modules/unplugin-vue-router/dist/vite.mjs'
import Components from 'file:///Users/zhangdashu/Desktop/vite/my-project/node_modules/.pnpm/unplugin-vue-components@0.25.1_vue@3.3.4/node_modules/unplugin-vue-components/dist/vite.mjs'
import VueMacros from 'file:///Users/zhangdashu/Desktop/vite/my-project/node_modules/.pnpm/unplugin-vue-macros@2.3.6_@vueuse+core@10.2.1_vite@4.4.3_vue@3.3.4/node_modules/unplugin-vue-macros/dist/vite.mjs'
import svgLoader from 'file:///Users/zhangdashu/Desktop/vite/my-project/node_modules/.pnpm/vite-svg-loader@4.0.0/node_modules/vite-svg-loader/index.js'

const __vite_injected_original_dirname = '/Users/zhangdashu/Desktop/vite/my-project'
const vite_config_default = defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  console.log('process.env.BASE_ENV', command, env.VITE_APP_TITLE)
  return {
    // 剔除 options_api
    // define: {
    //   __VUE_OPTIONS_API__: false,
    // },
    // base: './',
    plugins: [
      // VitePluginJsonDTS(),
      VueRouter(),
      VueMacros({
        plugins: {
          vue: Vue({
            include: [/\.vue$/, /\.md$/],
          }),
        },
      }),
      // setPreLoadFile(),
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
      ),
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
        '@': path.resolve(__vite_injected_original_dirname, 'src'),
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
          main: resolve(__vite_injected_original_dirname, 'index.html'),
        },
        output: {
          // manualChunks(id) {
          //   if (id.includes('lodash'))
          //     return 'lodash'
          // },
        },
      },
    },
  }
})
export {
  vite_config_default as default,
}
// # sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3poYW5nZGFzaHUvRGVza3RvcC92aXRlL215LXByb2plY3RcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy96aGFuZ2Rhc2h1L0Rlc2t0b3Avdml0ZS9teS1wcm9qZWN0L3ZpdGUuY29uZmlnLm10c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvemhhbmdkYXNodS9EZXNrdG9wL3ZpdGUvbXktcHJvamVjdC92aXRlLmNvbmZpZy5tdHNcIjtpbXBvcnQgcGF0aCwgeyByZXNvbHZlIH0gZnJvbSAnbm9kZTpwYXRoJ1xuaW1wb3J0IFVub0NTUyBmcm9tICd1bm9jc3Mvdml0ZSdcblxuLy8gaW1wb3J0IGFsaWFzIGZyb20gJ0Byb2xsdXAvcGx1Z2luLWFsaWFzJ1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcbmltcG9ydCBWdWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHsgdHlwZSBQbHVnaW5PcHRpb24sIGRlZmluZUNvbmZpZywgbG9hZEVudiwgc3BsaXRWZW5kb3JDaHVua1BsdWdpbiB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgeyBjcmVhdGVIdG1sUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4taHRtbCdcbmltcG9ydCBta2NlcnQgZnJvbSAndml0ZS1wbHVnaW4tbWtjZXJ0J1xuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gJ3JvbGx1cC1wbHVnaW4tdmlzdWFsaXplcidcblxuaW1wb3J0IFZ1ZVJvdXRlciBmcm9tICd1bnBsdWdpbi12dWUtcm91dGVyL3ZpdGUnXG5cbi8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NVx1N0VDNFx1NEVGNlxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcblxuLy8gaW1wb3J0IHZpdGVQbHVnaW5TZW1hbnRpY0NodW5rcyBmcm9tICd2aXRlLXBsdWdpbi1zZW1hbnRpYy1jaHVua3MnO1xuXG5pbXBvcnQgVnVlTWFjcm9zIGZyb20gJ3VucGx1Z2luLXZ1ZS1tYWNyb3Mvdml0ZSdcbmltcG9ydCBzdmdMb2FkZXIgZnJvbSAndml0ZS1zdmctbG9hZGVyJ1xuXG4vLyBpbXBvcnQgeyBWaXRlUGx1Z2luSnNvbkRUUyB9IGZyb20gJy4vc3JjL3BsdWdpbi92aXRlLXBsdWdpbi1qc29uJ1xuXG4vLyBpbXBvcnQgeyBzZXRQcmVMb2FkRmlsZSB9IGZyb20gJy4vc3JjL3BsdWdpbi92aXRlLXBsdWdpbi1wcmVsb2FkJ1xuXG4vLyAvLyBcdTY4MzlcdTYzNkUgTk9ERV9FTlYgXHU1MkEwXHU4RjdEIC5lbnYgXHU2NTg3XHU0RUY2XG4vLyBjb25zdCBlbnZGaWxlID0gYC5lbnYuJHtwcm9jZXNzLmVudi5OT0RFX0VOVn1gO1xuLy8gaWYgKGZzLmV4aXN0c1N5bmMocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgZW52RmlsZSkpKSB7XG4vLyAgIGNvbmZpZyh7IHBhdGg6IGVudkZpbGUgfSk7XG4vLyB9IGVsc2Uge1xuLy8gICBjb25zb2xlLmxvZyhgLmVudiBmaWxlIGZvciAke3Byb2Nlc3MuZW52Lk5PREVfRU5WfSBkb2VzIG5vdCBleGlzdGApO1xuLy8gfVxuXG4vLyBcdTRGNjBcdTczQjBcdTU3MjhcdTUzRUZcdTRFRTVcdTkwMUFcdThGQzcgcHJvY2Vzcy5lbnYgXHU4QkJGXHU5NUVFXHU1MjMwXHU3M0FGXHU1ODgzXHU1M0Q4XHU5MUNGXG4vLyBjb25zb2xlLmxvZyhwcm9jZXNzLmVudi5WSVRFX0FQUF9USVRMRSk7XG5cbi8vIGNvbnN0IF9fZmlsZW5hbWUgPSBmaWxlVVJMVG9QYXRoKGltcG9ydC5tZXRhLnVybClcbi8vIGNvbnNvbGUubG9nKCdfX2ZpbGVuYW1lJywgX19maWxlbmFtZSkgLy8gXHU4RjkzXHU1MUZBXHVGRjFBL3BhdGgvdG8vY3VycmVudC9maWxlLm1qc1xuXG4vLyBjb25zdCBfX2Rpcm5hbWUgPSBkaXJuYW1lKGZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKSlcbi8vIGNvbnNvbGUubG9nKCdfX2Rpcm5hbWUnLCBfX2Rpcm5hbWUpIC8vIFx1OEY5M1x1NTFGQVx1RkYxQS9wYXRoL3RvL2N1cnJlbnQvZmlsZVxuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnLyBfY29tbWFuZCwgbW9kZVxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IGNvbW1hbmQsIG1vZGUgfSkgPT4ge1xuICAvLyBcdTY4MzlcdTYzNkVcdTVGNTNcdTUyNERcdTVERTVcdTRGNUNcdTc2RUVcdTVGNTVcdTRFMkRcdTc2ODQgYG1vZGVgIFx1NTJBMFx1OEY3RCAuZW52IFx1NjU4N1x1NEVGNlxuICAvLyBcdThCQkVcdTdGNkVcdTdCMkNcdTRFMDlcdTRFMkFcdTUzQzJcdTY1NzBcdTRFM0EgJycgXHU2NzY1XHU1MkEwXHU4RjdEXHU2MjQwXHU2NzA5XHU3M0FGXHU1ODgzXHU1M0Q4XHU5MUNGXHVGRjBDXHU4MDBDXHU0RTBEXHU3QkExXHU2NjJGXHU1NDI2XHU2NzA5IGBWSVRFX2AgXHU1MjREXHU3RjAwXHUzMDAyXG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSwgJycpXG5cbiAgY29uc29sZS5sb2coJ3Byb2Nlc3MuZW52LkJBU0VfRU5WJywgY29tbWFuZCwgZW52LlZJVEVfQVBQX1RJVExFKVxuXG4gIHJldHVybiB7XG4gICAgLy8gXHU1MjU0XHU5NjY0IG9wdGlvbnNfYXBpXG4gICAgLy8gZGVmaW5lOiB7XG4gICAgLy8gICBfX1ZVRV9PUFRJT05TX0FQSV9fOiBmYWxzZSxcbiAgICAvLyB9LFxuICAgIC8vIGJhc2U6ICcuLycsXG4gICAgcGx1Z2luczogW1xuICAgICAgLy8gVml0ZVBsdWdpbkpzb25EVFMoKSxcbiAgICAgIFZ1ZVJvdXRlcigpLFxuICAgICAgVnVlTWFjcm9zKHtcbiAgICAgICAgcGx1Z2luczoge1xuICAgICAgICAgIHZ1ZTogVnVlKHtcbiAgICAgICAgICAgIGluY2x1ZGU6IFsvXFwudnVlJC8sIC9cXC5tZCQvXSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgICAgLy8gc2V0UHJlTG9hZEZpbGUoKSxcbiAgICAgIFVub0NTUygpLFxuICAgICAgc3BsaXRWZW5kb3JDaHVua1BsdWdpbigpLFxuICAgICAgLy8gVnVlRGV2VG9vbHMoKSxcbiAgICAgIC8vIGJhc2ljU3NsKCksXG4gICAgICBta2NlcnQoKSxcbiAgICAgIC8vIHZpdGVQbHVnaW5TZW1hbnRpY0NodW5rcygpLFxuICAgICAgLy8gYWxpYXMoe1xuICAgICAgLy8gICBlbnRyaWVzOiBbXG4gICAgICAvLyAgICAgeyBmaW5kOiAnQCcsIHJlcGxhY2VtZW50OiAnc3JjJyB9LFxuICAgICAgLy8gICBdLFxuICAgICAgLy8gfSksXG4gICAgICBjcmVhdGVIdG1sUGx1Z2luKHtcbiAgICAgICAgaW5qZWN0OiB7XG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgdGl0bGU6IGVudi5WSVRFX0FQUF9USVRMRSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvdW5wbHVnaW4tYXV0by1pbXBvcnRcbiAgICAgIEF1dG9JbXBvcnQoe1xuICAgICAgICBpbXBvcnRzOiBbXG4gICAgICAgICAgJ3Z1ZScsXG4gICAgICAgICAgJ3Z1ZS1yb3V0ZXInLFxuICAgICAgICAgICd2dWUtaTE4bicsXG4gICAgICAgICAgJ0B2dWV1c2UvaGVhZCcsXG4gICAgICAgICAgJ0B2dWV1c2UvY29yZScsXG4gICAgICAgIF0sXG4gICAgICAgIGR0czogJ3NyYy9hdXRvLWltcG9ydHMuZC50cycsXG4gICAgICAgIGRpcnM6IFtcbiAgICAgICAgICAnc3JjL2NvbXBvc2FibGVzJyxcbiAgICAgICAgICAnc3JjL3N0b3JlcycsXG4gICAgICAgIF0sXG4gICAgICAgIHZ1ZVRlbXBsYXRlOiB0cnVlLFxuICAgICAgfSksXG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvdW5wbHVnaW4tdnVlLWNvbXBvbmVudHNcbiAgICAgIENvbXBvbmVudHMoe1xuICAgICAgLy8gYWxsb3cgYXV0byBsb2FkIG1hcmtkb3duIGNvbXBvbmVudHMgdW5kZXIgYC4vc3JjL2NvbXBvbmVudHMvYFxuICAgICAgICBleHRlbnNpb25zOiBbJ3Z1ZScsICdtZCddLFxuICAgICAgICAvLyBhbGxvdyBhdXRvIGltcG9ydCBhbmQgcmVnaXN0ZXIgY29tcG9uZW50cyB1c2VkIGluIG1hcmtkb3duXG4gICAgICAgIGluY2x1ZGU6IFsvXFwudnVlJC8sIC9cXC52dWVcXD92dWUvLCAvXFwubWQkL10sXG4gICAgICAgIGR0czogJ3NyYy9jb21wb25lbnRzLmQudHMnLFxuICAgICAgfSksXG4gICAgICAvLyBcdThCQkVcdTdGNkVcdTk4ODRcdTUyQTBcdThGN0RcdTY1ODdcdTRFRjZcdUZGMENcdTYzRDBcdTUzNDdcdTk4NzVcdTk3NjJcdTk5OTZcdTZCMjFcdTUyQTBcdThGN0RcdTkwMUZcdTVFQTZcdUZGMDhcdTRFQzVcdTVGMDBcdTUzRDFcdTczQUZcdTU4ODNcdTk3MDBcdTg5ODFcdUZGMDlcbiAgICAgIC8vIG1vZGUgPT09ICdkZXZlbG9wbWVudCcgJiYgc2V0UHJlTG9hZEZpbGUoe1xuICAgICAgLy8gICBwYXRoTGlzdDogWyAvLyBcdTk3MDBcdTg5ODFcdTYzRDBcdTUyNERcdTUyQTBcdThGN0RcdTc2ODRcdThENDRcdTZFOTBcdTc2RUVcdTVGNTVcbiAgICAgIC8vICAgICAnLi9zcmMvY29tcG9uZW50cy8nLFxuICAgICAgLy8gICBdLFxuICAgICAgLy8gICBwcmVGaXg6ICdodHRwczovLzEyNy4wLjAuMTo1MTczJywgLy8gXHU5ODc5XHU3NkVFXHU2ODM5XHU4REVGXHU1Rjg0XG4gICAgICAvLyB9KSxcbiAgICAgIHN2Z0xvYWRlcigpLFxuICAgICAgdmlzdWFsaXplcihcbiAgICAgICAge1xuICAgICAgICAgIG9wZW46IGZhbHNlLFxuICAgICAgICAgIGd6aXBTaXplOiB0cnVlLFxuICAgICAgICAgIGJyb3RsaVNpemU6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICApIGFzIFBsdWdpbk9wdGlvbixcbiAgICAgIC8vIEJ1aWxkSW5mbyh7IG1ldGE6IHsgbWVzc2FnZTogJ1RoaXMgaXMgc2V0IGZyb20gdml0ZS5jb25maWcudHMnIH0gfSlcbiAgICBdLFxuICAgIC8vIFx1NjUzRVx1NTcyOFx1NTkxNlx1OTc2Mlx1OTcwMFx1ODk4MVx1OTE0RFx1N0Y2RVZ1ZSBwbHVnaW5zXG4gICAgdGVzdDoge1xuICAgICAgaW5jbHVkZTogWyd0ZXN0LyoqLyoudGVzdC50cyddLFxuICAgICAgZW52aXJvbm1lbnQ6ICdqc2RvbScsXG4gICAgICBkZXBzOiB7XG4gICAgICAgIGlubGluZTogWydAdnVlJywgJ0B2dWV1c2UnLCAndnVlLWRlbWknXSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBhc3NldHNJbmNsdWRlOiBbJyoqLyoudHRmJ10sXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgLy8gXHU1QzA2IGBAYCBcdTg5RTNcdTY3OTBcdTRFM0EgYC9zcmNgIFx1NzZFRVx1NUY1NVxuICAgICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIC8vIG9wZW46IHRydWUsXG4gICAgICBodHRwczogdHJ1ZSxcbiAgICB9LFxuICAgIGJ1aWxkOiB7XG4gICAgICB0YXJnZXQ6ICdlczIwMTUnLFxuICAgICAgLy8gXHU1QzA2IHJvbGx1cElucHV0T3B0aW9ucyBcdTY1MzlcdTRFM0Egcm9sbHVwT3B0aW9uc1xuICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICAvLyBcdTUxNjVcdTUzRTNcbiAgICAgICAgaW5wdXQ6IHtcbiAgICAgICAgICBtYWluOiByZXNvbHZlKF9fZGlybmFtZSwgJ2luZGV4Lmh0bWwnKSxcbiAgICAgICAgfSxcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgLy8gbWFudWFsQ2h1bmtzKGlkKSB7XG4gICAgICAgICAgLy8gICBpZiAoaWQuaW5jbHVkZXMoJ2xvZGFzaCcpKVxuICAgICAgICAgIC8vICAgICByZXR1cm4gJ2xvZGFzaCdcbiAgICAgICAgICAvLyB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUErUyxPQUFPLFFBQVEsZUFBZTtBQUM3VSxPQUFPLFlBQVk7QUFHbkIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxTQUFTO0FBQ2hCLFNBQTRCLGNBQWMsU0FBUyw4QkFBOEI7QUFDakYsU0FBUyx3QkFBd0I7QUFDakMsT0FBTyxZQUFZO0FBQ25CLFNBQVMsa0JBQWtCO0FBRTNCLE9BQU8sZUFBZTtBQUd0QixPQUFPLGdCQUFnQjtBQUl2QixPQUFPLGVBQWU7QUFDdEIsT0FBTyxlQUFlO0FBbkJ0QixJQUFNLG1DQUFtQztBQTJDekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxTQUFTLEtBQUssTUFBTTtBQUdqRCxRQUFNLE1BQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxHQUFHLEVBQUU7QUFFM0MsVUFBUSxJQUFJLHdCQUF3QixTQUFTLElBQUksY0FBYztBQUUvRCxTQUFPO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBTUwsU0FBUztBQUFBO0FBQUEsTUFFUCxVQUFVO0FBQUEsTUFDVixVQUFVO0FBQUEsUUFDUixTQUFTO0FBQUEsVUFDUCxLQUFLLElBQUk7QUFBQSxZQUNQLFNBQVMsQ0FBQyxVQUFVLE9BQU87QUFBQSxVQUM3QixDQUFDO0FBQUEsUUFDSDtBQUFBLE1BQ0YsQ0FBQztBQUFBO0FBQUEsTUFFRCxPQUFPO0FBQUEsTUFDUCx1QkFBdUI7QUFBQTtBQUFBO0FBQUEsTUFHdkIsT0FBTztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BT1AsaUJBQWlCO0FBQUEsUUFDZixRQUFRO0FBQUEsVUFDTixNQUFNO0FBQUEsWUFDSixPQUFPLElBQUk7QUFBQSxVQUNiO0FBQUEsUUFDRjtBQUFBLE1BQ0YsQ0FBQztBQUFBO0FBQUEsTUFFRCxXQUFXO0FBQUEsUUFDVCxTQUFTO0FBQUEsVUFDUDtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsUUFDQSxLQUFLO0FBQUEsUUFDTCxNQUFNO0FBQUEsVUFDSjtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsUUFDQSxhQUFhO0FBQUEsTUFDZixDQUFDO0FBQUE7QUFBQSxNQUVELFdBQVc7QUFBQTtBQUFBLFFBRVQsWUFBWSxDQUFDLE9BQU8sSUFBSTtBQUFBO0FBQUEsUUFFeEIsU0FBUyxDQUFDLFVBQVUsY0FBYyxPQUFPO0FBQUEsUUFDekMsS0FBSztBQUFBLE1BQ1AsQ0FBQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFRRCxVQUFVO0FBQUEsTUFDVjtBQUFBLFFBQ0U7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLFVBQVU7QUFBQSxVQUNWLFlBQVk7QUFBQSxRQUNkO0FBQUEsTUFDRjtBQUFBO0FBQUEsSUFFRjtBQUFBO0FBQUEsSUFFQSxNQUFNO0FBQUEsTUFDSixTQUFTLENBQUMsbUJBQW1CO0FBQUEsTUFDN0IsYUFBYTtBQUFBLE1BQ2IsTUFBTTtBQUFBLFFBQ0osUUFBUSxDQUFDLFFBQVEsV0FBVyxVQUFVO0FBQUEsTUFDeEM7QUFBQSxJQUNGO0FBQUEsSUFDQSxlQUFlLENBQUMsVUFBVTtBQUFBLElBQzFCLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQTtBQUFBLFFBRUwsS0FBSyxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBLE1BQ3BDO0FBQUEsSUFDRjtBQUFBLElBQ0EsUUFBUTtBQUFBO0FBQUEsTUFFTixPQUFPO0FBQUEsSUFDVDtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBO0FBQUEsTUFFUixlQUFlO0FBQUE7QUFBQSxRQUViLE9BQU87QUFBQSxVQUNMLE1BQU0sUUFBUSxrQ0FBVyxZQUFZO0FBQUEsUUFDdkM7QUFBQSxRQUNBLFFBQVE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBS1I7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
