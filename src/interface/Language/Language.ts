export interface LanguageType {
  navbar: LanguageNavbar[]
  home: LanguageHome
}

export interface LanguageHome {
  h1: string
  span1: string
  span2: string
  p: string
}

export interface LanguageNavbar {
  text: string
  ref: string
  leftLine: number
  widthLine: number
  rotateLine: number
}
