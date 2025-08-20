import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import Svg, {
  Circle,
  Defs,
  RadialGradient,
  Stop,
  G,
  Path,
} from 'react-native-svg';
import { Animated } from 'react-native';
import { COLORS } from '@/constants/colors';
import { LAYOUT } from '@/constants/layout';
import { EnergyAnalysis } from '@/utils/energyCalculator';

interface EnergyPortraitProps {
  imageUri?: string;
  energyAnalysis: EnergyAnalysis;
  size?: number;
}

const { width: screenWidth } = Dimensions.get('window');
const DEFAULT_SIZE = Math.min(screenWidth - 40, 300);

export default function EnergyPortrait({ 
  imageUri, 
  energyAnalysis, 
  size = DEFAULT_SIZE 
}: EnergyPortraitProps) {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 脉冲动画
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );

    // 旋转动画
    const rotateAnimation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true,
      })
    );

    pulseAnimation.start();
    rotateAnimation.start();

    return () => {
      pulseAnimation.stop();
      rotateAnimation.stop();
    };
  }, [pulseAnim, rotateAnim]);

  const { score, aura, features } = energyAnalysis;
  
  // 根据能量分数确定光环颜色
  const getAuraColors = () => {
    if (score >= 80) {
      return {
        primary: '#FFD700', // 金色
        secondary: '#FFA500', // 橙色
        tertiary: '#FF6B35', // 红橙色
      };
    } else if (score >= 60) {
      return {
        primary: '#4CAF50', // 绿色
        secondary: '#8BC34A', // 浅绿色
        tertiary: '#CDDC39', // 黄绿色
      };
    } else if (score >= 40) {
      return {
        primary: '#2196F3', // 蓝色
        secondary: '#03A9F4', // 浅蓝色
        tertiary: '#00BCD4', // 青色
      };
    } else {
      return {
        primary: '#9C27B0', // 紫色
        secondary: '#673AB7', // 深紫色
        tertiary: '#3F51B5', // 靛蓝色
      };
    }
  };

  const colors = getAuraColors();
  const centerX = size / 2;
  const centerY = size / 2;
  const baseRadius = size * 0.35;

  // 生成多层光环
  const generateAuraLayers = () => {
    const layers = [];
    const layerCount = 7; // 增加层数
    
    for (let i = 0; i < layerCount; i++) {
      const radius = baseRadius + (i * 12);
      const opacity = Math.max(0.05, (1 - i * 0.12) * aura.intensity);
      const colorIndex = i % 4;
      const colorArray = [colors.primary, colors.secondary, colors.tertiary, colors.primary];
      
      // 添加更丰富的颜色变化
      const hueShift = i * 15;
      const currentColor = colorArray[colorIndex];
      
      layers.push({
        radius,
        opacity,
        color: currentColor,
        strokeWidth: 2 + i * 1.5,
        hueShift,
      });
    }
    
    return layers;
  };

  const auraLayers = generateAuraLayers();

  // 生成能量波动路径
  const generateEnergyWaves = () => {
    const waves = [];
    const waveCount = 12; // 增加波动点数量
    
    for (let i = 0; i < waveCount; i++) {
      const angle = (i / waveCount) * 2 * Math.PI;
      const radius = baseRadius + 15 + (i % 3) * 10; // 不同半径的波动
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      waves.push({ 
        x, 
        y, 
        angle,
        size: 2 + (score / 25) + (i % 2) * 2, // 不同大小的波动点
        opacity: 0.6 + (i % 3) * 0.2
      });
    }
    
    return waves;
  };

  const energyWaves = generateEnergyWaves();

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* 背景图片 */}
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={[styles.backgroundImage, { width: size, height: size }]}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.placeholder, { width: size, height: size }]}>
          <View style={styles.placeholderContent} />
        </View>
      )}

      {/* 能量光环 */}
      <Animated.View
        style={[
          styles.auraContainer,
          {
            transform: [
              { scale: pulseAnim },
              {
                rotate: rotateAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          },
        ]}
      >
        <Svg width={size} height={size}>
          <Defs>
            {/* 径向渐变定义 */}
            {auraLayers.map((layer, index) => (
              <RadialGradient
                key={`gradient-${index}`}
                id={`auraGradient${index}`}
                cx="50%"
                cy="50%"
                r="50%"
              >
                <Stop offset="0%" stopColor={layer.color} stopOpacity={layer.opacity} />
                <Stop offset="100%" stopColor={layer.color} stopOpacity={0} />
              </RadialGradient>
            ))}
          </Defs>

          {/* 绘制光环层 */}
          {auraLayers.map((layer, index) => (
            <Circle
              key={`aura-${index}`}
              cx={centerX}
              cy={centerY}
              r={layer.radius}
              stroke={layer.color}
              strokeWidth={layer.strokeWidth}
              fill="none"
              opacity={layer.opacity}
            />
          ))}

          {/* 能量波动点 */}
          {energyWaves.map((wave, index) => (
            <Circle
              key={`wave-${index}`}
              cx={wave.x}
              cy={wave.y}
              r={wave.size}
              fill={colors.primary}
              opacity={wave.opacity}
            />
          ))}

          {/* 中心能量核心 */}
          <Circle
            cx={centerX}
            cy={centerY}
            r={baseRadius * 0.3}
            fill={`url(#auraGradient0)`}
            opacity={0.6}
          />
        </Svg>
      </Animated.View>

      {/* 能量分数显示 */}
      <View style={styles.scoreContainer}>
        <Animated.Text
          style={[
            styles.scoreText,
            {
              transform: [{ scale: pulseAnim }],
            },
          ]}
        >
          {score}
        </Animated.Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    borderRadius: LAYOUT.borderRadius.xl,
    position: 'absolute',
  },
  placeholder: {
    backgroundColor: COLORS.gray[800],
    borderRadius: LAYOUT.borderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderContent: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.gray[700],
  },
  auraContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  scoreContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: COLORS.background.dark,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    ...LAYOUT.shadow.md,
  },
  scoreText: {
    color: COLORS.text.dark,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
