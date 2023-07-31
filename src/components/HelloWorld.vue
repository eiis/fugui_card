<script setup lang="ts">
import party from 'party-js'
import type { Ref } from 'vue'
import { computed, onMounted, ref } from 'vue'
import { useDark, useDraggable } from '@vueuse/core'
import { SwitchRoot, SwitchThumb } from 'radix-vue'
import iconUrl from '@/assets/vue.svg?component'

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

console.log('iconUrl', iconUrl)

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

const el: Ref<HTMLElement | SVGElement | null> = ref(null)
const { x, y, style } = useDraggable(el, {
  initialValue: { x: 40, y: 40 },
})
const isDark = useDark() // true or false
// const toggleDark = useToggle(isDark)

function toggleDark() {
  isDark.value = !isDark.value
  console.log('toggleDark', isDark.value)
}

const isLight = computed(() => {
  return !!isDark.value
})

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
  <div class="flex items-center justify-center w-full m-8 ">
    <!-- hover:bg-white  -->
    <div
      id="party-element"
      ref="el"
      :style="style"
      style="position: fixed"
      class="p-6 max-w-sm mx-auto bg-red-700 rounded-xl shadow-md flex items-center justify-center space-x-4 dark:bg-black"
    >
      <div class="w-12 h-12 flex justify-center items-center flex-shrink-0">
        <!-- <img class="h-12 w-12 " :src="iconUrl" alt="ChitChat Logo"> -->
        <iconUrl />
      </div>
      <div class="group">
        <div class="flex gap-2 items-center">
          <label className="text-white text-[15px] leading-none pr-[15px] select-none" for="airplane-mode">
            Airplane mode
          </label>
          <SwitchRoot
            id="airplane-mode"
            v-model:open="isDark"
            class="w-[42px] h-[25px] focus-within:outline focus-within:outline-black flex bg-black/50 shadow-sm rounded-full relative data-[state=checked]:bg-black cursor-default"
          >
            <SwitchThumb
              class="block w-[21px] h-[21px] my-auto bg-white shadow-sm rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]"
            />
          </SwitchRoot>
        </div>
        <!-- <div class="flex items-center justify-between">
          <button class="bg-[#44bd87] hover:bg-[#44bd87] rounded px-2 hover:scale-110" @click="toggleDark">
            {{ isLight }}
          </button>
          <button class="px-4 bg-[#44bd87] rounded-md hover:bg-[#44bd87] motion-safe:hover:scale-110" @click="btnCkick">
            Click me!
          </button>
        </div> -->
        <div>
          <slot name="header" message="hello" />
        </div>
        <div>
          <slot text="greetingMessage" :count="1" />
        </div>
        <div class="font-custom text-xl font-medium text-black group-hover:text-gray-900">
          Vite+Vue
        </div>
        <p class="text-gray-500">
          You have a new message
        </p>
        <!-- <p>defineModels state: {{ foo }}</p>
        <p>defineModels state: {{ count }}</p> -->
        <p>{{ title }}</p>
        <!-- <button class="px-4 bg-red-500 rounded-md hover:bg-red-700 motion-safe:hover:scale-110" @click="onClick">
          Increment child state
        </button> -->
        <button class="px-4 bg-[#44bd87] rounded-md hover:bg-[#44bd87] motion-safe:hover:scale-110" @click="buttonClick">
          Change child title
        </button>
      </div>
    </div>
  </div>
</template>
