# 跨境电商购物平台 - Nuxt 3 项目

这是一个使用 Nuxt 3.0+ 开发的跨境电商购物平台项目，包含了完整的国际化支持、暗色模式和现代化的 UI 设计。

## 项目特性

- ✅ **Nuxt 3.0+** - 使用最新的 Nuxt 3 框架
- ✅ **Tailwind CSS** - 现代化的 CSS 框架，支持暗色模式
- ✅ **i18n 国际化** - 支持中文/英文双语切换，默认语言为英文
- ✅ **图标库** - 使用 @iconify/vue 提供丰富的图标支持
- ✅ **暗色模式** - 支持系统主题检测和手动切换
- ✅ **TypeScript** - 完整的 TypeScript 支持

## 项目结构

```
shopping/
├── assets/
│   └── css/
│       └── main.css          # 全局 CSS 文件，包含 Tailwind 配置
├── components/
│   └── Icon.vue              # 图标组件，基于 @iconify/vue
├── layouts/
│   └── default.vue           # 默认布局，包含导航栏和页脚
├── locales/
│   ├── en.json               # 英文翻译文件
│   └── zh.json               # 中文翻译文件
├── pages/
│   └── index.vue             # 首页
├── public/                   # 静态资源文件
├── server/                   # 服务端代码
├── app.vue                   # 根组件
├── i18n.config.ts            # i18n 配置文件
├── nuxt.config.ts            # Nuxt 配置文件
├── tailwind.config.ts        # Tailwind CSS 配置文件
└── package.json              # 项目依赖

```

## 安装依赖

```bash
# 使用 yarn
yarn install

# 或使用 npm
npm install

# 或使用 pnpm
pnpm install
```

## 开发服务器

启动开发服务器：

```bash
# 使用 yarn
yarn dev

# 或使用 npm
npm run dev

# 或使用 pnpm
pnpm dev
```

开发服务器将在 `http://localhost:3000` 启动。

## 构建项目

构建生产版本：

```bash
# 使用 yarn
yarn build

# 或使用 npm
npm run build

# 或使用 pnpm
pnpm build
```

## 预览生产构建

预览生产构建：

```bash
# 使用 yarn
yarn preview

# 或使用 npm
npm run preview

# 或使用 pnpm
pnpm preview
```

## 功能说明

### 1. Tailwind CSS 配置

项目已配置 Tailwind CSS，并启用了暗色模式。暗色模式通过 `dark:` 前缀类名实现。

配置文件：`tailwind.config.ts`

### 2. i18n 国际化

项目支持中文和英文双语切换，默认语言为英文。

- 语言文件：`locales/en.json` 和 `locales/zh.json`
- 配置文件：`i18n.config.ts`
- 使用方法：在组件中使用 `$t('key')` 进行翻译

### 3. 图标库

项目使用 `@iconify/vue` 提供图标支持。可以在组件中使用 `<Icon>` 组件。

示例：
```vue
<Icon name="mdi:store" class="w-6 h-6" />
```

可用的图标集：https://icones.js.org/

### 4. 暗色模式

项目支持暗色模式，可以通过导航栏中的按钮切换，或自动检测系统主题。

配置位置：`nuxt.config.ts` 中的 `colorMode` 配置

## 开发指南

### 添加新页面

在 `pages/` 目录下创建新的 `.vue` 文件即可自动生成路由。

### 添加新组件

在 `components/` 目录下创建新的 `.vue` 文件，Nuxt 会自动注册为全局组件。

### 添加新翻译

在 `locales/en.json` 和 `locales/zh.json` 中添加新的翻译键值对。

### 使用图标

使用 `<Icon>` 组件，指定图标的名称（格式：`collection:icon-name`）。

示例：
```vue
<Icon name="mdi:home" class="w-5 h-5" />
<Icon name="heroicons:user" class="w-6 h-6" />
```

## 技术栈

- **框架**: Nuxt 3.20.1
- **语言**: TypeScript
- **CSS 框架**: Tailwind CSS 4.1.17
- **国际化**: @nuxtjs/i18n ^8
- **图标库**: @iconify/vue 5.0.0
- **暗色模式**: @nuxtjs/color-mode 4.0.0

## 许可证

MIT License
