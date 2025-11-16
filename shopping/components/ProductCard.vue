<template>
  <div class="card group hover:shadow-lg transition-shadow duration-200 h-full flex flex-col cursor-pointer" @click="goDetail">
    <div class="relative overflow-hidden rounded-lg mb-4 bg-gray-100 dark:bg-gray-700 aspect-square flex-shrink-0">
      <NuxtLink :to="detailLink" class="block w-full h-full">
        <NuxtImg
          :src="product.image"
          :alt="product.name"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          format="webp"
          quality="80"
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </NuxtLink>
    </div>

    <div class="flex flex-col flex-grow space-y-3">
      <h3 class="font-heading text-base sm:text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 min-h-[3rem]">
        <NuxtLink :to="detailLink" class="hover:text-primary transition-colors">
          {{ product.name }}
        </NuxtLink>
      </h3>
        
      <div class="flex items-center justify-between flex-wrap gap-2">
        <span class="font-body text-lg sm:text-xl font-bold text-primary">
          ${{ product.price.toFixed(2) }}
        </span>
        <span class="text-xs px-2 py-1 rounded-button bg-primary-50 dark:bg-primary-900 text-primary">
          {{ $t(product.materialType.toLowerCase()) }}
        </span>
      </div>
      <div class="flex items-center justify-between">
        <span class="font-body text-xs text-gray-600 dark:text-gray-400">{{ $t('sku') }}: {{ product.sku }}</span>
        <span class="font-body text-xs text-gray-600 dark:text-gray-400">{{ product.attributes?.color }} · {{ product.attributes?.size }}</span>
      </div>

      <button
        @click.stop.prevent="handleAddToCart"
        class="btn-primary w-full mt-auto"
      >
        {{ $t('addToCart') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/composables/useProducts'
import { useCart } from '~/composables/useCart'
import { useLocalePath } from '#i18n'
import { navigateTo } from '#app'

interface Props {
  product: Product
}

const props = defineProps<Props>()
const { addToCart } = useCart()

const localePath = useLocalePath()
const detailLink = localePath({ name: 'p-id', params: { id: String(props.product.id) } })

const handleAddToCart = () => {
  addToCart(props.product)
}

const goDetail = () => {
  navigateTo(detailLink)
}

</script>