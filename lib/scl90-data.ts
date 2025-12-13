export interface Question {
  id: number
  text: string
  factor: string
}

export interface Factor {
  name: string
  code: string
  description: string
  questionIds: number[]
}

export const factors: Factor[] = [
  {
    name: "躯体化",
    code: "SOM",
    description: "反映身体不适感,包括心血管、胃肠道、呼吸和其他系统的主诉不适",
    questionIds: [1, 4, 12, 27, 40, 42, 48, 49, 52, 53, 56, 58],
  },
  {
    name: "强迫症状",
    code: "O-C",
    description: "反映临床上的强迫症状群,包括某些明知没有必要但又无法摆脱的思想、冲动和行为",
    questionIds: [3, 9, 10, 28, 38, 45, 46, 51, 55, 65],
  },
  {
    name: "人际关系敏感",
    code: "I-S",
    description: "反映某些个人不自在与自卑感,尤其是在与他人相比较时更为突出",
    questionIds: [6, 21, 34, 36, 37, 41, 61, 69, 73],
  },
  {
    name: "抑郁",
    code: "DEP",
    description: "反映与临床上抑郁症状群相联系的广泛概念,包括苦闷、对生活兴趣减退、缺乏动力和活力、失望和悲观等",
    questionIds: [5, 14, 15, 20, 22, 26, 29, 30, 31, 32, 54, 71, 79],
  },
  {
    name: "焦虑",
    code: "ANX",
    description: "反映临床上常见的焦虑症状,包括坐立不安、神经过敏、紧张以及恐惧等",
    questionIds: [2, 17, 23, 33, 39, 57, 72, 78, 80, 86],
  },
  {
    name: "敌对",
    code: "HOS",
    description: "反映敌对的思想、感情及行为,包括厌烦、摔物、争论、直至不可控制的脾气暴发等",
    questionIds: [11, 24, 63, 67, 74, 81],
  },
  {
    name: "恐怖",
    code: "PHOB",
    description: "反映恐惧的对象包括社交恐惧、广场恐惧症和一些特殊事物的恐惧",
    questionIds: [13, 25, 47, 50, 70, 75, 82],
  },
  {
    name: "偏执",
    code: "PAR",
    description: "反映偏执性思维的症状,如多疑、关系妄想、敌对投射等",
    questionIds: [8, 18, 43, 68, 76, 83],
  },
  {
    name: "精神病性",
    code: "PSY",
    description: "反映精神病性症状的项目,包括思维播散、被控制感、思维被插入等",
    questionIds: [7, 16, 35, 62, 77, 84, 85, 87, 88, 90],
  },
  {
    name: "其他",
    code: "ADD",
    description: "包含饮食和睡眠问题等附加项目",
    questionIds: [19, 44, 59, 60, 64, 66, 89],
  },
]

