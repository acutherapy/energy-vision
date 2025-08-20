import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const LAYOUT = {
  // 屏幕尺寸
  screen: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  
  // 安全区域
  safeArea: {
    top: 44, // iPhone 状态栏高度
    bottom: 34, // iPhone 底部安全区域
  },
  
  // 间距
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  // 圆角
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 999,
  },
  
  // 阴影
  shadow: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 6,
    },
  },
  
  // 相机取景框
  camera: {
    frameSize: Math.min(SCREEN_WIDTH * 0.8, 320), // 300-320px
    borderWidth: 2,
  },
  
  // 能量环
  aura: {
    size: SCREEN_WIDTH * 0.6, // 占屏60%
    strokeWidth: 8,
  },
  
  // 按钮
  button: {
    height: 56,
    borderRadius: 16,
  },
  
  // 卡片
  card: {
    borderRadius: 16,
    padding: 16,
  },
} as const;
