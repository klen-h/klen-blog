<template>
  <div class="flex items-center justify-between">
    <span class="text-gray-700 dark:text-gray-300">{{ skill }}</span>
    <div class="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
      <div 
        class="bg-primary-600 h-2 rounded-full transition-all duration-300"
        :style="{ width: `${percentage}%` }"
      ></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  skill: {
    type: String,
    required: true
  },
  percentage: {
    type: Number,
    required: true,
    validator: (value) => value >= 0 && value <= 100
  }
})
</script> 