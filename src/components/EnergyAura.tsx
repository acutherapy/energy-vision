import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { COLORS } from '@/constants/colors';
import { getEnergyLevel } from '@/utils/energyUtils';

interface EnergyAuraProps {
  score: number;
  size: number;
  strokeWidth: number;
}

export default function EnergyAura({ score, size, strokeWidth }: EnergyAuraProps) {
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  
  const progressAnim = useRef(new Animated.Value(0)).current;
  const rotationAnim = useRef(new Animated.Value(0)).current;
  
  // 根据分数获取颜色
  const energyLevel = getEnergyLevel(score);
  const colors = COLORS.aura[energyLevel];
  
  // 计算进度（0-1）
  const progressValue = score / 100;
  
  // 动画效果
  useEffect(() => {
    Animated.parallel([
      Animated.timing(progressAnim, {
        toValue: progressValue,
        duration: 1500,
        useNativeDriver: false,
      }),
      Animated.loop(
        Animated.timing(rotationAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: false,
        })
      ),
    ]).start();
  }, [progressValue]);
  
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference * (1 - progressValue);
  
  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id="auraGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={colors.start} />
            <Stop offset="100%" stopColor={colors.end} />
          </LinearGradient>
        </Defs>
        
        {/* 背景圆环 */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={COLORS.gray[700]}
          strokeWidth={strokeWidth}
          fill="none"
        />
        
        {/* 能量环 */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="url(#auraGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          transform={`rotate(${rotationAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 360],
          })}, ${center}, ${center})`}
        />
        
        {/* 进度环 */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={COLORS.primary}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
        />
      </Svg>
    </View>
  );
}
