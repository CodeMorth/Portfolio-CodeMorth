'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useDataNavBar, useLanguage, ViewNavBarGlobal } from '@/Hooks' // Custom hooks for data and language management
import { NavbarLanguageType } from '@/interface/Language' // Type definition for navbar language
import { Navigate } from '@/components/global' // Importing the Navigate component for navigation links
import { LOADING_STATES, useNavigationContext } from '@/Context' // Importing loading states and navigation context
import { useEffect } from 'react'

export const NavBar = () => {
  // Extracting language data and changeLanguage function from the language hook
  const { languageData, changeLanguage } = useLanguage()

  // Extracting openNavBar state and function to toggle it from the global view hook
  const { openNavBar, setopenNavBar, chageOpenNavBar } = ViewNavBarGlobal()

  // Extracting data for the navbar and functions to edit data
  const { dataNavBar, editBoolean, editLineData } = useDataNavBar()

  // Extracting loading state from the navigation context
  const { loading } = useNavigationContext()

  // Audio player for language change
  const audio = typeof window !== 'undefined' ? new Audio('/sounds/ChangeLanguage.mp3') : null;

  // useEffect to close the navbar when loading is not in the loading state
  useEffect(() => {
    loading === LOADING_STATES.LOADING ? '' : setopenNavBar(false)
  }, [loading, setopenNavBar])

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.1 }} // Animation on hover
        whileTap={{ scale: 0.7 }} // Animation on tap/click
        className="codemorth-logo-container-movil-navbar"
      >
        <Image
          src={'general/CodeMorthLogo.svg'}
          alt="Logo de CodeMorth"
          width={1000} // Logo width
          height={1000} // Logo height
          onClick={chageOpenNavBar} // Toggle navbar open/close on click
        />
      </motion.div>

      <div
        onClick={() => setopenNavBar(false)} // Close navbar on outer click
        className={`NavBar ${openNavBar ? 'open' : 'close'}`} // Conditional class based on open state
      >
        <div
          onClick={(event) => event.stopPropagation()} // Prevent click event from propagating to outer div
          className={`navbar-container ${openNavBar ? 'open' : 'close'}`} // Conditional class based on open state
        >
          <div className="container-switch-logo">
            <div className="switch-container">
              <h1 className={dataNavBar.isOn ? '' : 'active'}>Es</h1>{/* Spanish option */}              
              <div
                className="switch"
                data-on={dataNavBar.isOn} // Indicates whether the switch is on
                onClick={() => {
                  editBoolean('isOn', 'opposite'), changeLanguage(),
                  audio?audio.play():null // Toggle language on switch click
                }}
              >
                <motion.div
                  className="handle"
                  layout // Enables layout animations
                  transition={{
                    type: 'spring',
                    stiffness: 700,
                    damping: 40 // Spring animation settings
                  }}
                />
              </div>
              <h1 className={dataNavBar.isOn ? 'active' : ''}>En</h1>{/* English option */}              
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
              (
                data: NavbarLanguageType,
                index: number // Mapping through navbar language data
              ) => (
                <Navigate
                  key={index}
                  onClick={() => {
                    editLineData('lineBackup', data), // Backup current line data
                      editLineData('lineData', data) // Set current line data
                  }}
                  onMouseEnter={() => editLineData('lineData', data)} // Highlight link on mouse enter
                  onMouseLeave={() => (
                    editLineData('dataWithBackup'), // Restore previous line data
                    editBoolean('linePresioned', 'false') // Update pressed state
                  )}
                  onMouseDown={() => editBoolean('linePresioned', 'true')} // Set pressed state on mouse down
                  onMouseUp={() => editBoolean('linePresioned', 'false')} // Reset pressed state on mouse up
                  href={data?.ref}
                >
                  {data?.text}
                </Navigate>
              )
            )}
            <div
              className="highlight-line"
              style={{
                left: `${dataNavBar.lineData.leftLine}%`, // Positioning based on line data
                width: `${dataNavBar.lineData.widthLine}%`, // Width based on line data
                rotate: `${dataNavBar.lineData.rotateLine}deg`, // Rotation based on line data
                height: `${dataNavBar.linePresioned ? '0.4rem' : '0.2rem'}`, // Height based on pressed state
                transform: `${
                  dataNavBar.linePresioned ? 'scale(0.5)' : 'scale(1)' // Scale based on pressed state
                }`,
                bottom: `${dataNavBar.linePresioned ? '1.25rem' : '1.4rem'}` // Bottom position based on pressed state
              }}
            />
          </nav>
        </div>
      </div>
    </>
  )
}
