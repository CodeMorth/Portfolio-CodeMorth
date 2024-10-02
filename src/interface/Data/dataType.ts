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
}

export interface Scale {
  movile: number;
  laptop: number;
}
