import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { COLORS } from '@/constants/colors';
import { LAYOUT } from '@/constants/layout';
import { RootStackParamList } from '@/types';
import { PRESET_USERS, setCurrentUser } from '@/utils/userProfile';

type UserSelectScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UserSelect'>;

export default function UserSelectScreen() {
  const navigation = useNavigation<UserSelectScreenNavigationProp>();

  const handleUserSelect = (userId: string) => {
    setCurrentUser(userId);
    navigation.navigate('Home');
  };

  const getEnergyPatternIcon = (pattern: string) => {
    switch (pattern) {
      case 'morning': return 'sunny';
      case 'afternoon': return 'partly-sunny';
      case 'evening': return 'moon';
      case 'balanced': return 'sync';
      default: return 'person';
    }
  };

  const getEnergyPatternText = (pattern: string) => {
    switch (pattern) {
      case 'morning': return '晨型人';
      case 'afternoon': return '午型人';
      case 'evening': return '夜型人';
      case 'balanced': return '平衡型';
      default: return '未知';
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
        <Text style={styles.headerTitle}>选择用户类型</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.description}>
          选择最符合你的用户类型，这将影响能量分析的结果
        </Text>

        {PRESET_USERS.map((user) => (
          <TouchableOpacity
            key={user.id}
            style={styles.userCard}
            onPress={() => handleUserSelect(user.id)}
          >
            <View style={styles.userHeader}>
              <View style={styles.userIcon}>
                <Ionicons 
                  name={getEnergyPatternIcon(user.energyPattern)} 
                  size={32} 
                  color={COLORS.primary} 
                />
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userPattern}>
                  {getEnergyPatternText(user.energyPattern)}
                </Text>
              </View>
            </View>

            <View style={styles.userDetails}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>压力水平:</Text>
                <Text style={styles.detailValue}>
                  {user.stressLevel === 'low' ? '低' : 
                   user.stressLevel === 'medium' ? '中' : '高'}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>活动水平:</Text>
                <Text style={styles.detailValue}>
                  {user.activityLevel === 'low' ? '低' : 
                   user.activityLevel === 'medium' ? '中' : '高'}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>睡眠质量:</Text>
                <Text style={styles.detailValue}>
                  {user.sleepQuality === 'poor' ? '差' : 
                   user.sleepQuality === 'fair' ? '一般' : 
                   user.sleepQuality === 'good' ? '好' : '优秀'}
                </Text>
              </View>
            </View>

            <View style={styles.selectButton}>
              <Ionicons name="chevron-forward" size={20} color={COLORS.primary} />
            </View>
          </TouchableOpacity>
        ))}
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
  backButton: {
    padding: LAYOUT.spacing.xs,
  },
  headerTitle: {
    color: COLORS.text.dark,
    fontSize: 20,
    fontWeight: '600',
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: LAYOUT.spacing.lg,
  },
  description: {
    color: COLORS.gray[400],
    fontSize: 16,
    textAlign: 'center',
    marginBottom: LAYOUT.spacing.xl,
    lineHeight: 24,
  },
  userCard: {
    backgroundColor: COLORS.gray[800],
    borderRadius: LAYOUT.card.borderRadius,
    padding: LAYOUT.card.padding,
    marginBottom: LAYOUT.spacing.lg,
    ...LAYOUT.shadow.md,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: LAYOUT.spacing.md,
  },
  userIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.gray[700],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: LAYOUT.spacing.md,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: COLORS.text.dark,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: LAYOUT.spacing.xs,
  },
  userPattern: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  userDetails: {
    gap: LAYOUT.spacing.sm,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    color: COLORS.gray[400],
    fontSize: 14,
  },
  detailValue: {
    color: COLORS.text.dark,
    fontSize: 14,
    fontWeight: '500',
  },
  selectButton: {
    position: 'absolute',
    top: LAYOUT.spacing.md,
    right: LAYOUT.spacing.md,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.gray[700],
    justifyContent: 'center',
    alignItems: 'center',
  },
});
