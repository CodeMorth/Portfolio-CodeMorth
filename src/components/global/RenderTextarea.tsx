import { Control, Controller, FieldErrors } from 'react-hook-form'
import { DataLanguageType } from '@/interface/Language'

// Define the 'FormData' type, representing the structure of the form fields (NAME, EMAIL, MESSAGE).
type FormData = {
  NAME: string
  EMAIL: string
  MESSAGE: string
}

// The 'RenderTextarea' function component is responsible for rendering a textarea input field.
// - 'name': The form field's name, which corresponds to one of the keys in 'FormData' (NAME, EMAIL, MESSAGE).
// - 'languageData': Contains the language-specific labels and placeholders for the form fields.
// - 'errors': An object containing potential validation error messages for the form fields.
// - 'control': Used by 'react-hook-form' to manage the form's state and validation.
export const RenderTextarea = (
  name: keyof FormData,
  languageData: DataLanguageType,
  errors: FieldErrors<FormData>,
  control: Control<FormData>
) => {
  // Create a mapping from uppercase form field names (NAME, EMAIL, MESSAGE) to their lowercase counterparts
  // (name, email, message) as used in 'languageData' for labels and placeholders.
  const fieldMap: Record<keyof FormData, 'name' | 'email' | 'message'> = {
    NAME: 'name',
    EMAIL: 'email',
    MESSAGE: 'message'
  }

  // Get the mapped lowercase name that corresponds to the current field ('NAME' -> 'name', etc.).
  const mappedName = fieldMap[name] // This ensures that TypeScript recognizes the correct key names.

  return (
    <div className="input-container">
      <label htmlFor={mappedName}>
        {languageData?.contact.form.label[mappedName]}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <textarea
              {...field} // Binds the input to 'react-hook-form' for automatic state management.
              placeholder={languageData?.contact.form.placeholder[mappedName]}
              rows={3}
            />
            {errors?.[name] ? <p className='text-red-500'>{errors[name]?.message}</p> : null}
            </>
        )}
      />
    </div>
  )
}
