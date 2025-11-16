<template>
  <div>
    <section class="relative h-[60vh] sm:h-[70vh] flex items-center justify-center overflow-hidden">
      <NuxtImg src="https://images.unsplash.com/photo-1472220625704-91e1462799b2?w=1920&q=80" alt="About" class="absolute inset-0 w-full h-full object-cover" preset="hero" loading="eager" preload sizes="100vw" />
      <div class="absolute inset-0 bg-black/50 dark:bg-black/70"></div>
      <div class="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 class="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 animate__animated animate__fadeIn">{{ $t('about') }}</h1>
        <p class="font-body text-lg sm:text-xl text-white/90 mb-8 animate__animated animate__fadeIn animate__delay-1s">{{ $t('aboutIntro') }}</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center animate__animated animate__fadeIn animate__delay-2s">
          <NuxtLink :to="localePath('/products')" class="btn-primary px-8 py-4">{{ $t('shop') }}</NuxtLink>
          <NuxtLink :to="localePath('/contact')" class="btn-outline px-8 py-4 border-white text-white hover:bg-white hover:text-primary">{{ $t('contactUsCta') }}</NuxtLink>
        </div>
      </div>
    </section>

    <section class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="card text-center">
          <div class="w-12 h-12 sm:w-16 sm:h-16 bg-primary-50 dark:bg-primary-900 rounded-button mb-3 mx-auto flex items-center justify-center">
            <Icon name="mdi:target" class="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
          </div>
          <h3 class="font-heading text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ $t('mission') }}</h3>
          <p class="font-body text-sm text-gray-600 dark:text-gray-400">{{ $t('missionDesc') }}</p>
        </div>
        <div class="card">
          <h3 class="font-heading text-lg font-semibold text-gray-900 dark:text-white mb-3">{{ $t('values') }}</h3>
          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <Icon name="mdi:check-decagram" class="w-5 h-5 text-primary" />
              <span class="font-body text-sm text-gray-700 dark:text-gray-300">{{ $t('valueQuality') }}</span>
            </div>
            <div class="flex items-center gap-3">
              <Icon name="mdi:leaf" class="w-5 h-5 text-primary" />
              <span class="font-body text-sm text-gray-700 dark:text-gray-300">{{ $t('valueSustainability') }}</span>
            </div>
            <div class="flex items-center gap-3">
              <Icon name="mdi:account-heart" class="w-5 h-5 text-primary" />
              <span class="font-body text-sm text-gray-700 dark:text-gray-300">{{ $t('valueCustomerFocus') }}</span>
            </div>
          </div>
        </div>
        <div class="card">
          <h3 class="font-heading text-lg font-semibold text-gray-900 dark:text-white mb-3">{{ $t('contact') }}</h3>
          <p class="font-body text-sm text-gray-600 dark:text-gray-400 mb-4">{{ $t('contactDesc') }}</p>
          <NuxtLink :to="localePath('/contact')" class="btn-primary w-full">{{ $t('contactUsCta') }}</NuxtLink>
        </div>
      </div>
    </section>

    <section class="bg-background-light dark:bg-background-dark py-12 sm:py-16">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <h3 class="font-heading text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8">{{ $t('milestones') }}</h3>
        <div class="relative">
          <div class="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700"></div>
          <div class="space-y-8 max-w-4xl mx-auto">
            <div class="flex items-start gap-4">
              <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">23</div>
              <div class="card flex-1">
                <p class="font-body text-sm text-gray-700 dark:text-gray-300">{{ $t('milestone1') }}</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">24</div>
              <div class="card flex-1">
                <p class="font-body text-sm text-gray-700 dark:text-gray-300">{{ $t('milestone2') }}</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">25</div>
              <div class="card flex-1">
                <p class="font-body text-sm text-gray-700 dark:text-gray-300">{{ $t('milestone3') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
definePageMeta({
  title: 'About - BuildCommerce',
  description: 'Company overview, mission, values and milestones'
})
</script>