export const questions: Question[] = [
  { id: 1, text: "头痛", factor: "SOM" },
  { id: 2, text: "神经过敏,心中不踏实", factor: "ANX" },
  { id: 3, text: "头脑中有不必要的想法或字句盘旋", factor: "O-C" },
  { id: 4, text: "头昏或昏倒", factor: "SOM" },
  { id: 5, text: "对异性的兴趣减退", factor: "DEP" },
  { id: 6, text: "对旁人责备求全", factor: "I-S" },
  { id: 7, text: "感到别人能控制您的思想", factor: "PSY" },
  { id: 8, text: "责怪别人制造麻烦", factor: "PAR" },
  { id: 9, text: "忘记性大", factor: "O-C" },
  { id: 10, text: "担心自己的衣饰整齐及仪态的端正", factor: "O-C" },
  { id: 11, text: "容易烦恼和激动", factor: "HOS" },
  { id: 12, text: "胸痛", factor: "SOM" },
  { id: 13, text: "害怕空旷的场所或街道", factor: "PHOB" },
  { id: 14, text: "感到自己的精力下降,活动减慢", factor: "DEP" },
  { id: 15, text: "想结束自己的生命", factor: "DEP" },
  { id: 16, text: "听到旁人听不到的声音", factor: "PSY" },
  { id: 17, text: "发抖", factor: "ANX" },
  { id: 18, text: "感到大多数人都不可信任", factor: "PAR" },
  { id: 19, text: "胃口不好", factor: "ADD" },
  { id: 20, text: "容易哭泣", factor: "DEP" },
  { id: 21, text: "同异性相处时感到害羞不自在", factor: "I-S" },
  { id: 22, text: "感到受骗,中了圈套或有人想抓住您", factor: "DEP" },
  { id: 23, text: "无缘无故地突然感到害怕", factor: "ANX" },
  { id: 24, text: "自己不能控制地大发脾气", factor: "HOS" },
  { id: 25, text: "怕单独出门", factor: "PHOB" },
  { id: 26, text: "经常责怪自己", factor: "DEP" },
  { id: 27, text: "腰痛", factor: "SOM" },
  { id: 28, text: "感到难以完成任务", factor: "O-C" },
  { id: 29, text: "感到孤独", factor: "DEP" },
  { id: 30, text: "感到苦闷", factor: "DEP" },
  { id: 31, text: "过分担忧", factor: "DEP" },
  { id: 32, text: "对事物不感兴趣", factor: "DEP" },
  { id: 33, text: "感到害怕", factor: "ANX" },
  { id: 34, text: "您的感情容易受到伤害", factor: "I-S" },
  { id: 35, text: "旁人能知道您的私下想法", factor: "PSY" },
  { id: 36, text: "感到别人不理解您、不同情您", factor: "I-S" },
  { id: 37, text: "感到人们对您不友好,不喜欢您", factor: "I-S" },
  { id: 38, text: "做事必须做得很慢以保证做得正确", factor: "O-C" },
  { id: 39, text: "心跳得很厉害", factor: "ANX" },
  { id: 40, text: "恶心或胃部不舒服", factor: "SOM" },
  { id: 41, text: "感到比不上他人", factor: "I-S" },
  { id: 42, text: "肌肉酸痛", factor: "SOM" },
  { id: 43, text: "感到有人在监视您、谈论您", factor: "PAR" },
  { id: 44, text: "难以入睡", factor: "ADD" },
  { id: 45, text: "做事必须反复检查", factor: "O-C" },
  { id: 46, text: "难以做出决定", factor: "O-C" },
  { id: 47, text: "怕乘电车、公共汽车、地铁或火车", factor: "PHOB" },
  { id: 48, text: "呼吸有困难", factor: "SOM" },
  { id: 49, text: "一阵阵发冷或发热", factor: "SOM" },
  { id: 50, text: "因为感到害怕而避开某些东西、场合或活动", factor: "PHOB" },
  { id: 51, text: "脑子变空了", factor: "O-C" },
  { id: 52, text: "身体发麻或刺痛", factor: "SOM" },
  { id: 53, text: "喉咙有梗塞感", factor: "SOM" },
  { id: 54, text: "感到前途没有希望", factor: "DEP" },
  { id: 55, text: "不能集中注意力", factor: "O-C" },
  { id: 56, text: "感到身体的某一部分软弱无力", factor: "SOM" },
  { id: 57, text: "感到紧张或容易紧张", factor: "ANX" },
  { id: 58, text: "感到手或脚发重", factor: "SOM" },
  { id: 59, text: "想到死亡的事", factor: "ADD" },
  { id: 60, text: "吃得太多", factor: "ADD" },
  { id: 61, text: "当别人看着您或谈论您时感到不自在", factor: "I-S" },
  { id: 62, text: "有一些不属于您自己的想法", factor: "PSY" },
  { id: 63, text: "有想打人或伤害他人的冲动", factor: "HOS" },
  { id: 64, text: "醒得太早", factor: "ADD" },
  { id: 65, text: "必须反复洗手、点数目或触摸某些东西", factor: "O-C" },
  { id: 66, text: "睡得不稳不深", factor: "ADD" },
  { id: 67, text: "有想摔坏或破坏东西的冲动", factor: "HOS" },
  { id: 68, text: "有一些别人没有的想法或念头", factor: "PAR" },
  { id: 69, text: "感到对别人神经过敏", factor: "I-S" },
  { id: 70, text: "在商店或电影院等人多的地方感到不自在", factor: "PHOB" },
  { id: 71, text: "感到任何事情都很困难", factor: "DEP" },
  { id: 72, text: "一阵阵恐惧或惊恐", factor: "ANX" },
  { id: 73, text: "感到在公共场合吃东西很不舒服", factor: "I-S" },
  { id: 74, text: "经常与人争论", factor: "HOS" },
  { id: 75, text: "单独一人时神经很紧张", factor: "PHOB" },
  { id: 76, text: "别人对您的成绩没有作出恰当的评价", factor: "PAR" },
  { id: 77, text: "即使和别人在一起也感到孤单", factor: "PSY" },
  { id: 78, text: "感到坐立不安心神不宁", factor: "ANX" },
  { id: 79, text: "感到自己没有什么价值", factor: "DEP" },
  { id: 80, text: "感到熟悉的东西变成陌生或不像是真的", factor: "ANX" },
  { id: 81, text: "大叫或摔东西", factor: "HOS" },
  { id: 82, text: "害怕会在公共场合晕倒", factor: "PHOB" },
  { id: 83, text: "感到别人想占您的便宜", factor: "PAR" },
  { id: 84, text: "为一些有关性的想法而很苦恼", factor: "PSY" },
  { id: 85, text: "您认为应该因为自己的过错而受到惩罚", factor: "PSY" },
  { id: 86, text: "感到要很快把事情做完", factor: "ANX" },
  { id: 87, text: "感到自己的身体有严重问题", factor: "PSY" },
  { id: 88, text: "从未感到和其他人很亲近", factor: "PSY" },
  { id: 89, text: "感到自己有罪", factor: "ADD" },
  { id: 90, text: "感到自己脑子有毛病", factor: "PSY" },
]

