import axios, { AxiosRequestConfig } from 'axios'
import { toast } from 'sonner'

const url = process.env.NEXT_PUBLIC_BASIC_URL

const axiosGlobal = axios.create({ baseURL: `${url}`, timeout: 5000 })

export const RequestWithToast = (config: AxiosRequestConfig) => {
  const promise = axiosGlobal(config)

  toast.promise(promise, {
    loading: '',
    success: 'Mensaje enviado con éxito',
    error: (error) => {
      if (error.response?.status === 404) {
        return 'No se pudo enviar el mensaje'
      } else if (error.message === 'Network Error') {
        return 'Error de red. Verifica tu conexión'
      }
      return 'No se pudo enviar el mensaje'
    },
    duration: 4000
  })

  return promise
}
