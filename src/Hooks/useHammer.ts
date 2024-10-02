'use client'
import { useEffect, useRef } from 'react'

// Custom hook to manage Hammer.js gestures on a specified element
export const useHammer = (
  elementRef: React.RefObject<HTMLElement>, // Reference to the HTML element where gestures will be applied
  gestures: { [key: string]: (event: any) => void } // Object containing gesture types and their corresponding callback functions
) => {
  const hammerInstance = useRef<HammerManager | null>(null) // Ref to hold the Hammer.js instance

  useEffect(() => {
    const element = elementRef.current // Get the current DOM element from the ref

    // Check if we are on the client side and if the element exists
    if (typeof window === 'undefined' || !element) return

    // Dynamically import Hammer.js only on the client side
    import('hammerjs').then((Hammer) => {
      // Create a new Hammer instance for the specified element
      hammerInstance.current = new Hammer.default(element)

      // Bind the gestures with their corresponding callback functions
      Object.keys(gestures).forEach((gesture) => {
        hammerInstance.current?.on(gesture, gestures[gesture]) // Attach the event handler for each gesture
      })
    })

    // Cleanup: Destroy the Hammer instance when the component unmounts
    return () => {
      hammerInstance.current?.destroy() // Remove all gesture listeners and clean up the instance
    }
  }, [elementRef, gestures]) // Dependencies: re-run effect if elementRef or gestures change
}
