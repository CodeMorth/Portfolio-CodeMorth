'use client'
import { useLanguage } from '@/Hooks'
import React from 'react'
import { ProjectCard } from '@/components/page/projects'
import Link from 'next/link'
import { ProjectCardType } from '@/interface/Language'

export const ProjectHome = () => {
  const { languageData } = useLanguage()

  return (
    <div className="ProjectHome">
      <h1>{languageData?.projectLanguage.tittle}</h1>
      <div className="projectCard-container">
        {languageData?.projectLanguage.projectCard.map(
          (data: ProjectCardType, index: number) => {
            return (
              <Link
                href="https://web-generador-de-clases-tailwind-electron.vercel.app/"
                target="_blank"
                key={index}
              >
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
              </Link>
            )
          }
        )}
      </div>
    </div>
  )
}
