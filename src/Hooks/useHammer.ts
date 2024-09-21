'use client'
import { useEffect, useRef } from 'react'

// Importa dinámicamente Hammer solo en el cliente
export const useHammer = (
  elementRef: React.RefObject<HTMLElement>,
  gestures: { [key: string]: (event: any) => void }
) => {
  const hammerInstance = useRef<HammerManager | null>(null)

  useEffect(() => {
    const element = elementRef.current

    // Verifica si estamos en el cliente
    if (typeof window === 'undefined' || !element) return

    // Importa dinámicamente Hammer en el lado del cliente
    import('hammerjs').then((Hammer) => {
      hammerInstance.current = new Hammer.default(element)

      // Vincular los gestos con sus callbacks
      Object.keys(gestures).forEach((gesture) => {
        hammerInstance.current?.on(gesture, gestures[gesture])
      })
    })

    // Cleanup: Destruir instancia de Hammer cuando el componente se desmonta
    return () => {
      hammerInstance.current?.destroy()
    }
  }, [elementRef, gestures])
}
