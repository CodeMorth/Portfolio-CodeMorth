import { useState, useEffect } from 'react'

export const useMousePosition = () => {
  const [mousePositionData, setmousePositionData] = useState<{
    x: number
    y: number
  }>({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setmousePositionData({ x: event.clientX, y: event.clientY })
    }

    // Agregar el listener del evento
    window.addEventListener('mousemove', handleMouseMove)

    // Limpiar el listener al desmontar el componente
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const { x, y } = mousePositionData

  return { x, y }
}
