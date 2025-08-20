/**
 * 用户个性化配置
 * 模拟不同用户的能量特征模式
 */

export interface UserProfile {
  id: string;
  name: string;
  energyPattern: 'morning' | 'afternoon' | 'evening' | 'balanced';
  stressLevel: 'low' | 'medium' | 'high';
  activityLevel: 'low' | 'medium' | 'high';
  sleepQuality: 'poor' | 'fair' | 'good' | 'excellent';
  modifiers: {
    vitality: number; // -0.3 到 +0.3
    balance: number;
    harmony: number;
    clarity: number;
  };
}

/**
 * 预设用户配置
 */
export const PRESET_USERS: UserProfile[] = [
  {
    id: 'user_1',
    name: '晨型人',
    energyPattern: 'morning',
    stressLevel: 'low',
    activityLevel: 'high',
    sleepQuality: 'good',
    modifiers: {
      vitality: 0.2,
      balance: 0.1,
      harmony: 0.1,
      clarity: 0.2,
    },
  },
  {
    id: 'user_2',
    name: '夜猫子',
    energyPattern: 'evening',
    stressLevel: 'medium',
    activityLevel: 'medium',
    sleepQuality: 'fair',
    modifiers: {
      vitality: -0.1,
      balance: 0.0,
      harmony: 0.1,
      clarity: -0.2,
    },
  },
  {
    id: 'user_3',
    name: '工作狂',
    energyPattern: 'afternoon',
    stressLevel: 'high',
    activityLevel: 'high',
    sleepQuality: 'poor',
    modifiers: {
      vitality: 0.1,
      balance: -0.2,
      harmony: -0.1,
      clarity: 0.1,
    },
  },
  {
    id: 'user_4',
    name: '平衡型',
    energyPattern: 'balanced',
    stressLevel: 'low',
    activityLevel: 'medium',
    sleepQuality: 'excellent',
    modifiers: {
      vitality: 0.0,
      balance: 0.2,
      harmony: 0.2,
      clarity: 0.1,
    },
  },
];

/**
 * 获取当前用户配置
 * 在实际应用中，这应该从用户设置或数据库中获取
 */
export function getCurrentUserProfile(): UserProfile {
  // 模拟从本地存储获取用户ID
  // 在React Native中使用AsyncStorage，这里先返回默认用户
  return PRESET_USERS[0];
}

/**
 * 设置当前用户
 */
export function setCurrentUser(userId: string): void {
  // 在React Native中使用AsyncStorage
  AsyncStorage.setItem('energy_vision_user_id', userId).catch(console.error);
}

/**
 * 根据用户配置调整能量特征
 */
export function applyUserModifiers(
  features: any,
  userProfile: UserProfile
): any {
  const { modifiers } = userProfile;
  
  // 根据能量模式调整时间权重
  let timeMultiplier = 1.0;
  const hour = new Date().getHours();
  
  switch (userProfile.energyPattern) {
    case 'morning':
      if (hour >= 6 && hour <= 12) timeMultiplier = 1.3;
      else if (hour >= 18 && hour <= 23) timeMultiplier = 0.7;
      break;
    case 'afternoon':
      if (hour >= 12 && hour <= 18) timeMultiplier = 1.3;
      else if (hour >= 6 && hour <= 9) timeMultiplier = 0.7;
      break;
    case 'evening':
      if (hour >= 18 && hour <= 23) timeMultiplier = 1.3;
      else if (hour >= 6 && hour <= 12) timeMultiplier = 0.7;
      break;
    case 'balanced':
      timeMultiplier = 1.0;
      break;
  }
  
  // 应用用户修饰符
  const adjustedFeatures = { ...features };
  
  // 调整生命力相关特征
  adjustedFeatures.brightness = Math.max(0, Math.min(1, 
    features.brightness + modifiers.vitality * timeMultiplier
  ));
  adjustedFeatures.contrast = Math.max(0, Math.min(1, 
    features.contrast + modifiers.vitality * 0.5
  ));
  
  // 调整平衡性相关特征
  adjustedFeatures.symmetry = Math.max(0, Math.min(1, 
    features.symmetry + modifiers.balance
  ));
  adjustedFeatures.proportion = Math.max(0, Math.min(1, 
    features.proportion + modifiers.balance * 0.8
  ));
  
  // 调整和谐度相关特征
  adjustedFeatures.colorHarmony = Math.max(0, Math.min(1, 
    features.colorHarmony + modifiers.harmony
  ));
  adjustedFeatures.textureSmoothness = Math.max(0, Math.min(1, 
    features.textureSmoothness + modifiers.harmony * 0.6
  ));
  
  // 调整清晰度相关特征
  adjustedFeatures.sharpness = Math.max(0, Math.min(1, 
    features.sharpness + modifiers.clarity
  ));
  adjustedFeatures.focus = Math.max(0, Math.min(1, 
    features.focus + modifiers.clarity * 0.8
  ));
  
  return adjustedFeatures;
}
