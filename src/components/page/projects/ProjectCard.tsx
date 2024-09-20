'use client'
import { useState, useRef } from 'react'
import { useHammer, useVanillaTilt, useWindowSize } from '@/Hooks'
import { ImageData, ProjectCardType } from '@/interface/app/Project'
import { transformationsHover, getTextClass } from '@/components/page/projects'
import Image from 'next/image'

export const ProjectCard = ({
  image,
  bg_color,
  border_color,
  font_color,
  title,
  filter_shadow,
  imagesData,
  leftOrigth
}: ProjectCardType) => {
  const tiltRef = useVanillaTilt({
    max: 45,
    speed: 5000,
    scale: 1.3
  })

  const imageMainRef = useRef<HTMLImageElement>(null)
  const imagesIcon = useRef<(HTMLDivElement | null)[]>([])
  const iconsRefs = useRef<(HTMLDivElement | null)[]>([])
  const textRef = useRef<HTMLDivElement | null>(null)
  const { windowSize, movile } = useWindowSize()

  // Define los límites máximos de inclinación (puedes ajustarlos según lo que necesites)
  const maxTilt = 30 // Grados máximos de inclinación
  const movility = 200

  // Función para limitar los valores de inclinación
  const limitRotation = (value: number, limit: number) => {
    return Math.min(Math.max(value, -limit), limit)
  }

  // Define los gestos y sus callbacks
  const gestures = {
    press: (event: HammerInput) => {
      console.log('press!', event)
    },
    // Maneja el evento de `pan` para actualizar el estilo del elemento
    pan: (event: HammerInput) => {
      transformation(true)
      const { deltaX, deltaY } = event

      // Calcula las rotaciones basadas en el movimiento del pan
      let rotateY = (deltaX / window.innerWidth) * movility // Movimiento horizontal afecta a rotateY
      let rotateX = -(deltaY / window.innerHeight) * movility // Movimiento vertical afecta a rotateX

      // Limitar las rotaciones para que no excedan el máximo permitido
      rotateY = limitRotation(rotateY, maxTilt)
      rotateX = limitRotation(rotateX, maxTilt)

      // Aplica las transformaciones de rotación al estilo del elemento
      if (tiltRef.current) {
        tiltRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      }

      console.log(`Panned: ${deltaX}, ${deltaY}`)
    },
    // Restablecer el estado del tilt al terminar el pan
    panend: () => {
      transformation(false)
      if (tiltRef.current) {
        tiltRef.current.style.transform = `rotateX(0deg) rotateY(0deg)`
      }
    }
  }

  // Usa el hook para enlazar los gestos
  useHammer(tiltRef, gestures)

  const transformation = (hover: boolean = true) => {
    const data = {
      hover,
      imageMainRef,
      iconsRefs,
      imagesIcon,
      imagesData,
      windowSize,
      filter_shadow,
      textRef,
      movile,
      leftOrigth
    }

    transformationsHover(data)
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
            width={1000}
            height={1000}
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
        className="text-description transform-text-front-movile laptop:transform-text-front-laptop "
      >
        Generador de clases de TailWind, genera clases genéricas para agilizar
        el proceso de desarrollo.
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
