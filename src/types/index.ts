// 通用类型
export type ISODate = string; // e.g. "2025-08-14T10:20:00Z"

// 能量特征（本地计算）
export interface EnergyFeatures {
  joy: number;        // 0..1
  calm: number;       // 0..1
  focus: number;      // 0..1
  brightness: number; // 0..1 画面整体明度
  warmRatio: number;  // 0..1 暖色占比
  // 扩展特征（用于计算）
  contrast?: number;      // 0..1 对比度
  saturation?: number;    // 0..1 饱和度
  symmetry?: number;      // 0..1 对称性
  proportion?: number;    // 0..1 比例
  alignment?: number;     // 0..1 对齐
  colorHarmony?: number;  // 0..1 色彩和谐
  textureSmoothness?: number; // 0..1 纹理平滑度
  noiseLevel?: number;    // 0..1 噪点水平
  sharpness?: number;     // 0..1 锐度
  focus?: number;         // 0..1 焦点
  resolution?: number;    // 0..1 分辨率
}

export interface Session {
  sid: string;
  uid: string;
  features: EnergyFeatures;
  energyScore: number;         // 0..100
  localAuraUrl?: string;       // 客户端渲染上传的静态图（可选）
  cloudAuraUrl?: string;       // 云端高清图（可选）
  sourceImageUrl?: string;     // 原图（用户同意上传时）
  createdAt: ISODate;
  updatedAt: ISODate;
}

export type TaskType = "move" | "breath" | "hydrate" | "sleep" | "nutrition" | "social";

export interface PlanTask {
  id: string;
  type: TaskType;
  title: string;      // e.g. "快走 20 分钟"
  desc?: string;
  done?: boolean;
}

export interface PlanDay {
  day: number;        // 1..21
  tasks: PlanTask[];  // 通常 3 个
}

export interface Plan {
  planId: string;
  uid: string;
  sid: string;             // 依据哪次 Session 生成
  days: PlanDay[];         // 21 天
  progress: { completed: number; total: number }; // 0..63
  createdAt: ISODate;
  updatedAt: ISODate;
}

export interface Checkin {
  cid: string;
  uid: string;
  planId: string;
  day: number;
  taskId: string;
  note?: string;
  photoUrl?: string;
  createdAt: ISODate;
}

export interface ContrastPoster {
  posterUrl: string;
  sidBefore: string;
  sidAfter: string;
  createdAt: ISODate;
}

// 用户相关类型
export interface UserProfile {
  displayName?: string;
  locale?: string;
  tz?: string;
  email?: string;
  photoURL?: string;
}

export interface UserSettings {
  watermark: boolean;
  cloudRenderOptIn: boolean;
  notifications: boolean;
  theme: 'light' | 'dark' | 'auto';
}

// API 请求/响应类型
export interface CreateSessionRequest {
  features: EnergyFeatures;
  energyScore: number;
  requestCloudRender?: boolean;
}

export interface CreateSessionResponse {
  sid: string;
  uploadUrl?: string;
  message: string;
}

export interface AttachLocalAuraRequest {
  sid: string;
  localAuraUrl: string;
}

export interface GeneratePlanRequest {
  sid: string;
  mode: "rule" | "gpt";
}

export interface GeneratePlanResponse {
  planId: string;
  days: PlanDay[];
  progress: { completed: number; total: number };
}

export interface CheckinRequest {
  planId: string;
  day: number;
  taskId: string;
  note?: string;
  photoUrl?: string;
}

export interface CheckinResponse {
  cid: string;
  newProgress: { completed: number; total: number };
}

export interface BuildContrastRequest {
  sidBefore: string;
  sidAfter: string;
}

export interface BuildContrastResponse {
  posterUrl: string;
}

// 错误类型
export interface APIError {
  error: {
    code: "UNAUTHORIZED" | "PERMISSION_DENIED" | "INVALID_ARGUMENT" | "NOT_FOUND" | "RATE_LIMIT";
    message: string;
  };
}

// 导航类型
export type RootStackParamList = {
  Home: undefined;
  Analysis: { session: Session };
  Plan: { planId: string };
  Compare: { sidBefore: string; sidAfter: string };
  Auth: undefined;
  Profile: undefined;
  UserSelect: undefined;
  Test: undefined;
};
