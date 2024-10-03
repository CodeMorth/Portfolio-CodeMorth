'use client'
import { useLanguage } from '@/Hooks'
import { z } from 'zod'

export const useLoginValidator = () => {
  const { languageData } = useLanguage()
  
  const loginValidator = z.object({
    EMAIL: z
      .string()
      .email(languageData?.contact.form.errors.email.invalid)
      .min(1, languageData?.contact.form.errors.email.required),
    NAME: z.string().min(1, languageData?.contact.form.errors.name),
    MESSAGE: z.string().min(1, languageData?.contact.form.errors.message)
  })

  return { loginValidator }
}
