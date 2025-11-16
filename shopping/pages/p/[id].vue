<template>
  <div class="min-h-screen">
    <div v-if="product" class="relative">
      <nav aria-label="Breadcrumb" class="absolute top-4 left-4 z-20">
        <ol class="flex items-center gap-2 text-sm text-white/90 backdrop-blur-md bg-black/10 px-4 py-2 rounded-full border border-white/20">
          <li>
            <NuxtLink :to="localePath('/')" class="hover:text-white transition-all duration-300 hover:scale-105">{{ $t('home') }}</NuxtLink>
          </li>
          <li class="text-white/60">/</li>
          <li>
            <NuxtLink :to="localePath('/products')" class="hover:text-white transition-all duration-300 hover:scale-105">{{ $t('products') }}</NuxtLink>
          </li>
          <li class="text-white/60">/</li>
          <li class="text-white font-medium">{{ product.name }}</li>
        </ol>
      </nav>

      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
          <div class="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
            <div class="absolute top-16 right-16 w-56 h-56 bg-primary/10 rounded-full blur-3xl"></div>
            <div class="absolute bottom-16 left-16 w-40 h-40 bg-accent/10 rounded-full blur-2xl"></div>
            
            <div class="relative h-full flex items-center justify-center p-6 lg:p-8">
              <div class="w-full max-w-2xl">
                <div class="relative group">
                  <div class="aspect-square rounded-2xl overflow-hidden bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 shadow-xl shadow-gray-200/30 dark:shadow-gray-900/30">
                    <NuxtImg :src="gallery[activeIndex]" :alt="product.name" 
                             class="w-full h-full object-contain p-6 transition-all duration-700 group-hover:scale-105" 
                             format="webp" quality="95" loading="eager" />
                  </div>
                  <div class="absolute -bottom-16 left-0 right-0 flex justify-center gap-3 mt-6">
                    <button v-for="(img,idx) in gallery" :key="idx" 
                            @click="activeIndex = idx" 
                            :class="['w-16 h-16 rounded-lg overflow-hidden transition-all duration-300 backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 border border-white/30 dark:border-gray-700/30 hover:bg-white/50 dark:hover:bg-gray-700/50', 
                                     activeIndex === idx ? 'ring-2 ring-primary scale-110 shadow-lg' : 'opacity-70 hover:opacity-100 hover:scale-105']">
                      <NuxtImg :src="img" :alt="product.name" class="w-full h-full object-cover p-1.5" format="webp" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-950 relative overflow-hidden">
            <div class="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl"></div>
            <div class="h-full flex flex-col justify-center px-6 lg:px-10 xl:px-12 py-8 lg:py-10 relative">
              <div class="space-y-6">
                <div class="space-y-4">
                  <div class="flex items-end gap-3">
                    <span class="text-4xl lg:text-5xl font-thin text-gray-900 dark:text-white tracking-tight">${{ product.price.toFixed(2) }}</span>
                    <div class="flex items-center gap-1.5 pb-1">
                      <div class="flex items-center">
                        <Icon name="mdi:star" class="w-4 h-4 text-yellow-400" />
                      </div>
                      <span class="text-sm font-medium text-gray-600 dark:text-gray-400">{{ averageRating }}</span>
                      <span class="text-sm text-gray-500 dark:text-gray-500">({{ totalReviews }} {{ $t('reviews') }})</span>
                    </div>
                  </div>
                  
                  <div class="space-y-3">
                    <h1 class="text-3xl lg:text-4xl font-light text-gray-900 dark:text-white leading-tight tracking-tight">
                      {{ product.name }}
                    </h1>
                    
                    <p class="text-lg text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                      {{ descriptionText }}
                    </p>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div class="group">
                    <span class="text-sm text-gray-500 dark:text-gray-500 font-medium tracking-wide">{{ $t('materialType') }}</span>
                    <p class="text-base text-gray-900 dark:text-white font-light mt-0.5 group-hover:text-primary transition-colors">{{ $t(product.materialType.toLowerCase()) }}</p>
                  </div>
                  <div class="group">
                    <span class="text-sm text-gray-500 dark:text-gray-500 font-medium tracking-wide">{{ $t('color') }}</span>
                    <p class="text-base text-gray-900 dark:text-white font-light mt-0.5 group-hover:text-primary transition-colors">{{ product.attributes?.color }}</p>
                  </div>
                  <div class="group">
                    <span class="text-sm text-gray-500 dark:text-gray-500 font-medium tracking-wide">{{ $t('size') }}</span>
                    <p class="text-base text-gray-900 dark:text-white font-light mt-0.5 group-hover:text-primary transition-colors">{{ product.attributes?.size }}</p>
                  </div>
                  <div class="group">
                    <span class="text-sm text-gray-500 dark:text-gray-500 font-medium tracking-wide">{{ $t('sku') }}</span>
                    <p class="text-base text-gray-900 dark:text-white font-light mt-0.5 group-hover:text-primary transition-colors">{{ product.sku }}</p>
                  </div>
                </div>

                <div class="border-t border-gray-200 dark:border-gray-800 pt-6">
                  <div class="flex items-center gap-5 mb-6">
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300 tracking-wide">{{ $t('quantity') }}</label>
                    <div class="flex items-center gap-3">
                      <button @click="quantity = Math.max(1, quantity - 1)" 
                              class="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-all duration-300 hover:scale-110">
                        <Icon name="mdi:minus" class="w-4 h-4" />
                      </button>
                      <span class="w-12 text-center font-semibold text-lg">{{ quantity }}</span>
                      <button @click="quantity++" 
                              class="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-all duration-300 hover:scale-110">
                        <Icon name="mdi:plus" class="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div class="flex gap-3">
                    <button @click="handleAddToCart" 
                            class="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white h-14 rounded-full font-light text-base transition-all duration-300 flex items-center justify-center group hover:shadow-lg hover:shadow-primary/25">
                      <Icon name="mdi:cart-plus" class="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                      {{ $t('addToCart') }}
                    </button>
                    <button @click="toggleFavorite" 
                            class="w-14 h-14 rounded-full border-2 border-gray-300 dark:border-gray-600 hover:border-primary dark:hover:border-primary flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                            :class="{ 'bg-primary border-primary text-white hover:from-primary/90 hover:to-primary/80': isFavorite }">
                      <Icon :name="isFavorite ? 'mdi:heart' : 'mdi:heart-outline'" class="w-5 h-5 transition-all" />
                    </button>
                    <button @click="shareProduct" 
                            class="w-14 h-14 rounded-full border-2 border-gray-300 dark:border-gray-600 hover:border-primary dark:hover:border-primary flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                      <Icon name="mdi:share-variant" class="w-5 h-5 transition-all" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 py-20">
        <div class="max-w-7xl mx-auto px-8 lg:px-12">
          <ProductReviews :product-id="product.id" />
        </div>
      </div>

      <div class="py-20">
        <div class="max-w-7xl mx-auto px-8 lg:px-12">
          <h2 class="text-3xl font-light text-gray-900 dark:text-white mb-12 tracking-tight">{{ $t('relatedProducts') }}</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <ProductCard v-for="relatedProduct in relatedProducts" :key="relatedProduct.id" :product="relatedProduct" />
          </div>
        </div>
      </div>
    </div>

    <div v-else class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div class="text-center space-y-6">
        <Icon name="mdi:alert-circle-outline" class="w-20 h-20 text-gray-400 mx-auto" />
        <div class="space-y-2">
          <h2 class="text-3xl font-light text-gray-900 dark:text-white">Product Not Found</h2>
          <p class="text-gray-600 dark:text-gray-400">The requested product could not be located.</p>
        </div>
        <NuxtLink :to="localePath('/products')" class="btn-primary">{{ $t('products') }}</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineI18nRoute({ paths: { en: '/p/[id]', zh: '/p/[id]', 'zh-TW': '/p/[id]' } })

