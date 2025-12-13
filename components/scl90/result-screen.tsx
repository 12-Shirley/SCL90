"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import type { TestResult } from "@/lib/scl90-data"
import { RotateCcw, AlertTriangle, CheckCircle, Info, AlertCircle } from "lucide-react"

interface ResultScreenProps {
  result: TestResult
  onRestart: () => void
}

export function ResultScreen({ result, onRestart }: ResultScreenProps) {
  const [showRestartDialog, setShowRestartDialog] = useState(false)

  const getLevelColor = (level: string) => {
    switch (level) {
      case "正常":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "轻度":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "中度":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "重度":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  const getOverallStatus = () => {
    const severeCount = result.factorScores.filter((f) => f.level === "重度").length
    const moderateCount = result.factorScores.filter((f) => f.level === "中度").length

    if (severeCount > 0 || result.averageScore >= 3.0 || result.totalScore >= 250) {
      return {
        level: "重度",
        status: "需要关注",
        icon: AlertTriangle,
        color: "text-red-600",
        bgColor: "bg-red-50",
      }
    } else if (moderateCount > 0 || result.averageScore >= 2.5 || result.totalScore >= 200) {
      return {
        level: "中度",
        status: "中度困扰",
        icon: AlertCircle,
        color: "text-orange-600",
        bgColor: "bg-orange-50",
      }
    } else if (result.averageScore >= 2.0 || result.totalScore >= 160) {
      return {
        level: "轻度",
        status: "轻度困扰",
        icon: Info,
        color: "text-amber-600",
        bgColor: "bg-amber-50",
      }
    }
    return {
      level: "正常",
      status: "心理健康",
      icon: CheckCircle,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    }
  }

  const getInterpretationText = (level: string) => {
    switch (level) {
      case "正常":
        return {
          paragraphs: [
            "请用相对从容的心态来看待这次测试结果。如果你在看到分数时下意识地想对照、分析，甚至反复确认，那都是很自然的反应。但请一定记得，无论结果如何，我们始终都在你身边。",
            "从整体情况来看，你目前的心理状态处在相对稳定、健康的范围内。这说明在最近一段时间里，你能够较好地应对生活中的烦恼或压力，没有被情绪完全拖住。SCL-90 心理健康自评量表涵盖了情绪体验、思维模式、人际关系以及身体感受等多个维度，它更像是一面温柔的镜子，帮助你看见自己当下的状态，而不是对你进行任何评判。",
            "需要特别说明的是，量表分数只是近期心理感受的投射，并不代表长期状态。即便某些项目上出现轻微波动，也不必过度解读。生活本就会有起伏，偶尔的疲惫、烦躁或低落，都是很真实、也很正常的存在。如果未来某个阶段你感到不安、迷茫或疲惫，欢迎随时回来看看，我们一直都在。",
          ],
        }
      case "轻度":
        return {
          paragraphs: [
            "请用相对从容的心态来看待这次测试结果。如果你在看到分数时下意识地想对照、分析，甚至反复确认，那都是很自然的反应。但请一定记得，无论结果如何，我们始终都在你身边。",
            "结果提示，你近期在某些方面感受到了一些压力或不适，但整体仍属于较为轻微的范围。这并不意味着你出现了严重问题，更像是生活在温柔地提醒你：最近的你，可能有点累了。SCL-90 所反映的，是你最近一段时间真实的心理体验，而不是你的性格、能力或价值。",
            "很多时候，轻微的心理困扰只是阶段性的反应，可能来自学习节奏、工作压力，或人际关系中的一些消耗。也许你已经习惯了把事情往自己身上扛，很少真正停下来关心自己的感受。如果可以，试着给自己多一点空间，哪怕只是慢慢调整作息、找一点放松的方式，或者和信任的人聊聊。你无需独自消化一切，永远相信，你的感受值得被认真对待。",
          ],
        }
      case "中度":
        return {
          paragraphs: [
            "请用相对从容的心态来看待这次测试结果。如果你在看到分数时下意识地想对照、分析，甚至反复确认，那都是很自然的反应。但请一定记得，无论结果如何，我们始终都在你身边。",
            "测试结果显示，近期你在多个心理维度上承受的压力已经较为明显，整体处在中度困扰的状态。SCL-90 呈现的是你近期真实的心理感受。当压力长期存在、情绪反复被压抑时，内心自然会通过这些方式发出信号，希望被认真对待。",
            "也许你已经尝试过调整自己，却发现效果有限；也许你一直告诉自己再坚持一下，但内心却越来越疲惫。请不要责怪自己，这并非个人的失败，而是你真的需要一点支持了。在这个阶段，进一步了解自己的心理状态，或寻求专业的心理咨询与帮助，都是非常值得的选择。请相信，你无需一个人扛下所有事情，我们愿意陪你一起慢慢走。",
          ],
        }
      case "重度":
        return {
          paragraphs: [
            "请用相对从容的心态来看待这次测试结果。如果你在看到分数时下意识地想对照、分析，甚至反复确认，那都是很自然的反应。但请一定记得，无论结果如何，我们始终都在你身边。",
            "测试结果提示，你近期可能正承受着较为沉重、持续的心理困扰。这种状态并不是突然出现的，它往往来自长期的压力、焦虑和内耗。SCL-90 所反映的，是你最近一段时间真实而强烈的心理感受。",
            "如果你发现情绪长期低落、内心痛苦难以缓解，或这些状态已经明显影响到生活，及时寻求专业的心理咨询或医疗帮助，是非常重要、也非常必要的选择。请你相信，你的感受是重要的，你本身也值得被认真、温柔地对待。",
          ],
        }
      default:
        return { paragraphs: [] }
    }
  }

  const overall = getOverallStatus()
  const OverallIcon = overall.icon
  const interpretation = getInterpretationText(overall.level)

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">测评报告</h1>
          <p className="text-muted-foreground">SCL-90 心理健康自评量表结果分析</p>
        </div>

        {/* Overall status */}
        <Card className={cn("border-0 shadow-lg", overall.bgColor)}>
          <CardContent className="p-6 flex items-start gap-4">
            <div className={cn("p-3 rounded-full", overall.bgColor)}>
              <OverallIcon className={cn("w-8 h-8", overall.color)} />
            </div>
            <div className="space-y-1">
              <h2 className={cn("text-xl font-bold", overall.color)}>{overall.status}</h2>
              <p className="text-foreground/80">{interpretation.paragraphs[0]}</p>
            </div>
          </CardContent>
        </Card>

        {/* Summary stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">{result.totalScore}</p>
              <p className="text-sm text-muted-foreground">总分</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">{result.averageScore.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">平均分</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">{result.positiveItems}</p>
              <p className="text-sm text-muted-foreground">阳性项目数</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">{result.positiveAverage.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">阳性均分</p>
            </CardContent>
          </Card>
        </div>

        {/* Factor scores */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">各因子得分详情</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {result.factorScores.map((factorResult, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-foreground">{factorResult.factor.name}</span>
                    <Badge variant="outline" className={cn("font-medium", getLevelColor(factorResult.level))}>
                      {factorResult.level}
                    </Badge>
                  </div>
                  <span className="font-mono text-sm text-muted-foreground">{factorResult.average.toFixed(2)}</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full transition-all duration-500",
                      factorResult.level === "正常" && "bg-emerald-500",
                      factorResult.level === "轻度" && "bg-amber-500",
                      factorResult.level === "中度" && "bg-orange-500",
                      factorResult.level === "重度" && "bg-red-500",
                    )}
                    style={{ width: `${Math.min((factorResult.average / 5) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">{factorResult.factor.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 结果解读 */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">结果解读</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {interpretation.paragraphs.slice(1).map((paragraph, index) => (
              <p key={index} className="text-foreground/80 leading-relaxed text-sm">
                {paragraph}
              </p>
            ))}
          </CardContent>
        </Card>

        {/* 分级标准和中国常模参考 */}
        <Card className="border-0 shadow-sm bg-secondary/30">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">测试情况分级标准</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 mt-1 shrink-0" />
                  <div>
                    <span className="font-medium">正常 (&lt;2.0)</span>
                    <p className="text-muted-foreground text-xs mt-1">症状轻微或偶尔出现</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
                  <div className="w-3 h-3 rounded-full bg-amber-500 mt-1 shrink-0" />
                  <div>
                    <span className="font-medium">轻度 (2.0-2.5)</span>
                    <p className="text-muted-foreground text-xs mt-1">症状明显但不影响日常生活</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
                  <div className="w-3 h-3 rounded-full bg-orange-500 mt-1 shrink-0" />
                  <div>
                    <span className="font-medium">中度 (2.5-3.0)</span>
                    <p className="text-muted-foreground text-xs mt-1">症状明显且对日常生活造成一定影响</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
                  <div className="w-3 h-3 rounded-full bg-red-500 mt-1 shrink-0" />
                  <div>
                    <span className="font-medium">重度 (≥3.0)</span>
                    <p className="text-muted-foreground text-xs mt-1">症状严重且明显影响日常生活</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-border/50">
              <h3 className="font-semibold text-foreground">中国常模参考</h3>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>依据中国常模参考，SCL-90量表通常结合总分与单项平均分进行综合评估。</p>
                <p>
                  一般而言，当总分超过 160 分，或部分因子单项均分高于 2
                  分时，提示近期可能存在一定程度的心理压力，建议进一步关注自身状态。若总分超过 200
                  分，说明心理困扰较为明显，可能已对情绪体验或日常功能产生影响，寻求专业心理咨询支持通常是有益的选择。当标准分达到或超过
                  250
                  分时，提示心理负担水平较高，建议在专业人员指导下进行更系统的评估，必要时配合针对性的心理干预或医学支持。
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Restart button */}
        <div className="text-center pt-4">
          <Button variant="outline" onClick={() => setShowRestartDialog(true)} className="gap-2 bg-transparent">
            <RotateCcw className="w-4 h-4" />
            重新测评
          </Button>
        </div>
      </div>

      {/* Restart confirmation dialog */}
      <Dialog open={showRestartDialog} onOpenChange={setShowRestartDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>提示</DialogTitle>
            <DialogDescription className="pt-4 space-y-4 text-foreground/80">
              <p>兑换码仅限使用一次，若需重新测试，请到小红书店铺重新购买测试。</p>
              <p>若无需重新测试，可截图保存本次测试结果。</p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-row gap-2 sm:justify-center">
            <Button variant="outline" onClick={() => setShowRestartDialog(false)}>
              返回结果
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
