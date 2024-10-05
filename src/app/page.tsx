import { Container } from '@/components/global'
import { Metadata } from '@/components/global/Metadata'
import { HomeComponent } from '@/components/page/home'

export default function Home() {
  return (
    <>
      <Metadata />
      <Container>
        <HomeComponent />
      </Container>
    </>
  )
}
