export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'zh-TW',
  fallbackLocale: 'en',
  messages: {
    en: {
      welcome: 'Welcome',
      home: 'Home',
      about: 'About',
      contact: 'Contact',
      language: 'Language',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode',
      allPrices: 'All Prices'
    },
    zh: {
      welcome: '欢迎',
      home: '首页',
      about: '关于',
      contact: '联系我们',
      language: '语言',
      darkMode: '暗色模式',
      lightMode: '亮色模式',
      allPrices: '所有价格'
    },
    'zh-TW': {
      welcome: '歡迎',
      home: '首頁',
      about: '關於',
      contact: '聯絡我們',
      language: '語言',
      darkMode: '深色模式',
      lightMode: '淺色模式',
      allPrices: '所有價格'
    }
  }
}))

