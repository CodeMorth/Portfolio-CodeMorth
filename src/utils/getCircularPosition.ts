export const getCircularPosition = (
  index: number,
  total: number,
  windowSize: number
) => {
  // El radio del círculo
  let radius = windowSize > 1200 ? 200 : 150

  const centerX = 0 // Centro del círculo en el eje X
  const centerY = 0 // Centro del círculo en el eje Y

  const angle = (index / total) * 2 * Math.PI // Divide el círculo en partes iguales
  const x = radius * Math.cos(angle) + centerX
  const y = radius * Math.sin(angle) + centerY
  return { x, y }
}
