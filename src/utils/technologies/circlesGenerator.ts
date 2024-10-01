import { RouteSVG } from '@/interface/Data'
import { Bodies, World, Body, Composite, Render } from 'matter-js' // Añadir Composite
import { MutableRefObject } from 'react'

export const circlesGenerator = (
  positionX: number,
  positionY: number,
  data: RouteSVG[],
  circlesRef: MutableRefObject<Body[]>,
  world: World,
  movile: boolean,
  tablet: boolean,
  render: Render,
  spawnRangeY: number = 1,
  spawnRangeX: number = 1
) => {
  data.forEach((data, index) => {
    const textureImage = new Image()
    textureImage.src = data.url

    textureImage.onload = () => {
      const x = positionX + (index % 4) * spawnRangeX
      const y = positionY + Math.floor(index / 4) * spawnRangeY

      const circle = Bodies.circle(x, y, movile ? 30 : tablet ? 20 : 23, {
        isStatic: false,
        restitution: 0.2, // Aumentar la elasticidad para más rebote
        friction: 0.9, // Reducir la fricción para mantener la velocidad
        frictionAir: 0,
        render: {
          sprite: {
            texture: textureImage.src,
            xScale: movile
              ? data.scale.movile
              : tablet
              ? data.scale.laptop
              : data.scale.laptop,
            yScale: movile
              ? data.scale.movile
              : tablet
              ? data.scale.laptop
              : data.scale.laptop
          }
        }
      })

      circle.plugin.wrap = {
        min: { x: render.bounds.min.x, y: render.bounds.min.y },
        max: { x: render.bounds.max.x, y: render.bounds.max.y }
      }

      circlesRef.current.push(circle) // Guardar referencia del círculo
      Composite.add(world, circle)
    }
  })
}
