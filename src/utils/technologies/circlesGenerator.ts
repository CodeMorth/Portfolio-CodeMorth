import { RouteSVG } from '@/interface/Data'
import { MutableRefObject } from 'react'
import { Bodies, World, Body, Composite, Render } from 'matter-js';
import { CustomBodyDefinition } from '@/interface/app/technologies';

// Modificar la función para usar el nuevo tipo
export const circlesGenerator = (
  positionX: number,
  positionY: number,
  svg: RouteSVG[],
  circlesRef: MutableRefObject<Body[]>,
  world: World,
  movile: boolean,
  tablet: boolean,
  render: Render,
  spawnRangeX: number = 1,
  spawnRangeY: number = 1
) => {
  // console.log("svg 2",svg)
  svg.forEach((data: RouteSVG, index) => {

    console.log("data",data)

    // console.log({"bgColor":data.bgColor,"name":data.name,"textColor":data.textColor})

    const textureImage = new Image();
    textureImage.src = data.url;


    textureImage.onload = () => {
      const x = positionX + (index % 4) * spawnRangeX;
      const y = positionY + Math.floor(index / 4) * spawnRangeY;

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
        },
        name: data.name, // Propiedad personalizada
        bgColor: data.bgColor,
        textColor: data.textColor
      } as CustomBodyDefinition); // Especificar el tipo personalizado

      circle.plugin.wrap = {
        min: { x: render.bounds.min.x, y: render.bounds.min.y },
        max: { x: render.bounds.max.x, y: render.bounds.max.y }
      };

      circlesRef.current.push(circle); // Guardar referencia del círculo
      Composite.add(world, circle);
    };
  });
};
