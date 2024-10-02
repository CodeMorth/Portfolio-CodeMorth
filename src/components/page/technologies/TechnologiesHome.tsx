'use client'
import React, { useEffect, useRef, useState } from 'react'
import Matter, {
  Engine,
  Render,
  Runner,
  MouseConstraint,
  Mouse,
  Composite,
  Body,
  Composites,
  Query
} from 'matter-js'
import { useWindowSize } from '@/Hooks'
import {
  calculatePositionsCircles,
  circlesGenerator,
  constrainsArray,
  createBackgroundCircle,
  perpetueMovement,
  RenderLetters
} from '@/utils/technologies'
import MatterWrap from 'matter-wrap'
import { BridgeBuilder } from '@/utils/technologies/BridgeBuilder'
import {
  circleBGBack,
  circleBGFront,
  configsCircles,
  responsiveSettings
} from '@/data/technologies'
import { CustomBodyDefinition } from '@/interface/app/technologies'

/**
 * TechnologiesHome component: renders a canvas with dynamic physics-based interactions using Matter.js.
 * The component adapts to different screen sizes and generates a bridge with circular shapes that float and interact.
 */
export const TechnologiesHome: React.FC = () => {
  const { windowWidth, windowHeight, movile, tablet } = useWindowSize() // Get current window size and device type from custom hook.

  const sceneRef = useRef<HTMLDivElement>(null) // Ref to the div where the canvas will be rendered.
  const engineRef = useRef<Engine | null>(null) // Ref to the Matter.js engine.
  const runnerRef = useRef<Runner | null>(null) // Ref to the Matter.js runner.
  const circlesRef = useRef<Body[]>([]) // Ref to store references to the floating circles (Matter.js bodies).
  const [nameCircle, setnameCircle] = useState(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [hoverBgColor, setHoverBgColor] = useState(null)
  const [hoverTextColor, setHoverTextColor] = useState(null)

  // Responsive width calculations for different devices (mobile, tablet, laptop).
  const windowWidthMovile = windowWidth > 640 ? 640 : windowWidth
  const windowWidthLaptop = windowWidth > 870 ? 890 : windowWidth

  useEffect(() => {
    // Load the MatterWrap plugin dynamically to allow wrapping bodies across the edges of the canvas.
    try {
      if (typeof MatterWrap !== 'undefined') {
        Matter.use('matter-wrap')
      } else {
        Matter.use(require('matter-wrap'))
      }
    } catch (e) {}

    // Create a new Matter.js engine.
    const engine = Engine.create()
    engineRef.current = engine
    const world = engine.world

    // Disable gravity in the engine to create a floating effect for the objects.
    engine.gravity.x = 0
    engine.gravity.y = 0

    // Set canvas size based on device type (mobile, tablet, or desktop).
    const heightResponsive = movile ? 900 : tablet ? 1350 : windowHeight - 100
    const widthResponsive = movile
      ? windowWidthMovile
      : tablet
      ? windowWidthLaptop
      : windowWidth

    // Initialize the Matter.js renderer to render the physics simulation onto the canvas.
    const render = Render.create({
      element: sceneRef.current as HTMLDivElement, // Attach the canvas to the sceneRef element.
      engine: engine,
      options: {
        width: widthResponsive,
        height: heightResponsive,
        showAngleIndicator: false,
        wireframes: false,
        background: '#000814'
      } // Canvas options including dimensions and background color.
    })

    // Start rendering the Matter.js scene.
    Render.run(render)

    const runner = Runner.create()
    runnerRef.current = runner
    Runner.run(runner, engine) // Start the physics simulation.

    // Device-specific settings for bridge creation and positioning.
    const deviceSettings = movile
      ? responsiveSettings.movile
      : tablet
      ? responsiveSettings.tablet
      : responsiveSettings.desktop
    const { numberOfRectangles, radius, leftPosition, rightPosition } =
      deviceSettings

    const group = Body.nextGroup(true) // Create a collision group for the bridges.

    // Create left and right bridges using the BridgeBuilder utility.
    const bridgeLeft = BridgeBuilder(
      160,
      290,
      numberOfRectangles,
      '#0083ff',
      group
    )
    const bridgeRight = BridgeBuilder(
      160,
      290,
      numberOfRectangles,
      '#88ff50',
      group
    )

    // Chain the bridge segments together.
    Composites.chain(bridgeLeft, 0.3, 0, -0.3, 0, {
      stiffness: 1,
      length: 0.0001,
      render: { visible: false }
    })
    Composites.chain(bridgeRight, 0.3, 0, -0.3, 0, {
      stiffness: 1,
      length: 0.0001,
      render: { visible: false }
    })

    // Create constraints for the bridges.
    const constrainsLeft = constrainsArray(
      leftPosition.x,
      leftPosition.y,
      'left',
      radius,
      bridgeLeft,
      numberOfRectangles
    )
    const constrainsRight = constrainsArray(
      rightPosition.x,
      rightPosition.y,
      'right',
      radius,
      bridgeRight,
      numberOfRectangles
    )

    // Add the bridges and constraints to the world.
    Composite.add(world, [bridgeLeft, ...constrainsLeft])
    Composite.add(world, [bridgeRight, ...constrainsRight])

    // Generate floating circles with some delay.
    setTimeout(() => {
      configsCircles.forEach(
        ({ x, y, svg, spawnRangeX = 1, spawnRangeY = 1 }) => {
          circlesGenerator(
            calculatePositionsCircles(movile, tablet, x),
            calculatePositionsCircles(movile, tablet, y),
            svg,
            circlesRef,
            world,
            movile,
            tablet,
            render,
            spawnRangeX,
            spawnRangeY
          )
        }
      )
    }, 50)

    // Create mouse controls for interactivity (dragging bodies).
    const mouse = Mouse.create(render.canvas)
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.1, render: { visible: false } }
    })
    Composite.add(world, mouseConstraint)
    render.mouse = mouse

    // Actualizar el estado del hover en cada frame
    Matter.Events.on(render, 'afterRender', () => {
      const mousePosition = mouse.position
      const bodies = circlesRef.current
      let hoveredName = null
      let hoveredBgColor = null
      let hoveredTextColor = null

      // Verificar si el mouse está sobre alguno de los círculos
      bodies.forEach((circle: CustomBodyDefinition) => {
        const result = Query.point([circle], mousePosition)
        if (result.length > 0) {
          hoveredName = circle.name
          hoveredBgColor = circle.bgColor
          hoveredTextColor = circle.textColor

          const { x, y } = circle.position

          setTooltipPosition({
            x: x + 510,
            y: y + 195 // Ajusta el desplazamiento hacia arriba
          })
        }
      })

      setnameCircle(hoveredName) // Actualizar el estado con el índice del círculo
      setHoverBgColor(hoveredBgColor)
      setHoverTextColor(hoveredTextColor)
    })

    // Set the camera to focus on a specific area of the canvas.
    Render.lookAt(render, { min: { x: 0, y: 0 }, max: { x: 800, y: 600 } })

    // Create perpetual motion for the circles by adjusting their forces every 1ms.
    const interval = setInterval(() => perpetueMovement(0.0001, circlesRef), 1)

    // Background circle configuration based on the device type.
    const bgFront = movile
      ? circleBGFront.movile
      : tablet
      ? circleBGFront.tablet
      : circleBGFront.desktop
    const bgBack = movile
      ? circleBGBack.movile
      : tablet
      ? circleBGBack.tablet
      : circleBGBack.desktop

    // Add background circles to the world.
    Composite.add(
      world,
      createBackgroundCircle(
        bgFront.x,
        bgFront.y,
        bgFront.radius,
        bgFront.color
      )
    )
    Composite.add(
      world,
      createBackgroundCircle(bgBack.x, bgBack.y, bgBack.radius, bgBack.color)
    )

    // Clean up the Matter.js scene when the component unmounts.
    return () => {
      clearInterval(interval) // Stop the motion interval.
      Render.stop(render) // Stop rendering.
      Runner.stop(runner) // Stop the physics simulation.
      Engine.clear(engine) // Clear the engine.
      Composite.clear(world, false) // Remove all objects from the world.
      render.canvas.remove() // Remove the canvas from the DOM.
      render.textures = {} // Clear textures.
      setnameCircle(null)
    }
  }, [
    windowWidth,
    windowHeight,
    movile,
    tablet,
    windowWidthLaptop,
    windowWidthMovile
  ]) // The effect depends on changes in window dimensions and device type.

  console.log('nameCircle', nameCircle)

  return (
    <div className="TechnologiesHome">
      <div className="front-container">
        <div
          style={{
            marginTop: movile
              ? windowWidthMovile - windowWidthMovile * 2 + 150
              : -240
          }}
          className="front"
        >
          {RenderLetters('FRONT', ['#0083ff', '#fff'])}
        </div>
      </div>

      <div
        style={{ position: 'relative' }}
        ref={sceneRef}
        className="canvas-container"
      >
        {nameCircle !== null && (
          <h1
            className={`text-hover ${nameCircle}`}
            style={{
              left: tooltipPosition.x,
              top: tooltipPosition.y,
              background: hoverBgColor ?? '#fff',
              color: hoverTextColor ?? '#000'
            }}
          >
            {nameCircle}
          </h1>
        )}
      </div>

      <div className="back-container">
        <div
          style={{
            marginTop: movile
              ? windowWidthMovile - windowWidthMovile / 2 + 100
              : 240
          }}
          className="back"
        >
          {RenderLetters('BACK', ['#88ff50', '#fff'])}
        </div>
      </div>

      <div className="end-container">
        <div className="end">
          {RenderLetters('END', ['#007ACC', '#fff', '#88ff50'])}
        </div>
      </div>
    </div>
  )
}
