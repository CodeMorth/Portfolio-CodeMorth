'use client'

// Import necessary hooks and utility functions
import { usePathname } from 'next/navigation' // Hook to access the current pathname
import { useLanguage } from '@/Hooks' // Custom hook to manage language settings
import { getMetadata } from '@/utils/getMetadata' // Function to fetch metadata based on language and path

// Component that handles the metadata for the current page
export const Metadata = () => {
  // Get the current pathname using the usePathname hook
  const pathname = usePathname()

  // Get the current language setting using the useLanguage hook
  const { typeLanguage } = useLanguage()

  // Call the getMetadata function to retrieve metadata based on the current language and pathname
  const metadata = getMetadata(typeLanguage, pathname)

  return (
    <>
      {/* Set the document title dynamically based on the fetched metadata */}
      <title>{metadata.title}</title>
      {/* Set the meta description dynamically based on the fetched metadata */}
      <meta name="description" content={metadata.description} />
    </>
  )
}
