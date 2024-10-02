'use client'
import { useLanguage } from '@/Hooks' // Import the custom hook for managing language state
import { ProjectCard } from '@/components/page/projects' // Import the ProjectCard component for rendering project cards
import { ProjectCardType } from '@/interface/Language' // Import the interface defining the structure of project card data
import { Navigate } from '@/components/global' // Import the Navigate component for routing

export const ProjectHome = () => {
  const { languageData } = useLanguage() // Get the current language data using the custom hook

  return (
    <div className="ProjectHome">
      <h1>{languageData?.projectLanguage.title}</h1>
      <div className="projectCard-container">
        {languageData?.projectLanguage.projectCard.map( // Map over the project card data to create cards
          (data: ProjectCardType, index: number) => { // Destructure each card's data and index
            return (
              <Navigate href={data.href} key={index}> {/* Wrap each ProjectCard in the Navigate component for routing */}
                <ProjectCard
                  bg_color={data.bg_color}
                  border_color={data.border_color}
                  font_color={data.font_color}
                  image={data.image}
                  title={data.title}
                  filter_shadow={data.filter_shadow}
                  imagesData={data.imagesData}
                  leftOrigth={data.leftOrigth}
                  txtDescription={data.txtDescription}
                />
              </Navigate>
            )
          }
        )}
      </div>
    </div>
  )
}
