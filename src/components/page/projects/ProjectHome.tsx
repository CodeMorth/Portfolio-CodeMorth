'use client'
import { useLanguage } from '@/Hooks'
import React from 'react'
import { ProjectCard } from '@/components/page/projects'
import Link from 'next/link'

export const ProjectHome = () => {
  const { languageData } = useLanguage()

  const TailConfImages = [
    {
      src: '/Tailwind_Logo.svg',
      filter_shadow: 'drop-shadow(0px 0px 30px rgba(0, 255, 212,0.9))'
    },
    {
      src: '/Electron_Logo.svg',
      filter_shadow: 'drop-shadow(0px 0px 30px rgba(47, 50, 66, 1))'
    },
    {
      src: '/React_Logo.svg',
      filter_shadow: 'drop-shadow(0px 0px 30px rgba(0, 216, 255, 0.5))'
    },
    {
      src: '/TS_Logo.svg',
      filter_shadow: 'drop-shadow(0px 0px 30px rgba(0, 122, 204, 0.5))'
    },
    {
      src: '/Next_Logo.svg',
      filter_shadow: 'drop-shadow(0px 0px 30px rgba(255, 255, 255,0.3))'
    }
  ]

  const DevFriendImages = [
    {
      src: '/Railway_Logo.svg',
      filter_shadow: 'drop-shadow(0px 0px 30px rgba(255, 255, 255,0.3))'
    },
    {
      src: '/MySql_Logo.svg',
      filter_shadow: 'drop-shadow(0px 0px 30px rgba(0, 159, 202, 1))'
    },
    {
      src: '/Tailwind_Logo.svg',
      filter_shadow: 'drop-shadow(0px 0px 30px rgba(0, 255, 212,0.9))'
    },
    {
      src: '/Express_Logo.svg',
      filter_shadow: 'drop-shadow(0px 0px 30px rgba(255, 255, 255,0.5))'
    },
    {
      src: '/Cloudinary_Logo.svg',
      filter_shadow: 'drop-shadow(0px 0px 30px rgba(52, 72, 197, 1))'
    },
    {
      src: '/Next_Logo.svg',
      filter_shadow: 'drop-shadow(0px 0px 30px rgba(255, 255, 255,0.3))'
    },
    {
      src: '/TS_Logo.svg',
      filter_shadow: 'drop-shadow(0px 0px 30px rgba(0, 122, 204, 0.5))'
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
            leftOrigth='left'
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
            leftOrigth='right'

          />
        </Link>
      </div>
    </div>
  )
}
