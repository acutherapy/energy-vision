import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { COLORS } from '@/constants/colors';
import { LAYOUT } from '@/constants/layout';
import { TASK_COLORS } from '@/constants/colors';
import { RootStackParamList, Plan, PlanTask, TaskType } from '@/types';
import { getPlan, checkin } from '@/services/api';

type PlanScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Plan'>;
type PlanScreenRouteProp = RouteProp<RootStackParamList, 'Plan'>;

export default function PlanScreen() {
  const navigation = useNavigation<PlanScreenNavigationProp>();
  const route = useRoute<PlanScreenRouteProp>();
  const { planId } = route.params;
  
  const [plan, setPlan] = useState<Plan | null>(null);
  const [currentDay, setCurrentDay] = useState(1);
  const [loading, setLoading] = useState(true);
  const [checkingIn, setCheckingIn] = useState<string | null>(null);

  useEffect(() => {
    loadPlan();
  }, [planId]);

  const loadPlan = async () => {
    try {
      const planData = await getPlan(planId);
      setPlan(planData);
      
      // 找到当前应该进行的日期
      const today = planData.days.find(day => 
        day.tasks.some(task => !task.done)
      );
      if (today) {
        setCurrentDay(today.day);
      }
    } catch (error) {
      Alert.alert('错误', '加载计划失败');
      console.error('Load plan error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckin = async (taskId: string) => {
    if (!plan) return;
    
    setCheckingIn(taskId);
    try {
      const response = await checkin({
        planId: plan.planId,
        day: currentDay,
        taskId,
      });
      
      // 更新本地状态
      setPlan(prev => {
        if (!prev) return prev;
        
        const updatedDays = prev.days.map(day => {
          if (day.day === currentDay) {
            return {
              ...day,
              tasks: day.tasks.map(task => 
                task.id === taskId ? { ...task, done: true } : task
              ),
            };
          }
          return day;
        });
        
        return {
          ...prev,
          days: updatedDays,
          progress: response.newProgress,
        };
      });
      
      // 检查是否完成当天所有任务
      const currentDayData = plan.days.find(d => d.day === currentDay);
      if (currentDayData) {
        const allDone = currentDayData.tasks.every(task => 
          task.id === taskId ? true : task.done
        );
        
        if (allDone && currentDay < 21) {
          setCurrentDay(currentDay + 1);
        }
      }
      
    } catch (error) {
      Alert.alert('错误', '打卡失败，请重试');
      console.error('Checkin error:', error);
    } finally {
      setCheckingIn(null);
    }
  };

  const getTaskIcon = (type: TaskType) => {
    switch (type) {
      case 'move': return 'fitness-outline';
      case 'breath': return 'leaf-outline';
      case 'hydrate': return 'water-outline';
      case 'sleep': return 'moon-outline';
      case 'nutrition': return 'restaurant-outline';
      case 'social': return 'people-outline';
      default: return 'checkmark-circle-outline';
    }
  };

  const getTaskColor = (type: TaskType) => {
    return TASK_COLORS[type];
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>加载计划中...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!plan) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>计划加载失败</Text>
        </View>
      </SafeAreaView>
    );
  }

  const currentDayData = plan.days.find(d => d.day === currentDay);
  const progressPercentage = (plan.progress.completed / plan.progress.total) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text.dark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>21天提升计划</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* 进度条 */}
      <View style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressText}>Day {currentDay} / 21</Text>
          <Text style={styles.progressPercentage}>{Math.round(progressPercentage)}%</Text>
        </View>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${progressPercentage}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressStats}>
          已完成 {plan.progress.completed} / {plan.progress.total} 项任务
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {currentDayData && (
          <View style={styles.tasksContainer}>
            <Text style={styles.tasksTitle}>今日任务</Text>
            {currentDayData.tasks.map((task) => (
              <View key={task.id} style={styles.taskCard}>
                <View style={styles.taskHeader}>
                  <View style={styles.taskIconContainer}>
                    <Ionicons 
                      name={getTaskIcon(task.type)} 
                      size={24} 
                      color={getTaskColor(task.type)} 
                    />
                  </View>
                  <View style={styles.taskInfo}>
                    <Text style={styles.taskTitle}>{task.title}</Text>
                    {task.desc && (
                      <Text style={styles.taskDesc}>{task.desc}</Text>
                    )}
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.checkinButton,
                      task.done && styles.checkinButtonDone,
                      checkingIn === task.id && styles.checkinButtonLoading,
                    ]}
                    onPress={() => !task.done && handleCheckin(task.id)}
                    disabled={task.done || checkingIn === task.id}
                  >
                    {task.done ? (
                      <Ionicons name="checkmark" size={20} color={COLORS.success} />
                    ) : checkingIn === task.id ? (
                      <Ionicons name="hourglass-outline" size={20} color={COLORS.text.dark} />
                    ) : (
                      <Ionicons name="add" size={20} color={COLORS.text.dark} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* 明日预告 */}
        {currentDay < 21 && (
          <View style={styles.previewContainer}>
            <Text style={styles.previewTitle}>明日预告</Text>
            <Text style={styles.previewText}>
              完成今日任务后，明天将解锁新的能量提升挑战
            </Text>
          </View>
        )}

        {/* 完成提示 */}
        {currentDay === 21 && plan.progress.completed === plan.progress.total && (
          <View style={styles.completionContainer}>
            <Text style={styles.completionTitle}>🎉 恭喜完成21天计划！</Text>
            <Text style={styles.completionText}>
              你已经完成了所有任务，现在可以进行能量对比了
            </Text>
            <TouchableOpacity
              style={styles.completionButton}
              onPress={() => {
                // TODO: 导航到对比页面
                Alert.alert('完成', '21天计划已完成！');
              }}
            >
              <Text style={styles.completionButtonText}>查看对比结果</Text>
            </TouchableOpacity>
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
  progressContainer: {
    paddingHorizontal: LAYOUT.spacing.lg,
    paddingVertical: LAYOUT.spacing.md,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: LAYOUT.spacing.sm,
  },
  progressText: {
    color: COLORS.text.dark,
    fontSize: 16,
    fontWeight: '600',
  },
  progressPercentage: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.gray[700],
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: LAYOUT.spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  progressStats: {
    color: COLORS.gray[400],
    fontSize: 14,
  },
  content: {
    flex: 1,
    paddingHorizontal: LAYOUT.spacing.lg,
  },
  tasksContainer: {
    marginBottom: LAYOUT.spacing.xl,
  },
  tasksTitle: {
    color: COLORS.text.dark,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: LAYOUT.spacing.md,
  },
  taskCard: {
    backgroundColor: COLORS.gray[800],
    borderRadius: LAYOUT.card.borderRadius,
    padding: LAYOUT.card.padding,
    marginBottom: LAYOUT.spacing.md,
    ...LAYOUT.shadow.sm,
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.gray[700],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: LAYOUT.spacing.md,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    color: COLORS.text.dark,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: LAYOUT.spacing.xs,
  },
  taskDesc: {
    color: COLORS.gray[400],
    fontSize: 14,
  },
  checkinButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkinButtonDone: {
    backgroundColor: COLORS.success,
  },
  checkinButtonLoading: {
    backgroundColor: COLORS.gray[600],
  },
  previewContainer: {
    backgroundColor: COLORS.gray[800],
    borderRadius: LAYOUT.card.borderRadius,
    padding: LAYOUT.card.padding,
    marginBottom: LAYOUT.spacing.lg,
  },
  previewTitle: {
    color: COLORS.text.dark,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: LAYOUT.spacing.sm,
  },
  previewText: {
    color: COLORS.gray[400],
    fontSize: 14,
    lineHeight: 20,
  },
  completionContainer: {
    backgroundColor: COLORS.success,
    borderRadius: LAYOUT.card.borderRadius,
    padding: LAYOUT.card.padding,
    alignItems: 'center',
    marginBottom: LAYOUT.spacing.lg,
  },
  completionTitle: {
    color: COLORS.text.dark,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: LAYOUT.spacing.sm,
  },
  completionText: {
    color: COLORS.text.dark,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: LAYOUT.spacing.md,
  },
  completionButton: {
    backgroundColor: COLORS.text.dark,
    paddingHorizontal: LAYOUT.spacing.lg,
    paddingVertical: LAYOUT.spacing.md,
    borderRadius: LAYOUT.borderRadius.md,
  },
  completionButtonText: {
    color: COLORS.success,
    fontSize: 16,
    fontWeight: '600',
  },
});
