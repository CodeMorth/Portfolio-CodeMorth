import routeSVG from '@/data/routeSVGFront.json'

export const configsCircles = [
  { x: [400, 390, 150], y: [-50, 170, 250], svg: routeSVG.routeSVGFront }, // Front
  { x: [400, 390, 390], y: [280, 450, 220], svg: routeSVG.routeSVGMiddle }, // Middle
  { x: [400, 360, 660], y: [600, 700, 280], svg: routeSVG.routeSVGBack }, // Back
  { x: [400, 0, -250], y: [-350, 390, 250], svg: routeSVG.routeSVGOutLeft, spawnRangeX: 1, spawnRangeY: 5000 }, // Out Left
  { x: [400, 0, 960], y: [980, 400, 280], svg: routeSVG.routeSVGOutRight,  spawnRangeX: 1, spawnRangeY: 5000 } // Out Right
]

export const responsiveSettings = {
  movile: {
    numberOfRectangles: 65,
    radius: 350,
    leftPosition: { x: 400, y: 120 },
    rightPosition: { x: 400, y: 470 }
  },
  tablet: {
    numberOfRectangles: 56,
    radius: 300,
    leftPosition: { x: 400, y: 270 },
    rightPosition: { x: 400, y: 570 }
  },
  desktop: {
    numberOfRectangles: 52,
    radius: 270,
    leftPosition: { x: 250, y: 300 },
    rightPosition: { x: 540, y: 300 }
  }
}

const bgColorFront = 'rgba(0, 131, 255, 0.06)'
const bgColorBack = 'rgb(136, 255, 80, 0.06)'

export const circleBGFront = {
  movile: {
    x: 400,
    y: 120,
    radius: 350,
    color: bgColorFront
  },
  tablet: {
    x: 400,
    y: 270,
    radius: 300,
    color: bgColorFront
  },
  desktop: {
    x: 250,
    y: 300,
    radius: 270,
    color: bgColorFront
  }
}

export const circleBGBack = {
  movile: {
    x: 400,
    y: 480,
    radius: 350,
    color: bgColorBack
  },
  tablet: {
    x: 400,
    y: 560,
    radius: 300,
    color: bgColorBack
  },
  desktop: {
    x: 540,
    y: 300,
    radius: 270,
    color: bgColorBack
  }
}
