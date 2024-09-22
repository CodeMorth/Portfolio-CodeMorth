"use client"
import { dataTransformationType } from '@/interface/app/Project'
import { getCircularPosition } from '@/utils'

export const transformationsHover = ({
  hover,
  imageMainRef,
  iconsRefs,
  imagesIcon,
  imagesData,
  windowWidth,
  filter_shadow,
  textRef,
  movile,
  leftOrigth,
}: dataTransformationType) => {

  // Actualiza el filtro de la imagen principal
  if (imageMainRef.current) {
    imageMainRef.current.style.filter = hover ? filter_shadow : ''
  }

  // Helper para aplicar transformaciones de texto
  const applyTextTransform = (x: string, y: string, z: string) => {
    textRef.current!.style.transform = `translateX(${x}) translateY(${y}) translateZ(${z})`
  }

  if (textRef.current) {
    const isLeft = leftOrigth === 'left'
    if (movile) {
      hover
        ? applyTextTransform('0rem', '-11rem', '-3rem')
        : applyTextTransform('0rem', '-7.5rem', '7rem')
    } else {
      const x = isLeft ? 'calc(-10rem * var(--scale))' : 'calc(10rem * var(--scale))'
      const y = 'calc(-12rem * var(--scale))'
      const zHover = 'calc(-3rem * var(--scale))'
      const zDefault = 'calc(7rem * var(--scale))'

      hover
        ? applyTextTransform(x, y, zHover)
        : applyTextTransform('0rem', 'calc(-9rem * var(--scale))', zDefault)
    }
  }

  // Actualiza las posiciones y tamaños de los íconos
  if (iconsRefs.current) {
    iconsRefs.current.forEach((iconRef, index) => {
      if (iconRef) {
        const { x, y } = getCircularPosition(index, imagesData.length, windowWidth)

        // Aplicar transformaciones y tamaño
        iconRef.style.transform = hover
          ? `translateX(calc(${x}px * var(--scale))) translateY(calc(${y}px * var(--scale)))`
          : 'translateX(0) translateY(0)'

        const size = hover ? (movile ? '3.5rem' : 'calc(5rem * var(--scale))') : '0rem'
        iconRef.style.width = size
        iconRef.style.height = size
      }
    })
  }

  // Actualiza los filtros de las imágenes de los íconos
  if (imagesIcon.current) {
    imagesIcon.current.forEach((imageIcon, index) => {
      if (imageIcon) {
        imageIcon.style.filter = imagesData[index].filter_shadow
      }
    })
  }
}
