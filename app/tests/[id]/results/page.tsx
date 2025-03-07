"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft } from "lucide-react"
import Link from 'next/link'

interface TestResult {
  score: number
  maxScore: number
  feedback: string
  breakdown: {
    category: string
    score: number
    maxScore: number
  }[]
}

export default function TestResultsPage({ params }: { params: { id: string } }) {
  const [results, setResults] = useState<TestResult | null>(null)

  useEffect(() => {
    fetch(`/api/test-results/${params.id}`)
      .then(res => res.json())
      .then(setResults)
  }, [params.id])

  if (!results) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
            <CardDescription>
              Your test has been completed and analyzed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">
                  Overall Score: {Math.round((results.score / results.maxScore) * 100)}%
                </h3>
                <Progress 
                  value={(results.score / results.maxScore) * 100} 
                  className="h-4"
                />
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4">Category Breakdown</h4>
                <div className="space-y-4">
                  {results.breakdown.map((category, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span>{category.category}</span>
                        <span>{Math.round((category.score / category.maxScore) * 100)}%</span>
                      </div>
                      <Progress 
                        value={(category.score / category.maxScore) * 100}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg mt-6">
                <h4 className="font-semibold mb-2">Feedback</h4>
                <p className="text-muted-foreground">{results.feedback}</p>
              </div>

              <div className="flex justify-center mt-8">
                <Link href="/tests">
                  <Button>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Tests
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}