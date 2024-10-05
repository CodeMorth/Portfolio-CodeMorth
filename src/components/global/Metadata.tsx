"use client"
import { usePathname } from "next/navigation";
import { useLanguage } from "@/Hooks";
import { getMetadata } from "@/utils/getMetadata";

// Componente que maneja la metadata
export const Metadata = () => {
    const pathname = usePathname(); // Usa el hook para obtener la ruta actual
    const { typeLanguage } = useLanguage(); // Usa el hook para obtener el estado del idioma
    const metadata = getMetadata(typeLanguage,pathname); // Llama a la función para obtener metadata
  
    return (
      <>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </>
    );
  };