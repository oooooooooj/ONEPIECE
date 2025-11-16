import type { Product } from './useProducts'
import { computed, ref } from 'vue'

export interface CartItem {
  product: Product
  quantity: number
}

// 共享状态（模块级单例），保证所有组件使用同一份响应式数据
const cart = ref<CartItem[]>([])
const isCartOpen = ref<boolean>(false)

const persistCart = () => {
  if (process.client) {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  }
}

// 初始化一次
if (process.client) {
  const saved = localStorage.getItem('cart')
  if (saved) {
    try {
      cart.value = JSON.parse(saved)
    } catch {}
  }
}

const addToCart = (product: Product) => {
  const existingItem = cart.value.find(item => item.product.id === product.id)
  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.value.push({ product, quantity: 1 })
  }

  isCartOpen.value = true
  setTimeout(() => {
    isCartOpen.value = false
  }, 5000)

  const event = new CustomEvent('product-added-to-cart', {
    detail: { product, quantity: existingItem ? existingItem.quantity : 1 }
  })
  window.dispatchEvent(event)

  persistCart()
}

const removeFromCart = (productId: number) => {
  cart.value = cart.value.filter(item => item.product.id !== productId)
  persistCart()
}

const updateQuantity = (productId: number, quantity: number) => {
  const item = cart.value.find(item => item.product.id === productId)
  if (item) {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      item.quantity = quantity
      persistCart()
    }
  }
}

const cartTotal = computed(() => {
  return cart.value.reduce((total, item) => total + (item.product.price * item.quantity), 0)
})

const cartItemCount = computed(() => {
  return cart.value.reduce((count, item) => count + item.quantity, 0)
})

const clearCart = () => {
  cart.value = []
  persistCart()
}

const closeCart = () => {
  isCartOpen.value = false
}

export const useCart = () => ({
  cart,
  isCartOpen,
  addToCart,
  removeFromCart,
  updateQuantity,
  cartTotal,
  cartItemCount,
  clearCart,
  closeCart
})