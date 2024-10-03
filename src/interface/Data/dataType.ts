export interface RouteSVGType {
  routeSVGFront:    RouteSVG[];
  routeSVGMiddle:   RouteSVG[];
  routeSVGBack:     RouteSVG[];
  routeSVGOutLeft:  RouteSVG[];
  routeSVGOutRight: RouteSVG[];
}

export interface RouteSVG {
  url:   string;
  name:  string;
  scale: Scale;
  bgColor?: string;
  textColor?: string;
  typeTech?:string;
}

export interface Scale {
  movile: number;
  laptop: number;
}

export interface HoveredTechDataType {
  Front: TechData
  Middle: TechData
  Back: TechData
}

export interface TechData {
  name: string | null
  bgColor: string | null
  textColor: string | null
  typeTech: string | null
}
