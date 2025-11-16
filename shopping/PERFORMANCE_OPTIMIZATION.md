# 性能优化和响应式设计文档

## 1. 响应式设计（PC/平板/手机适配）

### 断点系统
项目使用 Tailwind CSS 的标准断点：
- `sm`: 640px（小屏幕/大手机）
- `md`: 768px（平板）
- `lg`: 1024px（小桌面）
- `xl`: 1280px（桌面）
- `xxl`: 1536px（大桌面）

### 响应式实现

#### 导航栏
- **桌面端** (`md:`): 水平菜单栏，显示所有菜单项
- **移动端** (`<md`): 汉堡菜单按钮，点击展开垂直菜单

#### 主视觉区
- **标题**: `text-4xl sm:text-5xl md:text-6xl lg:text-7xl`
- **按钮**: `flex-col sm:flex-row` - 移动端垂直排列，桌面端水平排列
- **间距**: `px-4 sm:px-6 lg:px-8` - 响应式内边距

#### 优势卡片
- **移动端**: 单列 (`grid-cols-1`)
- **平板**: 两列 (`sm:grid-cols-2`)
- **桌面**: 三列 (`lg:grid-cols-3`)

#### 页脚
- **移动端**: 单列布局
- **平板**: 两列布局 (`sm:grid-cols-2`)
- **桌面**: 四列布局 (`lg:grid-cols-4`)

### 响应式工具类使用
所有页面都使用响应式间距和字体大小：
- `px-4 sm:px-6 lg:px-8` - 响应式内边距
- `py-8 sm:py-12` - 响应式垂直间距
- `text-2xl sm:text-3xl md:text-4xl` - 响应式字体大小
- `gap-3 sm:gap-4` - 响应式间距

## 2. 页面加载速度优化（<1.5秒）

### 图片优化

#### 使用 @nuxt/image 模块
- **格式**: WebP（现代浏览器），自动降级到 JPG
- **质量**: 80%（平衡质量和文件大小）
- **懒加载**: 非关键图片使用 `loading="lazy"`
- **预加载**: 关键图片（主视觉区）使用 `loading="eager"` 和 `preload`

#### 图片配置
```typescript
image: {
  quality: 80,
  format: ['webp', 'avif', 'jpg'],
  screens: {
    xs: 320,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1536,
  }
}
```

#### 主视觉区图片优化
```vue
<NuxtImg
  src="..."
  format="webp"
  quality="80"
  loading="eager"
  preload
  sizes="100vw"
/>
```

### 字体优化

#### Google Fonts 预连接
```typescript
link: [
  {
    rel: 'preconnect',
    href: 'https://fonts.googleapis.com'
  },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossorigin: ''
  }
]
```

#### 字体加载策略
- 使用 `display=swap` 确保文本可见性
- 仅加载需要的字重（Inter: 400-900, Lato: 400, 700）

### 构建优化

#### Nitro 压缩
```typescript
nitro: {
  compressPublicAssets: true,
  minify: true
}
```

#### 实验性优化
```typescript
experimental: {
  payloadExtraction: false
}
```

### CSS 优化
- 使用 Tailwind CSS 的 JIT 模式（自动启用）
- 仅包含使用的样式类
- 自动移除未使用的 CSS

### JavaScript 优化
- Vue 3 的 Tree-shaking
- 代码分割（自动）
- 懒加载路由组件

## 3. 仅英文界面（跨境电商审美）

### 语言配置
- **仅保留英文**: 从 i18n 配置中移除中文
- **禁用语言检测**: `detectBrowserLanguage: false`
- **默认语言**: 英文 (`defaultLocale: 'en'`)

### 移除的功能
- ❌ 语言切换按钮（已移除）
- ❌ 中文翻译文件（保留但不使用）
- ❌ 所有中文字符

### 界面语言
所有界面文本仅使用英文：
- 导航菜单：Home, Products, About, Contact
- 按钮：Shop, About
- 页脚：所有文本均为英文
- 社交媒体：Follow Us

## 4. 性能检查清单

### 图片优化
- [x] 使用 NuxtImg 组件
- [x] WebP 格式
- [x] 质量设置为 80%
- [x] 关键图片预加载
- [x] 响应式图片尺寸

### 字体优化
- [x] Google Fonts 预连接
- [x] 仅加载需要的字重
- [x] 使用 display=swap

### 响应式设计
- [x] 所有元素使用响应式类
- [x] 移动端菜单
- [x] 响应式字体大小
- [x] 响应式间距
- [x] 响应式网格布局

### 构建优化
- [x] 资源压缩
- [x] 代码压缩
- [x] Tree-shaking
- [x] 代码分割

## 5. 性能目标

- **首屏加载**: < 1.5 秒
- **LCP (Largest Contentful Paint)**: < 2.5 秒
- **FID (First Input Delay)**: < 100 毫秒
- **CLS (Cumulative Layout Shift)**: < 0.1

## 6. 测试建议

### 性能测试工具
- Google PageSpeed Insights
- Lighthouse (Chrome DevTools)
- WebPageTest

### 响应式测试
- Chrome DevTools 设备模拟器
- 真实设备测试（手机、平板、桌面）

### 网络条件测试
- 3G/4G/5G 网络模拟
- 慢速网络测试
- 离线功能测试

---

**注意**: 所有优化配置已在 `nuxt.config.ts` 中实现，确保项目符合性能要求。

