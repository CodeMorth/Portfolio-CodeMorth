import { DataLanguageType } from '@/interface/Language'
import axios, { AxiosRequestConfig } from 'axios' // Import axios for making HTTP requests and AxiosRequestConfig type for request configuration
import { toast } from 'sonner' // Import the toast function for displaying notifications

// Get the base URL from environment variables
const url = process.env.NEXT_PUBLIC_BASIC_URL

// Check if we are in the browser environment
const isBrowser = typeof window !== 'undefined'
const loadingSound = isBrowser ? new Audio('/sounds/Loading.mp3') : null

// Create an Axios instance with a base URL and a timeout setting
const axiosGlobal = axios.create({ baseURL: `${url}`, timeout: 5000 })

// Define a custom interface that extends AxiosRequestConfig to include a language property
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  language: DataLanguageType // Custom property for language data
}

// Set up a request interceptor to handle requests before they are sent
axiosGlobal.interceptors.request.use(
  (request) => {
    // Play the loading sound if it exists
    if (loadingSound) {
      loadingSound.play()
    }
    return request // Return the request as is
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error) // Reject the promise with the error
  }
)

// Set up a response interceptor to handle responses from the server
axiosGlobal.interceptors.response.use(
  (response) => {
    // Stop the loading sound if it exists
    if (loadingSound) {
      loadingSound.pause()
      loadingSound.currentTime = 0
    }

    // Play the success sound (new instance for each response)
    const successSound = isBrowser ? new Audio('/sounds/Success.mp3') : null
    if (successSound) {
      successSound.play()
    }

    // Cast the response config to the custom configuration type
    const config = response.config as CustomAxiosRequestConfig

    // Modify the response data to include success status, data, and a message
    response.data = {
      success: true,
      data: response.data,
      message: config.language.toastData.success // Get success message from language data
    }

    return response // Return the modified response
  },
  (error) => {
    // Stop the loading sound if it exists
    if (loadingSound) {
      loadingSound.pause()
      loadingSound.currentTime = 0
    }

    // Play the error sound (new instance for each error)
    const errorSound = isBrowser ? new Audio('/sounds/Error.mp3') : null
    if (errorSound) {
      errorSound.play()
    }

    // Cast the error config to the custom configuration type
    const config = error.config as CustomAxiosRequestConfig

    // Initialize the error message from the language data
    let message = config.language.toastData.errorReturn

    // Check for specific error conditions to customize the error message
    if (error.response?.status === 404) {
      message = config.language.toastData.error404 // Message for 404 Not Found
    } else if (error.message === 'Network Error') {
      message = config.language.toastData.errorMessage // Message for network errors
    }

    return Promise.reject({ success: false, message }) // Reject the promise with a custom error object
  }
)

// Function to make requests with toast notifications
export const RequestWithToast = (
  config: CustomAxiosRequestConfig // Use the custom config type for requests
) => {
  // Make the request using the global Axios instance
  const promise = axiosGlobal(config)

  // Use the toast.promise function to handle the promise and display notifications
  toast.promise(promise, {
    loading: '', // Optionally, add a loading message
    success: (response) => {
      return response.data.message // Access and return the success message from the modified response
    },
    error: (error) => {
      return error.message // Return the error message for notification
    },
    duration: 4000 // Duration for the toast notification in milliseconds
  })

  return promise // Return the promise for further handling if needed
}
