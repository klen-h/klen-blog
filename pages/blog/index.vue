<template>
  <div class="py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 页面标题 -->
      <PageTitle 
        title="博客文章" 
        subtitle="分享技术见解和学习心得"
      />

      <!-- 搜索和筛选 -->
      <div class="mb-8">
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1">
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="搜索文章..." 
              class="input"
            />
          </div>
          <select v-model="selectedCategory" class="input max-w-xs">
            <option value="">所有分类</option>
            <option value="技术">技术</option>
            <option value="学习">学习</option>
            <option value="生活">生活</option>
            <!-- <option value="前端">前端</option>
            <option value="后端">后端</option>
            <option value="全栈">全栈</option> -->
          </select>
        </div>
      </div>

      <!-- 加载状态 -->
      <LoadingSpinner v-if="pending" />

      <!-- 文章列表 -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <PostCard 
          v-for="post in paginatedPosts" 
          :key="post.slug || post.id" 
          :post="post"
        />
      </div>

      <!-- 分页 -->
      <div v-if="totalPages > 1" class="flex justify-center mt-12">
        <div class="flex space-x-2">
          <button 
            @click="goToPrevPage"
            :disabled="currentPage === 1"
            class="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            上一页
          </button>
          <span class="flex items-center px-4 text-gray-600 dark:text-gray-300">
            第 {{ currentPage }} 页，共 {{ totalPages }} 页
          </span>
          <button 
            @click="goToNextPage"
            :disabled="currentPage === totalPages"
            class="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            下一页
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import PageTitle from '~/components/ui/PageTitle.vue'
import LoadingSpinner from '~/components/ui/LoadingSpinner.vue'
import PostCard from '~/components/blog/PostCard.vue'

useHead({
  title: '博客 - 我的个人博客'
})

const searchQuery = ref('')
const selectedCategory = ref('')
const currentPage = ref(1)
const postsPerPage = 9

// 使用本地数据
const posts = ref([])
const pending = ref(false)

// 从API加载文章
const loadPosts = async () => {
  try {
    posts.value = await $fetch('/api/posts.json')
  } catch (error) {
    posts.value = []
  }
}

// 页面加载时初始化
onMounted(() => {
  loadPosts()
})

// 过滤文章
const filteredPosts = computed(() => {
  if (!posts.value) return []
  
  let filtered = posts.value

  // 按分类筛选
  if (selectedCategory.value) {
    filtered = filtered.filter(post => 
      post.tags && post.tags.includes(selectedCategory.value)
    )
  }

  // 按搜索词筛选
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(post => 
      post.title.toLowerCase().includes(query)
    )
  }

  return filtered
})

// 分页后的文章
const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage
  const end = start + postsPerPage
  return filteredPosts.value.slice(start, end)
})

// 计算总页数
const totalPages = computed(() => {
  return Math.ceil(filteredPosts.value.length / postsPerPage)
})

// 监听筛选条件变化，重置页码
watch([searchQuery, selectedCategory], () => {
  currentPage.value = 1
})

const goToNextPage = () => {
  currentPage.value++
  // 滚动到页面顶部
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // 平滑滚动
  })
}

const goToPrevPage = () => {
  currentPage.value--
  // 滚动到页面顶部
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script> 