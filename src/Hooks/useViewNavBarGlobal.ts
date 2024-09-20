import { useContext } from "react";
import { LanguageContext } from "../Context/LanguageProvider";

export const ViewNavBarGlobal = () => {

  const { openNavBar, setopenNavBar } = useContext(LanguageContext);

  return{setopenNavBar,openNavBar}

};

