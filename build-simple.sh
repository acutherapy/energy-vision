#!/bin/bash

echo "🚀 开始构建增强版能量分析应用..."

# 设置环境变量
export EXPO_NO_OPTIMIZE=1
export EXPO_NO_MINIFY=1
export EXPO_NO_IMAGE_OPTIMIZATION=1
export EXPO_NO_BUNDLE_ANALYZER=1

# 安装依赖
echo "📦 安装依赖..."
npm install

# 创建增强版HTML版本
echo "🔨 创建增强版应用..."
mkdir -p dist
mkdir -p dist/app

# 创建主页
cat > dist/index.html << 'EOF'
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Energy Vision - 智能能量分析应用</title>
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
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .cta-button {
            padding: 1rem 2rem;
            border-radius: 25px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            border: 2px solid transparent;
        }
        
        .cta-button.primary {
            background: linear-gradient(45deg, #a855f7, #9333ea);
            color: white;
            box-shadow: 0 4px 15px rgba(168, 85, 247, 0.4);
        }
        
        .cta-button.primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(168, 85, 247, 0.6);
        }
        
        .cta-button.secondary {
            background: rgba(255,255,255,0.1);
            color: white;
            border-color: rgba(255,255,255,0.3);
            backdrop-filter: blur(10px);
        }
        
        .cta-button.secondary:hover {
            background: rgba(255,255,255,0.2);
            transform: translateY(-2px);
        }
        
        .cta-button.success {
            background: linear-gradient(45deg, #10b981, #059669);
            color: white;
            box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
        }
        
        .cta-button.success:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(16, 185, 129, 0.6);
        }
        
        .status {
            margin-top: 2rem;
            padding: 1rem;
            background: rgba(255,255,255,0.1);
            border-radius: 15px;
            backdrop-filter: blur(10px);
        }
        
        .links {
            margin-top: 2rem;
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .links a {
            color: rgba(255,255,255,0.8);
            text-decoration: none;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            background: rgba(255,255,255,0.1);
            transition: all 0.3s ease;
        }
        
        .links a:hover {
            background: rgba(255,255,255,0.2);
            color: white;
        }
        
        /* 功能目录样式 */
        .directory-section {
            background: rgba(255,255,255,0.05);
            border-radius: 20px;
            padding: 2rem;
            margin: 2rem 0;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.1);
        }
        
        .directory-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-top: 1rem;
        }
        
        .directory-item {
            background: rgba(255,255,255,0.1);
            padding: 1rem;
            border-radius: 15px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            border: 1px solid rgba(255,255,255,0.1);
        }
        
        .directory-item:hover {
            background: rgba(255,255,255,0.2);
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        
        .directory-item h4 {
            margin-bottom: 0.5rem;
            color: #a855f7;
        }
        
        .directory-item p {
            font-size: 0.9rem;
            opacity: 0.8;
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
            <p class="subtitle">智能能量分析应用 - 增强版</p>
        </div>
        
        <div class="features">
            <div class="feature" onclick="openApp()">
                <h3>📱 移动端优化</h3>
                <p>专为手机设计的界面，支持触摸操作和手势控制</p>
            </div>
            <div class="feature" onclick="openApp()">
                <h3>🤖 AI智能分析</h3>
                <p>基于OpenAI的智能能量状态分析，包含DALL-E图像生成</p>
            </div>
            <div class="feature" onclick="openApp()">
                <h3>📊 21天计划</h3>
                <p>个性化能量提升方案，每日任务跟踪和进度管理</p>
            </div>
        </div>
        
        <!-- 功能目录 -->
        <div class="directory-section">
            <h2>📋 功能目录</h2>
            <div class="directory-grid">
                <div class="directory-item" onclick="openFeature('analysis')">
                    <h4>📸 能量分析</h4>
                    <p>拍照分析能量状态</p>
                </div>
                <div class="directory-item" onclick="openFeature('aura')">
                    <h4>🌈 能量光环</h4>
                    <p>API生成能量图像</p>
                </div>
                <div class="directory-item" onclick="openFeature('ai')">
                    <h4>🤖 AI解读</h4>
                    <p>智能分析报告</p>
                </div>
                <div class="directory-item" onclick="openFeature('plan')">
                    <h4>📊 21天计划</h4>
                    <p>个性化提升方案</p>
                </div>
                <div class="directory-item" onclick="openFeature('results')">
                    <h4>📋 结果查询</h4>
                    <p>历史分析记录</p>
                </div>
                <div class="directory-item" onclick="openFeature('energy')">
                    <h4>🎨 能量图像</h4>
                    <p>API生成图像库</p>
                </div>
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
            <p>✨ 增强版功能：能量光环、AI解读、21天计划</p>
            <p>📧 基于React Native应用核心功能开发</p>
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
            window.location.href = '/app';
        }
        
        // 打开特定功能页面
        function openFeature(feature) {
            switch(feature) {
                case 'analysis':
                    window.location.href = '/app#analysis';
                    break;
                case 'aura':
                    window.location.href = '/app#aura';
                    break;
                case 'ai':
                    window.location.href = '/app#ai';
                    break;
                case 'plan':
                    window.location.href = '/app#plan';
                    break;
                case 'results':
                    window.location.href = '/app#results';
                    break;
                case 'energy':
                    window.location.href = '/app#energy';
                    break;
                default:
                    window.location.href = '/app';
            }
        }
        
        // 测试API连接
        async function testAPI() {
            try {
                const response = await fetch('/api/test');
                if (response.ok) {
                    console.log('API连接正常');
                    return true;
                }
            } catch (error) {
                console.log('API连接测试中...');
                return false;
            }
        }
        
        // 页面加载时测试API
        document.addEventListener('DOMContentLoaded', function() {
            // 测试API连接
            testAPI();
            
            // 添加动画效果
            const features = document.querySelectorAll('.feature');
            features.forEach((feature, index) => {
                feature.style.animationDelay = `${index * 0.1}s`;
                feature.style.animation = 'fadeInUp 0.6s ease forwards';
            });
            
            // 添加目录项动画
            const directoryItems = document.querySelectorAll('.directory-item');
            directoryItems.forEach((item, index) => {
                item.style.animationDelay = `${(index + 3) * 0.1}s`;
                item.style.animation = 'fadeInUp 0.6s ease forwards';
            });
        });
        
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
        
        // 页面加载完成后的初始化
        document.addEventListener('DOMContentLoaded', function() {
            // 检查URL参数，显示相应的页面
            const hash = window.location.hash.substring(1);
            if (hash) {
                switch(hash) {
                    case 'analysis':
                        showMessage('📸 能量分析页面\n\n请点击"开始能量分析"按钮进行拍照分析', 'info');
                        break;
                    case 'aura':
                        showEnergyPortrait();
                        break;
                    case 'ai':
                        showMessage('🤖 AI解读页面\n\n这里将显示智能分析报告和个性化建议', 'info');
                        break;
                    case 'plan':
                        start21DayPlan();
                        break;
                    case 'results':
                        showResultsQuery();
                        break;
                    case 'energy':
                        showEnergyImageGallery();
                        break;
                    default:
                        showMessage('欢迎使用能量视觉增强版！\n\n📸 点击"开始能量分析"按钮启动相机\n📷 拍照后自动开始能量分析\n🎯 查看个性化建议和21天计划\n\n🔮 增强版功能：\n• 能量光环生成\n• AI智能解读\n• 21天计划管理', 'info');
                }
            } else {
                showMessage('欢迎使用能量视觉增强版！\n\n📸 点击"开始能量分析"按钮启动相机\n📷 拍照后自动开始能量分析\n🎯 查看个性化建议和21天计划\n\n🔮 增强版功能：\n• 能量光环生成\n• AI智能解读\n• 21天计划管理', 'info');
            }
        });
    </script>
</body>
</html>
EOF

# 创建增强版应用页面
cat > dist/app/index.html << 'EOF'
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>能量视觉 - Energy Vision 增强版</title>
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
            overflow: hidden;
            background: rgba(0,0,0,0.3);
        }
        
        #video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
        }
        
        .camera-placeholder {
            color: rgba(255,255,255,0.6);
            font-size: 0.9rem;
            text-align: center;
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
            font-size: 1.5rem;
            transition: all 0.3s ease;
        }
        
        .capture-button:hover {
            background: #9333ea;
            transform: scale(1.1);
        }
        
        .capture-button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
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
        
        .analysis-progress {
            display: none;
            margin: 2rem 0;
            padding: 1rem;
            background: rgba(255,255,255,0.1);
            border-radius: 15px;
        }
        
        .progress-bar {
            width: 100%;
            height: 20px;
            background: rgba(255,255,255,0.2);
            border-radius: 10px;
            overflow: hidden;
            margin: 1rem 0;
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(45deg, #00b894, #00cec9);
            width: 0%;
            transition: width 0.3s ease;
        }
        
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }
        
        .modal-content {
            background: white;
            color: #333;
            padding: 2rem;
            border-radius: 15px;
            max-width: 90%;
            max-height: 80%;
            overflow-y: auto;
            position: relative;
            white-space: pre-line;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .modal-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: #007bff;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            cursor: pointer;
        }
        
        .energy-aura {
            width: 200px;
            height: 200px;
            margin: 2rem auto;
            position: relative;
            border-radius: 50%;
            background: conic-gradient(from 0deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff9ff3, #ff6b6b);
            animation: rotate 10s linear infinite;
        }
        
        .energy-aura::before {
            content: '';
            position: absolute;
            top: 10px;
            left: 10px;
            right: 10px;
            bottom: 10px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
        }
        
        .energy-aura::after {
            content: '';
            position: absolute;
            top: 20px;
            left: 20px;
            right: 20px;
            bottom: 20px;
            background: rgba(255,255,255,0.1);
            border-radius: 50%;
            backdrop-filter: blur(10px);
        }
        
        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        .plan-section {
            margin: 2rem 0;
            padding: 1rem;
            background: rgba(255,255,255,0.1);
            border-radius: 15px;
        }
        
        .plan-item {
            background: rgba(255,255,255,0.1);
            margin: 0.5rem 0;
            padding: 1rem;
            border-radius: 10px;
            border-left: 4px solid #00b894;
        }
        
        @media (max-width: 768px) {
            .main-content {
                padding: 1rem;
            }
            
            .face-frame {
                width: 150px;
                height: 180px;
            }
            
            .energy-aura {
                width: 150px;
                height: 150px;
            }
        }
    </style>
</head>
<body>
    <a href="/" class="back-button">← 返回</a>
    
    <div class="header">
        <div class="title">能量视觉 - 增强版</div>
        <div class="header-icons">
            <div class="icon" onclick="showUserProfile()">👤</div>
            <div class="icon" onclick="showSettings()">⚙️</div>
        </div>
    </div>
    
    <div class="main-content">
        <button class="action-button" onclick="startAnalysis()">
            📸 🚀 开始能量分析
        </button>
        
        <div class="instruction">
            ✨ 增强版功能：能量光环 + AI解读 + 21天计划
        </div>
        
        <button class="test-button" onclick="enterAnalysis()">
            ✏️ 测试: 直接进入分析页面
        </button>
        
        <div class="camera-section">
            <div class="instruction">
                请将面部置于瓜子脸框内
            </div>
            
            <div class="face-frame" id="faceFrame">
                <div class="camera-placeholder" id="cameraPlaceholder">
                    📷<br>点击上方按钮启动相机
                </div>
                <video id="video" autoplay playsinline style="display: none;"></video>
            </div>
            
            <button class="capture-button" id="captureBtn" onclick="capturePhoto()" disabled>
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
        
        <div class="analysis-progress" id="analysisProgress">
            <h3>🔮 正在分析您的能量状态...</h3>
            <div class="progress-bar">
                <div class="progress-fill" id="progressFill"></div>
            </div>
            <p id="progressText">正在初始化分析...</p>
        </div>
    </div>
    
    <!-- 模态框 -->
    <div class="modal" id="modal">
        <div class="modal-content">
            <button class="modal-close" onclick="closeModal()">关闭</button>
            <div id="modalContent"></div>
        </div>
    </div>
    
    <script>
        let stream = null;
        let isAnalyzing = false;
        
        // 开始能量分析 - 增强版
        function startAnalysis() {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({ 
                    video: { 
                        facingMode: 'user',
                        width: { ideal: 640 },
                        height: { ideal: 480 }
                    } 
                })
                .then(function(videoStream) {
                    stream = videoStream;
                    const video = document.getElementById('video');
                    const placeholder = document.getElementById('cameraPlaceholder');
                    
                    video.srcObject = stream;
                    video.style.display = 'block';
                    placeholder.style.display = 'none';
                    
                    document.getElementById('captureBtn').disabled = false;
                    
                    showMessage('相机已启动！\n\n🔮 增强版功能：\n• 能量光环生成\n• AI智能解读\n• 21天计划\n\n请将面部置于框内，然后点击拍照按钮。', 'success');
                })
                .catch(function(err) {
                    showMessage('无法访问相机：' + err.message + '\n\n请确保：\n• 允许浏览器访问相机\n• 使用HTTPS连接\n• 相机未被其他应用占用', 'error');
                });
            } else {
                showMessage('您的浏览器不支持相机功能\n\n建议使用Chrome、Safari或Firefox最新版本', 'error');
            }
        }
        
        // 拍照功能 - 增强版
        function capturePhoto() {
            if (!stream) {
                showMessage('请先启动相机', 'error');
                return;
            }
            
            const video = document.getElementById('video');
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0);
            
            // 停止相机
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
                stream = null;
            }
            
            // 隐藏视频，显示拍照成功提示
            video.style.display = 'none';
            document.getElementById('cameraPlaceholder').style.display = 'block';
            document.getElementById('cameraPlaceholder').innerHTML = '✅<br>拍照成功！';
            
            document.getElementById('captureBtn').disabled = true;
            
            // 开始分析 - 增强版
            startEnergyAnalysis();
        }
        
        // 开始能量分析 - 增强版
        function startEnergyAnalysis() {
            if (isAnalyzing) return;
            
            isAnalyzing = true;
            const progressDiv = document.getElementById('analysisProgress');
            const progressFill = document.getElementById('progressFill');
            const progressText = document.getElementById('progressText');
            
            progressDiv.style.display = 'block';
            
            // 增强版分析步骤
            const steps = [
                { progress: 15, text: '准备拍照...' },
                { progress: 30, text: '拍照完成，开始分析...' },
                { progress: 45, text: '分析面部特征...' },
                { progress: 60, text: '计算能量分数...' },
                { progress: 75, text: '生成能量光环...' },
                { progress: 90, text: 'AI智能解读...' },
                { progress: 100, text: '生成21天计划...' }
            ];
            
            let currentStep = 0;
            
            const updateProgress = () => {
                if (currentStep < steps.length) {
                    const step = steps[currentStep];
                    progressFill.style.width = step.progress + '%';
                    progressText.textContent = step.text;
                    currentStep++;
                    
                    if (currentStep < steps.length) {
                        setTimeout(updateProgress, 1200);
                    } else {
                        setTimeout(() => {
                            showAnalysisResults();
                        }, 1000);
                    }
                }
            };
            
            updateProgress();
        }
        
        // 显示分析结果 - 增强版
        function showAnalysisResults() {
            // 调用API获取分析结果
            callAnalysisAPI().then(analysisResult => {
                const results = analysisResult || {
                    score: 96,
                    level: 'high',
                    aura: {
                        intensity: 96,
                        color: '#FF9800',
                        pattern: '脉冲扩散'
                    },
                    features: {
                        vitality: 94,
                        balance: 95,
                        harmony: 96,
                        clarity: 93
                    },
                    insights: [
                        '你的能量状态非常活跃，充满创造力和动力。适合进行高强度活动或创造性工作。'
                    ],
                    recommendations: [
                        '每天进行30分钟有氧运动',
                        '增加绿色蔬菜摄入',
                        '保持充足睡眠',
                        '尝试冥想练习'
                    ],
                    auraImageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center' // 默认图像
                };
                
                const message = `
                    <div style="text-align: center; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: white; margin-bottom: 1rem;">🔮 能量分析结果</h2>
                        
                        <!-- 能量画像 -->
                        <div class="analysis-result">
                            <h3 style="color: white; margin-bottom: 1rem; text-align: center;">🎨 您的能量画像</h3>
                            <div class="aura-image-container">
                                <img src="${results.auraImageUrl}" alt="能量光环" class="aura-image">
                                <div class="energy-score">
                                    ${results.score}
                                </div>
                            </div>
                            <p style="color: rgba(255,255,255,0.8); font-size: 0.9rem; text-align: center; margin: 1rem 0;">✨ DALL-E生成的能量光环</p>
                            <div style="text-align: center; margin: 1rem 0;">
                                <span style="background: rgba(168, 85, 247, 0.2); color: #a855f7; padding: 0.3rem 0.8rem; border-radius: 15px; font-size: 0.8rem; margin: 0 0.3rem;">能量强度: ${results.aura.intensity}%</span>
                                <span style="background: rgba(168, 85, 247, 0.2); color: #a855f7; padding: 0.3rem 0.8rem; border-radius: 15px; font-size: 0.8rem; margin: 0 0.3rem;">光环色彩: ${results.aura.color}</span>
                                <span style="background: rgba(168, 85, 247, 0.2); color: #a855f7; padding: 0.3rem 0.8rem; border-radius: 15px; font-size: 0.8rem; margin: 0 0.3rem;">流动模式: ${results.aura.pattern}</span>
                            </div>
                        </div>
                        
                        <!-- 能量分数 -->
                        <div class="analysis-result">
                            <h3 style="color: white; margin-bottom: 1rem;">Energy Score</h3>
                            <div style="text-align: center; margin: 2rem 0;">
                                <div style="font-size: 4rem; font-weight: bold; color: #a855f7; margin-bottom: 0.5rem;">${results.score}</div>
                                <div style="color: white; font-size: 1.2rem; margin-bottom: 1rem;">High & Active</div>
                                <p style="color: rgba(255,255,255,0.8); line-height: 1.6;">${results.insights[0]}</p>
                            </div>
                        </div>
                        
                        <!-- 能量特征分析 -->
                        <div class="energy-features">
                            <h3 style="color: white; margin-bottom: 1rem;">能量特征分析</h3>
                            <div class="feature-bar">
                                <span class="feature-label">生命力</span>
                                <div class="feature-progress">
                                    <div class="feature-fill" style="width: ${results.features.vitality}%;"></div>
                                </div>
                                <span class="feature-percentage">${results.features.vitality}%</span>
                            </div>
                            <div class="feature-bar">
                                <span class="feature-label">平衡性</span>
                                <div class="feature-progress">
                                    <div class="feature-fill" style="width: ${results.features.balance}%;"></div>
                                </div>
                                <span class="feature-percentage">${results.features.balance}%</span>
                            </div>
                            <div class="feature-bar">
                                <span class="feature-label">和谐度</span>
                                <div class="feature-progress">
                                    <div class="feature-fill" style="width: ${results.features.harmony}%;"></div>
                                </div>
                                <span class="feature-percentage">${results.features.harmony}%</span>
                            </div>
                            <div class="feature-bar">
                                <span class="feature-label">清晰度</span>
                                <div class="feature-progress">
                                    <div class="feature-fill" style="width: ${results.features.clarity}%;"></div>
                                </div>
                                <span class="feature-percentage">${results.features.clarity}%</span>
                            </div>
                        </div>
                        
                        <!-- 操作按钮 -->
                        <div style="margin-top: 2rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                            <button onclick="start21DayPlan()" style="background: #a855f7; color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 10px; cursor: pointer;">
                                🎯 开始21天计划
                            </button>
                            <button onclick="showEnergyPortrait()" style="background: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.3); padding: 0.8rem 1.5rem; border-radius: 10px; cursor: pointer;">
                                🎨 查看能量画像
                            </button>
                            <button onclick="window.location.href='/'" style="background: #f39c12; color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 10px; cursor: pointer;">
                                🏠 返回主页
                            </button>
                        </div>
                    </div>
                `;
                
                showMessage(message, 'success');
                isAnalyzing = false;
                
                // 隐藏进度条
                setTimeout(() => {
                    document.getElementById('analysisProgress').style.display = 'none';
                }, 3000);
            }).catch(error => {
                console.error('API调用失败:', error);
                // 如果API失败，使用默认数据
                showAnalysisResults();
            });
        }
        
        // 调用分析API
        async function callAnalysisAPI() {
            try {
                // 生成ChatGPT能量光环图像
                const auraImageUrl = await generateChatGPTAuraImage();
                
                // 这里可以连接到真实的API
                // const response = await fetch('/api/analysis', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify({
                //         image: 'base64_image_data'
                //     })
                // });
                // return await response.json();
                
                // 模拟API调用
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve({
                            score: 96,
                            level: 'high',
                            aura: {
                                intensity: 96,
                                color: '#FF9800',
                                pattern: '脉冲扩散'
                            },
                            features: {
                                vitality: 94,
                                balance: 95,
                                harmony: 96,
                                clarity: 93
                            },
                            insights: [
                                '你的能量状态非常活跃，充满创造力和动力。适合进行高强度活动或创造性工作。'
                            ],
                            recommendations: [
                                '每天进行30分钟有氧运动',
                                '增加绿色蔬菜摄入',
                                '保持充足睡眠',
                                '尝试冥想练习'
                            ],
                            auraImageUrl: auraImageUrl
                        });
                    }, 1000);
                });
            } catch (error) {
                console.error('API调用错误:', error);
                return null;
            }
        }
        
        // 生成ChatGPT能量光环图像
        async function generateChatGPTAuraImage() {
            try {
                // 模拟API调用延迟
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // 这里应该调用真实的ChatGPT DALL-E API
                // const response = await fetch('/api/generate-aura', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //         'Authorization': 'Bearer YOUR_OPENAI_API_KEY'
                //     },
                //     body: JSON.stringify({
                //         prompt: 'Create a mystical energy aura image with glowing purple, pink and gold colors, featuring a human head and shoulders silhouette in profile facing right, surrounded by concentric rings and swirling light, with cosmic background filled with sparkling star-like particles and cosmic dust, digital art style, high quality, 4K resolution, ethereal and mystical aura effect',
                //         model: 'dall-e-3',
                //         size: '1024x1024',
                //         quality: 'hd',
                //         style: 'vivid'
                //     })
                // });
                // const data = await response.json();
                // return data.data[0].url;
                
                // 模拟ChatGPT图像生成 - 使用真正的能量光环图像
                // 这些是更符合能量光环风格的图像URL
                const auraImages = [
                    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center&blur=0',
                    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop&crop=center&blur=0',
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center&blur=0',
                    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center&blur=0',
                    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop&crop=center&blur=0',
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center&blur=0'
                ];
                
                // 随机选择一个图像，模拟ChatGPT生成
                const randomIndex = Math.floor(Math.random() * auraImages.length);
                const selectedImage = auraImages[randomIndex];
                
                console.log('ChatGPT API: 能量光环图像生成成功 - 包含发光人形轮廓和宇宙背景');
                return selectedImage;
                
            } catch (error) {
                console.error('ChatGPT API调用错误:', error);
                // 返回默认图像
                return 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center&blur=0';
            }
        }
        
        // 开始21天计划
        function start21DayPlan() {
            const planHTML = `
                <div style="text-align: center; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333; margin-bottom: 1rem;">📊 21天能量提升计划</h2>
                    
                    <div style="background: #e8f5e8; padding: 1rem; border-radius: 10px; margin: 1rem 0;">
                        <h3 style="color: #333; margin-bottom: 0.5rem;">🎯 今日任务 (第1天)</h3>
                        <div style="text-align: left; color: #666;">
                            <div style="margin: 0.5rem 0; padding: 0.5rem; background: white; border-radius: 5px;">
                                <input type="checkbox" id="task1" style="margin-right: 0.5rem;">
                                <label for="task1">30分钟有氧运动</label>
                            </div>
                            <div style="margin: 0.5rem 0; padding: 0.5rem; background: white; border-radius: 5px;">
                                <input type="checkbox" id="task2" style="margin-right: 0.5rem;">
                                <label for="task2">增加绿色蔬菜摄入</label>
                            </div>
                            <div style="margin: 0.5rem 0; padding: 0.5rem; background: white; border-radius: 5px;">
                                <input type="checkbox" id="task3" style="margin-right: 0.5rem;">
                                <label for="task3">保持充足睡眠</label>
                            </div>
                        </div>
                        
                        <div style="margin: 1rem 0;">
                            <div style="background: #ddd; height: 20px; border-radius: 10px; overflow: hidden;">
                                <div style="background: linear-gradient(45deg, #00b894, #00cec9); height: 100%; width: 0%; transition: width 0.3s ease;" id="planProgress"></div>
                            </div>
                            <p style="color: #666; font-size: 0.9rem;">进度: <span id="progressText">0%</span></p>
                        </div>
                        
                        <button onclick="updateProgress()" style="background: linear-gradient(45deg, #00b894, #00cec9); color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 25px; cursor: pointer;">
                            ✅ 完成任务
                        </button>
                    </div>
                    
                    <div style="margin-top: 1rem;">
                        <button onclick="window.location.href='/'" style="background: #f39c12; color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 10px; cursor: pointer;">
                            🏠 返回主页
                        </button>
                    </div>
                    
                    <div style="background: #f8f9fa; padding: 1rem; border-radius: 10px; margin: 1rem 0;">
                        <h3 style="color: #333; margin-bottom: 0.5rem;">📈 计划概览</h3>
                        <div style="text-align: left; color: #666;">
                            <p style="margin: 0.3rem 0;"><strong>当前阶段:</strong> 第1-7天 - 建立基础习惯</p>
                            <p style="margin: 0.3rem 0;"><strong>已完成天数:</strong> 0天</p>
                            <p style="margin: 0.3rem 0;"><strong>总体进度:</strong> 0%</p>
                            <p style="margin: 0.3rem 0;"><strong>预计完成:</strong> 21天后</p>
                        </div>
                    </div>
                </div>
            `;
            
            showMessage(planHTML, 'info');
        }
        
        // 显示能量光环
        function showEnergyAura() {
            const auraHTML = `
                <div style="text-align: center; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333; margin-bottom: 1rem;">🌈 您的能量光环</h2>
                    
                    <div style="margin: 2rem 0;">
                        <div class="energy-aura" style="width: 200px; height: 200px; margin: 1rem auto; position: relative; border-radius: 50%; background: conic-gradient(from 0deg, #4CAF50, #8BC34A, #CDDC39, #4CAF50); animation: rotate 10s linear infinite;">
                            <div style="position: absolute; top: 15px; left: 15px; right: 15px; bottom: 15px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 2rem;">
                                85
                            </div>
                        </div>
                    </div>
                    
                    <div style="background: #e8f5e8; padding: 1rem; border-radius: 10px; margin: 1rem 0;">
                        <h3 style="color: #333; margin-bottom: 0.5rem;">光环解读</h3>
                        <div style="text-align: left; color: #666;">
                            <p style="margin: 0.5rem 0;"><strong>光环色彩:</strong> 绿色系 - 代表生命力旺盛</p>
                            <p style="margin: 0.5rem 0;"><strong>能量强度:</strong> 85% - 非常活跃</p>
                            <p style="margin: 0.5rem 0;"><strong>流动模式:</strong> 顺时针旋转 - 正向能量</p>
                            <p style="margin: 0.5rem 0;"><strong>代表特质:</strong> 创造力、生命力、平衡感</p>
                        </div>
                    </div>
                    
                    <div style="background: #f3e5f5; padding: 1rem; border-radius: 10px; margin: 1rem 0;">
                        <h3 style="color: #333; margin-bottom: 0.5rem;">能量建议</h3>
                        <div style="text-align: left; color: #666;">
                            <p style="margin: 0.5rem 0;">• 您的能量光环显示您具有强大的生命力</p>
                            <p style="margin: 0.5rem 0;">• 建议多进行户外活动，接触自然</p>
                            <p style="margin: 0.5rem 0;">• 适合进行创造性工作和艺术活动</p>
                            <p style="margin: 0.5rem 0;">• 保持这种积极的能量状态</p>
                        </div>
                    </div>
                </div>
            `;
            
            showMessage(auraHTML, 'info');
        }
        
        // 显示色彩分析
        function showColorAnalysis() {
            const colorHTML = `
                <div style="text-align: center; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333; margin-bottom: 1rem;">🎨 色彩和五行分析</h2>
                    
                    <div style="background: #e3f2fd; padding: 1rem; border-radius: 10px; margin: 1rem 0;">
                        <h3 style="color: #333; margin-bottom: 0.5rem;">🌈 适合的色彩</h3>
                        <div style="display: flex; justify-content: center; gap: 1rem; margin: 1rem 0;">
                            <div style="width: 50px; height: 50px; background: #4CAF50; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">绿</div>
                            <div style="width: 50px; height: 50px; background: #2196F3; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">蓝</div>
                            <div style="width: 50px; height: 50px; background: #9C27B0; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">紫</div>
                        </div>
                        <p style="color: #666;">这些色彩能增强您的能量和创造力</p>
                    </div>
                    
                    <div style="background: #fff3e0; padding: 1rem; border-radius: 10px; margin: 1rem 0;">
                        <h3 style="color: #333; margin-bottom: 0.5rem;">⚠️ 避免的色彩</h3>
                        <div style="display: flex; justify-content: center; gap: 1rem; margin: 1rem 0;">
                            <div style="width: 50px; height: 50px; background: #f44336; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">红</div>
                        </div>
                        <p style="color: #666;">过于鲜艳的红色可能会影响您的能量平衡</p>
                    </div>
                    
                    <div style="background: #e8f5e8; padding: 1rem; border-radius: 10px; margin: 1rem 0;">
                        <h3 style="color: #333; margin-bottom: 0.5rem;">🌿 五行分析</h3>
                        <div style="text-align: left; color: #666;">
                            <p style="margin: 0.5rem 0;"><strong>主导五行:</strong> 木 - 代表生长、创造力</p>
                            <p style="margin: 0.5rem 0;"><strong>平衡状态:</strong> 良好 - 五行协调</p>
                            <p style="margin: 0.5rem 0;"><strong>调和建议:</strong> 多接触自然，增加木元素</p>
                            <p style="margin: 0.5rem 0;"><strong>适合活动:</strong> 园艺、户外运动、艺术创作</p>
                        </div>
                    </div>
                    
                    <div style="background: #f3e5f5; padding: 1rem; border-radius: 10px; margin: 1rem 0;">
                        <h3 style="color: #333; margin-bottom: 0.5rem;">💄 妆容建议</h3>
                        <div style="text-align: left; color: #666;">
                            <p style="margin: 0.5rem 0;">• 眼影: 绿色、蓝色系</p>
                            <p style="margin: 0.5rem 0;">• 唇彩: 自然粉色、珊瑚色</p>
                            <p style="margin: 0.5rem 0;">• 腮红: 淡粉色、桃色</p>
                            <p style="margin: 0.5rem 0;">• 整体风格: 自然清新</p>
                        </div>
                    </div>
                </div>
            `;
            
            showMessage(colorHTML, 'info');
        }
        
        // 更新计划进度
        function updateProgress() {
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            const progressBar = document.getElementById('planProgress');
            const progressText = document.getElementById('progressText');
            
            let completed = 0;
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) completed++;
            });
            
            const progress = (completed / checkboxes.length) * 100;
            progressBar.style.width = progress + '%';
            progressText.textContent = Math.round(progress) + '%';
            
            if (progress === 100) {
                setTimeout(() => {
                    showMessage('🎉 恭喜！今日任务已完成！\n\n明天继续第2天的任务。', 'success');
                }, 1000);
            }
        }
        
        // 直接进入分析页面 - 增强版
        function enterAnalysis() {
            showMessage('正在进入分析页面...\n\n🔮 增强版功能已激活', 'info');
            setTimeout(() => {
                showAnalysisResults();
            }, 1000);
        }
        
        // 显示用户资料 - 增强版
        function showUserProfile() {
            const message = `
👤 用户资料 - 增强版

📱 用户名: 能量用户
🎯 当前等级: 能量探索者
📊 分析次数: 12次
🏆 成就: 连续7天打卡

💡 增强版功能：
• 能量光环可视化
• AI智能解读
• 21天计划管理
• 用户等级升级
• 数据同步

📈 能量趋势:
• 本周平均: 82分
• 趋势: 上升
• 建议: 继续保持
            `;
            showMessage(message, 'info');
        }
        
        // 显示设置 - 增强版
        function showSettings() {
            const message = `
⚙️ 应用设置 - 增强版

🔔 通知设置
• 每日提醒: 开启
• 分析完成提醒: 开启
• 计划提醒: 开启

📱 相机设置
• 自动保存照片: 关闭
• 高质量模式: 开启
• 能量光环生成: 开启

🎨 界面设置
• 深色模式: 自动
• 字体大小: 标准
• 动画效果: 开启

💡 增强版功能：
• 更多个性化选项
• 数据导出功能
• 隐私设置
• 账户管理
            `;
            showMessage(message, 'info');
        }
        
        // 显示消息
        function showMessage(message, type = 'info') {
            const modal = document.getElementById('modal');
            const modalContent = document.getElementById('modalContent');
            
            modalContent.innerHTML = message; // Use innerHTML to allow HTML tags
            modal.style.display = 'flex';
        }
        
        // 关闭模态框
        function closeModal() {
            document.getElementById('modal').style.display = 'none';
        }
        
        // 点击模态框背景关闭
        document.getElementById('modal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
        
        // 显示能量画像详情
        function showEnergyPortrait() {
            // 生成新的ChatGPT图像
            generateChatGPTAuraImage().then(auraImageUrl => {
                const message = `
                    <div style="text-align: center; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: white; margin-bottom: 1rem;">🎨 能量画像详情</h2>
                        
                        <div class="aura-image-container" style="margin: 2rem auto;">
                            <img src="${auraImageUrl}" alt="能量光环" class="aura-image">
                            <div class="energy-score">96</div>
                        </div>
                        
                        <div style="background: rgba(255,255,255,0.05); border-radius: 15px; padding: 1.5rem; margin: 1rem 0;">
                            <h3 style="color: white; margin-bottom: 1rem;">🔍 AI解读</h3>
                            <p style="color: rgba(255,255,255,0.8); line-height: 1.6; text-align: left;">
                                根据您的面部能量分析，您的光环呈现出温暖的橙色调（#FF9800），表明您具有高度的活力和创造力。
                                光环的脉冲扩散模式显示您的能量非常活跃且富有变化性，适合进行创新性工作和艺术创作。
                                这种能量状态与日出时分的自然能量相呼应，象征着新的开始和无限的可能性。
                                您的能量分数96分表明您处于极佳的状态，充满创造力和动力。
                            </p>
                        </div>
                        
                        <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 1rem;">
                            <button onclick="closeModal()" style="background: #a855f7; color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 10px; cursor: pointer;">
                                返回
                            </button>
                            <button onclick="window.location.href='/'" style="background: #f39c12; color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 10px; cursor: pointer;">
                                🏠 返回主页
                            </button>
                        </div>
                    </div>
                `;
                showMessage(message, 'info');
            }).catch(error => {
                console.error('生成能量画像失败:', error);
                // 使用默认图像
                const message = `
                    <div style="text-align: center; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: white; margin-bottom: 1rem;">🎨 能量画像详情</h2>
                        
                        <div class="aura-image-container" style="margin: 2rem auto;">
                            <img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center" alt="能量光环" class="aura-image">
                            <div class="energy-score">96</div>
                        </div>
                        
                        <div style="background: rgba(255,255,255,0.05); border-radius: 15px; padding: 1.5rem; margin: 1rem 0;">
                            <h3 style="color: white; margin-bottom: 1rem;">🔍 AI解读</h3>
                            <p style="color: rgba(255,255,255,0.8); line-height: 1.6; text-align: left;">
                                根据您的面部能量分析，您的光环呈现出温暖的橙色调（#FF9800），表明您具有高度的活力和创造力。
                                光环的脉冲扩散模式显示您的能量非常活跃且富有变化性，适合进行创新性工作和艺术创作。
                                这种能量状态与日出时分的自然能量相呼应，象征着新的开始和无限的可能性。
                                您的能量分数96分表明您处于极佳的状态，充满创造力和动力。
                            </p>
                        </div>
                        
                        <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 1rem;">
                            <button onclick="closeModal()" style="background: #a855f7; color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 10px; cursor: pointer;">
                                返回
                            </button>
                            <button onclick="window.location.href='/'" style="background: #f39c12; color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 10px; cursor: pointer;">
                                🏠 返回主页
                            </button>
                        </div>
                    </div>
                `;
                showMessage(message, 'info');
            });
        }
        
        // 显示结果查询页面
        function showResultsQuery() {
            const message = `
                <div style="text-align: center; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: white; margin-bottom: 1rem;">📋 结果查询</h2>
                    
                    <div style="background: rgba(255,255,255,0.05); border-radius: 15px; padding: 1.5rem; margin: 1rem 0;">
                        <h3 style="color: white; margin-bottom: 1rem;">📊 历史分析记录</h3>
                        <div style="text-align: left;">
                            <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 10px; margin: 0.5rem 0;">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div>
                                        <h4 style="color: white; margin-bottom: 0.5rem;">分析记录 #001</h4>
                                        <p style="color: rgba(255,255,255,0.8); font-size: 0.9rem;">2024-08-23 14:30</p>
                                    </div>
                                    <div style="text-align: right;">
                                        <div style="font-size: 1.5rem; font-weight: bold; color: #a855f7;">89</div>
                                        <div style="color: rgba(255,255,255,0.8); font-size: 0.8rem;">High & Active</div>
                                    </div>
                                </div>
                            </div>
                            <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 10px; margin: 0.5rem 0;">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div>
                                        <h4 style="color: white; margin-bottom: 0.5rem;">分析记录 #002</h4>
                                        <p style="color: rgba(255,255,255,0.8); font-size: 0.9rem;">2024-08-22 16:45</p>
                                    </div>
                                    <div style="text-align: right;">
                                        <div style="font-size: 1.5rem; font-weight: bold; color: #a855f7;">85</div>
                                        <div style="color: rgba(255,255,255,0.8); font-size: 0.8rem;">Medium & Balanced</div>
                                    </div>
                                </div>
                            </div>
                            <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 10px; margin: 0.5rem 0;">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div>
                                        <h4 style="color: white; margin-bottom: 0.5rem;">分析记录 #003</h4>
                                        <p style="color: rgba(255,255,255,0.8); font-size: 0.9rem;">2024-08-21 09:15</p>
                                    </div>
                                    <div style="text-align: right;">
                                        <div style="font-size: 1.5rem; font-weight: bold; color: #a855f7;">92</div>
                                        <div style="color: rgba(255,255,255,0.8); font-size: 0.8rem;">Excellent & Powerful</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 1rem;">
                        <button onclick="closeModal()" style="background: #a855f7; color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 10px; cursor: pointer;">
                            返回
                        </button>
                        <button onclick="window.location.href='/'" style="background: #f39c12; color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 10px; cursor: pointer;">
                            🏠 返回主页
                        </button>
                    </div>
                </div>
            `;
            showMessage(message, 'info');
        }
        
        // 显示能量图像库
        function showEnergyImageGallery() {
            const message = `
                <div style="text-align: center; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: white; margin-bottom: 1rem;">🎨 能量图像库</h2>
                    
                    <div style="background: rgba(255,255,255,0.05); border-radius: 15px; padding: 1.5rem; margin: 1rem 0;">
                        <h3 style="color: white; margin-bottom: 1rem;">🌈 API生成图像库</h3>
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1rem 0;">
                            <div style="background: rgba(255,255,255,0.1); border-radius: 10px; padding: 1rem;">
                                <img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&crop=center" alt="能量光环1" style="width: 100%; border-radius: 8px; margin-bottom: 0.5rem;">
                                <p style="color: rgba(255,255,255,0.8); font-size: 0.8rem;">紫色能量光环</p>
                            </div>
                            <div style="background: rgba(255,255,255,0.1); border-radius: 10px; padding: 1rem;">
                                <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop&crop=center" alt="能量光环2" style="width: 100%; border-radius: 8px; margin-bottom: 0.5rem;">
                                <p style="color: rgba(255,255,255,0.8); font-size: 0.8rem;">橙色能量光环</p>
                            </div>
                            <div style="background: rgba(255,255,255,0.1); border-radius: 10px; padding: 1rem;">
                                <img src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=200&fit=crop&crop=center" alt="能量光环3" style="width: 100%; border-radius: 8px; margin-bottom: 0.5rem;">
                                <p style="color: rgba(255,255,255,0.8); font-size: 0.8rem;">蓝色能量光环</p>
                            </div>
                            <div style="background: rgba(255,255,255,0.1); border-radius: 10px; padding: 1rem;">
                                <img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&crop=center" alt="能量光环4" style="width: 100%; border-radius: 8px; margin-bottom: 0.5rem;">
                                <p style="color: rgba(255,255,255,0.8); font-size: 0.8rem;">绿色能量光环</p>
                            </div>
                        </div>
                        <button onclick="generateNewEnergyImage()" style="background: #a855f7; color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 10px; cursor: pointer; margin-top: 1rem;">
                            🎨 生成新图像
                        </button>
                    </div>
                    
                    <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 1rem;">
                        <button onclick="closeModal()" style="background: #a855f7; color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 10px; cursor: pointer;">
                            返回
                        </button>
                        <button onclick="window.location.href='/'" style="background: #f39c12; color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 10px; cursor: pointer;">
                            🏠 返回主页
                        </button>
                    </div>
                </div>
            `;
            showMessage(message, 'info');
        }
        
        // 生成新的能量图像
        async function generateNewEnergyImage() {
            try {
                showMessage('🎨 正在生成新的能量图像...', 'info');
                const newImageUrl = await generateChatGPTAuraImage();
                showMessage(`✅ 新图像生成成功！\n\n图像URL: ${newImageUrl}`, 'success');
            } catch (error) {
                showMessage('❌ 图像生成失败，请稍后重试', 'error');
            }
        }
        
        // 页面加载完成后的初始化
        document.addEventListener('DOMContentLoaded', function() {
            // 检查URL参数，显示相应的页面
            const hash = window.location.hash.substring(1);
            if (hash) {
                switch(hash) {
                    case 'analysis':
                        showMessage('📸 能量分析页面\n\n请点击"开始能量分析"按钮进行拍照分析', 'info');
                        break;
                    case 'aura':
                        showEnergyPortrait();
                        break;
                    case 'ai':
                        showMessage('🤖 AI解读页面\n\n这里将显示智能分析报告和个性化建议', 'info');
                        break;
                    case 'plan':
                        start21DayPlan();
                        break;
                    case 'results':
                        showResultsQuery();
                        break;
                    case 'energy':
                        showEnergyImageGallery();
                        break;
                    default:
                        showMessage('欢迎使用能量视觉增强版！\n\n📸 点击"开始能量分析"按钮启动相机\n📷 拍照后自动开始能量分析\n🎯 查看个性化建议和21天计划\n\n🔮 增强版功能：\n• 能量光环生成\n• AI智能解读\n• 21天计划管理', 'info');
                }
            } else {
                showMessage('欢迎使用能量视觉增强版！\n\n📸 点击"开始能量分析"按钮启动相机\n📷 拍照后自动开始能量分析\n🎯 查看个性化建议和21天计划\n\n🔮 增强版功能：\n• 能量光环生成\n• AI智能解读\n• 21天计划管理', 'info');
            }
        });
    </script>
</body>
</html>
EOF

echo "✅ 增强版应用创建成功！"
echo "📁 输出目录: dist/"
ls -la dist/
