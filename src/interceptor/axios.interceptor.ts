import axios, { AxiosRequestConfig } from 'axios'
import { toast } from 'sonner'

const url = process.env.NEXT_PUBLIC_BASIC_URL

const axiosGlobal = axios.create({ baseURL: `${url}`, timeout: 5000 })

// Interceptor para modificar request
axiosGlobal.interceptors.request.use(
  (request) => {
    return request
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor para modificar response
axiosGlobal.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const RequestWithToast = (config: AxiosRequestConfig) => {
  const promise = axiosGlobal(config)

  toast.promise(promise, {
    loading: 'Enviando...',
    success: (response) => {
      return 'Mensaje enviado con éxito'
    },
    error: (error) => {
      if (error.response?.status === 404) {
        return 'Recurso no encontrado'
      } else if (error.message === 'Network Error') {
        return 'Error de red. Verifica tu conexión'
      }
      return 'Lo siento, hubo un error'
    }
  })

  return promise
}
