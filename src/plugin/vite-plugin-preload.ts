import * as fs from 'node:fs'

// 查找文件
function getFiles(e: string) {
  const arr: string[] = []
  const dirents = fs.readdirSync(e, { withFileTypes: true })
  for (const dirent of dirents) {
    if (dirent.isDirectory())
      arr.push(...getFiles(`${e + dirent.name}/`))
    else
      arr.push(e + dirent.name)
  }
  // console.log('arr', arr)
  return arr
}

// 插入预加载文件标签
export function setPreLoadFile(options: { pathList: string[]; preFix: string } = { pathList: [], preFix: '' }) {
  if (options.pathList && options.pathList.length) {
    let res: string[] = []
    options.pathList.forEach((path) => {
      res = res.concat(getFiles(path))
    })
    let linkStr = ''
    res.forEach((item) => {
      // 根据文件后缀名判断资源类型
      const type = item.split('.').pop()
      const as = type === 'js' ? 'script' : type === 'css' ? 'style' : 'fetch'
      linkStr += `<link rel="preload" href="${options.preFix + item.substring(1)}" as="${as}">\n`
    })
    return {
      name: 'preload-file',
      transformIndexHtml(dom: any) {
        return dom.replace('</head>', `${linkStr}</head>`)
      },
    }
  }
}
