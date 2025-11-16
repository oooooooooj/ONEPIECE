<template>
  <div>
    <section class="relative h-[50vh] sm:h-[60vh] flex items-center justify-center overflow-hidden">
      <NuxtImg src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&q=80" alt="News" class="absolute inset-0 w-full h-full object-cover" preset="newsHero" loading="eager" preload placeholder="blur" sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px" />
      <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60"></div>
      <div class="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <h1 class="font-heading text-4xl sm:text-5xl font-bold text-white mb-4 drop-shadow-lg">{{ $t('news') }}</h1>
        <p class="font-body text-lg sm:text-xl text-white/95 drop-shadow-md">{{ $t('promotionsEvents') }}</p>
      </div>
    </section>

    <section class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 sm:mb-10">
        <div class="flex items-center gap-3 w-full sm:w-auto">
          <Icon name="mdi:magnify" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <input v-model.trim="query" :placeholder="$t('search')" class="flex-1 rounded-button bg-gray-100 dark:bg-gray-700 px-4 py-3 text-base focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-600" />
        </div>
        <div class="flex items-center gap-4">
          <div class="hidden sm:flex items-center gap-2">
            <button @click="sortBy = 'newest'" :class="['px-4 py-2 rounded-button text-sm font-semibold transition-all duration-200', sortBy === 'newest' ? 'bg-primary text-white shadow-md hover:shadow-lg' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-sm']">{{ $t('newest') }}</button>
            <button @click="sortBy = 'oldest'" :class="['px-4 py-2 rounded-button text-sm font-semibold transition-all duration-200', sortBy === 'oldest' ? 'bg-primary text-white shadow-md hover:shadow-lg' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-sm']">{{ $t('oldest') }}</button>
          </div>
          <label class="text-sm text-gray-600 dark:text-gray-400 font-semibold">{{ $t('page') }}</label>
          <select v-model.number="itemsPerPage" class="rounded-button bg-gray-100 dark:bg-gray-700 text-sm px-3 py-2 font-semibold focus:ring-2 focus:ring-primary transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-600">
            <option :value="6">6</option>
            <option :value="9">9</option>
            <option :value="12">12</option>
          </select>
        </div>
      </div>

      <div v-if="pending" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div v-for="i in 6" :key="i" class="card animate-pulse">
          <div class="h-44 bg-gray-200 dark:bg-gray-700 rounded-t-lg"></div>
          <div class="p-5">
            <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
          </div>
        </div>
      </div>

      <div v-else-if="paginatedPosts.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div v-for="post in paginatedPosts" :key="post.id" class="card overflow-hidden group relative z-10">
          <div class="relative h-44 bg-gray-100 dark:bg-gray-700 rounded-t-lg overflow-hidden">
            <NuxtImg src="https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80" alt="cover" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" placeholder="blur" sizes="(max-width: 640px) 100vw, 50vw" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span class="text-xs px-2 py-1 rounded-full bg-white/90 dark:bg-gray-800/90 text-primary font-bold shadow-md backdrop-blur-sm">{{ $t('news') }}</span>
              <span class="text-xs text-white font-semibold bg-black/60 px-2 py-1 rounded backdrop-blur-sm">{{ new Date(post.date).toLocaleDateString() }}</span>
            </div>
          </div>
          <div class="p-5 sm:p-6 bg-white dark:bg-gray-800">
            <h2 class="font-heading text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">{{ post.title }}</h2>
            <p class="font-body text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-5 leading-relaxed">{{ post.excerpt }}</p>
            <NuxtLink :to="post.link || '#'" class="btn-primary px-4 py-2 text-sm font-semibold hover:shadow-md transition-all duration-200">{{ $t('view') }}</NuxtLink>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-16">
        <Icon name="mdi:newspaper-variant-outline" class="w-20 h-20 text-gray-400 mx-auto mb-6" />
        <h3 class="font-heading text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">{{ $t('noNewsAvailable') }}</h3>
        <p class="font-body text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto leading-relaxed">{{ $t('noNewsFound') || '没有找到相关资讯，请尝试其他搜索关键词' }}</p>
      </div>

      <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 flex-wrap mt-10">
        <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1" class="px-4 py-2 rounded-button bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all duration-200 hover:shadow-sm">
          <Icon name="mdi:chevron-left" class="w-4 h-4" />
          {{ $t('previous') }}
        </button>
        <div class="flex items-center gap-2">
          <button v-for="page in visiblePages" :key="page" @click="goToPage(page)" :class="['px-4 py-2 rounded-button transition-all duration-200 font-semibold min-w-[40px] hover:shadow-sm', page === currentPage ? 'bg-primary text-white shadow-md hover:shadow-lg' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600']">
            {{ page }}
          </button>
        </div>
        <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages" class="px-4 py-2 rounded-button bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all duration-200 hover:shadow-sm">
          {{ $t('next') }}
          <Icon name="mdi:chevron-right" class="w-4 h-4" />
        </button>
      </div>
    </section>

    <section class="bg-background-light dark:bg-background-dark py-12 sm:py-16 mt-12 relative z-20">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-heading text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 sm:mb-10">{{ $t('promotionsEvents') }}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div v-for="item in examples" :key="item.id" class="card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-gray-800 relative z-10">
            <div class="p-6">
              <div class="flex items-center justify-between mb-4">
                <span class="text-xs font-bold uppercase text-primary bg-primary/10 px-3 py-1.5 rounded-full">{{ item.type }}</span>
                <span class="text-sm text-gray-500 dark:text-gray-400 font-semibold">{{ item.date }}</span>
              </div>
              <h3 class="font-heading text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">{{ item.title }}</h3>
              <p class="font-body text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-5 leading-relaxed">{{ item.description }}</p>
              <NuxtLink :to="localePath(item.link)" class="btn-primary px-4 py-2 text-sm font-medium hover:shadow-md transition-all duration-200">{{ item.action }}</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
