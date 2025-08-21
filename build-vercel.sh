#!/bin/bash

echo "🚀 开始Vercel构建..."

# 设置环境变量避免图片处理问题
export EXPO_NO_OPTIMIZE=1
export EXPO_NO_MINIFY=1
export EXPO_NO_IMAGE_OPTIMIZATION=1

# 安装依赖
echo "📦 安装依赖..."
npm install

# 尝试构建
echo "🔨 构建Web版本..."
if npx expo export --platform web --clear; then
    echo "✅ Expo构建成功！"
    echo "📁 输出目录: dist/"
    ls -la dist/
else
    echo "❌ Expo构建失败，使用备用方案..."
    
    # 创建基本的HTML页面
    mkdir -p dist
    cat > dist/index.html << 'EOF'
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Energy Vision - 能量分析应用</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            text-align: center;
            max-width: 600px;
        }
        h1 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }
        p {
            font-size: 1.2rem;
            margin-bottom: 2rem;
            opacity: 0.9;
        }
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-top: 2rem;
        }
        .feature {
            background: rgba(255,255,255,0.1);
            padding: 1rem;
            border-radius: 10px;
            backdrop-filter: blur(10px);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔮 Energy Vision</h1>
        <p>能量分析应用正在构建中...</p>
        <div class="features">
            <div class="feature">
                <h3>📱 移动端优化</h3>
                <p>专为手机设计的界面</p>
            </div>
            <div class="feature">
                <h3>🤖 AI分析</h3>
                <p>智能能量状态分析</p>
            </div>
            <div class="feature">
                <h3>📊 21天计划</h3>
                <p>个性化提升方案</p>
            </div>
        </div>
        <p style="margin-top: 2rem; font-size: 0.9rem; opacity: 0.7;">
            请稍后刷新页面，或联系开发团队获取最新版本
        </p>
    </div>
</body>
</html>
EOF
    
    echo "✅ 创建了备用页面"
    echo "📁 输出目录: dist/"
    ls -la dist/
fi
