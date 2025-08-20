import { EnergyFeatures } from '@/types';
import { getCurrentUserProfile, applyUserModifiers } from './userProfile';

/**
 * 能量计算引擎
 * 基于面部特征、情绪状态和能量水平进行科学计算
 */

export interface EnergyAnalysis {
  score: number; // 0-100
  level: 'low' | 'medium' | 'high' | 'excellent';
  aura: {
    color: string;
    intensity: number; // 0-1
    pattern: string;
  };
  features: {
    vitality: number; // 生命力 0-100
    balance: number; // 平衡性 0-100
    harmony: number; // 和谐度 0-100
    clarity: number; // 清晰度 0-100
  };
  insights: string[];
}

/**
 * 计算生命力指数
 * 基于面部亮度、对比度和色彩饱和度
 */
function calculateVitality(features: EnergyFeatures): number {
  const brightness = features.brightness || 0.5;
  const contrast = features.contrast || 0.5;
  const saturation = features.saturation || 0.5;
  
  // 生命力 = 亮度(30%) + 对比度(40%) + 饱和度(30%)
  const vitality = (
    brightness * 0.3 +
    contrast * 0.4 +
    saturation * 0.3
  ) * 100;
  
  return Math.round(Math.max(0, Math.min(100, vitality)));
}

/**
 * 计算平衡性指数
 * 基于面部对称性和比例
 */
function calculateBalance(features: EnergyFeatures): number {
  const symmetry = features.symmetry || 0.5;
  const proportion = features.proportion || 0.5;
  const alignment = features.alignment || 0.5;
  
  // 平衡性 = 对称性(40%) + 比例(35%) + 对齐(25%)
  const balance = (
    symmetry * 0.4 +
    proportion * 0.35 +
    alignment * 0.25
  ) * 100;
  
  return Math.round(Math.max(0, Math.min(100, balance)));
}

/**
 * 计算和谐度指数
 * 基于色彩和谐和纹理平滑度
 */
function calculateHarmony(features: EnergyFeatures): number {
  const colorHarmony = features.colorHarmony || 0.5;
  const textureSmoothness = features.textureSmoothness || 0.5;
  const noiseLevel = features.noiseLevel || 0.5;
  
  // 和谐度 = 色彩和谐(45%) + 纹理平滑(35%) + 低噪点(20%)
  const harmony = (
    colorHarmony * 0.45 +
    textureSmoothness * 0.35 +
    (1 - noiseLevel) * 0.2
  ) * 100;
  
  return Math.round(Math.max(0, Math.min(100, harmony)));
}

/**
 * 计算清晰度指数
 * 基于图像清晰度和焦点
 */
function calculateClarity(features: EnergyFeatures): number {
  const sharpness = features.sharpness || 0.5;
  const focus = features.focus || 0.5;
  const resolution = features.resolution || 0.5;
  
  // 清晰度 = 锐度(40%) + 焦点(35%) + 分辨率(25%)
  const clarity = (
    sharpness * 0.4 +
    focus * 0.35 +
    resolution * 0.25
  ) * 100;
  
  return Math.round(Math.max(0, Math.min(100, clarity)));
}

/**
 * 计算综合能量分数
 */
function calculateEnergyScore(features: EnergyFeatures): number {
  const vitality = calculateVitality(features);
  const balance = calculateBalance(features);
  const harmony = calculateHarmony(features);
  const clarity = calculateClarity(features);
  
  // 综合分数 = 生命力(30%) + 平衡性(25%) + 和谐度(25%) + 清晰度(20%)
  const score = Math.round(
    vitality * 0.3 +
    balance * 0.25 +
    harmony * 0.25 +
    clarity * 0.2
  );
  
  return Math.max(0, Math.min(100, score));
}

/**
 * 确定能量等级
 */
