<script setup lang="ts">
</script>

<template>
  <div id="nav">
    <RouterLink to="/">
      Home
    </RouterLink>
    |
    <RouterLink to="/about">
      About
    </RouterLink>
  </div>
  <!-- 路由出口 -->
  <RouterView />
</template>

<style scoped>
</style>
