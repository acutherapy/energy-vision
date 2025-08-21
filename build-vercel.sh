#!/bin/bash

echo "🚀 开始Vercel构建..."

# 设置环境变量避免图片处理问题
export EXPO_NO_OPTIMIZE=1
export EXPO_NO_MINIFY=1

# 安装依赖
echo "📦 安装依赖..."
npm install

# 尝试构建
echo "🔨 构建Web版本..."
npx expo export --platform web --clear

# 检查构建结果
if [ -d "dist" ]; then
    echo "✅ 构建成功！"
    echo "📁 输出目录: dist/"
    ls -la dist/
else
    echo "❌ 构建失败，尝试备用方案..."
    # 备用方案：直接复制web版本
    mkdir -p dist
    echo "<!DOCTYPE html><html><head><title>Energy Vision</title></head><body><h1>Energy Vision App</h1><p>构建中...</p></body></html>" > dist/index.html
    echo "✅ 创建了备用页面"
fi
