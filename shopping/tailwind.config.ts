import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  darkMode: 'class', // 启用类名切换暗色模式
  theme: {
    extend: {
      colors: {
        // 核心视觉规范色彩方案
        primary: {
          DEFAULT: '#2563EB', // 主色：科技蓝
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#2563EB', // 主色
          600: '#1D4ED8',
          700: '#1E40AF',
          800: '#1E3A8A',
          900: '#1E3A8A'
        },
        secondary: {
          DEFAULT: '#10B981', // 辅色：信任绿
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981', // 辅色
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B'
        },
        background: {
          DEFAULT: '#F9FAFB', // 背景色：浅灰
          light: '#F9FAFB',
          dark: '#111827'
        }
      },
      fontFamily: {
        // 字体规范
        heading: ['Inter', 'sans-serif'], // 标题字体
        body: ['Lato', 'sans-serif'] // 正文字体
      },
      borderRadius: {
        // 按钮圆角规范
        button: '8px'
      },
      spacing: {
        // 16px基准网格系统（4px倍数）
        // 已包含：0, 1(4px), 2(8px), 3(12px), 4(16px), 5(20px), 6(24px), 8(32px), 10(40px), 12(48px), 16(64px), 20(80px), 24(96px)
      },
      boxShadow: {
        // 按钮悬停阴影
        'button-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }
    }
  },
  plugins: []
} satisfies Config

