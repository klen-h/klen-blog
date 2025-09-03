# Nuxt3 个人博客

一个基于 Nuxt3 构建的现代化个人博客系统，**使用本地存储模式**。

## 📝 项目状态

**当前使用本地存储模式，无需外部数据库：**

- ✅ 本地编辑器功能完整
- ✅ 文章预览功能正常
- ✅ 本地文章管理
- ✅ 图片上传（本地存储）
- ✅ 响应式设计
- ✅ 深色模式支持
- ✅ SEO 优化

## 功能特性

- 🎨 现代化响应式设计
- 🌙 深色模式支持
- 📱 移动端友好
- 🔍 文章搜索和筛选
- 📄 文章详情页面
- 🎯 SEO 优化
- ⚡ 快速加载
- 📝 本地编辑器
- 💾 本地存储管理
- 🖼️ 图片上传功能

## 技术栈

- **框架**: Nuxt 3
- **样式**: Tailwind CSS
- **图标**: Lucide Vue
- **字体**: Google Fonts (Inter, Poppins)
- **存储**: 本地 JSON 文件
- **Markdown**: Marked.js

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 项目结构

```
├── assets/          # 静态资源
│   └── css/        # 样式文件
├── components/      # Vue 组件
│   ├── ui/         # 通用UI组件
│   └── blog/       # 博客相关组件
├── composables/     # 组合式函数
├── content/         # 内容文件
├── data/           # 本地数据存储
├── layouts/         # 布局文件
├── pages/           # 页面文件
│   ├── index.vue   # 首页
│   ├── about.vue   # 关于页面
│   ├── local-editor.vue # 本地编辑器
│   ├── preview.vue # 预览页面
│   └── blog/       # 博客相关页面
├── public/          # 公共文件
│   └── images/     # 上传的图片
├── server/          # 服务端API
│   └── api/        # API接口
├── app.vue          # 主应用文件
├── nuxt.config.ts   # Nuxt 配置
└── package.json     # 项目依赖
```

## 页面说明

### 首页 (`/`)
- 展示博客介绍
- 显示最新文章列表
- 特色功能展示

### 博客列表 (`/blog`)
- 文章列表展示
- 搜索和筛选功能
- 分页支持

### 文章详情 (`/blog/[slug]`)
- 文章完整内容
- 相关文章推荐
- 社交分享功能

### 本地编辑器 (`/local-editor`)
- 在线文章编辑器
- Markdown 支持
- 实时预览
- 图片上传功能

### 预览页面 (`/preview`)
- 文章预览功能
- 支持不同主题

### 关于页面 (`/about`)
- 个人介绍
- 技术栈展示
- 联系方式

## 数据存储

项目使用本地 JSON 文件存储数据：

- `data/posts.json` - 文章数据
- `public/images/` - 上传的图片文件

## 自定义配置

### 修改主题颜色

在 `tailwind.config.js` 中自定义颜色：

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // 自定义主色调
      }
    }
  }
}
```

### 修改字体

在 `nuxt.config.ts` 中修改 Google Fonts 配置：

```typescript
googleFonts: {
  families: {
    'Inter': [300, 400, 500, 600, 700],
    'Poppins': [300, 400, 500, 600, 700]
  }
}
```

## 部署

### 静态部署

```bash
npm run generate
```

生成的静态文件在 `.output/public` 目录中。

### 服务器部署

```bash
npm run build
```

构建后的文件在 `.output` 目录中。

## 开发说明

### 添加新文章

1. 使用本地编辑器 (`/local-editor`) 创建文章
2. 文章会自动保存到 `data/posts.json`
3. 支持 Markdown 格式

### 图片上传

1. 在编辑器中点击图片上传按钮
2. 图片会保存到 `public/images/` 目录
3. 自动生成访问链接

### 自定义组件

项目包含多个可复用组件：

- `LoadingSpinner` - 加载动画
- `PageTitle` - 页面标题
- `SkillBar` - 技能进度条
- `PostCard` - 文章卡片

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License 