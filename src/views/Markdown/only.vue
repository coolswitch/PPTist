<template>
  <h1>依照此前模板，使用以下数据生成PPT</h1>
  <textarea v-model="mdStr" style="width: 49%; height: 400px"></textarea>
  <textarea v-model="tml" style="width: 49%; height: 400px" readonly></textarea>
  <button @click="render">将上述markdown按照模板渲染为ppt</button>
  <br />
  <br />
  <br />
  <br />
  <a-input
    id="iptUpload"
    type="file"
    accept="application/vnd.openxmlformats-officedocument.presentationml.presentation"
    @change="handleImport"
  />
  <a-button type="primary" :loading="isLoading" :disabled="isDisabled" @click="handleImport">导入</a-button>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useSlidesStore } from '@/store'
import useMD from '@/hooks/useMD'
import useImport from '@/views/Home/useImport'

const router = useRouter()
const slidesStore = useSlidesStore()
const tml = ref(JSON.stringify(slidesStore.slides, null, '    '))
const mdStr = ref(`# AIGC：人工智能生成内容的未来

## 1. 什么是AIGC？
### 1.1 定义与背景
#### 1.1.1 人工智能的定义
- 人工智能（AI）是一种模拟人类智能的技术。
- AI 涉及机器学习、深度学习和自然语言处理等技术。
- AI 已广泛应用于图像识别、语音识别等领域。

#### 1.1.2 生成内容的概念
- 生成内容指通过算法自动创建文本、图像、音频或视频。
- 传统生成内容依赖于简单的规则或模板。
- 现代生成内容更多依赖于复杂的AI模型。

#### 1.1.3 AIGC 的出现
- AIGC 是人工智能生成内容（AI Generated Content）的简称。
- 随着深度学习的发展，AIGC 得到广泛关注。
- AIGC 可用于自动化内容创建，提高效率。

### 1.2 AIGC 的关键技术
#### 1.2.1 自然语言处理（NLP）
- NLP 使计算机理解和生成自然语言文本。
- 常见的NLP任务包括机器翻译、文本摘要等。
- 预训练模型（如GPT-4）是NLP的核心。

#### 1.2.2 计算机视觉
- 计算机视觉使计算机识别和生成图像和视频。
- 卷积神经网络（CNN）是计算机视觉的基础。
- 计算机视觉在AIGC中用于生成图片和视频内容。

#### 1.2.3 深度学习与生成对抗网络（GAN）
- 深度学习是AIGC的核心技术之一。
- 生成对抗网络（GAN）通过对抗学习生成逼真内容。
- GAN 已被用于图像生成、视频生成等领域。

### 1.3 AIGC 的发展历程
#### 1.3.1 初期探索阶段
- 早期AIGC研究集中在规则和模板生成。
- 最早的AIGC系统生成简单的文本和图像。
- 技术限制使得早期AIGC应用有限。

#### 1.3.2 深度学习时代
- 深度学习的兴起带来了AIGC的飞跃。
- 生成对抗网络（GAN）等技术推动AIGC发展。
- 深度学习模型生成的内容质量显著提升。

#### 1.3.3 当前与未来
- 现代AIGC应用广泛，如自动新闻生成、智能客服等。
- 未来AIGC将更加智能化和多样化。
- AIGC技术的不断进步将带来更多创新应用。

## 2. AIGC 的应用领域
### 2.1 媒体与娱乐
#### 2.1.1 自动化内容生成
- 新闻自动化生成，提高报道效率。
- 文章自动生成，降低写作成本。
- 内容个性化推荐，提升用户体验。

#### 2.1.2 游戏与虚拟现实
- 游戏情节和对话自动生成。
- 虚拟角色和场景自动创建。
- 提高游戏开发效率和创意表达。

#### 2.1.3 视频与音频生成
- 自动生成动画和视频内容。
- 音频合成和配音自动化。
- 提高多媒体内容制作效率。

### 2.2 教育与科研
#### 2.2.1 教学内容生成
- 自动生成课件和教材。
- 智能化辅导和个性化学习。
- 提高教育资源的可及性。

#### 2.2.2 科研数据分析
- 科研报告和论文自动生成。
- 大数据分析和可视化。
- 提高科研效率和成果展示。

#### 2.2.3 模拟与仿真
- 自动生成实验和模拟环境。
- 虚拟仿真实验和培训。
- 提高科研和教育的实践性。

### 2.3 商业与服务
#### 2.3.1 市场营销与广告
- 自动生成广告文案和创意。
- 个性化营销和精准投放。
- 提高营销效果和客户满意度。

#### 2.3.2 客户服务与支持
- 智能客服机器人，自动回复用户问题。
- 客户反馈和意见分析。
- 提高客户服务效率和体验。

#### 2.3.3 产品设计与开发
- 自动生成产品设计方案。
- 设计优化和用户体验改进。
- 提高产品开发效率和创新能力。

## 3. AIGC 的挑战与未来
### 3.1 技术挑战
#### 3.1.1 模型训练与性能
- 训练大规模生成模型需要大量数据和计算资源。
- 模型性能和生成质量仍需提升。
- 如何平衡生成速度和质量是关键问题。

#### 3.1.2 内容的真实性与可信度
- 生成内容的真实性和可信度问题。
- 避免生成虚假信息和误导内容。
- 建立内容审核和验证机制。

#### 3.1.3 伦理与隐私
- AIGC带来的伦理和隐私问题。
- 防止恶意使用和滥用AIGC技术。
- 建立伦理规范和法律框架。

### 3.2 社会影响
#### 3.2.1 就业与劳动力市场
- AIGC可能导致某些职业的替代和变革。
- 新的就业机会和职业技能需求。
- 劳动力市场的结构性变化。

#### 3.2.2 文化与创意产业
- AIGC对文化和创意产业的影响。
- 创作者和AI的协作模式。
- 创意表达的多样性和创新性。

#### 3.2.3 法律与监管
- AIGC相关法律和监管框架的建立。
- 知识产权和版权保护问题。
- 法律体系如何适应AIGC的发展。

### 3.3 未来展望
#### 3.3.1 技术进步与创新
- 生成模型和算法的不断创新。
- 新的AIGC应用场景和模式。
- 技术进步带来的更多可能性。

#### 3.3.2 跨领域融合
- AIGC与其他技术的融合，如物联网、区块链等。
- 跨领域的创新应用和解决方案。
- 多技术协同带来的巨大潜力。

#### 3.3.3 社会价值与责任
- AIGC在社会中的价值和贡献。
- 技术发展的社会责任和伦理考虑。
- 构建一个更加美好的未来。


`)

const { isPopup, isDisabled, isLoading, handleImport } = useImport('#iptUpload')
watch(
  () => slidesStore.slides,
  () => {
    tml.value = JSON.stringify(slidesStore.slides, null, '    ')
  },
  { deep: true }
)

const { mdString2TransformPages, useTemplate } = useMD()

function render() {
  try {
    // const json = JSON.parse(mdStr.value)
    const pages = mdString2TransformPages(mdStr.value)
    const json = useTemplate(JSON.parse(tml.value), pages)
    console.log('fdsafdafsda', json, pages)
    if (json.length <= 0) {
      alert('没有解析到数据')
      return
    }
    slidesStore.setSlides(json)
    router.push('/preview')
  } catch (e) {
    console.error(e)
    alert('json格式化失败')
  }
}
</script>
