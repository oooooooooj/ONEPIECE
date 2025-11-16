<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <!-- 页面标题 -->
    <div class="mb-8 sm:mb-12">
      <h1 class="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
        {{ $t('products') }}
      </h1>
      <p class="font-body text-base sm:text-lg text-gray-600 dark:text-gray-400">
        {{ $t('featured') }}
      </p>
    </div>

    <div class="flex flex-col lg:flex-row gap-6 sm:gap-8">
      <!-- 筛选侧边栏 -->
      <aside class="lg:w-64 flex-shrink-0">
        <!-- 移动端筛选按钮 -->
        <button
          @click="mobileFilterOpen = !mobileFilterOpen"
          class="lg:hidden w-full mb-4 btn-outline flex items-center justify-center gap-2"
        >
          <Icon :name="mobileFilterOpen ? 'mdi:close' : 'mdi:filter'" class="w-5 h-5" />
          <span>{{ $t('filter') }}</span>
        </button>
        
        <div 
          :class="[
            'card',
            'lg:sticky lg:top-4',
            mobileFilterOpen ? 'block' : 'hidden lg:block'
          ]"
        >
          <h2 class="font-heading text-xl font-semibold text-gray-900 dark:text-white mb-6">
            {{ $t('filter') }}
          </h2>

          <!-- 材料类型筛选 -->
          <div class="mb-6">
            <h3 class="font-heading text-sm font-semibold text-gray-900 dark:text-white mb-3">
              {{ $t('materialType') }}
            </h3>
            <div class="space-y-2">
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="materialType"
                  value="All"
                  :checked="filters.materialType === 'All'"
                  @change="filters.materialType = 'All'"
                  class="w-4 h-4 text-primary focus:ring-primary"
                />
                <span class="font-body text-sm text-gray-700 dark:text-gray-300">{{ $t('allMaterials') }}</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="materialType"
                  value="Stone"
                  :checked="filters.materialType === 'Stone'"
                  @change="filters.materialType = 'Stone'"
                  class="w-4 h-4 text-primary focus:ring-primary"
                />
                <span class="font-body text-sm text-gray-700 dark:text-gray-300">{{ $t('stone') }}</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="materialType"
                  value="Wood"
                  :checked="filters.materialType === 'Wood'"
                  @change="filters.materialType = 'Wood'"
                  class="w-4 h-4 text-primary focus:ring-primary"
                />
                <span class="font-body text-sm text-gray-700 dark:text-gray-300">{{ $t('wood') }}</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="materialType"
                  value="Metal"
                  :checked="filters.materialType === 'Metal'"
                  @change="filters.materialType = 'Metal'"
                  class="w-4 h-4 text-primary focus:ring-primary"
                />
                <span class="font-body text-sm text-gray-700 dark:text-gray-300">{{ $t('metal') }}</span>
              </label>
            </div>
          </div>

          <!-- 价格区间筛选 -->
          <div class="mb-6">
            <h3 class="font-heading text-sm font-semibold text-gray-900 dark:text-white mb-3">
              {{ $t('priceRange') }}
            </h3>
            <div class="space-y-2">
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="priceRange"
                  value="All"
                  :checked="filters.priceRange === 'All'"
                  @change="filters.priceRange = 'All'"
                  class="w-4 h-4 text-primary focus:ring-primary"
                />
                <span class="font-body text-sm text-gray-700 dark:text-gray-300">{{ $t('allPrices') }}</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="priceRange"
                  value="0-500"
                  :checked="filters.priceRange === '0-500'"
                  @change="filters.priceRange = '0-500'"
                  class="w-4 h-4 text-primary focus:ring-primary"
                />
                <span class="font-body text-sm text-gray-700 dark:text-gray-300">$0 - $500</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="priceRange"
                  value="500-1000"
                  :checked="filters.priceRange === '500-1000'"
                  @change="filters.priceRange = '500-1000'"
                  class="w-4 h-4 text-primary focus:ring-primary"
                />
                <span class="font-body text-sm text-gray-700 dark:text-gray-300">$500 - $1000</span>
              </label>
            </div>
          </div>

          <!-- 颜色筛选 -->
          <div class="mb-6">
            <h3 class="font-heading text-sm font-semibold text-gray-900 dark:text-white mb-3">
              {{ $t('color') }}
            </h3>
            <div class="space-y-2">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="color" value="All" :checked="filters.color === 'All'" @change="filters.color = 'All'" class="w-4 h-4 text-primary focus:ring-primary" />
                <span class="font-body text-sm text-gray-700 dark:text-gray-300">{{ $t('allColors') }}</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="color" value="White" :checked="filters.color === 'White'" @change="filters.color = 'White'" class="w-4 h-4 text-primary focus:ring-primary" />
                <span class="font-body text-sm text-gray-700 dark:text-gray-300">{{ $t('white') }}</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="color" value="Black" :checked="filters.color === 'Black'" @change="filters.color = 'Black'" class="w-4 h-4 text-primary focus:ring-primary" />
                <span class="font-body text-sm text-gray-700 dark:text-gray-300">{{ $t('black') }}</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="color" value="Gray" :checked="filters.color === 'Gray'" @change="filters.color = 'Gray'" class="w-4 h-4 text-primary focus:ring-primary" />
                <span class="font-body text-sm text-gray-700 dark:text-gray-300">{{ $t('gray') }}</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="color" value="Brown" :checked="filters.color === 'Brown'" @change="filters.color = 'Brown'" class="w-4 h-4 text-primary focus:ring-primary" />
                <span class="font-body text-sm text-gray-700 dark:text-gray-300">{{ $t('brown') }}</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="color" value="Silver" :checked="filters.color === 'Silver'" @change="filters.color = 'Silver'" class="w-4 h-4 text-primary focus:ring-primary" />
                <span class="font-body text-sm text-gray-700 dark:text-gray-300">{{ $t('silver') }}</span>
              </label>
            </div>
          </div>

          <!-- 尺寸筛选 -->
          <div class="mb-6">
            <h3 class="font-heading text-sm font-semibold text-gray-900 dark:text-white mb-3">
              {{ $t('size') }}
            </h3>
            <div class="space-y-2">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="size" value="All" :checked="filters.size === 'All'" @change="filters.size = 'All'" class="w-4 h-4 text-primary focus:ring-primary" />
                <span class="font-body text-sm text-gray-700 dark:text-gray-300">{{ $t('allSizes') }}</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="size" value="S" :checked="filters.size === 'S'" @change="filters.size = 'S'" class="w-4 h-4 text-primary focus:ring-primary" />
                <span class="font-body text-sm text-gray-700 dark:text-gray-300">S</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="size" value="M" :checked="filters.size === 'M'" @change="filters.size = 'M'" class="w-4 h-4 text-primary focus:ring-primary" />
                <span class="font-body text-sm text-gray-700 dark:text-gray-300">M</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="size" value="L" :checked="filters.size === 'L'" @change="filters.size = 'L'" class="w-4 h-4 text-primary focus:ring-primary" />
                <span class="font-body text-sm text-gray-700 dark:text-gray-300">L</span>
              </label>
            </div>
          </div>

          <!-- 清除筛选按钮 -->
          <button
            @click="clearFilters"
            class="btn-outline w-full text-sm"
            v-if="hasActiveFilters"
          >
            {{ $t('clearFilters') }}
          </button>
        </div>
      </aside>

      <!-- 产品列表区域 -->
      <div class="flex-1">
        <!-- 结果统计 -->
        <div class="mb-6 flex items-center justify-between flex-wrap gap-4">
          <p class="font-body text-sm text-gray-600 dark:text-gray-400">
            {{ $t('showing') }} <span class="font-semibold text-gray-900 dark:text-white">{{ filteredProducts.length }}</span> {{ $t('results') }}
          </p>
          <div class="flex items-center gap-3">
            <label class="text-sm text-gray-600 dark:text-gray-400">{{ $t('sort') || 'Sort' }}</label>
            <select v-model="sortBy" class="rounded-button bg-gray-100 dark:bg-gray-700 text-sm px-3 py-2">
              <option value="relevance">{{ $t('featured') }}</option>
              <option value="price_asc">{{ $t('price') }} ↑</option>
              <option value="price_desc">{{ $t('price') }} ↓</option>
            </select>
            <label class="text-sm text-gray-600 dark:text-gray-400">{{ $t('showing') }}</label>
            <select v-model.number="itemsPerPage" class="rounded-button bg-gray-100 dark:bg-gray-700 text-sm px-3 py-2">
              <option :value="12">12</option>
              <option :value="24">24</option>
              <option :value="36">36</option>
            </select>
          </div>
        </div>

        <!-- 产品网格 -->
        <div v-if="paginatedProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <ProductCard
            v-for="(product, index) in paginatedProducts"
            :key="product.id"
            :product="product"
            class="animate__animated animate__fadeInUp"
            :style="{ animationDelay: `${index * 0.1}s` }"
          />
        </div>

        <!-- 无结果提示 -->
        <div v-else class="text-center py-12">
          <Icon name="mdi:package-variant-closed" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p class="font-body text-lg text-gray-600 dark:text-gray-400">
            {{ $t('noProductsFound') }}
          </p>
        </div>

        <!-- 分页器 -->
        <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 flex-wrap">
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-4 py-2 rounded-button bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {{ $t('previous') }}
          </button>

          <div class="flex items-center gap-2">
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="goToPage(page)"
              :class="[
                'px-4 py-2 rounded-button transition-colors',
                page === currentPage
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              ]"
            >
              {{ page }}
            </button>
          </div>

          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 rounded-button bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {{ $t('next') }}
          </button>
        </div>

        <!-- 分页信息 -->
        <div v-if="totalPages > 1" class="text-center mt-4">
          <p class="font-body text-sm text-gray-600 dark:text-gray-400">
            {{ $t('page') }} {{ currentPage }} {{ $t('of') }} {{ totalPages }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/composables/useProducts'

const route = useRoute()
const router = useRouter()
const localePath = useLocalePath()
const { getProducts } = useProducts()

// 移动端筛选面板状态
const mobileFilterOpen = ref(false)

const sortBy = ref<'relevance' | 'price_asc' | 'price_desc'>((route.query.sort as string) === 'price_asc' || (route.query.sort as string) === 'price_desc' ? (route.query.sort as 'price_asc' | 'price_desc') : 'relevance')
const itemsPerPage = ref(Math.min(36, Math.max(12, parseInt(route.query.pageSize as string) || 12)))

// 筛选状态
const filters = reactive({
  materialType: (route.query.materialType as string) || 'All',
  priceRange: (route.query.priceRange as string) || 'All',
  color: (route.query.color as string) || 'All',
  size: (route.query.size as string) || 'All'
})

// 当前页码
const currentPage = computed(() => {
  const page = parseInt(route.query.page as string) || 1
  return Math.max(1, page)
})

// 获取筛选后的产品
const filteredProducts = computed(() => {
  return getProducts({
    materialType: filters.materialType as 'Stone' | 'Wood' | 'Metal' | 'All',
    priceRange: filters.priceRange as '0-500' | '500-1000' | 'All',
    color: filters.color as 'White' | 'Black' | 'Gray' | 'Brown' | 'Silver' | 'All',
    size: filters.size as 'S' | 'M' | 'L' | 'All'
  })
})

const sortedProducts = computed(() => {
  const arr = [...filteredProducts.value]
  if (sortBy.value === 'price_asc') arr.sort((a, b) => a.price - b.price)
  else if (sortBy.value === 'price_desc') arr.sort((a, b) => b.price - a.price)
  return arr
})

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return sortedProducts.value.slice(start, end)
})

