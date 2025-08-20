# 🚀 快速Firebase配置指南

## 第一步：创建Firebase项目

1. 访问 [Firebase Console](https://console.firebase.google.com/)
2. 点击"创建项目"
3. 项目名称：`energy-vision-app`
4. 启用Google Analytics（可选）
5. 点击"创建项目"

## 第二步：添加Web应用

1. 点击"Web"图标（</>）
2. 应用昵称：`Energy Vision Web`
3. 点击"注册应用"
4. **复制配置对象**

## 第三步：更新环境变量

编辑 `.env.local` 文件，替换为你的真实配置：

```bash
# Firebase 配置
EXPO_PUBLIC_FIREBASE_API_KEY=你的真实API_KEY
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=你的项目.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=你的项目ID
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=你的项目.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=你的真实SENDER_ID
EXPO_PUBLIC_FIREBASE_APP_ID=你的真实APP_ID

# API 配置
EXPO_PUBLIC_API_BASE_URL=https://your-region-your-project.cloudfunctions.net
```

## 第四步：启用服务

### Authentication
- 左侧菜单 → "Authentication" → "开始使用"
- 启用：电子邮件/密码、Google、匿名登录

### Firestore Database
- 左侧菜单 → "Firestore Database" → "创建数据库"
- 选择"以测试模式开始"

### Storage
- 左侧菜单 → "Storage" → "开始使用"
- 选择"以测试模式开始"

## 第五步：测试配置

```bash
# 启动测试服务器
node test-app.js

# 或者启动Expo
npx expo start --web
```

## ✅ 完成！

配置完成后，你的应用将能够：
- 用户认证
- 数据存储
- 图片上传
- 实时同步

## 🔧 当前状态

- ✅ 项目结构完整
- ✅ 依赖已安装
- ⏳ 等待Firebase配置
- ⏳ 等待API部署
