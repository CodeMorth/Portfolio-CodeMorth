'use client'
import { createContext, useState } from "react";

export const LanguageContext = createContext<any>({});

export function LanguageProviderContext ({children}:any) {
  
  const [typeLanguage, settypeLanguage] = useState<boolean>(true);
  const [openNavBar, setopenNavBar] = useState<boolean>(false);


  return (
    <LanguageContext.Provider value={{typeLanguage,settypeLanguage,openNavBar,setopenNavBar}}>
      {children}
    </LanguageContext.Provider>
  );
};
