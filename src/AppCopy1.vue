<script setup lang="ts">
</script>

<template>
  <div id="nav">
    <router-link to="/">
      Home
    </router-link>
    |
    <router-link to="/about">
      About
    </router-link>
  </div>
  <!-- 路由出口 -->
  <router-view />
</template>

<style scoped>
</style>
