'use client'
import { LOADING_STATES, useNavigationContext } from '@/Context' // Import loading states and navigation context
import Link from 'next/link'
import { useLayoutEffect } from 'react'
import { usePathname } from 'next/navigation' // Import usePathname hook from Next.js for getting the current pathname

// Define the type for props that the Navigate component will receive
type NavigateProps = {
  href: string // URL to navigate to
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
  // Destructure goToRoute and setLoading from the navigation context
  const { goToRoute, setLoading } = useNavigationContext()
  const pathname = usePathname() // Get the current pathname

  // Handle the click event on the link
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault() // Prevent the default link behavior
    if (onClick) onClick(e)
    goToRoute(href) // Navigate to the specified URL
  }

  // useLayoutEffect to set loading state to LOADED when the pathname changes
  useLayoutEffect(() => {
    setLoading(LOADING_STATES.LOADED) // Update loading state to LOADED
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
