import '@/styles/index.css'
import { NavBar, PageTransition } from '@/components/global'
import { LanguageProviderContext } from '@/Context'
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
            <NavBar />
            <PageTransition>{children}</PageTransition>
          </PrimeReactProvider>
        </LanguageProviderContext>
      </body>
    </html>
  )
}
