import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Camera } from 'expo-camera';
import { COLORS } from '@/constants/colors';
import { LAYOUT } from '@/constants/layout';
import { RootStackParamList, Session } from '@/types';
import { generateRealisticEnergyFeatures, calculateEnergy } from '@/utils/energyCalculator';
import { createSession } from '@/services/api';
import { generateAuraImage } from '@/services/aiAnalysis';
import { getCurrentUserProfile } from '@/utils/userProfile';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const { width: screenWidth } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [lastSession, setLastSession] = useState<Session | null>(null);
  const [captureAnimation, setCaptureAnimation] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStep, setAnalysisStep] = useState('');
  const cameraRef = useRef<Camera>(null);

  React.useEffect(() => {
    (async () => {
      try {
        // 在Web环境中，直接设置为false，允许模拟分析
        if (Platform.OS === 'web') {
          console.log('Web环境，跳过相机权限请求');
          setHasPermission(false);
          return;
        }
        
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      } catch (error) {
        // 在Web环境或没有相机的情况下，设置为false但允许模拟
        console.log('Camera permission request failed:', error);
        setHasPermission(false);
      }
    })();
  }, []);

  const handleCapture = async () => {
    if (isCapturing) return;

    setIsCapturing(true);
    setCaptureAnimation(true);
    setAnalysisProgress(0);
    setAnalysisStep('准备拍照...');

    try {
      // 模拟拍照过程
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAnalysisProgress(20);
      setAnalysisStep('拍照完成，开始分析...');

      // 获取用户配置
      const userProfile = getCurrentUserProfile();
      await new Promise(resolve => setTimeout(resolve, 800));
      setAnalysisProgress(40);
      setAnalysisStep('分析面部特征...');

      // 使用本地计算生成能量特征
      const features = generateRealisticEnergyFeatures();
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAnalysisProgress(60);
      setAnalysisStep('计算能量分数...');

      const energyAnalysis = calculateEnergy(features);
      const energyScore = energyAnalysis.score;
      await new Promise(resolve => setTimeout(resolve, 800));
      setAnalysisProgress(60);
      setAnalysisStep('生成DALL-E能量光环图像...');

      // 生成DALL-E能量光环图像
      let auraImageUrl: string | undefined;
      try {
        auraImageUrl = await generateAuraImage(
          'user_photo', // 这里可以传入实际的用户照片URL
          energyAnalysis,
          userProfile
        );
        console.log('DALL-E能量光环图像生成成功:', auraImageUrl);
      } catch (error) {
        console.error('DALL-E图像生成失败:', error);
        // 如果DALL-E生成失败，继续使用默认分析
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      setAnalysisProgress(80);
      setAnalysisStep('创建分析会话...');

      // 创建会话
      const response = await createSession({
        features,
        energyScore,
        requestCloudRender: false,
      });

      await new Promise(resolve => setTimeout(resolve, 600));
      setAnalysisProgress(100);
      setAnalysisStep('分析完成！');

      const session: Session = {
        sid: response.sid,
        uid: 'current-user-id',
        features,
        energyScore,
        sourceImageUrl: auraImageUrl, // 使用DALL-E生成的图像URL
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setLastSession(session);

      // 延迟跳转，让用户看到完成状态
      setTimeout(() => {
        console.log('准备导航到分析页面...');
        console.log('会话数据:', session);
        
        try {
          navigation.navigate('Analysis', {
            session
          });
          console.log('导航成功！');
        } catch (navError) {
          console.error('导航错误:', navError);
          Alert.alert('导航错误', '无法跳转到分析页面');
        }
      }, 1000);

    } catch (error) {
      Alert.alert('错误', '拍照失败，请重试');
      console.error('Capture error:', error);
    } finally {
      setTimeout(() => {
        setIsCapturing(false);
        setCaptureAnimation(false);
        setAnalysisProgress(0);
        setAnalysisStep('');
      }, 2000);
    }
  };

  if (hasPermission === null) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>请求相机权限...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (hasPermission === false && Platform.OS !== 'web') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <Ionicons name="camera-off" size={64} color={COLORS.gray[400]} />
          <Text style={styles.permissionText}>相机权限被拒绝</Text>
          <Text style={styles.permissionSubtext}>
            您仍然可以点击下方按钮进行模拟分析
          </Text>
          <TouchableOpacity
            style={styles.simulateButton}
            onPress={handleCapture}
          >
            <Text style={styles.simulateButtonText}>开始模拟分析</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>能量视觉</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => navigation.navigate('UserSelect')}
          >
            <Ionicons name="person-circle-outline" size={32} color={COLORS.text.dark} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.testButton}
            onPress={() => navigation.navigate('Test')}
          >
            <Ionicons name="bug-outline" size={24} color={COLORS.text.dark} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 分析进度 - 移到顶部，更显眼 */}
      {isCapturing && (
        <View style={styles.analysisProgressContainer}>
          <Text style={styles.analysisTitle}>🔮 能量分析进行中</Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${analysisProgress}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>{analysisStep}</Text>
          <Text style={styles.progressPercent}>{analysisProgress}%</Text>
        </View>
      )}

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
        {/* 主要功能按钮 */}
        <TouchableOpacity
          style={styles.testCaptureButton}
          onPress={handleCapture}
        >
          <Ionicons name="camera" size={24} color={COLORS.text.dark} />
          <Text style={styles.testCaptureButtonText}>🚀 开始能量分析</Text>
        </TouchableOpacity>
        
        {/* 功能说明 */}
        <View style={styles.featureInfo}>
          <Text style={styles.featureInfoText}>
            ✨ 体验完整功能：能量分析 → 个性化建议 → 21天计划 → 任务打卡
          </Text>
        </View>
        
        {/* 测试按钮 - 直接跳转到分析页面 */}
        <TouchableOpacity
          style={styles.testAnalysisButton}
          onPress={() => {
            console.log('测试：直接跳转到分析页面');
            const testSession: Session = {
              sid: 'test_session',
              uid: 'test_user',
              features: {
                calm: 0.7,
                focus: 0.8,
                brightness: 0.6,
                warmRatio: 0.5,
              },
              energyScore: 75,
              sourceImageUrl: undefined,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            navigation.navigate('Analysis', { session: testSession });
          }}
        >
          <Text style={styles.testAnalysisButtonText}>🧪 测试：直接进入分析页面</Text>
        </TouchableOpacity>

        <View style={styles.cameraContainer}>
          <Camera
            ref={cameraRef}
            style={styles.camera}
            type={Camera.Constants.Type.front}
          >
            <View style={styles.cameraOverlay}>
              {/* 面部取景框 - 椭圆形 */}
              <View style={styles.faceFrame}>
                <View style={styles.faceOval} />
                <View style={styles.faceOvalBorder} />
                
                {/* 面部提示文字 */}
                <Text style={styles.faceFrameText}>请将面部置于瓜子脸框内</Text>
              </View>
            </View>
          </Camera>
          
          {/* 拍照按钮 - 移到取景框下面 */}
          <View style={styles.captureButtonContainer}>
            <TouchableOpacity
              style={[styles.captureButton, isCapturing && styles.captureButtonDisabled]}
              onPress={handleCapture}
              disabled={isCapturing}
            >
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>
            <Text style={styles.captureButtonText}>点击拍照</Text>
          </View>
        </View>

        <View style={styles.instructions}>
          <Text style={styles.instructionText}>
            点击按钮开始能量分析
          </Text>
          <Text style={styles.instructionSubtext}>
            系统将分析您的面部能量状态
          </Text>
        </View>

        {/* 添加更多内容来测试滚动 */}
        <View style={styles.additionalContent}>
          <Text style={styles.additionalTitle}>功能特色</Text>
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <Ionicons name="camera" size={20} color={COLORS.primary} />
              <Text style={styles.featureText}>AI面部能量分析</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="color-palette" size={20} color={COLORS.primary} />
              <Text style={styles.featureText}>DALL-E能量光环生成</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="calendar" size={20} color={COLORS.primary} />
              <Text style={styles.featureText}>21天个性化计划</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="analytics" size={20} color={COLORS.primary} />
              <Text style={styles.featureText}>专业色彩形象分析</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="leaf" size={20} color={COLORS.primary} />
              <Text style={styles.featureText}>中医五行人格分析</Text>
            </View>
          </View>
        </View>

        <View style={styles.scrollTest}>
          <Text style={styles.scrollTestText}>↓ 向下滚动查看更多内容 ↓</Text>
        </View>

        {/* 添加更多测试内容 */}
        <View style={styles.testContent}>
          <Text style={styles.testTitle}>滚动测试区域</Text>
          {Array.from({ length: 10 }, (_, i) => (
            <View key={i} style={styles.testItem}>
              <Text style={styles.testItemText}>测试内容 {i + 1}</Text>
            </View>
          ))}
        </View>

        <View style={styles.finalTest}>
          <Text style={styles.finalTestText}>🎉 滚动到底部了！</Text>
        </View>

        {/* 拍照动画 */}
        {captureAnimation && (
          <View style={styles.captureAnimation}>
            <View style={styles.captureFlash} />
            <Text style={styles.captureText}>📸 拍照中...</Text>
          </View>
        )}


      </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: LAYOUT.spacing.lg,
    paddingVertical: LAYOUT.spacing.md,
  },
  headerTitle: {
    color: COLORS.text.dark,
    fontSize: 24,
    fontWeight: '700',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileButton: {
    padding: LAYOUT.spacing.xs,
  },
  testButton: {
    padding: LAYOUT.spacing.xs,
    marginLeft: LAYOUT.spacing.sm,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: LAYOUT.spacing.lg,
    paddingBottom: LAYOUT.spacing.xl,
    minHeight: 4000, // 大幅增加最小高度
  },
  cameraContainer: {
    height: 400,
    borderRadius: LAYOUT.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: LAYOUT.spacing.lg,
    ...LAYOUT.shadow.lg,
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  faceFrame: {
    width: 280,
    height: 350,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  faceOval: {
    width: 200,
    height: 280, // 增加高度，更符合瓜子脸比例
    borderRadius: 140, // 调整圆角，形成瓜子脸型
    borderWidth: 3,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
    opacity: 0.8,
  },
  faceOvalBorder: {
    position: 'absolute',
    width: 200,
    height: 280,
    borderRadius: 140,
    borderWidth: 2,
    borderColor: COLORS.primary,
    opacity: 0.3,
  },
  faceFrameText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: LAYOUT.spacing.md,
    paddingVertical: LAYOUT.spacing.xs,
    borderRadius: LAYOUT.borderRadius.sm,
    marginTop: 20,
  },
  captureButtonContainer: {
    alignItems: 'center',
    marginTop: LAYOUT.spacing.lg,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...LAYOUT.shadow.md,
  },
  captureButtonDisabled: {
    opacity: 0.6,
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.background.dark,
  },
  captureButtonText: {
    color: COLORS.text.dark,
    fontSize: 14,
    fontWeight: '600',
    marginTop: LAYOUT.spacing.sm,
    textAlign: 'center',
  },
  instructions: {
    alignItems: 'center',
    marginBottom: LAYOUT.spacing.lg,
  },
  instructionText: {
    color: COLORS.text.dark,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: LAYOUT.spacing.xs,
  },
  instructionSubtext: {
    color: COLORS.gray[400],
    fontSize: 14,
    textAlign: 'center',
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
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: LAYOUT.spacing.xl,
  },
  permissionText: {
    color: COLORS.gray[400],
    fontSize: 16,
    textAlign: 'center',
    marginTop: LAYOUT.spacing.lg,
  },
  permissionSubtext: {
    color: COLORS.gray[500],
    fontSize: 14,
    textAlign: 'center',
    marginTop: LAYOUT.spacing.sm,
    marginBottom: LAYOUT.spacing.lg,
  },
  simulateButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: LAYOUT.spacing.lg,
    paddingVertical: LAYOUT.spacing.md,
    borderRadius: LAYOUT.borderRadius.md,
    ...LAYOUT.shadow.md,
  },
  simulateButtonText: {
    color: COLORS.text.dark,
    fontSize: 16,
    fontWeight: '600',
  },
  analyzingText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: LAYOUT.spacing.sm,
  },
  testCaptureButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: LAYOUT.spacing.lg,
    paddingVertical: LAYOUT.spacing.md,
    borderRadius: LAYOUT.borderRadius.md,
    alignSelf: 'center',
    marginBottom: LAYOUT.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: LAYOUT.spacing.sm,
    borderWidth: 2,
    borderColor: COLORS.primary,
    ...LAYOUT.shadow.md,
  },
  testCaptureButtonText: {
    color: COLORS.text.dark,
    fontSize: 16,
    fontWeight: '600',
  },
  featureInfo: {
    alignItems: 'center',
    marginBottom: LAYOUT.spacing.lg,
    paddingHorizontal: LAYOUT.spacing.lg,
  },
  featureInfoText: {
    color: COLORS.gray[300],
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  testAnalysisButton: {
    backgroundColor: COLORS.gray[600],
    paddingHorizontal: LAYOUT.spacing.lg,
    paddingVertical: LAYOUT.spacing.sm,
    borderRadius: LAYOUT.borderRadius.md,
    alignSelf: 'center',
    marginBottom: LAYOUT.spacing.md,
  },
  testAnalysisButtonText: {
    color: COLORS.text.dark,
    fontSize: 14,
    fontWeight: '500',
  },
  captureAnimation: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    zIndex: 1000,
  },
  captureFlash: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: COLORS.primary,
    opacity: 0.8,
    position: 'absolute',
  },
  captureText: {
    color: COLORS.text.dark,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 120,
  },
  analysisProgressContainer: {
    backgroundColor: COLORS.background.dark,
    borderRadius: LAYOUT.borderRadius.lg,
    padding: LAYOUT.spacing.lg,
    marginHorizontal: LAYOUT.spacing.lg,
    marginBottom: LAYOUT.spacing.lg,
    borderWidth: 2,
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  analysisTitle: {
    color: COLORS.primary,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: LAYOUT.spacing.md,
  },
  progressBar: {
    height: 12,
    backgroundColor: COLORS.gray[700],
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: LAYOUT.spacing.md,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 6,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  progressText: {
    color: COLORS.text.dark,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: LAYOUT.spacing.sm,
    fontWeight: '600',
  },
  progressPercent: {
    color: COLORS.primary,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
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
  featureList: {
    gap: LAYOUT.spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray[900],
    padding: LAYOUT.spacing.md,
    borderRadius: LAYOUT.borderRadius.md,
    gap: LAYOUT.spacing.md,
  },
  featureText: {
    color: COLORS.text.light,
    fontSize: 16,
    fontWeight: '500',
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
