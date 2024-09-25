'use client'
import { LOADING_STATES, useNavigationContext } from '@/Context'
import Link from 'next/link'
import { useLayoutEffect } from 'react'
import { usePathname } from 'next/navigation'

type NavigateProps = {
  href: string
  children: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  onMouseEnter?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  onMouseLeave?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  onMouseDown?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  onMouseUp?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}


export function Navigate({
  href,
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp
}: NavigateProps) {
  const { goToRoute, setLoading } = useNavigationContext()
  const pathname = usePathname()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (onClick) onClick(e) // Ejecutar onClick si está definido
    goToRoute(href)
  }

  useLayoutEffect(() => {
    setLoading(LOADING_STATES.LOADED)
  }, [pathname])

  return (
    <Link prefetch passHref href={href} legacyBehavior>
      <a
        onClick={handleClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        {children}
      </a>
    </Link>
  )
}
