import { Container } from '@/components/global'
import { Metadata } from '@/components/global/Metadata'
import { ProjectHome } from '@/components/page/projects'
import React from 'react'

const page = () => {
  return (
    <>
      <Metadata />
      <Container>
        <ProjectHome />
      </Container>
    </>
  )
}

export default page
