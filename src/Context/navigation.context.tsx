'use client'
import { Loading } from '@/components/global/loading' // Importing the Loading component
import { useRouter, usePathname } from 'next/navigation'
import { ReactNode, createContext, useContext, useState } from 'react'

// Enum for loading states to manage the loading process
export enum LOADING_STATES {
  INIT = 'INITIALIZED', // Initial state before loading starts
  LOADING = 'PENDING', // State when loading is in progress
  LOADED = 'COMPLETE' // State when loading has completed
}

// Interface for the context type, defining methods and state
export interface NavigationContextType {
  goToRoute: (route: string) => void // Function to navigate to a new route
  loading: LOADING_STATES // Current loading state
  setLoading: React.Dispatch<React.SetStateAction<LOADING_STATES>> // Function to set the loading state
}

// Creating the NavigationContext with default values
export const NavigationContext = createContext<NavigationContextType>({
  goToRoute: (route: string) => {}, // Default no-op function for goToRoute
  loading: LOADING_STATES.INIT, // Default loading state
  setLoading: () => {} // Default no-op function for setLoading
})

// Provider component for NavigationContext
export const NavigationContextProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const router = useRouter() // Hook for accessing the router object
  const pathname = usePathname() // Hook for accessing the current pathname

  // State to track the current loading state
  const [loading, setLoading] = useState<LOADING_STATES>(LOADING_STATES.INIT)
  const animationDuration = 900 // Duration for the loading animation

  // Function to navigate to a new route
  const goToRoute = async (path: string) => {
    if (path === pathname) return // Prevent navigation to the same path

    setLoading(LOADING_STATES.LOADING) // Update loading state to LOADING
    setTimeout(() => {
      router.push(path) // Navigate to the new path after the animation duration
    }, animationDuration)
  }

  // Context value provided to consumers
  const contextValue = {
    goToRoute, // Navigation function
    loading, // Current loading state
    setLoading // Function to set loading state
  }

  return (
    <NavigationContext.Provider value={contextValue}>
      <Loading /> {/* Rendering the Loading component */}
      {children}
    </NavigationContext.Provider>
  )
}

// Custom hook to use the NavigationContext
export const useNavigationContext = () => useContext(NavigationContext) // Returns the context value
