// Import necessary hooks and context providers from React and your application
import { useContext } from 'react'; // Import the useContext hook for accessing context values
import { LanguageContext } from '@/Context/LanguageProvider'; // Import the LanguageContext to access language settings
import PackLanguage from '@/Language/PackLanguage.json'; // Import language pack data from a JSON file
import { DataLanguageType } from '@/interface/Language'; // Import the DataLanguageType for type safety

// Custom hook to manage language settings in the application
export const useLanguage = () => {
  // Destructure the context to get the current language type and the function to change it
  const { typeLanguage, settypeLanguage } = useContext(LanguageContext);

  // Initialize languageData with a default value (e.g., Spanish)
  let languageData: DataLanguageType = PackLanguage.Spanish as DataLanguageType; 

  // Set languageData based on the value of typeLanguage
  if (typeLanguage === true) {
    // If typeLanguage is true, set languageData to Spanish
    languageData = PackLanguage.Spanish as DataLanguageType;
  }

  if (typeLanguage === false) {
    // If typeLanguage is false, set languageData to English
    languageData = PackLanguage.English as DataLanguageType;
  }

  // Function to toggle the current language setting
  const changeLanguage = () => {
    // Toggle the typeLanguage boolean value to switch languages
    settypeLanguage((prev: boolean) => !prev);
  };

  // Return the current language type, changeLanguage function, and language data
  return { typeLanguage, changeLanguage, languageData }; 
};
