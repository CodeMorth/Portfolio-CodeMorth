import Link from "next/link";
import React from "react";
import useLanguage from "../Hooks/useLanguage";
import Image from "next/image";

export const NavBar = () => {
  const { languageData } = useLanguage();

  console.log(languageData?.navbar);

  return (
    <>
      <div className="NavBar">
        <div className="left-container">
          <div className="codemorth-logo-container">
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
          {languageData?.navbar?.map((data: any, key: number) => {
            console.log("data", data);
            return (
              <Link key={key} href={data?.ref}>
                {data?.text}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};
