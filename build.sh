#!/bin/bash

echo "🚀 开始构建能量分析应用..."

# 安装依赖
echo "📦 安装依赖..."
npm install

# 构建Web版本
echo "🔨 构建Web版本..."
npx expo export --platform web

echo "✅ 构建完成！"
echo "📁 输出目录: dist/"
