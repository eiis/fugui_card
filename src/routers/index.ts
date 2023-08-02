import { createRouter, createWebHashHistory } from 'vue-router'

const HelloWorld = () => import('@/components/HelloWorld.vue')
const TheCounter = () => import('@/components/TheCounter.vue')

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/about',
      name: 'TheCounter',
      component: TheCounter,
    },
  ],
  strict: false,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router
