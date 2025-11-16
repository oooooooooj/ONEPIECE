<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <!-- 感谢页内容 -->
    <div class="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 sm:p-10">
      <!-- 顶部大标题 -->
      <h1 class="font-heading text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white text-center mb-6">
        {{ $t('thankYou') }}
      </h1>

      <!-- 说明文案 -->
      <p class="font-body text-lg text-gray-600 dark:text-gray-300 text-center mb-8">
        {{ $t('orderId') }}: {{ orderId }}
      </p>

      <!-- 订单摘要 -->
      <div class="border-t border-b border-gray-200 dark:border-gray-700 py-6 mb-8">
        <h2 class="font-heading text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {{ $t('orderSummary') }}
        </h2>
        
        <!-- 产品列表 -->
        <div class="space-y-4 mb-6">
          <div v-for="item in snapshotCart" :key="item.product.id" class="flex justify-between items-center py-2">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden flex-shrink-0">
                <NuxtImg 
                  :src="item.product.image" 
                  :alt="item.product.name"
                  class="w-full h-full object-cover"
                  preset="thumbnail"
                />
              </div>
              <div class="ml-4 flex-1">
                <h3 class="font-heading text-sm font-medium text-gray-900 dark:text-white">
                  {{ item.product.name }}
                </h3>
                <p class="font-body text-xs text-gray-500 dark:text-gray-400">
                  {{ $t('quantity') }}: {{ item.quantity }}
                </p>
              </div>
            </div>
            <span class="font-body text-gray-900 dark:text-white">
              ${{ (item.product.price * item.quantity).toFixed(2) }}
            </span>
          </div>
        </div>

        <!-- 价格汇总 -->
        <div class="space-y-2">
          <div class="flex justify-between">
            <span class="font-body text-gray-600 dark:text-gray-400">{{ $t('subtotal') }} ({{ cartItemCount }} {{ $t('items') }}):</span>
            <span class="font-body text-gray-900 dark:text-white">${{ cartTotal.toFixed(2) }}</span>
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
            <span class="font-heading text-lg font-semibold text-gray-900 dark:text-white">Total:</span>
            <span class="font-heading text-lg font-semibold text-primary">${{ totalWithTax.toFixed(2) }}</span>
          </div>
        </div>
      </div>

      <!-- Continue Shopping 按钮 -->
      <div class="text-center">
        <NuxtLink :to="localePath('/products')" class="btn-primary inline-flex items-center py-3 px-6 hover:bg-primary-dark transition-colors">
          {{ $t('continueShopping') }}
        </NuxtLink>
        
        <!-- 自动跳转倒计时提示 -->
        <p class="font-body text-sm text-gray-500 dark:text-gray-400 mt-4">
          {{ $t('redirectInSeconds', { seconds: remainingTime }) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, onMounted, onUnmounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { useRouter } from 'vue-router'
  import { useCart } from '~/composables/useCart'
  
  const { cart, clearCart } = useCart()
  const router = useRouter()
  const route = useRoute()
  const localePath = useLocalePath()
  const orderId = computed(() => (route.query.orderId as string) || 'ORD-2024-001')
  const snapshotCart = ref(cart.value.map(i => ({ ...i })))
  const cartItemCount = computed(() => snapshotCart.value.reduce((total, item) => total + item.quantity, 0))
  const cartTotal = computed(() => snapshotCart.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0))
  const taxAmount = computed(() => cartTotal.value * 0.0825)
  const totalWithTax = computed(() => cartTotal.value + taxAmount.value)
  
  // 48小时（以秒为单位）
  const totalRedirectTime = 48 * 60 * 60
  const remainingTime = ref(totalRedirectTime)
  let countdownTimer: NodeJS.Timeout
  
  // 启动倒计时
  const startCountdown = () => {
    countdownTimer = setInterval(() => {
      if (remainingTime.value > 0) {
        remainingTime.value--
      } else {
        clearInterval(countdownTimer)
        router.push(localePath('/'))
      }
    }, 1000)
  }
  
  // 页面挂载时启动倒计时
  onMounted(() => {
    clearCart()
    startCountdown()
  })
  
  // 页面卸载时清除定时器
  onUnmounted(() => {
    if (countdownTimer) {
      clearInterval(countdownTimer)
    }
  })
  
  // 页面元数据 - 使用Nuxt 3原生方式
definePageMeta({
  title: 'Thank You - BuildCommerce',
  description: 'Thank you for your order confirmation'
})
</script>

<style scoped>
  /* 添加 fade-in 过渡动画 */
  .container {
    animation: fadeIn 0.5s ease-in;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>