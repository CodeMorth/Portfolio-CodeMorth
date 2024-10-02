import { Composite, Constraint } from "matter-js"; // Import necessary Matter.js components

/**
 * Creates an array of constraints for connecting points to a bridge.
 *
 * This function generates constraints that connect specified points in a circular
 * formation around a given position to the bodies of a bridge composite.
 *
 * @param {number} positionX - The X coordinate of the center position.
 * @param {number} positionY - The Y coordinate of the center position.
 * @param {'left' | 'right'} leftOrRight - Indicates whether to position points 
 *                                          to the left or right of the center.
 * @param {number} radius - The radius at which to place the points.
 * @param {Composite} bridge - The Matter.js composite that represents the bridge.
 * @param {number} numberOfRectangles - The number of rectangles (or bodies) 
 *                                       in the bridge to connect to.
 * @returns {Constraint[]} An array of Matter.js constraints connecting points 
 *                         to the bridge bodies.
 */
export const constrainsArray = (
  positionX: number,
  positionY: number,
  leftOrRight: 'left' | 'right',
  radius: number,
  bridge: Composite,
  numberOfRectangles: number
) => {
  let contrainsDataArray: Constraint[] = []; // Initialize an array to store constraints

  // Loop through each rectangle to create constraints
  for (let index = 0; index < numberOfRectangles; index++) {
    // Determine the position adjustment based on the left or right orientation
    const radiusLeftOrRight = leftOrRight === 'left' ? radius : -radius;

    // Calculate the angle for this rectangle based on its index
    const angleStep = (Math.PI * 2) / numberOfRectangles; // Angle step based on the number of rectangles
    const angle = index * angleStep; // Current angle for this rectangle
    const x = positionX + radiusLeftOrRight * Math.cos(angle); // Calculate X position
    const y = positionY + radiusLeftOrRight * Math.sin(angle); // Calculate Y position

    // Create a new constraint connecting the calculated point to the corresponding bridge body
    contrainsDataArray = [
      ...contrainsDataArray, // Spread the existing constraints
      Constraint.create({
        pointA: { x: x, y: y }, // Point A is the calculated position
        bodyB: bridge.bodies[index], // Body B is the bridge's rectangle at the current index
        pointB: { x: 0, y: 0 }, // Reference point on Body B
        length: 0.0001, // Length of the constraint (effectively zero)
        stiffness: 0.2, // Stiffness of the constraint, affecting how rigid it is
        render: {
          visible: false // Hide the constraint in rendering
        }
      })
    ];
  }

  // Return the array of constraints for the bridge ends
  return contrainsDataArray; 
};
