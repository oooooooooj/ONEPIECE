<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <!-- 页面标题 -->
    <div class="mb-8 sm:mb-12">
      <h1 class="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
        {{ $t('myFavorites') }}
      </h1>
      <p class="font-body text-base sm:text-lg text-gray-600 dark:text-gray-400">
        {{ $t('favoritesDescription') }}
      </p>
    </div>

    <!-- 未登录提示 -->
    <div v-if="!isAuthenticated" class="card text-center py-12">
      <Icon name="mdi:heart-outline" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h2 class="font-heading text-xl font-semibold text-gray-900 dark:text-white mb-4">
        {{ $t('pleaseLoginToViewFavorites') }}
      </h2>
      <p class="font-body text-gray-600 dark:text-gray-400 mb-6">
        {{ $t('loginToSaveFavorites') }}
      </p>
      <div class="flex items-center justify-center gap-4">
        <NuxtLink to="/login" class="btn-primary">
          {{ $t('login') }}
        </NuxtLink>
        <NuxtLink to="/register" class="btn-outline">
          {{ $t('register') }}
        </NuxtLink>
      </div>
    </div>

    <!-- 收藏列表 -->
    <div v-else>
      <!-- 空状态 -->
      <div v-if="favoriteProducts.length === 0" class="card text-center py-12">
        <Icon name="mdi:heart-outline" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 class="font-heading text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {{ $t('noFavorites') }}
        </h2>
        <p class="font-body text-gray-600 dark:text-gray-400 mb-6">
          {{ $t('startAddingFavorites') }}
        </p>
        <NuxtLink to="/products" class="btn-primary">
          {{ $t('browseProducts') }}
        </NuxtLink>
      </div>

      <!-- 产品网格 -->
      <div v-else>
        <div class="mb-6 flex items-center justify-between">
          <p class="font-body text-sm text-gray-600 dark:text-gray-400">
            {{ $t('showing') }} <span class="font-semibold text-gray-900 dark:text-white">{{ favoriteProducts.length }}</span> {{ $t('favorites') }}
          </p>
          <button
            @click="clearAllFavorites"
            class="btn-outline text-sm"
            :disabled="clearingAll"
          >
            <Icon name="mdi:delete-sweep" class="w-4 h-4 mr-2" />
            {{ $t('clearAll') }}
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          <div
            v-for="(product, index) in favoriteProducts"
            :key="product.id"
            class="relative"
          >
            <!-- 移除按钮 -->
            <button
              @click="removeFromFavorites(product.id)"
              class="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
              :disabled="removingItems[product.id]"
            >
              <Icon 
                :name="removingItems[product.id] ? 'mdi:loading' : 'mdi:heart-remove'" 
                class="w-4 h-4 text-red-500"
                :class="{ 'animate-spin': removingItems[product.id] }"
              />
            </button>
            
            <ProductCard
              :product="product"
              class="animate__animated animate__fadeInUp"
              :style="{ animationDelay: `${index * 0.1}s` }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/composables/useProducts'
import { useAuth } from '~/composables/useAuth'

// 状态管理
const favoriteProducts = ref<Product[]>([])
const removingItems = ref<Record<number, boolean>>({})
const clearingAll = ref(false)

//  composables
const { isAuthenticated } = useAuth()
const { getProducts } = useProducts()

// 获取收藏的产品
const loadFavoriteProducts = () => {
  if (!isAuthenticated.value) return
  
  const favoriteIds = getFavoriteIds()
  const allProducts = getProducts({})
  favoriteProducts.value = allProducts.filter(product => favoriteIds.includes(product.id))
}

// 获取收藏ID列表
const getFavoriteIds = (): number[] => {
  if (process.client) {
    return JSON.parse(localStorage.getItem('favorites') || '[]')
  }
  return []
}

// 从收藏中移除
const removeFromFavorites = async (productId: number) => {
  removingItems.value[productId] = true
  
  try {
    // 从本地存储中移除
    const favorites = getFavoriteIds()
    const index = favorites.indexOf(productId)
    if (index > -1) {
      favorites.splice(index, 1)
      localStorage.setItem('favorites', JSON.stringify(favorites))
    }
    
    // 显示成功提示
    const { $toast } = useNuxtApp()
    $toast.success(t('removedFromFavorites'))
    
    // 重新加载收藏列表
    await nextTick()
    loadFavoriteProducts()
  } catch (error) {
    console.error('Failed to remove from favorites:', error)
    const { $toast } = useNuxtApp()
    $toast.error(t('removeFromFavoritesError'))
  } finally {
    removingItems.value[productId] = false
  }
}

// 清空所有收藏
const clearAllFavorites = async () => {
  if (!confirm(t('confirmClearAllFavorites'))) return
  
  clearingAll.value = true
  
  try {
    // 清空本地存储
    localStorage.setItem('favorites', JSON.stringify([]))
    
    // 显示成功提示
    const { $toast } = useNuxtApp()
    $toast.success(t('allFavoritesCleared'))
    
    // 重新加载收藏列表
    await nextTick()
    loadFavoriteProducts()
  } catch (error) {
    console.error('Failed to clear favorites:', error)
    const { $toast } = useNuxtApp()
    $toast.error(t('clearFavoritesError'))
  } finally {
    clearingAll.value = false
  }
}

// 页面元数据
definePageMeta({
  title: 'My Favorites - BuildCommerce',
  description: 'View and manage your favorite products'
})

// 初始化
onMounted(() => {
  loadFavoriteProducts()
})

// 监听认证状态变化
watch(isAuthenticated, (newValue) => {
  if (newValue) {
    loadFavoriteProducts()
  } else {
    favoriteProducts.value = []
  }
})
</script>