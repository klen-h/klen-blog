# 静态部署说明

## 概述

本项目使用 Nuxt3 的静态站点生成 (SSG) 功能，可以部署到任何静态托管服务上，如 GitHub Pages、Netlify、Vercel 等。

## 部署方式

### 方式1：GitHub Actions 自动部署（推荐）

1. **启用 GitHub Pages**
   - 进入仓库设置 → Pages
   - Source 选择 "GitHub Actions"

2. **推送代码触发部署**
   ```bash
   git add .
   git commit -m "feat: 配置静态部署"
   git push origin main
   ```

3. **查看部署状态**
   - 进入 Actions 标签页
   - 查看部署进度和结果

### 方式2：手动构建部署

1. **本地构建**
   ```bash
   # 安装依赖
   npm install
   
   # 生成静态文件
   npm run generate
   ```

2. **部署静态文件**
   - 将 `.output/public` 目录的内容上传到你的托管服务

## 构建配置说明

### Nuxt 配置

```typescript
nitro: {
  preset: 'static',  // 静态部署模式
  prerender: {
    crawlLinks: false,  // 禁用自动爬取，手动指定路由
    routes: [
      '/',
      '/blog',
      '/about',
      '/preview',
      '/local-editor',
      '/api/posts.json'  // 静态API文件
    ]
  }
}
```

### 预渲染路由

- **页面路由**：`/`, `/blog`, `/about` 等
- **静态API文件**：`/api/posts.json` 提供文章数据
- **动态路由**：基于 `data/posts.json` 自动生成文章详情页

## 数据文件处理

### 静态API解决方案

由于静态部署时 API 路由无法动态响应，我们采用了以下解决方案：

1. **创建静态JSON文件**：`public/api/posts.json`
2. **预渲染包含**：在 `nuxt.config.ts` 中指定路由
3. **前端直接访问**：通过 `/api/posts.json` 获取数据

### posts.json 结构

```json
[
  {
    "title": "文章标题",
    "slug": "文章标识",
    "excerpt": "文章摘要",
    "tags": ["标签1", "标签2"],
    "date": "发布日期",
    "createdAt": "创建时间"
  }
]
```

### 构建时数据验证

构建过程会：
1. 检查 `data/posts.json` 文件是否存在
2. 验证 JSON 格式是否正确
3. 自动生成文章详情页路由
4. 生成静态API文件

## 部署后验证

### 检查要点

1. **首页是否正常显示**
   - 访问 `https://your-domain.com/`

2. **API 是否返回数据**
   - 访问 `https://your-domain.com/api/posts.json`
   - 应该返回 JSON 格式的文章数据

3. **文章页面是否正常**
   - 访问 `https://your-domain.com/blog`
   - 点击文章链接查看详情页

### 常见问题

#### 1. API 返回空数据

**原因**：静态API文件未正确生成或路径错误

**解决**：
- 确保 `public/api/posts.json` 文件存在
- 检查构建输出中是否包含该文件
- 验证访问路径是否正确

#### 2. 页面显示 404

**原因**：路由未正确预渲染

**解决**：
- 检查 `nuxt.config.ts` 中的路由配置
- 确保所有需要的路由都在 `prerender.routes` 中
- 重新构建并部署

#### 3. 样式或脚本加载失败

**原因**：资源路径配置错误

**解决**：
- 检查 `nuxt.config.ts` 中的 `app.baseURL` 配置
- 确保与你的部署路径一致

## 更新内容

### 添加新文章

1. **更新数据文件**
   ```bash
   # 编辑 public/api/posts.json 添加新文章
   # 或者编辑 data/posts.json 后重新构建
   ```

2. **重新部署**
   ```bash
   git add .
   git commit -m "feat: 添加新文章"
   git push origin main
   ```

### 修改现有文章

1. **更新数据文件**
2. **重新部署**

## 性能优化

### 构建优化

- 使用 `npm run generate` 生成静态文件
- 确保只预渲染必要的路由
- 优化图片和静态资源

### 运行时优化

- 启用浏览器缓存
- 使用 CDN 加速
- 压缩静态资源

## 监控和维护

### 部署监控

- 设置部署通知
- 监控构建状态
- 记录部署历史

### 内容更新

- 定期更新文章内容
- 监控API响应状态
- 备份重要数据

## 技术支持

如果遇到部署问题，请：

1. 检查构建日志
2. 验证配置文件
3. 确认数据文件格式
4. 查看 GitHub Actions 状态

## 解决方案对比

### 静态部署（当前方案）

**优点**：
- 部署简单，支持任何静态托管
- 加载速度快，SEO友好
- 成本低，无需服务器

**缺点**：
- API数据无法动态更新
- 需要重新构建才能更新内容

### 服务端渲染（替代方案）

**优点**：
- 支持动态API
- 实时数据更新
- 更灵活的功能

**缺点**：
- 需要服务器支持
- 部署复杂度较高
- 成本相对较高

---

**注意**：当前使用静态部署模式，API 数据通过预生成的 JSON 文件提供。如需动态功能，请考虑切换到服务端渲染模式。
