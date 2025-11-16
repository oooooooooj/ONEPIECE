<template>
  <div class="space-y-6">
    <!-- 评论摘要 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 class="font-heading text-xl font-semibold text-gray-900 dark:text-white mb-4">
        {{ $t('customerReviews') }}
      </h3>
      
      <div v-if="reviews.length > 0" class="space-y-4">
        <!-- 平均评分 -->
        <div class="flex items-center gap-4">
          <div class="text-center">
            <div class="text-3xl font-bold text-primary">{{ averageRating }}</div>
            <div class="flex items-center">
              <StarRating :model-value="averageRating" :readonly="true" />
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              {{ totalReviews }} {{ $t('reviews') }}
            </div>
          </div>
          
          <!-- 评分分布 -->
          <div class="flex-1 space-y-2">
            <div v-for="item in ratingDistribution" :key="item.rating" class="flex items-center gap-2">
              <span class="text-sm text-gray-600 dark:text-gray-400 w-4">{{ item.rating }}</span>
              <Icon name="mdi:star" class="w-4 h-4 text-yellow-400" />
              <div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  class="bg-primary h-2 rounded-full transition-all duration-300"
                  :style="{ width: `${item.percentage}%` }"
                ></div>
              </div>
              <span class="text-sm text-gray-600 dark:text-gray-400 w-8">{{ item.percentage }}%</span>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else class="text-center py-8">
        <Icon name="mdi:comment-outline" class="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p class="text-gray-600 dark:text-gray-400">{{ $t('noReviewsYet') }}</p>
      </div>
    </div>

    <!-- 添加评论表单（仅客户端渲染） -->
    <ClientOnly>
      <div v-if="isAuthenticated" class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h4 class="font-heading text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {{ $t('writeReview') }}
        </h4>
        
        <form @submit.prevent="submitReview" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ $t('rating') }}
            </label>
            <StarRating 
              v-model="newReview.rating" 
              :readonly="false"
              @update:model-value="(value) => newReview.rating = value"
            />
          </div>
          
          <div>
            <label for="comment" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ $t('comment') }}
            </label>
            <textarea
              id="comment"
              v-model="newReview.comment"
              rows="4"
              class="w-full rounded-button bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              :placeholder="$t('writeYourComment')"
              required
            ></textarea>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {{ newReview.comment.length }}/500 {{ $t('characters') }}
            </p>
          </div>
          
          <div v-if="error" class="text-red-600 dark:text-red-400 text-sm">
            {{ error }}
          </div>
          
          <div v-if="success" class="text-green-600 dark:text-green-400 text-sm">
            {{ success }}
          </div>
          
          <button
            type="submit"
            :disabled="isSubmitting"
            class="btn-primary px-6 py-2"
          >
            {{ isSubmitting ? $t('submitting') : $t('submitReview') }}
          </button>
        </form>
      </div>
      
      <template #fallback>
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
          <p class="text-gray-600 dark:text-gray-400 mb-4">{{ $t('loginToReview') }}</p>
          <NuxtLink to="/login" class="btn-primary px-6 py-2">
            {{ $t('login') }}
          </NuxtLink>
        </div>
      </template>
    </ClientOnly>

    <!-- 评论列表 -->
    <div v-if="reviews.length > 0" class="space-y-4">
      <div 
        v-for="review in reviews" 
        :key="review.id" 
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
      >
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span class="text-white font-semibold text-sm">
                {{ review.userName.charAt(0).toUpperCase() }}
              </span>
            </div>
            <div>
              <h5 class="font-medium text-gray-900 dark:text-white">{{ review.userName }}</h5>
              <div class="flex items-center gap-2">
                <StarRating :model-value="review.rating" :readonly="true" />
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  {{ formatDate(review.createdAt) }}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <p class="text-gray-700 dark:text-gray-300 mb-4">{{ review.comment }}</p>
        
        <div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <button 
            @click="toggleHelpful(review.id)"
            class="flex items-center gap-1 hover:text-primary transition-colors"
            :class="{ 'text-primary': review.helpful > 0 }"
          >
            <Icon name="mdi:thumb-up" class="w-4 h-4" />
            {{ $t('helpful') }} ({{ review.helpful }})
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'

interface Review {
  id: number
  productId: number
  userId: number
  userName: string
  rating: number
  comment: string
  createdAt: string
  helpful: number
}

interface RatingDistribution {
  rating: number
  count: number
  percentage: number
}

const props = defineProps<{
  productId: number
}>()

const { isAuthenticated } = useAuth()

const reviews = ref<Review[]>([])
const totalReviews = ref(0)
const averageRating = ref(0)
const ratingDistribution = ref<RatingDistribution[]>([])
const isSubmitting = ref(false)
const error = ref('')
const success = ref('')

const newReview = ref({
  rating: 5,
  comment: ''
})

// 获取评论数据
const fetchReviews = async () => {
  try {
    const data = await $fetch(`/api/reviews/${props.productId}`)
    reviews.value = data.reviews
    totalReviews.value = data.summary.totalReviews
    averageRating.value = data.summary.averageRating
    ratingDistribution.value = data.summary.ratingDistribution
  } catch (err) {
    console.error('Failed to fetch reviews:', err)
  }
}

// 提交评论
const submitReview = async () => {
  if (!newReview.value.comment || newReview.value.comment.length < 10) {
    error.value = 'Comment must be at least 10 characters'
    return
  }

  isSubmitting.value = true
  error.value = ''
  success.value = ''

  try {
    const response = await $fetch('/api/reviews/create', {
      method: 'POST',
      body: {
        productId: props.productId,
        rating: newReview.value.rating,
        comment: newReview.value.comment
      },
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token') || ''}`
      }
    })

    success.value = 'Review submitted successfully!'
    newReview.value.comment = ''
    newReview.value.rating = 5
    
    // 重新获取评论
    await fetchReviews()
    
    // 清除成功消息
    setTimeout(() => {
      success.value = ''
    }, 3000)
  } catch (err: any) {
    error.value = err.data?.statusMessage || 'Failed to submit review'
  } finally {
    isSubmitting.value = false
  }
}

// 切换有用状态
const toggleHelpful = (reviewId: number) => {
  const review = reviews.value.find(r => r.id === reviewId)
  if (review) {
    review.helpful = review.helpful > 0 ? 0 : 1
  }
}

// 格式化日期
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString()
}

// 组件挂载时获取评论
onMounted(() => {
  fetchReviews()
})
</script>