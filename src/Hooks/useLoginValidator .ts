// - 'useLanguage' is a custom hook that provides language-specific data for localization.
// - 'z' is the Zod library for schema validation, used to define and validate the structure of input data.
import { useLanguage } from '@/Hooks'
import { z } from 'zod'

// Define a custom hook named 'useLoginValidator' that encapsulates the logic for validating login form inputs.
export const useLoginValidator = () => {
  // Destructure 'languageData' from the 'useLanguage' hook to access localized error messages.
  const { languageData } = useLanguage()

  // Create a Zod schema object for validating the login form inputs (EMAIL, NAME, MESSAGE).
  const loginValidator = z.object({
    // Define the EMAIL field validation rules:
    EMAIL: z
      .string() // The field must be a string.
      .email(languageData?.contact.form.errors.email.invalid) // Must be a valid email format, with a localized error message.
      .min(1, languageData?.contact.form.errors.email.required), // Must have a minimum length of 1, with a localized error message for the required field.

    // Define the NAME field validation rules:
    NAME: z.string().min(1, languageData?.contact.form.errors.name), // Must be a string with a minimum length of 1, with a localized error message.

    // Define the MESSAGE field validation rules:
    MESSAGE: z.string().min(1, languageData?.contact.form.errors.message) // Must be a string with a minimum length of 1, with a localized error message.
  })

  // Return the loginValidator schema so it can be used elsewhere in the application.
  return { loginValidator }
}
