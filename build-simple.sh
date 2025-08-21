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
        
        .status {
            margin-top: 2rem;
            padding: 1rem;
            background: rgba(255,255,255,0.1);
            border-radius: 10px;
            font-size: 0.9rem;
            opacity: 0.8;
        }
        
        .github-link {
            margin-top: 1rem;
        }
        
        .github-link a {
            color: #fff;
            text-decoration: none;
            opacity: 0.7;
            transition: opacity 0.3s ease;
        }
        
        .github-link a:hover {
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
            <div class="feature" onclick="openGitHub()">
                <h3>📱 移动端优化</h3>
                <p>专为手机设计的界面，支持触摸操作和手势控制</p>
            </div>
            <div class="feature" onclick="openGitHub()">
                <h3>🤖 AI智能分析</h3>
                <p>基于OpenAI的智能能量状态分析，提供个性化建议</p>
            </div>
            <div class="feature" onclick="openGitHub()">
                <h3>📊 21天计划</h3>
                <p>个性化能量提升方案，每日任务跟踪和进度管理</p>
            </div>
        </div>
        
        <div class="cta">
            <a href="https://github.com/acutherapy/energy-vision" class="cta-button primary" target="_blank">
                🚀 查看源码
            </a>
            <a href="https://github.com/acutherapy/energy-vision/issues" class="cta-button secondary" target="_blank">
                📝 反馈问题
            </a>
        </div>
        
        <div class="status">
            <p>✨ 应用功能正在完善中，即将推出完整版本</p>
            <p>📧 如需测试完整功能，请联系开发团队</p>
        </div>
        
        <div class="github-link">
            <a href="https://github.com/acutherapy/energy-vision" target="_blank">
                🔗 GitHub: acutherapy/energy-vision
            </a>
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
        
        // 打开GitHub
        function openGitHub() {
            window.open('https://github.com/acutherapy/energy-vision', '_blank');
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

echo "✅ 简化版本创建成功！"
echo "📁 输出目录: dist/"
ls -la dist/
