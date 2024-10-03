import '@/styles/index.css'
import { NavBar } from '@/components/global'
import { LanguageProviderContext, NavigationContextProvider } from '@/Context'
import { PrimeReactProvider } from 'primereact/api'
import { Toaster } from 'sonner'

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es">
      <body className="h-full overflow-x-hidden">
        <LanguageProviderContext>
          <PrimeReactProvider>
            <NavigationContextProvider>
              <NavBar />
              {children}
              <Toaster position="top-center" richColors />
            </NavigationContextProvider>
          </PrimeReactProvider>
        </LanguageProviderContext>
      </body>
    </html>
  )
}
