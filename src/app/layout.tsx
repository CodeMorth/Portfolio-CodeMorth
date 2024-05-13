'use client'
import "@/../styles/index.css";
import  {LanguageProviderContext} from "../../Context/LanguageProvider";
import { NavBar } from "../../components/NavBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProviderContext>
          <NavBar/>
          {children}
        </LanguageProviderContext>
      </body>
    </html>
  );
}
