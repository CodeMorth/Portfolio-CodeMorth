export interface ProjectCardType {
  bg_color: string
  image: string
  border_color: string
  font_color: string
  title: string
  filter_shadow: string
  imagesData: ImageData[]
  leftOrigth: 'left' | 'right'
}

export interface ImageData {
  src: string
  filter_shadow: string
}

export interface dataTransformationType {
  isEntering:boolean
  imageMainRef: React.RefObject<HTMLImageElement>
  iconsRefs: React.RefObject<(HTMLDivElement | null)[]>
  imagesIcon: React.RefObject<(HTMLDivElement | null)[]>
  imagesData: ImageData[]
  windowSize: number // Asegúrate de que el tipo es un objeto con width y height
  filter_shadow: string
}
