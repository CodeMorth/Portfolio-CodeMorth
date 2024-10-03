import { useState, useEffect } from 'react'

// Custom hook to track mouse position
export const useMousePosition = () => {
  // State to store the current mouse position, with initial values of x = 0 and y = 0
  const [mousePositionData, setMousePositionData] = useState<{
    x: number
    y: number
  }>({ x: 0, y: 0 })

  useEffect(() => {
    // Event handler function to update the state with the current mouse position
    const handleMouseMove = (event: MouseEvent) => {
      setMousePositionData({ x: event.clientX, y: event.clientY })
    }

    // Add the mousemove event listener to track the mouse movement
    window.addEventListener('mousemove', handleMouseMove)

    // Cleanup function to remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, []) // The empty dependency array ensures this effect runs only once when the component mounts

  // Destructure the x and y values from the mousePositionData state
  const { x, y } = mousePositionData

  // Return the current x and y coordinates of the mouse
  return { x, y }
}
