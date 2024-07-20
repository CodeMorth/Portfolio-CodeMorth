import Image from 'next/image'

interface ExperienceCardProps {
  title: string
  subtitle: string
  alt: string
  src: string
  description: string
}

export const ExperienceCard = ({
  title,
  subtitle,
  alt,
  src,
  description
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
