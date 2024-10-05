'use client'
import { LOADING_STATES, useNavigationContext } from '@/Context' // Importing loading states and context for navigation
import { useEffect, useRef } from 'react'
import gsap from 'gsap' // Importing GSAP for animations

export const Loading = () => {
  // Destructure loading state and setLoading function from the navigation context
  const { loading, setLoading } = useNavigationContext()

  // Check if we are in the browser environment
  const isBrowser = typeof window !== 'undefined'

  // Audio player for transitions Out
  const transitionOut = isBrowser ? new Audio('/sounds/Transition1.mp3') : null

  // Create a reference for the background div
  const background = useRef<HTMLDivElement>(null)

  // Initialize the loading animations and states
  const _init = () => {
    /* Set the initial state of the background div using GSAP */
    gsap.set(background.current, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' // Initial clip path for the loading animation
    })
  }

  // Define the animation for entering the loading state
  const _enter = () => {
    /* Animation when the page is entering */
    gsap.to(background.current, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)', // Clip path animation to create a "reveal" effect
      duration: 1, // Duration of the animation
      ease: 'power3.inOut' // Easing function for smooth animation
    })
  }

  // Define the animation for exiting the loading state
  const _exit = () => {
    /* Animation when the page is exiting */
    gsap.to(background.current, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', // Clip path animation to create a "hide" effect
      duration: 1, // Duration of the exit animation
      ease: 'power3.inOut', // Easing function for smooth animation
      onComplete: () => {
        // When the exit animation is complete, set loading state to LOADED if it's currently INIT
        if (loading === LOADING_STATES.INIT) setLoading(LOADING_STATES.LOADED)
      }
    })
  }

  // useEffect to initialize the animations on component mount
  useEffect(() => {
    _init() // Call the _init function to set the initial state
  }, [])

  // useEffect to handle loading state changes
  useEffect(() => {
    // Call the _exit function when loading is INIT or LOADING
    if (loading === LOADING_STATES.INIT) {
      _exit()
    }
    // Call the _enter function when loading is LOADED
    if (loading === LOADING_STATES.LOADED) {
      _enter()
      transitionOut ? transitionOut.play() : null //Play the transition sound
    }
    // Call the _exit function again when loading is LOADING
    if (loading === LOADING_STATES.LOADING) {
      _exit()
    }
  }, [loading]) // Dependency on loading state

  return (
    // Render a full-screen div for the loading animation with background color
    <div
      ref={background} // Attach the ref to this div
      className="h-screen w-screen fixed flex flex-col gap-4 items-center justify-center bg-[#FFC300] "
      style={{
        zIndex: 100
      }}
    ></div>
  )
}
