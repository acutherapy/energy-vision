import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { COLORS } from '@/constants/colors';

// 导入屏幕
import HomeScreen from '@/screens/HomeScreen';
import AnalysisScreen from '@/screens/AnalysisScreen';
import PlanScreen from '@/screens/PlanScreen';
import CompareScreen from '@/screens/CompareScreen';
import UserSelectScreen from '@/screens/UserSelectScreen';
import TestScreen from '@/screens/TestScreen';

// 导入类型
import { RootStackParamList } from '@/types';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="light" backgroundColor={COLORS.background.dark} />
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
              cardStyle: { backgroundColor: COLORS.background.dark },
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Analysis" component={AnalysisScreen} />
            <Stack.Screen name="Plan" component={PlanScreen} />
            <Stack.Screen name="Compare" component={CompareScreen} />
            <Stack.Screen name="UserSelect" component={UserSelectScreen} />
            <Stack.Screen name="Test" component={TestScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
