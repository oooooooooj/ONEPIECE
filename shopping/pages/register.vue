<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <div class="max-w-md mx-auto">
      <div class="text-center mb-8">
        <h1 class="font-heading text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {{ $t('register') }}
        </h1>
        <p class="font-body text-gray-600 dark:text-gray-400">
          {{ $t('registerSubtitle') }}
        </p>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sm:p-8">
        <form @submit.prevent="handleRegister" class="space-y-6">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ $t('name') }}
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="w-full rounded-button bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              :placeholder="$t('namePlaceholder')"
            />
          </div>

          <div>
            <label for="register-email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ $t('email') }}
            </label>
            <input
              id="register-email"
              v-model="form.email"
              type="email"
              required
              class="w-full rounded-button bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              :placeholder="$t('emailPlaceholder')"
            />
          </div>

          <div>
            <label for="register-password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ $t('password') }}
            </label>
            <input
              id="register-password"
              v-model="form.password"
              type="password"
              required
              minlength="6"
              class="w-full rounded-button bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              :placeholder="$t('passwordPlaceholder')"
            />
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ $t('confirmPassword') }}
            </label>
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              required
              minlength="6"
              class="w-full rounded-button bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              :placeholder="$t('confirmPasswordPlaceholder')"
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
            {{ isLoading ? $t('registering') : $t('register') }}
          </button>
        </form>

        <div class="mt-6 text-center">
          <p class="font-body text-sm text-gray-600 dark:text-gray-400">
            {{ $t('hasAccount') }}
            <NuxtLink :to="localePath('/login')" class="text-primary hover:underline">
              {{ $t('login') }}
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'

const { register, isLoading } = useAuth()
const router = useRouter()
const localePath = useLocalePath()

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const error = ref('')

const handleRegister = async () => {
  error.value = ''
  
  // 验证密码匹配
  if (form.value.password !== form.value.confirmPassword) {
    error.value = 'Passwords do not match'
    return
  }
  
  try {
    await register(form.value.email, form.value.password, form.value.name)
    await router.push(localePath('/'))
  } catch (err: any) {
    error.value = err.data?.statusMessage || 'Registration failed'
  }
}

// 页面元数据
definePageMeta({
  title: 'Register - BuildCommerce',
  description: 'Create a new account'
})
</script>
