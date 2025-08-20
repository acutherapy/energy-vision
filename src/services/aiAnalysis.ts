import OpenAI from 'openai';
import { EnergyFeatures } from '@/types';

// 初始化OpenAI客户端
const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY || 'demo-key',
  dangerouslyAllowBrowser: true, // 注意：在生产环境中应该使用后端API
});

// 检查API密钥是否有效
function checkApiKey(): boolean {
  const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
  if (!apiKey || apiKey === 'demo-key' || apiKey === 'your_openai_api_key_here') {
    console.warn('OpenAI API密钥未配置或使用默认值');
    return false;
  }
  return true;
}

export interface AIEnergyAnalysis {
  score: number;
  level: 'low' | 'medium' | 'high' | 'excellent';
  features: {
    vitality: number;
    balance: number;
    harmony: number;
    clarity: number;
  };
  insights: string[];
  recommendations: string[];
  aura: {
    color: string;
    intensity: number;
    pattern: string;
  };
  colorAnalysis?: {
    seasonType: string;
    recommendedColors: string[];
    makeupColors: string[];
  };
  fiveElements?: {
    dominantElement: string;
    balanceStatus: string;
    adjustmentAdvice: string;
  };
}

/**
 * 使用ChatGPT分析图像能量
 */
export async function analyzeImageWithAI(
  imageBase64: string,
  userProfile?: any
): Promise<AIEnergyAnalysis> {
  // 检查API密钥
  if (!checkApiKey()) {
    throw new Error('OpenAI API密钥未配置，请在.env.local中设置EXPO_PUBLIC_OPENAI_API_KEY');
  }
  
  try {
    const systemPrompt = `你是一位专业的人体色彩形象设计师和传统中医五行人格分析师，拥有深厚的色彩心理学和中医五行理论功底。

请结合用户的原图照片和DALL-E生成的能量光环图像，进行专业的色彩形象分析和五行人格解读。

**分析要求**：

1. **色彩形象分析**：
   - 面部肤色与能量光环的色彩搭配和谐度
   - 个人色彩季型判断（春季型、夏季型、秋季型、冬季型）
   - 最适合的服装色彩建议
   - 妆容色彩搭配指导

2. **中医五行人格分析**：
   - 根据面部特征判断五行属性（金木水火土）
   - 分析五行平衡状态
   - 识别主导五行和缺失五行
   - 提供五行调和建议

3. **能量光环解读**：
   - 光环色彩与五行属性的对应关系
   - 能量流动与个人气质的关联
   - 光环强度与当前身心状态的反映

**分析维度**：
- 生命力：面部活力、眼神明亮度、肤色健康度、皮肤光泽度、面部血液循环
- 平衡性：面部对称性、表情自然度、整体协调性、五官比例、面部轮廓
- 和谐度：面部肌肉放松度、情绪状态、内在平静度、皮肤质地、面部线条
- 清晰度：精神集中度、思维清晰度、目标明确度、面部表情清晰度

用户信息：${userProfile ? JSON.stringify(userProfile) : '未知用户'}

**输出格式**：
请以JSON格式返回分析结果，包含以下字段：
{
  "score": 数字(0-100),
  "level": "low|medium|high|excellent",
  "features": {
    "vitality": 数字(0-100),
    "balance": 数字(0-100),
    "harmony": 数字(0-100),
    "clarity": 数字(0-100)
  },
  "insights": ["色彩形象洞察", "五行人格洞察"],
  "recommendations": ["形象提升建议", "五行调和建议"],
  "aura": {
    "color": "颜色描述",
    "intensity": 数字(0-1),
    "pattern": "光环模式描述"
  },
  "colorAnalysis": {
    "seasonType": "春季型|夏季型|秋季型|冬季型",
    "recommendedColors": ["推荐色彩1", "推荐色彩2"],
    "makeupColors": ["妆容色彩1", "妆容色彩2"]
  },
  "fiveElements": {
    "dominantElement": "金|木|水|火|土",
    "balanceStatus": "平衡|偏盛|偏衰",
    "adjustmentAdvice": "五行调和建议"
  }
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o", // 使用最新的GPT-4o模型
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "请分析这张面部图像的能量状态，并给出详细的分析报告。"
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${imageBase64}`,
                detail: "high"
              }
            }
          ]
        }
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('AI分析返回空结果');
    }

    // 尝试解析JSON响应
    try {
      const analysis = JSON.parse(content);
      return analysis as AIEnergyAnalysis;
    } catch (parseError) {
      // 如果JSON解析失败，尝试提取数字和文本
      return extractAnalysisFromText(content);
    }

  } catch (error) {
    console.error('AI分析失败:', error);
    console.error('错误类型:', typeof error);
    console.error('错误消息:', error.message);
    console.error('错误堆栈:', error.stack);
    
    // 如果是模型弃用错误，给出具体提示
    if (error.message && error.message.includes('deprecated')) {
      throw new Error('AI模型已更新，请重新测试或联系开发团队');
    }
    
    // 如果是API密钥错误，给出具体提示
    if (error.message && error.message.includes('api_key')) {
      throw new Error('OpenAI API密钥无效，请检查配置');
    }
    
    // 如果是网络错误
    if (error.message && error.message.includes('network')) {
      throw new Error('网络连接失败，请检查网络');
    }
    
    // 如果是配额错误
    if (error.message && error.message.includes('quota')) {
      throw new Error('OpenAI API配额已用完，请稍后重试');
    }
    
    // 如果是图像分析失败，返回默认分析
    if (error.message && (error.message.includes('无法分析') || error.message.includes('deprecated') || error.message.includes('Invalid base64'))) {
      console.log('图像分析失败，使用默认分析结果');
      return getDefaultAnalysis();
    }
    
    // 其他错误
    throw new Error(`AI分析失败: ${error.message}`);
  }
}

