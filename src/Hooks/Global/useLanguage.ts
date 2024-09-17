import { useContext } from 'react'
import { LanguageContext } from '@/Context/LanguageProvider'
import PackLanguage from '@/Language/PackLanguage.json'
import { DataLanguageType } from '@/interface/Language'

export const useLanguage = () => {
  const { typeLanguage, settypeLanguage } = useContext(LanguageContext)

  let languageData

  if (typeLanguage === true)languageData = PackLanguage.Spanish as DataLanguageType

  if (typeLanguage === false)languageData = PackLanguage.English as DataLanguageType

  const changeLanguage = () => {
    settypeLanguage((prev: boolean) => !prev)
  }

  return { typeLanguage, changeLanguage, languageData }
}