function getEnergyLevel(score: number): 'low' | 'medium' | 'high' | 'excellent' {
  if (score >= 85) return 'excellent';
  if (score >= 70) return 'high';
  if (score >= 50) return 'medium';
  return 'low';
}

/**
 * 生成能量光环
 */
function generateAura(score: number, features: EnergyFeatures) {
  const level = getEnergyLevel(score);
  
  const auraConfigs = {
    low: {
      color: '#FF6B6B', // 红色
      intensity: 0.3,
      pattern: 'flickering'
    },
    medium: {
      color: '#4ECDC4', // 青色
      intensity: 0.6,
      pattern: 'steady'
    },
    high: {
      color: '#45B7D1', // 蓝色
      intensity: 0.8,
      pattern: 'pulsing'
    },
    excellent: {
      color: '#96CEB4', // 绿色
      intensity: 1.0,
      pattern: 'radiant'
    }
  };
  
  return auraConfigs[level];
}

/**
 * 生成能量洞察
 */
function generateInsights(score: number, features: EnergyFeatures): string[] {
  const insights: string[] = [];
  
  const vitality = calculateVitality(features);
  const balance = calculateBalance(features);
  const harmony = calculateHarmony(features);
  const clarity = calculateClarity(features);
  
  // 基于分数给出建议
  if (score >= 85) {
    insights.push('你的能量状态非常优秀，继续保持这种状态！');
    insights.push('建议：可以尝试更具挑战性的活动来进一步提升');
  } else if (score >= 70) {
    insights.push('你的能量状态良好，有进一步提升的空间');
    insights.push('建议：增加一些放松和冥想的时间');
  } else if (score >= 50) {
    insights.push('你的能量状态一般，需要一些调整');
    insights.push('建议：多进行户外活动，改善睡眠质量');
  } else {
    insights.push('你的能量状态较低，需要重点关注');
    insights.push('建议：适当休息，寻求专业帮助');
  }
  
  // 基于具体特征给出建议
  if (vitality < 50) {
    insights.push('生命力指数较低，建议增加运动和营养');
  }
  if (balance < 50) {
    insights.push('平衡性需要改善，建议进行瑜伽或太极');
  }
  if (harmony < 50) {
    insights.push('和谐度有待提升，建议改善生活环境');
  }
  if (clarity < 50) {
    insights.push('清晰度不足，建议改善睡眠和减少压力');
  }
  
  return insights;
}

/**
 * 主计算函数
 */
export function calculateEnergy(features: EnergyFeatures): EnergyAnalysis {
  const score = calculateEnergyScore(features);
  const level = getEnergyLevel(score);
  const aura = generateAura(score, features);
  const insights = generateInsights(score, features);
  
  return {
    score,
    level,
    aura,
    features: {
      vitality: calculateVitality(features),
      balance: calculateBalance(features),
      harmony: calculateHarmony(features),
      clarity: calculateClarity(features),
    },
    insights,
  };
}

/**
 * 生成更真实的模拟数据
 */
