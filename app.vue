<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
// 设置页面标题
useHead({
  title: '我的个人博客',
  meta: [
    { name: 'description', content: '一个基于Nuxt3构建的个人博客' }
  ]
})
</script>
