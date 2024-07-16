"use client"
import Link from "next/link"
import React, { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useLanguage, ViewNavBarGlobal } from "@/Hooks/Global"
import { Container } from "@/components/Globals"

export const NavBar = () => {
  const { languageData, settypeLanguage } = useLanguage()
  const { openNavBar, setopenNavBar } = ViewNavBarGlobal()
  const [isOn, setIsOn] = useState(false)
  const [leftLine, setleftLine] = useState(-1)
  const [widthLine, setwidthLine] = useState<number>(9.3)
  const [rotateLine, setrotateLine] = useState(3)

  const handleClick = (left: number, width: number, rotate: number) => {
    setleftLine(left)
    setwidthLine(width)
    setrotateLine(rotate)
  }

  return (
    <>
      <Container>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.7 }}
          className="codemorth-logo-container-movil-navbar"
        >
          <Image
            src={"/CodeMorthLogo.svg"}
            alt="Logo de CodeMorth"
            width={1000}
            height={1000}
            onClick={() => setopenNavBar((prev: boolean) => !prev)}
          />
        </motion.div>
        <div
          onClick={() => setopenNavBar(false)}
          className={`NavBar ${openNavBar ? "open" : "close"}`}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className={`navbar-container ${openNavBar ? "open" : "close"}`}
          >
            <div className="container-switch-logo">
              <div className="switch-container">
                <h1 className={isOn ? "" : "active"}>Es</h1>
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
                      type: "spring",
                      stiffness: 700,
                      damping: 40,
                    }}
                  />
                </div>
                <h1 className={isOn ? "active" : ""}>En</h1>
              </div>
              <div className="left-container">
                <div className="codemorth-logo-container-laptop">
                  <Image
                    src={"/CodeMorthLogo.svg"}
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
              {languageData?.navbar?.map((data: any, index: number) => (
                <Link
                  key={index}
                  onClick={() =>
                    handleClick(data.left, data.width, data.rotate)
                  }
                  href={data?.ref}
                >
                  {data?.text}
                </Link>
              ))}
              <div
                className="highlight-line"
                style={{
                  left: `${leftLine}%`,
                  width: `${widthLine}%`,
                  rotate: `${rotateLine}deg`,
                }}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
