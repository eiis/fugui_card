import { existsSync, promises as fs } from 'node:fs'

// import type { Plugin } from 'vite'

const fileRegex = /\.json$/
const encoding = 'utf-8'

async function getExisting(fileName: string) {
  return existsSync(fileName)
    ? await fs.readFile(fileName, encoding)
    : ''
}

function replaceJsonRegularString(code: string) {
  return `declare const json: ${code}
export default json;`
}

function replaceJsonModuleString(code: string) {
  const [beforeExport, afterExport] = code.split('export default', 2)
  const beforeExportReplaced = beforeExport!.replace(/=/g, ':')
  const afterExportReplaced = beforeExport
    ? afterExport!.replace(/:( *[A-Z|a-z|$]+)/g, ': typeof$1')
    : afterExport
  return `${[
    beforeExportReplaced,
    afterExportReplaced,
  ].join('declare const $defaultExport:')}
export default $defaultExport;`
}

async function replaceJsonString(code: string, id: string) {
  return code?.startsWith('export')
    ? replaceJsonModuleString(code)
    : code?.startsWith('{')
      ? replaceJsonRegularString(code)
      : replaceJsonRegularString(await fs.readFile(id, encoding))
}

export function VitePluginJsonDTS() {
  return {
    name: 'vite-plugin-json-dts',
    enforce: 'pre',
    // apply: 'serve',
    // async buildStart(options) {
    //   // 这里你可以执行任何在构建开始之前需要完成的任务
    //   // console.log('Build is starting...', options)
    //   // 例如：生成你的 .ts 文件
    // },

    async transform(code: string, id: string) {
      // console.log(id, code, 'code')
      if (fileRegex.test(id)) {
        console.log(id, code, 'code')
        const fileName = `${id}.d.ts`
        const [existingTyping, newTyping] = await Promise.all([
          getExisting(fileName),
          replaceJsonString(code, id),
        ])

        if (newTyping !== existingTyping)
          await fs.writeFile(fileName, newTyping, encoding)

        return {
          code,
          map: null, // This plugin does not change the source map
        }
      }
    },
  }
}
