"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { scoreLabels } from "@/lib/scl90-data"

interface QuestionCardProps {
  questionNumber: number
  questionText: string
  totalQuestions: number
  selectedScore?: number
  onSelectScore: (score: number) => void
  onPrevious: () => void
  onNext: () => void
  canGoBack: boolean
  isLastQuestion: boolean
}

export function QuestionCard({
  questionNumber,
  questionText,
  totalQuestions,
  selectedScore,
  onSelectScore,
  onPrevious,
  onNext,
  canGoBack,
  isLastQuestion,
}: QuestionCardProps) {
  const progress = (questionNumber / totalQuestions) * 100

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-xl w-full space-y-6">
        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>
              第 {questionNumber} 题 / 共 {totalQuestions} 题
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Question card */}
        <Card className="border-0 shadow-lg bg-card">
          <CardContent className="p-8 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-bold text-lg">
                {questionNumber}
              </div>
              <h2 className="text-xl md:text-2xl font-semibold text-card-foreground text-balance">
                最近一周，您是否有以下感觉或症状：
              </h2>
              <p className="text-lg md:text-xl text-card-foreground font-medium">{questionText}</p>
            </div>

            {/* Score options */}
            <div className="grid gap-3">
              {scoreLabels.map((option) => (
                <button
                  key={option.value}
                  onClick={() => onSelectScore(option.value)}
                  className={cn(
                    "w-full p-4 rounded-xl border-2 text-left transition-all duration-200",
                    "hover:border-primary/50 hover:bg-primary/5",
                    selectedScore === option.value
                      ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                      : "border-border bg-background",
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors",
                        selectedScore === option.value
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground",
                      )}
                    >
                      {option.value}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{option.label}</p>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between gap-4">
          <Button variant="outline" onClick={onPrevious} disabled={!canGoBack} className="px-6 bg-transparent">
            上一题
          </Button>
          <Button onClick={onNext} disabled={selectedScore === undefined} className="px-6">
            {isLastQuestion ? "查看结果" : "下一题"}
          </Button>
        </div>
      </div>
    </div>
  )
}
