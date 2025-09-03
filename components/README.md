# 组件库

这个目录包含了项目中封装的通用组件，用于提高代码复用性和维护性。

## 目录结构

```
components/
├── ui/              # 通用UI组件
│   ├── LoadingSpinner.vue    # 加载动画组件
│   ├── PageTitle.vue         # 页面标题组件
│   └── SkillBar.vue          # 技能进度条组件
├── blog/            # 博客相关组件
│   └── PostCard.vue          # 文章卡片组件
└── README.md                 # 组件说明文档
```

## UI组件 (ui/)

### LoadingSpinner.vue
**加载动画组件**

**Props:**
- `size` (String): 尺寸大小，可选值：'sm', 'md', 'lg', 'xl'，默认：'lg'

**使用示例:**
```vue
<LoadingSpinner />
<LoadingSpinner size="sm" />
```

### PageTitle.vue
**页面标题组件**

**Props:**
- `title` (String, required): 主标题
- `subtitle` (String, optional): 副标题

**使用示例:**
```vue
<PageTitle title="博客文章" subtitle="分享技术见解" />
```

### SkillBar.vue
**技能进度条组件**

**Props:**
- `skill` (String, required): 技能名称
- `percentage` (Number, required): 技能百分比 (0-100)

**使用示例:**
```vue
<SkillBar skill="Vue.js" :percentage="90" />
```

## 博客组件 (blog/)

### PostCard.vue
**文章卡片组件**

**Props:**
- `post` (Object, required): 文章对象，包含以下属性：
  - `id`: 文章ID
  - `title`: 文章标题
  - `excerpt`: 文章摘要
  - `slug`: 文章链接
  - `tags`: 文章标签数组
  - `created_at`: 创建时间

**使用示例:**
```vue
<PostCard :post="postData" />
```

## 组合式函数 (composables/)

### useDate.ts
**日期格式化工具**

**方法:**
- `formatDate(dateString)`: 格式化日期为中文格式
- `formatShortDate(dateString)`: 格式化日期为简短格式
- `formatRelativeTime(dateString)`: 格式化相对时间

**使用示例:**
```vue
<script setup>
const { formatDate, formatRelativeTime } = useDate()
</script>
```

## 样式类 (assets/css/main.css)

### 多行文本省略
- `.line-clamp-1`: 单行省略
- `.line-clamp-2`: 两行省略
- `.line-clamp-3`: 三行省略

**使用示例:**
```vue
<p class="line-clamp-2">{{ text }}</p>
```

## 优势

1. **代码复用**: 减少重复代码，提高开发效率
2. **一致性**: 确保UI组件在不同页面保持一致的样式和行为
3. **维护性**: 集中管理组件，便于维护和更新
4. **可扩展性**: 组件设计支持多种配置选项
5. **类型安全**: 使用TypeScript提供类型检查

## 使用建议

1. 优先使用封装的组件，避免重复编写相同功能
2. 新增通用功能时，考虑封装为组件或composable
3. 保持组件的单一职责原则
4. 为组件添加适当的Props验证
5. 及时更新组件文档 