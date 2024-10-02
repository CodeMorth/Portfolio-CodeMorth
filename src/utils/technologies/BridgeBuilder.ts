import { Bodies, Composites } from "matter-js"; // Import necessary Matter.js components

// Auxiliary function to create a bridge using Matter.js
export const BridgeBuilder = (
  x: number,                       // Initial X coordinate for the bridge
  y: number,                       // Initial Y coordinate for the bridge
  numberOfRectangles: number,      // Number of rectangles that will form the bridge
  fillStyle: string,               // Fill color for the bridge rectangles
  group: any                       // Collision group to which the rectangles will belong
) => {
  // Create a bridge by stacking rectangles in a column
  return Composites.stack(x, y, numberOfRectangles, 1, 0, 0, (x: number, y: number) => {
    // Create a rectangle that forms part of the bridge at the coordinates (x, y)
    return Bodies.rectangle(x, y, 53, 13, {
      collisionFilter: { group },    // Set the collision group for the rectangle
      chamfer: { radius: 10 },       // Apply a radius of 10 to the rectangle's corners
      frictionAir: 0,                // Set air friction to 0 (no air resistance)
      render: {
        fillStyle                    // Define the fill color of the rectangle
      }
    });
  });
};
