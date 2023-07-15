// vite.config.ts
import alias from "file:///Users/zhangdashu/Desktop/vite/my-project/node_modules/.pnpm/registry.npmmirror.com+@rollup+plugin-alias@5.0.0/node_modules/@rollup/plugin-alias/dist/es/index.js";
import path from "path";
import AutoImport from "file:///Users/zhangdashu/Desktop/vite/my-project/node_modules/.pnpm/unplugin-auto-import@0.16.6_@vueuse+core@10.2.1/node_modules/unplugin-auto-import/dist/vite.js";
import { defineConfig, loadEnv, splitVendorChunkPlugin } from "file:///Users/zhangdashu/Desktop/vite/my-project/node_modules/.pnpm/registry.npmmirror.com+vite@4.3.9_@types+node@18.16.18/node_modules/vite/dist/node/index.js";
import { createHtmlPlugin } from "file:///Users/zhangdashu/Desktop/vite/my-project/node_modules/.pnpm/vite-plugin-html@3.2.0_vite@4.3.9/node_modules/vite-plugin-html/dist/index.mjs";
import mkcert from "file:///Users/zhangdashu/Desktop/vite/my-project/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-mkcert@1.16.0_vite@4.3.9/node_modules/vite-plugin-mkcert/dist/mkcert.mjs";
import vue from "file:///Users/zhangdashu/Desktop/vite/my-project/node_modules/.pnpm/registry.npmmirror.com+@vitejs+plugin-vue@4.2.3_vite@4.3.9_vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs";

// src/plugin/vite-plugin-preload.ts
import * as fs from "fs";
function getFiles(e) {
  const arr = [];
  const dirents = fs.readdirSync(e, { withFileTypes: true });
  for (const dirent of dirents) {
    if (dirent.isDirectory())
      arr.push(...getFiles(e + dirent.name + "/"));
    else {
      arr.push(e + dirent.name);
    }
  }
  return arr;
}
var setPreLoadFile = (options = { pathList: [], preFix: "" }) => {
  if (options.pathList && options.pathList.length) {
    let res = [];
    options.pathList.forEach((path2) => {
      res = res.concat(getFiles(path2));
    });
    let linkStr = "";
    res.forEach((item) => {
      const type = item.split(".").pop();
      const as = type === "js" ? "script" : type === "css" ? "style" : "fetch";
      linkStr += `<link rel="preload" href="${options.preFix + item.substring(1)}" as="${as}">
`;
    });
    return {
      name: "preload-file",
      transformIndexHtml(dom) {
        return dom.replace("</head>", `${linkStr}</head>`);
      }
    };
  }
};

