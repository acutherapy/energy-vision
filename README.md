# 能量视觉应用 (Energy Vision App)

一个基于 React Native + Expo 的智能能量分析应用，通过面部识别和AI技术分析用户的能量状态，并提供个性化的21天提升计划。

## 🌟 主要功能

### 📸 智能拍照分析
- 实时相机拍照功能
- 面部能量特征识别
- 本地能量计算引擎
- 动态能量环可视化

### 🎯 能量分析系统
- 多维度能量评估（生命力、平衡性、和谐度、清晰度）
- 个性化用户配置（晨型人、夜猫子、工作狂、平衡型）
- 时间感知的能量分析
- 详细的能量洞察和建议

### 📋 21天提升计划
- 个性化任务生成
- 每日任务打卡系统
- 进度跟踪和统计
- 多种任务类型（运动、呼吸、营养、睡眠等）

### 📊 对比分析
- 前后能量对比
- 可视化对比图表
- 生成对比海报
- 分享功能

## 🛠 技术栈

- **前端框架**: React Native (Expo)
- **开发语言**: TypeScript
- **导航**: React Navigation
- **UI组件**: 自定义组件 + React Native SVG
- **状态管理**: React Hooks
- **AI服务**: OpenAI API (可选)
- **后端服务**: Firebase (可选)
- **样式**: 自定义样式系统

## 📁 项目结构

```
energy_image_app/
├── src/
│   ├── components/          # 可复用组件
│   │   ├── EnergyAura.tsx   # 动态能量环
│   │   └── EnergyPortrait.tsx # 能量画像
│   ├── screens/             # 页面组件
│   │   ├── HomeScreen.tsx   # 主页面
│   │   ├── AnalysisScreen.tsx # 分析页面
│   │   ├── PlanScreen.tsx   # 计划页面
│   │   ├── CompareScreen.tsx # 对比页面
│   │   ├── UserSelectScreen.tsx # 用户选择
│   │   └── TestScreen.tsx   # 测试页面
│   ├── services/            # 服务层
│   │   ├── api.ts          # API服务
│   │   ├── aiAnalysis.ts   # AI分析服务
│   │   └── firebase.ts     # Firebase服务
│   ├── utils/              # 工具函数
│   │   ├── energyCalculator.ts # 能量计算引擎
│   │   ├── energyUtils.ts  # 能量工具函数
│   │   └── userProfile.ts  # 用户配置
│   ├── constants/          # 常量定义
│   │   ├── colors.ts       # 颜色主题
│   │   └── layout.ts       # 布局常量
│   └── types/              # TypeScript类型
│       └── index.ts        # 类型定义
├── App.tsx                 # 应用入口
├── package.json            # 依赖配置
├── babel.config.js         # Babel配置
├── tsconfig.json           # TypeScript配置
└── README.md               # 项目文档
```

## 🚀 快速开始

### 环境要求

- Node.js 16+
- npm 或 yarn
- Expo CLI
- iOS Simulator 或 Android Emulator (可选)

### 安装步骤

1. **克隆项目**
```bash
git clone <repository-url>
cd energy_image_app
```

2. **安装依赖**
```bash
npm install
```

3. **配置环境变量**
```bash
cp env.example .env.local
# 编辑 .env.local 文件，配置你的API密钥
```

4. **启动开发服务器**
```bash
npx expo start
```

5. **运行应用**
- 在手机上安装 Expo Go 应用
- 扫描终端中的二维码
- 或在浏览器中运行: `npx expo start --web`

## ⚙️ 配置说明

### 环境变量配置

创建 `.env.local` 文件并配置以下变量：

```bash
# Firebase 配置 (可选)
EXPO_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id

# OpenAI API 配置 (可选)
EXPO_PUBLIC_OPENAI_API_KEY=your_openai_api_key

# API 基础URL
EXPO_PUBLIC_API_BASE_URL=https://your-api-domain.com
```

### 用户类型配置

应用支持4种预设用户类型：

1. **晨型人** - 早晨能量最高
2. **夜猫子** - 晚上能量最高
3. **工作狂** - 下午能量最高
4. **平衡型** - 全天能量均衡

## 🎯 核心功能详解

### 能量计算引擎

应用使用科学的能量计算算法，基于以下维度：

- **生命力** (30%): 面部亮度、对比度、饱和度
- **平衡性** (25%): 面部对称性、比例、对齐
- **和谐度** (25%): 色彩和谐、纹理平滑度
- **清晰度** (20%): 锐度、焦点、分辨率

### 个性化分析

- 时间感知：根据当前时间调整分析权重
- 用户适配：基于用户类型调整特征计算
- 动态生成：每次分析都会生成不同的特征数据

### 21天计划系统

- **任务类型**: 运动、呼吸、营养、睡眠、社交、补水
- **个性化**: 基于用户类型和能量分析生成任务
- **进度跟踪**: 实时更新完成进度
- **激励机制**: 完成提示和奖励

## 📱 使用指南

### 首次使用

1. 打开应用，选择用户类型
2. 点击拍照按钮进行能量分析
3. 查看分析结果和能量环
4. 开始21天提升计划

### 日常使用

1. 定期拍照分析能量状态
2. 完成每日任务并打卡
3. 查看进度和改善情况
4. 21天后进行对比分析

### 高级功能

- 使用AI分析获得更准确的结果
- 连接Firebase保存历史数据
- 生成对比海报分享成果

## 🔧 开发指南

### 添加新功能

1. 在 `src/types/index.ts` 中定义类型
2. 在 `src/utils/` 中实现核心逻辑
3. 在 `src/components/` 中创建UI组件
4. 在 `src/screens/` 中创建页面
5. 更新导航配置

### 自定义样式

- 修改 `src/constants/colors.ts` 调整颜色主题
- 修改 `src/constants/layout.ts` 调整布局常量
- 在组件中使用 `StyleSheet` 创建样式

### 扩展用户类型

在 `src/utils/userProfile.ts` 中添加新的用户配置：

```typescript
{
  id: 'user_5',
  name: '新用户类型',
  energyPattern: 'balanced',
  stressLevel: 'low',
  activityLevel: 'medium',
  sleepQuality: 'good',
  modifiers: {
    vitality: 0.0,
    balance: 0.0,
    harmony: 0.0,
    clarity: 0.0,
  },
}
```

## 🧪 测试

### 运行测试

```bash
# 检查项目完整性
node test-app.js

# 启动开发服务器
npx expo start

# 运行TypeScript检查
npx tsc --noEmit

# 运行ESLint检查
npm run lint
```

### 测试功能

1. **基础功能测试**: 拍照、分析、查看结果
2. **用户配置测试**: 切换用户类型
3. **计划系统测试**: 创建计划、打卡、查看进度
4. **API测试**: 使用测试页面验证API连接

## 🚀 部署

### 构建生产版本

```bash
# 构建Android APK
npx expo build:android

# 构建iOS应用
npx expo build:ios

# 构建Web版本
npx expo build:web
```

### 发布到应用商店

1. 配置应用图标和启动画面
2. 更新 `app.json` 中的应用信息
3. 构建生产版本
4. 提交到应用商店审核

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- React Native 团队
- Expo 团队
- OpenAI 提供的AI服务
- Firebase 提供的后端服务

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 项目Issues: [GitHub Issues](https://github.com/your-repo/issues)
- 邮箱: your-email@example.com

---

**注意**: 这是一个演示项目，某些功能（如AI分析、Firebase集成）需要配置相应的API密钥才能正常工作。
