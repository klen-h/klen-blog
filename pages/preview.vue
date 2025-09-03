<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- 预览工具栏 -->
    <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <h1 class="text-lg font-semibold text-gray-900 dark:text-white">
              文章预览
            </h1>
            <span class="text-sm text-gray-500 dark:text-gray-400">
              {{ formatDate(article.date) }}
            </span>
          </div>
          <div class="flex items-center space-x-2">
            <button @click="closePreview" class="btn btn-sm btn-outline">
              <Icon name="lucide:x" class="w-4 h-4 mr-2" />
              关闭
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 文章内容 -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 markdown-body">
      <article class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <!-- 文章头部 -->
        <div class="p-8 border-b border-gray-200 dark:border-gray-700">
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            {{ article.title }}
          </h1>
          
          <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <div class="flex items-center">
              <Icon name="lucide:calendar" class="w-4 h-4 mr-2" />
              {{ formatDate(article.date) }}
            </div>
            <div v-if="article.tags && article.tags.length > 0" class="flex items-start">
              <Icon name="lucide:tag" class="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
              <div class="flex flex-wrap gap-1">
                <span 
                  v-for="tag in article.tags" 
                  :key="tag"
                  class="inline-block bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-full px-2 py-1 text-xs"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>

          <div v-if="article.excerpt" class="text-m text-gray-600 dark:text-gray-300 italic border-l-4 border-primary-500 pl-4">
            {{ article.excerpt }}
          </div>
        </div>

        <!-- 文章主体 -->
        <div class="p-8 pt-0">
          <div class="prose prose-lg max-w-none dark:prose-invert">
            <div v-html="renderedContent"></div>
          </div>
        </div>

        <!-- 文章底部 -->
        <div class="p-8 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-600 dark:text-gray-400">
              <p>文章预览 - 本地编辑器</p>
            </div>
            <div class="space-x-4">
              <button @click="copyArticleLink" class="btn btn-sm btn-outline flex items-center">
                <Icon name="lucide:link" class="w-4 h-4 mr-2" />
                复制链接
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>

    <!-- 通知组件 -->
    <Notification 
      :show="notification.show"
      :message="notification.message"
      :type="notification.type"
      @close="notification.show = false"
    />
  </div>
</template>

<script setup>
import Notification from '~/components/ui/Notification.vue'
import { marked } from 'marked'

useHead({
  title: '文章预览 - 我的个人博客'
})

// 响应式数据
const article = ref({
  title: '',
  content: '',
  excerpt: '',
  tags: [],
  date: new Date().toISOString().split('T')[0]
})

const notification = ref({
  show: false,
  message: '',
  type: 'info'
})

// 计算属性
const renderedContent = computed(() => {
  return marked(article.value.content || '')
})

// 方法
const loadPreviewData = () => {
  try {
    const previewData = localStorage.getItem('previewArticle')
    if (previewData) {
      article.value = JSON.parse(previewData)
    } else {
      showError('没有找到预览数据')
    }
  } catch (error) {
    showError('加载预览数据失败')
  }
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const closePreview = () => {
  window.close()
}

const copyArticleLink = () => {
  navigator.clipboard.writeText(window.location.href).then(() => {
    showSuccess('链接已复制到剪贴板')
  }).catch(() => {
    showError('复制失败')
  })
}

const showSuccess = (message) => {
  notification.value = {
    show: true,
    message,
    type: 'success'
  }
}

const showError = (message) => {
  notification.value = {
    show: true,
    message,
    type: 'error'
  }
}

// 初始化
onMounted(() => {
  loadPreviewData()
})
</script>
