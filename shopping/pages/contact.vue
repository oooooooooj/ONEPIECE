<template>
  <div>
    <section class="relative h-[50vh] sm:h-[60vh] flex items-center justify-center overflow-hidden">
      <NuxtImg src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80" alt="Contact" class="absolute inset-0 w-full h-full object-cover" preset="contactHero" loading="eager" preload placeholder="blur" sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px" />
      <div class="absolute inset-0 bg-black/50 dark:bg-black/70"></div>
      <div class="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <h1 class="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">{{ $t('contact') }}</h1>
        <p class="font-body text-lg sm:text-xl text-white/90">{{ $t('contactDesc') }}</p>
      </div>
    </section>

    <section class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div class="xl:col-span-2 space-y-8">
          <div class="card p-8">
            <div class="mb-6">
              <h2 class="font-heading text-2xl font-bold text-gray-900 dark:text-white">{{ $t('contact') }}</h2>
              <p class="font-body text-sm text-gray-600 dark:text-gray-400">{{ $t('contactDesc') }}</p>
            </div>
            <form @submit.prevent="submit" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{ $t('name') }}</label>
                  <input v-model.trim="form.name" type="text" class="w-full rounded-button bg-gray-100 dark:bg-gray-700 px-4 py-3" required />
                </div>
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{ $t('email') }}</label>
                  <input v-model.trim="form.email" type="email" class="w-full rounded-button bg-gray-100 dark:bg-gray-700 px-4 py-3" required />
                </div>
              </div>
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{ $t('subject') || 'Subject' }}</label>
                <input v-model.trim="form.subject" type="text" class="w-full rounded-button bg-gray-100 dark:bg-gray-700 px-4 py-3" required />
              </div>
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{ $t('message') || 'Message' }}</label>
                <textarea v-model.trim="form.message" rows="6" class="w-full rounded-button bg-gray-100 dark:bg-gray-700 px-4 py-3" required></textarea>
                <div class="flex items-center justify-between">
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ form.message.length }}/500</p>
                  <div class="text-xs text-gray-500 dark:text-gray-400" v-if="error">{{ error }}</div>
                  <div class="text-xs text-green-600 dark:text-green-400" v-if="success">{{ success }}</div>
                </div>
              </div>
              <div class="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <button type="submit" :disabled="submitting" class="btn-primary px-8 py-3">
                  {{ submitting ? ($t('sending') || 'Sending...') : ($t('sendMessage') || 'Send Message') }}
                </button>
                <NuxtLink :to="localePath('/faq')" class="btn-outline px-8 py-3">FAQ</NuxtLink>
              </div>
            </form>
          </div>
        </div>
        <div class="space-y-8">
          <div class="card p-8">
            <div class="space-y-4">
              <div class="flex items-center gap-3">
                <Icon name="mdi:email" class="w-6 h-6 text-primary" />
                <span class="font-body text-sm sm:text-base text-gray-700 dark:text-gray-300 break-all">support@example.com</span>
              </div>
              <div class="flex items-center gap-3">
                <Icon name="mdi:phone" class="w-6 h-6 text-primary" />
                <span class="font-body text-sm sm:text-base text-gray-700 dark:text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div class="flex items-center gap-3">
                <Icon name="mdi:map-marker" class="w-6 h-6 text-primary" />
                <span class="font-body text-sm sm:text-base text-gray-700 dark:text-gray-300">123 Market St, San Francisco, CA</span>
              </div>
            </div>
          </div>
          <div class="card p-8">
            <div class="flex items-center gap-3 mb-4">
              <Icon name="mdi:clock-outline" class="w-6 h-6 text-primary" />
              <span class="font-heading text-base font-semibold text-gray-900 dark:text-white">Hours</span>
            </div>
            <div class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p>Mon–Fri: 9:00–18:00</p>
              <p>Sat: 10:00–16:00</p>
              <p>Sun: Closed</p>
            </div>
          </div>
          <div class="relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
            <NuxtImg src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80" alt="Map" class="w-full h-64 object-cover" placeholder="blur" sizes="(max-width: 640px) 100vw, 50vw" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div class="absolute bottom-3 left-3 text-white text-sm">{{ $t('contact') }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const form = reactive({ name: '', email: '', subject: '', message: '' })
const submitting = ref(false)
const error = ref('')
const success = ref('')

const submit = async () => {
  error.value = ''
  success.value = ''
  if (!form.name || !form.email || !form.subject || !form.message) { error.value = 'Please complete all fields'; return }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { error.value = 'Invalid email'; return }
  if (form.message.length > 500) { error.value = 'Message too long'; return }
  submitting.value = true
  try {
    await $fetch('/api/contact/submit', { method: 'POST', body: form })
    success.value = 'Message sent successfully'
    form.name = ''
    form.email = ''
    form.subject = ''
    form.message = ''
  } catch (e: any) {
    error.value = e?.data?.statusMessage || 'Failed to send message'
  } finally {
    submitting.value = false
  }
}

definePageMeta({
  title: 'Contact - BuildCommerce',
  description: 'Contact BuildCommerce for inquiries'
})
</script>

