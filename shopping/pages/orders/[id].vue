<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <h1 class="font-heading text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
      {{ $t('orderId') }}: {{ orderId }}
    </h1>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 card">
        <h2 class="font-heading text-xl font-semibold text-gray-900 dark:text-white mb-3">{{ $t('items') }}</h2>
        <div class="space-y-3">
          <div v-for="i in 3" :key="i" class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-button">
            <span class="font-body text-sm text-gray-700 dark:text-gray-300">Sample Item {{ i }}</span>
            <span class="font-body text-sm text-gray-900 dark:text-white">$99.99</span>
          </div>
        </div>
      </div>
      <div class="card">
        <h2 class="font-heading text-xl font-semibold text-gray-900 dark:text-white mb-3">{{ $t('orderSummary') }}</h2>
        <div class="space-y-2">
          <div class="flex justify-between"><span class="font-body text-sm text-gray-600 dark:text-gray-400">{{ $t('subtotal') }}</span><span>$299.97</span></div>
          <div class="flex justify-between"><span class="font-body text-sm text-gray-600 dark:text-gray-400">{{ $t('tax') }}</span><span>$24.75</span></div>
          <div class="flex justify-between"><span class="font-heading font-semibold">{{ $t('total') }}</span><span class="font-heading font-semibold">$324.72</span></div>
        </div>
        <div class="mt-4 flex gap-2">
          <NuxtLink to="/cart" class="btn-outline flex-1">{{ $t('checkout') }}</NuxtLink>
          <NuxtLink to="/orders" class="btn-primary flex-1">{{ $t('back') }}</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const orderId = computed(() => route.params.id as string)
definePageMeta({
  title: 'Order Detail - BuildCommerce',
  description: 'Order detail overview',
  middleware: ['auth-required']
})
</script>