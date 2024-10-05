'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RenderInput, RenderTextarea } from '@/components/global'
import { useLanguage, useServiceMangment } from '@/Hooks'
import { useLoginValidator } from '@/Hooks/useLoginValidator '
import { useEffect, useRef } from 'react'
import { FormDataMail } from '@/interface/Language'

export const ContactHome = () => {
  // Import custom validation schema using a hook
  const { loginValidator } = useLoginValidator()
  // Get the language data for translations
  const { languageData } = useLanguage()
  // Get the function to handle posting email data
  const { hPostMail } = useServiceMangment();

  // Initialize React Hook Form with Zod validation and default values for form inputs
  const { control, handleSubmit, formState: { errors },reset, trigger  } = useForm<FormDataMail>({ 
    resolver: zodResolver(loginValidator), defaultValues: { NAME: '', EMAIL: '', MESSAGE: '' },mode:"onChange"})

  // Reference to the submit button (optional, can be useful for focus or disabling)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  // Re-trigger validation when the language data changes (useful for dynamic translations)
  useEffect(() => {
    trigger()
  }, [languageData, trigger])

  // Handle form submission, reset form on success
  const onSubmit = async (data: FormDataMail) => {
    const response = await hPostMail(data)
    if (response) reset()
  }

  return (
    <div className="ContactHome">
      <form onSubmit={handleSubmit(onSubmit)}>
          {RenderInput('NAME', 'text', languageData, errors, control)}
          {RenderInput('EMAIL', 'text', languageData, errors, control)}
          {RenderTextarea('MESSAGE', languageData, errors, control)}
          <button ref={buttonRef} type="submit">
            {languageData.contact.button}
          </button>
        </form>
    </div>
  )
}
