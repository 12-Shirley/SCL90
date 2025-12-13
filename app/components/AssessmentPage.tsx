// app/components/AssessmentPage.tsx
// SCL-90 心理健康自评量表测评页面

"use client"

import { useState, useCallback } from "react"
import { WelcomeScreen } from "@/components/scl90/welcome-screen"
import { QuestionCard } from "@/components/scl90/question-card"
import { ResultScreen } from "@/components/scl90/result-screen"
import { questions, calculateResult, type TestResult } from "@/lib/scl90-data"

type TestState = "welcome" | "testing" | "result"

export default function AssessmentPage() {
  const [state, setState] = useState<TestState>("welcome")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [result, setResult] = useState<TestResult | null>(null)

  const handleStart = useCallback(() => {
    setState("testing")
    setCurrentQuestionIndex(0)
    setAnswers({})
  }, [])

  const handleSelectScore = useCallback(
    (score: number) => {
      const questionId = questions[currentQuestionIndex].id
      setAnswers((prev) => ({ ...prev, [questionId]: score }))
    },
    [currentQuestionIndex],
  )

  const handlePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }, [currentQuestionIndex])

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      // Calculate result and show
      const testResult = calculateResult(answers)
      setResult(testResult)
      setState("result")
    }
  }, [currentQuestionIndex, answers])

  const handleRestart = useCallback(() => {
    setState("welcome")
    setCurrentQuestionIndex(0)
    setAnswers({})
    setResult(null)
  }, [])

  if (state === "welcome") {
    return <WelcomeScreen onStart={handleStart} />
  }

  if (state === "testing") {
    const currentQuestion = questions[currentQuestionIndex]
    return (
      <QuestionCard
        questionNumber={currentQuestionIndex + 1}
        questionText={currentQuestion.text}
        totalQuestions={questions.length}
        selectedScore={answers[currentQuestion.id]}
        onSelectScore={handleSelectScore}
        onPrevious={handlePrevious}
        onNext={handleNext}
        canGoBack={currentQuestionIndex > 0}
        isLastQuestion={currentQuestionIndex === questions.length - 1}
      />
    )
  }

  if (state === "result" && result) {
    return <ResultScreen result={result} onRestart={handleRestart} />
  }

  return null
}