const localePath = useLocalePath()
const config = useRuntimeConfig()
const route = useRoute()
const router = useRouter()
const url = config.public?.wpBaseUrl ? `${config.public.wpBaseUrl}/wp-json/wp/v2/posts?per_page=20&_fields=id,title,excerpt,link,date` : ''
const { data, pending } = await useFetch(url, { default: () => [], immediate: !!url })

// 添加一些建材行业的新闻样例
const samplePosts = [
  {
    id: 1,
    title: '2024年建筑行业趋势：绿色建材需求持续增长',
    excerpt: '随着环保意识提升，越来越多的建筑项目开始采用可持续建材。专家预测绿色建材市场将在未来五年内翻倍...',
    link: '/news/1',
    date: '2024-11-15T10:00:00Z'
  },
  {
    id: 2,
    title: '新型保温材料技术突破，节能效果提升30%',
    excerpt: '最新研发的纳米保温材料在保持相同厚度的情况下，保温性能比传统材料提升30%，预计明年投入量产...',
    link: '/news/2',
    date: '2024-11-12T14:30:00Z'
  },
  {
    id: 3,
    title: '钢材价格走势分析：建筑成本或面临上涨压力',
    excerpt: '受国际市场影响，建筑钢材价格近期呈现上涨趋势。专家建议大型工程项目提前锁定材料价格，控制成本风险...',
    link: '/news/3',
    date: '2024-11-10T09:15:00Z'
  },
  {
    id: 4,
    title: '智能家居与建材融合，开启智慧建筑新时代',
    excerpt: '智能传感器、自修复材料等新技术正在改变传统建筑业。未来建筑将具备自我调节、环境监测等功能...',
    link: '/news/4',
    date: '2024-11-08T16:45:00Z'
  },
  {
    id: 5,
    title: '建材电商平台发展迅速，传统采购模式面临变革',
    excerpt: '数字化采购平台为建筑行业带来更高效的材料采购体验。线上下单、快速配送成为新常态...',
    link: '/news/5',
    date: '2024-11-05T11:20:00Z'
  }
]

