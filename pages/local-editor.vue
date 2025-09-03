<template>
    <div class="py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- 页面标题 -->
        <PageTitle 
          title="本地编辑器" 
          subtitle="简单高效的本地文章编辑方案"
        />
  
        <!-- 编辑器工具栏 -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <!-- 只读提示 -->
          <div v-if="IS_READONLY" class="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
            <div class="flex items-center">
              <Icon name="lucide:info" class="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2" />
              <span class="text-yellow-800 dark:text-yellow-200 text-sm">
                <strong>生产环境：</strong>此编辑器为只读模式，仅用于展示 UI 功能，无法保存或上传文件。
              </span>
            </div>
          </div>
          <div class="flex flex-wrap gap-2 mb-4">
            <button 
              @click="insertMarkdown('**', '**')" 
              class="btn btn-sm btn-secondary"
              title="粗体"
            >
              <Icon name="lucide:bold" class="w-4 h-4" />
            </button>
            <button 
              @click="insertMarkdown('*', '*')" 
              class="btn btn-sm btn-secondary"
              title="斜体"
            >
              <Icon name="lucide:italic" class="w-4 h-4" />
            </button>
            <button 
              @click="insertMarkdown('### ', '')" 
              class="btn btn-sm btn-secondary"
              title="标题"
            >
              <Icon name="lucide:heading" class="w-4 h-4" />
            </button>
            <button 
              @click="insertMarkdown('- ', '')" 
              class="btn btn-sm btn-secondary"
              title="列表"
            >
              <Icon name="lucide:list" class="w-4 h-4" />
            </button>
            <button 
              @click="insertMarkdown('[', '](url)')" 
              class="btn btn-sm btn-secondary"
              title="链接"
            >
              <Icon name="lucide:link" class="w-4 h-4" />
            </button>
            <button 
              @click="insertImage" 
              class="btn btn-sm btn-secondary"
              title="插入图片"
            >
              <Icon name="lucide:image" class="w-4 h-4" />
            </button>
            <button 
              @click="insertMarkdown('```\n', '\n```')" 
              class="btn btn-sm btn-secondary"
              title="代码块"
            >
              <Icon name="lucide:code" class="w-4 h-4" />
            </button>
            <button 
              @click="insertMarkdown('> ', '')" 
              class="btn btn-sm btn-secondary"
              title="引用"
            >
              <Icon name="lucide:quote" class="w-4 h-4" />
            </button>
            <div class="relative">
              <button 
                @click="showColorPicker = !showColorPicker"
                class="btn btn-sm btn-secondary"
                title="文字颜色"
              >
                <Icon name="lucide:palette" class="w-4 h-4" />
              </button>
              <!-- 颜色选择器 -->
              <div 
                v-if="showColorPicker" 
                class="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg p-3 z-10"
              >
                <div class="grid grid-cols-4 gap-2">
                  <button 
                    v-for="color in textColors" 
                    :key="color.name"
                    @click="insertColor(color.value)"
                    class="w-8 h-8 rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-400 transition-colors"
                    :style="{ backgroundColor: color.value }"
                    :title="color.name"
                  ></button>
                </div>
              </div>
            </div>
          </div>
  
          <!-- 文章信息 -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                文章标题
              </label>
              <input 
                v-model="articleTitle" 
                type="text" 
                class="input w-full text-xl font-bold"
                placeholder="输入文章标题..."
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                文章别名 (slug)
              </label>
              <input 
                v-model="articleSlug" 
                type="text" 
                class="input w-full"
                placeholder="文章URL标识..."
              />
            </div>
          </div>
  
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                分类标签
              </label>
              <input 
                v-model="articleTags" 
                type="text" 
                class="input w-full"
                placeholder="技术,学习,生活 (用逗号分隔)"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                摘要
              </label>
              <input 
                v-model="articleExcerpt" 
                type="text" 
                class="input w-full text-sm"
                placeholder="文章摘要..."
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                发布日期
              </label>
              <input 
                v-model="articleDate" 
                type="date" 
                class="input w-full"
              />
            </div>
          </div>
  
          <!-- 编辑器 -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Markdown 编辑器
              </label>
              <textarea 
                v-model="markdownContent" 
                class="w-full h-96 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="开始写作..."
              ></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                预览
              </label>
              <div class="w-full h-96 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white overflow-y-auto prose prose-sm max-w-none">
                <div v-html="renderedContent"></div>
              </div>
            </div>
          </div>
  
          <!-- 操作按钮 -->
          <div class="flex flex-wrap gap-4 mt-6">
            <button @click="saveArticle" class="btn btn-primary">
              <Icon name="lucide:save" class="w-4 h-4 mr-2" />
              保存文章
            </button>
            <button @click="previewArticle" class="btn btn-secondary">
              <Icon name="lucide:eye" class="w-4 h-4 mr-2" />
              预览文章
            </button>
            <button @click="loadArticle" class="btn btn-secondary">
              <Icon name="lucide:folder-open" class="w-4 h-4 mr-2" />
              加载文章
            </button>
            <button @click="clearEditor" class="btn btn-outline">
              <Icon name="lucide:trash-2" class="w-4 h-4 mr-2" />
              清空编辑器
            </button>
          </div>
        </div>
  
        <!-- 文章列表 -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            本地文章列表
          </h3>
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    标题
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    别名
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    标签
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    日期
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="article in localArticles" :key="article.slug">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {{ article.title }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {{ article.slug }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    <span 
                      v-for="tag in article.tags" 
                      :key="tag"
                      class="inline-block bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-full px-2 py-1 text-xs mr-1"
                    >
                      {{ tag }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {{ formatDate(article.date) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      @click="editArticle(article)"
                      class="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300 mr-3"
                    >
                      编辑
                    </button>
                    <button 
                      @click="deleteArticle(article.slug)"
                      class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                    >
                      删除
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
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
  import PageTitle from '~/components/ui/PageTitle.vue'
  import Notification from '~/components/ui/Notification.vue'
  import { marked } from 'marked'
  const router = useRouter()
  
  useHead({
    title: '本地编辑器 - 我的个人博客'
  })
  
  // 响应式数据
  const articleTitle = ref('')
  const articleSlug = ref('')
  const articleTags = ref('')
  const articleExcerpt = ref('')
  const articleDate = ref(new Date().toISOString().split('T')[0])
  const markdownContent = ref('')
  const localArticles = ref([])
  const showColorPicker = ref(false)

  // 生产环境为只读演示模式
  const IS_READONLY = import.meta.env.PROD
  
  // 文字颜色选项
  const textColors = ref([
    { name: '红色', value: '#ef4444' },
    { name: '灰色', value: '#6b7280' },
    { name: '黄色', value: '#eab308' },
    { name: '绿色', value: '#22c55e' },
  ])
  
  // 通知状态
  const notification = ref({
    show: false,
    message: '',
    type: 'info'
  })
  
  // 计算属性
  const renderedContent = computed(() => {
    return marked(markdownContent.value || '')
  })
  
  // 方法
  const insertMarkdown = (before, after) => {
    const textarea = document.querySelector('textarea')
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = markdownContent.value.substring(start, end)
    
    const newText = before + selectedText + after
    markdownContent.value = markdownContent.value.substring(0, start) + newText + markdownContent.value.substring(end)
    
    // 设置光标位置
    nextTick(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length)
    })
  }
  
  // 添加一个全局变量来存储 images 目录的权限
  const imagesDirHandle = ref(null)

  const insertImage = async () => {
    try {
      if (IS_READONLY) {
        showInfo('生产环境不支持图片上传')
        return
      }
      // 创建文件选择器
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/*'
      
      input.onchange = async (e) => {
        const file = e.target.files[0]
        if (!file) return
        
        try {
          // 显示上传进度
          showInfo('正在上传图片...')
          
          // 创建 FormData
          const formData = new FormData()
          formData.append('image', file)
          
          // 发送到 server API
          const response = await fetch('/api/save-image', {
            method: 'POST',
            body: formData
          })
          
          if (!response.ok) {
            const error = await response.text()
            throw new Error(error)
          }
          
          const result = await response.json()
          
          if (result.success) {
            // 在光标位置插入图片
            insertImageAtCursor(`![${result.originalName}](${result.imagePath})`)
            showSuccess(`图片已保存到 public/images: ${result.imageName}`)
          } else {
            throw new Error('上传失败')
          }
          
        } catch (error) {
          console.error('上传失败:', error)
          showError('图片上传失败: ' + error.message)
        }
      }
      
      // 触发文件选择
      input.click()
      
    } catch (error) {
      console.error('选择文件失败:', error)
      showError('选择文件失败: ' + error.message)
    }
  }
  
  // 在光标位置插入图片的函数
  const insertImageAtCursor = (imageMarkdown) => {
    const textarea = document.querySelector('textarea')
    
    // 如果编辑器没有焦点，先聚焦
    if (document.activeElement !== textarea) {
      textarea.focus()
    }
    
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    
    // 在光标位置插入图片
    const beforeCursor = markdownContent.value.substring(0, start)
    const afterCursor = markdownContent.value.substring(end)
    
    markdownContent.value = beforeCursor + imageMarkdown + '\n' + afterCursor
    
    // 设置光标位置到图片后面
    nextTick(() => {
      textarea.focus()
      const newCursorPos = start + imageMarkdown.length + 1 // +1 for the newline
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    })
  }
  
  // 插入颜色
  const insertColor = (colorValue) => {
    const textarea = document.querySelector('textarea')
    
    // 如果编辑器没有焦点，先聚焦
    if (document.activeElement !== textarea) {
      textarea.focus()
    }
    
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = markdownContent.value.substring(start, end)
    
    // 如果没有选中文本，提示用户
    if (!selectedText) {
      showInfo('请先选中要设置颜色的文字')
      return
    }
    
    // 插入带颜色的文本
    const coloredText = `<span style="color: ${colorValue}">${selectedText}</span>`
    const beforeCursor = markdownContent.value.substring(0, start)
    const afterCursor = markdownContent.value.substring(end)
    
    markdownContent.value = beforeCursor + coloredText + afterCursor
    
    // 设置光标位置
    nextTick(() => {
      textarea.focus()
      const newCursorPos = start + coloredText.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    })
    
    // 关闭颜色选择器
    showColorPicker.value = false
  }
  
  const saveArticle = async () => {
    if (IS_READONLY) {
      showInfo('生产环境为只读，无法保存文章')
      return
    }
    if (!articleTitle.value || !articleSlug.value) {
      showError('请填写文章标题和别名')
      return
    }

    const article = {
      title: articleTitle.value,
      slug: articleSlug.value,
      content: markdownContent.value,
      excerpt: articleExcerpt.value,
      tags: articleTags.value.split(',').map(tag => tag.trim()).filter(tag => tag),
      date: articleDate.value,
      createdAt: new Date().toISOString()
    }

    try {
      const articles = await $fetch('/api/posts.json')
      const existingIndex = articles.findIndex(a => a.slug === article.slug)
      if (existingIndex >= 0) {
        articles[existingIndex] = article
        // 发送整个更新后的数组
        await $fetch('/api/posts.json', {
          method: 'POST',
          body: articles  // 发送数组，触发全量覆盖
        })
      } else {
        // 发送单个对象，触发追加
        await $fetch('/api/posts.json', {
          method: 'POST',
          body: article
        })
      }
      loadLocalArticles()
      showSuccess('文章保存成功')
    } catch (error) {
      showError('保存失败: ' + error.message)
    }
  }
  
  const previewArticle = () => {
    if (!articleSlug.value) {
      showError('请先填写文章别名')
      return
    }
    
    // 在新窗口打开预览
    const previewData = {
      title: articleTitle.value,
      content: markdownContent.value,
      excerpt: articleExcerpt.value,
      tags: articleTags.value.split(',').map(tag => tag.trim()).filter(tag => tag),
      date: articleDate.value
    }
    
    localStorage.setItem('previewArticle', JSON.stringify(previewData))
    window.open('/preview', '_blank')
  }
  
  const loadArticle = async () => {
    if (IS_READONLY) {
      showInfo('生产环境为只读，无法从服务端加载文章')
      return
    }
    try {
      const articles = await $fetch('/api/posts.json')
      if (articles.length === 0) {
        showInfo('暂无保存的文章')
        return
      }
      const articleSlugValue = prompt('请输入要加载的文章别名：')
      if (articleSlugValue) {
        const article = articles.find(a => a.slug === articleSlugValue)
        if (article) {
          articleTitle.value = article.title
          articleSlug.value = article.slug
          markdownContent.value = article.content
          articleExcerpt.value = article.excerpt || ''
          articleTags.value = article.tags.join(', ')
          articleDate.value = article.date
          showSuccess('文章加载成功')
        } else {
          showError('未找到该文章')
        }
      }
    } catch (error) {
      showError('加载失败: ' + error.message)
    }
  }
  
  const clearEditor = () => {
    if (confirm('确定要清空编辑器吗？')) {
      articleTitle.value = ''
      articleSlug.value = ''
      articleTags.value = ''
      articleExcerpt.value = ''
      articleDate.value = new Date().toISOString().split('T')[0]
      markdownContent.value = ''
    }
  }
  
  const editArticle = (article) => {
    articleTitle.value = article.title
    articleSlug.value = article.slug
    markdownContent.value = article.content
    articleExcerpt.value = article.excerpt || ''
    articleTags.value = article.tags.join(', ')
    articleDate.value = article.date
    showSuccess('文章加载成功')
  }
  
  const deleteArticle = async (slug) => {
    if (IS_READONLY) {
      showInfo('生产环境为只读，无法删除文章')
      return
    }
    if (confirm(`确定要删除文章 ${slug} 吗？`)) {
      try {
        const articles = await $fetch('/api/posts.json')
        const filteredArticles = articles.filter(a => a.slug !== slug)
        // 重新写入所有未被删除的文章
        await $fetch('/api/posts.json', {
          method: 'POST',
          body: filteredArticles
        })
        loadLocalArticles()
        showSuccess('文章删除成功')
      } catch (error) {
        showError('删除失败: ' + error.message)
      }
    }
  }
  
  const loadLocalArticles = async () => {
    try {
      const articles = await $fetch('/api/posts.json')
      localArticles.value = articles
    } catch (error) {
      localArticles.value = []
    }
  }
  
  // 通知函数
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
  
  const showInfo = (message) => {
    notification.value = {
      show: true,
      message,
      type: 'info'
    }
  }
  
  // 日期格式化
  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }
  
  // 页面加载时初始化
  onMounted(() => {
    // 访问校验
    try {
      const verified = localStorage.getItem('editorVerified') === 'true'
      if (!verified) {
        router.replace('/')
        return
      }
    } catch (e) {
      router.replace('/')
      return
    }

    loadLocalArticles()
    
    // 加载本地图片列表（模拟）
    // localImages.value = [ // This line is removed as per the edit hint
    //   { name: 'sample-1.jpg', size: 1024000, type: 'image/jpeg' },
    //   { name: 'sample-2.png', size: 2048000, type: 'image/png' },
    //   { name: 'sample-3.gif', size: 512000, type: 'image/gif' }
    // ]
  })
  
  // 监听文章标题变化，自动生成别名
  watch(articleTitle, (newTitle) => {
    if (newTitle && !articleSlug.value) {
      articleSlug.value = newTitle
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
    }
  })
  
  // 键盘快捷键
  onMounted(() => {
    const handleKeydown = (e) => {
      // Ctrl+S 保存文章
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault()
        saveArticle()
      }
      // Ctrl+Enter 预览文章
      if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault()
        previewArticle()
      }
    }
    
    document.addEventListener('keydown', handleKeydown)
    
    onUnmounted(() => {
      document.removeEventListener('keydown', handleKeydown)
    })
  })
</script>

<style scoped>
.prose {
  @apply text-gray-900 dark:text-white;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  @apply text-gray-900 dark:text-white font-bold;
}

.prose h1 {
  @apply text-2xl mb-4;
}

.prose h2 {
  @apply text-xl mb-3;
}

.prose h3 {
  @apply text-lg mb-2;
}

.prose p {
  @apply mb-4;
}

.prose ul,
.prose ol {
  @apply mb-4 pl-6;
}

.prose li {
  @apply mb-1;
}

.prose blockquote {
  @apply border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic text-gray-600 dark:text-gray-400;
}

.prose code {
  @apply bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm;
}

.prose pre {
  @apply bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto;
}

.prose pre code {
  @apply bg-transparent p-0;
}

.prose a {
  @apply text-primary-600 dark:text-primary-400 hover:underline;
}

.prose img {
  @apply max-w-full h-auto rounded-lg;
}

.prose table {
  @apply w-full border-collapse border border-gray-300 dark:border-gray-600;
}

.prose th,
.prose td {
  @apply border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm;
}

.prose th {
  @apply bg-gray-50 dark:bg-gray-700 font-semibold;
}

/* 自定义滚动条 */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  @apply bg-gray-100 dark:bg-gray-700;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  @apply bg-gray-300 dark:bg-gray-600 rounded;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400 dark:bg-gray-500;
}

/* 编辑器焦点样式 */
textarea:focus {
  @apply ring-2 ring-primary-500 border-transparent;
}

/* 按钮悬停效果 */
.btn:hover {
  @apply transform scale-105 transition-transform;
}

/* 图片悬停效果 */
.group:hover img {
  @apply transform scale-105 transition-transform;
}

/* 颜色选择器动画 */
.color-picker-enter-active,
.color-picker-leave-active {
  @apply transition-all duration-200;
}

.color-picker-enter-from,
.color-picker-leave-to {
  @apply opacity-0 transform scale-95;
}
</style>