/**
 * 从文本响应中提取分析结果
 */
function extractAnalysisFromText(text: string): AIEnergyAnalysis {
  // 提取分数
  const scoreMatch = text.match(/分数[：:]\s*(\d+)/) || text.match(/score[：:]\s*(\d+)/i);
  const score = scoreMatch ? parseInt(scoreMatch[1]) : 70;

  // 提取特征值
  const vitalityMatch = text.match(/生命力[：:]\s*(\d+)/);
  const balanceMatch = text.match(/平衡性[：:]\s*(\d+)/);
  const harmonyMatch = text.match(/和谐度[：:]\s*(\d+)/);
  const clarityMatch = text.match(/清晰度[：:]\s*(\d+)/);

  // 提取建议
  const recommendations = text.match(/建议[：:](.*?)(?=\n|$)/g)?.map(s => s.replace('建议：', '').trim()) || [];

  // 如果无法从文本中提取有效信息，使用默认分析
  if (!scoreMatch && text.includes('无法分析')) {
    return getDefaultAnalysis();
  }

  return {
    score,
    level: getLevelFromScore(score),
    features: {
      vitality: vitalityMatch ? parseInt(vitalityMatch[1]) : 70,
      balance: balanceMatch ? parseInt(balanceMatch[1]) : 70,
      harmony: harmonyMatch ? parseInt(harmonyMatch[1]) : 70,
      clarity: clarityMatch ? parseInt(clarityMatch[1]) : 70,
    },
    insights: [text.substring(0, 200) + '...'],
    recommendations: recommendations.length > 0 ? recommendations : ['建议多休息，保持良好心情'],
    aura: {
      color: getAuraColor(score),
      intensity: score / 100,
      pattern: '动态光环',
    },
  };
}

/**
 * 根据分数确定等级
 */
function getLevelFromScore(score: number): 'low' | 'medium' | 'high' | 'excellent' {
  if (score >= 80) return 'excellent';
  if (score >= 60) return 'high';
  if (score >= 40) return 'medium';
  return 'low';
}

