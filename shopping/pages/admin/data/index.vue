<template>
  <div class="container mx-auto px-4 py-12 sm:py-16">
    <h1 class="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 sm:mb-12">Data Configuration</h1>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
      <!-- Currency Settings Card -->
      <div class="card bg-gray-50 dark:bg-gray-800 text-center animate__animated animate__fadeInUp">
        <div class="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-primary-50 dark:bg-primary-900 rounded-button mb-3 sm:mb-4 mx-auto">
          <Icon name="mdi:currency-usd" class="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
        </div>
        <h2 class="font-heading text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">Currency Settings</h2>
        <p class="text-gray-500 dark:text-gray-400">USD</p>
      </div>
      
      <!-- Payment Methods Card -->
      <div class="card bg-gray-50 dark:bg-gray-800 text-center animate__animated animate__fadeInUp animate__delay-1s">
        <div class="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-primary-50 dark:bg-primary-900 rounded-button mb-4 mx-auto">
          <Icon name="mdi:credit-card" class="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
        </div>
        <h2 class="font-heading text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">Payment Methods</h2>
        <p class="text-gray-500 dark:text-gray-400">PayPal, Stripe</p>
      </div>
      
      <!-- Shipping Zones Card -->
      <div class="card bg-gray-50 dark:bg-gray-800 text-center animate__animated animate__fadeInUp animate__delay-2s">
        <div class="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-primary-50 dark:bg-primary-900 rounded-button mb-4 mx-auto">
          <Icon name="mdi:map-marker" class="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
        </div>
        <h2 class="font-heading text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">Shipping Zones</h2>
        <p class="text-gray-500 dark:text-gray-400">Worldwide</p>
      </div>
      
      <!-- Tax Rates Card -->
      <div class="card bg-gray-50 dark:bg-gray-800 text-center animate__animated animate__fadeInUp animate__delay-3s">
        <div class="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-primary-50 dark:bg-primary-900 rounded-button mb-4 mx-auto">
          <Icon name="mdi:calculator" class="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
        </div>
        <h2 class="font-heading text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">Tax Rates</h2>
        <p class="text-gray-500 dark:text-gray-400">Standard 10%</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 页面元数据 - 使用Nuxt 3原生方式
definePageMeta({
  title: 'Data Configuration - Admin',
  description: 'Configure basic data settings for the store.'
})

// 可以在这里添加权限检查逻辑
</script>