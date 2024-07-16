import { useContext } from 'react';
import languageEnglish from "@/Language/languageEnglish.json"
import languageSpanish from "@/Language/languageSpanish.json"
import { LanguageContext } from '../../Context/LanguageProvider';

export const useLanguage = () => {

const {typeLanguage,settypeLanguage} = useContext(LanguageContext);

let languageData;

if(typeLanguage === true)languageData = languageSpanish;

if(typeLanguage === false)languageData = languageEnglish;

  return {typeLanguage,settypeLanguage,languageData}
}

