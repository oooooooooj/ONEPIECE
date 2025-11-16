// Fix consola import resolution issue
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  const nodeModulesPath = path.join(__dirname, 'node_modules');
  const consolaPath = path.join(nodeModulesPath, 'consola');
  
  // Create dist directory if it doesn't exist
  const distDir = path.join(consolaPath, 'dist');
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
    console.log('Created dist directory');
  }
  
  // Create a simple index.mjs file that imports the cjs version
  const indexMjsContent = `// This is a patched file to resolve import issues
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const consola = require('../lib/index.cjs');
export default consola;
`;
  
  fs.writeFileSync(path.join(distDir, 'index.mjs'), indexMjsContent);
  console.log('Created patched index.mjs file');
  console.log('Consola import issue should be resolved');
} catch (error) {
  console.error('Error creating patch:', error.message);
  console.log('Try running this script as administrator or with elevated privileges');
}