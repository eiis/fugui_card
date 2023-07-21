import * as fs from 'node:fs'
import path from 'node:path'

const dir = 'src/components'
if (!fs.existsSync(dir))
  fs.mkdirSync(dir, { recursive: true })

for (let i = 1; i <= 50; i++) {
  const fileName = path.join(dir, `Component${i}.vue`)
  const content = `
<template>
  <div>Component${i}</div>
</template>

<script>
export default {
  name: 'Component${i}',
};
</script>

<style scoped>

</style>
`
  fs.writeFileSync(fileName, content)
}
