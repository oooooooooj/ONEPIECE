// A wrapper script to start Nuxt dev server
import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// First, let's try to manually create the missing file structure using a different approach
console.log('Attempting to start Nuxt development server...');
console.log('Note: You might need to run this with elevated privileges to fix the consola import issue.');

// Try to start the development server with npx nuxi dev
const child = exec('npx nuxi dev', { cwd: __dirname });

child.stdout.on('data', (data) => {
  console.log(data);
});

child.stderr.on('data', (data) => {
  console.error(data);
});

child.on('close', (code) => {
  console.log(`Development server exited with code ${code}`);
  if (code !== 0) {
    console.log('\nIf you see consola import errors, try these steps:');
    console.log('1. Close all terminals and IDEs');
    console.log('2. Run PowerShell as Administrator');
    console.log('3. Navigate to your project directory');
    console.log('4. Run: rm -rf node_modules && npm install');
    console.log('5. Then try: npm run dev');
  }
});