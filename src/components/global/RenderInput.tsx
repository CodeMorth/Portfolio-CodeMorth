import { Control, Controller, FieldErrors } from 'react-hook-form';
import { DataLanguageType } from '@/interface/Language';

type FormData = {
  NAME: string;
  EMAIL: string;
  MESSAGE: string;
};

// The 'RenderInput' function component is responsible for rendering an input field (either text or textarea).
// - 'name': The form field's name, which corresponds to one of the keys in 'FormData' (e.g., NAME, EMAIL, MESSAGE).
// - 'type': The type of the input field (e.g., 'text', 'email', etc.).
// - 'languageData': Contains the language-specific labels and placeholders for the form fields.
// - 'errors': An object containing potential validation error messages for the form fields.
// - 'control': Used by 'react-hook-form' to manage the form's state and validation.
export const RenderInput = (
  name: keyof FormData,
  type: string, 
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
  };

  // Get the mapped lowercase name corresponding to the current field ('NAME' -> 'name', etc.).
  const mappedName = fieldMap[name]; // Ensures TypeScript recognizes the exact key names being used.

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
            <input
              {...field} // Binds the input to 'react-hook-form' for automatic state management.
              type={type}
              placeholder={languageData?.contact.form.placeholder[mappedName]}
            />
            {errors?.[name] ? <p>{errors[name]?.message}</p> : null}
          </>
        )}
      />
    </div>
  );
};
