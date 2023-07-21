<script lang="ts">
import { h, ref } from 'vue'

export default {
  setup() {
    const count = ref(0)

    const increment = () => {
      count.value++
    }

    // 返回一个render函数渲染h函数返回Vnode
    return () => h('button', { onClick: increment }, `count is: ${count.value}`)

    // //这种不会渲染,如果使用render函数渲染,必须返回一个函数渲染一个h函数返回的Vnode
    // return {
    //   render() {
    //     return h('button', { onClick: increment }, `count is: ${count.value}`);
    //   }
    // };
  },
}
</script>

<template />

<style scoped>
</style>
