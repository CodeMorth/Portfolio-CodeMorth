import { Body } from 'matter-js'

export interface CustomBodyDefinition extends Body {
  name?: string | null | undefined
  bgColor?: string | null | undefined
  textColor?: string | null | undefined
  typeTech?: string | null | undefined
}

export interface HoveredTechDataType {
  Front: TechData
  Middle: TechData
  Back: TechData
}
type TechData = {
  name: string | null
  bgColor: string | null
  textColor: string | null
}
