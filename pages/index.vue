<template>
  <div>
    <!-- 英雄区域 -->
    <section class="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            欢迎来到我的博客
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            分享技术见解、学习心得和生活感悟的地方
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink to="/blog" class="btn btn-primary">
              浏览文章
            </NuxtLink>
            <NuxtLink to="/about" class="btn btn-secondary">
              了解更多
            </NuxtLink>
            <NuxtLink v-if="isVerified" to="/local-editor" class="btn btn-outline">
              本地编辑器
            </NuxtLink>
            <button v-else class="btn btn-outline" @click="showVerifyModal = true">
              显示编辑器
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 最新文章 -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageTitle title="最新文章" />

        <LoadingSpinner v-if="pending" />

        <div v-else-if="posts && posts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <PostCard 
            v-for="post in posts" 
            :key="post.slug || post.id" 
            :post="post"
          />
        </div>

        <div v-else class="text-center py-12">
          <p class="text-gray-600 dark:text-gray-300">暂无文章</p>
        </div>
      </div>
    </section>
    <!-- 验证弹窗 -->
    <div v-if="showVerifyModal" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/50" @click="closeModal"></div>
      <div class="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl w-11/12 max-w-md p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">访问验证</h3>
        <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">请回答问题以解锁本地编辑器：该博客的作者姓氏是？</p>
        <input
          v-model="verifyAnswer"
          type="text"
          class="input mb-4"
          placeholder="请输入作者姓氏"
          @keyup.enter="submitVerify"
        />
        <div class="flex justify-end gap-3">
          <button class="btn btn-secondary" @click="closeModal">取消</button>
          <button class="btn btn-primary" @click="submitVerify">验证</button>
        </div>
        <p v-if="verifyError" class="text-red-600 dark:text-red-400 text-sm mt-3">{{ verifyError }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import PageTitle from '~/components/ui/PageTitle.vue'
import LoadingSpinner from '~/components/ui/LoadingSpinner.vue'
import PostCard from '~/components/blog/PostCard.vue'

useHead({
  title: '首页 - 我的个人博客'
})

// 使用本地数据
const posts = ref([])
const pending = ref(false)
const isVerified = ref(false)
const showVerifyModal = ref(false)
const verifyAnswer = ref('')
const verifyError = ref('')

// 从API加载文章
const loadPosts = async () => {
  try {
    posts.value = await $fetch('/api/posts')
    posts.value = posts.value.slice(0,6)
  } catch (error) {
    posts.value = []
  }
}

// 页面加载时初始化
onMounted(() => {
  loadPosts()
  try {
    isVerified.value = localStorage.getItem('editorVerified') === 'true'
  } catch (e) {
    isVerified.value = false
  }
})

const closeModal = () => {
  showVerifyModal.value = false
  verifyAnswer.value = ''
  verifyError.value = ''
}

const submitVerify = () => {
  const answer = (verifyAnswer.value || '').trim()
  if (answer === '黄') {
    try {
      localStorage.setItem('editorVerified', 'true')
    } catch (e) {}
    isVerified.value = true
    closeModal()
  } else {
    verifyError.value = '答案不正确，请重试'
  }
}
</script>

<style scoped>
</style> 