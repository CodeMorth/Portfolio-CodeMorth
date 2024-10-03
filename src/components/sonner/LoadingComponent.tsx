'use client'
import { useLanguage } from '@/Hooks'

export const LoadingComponent = () => {
  const { languageData } = useLanguage()

  return (
    <div className={`LoadingComponent${languageData?.customLoading}`}>
      <div className="custom-loader" />
      <div className={languageData?.customLoading} />
    </div>
  )
}
