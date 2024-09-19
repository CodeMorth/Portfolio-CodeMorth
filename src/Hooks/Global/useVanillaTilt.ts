import { useEffect, useRef } from 'react'
import VanillaTilt from 'vanilla-tilt'

interface TiltHTMLElement extends HTMLDivElement {
  vanillaTilt: VanillaTilt
}

export const useVanillaTilt = (options = {}) => {
  const tiltRef = useRef<TiltHTMLElement>(null)

  useEffect(() => {
    const { current } = tiltRef

    if (current) {
      // Inicializa VanillaTilt solo si el elemento está presente
      const tilt:any = VanillaTilt.init(current, options)
      
      // Guardar la instancia en la propiedad vanillaTilt del elemento
      current.vanillaTilt = tilt

      // Limpia el efecto al desmontar el componente
      return () => {
        if (current?.vanillaTilt) {
          current.vanillaTilt.destroy()
        }
      }
    }
  }, [options])

  return tiltRef
}
