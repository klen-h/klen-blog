<template>
  <div class="min-h-screen flex flex-col">
    <!-- 悬浮导航栏 -->
    <nav 
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      :class="[
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-700/50' 
          : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm'
      ]"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <NuxtLink to="/" class="text-2xl font-bold text-primary-600 dark:text-primary-400">
              我的博客
            </NuxtLink>
          </div>

          <!-- 导航菜单 -->
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <NuxtLink 
                to="/" 
                class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                active-class="text-primary-600 dark:text-primary-400"
              >
                首页
              </NuxtLink>
              <NuxtLink 
                to="/blog" 
                class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                active-class="text-primary-600 dark:text-primary-400"
              >
                博客
              </NuxtLink>
              <NuxtLink 
                to="/local-editor" 
                class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                active-class="text-primary-600 dark:text-primary-400"
              >
                编辑器
              </NuxtLink>
              <NuxtLink 
                to="/about" 
                class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                active-class="text-primary-600 dark:text-primary-400"
              >
                关于
              </NuxtLink>
            </div>
          </div>

          <!-- 右侧按钮 -->
          <div class="flex items-center space-x-4">
            <!-- 主题切换 -->
            <ClientOnly>
              <button 
                @click="toggleColorMode"
                class="p-2 rounded-lg bg-gray-100/50 dark:bg-gray-700/50 hover:bg-gray-200/70 dark:hover:bg-gray-600/70 transition-colors backdrop-blur-sm"
              >
                <Icon 
                  :name="colorMode.value === 'dark' ? 'lucide:sun' : 'lucide:moon'" 
                  class="w-5 h-5 text-gray-700 dark:text-gray-300"
                />
              </button>
            </ClientOnly>

            <!-- 移动端菜单按钮 -->
            <button 
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="md:hidden p-2 rounded-lg bg-gray-100/50 dark:bg-gray-700/50 hover:bg-gray-200/70 dark:hover:bg-gray-600/70 transition-colors backdrop-blur-sm"
            >
              <Icon 
                name="lucide:menu" 
                class="w-5 h-5 text-gray-700 dark:text-gray-300"
              />
            </button>
          </div>
        </div>

        <!-- 移动端菜单 -->
        <div v-if="mobileMenuOpen" class="md:hidden">
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200/50 dark:border-gray-700/50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-b-lg shadow-lg">
            <NuxtLink 
              to="/" 
              class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              active-class="text-primary-600 dark:text-primary-400"
              @click="mobileMenuOpen = false"
            >
              首页
            </NuxtLink>
            <NuxtLink 
              to="/blog" 
              class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              active-class="text-primary-600 dark:text-primary-400"
              @click="mobileMenuOpen = false"
            >
              博客
            </NuxtLink>
            <NuxtLink 
              to="/local-editor" 
              class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              active-class="text-primary-600 dark:text-primary-400"
              @click="mobileMenuOpen = false"
            >
              编辑器
            </NuxtLink>
            <NuxtLink 
              to="/about" 
              class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              active-class="text-primary-600 dark:text-primary-400"
              @click="mobileMenuOpen = false"
            >
              关于
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- 主要内容 -->
    <main class="flex-1 pt-16">
      <slot />
    </main>

    <!-- 页脚 -->
    <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <p class="text-gray-600 dark:text-gray-400">
            © 2025 我的个人博客. 基于 Nuxt3 构建.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const colorMode = useColorMode()
const mobileMenuOpen = ref(false)
const mounted = ref(false)
const isScrolled = ref(false)

onMounted(() => {
  mounted.value = true
  
  // 监听滚动事件
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 10
  }
  
  window.addEventListener('scroll', handleScroll)
  
  // 清理事件监听器
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
})

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script> 