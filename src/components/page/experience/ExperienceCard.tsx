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
    <>
      <div>{title}</div>
      <div>{subtitle}</div>
      <div>
        <Image alt={alt} src={src} />
      </div>
      <div>{description}</div>
    </>
  )
}
