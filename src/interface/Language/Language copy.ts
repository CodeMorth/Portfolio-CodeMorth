export interface PackLanguageType {
  English: DataLanguageType
  Spanish: DataLanguageType
}

export interface DataLanguageType {
  navbarLanguage: NavbarLanguage[]
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

export interface NavbarLanguage {
  text: string
  ref: string
  leftLine: number
  widthLine: number
  rotateLine: number
}

export interface ProjectLanguage {
  tittle: string
  projectCard: ProjectCard[]
}

export interface ProjectCard {
  bg_color: string
  border_color: string
  font_color: string
  image: string
  title: string
  filter_shadow: string
  imagesData: ImagesDatum[]
  leftOrigth: string
  txtDescription: string
}

export interface ImagesDatum {
  src: string
  filter_shadow: string
}
