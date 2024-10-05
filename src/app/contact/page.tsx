import { Container } from '@/components/global'
import { Metadata } from '@/components/global/Metadata'
import { ContactHome } from '@/components/page/contact'
import React from 'react'

const page = () => {
  return (
    <>
      <Metadata />
      <Container>
        <ContactHome />
      </Container>
    </>
  )
}

export default page
