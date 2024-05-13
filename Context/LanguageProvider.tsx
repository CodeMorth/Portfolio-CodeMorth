'use client'
import { createContext, useState } from "react";

export const LanguageContext = createContext<any>({});

export function LanguageProviderContext ({children}:any) {
  
  const [typeLanguage, settypeLanguage] = useState("Spanish");

  return (
    <LanguageContext.Provider value={{typeLanguage,settypeLanguage}}>
      {children}
    </LanguageContext.Provider>
  );
};
