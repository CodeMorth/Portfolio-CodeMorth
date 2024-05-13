"use client";
import Image from "next/image";
import React from "react";
import useLanguage from "../Hooks/useLanguage";

const HomeComponent = () => {
  
  const { languageData } = useLanguage();

  const text = languageData?.home;

  return (
    <main className="HomeComponent">
      <div className="left-container">
        <div className="perfil-image-container">
          <Image
            width={1000}
            height={1000}
            alt="Foto de perfil"
            src={"/PerfilPhoto.png"}
          ></Image>
        </div>
        <div className="logo-icons-container">
          <div className="linkedin-container">
            <Image
              width={100}
              height={100}
              alt="Logo de Linkedin"
              src={"/Linkedin.svg"}
            ></Image>
          </div>
          <div className="github-container">
            <Image
              width={100}
              height={100}
              alt="Logo de GitHub"
              src={"/GitHub.svg"}
            ></Image>
          </div>
          <div className="gmail-container">
            <Image
              width={100}
              height={100}
              alt="Logo de Gmail"
              src={"/Gmail.svg"}
            ></Image>
          </div>
        </div>
      </div>
      <div className="rigth-container">
        <h1>
          {text?.h1} <span>{text?.span1}</span>-<span>{text?.span2}</span>
        </h1>
        <p>{text?.p}</p>
      </div>
    </main>
  );
};

export default HomeComponent;
