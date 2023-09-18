<script setup lang="ts">
import type { Component } from 'vue'
import { defineAsyncComponent, ref } from 'vue'

// let a = 1
// lodash.debounce(() => {
//   a++
//   console.log(a)
//   console.log(123)
// })

// import Popover from '@/components/Popover.vue'

// 导入的模块会单独打包为一个chunk
const modules = import.meta.glob('@/components/HelloWorld.vue')
// console.log(modules, 'modules')

// console.log('2', h(Popover))

// const HelloWorld = defineAsyncComponent(() => modules['./components/HelloWorld.vue']() as Promise<{ default: Component }>)

const HelloWorld = defineAsyncComponent({
  loader: () => new Promise<Component>(resolve =>
    setTimeout(() => {
      const componentModule = modules['/src/components/HelloWorld.vue']
      if (componentModule) {
        const componentPromise = componentModule() as Promise<{ default: Component }>
        if (componentPromise)
          resolve(componentPromise)
      }
    }
    // resolve(modules['/src/components/HelloWorld.vue']() as Promise<{ default: Component }>)
    , 1000),
  ),
  loadingComponent:
  defineComponent({
    setup() {
      const elRef = ref()

      onBeforeMount(() => {
        // console.log('el ref', elRef.value)
      })

      onMounted(() => {
        // console.log('el ref', elRef.value)
      })

      // 从 setup 函数返回一个函数
      return () => {
        // 这个函数会被作为渲染函数，它返回了一个由 h 函数创建的Vnodes
        // return h('div', { class: 'h-full w-full flex i-svg-spinners-blocks-shuffle-2 items-center justify-center', ref: elRef }, 'Loading')
        // return h(Popover)
        return h('div', {
          class: 'h-screen w-screen flex text-yellow items-center justify-center',
        }, [
          h('div', {
            class: 'w-10 h-10 text-current i-svg-spinners-blocks-shuffle-2',
            ref: elRef,
          }),
        ])
      }
    },
  }),
})
const state = ref({ count: 0, foo: 'bar', title: 'dashu' })

function btnClick() {
  // state.value.count += 1
}
// function change() {
//   state.value.title = 'huakai'
// }

function add() {}

function change() {
  state.value.title = 'huakai'
}

const initial = ref(1)
// function change() {
//   state.value.title = 'huakai'
// }
</script>

<template>
  <div>
    <!-- <Home /> -->
    <!-- <HelloWorld v-model:count="state.count" v-model:foo="state.foo" @change="change">
      <template #header>
        <p>slot_Header</p>
      </template>
      <template #default>
        <p>slot_default</p>
      </template>
    </HelloWorld> -->
    <!-- <HelloWorld v-model:count="state.count" v-model:foo="state.foo" v-slot="slotProps">
      {{ slotProps.text }}
      {{ slotProps.count }}
    </HelloWorld> -->
    <!-- <HelloWorld v-model:count="state.count" v-model:foo="state.foo" :title="state.title" @change="change">
      <template #header="headerProps">
        {{ headerProps.message }}
      </template>
    </HelloWorld> -->
    <!-- <TheCounter /> -->
    <!-- <Popover /> -->
    <HelloWorld v-model:count="state.count" v-model:foo.capitalize="state.foo" title="I am FuGui" @update:count="btnClick" />

  <!-- <router-link to="/">
      Go to Home
    </router-link>
    <router-link to="/about">
      Go to About
    </router-link> -->

  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <!-- <router-view /> -->
  </div>
</template>

<style scoped>
</style>
