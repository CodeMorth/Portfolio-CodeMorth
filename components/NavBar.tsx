import Link from "next/link";
import React, { useState } from "react";
import useLanguage from "../Hooks/useLanguage";
import Image from "next/image";
import { motion } from "framer-motion";

export const NavBar = () => {
  const { languageData, settypeLanguage } = useLanguage();
  const [openNavBar, setopenNavBar] = useState<boolean>(true);
  const [isOn, setIsOn] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
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

      <div className="NavBar">
        <div className={`navbar-container ${openNavBar ? "open" : "close"}`}>
          <div
            className="switch"
            data-isOn={isOn}
            onClick={() => {
              setIsOn(!isOn), settypeLanguage((prev: boolean) => !prev);
            }}
          >
            <motion.div
              className="handle"
              layout
              transition={{
                type: "spring",
                stiffness: 700,
                damping: 25,
              }}
            />
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
          <div className="rigth-container">
            {languageData?.navbar?.map((data: any, key: number) => (
              <Link key={key} href={data?.ref}>
                {data?.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
