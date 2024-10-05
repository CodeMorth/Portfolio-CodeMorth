import { Container } from '@/components/global'
import { Metadata } from '@/components/global/Metadata'
import { ExperienceHome } from '@/components/page/experience'

const page = () => {
  return (
    <>
      <Metadata />
      <Container>
        <ExperienceHome />
      </Container>
    </>
  )
}

export default page
