'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLanguage, ViewNavBarGlobal } from '@/Hooks' // Importing custom hooks for language and global navigation state

export const HomeComponent = () => {
  // Using custom hook to get language data
  const { languageData } = useLanguage()

  // Using global state to manage the navigation bar's open/close state
  const { chageOpenNavBar } = ViewNavBarGlobal()

  // Extracting home language text from the language data
  const text = languageData?.homeLanguage

  return (
    <main className="HomeComponent">
      <div className="left-container">
        <div className="perfil-image-container">
          <motion.img
            whileHover={{ scale: 1.1 }} // Scale image on hover
            whileTap={{ scale: 0.9 }} // Scale image down on click
            drag // Enable dragging of the image
            dragConstraints={{
              // Constraints for dragging
              top: -10,
              left: -10,
              right: 10,
              bottom: 10
            }}
            onClick={chageOpenNavBar} // Toggle navigation bar on image click
            width={1000}
            height={1000}
            alt="Foto de perfil"
            src={'/general/PerfilPhoto.png'}
          />
        </div>
        <div className="logo-icons-container">
          <motion.a
            target="_blank"
            href="https://www.linkedin.com/in/kevin-salinas-valverde-20941a194/"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }} // Scale icon on hover
            whileTap={{ scale: 0.7 }} // Scale icon down on click
            className="linkedin-container"
          >
            <Image
              width={100}
              height={100}
              alt="Logo de Linkedin"
              src={'/general/Linkedin.svg'}
            />
          </motion.a>
          <motion.a
            target="_blank"
            href="https://github.com/CodeMorth"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }} // Scale icon on hover
            whileTap={{ scale: 0.7 }} // Scale icon down on click
            className="github-container"
          >
            <Image
              width={100}
              height={100}
              alt="Logo de GitHub"
              src={'/technologies/GitHub.svg'}
            />
          </motion.a>
          <motion.a
            target="_blank"
            href={languageData.homeLanguage.urlCV}
            download="Kevin Salinas CV"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }} // Scale icon on hover
            whileTap={{ scale: 0.7 }} // Scale icon down on click
            className="gmail-container"
          >
            <Image
              width={100}
              height={100}
              color="white"
              alt="Logo de Gmail"
              src={'/general/CV.svg'}
            />
          </motion.a>
        </div>
      </div>
      <div className="rigth-container">
        <h1>
          {/* Displaying text with dynamic content from languageData */}
          {text?.h1} <span>{text?.span1}</span>-<span>{text?.span2}</span>
        </h1>
        <p>{text?.p}</p>
      </div>
    </main>
  )
}
