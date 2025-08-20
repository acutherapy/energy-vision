#!/bin/bash

echo "🚀 Energy Vision App 项目设置脚本"
echo "=================================="

# 检查Node.js版本
echo "📋 检查Node.js版本..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js未安装，请先安装Node.js 18+"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js版本过低，需要18+，当前版本: $(node -v)"
    exit 1
fi

echo "✅ Node.js版本: $(node -v)"

# 检查Expo CLI
echo "📋 检查Expo CLI..."
if ! command -v expo &> /dev/null; then
    echo "📦 安装Expo CLI..."
    npm install -g @expo/cli
fi

echo "✅ Expo CLI已安装"

# 安装依赖
echo "📦 安装项目依赖..."
npm install

# 创建环境变量文件
if [ ! -f .env.local ]; then
    echo "📝 创建环境变量文件..."
    cp env.example .env.local
    echo "⚠️  请编辑 .env.local 文件，配置Firebase项目信息"
fi

# 创建assets目录
if [ ! -d assets ]; then
    echo "📁 创建assets目录..."
    mkdir assets
    echo "⚠️  请在assets目录中添加应用图标和启动画面"
fi

echo ""
echo "🎉 项目设置完成！"
echo ""
echo "下一步："
echo "1. 编辑 .env.local 文件，配置Firebase项目"
echo "2. 在assets目录添加应用图标和启动画面"
echo "3. 运行 'npm start' 启动开发服务器"
echo ""
echo "📚 更多信息请查看 README.md"
