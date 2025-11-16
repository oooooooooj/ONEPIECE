const fs = require('fs');
const path = require('path');

// 创建一个修复consola导入的模块
const fixConsolaModulePath = path.join(__dirname, 'fix-consola');
const indexMjsPath = path.join(fixConsolaModulePath, 'index.mjs');

// 创建目录
if (!fs.existsSync(fixConsolaModulePath)) {
  fs.mkdirSync(fixConsolaModulePath, { recursive: true });
}

// 写入index.mjs文件，使用动态导入来避免ESM和CJS的混合问题
const indexMjsContent = `// 修复consola导入的模块
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// 导出consola的CommonJS版本
const consola = require('consola/lib/index.cjs');
export default consola;
export * from 'consola/lib/index.cjs';
`;

fs.writeFileSync(indexMjsPath, indexMjsContent);

console.log('Consola修复模块已创建在fix-consola/index.mjs');
console.log('现在可以通过导入\'./fix-consola\'来使用修复后的consola模块');