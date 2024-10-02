import { Body } from "matter-js";         // Importing the Body module from Matter.js for physics simulations
import { MutableRefObject } from "react"; // Importing MutableRefObject type from React for type safety with refs

/**
 * Function to apply a random perpetual movement force to circles.
 * 
 * @param forceMagnitude - The magnitude of the force to be applied to each circle.
 * @param circlesRef - A reference object containing the current circles (Matter.js Body instances) to which the force will be applied.
 */
export const perpetueMovement = (
  forceMagnitude: number,                // Magnitude of the force applied to each circle
  circlesRef: MutableRefObject<Body[]>   // Reference to an array of circles (Matter.js Body instances)
) => {
  // Iterate through each circle in the circlesRef
  circlesRef.current.forEach((circle) => {
    // Generate a random angle for force direction
    const angle = Math.random() * Math.PI * 2; 
    
    // Calculate force components based on the random angle and specified magnitude
    const force = {
      x: Math.cos(angle) * forceMagnitude, // X component of the force
      y: Math.sin(angle) * forceMagnitude  // Y component of the force
    };

    // Apply the calculated force to the current circle at its position
    Body.applyForce(circle, circle.position, force); 
  });
};
