const { exec } = require('child_process');

console.log('正在查找并解决端口占用问题...');

function killProcessOnPort(port) {
  console.log(`正在查找占用端口 ${port} 的进程...`);
  
  // 使用netstat命令查找占用端口的进程
  const netstatCommand = `netstat -ano | findstr :${port}`;
  
  exec(netstatCommand, (err, stdout) => {
    if (err) {
      console.error(`执行netstat命令出错:`, err.message);
      return;
    }
    
    const lines = stdout.trim().split('\n');
    const pids = new Set();
    
    lines.forEach(line => {
      const match = line.match(/\s+(\d+)$/);
      if (match && match[1]) {
        const pid = match[1].trim();
        if (pid !== '0' && !isNaN(pid)) {
          pids.add(pid);
        }
      }
    });
    
    if (pids.size > 0) {
      console.log(`找到 ${pids.size} 个占用端口 ${port} 的进程: ${Array.from(pids).join(', ')}`);
      
      pids.forEach(pid => {
        try {
          console.log(`正在终止进程 ${pid}...`);
          exec(`taskkill /F /PID ${pid}`, (killErr) => {
            if (killErr) {
              console.error(`终止进程 ${pid} 失败:`, killErr.message);
            } else {
              console.log(`进程 ${pid} 已成功终止`);
            }
          });
        } catch (killErr) {
          console.error(`终止进程 ${pid} 出错:`, killErr.message);
        }
      });
    } else {
      console.log(`没有找到占用端口 ${port} 的进程`);
    }
  });
}

// 处理主要端口3000
killProcessOnPort(3000);
// 处理WebSocket端口24678
killProcessOnPort(24678);

// 等待一段时间让异步操作完成
setTimeout(() => {
  console.log('\n端口占用问题处理完成！请等待几秒钟，然后尝试再次运行Nuxt开发服务器。');
}, 3000);