// vite.config.ts
var __vite_injected_original_dirname = "/Users/zhangdashu/Desktop/vite/my-project";
var vite_config_default = defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    // base: './',
    plugins: [
      vue(),
      splitVendorChunkPlugin(),
      // VueDevTools(),
      // basicSsl(),
      mkcert(),
      // vitePluginSemanticChunks(),
      alias({
        entries: [
          { find: "@", replacement: "/src" }
        ]
      }),
      createHtmlPlugin({
        inject: {
          data: {
            title: env.VITE_APP_TITLE
          }
        }
      }),
      AutoImport({
        imports: ["vue", "@vueuse/core"],
        vueTemplate: true
        // cache: true,
      }),
      // 设置预加载文件，提升页面首次加载速度（仅开发环境需要）
      mode === "development" && setPreLoadFile({
        pathList: [
          // 需要提前加载的资源目录
          "./src/components/"
        ],
        preFix: "https://127.0.0.1:5173"
        // 项目根路径
      })
      // VueMacros({
      //   plugins: {
      //     vue: Vue(),
      //   },
      // }),
      // BuildInfo({ meta: { message: 'This is set from vite.config.ts' } })
    ],
    assetsInclude: ["**/*.ttf"],
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
      target: "es2015",
      // 将 rollupInputOptions 改为 rollupOptions
      rollupOptions: {
        input: {
          main: path.resolve(__vite_injected_original_dirname, "index.html")
          // vendor: path.resolve(__dirname, 'src/vendor.js')
        },
        output: {
          manualChunks: {},
          assetFileNames: (assetInfo) => {
            console.log("assetInfo", assetInfo.name);
            if (assetInfo.name.endsWith(".jpeg") || assetInfo.name.endsWith(".png") || assetInfo.name.endsWith(".jpg")) {
              return "images/[name][extname]";
            } else if (assetInfo.name.endsWith(".ttf") || assetInfo.name.endsWith(".woff") || assetInfo.name.endsWith(".woff2") || assetInfo.name.endsWith(".ttf") || assetInfo.name.endsWith(".eot")) {
              return "font/[name][extname]";
            } else if (assetInfo.name.endsWith(".svg")) {
              return "svg/[name][extname]";
            } else if (assetInfo.name.endsWith(".css")) {
              return "css/[name][extname]";
            } else {
              return "[name][extname]";
            }
          }
        }
      }
      // sourcemap: true
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic3JjL3BsdWdpbi92aXRlLXBsdWdpbi1wcmVsb2FkLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3poYW5nZGFzaHUvRGVza3RvcC92aXRlL215LXByb2plY3RcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy96aGFuZ2Rhc2h1L0Rlc2t0b3Avdml0ZS9teS1wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy96aGFuZ2Rhc2h1L0Rlc2t0b3Avdml0ZS9teS1wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IGFsaWFzIGZyb20gJ0Byb2xsdXAvcGx1Z2luLWFsaWFzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYsIHNwbGl0VmVuZG9yQ2h1bmtQbHVnaW4gfSBmcm9tICd2aXRlJztcbmltcG9ydCB7IGNyZWF0ZUh0bWxQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1odG1sJztcbmltcG9ydCBta2NlcnQgZnJvbSAndml0ZS1wbHVnaW4tbWtjZXJ0Jztcbi8vIGltcG9ydCB2aXRlUGx1Z2luU2VtYW50aWNDaHVua3MgZnJvbSAndml0ZS1wbHVnaW4tc2VtYW50aWMtY2h1bmtzJztcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcbi8vIGltcG9ydCBWdWVNYWNyb3MgZnJvbSAndW5wbHVnaW4tdnVlLW1hY3Jvcy92aXRlJztcbmltcG9ydCB7IHNldFByZUxvYWRGaWxlIH0gZnJvbSAnLi9zcmMvcGx1Z2luL3ZpdGUtcGx1Z2luLXByZWxvYWQnO1xuLy8gLy8gXHU2ODM5XHU2MzZFIE5PREVfRU5WIFx1NTJBMFx1OEY3RCAuZW52IFx1NjU4N1x1NEVGNlxuLy8gY29uc3QgZW52RmlsZSA9IGAuZW52LiR7cHJvY2Vzcy5lbnYuTk9ERV9FTlZ9YDtcbi8vIGlmIChmcy5leGlzdHNTeW5jKHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIGVudkZpbGUpKSkge1xuLy8gICBjb25maWcoeyBwYXRoOiBlbnZGaWxlIH0pO1xuLy8gfSBlbHNlIHtcbi8vICAgY29uc29sZS5sb2coYC5lbnYgZmlsZSBmb3IgJHtwcm9jZXNzLmVudi5OT0RFX0VOVn0gZG9lcyBub3QgZXhpc3RgKTtcbi8vIH1cblxuLy8gXHU0RjYwXHU3M0IwXHU1NzI4XHU1M0VGXHU0RUU1XHU5MDFBXHU4RkM3IHByb2Nlc3MuZW52IFx1OEJCRlx1OTVFRVx1NTIzMFx1NzNBRlx1NTg4M1x1NTNEOFx1OTFDRlxuLy8gY29uc29sZS5sb2cocHJvY2Vzcy5lbnYuVklURV9BUFBfVElUTEUpO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IGNvbW1hbmQsIG1vZGUgfSkgPT4ge1xuICAvLyBcdTY4MzlcdTYzNkVcdTVGNTNcdTUyNERcdTVERTVcdTRGNUNcdTc2RUVcdTVGNTVcdTRFMkRcdTc2ODQgYG1vZGVgIFx1NTJBMFx1OEY3RCAuZW52IFx1NjU4N1x1NEVGNlxuICAvLyBcdThCQkVcdTdGNkVcdTdCMkNcdTRFMDlcdTRFMkFcdTUzQzJcdTY1NzBcdTRFM0EgJycgXHU2NzY1XHU1MkEwXHU4RjdEXHU2MjQwXHU2NzA5XHU3M0FGXHU1ODgzXHU1M0Q4XHU5MUNGXHVGRjBDXHU4MDBDXHU0RTBEXHU3QkExXHU2NjJGXHU1NDI2XHU2NzA5IGBWSVRFX2AgXHU1MjREXHU3RjAwXHUzMDAyXG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSwgJycpXG5cblxuICAvLyBjb25zb2xlLmxvZygncHJvY2Vzcy5lbnYuQkFTRV9FTlYnLCBwcm9jZXNzLmVudilcblxuICByZXR1cm4ge1xuICAgIC8vIGJhc2U6ICcuLycsXG4gICAgcGx1Z2luczogW1xuICAgICAgdnVlKCksXG4gICAgICBzcGxpdFZlbmRvckNodW5rUGx1Z2luKCksXG4gICAgICAvLyBWdWVEZXZUb29scygpLFxuICAgICAgLy8gYmFzaWNTc2woKSxcbiAgICAgIG1rY2VydCgpLFxuICAgICAgLy8gdml0ZVBsdWdpblNlbWFudGljQ2h1bmtzKCksXG4gICAgICBhbGlhcyh7XG4gICAgICAgIGVudHJpZXM6IFtcbiAgICAgICAgICB7IGZpbmQ6ICdAJywgcmVwbGFjZW1lbnQ6ICcvc3JjJyB9LFxuICAgICAgICBdXG4gICAgICB9KSxcbiAgICAgIGNyZWF0ZUh0bWxQbHVnaW4oe1xuICAgICAgICBpbmplY3Q6IHtcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICB0aXRsZTogZW52LlZJVEVfQVBQX1RJVExFLFxuICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgQXV0b0ltcG9ydCh7XG4gICAgICAgIGltcG9ydHM6IFsndnVlJywgJ0B2dWV1c2UvY29yZSddLFxuICAgICAgICB2dWVUZW1wbGF0ZTogdHJ1ZSxcbiAgICAgICAgLy8gY2FjaGU6IHRydWUsXG4gICAgICB9KSxcbiAgICAgIC8vIFx1OEJCRVx1N0Y2RVx1OTg4NFx1NTJBMFx1OEY3RFx1NjU4N1x1NEVGNlx1RkYwQ1x1NjNEMFx1NTM0N1x1OTg3NVx1OTc2Mlx1OTk5Nlx1NkIyMVx1NTJBMFx1OEY3RFx1OTAxRlx1NUVBNlx1RkYwOFx1NEVDNVx1NUYwMFx1NTNEMVx1NzNBRlx1NTg4M1x1OTcwMFx1ODk4MVx1RkYwOVxuICAgICAgbW9kZSA9PT0gJ2RldmVsb3BtZW50JyAmJiBzZXRQcmVMb2FkRmlsZSh7XG4gICAgICAgIHBhdGhMaXN0OiBbIC8vIFx1OTcwMFx1ODk4MVx1NjNEMFx1NTI0RFx1NTJBMFx1OEY3RFx1NzY4NFx1OEQ0NFx1NkU5MFx1NzZFRVx1NUY1NVxuICAgICAgICAgICcuL3NyYy9jb21wb25lbnRzLydcbiAgICAgICAgXSxcbiAgICAgICAgcHJlRml4OiAnaHR0cHM6Ly8xMjcuMC4wLjE6NTE3MycgLy8gXHU5ODc5XHU3NkVFXHU2ODM5XHU4REVGXHU1Rjg0XG4gICAgICB9KSxcbiAgICAgIC8vIFZ1ZU1hY3Jvcyh7XG4gICAgICAvLyAgIHBsdWdpbnM6IHtcbiAgICAgIC8vICAgICB2dWU6IFZ1ZSgpLFxuICAgICAgLy8gICB9LFxuICAgICAgLy8gfSksXG4gICAgICAvLyBCdWlsZEluZm8oeyBtZXRhOiB7IG1lc3NhZ2U6ICdUaGlzIGlzIHNldCBmcm9tIHZpdGUuY29uZmlnLnRzJyB9IH0pXG4gICAgXSxcbiAgICBhc3NldHNJbmNsdWRlOiBbJyoqLyoudHRmJ10sXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgLy8gXHU1QzA2IGBAYCBcdTg5RTNcdTY3OTBcdTRFM0EgYC9zcmNgIFx1NzZFRVx1NUY1NVxuICAgICAgICAvLyAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKVxuICAgICAgfVxuICAgIH0sXG4gICAgc2VydmVyOiB7XG4gICAgICAvLyBvcGVuOiB0cnVlLFxuICAgICAgaHR0cHM6IHRydWVcbiAgICB9LFxuICAgIGJ1aWxkOiB7XG4gICAgICB0YXJnZXQ6ICdlczIwMTUnLFxuICAgICAgLy8gXHU1QzA2IHJvbGx1cElucHV0T3B0aW9ucyBcdTY1MzlcdTRFM0Egcm9sbHVwT3B0aW9uc1xuICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICBpbnB1dDoge1xuICAgICAgICAgIG1haW46IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdpbmRleC5odG1sJyksXG4gICAgICAgICAgLy8gdmVuZG9yOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3ZlbmRvci5qcycpXG4gICAgICAgIH0sXG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgIG1hbnVhbENodW5rczoge1xuICAgICAgICAgIH0sXG4gICAgICAgICAgYXNzZXRGaWxlTmFtZXM6IChhc3NldEluZm8pID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhc3NldEluZm8nLCBhc3NldEluZm8ubmFtZSlcbiAgICAgICAgICAgIGlmIChhc3NldEluZm8ubmFtZS5lbmRzV2l0aCgnLmpwZWcnKSB8fCBhc3NldEluZm8ubmFtZS5lbmRzV2l0aCgnLnBuZycpIHx8IGFzc2V0SW5mby5uYW1lLmVuZHNXaXRoKCcuanBnJykpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICdpbWFnZXMvW25hbWVdW2V4dG5hbWVdJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGFzc2V0SW5mby5uYW1lLmVuZHNXaXRoKCcudHRmJykgfHwgYXNzZXRJbmZvLm5hbWUuZW5kc1dpdGgoJy53b2ZmJykgfHwgYXNzZXRJbmZvLm5hbWUuZW5kc1dpdGgoJy53b2ZmMicpIHx8IGFzc2V0SW5mby5uYW1lLmVuZHNXaXRoKCcudHRmJykgfHwgYXNzZXRJbmZvLm5hbWUuZW5kc1dpdGgoJy5lb3QnKSkge1xuICAgICAgICAgICAgICByZXR1cm4gJ2ZvbnQvW25hbWVdW2V4dG5hbWVdJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGFzc2V0SW5mby5uYW1lLmVuZHNXaXRoKCcuc3ZnJykpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICdzdmcvW25hbWVdW2V4dG5hbWVdJztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYXNzZXRJbmZvLm5hbWUuZW5kc1dpdGgoJy5jc3MnKSkge1xuICAgICAgICAgICAgICByZXR1cm4gJ2Nzcy9bbmFtZV1bZXh0bmFtZV0nO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuICdbbmFtZV1bZXh0bmFtZV0nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICAvLyBzb3VyY2VtYXA6IHRydWVcbiAgICB9XG4gIH1cbn0pXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy96aGFuZ2Rhc2h1L0Rlc2t0b3Avdml0ZS9teS1wcm9qZWN0L3NyYy9wbHVnaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy96aGFuZ2Rhc2h1L0Rlc2t0b3Avdml0ZS9teS1wcm9qZWN0L3NyYy9wbHVnaW4vdml0ZS1wbHVnaW4tcHJlbG9hZC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvemhhbmdkYXNodS9EZXNrdG9wL3ZpdGUvbXktcHJvamVjdC9zcmMvcGx1Z2luL3ZpdGUtcGx1Z2luLXByZWxvYWQudHNcIjtpbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XG5cbi8vIFx1NjdFNVx1NjI3RVx1NjU4N1x1NEVGNlxuZnVuY3Rpb24gZ2V0RmlsZXMoZTogc3RyaW5nKSB7XG4gIGNvbnN0IGFycjogc3RyaW5nW10gPSBbXVxuICBjb25zdCBkaXJlbnRzID0gZnMucmVhZGRpclN5bmMoZSwgeyB3aXRoRmlsZVR5cGVzOiB0cnVlIH0pXG4gIGZvciAoY29uc3QgZGlyZW50IG9mIGRpcmVudHMpIHtcbiAgICBpZiAoZGlyZW50LmlzRGlyZWN0b3J5KCkpIGFyci5wdXNoKC4uLmdldEZpbGVzKGUgKyBkaXJlbnQubmFtZSArICcvJykpXG4gICAgZWxzZSB7XG4gICAgICBhcnIucHVzaChlICsgZGlyZW50Lm5hbWUpXG4gICAgfVxuICB9XG4gIC8vIGNvbnNvbGUubG9nKCdhcnInLCBhcnIpXG4gIHJldHVybiBhcnJcbn1cblxuLy8gXHU2M0QyXHU1MTY1XHU5ODg0XHU1MkEwXHU4RjdEXHU2NTg3XHU0RUY2XHU2ODA3XHU3QjdFXG5leHBvcnQgY29uc3Qgc2V0UHJlTG9hZEZpbGUgPSAob3B0aW9uczogeyBwYXRoTGlzdDogc3RyaW5nW10sIHByZUZpeDogc3RyaW5nIH0gPSB7IHBhdGhMaXN0OiBbXSwgcHJlRml4OiAnJyB9KSA9PiB7XG4gIGlmIChvcHRpb25zLnBhdGhMaXN0ICYmIG9wdGlvbnMucGF0aExpc3QubGVuZ3RoKSB7XG4gICAgbGV0IHJlczogc3RyaW5nW10gPSBbXVxuICAgIG9wdGlvbnMucGF0aExpc3QuZm9yRWFjaChwYXRoID0+IHtcbiAgICAgIHJlcyA9IHJlcy5jb25jYXQoZ2V0RmlsZXMocGF0aCkpXG4gICAgfSlcbiAgICBsZXQgbGlua1N0ciA9ICcnXG4gICAgcmVzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAvLyBcdTY4MzlcdTYzNkVcdTY1ODdcdTRFRjZcdTU0MEVcdTdGMDBcdTU0MERcdTUyMjRcdTY1QURcdThENDRcdTZFOTBcdTdDN0JcdTU3OEJcbiAgICAgIGNvbnN0IHR5cGUgPSBpdGVtLnNwbGl0KCcuJykucG9wKCk7XG4gICAgICBjb25zdCBhcyA9IHR5cGUgPT09ICdqcycgPyAnc2NyaXB0JyA6IHR5cGUgPT09ICdjc3MnID8gJ3N0eWxlJyA6ICdmZXRjaCc7XG4gICAgICBsaW5rU3RyICs9IGA8bGluayByZWw9XCJwcmVsb2FkXCIgaHJlZj1cIiR7b3B0aW9ucy5wcmVGaXggKyBpdGVtLnN1YnN0cmluZygxKX1cIiBhcz1cIiR7YXN9XCI+XFxuYFxuICAgIH0pXG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6ICdwcmVsb2FkLWZpbGUnLFxuICAgICAgdHJhbnNmb3JtSW5kZXhIdG1sKGRvbTogYW55KSB7XG4gICAgICAgIHJldHVybiBkb20ucmVwbGFjZSgnPC9oZWFkPicsIGAke2xpbmtTdHJ9PC9oZWFkPmApXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTZTLE9BQU8sV0FBVztBQUMvVCxPQUFPLFVBQVU7QUFDakIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUyxjQUFjLFNBQVMs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
