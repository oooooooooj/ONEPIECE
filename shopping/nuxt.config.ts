// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
import { fileURLToPath } from 'url'
import path from 'path'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03', // 使用更保守的兼容性日期
  devtools: { enabled: false },
  
  // 移除客户端插件，避免与Vite插件冲突
  plugins: [],
  
  
  
  // 禁用可能导致问题的实验性功能
  experimental: {
    payloadExtraction: false,
    headNext: false,
    // 确保不启用可能依赖unhead的实验性功能
    renderJsonPayloads: false,
    appManifest: true
  },
  
  vite: {
    resolve: {
      alias: {}
    },
    server: {
      hmr: {
        port: 24679
      }
    }
  },
  
  // 服务器配置
  server: {
    port: 3000
  },

  modules: [
    '@nuxt/content',
    '@nuxt/image',
    
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
    '@nuxt/icon'
  ],

  // i18n 配置
  i18n: {
    locales: [
      {
        code: 'zh-TW',
        language: 'zh-Hant',
        name: '繁體中文',
        file: 'zh-TW.json'
      },
      {
        code: 'en',
        language: 'en-US',
        name: 'English',
        file: 'en.json'
      },
      {
        code: 'zh',
        language: 'zh-CN',
        name: '简体中文',
        file: 'zh.json'
      }
    ],
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'zh-TW',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
    vueI18n: './i18n.config.ts'
  },

  // 图片优化配置
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
    },
    presets: {
      hero: {
        modifiers: {
          format: 'webp',
          quality: 80,
          width: 1920,
          height: 1080
        }
      },
      contactHero: {
        modifiers: {
          format: 'avif',
          quality: 75,
          width: 1920,
          height: 800,
          fit: 'cover'
        }
      },
      newsHero: {
        modifiers: {
          format: 'avif',
          quality: 75,
          width: 1920,
          height: 800,
          fit: 'cover'
        }
      },
      thumbnail: {
        modifiers: {
          format: 'webp',
          quality: 80,
          width: 160,
          height: 160,
          fit: 'cover'
        }
      }
    }
  },

  // 暗色模式配置
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
  },

  // CSS 配置
  css: ['~/assets/css/main.css'],

  // Tailwind CSS 配置
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config'
  },

  // 性能优化配置
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: ''
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lato:wght@400;500;600;700&display=swap'
        }
      ]
    }
  },

  // 构建优化
  nitro: {
    compressPublicAssets: true,
    minify: true
  },

  // 实验性功能 - 提升性能
  
  runtimeConfig: {
    public: {
      wpBaseUrl: process.env.WP_BASE_URL || ''
    }
  }
})
