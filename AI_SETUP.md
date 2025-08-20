# AI 配置指南

## OpenAI API 配置

### 1. 获取 OpenAI API Key

1. 访问 [OpenAI Platform](https://platform.openai.com/)
2. 注册或登录账户
3. 进入 API Keys 页面
4. 点击 "Create new secret key"
5. 复制生成的 API Key

### 2. 配置环境变量

在项目根目录创建 `.env.local` 文件，添加以下配置：

```bash
# OpenAI API 配置
EXPO_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
```

### 3. 功能说明

#### AI 图像分析
- 使用 GPT-4 Vision 模型分析面部图像
- 评估生命力、平衡性、和谐度、清晰度四个维度
- 生成个性化建议和洞察

#### 个性化建议生成
- 基于用户类型和时间段生成建议
- 提供具体可执行的改善方案
- 考虑用户的生活习惯和偏好

### 4. 安全注意事项

⚠️ **重要提醒**：
- 在生产环境中，不应该在前端直接使用 OpenAI API
- 建议通过后端 API 代理 OpenAI 请求
- 确保 API Key 的安全性

### 5. 成本控制

- GPT-4 Vision 模型按使用量计费
- 建议设置使用限制和监控
- 可以考虑使用 GPT-3.5-turbo 降低成本

### 6. 故障排除

如果 AI 分析失败：
1. 检查 API Key 是否正确
2. 确认网络连接正常
3. 检查 OpenAI 账户余额
4. 查看控制台错误信息

### 7. 开发模式

在开发阶段，如果 AI 分析不可用，系统会自动回退到本地分析模式，确保应用正常运行。
