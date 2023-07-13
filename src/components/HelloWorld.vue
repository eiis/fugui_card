<script setup lang="ts">
import party from "party-js";
import { onMounted, ref, Ref } from 'vue'
//需要在eslint中配置ecmaVersion为2020
// const apiPrefix = import.meta.env.VITE_API_PREFIX;

// console.log('import.meta.env.VITE_API_PREFIX', apiPrefix)

const partyElement: Ref<HTMLElement | null> = ref(null)
const btnCkick = () => {
  if (partyElement.value) {
    party.confetti(partyElement.value);
  }
}
onMounted(() => {
  partyElement.value = document.getElementById('party-element');
});
</script>

<template>
  <div class="flex items-center justify-center h-screen w-screen">
    <div id="party-element"
      class="h-20 p-6 max-w-sm mx-auto bg-red-700 hover:bg-white rounded-xl shadow-md flex items-center justify-center space-x-4 dark:bg-gray-800">
      <div class="flex-shrink-0">
        <img class="h-12 w-12 " src="@/assets/vue.svg" alt="ChitChat Logo">
      </div>
      <div class="group ">
        <div class="text-xl font-medium text-black group-hover:text-gray-900">Vite+Vue</div>
        <p class="text-gray-500">You have a new message</p>
        <button class="px-4 bg-red-500 rounded-md hover:bg-red-700 motion-safe:hover:scale-110" @click="btnCkick">
          Click me!
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
