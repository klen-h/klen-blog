<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- 文章内容 -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 加载状态 -->
      <LoadingSpinner v-if="pending" />

      <!-- 文章内容 -->
      <article v-else-if="post" class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden markdown-body">
        <!-- 文章头部 -->
        <div class="p-8 border-b border-gray-200 dark:border-gray-700">
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            {{ post.title }}
          </h1>
          
          <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <div class="flex items-center">
              <Icon name="lucide:calendar" class="w-4 h-4 mr-2" />
              {{ formatDate(post.date || post.created_at) }}
            </div>
            <div v-if="post.tags && post.tags.length > 0" class="flex items-center">
              <Icon name="lucide:tag" class="w-4 h-4 mr-2 flex-shrink-0" />
              <div class="flex flex-wrap gap-1">
                <span 
                  v-for="tag in post.tags" 
                  :key="tag"
                  class="inline-block bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-full px-2 py-1 text-xs"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>

          <div v-if="post.excerpt" class="text-m text-gray-600 dark:text-gray-300 italic border-l-4 border-primary-500 pl-4">
            {{ post.excerpt }}
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
              <p>文章详情</p>
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

      <!-- 相关文章 -->
      <div v-if="post && relatedPosts.length > 0" class="mt-12">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            相关文章
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PostCard 
              v-for="relatedPost in relatedPosts" 
              :key="relatedPost.slug || relatedPost.id"
              :post="relatedPost"
            />
          </div>
        </div>
      </div>
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
import LoadingSpinner from '~/components/ui/LoadingSpinner.vue'
import PostCard from '~/components/blog/PostCard.vue'
import Notification from '~/components/ui/Notification.vue'
import { marked } from 'marked'

const route = useRoute()
const postSlug = route.params.slug
const { formatDate } = useDate()

useHead({
  title: '文章详情 - 我的个人博客'
})

// 使用本地数据
const post = ref(null)
const pending = ref(false)

// 计算属性 - 渲染Markdown内容
const renderedContent = computed(() => {
  return marked(post.value?.content || '')
})

// 从API加载文章详情
const loadPost = async () => {
  try {
    const articles = await $fetch('/api/posts')
    const foundPost = articles.find(article => article.slug === postSlug)
    if (foundPost) {
      post.value = foundPost
    } else {
      throw createError({
        statusCode: 404,
        message: '文章未找到'
      })
    }
  } catch (error) {
    console.error('加载文章失败:', error)
    throw createError({
      statusCode: 404,
      message: '文章未找到'
    })
  }
}

// 获取相关文章
const allPosts = ref([])
const relatedPosts = computed(() => {
  if (!allPosts.value || !post.value) return []
  return allPosts.value
    .filter(p => p.slug !== post.value.slug)
    .slice(0, 2)
})

// 复制文章链接
const copyArticleLink = () => {
  navigator.clipboard.writeText(window.location.href).then(() => {
    showSuccess('链接已复制到剪贴板')
  }).catch((error) => {
    console.error('复制失败:', error)
    showError('复制失败')
  })
}

// 通知状态
const notification = ref({
  show: false,
  message: '',
  type: 'info'
})

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

// 页面加载时初始化
onMounted(async () => {
  await loadPost()
  // 加载所有文章用于相关文章推荐
  try {
    allPosts.value = await $fetch('/api/posts')
  } catch (error) {
    allPosts.value = []
  }
})
</script>