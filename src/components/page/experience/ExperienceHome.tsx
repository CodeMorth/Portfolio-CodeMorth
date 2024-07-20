'use client'
import { ExperienceCard } from '@/components/page/experience/'
import { useLanguage } from '@/Hooks/Global'
import { ExperienceCardLanguage } from '@/interface/Language'

export const ExperienceHome = () => {
  const { languageData } = useLanguage()
  return (
    <div className="ExperienceHome main-page">
      <h1>{languageData?.experienceLanguage.title}</h1>
      <div className="experienceCard-container">
        {languageData?.experienceLanguage.experienceCardLanguage?.map(
          (data: ExperienceCardLanguage, index: number) => (
            <ExperienceCard
              key={index}
              title={data.title}
              subtitle={data.subtitle}
              src={data.src}
              alt={data.alt}
              description={data.description}
            />
          )
        )}
      </div>
    </div>
  )
}
