"use client"

import { useEffect, useState } from "react"
import { useSwipeable } from "react-swipeable"

const colors = ["#78B383", "#7B0202", "#F6A42B", "#DA1A11", "#1E283A"]

const welcomeMessage = `Welcome to Creative Surplus. Use these prompts when with others.
Nitzan`

interface WelcomeScreenProps {
  onDismiss: () => void
}

export function WelcomeScreen({ onDismiss }: WelcomeScreenProps) {
  const [backgroundColor, setBackgroundColor] = useState(colors[0])
  const [typedText, setTypedText] = useState("")
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    setBackgroundColor(randomColor)

    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex < welcomeMessage.length) {
        setTypedText(welcomeMessage.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(typingInterval)
        setIsTypingComplete(true)

        // Hold for 2 seconds before starting to fade
        setTimeout(() => {
          setIsFading(true)
          // Wait for 1 second of fading before dismissing
          setTimeout(onDismiss, 1000)
        }, 2000)
      }
    }, 50) // Adjust typing speed here

    return () => clearInterval(typingInterval)
  }, [onDismiss])

  const handlers = useSwipeable({
    onSwiped: onDismiss,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  })

  return (
    <div
      {...handlers}
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-1000 ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
      style={{ backgroundColor }}
    >
      <div className="w-full max-w-4xl p-8 text-center text-white">
        <pre className="whitespace-pre-wrap font-sans text-2xl md:text-3xl lg:text-4xl">{typedText}</pre>
      </div>
    </div>
  )
}
