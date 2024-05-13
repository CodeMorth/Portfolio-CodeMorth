import Image from "next/image";
import React from "react";

const HomeComponent = () => {
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
            <Image width={100} height={100} alt="Logo de GitHub" src={"/GitHub.svg"}></Image>
          </div>
          <div className="gmail-container">
            <Image width={100} height={100} alt="Logo de Gmail" src={"/Gmail.svg"}></Image>
          </div>
        </div>
      </div>
      <div className="rigth-container">
        <h1>
          Desarrollador <span>Front</span>-<span>End</span>
        </h1>
        <p>
          Me gusta ser detallista en los proyectos que desarrollo, buscando
          entregar el mejor producto posible .
        </p>
      </div>
    </main>
  );
};

export default HomeComponent;
