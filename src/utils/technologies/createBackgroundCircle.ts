import { Bodies } from "matter-js"; // Import the Bodies module from Matter.js

// Auxiliary function to create a static background circle
export const createBackgroundCircle = (
  x: number, // X coordinate for the center of the circle
  y: number, // Y coordinate for the center of the circle
  radius: number, // Radius of the circle
  fillStyle: string // Color to fill the circle
) => {
  // Create and return a circle body with specified properties
  return Bodies.circle(x, y, radius, {
    isStatic: true, // Set to true so the circle does not move when forces are applied
    collisionFilter: {
      group: -1, // Set to -1 to prevent collision with any other objects
      mask: 0, // No collision with any category of objects
      category: 0 // Category for visual representation only (not a physical object)
    },
    render: {
      fillStyle // Use the provided fillStyle for the circle's color
    }
  });
};
