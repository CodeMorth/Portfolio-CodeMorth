'use client'

import React, { useEffect, useRef, useState } from 'react';
import Matter, { Engine, Render, Runner, MouseConstraint, Mouse, Composite, Composites, Query, Body } from 'matter-js';
import { useWindowSize } from '@/Hooks'; 
import { calculatePositionsCircles, circlesGenerator, constrainsArray, createBackgroundCircle, perpetueMovement, RenderLetters } from '@/utils/technologies';
import MatterWrap from 'matter-wrap'; // Matter.js plugin for wrapping objects at canvas edges.
import { BridgeBuilder } from '@/utils/technologies/BridgeBuilder';
import { circleBGBack, circleBGFront, configsCircles, responsiveSettings } from '@/data/technologies'; // Configuration data for circles and responsiveness.
import { HoveredTechDataType } from '@/interface/app/technologies';
import { TechData } from '@/interface/Data';

/**
 * TechnologiesHome component: renders a canvas with dynamic physics-based interactions using Matter.js.
 * The component adapts to different screen sizes and generates a bridge with circular shapes that float and interact.
 */
export const TechnologiesHome: React.FC = () => {
  // Extract the window dimensions and device type (mobile, tablet) from the custom hook.
  const { windowWidth, windowHeight, movile, tablet } = useWindowSize();

  // Refs to store canvas elements, Matter.js engine, and circle objects.
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Engine | null>(null);
  const runnerRef = useRef<Runner | null>(null);
  const circlesRef = useRef<Body[]>([]);

  // State for managing the currently hovered technology data.
  const [hoveredTechData, setHoveredTechData] = useState<HoveredTechDataType>({
    Front: { name: null, bgColor: null, textColor: null },
    Middle: { name: null, bgColor: null, textColor: null },
    Back: { name: null, bgColor: null, textColor: null },
  });

  // Adjust the canvas width based on window size for different devices.
  const windowWidthMovile = windowWidth > 640 ? 640 : windowWidth;
  const windowWidthLaptop = windowWidth > 870 ? 890 : windowWidth;
  const windowWidthResponsive = Math.min(windowWidth, movile ? 640 : tablet ? 890 : windowWidth);

  useEffect(() => {
    // Load the MatterWrap plugin for wrapping objects at canvas edges.
    try {
      if (typeof MatterWrap !== 'undefined') {
        Matter.use('matter-wrap');
      } else {
        Matter.use(require('matter-wrap'));
      }
    } catch (e) {}

    // Initialize the Matter.js engine and world.
    const engine = Engine.create();
    engineRef.current = engine;
    const world = engine.world;

    // Disable gravity to allow objects to float.
    engine.gravity.x = 0;
    engine.gravity.y = 0;

    // Set canvas height based on the device type (mobile, tablet, or desktop).
    const heightResponsive = movile ? 900 : tablet ? 1350 : windowHeight - 100;

    // Create a Matter.js renderer to render the scene.
    const render = Render.create({
      element: sceneRef.current as HTMLDivElement, // Attach the canvas to the sceneRef.
      engine: engine,
      options: {
        width: windowWidthResponsive,
        height: heightResponsive,
        showAngleIndicator: false,
        wireframes: false,
        background: '#000814', // Set background color.
      },
    });

    // Run the renderer.
    Render.run(render);

    // Create a runner to run the Matter.js simulation.
    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);

    // Get device-specific settings for bridge creation.
    const deviceSettings = movile ? responsiveSettings.movile : tablet ? responsiveSettings.tablet : responsiveSettings.desktop;
    const { numberOfRectangles, radius, leftPosition, rightPosition } = deviceSettings;

    // Create collision groups for the bridges.
    const group = Body.nextGroup(true);

    // Create two bridges using the BridgeBuilder function.
    const bridges = [
      BridgeBuilder(160, 290, numberOfRectangles, '#0083ff', group),
      BridgeBuilder(160, 290, numberOfRectangles, '#88ff50', group),
    ];

    // Chain the bridge segments together for physical interaction.
    bridges.forEach((bridge, index) => {
      Composites.chain(bridge, 0.3, 0, -0.3, 0, {
        stiffness: 1,
        length: 0.0001,
        render: { visible: false },
      });

      // Add constraints to the bridge for positioning and interaction.
      const constrains = constrainsArray(
        index === 0 ? leftPosition.x : rightPosition.x,
        index === 0 ? leftPosition.y : rightPosition.y,
        index === 0 ? 'left' : 'right',
        radius,
        bridge,
        numberOfRectangles
      );
      Composite.add(engine.world, [bridge, ...constrains]);
    });

    // Generate floating circles with a delay.
    setTimeout(() => {
      configsCircles.forEach(({ x, y, svg, spawnRangeX = 1, spawnRangeY = 1 }) => {
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
        );
      });
    }, 50);

    // Add mouse controls to interact with the objects in the canvas.
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.1, render: { visible: false } },
    });
    Composite.add(world, mouseConstraint);
    render.mouse = mouse;

    // Update the hovered technology data when the mouse moves over a circle.
    Matter.Events.on(render, 'afterRender', () => {
      const mousePosition = { x: mouse.position.x + window.scrollX, y: mouse.position.y + window.scrollY };
      let hoveredData = { name: null, bgColor: null, textColor: null, typeTech: null } as TechData;

      // Check if the mouse is hovering over any circle.
      circlesRef.current.forEach((circle:any) => {
        if (Query.point([circle], mousePosition).length > 0) {
          hoveredData = { name: circle.name, bgColor: circle.bgColor, textColor: circle.textColor, typeTech: circle.typeTech };
        }
      });

      // Update the state based on the hovered circle.
      setHoveredTechData((prev) => ({
        ...prev,
        ...(hoveredData.typeTech === null
          ? { Front: hoveredData, Middle: hoveredData, Back: hoveredData }
          : { [hoveredData.typeTech]: hoveredData }),
      }));
    });

    // Focus the camera on a specific part of the canvas.
    Render.lookAt(render, { min: { x: 0, y: 0 }, max: { x: 800, y: 600 } });

    // Create perpetual motion for circles by applying small forces.
    const interval = setInterval(() => perpetueMovement(0.0001, circlesRef), 1);

    // Add background circles for aesthetic purposes.
    const bgSettings = {
      front: movile ? circleBGFront.movile : tablet ? circleBGFront.tablet : circleBGFront.desktop,
      back: movile ? circleBGBack.movile : tablet ? circleBGBack.tablet : circleBGBack.desktop,
    };

    // Add the background circles to the world.
    Object.values(bgSettings).forEach((bg) => {
      Composite.add(engine.world, createBackgroundCircle(bg.x, bg.y, bg.radius, bg.color));
    });

    // Cleanup function to stop Matter.js simulation and clear the scene on component unmount.
    return () => {
      clearInterval(interval); // Stop the interval for perpetual motion.
      Render.stop(render); // Stop rendering.
      Runner.stop(runner); // Stop the physics runner.
      Engine.clear(engine); // Clear the Matter.js engine.
      Composite.clear(world, false); // Remove all objects from the world.
      render.canvas.remove(); // Remove the canvas element from the DOM.
      render.textures = {}; // Clear any textures used in the renderer.
    };
  }, [
    windowWidth,
    windowHeight,
    movile,
    tablet,
    windowWidthLaptop,
    windowWidthMovile,
    windowWidthResponsive,
  ]); // Effect dependency array to trigger re-render when window size or device type changes.

  // JSX structure rendering the front, back, and middle sections with the canvas.
  return (
    <div className="TechnologiesHome">
    <div className="front-container">
      <div style={{ marginTop: movile ? windowWidthResponsive - windowWidthResponsive * 2 + 150 : -240 }} className="front">
        {RenderLetters(hoveredTechData.Front.name || 'FRONT', ['#0083ff', '#fff'], hoveredTechData.Front.bgColor, hoveredTechData.Front.textColor)}
      </div>
    </div>
    <div ref={sceneRef} className="canvas-container" />
    <div className="back-container">
      <div style={{ marginTop: movile ? windowWidthResponsive - windowWidthResponsive / 2 + 100 : 240 }} className="back">
        {RenderLetters(hoveredTechData.Back.name || 'BACK', ['#88ff50', '#fff'], hoveredTechData.Back.bgColor, hoveredTechData.Back.textColor)}
      </div>
    </div>
    <div className="end-container">
      <div className="end">
        {RenderLetters(hoveredTechData.Middle.name || 'END', ['#007ACC', '#fff', '#88ff50'], hoveredTechData.Middle.bgColor, hoveredTechData.Middle.textColor)}
      </div>
    </div>
  </div>
  );
};
