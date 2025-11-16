# 核心视觉规范文档

本文档详细说明了项目的核心视觉规范，所有开发必须严格遵循。

## 1. 色彩方案

### 主色（Primary）
- **颜色**: `#2563EB` - 科技蓝
- **用途**: 主要按钮、链接、强调元素
- **Tailwind 类**: `bg-primary`, `text-primary`, `border-primary`
- **变体**: `primary-50` 到 `primary-900`

### 辅色（Secondary）
- **颜色**: `#10B981` - 信任绿
- **用途**: 成功状态、次要按钮、辅助元素
- **Tailwind 类**: `bg-secondary`, `text-secondary`, `border-secondary`
- **变体**: `secondary-50` 到 `secondary-900`

### 背景色（Background）
- **浅色模式**: `#F9FAFB` - 浅灰
- **暗色模式**: `#111827` - 深灰
- **Tailwind 类**: `bg-background-light`, `bg-background-dark`

## 2. 字体规范

### 标题字体
- **字体**: Inter (Google Fonts)
- **用途**: 所有标题（h1-h6）
- **权重**: 400, 500, 600, 700, 800, 900
- **Tailwind 类**: `font-heading`
- **自动应用**: 所有 `<h1>` 到 `<h6>` 标签自动使用

### 正文字体
- **字体**: Lato (Google Fonts)
- **用途**: 正文、段落、按钮文字
- **权重**: 400, 700
- **Tailwind 类**: `font-body`
- **默认字体**: 全局默认使用 Lato

## 3. 按钮规范

### 圆角
- **值**: `8px`
- **Tailwind 类**: `rounded-button`
- **应用**: 所有按钮必须使用此圆角

### 悬停阴影
- **阴影值**: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`
- **Tailwind 类**: `shadow-button-hover`
- **应用**: 所有按钮悬停时自动应用

### 按钮样式类

#### 主按钮（Primary Button）
```vue
<button class="btn-primary">按钮文字</button>
```
- 背景色：主色（#2563EB）
- 文字：白色
- 悬停：加深背景色 + 阴影效果

#### 辅按钮（Secondary Button）
```vue
<button class="btn-secondary">按钮文字</button>
```
- 背景色：辅色（#10B981）
- 文字：白色
- 悬停：加深背景色 + 阴影效果

#### 轮廓按钮（Outline Button）
```vue
<button class="btn-outline">按钮文字</button>
```
- 背景：透明
- 边框：2px 主色边框
- 文字：主色
- 悬停：填充主色背景 + 白色文字 + 阴影效果

## 4. 间距规范（16px 基准网格）

所有元素必须使用 **16px 基准网格系统**，即所有 padding 和 margin 必须是 **4px 的倍数**。

### 标准间距值

| Tailwind 类 | 像素值 | 用途 |
|------------|--------|------|
| `p-1` / `m-1` | 4px | 极小间距 |
| `p-2` / `m-2` | 8px | 小间距 |
| `p-3` / `m-3` | 12px | 中小间距 |
| `p-4` / `m-4` | 16px | 标准间距（基准） |
| `p-5` / `m-5` | 20px | 中间距 |
| `p-6` / `m-6` | 24px | 大间距 |
| `p-8` / `m-8` | 32px | 超大间距 |
| `p-10` / `m-10` | 40px | 特大间距 |
| `p-12` / `m-12` | 48px | 极大间距 |

### 间距工具类

已预定义的间距工具类：
- `.spacing-xs` - 4px
- `.spacing-sm` - 8px
- `.spacing-md` - 16px（基准）
- `.spacing-lg` - 24px
- `.spacing-xl` - 32px
- `.spacing-2xl` - 48px

### 间距使用示例

```vue
<!-- ✅ 正确：使用4px倍数 -->
<div class="p-4 mb-6">内容</div>  <!-- 16px padding, 24px margin-bottom -->
<div class="px-4 py-2">内容</div>  <!-- 16px 水平, 8px 垂直 -->

<!-- ❌ 错误：不是4px倍数 -->
<div class="p-3.5 mb-5.5">内容</div>  <!-- 避免使用小数 -->
```

## 5. 使用示例

### 完整按钮示例
```vue
<template>
  <div class="p-4 space-y-4">
    <button class="btn-primary">主要操作</button>
    <button class="btn-secondary">次要操作</button>
    <button class="btn-outline">轮廓按钮</button>
  </div>
</template>
```

### 卡片示例（使用16px基准网格）
```vue
<template>
  <div class="card p-4 mb-6">
    <h2 class="font-heading text-2xl mb-4">标题</h2>
    <p class="font-body text-gray-600">正文内容</p>
  </div>
</template>
```

### 布局示例
```vue
<template>
  <div class="container mx-auto px-4 py-8">
    <section class="mb-12">
      <h1 class="font-heading text-4xl mb-4">页面标题</h1>
      <p class="font-body text-lg mb-6">页面描述</p>
      <div class="flex gap-4">
        <button class="btn-primary">按钮1</button>
        <button class="btn-outline">按钮2</button>
      </div>
    </section>
  </div>
</template>
```

## 6. 检查清单

在开发新组件或页面时，请确保：

- [ ] 使用主色 `#2563EB` 作为主要强调色
- [ ] 使用辅色 `#10B981` 作为次要强调色
- [ ] 标题使用 `Inter` 字体（自动应用）
- [ ] 正文使用 `Lato` 字体（默认）
- [ ] 所有按钮使用 `rounded-button`（8px圆角）
- [ ] 所有按钮悬停时有阴影效果
- [ ] 所有间距使用4px倍数（16px基准网格）
- [ ] 背景色使用 `bg-background-light`（浅色）或 `bg-background-dark`（暗色）

## 7. 配置文件位置

- **Tailwind 配置**: `tailwind.config.ts`
- **全局样式**: `assets/css/main.css`
- **颜色定义**: `tailwind.config.ts` 中的 `theme.extend.colors`
- **字体定义**: `tailwind.config.ts` 中的 `theme.extend.fontFamily`
- **按钮样式**: `assets/css/main.css` 中的 `.btn-*` 类

---

**重要**: 所有开发必须严格遵循此视觉规范，确保整个项目的一致性和专业性。

