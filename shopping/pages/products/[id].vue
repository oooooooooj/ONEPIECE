<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <div v-if="product" class="space-y-8 sm:space-y-12">
      <nav aria-label="Breadcrumb" class="mb-4">
        <ol class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <li>
            <NuxtLink :to="localePath('/')" class="hover:underline">{{ $t('home') }}</NuxtLink>
          </li>
          <li>/</li>
          <li>
            <NuxtLink :to="localePath('/products')" class="hover:underline">{{ $t('products') }}</NuxtLink>
          </li>
          <li>/</li>
          <li class="text-gray-900 dark:text-white font-medium">{{ product.name }}</li>
        </ol>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
        <div class="space-y-4">
          <div class="relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700 aspect-square">
            <NuxtImg :src="product.image" :alt="product.name" class="w-full h-full object-cover" format="webp" quality="90" loading="eager" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>

          <div class="card p-4">
            <h3 class="font-heading text-lg font-semibold text-gray-900 dark:text白色 mb-3">{{ $t('productDetails') }}</h3>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span class="font-medium text-gray-700 dark:text-gray-300">{{ $t('materialType') }}:</span>
                <span class="ml-2 text-gray-600 dark:text-gray-400">{{ $t(product.materialType.toLowerCase()) }}</span>
              </div>
              <div>
                <span class="font-medium text-gray-700 dark:text-gray-300">{{ $t('color') }}:</span>
                <span class="ml-2 text-gray-600 dark:text-gray-400">{{ product.attributes?.color }}</span>
              </div>
              <div>
                <span class="font-medium text-gray-700 dark:text-gray-300">{{ $t('size') }}:</span>
                <span class="ml-2 text-gray-600 dark:text-gray-400">{{ product.attributes?.size }}</span>
              </div>
              <div>
                <span class="font-medium text-gray-700 dark:text-gray-300">{{ $t('sku') }}:</span>
                <span class="ml-2 text-gray-600 dark:text-gray-400">{{ product.sku }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <div>
            <h1 class="font-heading text-3xl sm:text-4xl font-bold text-gray-900 dark:text白色 mb-4">{{ product.name }}</h1>
            <p class="font-body text-lg text-gray-600 dark:text-gray-400 mb-6">{{ descriptionText }}</p>
            <div class="flex items-center justify-between mb-6">
              <span class="font-heading text-3xl font-bold text-primary">${{ product.price.toFixed(2) }}</span>
              <div class="flex items-center gap-2">
                <Icon name="mdi:star" class="w-5 h-5 text-yellow-400" />
                <span class="font-body text-sm text-gray-600 dark:text-gray-400">{{ averageRating }} ({{ totalReviews }} {{ $t('reviews') }})</span>
              </div>
            </div>
          </div>

          <div class="card p-6">
            <div class="flex items-center gap-4 mb-4">
              <label class="font-medium text-gray-700 dark:text-gray-300">{{ $t('quantity') }}:</label>
              <div class="flex items-center gap-2">
                <button @click="quantity = Math.max(1, quantity - 1)" class="w-8 h-8 rounded-button bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center">
                  <Icon name="mdi:minus" class="w-4 h-4" />
                </button>
                <span class="w-12 text-center font-medium">{{ quantity }}</span>
                <button @click="quantity++" class="w-8 h-8 rounded-button bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center">
                  <Icon name="mdi:plus" class="w-4 h-4" />
                </button>
              </div>
            </div>
            <button @click="handleAddToCart" class="btn-primary w-full">
              <Icon name="mdi:cart-plus" class="w-5 h-5 mr-2" />
              {{ $t('addToCart') }}
            </button>
          </div>

          <div class="card p-6">
            <h3 class="font-heading text-lg font-semibold text-gray-900 dark:text白色 mb-3">{{ $t('productDetails') }}</h3>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span class="font-medium text-gray-700 dark:text-gray-300">{{ $t('materialType') }}:</span>
                <span class="ml-2 text-gray-600 dark:text-gray-400">{{ $t(product.materialType.toLowerCase()) }}</span>
              </div>
              <div>
                <span class="font-medium text-gray-700 dark:text-gray-300">{{ $t('color') }}:</span>
                <span class="ml-2 text-gray-600 dark:text-gray-400">{{ product.attributes?.color }}</span>
              </div>
              <div>
                <span class="font-medium text-gray-700 dark:text-gray-300">{{ $t('size') }}:</span>
                <span class="ml-2 text-gray-600 dark:text-gray-400">{{ product.attributes?.size }}</span>
              </div>
              <div>
                <span class="font-medium text-gray-700 dark:text-gray-300">{{ $t('sku') }}:</span>
                <span class="ml-2 text-gray-600 dark:text-gray-400">{{ product.sku }}</span>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <button @click="toggleFavorite" class="btn-outline flex items-center gap-2" :class="{ 'bg-primary-50 dark:bg-primary-900 text-primary': isFavorite }">
              <Icon :name="isFavorite ? 'mdi:heart' : 'mdi:heart-outline'" class="w-5 h-5" />
              {{ isFavorite ? $t('removeFromFavorites') : $t('addToFavorites') }}
            </button>
            <button @click="shareProduct" class="btn-outline flex items中心 gap-2">
              <Icon name="mdi:share-variant" class="w-5 h-5" />
              {{ $t('share') }}
            </button>
          </div>
        </div>
      </div>

      <div class="mt-12 sm:mt-16">
        <ProductReviews :product-id="product.id" />
      </div>

      <div class="mt-12 sm:mt-16">
        <h2 class="font-heading text-2xl font-bold text-gray-900 dark:text白色 mb-8">{{ $t('relatedProducts') }}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <ProductCard v-for="relatedProduct in relatedProducts" :key="relatedProduct.id" :product="relatedProduct" />
        </div>
      </div>
    </div>

    <div v-else class="text-center py-16">
      <Icon name="mdi:alert-circle-outline" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h2 class="font-heading text-2xl font-bold text-gray-900 dark:text白色 mb-2">Product Not Found</h2>
      <p class="font-body text-gray-600 dark:text-gray-400 mb-6">The requested product could not be located.</p>
      <NuxtLink :to="localePath('/products')" class="btn-primary">{{ $t('products') }}</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
defineI18nRoute({ paths: { en: '/products/[id]', zh: '/products/[id]', 'zh-TW': '/products/[id]' } })

const route = useRoute()
const routeParam = computed(() => route.params.id as string)

const quantity = ref(1)
const isFavorite = ref(false)
const reviews = ref<any[]>([])
const localePath = useLocalePath()

const { data: product, error: productError } = await useAsyncData('product-detail', () => $fetch(`/api/products/${routeParam.value}`), { watch: [routeParam] })

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