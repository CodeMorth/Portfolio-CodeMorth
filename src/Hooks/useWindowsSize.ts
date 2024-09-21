'use client'
import { useEffect, useState } from 'react'

export const useWindowSize = () => {
  const [windowWidth, setWindowWidth] = useState<number>(() => {
    return typeof window !== 'undefined' ? window.innerWidth : 1920
  })

  const [windowHeight, setWindowHeight] = useState<number>(() => {
    return typeof window !== 'undefined' ? window.innerHeight : 1080
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      setWindowHeight(window.innerHeight)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const movile = windowWidth < 768
  const tablet = windowWidth >= 768 && windowWidth < 1200
  const laptop = windowWidth >= 1200

  return { windowWidth, windowHeight, movile, tablet, laptop }
}
