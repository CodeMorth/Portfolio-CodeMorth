import { Composite, Constraint } from "matter-js"

export const constrainsArray = (
    positionX: number,
    positionY: number,
    leftOrRight: 'left' | 'right',
    radius: number,
    bridge: Composite,
    numberOfRectangles:number
  ) => {
    let contrainsDataArray: Constraint[] = []

    for (let index = 0; index < numberOfRectangles; index++) {
      const radiusLeftOrRight = leftOrRight === 'left' ? -radius : radius

      const angleStep = (Math.PI * 2) / numberOfRectangles
      const angle = index * angleStep
      const x = positionX + radiusLeftOrRight * Math.cos(angle)
      const y = positionY + radiusLeftOrRight * Math.sin(angle)

      contrainsDataArray = [
        ...contrainsDataArray, // Aquí propagas el array existente
        Constraint.create({
          pointA: { x: x, y: y },
          bodyB: bridge.bodies[index],
          pointB: { x: 0, y: 0 },
          length: 0.0001,
          stiffness: 0.2,
          render: {
            visible: false
          }
        })
      ]
    }

    // Constraints for the bridge ends
    return contrainsDataArray
  }

