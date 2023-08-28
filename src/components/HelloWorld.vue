<script setup lang="ts">
import party from 'party-js'
import type { Ref } from 'vue'
import { computed, onMounted, ref } from 'vue'
import { useDark } from '@vueuse/core'

import Modal from './Modal.vue'

// import iconUrl from '@/assets/vue.svg?component'

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

// console.log('iconUrl', iconUrl)
// console.log(import.meta.env, 'import.meta.env')

// const isProduction = import.meta.env.MODE === 'production'

// const imagePath = '../assets'

console.log(new URL('../assets/img/wChat.png', import.meta.url).href)

const img = new URL('../assets/img/wChat.png', import.meta.url).href
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
  initialValue: { x: 500, y: 300 },
})
// const isDark = useDark() // true or false
// const toggleDark = useToggle(isDark)

const isDark = useDark()
// const toggleDark = useToggle(isDark)

function toggleDark() {
  isDark.value = !isDark.value
  console.log('toggleDark', isDark.value)
}

const modal = ref<InstanceType<typeof Modal> | null>(null)

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

function ModalClick() {
  console.log(modal.value)
  modal.value?.openModal()
}
onMounted(() => {
  partyElement.value = document.getElementById('party-element')
})
</script>

<template>
  <div class="flex items-center justify-center w-screen h-screen  md:blur-none">
    <!-- :style="style" -->
    <!-- style="position: fixed" -->
    <!-- :style="style"
      style="position: fixed" -->
    <div
      id="party-element"
      ref="el"
      un-bg="white"
      class="shadow-md overflow-hidden md:max-w-2xl rounded-xl md:flex items-center justify-center"
    >
      <!-- <img class="h-12 w-12 " :src="icon" alt="ChitChat Logo"> -->
      <div class="md:shrink-0">
        <img class="w-full h-48 object-cover md:h-full md:w-48" :src="img" alt="ChitChat Logo">
        <!-- <iconUrl /> -->
        <!-- <div class="w-2em h-2em i-logos:vue transform transition-800 hover:rotate-180 text-3xl text-current" /> -->
      </div>
      <div class="group relative flex flex-col px-8 h-48 items-center justify-center">
        <div class="flex gap-2 items-center justify-center">
          <!-- <div un-text="red" class="my-blue">
            Hello
          </div> -->
          <!-- <label className="text-white text-[15px] leading-none pr-[15px] select-none" for="airplane-mode">
            Airplane mode
          </label> -->
          <!-- <SwitchRoot
            id="airplane-mode"
            v-model:open="isDark"
            class="w-[42px] h-[25px] focus-within:outline focus-within:outline-black flex bg-black/50 shadow-sm rounded-full relative data-[state=checked]:bg-black cursor-default"
          >
            <SwitchThumb
              class="block w-[21px] h-[21px] my-auto bg-white shadow-sm rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]"
            />
          </SwitchRoot> -->
          <!-- <button class="i-carbon-sun dark:i-carbon-moon" @click="toggleDark" /> -->
        </div>
        <!-- <div class="flex items-center justify-between">
          <button class="bg-[#44bd87] hover:bg-[#44bd87] rounded px-2 hover:scale-110" @click="toggleDark">
            {{ isLight }}
          </button>
        </div> -->
        <div>
          <slot name="header" message="hello" />
        </div>
        <div>
          <slot text="greetingMessage" :count="1" />
        </div>
        <!-- <button class="absolute top-0 right-0 text-2xl i-carbon-sun dark:i-carbon-moon" @click="toggleDark()" /> -->
        <div class="flex items-center justify-center text-black">
          <!-- <p>Vite+Vue</p> -->
          <div class="font-custom text-xl font-mediu">
            I am FuGui
          </div>
          <button class="absolute top-1 right-1 text-2xl i-carbon-sun dark:i-carbon-moon" @click="toggleDark()" />
        </div>
        <!-- <div class="font-custom text-xl font-medium text-black">
          I am FuGu
        </div> -->
        <!-- <p>defineModels state: {{ foo }}</p>
        <p>defineModels state: {{ count }}</p> -->
        <!-- <button class="px-4 bg-red-500 rounded-md hover:bg-red-700 motion-safe:hover:scale-110" @click="onClick">
          Increment child state
        </button> -->
        <div class="text-2xl m-4 i-twemoji-grinning-face-with-smiling-eyes hover:i-twemoji-face-with-tears-of-joy" />
        <div class="flex items-center justify-between">
          <!-- <p>{{ title }}</p> -->
          <!-- <div class="text-2xl i-twemoji-grinning-face-with-smiling-eyes hover:i-twemoji-face-with-tears-of-joy" /> -->
          <button class="px-4 bg-red rounded-md hover:bg-[#44bd87] motion-safe:hover:scale-110" @click="btnCkick">
            Subscribe Me!
          </button>
        </div>
        <!-- <button class="w-[160px] px-4 mb-4 bg-[#44bd87] rounded-md hover:bg-[#44bd87] motion-safe:hover:scale-110" @click="buttonClick">
          Change child title
        </button>
        <button class="w-[160px] px-4 bg-[#44bd87] rounded-md hover:bg-[#44bd87] motion-safe:hover:scale-110" @click="ModalClick">
          Open Modal
        </button> -->
      </div>
    </div>
    <teleport to="#app">
      <Modal ref="modal">
        <p>This is a global modal!</p>
      </Modal>
    </teleport>
    <!-- <Gpt /> -->
  </div>
</template>