export function generateRealisticEnergyFeatures(): EnergyFeatures {
  // 基于当前时间和个性化因素生成更真实的数据
  const now = new Date();
  const hour = now.getHours();
  const dayOfWeek = now.getDay(); // 0=周日, 1=周一, ...
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  
  // 根据时间调整基础值（更明显的时间差异）
  let baseVitality = 0.3;
  let baseBalance = 0.5;
  let baseHarmony = 0.4;
  let baseClarity = 0.6;
  
  if (hour >= 6 && hour <= 9) {
    // 早晨 - 活力较高，但可能还没完全清醒
    baseVitality = 0.8;
    baseBalance = 0.6;
    baseHarmony = 0.7;
    baseClarity = 0.5;
  } else if (hour >= 10 && hour <= 12) {
    // 上午 - 最佳状态
    baseVitality = 0.9;
    baseBalance = 0.8;
    baseHarmony = 0.8;
    baseClarity = 0.9;
  } else if (hour >= 13 && hour <= 15) {
    // 下午 - 开始疲劳
    baseVitality = 0.6;
    baseBalance = 0.7;
    baseHarmony = 0.6;
    baseClarity = 0.7;
  } else if (hour >= 16 && hour <= 18) {
    // 傍晚 - 疲劳期
    baseVitality = 0.4;
    baseBalance = 0.5;
    baseHarmony = 0.5;
    baseClarity = 0.6;
  } else if (hour >= 19 && hour <= 22) {
    // 晚上 - 放松期
    baseVitality = 0.3;
    baseBalance = 0.6;
    baseHarmony = 0.7;
    baseClarity = 0.4;
  } else {
    // 深夜 - 低能量期
    baseVitality = 0.2;
    baseBalance = 0.3;
    baseHarmony = 0.4;
    baseClarity = 0.3;
  }
  
  // 周末调整
  if (isWeekend) {
    baseVitality += 0.1;
    baseHarmony += 0.1;
  }
  
  // 添加个性化因素（基于时间戳的伪随机，但保持一致性）
  const seed = Math.floor(now.getTime() / (1000 * 60 * 5)); // 每5分钟变化一次
  const random = (min: number, max: number) => {
    const x = Math.sin(seed) * 10000;
    return min + (x - Math.floor(x)) * (max - min);
  };
  
  // 添加更多随机性，但保持时间一致性
  const timeRandom = (min: number, max: number) => {
    const timeSeed = Math.floor(now.getTime() / (1000 * 60 * 2)); // 每2分钟变化
    const x = Math.sin(timeSeed + hour) * 10000;
    return min + (x - Math.floor(x)) * (max - min);
  };
  
  // 添加更多随机性，让每次分析都不同
  const sessionRandom = (min: number, max: number) => {
    const sessionSeed = Math.floor(Math.random() * 1000); // 每次会话都不同
    const x = Math.sin(sessionSeed + Date.now()) * 10000;
    return min + (x - Math.floor(x)) * (max - min);
  };
  
  // 生成特征数据
  const features = {
    brightness: baseVitality + timeRandom(-0.2, 0.2) + sessionRandom(-0.1, 0.1),
    contrast: baseBalance + timeRandom(-0.15, 0.15) + sessionRandom(-0.1, 0.1),
    saturation: baseHarmony + timeRandom(-0.1, 0.1) + sessionRandom(-0.15, 0.15),
    symmetry: baseBalance + timeRandom(-0.1, 0.1) + sessionRandom(-0.1, 0.1),
    proportion: baseHarmony + timeRandom(-0.15, 0.15) + sessionRandom(-0.1, 0.1),
    alignment: baseClarity + timeRandom(-0.1, 0.1) + sessionRandom(-0.15, 0.15),
    colorHarmony: baseHarmony + timeRandom(-0.1, 0.1) + sessionRandom(-0.1, 0.1),
    textureSmoothness: baseClarity + timeRandom(-0.15, 0.15) + sessionRandom(-0.1, 0.1),
    noiseLevel: Math.max(0.1, 0.5 - baseClarity + timeRandom(-0.1, 0.1) + sessionRandom(-0.1, 0.1)),
    sharpness: baseClarity + timeRandom(-0.1, 0.1) + sessionRandom(-0.15, 0.15),
    focus: baseClarity + timeRandom(-0.15, 0.15) + sessionRandom(-0.1, 0.1),
    resolution: 0.8 + timeRandom(-0.1, 0.1) + sessionRandom(-0.1, 0.1),
  };
  
  // 确保所有值在0-1范围内
  Object.keys(features).forEach(key => {
    features[key as keyof EnergyFeatures] = Math.max(0, Math.min(1, features[key as keyof EnergyFeatures]));
  });
  
  // 应用用户个性化配置
  const userProfile = getCurrentUserProfile();
  const personalizedFeatures = applyUserModifiers(features, userProfile);
  
  return personalizedFeatures;
}
