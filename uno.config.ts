import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWind,
} from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify({
      prefix: 'un-',
      prefixedOnly: true,
    }),
    presetUno(),
    presetWind(),
    presetIcons(),
  ],
  rules: [
    ['text-red', { color: 'red' }],
    [/^my-(.*)$/, result => ({ color: result[1] })],
  ],
})
