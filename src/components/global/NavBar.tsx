"use client"
import Link from "next/link"
import React, { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useLanguage, ViewNavBarGlobal } from "@/Hooks/Global"

export const NavBar = () => {
  const { languageData, settypeLanguage } = useLanguage()
  const { openNavBar, setopenNavBar } = ViewNavBarGlobal()
  const [isOn, setIsOn] = useState(false)
  const [leftLine, setleftLine] = useState(3.0)
  const [widthLine, setwidthLine] = useState<number>(9.3)
  const [rotateLine, setrotateLine] = useState(3)
  const [leftLineBackup, setleftLineBackup] = useState<number>(0)
  const [widthLineBackup, setwidthLineBackup] = useState<number>(0)
  const [rotateLineBackup, setrotateLineBackup] = useState<number>(0)
  const [linePresioned, setlinePresioned] = useState(false)

  const handleClick = (left: number, width: number, rotate: number) => {
    setleftLine(left)
    setwidthLine(width)
    setrotateLine(rotate)
  }

  const handleHover = (left: number, width: number, rotate: number) => {
    setleftLineBackup(left)
    setwidthLineBackup(width)
    setrotateLineBackup(rotate)
  }

  return (
    <>
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
                onClick={() => (
                  handleClick(data.left, data.width, data.rotate),
                  handleHover(data.left, data.width, data.rotate)
                )}
                onMouseEnter={() =>
                  handleClick(data.left, data.width, data.rotate)
                }
                onMouseLeave={() => (
                  handleClick(
                    leftLineBackup,
                    widthLineBackup,
                    rotateLineBackup
                  ),
                  setlinePresioned(false)
                )}
                onMouseDown={() => setlinePresioned(true)}
                onMouseUp={() => setlinePresioned(false)}
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
                height: `${linePresioned ? "0.4rem" : "0.2rem"}`,
                transform: `${linePresioned ? "scale(0.5)" : "scale(1)"}`,
                bottom: `${linePresioned ? "1.25rem" : "1.4rem"}`,
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
