<script setup lang="ts">
import party from 'party-js'
import type { Ref } from 'vue'
import { onMounted, ref } from 'vue'

// 需要在eslint中配置ecmaVersion为2020
// const apiPrefix = import.meta.env.VITE_API_PREFIX;

// console.log('import.meta.env.VITE_APIP_PREFIX', apiPrefix)

// const { modelValue } = defineModels<{
//   modelValue: number;
// }>();

// console.log('modelValue', modelValue)

// const onClick = () => {
//   modelValue.value += 1;
// };

// const { count } = defineProps(['count'])
// const props = defineProps({
//   modelValue: String,
//   count: Number,
// })

// const { foo, count } = defineModels<{
//   count: number,
//   foo: string
// }>()

// defineProps({
//   title: {
//     type: String,
//     default: '1'
//   }
// })
const { title } = defineProps({
  title: {
    type: String,
    default: 'fugui',
    validator(value) {
      // 通过断言强制将 value 视为字符串
      const valueAsString = value as string
      // The value must match one of these strings
      return ['success', 'warning', 'danger'].includes(valueAsString)
    },
  },
})

const emit = defineEmits(['change'])

console.log('title', title)

function buttonClick() {
  emit('change')
}
// defineProps<{
//   title?: string
//   likes?: number
// }>()
// const emit = defineEmits(['update:count'])

// const onClick = () => {
//   count.value += 1
//   // emit('update:count', count)
// }

const partyElement: Ref<HTMLElement | null> = ref(null)
function btnCkick() {
  if (partyElement.value)
    party.confetti(partyElement.value)
}
onMounted(() => {
  partyElement.value = document.getElementById('party-element')
})
</script>

<template>
  <div class="flex items-center justify-center w-screen m-8">
    <div
      id="party-element"
      class="p-6 max-w-sm mx-auto bg-red-700 hover:bg-white rounded-xl shadow-md flex items-center justify-center space-x-4 dark:bg-gray-800"
    >
      <div class="flex-shrink-0">
        <img class="h-12 w-12 " src="@/assets/vue.svg" alt="ChitChat Logo">
      </div>
      <div class="group">
        <header>
          <slot name="header" message="hello" />
        </header>
        <h1>
          <slot text="greetingMessage" :count="1" />
        </h1>
        <div class="font-custom text-xl font-medium text-black group-hover:text-gray-900">
          Vite+Vue
        </div>
        <p class="text-gray-500">
          You have a new message
        </p>
        <button class="px-4 bg-red-500 rounded-md hover:bg-red-700 motion-safe:hover:scale-110" @click="btnCkick">
          Click me!
        </button>
        <!-- <p>defineModels state: {{ foo }}</p>
        <p>defineModels state: {{ count }}</p> -->
        <p>{{ title }}</p>
        <!-- <button class="px-4 bg-red-500 rounded-md hover:bg-red-700 motion-safe:hover:scale-110" @click="onClick">
          Increment child state
        </button> -->
        <button class="px-4 bg-red-500 rounded-md hover:bg-red-700 motion-safe:hover:scale-110" @click="buttonClick">
          Change child title
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
