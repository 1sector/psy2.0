"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"

interface Question {
  id: string
  question: string
  type: 'multiple_choice' | 'scale' | 'open_ended'
  options?: { text: string; value: number }[]
  scaleRange?: { min: number; max: number; step: number }
}

interface Test {
  id: string
  title: string
  description: string
  questions: Question[]
  timeLimit: number
}

export default function TestPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [test, setTest] = useState<Test | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [timeLeft, setTimeLeft] = useState<number | null>(null)

  useEffect(() => {
    fetch(`/api/tests/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setTest(data)
        setTimeLeft(data.timeLimit * 60)
      })
  }, [params.id])

  useEffect(() => {
    if (!timeLeft) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === 1) {
          submitTest()
          return 0
        }
        return prev ? prev - 1 : 0
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  const submitTest = async () => {
    try {
      await fetch('/api/test-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testId: params.id,
          answers
        })
      })
      router.push(`/tests/${params.id}/results`)
    } catch (error) {
      console.error('Error submitting test:', error)
    }
  }

  if (!test) return <div>Loading...</div>

  const question = test.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / test.questions.length) * 100

  const renderQuestion = () => {
    switch (question.type) {
      case 'multiple_choice':
        return (
          <RadioGroup
            value={answers[question.id]}
            onValueChange={(value) => 
              setAnswers(prev => ({ ...prev, [question.id]: value }))
            }
          >
            {question.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value.toString()} id={option.value.toString()} />
                <Label htmlFor={option.value.toString()}>{option.text}</Label>
              </div>
            ))}
          </RadioGroup>
        )

      case 'scale':
        return (
          <Slider
            value={[answers[question.id] || question.scaleRange?.min || 0]}
            min={question.scaleRange?.min}
            max={question.scaleRange?.max}
            step={question.scaleRange?.step}
            onValueChange={(value) => 
              setAnswers(prev => ({ ...prev, [question.id]: value[0] }))
            }
          />
        )

      case 'open_ended':
        return (
          <Textarea
            value={answers[question.id] || ''}
            onChange={(e) => 
              setAnswers(prev => ({ ...prev, [question.id]: e.target.value }))
            }
            placeholder="Type your answer here..."
            className="min-h-[100px]"
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center mb-4">
              <CardTitle>{test.title}</CardTitle>
              <div className="text-muted-foreground">
                Time left: {Math.floor(timeLeft! / 60)}:{(timeLeft! % 60).toString().padStart(2, '0')}
              </div>
            </div>
            <Progress value={progress} className="mb-4" />
            <CardDescription>
              Question {currentQuestion + 1} of {test.questions.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <h3 className="text-lg font-medium">{question.question}</h3>
              {renderQuestion()}
              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestion(prev => prev - 1)}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </Button>
                <Button
                  onClick={() => {
                    if (currentQuestion === test.questions.length - 1) {
                      submitTest()
                    } else {
                      setCurrentQuestion(prev => prev + 1)
                    }
                  }}
                >
                  {currentQuestion === test.questions.length - 1 ? 'Submit' : 'Next'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}