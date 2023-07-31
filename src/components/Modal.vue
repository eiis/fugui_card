<script setup lang="ts">
const show = ref(false)

function openModal() {
  show.value = true
}

function closeModal() {
  show.value = false
}

defineExpose({
  show,
  closeModal,
  openModal,
})
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" @click.self="closeModal">
      <div class="bg-white p-4 rounded-lg flex flex-col items-center justify-center">
        <slot />
        <button class="mt-4 bg-[#44bd87] text-white p-2 rounded" @click="closeModal">
          Close
        </button>
      </div>
    </div>
  </Transition>
</template>

<style>
.modal-enter-active {
  animation: modal-in 0.5s;
}
.modal-leave-active {
  animation: modal-in 0.5s reverse;
}
@keyframes modal-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
