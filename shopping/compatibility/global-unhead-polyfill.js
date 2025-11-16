// 超级安全的全局unhead polyfill
// 确保所有函数都返回绝对安全的内容，避免任何HTML标签结构问题

console.log('加载超级安全的全局unhead polyfill...');

// 为unhead模块创建一个全局polyfill对象 - 超级安全版本
const unheadPolyfill = {
  // 核心函数 - 绝对安全版本
  getActiveHead: () => ({
    resolveTags: () => [],
    addHeadObjs: () => {},
    removeHeadObjs: () => {},
    addEntry: () => {},
    removeEntry: () => {},
    ctx: {},
    // 添加所有可能被调用的方法
    updateDOM: () => {},
    resolveMeta: () => [],
    resolveLinks: () => [],
    resolveScripts: () => [],
    resolveStyles: () => []
  }),
  
  // 超级安全的createHead函数
  createHead: () => ({
    resolveTags: () => [],
    addEntry: () => ({ remove: () => {}, update: () => {} }),
    removeEntry: () => {},
    addHeadObjs: function() { return this; },
    removeHeadObjs: function() { return this; },
    ctx: {},
    updateDOM: () => {},
    resolveMeta: () => [],
    resolveLinks: () => [],
    resolveScripts: () => [],
    resolveStyles: () => [],
    resolveSSRHead: () => ({
      headTags: '',
      bodyTags: '',
      htmlAttrs: {},
      bodyAttrs: {}
    }),
    normalizeTags: () => [],
    install: () => {},
    resolved: false
  }),
  
  // 所有其他可能用到的函数
  useHead: () => ({ remove: () => {} }),
  useServerHead: () => ({ remove: () => {} }),
  useBodyAttrs: () => ({ remove: () => {} }),
  useHtmlAttrs: () => ({ remove: () => {} }),
  useScript: () => ({ remove: () => {} }),
  useTitle: () => ({ remove: () => {} }),
  useMeta: () => ({ remove: () => {} }),
  renderSSRHead: () => ({
    headTags: '',
    bodyTags: '',
    htmlAttrs: {},
    bodyAttrs: {}
  }),
  renderDOMHead: () => ''
};

// 保存原始的import函数
const originalImport = window.import;

// 重写import函数以拦截所有unhead相关的导入
if (originalImport) {
  window.import = function(modulePath, ...args) {
    // 检查是否是unhead相关的导入 - 更广泛的匹配
    if (modulePath.includes('unhead') || modulePath.includes('@unhead')) {
      console.log('拦截unhead导入请求:', modulePath);
      
      // 返回一个解析为我们的超级安全polyfill的Promise
      return Promise.resolve({
        default: unheadPolyfill,
        ...unheadPolyfill
      });
    }
    
    // 对于其他导入，使用原始的import函数
    return originalImport.call(this, modulePath, ...args);
  };
}

// 直接在全局作用域中提供getActiveHead函数
window.getActiveHead = unheadPolyfill.getActiveHead;

console.log('全局unhead polyfill加载完成！');
