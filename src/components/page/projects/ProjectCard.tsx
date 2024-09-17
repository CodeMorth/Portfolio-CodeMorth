'use client'
import { useVanillaTilt } from '@/Hooks/Global'
import Image from 'next/image'
import React from 'react'

interface ProjectCardType {
  bg_color: string
  image: string
  border_color: string
  font_color: string
  title: string
}

export const ProjectCard = ({
  image,
  bg_color,
  border_color,
  font_color,
  title
}: ProjectCardType) => {
  // Configurar el hook VanillaTilt con opciones
  const tiltRef = useVanillaTilt({
    max: 45,
    speed: 5000,
    scale: 1.3 // Aumenta el tamaño para darle un efecto más profundo
  })

  return (
    <div
      ref={tiltRef}
      style={{
        backgroundColor: bg_color,
        borderColor: border_color,
        color: font_color
      }}
      className="ProjectCard"
    >
      <div className="image-container">
        <Image
          alt=""
          width={1000}
          height={1000}
          src={`/${image}`}
          className="tilt-image"
        />
      </div>
      <h3>{title}</h3>
    </div>
  )
}
