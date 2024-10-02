"use client"
import { dataTransformationType } from '@/interface/app/Project' // Imports the data type for transformations
import { getCircularPosition } from '@/utils' // Imports a utility function to calculate circular positions

export const transformationsHover = ({
  hover, // Hover state
  imageMainRef, // Reference to the main image
  iconsRefs, // Reference to the icons
  imagesIcon, // Reference to the icon images
  imagesData, // Image data that includes properties like filter
  windowWidth, // Width of the window
  filter_shadow, // Filter applied to the main image
  textRef, // Reference to the text that will be transformed
  movile, // Indicates if the device is mobile
  leftOrigth, // Indicates the direction of the text transformation
}: dataTransformationType) => {

  // Updates the filter of the main image based on the hover state
  if (imageMainRef.current) {
    imageMainRef.current.style.filter = hover ? filter_shadow : '' // Applies the filter if hovering, otherwise removes it
  }

  // Helper function to apply text transformations
  const applyTextTransform = (x: string, y: string, z: string) => {
    textRef.current!.style.transform = `translateX(${x}) translateY(${y}) translateZ(${z})` // Applies transformation to the text
  }

  // Applies transformations to the text depending on whether it is hovered or not
  if (textRef.current) {
    const isLeft = leftOrigth === 'left' // Checks if the direction is 'left'
    if (movile) { // If the device is mobile
      hover
        ? applyTextTransform('0rem', '-11rem', '-3rem') // Transformations on hover
        : applyTextTransform('0rem', '-7.5rem', '7rem') // Transformations when not hovering
    } else { // If not mobile
      const x = isLeft ? 'calc(-10rem * var(--scale))' : 'calc(10rem * var(--scale))' // Calculates X position
      const y = 'calc(-12rem * var(--scale))' // Y position
      const zHover = 'calc(-3rem * var(--scale))' // Z depth on hover
      const zDefault = 'calc(7rem * var(--scale))' // Z depth when not hovering

      hover
        ? applyTextTransform(x, y, zHover) // Applies transformation on hover
        : applyTextTransform('0rem', 'calc(-9rem * var(--scale))', zDefault) // Applies transformation when not hovering
    }
  }

  // Updates the positions and sizes of the icons
  if (iconsRefs.current) {
    iconsRefs.current.forEach((iconRef, index) => { // Iterates over each icon
      if (iconRef) {
        const { x, y } = getCircularPosition(index, imagesData.length, windowWidth) // Gets the circular position

        // Applies transformations and size to each icon
        iconRef.style.transform = hover
          ? `translateX(calc(${x}px * var(--scale))) translateY(calc(${y}px * var(--scale)))` // Position when hovering
          : 'translateX(0) translateY(0)' // Default position

        const size = hover ? (movile ? '3.5rem' : 'calc(5rem * var(--scale))') : '0rem' // Adjusts the icon size
        iconRef.style.width = size // Applies the calculated size
        iconRef.style.height = size // Applies the calculated size
      }
    })
  }

  // Updates the filters of the icon images
  if (imagesIcon.current) {
    imagesIcon.current.forEach((imageIcon, index) => { // Iterates over each icon image
      if (imageIcon) {
        imageIcon.style.filter = imagesData[index].filter_shadow // Applies the corresponding filter from the image data
      }
    })
  }
}
