import '@/styles/index.css'
import { NavBar } from '@/components/global'
import { LanguageProviderContext, NavigationContextProvider } from '@/Context'
import { PrimeReactProvider } from 'primereact/api'

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es">
      <body className="h-full overflow-x-hidden overflow-y-hidden">
        <LanguageProviderContext>
          <PrimeReactProvider>
            <NavigationContextProvider>
              <NavBar />
              {children}
            </NavigationContextProvider>
          </PrimeReactProvider>
        </LanguageProviderContext>
      </body>
    </html>
  )
}
