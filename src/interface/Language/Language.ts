export interface PackLanguageType {
  English: DataLanguageType
  Spanish: DataLanguageType
}

export interface DataLanguageType {
  navbarLanguage: NavbarLanguageType[]
  homeLanguage: HomeLanguage
  experienceLanguage: ExperienceLanguage
  projectLanguage: ProjectLanguage
}

export interface ExperienceLanguage {
  title: string
  experienceCardLanguage: ExperienceCardLanguage[]
}

export interface ExperienceCardLanguage {
  title: string
  subtitle: string
  src: string
  alt: string
  description: string
}

export interface HomeLanguage {
  h1: string
  span1: string
  span2: string
  p: string
}

export interface NavbarLanguageType {
  text: string
  ref: string
  leftLine: number
  widthLine: number
  rotateLine: number
}

export interface ProjectLanguage {
  title: string
  projectCard: ProjectCardType[]
}

export interface ProjectCardType {
  href:string
  bg_color: string
  border_color: string
  font_color: string
  image: string
  title: string
  filter_shadow: string
  imagesData: ImagesDatum[]
  leftOrigth: 'left' | 'right'
  txtDescription: string
}

export interface ImagesDatum {
  src: string
  filter_shadow: string
}
