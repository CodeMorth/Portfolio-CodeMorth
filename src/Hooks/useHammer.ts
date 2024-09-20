import { useEffect, useRef } from 'react'
import Hammer from 'hammerjs'

// Definimos los tipos para TypeScript
type HammerListeners = {
  [key: string]: (event: HammerInput) => void // Aseguramos que las claves son string
}

// Hook personalizado para usar Hammer.js
export const useHammer = (
  elementRef: React.RefObject<HTMLElement>,
  gestures: HammerListeners
) => {
  const hammerInstance = useRef<HammerManager | null>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Crear una instancia de Hammer solo si aún no existe
    hammerInstance.current = new Hammer(element)

    // Vincular los gestos con sus callbacks
    Object.keys(gestures).forEach((gesture) => {
      hammerInstance.current?.on(gesture as string, gestures[gesture]) // Ajustamos el tipo de 'gesture' a 'string'
    })

    // Cleanup: Destruir instancia de Hammer cuando el componente se desmonta
    return () => {
      hammerInstance.current?.destroy()
    }
  }, [elementRef, gestures])
}
