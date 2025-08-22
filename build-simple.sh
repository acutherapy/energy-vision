#!/bin/bash

echo "🚀 开始简化构建..."

# 设置环境变量
export EXPO_NO_OPTIMIZE=1
export EXPO_NO_MINIFY=1
export EXPO_NO_IMAGE_OPTIMIZATION=1
export EXPO_NO_BUNDLE_ANALYZER=1

# 安装依赖
echo "📦 安装依赖..."
npm install

# 创建简化的HTML版本
echo "🔨 创建简化版本..."
mkdir -p dist
mkdir -p dist/app

# 创建基本的HTML文件
cat > dist/index.html << 'EOF'
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Energy Vision - 能量分析应用</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .container {
            max-width: 800px;
            width: 100%;
            text-align: center;
        }
        
        .header {
            margin-bottom: 2rem;
        }
        
        h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        .subtitle {
            font-size: 1.2rem;
            opacity: 0.9;
            margin-bottom: 2rem;
        }
        
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }
        
        .feature {
            background: rgba(255,255,255,0.1);
            padding: 1.5rem;
            border-radius: 15px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
            transition: transform 0.3s ease;
            cursor: pointer;
        }
        
        .feature:hover {
            transform: translateY(-5px);
            background: rgba(255,255,255,0.15);
        }
        
        .feature h3 {
            font-size: 1.3rem;
            margin-bottom: 0.5rem;
        }
        
        .feature p {
            opacity: 0.8;
            line-height: 1.5;
        }
        
        .cta {
            margin-top: 2rem;
        }
        
        .cta-button {
            background: rgba(255,255,255,0.2);
            color: white;
            border: 2px solid rgba(255,255,255,0.3);
            padding: 1rem 2rem;
            border-radius: 50px;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
            margin: 0 0.5rem;
        }
        
        .cta-button:hover {
            background: rgba(255,255,255,0.3);
            transform: scale(1.05);
        }
        
        .cta-button.primary {
            background: linear-gradient(45deg, #ff6b6b, #ee5a24);
            border-color: #ff6b6b;
        }
        
        .cta-button.secondary {
            background: linear-gradient(45deg, #4834d4, #686de0);
            border-color: #4834d4;
        }
        
        .cta-button.success {
            background: linear-gradient(45deg, #00b894, #00cec9);
            border-color: #00b894;
        }
        
        .status {
            margin-top: 2rem;
            padding: 1rem;
            background: rgba(255,255,255,0.1);
            border-radius: 10px;
            font-size: 0.9rem;
            opacity: 0.8;
        }
        
        .links {
            margin-top: 1rem;
            display: flex;
            justify-content: center;
            gap: 1rem;
            flex-wrap: wrap;
        }
        
        .links a {
            color: #fff;
            text-decoration: none;
            opacity: 0.7;
            transition: opacity 0.3s ease;
            font-size: 0.9rem;
        }
        
        .links a:hover {
            opacity: 1;
        }
        
        @media (max-width: 768px) {
            h1 {
                font-size: 2rem;
            }
            
            .features {
                grid-template-columns: 1fr;
            }
            
            .cta-button {
                display: block;
                margin: 0.5rem auto;
                max-width: 200px;
            }
            
            .links {
                flex-direction: column;
                align-items: center;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔮 Energy Vision</h1>
            <p class="subtitle">智能能量分析应用</p>
        </div>
        
        <div class="features">
            <div class="feature" onclick="openApp()">
                <h3>📱 移动端优化</h3>
                <p>专为手机设计的界面，支持触摸操作和手势控制</p>
            </div>
            <div class="feature" onclick="openApp()">
                <h3>🤖 AI智能分析</h3>
                <p>基于OpenAI的智能能量状态分析，提供个性化建议</p>
            </div>
            <div class="feature" onclick="openApp()">
                <h3>📊 21天计划</h3>
                <p>个性化能量提升方案，每日任务跟踪和进度管理</p>
            </div>
        </div>
        
        <div class="cta">
            <a href="#" class="cta-button primary" onclick="openApp()">
                🚀 开始使用应用
            </a>
            <a href="https://github.com/acutherapy/energy-vision" class="cta-button secondary" target="_blank">
                📝 查看源码
            </a>
            <a href="https://github.com/acutherapy/energy-vision/issues" class="cta-button success" target="_blank">
                💬 反馈问题
            </a>
        </div>
        
        <div class="status">
            <p>✨ 应用功能正在完善中，即将推出完整版本</p>
            <p>📧 如需测试完整功能，请联系开发团队</p>
        </div>
        
        <div class="links">
            <a href="#" onclick="openApp()">🔗 直接进入应用</a>
            <a href="https://github.com/acutherapy/energy-vision" target="_blank">📁 GitHub仓库</a>
            <a href="https://github.com/acutherapy/energy-vision/issues" target="_blank">🐛 报告问题</a>
        </div>
    </div>
    
    <script>
        // 添加一些交互效果
        document.addEventListener('DOMContentLoaded', function() {
            const features = document.querySelectorAll('.feature');
            features.forEach((feature, index) => {
                feature.style.animationDelay = `${index * 0.1}s`;
                feature.style.animation = 'fadeInUp 0.6s ease forwards';
            });
        });
        
        // 打开应用
        function openApp() {
            // 直接跳转到应用页面
            window.location.href = '/app';
        }
        
        // 添加动画样式
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    </script>
</body>
</html>
EOF

# 创建应用页面
cat > dist/app/index.html << 'EOF'
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>能量视觉 - Energy Vision</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
            overflow-x: hidden;
        }
        
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
        }
        
        .title {
            font-size: 1.5rem;
            font-weight: bold;
        }
        
        .header-icons {
            display: flex;
            gap: 1rem;
        }
        
        .icon {
            width: 24px;
            height: 24px;
            background: rgba(255,255,255,0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }
        
        .main-content {
            padding: 2rem 1rem;
            text-align: center;
        }
        
        .action-button {
            background: linear-gradient(45deg, #ff6b6b, #ee5a24);
            color: white;
            border: none;
            padding: 1rem 2rem;
            border-radius: 25px;
            font-size: 1.1rem;
            cursor: pointer;
            margin: 1rem 0;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            width: 100%;
            max-width: 300px;
            margin-left: auto;
            margin-right: auto;
        }
        
        .test-button {
            background: rgba(255,255,255,0.2);
            color: white;
            border: 1px solid rgba(255,255,255,0.3);
            padding: 0.8rem 1.5rem;
            border-radius: 20px;
            font-size: 0.9rem;
            cursor: pointer;
            margin: 0.5rem 0;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            width: 100%;
            max-width: 300px;
            margin-left: auto;
            margin-right: auto;
        }
        
        .camera-section {
            margin: 2rem 0;
            padding: 2rem;
            background: rgba(255,255,255,0.1);
            border-radius: 20px;
            backdrop-filter: blur(10px);
        }
        
        .face-frame {
            width: 200px;
            height: 250px;
            border: 3px dashed #a855f7;
            border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
            margin: 2rem auto;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .capture-button {
            width: 60px;
            height: 60px;
            background: #a855f7;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            margin: 1rem auto;
            display: block;
        }
        
        .instruction {
            margin: 1rem 0;
            font-size: 0.9rem;
            opacity: 0.8;
        }
        
        .back-button {
            position: fixed;
            top: 1rem;
            left: 1rem;
            background: rgba(255,255,255,0.2);
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            cursor: pointer;
            text-decoration: none;
            font-size: 0.9rem;
        }
        
        @media (max-width: 768px) {
            .main-content {
                padding: 1rem;
            }
            
            .face-frame {
                width: 150px;
                height: 180px;
            }
        }
    </style>
</head>
<body>
    <a href="/" class="back-button">← 返回</a>
    
    <div class="header">
        <div class="title">能量视觉</div>
        <div class="header-icons">
            <div class="icon">👤</div>
            <div class="icon">⚙️</div>
        </div>
    </div>
    
    <div class="main-content">
        <button class="action-button" onclick="startAnalysis()">
            📸 🚀 开始能量分析
        </button>
        
        <div class="instruction">
            ✨ 体验完整 → 任务打卡
        </div>
        
        <button class="test-button" onclick="enterAnalysis()">
            ✏️ 测试: 直接进入分析页面
        </button>
        
        <div class="camera-section">
            <div class="instruction">
                请将面部置于瓜子脸框内
            </div>
            
            <div class="face-frame">
                <!-- 相机预览区域 -->
            </div>
            
            <button class="capture-button" onclick="capturePhoto()">
                📷
            </button>
            
            <div class="instruction">
                点击拍照
            </div>
            
            <div class="instruction">
                点击按钮开始能量分析
            </div>
            
            <div class="instruction">
                系统将分析您的面部能量状态
            </div>
        </div>
    </div>
    
    <script>
        function startAnalysis() {
            // 请求相机权限
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({ video: true })
                    .then(function(stream) {
                        alert('相机权限已获取！可以开始拍照分析。');
                    })
                    .catch(function(err) {
                        alert('无法访问相机：' + err.message);
                    });
            } else {
                alert('您的浏览器不支持相机功能');
            }
        }
        
        function capturePhoto() {
            alert('拍照功能正在开发中...');
        }
        
        function enterAnalysis() {
            alert('直接进入分析页面功能正在开发中...');
        }
    </script>
</body>
</html>
EOF

echo "✅ 简化版本创建成功！"
echo "📁 输出目录: dist/"
ls -la dist/
