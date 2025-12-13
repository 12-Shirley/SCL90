"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Clock, Shield, Heart } from "lucide-react"

interface WelcomeScreenProps {
  onStart: () => void
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Brain className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground text-balance">SCL-90 心理健康自评量表</h1>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto text-pretty">
            这是一份专业的心理健康自评工具，帮助您了解自己近期的心理状态
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className="border-0 shadow-sm bg-card">
            <CardContent className="p-6 text-center space-y-3">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent">
                <Clock className="w-5 h-5 text-accent-foreground" />
              </div>
              <h3 className="font-semibold text-card-foreground">约15-20分钟</h3>
              <p className="text-sm text-muted-foreground">共90道题目，请耐心完成</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-card">
            <CardContent className="p-6 text-center space-y-3">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent">
                <Shield className="w-5 h-5 text-accent-foreground" />
              </div>
              <h3 className="font-semibold text-card-foreground">完全保密</h3>
              <p className="text-sm text-muted-foreground">您的回答不会被记录或分享</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-card">
            <CardContent className="p-6 text-center space-y-3">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent">
                <Heart className="w-5 h-5 text-accent-foreground" />
              </div>
              <h3 className="font-semibold text-card-foreground">专业可靠</h3>
              <p className="text-sm text-muted-foreground">广泛应用于临床心理评估</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-sm bg-secondary/50">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold text-foreground">测评说明</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">1.</span>
                请根据您<strong className="text-foreground">最近一周</strong>的实际感受作答
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">2.</span>
                每道题都有5个选项，从"没有"到"严重"
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">3.</span>
                请如实回答，不要遗漏任何问题
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">4.</span>
                答案没有对错之分，请选择最符合您情况的选项
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button size="lg" onClick={onStart} className="px-12 py-6 text-lg font-semibold">
            开始测评
          </Button>
          <p className="text-xs text-muted-foreground mt-4">本测评结果仅供参考，如有心理困扰请及时寻求专业帮助</p>
        </div>
      </div>
    </div>
  )
}