/**
 * 根据分数确定光环颜色
 */
function getAuraColor(score: number): string {
  if (score >= 80) return '金色';
  if (score >= 60) return '绿色';
  if (score >= 40) return '蓝色';
  return '紫色';
}

/**
 * 获取默认分析结果
 */
function getDefaultAnalysis(): AIEnergyAnalysis {
  return {
    score: 70,
    level: 'high',
    features: {
      vitality: 70,
      balance: 70,
      harmony: 70,
      clarity: 70,
    },
    insights: ['能量状态良好，建议继续保持'],
    recommendations: ['多运动，保持良好作息'],
    aura: {
      color: '绿色',
      intensity: 0.7,
      pattern: '稳定光环',
    },
  };
}

/**
 * 使用ChatGPT生成个性化建议
 */
export async function generatePersonalizedAdvice(
  energyAnalysis: AIEnergyAnalysis,
  userProfile: any,
  timeOfDay: string
): Promise<string> {
  try {
    const prompt = `你是人体色彩形象设计师和传统中医五行人格分析师，请基于以下信息提供专业的Markdown格式解读和建议：

能量分析：${JSON.stringify(energyAnalysis)}
用户信息：${JSON.stringify(userProfile)}
当前时间：${timeOfDay}

请根据具体的能量分数和特征，提供个性化的分析。注意：
- 如果分数在85-100分：表示能量状态优秀，给出提升建议
- 如果分数在70-84分：表示能量状态良好，给出优化建议  
- 如果分数在50-69分：表示能量状态一般，给出改善建议
- 如果分数在30-49分：表示能量状态较低，给出恢复建议
- 如果分数在0-29分：表示能量状态很差，给出紧急调理建议

请提供500字以内的专业分析，包含以下部分：

## 色彩形象分析
- 个人色彩季型判断（基于能量状态）
- 推荐服装色彩（考虑当前能量水平）
- 妆容色彩建议（提升气色和能量）

## 五行人格分析  
- 主导五行属性（根据能量特征判断）
- 五行平衡状态（分析当前状态）
- 调和建议（针对性的五行调理）

## 能量光环解读
- 光环色彩含义（解释当前光环颜色）
- 能量流动特点（描述能量流动状态）
- 当前状态反映（分析身心状态）

## 个性化建议
- 形象提升建议（基于色彩分析）
- 身心调和方案（基于五行理论）
- 日常养护指导（具体可执行的建议）

请确保分析专业、准确，建议实用可行，总字数控制在500字以内。`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // 使用更快的GPT-4o-mini模型
      messages: [
        {
          role: "system",
          content: "你是一位专业的人体色彩形象设计师和传统中医五行人格分析师。你擅长根据能量分析数据提供个性化的色彩形象建议和五行调理方案。请确保每次分析都基于具体的数据给出不同的建议，避免重复的模板化回答。"
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.8,
    });

    const content = response.choices[0]?.message?.content;
    if (content) {
      return content;
    }

    return `## 色彩形象分析
- 个人色彩季型：根据您的肤色特征，建议进行专业色彩测试
- 推荐服装色彩：建议选择与肤色相协调的自然色调
- 妆容色彩建议：选择温和自然的妆容色彩

## 五行人格分析
- 主导五行：需要进一步分析确定
- 五行平衡状态：建议通过专业测试了解
- 调和建议：保持身心平衡，注意作息规律

## 能量光环解读
- 光环色彩含义：当前能量状态稳定
- 能量流动特点：能量流动较为顺畅
- 当前状态反映：身心状态良好

## 个性化建议
- 形象提升建议：保持良好作息，注意皮肤护理
- 身心调和方案：适当运动，保持心情愉悦
- 日常养护指导：多喝水，注意防晒，保持面部清洁`;
  } catch (error) {
    console.error('生成建议失败:', error);
    return `## 色彩形象分析
- 个人色彩季型：根据您的肤色特征，建议进行专业色彩测试
- 推荐服装色彩：建议选择与肤色相协调的自然色调
- 妆容色彩建议：选择温和自然的妆容色彩

## 五行人格分析
- 主导五行：需要进一步分析确定
- 五行平衡状态：建议通过专业测试了解
- 调和建议：保持身心平衡，注意作息规律

## 能量光环解读
- 光环色彩含义：当前能量状态稳定
- 能量流动特点：能量流动较为顺畅
- 当前状态反映：身心状态良好

## 个性化建议
- 形象提升建议：保持良好作息，注意皮肤护理
- 身心调和方案：适当运动，保持心情愉悦
- 日常养护指导：多喝水，注意防晒，保持面部清洁`;
  }
}

