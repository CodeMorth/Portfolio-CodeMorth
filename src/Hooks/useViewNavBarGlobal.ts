import { useContext } from "react"; // Importing useContext hook from React for accessing context
import { LanguageContext } from "@/Context/LanguageProvider"; // Importing LanguageContext to manage navigation bar state

// Custom hook to manage the state of the global navigation bar
export const ViewNavBarGlobal = () => {
  // Destructuring openNavBar state and setopenNavBar function from LanguageContext
  const { openNavBar, setopenNavBar,chageOpenNavBar } = useContext(LanguageContext);

  // Returning an object containing the state and function for managing the navigation bar
  return { setopenNavBar, openNavBar,chageOpenNavBar }; 
};
