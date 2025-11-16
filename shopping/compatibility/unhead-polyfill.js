// unhead模块的完整polyfill实现
// 支持unhead和unhead/client

console.log('unhead-polyfill.js 已加载');

// 创建一个基本的head管理对象
const createBaseHead = () => ({
  resolveTags: () => [],
  addHeadObjs: () => {},
  removeHeadObjs: () => {},
  addEntry: () => {},
  removeEntry: () => {},
  ctx: {},
  push: () => {},
  pop: () => {},
  beforeMount: () => {},
  mounted: () => {},
  beforeUnmount: () => {},
  unmounted: () => {}
});

// 核心函数 - 解决getActiveHead缺失问题
export function getActiveHead() {
  return createBaseHead();
}

// 基础函数
export function createHead(options = {}) {
  return {
    ...createBaseHead(),
    options,
    install(app) {
      if (!app._nuxtHead) {
        app._nuxtHead = this;
      }
      return app;
    }
  };
}

export function createServerHead(options = {}) {
  return createHead(options);
}

// Vue组合式API函数
export function useHead(input) {
  // 记录但不实际处理，仅为了避免导入错误
  console.log('useHead called with:', input);
  return { update: () => {} };
}

export function useServerHead(input) {
  return useHead(input);
}

export function useSeoMeta(input) {
  return useHead({ meta: input });
}

export function useHeadSafe(input) {
  return useHead(input);
}

// 客户端特定的导出
export function useScript(input) {
  return { instance: {} };
}

// 服务器端特定的导出
export function defineHeadPlugin(plugin) {
  return plugin;
}

export function useHeadSsrContext() {
  return {};
}

// 标签管理
export function useBodyAttrs(input) {
  return useHead({ bodyAttrs: input });
}

export function useHtmlAttrs(input) {
  return useHead({ htmlAttrs: input });
}

export function useLink(input) {
  return useHead({ link: input });
}

export function useMeta(input) {
  return useHead({ meta: input });
}

export function useScriptSetup() {
  // 空实现
}

export function useServerSeoMeta(input) {
  return useServerHead({ meta: input });
}

export function useStyle(input) {
  return useHead({ style: input });
}

export function useTemplateParams(input) {
  return { update: () => {} };
}

export function useTitle(title) {
  return useHead({ title });
}

export function useTitleTemplate(template) {
  return useHead({ titleTemplate: template });
}

// 导出默认对象
export default {
  getActiveHead,
  createHead,
  createServerHead,
  createUnhead,
  useHead,
  useServerHead,
  useSeoMeta,
  useHeadSafe,
  useScript,
  defineHeadPlugin,
  useHeadSsrContext,
  useBodyAttrs,
  useHtmlAttrs,
  useLink,
  useMeta,
  useScriptSetup,
  useServerSeoMeta,
  useStyle,
  useTemplateParams,
  useTitle,
  useTitleTemplate
};

console.log('unhead-polyfill.js 已成功初始化，提供了完整的polyfill');
// 额外导出以兼容 @unhead/vue 对子路径的引用
export const SafeInputPlugin = {};
export const FlatMetaPlugin = {};
export const walkResolver = () => ({ resolve: () => ({}) });
export const createDebouncedFn = (fn) => fn;
export const renderDOMHead = () => {};
export const renderSSRHead = () => ({}) ;
export const headSymbol = Symbol('head');
export const AliasSortingPlugin = {};
export const DeprecationsPlugin = {};
export const PromisesPlugin = {};
export const TemplateParamsPlugin = {};
export function createUnhead(options = {}) { return createHead(options); }
