import Image from 'next/image'

// Define the interface for the props that ExperienceCard will receive
interface ExperienceCardProps {
  title: string
  subtitle: string
  alt: string
  src: string // The source URL of the image
  description: string
}

export const ExperienceCard = ({
  title, // Destructure title from props
  subtitle, // Destructure subtitle from props
  alt, // Destructure alt from props
  src, // Destructure src from props
  description // Destructure description from props
}: ExperienceCardProps) => {
  return (
    <article className="ExperienceCard">
      <h2>{title}</h2>
      <h3>{subtitle}</h3>
      <div className="image-container">
        <Image alt={alt} src={src} width={1000} height={1000} />
      </div>
      <p>{description}</p>
    </article>
  )
}
