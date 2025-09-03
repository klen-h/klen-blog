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
  experimental: {
    payloadExtraction: false
  },
  app: {
    // 改为你的 GitHub 仓库名
    baseURL: '/klen-blog/',  // 或者你实际使用的仓库名
    buildAssetsDir: 'nuxt_assets',
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
  // 静态部署配置
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: false,  // 禁用自动爬取，手动指定路由
      routes: [
        '/',
        '/blog',
        '/about',
        '/preview',
        '/local-editor',
        '/api/posts.json'  // 包含静态API文件
      ]
    }
  }
})