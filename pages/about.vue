<template>
  <div class="py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 页面标题 -->
      <PageTitle 
        title="关于我" 
        subtitle="一个技术开发者"
      />

      <!-- 个人介绍 -->
      <div class="card p-8 mb-8">
        <div class="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          <!-- 头像 -->
          <div class="w-32 h-32 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
            <img src="/assets/image/avatar.jpg" alt="" class="w-full h-full rounded-full object-cover">
          </div>
          
          <!-- 介绍内容 -->
          <div class="flex-1">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              你好，我是开发者
            </h2>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              我是一名前端开发者，通过这个博客网站，分享我的技术见解、学习心得和项目经验。如果你能从中收获，那就更好了。
            </p>
          </div>
        </div>
      </div>

      <!-- 技能栈 -->
      <div class="card p-8 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          技术栈
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              前端技术
            </h3>
            <div class="space-y-2">
              <SkillBar skill="Vue.js" :percentage="90" />
              <SkillBar skill="Nuxt.js" :percentage="85" />
              <SkillBar skill="TypeScript" :percentage="80" />
              <SkillBar skill="webpack/vite" :percentage="80" />
            </div>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              后端技术
            </h3>
            <div class="space-y-2">
              <SkillBar skill="Node.js" :percentage="10" />
              <SkillBar skill="数据库技术" :percentage="10" />
            </div>
          </div>
        </div>
      </div>

      <!-- 联系方式 -->
      <div class="card p-8">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          联系我
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex items-center space-x-3">
            <Icon name="lucide:phone" class="w-5 h-5 text-primary-600" />
            <span class="text-gray-700 dark:text-gray-300">18302085349</span>
          </div>
          <div class="flex items-center space-x-3">
            <Icon name="lucide:mail" class="w-5 h-5 text-primary-600" />
            <span class="text-gray-700 dark:text-gray-300">1213962718@qq.com</span>
          </div>
          <div class="flex items-center space-x-3">
            <Icon name="lucide:github" class="w-5 h-5 text-primary-600" />
            <a class="text-gray-700 dark:text-gray-300" href="https://github.com/klen-h" target="_blank">github.com/klen-h</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import PageTitle from '~/components/ui/PageTitle.vue'
import SkillBar from '~/components/ui/SkillBar.vue'

useHead({
  title: '关于 - 我的个人博客'
})
</script> 