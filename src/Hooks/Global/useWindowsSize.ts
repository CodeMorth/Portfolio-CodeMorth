'use client'
import { useEffect, useState } from 'react'

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<number>(() => {
    return typeof window !== 'undefined' ? window.innerWidth : 1920
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [windowSize])

  const movile = windowSize < 768 ? true : false
  const tablet = windowSize >= 768 && windowSize < 1200 ? true : false
  const laptop = 1200 <= windowSize  ? true : false

  return { windowSize, movile, tablet, laptop }
}
