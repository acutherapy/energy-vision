// 主题颜色
export const COLORS = {
  // 背景色
  background: {
    light: '#FFFFFF',
    dark: '#0B0B0D',
  },
  
  // 文本色
  text: {
    light: '#111111',
    dark: '#FFFFFF',
  },
  
  // 主色调
  primary: '#6A5DFF',
  
  // 能量环颜色
  aura: {
    high: {
      start: '#FF5F6D',
      end: '#FFC371',
    },
    medium: {
      start: '#00DBDE',
      end: '#FC00FF',
    },
    low: {
      start: '#3A7BD5',
      end: '#00D2FF',
    },
    veryLow: {
      start: '#667eea',
      end: '#764ba2',
    },
  },
  
  // 功能色
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
  
  // 灰度
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  
  // 透明度
  overlay: 'rgba(0, 0, 0, 0.5)',
  backdrop: 'rgba(0, 0, 0, 0.3)',
} as const;

// 任务类型颜色
export const TASK_COLORS = {
  move: '#FF6B6B',
  breath: '#4ECDC4',
  hydrate: '#45B7D1',
  sleep: '#96CEB4',
  nutrition: '#FFEAA7',
  social: '#DDA0DD',
} as const;
