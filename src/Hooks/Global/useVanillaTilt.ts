import { useEffect, useRef } from 'react'
import VanillaTilt from 'vanilla-tilt'

// Extender el tipo HTMLDivElement para que incluya vanillaTilt
interface TiltHTMLElement extends HTMLDivElement {
  vanillaTilt: VanillaTilt
}

export const useVanillaTilt = (options = {}) => {
  // Cambiar el tipo de tiltRef a TiltHTMLElement
  const tiltRef = useRef<TiltHTMLElement>(null)

  useEffect(() => {
    const { current } = tiltRef
    if (current) {
      VanillaTilt.init(current, options)
    }

    // Destruir el efecto al desmontar el componente
    return () => current?.vanillaTilt?.destroy()
  }, [options])

  return tiltRef
}
