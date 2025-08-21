#!/bin/bash

echo "🚀 开始部署能量分析应用..."

# 构建Web版本
echo "📦 构建Web版本..."
npx expo export --platform web

# 检查构建是否成功
if [ $? -eq 0 ]; then
    echo "✅ 构建成功！"
    echo "🌐 应用已准备就绪"
    echo "📱 在手机浏览器中访问: http://localhost:3000"
    echo "💻 在电脑浏览器中访问: http://localhost:3000"
else
    echo "❌ 构建失败"
    exit 1
fi
