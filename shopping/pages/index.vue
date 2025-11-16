<template>
  <div>
    <!-- 主视觉区：全屏大图背景 -->
    <section class="relative h-screen flex items-center justify-center overflow-hidden">
      <!-- 背景图片 - 建材仓库场景 -->
      <NuxtImg
        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
        alt="{{ $t('premiumBuildingMaterials') }}"
        class="absolute inset-0 w-full h-full object-cover"
        preset="hero"
        loading="eager"
        preload
        sizes="100vw"
      />
      <!-- 遮罩层 -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/60 pointer-events-none"></div>
      <div class="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 blur-3xl rounded-full"></div>
      <div class="absolute -bottom-40 -right-40 w-[28rem] h-[28rem] bg-white/10 dark:bg-white/5 blur-3xl rounded-full"></div>

      <!-- 文案内容 -->
      <div class="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 class="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-8 animate__animated animate__fadeIn">
          {{ $t('premiumBuildingMaterials') }}
        </h1>
        <p class="font-body text-lg sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-12 px-4 animate__animated animate__fadeIn animate__delay-1s">
          {{ $t('heroSubtitle') }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center animate__animated animate__fadeIn animate__delay-2s px-4">
          <NuxtLink :to="localePath('/products')" class="btn-primary text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-5">
            {{ $t('shopNow') }}
          </NuxtLink>
          <NuxtLink :to="localePath('/about')" class="btn-outline text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-5 border-white text-white hover:bg-white hover:text-primary">
            {{ $t('learnMore') }}
          </NuxtLink>
        </div>
      </div>
    </section>
    <section class="px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-16 relative z-10">
      <div class="max-w-6xl mx-auto backdrop-blur-md bg-white/10 dark:bg-white/5 rounded-xl px-4 sm:px-6 py-4 flex flex-wrap items-center justify-center gap-4">
        <span class="text-white/80 text-sm">{{ $t('trustedBy') }}</span>
        <div class="flex items-center gap-6">
          <Icon name="mdi:alpha-b-box" class="w-6 h-6 text-white/80" />
          <Icon name="mdi:alpha-c-box" class="w-6 h-6 text-white/80" />
          <Icon name="mdi:alpha-m-box" class="w-6 h-6 text-white/80" />
          <Icon name="mdi:alpha-x-box" class="w-6 h-6 text-white/80" />
        </div>
      </div>
    </section>

    <!-- 3个核心优势卡片 -->
    <section class="py-12 sm:py-16 bg-background-light dark:bg-background-dark">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8 sm:mb-12">
          {{ $t('ourKeyBenefits') }}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
          <!-- 优势卡片 1: Global Shipping -->
          <div 
            class="card text-center animate__animated animate__fadeInUp"
          >
            <div class="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-primary-50 dark:bg-primary-900 rounded-button mb-3 sm:mb-4 mx-auto">
              <Icon name="mdi:earth" class="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            </div>
            <h3 class="font-heading text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {{ $t('globalShipping') }}
            </h3>
            <p class="font-body text-sm sm:text-base text-gray-600 dark:text-gray-400">
              {{ $t('globalShippingDesc') }}
            </p>
          </div>

          <!-- 优势卡片 2: Real-time Inventory -->
          <div 
            class="card text-center animate__animated animate__fadeInUp animate__delay-1s"
          >
            <div class="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-primary-50 dark:bg-primary-900 rounded-button mb-4 mx-auto">
              <Icon name="mdi:database-sync" class="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            </div>
            <h3 class="font-heading text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {{ $t('realTimeInventory') }}
            </h3>
            <p class="font-body text-sm sm:text-base text-gray-600 dark:text-gray-400">
              {{ $t('realTimeInventoryDesc') }}
            </p>
          </div>

          <!-- 优势卡片 3: Easy Checkout -->
          <div 
            class="card text-center animate__animated animate__fadeInUp animate__delay-2s"
          >
            <div class="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-primary-50 dark:bg-primary-900 rounded-button mb-4 mx-auto">
              <Icon name="mdi:cart-check" class="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            </div>
            <h3 class="font-heading text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {{ $t('easyCheckout') }}
            </h3>
            <p class="font-body text-sm sm:text-base text-gray-600 dark:text-gray-400">
              {{ $t('easyCheckoutDesc') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-12 sm:py-16">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div class="grid grid-cols-2 gap-4">
            <NuxtImg src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&q=80" alt="a" class="rounded-xl w-full h-48 sm:h-56 object-cover" format="webp" />
            <NuxtImg src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80" alt="b" class="rounded-xl w-full h-48 sm:h-56 object-cover" format="webp" />
            <NuxtImg src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80" alt="c" class="rounded-xl w-full h-48 sm:h-56 object-cover" format="webp" />
            <NuxtImg src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&q=80" alt="d" class="rounded-xl w-full h-48 sm:h-56 object-cover" format="webp" />
          </div>
          <div>
            <h3 class="font-heading text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">{{ $t('buildWithConfidence') }}</h3>
            <p class="font-body text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-6">{{ $t('buildWithConfidenceDesc') }}</p>
            <div class="flex gap-4">
              <NuxtLink :to="localePath('/products')" class="btn-primary px-6 py-3">{{ $t('view') }}</NuxtLink>
              <NuxtLink :to="localePath('/about')" class="btn-outline px-6 py-3">{{ $t('learnMore') }}</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-12 sm:py-16">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-6 sm:mb-8">
          <h2 class="font-heading text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{{ $t('categories') }}</h2>
          <NuxtLink :to="localePath('/products')" class="btn-outline">{{ $t('view') }}</NuxtLink>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <NuxtLink :to="localePath('/products?materialType=Stone')" class="group relative overflow-hidden rounded-lg">
            <NuxtImg src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&q=80" alt="Stone" class="w-full h-48 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-300" format="webp" />
            <div class="absolute inset-0 bg-black/30"></div>
            <div class="absolute bottom-4 left-4 flex items-center gap-2 text-white">
              <Icon name="mdi:cube-outline" class="w-6 h-6" />
              <span class="font-heading text-xl">{{ $t('stone') }}</span>
            </div>
          </NuxtLink>
          <NuxtLink :to="localePath('/products?materialType=Wood')" class="group relative overflow-hidden rounded-lg">
            <NuxtImg src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80" alt="Wood" class="w-full h-48 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-300" format="webp" />
            <div class="absolute inset-0 bg-black/30"></div>
            <div class="absolute bottom-4 left-4 flex items-center gap-2 text-white">
              <Icon name="mdi:forest" class="w-6 h-6" />
              <span class="font-heading text-xl">{{ $t('wood') }}</span>
            </div>
          </NuxtLink>
          <NuxtLink :to="localePath('/products?materialType=Metal')" class="group relative overflow-hidden rounded-lg">
            <NuxtImg src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80" alt="Metal" class="w-full h-48 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-300" format="webp" />
            <div class="absolute inset-0 bg-black/30"></div>
            <div class="absolute bottom-4 left-4 flex items-center gap-2 text-white">
              <Icon name="mdi:tools" class="w-6 h-6" />
              <span class="font-heading text-xl">{{ $t('metal') }}</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="py-12 sm:py-16 bg-background-light dark:bg-background-dark">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-6 sm:mb-8">
          <h2 class="font-heading text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{{ $t('featured') }}</h2>
          <NuxtLink :to="localePath('/products')" class="btn-outline">{{ $t('view') }}</NuxtLink>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <ProductCard v-for="(p, i) in featuredProducts" :key="p.id" :product="p" class="animate__animated animate__fadeInUp" :style="{ animationDelay: `${i * 0.1}s` }" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const { getProducts } = useProducts()
const featuredProducts = computed(() => getProducts({}).slice(0, 8))
definePageMeta({
  title: 'Home - BuildCommerce',
  description: 'Premium Building Materials, Delivered Worldwide'
})
</script>

