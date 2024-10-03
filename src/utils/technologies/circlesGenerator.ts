import { RouteSVG } from '@/interface/Data' // Interface for handling SVG route data
import { MutableRefObject } from 'react' // Type for handling mutable references in React
import { Bodies, World, Body, Composite, Render } from 'matter-js' // Matter.js physics engine imports
import { CustomBodyDefinition } from '@/interface/app/technologies' // Custom body type definition

// Function to generate circles using Matter.js based on SVG data and other parameters
export const circlesGenerator = (
  positionX: number, // Initial X position where the circles will spawn
  positionY: number, // Initial Y position where the circles will spawn
  svg: RouteSVG[], // Array of SVG data containing URL and properties like scale, name, etc.
  circlesRef: MutableRefObject<Body[]>, // Reference to store the generated circles (bodies)
  world: World, // Matter.js world where the bodies will be added
  movile: boolean, // Flag to check if it's mobile view
  tablet: boolean, // Flag to check if it's tablet view
  render: Render, // Matter.js render object to handle scene rendering
  spawnRangeX: number = 1, // Optional X-axis spawn range multiplier
  spawnRangeY: number = 1 // Optional Y-axis spawn range multiplier
) => {
  // Loop through each SVG data to generate corresponding circle
  svg.forEach((data: RouteSVG, index) => {
    const textureImage = new Image() // Create a new image element
    textureImage.src = data.url // Set the image source to the URL in the SVG data

    // Once the image is loaded, proceed with circle creation
    textureImage.onload = () => {
      // Calculate the position of the circle based on index and spawn ranges
      const x = positionX + (index % 4) * spawnRangeX
      const y = positionY + Math.floor(index / 4) * spawnRangeY

      // Create a new circle body using Matter.js, with different radii based on device type
      const circle = Bodies.circle(x, y, movile ? 30 : tablet ? 20 : 23, {
        isStatic: false, // Circle is not static (can move)
        restitution: 0.2, // Increase elasticity for more bounce
        friction: 0.9, // High friction to reduce speed loss
        frictionAir: 0, // No air friction (maintains velocity)
        render: {
          sprite: {
            texture: textureImage.src, // Set the texture of the circle to the loaded image
            // Set scale based on device type (mobile, tablet, laptop)
            xScale: movile ? data.scale.movile : tablet ? data.scale.laptop : data.scale.laptop,
            yScale: movile ? data.scale.movile : tablet ? data.scale.laptop : data.scale.laptop
          }
        },
        // Custom properties for the circle, used for additional logic
        name: data.name, // Store the name of the technology
        bgColor: data.bgColor, // Background color
        textColor: data.textColor, // Text color
        typeTech: data.typeTech // Technology type
      } as CustomBodyDefinition) // Cast the body to the custom type definition

      // Add wrapping behavior for the circles when they reach the edge of the render bounds
      circle.plugin.wrap = {
        min: { x: render.bounds.min.x, y: render.bounds.min.y }, // Minimum boundary for wrapping
        max: { x: render.bounds.max.x, y: render.bounds.max.y }  // Maximum boundary for wrapping
      }

      // Store a reference to the circle for later use
      circlesRef.current.push(circle)
      // Add the circle to the Matter.js world for physics simulation
      Composite.add(world, circle)
    }
  })
}
