"use client"

import React, { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const prompts = [
  
  "We all need to fit in a box, but all boxes have six planes. What are the other five labels you can use for yourself?",
  "What is your reputation?",
  "What is your spirit age?",
  "When are you misunderstood?",
  "Are you an artist?",
  "When do you think about life?",
  "Do you see something no one else does?",
  "What can we wish you?",
  "Are you successful?",
  "What do you know but can't explain?",
  "Do you see something no one else does?",
  "What moves you?",
  "Who Controls your time?",
  "Who are you trying to help?",
  "When do you perform?",
  "What bores you?",
  "What do you wish you could measure?",

]

export default function PromptCards() {
  const [shuffledPrompts, setShuffledPrompts] = useState<string[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLandscape, setIsLandscape] = useState(true)

  useEffect(() => {
    setShuffledPrompts([...prompts].sort(() => Math.random() - 0.5))

    const checkOrientation = () => {
      setIsLandscape(window.innerWidth > window.innerHeight)
    }

    checkOrientation()
    window.addEventListener("resize", checkOrientation)

    return () => window.removeEventListener("resize", checkOrientation)
  }, [])

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % shuffledPrompts.length)
  }

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + shuffledPrompts.length) % shuffledPrompts.length)
  }

  if (shuffledPrompts.length === 0) return null

  return (
    <div className="fixed inset-0 w-full h-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
      {isLandscape ? (
        <Card className="w-full h-full max-w-4xl max-h-[80vh] flex flex-col justify-center">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <p className="text-4xl font-semibold text-center mb-8 flex-grow flex items-center justify-center">
              {shuffledPrompts[currentIndex]}
            </p>
            <div className="flex justify-between items-center">
              <Button onClick={handlePrevious} variant="outline" size="lg">
                <ChevronLeft className="h-6 w-6 mr-2" />
                Previous
              </Button>
              <Button onClick={handleNext} variant="outline" size="lg">
                Next
                <ChevronRight className="h-6 w-6 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="text-white text-center p-4">
          <p className="text-2xl font-bold mb-4">Please rotate your device</p>
          <p>This experience is designed for landscape view</p>
        </div>
      )}
    </div>
  )
}
