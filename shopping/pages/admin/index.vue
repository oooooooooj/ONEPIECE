<template>
  <div class="container mx-auto px-4 py-12 sm:py-16">
    <div class="max-w-md mx-auto text-center">
      <div class="w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
        <Icon name="mdi:alert-circle" class="w-12 h-12 text-gray-400" />
      </div>
      <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Page Not Found</h1>
      <p class="text-gray-600 dark:text-gray-400 mb-6">The requested page could not be found.</p>
      <p class="text-gray-500 dark:text-gray-500 text-sm mb-8">HTTP Status: 404</p>
      <NuxtLink to="/" class="btn-primary px-6 py-3 inline-flex items-center gap-2">
        <Icon name="mdi:home" class="w-5 h-5" />
        <span>Return to Home</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
// 页面元数据 - 使用Nuxt 3原生方式
definePageMeta({
  title: 'Page Not Found - Admin',
  description: 'The requested admin page could not be found.',
  middleware: ['admin-only']
})

// 设置HTTP状态码为404
if (process.server) {
  const { setResponseStatus } = useNuxtApp()
  setResponseStatus(404)
}
</script>

<style scoped>
.btn-primary {
  @apply bg-primary text-white rounded-button font-medium hover:bg-primary/90 transition-colors;
}
</style>