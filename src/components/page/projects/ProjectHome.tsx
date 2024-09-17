'use client'
import { useLanguage } from '@/Hooks/Global'
import React from 'react'
import { ProjectCard } from '@/components/page/projects'
import Link from 'next/link'

export const ProjectHome = () => {
  const { languageData } = useLanguage()

  const TailConfImages = [
    {
      src: '/Tailwind_Logo.svg'
    },
    {
      src: '/Next_Logo.svg'
    },
    {
      src: '/HTML5_Logo.svg'
    },
    {
      src: '/TS_Logo.svg'
    },
    {
      src: '/React_Logo.svg'
    }
  ]

  const DevFriendImages = [
    {
      src: '/Tailwind_Logo.svg'
    },
    {
      src: '/Next_Logo.svg'
    },
    {
      src: '/TS_Logo.svg'
    },
    {
      src: '/Cloudinary_Logo.svg'
    },
    {
      src: '/Express_Logo.svg'
    },
    {
      src: '/MySql_Logo.svg'
    },
    {
      src: '/Railway_Logo.svg'
    }
  ]

  return (
    <div className="ProjectHome">
      <h1>PROYECTOS</h1>
      <div className="projectCard-container">
        <Link
          href="https://web-generador-de-clases-tailwind-electron.vercel.app/"
          target="_blank"
        >
          <ProjectCard
            bg_color="rgba(4, 245, 242, 0.03)"
            border_color="#04F5F2"
            font_color="#04F5F2"
            image="Logo_TailwindConverter.svg"
            title="TailConf"
            filter_shadow="drop-shadow(5px 5px 10px rgba(4, 245, 242, 0.3))"
            imagesData={TailConfImages}
          />
        </Link>
        <Link href={''} target="_blank">
          <ProjectCard
            bg_color="rgba(255, 82, 176, 0.03)"
            border_color="#FF52B0"
            font_color="#FF52B0"
            image="Logo_DevFriends.svg"
            title="DevFriend"
            filter_shadow="drop-shadow(5px 5px 10px rgba(255, 82, 176, 0.3))"
            imagesData={DevFriendImages}
          />
        </Link>
      </div>
    </div>
  )
}
