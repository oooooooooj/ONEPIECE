<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <!-- 页面标题 -->
    <div class="mb-8 sm:mb-12">
      <h1 class="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
        {{ $t('checkout') }}
      </h1>
      <p class="font-body text-gray-600 dark:text-gray-400">{{ $t('checkoutDesc') }}</p>
    </div>

    <!-- 结账流程步骤 -->
    <div class="mb-8">
      <div class="flex items-center justify-center space-x-4">
        <div class="flex items-center space-x-2" :class="{ 'text-primary': currentStep >= 1 }">
          <div class="w-8 h-8 rounded-full flex items-center justify-center" :class="currentStep >= 1 ? 'bg-primary text-white' : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400'">1</div>
          <span class="font-body text-sm font-medium">{{ $t('shippingInfo') }}</span>
        </div>
        <div class="w-12 h-0.5 bg-gray-300 dark:bg-gray-600"></div>
        <div class="flex items-center space-x-2" :class="{ 'text-primary': currentStep >= 2 }">
          <div class="w-8 h-8 rounded-full flex items-center justify-center" :class="currentStep >= 2 ? 'bg-primary text-white' : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400'">2</div>
          <span class="font-body text-sm font-medium">{{ $t('paymentMethod') }}</span>
        </div>
        <div class="w-12 h-0.5 bg-gray-300 dark:bg-gray-600"></div>
        <div class="flex items-center space-x-2" :class="{ 'text-primary': currentStep >= 3 }">
          <div class="w-8 h-8 rounded-full flex items-center justify-center" :class="currentStep >= 3 ? 'bg-primary text-white' : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400'">3</div>
          <span class="font-body text-sm font-medium">{{ $t('orderReview') }}</span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- 左侧：配送信息和支付方式 -->
      <div class="lg:col-span-2 space-y-6">
        <!-- 步骤1：配送信息 -->
        <div v-if="currentStep === 1" class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 class="font-heading text-xl font-semibold text-gray-900 dark:text-white mb-6">
            {{ $t('shippingInfo') }}
          </h2>
          
          <!-- 地址选择 -->
          <div class="mb-6">
            <label class="block font-body text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ $t('selectShippingAddress') }}
            </label>
            <div class="space-y-3">
              <div v-for="address in shippingAddresses" :key="address.id" 
                   class="border rounded-lg p-4 cursor-pointer transition-colors"
                   :class="selectedAddress?.id === address.id ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'"
                   @click="selectedAddress = address">
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <p class="font-medium text-gray-900 dark:text-white">{{ address.name }}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{{ address.phone }}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{{ address.address }}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{{ address.city }}, {{ address.state }} {{ address.zipCode }}</p>
                  </div>
                  <div class="flex items-center">
                    <input type="radio" :checked="selectedAddress?.id === address.id" class="text-primary">
                  </div>
                </div>
              </div>
            </div>
            
            <button @click="showAddAddress = true" class="mt-4 btn-outline w-full">
              <Icon name="mdi:plus" class="w-4 h-4 mr-2" />
              {{ $t('addNewAddress') }}
            </button>
          </div>

          <!-- 添加新地址表单 -->
          <div v-if="showAddAddress" class="border border-gray-200 dark:border-gray-600 rounded-lg p-4 mt-4">
            <h3 class="font-medium text-gray-900 dark:text-white mb-4">{{ $t('addNewAddress') }}</h3>
            <form @submit.prevent="addNewAddress" class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block font-body text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ $t('fullName') }}</label>
                  <input v-model="newAddress.name" type="text" required class="form-input" />
                </div>
                <div>
                  <label class="block font-body text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ $t('phone') }}</label>
                  <input v-model="newAddress.phone" type="tel" required class="form-input" />
                </div>
              </div>
              <div>
                <label class="block font-body text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ $t('streetAddress') }}</label>
                <input v-model="newAddress.address" type="text" required class="form-input" />
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label class="block font-body text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ $t('city') }}</label>
                  <input v-model="newAddress.city" type="text" required class="form-input" />
                </div>
                <div>
                  <label class="block font-body text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ $t('state') }}</label>
                  <input v-model="newAddress.state" type="text" required class="form-input" />
                </div>
                <div>
                  <label class="block font-body text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ $t('zipCode') }}</label>
                  <input v-model="newAddress.zipCode" type="text" required class="form-input" />
                </div>
              </div>
              <div class="flex space-x-3">
                <button type="submit" class="btn-primary">{{ $t('saveAddress') }}</button>
                <button type="button" @click="showAddAddress = false" class="btn-outline">{{ $t('cancel') }}</button>
              </div>
            </form>
          </div>
        </div>

        <!-- 步骤2：支付方式 -->
        <div v-if="currentStep === 2" class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 class="font-heading text-xl font-semibold text-gray-900 dark:text-white mb-6">
            {{ $t('paymentMethod') }}
          </h2>
          
          <div class="space-y-4">
            <div v-for="method in paymentMethods" :key="method.id"
                 class="border rounded-lg p-4 cursor-pointer transition-colors"
                 :class="selectedPayment?.id === method.id ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'"
                 @click="selectedPayment = method">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input type="radio" :checked="selectedPayment?.id === method.id" class="text-primary mr-3">
                  <div>
                    <p class="font-medium text-gray-900 dark:text-white">{{ method.name }}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{{ method.description }}</p>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <Icon :name="method.icon" class="w-8 h-8" />
                </div>
              </div>
            </div>
          </div>

          <!-- 信用卡信息表单 -->
          <div v-if="selectedPayment?.type === 'credit'" class="mt-6 space-y-4">
            <div>
              <label class="block font-body text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ $t('cardNumber') }}</label>
              <input v-model="cardInfo.number" type="text" placeholder="1234 5678 9012 3456" class="form-input" />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block font-body text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ $t('expiryDate') }}</label>
                <input v-model="cardInfo.expiry" type="text" placeholder="MM/YY" class="form-input" />
              </div>
              <div>
                <label class="block font-body text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ $t('cvv') }}</label>
                <input v-model="cardInfo.cvv" type="text" placeholder="123" class="form-input" />
              </div>
            </div>
            <div>
              <label class="block font-body text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ $t('cardholderName') }}</label>
              <input v-model="cardInfo.name" type="text" class="form-input" />
            </div>
          </div>
        </div>

        <!-- 步骤3：订单确认 -->
        <div v-if="currentStep === 3" class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 class="font-heading text-xl font-semibold text-gray-900 dark:text-white mb-6">
            {{ $t('orderReview') }}
          </h2>
          
          <!-- 配送地址确认 -->
          <div class="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <h3 class="font-medium text-gray-900 dark:text-white mb-2">{{ $t('shippingAddress') }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ selectedAddress?.name }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ selectedAddress?.phone }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ selectedAddress?.address }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ selectedAddress?.city }}, {{ selectedAddress?.state }} {{ selectedAddress?.zipCode }}</p>
          </div>

          <!-- 支付方式确认 -->
          <div class="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <h3 class="font-medium text-gray-900 dark:text-white mb-2">{{ $t('paymentMethod') }}</h3>
            <div class="flex items-center">
              <Icon :name="selectedPayment?.icon" class="w-6 h-6 mr-2" />
              <span class="text-sm text-gray-600 dark:text-gray-400">{{ selectedPayment?.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧：订单摘要 -->
      <div class="lg:col-span-1">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-4">
          <h2 class="font-heading text-xl font-semibold text-gray-900 dark:text-white mb-6">
            {{ $t('orderSummary') }}
          </h2>
          
          <!-- 商品列表 -->
          <div class="space-y-4 mb-6">
            <div v-for="item in cart" :key="item.product.id" class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden flex-shrink-0">
                <NuxtImg :src="item.product.image" :alt="item.product.name" class="w-full h-full object-cover" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="font-body text-sm font-medium text-gray-900 dark:text-white truncate">{{ item.product.name }}</p>
                <p class="font-body text-xs text-gray-500 dark:text-gray-400">{{ $t('quantity') }}: {{ item.quantity }}</p>
              </div>
              <p class="font-body text-sm font-medium text-gray-900 dark:text-white">${{ (item.product.price * item.quantity).toFixed(2) }}</p>
            </div>
          </div>

          <!-- 价格明细 -->
          <div class="space-y-2 mb-4">
            <div class="flex justify-between">
              <span class="font-body text-sm text-gray-600 dark:text-gray-400">{{ $t('subtotal') }} ({{ cartItemCount }} {{ $t('items') }}):</span>
              <span class="font-body text-sm text-gray-900 dark:text-white">${{ cartTotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-body text-sm text-gray-600 dark:text-gray-400">{{ $t('shipping') }}:</span>
              <span class="font-body text-sm text-green-600 dark:text-green-400">{{ $t('free') }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-body text-sm text-gray-600 dark:text-gray-400">{{ $t('tax') }} (8.25%):</span>
              <span class="font-body text-sm text-gray-900 dark:text-white">${{ taxAmount.toFixed(2) }}</span>
            </div>
          </div>

          <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div class="flex justify-between items-center">
              <span class="font-heading text-lg font-semibold text-gray-900 dark:text-white">{{ $t('total') }}:</span>
              <span class="font-heading text-lg font-semibold text-primary">${{ totalWithTax.toFixed(2) }}</span>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="mt-6 space-y-3">
            <button v-if="currentStep < 3" @click="nextStep" class="btn-primary w-full" :disabled="!canProceed">
              {{ nextButtonText }}
            </button>
            <button v-if="currentStep > 1" @click="prevStep" class="btn-outline w-full">
              {{ $t('previous') }}
            </button>
            <button v-if="currentStep === 3" @click="placeOrder" class="btn-primary w-full" :disabled="isProcessing">
              <Icon v-if="isProcessing" name="mdi:loading" class="w-4 h-4 mr-2 animate-spin" />
              {{ isProcessing ? $t('processing') : $t('placeOrder') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useCart } from '~/composables/useCart'

// 购物车数据
const { cart, cartTotal } = useCart()
const router = useRouter()
const { t } = useI18n()
const localePath = useLocalePath()

// 步骤控制
const currentStep = ref(1)
const isProcessing = ref(false)

// 地址管理
const shippingAddresses = ref([
  {
    id: 1,
    name: '张三',
    phone: '+86 138 0013 8000',
    address: '北京市朝阳区建国门外大街1号',
    city: '北京市',
    state: '朝阳区',
    zipCode: '100020',
    isDefault: true
  },
  {
    id: 2,
    name: '李四',
    phone: '+86 139 0013 9000',
    address: '上海市浦东新区陆家嘴环路1000号',
    city: '上海市',
    state: '浦东新区',
    zipCode: '200120',
    isDefault: false
  }
])

const selectedAddress = ref(shippingAddresses.value[0])
const showAddAddress = ref(false)
const newAddress = ref({
  name: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: ''
})

// 支付方式
const paymentMethods = ref([
  {
    id: 1,
    name: '信用卡',
    description: 'Visa, Mastercard, American Express',
    type: 'credit',
    icon: 'mdi:credit-card'
  },
  {
    id: 2,
    name: 'PayPal',
    description: '使用PayPal账户支付',
    type: 'paypal',
    icon: 'mdi:paypal'
  },
  {
    id: 3,
    name: '银行转账',
    description: '直接银行转账',
    type: 'bank',
    icon: 'mdi:bank'
  }
])

const selectedPayment = ref(paymentMethods.value[0])
const cardInfo = ref({
  number: '',
  expiry: '',
  cvv: '',
  name: ''
})

// 计算属性
const cartItemCount = computed(() => {
  return cart.value.reduce((total, item) => total + item.quantity, 0)
})

const taxAmount = computed(() => {
  return cartTotal.value * 0.0825
})

const totalWithTax = computed(() => {
  return cartTotal.value + taxAmount.value
})

const canProceed = computed(() => {
  if (currentStep.value === 1) return Boolean(selectedAddress.value)
  if (currentStep.value === 2) return Boolean(selectedPayment.value)
  return true
})

const nextButtonText = computed(() => {
  if (currentStep.value === 1) return t('continueToPayment')
  if (currentStep.value === 2) return t('reviewOrder')
  return t('continue')
})

// 方法
const addNewAddress = () => {
  const address = {
    id: Date.now(),
    ...newAddress.value,
    isDefault: false
  }
  shippingAddresses.value.push(address)
  selectedAddress.value = address
  showAddAddress.value = false
  newAddress.value = { name: '', phone: '', address: '', city: '', state: '', zipCode: '' }
}

const nextStep = () => {
  if (currentStep.value < 3) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const placeOrder = async () => {
  console.log('placeOrder called, currentStep:', currentStep.value)
  console.log('cart data:', cart.value)
  console.log('selectedAddress:', selectedAddress.value)
  console.log('selectedPayment:', selectedPayment.value)
  
  if (!selectedAddress.value || !selectedPayment.value) {
    console.error('Missing required data')
    return
  }
  
  isProcessing.value = true
  
  // 模拟订单处理
  setTimeout(() => {
    const orderId = `BC-${Date.now()}`
    isProcessing.value = false
    console.log('Navigating to thank-you with orderId:', orderId)
    router.push(localePath(`/thank-you?orderId=${orderId}`))
  }, 2000)
}

// 页面元数据
definePageMeta({
  title: '结账 - BuildCommerce',
  description: '完成您的订单结账'
})
</script>

<style scoped>
.form-input {
  @apply w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent;
}
</style>