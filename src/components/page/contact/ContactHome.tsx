'use client'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginValidator } from '@/validator/SendMailValidator'
import { postMail } from '@/services/mail.service'
import { toast } from 'sonner'

export const ContactHome = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(LoginValidator),
    defaultValues: {
      NAME: '',
      EMAIL: '',
      MESSAGE: ''
    }
  })

  const onSubmit = async (e: any) => {
    await postMail({
      NAME: e.NAME,
      EMAIL: e.EMAIL,
      MESSAGE: e.MESSAGE
    }).catch((err) => err)
  }

  return (
    <div className="ContactHome">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-container">
          <label htmlFor="name">Name</label>
          <Controller
            name="NAME"
            control={control}
            render={({ field }) => (
              <input {...field} type="text" placeholder="Ingrese su nombre" />
            )}
          />
          {errors.NAME && <p>{errors.NAME.message}</p>}
        </div>
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <Controller
            name="EMAIL"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="email"
                placeholder="Ingrese su correo electrónico"
              />
            )}
          />
          {errors.EMAIL && <p>{errors.EMAIL.message}</p>}
        </div>
        <div className="input-container">
          <label htmlFor="message">Message</label>
          <Controller
            name="MESSAGE"
            control={control}
            render={({ field }) => (
              <textarea {...field} placeholder="Ingrese su mensaje" rows={3} />
            )}
          />
          {errors.MESSAGE && <p>{errors.MESSAGE.message}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
