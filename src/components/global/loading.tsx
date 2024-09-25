'use client'
import { LOADING_STATES, useNavigationContext } from '@/Context'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export const Loading = () => {
  const { loading, setLoading } = useNavigationContext()
  const background = useRef<HTMLDivElement>(null)

  const _init = () => {
    /*Add your initial state here */
    gsap.set(background.current, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
    })
  }

  const _enter = () => {
    /*Add your page enter animation*/
    gsap.to(background.current, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
      duration: 1,
      ease: 'power3.inOut'
    })
  }

  const _exit = () => {
    /*Add your page exit animations*/
    gsap.to(background.current, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration: 1,
      ease: 'power3.inOut',
      onComplete: () => {
        if (loading === LOADING_STATES.INIT) setLoading(LOADING_STATES.LOADED)
      }
    })
  }

  useEffect(() => {
    _init()
  }, [])

  useEffect(() => {
    if (loading === LOADING_STATES.INIT) _exit()
    if (loading === LOADING_STATES.LOADED) _enter()
    if (loading === LOADING_STATES.LOADING) _exit()
  }, [loading])

  return (
    <div
      ref={background}
      className="h-screen w-screen fixed flex flex-col gap-4 items-center justify-center bg-[#FFC300] z-50"
    ></div>
  )
}