export const scoreLabels = [
  { value: 1, label: "没有", description: "从无该症状" },
  { value: 2, label: "很轻", description: "偶尔有该症状" },
  { value: 3, label: "中等", description: "有时有该症状" },
  { value: 4, label: "偏重", description: "经常有该症状" },
  { value: 5, label: "严重", description: "几乎总是有该症状" },
]

export interface TestResult {
  totalScore: number
  averageScore: number
  positiveItems: number
  positiveAverage: number
  factorScores: {
    factor: Factor
    score: number
    average: number
    level: "正常" | "轻度" | "中度" | "重度"
  }[]
}

export function calculateResult(answers: Record<number, number>): TestResult {
  const answeredQuestions = Object.values(answers)
  const totalScore = answeredQuestions.reduce((sum, score) => sum + score, 0)
  const averageScore = totalScore / 90

  const positiveItems = answeredQuestions.filter((score) => score >= 2).length
  const positiveSum = answeredQuestions.filter((score) => score >= 2).reduce((sum, score) => sum + score, 0)
  const positiveAverage = positiveItems > 0 ? positiveSum / positiveItems : 0

  const factorScores = factors.map((factor) => {
    const factorAnswers = factor.questionIds.map((id) => answers[id] || 1)
    const factorSum = factorAnswers.reduce((sum, score) => sum + score, 0)
    const factorAverage = factorSum / factor.questionIds.length

    let level: "正常" | "轻度" | "中度" | "重度" = "正常"
    if (factorAverage >= 3) level = "重度"
    else if (factorAverage >= 2.5) level = "中度"
    else if (factorAverage >= 2) level = "轻度"

    return {
      factor,
      score: factorSum,
      average: factorAverage,
      level,
    }
  })

  return {
    totalScore,
    averageScore,
    positiveItems,
    positiveAverage,
    factorScores,
  }
}
