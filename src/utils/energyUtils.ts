import { EnergyFeatures } from '@/types';
import { calculateEnergy, generateRealisticEnergyFeatures } from './energyCalculator';

/**
 * 计算能量分数
 * 使用科学的能量计算引擎
 */
export function computeEnergyScore(features: EnergyFeatures): number {
  const analysis = calculateEnergy(features);
  return analysis.score;
}

/**
 * 根据分数生成简短描述
 */
export function getEnergyBrief(score: number): string {
  if (score >= 80) return "High & Active";
  if (score >= 60) return "Balanced & Steady";
  if (score >= 40) return "Calm but Low";
  return "Low Energy – Needs Recharge";
}

/**
 * 根据分数生成详细描述
 */
export function getEnergyDescription(score: number): string {
  if (score >= 80) {
    return "你的能量状态非常活跃，充满创造力和动力。适合进行高强度活动或创造性工作。";
  }
  if (score >= 60) {
    return "你的能量状态平衡稳定，身心协调良好。适合日常工作和社交活动。";
  }
  if (score >= 40) {
    return "你的能量状态较为平静，但活力偏低。建议适当增加运动或社交活动。";
  }
  return "你的能量状态较低，需要充分休息和充电。建议优先关注睡眠和放松。";
}

/**
 * 根据分数获取建议颜色
 */
export function getEnergyColor(score: number): string {
  if (score >= 80) return "#FF5F6D"; // 高能红色
  if (score >= 60) return "#00DBDE"; // 中能青色
  if (score >= 40) return "#3A7BD5"; // 低能蓝色
  return "#667eea"; // 极低能紫色
}

/**
 * 验证能量特征数据
 */
export function validateEnergyFeatures(features: EnergyFeatures): boolean {
  const { joy, calm, focus, brightness, warmRatio } = features;
  
  return (
    joy >= 0 && joy <= 1 &&
    calm >= 0 && calm <= 1 &&
    focus >= 0 && focus <= 1 &&
    brightness >= 0 && brightness <= 1 &&
    warmRatio >= 0 && warmRatio <= 1
  );
}

/**
 * 生成能量特征（模拟数据，实际应该从图像分析得出）
 */
export function generateMockEnergyFeatures(): EnergyFeatures {
  return generateRealisticEnergyFeatures();
}

/**
 * 格式化分数显示
 */
export function formatScore(score: number): string {
  return score.toString().padStart(2, '0');
}

/**
 * 获取能量等级
 */
export function getEnergyLevel(score: number): 'high' | 'medium' | 'low' | 'very-low' {
  if (score >= 80) return 'high';
  if (score >= 60) return 'medium';
  if (score >= 40) return 'low';
  return 'very-low';
}
