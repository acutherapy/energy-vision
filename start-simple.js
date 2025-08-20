const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 启动简化的Expo开发服务器...');

// 设置环境变量
process.env.EXPO_NO_WATCHMAN = '1';
process.env.EXPO_NO_FILE_WATCHER = '1';

// 启动Expo
const expo = spawn('npx', ['expo', 'start', '--port', '19000', '--no-dev', '--minify'], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    NODE_OPTIONS: '--max-old-space-size=4096',
  }
});

expo.on('error', (error) => {
  console.error('❌ Expo启动失败:', error.message);
  console.log('💡 建议使用测试服务器: node test-app.js');
});

expo.on('close', (code) => {
  console.log(`Expo进程退出，代码: ${code}`);
});
