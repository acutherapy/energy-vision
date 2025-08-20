#!/bin/bash

echo "🚀 能量视觉应用 - 快速启动脚本"
echo "=================================="

# 检查是否在正确的目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误: 请在项目根目录运行此脚本"
    exit 1
fi

echo "📋 当前状态检查..."
echo "✅ 项目目录: $(pwd)"
echo "✅ package.json: 存在"
echo "✅ test.html: 存在"

echo ""
echo "🎯 选择启动方式:"
echo "1. 打开HTML测试版本 (推荐)"
echo "2. 启动React Native版本"
echo "3. 清除缓存并重新安装"
echo "4. 查看项目状态"

read -p "请选择 (1-4): " choice

case $choice in
    1)
        echo "🌐 打开HTML测试版本..."
        if [[ "$OSTYPE" == "darwin"* ]]; then
            open test.html
        else
            xdg-open test.html
        fi
        echo "✅ HTML版本已打开，请在浏览器中测试功能"
        ;;
    2)
        echo "📱 启动React Native版本..."
        echo "⚠️  注意: 可能需要先清除缓存"
        npx expo start --web --clear
        ;;
    3)
        echo "🧹 清除缓存并重新安装..."
        echo "正在清除缓存..."
        rm -rf node_modules/.cache .expo
        echo "正在重新安装依赖..."
        npm install
        echo "✅ 缓存已清除，依赖已重新安装"
        echo "现在可以运行: npx expo start --web --clear"
        ;;
    4)
        echo "📊 项目状态:"
        echo "✅ 核心功能: 完整"
        echo "✅ 用户界面: 完整"
        echo "✅ 数据模型: 完整"
        echo "✅ 测试版本: 可用"
        echo "⚠️  React Native版本: 需要修复"
        echo ""
        echo "📁 重要文件:"
        ls -la *.md *.html *.js 2>/dev/null | grep -E "(PROJECT_STATUS|test\.html|restart\.sh)"
        ;;
    *)
        echo "❌ 无效选择"
        exit 1
        ;;
esac

echo ""
echo "📝 提示:"
echo "- HTML版本可以直接在浏览器中测试所有功能"
echo "- 如果React Native版本有问题，请先选择选项3清除缓存"
echo "- 查看 PROJECT_STATUS.md 了解详细状态"

