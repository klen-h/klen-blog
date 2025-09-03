<template>
  <Transition name="notification">
    <div 
      v-if="show" 
      :class="[
        'fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm',
        typeClasses[type]
      ]"
    >
      <div class="flex items-center">
        <Icon 
          :name="typeIcons[type]" 
          class="w-5 h-5 mr-3 flex-shrink-0"
        />
        <div class="flex-1">
          <p class="text-sm font-medium">{{ message }}</p>
        </div>
        <button 
          @click="close" 
          class="ml-3 flex-shrink-0"
        >
          <Icon name="lucide:x" class="w-4 h-4" />
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['success', 'error', 'info', 'warning'].includes(value)
  },
  duration: {
    type: Number,
    default: 3000
  }
})

const emit = defineEmits(['close'])

const typeClasses = {
  success: 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200',
  error: 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
  info: 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
  warning: 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200'
}

const typeIcons = {
  success: 'lucide:check-circle',
  error: 'lucide:x-circle',
  info: 'lucide:info',
  warning: 'lucide:alert-triangle'
}

const close = () => {
  emit('close')
}

// 自动关闭
watch(() => props.show, (newVal) => {
  if (newVal && props.duration > 0) {
    setTimeout(() => {
      close()
    }, props.duration)
  }
})
</script>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style> 