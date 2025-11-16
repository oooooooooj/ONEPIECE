<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <div class="max-w-md mx-auto">
      <div class="text-center mb-8">
        <h1 class="font-heading text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {{ $t('login') }}
        </h1>
        <p class="font-body text-gray-600 dark:text-gray-400">
          {{ $t('loginSubtitle') }}
        </p>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sm:p-8">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="login-email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ $t('email') }}
            </label>
            <input
              id="login-email"
              v-model="form.email"
              type="email"
              required
              class="w-full rounded-button bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              :placeholder="$t('emailPlaceholder')"
            />
          </div>

          <div>
            <label for="login-password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ $t('password') }}
            </label>
            <input
              id="login-password"
              v-model="form.password"
              type="password"
              required
              class="w-full rounded-button bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              :placeholder="$t('passwordPlaceholder')"
            />
          </div>

          <div v-if="error" class="text-red-600 dark:text-red-400 text-sm">
            {{ error }}
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="btn-primary w-full py-3"
          >
            {{ isLoading ? $t('loggingIn') : $t('login') }}
          </button>
        </form>

        <div class="mt-6 text-center">
          <p class="font-body text-sm text-gray-600 dark:text-gray-400">
            {{ $t('noAccount') }}
            <NuxtLink :to="localePath('/register')" class="text-primary hover:underline">
              {{ $t('register') }}
            </NuxtLink>
          </p>
        </div>

        <!-- 演示账户 -->
        <div class="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <p class="font-body text-sm text-gray-600 dark:text-gray-400 mb-2">
            {{ $t('demoAccounts') }}
          </p>
          <div class="space-y-1 text-xs text-gray-500 dark:text-gray-400">
            <p>{{ $t('demoUser') }}: demo@example.com / demo123</p>
            <p>{{ $t('demoAdmin') }}: admin@example.com / admin123</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'

const { login, isLoading } = useAuth()
const router = useRouter()
const localePath = useLocalePath()

const form = ref({
  email: '',
  password: ''
})

const error = ref('')

const handleLogin = async () => {
  error.value = ''
  
  try {
    await login(form.value.email, form.value.password)
    await router.push(localePath('/'))
  } catch (err: any) {
    error.value = err.data?.statusMessage || 'Login failed'
  }
}

// 页面元数据
definePageMeta({
  title: 'Login - BuildCommerce',
  description: 'Login to your account'
})
</script>
