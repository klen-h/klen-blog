// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxtjs/google-fonts',
    '@nuxt/icon'
  ],
  css: ['~/assets/css/main.css'],
  colorMode: {
    classSuffix: ''
  },
  googleFonts: {
    families: {
      'Inter': [300, 400, 500, 600, 700],
      'Poppins': [300, 400, 500, 600, 700]
    }
  },
  app: {
    // 改为你的 GitHub 仓库名
    baseURL: '/klen-blog/',  // 或者你实际使用的仓库名
    head: {
      title: '我的个人博客',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '一个基于Nuxt3构建的个人博客' }
      ],
      // 使用相对路径，避免 baseURL 下 404
      link: [
        { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }
      ]
    }
  },
  // 组件自动导入配置
  components: {
    dirs: [
      '~/components',
      '~/components/ui',
      '~/components/blog'
    ]
  },
  // 预渲染纯静态（包含 /api/posts 与动态文章路由）
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: [
        '/blog',
        '/about',
        '/preview',
        '/api/posts',
        // 暂时跳过根路径
        // '/',
      ]
    }
  }
})