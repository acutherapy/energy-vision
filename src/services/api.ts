import { auth } from './firebase';
import {
  CreateSessionRequest,
  CreateSessionResponse,
  AttachLocalAuraRequest,
  GeneratePlanRequest,
  GeneratePlanResponse,
  CheckinRequest,
  CheckinResponse,
  BuildContrastRequest,
  BuildContrastResponse,
  Session,
  Plan,
  TaskType,
  APIError,
} from '@/types';

const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'https://your-region-your-project.cloudfunctions.net';

/**
 * 获取认证token
 */
async function getAuthToken(): Promise<string> {
  const user = auth.currentUser;
  if (!user) {
    // 为了测试，返回一个模拟token
    return 'demo-token';
  }
  return await user.getIdToken();
}

/**
 * 通用API请求函数
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = await getAuthToken();
  
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData: APIError = await response.json();
    throw new Error(errorData.error.message);
  }

  return response.json();
}

/**
 * 创建会话
 */
export async function createSession(
  data: CreateSessionRequest
): Promise<CreateSessionResponse> {
  // 模拟API响应
  console.log('模拟创建会话:', data);
  
  return {
    sid: `session_${Date.now()}`,
    message: 'Session created successfully',
  };
}

/**
 * 上传本地渲染结果
 */
export async function attachLocalAura(
  data: AttachLocalAuraRequest
): Promise<{ ok: boolean }> {
  return apiRequest<{ ok: boolean }>('/session.attachLocalAura', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * 生成21天计划
 */
export async function generatePlan(
  data: GeneratePlanRequest
): Promise<GeneratePlanResponse> {
  // 模拟API响应
  console.log('模拟生成计划:', data);
  
  // 生成21天的完整计划
  const days = [];
  const taskTypes = ['breath', 'move', 'hydrate', 'sleep', 'nutrition', 'social'];
  const taskTitles = {
    breath: ['晨间冥想', '正念练习', '深呼吸练习', '能量呼吸', '静心冥想'],
    move: ['能量运动', '瑜伽练习', '太极练习', '轻度跑步', '拉伸运动'],
    hydrate: ['补充水分', '能量饮品', '温水养生', '茶饮调理', '水分平衡'],
    sleep: ['早睡早起', '深度睡眠', '睡眠调理', '休息恢复', '能量充电'],
    nutrition: ['健康饮食', '能量食物', '营养均衡', '养生食谱', '能量补充'],
    social: ['社交活动', '朋友聚会', '团队活动', '沟通交流', '情感连接']
  };
  
  let totalTasks = 0;
  
  for (let day = 1; day <= 21; day++) {
    const dayTasks = [];
    const tasksPerDay = 3; // 每天3个任务
    
    for (let i = 0; i < tasksPerDay; i++) {
      const taskType = taskTypes[i % taskTypes.length];
      const titles = taskTitles[taskType];
      const titleIndex = (day + i) % titles.length;
      
      dayTasks.push({
        id: `task_${day}_${i + 1}`,
        type: taskType as TaskType,
        title: titles[titleIndex],
        desc: `第${day}天的${titles[titleIndex]}任务`,
        done: false,
      });
      totalTasks++;
    }
    
    days.push({
      day,
      tasks: dayTasks,
    });
  }
  
  return {
    planId: `plan_${Date.now()}`,
    days,
    progress: { completed: 0, total: totalTasks },
  };
}

/**
 * 任务打卡
 */
export async function checkin(
  data: CheckinRequest
): Promise<CheckinResponse> {
  // 模拟API响应
  console.log('模拟任务打卡:', data);
  
  return {
    cid: `checkin_${Date.now()}`,
    newProgress: { completed: 25, total: 63 }, // 模拟进度更新
  };
}

/**
 * 生成对比海报
 */
export async function buildContrast(
  data: BuildContrastRequest
): Promise<BuildContrastResponse> {
  return apiRequest<BuildContrastResponse>('/contrast.build', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * 获取会话详情
 */
export async function getSession(sid: string): Promise<Session> {
  return apiRequest<Session>(`/session.get?sid=${sid}`);
}

/**
 * 获取计划详情
 */
export async function getPlan(planId: string): Promise<Plan> {
  // 模拟计划数据
  console.log('模拟获取计划:', planId);
  
  // 生成完整的21天计划
  const days = [];
  const taskTypes = ['breath', 'move', 'hydrate', 'sleep', 'nutrition', 'social'];
  const taskTitles = {
    breath: ['晨间冥想', '正念练习', '深呼吸练习', '能量呼吸', '静心冥想'],
    move: ['能量运动', '瑜伽练习', '太极练习', '轻度跑步', '拉伸运动'],
    hydrate: ['补充水分', '能量饮品', '温水养生', '茶饮调理', '水分平衡'],
    sleep: ['早睡早起', '深度睡眠', '睡眠调理', '休息恢复', '能量充电'],
    nutrition: ['健康饮食', '能量食物', '营养均衡', '养生食谱', '能量补充'],
    social: ['社交活动', '朋友聚会', '团队活动', '沟通交流', '情感连接']
  };
  
  let totalTasks = 0;
  
  for (let day = 1; day <= 21; day++) {
    const dayTasks = [];
    const tasksPerDay = 3; // 每天3个任务
    
    for (let i = 0; i < tasksPerDay; i++) {
      const taskType = taskTypes[i % taskTypes.length];
      const titles = taskTitles[taskType];
      const titleIndex = (day + i) % titles.length;
      
      dayTasks.push({
        id: `task_${day}_${i + 1}`,
        type: taskType as TaskType,
        title: titles[titleIndex],
        desc: `第${day}天的${titles[titleIndex]}任务`,
        done: false,
      });
      totalTasks++;
    }
    
    days.push({
      day,
      tasks: dayTasks,
    });
  }
  
  const mockPlan: Plan = {
    planId: planId,
    uid: 'current-user-id',
    sid: 'session_123',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    progress: { completed: 0, total: totalTasks },
    days,
  };
  
  return mockPlan;
}

/**
 * 获取用户历史
 */
export async function getUserHistory(
  offset: number = 0,
  limit: number = 20
): Promise<{ sessions: Session[]; scores: number[] }> {
  return apiRequest<{ sessions: Session[]; scores: number[] }>(
    `/user.history?s=${offset}&limit=${limit}`
  );
}

/**
 * 上传文件到签名URL
 */
export async function uploadToSignedUrl(
  uploadUrl: string,
  file: Blob | File
): Promise<void> {
  await fetch(uploadUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  });
}
