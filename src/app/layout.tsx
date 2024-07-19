import '@/styles/index.css'
import { NavBar } from '@/components/global'
import { LanguageProviderContext } from '@/Context'
import { PrimeReactProvider } from 'primereact/api'

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es">
      <body>
        <LanguageProviderContext>
          <PrimeReactProvider>            
              <NavBar />
              {children}            
          </PrimeReactProvider>
        </LanguageProviderContext>
      </body>
    </html>
  )
}
