<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <h1 class="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
      {{ $t('orders') }}
    </h1>
    <div class="card">
      <div class="flex justify-between items-center mb-4">
        <span class="font-heading text-sm text-gray-600 dark:text-gray-400">{{ $t('orders') }}</span>
        <NuxtLink to="/" class="btn-outline">{{ $t('continueShopping') }}</NuxtLink>
      </div>
      <div class="space-y-2">
        <div v-for="o in sampleOrders" :key="o.id" class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-button">
          <div class="font-body text-sm text-gray-700 dark:text-gray-300">{{ $t('orderId') }}: {{ o.id }}</div>
          <div class="font-body text-sm text-gray-700 dark:text-gray-300">{{ $t('status') }}: {{ $t(o.status.toLowerCase()) }}</div>
          <div class="font-body text-sm text-gray-900 dark:text-white">{{ $t('total') }}: ${{ o.total.toFixed(2) }}</div>
          <NuxtLink :to="`/orders/${o.id}`" class="btn-primary">{{ $t('view') }}</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const sampleOrders = [
  { id: 'BC-1001', status: 'Pending', total: 299.99 },
  { id: 'BC-1002', status: 'Paid', total: 189.50 },
  { id: 'BC-1003', status: 'Shipped', total: 520.00 }
]
definePageMeta({
  title: 'Orders - BuildCommerce',
  description: 'Order list overview',
  middleware: ['auth-required']
})
</script>