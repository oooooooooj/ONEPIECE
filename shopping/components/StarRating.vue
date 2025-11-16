<template>
  <div class="flex items-center gap-1">
    <button
      v-for="star in 5"
      :key="star"
      type="button"
      @click="!readonly && $emit('update:modelValue', star)"
      :disabled="readonly"
      class="transition-colors"
      :class="[
        readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110',
        star <= (hoverRating || modelValue) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
      ]"
      @mouseenter="!readonly && (hoverRating = star)"
      @mouseleave="!readonly && (hoverRating = 0)"
    >
      <Icon name="mdi:star" class="w-5 h-5" />
    </button>
    <span v-if="showRating" class="text-sm text-gray-600 dark:text-gray-400 ml-2">
      {{ modelValue }}/5
    </span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: number
  readonly?: boolean
  showRating?: boolean
}>()

defineEmits<{
  'update:modelValue': [value: number]
}>()

const hoverRating = ref(0)
</script>