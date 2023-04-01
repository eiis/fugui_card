/*
 * @Author: zhangdi 1258956799@qq.com
 * @Date: 2023-04-01 22:08:38
 * @LastEditors: zhangdi 1258956799@qq.com
 * @LastEditTime: 2023-04-01 23:21:57
 * @FilePath: /my-project/vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // 将 `@` 解析为 `/src` 目录
      '@': path.resolve(__dirname, 'src')
    }
  }
})
