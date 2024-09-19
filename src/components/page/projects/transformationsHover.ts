import { dataTransformationType } from '@/interface/app/Project'
import { getCircularPosition } from '@/utils'

export const transformationsHover = (
  dataTransformation: dataTransformationType
) => {
  const {
    isEntering,
    imageMainRef,
    iconsRefs,
    imagesIcon,
    imagesData,
    windowSize,
    filter_shadow
  } = dataTransformation

  if (imageMainRef.current) {
    imageMainRef.current.style.filter = isEntering ? filter_shadow : ''
  }

  // Verifica si iconsRefs.current y imagesIcon.current no son null antes de usarlos
  if (iconsRefs.current) {
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

  if (imagesIcon.current) {
    imagesIcon.current.forEach((imageIcon, index) => {
      if (imageIcon) {
        imageIcon.style.filter = imagesData[index].filter_shadow
      }
    })
  }
}
