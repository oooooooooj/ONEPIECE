<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <h1 class="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
      Sales Reports
    </h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <div class="card">
        <h2 class="font-heading text-xl font-semibold text-gray-900 dark:text-white mb-2">Revenue</h2>
        <p class="font-body text-2xl font-bold text-primary">$12,480</p>
      </div>
      <div class="card">
        <h2 class="font-heading text-xl font-semibold text-gray-900 dark:text-white mb-2">Orders</h2>
        <p class="font-body text-2xl font-bold text-primary">128</p>
      </div>
      <div class="card">
        <h2 class="font-heading text-xl font-semibold text-gray-900 dark:text-white mb-2">Avg. Order</h2>
        <p class="font-body text-2xl font-bold text-primary">$97.50</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Sales Reports - BuildCommerce',
  description: 'Sales analytics overview',
  middleware: ['admin-only']
})
</script>