const rawPosts = computed(() => {
  const basePosts = Array.isArray(data.value) ? (data.value as any[]) : []
  // 如果没有获取到WordPress数据，使用样例数据
  return basePosts.length > 0 ? basePosts : samplePosts
})

const mappedPosts = computed(() => rawPosts.value.map((p: any) => ({
  id: p.id,
  title: typeof p.title === 'object' ? p.title.rendered : p.title,
  excerpt: typeof p.excerpt === 'object' ? p.excerpt.rendered?.replace(/<[^>]+>/g, '') : p.excerpt,
  link: p.link,
  date: p.date
})))

const query = ref((route.query.q as string) || '')
const sortBy = ref<'newest' | 'oldest'>(((route.query.sort as string) === 'oldest') ? 'oldest' : 'newest')
const itemsPerPage = ref(Math.min(12, Math.max(6, parseInt(route.query.pageSize as string) || 6)))
const currentPage = computed(() => Math.max(1, parseInt(route.query.page as string) || 1))

const filtered = computed(() => {
  const base = mappedPosts.value
  const q = query.value.trim().toLowerCase()
  const list = q ? base.filter(p => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)) : base
  return list.sort((a, b) => sortBy.value === 'newest' ? (new Date(b.date).getTime() - new Date(a.date).getTime()) : (new Date(a.date).getTime() - new Date(b.date).getTime()))
})

const totalPages = computed(() => Math.ceil(filtered.value.length / itemsPerPage.value))
const visiblePages = computed(() => {
  const arr: number[] = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - 2)
  let end = Math.min(totalPages.value, start + maxVisible - 1)
  if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1)
  for (let i = start; i <= end; i++) arr.push(i)
  return arr
})

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filtered.value.slice(start, end)
})

const goToPage = (page: number) => {
  const p = Math.min(Math.max(1, page), totalPages.value || 1)
  router.push(localePath({ query: { ...route.query, page: String(p), q: query.value, sort: sortBy.value, pageSize: String(itemsPerPage.value) } }))
  if (process.client) window.scrollTo({ top: 0, behavior: 'smooth' })
}

watch([query, sortBy, itemsPerPage], () => {
  goToPage(1)
})

const { t } = useI18n()
const examples = computed(() => ([
  {
    id: 'promo-1',
    type: t('promotion'),
    title: t('blackFridayTitle'),
    description: t('blackFridayDesc'),
    date: t('blackFridayDate'),
    action: t('shopNow'),
    link: '/products'
  },
  {
    id: 'event-1',
    type: t('event'),
    title: t('contractorMeetupTitle'),
    description: t('contractorMeetupDesc'),
    date: t('contractorMeetupDate'),
    action: t('register'),
    link: '/register'
  },
  {
    id: 'promo-2',
    type: t('promotion'),
    title: t('holidayBundleTitle'),
    description: t('holidayBundleDesc'),
    date: t('holidayBundleDate'),
    action: t('viewBundles'),
    link: '/products'
  },
  {
    id: 'news-1',
    type: t('news'),
    title: t('steelPriceTitle'),
    description: t('steelPriceDesc'),
    date: t('steelPriceDate'),
    action: t('learnMore'),
    link: '/products?materialType=Metal'
  },
  {
    id: 'event-2',
    type: t('event'),
    title: t('greenBuildingTitle'),
    description: t('greenBuildingDesc'),
    date: t('greenBuildingDate'),
    action: t('register'),
    link: '/register'
  },
  {
    id: 'news-2',
    type: t('news'),
    title: t('cementSupplyTitle'),
    description: t('cementSupplyDesc'),
    date: t('cementSupplyDate'),
    action: t('learnMore'),
    link: '/products?materialType=Stone'
  }
]))
definePageMeta({
  title: 'News - BuildCommerce',
  description: 'Latest news and updates'
})
</script>