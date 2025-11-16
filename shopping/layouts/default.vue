<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-200">
    <!-- 购物车弹窗通知 -->
    <div 
      v-if="isCartOpen && cart.length > 0"
      class="fixed top-20 right-4 left-4 sm:right-4 sm:left-auto z-40 w-full sm:w-auto max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 animate__animated animate__fadeInRight pointer-events-none"
      style="animation-duration: 0.3s"
    >
      <div class="pointer-events-auto">
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex justify-between items-center">
          <h3 class="font-heading text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Icon name="mdi:check-circle" class="w-5 h-5 text-green-500" />
            {{ $t('addedToCart') }}
          </h3>
          <button 
            @click="closeCart"
            class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            aria-label="Close"
          >
            <Icon name="mdi:close" class="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div class="max-h-96 overflow-y-auto">
        <div 
          v-for="item in cart" 
          :key="item.product.id"
          class="p-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
        >
          <div class="flex items-center space-x-3">
            <div class="flex-shrink-0 w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
              <NuxtImg 
                :src="item.product.image" 
                :alt="item.product.name"
                class="w-full h-full object-cover"
                format="webp"
                quality="80"
                sizes="64px"
                preset="thumbnail"
              />
            </div>
            <div class="flex-grow min-w-0">
              <h4 class="font-heading text-sm font-medium text-gray-900 dark:text-white truncate">
                {{ item.product.name }}
              </h4>
              <p class="font-body text-sm text-gray-500 dark:text-gray-400">
                ${{ item.product.price.toFixed(2) }} × {{ item.quantity }}
              </p>
              <p class="font-body font-semibold text-primary">
                ${{ (item.product.price * item.quantity).toFixed(2) }}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="p-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex justify-between items-center mb-3">
          <span class="font-body text-gray-600 dark:text-gray-400">
            {{ $t('total') }} ({{ cartItemCount }} {{ $t('items') }}):
          </span>
          <span class="font-body font-bold text-lg text-gray-900 dark:text-white">
            ${{ cartTotal.toFixed(2) }}
          </span>
        </div>
        <div class="flex gap-2">
          <button 
            @click="closeCart"
            class="btn-outline flex-1"
          >
            {{ $t('continueShopping') }}
          </button>
          <NuxtLink 
            :to="localePath('/cart')" 
            class="btn-primary flex-1 text-center"
            @click="closeCart"
          >
            {{ $t('checkout') }}
          </NuxtLink>
        </div>
      </div>
      </div>
    </div>

    <!-- 导航栏 -->
    <header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 relative z-50">
      <nav class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <div class="flex items-center gap-2">
            <Icon name="mdi:store" class="w-8 h-8 text-primary" />
            <span class="text-xl font-heading font-bold text-gray-900 dark:text-white">
              BuildCommerce
            </span>
          </div>

          <!-- 导航菜单 - 桌面端 -->
          <div class="hidden md:flex items-center gap-6">
            <NuxtLink :to="localePath('/')" class="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors uppercase">
              {{ $t('home') }}
            </NuxtLink>
            <NuxtLink :to="localePath('/products')" class="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors uppercase">
              {{ $t('products') }}
            </NuxtLink>
            <NuxtLink :to="localePath('/about')" class="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors uppercase">
              {{ $t('about') }}
            </NuxtLink>
            <NuxtLink :to="localePath('/contact')" class="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors uppercase">
              {{ $t('contact') }}
            </NuxtLink>
            <NuxtLink :to="localePath('/news')" class="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors uppercase">
              {{ $t('news') }}
            </NuxtLink>

            <!-- 去重：保留一组导航链接，其余重复块移除以稳定DOM -->
          </div>

          <!-- 移动端菜单按钮 -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-2 rounded-button bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            aria-label="Toggle menu"
          >
            <Icon :name="mobileMenuOpen ? 'mdi:close' : 'mdi:menu'" class="w-6 h-6" />
          </button>

          <!-- 右侧操作 -->
          <div class="hidden md:flex items-center gap-4">

            <div 
              class="relative"
              @mouseenter="openLang"
              @mouseleave="closeLang"
              ref="langMenuRef"
            >
              <button
                @click="toggleLang"
              class="h-10 px-3 rounded-button bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-1"
                aria-haspopup="menu"
                :aria-expanded="isLangMenuOpen"
              >
                {{ $t('language') }}
                <Icon name="mdi:chevron-down" class="w-4 h-4" />
              </button>
              <div 
                v-show="isLangMenuOpen"
                class="absolute right-0 mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-button shadow-md py-1"
                role="menu"
                @mouseenter="onMenuEnter"
                @mouseleave="onMenuLeave"
              >
                <button @click="changeLocale('en')" class="w-full text-left px-3 py-2 text-sm rounded-button hover:bg-gray-100 dark:hover:bg-gray-700">EN</button>
                <button @click="changeLocale('zh-TW')" class="w-full text-left px-3 py-2 text-sm rounded-button hover:bg-gray-100 dark:hover:bg-gray-700">TW</button>
                <button @click="changeLocale('zh')" class="w-full text-left px-3 py-2 text-sm rounded-button hover:bg-gray-100 dark:hover:bg-gray-700">CN</button>
              </div>
            </div>

            <!-- 暗色模式切换 -->
            <button
              @click="toggleDarkMode"
              class="h-10 w-10 flex items-center justify-center rounded-button bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              :aria-label="$t(isDark ? 'lightMode' : 'darkMode')"
            >
              <ClientOnly>
                <template #default>
                  <Icon :name="isDark ? 'mdi:weather-sunny' : 'mdi:weather-night'" class="w-5 h-5" />
                </template>
              </ClientOnly>
            </button>

            <!-- 购物车图标 -->
            <NuxtLink
              :to="localePath('/cart')"
              class="h-10 px-3 rounded-button bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors relative flex items-center gap-2"
              :aria-label="$t('cart')"
            >
              <Icon name="mdi:cart" class="w-5 h-5" />
              <span class="hidden sm:inline text-sm font-medium">{{ $t('cart') }}</span>
              <ClientOnly>
                <template #default>
                  <span 
                    v-if="cartItemCount > 0"
                    class="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {{ cartItemCount }}
                  </span>
                </template>
              </ClientOnly>
            </NuxtLink>

            <!-- 收藏图标（移动到购物车右侧） -->
            <NuxtLink
              :to="localePath('/favorites')"
              class="h-10 w-10 flex items-center justify-center rounded-button bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors relative"
              :aria-label="$t('myFavorites')"
            >
              <Icon name="mdi:heart" class="w-5 h-5" />
              <ClientOnly>
                <template #default>
                  <span 
                    v-if="favoriteCount > 0"
                    class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {{ favoriteCount }}
                  </span>
                </template>
              </ClientOnly>
            </NuxtLink>

            <!-- 用户图标/登出按钮 -->
            <ClientOnly>
              <template #default>
                <button
                  v-if="isLoggedIn"
                  @click="logout"
                  class="h-10 w-10 flex items-center justify-center rounded-button bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  :aria-label="$t('logout')"
                >
                  <Icon name="mdi:logout" class="w-5 h-5" />
                </button>
                <NuxtLink
                  v-else
                  :to="localePath('/login')"
                  class="h-10 w-10 flex items-center justify-center rounded-button bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  :aria-label="$t('login')"
                >
                  <Icon name="mdi:account" class="w-5 h-5" />
                </NuxtLink>
              </template>
            </ClientOnly>
          </div>
        </div>
      </nav>

          <!-- 移动端菜单 -->
      <div 
        v-if="mobileMenuOpen"
        class="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
      >
        <div class="container mx-auto px-4 py-4 space-y-2">
          <NuxtLink 
            :to="localePath('/')" 
            class="block px-4 py-2 rounded-button text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors uppercase"
            @click="mobileMenuOpen = false"
          >
            {{ $t('home') }}
          </NuxtLink>
          <NuxtLink 
            :to="localePath('/products')" 
            class="block px-4 py-2 rounded-button text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors uppercase"
            @click="mobileMenuOpen = false"
          >
            {{ $t('products') }}
          </NuxtLink>
          <NuxtLink 
            :to="localePath('/about')" 
            class="block px-4 py-2 rounded-button text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors uppercase"
            @click="mobileMenuOpen = false"
          >
            {{ $t('about') }}
          </NuxtLink>
          <NuxtLink 
            :to="localePath('/contact')" 
            class="block px-4 py-2 rounded-button text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors uppercase"
            @click="mobileMenuOpen = false"
          >
            {{ $t('contact') }}
          </NuxtLink>
          <NuxtLink 
            :to="localePath('/news')" 
            class="block px-4 py-2 rounded-button text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors uppercase"
            @click="mobileMenuOpen = false"
          >
            {{ $t('news') }}
          </NuxtLink>
          <!-- 移动端Admin菜单项，仅对已登录用户可见 -->
          <ClientOnly>
            <template #default>
              <NuxtLink 
                v-if="isLoggedIn" 
                :to="localePath('/admin')" 
                class="block px-4 py-2 rounded-button text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                @click="mobileMenuOpen = false"
              >
                {{ $t('admin') }}
              </NuxtLink>
              <NuxtLink 
                v-if="isLoggedIn" 
                :to="localePath('/orders')" 
                class="block px-4 py-2 rounded-button text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors uppercase"
                @click="mobileMenuOpen = false"
              >
                {{ $t('orders') }}
              </NuxtLink>
              <NuxtLink 
                v-if="isAdminUser" 
                :to="localePath('/reports/sales')" 
                class="block px-4 py-2 rounded-button text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors uppercase"
                @click="mobileMenuOpen = false"
              >
                {{ $t('reports') }}
              </NuxtLink>
            </template>
          </ClientOnly>
          <!-- 去重：移除重复的移动端Reports链接 -->
          
          <div class="py-2 px-4">
            <button
              @click="toggleLangMobile"
              class="w-full px-3 py-2 rounded-button bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-between"
              aria-haspopup="menu"
              :aria-expanded="isLangMobileOpen"
            >
              <span>{{ $t('language') }}</span>
              <Icon :name="isLangMobileOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'" class="w-4 h-4" />
            </button>
            <div v-show="isLangMobileOpen" class="mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-button shadow-md p-1 space-y-1">
              <button @click="changeLocale('en')" class="w-full px-3 py-2 rounded-button text-left bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">EN</button>
              <button @click="changeLocale('zh-TW')" class="w-full px-3 py-2 rounded-button text-left bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">TW</button>
              <button @click="changeLocale('zh')" class="w-full px-3 py-2 rounded-button text-left bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">CN</button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- 主内容 -->
    <main>
      <slot />
    </main>

    <!-- 页脚 -->
    <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-8 sm:mt-12">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              BuildCommerce
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              {{ $t('premiumBuildingMaterials') }}
            </p>
          </div>
          <div>
            <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase">
              {{ $t('categories') }}
            </h4>
            <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>{{ $t('featured') }}</li>
              <li>{{ $t('newArrivals') }}</li>
              <li>{{ $t('bestSellers') }}</li>
            </ul>
          </div>
          <div>
            <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase">
              {{ $t('help') }}
            </h4>
            <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>{{ $t('faq') }}</li>
              <li>{{ $t('shippingPolicy') }}</li>
              <li>{{ $t('returnPolicy') }}</li>
            </ul>
          </div>
          <div>
            <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase">
              {{ $t('contact') }}
            </h4>
            <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>{{ $t('support') }}</li>
              <li>{{ $t('privacyPolicy') }}</li>
              <li>{{ $t('termsOfService') }}</li>
            </ul>
          </div>
        </div>
        <!-- 社交媒体图标 -->
        <div class="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700">
          <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ $t('followUs') }}:</span>
              <div class="flex items-center gap-3">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="w-10 h-10 flex items-center justify-center rounded-button bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Icon name="mdi:facebook" class="w-5 h-5" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="w-10 h-10 flex items-center justify-center rounded-button bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <Icon name="mdi:twitter" class="w-5 h-5" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="w-10 h-10 flex items-center justify-center rounded-button bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Icon name="mdi:instagram" class="w-5 h-5" />
                </a>
              </div>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              © 2024 BuildCommerce
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useColorMode } from '#imports'
import { useCart } from '~/composables/useCart'
import { useAuth } from '~/composables/useAuth'
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSwitchLocalePath, useLocalePath } from '#i18n'
import { navigateTo } from '#app'

