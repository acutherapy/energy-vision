const { spawn } = require('child_process');

console.log('🚀 快速启动Energy Vision App...');

// 设置环境变量避免文件监视问题
const env = {
  ...process.env,
  EXPO_NO_WATCHMAN: '1',
  EXPO_NO_FILE_WATCHER: '1',
  NODE_OPTIONS: '--max-old-space-size=4096',
  EXPO_DEBUG: '1'
};

// 启动Expo
const expo = spawn('npx', [
  'expo', 
  'start', 
  '--port', '19004',
  '--no-dev',
  '--minify',
  '--offline'
], {
  stdio: 'inherit',
  shell: true,
  env: env
});

expo.on('error', (error) => {
  console.error('❌ 启动失败:', error.message);
  console.log('💡 备用方案: 使用测试服务器 node test-app.js');
});

expo.on('close', (code) => {
  console.log(`进程退出，代码: ${code}`);
});
