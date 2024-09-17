'use client'
import { useLanguage } from '@/Hooks/Global'
import React from 'react'
import { ProjectCard } from '@/components/page/projects'

export const ProjectHome = () => {
  const { languageData } = useLanguage()

  return (
    <div className="ProjectHome">
      <h1>PROYECTOS</h1>
      <div className="projectCard-container">
        <ProjectCard
          bg_color="rgba(4, 245, 242, 0.03)"
          border_color="#04F5F2"
          font_color="#04F5F2"
          image="Logo_TailwindConverter.svg"
          title="TailConf"
        />
        <ProjectCard
          bg_color="rgba(255, 82, 176, 0.03)"
          border_color="#FF52B0"
          font_color="#FF52B0"
          image="Logo_DevFriends.svg"
          title="TailConf"
        />
      </div>
    </div>
  )
}
