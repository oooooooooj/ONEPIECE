// 启动Nuxt开发服务器的脚本
const { exec } = require('child_process');
const path = require('path');

console.log('正在启动Nuxt开发服务器...');

// 启动Nuxt开发服务器
const nuxtProcess = exec('npx nuxi dev --port 3000', {
  cwd: __dirname,
  env: {
    ...process.env,
    NODE_PATH: path.resolve(__dirname, 'node_modules')
  }
});

// 处理标准输出
nuxtProcess.stdout.on('data', (data) => {
  console.log(data.toString());
});

// 处理错误输出
nuxtProcess.stderr.on('data', (data) => {
  console.error(data.toString());
});

// 处理进程退出
nuxtProcess.on('close', (code) => {
  console.log(`Nuxt开发服务器退出，退出码 ${code}`);
});

// 处理SIGINT信号（Ctrl+C）
process.on('SIGINT', () => {
  console.log('接收到中断信号，正在停止Nuxt开发服务器...');
  nuxtProcess.kill();
});