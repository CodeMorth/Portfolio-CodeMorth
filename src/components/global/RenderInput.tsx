import { Controller, FieldErrors } from 'react-hook-form'
import { ErrorForm } from '@/components/global'

export const RenderInput = (
  name: string,
  type: string,
  languageData: any ,
  errors: FieldErrors<FormData>,
  control: any
) => {
  const nameLower = name.toLowerCase()

  return (
    <div className="input-container">
      <label htmlFor="name">
        {languageData?.contact.form.label[nameLower]}
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <input
              {...field}
              type={type}
              placeholder={languageData?.contact.form.placeholder[nameLower]}
            />
            <ErrorForm errors={errors} inputName={name} />
          </>
        )}
      />
    </div>
  )
}
