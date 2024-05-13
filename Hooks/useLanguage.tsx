import { useContext } from 'react';
import languageEnglish from "@/../Language/languageEnglish.json"
import languageSpanish from "@/../Language/languageSpanish.json"
import { LanguageContext } from '../Context/LanguageProvider';

const useLanguage = () => {

const {typeLanguage,settypeLanguage} = useContext(LanguageContext);

let languageData;

if(typeLanguage === "Spanish")languageData = languageSpanish;

if(typeLanguage === "English")languageData = languageEnglish;

  return {typeLanguage,settypeLanguage,languageData}
}

export default useLanguage