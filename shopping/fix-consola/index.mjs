// 修复consola导入的模块
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// 导出consola的CommonJS版本
const consola = require('consola/lib/index.cjs');
export default consola;
export * from 'consola/lib/index.cjs';
