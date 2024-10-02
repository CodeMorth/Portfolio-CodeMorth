'use client'
import { ExperienceCard } from '@/components/page/experience/' // Import the ExperienceCard component for rendering experience cards
import { useLanguage } from '@/Hooks' // Import the custom hook for managing language state
import { ExperienceCardLanguage } from '@/interface/Language' // Import the interface defining the structure of experience card language data

export const ExperienceHome = () => {
  const { languageData } = useLanguage() // Get the current language data using the custom hook

  return (
    <div className="ExperienceHome">
      <h1>{languageData?.experienceLanguage.title}</h1> 
      <div className="experienceCard-container">
        {languageData?.experienceLanguage.experienceCardLanguage?.map( // Map over the experience card language data to create cards
          (data: ExperienceCardLanguage, index: number) => ( // Destructure each card's data and index
            <ExperienceCard
              key={index}
              title={data.title}
              subtitle={data.subtitle}
              src={data.src} // Pass the image source prop to ExperienceCard
              alt={data.alt}
              description={data.description}
            />
          )
        )}
      </div>
    </div>
  )
}