const route = useRoute()
const routeParam = computed(() => route.params.id as string)
const localePath = useLocalePath()

const quantity = ref(1)
const isFavorite = ref(false)
const reviews = ref<any[]>([])

const { data: product, pending, error: productError } = await useAsyncData('product-detail', () => $fetch(`/api/products/${routeParam.value}`), { watch: [routeParam] })
const gallery = computed(() => {
  const base = product.value?.image
  return base ? [base, base, base, base] : []
})
const activeIndex = ref(0)

const descriptionText = computed(() => {
  if (product.value?.description) return product.value.description
  const mt = product.value ? product.value.materialType : ''
  return `High-quality ${mt.toLowerCase()} material with curated specs and reliable delivery.`
})

watchEffect(() => {
  const title = product.value ? `${product.value.name} - BuildCommerce` : 'Product - BuildCommerce'
  const desc = product.value?.description || 'Premium building material product details'
  useHead({ title, meta: [{ name: 'description', content: desc }] })
  if (process.server && productError?.value) {
    const { setResponseStatus } = useNuxtApp()
    setResponseStatus(productError.value.statusCode || 404)
  }
})

const averageRating = computed(() => {
  if (reviews.value.length === 0) return '0.0'
  const sum = reviews.value.reduce((acc, review) => acc + review.rating, 0)
  return (sum / reviews.value.length).toFixed(1)
})
const totalReviews = computed(() => reviews.value.length)

const { getProducts } = useProducts()
const relatedProducts = computed(() => {
  if (!product.value) return []
  const products = getProducts({})
  return products.filter(p => p.id !== product.value!.id && p.materialType === product.value!.materialType).slice(0, 4)
})

const { addToCart } = useCart()
const { t } = useI18n()
const handleAddToCart = () => {
  if (!product.value) return
  const productWithQuantity = { ...product.value, quantity: quantity.value }
  addToCart(productWithQuantity)
  const { $toast } = useNuxtApp()
  $toast.success(`${product.value.name} ×${quantity.value} ${t('addedToCart')}`)
}

const { isAuthenticated } = useAuth()
const toggleFavorite = () => {
  if (!isAuthenticated.value) {
    const { $toast } = useNuxtApp()
    $toast.info(t('pleaseLoginToAddFavorites'))
    return navigateTo('/login')
  }
  isFavorite.value = !isFavorite.value
  const pid = product.value?.id
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
  if (pid == null) return
  if (isFavorite.value) favorites.push(pid)
  else {
    const index = favorites.indexOf(pid)
    if (index > -1) favorites.splice(index, 1)
  }
  localStorage.setItem('favorites', JSON.stringify(favorites))
}

const fetchReviews = async () => {
  try {
    const pid = product.value?.id
    if (!pid) { reviews.value = []; return }
    const response = await $fetch(`/api/reviews/${pid}`)
    reviews.value = Array.isArray(response) ? response : response.reviews || []
  } catch {}
}
const checkFavoriteStatus = () => {
  if (process.client) {
    const pid = product.value?.id
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    isFavorite.value = pid != null ? favorites.includes(pid) : false
  }
}

definePageMeta({ title: 'Product Detail - BuildCommerce' })
onMounted(() => { fetchReviews(); checkFavoriteStatus() })
watch(routeParam, () => { fetchReviews(); checkFavoriteStatus(); quantity.value = 1 })
</script>