export const getCircularPosition = (
  index: number, // The index of the element in the circular arrangement
  total: number, // The total number of elements
  windowWidth: number // The width of the window to determine responsive behavior
) => {
  // Radius of the circle, determined by the window width
  let radius =
    windowWidth < 768  // For mobile screens
      ? 110
      : windowWidth < 1200 // For small tablets
      ? 150
      : windowWidth < 1920 // For larger tablets and desktops
      ? 180
      : 180 // Default radius for very large screens

  const centerX = 0 // X coordinate of the circle's center
  const centerY = 0 // Y coordinate of the circle's center

  // Calculate the angle for the current index, dividing the circle into equal parts
  const angle = (index / total) * 2 * Math.PI 
  // Calculate the X position using the radius and angle
  const x = radius * Math.cos(angle) + centerX
  // Calculate the Y position using the radius and angle
  const y = radius * Math.sin(angle) + centerY

  // Return the calculated X and Y positions
  return { x, y }
}
