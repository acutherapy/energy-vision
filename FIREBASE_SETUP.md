# Firebase 配置指南

## 🚀 快速配置步骤

### 第一步：创建Firebase项目

1. 访问 [Firebase Console](https://console.firebase.google.com/)
2. 点击"创建项目"
3. 输入项目名称：`energy-vision-app`
4. 选择是否启用Google Analytics（推荐启用）
5. 点击"创建项目"

### 第二步：添加Web应用

1. 在项目概览页面，点击"Web"图标（</>）
2. 输入应用昵称：`Energy Vision Web`
3. 点击"注册应用"
4. 复制配置对象

### 第三步：获取配置信息

复制显示的配置对象，类似这样：
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "energy-vision-app.firebaseapp.com",
  projectId: "energy-vision-app",
  storageBucket: "energy-vision-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

### 第四步：更新环境变量

编辑 `.env.local` 文件：
```bash
# Firebase 配置
EXPO_PUBLIC_FIREBASE_API_KEY=你的apiKey
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=你的项目.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=你的项目ID
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=你的项目.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=你的messagingSenderId
EXPO_PUBLIC_FIREBASE_APP_ID=你的appId

# API 配置
EXPO_PUBLIC_API_BASE_URL=https://your-region-your-project.cloudfunctions.net
```

### 第五步：启用Firebase服务

#### 1. Authentication（认证）
- 在左侧菜单点击"Authentication"
- 点击"开始使用"
- 启用以下登录方法：
  - ✅ 电子邮件/密码
  - ✅ Google
  - ✅ Apple（iOS需要）
  - ✅ 匿名登录

#### 2. Firestore Database（数据库）
- 在左侧菜单点击"Firestore Database"
- 点击"创建数据库"
- 选择"以测试模式开始"
- 选择数据库位置

#### 3. Storage（存储）
- 在左侧菜单点击"Storage"
- 点击"开始使用"
- 选择"以测试模式开始"

### 第六步：配置安全规则

#### Firestore安全规则
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /sessions/{sessionId} {
      allow read, write: if request.auth != null && 
        resource.data.uid == request.auth.uid;
    }
    
    match /plans/{planId} {
      allow read, write: if request.auth != null && 
        resource.data.uid == request.auth.uid;
    }
    
    match /checkins/{checkinId} {
      allow read, write: if request.auth != null && 
        resource.data.uid == request.auth.uid;
    }
    
    match /contrasts/{contrastId} {
      allow read, write: if request.auth != null && 
        resource.data.uid == request.auth.uid;
    }
  }
}
```

#### Storage安全规则
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && 
        request.auth.uid == userId;
    }
    
    match /sessions/{sessionId}/{allPaths=**} {
      allow read, write: if request.auth != null;
    }
    
    match /contrasts/{contrastId}/{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 🧪 测试配置

### 方法1：使用测试服务器
```bash
npm run test-server
```
访问 http://localhost:3000

### 方法2：使用简化Expo启动
```bash
npm run start-simple
```

### 方法3：使用移动设备
1. 安装Expo Go应用
2. 扫描QR码
3. 测试基本功能

## 🔧 常见问题

### 问题1：EMFILE错误
**解决方案：**
- 使用 `npm run start-simple`
- 或者重启终端
- 或者使用测试服务器

### 问题2：Firebase连接失败
**解决方案：**
- 检查环境变量配置
- 确保项目ID正确
- 检查网络连接

### 问题3：权限被拒绝
**解决方案：**
- 检查安全规则配置
- 确保用户已认证
- 验证数据路径

## 📱 下一步

配置完成后：
1. 测试拍照功能
2. 验证能量分析
3. 测试21天计划
4. 实现图像处理API
5. 添加推送通知

## 📞 支持

如有问题，请：
1. 检查控制台错误信息
2. 验证Firebase配置
3. 查看项目文档
4. 联系开发团队
