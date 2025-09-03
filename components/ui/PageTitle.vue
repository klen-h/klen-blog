<template>
  <div class="text-center mb-12">
    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
      {{ title }}
    </h1>
    <p v-if="subtitle" class="text-xl text-gray-600 dark:text-gray-300">
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  }
})
</script> 