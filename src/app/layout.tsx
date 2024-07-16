import "@/styles/index.css";
import { NavBar } from '@/components/Globals';
import { LanguageProviderContext } from '@/Context';
import { PrimeReactProvider } from "primereact/api";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProviderContext>
          <PrimeReactProvider>
            <NavBar/>
            <div className="children-container ">{children}</div>
          </PrimeReactProvider>
        </LanguageProviderContext>
      </body>
    </html>
  );
}
