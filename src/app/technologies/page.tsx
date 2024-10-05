import { Container } from '@/components/global'
import { Metadata } from '@/components/global/Metadata'
import { TechnologiesHome } from '@/components/page/technologies'
import React from 'react'

const page = () => {
  return (
    <>
      <Metadata />
      <Container>
        <TechnologiesHome />
      </Container>
    </>
  )
}

export default page
