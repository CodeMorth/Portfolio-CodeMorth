'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLanguage, ViewNavBarGlobal } from '@/Hooks/Global'
import { lineDataType } from '@/interface/NavBar'
import { LanguageNavbar } from '@/interface/Language'
import { ChangeData } from '@/Utilities/NavBar/ChangeData'

export const NavBar = () => {
  const { languageData, settypeLanguage } = useLanguage()
  const { openNavBar, setopenNavBar } = ViewNavBarGlobal()
  const [isOn, setIsOn] = useState<boolean>(false)
  const [linePresioned, setlinePresioned] = useState<boolean>(false)
  const [lineData, setlineData] = useState<lineDataType>({leftLine: 3,widthLine: 9.3,rotateLine: 3})
  const [lineBackup, setlineBackup] = useState<lineDataType>({leftLine: 3,widthLine: 9.3,rotateLine: 3})

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.7 }}
        className="codemorth-logo-container-movil-navbar"
      >
        <Image
          src={'/CodeMorthLogo.svg'}
          alt="Logo de CodeMorth"
          width={1000}
          height={1000}
          onClick={() => setopenNavBar((prev: boolean) => !prev)}
        />
      </motion.div>
      <div
        onClick={() => setopenNavBar(false)}
        className={`NavBar ${openNavBar ? 'open' : 'close'}`}
      >
        <div
          onClick={(event) => event.stopPropagation()}
          className={`navbar-container ${openNavBar ? 'open' : 'close'}`}
        >
          <div className="container-switch-logo">
            <div className="switch-container">
              <h1 className={isOn ? '' : 'active'}>Es</h1>
              <div
                className="switch"
                data-on={isOn}
                onClick={() => {
                  setIsOn(!isOn), settypeLanguage((prev: boolean) => !prev)
                }}
              >
                <motion.div
                  className="handle"
                  layout
                  transition={{
                    type: 'spring',
                    stiffness: 700,
                    damping: 40
                  }}
                />
              </div>
              <h1 className={isOn ? 'active' : ''}>En</h1>
            </div>
            <div className="left-container">
              <div className="codemorth-logo-container-laptop">
                <Image
                  src={'/CodeMorthLogo.svg'}
                  alt="Logo de CodeMorth"
                  width={1000}
                  height={1000}
                />
              </div>
              <p>
                Code<span>Morth</span>
              </p>
            </div>
          </div>
          <div className="rigth-container">
            {languageData?.navbar?.map((data: LanguageNavbar, index: number) => (
                <Link
                  key={index}
                  onClick={() => ChangeData( data ,setlineData,setlineBackup)}
                  onMouseEnter={() =>ChangeData( data ,setlineData)}
                  onMouseLeave={() => (
                    ChangeData( lineBackup ,setlineData),
                    setlinePresioned(false)
                  )}
                  onMouseDown={() => setlinePresioned(true)}
                  onMouseUp={() => setlinePresioned(false)}
                  href={data?.ref}
                >
                  {data?.text}
                </Link>
              )
)}
            <div
              className="highlight-line"
              style={{
                left: `${lineData.leftLine}%`,
                width: `${lineData.widthLine}%`,
                rotate: `${lineData.rotateLine}deg`,
                height: `${linePresioned ? '0.4rem' : '0.2rem'}`,
                transform: `${linePresioned ? 'scale(0.5)' : 'scale(1)'}`,
                bottom: `${linePresioned ? '1.25rem' : '1.4rem'}`
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
