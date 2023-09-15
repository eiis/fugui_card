import useIncrementingNumber from './useIncrementingNumber'
import { generateId, range } from '@/utils/index'

const rainbowColors = [
  'hsl(1deg, 96%, 55%)', // red
  'hsl(25deg, 100%, 50%)', // orange
  'hsl(40deg, 100%, 50%)', // yellow
  'hsl(45deg, 100%, 50%)', // yellow
  'hsl(66deg, 100%, 45%)', // lime
  'hsl(130deg, 100%, 40%)', // green
  'hsl(177deg, 100%, 35%)', // aqua
  'hsl(230deg, 100%, 45%)', // blue
  'hsl(240deg, 100%, 45%)', // indigo
  'hsl(260deg, 100%, 55%)', // violet
  'hsl(325deg, 100%, 48%)', // pink
]

const paletteSize = rainbowColors.length
const WINDOW_SIZE = 3

const hasBrowserSupport: boolean
  = typeof window !== 'undefined'
    ? typeof window.CSS.registerProperty === 'function'
    : false

const getColorPropName = (id: string, index: number): string => `--magic-rainbow-color-${id}-${index}`

interface Colors {
  [key: string]: string
}

export default function useRainbow(intervalDelay: number = 2000) {
  const prefersReducedMotion: Ref<boolean>
    = typeof window === 'undefined'
      ? ref(true)
      : ref(window.matchMedia('(prefers-reduced-motion: no-preference)').matches)

  const isEnabled = ref(hasBrowserSupport && prefersReducedMotion.value)

  const uniqueId = ref<string>(generateId())

  onMounted(() => {
    if (!isEnabled.value)
      return

    range(0, WINDOW_SIZE).forEach((index: any) => {
      const name = getColorPropName(uniqueId.value, index)
      const initialValue = rainbowColors[index]

      window.CSS?.registerProperty({
        name,
        initialValue,
        syntax: '<color>',
        inherits: false,
      })
    })
  })

  const intervalCount = useIncrementingNumber(intervalDelay)

  const colors = computed<Colors>(() => {
    return range(0, WINDOW_SIZE).reduce((acc, index) => {
      const effectiveIntervalCount = isEnabled.value ? intervalCount.value : 0

      const name = getColorPropName(uniqueId.value, index as number)
      const value = rainbowColors[(effectiveIntervalCount + index) % paletteSize]

      return {
        ...acc,
        [name]: value,
      }
    }, {})
  })

  return {
    colors,
  }
}
