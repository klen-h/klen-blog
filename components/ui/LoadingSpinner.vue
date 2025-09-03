<template>
  <div class="flex justify-center py-12">
    <div 
      class="animate-spin rounded-full border-b-2 border-primary-600"
      :class="[
        size === 'sm' ? 'h-6 w-6' : '',
        size === 'md' ? 'h-8 w-8' : '',
        size === 'lg' ? 'h-12 w-12' : '',
        size === 'xl' ? 'h-16 w-16' : ''
      ]"
    ></div>
  </div>
</template>

<script setup>
const props = defineProps({
  size: {
    type: String,
    default: 'lg',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  }
})
</script> 