'use client'
import { useState, useRef } from 'react'
import { useVanillaTilt, useWindowSize } from '@/Hooks/Global'
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
  const [isHovered, setIsHovered] = useState(false)

  const tiltRef = useVanillaTilt({
    max: 45,
    speed: 9000,
    scale: 1.3
  })

  const imageMainRef = useRef<HTMLImageElement>(null)
  const imagesIcon = useRef<(HTMLDivElement | null)[]>([])
  const iconsRefs = useRef<(HTMLDivElement | null)[]>([])
  const textRef = useRef<HTMLDivElement | null>(null)
  const { windowSize } = useWindowSize()

  const dataTransformation = (isEntering: boolean = true) => {
    return {
      isEntering,
      imageMainRef,
      iconsRefs,
      imagesIcon,
      imagesData,
      windowSize,
      filter_shadow
    }
  }

  const handleMouseEnter = () => {
    transformationsHover(dataTransformation())
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    transformationsHover(dataTransformation(false))
    setIsHovered(false)
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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseEnter}
      onTouchEnd={handleMouseLeave}
      onTouchMove={(data) => {
        console.log(data)
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
        className={getTextClass(isHovered, leftOrigth)}
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
