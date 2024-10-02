import { useContext } from 'react'; // Importing useContext hook from React for accessing context
import { LanguageContext } from '@/Context/LanguageProvider'; // Importing LanguageContext to access language state
import PackLanguage from '@/Language/PackLanguage.json'; // Importing language pack JSON file containing translations
import { DataLanguageType } from '@/interface/Language'; // Importing TypeScript type for language data

// Custom hook for managing language settings in the application
export const useLanguage = () => {
  // Accessing the current language type and the function to set the language type from LanguageContext
  const { typeLanguage, settypeLanguage } = useContext(LanguageContext);

  let languageData; // Variable to hold the language data based on the current language type

  // Conditional statement to determine which language data to use based on the typeLanguage boolean
  if (typeLanguage === true) {
    // If typeLanguage is true, use Spanish language data
    languageData = PackLanguage.Spanish as DataLanguageType; 
  }

  if (typeLanguage === false) {
    // If typeLanguage is false, use English language data
    languageData = PackLanguage.English as DataLanguageType; 
  }

  // Function to toggle the current language type
  const changeLanguage = () => {
    // Updating typeLanguage by toggling its boolean value
    settypeLanguage((prev: boolean) => !prev); 
  };

  // Returning an object containing the current language type, the changeLanguage function, and the current language data
  return { typeLanguage, changeLanguage, languageData }; 
};
