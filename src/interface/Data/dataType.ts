export interface RouteSVGType {
  routeSVGFront:    RouteSVG[];
  routeSVGMiddle:   RouteSVG[];
  routeSVGBack:     RouteSVG[];
  routeSVGOutLeft:  RouteSVG[];
  routeSVGOutRight: RouteSVG[];
}

export interface RouteSVG {
  url:   string;
  scale: Scale;
}

export interface Scale {
  movile: number;
  laptop: number;
}