// 总页数
const totalPages = computed(() => {
  return Math.ceil(sortedProducts.value.length / itemsPerPage.value)
})

// 可见的页码（显示当前页及前后各2页）
const visiblePages = computed(() => {
  const pages: number[] = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - 2)
  let end = Math.min(totalPages.value, start + maxVisible - 1)
  
  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

// 是否有激活的筛选
const hasActiveFilters = computed(() => {
  return (
    filters.materialType !== 'All' ||
    filters.priceRange !== 'All' ||
    filters.color !== 'All' ||
    filters.size !== 'All'
  )
})

// 清除筛选
const clearFilters = () => {
  filters.materialType = 'All'
  filters.priceRange = 'All'
  filters.color = 'All'
  filters.size = 'All'
  goToPage(1)
}

// 跳转到指定页
const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  
  router.push({
    query: {
      ...route.query,
      page: page.toString(),
      materialType: filters.materialType,
      priceRange: filters.priceRange,
      sort: sortBy.value,
      pageSize: String(itemsPerPage.value)
    }
  })
  
  // 滚动到顶部
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 监听筛选变化，重置到第一页
watch([() => filters.materialType, () => filters.priceRange, () => filters.color, () => filters.size], () => {
  if (currentPage.value !== 1) {
    goToPage(1)
  } else {
    // 更新URL但不刷新页面
    router.push(localePath({
      query: {
        ...route.query,
        materialType: filters.materialType,
        priceRange: filters.priceRange,
        color: filters.color,
        size: filters.size,
        page: '1',
        sort: sortBy.value,
        pageSize: String(itemsPerPage.value)
      }
    }))
  }
})

watch(sortBy, () => {
  goToPage(1)
})

watch(itemsPerPage, (val) => {
  const normalized = [12, 24, 36].includes(val) ? val : 12
  itemsPerPage.value = normalized
  goToPage(1)
})

// 页面元数据 - 使用Nuxt 3原生方式
definePageMeta({
  title: 'Products - BuildCommerce',
  description: 'Browse our premium building materials catalog'
})
</script>
