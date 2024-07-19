import { ExperienceCard } from '@/components/page/experience/ExperienceCard'

export const ExperienceHome = () => {
  return (
    <div className='ExperienceHome'>
      <h1>EXPERIENCIA</h1>
      <div className='experienceCard-container'>
        <ExperienceCard
          title="Freelancer"
          subtitle="Enero 2023-2024"
          src=""
          alt=""
          description="He trabajado de forma autónoma en el desarrollo de páginas web, 
          colaborando con clientes ubicados en mi área local. A través de esta experiencia, 
          he ido adquiriendo conocimientos gradualmente."
        />
        <ExperienceCard
          title="Diurvan Consultores"
          subtitle="Enero 2023-Actualidad"
          src=""
          alt=""
          description="Como Programador Front-End en Diurvan Consultores, resuelvo requerimientos 
          de clientes en sitios web. Uso TypeScript, React.js y CSS, colaborando en proyectos 
          desde inicio hasta entrega final, empleando Git y GitHub para colaboración."
        />
      </div>
    </div>
  )
}
