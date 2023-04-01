/*
 * @Author: zhangdi 1258956799@qq.com
 * @Date: 2023-04-01 22:08:38
 * @LastEditors: zhangdi 1258956799@qq.com
 * @LastEditTime: 2023-04-01 23:46:07
 * @FilePath: /my-project/vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

import commitizen from 'commitizen';
import czEmoji from 'cz-emoji';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // 将 `@` 解析为 `/src` 目录
      '@': path.resolve(__dirname, 'src')
    }
  },
  build: {
    target: 'es2015',
    // 将 rollupInputOptions 改为 rollupOptions
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/main.js'),
        vendor: path.resolve(__dirname, 'src/vendor.js')
      },
      plugins: [
        // 添加 commitizen 适配器
        commitizen({
          path: czEmoji
        })
      ]
    }
  }
})
