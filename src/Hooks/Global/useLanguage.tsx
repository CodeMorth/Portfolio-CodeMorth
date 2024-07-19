import { useContext } from 'react';
import languageEnglish from "@/Language/languageEnglish.json"
import languageSpanish from "@/Language/languageSpanish.json"
import { LanguageContext } from '../../Context/LanguageProvider';
import { LanguageType } from '@/interface/Language';

export const useLanguage = () => {

const {typeLanguage,settypeLanguage} = useContext(LanguageContext);

let languageData;

if(typeLanguage === true)languageData = languageSpanish as LanguageType;

if(typeLanguage === false)languageData = languageEnglish as LanguageType;

  return {typeLanguage,settypeLanguage,languageData}
}

