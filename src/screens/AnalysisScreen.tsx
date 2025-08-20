import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Markdown from 'react-native-markdown-display';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@/constants/colors';
import { LAYOUT } from '@/constants/layout';
import { RootStackParamList, Session } from '@/types';
import { getEnergyBrief, getEnergyDescription, getEnergyColor, getEnergyLevel } from '@/utils/energyUtils';
import { calculateEnergy } from '@/utils/energyCalculator';
import { generatePlan } from '@/services/api';
import { generatePersonalizedAdvice } from '@/services/aiAnalysis';
import EnergyAura from '@/components/EnergyAura';
import EnergyPortrait from '@/components/EnergyPortrait';


type AnalysisScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Analysis'>;
type AnalysisScreenRouteProp = RouteProp<RootStackParamList, 'Analysis'>;

export default function AnalysisScreen() {
  const navigation = useNavigation<AnalysisScreenNavigationProp>();
  const route = useRoute<AnalysisScreenRouteProp>();
  const { session } = route.params;
  
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [portraitAnimation, setPortraitAnimation] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [isGeneratingAnalysis, setIsGeneratingAnalysis] = useState(false);

  // 调试信息
  console.log('=== AnalysisScreen 调试信息 ===');
  console.log('会话数据:', session);
  console.log('能量分数:', session.energyScore);

  // 启动动画
  React.useEffect(() => {
    setTimeout(() => setPortraitAnimation(true), 500);
  }, []);

  // 使用本地计算
  const finalAnalysis = calculateEnergy(session.features);
  const energyLevel = getEnergyLevel(session.energyScore);
  const energyBrief = getEnergyBrief(session.energyScore);
  const energyDescription = getEnergyDescription(session.energyScore);

  const handleStartPlan = async () => {
    setIsGeneratingPlan(true);
    try {
      console.log('开始生成21天计划...');
      
      const response = await generatePlan({
        sid: session.sid,
        mode: 'rule', // 使用规则引擎生成计划
      });
      
      console.log('计划生成成功:', response);
      
      // 直接跳转到计划页面
      navigation.navigate('Plan', { planId: response.planId });
      
    } catch (error) {
      console.error('Generate plan error:', error);
      // 在Web环境中，使用console.log代替Alert
      console.log('生成计划失败，请重试');
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  const handleSave = () => {
    // TODO: 保存到相册
    Alert.alert('保存', '能量图已保存到相册');
  };

  const handleShare = () => {
    // TODO: 分享功能
    Alert.alert('分享', '分享功能开发中');
  };

  const handleTestButton = () => {
    Alert.alert('测试', '按钮功能正常！可以点击"开始21天提升计划"按钮');
  };

  const handleGenerateAIAnalysis = async () => {
    setIsGeneratingAnalysis(true);
    try {
      // 转换EnergyAnalysis到AIEnergyAnalysis
      const aiEnergyAnalysis = {
        score: finalAnalysis.score,
        level: finalAnalysis.level,
        features: finalAnalysis.features,
        insights: finalAnalysis.insights,
        recommendations: ['保持良好作息', '注意皮肤护理', '适当运动'],
        aura: finalAnalysis.aura,
      };
      
      const analysis = await generatePersonalizedAdvice(
        aiEnergyAnalysis,
        { name: '用户', energyPattern: 'balanced' },
        '上午'
      );
      setAiAnalysis(analysis);
    } catch (error) {
      Alert.alert('错误', '生成AI解读失败，请重试');
      console.error('AI解读失败:', error);
    } finally {
      setIsGeneratingAnalysis(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text.dark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>能量分析</Text>
        
        {/* 右上角按钮组 */}
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleStartPlan}
            disabled={isGeneratingPlan}
          >
            <Ionicons name="calendar-outline" size={20} color={COLORS.text.dark} />
            <Text style={styles.headerButtonText}>
              {isGeneratingPlan ? '生成中' : '21天计划'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.headerButton} 
            onPress={() => navigation.navigate('Test')}
          >
            <Ionicons name="analytics-outline" size={20} color={COLORS.text.dark} />
            <Text style={styles.headerButtonText}>AI解读</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.mainContainer}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={true}
          bounces={true}
          nestedScrollEnabled={true}
          scrollEnabled={true}
          alwaysBounceVertical={true}
          keyboardShouldPersistTaps="handled"
        >
          {/* 能量画像 - DALL-E生成 */}
          <View style={[
            styles.portraitContainer,
            portraitAnimation && styles.portraitAnimated
          ]}>
            {session.sourceImageUrl ? (
              // 显示DALL-E生成的图像
              <View style={styles.auraImageContainer}>
                <Image
                  source={{ uri: session.sourceImageUrl }}
                  style={styles.auraImage}
                  resizeMode="contain"
                />
                <Text style={styles.auraImageLabel}>✨ DALL-E生成的能量光环</Text>
              </View>
            ) : (
              // 显示默认的能量画像
              <EnergyPortrait
                imageUri={session.sourceImageUrl}
                energyAnalysis={finalAnalysis}
                size={280}
              />
            )}
            {!portraitAnimation && (
              <View style={styles.generatingOverlay}>
                <Text style={styles.generatingText}>
                  {session.sourceImageUrl ? '🎨 生成DALL-E能量光环中...' : '🎨 生成能量画像中...'}
                </Text>
              </View>
            )}
          </View>



          {/* 分数和描述 */}
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreTitle}>Energy Score</Text>
            <Text style={styles.scoreValue}>{session.energyScore}</Text>
            <Text style={styles.scoreBrief}>{energyBrief}</Text>
            <Text style={styles.scoreDescription}>{energyDescription}</Text>
          </View>

          {/* 特征详情 */}
          <View style={styles.featuresContainer}>
            <Text style={styles.featuresTitle}>能量特征分析</Text>
            <View style={styles.featuresGrid}>
              <View style={styles.featureItem}>
                <Text style={styles.featureLabel}>生命力</Text>
                <View style={styles.featureBar}>
                  <View 
                    style={[
                      styles.featureProgress,
                      { width: `${finalAnalysis.features.vitality}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.featureValue}>{finalAnalysis.features.vitality}%</Text>
              </View>
              
              <View style={styles.featureItem}>
                <Text style={styles.featureLabel}>平衡性</Text>
                <View style={styles.featureBar}>
                  <View 
                    style={[
                      styles.featureProgress,
                      { width: `${finalAnalysis.features.balance}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.featureValue}>{finalAnalysis.features.balance}%</Text>
              </View>
              
              <View style={styles.featureItem}>
                <Text style={styles.featureLabel}>和谐度</Text>
                <View style={styles.featureBar}>
                  <View 
                    style={[
                      styles.featureProgress,
                      { width: `${finalAnalysis.features.harmony}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.featureValue}>{finalAnalysis.features.harmony}%</Text>
              </View>
              
              <View style={styles.featureItem}>
                <Text style={styles.featureLabel}>清晰度</Text>
                <View style={styles.featureBar}>
                  <View 
                    style={[
                      styles.featureProgress,
                      { width: `${finalAnalysis.features.clarity}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.featureValue}>{finalAnalysis.features.clarity}%</Text>
              </View>
              
              <View style={styles.featureItem}>
                <Text style={styles.featureLabel}>平静</Text>
                <View style={styles.featureBar}>
                  <View 
                    style={[
                      styles.featureProgress, 
                      { width: `${session.features.calm * 100}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.featureValue}>{Math.round(session.features.calm * 100)}%</Text>
              </View>
              
              <View style={styles.featureItem}>
                <Text style={styles.featureLabel}>专注</Text>
                <View style={styles.featureBar}>
                  <View 
                    style={[
                      styles.featureProgress, 
                      { width: `${session.features.focus * 100}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.featureValue}>{Math.round(session.features.focus * 100)}%</Text>
              </View>
              
              <View style={styles.featureItem}>
                <Text style={styles.featureLabel}>亮度</Text>
                <View style={styles.featureBar}>
                  <View 
                    style={[
                      styles.featureProgress, 
                      { width: `${session.features.brightness * 100}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.featureValue}>{Math.round(session.features.brightness * 100)}%</Text>
              </View>
            </View>
            
            {/* 洞察建议 */}
            <View style={styles.insightsContainer}>
              <Text style={styles.insightsTitle}>能量洞察</Text>
              {finalAnalysis.insights.map((insight, index) => (
                <View key={index} style={styles.insightItem}>
                  <Ionicons name="bulb-outline" size={16} color={COLORS.primary} />
                  <Text style={styles.insightText}>{insight}</Text>
                </View>
              ))}
              
              {/* AI解读按钮 */}
              <TouchableOpacity
                style={styles.aiAnalysisButton}
                onPress={handleGenerateAIAnalysis}
                disabled={isGeneratingAnalysis}
              >
                <Ionicons 
                  name="color-palette-outline" 
                  size={20} 
                  color={COLORS.text.dark} 
                />
                <Text style={styles.aiAnalysisButtonText}>
                  {isGeneratingAnalysis ? '生成中...' : '🎨 AI专业解读'}
                </Text>
              </TouchableOpacity>
              
              {/* AI解读结果 */}
              {aiAnalysis && (
                <View style={styles.aiAnalysisContainer}>
                  <Text style={styles.aiAnalysisTitle}>✨ AI专业解读</Text>
                  <View style={styles.markdownContainer}>
                    <Markdown style={markdownStyles}>
                      {aiAnalysis}
                    </Markdown>
                  </View>
                </View>
              )}
            </View>
          </View>
          
          {/* 提示用户滚动 */}
          <View style={styles.scrollHint}>
            <Text style={styles.scrollHintText}>↓ 向下滚动查看更多功能</Text>
          </View>

          {/* 添加更多内容来测试滚动 */}
          <View style={styles.additionalContent}>
            <Text style={styles.additionalTitle}>功能说明</Text>
            <View style={styles.infoList}>
              <View style={styles.infoItem}>
                <Ionicons name="star" size={20} color={COLORS.primary} />
                <Text style={styles.infoText}>点击右上角"21天计划"开始个性化能量提升</Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="analytics" size={20} color={COLORS.primary} />
                <Text style={styles.infoText}>点击"AI解读"获取专业色彩形象分析</Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="color-palette" size={20} color={COLORS.primary} />
                <Text style={styles.infoText}>DALL-E生成的能量光环图像已保存</Text>
              </View>
            </View>
          </View>

          <View style={styles.scrollTest}>
            <Text style={styles.scrollTestText}>🎉 滚动功能正常工作！</Text>
          </View>

          {/* 添加更多测试内容 */}
          <View style={styles.testContent}>
            <Text style={styles.testTitle}>滚动测试区域</Text>
            {Array.from({ length: 8 }, (_, i) => (
              <View key={i} style={styles.testItem}>
                <Text style={styles.testItemText}>分析内容 {i + 1}</Text>
              </View>
            ))}
          </View>

          <View style={styles.finalTest}>
            <Text style={styles.finalTestText}>🎉 分析页面滚动到底部！</Text>
          </View>
        </ScrollView>

        {/* 功能说明 - 在内容底部 */}
        <View style={styles.featureDescription}>
          <Text style={styles.featureDescriptionText}>
            ✨ 体验完整功能：能量分析 → 个性化建议 → 21天计划 → 任务打卡 → 进度跟踪
          </Text>
        </View>
        

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.dark,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: LAYOUT.spacing.lg,
    paddingVertical: LAYOUT.spacing.md,
  },
  backButton: {
    padding: LAYOUT.spacing.xs,
  },
  headerTitle: {
    flex: 1,
    color: COLORS.text.dark,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: LAYOUT.spacing.sm,
  },
  headerButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: LAYOUT.spacing.sm,
    paddingVertical: LAYOUT.spacing.xs,
    borderRadius: LAYOUT.borderRadius.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  headerButtonText: {
    color: COLORS.text.dark,
    fontSize: 12,
    fontWeight: '600',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.background.dark,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: LAYOUT.spacing.lg,
    paddingBottom: LAYOUT.spacing.xl,
    minHeight: 2500, // 大幅增加最小高度
  },
  portraitContainer: {
    alignItems: 'center',
    marginBottom: LAYOUT.spacing.lg,
  },

  scoreContainer: {
    alignItems: 'center',
    marginBottom: LAYOUT.spacing.xl,
  },
  scoreTitle: {
    color: COLORS.gray[400],
    fontSize: 16,
    marginBottom: LAYOUT.spacing.sm,
  },
  scoreValue: {
    color: COLORS.primary,
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: LAYOUT.spacing.sm,
  },
  scoreBrief: {
    color: COLORS.text.dark,
    fontSize: 20,
    fontWeight: '600',
    marginBottom: LAYOUT.spacing.md,
  },
  scoreDescription: {
    color: COLORS.gray[400],
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: LAYOUT.spacing.lg,
  },
  featuresContainer: {
    marginBottom: LAYOUT.spacing.lg,
  },
  featuresTitle: {
    color: COLORS.text.dark,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: LAYOUT.spacing.md,
  },
  featuresGrid: {
    gap: LAYOUT.spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: LAYOUT.spacing.md,
  },
  featureLabel: {
    color: COLORS.text.dark,
    fontSize: 14,
    width: 40,
  },
  featureBar: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.gray[700],
    borderRadius: 4,
    overflow: 'hidden',
  },
  featureProgress: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  featureValue: {
    color: COLORS.gray[400],
    fontSize: 12,
    width: 30,
    textAlign: 'right',
  },
  insightsContainer: {
    marginTop: LAYOUT.spacing.lg,
  },
  insightsTitle: {
    color: COLORS.text.dark,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: LAYOUT.spacing.md,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: LAYOUT.spacing.sm,
  },
  insightText: {
    color: COLORS.gray[300],
    fontSize: 14,
    lineHeight: 20,
    marginLeft: LAYOUT.spacing.sm,
    flex: 1,
  },

  primaryButton: {
    backgroundColor: COLORS.primary,
    height: LAYOUT.button.height,
    borderRadius: LAYOUT.button.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: LAYOUT.spacing.sm,
    borderWidth: 2,
    borderColor: COLORS.primary,
    ...LAYOUT.shadow.md,
  },
  primaryButtonDisabled: {
    opacity: 0.6,
  },
  primaryButtonText: {
    color: COLORS.text.dark,
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtons: {
    flexDirection: 'row',
    gap: LAYOUT.spacing.md,
  },
  secondaryButton: {
    flex: 1,
    height: 48,
    backgroundColor: COLORS.gray[800],
    borderRadius: LAYOUT.borderRadius.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: LAYOUT.spacing.xs,
  },
  secondaryButtonText: {
    color: COLORS.text.dark,
    fontSize: 14,
    fontWeight: '500',
  },
  scrollHint: {
    alignItems: 'center',
    paddingVertical: LAYOUT.spacing.lg,
    marginTop: LAYOUT.spacing.md,
  },
  scrollHintText: {
    color: COLORS.gray[400],
    fontSize: 14,
    fontStyle: 'italic',
  },
  featureHint: {
    alignItems: 'center',
    paddingTop: LAYOUT.spacing.md,
  },
  featureHintText: {
    color: COLORS.gray[300],
    fontSize: 12,
    textAlign: 'center',
  },
  featureDescription: {
    alignItems: 'center',
    paddingVertical: LAYOUT.spacing.sm,
    marginBottom: LAYOUT.spacing.sm,
  },
  featureDescriptionText: {
    color: COLORS.gray[300],
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
  testButton: {
    backgroundColor: COLORS.gray[600],
    paddingVertical: LAYOUT.spacing.sm,
    paddingHorizontal: LAYOUT.spacing.md,
    borderRadius: LAYOUT.borderRadius.sm,
    marginBottom: LAYOUT.spacing.sm,
  },
  testButtonText: {
    color: COLORS.text.dark,
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  portraitAnimated: {
    opacity: 1,
    transform: [{ scale: 1 }],
  },
  generatingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 140,
  },
  generatingText: {
    color: COLORS.text.dark,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  auraImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  auraImage: {
    width: 280,
    height: 280,
    borderRadius: 0, // 改为正方形
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  auraImageLabel: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: LAYOUT.spacing.sm,
  },
  buttonGlow: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    backgroundColor: COLORS.primary,
    borderRadius: LAYOUT.button.borderRadius + 2,
    opacity: 0.3,
  },
  aiAnalysisButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: LAYOUT.spacing.md,
    paddingHorizontal: LAYOUT.spacing.lg,
    borderRadius: LAYOUT.borderRadius.md,
    marginTop: LAYOUT.spacing.lg,
    gap: LAYOUT.spacing.sm,
    ...LAYOUT.shadow.md,
  },
  aiAnalysisButtonText: {
    color: COLORS.text.dark,
    fontSize: 16,
    fontWeight: '600',
  },
  aiAnalysisContainer: {
    marginTop: LAYOUT.spacing.lg,
    padding: LAYOUT.spacing.lg,
    backgroundColor: COLORS.gray[900],
    borderRadius: LAYOUT.borderRadius.lg,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  aiAnalysisTitle: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: LAYOUT.spacing.md,
  },
  markdownContainer: {
    backgroundColor: COLORS.gray[800],
    padding: LAYOUT.spacing.md,
    borderRadius: LAYOUT.borderRadius.md,
  },
  additionalContent: {
    marginTop: LAYOUT.spacing.xl,
    marginBottom: LAYOUT.spacing.lg,
  },
  additionalTitle: {
    color: COLORS.text.dark,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: LAYOUT.spacing.lg,
  },
  infoList: {
    gap: LAYOUT.spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray[900],
    padding: LAYOUT.spacing.md,
    borderRadius: LAYOUT.borderRadius.md,
    gap: LAYOUT.spacing.md,
  },
  infoText: {
    color: COLORS.text.light,
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  scrollTest: {
    alignItems: 'center',
    paddingVertical: LAYOUT.spacing.xl,
    marginBottom: LAYOUT.spacing.xl,
  },
  scrollTestText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  testContent: {
    marginTop: LAYOUT.spacing.xl,
    marginBottom: LAYOUT.spacing.lg,
  },
  testTitle: {
    color: COLORS.text.dark,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: LAYOUT.spacing.lg,
  },
  testItem: {
    backgroundColor: COLORS.gray[800],
    padding: LAYOUT.spacing.md,
    borderRadius: LAYOUT.borderRadius.md,
    marginBottom: LAYOUT.spacing.sm,
  },
  testItemText: {
    color: COLORS.text.light,
    fontSize: 14,
    textAlign: 'center',
  },
  finalTest: {
    alignItems: 'center',
    paddingVertical: LAYOUT.spacing.xl,
    marginBottom: LAYOUT.spacing.xl,
  },
  finalTestText: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

// Markdown样式配置
const markdownStyles = {
  body: {
    color: COLORS.text.light,
    fontSize: 14,
    lineHeight: 20,
  },
  heading1: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  heading2: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 6,
  },
  paragraph: {
    color: COLORS.text.light,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  list_item: {
    color: COLORS.text.light,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  bullet_list: {
    marginLeft: 16,
  },
};
