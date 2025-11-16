<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <h1 class="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
      Inventory Reports
    </h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <div class="card">
        <h2 class="font-heading text-xl font-semibold text-gray-900 dark:text-white mb-2">Low Stock</h2>
        <p class="font-body text-2xl font-bold text-primary">12</p>
      </div>
      <div class="card">
        <h2 class="font-heading text-xl font-semibold text-gray-900 dark:text-white mb-2">Pending Orders</h2>
        <p class="font-body text-2xl font-bold text-primary">24</p>
      </div>
      <div class="card">
        <h2 class="font-heading text-xl font-semibold text-gray-900 dark:text-white mb-2">Shipped</h2>
        <p class="font-body text-2xl font-bold text-primary">86</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Inventory Reports - BuildCommerce',
  description: 'Inventory analytics overview',
  middleware: ['admin-only']
})
</script>