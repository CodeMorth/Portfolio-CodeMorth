'use client'
import React, { useEffect, useRef } from 'react'
import Matter, {
  Engine,
  Render,
  Runner,
  MouseConstraint,
  Mouse,
  Composite,
  Bodies,
  Body,
  Composites
} from 'matter-js'
import routeSVG from '@/data/routeSVGFront.json'
import { useWindowSize } from '@/Hooks'
import { circlesGenerator, constrainsArray } from '@/utils/technologies'
import MatterWrap from 'matter-wrap'

export const TechnologiesHome: React.FC = () => {
  const { windowWidth, windowHeight, movile, tablet } = useWindowSize()

  const sceneRef = useRef<HTMLDivElement>(null)
  const engineRef = useRef<Engine | null>(null)
  const runnerRef = useRef<Runner | null>(null)
  const circlesRef = useRef<any[]>([]) // Usamos un ref para almacenar las referencias a los círculos

  const windowWidthMovile = windowWidth > 640 ? 640 : windowWidth
  const windowWidthLaptop = windowWidth > 870 ? 890 : windowWidth

  useEffect(() => {
    try {
      if (typeof MatterWrap !== 'undefined') {
        // either use by name from plugin registry (Browser global)
        Matter.use('matter-wrap')
      } else {
        // or require and use the plugin directly (Node.js, Webpack etc.)
        Matter.use(require('matter-wrap'))
      }
    } catch (e) {
      // could not require the plugin or install needed
    }

    const engine = Engine.create()
    engineRef.current = engine
    const world = engine.world

    engine.gravity.x = 0
    engine.gravity.y = 0

    const heightResponsive = movile ? 900 : tablet ? 1350 : windowHeight - 100
    const widthResponsive = movile
      ? windowWidthMovile
      : tablet
      ? windowWidthLaptop
      : windowWidth

    const render = Render.create({
      element: sceneRef.current as HTMLDivElement,
      engine: engine,
      options: {
        width: widthResponsive,
        height: heightResponsive,
        showAngleIndicator: false,
        wireframes: false, // Asegúrate de que las texturas sean visibles
        background: '#000814'
      }
    })

    Render.run(render)

    const runner = Runner.create()
    runnerRef.current = runner
    Runner.run(runner, engine)

    // add bodies
    const numberOfRectangles = movile ? 65 : tablet ? 56 : 52
    const group = Body.nextGroup(true)

    const bridgeLeft = Composites.stack(
      160,
      290,
      numberOfRectangles,
      1,
      0,
      0,
      (x: number, y: number) => {
        return Bodies.rectangle(x, y, 53, 13, {
          collisionFilter: { group: group },
          chamfer: { radius: 10 },
          density: 0.005,
          frictionAir: 0,
          render: {
            fillStyle: '#0083ff'
          }
        })
      }
    )

    const bridgeRight = Composites.stack(
      160,
      290,
      numberOfRectangles,
      1,
      0,
      0,
      (x: number, y: number) => {
        return Bodies.rectangle(x, y, 53, 13, {
          collisionFilter: { group: group },
          chamfer: { radius: 10 },
          density: 0.005,
          frictionAir: 0.05,
          render: {
            fillStyle: '#88ff50'
          }
        })
      }
    )

    Composites.chain(bridgeLeft, 0.3, 0, -0.3, 0, {
      stiffness: 1,
      length: 0.0001,
      render: {
        visible: false
      }
    })

    Composites.chain(bridgeRight, 0.3, 0, -0.3, 0, {
      stiffness: 1,
      length: 0.0001,
      render: {
        visible: false
      }
    })

    const radiusResponsive = movile ? 350 : tablet ? 300 : 270
    const positionXResponsiveLeft = movile ? 400 : tablet ? 400 : 250
    const positionYResponsiveLeft = movile ? 120 : tablet ? 270 : 300
    const positionXResponsiveRight = movile ? 400 : tablet ? 400 : 540
    const positionYResponsiveRight = movile ? 470 : tablet ? 570 : 300

    const constrainsLeft = constrainsArray(
      positionXResponsiveLeft,
      positionYResponsiveLeft,
      'left',
      radiusResponsive,
      bridgeLeft,
      numberOfRectangles
    )
    const constrainsRight = constrainsArray(
      positionXResponsiveRight,
      positionYResponsiveRight,
      'right',
      radiusResponsive,
      bridgeRight,
      numberOfRectangles
    )

    Composite.add(world, [bridgeLeft, ...constrainsLeft])
    Composite.add(world, [bridgeRight, ...constrainsRight])

    const circlePositionXFront = movile ? 400 : tablet ? 390 : 150
    const circlePositionYFront = movile ? -50 : tablet ? 170 : 250
    const circlePositionXMiddle = movile ? 400 : tablet ? 390 : 390
    const circlePositionYMiddle = movile ? 280 : tablet ? 450 : 220
    const circlePositionXBack = movile ? 400 : tablet ? 360 : 660
    const circlePositionYBack = movile ? 600 : tablet ? 700 : 280
    const circlePositionXOutLeft = movile ? 400 : tablet ? 0 : -250
    const circlePositionYOutLeft = movile ? -350 : tablet ? 390 : 250
    const circlePositionXOutRight = movile ? 400 : tablet ? 0 : 960
    const circlePositionYOutRight = movile ? 980 : tablet ? 400 : 280

    // engine.timing.timeScale = 0.000001;

    setTimeout(() => {
      // Tiempo de carga

      circlesGenerator(
        circlePositionXFront,
        circlePositionYFront,
        routeSVG.routeSVGFront,
        circlesRef,
        world,
        movile,
        tablet,
        render
      ) //Front
      circlesGenerator(
        circlePositionXMiddle,
        circlePositionYMiddle,
        routeSVG.routeSVGMiddle,
        circlesRef,
        world,
        movile,
        tablet,
        render
      ) //Middle
      circlesGenerator(
        circlePositionXBack,
        circlePositionYBack,
        routeSVG.routeSVGBack,
        circlesRef,
        world,
        movile,
        tablet,
        render
      ) //Back
      circlesGenerator(
        circlePositionXOutLeft,
        circlePositionYOutLeft,
        routeSVG.routeSVGOutLeft,
        circlesRef,
        world,
        movile,
        tablet,
        render,
        1000
      ) //Out Left
      circlesGenerator(
        circlePositionXOutRight,
        circlePositionYOutRight,
        routeSVG.routeSVGOutRight,
        circlesRef,
        world,
        movile,
        tablet,
        render,
        1000
      ) //Out Right
    }, 50)

    const mouse = Mouse.create(render.canvas)
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.1,
        render: { visible: false }
      }
    })

    Composite.add(world, mouseConstraint)

    render.mouse = mouse

    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: 800, y: 600 }
    })

    const perpetueMovement = (forceMagnitude: number) => {
      circlesRef.current.forEach((circle) => {
        const angle = Math.random() * Math.PI * 2 // Generar un ángulo aleatorio
        const force = {
          x: Math.cos(angle) * forceMagnitude,
          y: Math.sin(angle) * forceMagnitude
        }

        Body.applyForce(circle, circle.position, force) // Aplicar fuerza al círculo
      })
    }

    // Llama a perpetueMovement en cada cuadro
    const interval = setInterval(() => perpetueMovement(0.0001), 1) // Cada 1 ms, puedes ajustar el intervalo

    const circleBGFrontX = movile ? 400 : tablet ? 400 : 250
    const circleBGFrontY = movile ? 120 : tablet ? 270 : 300
    const circleBGBackX = movile ? 400 : tablet ? 400 : 540
    const circleBGBackY = movile ? 480 : tablet ? 560 : 300
    const radiusBGResponsive = movile ? 350 : tablet ? 300 : 270

    Composite.add(
      world,
      Bodies.circle(circleBGFrontX, circleBGFrontY, radiusBGResponsive, {
        isStatic: true, // No se moverá
        collisionFilter: {
          group: -1, // No colisiona con ningún otro objeto
          mask: 0, // No colisiona con nada
          category: 0 // Cuerpo solo visual
        },
        render: {
          fillStyle: 'rgba(0, 131, 255, 0.06)' // Color de relleno del círculo
        }
      })
    )

    Composite.add(
      world,
      Bodies.circle(circleBGBackX, circleBGBackY, radiusBGResponsive, {
        isStatic: true, // No se moverá
        collisionFilter: {
          group: -1, // No colisiona con ningún otro objeto
          mask: 0, // No colisiona con nada
          category: 0 // Cuerpo solo visual
        },
        render: {
          fillStyle: 'rgb(136, 255, 80, 0.06)' // Color de relleno del círculo
        }
      })
    )

    return () => {
      clearInterval(interval) // Limpia el intervalo cuando el componente se desmonta
      Render.stop(render)
      Runner.stop(runner)
      Engine.clear(engine)
      Composite.clear(world, false)
      render.canvas.remove()
      render.textures = {}
    }
  }, [
    windowWidth,
    windowHeight,
    movile,
    tablet,
    windowWidthLaptop,
    windowWidthMovile
  ])

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
          {Array.from('FRONT').map((letter, index) => (
            <h1
              style={{ color: index % 2 === 0 ? '#0083ff' : '#fff' }}
              key={index}
            >
              {letter}
            </h1>
          ))}
        </div>
      </div>
      <div ref={sceneRef} className="canvas-container" />
      <div className="back-container">
        <div
          style={{
            marginTop: movile
              ? windowWidthMovile - windowWidthMovile / 2 + 100
              : 240
          }}
          className="back"
        >
          {Array.from('BACK').map((letter, index) => (
            <h1
              style={{ color: index % 2 === 0 ? '#88ff50' : '#fff' }}
              key={index}
            >
              {letter}
            </h1>
          ))}
        </div>
      </div>
      <div className="end-container">
        <div className="end">
          {Array.from('END').map((letter, index) => (
            <h1
              style={{
                color:
                  index === 0 ? '#007ACC' : index === 1 ? '#fff' : '#88ff50'
              }}
              key={index}
            >
              {letter}
            </h1>
          ))}
        </div>
      </div>
    </div>
  )
}
