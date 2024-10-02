// Function to calculate tilt or rotation angles (rotateX and rotateY) based on mouse movement (deltaX, deltaY)
export const calculateRotations = (
  deltaX: number, // Difference in X-axis movement (typically from mouse position)
  deltaY: number, // Difference in Y-axis movement (typically from mouse position)
  windowWidth: number, // The width of the window, used to normalize the rotations
  movility: number, // A multiplier that defines how sensitive the tilt effect is
  maxTilt: number // Maximum allowable tilt angle (limits how far the element can rotate)
) => {
  // Calculate rotation on the Y-axis based on horizontal movement (deltaX)
  let rotateY = (deltaX / windowWidth) * movility

  // Calculate rotation on the X-axis based on vertical movement (deltaY), inverted by negating the value
  let rotateX = -(deltaY / windowWidth) * movility

  // Return the calculated rotations, limiting both X and Y to the maximum tilt defined by maxTilt
  return {
    // Clamp rotateY within the range of -maxTilt to +maxTilt
    rotateY: Math.min(Math.max(rotateY, -maxTilt), maxTilt),

    // Clamp rotateX within the range of -maxTilt to +maxTilt
    rotateX: Math.min(Math.max(rotateX, -maxTilt), maxTilt)
  }
}
