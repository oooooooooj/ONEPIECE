const { exec, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('开始修复Nuxt开发环境问题...');

// 1. 清理.nuxt/dev目录
function cleanNuxtDevDir() {
  const nuxtDevDir = path.join(__dirname, '.nuxt', 'dev');
  console.log(`正在清理.nuxt/dev目录: ${nuxtDevDir}`);
  
  try {
    if (fs.existsSync(nuxtDevDir)) {
      // 使用rimraf的方式递归删除目录
      console.log('删除.nuxt/dev目录...');
      execSync(`rmdir /s /q "${nuxtDevDir}"`, { stdio: 'inherit' });
      console.log('.nuxt/dev目录清理成功');
    } else {
      console.log('.nuxt/dev目录不存在，无需清理');
    }
  } catch (err) {
    console.error('清理.nuxt/dev目录时出错:', err.message);
    console.log('尝试备用删除方法...');
    // 备用方法：逐个删除文件
    try {
      if (fs.existsSync(nuxtDevDir)) {
        const files = fs.readdirSync(nuxtDevDir);
        for (const file of files) {
          const filePath = path.join(nuxtDevDir, file);
          const stats = fs.statSync(filePath);
          if (stats.isDirectory()) {
            execSync(`rmdir /s /q "${filePath}"`, { stdio: 'inherit' });
          } else {
            fs.unlinkSync(filePath);
          }
        }
        fs.rmdirSync(nuxtDevDir);
        console.log('备用方法清理成功');
      }
    } catch (backupErr) {
      console.error('备用删除方法也失败:', backupErr.message);
    }
  }
}

// 2. 修复端口占用问题
function fixPortIssues() {
  const ports = [3000, 24678];
  let allPortsFixed = true;
  
  ports.forEach(port => {
    try {
      console.log(`\n正在处理端口 ${port}...`);
      // 使用netstat查找占用端口的进程
      const output = execSync(`netstat -ano | findstr :${port}`, { encoding: 'utf8', stdio: 'pipe' }).trim();
      
      if (output) {
        console.log(`找到占用端口 ${port} 的进程:`);
        console.log(output);
        
        // 提取PID
        const pids = new Set();
        output.split('\n').forEach(line => {
          const match = line.match(/\s+(\d+)$/);
          if (match && match[1] && match[1] !== '0') {
            pids.add(match[1]);
          }
        });
        
        if (pids.size > 0) {
          console.log(`将终止以下进程: ${Array.from(pids).join(', ')}`);
          // 终止进程
          pids.forEach(pid => {
            try {
              execSync(`taskkill /F /PID ${pid}`, { stdio: 'inherit' });
              console.log(`进程 ${pid} 已终止`);
            } catch (killErr) {
              console.error(`终止进程 ${pid} 失败:`, killErr.message);
              allPortsFixed = false;
            }
          });
        }
      } else {
        console.log(`端口 ${port} 当前未被占用`);
      }
    } catch (err) {
      // netstat命令可能因为没有找到匹配而失败，这是正常的
      if (!err.stdout || err.stdout.trim() === '') {
        console.log(`端口 ${port} 当前未被占用`);
      } else {
        console.error(`处理端口 ${port} 时出错:`, err.message);
        allPortsFixed = false;
      }
    }
  });
  
  return allPortsFixed;
}

// 3. 执行清理和修复
cleanNuxtDevDir();
const portsFixed = fixPortIssues();

console.log('\n====================================');
console.log('修复完成！');
if (portsFixed) {
  console.log('✅ 所有端口问题已解决');
} else {
  console.log('⚠️  部分端口问题可能未完全解决，建议以管理员身份运行命令提示符重试');
}
console.log('\n建议等待几秒钟后再运行:');
console.log('  - node start-nuxt.cjs  或');
console.log('  - yarn dev');
console.log('====================================');
