"use client"
import Image from "next/image"
import React from "react"
import { motion } from "framer-motion"
import { useLanguage, ViewNavBarGlobal } from "@/Hooks"

export const HomeComponent = () => {
  const { languageData } = useLanguage()
  const { setopenNavBar } = ViewNavBarGlobal()

  const text = languageData?.homeLanguage

  return (
    <main className="HomeComponent">
      <div className="left-container">
        <div className="perfil-image-container">
          <motion.img
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            drag
            dragConstraints={{
              top:-10,
              left: -10,
              right: 10,
              bottom: 10,
            }}
            onClick={() => setopenNavBar((prev: boolean) => !prev)}
            width={1000}
            height={1000}
            alt="Foto de perfil"
            src={"/general/PerfilPhoto.png"}
          />
        </div>
        <div className="logo-icons-container">
          <motion.a
            target="_blank"
            href="https://www.linkedin.com/in/kevin-salinas-valverde-20941a194/"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.7 }}
            className="linkedin-container"
          >
            <Image
              width={100}
              height={100}
              alt="Logo de Linkedin"
              src={"/general/Linkedin.svg"}
            ></Image>
          </motion.a>
          <motion.a
            target="_blank"
            href="https://github.com/CodeMorth"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.7 }}
            className="github-container"
          >
            <Image
              width={100}
              height={100}
              alt="Logo de GitHub"
              src={"/technologies/GitHub.svg"}
            ></Image>
          </motion.a>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.7 }}
            className="gmail-container"
          >
            <Image
              width={100}
              height={100}
              alt="Logo de Gmail"
              src={"/general/Gmail.svg"}
            ></Image>
          </motion.div>
        </div>
      </div>
      <div className="rigth-container">
        <h1>
          {text?.h1} <span>{text?.span1}</span>-<span>{text?.span2}</span>
        </h1>
        <p>{text?.p}</p>
      </div>
    </main>
  )
}
