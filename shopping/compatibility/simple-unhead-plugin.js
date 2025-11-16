// 🔒 终极Vite拦截插件 - 绝对确保所有unhead相关导入被拦截
// 这是经过全面增强的Vite插件，用于彻底解决Element is missing end tag错误
const path = require('path');
const fs = require('fs');

// 获取replacement文件的绝对路径
const unheadReplacementPath = path.resolve(__dirname, './unhead-replacement.js');

// 使用超级强大的正则表达式匹配所有可能的unhead相关导入路径
// 包括直接导入、深度导入、别名导入等各种情况
const unheadImportRegex = /^(@unhead\/(vue|ssr|shared|schema|dom|core|types|utils|runtime|vue2|webpack|vite|nuxt|react|solid|svelte|vue3|next|gatsby|astro)|unhead|vue-use-head|@vue\/use-head|@vueuse\/head|@nuxtjs\/head|nuxt-head|@nuxt\/head|@nuxtjs\/unhead|@unhead\/unhead)/;

// 匹配更广泛的unhead相关关键词
const unheadKeywordRegex = /(getActiveHead|useHead|createHead|renderHead|renderSSRHead|renderDOMHead|headSymbol|activeHead|headEntries|resolveTags|metaSymbol|seoMeta|useSeoMeta|headSafe|serverHead|clientHead|headPlugin|headContext|headState|headRender|headEntriesMap|headPayload|headInitDone|headConfig|headId|headTags)/;

// 记录已拦截的导入，避免重复日志
const interceptedImports = new Set();

// 生成调试日志 - 避免重复记录
function logInterception(importPath) {
  if (!interceptedImports.has(importPath)) {
    interceptedImports.add(importPath);
    console.log(`🎯 [unhead-compatibility] 拦截导入: ${importPath}`);
  }
}

// 生成警告日志
function logWarning(message) {
  console.warn(`⚠️ [unhead-compatibility] ${message}`);
}

// 检查是否为已知的排除路径
function isExcludedPath(id) {
  // 排除node_modules中的其他核心依赖
  return id.includes('node_modules') && !id.includes('unhead') && !id.includes('head');
}

// 导出增强的Vite插件
module.exports = {
  name: 'unhead-compatibility-plugin',
  version: '2.0.0',
  enforce: 'pre', // 确保在所有其他插件之前运行
  
  // 核心解析钩子 - 拦截所有unhead相关导入
  resolveId(source, importer, options) {
    // 检查是否匹配unhead相关导入
    if (unheadImportRegex.test(source)) {
      logInterception(source);
      // 绝对确保返回正确的替代模块路径
      return {
        id: unheadReplacementPath,
        external: false,
        syntheticNamedExports: true
      };
    }
    
    // 检查是否包含unhead相关关键词
    if (unheadKeywordRegex.test(source)) {
      logWarning(`检测到潜在的unhead关键词: ${source} (来源: ${importer || '未知'})`);
    }
    
    // 检查是否为深度导入（如 @unhead/vue/dist/index.js 等）
    if (source.includes('unhead') || source.includes('head-')) {
      logInterception(source);
      return {
        id: unheadReplacementPath,
        external: false,
        syntheticNamedExports: true
      };
    }
    
    return null;
  },
  
  // 添加load钩子以确保我们的替代模块被正确加载
  load(id) {
    // 如果是我们的替代模块，确保它被正确加载
    if (id === unheadReplacementPath) {
      console.log(`✅ [unhead-compatibility] 加载终极安全unhead替代模块: ${unheadReplacementPath}`);
      try {
        const content = fs.readFileSync(id, 'utf-8');
        return content;
      } catch (error) {
        console.error(`❌ [unhead-compatibility] 无法加载替代模块: ${error.message}`);
        // 返回一个最小的安全替代实现
        return 'module.exports = { getActiveHead: () => ({ resolveTags: () => [] }) };';
      }
    }
    return null;
  },
  
  // 转换钩子 - 深度扫描代码中的潜在问题
  transform(code, id) {
    // 跳过已排除的路径
    if (isExcludedPath(id)) {
      return null;
    }
    
    // 检查代码中是否有unhead相关调用
    if (unheadKeywordRegex.test(code) && !id.includes('unhead-replacement.js')) {
      // 记录调用位置，但不转换代码
      logWarning(`检测到代码中的unhead相关调用: ${id}`);
    }
    
    // 特殊检查：如果检测到getActiveHead的直接使用，添加注释警告
    if (code.includes('getActiveHead()') && !id.includes('unhead-replacement.js')) {
      logWarning(`⚠️ 高风险：检测到getActiveHead()的直接调用: ${id}`);
    }
    
    return null;
  },
  
  // 添加configureServer钩子以确保在服务器启动时加载
  configureServer(server) {
    console.log('🚀 [unhead-compatibility] 服务器配置完成，插件已激活，所有unhead导入将被绝对拦截');
    
    // 监听文件更改
    server.watcher.on('change', (file) => {
      if (file === unheadReplacementPath) {
        console.log(`🔄 [unhead-compatibility] unhead替代模块已更新: ${file}`);
        // 清除缓存
        interceptedImports.clear();
      }
    });
  },
  
  // 增强的模块解析钩子
  resolveDynamicImport(specifier) {
    // 拦截动态导入
    if (typeof specifier === 'string' && (unheadImportRegex.test(specifier) || specifier.includes('unhead') || specifier.includes('head'))) {
      logInterception(`动态导入: ${specifier}`);
      return {
        id: unheadReplacementPath,
        external: false,
        syntheticNamedExports: true
      };
    }
    return null;
  },
  
  // 优化钩子
  optimizeDeps: {
    exclude: ['unhead', '@unhead/vue', 'vue-use-head', '@vue/use-head', '@vueuse/head'],
    include: [unheadReplacementPath]
  },
  
  // 构建钩子
  buildStart() {
    console.log('🏗️ [unhead-compatibility] 构建开始，unhead兼容性插件已激活');
    // 确保替代文件存在
    if (!fs.existsSync(unheadReplacementPath)) {
      console.error(`❌ [unhead-compatibility] 致命错误：unhead替代模块不存在: ${unheadReplacementPath}`);
    }
  },
  
  // 模块解析后钩子
  moduleParsed(moduleInfo) {
    // 检查导入的模块
    if (moduleInfo.importedIds) {
      for (const importedId of moduleInfo.importedIds) {
        if (unheadImportRegex.test(importedId) || importedId.includes('unhead') || importedId.includes('head')) {
          logInterception(`模块导入: ${importedId} (来源: ${moduleInfo.id})`);
        }
      }
    }
  }
};