const colorMode = useColorMode()
const mobileMenuOpen = ref(false)
const { cart, isCartOpen, cartTotal, cartItemCount, closeCart } = useCart()
const { isAuthenticated: isLoggedIn, isAdmin: isAdminUser, logout } = useAuth()
const { locale, setLocale } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const selectedLocale = ref<string>(locale.value as string)
watch(locale, (val) => { selectedLocale.value = val as string })
const onLocaleChange = () => {
  const target = selectedLocale.value
  const path = switchLocalePath(target)
  setLocale(target)
  if (path) navigateTo(path)
}
const isLangMenuOpen = ref(false)
const isLangMobileOpen = ref(false)
const isLangPinned = ref(false)
const langMenuRef = ref<HTMLElement | null>(null)
const toggleLang = () => {
  if (isLangPinned.value) {
    isLangPinned.value = false
    isLangMenuOpen.value = false
  } else {
    isLangPinned.value = true
    isLangMenuOpen.value = true
  }
}
const isLangHoverMenu = ref(false)
const openLang = () => { if (!isLangPinned.value) isLangMenuOpen.value = true }
let hoverCloseTimer: number | null = null
const closeLang = () => {
  if (hoverCloseTimer) { clearTimeout(hoverCloseTimer); hoverCloseTimer = null }
  hoverCloseTimer = window.setTimeout(() => {
    if (!isLangPinned.value && !isLangHoverMenu.value) isLangMenuOpen.value = false
  }, 160)
}
const onMenuEnter = () => {
  isLangHoverMenu.value = true
  if (hoverCloseTimer) { clearTimeout(hoverCloseTimer); hoverCloseTimer = null }
  isLangMenuOpen.value = true
}
const onMenuLeave = () => { isLangHoverMenu.value = false; if (!isLangPinned.value) isLangMenuOpen.value = false }
const toggleLangMobile = () => { isLangMobileOpen.value = !isLangMobileOpen.value }
const changeLocale = (code: string) => {
  selectedLocale.value = code
  onLocaleChange()
  isLangMenuOpen.value = false
  isLangMobileOpen.value = false
  isLangPinned.value = false
}
let onDocClick: ((e: MouseEvent) => void) | null = null
onMounted(() => {
  if (process.client) {
    onDocClick = (e: MouseEvent) => {
      if (!isLangPinned.value) return
      const el = langMenuRef.value
      if (el && !el.contains(e.target as Node)) {
        isLangPinned.value = false
        isLangMenuOpen.value = false
      }
    }
    document.addEventListener('click', onDocClick)
  }
})
onUnmounted(() => {
  if (onDocClick) document.removeEventListener('click', onDocClick)
})

// 收藏数量计算
const favoriteCount = computed(() => {
  if (process.client) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    return favorites.length
  }
  return 0
})

// 开发环境下自动登录以测试
onMounted(() => {
  // autoLogin() // 移除不存在的函数调用
})

const isDark = computed(() => colorMode.value === 'dark')

const toggleDarkMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<style scoped>
.router-link-active {
  @apply text-primary font-semibold;
}
</style>