'use client' // Indicates that this file should be treated as a client component in Next.js

import { createContext, useState } from 'react' // Importing createContext and useState from React

// Creating a LanguageContext to hold the language-related state and functions
export const LanguageContext = createContext<any>({})

// LanguageProviderContext component that provides language-related state to its children
export function LanguageProviderContext({ children }: any) {
  // State to manage the current language type (true for Spanish, false for English)
  const [typeLanguage, settypeLanguage] = useState<boolean>(true)

  // State to manage the visibility of the navigation bar (open or closed)
  const [openNavBar, setopenNavBar] = useState<boolean>(false)

  const chageOpenNavBar = () => {
    setopenNavBar((prev: boolean) => !prev)
  }

  // Providing the language state and functions to the context's consumers
  return (
    <LanguageContext.Provider
      value={{ typeLanguage, settypeLanguage, openNavBar, setopenNavBar, chageOpenNavBar }}
    >
      {children}
    </LanguageContext.Provider>
  )
}
