'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useDataNavBar, useLanguage, ViewNavBarGlobal } from '@/Hooks'
import { NavbarLanguageType } from '@/interface/Language'
import { Navigate } from '@/components/global'
import { LOADING_STATES, useNavigationContext } from '@/Context'
import { useEffect } from 'react'

export const NavBar = () => {
  const { languageData, changeLanguage } = useLanguage()
  const { openNavBar, setopenNavBar } = ViewNavBarGlobal()
  const { dataNavBar, editBoolean, editLineData } = useDataNavBar()
  const { loading } = useNavigationContext()

  useEffect(() => {
    loading === LOADING_STATES.LOADING ? '' : setopenNavBar(false)
  }, [loading, setopenNavBar])

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.7 }}
        className="codemorth-logo-container-movil-navbar"
      >
        <Image
          src={'general/CodeMorthLogo.svg'}
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
              <h1 className={dataNavBar.isOn ? '' : 'active'}>Es</h1>
              <div
                className="switch"
                data-on={dataNavBar.isOn}
                onClick={() => {
                  editBoolean('isOn', 'opposite'), changeLanguage()
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
              <h1 className={dataNavBar.isOn ? 'active' : ''}>En</h1>
            </div>
            <div className="left-container">
              <div className="codemorth-logo-container-laptop">
                <Image
                  src={'general/CodeMorthLogo.svg'}
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
          <nav className="rigth-container">
            {languageData?.navbarLanguage?.map(
              (data: NavbarLanguageType, index: number) => (
                <Navigate
                  key={index}
                  onClick={() => {
                    editLineData('lineBackup', data),
                      editLineData('lineData', data)
                  }}
                  onMouseEnter={() => editLineData('lineData', data)}
                  onMouseLeave={() => (
                    editLineData('dataWithBackup'),
                    editBoolean('linePresioned', 'false')
                  )}
                  onMouseDown={() => editBoolean('linePresioned', 'true')}
                  onMouseUp={() => editBoolean('linePresioned', 'false')}
                  href={data?.ref}
                >
                  {data?.text}
                </Navigate>
              )
            )}
            <div
              className="highlight-line"
              style={{
                left: `${dataNavBar.lineData.leftLine}%`,
                width: `${dataNavBar.lineData.widthLine}%`,
                rotate: `${dataNavBar.lineData.rotateLine}deg`,
                height: `${dataNavBar.linePresioned ? '0.4rem' : '0.2rem'}`,
                transform: `${
                  dataNavBar.linePresioned ? 'scale(0.5)' : 'scale(1)'
                }`,
                bottom: `${dataNavBar.linePresioned ? '1.25rem' : '1.4rem'}`
              }}
            />
          </nav>
        </div>
      </div>
    </>
  )
}
