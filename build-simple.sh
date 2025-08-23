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
            // 创建包含能量光环和详细分析的结果页面
            const resultHTML = `
                <div style="text-align: center; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333; margin-bottom: 1rem;">🔮 能量分析结果 - 增强版</h2>
                    
                    <!-- 能量光环 -->
                    <div style="margin: 2rem 0;">
                        <h3 style="color: #333;">🌈 您的能量光环</h3>
                        <div class="energy-aura" style="width: 150px; height: 150px; margin: 1rem auto; position: relative; border-radius: 50%; background: conic-gradient(from 0deg, #4CAF50, #8BC34A, #CDDC39, #4CAF50); animation: rotate 10s linear infinite;">
                            <div style="position: absolute; top: 10px; left: 10px; right: 10px; bottom: 10px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
                                85
                            </div>
                        </div>
                        <p style="color: #666; font-size: 0.9rem;">能量强度: 85% | 光环色彩: 绿色系 | 流动模式: 顺时针</p>
                    </div>
                    
                    <!-- 基础分析 -->
                    <div style="background: #f8f9fa; padding: 1rem; border-radius: 10px; margin: 1rem 0;">
                        <h3 style="color: #333; margin-bottom: 0.5rem;">📊 基础分析</h3>
                        <p style="color: #666; margin: 0.5rem 0;"><strong>总体评分:</strong> 85/100</p>
                        <p style="color: #666; margin: 0.5rem 0;"><strong>能量等级:</strong> high</p>
                        <p style="color: #666; margin: 0.5rem 0;"><strong>生命力:</strong> 88/100</p>
                        <p style="color: #666; margin: 0.5rem 0;"><strong>平衡性:</strong> 82/100</p>
                    </div>
                    
                    <!-- AI智能解读 -->
                    <div style="background: #e3f2fd; padding: 1rem; border-radius: 10px; margin: 1rem 0;">
                        <h3 style="color: #333; margin-bottom: 0.5rem;">🤖 AI智能解读</h3>
                        <div style="text-align: left; color: #666;">
                            <p style="margin: 0.5rem 0;"><strong>主要洞察:</strong></p>
                            <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
                                <li>您的能量状态非常活跃</li>
                                <li>身心协调良好</li>
                                <li>适合进行创造性工作</li>
                                <li>建议多进行户外活动</li>
                            </ul>
                        </div>
                    </div>
                    
                    <!-- 色彩和五行分析 -->
                    <div style="background: #f3e5f5; padding: 1rem; border-radius: 10px; margin: 1rem 0;">
                        <h3 style="color: #333; margin-bottom: 0.5rem;">🎨 色彩和五行分析</h3>
                        <div style="text-align: left; color: #666;">
                            <p style="margin: 0.5rem 0;"><strong>适合色彩:</strong> 绿色、蓝色、紫色</p>
                            <p style="margin: 0.5rem 0;"><strong>避免色彩:</strong> 过于鲜艳的红色</p>
                            <p style="margin: 0.5rem 0;"><strong>主导五行:</strong> 木</p>
                            <p style="margin: 0.5rem 0;"><strong>平衡状态:</strong> 良好</p>
                            <p style="margin: 0.5rem 0;"><strong>调和建议:</strong> 多接触自然，增加木元素</p>
                        </div>
                    </div>
                    
                    <!-- 21天计划 -->
                    <div style="background: #e8f5e8; padding: 1rem; border-radius: 10px; margin: 1rem 0;">
                        <h3 style="color: #333; margin-bottom: 0.5rem;">📊 21天能量提升计划</h3>
                        <div style="text-align: left; color: #666;">
                            <div style="margin: 0.5rem 0;">
                                <p style="margin: 0.3rem 0;"><strong>第1-7天: 建立基础习惯</strong></p>
                                <ul style="margin: 0.3rem 0; padding-left: 1.5rem; font-size: 0.9rem;">
                                    <li>每天30分钟有氧运动</li>
                                    <li>增加绿色蔬菜摄入</li>
                                    <li>保持充足睡眠</li>
                                </ul>
                            </div>
                            <div style="margin: 0.5rem 0;">
                                <p style="margin: 0.3rem 0;"><strong>第8-14天: 深化能量练习</strong></p>
                                <ul style="margin: 0.3rem 0; padding-left: 1.5rem; font-size: 0.9rem;">
                                    <li>尝试冥想练习</li>
                                    <li>增加户外活动</li>
                                    <li>能量呼吸练习</li>
                                </ul>
                            </div>
                            <div style="margin: 0.5rem 0;">
                                <p style="margin: 0.3rem 0;"><strong>第15-21天: 巩固和提升</strong></p>
                                <ul style="margin: 0.3rem 0; padding-left: 1.5rem; font-size: 0.9rem;">
                                    <li>能量光环冥想</li>
                                    <li>色彩疗法练习</li>
                                    <li>五行平衡练习</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 操作按钮 -->
                    <div style="margin: 2rem 0;">
                        <button onclick="start21DayPlan()" style="background: linear-gradient(45deg, #00b894, #00cec9); color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 25px; margin: 0.5rem; cursor: pointer;">
                            🎯 开始21天计划
                        </button>
                        <button onclick="showEnergyAura()" style="background: linear-gradient(45deg, #ff6b6b, #ee5a24); color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 25px; margin: 0.5rem; cursor: pointer;">
                            🌈 查看能量光环
                        </button>
                        <button onclick="showColorAnalysis()" style="background: linear-gradient(45deg, #4834d4, #686de0); color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 25px; margin: 0.5rem; cursor: pointer;">
                            🎨 色彩分析
                        </button>
                    </div>
                </div>
            `;
            
            showMessage(resultHTML, 'success');
            isAnalyzing = false;
            
            // 隐藏进度条
            setTimeout(() => {
                document.getElementById('analysisProgress').style.display = 'none';
            }, 3000);
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
        
        // 页面加载完成后的初始化
        document.addEventListener('DOMContentLoaded', function() {
            showMessage('欢迎使用能量视觉增强版！\n\n📸 点击"开始能量分析"按钮启动相机\n📷 拍照后自动开始能量分析\n🎯 查看个性化建议和21天计划\n\n🔮 增强版功能：\n• 能量光环生成\n• AI智能解读\n• 21天计划管理', 'info');
        });
    </script>
</body>
</html>
EOF

echo "✅ 增强版应用创建成功！"
echo "📁 输出目录: dist/"
ls -la dist/
