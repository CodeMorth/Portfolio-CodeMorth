import '@/styles/index.css'
import { NavBar } from '@/components/global'
import { LanguageProviderContext, NavigationContextProvider } from '@/Context'
import { PrimeReactProvider } from 'primereact/api'
import { Toaster } from 'sonner'
import { LoadingComponent } from '@/components/sonner/LoadingComponent'

export const metadata = {
  icons: {
    icon: '/general/CodeMorthLogo.svg',
  },
}

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
              <Toaster
                position="top-center"
                richColors
                toastOptions={{
                  classNames: {
                    loading: 'loading-toast',
                    success: 'success-toast',
                    error: 'error-toast'
                  }
                }}
                icons={{
                  loading: <LoadingComponent />
                }}
              />
            </NavigationContextProvider>
          </PrimeReactProvider>
        </LanguageProviderContext>
      </body>
    </html>
  )
}
