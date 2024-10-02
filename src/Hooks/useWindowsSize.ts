'use client'
import { useEffect, useState } from 'react'

// Custom hook to track the window size and categorize it
export const useWindowSize = () => {
  // State variable for storing the window width
  const [windowWidth, setWindowWidth] = useState<number>(() => {
    // Initial value: set to current window width or default to 1920
    return typeof window !== 'undefined' ? window.innerWidth : 1920
  })

  // State variable for storing the window height
  const [windowHeight, setWindowHeight] = useState<number>(() => {
    // Initial value: set to current window height or default to 1080
    return typeof window !== 'undefined' ? window.innerHeight : 1080
  })

  useEffect(() => {
    // Function to handle the resize event
    const handleResize = () => {
      // Update the state variables with the new window size
      setWindowWidth(window.innerWidth)
      setWindowHeight(window.innerHeight)
    }

    // Add event listener for window resize events
    window.addEventListener('resize', handleResize)

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, []) // Empty dependency array means this effect runs once on mount

  // Determine device type based on window width
  const movile = windowWidth < 768 // Mobile if width is less than 768px
  const tablet = windowWidth >= 768 && windowWidth < 1200 // Tablet if width is between 768px and 1200px
  const laptop = windowWidth >= 1200 // Laptop if width is 1200px or greater

  // Return an object with window dimensions and device type classifications
  return { windowWidth, windowHeight, movile, tablet, laptop }
}
