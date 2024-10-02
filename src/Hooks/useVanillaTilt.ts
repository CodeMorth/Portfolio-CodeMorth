import { useEffect, useRef } from 'react'
import VanillaTilt from 'vanilla-tilt' // Importing VanillaTilt library for tilt effect

interface TiltHTMLElement extends HTMLDivElement {
  vanillaTilt: VanillaTilt
}

// Custom hook to apply VanillaTilt effect to a referenced element
export const useVanillaTilt = (options = {}) => {
  const tiltRef = useRef<TiltHTMLElement>(null) // Creating a ref to hold the HTML element

  useEffect(() => {
    const { current } = tiltRef // Destructuring to get the current element from the ref

    if (current) {
      // Initialize VanillaTilt only if the element is present
      const tilt: any = VanillaTilt.init(current, options) // Initializing VanillaTilt with provided options
      
      // Store the instance in the vanillaTilt property of the element
      current.vanillaTilt = tilt

      // Cleanup function to destroy the tilt instance when the component unmounts
      return () => {
        if (current?.vanillaTilt) {
          current.vanillaTilt.destroy() // Destroy the VanillaTilt instance
        }
      }
    }
  }, [options]) // Dependency array: re-run effect if options change

  return tiltRef
}
