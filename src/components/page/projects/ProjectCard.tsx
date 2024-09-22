'use client'
import { useRef } from 'react'
import { useHammer, useVanillaTilt, useWindowSize } from '@/Hooks'
import { ImageData, ProjectCardType } from '@/interface/app/Project'
import { transformationsHover } from '@/components/page/projects'
import Image from 'next/image'
import { limitRotation } from '@/utils'

export const ProjectCard = ({
  image,
  bg_color,
  border_color,
  font_color,
  title,
  filter_shadow,
  imagesData,
  leftOrigth,
  txtDescription
}: ProjectCardType) => {
  const tiltRef = useVanillaTilt({
    max: 45,
    speed: 10000,
    scale: 1.3
  })

  const imageMainRef = useRef<HTMLImageElement>(null)
  const imagesIcon = useRef<(HTMLDivElement | null)[]>([])
  const iconsRefs = useRef<(HTMLDivElement | null)[]>([])
  const textRef = useRef<HTMLDivElement | null>(null)
  const { windowWidth, movile } = useWindowSize()

  // Define los límites máximos de inclinación (puedes ajustarlos según lo que necesites)
  const maxTilt = 30 // Grados máximos de inclinación
  const movility = 200 // Movilidad

  // Define los gestos y sus callbacks
  const gestures = {
    // Maneja el evento de `pan` para actualizar el estilo del elemento
    pan: (event: HammerInput) => {
      transformation(true)
      const { deltaX, deltaY } = event

      // Calcula las rotaciones basadas en el movimiento del pan
      let rotateY = (deltaX / windowWidth) * movility // Movimiento horizontal afecta a rotateY
      let rotateX = -(deltaY / windowWidth) * movility // Movimiento vertical afecta a rotateX

      // Limitar las rotaciones para que no excedan el máximo permitido
      rotateY = limitRotation(rotateY, maxTilt)
      rotateX = limitRotation(rotateX, maxTilt)

      // Aplica las transformaciones de rotación al estilo del elemento
      if (tiltRef.current) {
        tiltRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      }
    },
    // Restablecer el estado del tilt al terminar el pan
    panend: () => {
      transformation(false)
      if (tiltRef.current) {
        tiltRef.current.style.transform = `rotateX(0deg) rotateY(0deg)`
      }
    }
  }

  //Hook para simular los gestos
  useHammer(tiltRef, gestures)

  const transformation = (hover: boolean = true) => {
    transformationsHover({
      hover,
      imageMainRef,
      iconsRefs,
      imagesIcon,
      imagesData,
      windowWidth,
      filter_shadow,
      textRef,
      movile,
      leftOrigth
    })
  }

  return (
    <div
      ref={tiltRef}
      style={{
        backgroundColor: bg_color,
        borderColor: border_color,
        color: font_color
      }}
      className="ProjectCard"
      onMouseEnter={() => {
        transformation(true)
      }}
      onMouseLeave={() => {
        transformation(false)
      }}
    >
      {imagesData.map((data: ImageData, index: number) => (
        <div
          ref={(ref) => {
            iconsRefs.current[index] = ref
          }}
          key={index}
          className="icon-container"
        >
          <Image
            ref={(ref) => {
              imagesIcon.current[index] = ref
            }}
            alt=""
            src={data.src}
            width={100}
            height={100}
          />
        </div>
      ))}
      <div
        ref={textRef}
        style={{
          backgroundColor: bg_color,
          borderColor: border_color,
          color: font_color
        }}
        className={`text-description transform-text-front-movile laptop:transform-text-front-laptop ${
          leftOrigth === 'left' ? 'laptop:text-left' : 'laptop:text-right'
        }`}
      >
        {txtDescription}
      </div>

      <div className="image-container">
        <Image
          ref={imageMainRef}
          alt=""
          width={1000}
          height={1000}
          src={`/${image}`}
        />
      </div>
      <h3>{title}</h3>
    </div>
  )
}
