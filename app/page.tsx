"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useSwipeable } from "react-swipeable"
import { toast } from "sonner"
import { WelcomeScreen } from "@/components/WelcomeScreen"

const lastUpdated = "Last updated: May 6, 2025"

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

const colors = ["#78B383", "#7B0202", "#F6A42B", "#DA1A11", "#1E283A"]

export default function PromptCards() {
  const [shuffledPrompts, setShuffledPrompts] = useState<string[]>([])
  const [shuffledColors, setShuffledColors] = useState<string[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLandscape, setIsLandscape] = useState(true)
  const [showWelcome, setShowWelcome] = useState(true)

  useEffect(() => {
    const shuffledPrompts = [...prompts].sort(() => Math.random() - 0.5)
    setShuffledPrompts(shuffledPrompts)
    setShuffledColors([...colors].sort(() => Math.random() - 0.5))

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

  const handleShare = async () => {
    const text = shuffledPrompts[currentIndex]
    const shareData = {
      title: "Creative Surplus",
      text: text,
      url: window.location.href,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        await navigator.clipboard.writeText(`${text}\n\n${window.location.href}`)
        toast.success("Copied to clipboard!")
      }
    } catch (error) {
      toast.error("Failed to share")
      console.error("Error sharing:", error)
    }
  }

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrevious,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  })

  if (shuffledPrompts.length === 0 || shuffledColors.length === 0) return null

  const currentColor = shuffledColors[currentIndex % shuffledColors.length]

  return (
    <>
      <div
        className="fixed inset-0 w-full h-full flex items-center justify-center transition-all duration-500"
        style={{ backgroundColor: currentColor }}
        {...handlers}
      >
        <Button
          onClick={handlePrevious}
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white h-12 w-12 hidden sm:flex"
          aria-label="Previous prompt"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="w-full h-full flex flex-col justify-between items-center px-4 sm:px-16 py-8">
          <div className="flex-grow flex items-center justify-center">
            <Card className="bg-transparent border-0 text-white">
              <CardContent className="p-6 flex flex-col items-center justify-center">
                <p
                  className={`font-semibold text-center px-4 relative z-10 max-w-3xl [text-wrap:balance] ${
                    isLandscape
                      ? "text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
                      : "text-xl sm:text-2xl md:text-3xl lg:text-4xl"
                  }`}
                >
                  {shuffledPrompts[currentIndex]}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col items-center gap-2 text-sm text-white">
            <Button
              variant="outline"
              onClick={handleShare}
              className="px-4 py-2 rounded-full text-sm border border-white/20 hover:bg-white/10"
            >
              share
            </Button>
            <div className="flex items-center gap-2">
              <a href="https://nitzan.link/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                Nitzan
              </a>
              ,{" "}
              <a href="https://in-process.net/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                In Process
              </a>
              {" | "}
              <a
                href="https://in-process.net/prompt-workshop"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Prompt Workshop
              </a>
            </div>
            <div className="text-xs opacity-70 whitespace-nowrap">{lastUpdated}</div>
          </div>
        </div>

        <Button
          onClick={handleNext}
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white h-12 w-12 hidden sm:flex"
          aria-label="Next prompt"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      {showWelcome && <WelcomeScreen onDismiss={() => setShowWelcome(false)} />}
    </>
  )
}
