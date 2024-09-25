'use client'
import { useLanguage } from '@/Hooks'
import React from 'react'
import { ProjectCard } from '@/components/page/projects'
import { ProjectCardType } from '@/interface/Language'
import { Navigate } from '@/components/global'

export const ProjectHome = () => {
  const { languageData } = useLanguage()

  return (
    <div className="ProjectHome">
      <h1>{languageData?.projectLanguage.tittle}</h1>
      <div className="projectCard-container">
        {languageData?.projectLanguage.projectCard.map(
          (data: ProjectCardType, index: number) => {
            return (
              <Navigate href={data.href} key={index}>
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
