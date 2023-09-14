<script setup lang="ts">
</script>

<template>
  <div class="flex items-center justify-center w-screen h-screen">
    <div
      un-bg="white dark:slate-900"
      class="overflow-hidden shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] rounded-xl md:flex animate-puffInCenter"
    >
      <div class="flex items-center justify-center w-full h-48 object-cover md:h-full md:w-48 bg-gray-300 rounded dark:bg-gray-700">
        <svg class="w-10 h-48 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>
      <div class="group relative flex flex-col px-8 h-48 items-center justify-center">
        <div class="flex items-center justify-center text-black">
          <div class="flex font-custom dark:text-white text-xl font-mediu">
            <div class="w-full">
              <div class="h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
            </div>
          </div>
        </div>
        <div class="h-8 w-9 bg-gray-200 rounded-xl dark:bg-gray-700 mb-4" />
        <div class="flex items-center justify-between">
          <div class="w-full">
            <div class="h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
