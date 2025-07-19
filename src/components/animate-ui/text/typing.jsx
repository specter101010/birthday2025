'use client'

import React, {
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react'
import { motion, useInView } from 'motion/react'

function CursorBlinker({ className }) {
  return (
    <motion.span
      data-slot="cursor-blinker"
      variants={{
        blinking: {
          opacity: [0, 0, 1, 1],
          transition: {
            duration: 1,
            repeat: Infinity,
            repeatDelay: 0,
            ease: 'linear',
            times: [0, 0.5, 0.5, 1],
          },
        },
      }}
      animate="blinking"
      className={`inline-block h-5 w-[1px] translate-y-1 bg-black dark:bg-white ${className || ''}`}
    />
  )
}

const TypingText = forwardRef(function TypingText(
  {
    duration = 100,
    delay = 0,
    inView = false,
    inViewMargin = '0px',
    inViewOnce = true,
    cursor = false,
    text,
    cursorClassName,
    animateOnChange = true,
    onTypingDone,
    typingSound = '/sounds/typing.mp3', // ✅ default sound path
    ...props
  },
  ref
) {
  const localRef = useRef(null)
  const audioRef = useRef(null) // ✅ audio player

  useImperativeHandle(ref, () => localRef.current)

  const inViewResult = useInView(localRef, {
    once: inViewOnce,
    margin: inViewMargin,
  })

  const isInView = !inView || inViewResult
  const [started, setStarted] = useState(false)
  const [displayedText, setDisplayedText] = useState('')

  // Reset ketika text berubah
  useEffect(() => {
    if (animateOnChange) {
      setStarted(false)
      setDisplayedText('')
    }

    if (isInView) {
      const timeoutId = setTimeout(() => setStarted(true), delay)
      return () => clearTimeout(timeoutId)
    }
  }, [isInView, delay, animateOnChange ? text : null])

  useEffect(() => {
    if (!started) return

    const timeoutIds = []
    const fullText = typeof text === 'string' ? text : (text[0] || '')
    let currentIndex = 0

    // ✅ Start typing sound
    if (audioRef.current) {
      audioRef.current.loop = true
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {})
    }

    const type = () => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.substring(0, currentIndex))
        currentIndex++

        if (currentIndex > fullText.length) {
          // ✅ Stop sound on finish
          if (audioRef.current) audioRef.current.pause()
          if (typeof onTypingDone === 'function') onTypingDone()
        } else {
          const id = setTimeout(type, duration)
          timeoutIds.push(id)
        }
      }
    }

    type()

    return () => {
      timeoutIds.forEach(clearTimeout)
      if (audioRef.current) audioRef.current.pause()
    }
  }, [text, duration, started, onTypingDone])

  return (
    <span ref={localRef} data-slot="typing-text" {...props}>
      <motion.span>{displayedText}</motion.span>
      {cursor && <CursorBlinker className={cursorClassName} />}
      <audio ref={audioRef} src={typingSound} preload="auto" />
    </span>
  )
})

export { TypingText }