/**
 * 将图像转换为Base64
 */
export function imageToBase64(imageUri: string): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      console.log('开始转换图像:', imageUri);
      
      // 检查是否是data URL
      if (imageUri.startsWith('data:')) {
        const base64Data = imageUri.split(',')[1];
        console.log('已经是Base64格式');
        resolve(base64Data);
        return;
      }
      
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        try {
          const reader = new FileReader();
          reader.onloadend = function() {
            try {
              const base64 = reader.result as string;
              // 移除data:image/jpeg;base64,前缀
              const base64Data = base64.split(',')[1];
              console.log('Base64转换完成，长度:', base64Data.length);
              resolve(base64Data);
            } catch (error) {
              console.error('Base64处理失败:', error);
              reject(error);
            }
          };
          reader.onerror = (error) => {
            console.error('FileReader错误:', error);
            reject(error);
          };
          reader.readAsDataURL(xhr.response);
        } catch (error) {
          console.error('FileReader创建失败:', error);
          reject(error);
        }
      };
      xhr.onerror = (error) => {
        console.error('XHR请求失败:', error);
        reject(error);
      };
      xhr.open('GET', imageUri);
      xhr.responseType = 'blob';
      xhr.send();
    } catch (error) {
      console.error('图像转换初始化失败:', error);
      reject(error);
    }
  });
}

/**
 * 使用DALL-E生成能量光环图像
 */
export async function generateAuraImage(
  baseImageUrl: string,
  energyAnalysis: AIEnergyAnalysis,
  userProfile: any
): Promise<string> {
  // 检查API密钥
  if (!checkApiKey()) {
    throw new Error('OpenAI API密钥未配置，无法生成能量光环图像');
  }

  try {
    const prompt = `Create a mystical energy aura portrait based on this person's photo. 
    
    Energy Analysis:
    - Score: ${energyAnalysis.score}/100
    - Level: ${energyAnalysis.level}
    - Features: Vitality ${energyAnalysis.features.vitality}%, Balance ${energyAnalysis.features.balance}%, Harmony ${energyAnalysis.features.harmony}%, Clarity ${energyAnalysis.features.clarity}%
    
    User Profile: ${userProfile?.name || 'User'} (${userProfile?.energyPattern || 'balanced'})
    
    Requirements:
    - Generate a beautiful, mystical energy aura around the person's head and shoulders
    - Use multiple layers of glowing energy rings with different colors and intensities
    - Include flowing energy patterns, sparkles, and light effects
    - Make it look like a professional energy portrait
    - Style: Mystical, spiritual, ethereal, with soft glowing effects
    - Colors: Use the energy color ${energyAnalysis.aura.color} as the primary color
    - Multiple aura layers with different opacities and sizes
    - Add dynamic energy particles and light rays
    - Make it look like a real energy field around the person
    - High quality, professional photography style
    - Soft, ethereal lighting effects
    
    The result should be a beautiful, mystical energy portrait that shows the person's energy field with multiple layers of glowing aura.`;

    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: '1024x1024',
        quality: 'standard',
        style: 'natural',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`DALL-E API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data.data[0].url;
  } catch (error) {
    console.error('DALL-E generation error:', error);
    throw error;
  }
}
