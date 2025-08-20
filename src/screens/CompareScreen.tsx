import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { COLORS } from '@/constants/colors';
import { LAYOUT } from '@/constants/layout';
import { RootStackParamList, Session } from '@/types';
import { getSession, buildContrast } from '@/services/api';
import EnergyAura from '@/components/EnergyAura';

type CompareScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Compare'>;
type CompareScreenRouteProp = RouteProp<RootStackParamList, 'Compare'>;

export default function CompareScreen() {
  const navigation = useNavigation<CompareScreenNavigationProp>();
  const route = useRoute<CompareScreenRouteProp>();
  const { sidBefore, sidAfter } = route.params;
  
  const [sessionBefore, setSessionBefore] = useState<Session | null>(null);
  const [sessionAfter, setSessionAfter] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [generatingPoster, setGeneratingPoster] = useState(false);

  useEffect(() => {
    loadSessions();
  }, [sidBefore, sidAfter]);

  const loadSessions = async () => {
    try {
      const [before, after] = await Promise.all([
        getSession(sidBefore),
        getSession(sidAfter),
      ]);
      
      setSessionBefore(before);
      setSessionAfter(after);
    } catch (error) {
      Alert.alert('错误', '加载对比数据失败');
      console.error('Load sessions error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPoster = async () => {
    if (!sessionBefore || !sessionAfter) return;
    
    setGeneratingPoster(true);
    try {
      const response = await buildContrast({
        sidBefore: sessionBefore.sid,
        sidAfter: sessionAfter.sid,
      });
      
      // TODO: 下载海报到相册
      Alert.alert('成功', '对比海报已生成，正在下载...');
      console.log('Poster URL:', response.posterUrl);
    } catch (error) {
      Alert.alert('错误', '生成海报失败，请重试');
      console.error('Build contrast error:', error);
    } finally {
      setGeneratingPoster(false);
    }
  };

  const getScoreChange = () => {
    if (!sessionBefore || !sessionAfter) return 0;
    return sessionAfter.energyScore - sessionBefore.energyScore;
  };

  const getScoreChangeText = (change: number) => {
    if (change > 0) return `+${change}`;
    return change.toString();
  };

  const getScoreChangeColor = (change: number) => {
    if (change > 0) return COLORS.success;
    if (change < 0) return COLORS.error;
    return COLORS.gray[400];
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>加载对比数据...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!sessionBefore || !sessionAfter) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>对比数据加载失败</Text>
        </View>
      </SafeAreaView>
    );
  }

  const scoreChange = getScoreChange();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text.dark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>能量对比</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.content}>
        {/* 分数变化 */}
        <View style={styles.scoreChangeContainer}>
          <Text style={styles.scoreChangeTitle}>能量分数变化</Text>
          <View style={styles.scoreChangeRow}>
            <Text style={styles.scoreBefore}>{sessionBefore.energyScore}</Text>
            <View style={styles.scoreArrow}>
              <Ionicons 
                name={scoreChange > 0 ? "arrow-up" : scoreChange < 0 ? "arrow-down" : "remove"} 
                size={24} 
                color={getScoreChangeColor(scoreChange)} 
              />
            </View>
            <Text style={styles.scoreAfter}>{sessionAfter.energyScore}</Text>
          </View>
          <Text style={[
            styles.scoreChangeValue,
            { color: getScoreChangeColor(scoreChange) }
          ]}>
            {getScoreChangeText(scoreChange)}
          </Text>
        </View>

        {/* 对比图 */}
        <View style={styles.comparisonContainer}>
          <View style={styles.comparisonColumn}>
            <Text style={styles.comparisonLabel}>Before</Text>
            <View style={styles.auraContainer}>
              <EnergyAura
                score={sessionBefore.energyScore}
                size={120}
                strokeWidth={6}
              />
            </View>
            <Text style={styles.comparisonScore}>{sessionBefore.energyScore}</Text>
            <Text style={styles.comparisonDate}>
              {new Date(sessionBefore.createdAt).toLocaleDateString()}
            </Text>
          </View>

          <View style={styles.comparisonDivider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>VS</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.comparisonColumn}>
            <Text style={styles.comparisonLabel}>After</Text>
            <View style={styles.auraContainer}>
              <EnergyAura
                score={sessionAfter.energyScore}
                size={120}
                strokeWidth={6}
              />
            </View>
            <Text style={styles.comparisonScore}>{sessionAfter.energyScore}</Text>
            <Text style={styles.comparisonDate}>
              {new Date(sessionAfter.createdAt).toLocaleDateString()}
            </Text>
          </View>
        </View>

        {/* 特征对比 */}
        <View style={styles.featuresComparison}>
          <Text style={styles.featuresTitle}>特征对比</Text>
          <View style={styles.featureRow}>
            <Text style={styles.featureLabel}>喜悦</Text>
            <View style={styles.featureBars}>
              <View style={styles.featureBar}>
                <View 
                  style={[
                    styles.featureProgress, 
                    { width: `${sessionBefore.features.joy * 100}%` }
                  ]} 
                />
              </View>
              <View style={styles.featureBar}>
                <View 
                  style={[
                    styles.featureProgress, 
                    { width: `${sessionAfter.features.joy * 100}%` }
                  ]} 
                />
              </View>
            </View>
          </View>
          
          <View style={styles.featureRow}>
            <Text style={styles.featureLabel}>平静</Text>
            <View style={styles.featureBars}>
              <View style={styles.featureBar}>
                <View 
                  style={[
                    styles.featureProgress, 
                    { width: `${sessionBefore.features.calm * 100}%` }
                  ]} 
                />
              </View>
              <View style={styles.featureBar}>
                <View 
                  style={[
                    styles.featureProgress, 
                    { width: `${sessionAfter.features.calm * 100}%` }
                  ]} 
                />
              </View>
            </View>
          </View>
          
          <View style={styles.featureRow}>
            <Text style={styles.featureLabel}>专注</Text>
            <View style={styles.featureBars}>
              <View style={styles.featureBar}>
                <View 
                  style={[
                    styles.featureProgress, 
                    { width: `${sessionBefore.features.focus * 100}%` }
                  ]} 
                />
              </View>
              <View style={styles.featureBar}>
                <View 
                  style={[
                    styles.featureProgress, 
                    { width: `${sessionAfter.features.focus * 100}%` }
                  ]} 
                />
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* 下载按钮 */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.downloadButton, generatingPoster && styles.downloadButtonDisabled]}
          onPress={handleDownloadPoster}
          disabled={generatingPoster}
        >
          <Ionicons 
            name={generatingPoster ? "hourglass-outline" : "download-outline"} 
            size={20} 
            color={COLORS.text.dark} 
          />
          <Text style={styles.downloadButtonText}>
            {generatingPoster ? '生成中...' : '下载对比海报'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.dark,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: COLORS.text.dark,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: COLORS.error,
    fontSize: 16,
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
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: LAYOUT.spacing.lg,
  },
  scoreChangeContainer: {
    alignItems: 'center',
    marginBottom: LAYOUT.spacing.xl,
  },
  scoreChangeTitle: {
    color: COLORS.text.dark,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: LAYOUT.spacing.md,
  },
  scoreChangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: LAYOUT.spacing.sm,
  },
  scoreBefore: {
    color: COLORS.text.dark,
    fontSize: 32,
    fontWeight: 'bold',
  },
  scoreArrow: {
    marginHorizontal: LAYOUT.spacing.lg,
  },
  scoreAfter: {
    color: COLORS.text.dark,
    fontSize: 32,
    fontWeight: 'bold',
  },
  scoreChangeValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  comparisonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: LAYOUT.spacing.xl,
  },
  comparisonColumn: {
    flex: 1,
    alignItems: 'center',
  },
  comparisonLabel: {
    color: COLORS.text.dark,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: LAYOUT.spacing.md,
  },
  auraContainer: {
    marginBottom: LAYOUT.spacing.md,
  },
  comparisonScore: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: LAYOUT.spacing.xs,
  },
  comparisonDate: {
    color: COLORS.gray[400],
    fontSize: 12,
  },
  comparisonDivider: {
    alignItems: 'center',
    marginHorizontal: LAYOUT.spacing.lg,
  },
  dividerLine: {
    width: 1,
    height: 60,
    backgroundColor: COLORS.gray[600],
    marginVertical: LAYOUT.spacing.sm,
  },
  dividerText: {
    color: COLORS.gray[400],
    fontSize: 14,
    fontWeight: '600',
  },
  featuresComparison: {
    marginBottom: LAYOUT.spacing.lg,
  },
  featuresTitle: {
    color: COLORS.text.dark,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: LAYOUT.spacing.md,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: LAYOUT.spacing.md,
  },
  featureLabel: {
    color: COLORS.text.dark,
    fontSize: 14,
    width: 40,
  },
  featureBars: {
    flex: 1,
    flexDirection: 'row',
    gap: LAYOUT.spacing.sm,
  },
  featureBar: {
    flex: 1,
    height: 6,
    backgroundColor: COLORS.gray[700],
    borderRadius: 3,
    overflow: 'hidden',
  },
  featureProgress: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  actionsContainer: {
    padding: LAYOUT.spacing.lg,
  },
  downloadButton: {
    backgroundColor: COLORS.primary,
    height: LAYOUT.button.height,
    borderRadius: LAYOUT.button.borderRadius,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: LAYOUT.spacing.sm,
    ...LAYOUT.shadow.md,
  },
  downloadButtonDisabled: {
    opacity: 0.6,
  },
  downloadButtonText: {
    color: COLORS.text.dark,
    fontSize: 16,
    fontWeight: '600',
  },
});
