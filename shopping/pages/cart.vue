<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <!-- 页面标题 -->
    <div class="mb-8 sm:mb-12">
      <h1 class="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
        {{ $t('cart') }}
      </h1>
    </div>

    <!-- 购物车内容 -->
    <div v-if="cart.length > 0">
      <!-- 购物车商品列表 -->
      <div class="space-y-4 mb-8">
        <!-- 桌面端标题行 -->
        <div class="hidden lg:flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <div class="w-1/3 font-heading text-sm font-semibold text-gray-600 dark:text-gray-400">{{ $t('product') }}</div>
          <div class="w-1/6 font-heading text-sm font-semibold text-gray-600 dark:text-gray-400">{{ $t('price') }}</div>
          <div class="w-1/6 font-heading text-sm font-semibold text-gray-600 dark:text-gray-400">{{ $t('quantity') }}</div>
          <div class="w-1/6 font-heading text-sm font-semibold text-gray-600 dark:text-gray-400">{{ $t('total') }}</div>
          <div class="w-1/6 font-heading text-sm font-semibold text-gray-600 dark:text-gray-400 text-right px-4">{{ $t('actions') }}</div>
        </div>
        
        <!-- 商品列表 -->
        <div class="space-y-4">
          <div v-for="item in cart" :key="item.product.id" class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <!-- 移动端商品卡片 -->
            <div class="lg:hidden p-4">
              <div class="flex gap-4">
                <div class="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <NuxtImg 
                    :src="item.product.image" 
                    :alt="item.product.name"
                    class="w-full h-full object-cover"
                    preset="thumbnail"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="font-heading text-sm font-medium text-gray-900 dark:text-white truncate">
                    {{ item.product.name }}
                  </h3>
                  <p class="font-body text-xs text-gray-500 dark:text-gray-400 mb-2">
                    {{ t(item.product.materialType.toLowerCase()) }}
                  </p>
                  <p class="font-body text-xs text-gray-500 dark:text-gray-400">
                    {{ $t('sku') }}: {{ item.product.sku }} · {{ item.product.attributes?.color }} · {{ item.product.attributes?.size }}
                  </p>
                  <div class="flex justify-between items-center">
                    <span class="font-body text-sm font-medium text-primary">
                      ${{ item.product.price.toFixed(2) }}
                    </span>
                    <button
                      @click="removeFromCart(item.product.id)"
                      class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      :aria-label="$t('remove')"
                    >
                      <Icon name="mdi:delete" class="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              <div class="mt-4 space-y-3">
                <div class="flex justify-between items-center">
                  <span class="font-body text-sm text-gray-600 dark:text-gray-400">{{ $t('quantity') }}:</span>
                  <div class="flex items-center">
                    <button
                      @click="updateQuantity(item.product.id, Math.max(1, item.quantity - 1))"
                      class="w-8 h-8 flex items-center justify-center rounded-l-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                      :disabled="item.quantity <= 1"
                    >
                      <Icon name="mdi:minus" class="w-4 h-4" />
                    </button>
                    <span class="w-12 h-8 flex items-center justify-center bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border-y border-gray-200 dark:border-gray-700">
                      {{ item.quantity }}
                    </span>
                    <button
                      @click="updateQuantity(item.product.id, item.quantity + 1)"
                      class="w-8 h-8 flex items-center justify-center rounded-r-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      <Icon name="mdi:plus" class="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div class="flex justify-between items-center">
                  <span class="font-body text-sm text-gray-600 dark:text-gray-400">{{ $t('total') }}:</span>
                  <span class="font-body text-sm font-bold text-gray-900 dark:text-white">
                    ${{ (item.product.price * item.quantity).toFixed(2) }}
                  </span>
                </div>
              </div>
            </div>
            
            <!-- 桌面端商品行 -->
            <div class="hidden lg:flex items-center p-4 divide-x divide-gray-200 dark:divide-gray-700">
              <div class="w-1/3 px-4 flex items-center">
                <div class="flex-shrink-0 w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
                  <NuxtImg 
                    :src="item.product.image" 
                    :alt="item.product.name"
                    class="w-full h-full object-cover"
                    preset="thumbnail"
                  />
                </div>
                <div class="ml-4">
                  <h3 class="font-heading text-base font-medium text-gray-900 dark:text-white">
                    {{ item.product.name }}
                  </h3>
                  <p class="font-body text-sm text-gray-500 dark:text-gray-400">
                    {{ t(item.product.materialType.toLowerCase()) }}
                  </p>
                  <p class="font-body text-xs text-gray-500 dark:text-gray-400">
                    {{ $t('sku') }}: {{ item.product.sku }} · {{ item.product.attributes?.color }} · {{ item.product.attributes?.size }}
                  </p>
                </div>
              </div>
              <div class="w-1/6 px-4 text-center font-body text-gray-900 dark:text-white">
                ${{ item.product.price.toFixed(2) }}
              </div>
              <div class="w-1/6 px-4">
                <div class="flex items-center justify-center">
                  <button
                    @click="updateQuantity(item.product.id, Math.max(1, item.quantity - 1))"
                    class="w-8 h-8 flex items-center justify-center rounded-l-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    :disabled="item.quantity <= 1"
                  >
                    <Icon name="mdi:minus" class="w-4 h-4" />
                  </button>
                  <span class="w-12 h-8 flex items-center justify-center bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border-y border-gray-200 dark:border-gray-700">
                    {{ item.quantity }}
                  </span>
                  <button
                    @click="updateQuantity(item.product.id, item.quantity + 1)"
                    class="w-8 h-8 flex items-center justify-center rounded-r-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    <Icon name="mdi:plus" class="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div class="w-1/6 px-4 text-center font-body font-medium text-gray-900 dark:text-white">
                ${{ (item.product.price * item.quantity).toFixed(2) }}
              </div>
              <div class="w-1/6 px-4 flex justify-center">
                <button
                  @click="removeFromCart(item.product.id)"
                  class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                  :aria-label="$t('remove')"
                >
                  <Icon name="mdi:delete" class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 购物车总计 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <div class="flex justify-between items-center mb-4">
          <h2 class="font-heading text-xl font-semibold text-gray-900 dark:text-white">
            {{ $t('orderSummary') }}
          </h2>
        </div>
        <div class="space-y-3">
          <div class="flex justify-between">
            <span class="font-body text-gray-600 dark:text-gray-400">{{ $t('subtotal') }} ({{ cartItemCount }} {{ $t('items') }}):</span>
            <span class="font-body text-gray-900 dark:text-white">${{ cartTotal.toFixed(2) }}</span>
          </div>
          <div v-if="discountAmount > 0" class="flex justify-between">
            <span class="font-body text-gray-600 dark:text-gray-400">{{ $t('discount') }}</span>
            <span class="font-body text-gray-900 dark:text-white">- ${{ discountAmount.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-body text-gray-600 dark:text-gray-400">{{ $t('shipping') }}:</span>
            <span class="font-body text-gray-900 dark:text-white">{{ $t('free') }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-body text-gray-600 dark:text-gray-400">{{ $t('tax') }} (8.25%):</span>
            <span class="font-body text-gray-900 dark:text-white">${{ taxAmount.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
            <span class="font-heading text-lg font-semibold text-gray-900 dark:text-white">{{ $t('total') }}:</span>
            <span class="font-heading text-lg font-semibold text-primary">${{ totalWithTax.toFixed(2) }}</span>
          </div>
        </div>
        <div class="mt-4">
          <div class="flex gap-2">
            <input v-model="couponCode" type="text" class="flex-1 rounded-button bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-2" :placeholder="$t('couponCode')" />
            <button class="btn-secondary px-4" @click="applyCoupon">{{ $t('applyCoupon') }}</button>
            <button v-if="discountPercent > 0" class="btn-outline px-4" @click="removeCoupon">{{ $t('removeCoupon') }}</button>
          </div>
          <p v-if="couponMessage" class="mt-2 font-body text-sm text-red-600 dark:text-red-400">{{ couponMessage }}</p>
        </div>
        <div class="mt-6">
          <button 
            class="btn-primary w-full py-3 hover:bg-primary-dark transition-colors"
            @click="handleCheckout"
          >
            {{ $t('proceedToCheckout') }}
          </button>
        </div>
        
        <!-- 支付网关预留区域 -->
        <div class="mt-4 text-center">
          <p class="font-body text-sm text-gray-500 dark:text-gray-400 mb-3">{{ $t('paymentOptions') }}</p>
          <div class="flex justify-center items-center gap-4 mb-3 flex-wrap">
            <NuxtLink
              :to="localePath('/checkout')"
              class="btn-primary px-6 py-3"
            >
              {{ $t('payWithStripe') }}
            </NuxtLink>
            <NuxtLink
              :to="localePath('/checkout')"
              class="btn-secondary px-6 py-3"
            >
              {{ $t('payWithPaypal') }}
            </NuxtLink>
          </div>
          <NuxtLink :to="localePath('/checkout')" class="font-body text-primary hover:underline">{{ $t('skipAndContinue') }}</NuxtLink>
        </div>
        <div class="mt-4 text-center">
          <NuxtLink :to="localePath('/products')" class="font-body text-primary hover:underline">
            {{ $t('continueShopping') }}
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- 空购物车 -->
    <div v-else class="text-center py-12">
      <Icon name="mdi:cart-outline" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 class="font-heading text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {{ $t('cart') }} {{ $t('is_empty') }}
      </h3>
      <p class="font-body text-gray-600 dark:text-gray-400 mb-6">
        {{ $t('continueShopping') }}
      </p>
      <NuxtLink :to="localePath('/products')" class="btn-primary inline-flex items-center">
        {{ $t('shop') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useCart } from '~/composables/useCart'
  import { useI18n } from 'vue-i18n'
  const localePath = useLocalePath()
  
  const { cart, cartTotal, updateQuantity, removeFromCart } = useCart()
  const router = useRouter()
  const isPaying = ref(false)
  const genOrderId = () => `BC-${Date.now()}`
  const { t } = useI18n()
  const couponCode = ref('')
  const couponMessage = ref('')
  const discountPercent = ref(0)
  const discountAmount = computed(() => Number((cartTotal.value * discountPercent.value).toFixed(2)))
  const discountedSubtotal = computed(() => Math.max(0, cartTotal.value - discountAmount.value))
  
  // 计算购物车商品总数
  const cartItemCount = computed(() => {
    return cart.value.reduce((total, item) => total + item.quantity, 0)
  })
  
  // 计算税费 (8.25%)
  const taxAmount = computed(() => {
    return discountedSubtotal.value * 0.0825
  })
  
  // 计算含税费的总价
  const totalWithTax = computed(() => {
    return discountedSubtotal.value + taxAmount.value
  })

  const applyCoupon = async () => {
    try {
      const { data } = await $fetch('/api/coupons/validate', {
        method: 'POST',
        body: { code: couponCode.value.trim() }
      })
      
      if (data.valid) {
        discountPercent.value = data.discountPercent
        couponMessage.value = data.message || t('couponApplied')
      } else {
        discountPercent.value = 0
        couponMessage.value = data.message || t('invalidCoupon')
      }
    } catch (error) {
      discountPercent.value = 0
      couponMessage.value = t('couponValidationError')
    }
  }

  const removeCoupon = () => {
    discountPercent.value = 0
    couponMessage.value = ''
    couponCode.value = ''
  }
  
  const handleCheckout = () => {
    console.log('handleCheckout called')
    goToCheckout()
  }

  const goToCheckout = () => {
    console.log('goToCheckout called')
    try {
      const checkoutPath = localePath('/checkout')
      console.log('Navigating to checkout:', checkoutPath)
      router.push(checkoutPath)
    } catch (error) {
      console.error('Navigation error:', error)
    }
  }
  
  // 页面元数据 - 使用Nuxt 3原生方式
  definePageMeta({
    title: 'Cart - BuildCommerce',
    description: 'Your shopping cart'
  })
  </script>