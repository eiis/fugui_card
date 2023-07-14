<script setup lang="ts">
import { Component, defineAsyncComponent, defineComponent, h, onBeforeMount, onMounted, ref } from 'vue';


const modules = import.meta.glob('./components/*.vue')
// const HelloWorld = defineAsyncComponent(() => modules['./components/HelloWorld.vue']() as Promise<{ default: Component }>)

const HelloWorld = defineAsyncComponent({
  loader: () => new Promise<Component>(resolve =>
    setTimeout(() =>
      resolve(modules['./components/HelloWorld.vue']() as Promise<{ default: Component }>)
      , 1000)
  ),
  loadingComponent: defineComponent({
    setup() {
      const elRef = ref();

      onBeforeMount(() => {
        console.log('el ref', elRef.value);
      });

      onMounted(() => {
        console.log('el ref', elRef.value);
      });

      // 从 setup 函数返回一个函数
      return () => {
        // 这个函数会被作为渲染函数，它返回了一个由 h 函数创建的虚拟 DOM 节点
        return h('div', { class: 'h-screen w-screen flex items-center justify-center', ref: elRef }, 'Loading');
      };
    },
  }),
})

// import HelloWorld from './test';
</script>

<template>
  <HelloWorld />
</template>

<style scoped>
</style>
