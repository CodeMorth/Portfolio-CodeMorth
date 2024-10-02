'use client'
import { useCallback, useMemo, useRef } from 'react'
import { useHammer, useVanillaTilt, useWindowSize } from '@/Hooks'
import { ImageData, ProjectCardType } from '@/interface/app/Project'
import { transformationsHover } from '@/components/page/projects'
import Image from 'next/image'
import { calculateRotations } from '@/utils/technologies'

// ProjectCard component to display project details with tilt and hover effects
export const ProjectCard = ({
  image,          // The main image of the project
  bg_color,       // Background color of the card
  border_color,   // Border color of the card
  font_color,     // Font color of the text in the card
  title,          // Title of the project
  filter_shadow,  // Shadow filter applied to the images/icons
  imagesData,     // Array of image data for icons
  leftOrigth,     // Determines the alignment (left or right) for text
  txtDescription  // Description text of the project
}: ProjectCardType) => {
  
  // Initialize VanillaTilt for the project card
  const tiltRef = useVanillaTilt({
    max: 45,   // Max tilt angle
    speed: 10000, // Speed of the tilt effect
    scale: 1.3  // Scale effect for the card
  })

  // Refs for different elements in the card
  const imageMainRef = useRef<HTMLImageElement>(null) // Main image ref
  const imagesIcon = useRef<(HTMLDivElement | null)[]>([]) // Refs for icons
  const iconsRefs = useRef<(HTMLDivElement | null)[]>([]) // Refs for icon containers
  const textRef = useRef<HTMLDivElement | null>(null) // Ref for text element

  // Get window size and mobile detection
  const { windowWidth, movile } = useWindowSize()

  // Function to handle transformations on hover (with or without hover)
  const transformation = useCallback(
    (hover: boolean = true) => {
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
    },
    [imagesData, windowWidth, movile, filter_shadow, leftOrigth]
  )

  // Handle panning gestures (dragging), calculate rotations based on deltaX, deltaY
  const handlePan = useCallback(
    (event: HammerInput) => {
      transformation(true)  // Trigger hover transformations
      const { deltaX, deltaY } = event
      const { rotateX, rotateY } = calculateRotations(
        deltaX,    // Horizontal movement
        deltaY,    // Vertical movement
        windowWidth,
        200,       // Mobility/sensitivity factor
        30         // Maximum tilt
      )

      // Apply the rotation to the element using VanillaTilt
      if (tiltRef.current) {
        tiltRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      }
    },
    [windowWidth, tiltRef, transformation]
  )

  // Reset the tilt to default (no rotation) when the gesture ends
  const resetTilt = useCallback(() => {
    transformation(false)
    if (tiltRef.current) {
      tiltRef.current.style.transform = `rotateX(0deg) rotateY(0deg)`
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Define gestures (pan and panend) for Hammer.js
  const gestures = useMemo(
    () => ({
      pan: handlePan,       // Handle the pan gesture
      panend: resetTilt     // Reset the tilt when panning ends
    }),
    [handlePan, resetTilt]
  )

  // Initialize Hammer.js for touch gestures
  useHammer(tiltRef, gestures)

  return (
    <div
      ref={tiltRef}
      style={{
        backgroundColor: bg_color,
        borderColor: border_color,
        color: font_color
      }}
      className="ProjectCard"
      onMouseEnter={() => transformation(true)}  // Hover in: apply transformation
      onMouseLeave={() => transformation(false)} // Hover out: remove transformation
    >
      {/* Render icons for the project */}
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
            alt={'Project icon'}
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
          alt={title}
          width={1000}
          height={1000}
          src={`/${image}`}
          priority={true} // Optimize loading of the main image
        />
      </div>      
      <h3>{title}</h3>
    </div>
  )
}
