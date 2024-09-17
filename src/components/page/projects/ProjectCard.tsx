'use client'
import { useVanillaTilt, useWindowSize } from '@/Hooks/Global'
import { ImageData, ProjectCardType } from '@/interface/app/Project'
import { getCircularPosition } from '@/utils'
import Image from 'next/image'
import { useRef } from 'react'

export const ProjectCard = ({
  image,
  bg_color,
  border_color,
  font_color,
  title,
  filter_shadow,
  imagesData
}: ProjectCardType) => {
  const tiltRef = useVanillaTilt({
    max: 45,
    speed: 9000,
    scale: 1.3
  })

  const imageRef = useRef<HTMLImageElement>(null)
  const iconsRefs = useRef<(HTMLDivElement | null)[]>([])

  const { windowSize } = useWindowSize()

  // Maneja la transformación y el filtro de los iconos e imagen
  const applyTransformationsHover = (isEntering: boolean) => {
    if (imageRef.current) {
      imageRef.current.style.filter = isEntering ? filter_shadow : ''
    }

    iconsRefs.current.forEach((iconRef, index) => {
      if (iconRef) {
        const { x, y } = getCircularPosition(
          index,
          imagesData.length,
          windowSize
        )
        iconRef.style.transform = isEntering
          ? `translateX(calc(${x}px * var(--scale))) translateY(calc(${y}px * var(--scale)))`
          : 'translateX(0) translateY(0)'
      }
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
      onMouseEnter={() => applyTransformationsHover(true)}
      onMouseLeave={() => applyTransformationsHover(false)}
    >
      {imagesData.map((data: ImageData, index: number) => (
        <div
          ref={(ref) => {
            iconsRefs.current[index] = ref
          }}
          key={index}
          className="icon-container"
        >
          <Image alt="" src={data.src} width={1000} height={1000} />
        </div>
      ))}

      <div className="image-container">
        <Image
          ref={imageRef}
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
