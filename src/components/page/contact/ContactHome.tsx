'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { postMail } from '@/services/mail.service'
import { RenderInput, RenderTextarea } from '@/components/global'
import { useLanguage } from '@/Hooks'
import { useLoginValidator } from '@/Hooks/useLoginValidator '
import { useEffect, useRef } from 'react'

type FormData = {
  NAME: string
  EMAIL: string
  MESSAGE: string
}

export const ContactHome = () => {
  const { loginValidator } = useLoginValidator()
  const { languageData } = useLanguage()

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({ 
    resolver: zodResolver(loginValidator), defaultValues: { NAME: '', EMAIL: '', MESSAGE: '' }})

  const buttonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    buttonRef.current?.click()
  }, [languageData])

  const onSubmit = async (data: FormData) => {
    await postMail(data).catch
  }

  return (
<div className="ContactHome">
      <form onSubmit={handleSubmit(onSubmit)}>
          {RenderInput('NAME', 'text', languageData,errors,control)}
          {RenderInput('EMAIL', 'text', languageData,errors,control)}
          {RenderTextarea('MESSAGE', languageData,errors,control)}
        <button ref={buttonRef} type="submit">{languageData?.contact.button}</button>
      </form>
    </div>
  )
}
