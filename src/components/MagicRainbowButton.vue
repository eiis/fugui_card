<script setup lang="ts">
import useRainbow from '@/composables/useRainbow'

const { intervalDelay } = defineProps({
  intervalDelay: {
    type: Number,
    default: 1300,
  },
})

const transitionDelay = intervalDelay * 1.25

const { colors: reactiveColors } = useRainbow(intervalDelay)

const colorKeys = computed(() => Object.keys(reactiveColors.value))

const computedStyle = computed(() => ({
  ...reactiveColors.value,
  transition: `
        ${colorKeys.value[0]} ${transitionDelay}ms linear,
        ${colorKeys.value[1]} ${transitionDelay}ms linear,
        ${colorKeys.value[2]} ${transitionDelay}ms linear
      `,
  background: `
        radial-gradient(
          circle at top left,
          var(${colorKeys.value[2]}),
          var(${colorKeys.value[1]}),
          var(${colorKeys.value[0]})
        )
      `,
}))
</script>

<template>
  <button
    :style="computedStyle"
    v-bind="$attrs"
    class="px-4 rounded-md motion-safe:hover:scale-110"
  >
    <slot />
  </button>
</template>
