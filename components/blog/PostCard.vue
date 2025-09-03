<template>
  <article class="card p-6 hover:scale-105 transition-transform duration-200">
    <div class="mb-4">
      <span 
        v-for="tag in post.tags" 
        :key="tag"
        class="inline-block bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-xs font-medium px-2 py-1 rounded-full mr-2"
      >
        {{ tag }}
      </span>
    </div>
    <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
      {{ post.title }}
    </h2>
    <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
      {{ post.excerpt }}
    </p>
    <div class="flex items-center justify-between">
      <span class="text-sm text-gray-500 dark:text-gray-400">
        {{ formatDate(post.date || post.created_at) }}
      </span>
      <NuxtLink 
        :to="`/blog/${post.slug}`" 
        class="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm"
      >
        阅读更多 →
      </NuxtLink>
    </div>
  </article>
</template>

<script setup>
const { formatDate } = useDate()

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})
</script> 